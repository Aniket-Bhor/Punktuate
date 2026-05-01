const Razorpay = require('razorpay');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
    try {
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: process.env.FIREBASE_DATABASE_URL
        });
        console.log('Firebase Admin SDK initialized successfully');
    } catch (error) {
        console.warn('Firebase Admin SDK initialization failed:', error.message);
    }
}

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

module.exports = async (req, res) => {
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
            const booking = {
                orderId: razorpay_order_id,
                paymentId: razorpay_payment_id,
                ticketType: ticketDetails?.type,
                quantity: ticketDetails?.qty,
                amount: ticketDetails?.amount,
                customer: ticketDetails?.customer,
                date: new Date().toISOString()
            };

            const bookingsPath = path.join(__dirname, '../../bookings.json');
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

            let firebaseSaved = false;
            let firebaseBookingId = null;
            let firebaseError = null;
            
            try {
                if (admin.apps.length) {
                    const db = admin.database();
                    const bookingId = `BOOKING_${Date.now()}_${razorpay_payment_id.slice(-6)}`;
                    firebaseBookingId = bookingId;
                    
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

                    await db.ref(`payments/${bookingId}`).set(firebaseData);
                    console.log(`Firebase: Transaction saved at payments/${bookingId}`);

                    if (ticketDetails?.customer?.phone) {
                        const customerPhone = ticketDetails.customer.phone.replace(/[^0-9]/g, '');
                        const customerRef = db.ref(`customers/${customerPhone}`);
                        
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
                    
                    firebaseSaved = true;
                }
            } catch (firebaseErr) {
                console.error('CRITICAL: Firebase Storage Error');
                console.error('Error Details:', firebaseErr.message);
                firebaseError = firebaseErr.message;
            }

            return res.json({ 
                status: 'success', 
                booking: booking,
                firebase: {
                    saved: firebaseSaved,
                    bookingId: firebaseBookingId,
                    error: firebaseError
                }
            });
        } else {
            console.warn('Invalid signature detected during verification');
            res.status(400).json({ status: 'failure', message: 'Invalid payment signature' });
        }
    } catch (error) {
        console.error('CRITICAL: /api/payment/verify-payment failure');
        console.error('Error Details:', error);
        res.status(500).json({ 
            error: 'Internal Server Error during verification', 
            details: error.message 
        });
    }
};
