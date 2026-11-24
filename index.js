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
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) toggleMenu();
        });
    });

    // Real-Time Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const btnIcon = document.getElementById('btn-icon');
    const formStatus = document.getElementById('form-status');

    function showStatus(message, type) {
        formStatus.textContent = message;
        formStatus.classList.remove(
            'hidden',
            'bg-emerald-500/10', 'border-emerald-500/40', 'text-emerald-300',
            'bg-red-500/10', 'border-red-500/40', 'text-red-300',
            'bg-amber-500/10', 'border-amber-500/40', 'text-amber-300'
        );

        if (type === 'success') {
            formStatus.classList.add('bg-emerald-500/10', 'border-emerald-500/40', 'text-emerald-300');
        } else if (type === 'warning') {
            formStatus.classList.add('bg-amber-500/10', 'border-amber-500/40', 'text-amber-300');
        } else {
            formStatus.classList.add('bg-red-500/10', 'border-red-500/40', 'text-red-300');
        }
    }

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const accessKey = formData.get('access_key');

            if (!accessKey || accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY') {
                showStatus('Setup incomplete: Add your Web3Forms access_key inside contact.html first.', 'warning');
                return;
            }

            // Set loading state
            submitBtn.disabled = true;
            btnText.textContent = 'Sending...';
            btnIcon.className = 'ph-bold ph-spinner animate-spin';

            const payload = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                const result = await response.json();

                if (response.ok && result.success) {
                    showStatus('Message sent successfully! Puneet will get back to you shortly.', 'success');
                    contactForm.reset();
                } else {
                    showStatus(result.message || 'Unable to send message. Please try again.', 'error');
                }
            } catch (error) {
                showStatus('Network error. Please check your connection or email puneettyagi1997@gmail.com directly.', 'error');
            } finally {
                submitBtn.disabled = false;
                btnText.textContent = 'Send Message';
                btnIcon.className = 'ph-bold ph-paper-plane-right transform group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform';
            }
        });
    }
});