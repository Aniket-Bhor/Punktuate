/**
 * js/animations.js
 * ─────────────────────────────────────────────────────────────
 * All visual flair:
 *   - Scroll-reveal via IntersectionObserver
 *   - Mouse parallax on background blobs
 *   - Magnetic logo effect
 *   - Click-to-punktuate gold dot
 *   - Konami code easter egg (warp canvas)
 *   - Logo triple-click gold mode
 *   - Punctuation pulse on headings
 *   - Styled console message
 * ─────────────────────────────────────────────────────────────
 */

/* ── Scroll Reveal ───────────────────────────────────────────── */
const animObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    },
    { threshold: 0.2 }
);

document.querySelectorAll('.scroll-reveal').forEach(el => animObserver.observe(el));

/* ── Konami Code Warp ────────────────────────────────────────── */
const KONAMI_CODE   = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiBuffer    = [];
let warpActive      = false;
let warpPoints      = [];
let warpCanvas, warpCtx;

function initWarp() {
    warpCanvas = document.getElementById('warpCanvas');
    if (!warpCanvas) return;
    warpCtx = warpCanvas.getContext('2d');
    warpCanvas.width  = window.innerWidth;
    warpCanvas.height = window.innerHeight;
    warpPoints = [];
    for (let i = 0; i < 500; i++) {
        warpPoints.push({
            x: Math.random() * warpCanvas.width  - warpCanvas.width  / 2,
            y: Math.random() * warpCanvas.height - warpCanvas.height / 2,
            z: Math.random() * warpCanvas.width
        });
    }
}

function drawWarp() {
    if (!warpActive) return;
    warpCtx.fillStyle = 'rgba(0, 11, 61, 0.2)';
    warpCtx.fillRect(0, 0, warpCanvas.width, warpCanvas.height);
    warpCtx.translate(warpCanvas.width / 2, warpCanvas.height / 2);

    warpPoints.forEach(p => {
        p.z -= 15;
        if (p.z <= 0) p.z = warpCanvas.width;
        const x = p.x * (warpCanvas.width / p.z);
        const y = p.y * (warpCanvas.width / p.z);
        const s = Math.min(10, 500 / p.z);
        warpCtx.fillStyle = `rgba(212, 175, 55, ${1 - p.z / warpCanvas.width})`;
        if (Math.random() > 0.5) {
            warpCtx.beginPath();
            warpCtx.arc(x, y, s / 2, 0, Math.PI * 2);
            warpCtx.fill();
        } else {
            warpCtx.font = `${s * 2}px Inter`;
            warpCtx.fillText('!', x, y);
        }
    });

    warpCtx.setTransform(1, 0, 0, 1, 0, 0);
    requestAnimationFrame(drawWarp);
}

function closeKonami() {
    const overlay = document.getElementById('konamiOverlay');
    if (overlay) overlay.style.display = 'none';
    warpActive = false;
}

window.addEventListener('keydown', e => {
    konamiBuffer.push(e.key);
    konamiBuffer = konamiBuffer.slice(-10);

    if (JSON.stringify(konamiBuffer) === JSON.stringify(KONAMI_CODE)) {
        const overlay = document.getElementById('konamiOverlay');
        if (overlay) {
            overlay.style.display = 'flex';
            warpActive = true;
            initWarp();
            drawWarp();
        }
    }
});

/* ── Logo Triple-click Easter Egg ────────────────────────────── */
let logoClickCount = 0;

function handleLogoClick() {
    logoClickCount++;
    if (logoClickCount === 3) {
        document.body.classList.add('gold-mode');
        setTimeout(() => {
            document.body.classList.remove('gold-mode');
            logoClickCount = 0;
        }, 3000);
    }
}

/* ── Click-to-Punktuate Gold Dot ─────────────────────────────── */
window.addEventListener('click', e => {
    const dot = document.createElement('div');
    dot.className = 'punktuate-point';
    dot.style.left = (e.clientX - 4) + 'px';
    dot.style.top  = (e.clientY - 4) + 'px';
    document.body.appendChild(dot);
    setTimeout(() => dot.remove(), 800);
});

/* ── DOMContentLoaded: Init interactive effects ──────────────── */
document.addEventListener('DOMContentLoaded', () => {
    // Init Lucide icons
    if (window.lucide) lucide.createIcons();

    // Mouse parallax on ambient background blobs
    const bg1 = document.querySelector('.bg-blue-600\\/10');
    const bg2 = document.querySelector('.bg-\\[\\#D4AF37\\]\\/5');

    window.addEventListener('mousemove', e => {
        const moveX = (e.clientX - window.innerWidth  / 2) * 0.05;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.05;

        if (bg1) bg1.style.transform = `translate(${moveX}px, ${moveY}px)`;
        if (bg2) bg2.style.transform = `translate(${-moveX}px, ${-moveY}px)`;

        // Magnetic logo
        const logo = document.querySelector('.nav-logo');
        if (logo) {
            const rect       = logo.getBoundingClientRect();
            const logoCenterX = rect.left + rect.width  / 2;
            const logoCenterY = rect.top  + rect.height / 2;
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

    // Wire up logo click handler
    const logoContainer = document.querySelector('.nav-logo')?.parentElement;
    if (logoContainer) {
        logoContainer.addEventListener('click', e => {
            e.preventDefault();
            handleLogoClick();
            showPage('home');
        });
    }

    // Punctuation pulse – wrap . and ! in headings with a hoverable span
    document.querySelectorAll('h1, h2').forEach(el => {
        el.innerHTML = el.innerHTML.replace(
            /(\.|!)/g,
            '<span class="text-[#D4AF37] hover:scale-150 transition-all inline-block cursor-default">$1</span>'
        );
    });

    // Styled console signature
    console.log(
        '%cPUNKTUATE.',
        "color:#D4AF37;font-size:50px;font-weight:900;font-family:'Inter',sans-serif;text-shadow:2px 2px 0px #000B3D;"
    );
});
