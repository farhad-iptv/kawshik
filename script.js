// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileNav = document.querySelector('.mobile-nav');
let isMenuOpen = false;

// Header Scroll Effect
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Stats Counter Animation
const stats = document.querySelectorAll('.stat-number');
let hasAnimated = false;

const animateValue = (obj, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentNumber = Math.floor(progress * (end - start) + start);
        obj.textContent = currentNumber;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

const startCountAnimation = () => {
    if (hasAnimated) return;
    
    stats.forEach(stat => {
        const finalNumber = parseInt(stat.textContent);
        animateValue(stat, 0, finalNumber, 2000);
    });
    
    hasAnimated = true;
};

// Intersection Observer for stats animation
const statsSection = document.querySelector('.hero-stats');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCountAnimation();
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

mobileMenuBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    mobileNav.style.display = isMenuOpen ? 'block' : 'none';
    mobileNav.classList.toggle('active');
    mobileMenuBtn.innerHTML = isMenuOpen ? 
        '<i class="fas fa-times"></i>' : 
        '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (isMenuOpen && !e.target.closest('.mobile-menu-btn') && !e.target.closest('.mobile-nav')) {
        isMenuOpen = false;
        mobileNav.style.display = 'none';
        mobileNav.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Close mobile menu when window is resized to desktop size
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && isMenuOpen) {
        isMenuOpen = false;
        mobileNav.style.display = 'none';
        mobileNav.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-box, .course-card, .mentor-card').forEach(el => {
    observer.observe(el);
});

// Add animation classes to elements
document.addEventListener('DOMContentLoaded', () => {
    // Add show class for mobile menu
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .nav-links.show,
            .auth-links.show {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: var(--white);
                padding: 1rem;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                animation: slideDown 0.3s ease-in-out;
            }

            .nav-links.show a,
            .auth-links.show a {
                margin: 0.5rem 0;
            }

            @keyframes slideDown {
                from { transform: translateY(-10px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        }

        .feature-box,
        .course-card,
        .mentor-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .feature-box.animate,
        .course-card.animate,
        .mentor-card.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});

// Course Card Hover Effect
document.querySelectorAll('.course-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
    });
});

// Mentor Card Image Effect
document.querySelectorAll('.mentor-card').forEach(card => {
    const img = card.querySelector('img');
    
    card.addEventListener('mouseenter', () => {
        img.style.filter = 'grayscale(0%)';
    });

    card.addEventListener('mouseleave', () => {
        img.style.filter = 'grayscale(100%)';
    });
});

// Initialize AOS (Animate on Scroll) like animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-box, .course-card, .mentor-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Form Validation (for future implementation)
const validateForm = (form) => {
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
};

// Language Selector
const languageSelect = document.querySelector('.language-select');
if (languageSelect) {
    languageSelect.addEventListener('change', (e) => {
        const language = e.target.value;
        // Here you can implement language change functionality
        console.log(`Language changed to: ${language}`);
    });
} 