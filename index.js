/* --- Data Structures --- */
const founderData = {
    arya: {
        name: "Arya Pawar",
        title: "Co-Founder, Punktuate",
        image: "aryapic.png",
        bio: `
            <ul class="space-y-8 text-white/70 text-lg leading-relaxed">
                <li>
                    <strong class="text-white block text-xl mb-2">• Founder, Westelle & Co.</strong>
                    Leading an event and brand collaboration venture, creating experiences backed by strong execution and creative strategy
                </li>
                <li>
                    <strong class="text-white block text-xl mb-2">• Charter President, Rotaract Club of Thane Royales</strong>
                    Built the club from the ground up, leading impactful initiatives and fostering a strong culture of leadership and service (Non profit organisation)
                </li>
                <li>
                    <strong class="text-white block text-xl mb-2">• Charter President, Rotaract Club of Hiranandani Legends</strong>
                    Played a key role in establishing the club, contributing to its vision, growth, and early-stage initiatives (Non profit organisation)
                </li>
                <li>
                    <strong class="text-white block text-xl mb-2">• Brand Collaborations & Campaigns</strong>
                    Worked with brands like Timbuckdo, HyugaLife, Swiggy, and Molten, executing campaigns and partnerships end-to-end
                </li>
                <li>
                    <strong class="text-white block text-xl mb-2">• Community Impact & Service</strong>
                    Organised multiple community service events, engaging and connecting with 60+ children through meaningful initiatives
                </li>
                <li>
                    <strong class="text-white block text-xl mb-2">• Execution-Driven & Systems Focused</strong>
                    Building reliable systems across events and influencer marketing to ensure consistency, clarity, and scalable impact
                </li>
            </ul>
        `
    },
    avanti: {
        name: "Avanti Thakur",
        title: "Co-Founder, Punktuate",
        image: "_ASH7503.jpeg",
        bio: `
            <p class="text-white/70 text-xl italic text-center py-20">Details will be updated soon.</p>
        `
    }
};

