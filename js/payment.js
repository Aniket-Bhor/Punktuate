/**
 * js/payment.js
 * ─────────────────────────────────────────────────────────────
 * Ticket selection, Razorpay Standard Checkout (server-side
 * order creation + signature verification), Early Bird logic,
 * and EmailJS integration.
 *
 * NEVER puts RAZORPAY_KEY_SECRET in this file.
 * Key ID is fetched from GET /api/config at startup.
 * ─────────────────────────────────────────────────────────────
 */

/* ── Razorpay Key ID (fetched from server, never hardcoded) ─── */
let RAZORPAY_KEY_ID = '';

/* ── EmailJS Configuration ────────────────────────────────────── */
const EMAILJS_SERVICE_ID = 'service_l78xmfs';
const EMAILJS_TEMPLATE_ID = 'template_9ohm4wb';
const EMAILJS_PUBLIC_KEY = '7FfjlSx153cbVbZyr';

async function initPaymentConfig() {
    try {
        const res  = await fetch('/api/config');
        const conf = await res.json();
        RAZORPAY_KEY_ID = conf.razorpayKeyId || '';
        
        // Initialize EmailJS
        if (typeof emailjs !== 'undefined') {
            emailjs.init(EMAILJS_PUBLIC_KEY);
        }
    } catch (e) {
        console.warn('Could not fetch /api/config — Razorpay Key ID not set.');
    }
    
    // Initialize ticket state
    await initTicketState();
}

// Kick off on load
initPaymentConfig();

/* ── State ──────────────────────────────────────────────────── */

let ticketSelectionState = {
    selected: false,
    type:     null,
    price:    0,
    qty:      1,
    name:     ''
};

let customerData = {
    name: '', age: '', phone: '', email: '', city: ''
};

let earlyBirdState = {
    count: 0,
    max: 15,
    active: true
};

/* ── Initialize Ticket State ─────────────────────────────────── */
async function initTicketState() {
    try {
        const res = await fetch('/api/early-bird-count');
        const data = await res.json();
        earlyBirdState.count = data.count;
        earlyBirdState.max = data.max;
        earlyBirdState.active = data.count < data.max;
        
        updateTicketUI();
    } catch (e) {
        console.warn('Could not fetch early bird count:', e);
        // Default to active if API fails
        earlyBirdState.active = true;
        updateTicketUI();
    }
}

/* ── Update Ticket UI ────────────────────────────────────────── */
function updateTicketUI() {
    const ebCard = document.getElementById('tier-early-bird');
    const ebBtn = document.getElementById('btn-early-bird');
    const ebPrice = document.getElementById('early-bird-price');
    const ebUrgency = document.getElementById('early-bird-urgency');
    
    const regCard = document.getElementById('tier-regular');
    const regBtn = document.getElementById('btn-regular');
    const regPrice = document.getElementById('regular-price');
    const regOriginalPrice = document.getElementById('regular-original-price');
    
    if (earlyBirdState.active) {
        // Early Bird active
        if (ebCard) {
            ebCard.classList.remove('opacity-50', 'grayscale', 'pointer-events-none');
            ebCard.onclick = () => selectTicket('early-bird', 299);
        }
        if (ebBtn) {
            ebBtn.innerText = 'Select';
            ebBtn.onclick = () => selectTicket('early-bird', 299);
        }
        if (ebPrice) ebPrice.innerText = '₹299';
        if (ebUrgency) {
            const urgencies = ['Filling Fast ✨', 'Limited Early Bird Access', 'High Demand'];
            ebUrgency.innerText = urgencies[Math.floor(Math.random() * urgencies.length)];
        }
        
        // Regular disabled
        if (regCard) {
            regCard.classList.add('opacity-50', 'grayscale', 'pointer-events-none');
        }
        if (regBtn) {
            regBtn.innerText = 'Select';
        }
        if (regPrice) regPrice.innerText = '₹499';
        if (regOriginalPrice) regOriginalPrice.classList.add('hidden');
    } else {
        // Early Bird sold out
        if (ebCard) {
            ebCard.classList.add('opacity-50', 'grayscale', 'pointer-events-none');
            ebCard.onclick = null;
        }
        if (ebBtn) {
            ebBtn.innerText = 'SOLD OUT';
            ebBtn.onclick = null;
        }
        if (ebPrice) ebPrice.innerText = '₹299';
        if (ebUrgency) ebUrgency.innerText = 'Sold Out';
        
        // Regular enabled
        if (regCard) {
            regCard.classList.remove('opacity-50', 'grayscale', 'pointer-events-none');
            regCard.onclick = () => selectTicket('regular', 499);
        }
        if (regBtn) {
            regBtn.innerText = 'Select';
            regBtn.onclick = () => selectTicket('regular', 499);
        }
        if (regPrice) regPrice.innerText = '₹499';
        if (regOriginalPrice) {
            regOriginalPrice.classList.add('hidden');
        }
    }
}

