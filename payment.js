const API_URL = '/api/payment';

async function startPayment(ticketType, quantity, customerDetails, event) {
    const payButton = event?.target?.closest('button') || document.querySelector(`button[onclick*="checkout('${ticketType}')"]`);
    const originalContent = payButton ? payButton.innerHTML : '';
    
    if (payButton) {
        payButton.disabled = true;
        payButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Processing...';
    }

    console.log('Starting payment process...', { ticketType, quantity, customerDetails });

    try {
        // 1. Create order on backend
        const orderResponse = await fetch(`${API_URL}/create-order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ticketType, quantity })
        });

        if (!orderResponse.ok) {
            const errorData = await orderResponse.json();
            const errorMessage = errorData.details || errorData.error || 'Failed to create order';
            throw new Error(errorMessage);
        }

        const order = await orderResponse.json();

        // 2. Initialize Razorpay
        const options = {
            key: 'rzp_test_Sj1lOL9RKMWKFc', // Public Test Key ID
            amount: order.amount,
            currency: order.currency,
            name: "Punktuate",
            description: "The Phoolish Concert by Apurva Bondre",
            image: "17-removebg-preview.png",
            order_id: order.id,
            config: {
                display: {
                    blocks: {
                        upi: {
                            name: "UPI / QR Code",
                            instruments: [
                                { method: "upi" }
                            ]
                        },
                        other: {
                            name: "Other Payment Methods",
                            instruments: [
                                { method: "card" },
                                { method: "netbanking" },
                                { method: "wallet" },
                                { method: "paylater" }
                            ]
                        }
                    },
                    sequence: ["block.upi", "block.other"],
                    preferences: {
                        show_default_blocks: true
                    }
                }
            },
            handler: async function (response) {
                if (payButton) payButton.innerHTML = '<i class="fas fa-check mr-2"></i> Verifying...';
                // 3. Verify payment on backend
                try {
                    const verifyResponse = await fetch(`${API_URL}/verify-payment`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            ticketDetails: {
                                type: ticketType,
                                qty: quantity,
                                amount: order.amount / 100,
                                customer: customerDetails
                            }
                        })
                    });

                    const verifyData = await verifyResponse.json();

                    if (verifyData.status === 'success') {
                        const booking = verifyData.booking;
                        // Construct URL with parameters for success page
                        const params = new URLSearchParams({
                            orderId: booking.orderId,
                            paymentId: booking.paymentId,
                            type: booking.ticketType,
                            qty: booking.quantity,
                            amount: booking.amount,
                            name: booking.customer.name
                        });
                        window.location.href = `success.html?${params.toString()}`;
                    } else {
                        throw new Error(verifyData.message || 'Payment verification failed');
                    }
                } catch (error) {
                    console.error('Verification Error:', error);
                    window.location.href = 'failed.html';
                }
            },
            prefill: {
                name: customerDetails.name,
                email: customerDetails.email,
                contact: customerDetails.phone
            },
            notes: {
                address: "Mumbai, India",
                event: "The Phoolish Concert"
            },
            theme: {
                color: "#D4AF37"
            },
            modal: {
                ondismiss: function() {
                    console.log('Payment modal closed by user');
                    if (payButton) {
                        payButton.disabled = false;
                        payButton.innerHTML = originalContent;
                    }
                }
            }
        };

        const rzp = new Razorpay(options);
        rzp.on('payment.failed', function (response) {
            console.error('Payment Failed:', response.error);
            window.location.href = 'failed.html';
        });
        rzp.open();

    } catch (error) {
        console.error('Payment Initialization Error:', error);
        alert('Unable to start payment. ' + error.message);
        if (payButton) {
            payButton.disabled = false;
            payButton.innerHTML = originalContent;
        }
    }
}