const portfolioData = {
    social: {
        title: "Techpaathshala",
        subtitle: "Scaling digital education through high-impact social strategy.",
        content: `
            <div class="space-y-8">
                <div class="grid md:grid-cols-2 gap-8">
                    <div class="portfolio-graphic group" onclick="animateBars()">
                        <h4 class="text-[#D4AF37] font-bold mb-4 uppercase text-sm tracking-widest">Growth Metrics</h4>
                        <div class="space-y-6">
                            <div>
                                <div class="flex justify-between text-xs mb-1 uppercase text-white/40 font-bold"><span>Reach Growth</span><span>+450%</span></div>
                                <div class="interactive-bar"><div class="bar-fill" style="width: 92%"></div></div>
                            </div>
                            <div>
                                <div class="flex justify-between text-xs mb-1 uppercase text-white/40 font-bold"><span>Engagement</span><span>10x</span></div>
                                <div class="interactive-bar"><div class="bar-fill" style="width: 85%"></div></div>
                            </div>
                            <div>
                                <div class="flex justify-between text-xs mb-1 uppercase text-white/40 font-bold"><span>Conversions</span><span>+120%</span></div>
                                <div class="interactive-bar"><div class="bar-fill" style="width: 78%"></div></div>
                            </div>
                        </div>
                        <p class="text-[10px] text-white/20 mt-4 uppercase font-bold italic">Click card to re-animate</p>
                    </div>
                    <div class="glass p-8 rounded-[30px] border border-[#D4AF37]/30 bg-[#D4AF37]/5">
                        <h4 class="text-[#D4AF37] font-bold mb-4 uppercase">Key Results</h4>
                        <ul class="space-y-3 text-white/80">
                            <li class="flex items-center gap-2"><i class="bx bx-trending-up text-[#D4AF37]"></i> 5M+ reach across Meta</li>
                            <li class="flex items-center gap-2"><i class="bx bx-user-plus text-[#D4AF37]"></i> 500+ followers growth</li>
                            <li class="flex items-center gap-2"><i class="bx bx-play-circle text-[#D4AF37]"></i> 1 trending reel</li>
                        </ul>
                    </div>
                </div>
                <div class="glass p-8 rounded-[30px] border border-white/10">
                    <h4 class="text-[#D4AF37] font-bold mb-4 uppercase">Scope of Work</h4>
                    <ul class="grid md:grid-cols-2 gap-4 text-white/40">
                        <li class="flex items-center gap-2 hover:text-white transition-all cursor-default"><i class="bx bx-chevron-right text-[#D4AF37]"></i> Platform-specific strategy</li>
                        <li class="flex items-center gap-2 hover:text-white transition-all cursor-default"><i class="bx bx-chevron-right text-[#D4AF37]"></i> Copywriting & Scripts</li>
                        <li class="flex items-center gap-2 hover:text-white transition-all cursor-default"><i class="bx bx-chevron-right text-[#D4AF37]"></i> Content Calendars</li>
                        <li class="flex items-center gap-2 hover:text-white transition-all cursor-default"><i class="bx bx-chevron-right text-[#D4AF37]"></i> Culture-led Storytelling</li>
                    </ul>
                </div>
            </div>
        `
    },
    ugc: {
        title: "Swiggy & Molten",
        subtitle: "UGC-based campaigns and creator coordination.",
        content: `
            <div class="space-y-8">
                <div class="portfolio-graphic text-center group">
                    <h4 class="text-[#D4AF37] font-bold mb-8 uppercase text-sm tracking-widest">Creator Pipeline</h4>
                    <div class="flex justify-center items-center gap-4">
                        <div class="w-16 h-16 rounded-full glass flex items-center justify-center border border-white/10 group-hover:border-[#D4AF37] transition-all"><i class="bx bx-user text-2xl"></i></div>
                        <div class="w-12 h-[2px] bg-white/10"></div>
                        <div class="w-16 h-16 rounded-full bg-[#D4AF37]/20 flex items-center justify-center border border-[#D4AF37]/50 group-hover:scale-110 transition-all"><i class="bx bx-movie text-2xl text-[#D4AF37]"></i></div>
                        <div class="w-12 h-[2px] bg-white/10"></div>
                        <div class="w-16 h-16 rounded-full glass flex items-center justify-center border border-white/10 group-hover:border-[#D4AF37] transition-all"><i class="bx bx-cart text-2xl"></i></div>
                    </div>
                    <div class="flex justify-between mt-4 px-4 text-[10px] uppercase font-bold text-white/20">
                        <span>Briefing</span>
                        <span>Production</span>
                        <span>Conversion</span>
                    </div>
                </div>
                <div class="glass p-8 rounded-[30px] border border-white/10">
                    <h4 class="text-[#D4AF37] font-bold mb-4 uppercase">Campaign Impact</h4>
                    <div class="grid md:grid-cols-2 gap-6">
                        <div class="space-y-4">
                            <h5 class="text-white font-bold italic">Strategy</h5>
                            <ul class="space-y-2 text-white/40 text-sm">
                                <li>• Supported UGC-based campaigns</li>
                                <li>• Coordinated with creators & influencers</li>
                                <li>• Assisted in improving visibility</li>
                            </ul>
                        </div>
                        <div class="space-y-4">
                            <h5 class="text-white font-bold italic">Brands</h5>
                            <div class="flex flex-wrap gap-4">
                                <span class="px-4 py-2 glass rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#D4AF37] hover:text-[#000B3D] transition-all cursor-pointer">Swiggy</span>
                                <span class="px-4 py-2 glass rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#D4AF37] hover:text-[#000B3D] transition-all cursor-pointer">Molten</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    fashion: {
        title: "Fashion Dekho",
        subtitle: "Lifestyle content creation and visual storytelling.",
        content: `
            <div class="space-y-8">
                <div class="grid md:grid-cols-2 gap-8">
                    <div class="portfolio-graphic group overflow-hidden">
                        <h4 class="text-[#D4AF37] font-bold mb-4 uppercase text-sm tracking-widest">Brand Aesthetic</h4>
                        <div class="flex gap-2">
                            <div class="flex-1 aspect-[3/4] glass rounded-lg group-hover:scale-105 transition-all"></div>
                            <div class="flex-1 aspect-[3/4] bg-[#D4AF37]/10 rounded-lg group-hover:scale-95 transition-all border border-[#D4AF37]/30"></div>
                            <div class="flex-1 aspect-[3/4] glass rounded-lg group-hover:scale-105 transition-all"></div>
                        </div>
                        <p class="text-[10px] text-white/20 mt-4 uppercase font-bold italic">Curated Visual Language</p>
                    </div>
                    <div class="glass p-8 rounded-[30px] border border-white/10">
                        <h4 class="text-[#D4AF37] font-bold mb-4 uppercase">Visual Tone</h4>
                        <ul class="space-y-4 text-white/60">
                            <li class="flex items-start gap-3 hover:translate-x-2 transition-all cursor-default">
                                <i class="bx bx-check-circle text-[#D4AF37] mt-1"></i>
                                <span><strong>Content Creation:</strong> Production tailored for lifestyle audiences.</span>
                            </li>
                            <li class="flex items-start gap-3 hover:translate-x-2 transition-all cursor-default">
                                <i class="bx bx-check-circle text-[#D4AF37] mt-1"></i>
                                <span><strong>Brand Integrity:</strong> Maintained tone & visuals across digital.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        `
    },
    page_mgmt: {
        title: "Herwa Miss & Mrs India",
        subtitle: "Page management and high-profile brand coordination.",
        content: `
            <div class="space-y-8">
                <div class="portfolio-graphic group flex items-center justify-between">
                    <div class="space-y-2">
                        <h4 class="text-3xl font-black text-white/10 group-hover:text-[#D4AF37] transition-all leading-none">HERWA</h4>
                        <p class="text-[10px] uppercase tracking-widest text-white/20 font-bold italic">National Pageant</p>
                    </div>
                    <div class="w-16 h-16 rounded-full glass border border-white/10 flex items-center justify-center group-hover:rotate-[360deg] transition-all duration-1000">
                        <i class="bx bx-crown text-3xl text-[#D4AF37]"></i>
                    </div>
                </div>
                <div class="glass p-8 rounded-[30px] border border-white/10">
                    <h4 class="text-[#D4AF37] font-bold mb-4 uppercase">The Impact</h4>
                    <ul class="grid md:grid-cols-2 gap-4 text-white/40">
                        <li class="flex items-center gap-2"><i class="bx bx-check text-[#D4AF37]"></i> Social visibility</li>
                        <li class="flex items-center gap-2"><i class="bx bx-check text-[#D4AF37]"></i> Content support</li>
                        <li class="flex items-center gap-2"><i class="bx bx-check text-[#D4AF37]"></i> Event coordination</li>
                        <li class="flex items-center gap-2"><i class="bx bx-check text-[#D4AF37]"></i> Cycle execution</li>
                    </ul>
                </div>
            </div>
        `
    },
    consulting: {
        title: "Consulting & Audits",
        subtitle: "Strategic clarity for brands that need direction.",
        content: `
            <div class="space-y-8">
                <div class="portfolio-graphic group text-center py-12">
                    <i class="bx bx-search-alt text-6xl text-[#D4AF37] mb-6 opacity-40 group-hover:scale-125 group-hover:opacity-100 transition-all"></i>
                    <h4 class="text-xl font-bold uppercase tracking-widest text-white/60">Brand Diagnosis</h4>
                    <p class="text-xs text-white/20 mt-2 font-bold italic">"We see what others miss."</p>
                </div>
                <div class="grid md:grid-cols-2 gap-6">
                    <div class="glass p-8 rounded-[30px] border border-white/10 hover:border-[#D4AF37]/50 transition-all">
                        <h4 class="text-[#D4AF37] font-bold mb-4 uppercase">Core Services</h4>
                        <ul class="space-y-3 text-white/40">
                            <li class="hover:text-white transition-all">• Brand & social audits</li>
                            <li class="hover:text-white transition-all">• 1:1 strategy sessions</li>
                            <li class="hover:text-white transition-all">• Fix-my-content</li>
                            <li class="hover:text-white transition-all">• Team workshops</li>
                        </ul>
                    </div>
                    <div class="glass p-8 rounded-[30px] border border-[#D4AF37]/20">
                        <h4 class="text-[#D4AF37] font-bold mb-4 uppercase">The Goal</h4>
                        <p class="text-white/40">To move brands away from random acts of marketing and toward a cohesive, high-performance strategy.</p>
                    </div>
                </div>
            </div>
        `
    }
};

/* --- Global Variables --- */
let selectedTicket = { name: '', price: 0, qty: 1 };
let customerData = { name: '', age: '', phone: '', email: '', city: '' };

/* --- Firebase Database Initialization --- */
// Replace with your actual Firebase config
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "punktuate-payments.firebaseapp.com",
    projectId: "punktuate-payments",
    storageBucket: "punktuate-payments.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase (Compatibility mode)
let db;
try {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    console.log("Database initialized successfully.");
} catch (error) {
    console.warn("Database initialization skipped. Ensure Firebase config is valid.", error);
}

/* --- Konami Code & Warp Animation --- */
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiBuffer = [];
let warpActive = false;
let points = [];
let warpCanvas, ctx;

function initWarp() {
    warpCanvas = document.getElementById('warpCanvas');
    if (!warpCanvas) return;
    ctx = warpCanvas.getContext('2d');
    warpCanvas.width = window.innerWidth;
    warpCanvas.height = window.innerHeight;
    points = [];
    for (let i = 0; i < 500; i++) {
        points.push({
            x: Math.random() * warpCanvas.width - warpCanvas.width / 2,
            y: Math.random() * warpCanvas.height - warpCanvas.height / 2,
            z: Math.random() * warpCanvas.width
        });
    }
}

function drawWarp() {
    if (!warpActive) return;
    ctx.fillStyle = 'rgba(0, 11, 61, 0.2)';
    ctx.fillRect(0, 0, warpCanvas.width, warpCanvas.height);
    
    ctx.translate(warpCanvas.width / 2, warpCanvas.height / 2);
    
    points.forEach(p => {
        p.z -= 15;
        if (p.z <= 0) p.z = warpCanvas.width;
        
        const x = p.x * (warpCanvas.width / p.z);
        const y = p.y * (warpCanvas.width / p.z);
        const s = Math.min(10, 500 / p.z);
        
        ctx.fillStyle = `rgba(212, 175, 55, ${1 - p.z / warpCanvas.width})`;
        if (Math.random() > 0.5) {
            ctx.beginPath();
            ctx.arc(x, y, s / 2, 0, Math.PI * 2);
            ctx.fill();
        } else {
            ctx.font = `${s * 2}px Inter`;
            ctx.fillText('!', x, y);
        }
    });
    
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    requestAnimationFrame(drawWarp);
}

function closeKonami() {
    const overlay = document.getElementById('konamiOverlay');
    if (overlay) overlay.style.display = 'none';
    warpActive = false;
}

/* --- Easter Egg: Logo Clicks --- */
let logoClicks = 0;
function handleLogoClick() {
    logoClicks++;
    if (logoClicks === 3) {
        document.body.classList.add('gold-mode');
        setTimeout(() => {
            document.body.classList.remove('gold-mode');
            logoClicks = 0;
        }, 3000);
    }
}

/* --- UI Interaction Helpers --- */
function updateBookingSummary() {
    const nameEl = document.getElementById('selected-ticket-name');
    const qtyEl = document.getElementById('ticket-qty');
    const totalEl = document.getElementById('total-price');
    
    if (nameEl) nameEl.innerText = selectedTicket.name;
    if (qtyEl) qtyEl.innerText = selectedTicket.qty;
    if (totalEl) totalEl.innerText = selectedTicket.price * selectedTicket.qty;
}

function updateQty(change) {
    selectedTicket.qty = Math.max(1, selectedTicket.qty + change);
    updateBookingSummary();
}

function openFounderModal(id) {
    const data = founderData[id];
    const modal = document.getElementById('founderModal');
    const body = document.getElementById('modalBody');
    
    if (!data || !modal || !body) return;
    
    body.innerHTML = `
        <div class="flex flex-col md:flex-row gap-12 items-center md:items-start">
            <div class="w-48 h-48 rounded-[40px] overflow-hidden shadow-2xl border-4 border-[#D4AF37]/20 flex-shrink-0">
                <img src="${data.image}" class="w-full h-full object-cover">
            </div>
            <div class="flex-grow">
                <h2 class="text-4xl font-black uppercase mb-2">${data.name}</h2>
                <p class="text-[#D4AF37] luxury-caption text-[12px] font-bold mb-10 tracking-[0.2em]">${data.title}</p>
                <div class="h-[1px] bg-white/10 mb-10"></div>
                ${data.bio}
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    lucide.createIcons();
}

function openPortfolioModal(id) {
    const data = portfolioData[id];
    const modal = document.getElementById('founderModal');
    const body = document.getElementById('modalBody');
    
    if (!data || !modal || !body) return;
    
    body.innerHTML = `
        <div class="mb-12">
            <h2 class="text-5xl font-black uppercase mb-4 leading-tight">${data.title}</h2>
            <p class="text-[#D4AF37] luxury-caption text-[14px] font-bold tracking-[0.2em]">${data.subtitle}</p>
        </div>
        <div class="h-[1px] bg-white/10 mb-12"></div>
        ${data.content}
    `;
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    lucide.createIcons();
    
    // Trigger bar animations if they exist
    setTimeout(animateBars, 500);
}

function closeFounderModal() {
    const modal = document.getElementById('founderModal');
    if (modal) modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function animateBars() {
    const bars = document.querySelectorAll('.bar-fill');
    bars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

const EMAILJS_PUBLIC_KEY = '7FfjlSx153cbVbZyr';
const EMAILJS_SERVICE_ID = 'service_izzdi9q';
const EMAILJS_TEMPLATE_ID = 'template_ifo088f';

emailjs.init(EMAILJS_PUBLIC_KEY);

function handleInquiry(event) {
    event.preventDefault();
    
    const form = document.getElementById('inquiryForm');
    const submitBtn = document.getElementById('submitBtn');
    const submitText = document.getElementById('submitText');
    const submitSpinner = document.getElementById('submitSpinner');
    const formMessages = document.getElementById('form-messages');
    
    formMessages.innerHTML = '';
    submitBtn.disabled = true;
    submitText.textContent = 'Sending...';
    submitSpinner.classList.remove('hidden');
    
    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
        .then((response) => {
            console.log('Email sent successfully:', response);
            
            formMessages.innerHTML = `
                <div class="form-message success">
                    <i class="fas fa-check-circle mr-3"></i>
                    Thank you! Your proposal has been sent successfully.
                </div>
            `;
            
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.5 },
                    colors: ['#D4AF37', '#ffffff', '#000B3D']
                });
            }
            
            form.reset();
        })
        .catch((error) => {
            console.error('EmailJS error:', error);
            
            formMessages.innerHTML = `
                <div class="form-message error">
                    <i class="fas fa-exclamation-circle mr-3"></i>
                    Oops! Something went wrong. Please try again later.
                </div>
            `;
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitText.textContent = 'Send Proposal';
            submitSpinner.classList.add('hidden');
        });
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const icon = document.getElementById('menu-icon');
    
    if (!menu || !icon) return;
    
    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        menu.classList.add('flex');
        icon.setAttribute('data-lucide', 'x');
        document.body.style.overflow = 'hidden';
    } else {
        menu.classList.add('hidden');
        menu.classList.remove('flex');
        icon.setAttribute('data-lucide', 'menu');
        document.body.style.overflow = 'auto';
    }
    lucide.createIcons();
}