/* ── Ticket Selection ────────────────────────────────────────── */

function selectTicket(type, price) {
    // Validate ticket type based on early bird state
    if (type === 'early-bird' && !earlyBirdState.active) {
        alert('Early Bird tickets are sold out. Please select Regular.');
        return;
    }
    if (type === 'regular' && earlyBirdState.active) {
        alert('Early Bird tickets are still available. Regular tickets will be available once Early Bird sells out.');
        return;
    }

    // Reset all ticket cards
    document.querySelectorAll('.ticket-card').forEach(card => {
        card.classList.remove('selected');
        const selectBtn  = card.querySelector('.select-btn');
        const proceedBtn = card.querySelector('.proceed-btn');
        if (selectBtn) {
            selectBtn.classList.remove('hidden');
        }
        if (proceedBtn) proceedBtn.classList.add('hidden');
    });

    // Highlight selected
    const selectedCard = document.getElementById(`tier-${type}`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
        const selectBtn  = selectedCard.querySelector('.select-btn');
        const proceedBtn = selectedCard.querySelector('.proceed-btn');
        if (selectBtn)  selectBtn.classList.add('hidden');
        if (proceedBtn) proceedBtn.classList.remove('hidden');
    }

    ticketSelectionState = {
        selected: true,
        type,
        name:  type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ') + ' Ticket',
        price,
        qty:   1,
    };

    const bookingFlow = document.getElementById('booking-flow');
    if (bookingFlow) {
        bookingFlow.classList.remove('hidden');
        bookingFlow.style.display = 'block';
        bookingFlow.classList.remove('animate-slide-up');
        void bookingFlow.offsetWidth;
        bookingFlow.classList.add('animate-slide-up');
        updateBookingSummary();
    }
}

function buyNow(event, type, price) {
    if (event) event.stopPropagation();
    selectTicket(type, price);
    showRazorpayPage();
}

function closeBookingFlow() {
    const bookingFlow = document.getElementById('booking-flow');
    if (bookingFlow) {
        bookingFlow.classList.add('hidden');
        bookingFlow.style.display = 'none';
    }
    document.querySelectorAll('.ticket-card').forEach(card => {
        card.classList.remove('selected');
    });
    ticketSelectionState = { selected: false, type: null, price: 0, qty: 1, name: '' };
}

/* ── Quantity & Summary ─────────────────────────────────────── */

function updateQty(delta) {
    ticketSelectionState.qty = Math.max(1, ticketSelectionState.qty + delta);
    updateBookingSummary();
}

function updateBookingSummary() {
    const qtyEl   = document.getElementById('ticket-qty');
    const priceEl = document.getElementById('total-price');
    const nameEl  = document.getElementById('selected-ticket-name');
    if (qtyEl)   qtyEl.innerText   = ticketSelectionState.qty;
    if (priceEl) priceEl.innerText = ticketSelectionState.price * ticketSelectionState.qty;
    if (nameEl)  nameEl.innerText  = ticketSelectionState.name;
}

/* ── Payment Flow ───────────────────────────────────────────── */

function showRazorpayPage() {
    if (!ticketSelectionState.selected) {
        alert('Please select a ticket tier first.');
        return;
    }
    const bookingFlow = document.getElementById('booking-flow');
    if (bookingFlow) {
        bookingFlow.classList.add('hidden');
        bookingFlow.style.display = 'none';
    }
    router.navigate('payment-details');
}

function proceedToRazorpay() {
    customerData = {
        name:  document.getElementById('cust-name')?.value  || '',
        age:   document.getElementById('cust-age')?.value   || '',
        phone: document.getElementById('cust-phone')?.value || '',
        email: document.getElementById('cust-email')?.value || '',
        city:  document.getElementById('cust-city')?.value  || '',
    };
    // Map type to router page id (early-bird → payment-earlybird)
    const pageId = `payment-${ticketSelectionState.type.replace('-', '')}`;
    router.navigate(pageId);

    // Update summary elements once the page is injected
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            const type = ticketSelectionState.type.replace('-', '');
            const summaryName  = document.getElementById(`payment-${type}-ticket-name`);
            const summaryQty   = document.getElementById(`payment-${type}-ticket-qty`);
            const summaryTotal = document.getElementById(`payment-${type}-total-price`);
            if (summaryName)  summaryName.innerText  = ticketSelectionState.name;
            if (summaryQty)   summaryQty.innerText   = ticketSelectionState.qty;
            if (summaryTotal) summaryTotal.innerText = ticketSelectionState.price * ticketSelectionState.qty;
        });
    });
}

async function checkout(tier, event) {
    if (event) event.preventDefault();
    if (!ticketSelectionState.selected) {
        alert('Please select a ticket tier first.');
        return;
    }
    await startPayment();
}

