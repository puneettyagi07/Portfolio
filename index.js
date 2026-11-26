// Portfolio Interactive JS
document.addEventListener('DOMContentLoaded', () => {
    // Low threshold ensures tall stacked sections always reveal reliably on mobile
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -25px 0px',
        threshold: 0.02
    };

    const revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    obs.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(el => observer.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('active'));
    }

    // Navbar scroll styling
    const navbar = document.getElementById('navbar');
    const navContainer = document.getElementById('nav-container');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-[#0b0b0f]/90', 'backdrop-blur-xl', 'border-white/10');
            navbar.classList.remove('border-transparent');
            navContainer.classList.add('py-3', 'md:py-4');
            navContainer.classList.remove('py-5', 'md:py-6');
        } else {
            navbar.classList.remove('bg-[#0b0b0f]/90', 'backdrop-blur-xl', 'border-white/10');
            navbar.classList.add('border-transparent');
            navContainer.classList.remove('py-3', 'md:py-4');
            navContainer.classList.add('py-5', 'md:py-6');
        }
    }, { passive: true });

    // Mobile menu toggle
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.remove('translate-x-full');
            menuIcon.classList.remove('ph-list');
            menuIcon.classList.add('ph-x');
            document.body.classList.add('mobile-menu-open');
        } else {
            mobileMenu.classList.add('translate-x-full');
            menuIcon.classList.remove('ph-x');
            menuIcon.classList.add('ph-list');
            document.body.classList.remove('mobile-menu-open');
        }
    }

    if (menuBtn) {
        menuBtn.addEventListener('click', toggleMenu);
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) toggleMenu();
        });
    });

    // Quick Up/Down scroll controls for Experience & Projects containers (great for mobile & trackpads)
    document.querySelectorAll('[data-scroll-target]').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-scroll-target');
            const direction = btn.getAttribute('data-scroll-dir');
            const container = document.getElementById(targetId);
            if (!container) return;

            const step = Math.round(container.clientHeight * 0.75);
            container.scrollBy({
                top: direction === 'down' ? step : -step,
                behavior: 'smooth'
            });
        });
    });
});