/* --- Page Navigation Logic --- */
function showPage(pageId) {
    // State Protection: Prevent direct access to payment pages without selection
    if (pageId.startsWith('payment-') && !ticketSelectionState.selected) {
        console.warn("Access denied to payment page: No ticket selected.");
        showPage('event-apurva'); // Redirect back to event page
        return;
    }

    // 1. Hide all pages by removing the 'active' class
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // 2. Show the target page by adding the 'active' class
    const target = document.getElementById(pageId);
    if (target) {
        target.classList.add('active');
    }

    // 3. Update the navigation links' active state
    document.querySelectorAll('.nav-glass-btn').forEach(link => {
        link.classList.remove('active-tab');
    });

    const activeLink = document.getElementById('link-' + pageId);
    if (activeLink) {
        activeLink.classList.add('active-tab');
    }

    // Update Mobile Menu Links
    document.querySelectorAll('.nav-link-mobile').forEach(link => {
        link.classList.remove('text-[#D4AF37]', 'font-extrabold');
        link.classList.add('text-white/60');
    });
    
    const activeMobileLink = document.getElementById('link-mobile-' + pageId);
    if (activeMobileLink) {
        activeMobileLink.classList.add('text-[#D4AF37]', 'font-extrabold');
        activeMobileLink.classList.remove('text-white/60');
    }
    
    // 4. Smoothly scroll to the top of the new page
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showPageMobile(pageId) {
    showPage(pageId);
    toggleMobileMenu();
}

/* --- Event Booking Logic --- */
function scrollToBooking() {
    const bookingSection = document.getElementById('booking-section');
    if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
}

let ticketSelectionState = {
    selected: false,
    type: null,
    price: 0,
    qty: 1,
    name: ''
};

function selectTicket(type, price) {
    const today = new Date();
    const closeDate = new Date('2026-05-15');
    
    if (type === 'early-bird' && today > closeDate) {
        alert("Early Bird tickets are closed. Please select Regular or VIP.");
        return;
    }
    
    // Reset all cards
    document.querySelectorAll('.ticket-card').forEach(card => {
        card.classList.remove('selected');
        
        // Reset Select Button
        const selectBtn = card.querySelector('.select-btn');
        if (selectBtn) {
            selectBtn.classList.remove('hidden');
            selectBtn.innerText = (card.id === 'tier-vip') ? 'Upgrade Now' : 'Select';
            selectBtn.classList.remove('bg-[#D4AF37]', 'text-[#000B3D]');
            selectBtn.classList.add('border-white/20');
        }

        // Reset Proceed Button
        const proceedBtn = card.querySelector('.proceed-btn');
        if (proceedBtn) {
            proceedBtn.classList.add('hidden');
        }
    });
    
    // Set selected card
    const selectedCard = document.getElementById(`tier-${type}`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
        
        const selectBtn = selectedCard.querySelector('.select-btn');
        const proceedBtn = selectedCard.querySelector('.proceed-btn');
        
        if (selectBtn && proceedBtn) {
            // Hide select button and show proceed button
            selectBtn.classList.add('hidden');
            proceedBtn.classList.remove('hidden');
        }
    }
    
    // Update state
    ticketSelectionState.selected = true;
    ticketSelectionState.type = type;
    ticketSelectionState.name = type.charAt(0).toUpperCase() + type.slice(1) + ' Ticket';
    ticketSelectionState.price = price;
    ticketSelectionState.qty = 1;
    
    // Legacy support for other functions using global selectedTicket
    selectedTicket.name = ticketSelectionState.name;
    selectedTicket.price = price;
    selectedTicket.qty = 1;
    
    // Show booking flow summary (floating bar) with refined animation
    const bookingFlow = document.getElementById('booking-flow');
    if (bookingFlow) {
        bookingFlow.classList.remove('hidden');
        bookingFlow.style.display = 'block';
        // The animate-slide-up class handles the motion, we can ensure it's re-triggered
        bookingFlow.classList.remove('animate-slide-up');
        void bookingFlow.offsetWidth; // force reflow
        bookingFlow.classList.add('animate-slide-up');
        updateBookingSummary();
    }
}

/**
 * Direct checkout from the ticket card
 */
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
    // Deselect cards
    document.querySelectorAll('.ticket-card').forEach(card => {
        card.classList.remove('selected');
        const btn = card.querySelector('.select-btn');
        if (btn) {
            btn.innerText = btn.id === 'btn-vip' ? 'Upgrade Now' : 'Select';
            btn.classList.remove('bg-[#D4AF37]', 'text-[#000B3D]');
            btn.classList.add('border-white/20');
        }
    });
    ticketSelectionState = { selected: false, type: null, price: 0, qty: 1, name: '' };
    selectedTicket = { name: '', price: 0, qty: 1 };
}

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
    // Collect data from form
    customerData = {
        name: document.getElementById('cust-name').value,
        age: document.getElementById('cust-age').value,
        phone: document.getElementById('cust-phone').value,
        email: document.getElementById('cust-email').value,
        city: document.getElementById('cust-city').value
    };

    const type = ticketSelectionState.type;
    const pageId = `payment-${type}`;
    
    // Update summary on the specific payment page
    const summaryName = document.getElementById(`${pageId}-ticket-name`);
    const summaryQty = document.getElementById(`${pageId}-ticket-qty`);
    const summaryTotal = document.getElementById(`${pageId}-total-price`);

    if (summaryName) summaryName.innerText = ticketSelectionState.name;
    if (summaryQty) summaryQty.innerText = ticketSelectionState.qty;
    if (summaryTotal) summaryTotal.innerText = ticketSelectionState.price * ticketSelectionState.qty;

    // Navigate to the specific payment page for final review
    showPage(pageId);
}

