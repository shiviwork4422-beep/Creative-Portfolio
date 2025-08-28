// Animated CV JavaScript - Interactive Elements and Animations

document.addEventListener('DOMContentLoaded', function() {
    // Loading Screen
    const loader = document.getElementById('loader');
    const nav = document.getElementById('nav');
    
    // Hide loader after content loads
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = 'auto';
        
        // Start typing effect after loader is hidden
        setTimeout(() => {
            startTypingEffect();
        }, 500);
    }, 2000);

    // Typing Effect for Hero Title
    const typingText = document.getElementById('typingText');
    const text = 'Shivanshu Nagvanshi';
    let index = 0;

    function startTypingEffect() {
        typingText.textContent = ''; // Clear any existing text
        index = 0;
        typeWriter();
    }

    function typeWriter() {
        if (index < text.length) {
            typingText.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 150); // Slightly faster typing for longer name
        }
    }

    // Scroll Progress Bar
    const scrollProgress = document.getElementById('scrollProgress');
    
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / documentHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    }

    window.addEventListener('scroll', updateScrollProgress);

    // Animated Counter for Stats
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Handle stat counters
                if (element.classList.contains('stat-number')) {
                    const target = parseInt(element.getAttribute('data-target'));
                    animateCounter(element, target);
                }
                
                // Handle skill bars
                if (element.classList.contains('skill-progress')) {
                    const width = element.getAttribute('data-width');
                    element.style.setProperty('--target-width', width + '%');
                    element.style.width = width + '%';
                }
                
                // Handle skill circles
                if (element.classList.contains('skill-circle')) {
                    const percentage = element.getAttribute('data-percentage');
                    const angle = (percentage / 100) * 360;
                    const circleProgress = element.querySelector('.circle-progress');
                    circleProgress.style.setProperty('--target-angle', angle + 'deg');
                    circleProgress.style.background = `conic-gradient(var(--color-teal-300) ${angle}deg, rgba(119, 124, 124, 0.2) 0deg)`;
                }
                
                // Add animation classes for elements that need them
                element.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const elementsToObserve = [
        ...document.querySelectorAll('.stat-number'),
        ...document.querySelectorAll('.skill-progress'),
        ...document.querySelectorAll('.skill-circle'),
        ...document.querySelectorAll('.project-card'),
        ...document.querySelectorAll('.achievement-card'),
        ...document.querySelectorAll('.timeline-item')
    ];

    elementsToObserve.forEach(el => observer.observe(el));

    // Navigation Links - Fixed smooth scrolling
    const navLinks = document.querySelectorAll('.nav-link');
    const navBrand = document.querySelector('.nav-brand');
    
    // Function to scroll to section
    function scrollToSection(targetId) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80; // Account for fixed nav
            const elementPosition = targetElement.offsetTop;
            const offsetPosition = elementPosition - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            return true;
        }
        return false;
    }
    
    // Add click handlers to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const targetId = link.getAttribute('href');
            console.log('Navigating to:', targetId);
            
            if (scrollToSection(targetId)) {
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });

    // Brand logo click handler - scroll to top
    if (navBrand) {
        navBrand.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Update active link to About
            navLinks.forEach(l => l.classList.remove('active'));
            const aboutLink = document.querySelector('.nav-link[href="#about"]');
            if (aboutLink) aboutLink.classList.add('active');
        });
        
        // Make brand clickable
        navBrand.style.cursor = 'pointer';
    }

    // Add active class to nav links based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    // Enhanced hover effects for project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-20px) rotateX(5deg) scale(1.02)';
            card.style.boxShadow = '0 30px 60px rgba(50, 184, 198, 0.4)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0deg) scale(1)';
            card.style.boxShadow = 'none';
        });
    });

    // Ensure project links work properly
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach(link => {
        // Add click event listener to ensure links work
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.includes('drive.google.com')) {
                // Let the default behavior handle opening in new tab
                console.log('Opening project link:', href);
            }
        });

        // Enhanced hover effect for project links
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-3px) scale(1.05)';
            link.style.boxShadow = '0 10px 25px rgba(50, 184, 198, 0.5)';
        });

        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0) scale(1)';
            link.style.boxShadow = '0 10px 25px rgba(50, 184, 198, 0.4)';
        });
    });

    // Mouse follow effect for cursor
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    // Create custom cursor
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: var(--color-teal-300);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.1s ease;
        opacity: 0;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.opacity = '1';
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = cursorX - 10 + 'px';
        cursor.style.top = cursorY - 10 + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();

    // Hide cursor when mouse leaves window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });

    // Enhanced button hover effects
    const buttons = document.querySelectorAll('.project-link, .contact-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursor.style.background = 'var(--color-teal-400)';
        });
        
        button.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'var(--color-teal-300)';
        });
    });

    // Parallax scrolling for background particles
    const particles = document.querySelectorAll('.particle');
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        particles.forEach((particle, index) => {
            const speed = (index + 1) * 0.5;
            particle.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }

    window.addEventListener('scroll', updateParallax);

    // Dynamic skill bar animations on scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight && rect.bottom > 0) {
                const targetWidth = bar.getAttribute('data-width');
                bar.style.width = targetWidth + '%';
                
                // Add shimmer effect
                setTimeout(() => {
                    bar.classList.add('shimmer-active');
                }, 500);
            }
        });
    }

    window.addEventListener('scroll', animateSkillBars);

    // Interactive timeline animations
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    function animateTimeline() {
        timelineItems.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight * 0.8) {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 300);
            }
        });
    }

    window.addEventListener('scroll', animateTimeline);

    // Achievement cards stagger animation
    const achievementCards = document.querySelectorAll('.achievement-card');
    
    function animateAchievements() {
        achievementCards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight * 0.8) {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, index * 150);
            }
        });
    }

    window.addEventListener('scroll', animateAchievements);

    // Project card 3D tilt effect
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = -(x - centerX) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-20px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });

    // Glowing effect for navigation brand
    const navBrandElement = document.querySelector('.nav-brand');
    
    setInterval(() => {
        navBrandElement.style.textShadow = `
            0 0 5px var(--color-teal-300),
            0 0 10px var(--color-teal-300),
            0 0 15px var(--color-teal-300),
            0 0 20px var(--color-teal-300)
        `;
        
        setTimeout(() => {
            navBrandElement.style.textShadow = `
                0 0 10px var(--color-teal-300),
                0 0 20px var(--color-teal-300),
                0 0 30px var(--color-teal-300),
                0 0 40px var(--color-teal-300)
            `;
        }, 1000);
    }, 2000);

    // Contact section scroll animation
    const contactSection = document.querySelector('.contact');
    
    function animateContact() {
        const rect = contactSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight * 0.8) {
            contactSection.style.opacity = '1';
            contactSection.style.transform = 'translateY(0)';
        }
    }

    window.addEventListener('scroll', animateContact);

    // Enhanced loading animation sequence
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 2000);

    // Initialize scroll-triggered animations
    function initScrollAnimations() {
        const elements = document.querySelectorAll('[data-animate]');
        
        elements.forEach(element => {
            observer.observe(element);
        });
    }

    // Performance optimization: Throttle scroll events
    let ticking = false;

    function throttledScrollHandler() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateScrollProgress();
                updateActiveNavLink();
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', throttledScrollHandler);

    // Add CSS for enhanced animations
    const style = document.createElement('style');
    style.textContent = `
        .custom-cursor {
            mix-blend-mode: difference;
            transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        .shimmer-active::after {
            animation: shimmer 2s ease-in-out;
        }
        
        .nav-link.active {
            color: var(--color-teal-300);
        }
        
        .nav-link.active::after {
            width: 100%;
        }
        
        .loaded .hero-content {
            animation: heroEntrance 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }
        
        @keyframes heroEntrance {
            0% {
                opacity: 0;
                transform: translateY(100px) scale(0.8);
            }
            100% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        .contact {
            opacity: 0;
            transform: translateY(50px);
            transition: all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        /* Enhanced project link styling */
        .project-link {
            transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        .project-link:active {
            transform: translateY(0) scale(0.98);
        }
        
        /* Social media and Instagram focused animations */
        .project-card[data-category="video"] .project-overlay i {
            animation: pulse 2s ease-in-out infinite;
        }
        
        .project-card[data-category="content"] .project-overlay i {
            animation: rotate 3s linear infinite;
        }
        
        @keyframes pulse {
            0%, 100% { 
                transform: scale(1);
                opacity: 1;
            }
            50% { 
                transform: scale(1.1);
                opacity: 0.8;
            }
        }
        
        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        /* Enhanced Instagram reel themed effects */
        .skill-circle[data-percentage="90"] .circle-progress {
            box-shadow: 0 0 20px var(--color-teal-300);
        }
        
        .achievement-card:nth-child(2) {
            background: linear-gradient(135deg, rgba(50, 184, 198, 0.1), rgba(50, 184, 198, 0.05));
        }
        
        .achievement-card:nth-child(3) {
            background: linear-gradient(135deg, rgba(50, 184, 198, 0.05), rgba(50, 184, 198, 0.1));
        }
    `;
    document.head.appendChild(style);

    // Initialize all animations
    setTimeout(() => {
        initScrollAnimations();
        animateSkillBars();
        animateTimeline();
        animateAchievements();
        animateContact();
    }, 3000);

    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Reset any active states
            projectCards.forEach(card => {
                card.style.transform = 'none';
                card.style.boxShadow = 'none';
            });
        }
        
        // Navigation with arrow keys
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            const sections = ['about', 'skills', 'experience', 'projects', 'contact'];
            const currentSection = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom > 100;
                }
                return false;
            });
            
            if (currentSection) {
                const currentIndex = sections.indexOf(currentSection);
                let nextIndex = currentIndex;
                
                if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
                    nextIndex = currentIndex + 1;
                } else if (e.key === 'ArrowUp' && currentIndex > 0) {
                    nextIndex = currentIndex - 1;
                }
                
                if (nextIndex !== currentIndex) {
                    const nextSection = document.getElementById(sections[nextIndex]);
                    if (nextSection) {
                        const offsetPosition = nextSection.offsetTop - 80;
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            }
        }
    });

    // Performance monitoring
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Cleanup any expensive operations after scrolling stops
        }, 150);
    });

    // Accessibility: Respect reduced motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        // Disable complex animations for users who prefer reduced motion
        document.documentElement.style.setProperty('--duration-fast', '0.01ms');
        document.documentElement.style.setProperty('--duration-normal', '0.01ms');
        
        // Remove cursor effects
        cursor.style.display = 'none';
    }

    // Social media focused interactions
    const socialMediaElements = document.querySelectorAll('[data-category="video"], [data-category="content"]');
    
    socialMediaElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            // Add special glow effect for social media content
            element.style.boxShadow = '0 0 30px rgba(50, 184, 198, 0.6), 0 0 60px rgba(50, 184, 198, 0.3)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.boxShadow = '';
        });
    });

    // Instagram reel inspired loading sequence
    function instagramReelLoader() {
        const loader = document.querySelector('.loader-circle');
        if (loader) {
            // Add Instagram-like gradient animation
            loader.style.background = 'conic-gradient(from 0deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d, #f56040, #f77737, #fcaf45, #ffdc80)';
            loader.style.borderRadius = '50%';
        }
    }

    // Call Instagram-themed loader
    instagramReelLoader();

    // Debug logging
    console.log('🎨 Shivanshu Nagvanshi - Creative Portfolio Loaded Successfully!');
    console.log('✨ All animations and interactions are now active');
    console.log('📱 Instagram reel specialist portfolio ready');
    console.log('📍 Navigation links:', navLinks.length);
    console.log('🔗 Project links:', projectLinks.length);
    console.log('🎯 Focusing on graphic design and content creation');
});