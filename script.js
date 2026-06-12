// ========================================
// ERMERS ONLINE - Interactive JavaScript
// ========================================

// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-mode');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const theme = body.classList.contains('light-mode') ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
});

// ========================================
// N8N Logo Interactions
// ========================================
const n8nLogo = document.getElementById('n8nLogo');
const logoNodes = document.querySelectorAll('.logo-node');
const logoLines = document.querySelectorAll('.logo-line');

// Interactive hover effect
n8nLogo.addEventListener('mouseenter', () => {
    logoNodes.forEach((node, index) => {
        setTimeout(() => {
            node.style.transform = 'scale(1.3)';
            node.style.filter = 'url(#glow) brightness(1.5)';
        }, index * 50);
    });
    
    logoLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.strokeWidth = '3';
        }, index * 50);
    });
});

n8nLogo.addEventListener('mouseleave', () => {
    logoNodes.forEach(node => {
        node.style.transform = 'scale(1)';
        node.style.filter = 'url(#glow) brightness(1)';
    });
    
    logoLines.forEach(line => {
        line.style.opacity = '0.5';
        line.style.strokeWidth = '2';
    });
});

// Logo click animation
n8nLogo.addEventListener('click', () => {
    n8nLogo.style.animation = 'none';
    setTimeout(() => {
        n8nLogo.style.animation = '';
    }, 10);
    
    // Trigger special effect
    const specialGlow = document.querySelector('.logo-pulse');
    specialGlow.style.animation = 'none';
    setTimeout(() => {
        specialGlow.style.animation = '';
    }, 10);
    
    // Random rotation effect
    logoNodes.forEach((node, index) => {
        setTimeout(() => {
            const randomRotate = Math.random() * 360;
            node.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            node.style.transform = `rotate(${randomRotate}deg) scale(1.4)`;
            
            setTimeout(() => {
                node.style.transform = 'rotate(0deg) scale(1)';
            }, 600);
        }, index * 80);
    });
});

// ========================================
// Navbar Scroll Effect
// ========================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ========================================
// Typewriter Effect
// ========================================
const typewriter = document.getElementById('typewriter');
const texts = [
    'Een persoonlijke hubsite die dient als centraal startpunt voor navigatie.',
    'Toegang tot al uw netwerkapparatuur en servers.',
    'Beheer uw volledige infrastructuur vanaf één plek.',
    'Veilig, snel en altijd beschikbaar.'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 50;

function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typewriter.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 25;
    } else {
        typewriter.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 50;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        typingSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500; // Pause before next text
    }
    
    setTimeout(type, typingSpeed);
}

// Start typewriter effect
setTimeout(type, 1000);

// ========================================
// Animated Counter
// ========================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Animate stats when visible
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

const observerOptions = {
    threshold: 0.5
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            statNumbers.forEach(stat => {
                const target = parseFloat(stat.dataset.target);
                animateCounter(stat, target);
            });
        }
    });
}, observerOptions);

if (statNumbers.length > 0) {
    statsObserver.observe(statNumbers[0].parentElement.parentElement);
}

// ========================================
// Particle System
// ========================================
const particlesContainer = document.getElementById('particles');
const particleCount = 50;

function createParticles() {
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.width = (Math.random() * 3 + 2) + 'px';
        particle.style.height = particle.style.width;
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// ========================================
// Scroll Animations
// ========================================
const scrollElements = document.querySelectorAll('.service-card, .feature-item, .quick-link');

const elementInView = (el, offset = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset
    );
};

const displayScrollElement = (element) => {
    element.classList.add('scroll-animate', 'active');
};

const hideScrollElement = (element) => {
    element.classList.remove('active');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 100)) {
            displayScrollElement(el);
        }
    });
};

// Add scroll-animate class to elements
scrollElements.forEach((el, index) => {
    el.style.transitionDelay = (index * 0.1) + 's';
});

window.addEventListener('scroll', () => {
    handleScrollAnimation();
});

// Initial check
handleScrollAnimation();

// ========================================
// Smooth Scroll for Anchor Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ========================================
// Enhanced Navigation Interactions
// ========================================
const navItems = document.querySelectorAll('.nav-item');

navItems.forEach(item => {
    const navLink = item.querySelector('.nav-link');
    const dropdown = item.querySelector('.dropdown-menu');
    
    if (navLink && dropdown) {
        // Add glow effect on hover
        navLink.addEventListener('mouseenter', () => {
            navLink.style.boxShadow = '0 0 20px rgba(255, 107, 157, 0.3)';
        });
        
        navLink.addEventListener('mouseleave', () => {
            if (!item.matches(':hover')) {
                navLink.style.boxShadow = '';
            }
        });
    }
});

// ========================================
// Card Hover Effects with Mouse Movement
// ========================================
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ========================================
// Floating Animation for Feature Cards
// ========================================
const floatingCards = document.querySelectorAll('.floating-card');

floatingCards.forEach((card, index) => {
    // Add random floating motion
    setInterval(() => {
        const randomX = (Math.random() - 0.5) * 20;
        const randomY = (Math.random() - 0.5) * 20;
        card.style.transform = `translate(${randomX}px, ${randomY}px)`;
    }, 3000 + index * 1000);
});

// ========================================
// Add Ripple Effect to Buttons
// ========================================
const buttons = document.querySelectorAll('.btn, .dropdown-item, .quick-link');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple CSS dynamically
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// Performance Optimization: Throttle Scroll
// ========================================
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttle to scroll handler
window.addEventListener('scroll', throttle(handleScrollAnimation, 100));

// ========================================
// Easter Egg: Konami Code
// ========================================
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-konamiPattern.length);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        // Activate rainbow mode!
        document.body.style.animation = 'rainbow 5s infinite';
        n8nLogo.style.animation = 'rainbow 5s infinite, logo-float 4s ease-in-out infinite';
        
        const rainbowStyle = document.createElement('style');
        rainbowStyle.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(rainbowStyle);
        
        setTimeout(() => {
            document.body.style.animation = '';
            n8nLogo.style.animation = 'logo-float 4s ease-in-out infinite';
            rainbowStyle.remove();
        }, 10000);
    }
});

// ========================================
// Logo Orbital Animation on Scroll
// ========================================
window.addEventListener('scroll', () => {
    const scrollPercent = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
    const rotation = scrollPercent * 360;
    
    logoNodes.forEach((node, index) => {
        const delay = index * 60;
        node.style.transform = `rotate(${rotation + delay}deg)`;
    });
});

// ========================================
// Log Welcome Message
// ========================================
console.log('%c🚀 ERMERS ONLINE', 'font-size: 24px; font-weight: bold; color: #ff6b9d;');
console.log('%cWelkom! Deze site is gebouwd met liefde en moderne webtechnologie.', 'font-size: 14px; color: #b8b8b8;');
console.log('%cProbeer de Konami Code! ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA', 'font-size: 12px; color: #6b8cff;');
console.log('%c✨ Nieuwe features: Interactieve n8n logo & moderne navigatie!', 'font-size: 12px; color: #ff6b9d;');
