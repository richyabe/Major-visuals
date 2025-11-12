// === MAJOR VISUALS - SCRIPT.JS ===
// Handles navbar, menu toggle, and smooth animations

document.addEventListener("DOMContentLoaded", () => {
  // Select elements
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // ✅ Navbar Toggle with Hamburger Animation
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      // Toggle active classes
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close menu when any link is clicked
    navLinks.forEach(link =>
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      })
    );
  } else {
    console.error("❌ Navbar elements not found in DOM.");
  }

  // ✅ Optional: Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      !hamburger.contains(e.target) &&
      !navMenu.contains(e.target)
    ) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    }
  });

  // ✅ Smooth Scroll for nav links
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (targetId.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 70,
            behavior: "smooth"
          });
        }
      }
    });
  });

  // ✅ Scroll effect for navbar background
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector("nav");
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // === ADDITIONAL FEATURES TO PRESERVE YOUR EXISTING DESIGN ===
  
  // Initialize Typed.js for hero title
  if (typeof Typed !== 'undefined') {
    new Typed('#typed-title', {
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

  // Initialize GSAP animations
  if (typeof gsap !== 'undefined') {
    // WhatsApp floating button animation
    gsap.to('.whatsapp-float', {
      scale: 1.1,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    // Add scroll progress indicator
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

  // Form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
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

  // Initialize Three.js if available
  if (typeof THREE !== 'undefined') {
    const canvas = document.getElementById('three-canvas');
    if (canvas) {
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
  }

  // Back to Top Button
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.style.display = 'flex';
      } else {
        backToTopBtn.style.display = 'none';
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Loading screen
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    window.addEventListener('load', function() {
      loadingScreen.style.opacity = '0';
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 1000);
    });
  }

  // Micro interactions for cards
  document.querySelectorAll('.service-card, .course-card, .app-card, .testimonial-card, .feature-item').forEach(card => {
    card.addEventListener('mouseenter', function() {
      if (typeof gsap !== 'undefined') {
        gsap.to(this, {
          scale: 1.02,
          duration: 0.3,
          boxShadow: '0 0 30px rgba(124, 58, 237, 0.7)'
        });
      }
    });
    
    card.addEventListener('mouseleave', function() {
      if (typeof gsap !== 'undefined') {
        gsap.to(this, {
          scale: 1,
          duration: 0.3,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
        });
      }
    });
  });

  // Button animations
  document.querySelectorAll('.btn-course, .btn-app').forEach(button => {
    button.addEventListener('mouseenter', function() {
      if (typeof gsap !== 'undefined') {
        gsap.to(this, {
          scale: 1.05,
          duration: 0.2,
          boxShadow: '0 8px 25px rgba(124, 58, 237, 0.5)'
        });
      }
    });
    
    button.addEventListener('mouseleave', function() {
      if (typeof gsap !== 'undefined') {
        gsap.to(this, {
          scale: 1,
          duration: 0.2,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
        });
      }
    });
  });

  // Social media hover effects
  document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
      if (typeof gsap !== 'undefined') {
        gsap.to(this, {
          scale: 1.2,
          rotation: 10,
          duration: 0.3,
          color: '#0F172A'
        });
      }
    });
    
    link.addEventListener('mouseleave', function() {
      if (typeof gsap !== 'undefined') {
        gsap.to(this, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          color: '#FFFFFF'
        });
      }
    });
  });

  // Parallax effect for hero section
  window.addEventListener('scroll', function() {
    const parallax = document.querySelector('.hero');
    if (parallax) {
      const scrolled = window.pageYOffset;
      const speed = scrolled * 0.5;
      parallax.style.transform = `translateY(${speed}px)`;
    }
  });

  // Add confetti effect on button clicks
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
      createConfetti();
    });
  });

  // Confetti effect function
  function createConfetti() {
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
});
