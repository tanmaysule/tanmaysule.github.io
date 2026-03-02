/* ============================================================
   TANMAY SULE — PORTFOLIO JS
   Scroll reveal, theme toggle, nav behavior
   ============================================================ */

(function () {
    'use strict';

    // ---------- SCROLL REVEAL ----------
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => {
        revealObserver.observe(el);
    });

    // ---------- NAV SCROLL BEHAVIOR ----------
    const nav = document.getElementById('nav');
    function handleNavScroll() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();

    // ---------- MOBILE NAV TOGGLE ----------
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
            document.body.classList.toggle('nav-open', isOpen);
        });

        // Close nav on link click
        navLinks.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.classList.remove('nav-open');
            });
        });

        // Close nav on outside click
        document.addEventListener('click', (e) => {
            if (
                navLinks.classList.contains('active') &&
                !navLinks.contains(e.target) &&
                !navToggle.contains(e.target)
            ) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });
    }

    // ---------- THEME TOGGLE ----------
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Load saved theme or respect system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        html.setAttribute('data-theme', 'light');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = html.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
        });
    }

    // ---------- ACTIVE NAV LINK + URL HASH ON SCROLL ----------
    const navAnchors = document.querySelectorAll('.nav__links ol a');
    // All elements that can be deep-linked, in DOM order
    const hashTargets = document.querySelectorAll('section[id], .project[id]');

    // Don't update the URL hash until the page has settled after initial load.
    // scroll-behavior:smooth causes an animated scroll to #anchors — if we
    // update the hash during that animation, we overwrite the anchor mid-flight.
    let hashUpdateEnabled = false;
    setTimeout(() => { hashUpdateEnabled = true; }, 800);

    function updateActiveSection() {
        const trigger = window.scrollY + window.innerHeight / 3;
        let currentId = '';

        // Walk DOM-order list; last element whose top is above the trigger wins.
        // Because projects sit inside #work, they naturally override it when in view.
        hashTargets.forEach((el) => {
            if (el.offsetTop <= trigger) {
                currentId = el.id;
            }
        });

        // Update nav highlight (always runs, even before hash updates are enabled)
        const activeLink = currentId
            ? document.querySelector(`.nav__links ol a[href="#${currentId}"]`)
            : null;
        navAnchors.forEach((a) => a.classList.remove('active'));
        if (activeLink) activeLink.classList.add('active');

        if (!hashUpdateEnabled) return;

        const targetHash = (!currentId || currentId === 'hero') ? '' : `#${currentId}`;
        const currentHash = window.location.hash || '';
        if (targetHash !== currentHash) {
            history.replaceState(null, '', targetHash || window.location.pathname);
        }
    }

    window.addEventListener('scroll', updateActiveSection, { passive: true });
    updateActiveSection();
})();
