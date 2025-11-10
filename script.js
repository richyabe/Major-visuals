// Initialize GSAP
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Loading Screen
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    gsap.to(loadingScreen, {
        opacity: 0,
        duration: 1,
        onComplete: function() {
            loadingScreen.style.display = 'none';
            // Start main animations after loading
            initMainAnimations();
        }
    });
});

// Main Animations Initialization
function initMainAnimations() {
    // Initialize Three.js
    initThreeJS();
    
    // Initialize Typed.js
    initTypedJS();
    
    // Initialize Navigation
    initNavigation();
    
    // Initialize Forms
    initForms();
    
    // Initialize Buttons
    initButtons();
    
    // Initialize Social Media
    initSocialMedia();
    
    // Initialize Back to Top
    initBackToTop();
    
    // Initialize Micro Interactions
    initMicroInteractions();
}

// Navigation
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.9)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        }
    });
}

// Typed.js for hero title
function initTypedJS() {
    const typed = new Typed('#typed-title', {
        strings: [
            'Professional Video Editing',
            'Graphic Design Training',
            'Motion Graphics & Animation',
            'Visual Content Creation'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });
}

// Three.js background
function initThreeJS() {
    const canvas = document.getElementById('three-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    
    const posArray = new Float32Array(particlesCount * 3);
    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 20;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x7C3AED, // Purple
        transparent: true,
        opacity: 0.6
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    camera.position.z = 5;
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        particlesMesh.rotation.x += 0.001;
        particlesMesh.rotation.y += 0.001;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Form submission
function initForms() {
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Send to WhatsApp
        const whatsappMessage = `Hello Major Visuals!\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        window.open(`https://wa.me/2349045962422?text=${encodedMessage}`, '_blank');
        
        // Reset form
        this.reset();
        
        // Show success message
        alert('Message sent! We will contact you via WhatsApp soon.');
    });
}

// Button animations
function initButtons() {
    // Course purchase buttons animation
    document.querySelectorAll('.btn-course, .btn-app').forEach(button => {
        button.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.05,
                duration: 0.2,
                boxShadow: '0 8px 25px rgba(124, 58, 237, 0.5)'
            });
        });
        
        button.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                duration: 0.2,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
            });
        });
    });

    // WhatsApp floating button animation
    gsap.to('.whatsapp-float', {
        scale: 1.1,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
    });
}

// Social Media Links
function initSocialMedia() {
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.2,
                rotation: 10,
                duration: 0.3,
                color: '#0F172A'
            });
        });
        
        link.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                color: '#FFFFFF'
            });
        });
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        gsap.to(window, {
            duration: 1,
            scrollTo: 0,
            ease: "power2.inOut"
        });
    });
}

// Micro Interactions
function initMicroInteractions() {
    // Hover effects for service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.02,
                duration: 0.3,
                boxShadow: '0 0 30px rgba(124, 58, 237, 0.7)'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
            });
        });
    });

    // Hover effects for course cards
    document.querySelectorAll('.course-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                y: -10,
                scale: 1.02,
                duration: 0.3,
                boxShadow: '0 0 30px rgba(124, 58, 237, 0.7)'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                y: 0,
                scale: 1,
                duration: 0.3,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
            });
        });
    });

    // Hover effects for app cards
    document.querySelectorAll('.app-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.02,
                duration: 0.3,
                boxShadow: '0 0 30px rgba(5, 150, 105, 0.7)'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
            });
        });
    });

    // Hover effects for testimonial cards
    document.querySelectorAll('.testimonial-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                y: -10,
                scale: 1.02,
                duration: 0.3,
                boxShadow: '0 0 30px rgba(5, 150, 105, 0.5)'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                y: 0,
                scale: 1,
                duration: 0.3,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
            });
        });
    });

    // Hover effects for feature items
    document.querySelectorAll('.feature-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.02,
                y: -5,
                duration: 0.3,
                boxShadow: '0 0 30px rgba(5, 150, 105, 0.5)'
            });
        });
        
        item.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                y: 0,
                duration: 0.3,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
            });
        });
    });

    // Scroll indicator animation
    document.querySelectorAll('.scroll-indicator').forEach(indicator => {
        indicator.addEventListener('click', function() {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: window.innerHeight,
                    offsetY: 0
                },
                ease: "power2.inOut"
            });
        });
    });
}

