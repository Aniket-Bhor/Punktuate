/**
 * js/payment.js
 * ─────────────────────────────────────────────────────────────
 * Ticket selection, Razorpay Standard Checkout (server-side
 * order creation + signature verification), early-bird timer.
 *
 * NEVER puts RAZORPAY_KEY_SECRET in this file.
 * Key ID is fetched from GET /api/config at startup.
 * ─────────────────────────────────────────────────────────────
 */

/* ── Razorpay Key ID (fetched from server, never hardcoded) ─── */
let RAZORPAY_KEY_ID = '';

async function initPaymentConfig() {
    try {
        const res  = await fetch('/api/config');
        const conf = await res.json();
        RAZORPAY_KEY_ID = conf.razorpayKeyId || '';
    } catch (e) {
        console.warn('Could not fetch /api/config — Razorpay Key ID not set.');
    }
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

/* ── Ticket Selection ────────────────────────────────────────── */

function selectTicket(type, price) {
    const today     = new Date();
    const closeDate = new Date('2026-05-15');

    if (type === 'early-bird' && today > closeDate) {
        alert('Early Bird tickets are closed. Please select Regular or VIP.');
        return;
    }

    // Reset all ticket cards
    document.querySelectorAll('.ticket-card').forEach(card => {
        card.classList.remove('selected');
        const selectBtn  = card.querySelector('.select-btn');
        const proceedBtn = card.querySelector('.proceed-btn');
        if (selectBtn) {
            selectBtn.classList.remove('hidden');
            selectBtn.innerText = card.id === 'tier-vip' ? 'Upgrade Now' : 'Select';
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
    showPage('payment-details');
}

function proceedToRazorpay() {
    customerData = {
        name:  document.getElementById('cust-name')?.value  || '',
        age:   document.getElementById('cust-age')?.value   || '',
        phone: document.getElementById('cust-phone')?.value || '',
        email: document.getElementById('cust-email')?.value || '',
        city:  document.getElementById('cust-city')?.value  || '',
    };
    showPage(`payment-${ticketSelectionState.type}`);
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

async function verifyAndConfirm(paymentResponse) {
    try {
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

    showPage('success-page');

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

    if (window.lucide) lucide.createIcons();
}

/* ── Scroll To Booking ──────────────────────────────────────── */
function scrollToBooking() {
    const section = document.getElementById('booking-section');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
}

/* ── Early-bird Countdown ───────────────────────────────────── */
function startEarlyBirdCountdown() {
    const countDownDate = new Date('May 15, 2026 23:59:59').getTime();
    const timerEl       = document.getElementById('early-bird-timer');
    if (!timerEl) return;

    const tick = setInterval(() => {
        const distance = countDownDate - Date.now();
        if (distance < 0) {
            clearInterval(tick);
            timerEl.innerHTML = 'EXPIRED';
            const ebCard = document.getElementById('tier-early-bird');
            const ebBtn  = document.getElementById('btn-early-bird');
            if (ebCard) ebCard.classList.add('opacity-50', 'grayscale', 'pointer-events-none');
            if (ebBtn)  ebBtn.innerText = 'Early Bird Closed';
            return;
        }
        const d = Math.floor(distance / 86_400_000);
        const h = Math.floor((distance % 86_400_000) / 3_600_000);
        const m = Math.floor((distance % 3_600_000) / 60_000);
        const s = Math.floor((distance % 60_000) / 1_000);
        timerEl.innerHTML = `${d}d ${h}h ${m}m ${s}s left`;
    }, 1000);
}
