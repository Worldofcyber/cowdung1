// ========================================
// NAVIGATION & SECTION MANAGEMENT
// ========================================

function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }
    
    updateNavigationState(sectionId);
    
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    sessionStorage.setItem('currentSection', sectionId);
}

function updateNavigationState(activeSectionId) {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.classList.remove('active-link');
        
        const linkText = link.textContent.toLowerCase().trim();
        if (linkText === activeSectionId.toLowerCase()) {
            link.classList.add('active-link');
        }
    });
}

// ========================================
// FORM HANDLING
// ========================================

function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    
    const formData = {
        fullName: form.fullName.value,
        email: form.email.value,
        phone: form.phone.value,
        quantity: form.quantity.value,
        product: form.product.value,
        message: form.message.value
    };
    
    if (!validateForm(formData)) {
        return false;
    }
    
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showNotification('Thank you for your inquiry! We will contact you shortly.', 'success');
        
        form.reset();
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        console.log('Form submitted:', formData);
    }, 1500);
    
    return false;
}

function validateForm(data) {
    if (!data.fullName || !data.email || !data.phone || !data.message) {
        showNotification('Please fill in all required fields.', 'error');
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
    }
    
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    if (!phoneRegex.test(data.phone)) {
        showNotification('Please enter a valid phone number.', 'error');
        return false;
    }
    
    return true;
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 2rem',
        borderRadius: '10px',
        backgroundColor: type === 'success' ? '#A8C686' : type === 'error' ? '#E07A5F' : '#E2A76F',
        color: 'white',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: '1000',
        animation: 'slideInRight 0.3s ease-out',
        maxWidth: '400px',
        fontWeight: '500'
    });
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// ========================================
// SCROLL ANIMATIONS
// ========================================

function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .product-card, .info-card, .stat-card, .benefit-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

function initScrollAnimations() {
    const elements = document.querySelectorAll('.feature-card, .product-card, .info-card, .stat-card, .benefit-card');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    
    animateOnScroll();
}

// ========================================
// BACK TO TOP BUTTON
// ========================================

function initBackToTop() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'back-to-top';
    
    Object.assign(button.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: '#A8C686',
        color: 'white',
        border: 'none',
        fontSize: '24px',
        cursor: 'pointer',
        display: 'none',
        zIndex: '999',
        boxShadow: '0 4px 12px rgba(168, 198, 134, 0.3)',
        transition: 'all 0.3s ease'
    });
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.backgroundColor = '#B9D8A0';
        button.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.backgroundColor = '#A8C686';
        button.style.transform = 'scale(1)';
    });
}

// ========================================
// COUNTER ANIMATION
// ========================================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : element.textContent.includes('%') ? '%' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : element.textContent.includes('%') ? '%' : '');
        }
    }, 16);
}

function initCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    const number = parseInt(text.replace(/\D/g, ''));
                    
                    if (number) {
                        animateCounter(stat, number);
                    }
                });
                animated = true;
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// ========================================
// INITIALIZE
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('EcoFuel Solutions website loaded successfully!');
    
    initScrollAnimations();
    initBackToTop();
    initCounters();
    
    const lastSection = sessionStorage.getItem('currentSection');
    if (lastSection) {
        showSection(lastSection);
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'h' || e.key === 'H') {
            showSection('home');
        }
        if (e.key === 'a' || e.key === 'A') {
            showSection('about');
        }
        if (e.key === 'b' || e.key === 'B') {
            showSection('blog');
        }
        if (e.key === 'c' || e.key === 'C') {
            showSection('contact');
        }
    });
});

// ========================================
// ANIMATIONS CSS
// ========================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