function updateQty(delta) {
    ticketSelectionState.qty = Math.max(1, ticketSelectionState.qty + delta);
    selectedTicket.qty = ticketSelectionState.qty;
    updateBookingSummary();
}

function updateBookingSummary() {
    const qtyDisplay = document.getElementById('ticket-qty');
    const priceDisplay = document.getElementById('total-price');
    const nameDisplay = document.getElementById('selected-ticket-name');

    if (qtyDisplay) qtyDisplay.innerText = ticketSelectionState.qty;
    if (priceDisplay) priceDisplay.innerText = ticketSelectionState.price * ticketSelectionState.qty;
    if (nameDisplay) nameDisplay.innerText = ticketSelectionState.name;
}

function checkout(tier, event) {
    if (!ticketSelectionState.selected) {
        alert('Please select a ticket tier first.');
        return;
    }
    
    // Use the new integrated payment system
    startPayment(ticketSelectionState.type, ticketSelectionState.qty, customerData, event);
}

function confirmPayment(paymentId) {
    // 1. Prepare payment record for database
    const paymentDetails = {
        paymentId: paymentId,
        customer: customerData, // Include full customer details
        ticketType: ticketSelectionState.name,
        tier: ticketSelectionState.type,
        quantity: ticketSelectionState.qty,
        amount: ticketSelectionState.price * ticketSelectionState.qty,
        timestamp: new Date().toISOString(),
        status: 'Success'
    };

    // 2. Save to Database
    savePaymentToDatabase(paymentDetails);

    // 3. Populate success page details
    const successInfo = document.getElementById('success-ticket-info');
    if (successInfo) {
        successInfo.innerText = `${ticketSelectionState.qty}x ${ticketSelectionState.name}`;
    }
    
    // 4. Show success page
    showPage('success-page');
    
    // 5. Trigger celebration
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 200,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#D4AF37', '#ffffff', '#000B3D']
        });
    }
    
    console.log('Payment confirmed and saved:', paymentDetails);
    
    // 6. Reset booking state
    ticketSelectionState = { selected: false, type: null, price: 0, qty: 1, name: '' };
    selectedTicket = { name: '', price: 0, qty: 1 };
    
    const bookingFlow = document.getElementById('booking-flow');
    if (bookingFlow) bookingFlow.classList.add('hidden');
    document.querySelectorAll('.ticket-card').forEach(card => {
        card.classList.remove('selected');
        const btn = card.querySelector('.select-btn');
        if (btn) {
            btn.innerText = btn.id === 'btn-vip' ? 'Upgrade Now' : 'Select';
            btn.classList.remove('bg-[#D4AF37]', 'text-[#000B3D]');
            btn.classList.add('border-white/20');
        }
    });
    
    lucide.createIcons();
}

