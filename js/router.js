/**
 * js/router.js
 * ─────────────────────────────────────────────────────────────
 * Lightweight hash-based SPA router for Punktuate.
 *
 * How it works:
 *   1. Each page's HTML lives in pages/<pageId>.html
 *   2. router.navigate('about') → fetches pages/about.html,
 *      injects it into #app, updates URL to /#about,
 *      runs any page-specific init logic, re-renders icons.
 *   3. hashchange event handles browser Back / Forward.
 *   4. On initial load, the hash in the URL is respected.
 *
 * Payment pages are sub-views of pages/payment.html.
 * They are toggled by showPaymentSubPage() not by a fetch.
 * ─────────────────────────────────────────────────────────────
 */

/* ── Config ──────────────────────────────────────────────── */

// Pages that map to a file in /pages/
const PAGE_MAP = {
    'home':          'pages/home.html',
    'about':         'pages/about.html',
    'events-hub':    'pages/events-hub.html',
    'event-dynamic': 'pages/event-dynamic.html',
    'services':      'pages/services.html',
    'journal':       'pages/journal.html',
    'jobs':          'pages/jobs.html',
    'contact':       'pages/contact.html',
    // payment-* all live in one file, sub-selected at runtime
    'payment-details':    'pages/payment.html',
    'payment-earlybird':  'pages/payment.html',
    'payment-regular':    'pages/payment.html',
    'payment-vip':        'pages/payment.html',
    'success-page':       'pages/payment.html',
};

// Payment sub-pages and which section id to show inside payment.html
const PAYMENT_SECTIONS = {
    'payment-details':   'payment-details-section',
    'payment-earlybird': 'payment-early-bird-section',
    'payment-regular':   'payment-regular-section',
    'payment-vip':       'payment-vip-section',
    'success-page':      'success-page-section',
};

// Default page
const DEFAULT_PAGE = 'home';

/* ── State ───────────────────────────────────────────────── */
let currentPage = null;
let pageCache   = {};   // cache fetched HTML so repeat visits are instant

