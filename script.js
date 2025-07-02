// DOM Elements
const header = document.getElementById('header');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');
const submitBtn = document.getElementById('submitBtn');
const backToTopBtn = document.getElementById('backToTop');
const currentYearSpan = document.getElementById('currentYear');

// Initialize Lucide icons
lucide.createIcons();

// Set current year
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

// Header scroll effect
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add scrolled class for styling
    if (scrollTop > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Show/hide back to top button
    if (scrollTop > 300) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
    
    lastScrollTop = scrollTop;
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    
    if (mobileMenu.classList.contains('active')) {
        mobileMenu.style.display = 'block';
        icon.setAttribute('data-lucide', 'x');
    } else {
        mobileMenu.style.display = 'none';
        icon.setAttribute('data-lucide', 'menu');
    }
    
    // Recreate icons after changing
    lucide.createIcons();
});

// Close mobile menu when clicking on links
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileMenu.style.display = 'none';
        const icon = mobileMenuBtn.querySelector('i');
        icon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
    });
});

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = header.offsetHeight;
        const elementPosition = element.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Add click listeners to navigation links
const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link, .footer-link');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            const sectionId = href.substring(1);
            scrollToSection(sectionId);
        }
    });
});

// Back to top functionality
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact form handling
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Validate form data
    if (!data.name || !data.email || !data.subject || !data.message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Show loading state
    const originalContent = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<div class="loading"></div> Sending...';
    
    try {
        // Simulate form submission (replace with actual API call)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success message
        successMessage.style.display = 'flex';
        contactForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error sending your message. Please try again.');
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalContent;
        lucide.createIcons();
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.skill-category, .project-card, .service-card, .education-item');
animateElements.forEach(el => {
    observer.observe(el);
});

// Add animation classes
const style = document.createElement('style');
style.textContent = `
    .skill-category,
    .project-card,
    .service-card,
    .education-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .skill-category.animate-in,
    .project-card.animate-in,
    .service-card.animate-in,
    .education-item.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Add active link styles
const activeStyle = document.createElement('style');
activeStyle.textContent = `
    .nav-link.active {
        color: #0d9488;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(activeStyle);

// Update active link on scroll
window.addEventListener('scroll', updateActiveNavLink);

// Typing animation for hero subtitle
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        typeWriter(heroSubtitle, originalText, 80);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Smooth reveal animation for sections
const revealElements = document.querySelectorAll('.section-header, .about-text, .contact-info-section');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    revealObserver.observe(el);
});

// Skills animation on scroll
const skillItems = document.querySelectorAll('.skill-item');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.5 });

skillItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'all 0.4s ease';
    skillObserver.observe(item);
});

// Project card hover effects
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-12px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Service card interactions
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    const btn = card.querySelector('.service-btn');
    
    btn.addEventListener('click', () => {
        // Simulate service selection
        btn.innerHTML = '<i data-lucide="check"></i> Selected!';
        btn.style.background = '#059669';
        
        setTimeout(() => {
            btn.innerHTML = 'Get Started';
            btn.style.background = '';
            lucide.createIcons();
        }, 2000);
        
        lucide.createIcons();
    });
});

// Form input animations
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
    
    // Check if input has value on load
    if (input.value) {
        input.parentElement.classList.add('focused');
    }
});

// Add focused input styles
const inputStyle = document.createElement('style');
inputStyle.textContent = `
    .form-group.focused label {
        color: #0d9488;
        transform: translateY(-2px);
    }
`;
document.head.appendChild(inputStyle);

// Lazy loading for images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Preloader (if needed)
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Initialize all animations
    lucide.createIcons();
    updateActiveNavLink();
});

// Error handling for missing elements
function safeAddEventListener(element, event, handler) {
    if (element) {
        element.addEventListener(event, handler);
    }
}

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        mobileMenu.style.display = 'none';
        const icon = mobileMenuBtn.querySelector('i');
        icon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScroll = throttle(() => {
    updateActiveNavLink();
}, 100);

window.addEventListener('scroll', throttledScroll);

// Console welcome message
console.log(`
🚀 Welcome to Arnab Das's Portfolio!
📧 Contact: arnabcse2003@gmail.com
💼 LinkedIn: linkedin.com/in/arnabdas2003
🌟 Built with HTML, CSS & JavaScript
`);