/**
 * Saves payment transaction details to Firestore database
 */
async function savePaymentToDatabase(details) {
    if (!db) {
        console.warn("Database not connected. Logging payment locally:", details);
        return;
    }

    try {
        await db.collection("payments").add(details);
        console.log("Transaction successfully recorded in database.");
    } catch (error) {
        console.error("Error writing transaction to database: ", error);
        // Fallback: Store in localStorage if database fails
        const pendingPayments = JSON.parse(localStorage.getItem('pending_payments') || '[]');
        pendingPayments.push(details);
        localStorage.setItem('pending_payments', JSON.stringify(pendingPayments));
    }
}

/* --- Initialization & Event Listeners --- */
// Countdown Timer for Early Bird
function startEarlyBirdCountdown() {
    const countDownDate = new Date("May 15, 2026 23:59:59").getTime();
    const timerElement = document.getElementById("early-bird-timer");

    if (!timerElement) return;

    const x = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        timerElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s left`;

        if (distance < 0) {
            clearInterval(x);
            timerElement.innerHTML = "EXPIRED";
            const earlyBirdBtn = document.getElementById("btn-early-bird");
            if (earlyBirdBtn) earlyBirdBtn.disabled = true;
        }
    }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Start Countdown
    startEarlyBirdCountdown();

    // Load Influencers
    loadInfluencers();
    
    // Load Announcements
    loadAnnouncements();
    
    // Load Journals
    loadJournals();
    
    // Load Founders
    loadFounders();
    
    // Load Faces
    loadFaces();
    
    // Load Careers
    loadCareers();

    // Konami Code Listener
    window.addEventListener('keydown', (e) => {
        konamiBuffer.push(e.key);
        konamiBuffer = konamiBuffer.slice(-10);
        
        if (JSON.stringify(konamiBuffer) === JSON.stringify(konamiCode)) {
            const overlay = document.getElementById('konamiOverlay');
            if (overlay) {
                overlay.style.display = 'flex';
                warpActive = true;
                initWarp();
                drawWarp();
            }
        }
    });

    // Mouse Parallax & Magnetic Effects
    const bg1 = document.querySelector('.bg-blue-600\\/10');
    const bg2 = document.querySelector('.bg-\\[\\#D4AF37\\]\\/5');
    
    window.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.05;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.05;
        
        if(bg1) bg1.style.transform = `translate(${moveX}px, ${moveY}px)`;
        if(bg2) bg2.style.transform = `translate(${-moveX}px, ${-moveY}px)`;

        // Magnetic Logo Effect
        const logo = document.querySelector('.nav-logo');
        if (logo) {
            const rect = logo.getBoundingClientRect();
            const logoCenterX = rect.left + rect.width / 2;
            const logoCenterY = rect.top + rect.height / 2;
            const dist = Math.hypot(e.clientX - logoCenterX, e.clientY - logoCenterY);
            
            if (dist < 100) {
                const angle = Math.atan2(e.clientY - logoCenterY, e.clientX - logoCenterX);
                const force = (100 - dist) / 5;
                logo.style.transform = `translate(${Math.cos(angle) * force}px, ${Math.sin(angle) * force}px) rotate(${force}deg)`;
            } else {
                logo.style.transform = '';
            }
        }
    });

    // Logo Click Handler
    const logoContainer = document.querySelector('.nav-logo')?.parentElement;
    if (logoContainer) {
        logoContainer.onclick = (e) => {
            e.preventDefault();
            handleLogoClick();
            showPage('home');
        };
    }

    // Early Bird Check
    const today = new Date();
    const closeDate = new Date('2026-05-15');
    if (today > closeDate) {
        const ebCard = document.getElementById('tier-early-bird');
        const ebBtn = document.getElementById('btn-early-bird');
        if (ebCard && ebBtn) {
            ebCard.classList.add('opacity-50', 'grayscale', 'pointer-events-none');
            ebBtn.innerText = 'Early Bird Closed';
            ebBtn.classList.remove('hover:bg-white', 'hover:text-[#000B3D]');
            ebBtn.classList.add('bg-white/5', 'text-white/20', 'border-white/5');
        }
    }

    // Easter Egg: Click to Punktuate
    window.addEventListener('click', (e) => {
        const point = document.createElement('div');
        point.className = 'punktuate-point';
        point.style.left = (e.clientX - 4) + 'px';
        point.style.top = (e.clientY - 4) + 'px';
        document.body.appendChild(point);
        setTimeout(() => point.remove(), 800);
    });

    // Punctuation Pulse Effect
    document.querySelectorAll('h1, h2').forEach(el => {
        el.innerHTML = el.innerHTML.replace(/(\.|\!)/g, '<span class="text-[#D4AF37] hover:scale-150 transition-all inline-block cursor-default">$1</span>');
    });

    // Styled Console Message
    console.log(
        "%cPUNKTUATE.", 
        "color: #D4AF37; font-size: 50px; font-weight: 900; font-family: 'Inter', sans-serif; text-shadow: 2px 2px 0px #000B3D;"
    );
});


/* --- Navbar Scroll Effects --- */
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


/* --- Video Showcase Fade-in on Scroll --- */
// Intersection Observer Options
const observerOptions = {
    // The target element is considered "visible" when 20% of it is in the viewport
    threshold: 0.2
};

// Create the Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // If the video section has entered the viewport...
        if (entry.isIntersecting) {
            // ...add the 'visible' class to trigger the CSS transition
            entry.target.classList.add('visible');
            // Once the animation is triggered, we can stop observing this element
            // (Unless you want it to fade out and in again every time)
            // observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

// Target all elements with the '.scroll-reveal' class
// In the CSS we made earlier, this is the class applied to the video container.
document.querySelectorAll('.scroll-reveal').forEach(el => {
    observer.observe(el);
});


/* --- Initialize Lucide Icons --- */
// This function replaces all placeholders (e.g., <i data-lucide="...">) 
// with the actual SVG icons. Must be called after the HTML structure is loaded.
lucide.createIcons();


function getDefaultInfluencers() {
    return [
        {
            id: '1',
            name: 'Vartika Vashista',
            username: 'vartikavashista',
            followers: '50K',
            bio: 'Fashion & lifestyle influencer based in Mumbai',
            link: 'https://instagram.com/vartikavashista',
            image: 'Influencers/Vartika Vashista/Vartika.jpeg',
            platform: 'Instagram'
        },
        {
            id: '2',
            name: 'Aditi Fadtare',
            username: 'aditifadtare',
            followers: '35K',
            bio: 'Content creator & digital marketer',
            link: 'https://instagram.com/aditifadtare',
            image: 'Influencers/Aditi Fadtare/Aditi.jpeg',
            platform: 'Instagram'
        },
        {
            id: '3',
            name: 'Dhanshri Dake',
            username: 'dhanshridake',
            followers: '28K',
            bio: 'Lifestyle & travel influencer',
            link: 'https://instagram.com/dhanshridake',
            image: 'Influencers/Dhanshri Dake/Dhanashri.jpeg',
            platform: 'Instagram'
        },
        {
            id: '4',
            name: 'Osbert Dsouza',
            username: 'osbertdsouza',
            followers: '42K',
            bio: 'Fitness & wellness content creator',
            link: 'https://instagram.com/osbertdsouza',
            image: 'Influencers/Osbert Dsouza/Osbert.jpeg',
            platform: 'Instagram'
        },
        {
            id: '5',
            name: 'Shruti Dange',
            username: 'shrutidange',
            followers: '38K',
            bio: 'Beauty & fashion influencer',
            link: 'https://instagram.com/shrutidange',
            image: 'Influencers/Shruti Dange/Shruti Dange.jpeg',
            platform: 'Instagram'
        }
    ];
}

function getDefaultAnnouncements() {
    return [
        {
            id: '1',
            text: 'The Phoolish Concert by Apurva Bondre – 13th June, Mumbai'
        }
    ];
}

function getDefaultJournals() {
    return [
        {
            id: '1',
            title: 'Why Most Influencer Campaigns Fail.',
            readTime: '3 min read',
            description: '(And how we fix broken execution)',
            link: 'influencer-campaigns-fail.html',
            image: ''
        },
        {
            id: '2',
            title: 'Creators Don’t Miss Deadlines. Systems Do.',
            readTime: '4 min read',
            description: '(Building reliability at scale)',
            link: 'systems-not-creators.html',
            image: ''
        },
        {
            id: '3',
            title: 'Virality is Luck. Consistency is Strategy.',
            readTime: '3 min read',
            description: '(Why brands should stop chasing trends)',
            link: 'consistency-over-virality.html',
            image: ''
        }
    ];
}

function loadAnnouncements() {
    const stored = localStorage.getItem('punktuate_announcements');
    const defaultAnnouncements = getDefaultAnnouncements();
    let announcements = [];
    
    if (stored) {
        announcements = JSON.parse(stored);
    } else {
        announcements = defaultAnnouncements;
        localStorage.setItem('punktuate_announcements', JSON.stringify(announcements));
    }
    
    renderAnnouncements(announcements);
}

function loadJournals() {
    const stored = localStorage.getItem('punktuate_journals');
    const defaultJournals = getDefaultJournals();
    let journals = [];
    
    if (stored) {
        journals = JSON.parse(stored);
    } else {
        journals = defaultJournals;
        localStorage.setItem('punktuate_journals', JSON.stringify(journals));
    }
    
    renderJournals(journals);
}

function renderAnnouncements(announcements) {
    const banner = document.getElementById('notification-banner');
    if (!banner) return;
    
    if (announcements.length > 0) {
        const latest = announcements[announcements.length - 1];
        const textEl = banner.querySelector('p');
        if (textEl) textEl.textContent = latest.text;
        banner.style.display = 'flex';
    } else {
        banner.style.display = 'none';
    }
}

function renderJournals(journals) {
    const container = document.getElementById('journal-grid');
    if (!container) return;
    
    if (journals.length === 0) {
        container.innerHTML = '';
        return;
    }
    
    container.innerHTML = journals.map(jrn => `
        <a href="${jrn.link || '#'}" class="group cursor-pointer text-left block">
            <div class="aspect-video bg-white/5 rounded-[30px] mb-8 overflow-hidden border border-white/5 hover-card">
                ${jrn.image 
                    ? `<img src="${jrn.image}" class="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" alt="${jrn.title}">`
                    : `<div class="w-full h-full bg-gradient-to-tr from-[#000B3D] via-blue-900 to-[#D4AF37]/20 group-hover:scale-110 transition-all duration-700"></div>`
                }
            </div>
            <span class="text-[#D4AF37] luxury-caption text-[10px] mb-2 block opacity-60">${jrn.readTime || '3 min read'}</span>
            <h3 class="text-2xl font-bold mb-2 group-hover:text-[#D4AF37] transition-all">${jrn.title}</h3>
            <p class="text-white/40 text-sm">${jrn.description || ''}</p>
        </a>
    `).join('');
}

function getDefaultFounders() {
    return [
        {
            id: '1',
            name: 'Arya Pawar',
            title: 'Co-Founder, Punktuate',
            image: 'aryapic.png'
        },
        {
            id: '2',
            name: 'Avanti Thakur',
            title: 'Co-Founder, Punktuate',
            image: '_ASH7503.jpeg'
        }
    ];
}

function getDefaultFaces() {
    return [];
}

function getDefaultCareers() {
    return [
        {
            id: '1',
            position: 'Graphic Designer',
            email: 'aryapawar@punktuate.in'
        },
        {
            id: '2',
            position: 'Video Editor',
            email: 'aryapawar@punktuate.in'
        }
    ];
}

function loadCareers() {
    const grid = document.getElementById('careers-grid');
    if (!grid) return;

    const stored = localStorage.getItem('punktuate_careers');
    const defaultCareers = getDefaultCareers();
    let careers = [];
    
    if (stored) {
        careers = JSON.parse(stored);
    } else {
        careers = defaultCareers;
        localStorage.setItem('punktuate_careers', JSON.stringify(careers));
    }
    
    renderCareers(careers);
}

function renderCareers(careers) {
    const container = document.getElementById('careers-grid');
    if (!container) return;
    
    if (careers.length === 0) {
        container.innerHTML = `
            <div class="col-span-full glass rounded-[40px] p-12 border border-white/10 text-center">
                <p class="text-xl text-white/40">No job openings right now, check back later!</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = careers.map(c => `
        <div onclick="window.location.href='mailto:${c.email}?subject=Job Application: ${encodeURIComponent(c.position)}&body=Hello, I would like to apply for the ${encodeURIComponent(c.position)} position. Please find my resume attached.'" class="glass p-12 rounded-[40px] flex flex-col md:flex-row justify-between items-center group hover:border-[#D4AF37]/50 transition-all cursor-pointer border border-white/5">
            <h3 class="text-3xl font-bold">${c.position}</h3>
            <div class="flex items-center gap-6">
                <span class="luxury-caption text-[11px] text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-all">Mail your resume</span>
                <button class="bg-white/10 p-6 rounded-full group-hover:bg-[#D4AF37] transition-all"><i data-lucide="mail"></i></button>
            </div>
        </div>
    `).join('');
}