// Smooth scrolling for navigation links
function initScrollToLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: target,
                    ease: "power2.inOut"
                });
            }
        });
    });
}

// Performance monitoring
function initPerformanceMonitoring() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart);
        });
    }
}

// Error handling
function initErrorHandling() {
    window.addEventListener('error', function(e) {
        console.error('Error:', e.error);
    });
}

// Mobile menu toggle animation
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        const bars = this.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (this.classList.contains('active')) {
                bar.style.transform = index === 1 ? 'scale(0)' : `rotate(${index === 0 ? 45 : -45}deg)`;
            } else {
                bar.style.transform = 'none';
            }
        });
    });
}

// Initialize all functions
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initTypedJS();
    initThreeJS();
    initForms();
    initButtons();
    initSocialMedia();
    initBackToTop();
    initMicroInteractions();
    initScrollToLinks();
    initPerformanceMonitoring();
    initErrorHandling();
    initMobileMenu();
});

// Add scroll progress indicator
function addScrollProgress() {
    const progress = document.createElement('div');
    progress.id = 'scroll-progress';
    progress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #1E3A8A, #7C3AED);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progress);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progress.style.width = scrollPercent + '%';
    });
}

addScrollProgress();

// Add confetti effect on button clicks
function addConfettiEffect() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9998;
    `;
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 150;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: -20,
            radius: Math.random() * 4 + 2,
            color: `hsl(${Math.random() * 360}, 70%, 60%)`,
            speed: Math.random() * 3 + 2,
            angle: Math.random() * Math.PI * 2
        });
    }
    
    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        let active = false;
        particles.forEach(particle => {
            particle.y += particle.speed;
            particle.x += Math.cos(particle.angle) * 1;
            particle.angle += 0.05;
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
            
            if (particle.y < canvas.height) {
                active = true;
            }
        });
        
        if (active) {
            requestAnimationFrame(animateConfetti);
        } else {
            setTimeout(() => {
                document.body.removeChild(canvas);
            }, 1000);
        }
    }
    
    animateConfetti();
}

// Add confetti on button clicks
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', addConfettiEffect);
});

// Add ripple effect to buttons
function addRippleEffect() {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add ripple animation to CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

addRippleEffect();

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Add hover effect to contact items
document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        gsap.to(this, {
            x: 10,
            duration: 0.3,
            boxShadow: '0 0 20px rgba(124, 58, 237, 0.3)'
        });
    });
    
    item.addEventListener('mouseleave', function() {
        gsap.to(this, {
            x: 0,
            duration: 0.3,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
        });
    });
});

// Add particle explosion effect on page load
function addParticleExplosion() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9997;
    `;
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 300;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            vx: (Math.random() - 0.5) * 10,
            vy: (Math.random() - 0.5) * 10,
            radius: Math.random() * 3 + 1,
            color: `hsl(${Math.random() * 360}, 70%, 60%)`,
            life: 100
        });
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        let active = false;
        particles.forEach(particle => {
            if (particle.life > 0) {
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.life--;
                
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.globalAlpha = particle.life / 100;
                ctx.fill();
                
                active = true;
            }
        });
        
        if (active) {
            requestAnimationFrame(animateParticles);
        } else {
            setTimeout(() => {
                document.body.removeChild(canvas);
            }, 1000);
        }
    }
    
    animateParticles();
}

// Add particle explosion on page load
window.addEventListener('load', addParticleExplosion);

// Add scroll-to-top animation
document.getElementById('back-to-top').addEventListener('click', function() {
    gsap.to(window, {
        duration: 1,
        scrollTo: 0,
        ease: "power2.inOut"
    });
});

// Add hover effect to scroll indicator
document.querySelector('.scroll-indicator').addEventListener('mouseenter', function() {
    gsap.to(this, {
        y: -5,
        duration: 0.3,
        scale: 1.1
    });
});

document.querySelector('.scroll-indicator').addEventListener('mouseleave', function() {
    gsap.to(this, {
        y: 0,
        duration: 0.3,
        scale: 1
    });
});

// Add hover effect to hamburger menu
document.querySelector('.hamburger').addEventListener('mouseenter', function() {
    gsap.to(this, {
        scale: 1.1,
        duration: 0.2
    });
});

