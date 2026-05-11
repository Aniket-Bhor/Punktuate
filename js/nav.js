/**
 * js/nav.js
 * ─────────────────────────────────────────────────────────────
 * SPA page navigation, mobile menu, and navbar scroll effects.
 * ─────────────────────────────────────────────────────────────
 */

/**
 * Navigate to a page section within the SPA.
 * Guards payment pages from being accessed without ticket selection.
 */
function showPage(pageId) {
    // Guard: payment pages require a ticket to be selected first
    if (pageId.startsWith('payment-') && !ticketSelectionState.selected) {
        console.warn('Access denied to payment page: No ticket selected.');
        showPage('event-apurva');
        return;
    }

    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Show target page
    const target = document.getElementById(pageId);
    if (target) {
        target.classList.add('active');
    }

    // Update desktop nav active state
    document.querySelectorAll('.nav-glass-btn').forEach(link => {
        link.classList.remove('active-tab');
    });
    const activeLink = document.getElementById('link-' + pageId);
    if (activeLink) {
        activeLink.classList.add('active-tab');
    }

    // Update mobile nav active state
    document.querySelectorAll('.nav-link-mobile').forEach(link => {
        link.classList.remove('text-[#D4AF37]', 'font-extrabold');
        link.classList.add('text-white/60');
    });
    const activeMobileLink = document.getElementById('link-mobile-' + pageId);
    if (activeMobileLink) {
        activeMobileLink.classList.add('text-[#D4AF37]', 'font-extrabold');
        activeMobileLink.classList.remove('text-white/60');
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/** Wrapper used by mobile nav links — navigates then closes the menu. */
function showPageMobile(pageId) {
    showPage(pageId);
    toggleMobileMenu();
}

/** Toggle the full-screen mobile navigation overlay. */
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

    if (window.lucide) lucide.createIcons();
}

/* --- Navbar scroll glass effect --- */
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