function loadFaces() {
    const grid = document.getElementById('faces-grid');
    if (!grid) return;

    const stored = localStorage.getItem('punktuate_faces');
    const defaultFaces = getDefaultFaces();
    let faces = [];
    
    if (stored) {
        faces = JSON.parse(stored);
    } else {
        faces = defaultFaces;
        localStorage.setItem('punktuate_faces', JSON.stringify(faces));
    }
    
    renderFaces(faces);
}

function renderFaces(faces) {
    const container = document.getElementById('faces-grid');
    if (!container) return;
    
    if (faces.length === 0) {
        container.innerHTML = '';
        return;
    }
    
    container.innerHTML = faces.map(fdr => `
        <div class="group cursor-pointer text-center md:text-left flex flex-col items-center md:items-start">
            <div class="relative overflow-hidden rounded-[30px] w-48 h-48 glass border border-white/10 mb-6 hover:border-[#D4AF37]/50 transition-all duration-500">
                <img src="${fdr.image || 'placeholder.jpg'}" alt="${fdr.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                <div class="absolute inset-0 bg-gradient-to-t from-[#000B3D]/40 to-transparent"></div>
            </div>
            <h3 class="text-3xl font-bold mb-1">${fdr.name}</h3>
            <p class="luxury-caption text-[11px] text-[#D4AF37]">${fdr.role}</p>
        </div>
    `).join('');
}