document.querySelector('.hamburger').addEventListener('mouseleave', function() {
    gsap.to(this, {
        scale: 1,
        duration: 0.2
    });
});

// Add hover effect to nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        gsap.to(this, {
            y: -2,
            duration: 0.2,
            color: '#7C3AED'
        });
    });
    
    link.addEventListener('mouseleave', function() {
        gsap.to(this, {
            y: 0,
            duration: 0.2,
            color: '#F1F5F9'
        });
    });
});

// Add pulse effect to service icons
gsap.utils.toArray('.service-icon').forEach(icon => {
    gsap.to(icon, {
        scrollTrigger: {
            trigger: icon,
            start: "top 80%"
        },
        scale: 1.2,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
    });
});

// Add bounce effect to app icons
gsap.utils.toArray('.app-icon').forEach(icon => {
    gsap.to(icon, {
        scrollTrigger: {
            trigger: icon,
            start: "top 80%"
        },
        y: -10,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
    });
});

// Add rotation effect to feature icons
gsap.utils.toArray('.feature-icon').forEach(icon => {
    gsap.to(icon, {
        scrollTrigger: {
            trigger: icon,
            start: "top 80%"
        },
        rotation: 360,
        duration: 2,
        repeat: -1,
        ease: "linear"
    });
});

// Add floating effect to WhatsApp button
gsap.to('.whatsapp-float', {
    scrollTrigger: {
        trigger: 'body',
        scrub: 1
    },
    y: -5,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});

// Add shine effect to buttons
gsap.utils.toArray('.btn').forEach(button => {
    const shine = document.createElement('div');
    shine.style.cssText = `
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        transition: left 0.5s;
    `;
    button.style.position = 'relative';
    button.appendChild(shine);
    
    button.addEventListener('mouseenter', function() {
        shine.style.left = '100%';
    });
    
    button.addEventListener('mouseleave', function() {
        shine.style.left = '-100%';
    });
});

// Add floating effect to social links
gsap.utils.toArray('.social-link').forEach(link => {
    gsap.to(link, {
        scrollTrigger: {
            trigger: link,
            start: "top 80%"
        },
        y: -5,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
});

// Add hover effect to contact form inputs
document.querySelectorAll('.contact-form input, .contact-form textarea').forEach(input => {
    input.addEventListener('focus', function() {
        gsap.to(this, {
            scale: 1.02,
            boxShadow: '0 0 15px rgba(124, 58, 237, 0.3)',
            duration: 0.3
        });
    });
    
    input.addEventListener('blur', function() {
        gsap.to(this, {
            scale: 1,
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            duration: 0.3
        });
    });
});

// Add ripple effect to footer links
document.querySelectorAll('.footer-section ul li a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        gsap.to(this, {
            x: 5,
            color: '#7C3AED',
            duration: 0.3
        });
    });
    
    link.addEventListener('mouseleave', function() {
        gsap.to(this, {
            x: 0,
            color: '#64748B',
            duration: 0.3
        });
    });
});

// Add scroll snap for mobile
if ('scrollBehavior' in document.documentElement.style) {
    document.documentElement.style.scrollBehavior = 'smooth';
}

// Add touch events for mobile
document.querySelectorAll('.service-card, .course-card, .app-card').forEach(card => {
    card.addEventListener('touchstart', function() {
        gsap.to(this, {
            scale: 0.98,
            duration: 0.1
        });
    });
    
    card.addEventListener('touchend', function() {
        gsap.to(this, {
            scale: 1,
            duration: 0.1
        });
    });
});

// Add resize handler for performance
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Recalculate layouts after resize
        console.log('Window resized - layouts recalculated');
    }, 250);
});

// Add final performance metrics
if ('performance' in window) {
    window.addEventListener('load', function() {
        const perf = performance.getEntriesByType('navigation')[0];
        const loadTime = perf.loadEventEnd - perf.loadEventStart;
        const domContentLoaded = perf.domContentLoadedEventEnd - perf.domContentLoadedEventStart;
        
        console.log(`Page Load Time: ${loadTime}ms`);
        console.log(`DOM Content Loaded: ${domContentLoaded}ms`);
    });
}