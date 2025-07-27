// Animation and visual effects
const Animations = {
    // Animation state
    observers: new Map(),
    animationQueue: [],
    isReducedMotion: false,
    
    // Initialize animations
    init: function() {
        this.checkReducedMotionPreference();
        this.setupIntersectionObserver();
        this.setupScrollAnimations();
        this.setupHoverEffects();
        this.bindEvents();
    },
    
    // Check for reduced motion preference
    checkReducedMotionPreference: function() {
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        // Listen for changes
        window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
            this.isReducedMotion = e.matches;
            this.updateAnimationSettings();
        });
    },
    
    // Update animation settings based on preferences
    updateAnimationSettings: function() {
        if (this.isReducedMotion) {
            document.documentElement.style.setProperty('--transition-fast', '0ms');
            document.documentElement.style.setProperty('--transition-normal', '0ms');
            document.documentElement.style.setProperty('--transition-slow', '0ms');
        } else {
            document.documentElement.style.setProperty('--transition-fast', '0.2s ease');
            document.documentElement.style.setProperty('--transition-normal', '0.3s ease');
            document.documentElement.style.setProperty('--transition-slow', '0.5s ease');
        }
    },
    
    // Setup intersection observer for scroll animations
    setupIntersectionObserver: function() {
        if (!AppConfig.performance.enableIntersectionObserver) return;
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        this.observers.set('main', observer);
        this.observeElements();
    },
    
    // Observe elements for animation
    observeElements: function() {
        const observer = this.observers.get('main');
        if (!observer) return;
        
        const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
        elements.forEach((el, index) => {
            // Set initial state
            el.style.opacity = '0';
            el.style.transform = this.getInitialTransform(el);
            el.style.transition = `all ${AppConfig.animations.duration}ms ${AppConfig.animations.easing}`;
            el.style.transitionDelay = `${index * AppConfig.animations.staggerDelay}ms`;
            
            observer.observe(el);
        });
    },
    
    // Get initial transform based on animation class
    getInitialTransform: function(element) {
        if (element.classList.contains('slide-in-left')) {
            return 'translateX(-20px)';
        } else if (element.classList.contains('slide-in-right')) {
            return 'translateX(20px)';
        } else {
            return 'translateY(20px)';
        }
    },
    
    // Animate element into view
    animateElement: function(element) {
        if (this.isReducedMotion) {
            element.style.opacity = '1';
            element.style.transform = 'none';
            return;
        }
        
        // Add visible class
        element.classList.add('visible');
        
        // Set final state
        element.style.opacity = '1';
        element.style.transform = 'translate(0, 0)';
        
        // Trigger custom event
        element.dispatchEvent(new CustomEvent('elementAnimated'));
    },
    
    // Setup scroll-based animations
    setupScrollAnimations: function() {
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateScrollAnimations();
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
    },
    
    // Update scroll-based animations
    updateScrollAnimations: function() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Parallax effect for hero section (subtle)
        const hero = document.querySelector('.hero');
        if (hero && scrollY < windowHeight) {
            const parallaxSpeed = 0.5;
            hero.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
        }
        
        // Update progress indicators if any
        this.updateProgressIndicators(scrollY);
    },
    
    // Update progress indicators
    updateProgressIndicators: function(scrollY) {
        const progressBars = document.querySelectorAll('.progress-fill');
        progressBars.forEach(bar => {
            const container = bar.closest('.progress-container');
            if (container && this.isElementInViewport(container)) {
                const targetWidth = bar.dataset.width || '0';
                bar.style.width = `${targetWidth}%`;
            }
        });
    },
    
    // Check if element is in viewport
    isElementInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // Setup hover effects
    setupHoverEffects: function() {
        // Card hover effects
        this.setupCardHoverEffects();
        
        // Button hover effects
        this.setupButtonHoverEffects();
        
        // Link hover effects
        this.setupLinkHoverEffects();
    },
    
    // Setup card hover effects
    setupCardHoverEffects: function() {
        const cards = document.querySelectorAll('.feature-card, .spec-item, .capability-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                if (!this.isReducedMotion) {
                    this.animateCardHover(e.target, true);
                }
            });
            
            card.addEventListener('mouseleave', (e) => {
                if (!this.isReducedMotion) {
                    this.animateCardHover(e.target, false);
                }
            });
            
            // Touch support
            card.addEventListener('touchstart', (e) => {
                if (!this.isReducedMotion) {
                    this.animateCardHover(e.target, true);
                }
            });
            
            card.addEventListener('touchend', (e) => {
                if (!this.isReducedMotion) {
                    setTimeout(() => {
                        this.animateCardHover(e.target, false);
                    }, 150);
                }
            });
        });
    },
    
    // Animate card hover
    animateCardHover: function(card, isHovering) {
        if (isHovering) {
            card.style.transform = 'translateY(-5px) scale(1.02)';
            card.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.4)';
        } else {
            card.style.transform = '';
            card.style.boxShadow = '';
        }
    },
    
    // Setup button hover effects
    setupButtonHoverEffects: function() {
        const buttons = document.querySelectorAll('.cta-button, .btn-secondary');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                if (!this.isReducedMotion) {
                    this.animateButtonHover(e.target, true);
                }
            });
            
            button.addEventListener('mouseleave', (e) => {
                if (!this.isReducedMotion) {
                    this.animateButtonHover(e.target, false);
                }
            });
            
            // Click effect
            button.addEventListener('mousedown', (e) => {
                if (!this.isReducedMotion) {
                    this.animateButtonClick(e.target);
                }
            });
        });
    },
    
    // Animate button hover
    animateButtonHover: function(button, isHovering) {
        if (isHovering) {
            button.style.transform = 'translateY(-2px)';
        } else {
            button.style.transform = '';
        }
    },
    
    // Animate button click
    animateButtonClick: function(button) {
        button.style.transform = 'scale(0.98)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    },
    
    // Setup link hover effects
    setupLinkHoverEffects: function() {
        const links = document.querySelectorAll('a:not(.cta-button):not(.btn-secondary)');
        
        links.forEach(link => {
            link.addEventListener('mouseenter', (e) => {
                if (!this.isReducedMotion) {
                    this.animateLinkHover(e.target, true);
                }
            });
            
            link.addEventListener('mouseleave', (e) => {
                if (!this.isReducedMotion) {
                    this.animateLinkHover(e.target, false);
                }
            });
        });
    },
    
    // Animate link hover
    animateLinkHover: function(link, isHovering) {
        if (isHovering) {
            link.style.textDecoration = 'underline';
            link.style.textUnderlineOffset = '4px';
        } else {
            link.style.textDecoration = '';
            link.style.textUnderlineOffset = '';
        }
    },
    
    // Bind animation events
    bindEvents: function() {
        // Listen for page changes to re-observe elements
        document.addEventListener('pageChange', (e) => {
            setTimeout(() => {
                this.observeElements();
            }, 100);
        });
        
        // Listen for component updates
        document.addEventListener('componentUpdate', (e) => {
            setTimeout(() => {
                this.observeElements();
            }, 50);
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    },
    
    // Handle resize events
    handleResize: function() {
        // Re-calculate animations if needed
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            this.observeElements();
        }, 250);
    },
    
    // Custom animation functions
    fadeIn: function(element, duration = 300) {
        if (this.isReducedMotion) {
            element.style.opacity = '1';
            return Promise.resolve();
        }
        
        return new Promise(resolve => {
            element.style.opacity = '0';
            element.style.transition = `opacity ${duration}ms ease`;
            
            requestAnimationFrame(() => {
                element.style.opacity = '1';
                setTimeout(resolve, duration);
            });
        });
    },
    
    fadeOut: function(element, duration = 300) {
        if (this.isReducedMotion) {
            element.style.opacity = '0';
            return Promise.resolve();
        }
        
        return new Promise(resolve => {
            element.style.transition = `opacity ${duration}ms ease`;
            element.style.opacity = '0';
            setTimeout(resolve, duration);
        });
    },
    
    slideIn: function(element, direction = 'up', duration = 300) {
        if (this.isReducedMotion) {
            element.style.transform = 'none';
            element.style.opacity = '1';
            return Promise.resolve();
        }
        
        const transforms = {
            up: 'translateY(20px)',
            down: 'translateY(-20px)',
            left: 'translateX(20px)',
            right: 'translateX(-20px)'
        };
        
        return new Promise(resolve => {
            element.style.opacity = '0';
            element.style.transform = transforms[direction];
            element.style.transition = `all ${duration}ms ease`;
            
            requestAnimationFrame(() => {
                element.style.opacity = '1';
                element.style.transform = 'translate(0, 0)';
                setTimeout(resolve, duration);
            });
        });
    },
    
    // Utility function to animate a sequence of elements
    animateSequence: function(elements, animationType = 'fadeIn', stagger = 100) {
        if (!Array.isArray(elements)) {
            elements = Array.from(elements);
        }
        
        const promises = elements.map((element, index) => {
            return new Promise(resolve => {
                setTimeout(() => {
                    this[animationType](element).then(resolve);
                }, index * stagger);
            });
        });
        
        return Promise.all(promises);
    },
    
    // Clean up animations
    cleanup: function() {
        this.observers.forEach(observer => {
            observer.disconnect();
        });
        this.observers.clear();
        this.animationQueue = [];
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Animations };
}