// Animation and visual effects
const Animations = {
    // Animation state
    observers: new Map(),
    animationQueue: [],
    isReducedMotion: false,
    resizeTimeout: null,

    // CSS custom properties for transitions
    transitionProperties: {
        fast: '0.2s ease',
        normal: '0.3s ease',
        slow: '0.5s ease'
    },

    // Initialize animations
    init() {
        this.checkReducedMotionPreference();
        this.setupIntersectionObserver();
        this.setupScrollAnimations();
        this.setupHoverEffects();
        this.bindEvents();
    },

    // Check for reduced motion preference
    checkReducedMotionPreference() {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        this.isReducedMotion = mediaQuery.matches;

        // Listen for changes
        mediaQuery.addEventListener('change', (e) => {
            this.isReducedMotion = e.matches;
            this.updateAnimationSettings();
        });

        this.updateAnimationSettings();
    },

    // Update animation settings based on preferences
    updateAnimationSettings() {
        const root = document.documentElement;
        const values = this.isReducedMotion
            ? { fast: '0ms', normal: '0ms', slow: '0ms' }
            : this.transitionProperties;

        Object.entries(values).forEach(([key, value]) => {
            root.style.setProperty(`--transition-${key}`, value);
        });
    },

    // Setup intersection observer for scroll animations
    setupIntersectionObserver() {
        if (!AppConfig.performance.enableIntersectionObserver) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        this.observers.set('main', observer);
        this.observeElements();
    },

    // Observe elements for animation
    observeElements() {
        const observer = this.observers.get('main');
        if (!observer) return;

        const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
        elements.forEach((el, index) => {
            // Set initial state
            this.setInitialState(el, index);
            observer.observe(el);
        });
    },

    // Set initial animation state
    setInitialState(element, index) {
        Object.assign(element.style, {
            opacity: '0',
            transform: this.getInitialTransform(element),
            transition: `all ${AppConfig.animations.duration}ms ${AppConfig.animations.easing}`,
            transitionDelay: `${index * AppConfig.animations.staggerDelay}ms`
        });
    },

    // Get initial transform based on animation class
    getInitialTransform(element) {
        if (element.classList.contains('slide-in-left')) return 'translateX(-20px)';
        if (element.classList.contains('slide-in-right')) return 'translateX(20px)';
        return 'translateY(20px)';
    },

    // Animate element into view
    animateElement(element) {
        if (this.isReducedMotion) {
            Object.assign(element.style, { opacity: '1', transform: 'none' });
            return;
        }

        // Add visible class and set final state
        element.classList.add('visible');
        Object.assign(element.style, {
            opacity: '1',
            transform: 'translate(0, 0)'
        });

        // Trigger custom event
        element.dispatchEvent(new CustomEvent('elementAnimated'));
    },

    // Setup scroll-based animations
    setupScrollAnimations() {
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
    updateScrollAnimations() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        // Subtle parallax effect for hero section
        const hero = document.querySelector('.hero');
        if (hero && scrollY < windowHeight) {
            hero.style.transform = `translateY(${scrollY * 0.5}px)`;
        }

        // Update progress indicators
        this.updateProgressIndicators();
    },

    // Update progress indicators
    updateProgressIndicators() {
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
    isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        const { innerHeight, innerWidth } = window;

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= innerHeight &&
            rect.right <= innerWidth
        );
    },

    // Setup hover effects
    setupHoverEffects() {
        this.setupCardHoverEffects();
        this.setupButtonHoverEffects();
        this.setupLinkHoverEffects();
    },

    // Setup card hover effects
    setupCardHoverEffects() {
        const cards = document.querySelectorAll('.feature-card, .spec-item, .capability-card');

        cards.forEach(card => {
            // Mouse events
            card.addEventListener('mouseenter', () => this.animateCardHover(card, true));
            card.addEventListener('mouseleave', () => this.animateCardHover(card, false));

            // Touch events
            card.addEventListener('touchstart', () => this.animateCardHover(card, true));
            card.addEventListener('touchend', () => {
                setTimeout(() => this.animateCardHover(card, false), 150);
            });
        });
    },

    // Animate card hover
    animateCardHover(card, isHovering) {
        if (this.isReducedMotion) return;

        Object.assign(card.style, {
            transform: isHovering ? 'translateY(-5px) scale(1.02)' : '',
            boxShadow: isHovering ? '0 15px 35px rgba(0, 0, 0, 0.4)' : ''
        });
    },

    // Setup button hover effects
    setupButtonHoverEffects() {
        const buttons = document.querySelectorAll('.cta-button, .btn-secondary');

        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => this.animateButtonHover(button, true));
            button.addEventListener('mouseleave', () => this.animateButtonHover(button, false));
            button.addEventListener('mousedown', () => this.animateButtonClick(button));
        });
    },

    // Animate button hover
    animateButtonHover(button, isHovering) {
        if (this.isReducedMotion) return;
        button.style.transform = isHovering ? 'translateY(-2px)' : '';
    },

    // Animate button click
    animateButtonClick(button) {
        if (this.isReducedMotion) return;

        button.style.transform = 'scale(0.98)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    },

    // Setup link hover effects
    setupLinkHoverEffects() {
        const links = document.querySelectorAll('a:not(.cta-button):not(.btn-secondary)');

        links.forEach(link => {
            link.addEventListener('mouseenter', () => this.animateLinkHover(link, true));
            link.addEventListener('mouseleave', () => this.animateLinkHover(link, false));
        });
    },

    // Animate link hover
    animateLinkHover(link, isHovering) {
        if (this.isReducedMotion) return;

        Object.assign(link.style, {
            textDecoration: isHovering ? 'underline' : '',
            textUnderlineOffset: isHovering ? '4px' : ''
        });
    },

    // Bind animation events
    bindEvents() {
        // Re-observe elements on page/component changes
        ['pageChange', 'componentUpdate'].forEach(eventType => {
            document.addEventListener(eventType, () => {
                setTimeout(() => this.observeElements(), eventType === 'pageChange' ? 100 : 50);
            });
        });

        // Handle window resize
        window.addEventListener('resize', () => this.handleResize());
    },

    // Handle resize events
    handleResize() {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            this.observeElements();
        }, 250);
    },

    // Custom animation functions
    fadeIn(element, duration = 300) {
        if (this.isReducedMotion) {
            element.style.opacity = '1';
            return Promise.resolve();
        }

        return new Promise(resolve => {
            Object.assign(element.style, {
                opacity: '0',
                transition: `opacity ${duration}ms ease`
            });

            requestAnimationFrame(() => {
                element.style.opacity = '1';
                setTimeout(resolve, duration);
            });
        });
    },

    fadeOut(element, duration = 300) {
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

    slideIn(element, direction = 'up', duration = 300) {
        if (this.isReducedMotion) {
            Object.assign(element.style, { transform: 'none', opacity: '1' });
            return Promise.resolve();
        }

        const transforms = {
            up: 'translateY(20px)',
            down: 'translateY(-20px)',
            left: 'translateX(20px)',
            right: 'translateX(-20px)'
        };

        return new Promise(resolve => {
            Object.assign(element.style, {
                opacity: '0',
                transform: transforms[direction],
                transition: `all ${duration}ms ease`
            });

            requestAnimationFrame(() => {
                Object.assign(element.style, {
                    opacity: '1',
                    transform: 'translate(0, 0)'
                });
                setTimeout(resolve, duration);
            });
        });
    },

    // Utility function to animate a sequence of elements
    animateSequence(elements, animationType = 'fadeIn', stagger = 100) {
        const elementsArray = Array.isArray(elements) ? elements : Array.from(elements);

        const promises = elementsArray.map((element, index) => {
            return new Promise(resolve => {
                setTimeout(() => {
                    this[animationType](element).then(resolve);
                }, index * stagger);
            });
        });

        return Promise.all(promises);
    },

    // Clean up animations
    cleanup() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();
        this.animationQueue = [];

        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Animations };
}