function loadFounders() {
    const grid = document.getElementById('founders-grid');
    if (!grid) return;

    const stored = localStorage.getItem('punktuate_founders');
    const defaultFounders = getDefaultFounders();
    let founders = [];
    
    if (stored) {
        founders = JSON.parse(stored);
    } else {
        founders = defaultFounders;
        localStorage.setItem('punktuate_founders', JSON.stringify(founders));
    }
    
    renderFounders(founders);
}

function renderFounders(founders) {
    const container = document.getElementById('founders-grid');
    if (!container) return;
    
    if (founders.length === 0) {
        container.innerHTML = '';
        return;
    }
    
    container.innerHTML = founders.map(fdr => `
        <div class="group cursor-pointer text-center md:text-left flex flex-col items-center md:items-start">
            <div class="relative overflow-hidden rounded-[30px] w-48 h-48 glass border border-white/10 mb-6 hover:border-[#D4AF37]/50 transition-all duration-500">
                <img src="${fdr.image || 'placeholder.jpg'}" alt="${fdr.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                <div class="absolute inset-0 bg-gradient-to-t from-[#000B3D]/40 to-transparent"></div>
            </div>
            <h3 class="text-3xl font-bold mb-1">${fdr.name}</h3>
            <p class="luxury-caption text-[11px] text-[#D4AF37]">${fdr.title}</p>
        </div>
    `).join('');
}