/* ── Razorpay Checkout (server-side order) ───────────────────── */

async function startPayment() {
    if (typeof Razorpay === 'undefined') {
        alert('Razorpay SDK not loaded. Please refresh the page and try again.');
        return;
    }

    const totalPaise = ticketSelectionState.price * ticketSelectionState.qty * 100;

    let order;
    try {
        const res = await fetch('/api/create-order', {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                amount:  totalPaise,
                currency: 'INR',
                receipt: `rcpt_${customerData.phone || Date.now()}`,
            }),
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.error || `HTTP ${res.status}`);
        }
        order = await res.json();
    } catch (err) {
        console.error('Order creation failed:', err);
        alert(`Could not initiate payment: ${err.message}`);
        return;
    }

    const options = {
        key:         RAZORPAY_KEY_ID,
        amount:      order.amount,
        currency:    order.currency,
        order_id:    order.order_id,
        name:        'Punktuate',
        description: `${ticketSelectionState.name} — The Phoolish Concert`,
        image:       '17-removebg-preview.png',
        prefill: {
            name:    customerData.name,
            email:   customerData.email,
            contact: customerData.phone,
        },
        theme: { color: '#D4AF37' },
        handler: async function(response) {
            await verifyAndConfirm(response);
        },
        modal: {
            ondismiss: function() {
                console.log('Payment cancelled by user.');
            },
        },
    };

    const rzp = new Razorpay(options);

    rzp.on('payment.failed', function(response) {
        console.error('Payment failed:', response.error);
        alert(`Payment failed: ${response.error.description}`);
    });

    rzp.open();
}

/* ── Verify + Confirm ───────────────────────────────────────── */

let processedPaymentIds = new Set();

async function verifyAndConfirm(paymentResponse) {
    try {
        // Prevent duplicate processing
        if (processedPaymentIds.has(paymentResponse.razorpay_payment_id)) {
            console.log('Payment already processed:', paymentResponse.razorpay_payment_id);
            return;
        }
        processedPaymentIds.add(paymentResponse.razorpay_payment_id);

        const res = await fetch('/api/verify-payment', {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                razorpay_order_id:   paymentResponse.razorpay_order_id,
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_signature:  paymentResponse.razorpay_signature,
                customerData,
                ticketInfo: {
                    type:     ticketSelectionState.type,
                    name:     ticketSelectionState.name,
                    price:    ticketSelectionState.price,
                    quantity: ticketSelectionState.qty,
                    total:    ticketSelectionState.price * ticketSelectionState.qty,
                },
            }),
        });

        const result = await res.json();

        if (!res.ok || !result.success) {
            throw new Error(result.error || 'Verification failed');
        }

        // Send confirmation email via EmailJS
        if (typeof emailjs !== 'undefined') {
            try {
                await emailjs.send(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_TEMPLATE_ID,
                    {
                        name: customerData.name,
                        email: customerData.email,
                        ticket_type: ticketSelectionState.name,
                        amount: ticketSelectionState.price * ticketSelectionState.qty
                    }
                );
                console.log('Email sent successfully');
            } catch (emailErr) {
                console.error('EmailJS error:', emailErr);
                // Don't fail the whole flow if email fails
            }
        }

        confirmPayment(paymentResponse.razorpay_payment_id);
    } catch (err) {
        console.error('Verification error:', err);
        alert(`Payment verification failed: ${err.message}. Please contact support with your order details.`);
    }
}

function confirmPayment(paymentId) {
    const successInfo = document.getElementById('success-ticket-info');
    if (successInfo) {
        successInfo.innerText = `${ticketSelectionState.qty}× ${ticketSelectionState.name}`;
    }

    // Update success message
    const successMessage = document.getElementById('success-message');
    if (successMessage) {
        successMessage.innerHTML = `
            <p class="text-white/60 text-lg mb-4">Your booking has been confirmed.</p>
            <p class="text-white/60 text-lg mb-4">A confirmation email has been sent successfully.</p>
            <p class="text-white/60 text-lg">Your official event ticket will be delivered within 24 hours.</p>
        `;
    }

    router.navigate('success-page');

    if (typeof confetti === 'function') {
        confetti({
            particleCount: 200,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#D4AF37', '#ffffff', '#000B3D'],
        });
    }

    // Reset state
    ticketSelectionState = { selected: false, type: null, price: 0, qty: 1, name: '' };
    customerData = { name: '', age: '', phone: '', email: '', city: '' };

    const bookingFlow = document.getElementById('booking-flow');
    if (bookingFlow) bookingFlow.classList.add('hidden');

    // Refresh ticket state
    initTicketState();

    if (window.lucide) lucide.createIcons();
}

/* ── Scroll To Booking ──────────────────────────────────────── */
function scrollToBooking() {
    const section = document.getElementById('booking-section');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
}