/* ── Core Router ─────────────────────────────────────────── */
const router = {

    /**
     * Navigate to a page by id. Updates URL hash, loads HTML, runs init.
     * @param {string} pageId
     * @param {Object} [opts]
     * @param {boolean} [opts.replace] - use replaceState instead of pushState
     */
    navigate(pageIdWithParams, opts = {}) {
        const pageId = pageIdWithParams.split('?')[0];
        // Guard: payment pages require a ticket to be selected
        if (pageId.startsWith('payment-') && typeof ticketSelectionState !== 'undefined' && !ticketSelectionState.selected) {
            console.warn('[router] Access denied: no ticket selected.');
            this.navigate('home');
            return;
        }

        // Update URL hash (won't trigger hashchange on same page)
        const hash = '#' + pageIdWithParams;
        if (opts.replace) {
            history.replaceState({ pageId: pageIdWithParams }, '', hash);
        } else {
            history.pushState({ pageId: pageIdWithParams }, '', hash);
        }

        this._load(pageIdWithParams);
    },

    /** Called by hashchange and popstate events */
    _onHashChange() {
        const pageId = this._hashToPageId();
        this._load(pageId);
    },

    /** Read page id from current URL hash (handles query parameters) */
    _hashToPageId() {
        const rawHash = window.location.hash.replace('#', '').trim();
        return rawHash || DEFAULT_PAGE;
    },

    /** Fetch + inject + init a page */
    async _load(pageIdWithParams) {
        let pageId = pageIdWithParams.split('?')[0];
        if (!PAGE_MAP[pageId]) {
            console.warn(`[router] Unknown page: "${pageId}". Falling back to home.`);
            pageIdWithParams = DEFAULT_PAGE;
            pageId = DEFAULT_PAGE;
        }

        currentPage = pageId;

        // ── 1. Show loading state ──────────────────────────
        const app = document.getElementById('app');
        if (!app) return;
        app.style.opacity = '0';
        app.style.transition = 'opacity 0.2s ease';

        // ── 2. Fetch HTML (use cache if available) ─────────
        const filePath = PAGE_MAP[pageId];
        if (!pageCache[filePath]) {
            try {
                const res = await fetch(filePath);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                pageCache[filePath] = await res.text();
            } catch (err) {
                console.error('[router] Failed to load page:', filePath, err);
                app.innerHTML = `
                    <div class="flex items-center justify-center min-h-screen text-center px-6">
                        <div>
                            <h2 class="text-4xl font-bold text-[#D4AF37] mb-4">Page not found</h2>
                            <p class="text-white/40 mb-8">Could not load: ${filePath}</p>
                            <button onclick="router.navigate('home')" class="px-8 py-4 rounded-full bg-white text-[#000B3D] font-black luxury-caption text-[11px]">Go Home</button>
                        </div>
                    </div>`;
                app.style.opacity = '1';
                return;
            }
        }

        // ── 3. Inject HTML ─────────────────────────────────
        app.innerHTML = pageCache[filePath];

        // ── 4. Payment sub-pages: show the right section ──
        if (PAYMENT_SECTIONS[pageId]) {
            // Hide all payment sections first
            Object.values(PAYMENT_SECTIONS).forEach(sectionId => {
                const el = document.getElementById(sectionId);
                if (el) el.classList.add('hidden');
            });
            // Show the correct one
            const target = document.getElementById(PAYMENT_SECTIONS[pageId]);
            if (target) target.classList.remove('hidden');
        }

        // ── 5. Scroll to top ───────────────────────────────
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // ── 6. Fade in ─────────────────────────────────────
        requestAnimationFrame(() => {
            app.style.opacity = '1';
        });

        // ── 7. Update nav active state ─────────────────────
        this._updateNav(pageId);

        // ── 8. Re-render Lucide icons ─────────────────────
        if (window.lucide) lucide.createIcons();

        // ── 9. Run page-specific init (defer so DOM is settled) ──
        setTimeout(() => this._initPage(pageIdWithParams), 0);
    },

    /** Highlight the correct nav link */
    _updateNav(pageId) {
        document.querySelectorAll('.nav-glass-btn').forEach(btn => btn.classList.remove('active-tab'));
        const link = document.getElementById('link-' + pageId);
        if (link) link.classList.add('active-tab');

        document.querySelectorAll('.nav-link-mobile').forEach(btn => {
            btn.classList.remove('text-[#D4AF37]', 'font-extrabold');
            btn.classList.add('text-white/60');
        });
        const mobileLink = document.getElementById('link-mobile-' + pageId);
        if (mobileLink) {
            mobileLink.classList.add('text-[#D4AF37]', 'font-extrabold');
            mobileLink.classList.remove('text-white/60');
        }
    },

    /** Run page-specific data loading / init after HTML is injected */
    _initPage(pageIdWithParams) {
        const pageId = pageIdWithParams.split('?')[0];
        // Re-attach scroll reveal observer to newly injected elements
        if (typeof scrollObserver !== 'undefined') {
            document.querySelectorAll('.scroll-reveal').forEach(el => scrollObserver.observe(el));
        }

        switch (pageId) {
            case 'home':
                // Punctuation pulse effect on headings
                _applyPunctuationPulse();
                break;

            case 'about':
                if (typeof loadFounders   === 'function') loadFounders();
                if (typeof loadInfluencers === 'function') loadInfluencers();
                if (typeof loadFaces      === 'function') loadFaces();
                break;

            case 'events-hub':
                if (typeof loadEvents === 'function') loadEvents();
                break;

            case 'event-dynamic':
                // Dynamically fetch and populate event details if accessed via direct URL query param
                if (typeof openDynamicEvent !== 'undefined') {
                    (async () => {
                        let evt = openDynamicEvent._pending;
                        if (!evt) {
                            const rawHash = window.location.hash.replace('#', '').trim();
                            const urlParams = new URLSearchParams(rawHash.split('?')[1] || '');
                            const eventId = urlParams.get('id');
                            if (eventId) {
                                // Always ensure events are loaded first
                                if (typeof _prefetchEvents === 'function') {
                                    await _prefetchEvents();
                                }
                                // Use slug-aware lookup
                                if (typeof findEventBySlugOrId === 'function') {
                                    evt = findEventBySlugOrId(eventId);
                                } else if (typeof window.globalEvents !== 'undefined') {
                                    evt = window.globalEvents.find(e => e.id === eventId || e._fbKey === eventId);
                                }
                            }
                        }
                        if (evt && typeof _populateDynamicEvent === 'function') {
                            _populateDynamicEvent(evt);
                        } else if (!evt) {
                            console.warn('[router] event-dynamic: no matching event found for URL', window.location.hash);
                        }
                        openDynamicEvent._pending = null; // clear after use
                    })();
                }
                if (typeof initTicketState === 'function') {
                    initTicketState();
                }
                break;

            case 'journal':
                if (typeof loadJournals === 'function') loadJournals();
                break;

            case 'jobs':
                if (typeof loadCareers === 'function') loadCareers();
                break;

            case 'contact':
                // EmailJS is already initialised globally — nothing extra needed.
                break;

            case 'payment-details':
                // Form is ready, no extra init needed
                break;
        }
    }
};

/* ── Helpers ─────────────────────────────────────────────── */

/** Apply the punctuation colour-pulse to h1/h2 inside #app */
function _applyPunctuationPulse() {
    document.querySelectorAll('#app h1, #app h2').forEach(el => {
        el.innerHTML = el.innerHTML.replace(
            /(\.|!)/g,
            '<span class="text-[#D4AF37] hover:scale-150 transition-all inline-block cursor-default">$1</span>'
        );
    });
}

// Date-based expiry removed; managed dynamically via ticket sales count.

/* ── Public helper used by nav.js and inline onclick attrs ── */

/**
 * Global showPage() shim — keeps backward compatibility with any
 * existing onclick="showPage('...')" calls in JS files / admin.
 */
function showPage(pageId) {
    router.navigate(pageId);
}

/* ── Bootstrap ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    // Listen for hash changes (browser back/forward)
    window.addEventListener('hashchange', () => router._onHashChange());
    window.addEventListener('popstate',   () => router._onHashChange());

    // Load the page indicated by the current hash, or home
    const initialPage = router._hashToPageId();
    router.navigate(initialPage, { replace: true });
});
