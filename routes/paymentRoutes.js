const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { db } = require('../config/firebase');

const RAZORPAY_TEST_KEY_ID = 'rzp_test_Sj1lOL9RKMWKFc';
const RAZORPAY_TEST_KEY_SECRET = 'OufeeOtc5mQln02mmI4NJegz';

const razorpay = (function() {
    const keyId = process.env.RAZORPAY_KEY_ID || RAZORPAY_TEST_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET || RAZORPAY_TEST_KEY_SECRET;
    
    if (!keyId || !keySecret || keySecret === 'YOUR_SECRET_HERE') {
        console.warn('Razorpay keys not configured. Using test keys.');
    }
    
    return new Razorpay({
        key_id: keyId,
        key_secret: keySecret
    });
})();

const TICKET_PRICES = {
    'early-bird': 299,
    'regular': 599,
    'vip': 999
};

// Create Order
router.post('/create-order', async (req, res) => {
    console.log('--- Order Request Received ---');
    console.log('Body:', JSON.stringify(req.body, null, 2));
    
    try {
        if (!razorpay) {
            throw new Error('Razorpay is not configured. Please check your .env file and ensure RAZORPAY_KEY_SECRET is set correctly.');
        }

        const { ticketType, quantity } = req.body;
        
        if (!ticketType || !quantity) {
            return res.status(400).json({ error: 'Missing ticketType or quantity in request body' });
        }

        if (!TICKET_PRICES[ticketType]) {
            console.error('Invalid ticket type requested:', ticketType);
            return res.status(400).json({ error: `Invalid ticket type: ${ticketType}. Must be one of: ${Object.keys(TICKET_PRICES).join(', ')}` });
        }

        const amount = TICKET_PRICES[ticketType] * quantity * 100; // Amount in paise
        console.log(`Calculating amount: ${TICKET_PRICES[ticketType]} * ${quantity} * 100 = ${amount} paise`);

        const options = {
            amount: amount,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        console.log('Calling Razorpay orders.create with:', options);
        const order = await razorpay.orders.create(options);
        console.log('Razorpay Order Created Successfully:', order.id);
        res.json(order);
    } catch (error) {
        console.error('CRITICAL: /create-order failure');
        console.error('Error Details:', error);
        res.status(500).json({ 
            error: 'Failed to initiate payment', 
            details: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

// Verify Payment
router.post('/verify-payment', async (req, res) => {
    console.log('--- Verification Request Received ---');
    console.log('Body:', JSON.stringify(req.body, null, 2));
    
    try {
        if (!razorpay) {
            throw new Error('Razorpay is not configured.');
        }

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, ticketDetails } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ error: 'Missing required Razorpay payment details for verification' });
        }

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const keySecret = process.env.RAZORPAY_KEY_SECRET || RAZORPAY_TEST_KEY_SECRET;
        const expectedSignature = crypto
            .createHmac('sha256', keySecret)
            .update(body.toString())
            .digest('hex');

        console.log('Signature Comparison:');
        console.log('Received:', razorpay_signature);
        console.log('Expected:', expectedSignature);

        if (expectedSignature === razorpay_signature) {
            console.log('Signature verified! Saving booking...');
            // Save booking details to JSON file
            const booking = {
                orderId: razorpay_order_id,
                paymentId: razorpay_payment_id,
                ticketType: ticketDetails?.type,
                quantity: ticketDetails?.qty,
                amount: ticketDetails?.amount,
                customer: ticketDetails?.customer,
                date: new Date().toISOString()
            };

            const bookingsPath = path.join(__dirname, '../bookings.json');
            let bookings = [];
            try {
                if (fs.existsSync(bookingsPath)) {
                    const data = fs.readFileSync(bookingsPath);
                    bookings = JSON.parse(data);
                }
            } catch (fsError) {
                console.error('Error reading bookings.json:', fsError);
            }

            bookings.push(booking);
            
            try {
                fs.writeFileSync(bookingsPath, JSON.stringify(bookings, null, 2));
                console.log('Booking saved to bookings.json');
            } catch (fsError) {
                console.error('Error writing to bookings.json:', fsError);
            }

            // --- Firebase Integration ---
            try {
                const bookingId = `BOOKING_${Date.now()}_${razorpay_payment_id.slice(-6)}`;
                
                const firebaseData = {
                    bookingId: bookingId,
                    customerName: ticketDetails?.customer?.name || 'N/A',
                    customerEmail: ticketDetails?.customer?.email || 'N/A',
                    customerPhone: ticketDetails?.customer?.phone || 'N/A',
                    ticketType: ticketDetails?.type || 'N/A',
                    ticketPrice: ticketDetails?.amount || 0,
                    razorpayPaymentId: razorpay_payment_id,
                    razorpayOrderId: razorpay_order_id,
                    razorpaySignature: razorpay_signature,
                    paymentStatus: 'success',
                    eventName: 'The Phoolish Concert by Apurva Bondre',
                    eventDate: '13 June 2026',
                    eventTime: '6:30 PM',
                    venue: 'Royal Opera House, Mumbai',
                    createdAt: new Date().toISOString(),
                    currency: 'INR'
                };

                // 1. Save to payments/{bookingId}
                await db.ref(`payments/${bookingId}`).set(firebaseData);
                console.log(`Firebase: Transaction saved at payments/${bookingId}`);

                // 2. Track customer for repeat buyers: customers/{phone}
                if (ticketDetails?.customer?.phone) {
                    const customerPhone = ticketDetails.customer.phone.replace(/[^0-9]/g, ''); // Sanitize
                    const customerRef = db.ref(`customers/${customerPhone}`);
                    
                    // Update customer profile and append bookingId to their history
                    await customerRef.transaction((currentData) => {
                        if (currentData === null) {
                            return {
                                name: firebaseData.customerName,
                                email: firebaseData.customerEmail,
                                phone: customerPhone,
                                totalBookings: 1,
                                lastBooking: firebaseData.createdAt,
                                bookings: [bookingId]
                            };
                        } else {
                            currentData.totalBookings = (currentData.totalBookings || 0) + 1;
                            currentData.lastBooking = firebaseData.createdAt;
                            if (!currentData.bookings) currentData.bookings = [];
                            currentData.bookings.push(bookingId);
                            return currentData;
                        }
                    });
                    console.log(`Firebase: Customer profile updated at customers/${customerPhone}`);
                }

                return res.json({ 
                    status: 'success', 
                    booking: booking,
                    firebase: {
                        saved: true,
                        bookingId: bookingId
                    }
                });

            } catch (firebaseError) {
                console.error('CRITICAL: Firebase Storage Error');
                console.error('Error Details:', firebaseError.message);
                
                // Still return success to user because payment was verified
                return res.json({ 
                    status: 'success', 
                    booking: booking,
                    firebase: {
                        saved: false,
                        error: firebaseError.message
                    }
                });
            }
        } else {
            console.warn('Invalid signature detected during verification');
            res.status(400).json({ status: 'failure', message: 'Invalid payment signature' });
        }
    } catch (error) {
        console.error('CRITICAL: /verify-payment failure');
        console.error('Error Details:', error);
        res.status(500).json({ 
            error: 'Internal Server Error during verification', 
            details: error.message 
        });
    }
});

module.exports = router;
