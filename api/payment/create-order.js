const express = require('express');
const Razorpay = require('razorpay');
const dotenv = require('dotenv');

dotenv.config();

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

module.exports = async (req, res) => {
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

        const amount = TICKET_PRICES[ticketType] * quantity * 100;
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
        console.error('CRITICAL: /api/payment/create-order failure');
        console.error('Error Details:', error);
        res.status(500).json({ 
            error: 'Failed to initiate payment', 
            details: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};