/* --- Dynamic Influencer Loading --- */
function loadInfluencers() {
    const grid = document.getElementById('influencer-grid');
    if (!grid) return;

    const hasReset = localStorage.getItem('punktuate_admin_reset_done');
    const stored = localStorage.getItem('punktuate_influencers');
    const defaultInfluencers = getDefaultInfluencers();
    let influencers = [];
    
    if (stored && hasReset) {
        influencers = JSON.parse(stored);
    } else {
        influencers = defaultInfluencers;
        localStorage.setItem('punktuate_influencers', JSON.stringify(influencers));
        if (!hasReset) localStorage.setItem('punktuate_admin_reset_done', 'true');
    }
    
    renderInfluencers(influencers);
}

/**
 * Renders influencer cards to the grid.
 */
function renderInfluencers(influencers) {
    console.log('Rendering influencers:', influencers);
    const grid = document.getElementById('influencer-grid');
    console.log('Rendering to grid element:', grid);
    if (!grid) return;

    // Apply responsive grid layout
    if (influencers.length === 1) {
        // Centered layout for a single influencer
        grid.className = 'grid grid-cols-1 max-w-[350px] md:max-w-[400px] mx-auto transition-all duration-700';
    } else {
        // Grid layout for multiple influencers
        grid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 transition-all duration-700';
    }

    grid.innerHTML = influencers.map(inf => `
        ${inf.link ? `<a href="${inf.link}" target="_blank" class="block">` : '<div>'}
        <div class="influencer-card glass rounded-[40px] p-8 border border-white/5 flex flex-col group scroll-reveal cursor-pointer">
            <div class="relative overflow-hidden rounded-[30px] w-48 h-48 glass border border-white/10 mb-8 mx-auto hover:border-[#D4AF37]/50 transition-all duration-500">
                <img src="${inf.image || 'placeholder.jpg'}?t=${Date.now()}" alt="${inf.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                <div class="absolute inset-0 bg-gradient-to-t from-[#000B3D]/40 to-transparent"></div>
            </div>
            
            <div class="flex-grow text-center">
                <h3 class="text-3xl font-bold mb-2 tracking-tight uppercase">${inf.name}</h3>
                <p class="text-[#D4AF37] luxury-caption text-[11px] font-bold mb-2 tracking-[0.2em]">${inf.platform}</p>
                <p class="text-[#D4AF37] font-bold text-lg mb-4">${inf.followers} <span class="text-white/40 luxury-caption text-[10px] tracking-widest ml-1">Followers</span></p>
                <p class="text-white/40 text-sm leading-relaxed mb-8 font-medium line-clamp-2 overflow-hidden text-ellipsis">${inf.bio}</p>
            </div>

            <div class="mt-auto flex justify-center">
                ${inf.link ? `
                    <div class="btn-hover bg-[#D4AF37] text-[#000B3D] px-8 py-3 rounded-full luxury-caption text-[10px] font-extrabold flex items-center gap-2 group/btn shadow-lg">
                        <i class="bx bxl-instagram text-lg"></i>
                        View Profile
                    </div>
                ` : ''}
            </div>
        </div>
        ${inf.link ? '</a>' : '</div>'}
    `).join('');

    // Re-initialize scroll reveal for new elements
    const newElements = grid.querySelectorAll('.scroll-reveal');
    newElements.forEach(el => observer.observe(el));
    
    // Refresh icons
    if (window.lucide) {
        lucide.createIcons();
    }
}


// Initial load
document.addEventListener('DOMContentLoaded', loadInfluencers);
// Also call immediately if script is deferred/async
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    loadInfluencers();
}

