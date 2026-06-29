<!-- Interactive JS -->
        document.addEventListener('DOMContentLoaded', () => {
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.15
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
            
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
            });

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

            menuBtn.addEventListener('click', toggleMenu);
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (isMenuOpen) toggleMenu();
                });
            });
        });