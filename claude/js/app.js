// Main application initialization and orchestration
const App = {
    // Application state
    isInitialized: false,
    isLoading: false,
    currentTheme: 'dark',

    // Performance monitoring
    performanceMetrics: {
        loadTime: 0,
        renderTime: 0,
        interactionTime: 0
    },

    // Section configuration
    sectionConfig: {
        'home-features': { data: 'homeFeatures', type: 'feature' },
        'setup-steps': { data: 'setupSteps', type: 'step' },
        'setup-tips': { data: 'setupTips', type: 'feature' },
        'hardware-specs': { data: 'hardwareSpecs', type: 'spec' },
        'hardware-features': { data: 'hardwareFeatures', type: 'feature' },
        'hardware-benchmarks': { data: 'hardwareBenchmarks', type: 'spec' },
        'software-os': { data: 'softwareOS', type: 'feature' },
        'software-apps': { data: 'softwareApps', type: 'spec' },
        'software-dev-tools': { data: 'softwareDevTools', type: 'feature' },
        'software-system': { data: 'softwareSystem', type: 'spec' },
        'capabilities-ai': { data: 'capabilitiesAI', type: 'capability' },
        'capabilities-data': { data: 'capabilitiesData', type: 'capability' },
        'capabilities-dev': { data: 'capabilitiesDev', type: 'capability' },
        'capabilities-metrics': { data: 'capabilitiesMetrics', type: 'spec' },
        'capabilities-industry': { data: 'capabilitiesIndustry', type: 'capability' },
        'capabilities-roadmap': { data: 'capabilitiesRoadmap', type: 'feature' }
    },

    // Initialize the application
    init() {
        if (this.isInitialized) return;

        const startTime = performance.now();

        try {
            this.initializeModules();
            this.loadContent();
            this.setupErrorHandling();
            this.setupPerformanceMonitoring();

            this.isInitialized = true;
            this.performanceMetrics.loadTime = performance.now() - startTime;

            this.log('🚀 TechFlow application initialized successfully');
            this.log('📊 Load time:', this.performanceMetrics.loadTime.toFixed(2), 'ms');

            this.triggerEvent('appInitialized', {
                loadTime: this.performanceMetrics.loadTime,
                timestamp: Date.now()
            });

        } catch (error) {
            console.error('❌ Failed to initialize application:', error);
            this.handleError(error, 'initialization');
        }
    },

    // Initialize core modules
    initializeModules() {
        Navigation.init();
        Animations.init();
        this.initializeAccessibility();
        this.initializeServiceWorker();
    },

    // Load and render content
    loadContent() {
        this.isLoading = true;

        try {
            // Render all sections based on configuration
            Object.entries(this.sectionConfig).forEach(([containerId, config]) => {
                this.renderSection(containerId, AppData[config.data], config.type);
            });

            this.isLoading = false;

        } catch (error) {
            this.isLoading = false;
            console.error('❌ Failed to load content:', error);
            this.handleError(error, 'content-loading');
        }
    },

    // Render a section with data
    renderSection(containerId, data, type) {
        const container = document.getElementById(containerId);
        if (!container || !data) return;

        try {
            // Show loading state
            container.innerHTML = this.getLoadingHTML(type);

            // Simulate async loading
            setTimeout(() => {
                const html = data.map(item => {
                    switch (type) {
                        case 'feature': return Components.renderFeatureCard(item);
                        case 'capability': return Components.renderCapabilityCard(item);
                        case 'spec': return Components.renderSpecItem(item);
                        case 'step': return Components.renderStep(item);
                        default: return Components.renderFeatureCard(item);
                    }
                }).join('');

                container.innerHTML = html;

                // Re-observe elements for animations
                setTimeout(() => Animations.observeElements(), 50);

            }, Math.random() * 200 + 100);

        } catch (error) {
            container.innerHTML = Components.renderError(`Failed to load ${type} content`);
            console.error(`❌ Failed to render section ${containerId}:`, error);
        }
    },

    // Get loading HTML for different types
    getLoadingHTML(type) {
        const count = type === 'step' ? 5 : 6;
        return Array(count).fill().map(() => Components.renderSkeleton(type)).join('');
    },

    // Initialize accessibility features
    initializeAccessibility() {
        this.addSkipLinks();
        this.setupAriaAttributes();
        this.setupFocusManagement();
        this.detectHighContrastMode();
    },

    // Add skip links for accessibility
    addSkipLinks() {
        const skipLinks = `
            <div class="skip-links sr-only" style="position: absolute; top: 0; left: 0; z-index: 9999;">
                <a href="#main-content" class="skip-link">Skip to main content</a>
                <a href="#navigation" class="skip-link">Skip to navigation</a>
            </div>
        `;

        document.body.insertAdjacentHTML('afterbegin', skipLinks);

        // Show skip links on focus
        const skipLinkElements = document.querySelectorAll('.skip-link');
        skipLinkElements.forEach(link => {
            link.addEventListener('focus', () => {
                Object.assign(link.style, {
                    position: 'fixed',
                    top: '10px',
                    left: '10px',
                    background: 'var(--accent-color)',
                    color: 'var(--primary-bg)',
                    padding: 'var(--spacing-sm)',
                    borderRadius: 'var(--radius-sm)',
                    textDecoration: 'none',
                    zIndex: '10000'
                });
                link.parentElement.classList.remove('sr-only');
            });

            link.addEventListener('blur', () => {
                link.parentElement.classList.add('sr-only');
            });
        });
    },

    // Setup ARIA attributes
    setupAriaAttributes() {
        const attributeConfig = [
            { selector: '.navbar', attributes: { role: 'navigation', 'aria-label': 'Main navigation' } },
            { selector: '.nav-links', attributes: { role: 'menubar', 'aria-label': 'Main menu' } },
            { selector: '.mobile-menu', attributes: { role: 'button', 'aria-label': 'Toggle mobile menu', 'aria-expanded': 'false' } }
        ];

        attributeConfig.forEach(({ selector, attributes }) => {
            const element = document.querySelector(selector);
            if (element) {
                Object.entries(attributes).forEach(([key, value]) => {
                    element.setAttribute(key, value);
                });
            }
        });

        // Setup page attributes
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => {
            page.setAttribute('role', 'main');
            page.setAttribute('aria-hidden', page.classList.contains('active') ? 'false' : 'true');
        });

        // Add main content landmark
        const activePageContent = document.querySelector('.page.active .container');
        if (activePageContent) {
            activePageContent.id = 'main-content';
        }
    },

    // Setup focus management
    setupFocusManagement() {
        // Focus trap for mobile menu
        document.addEventListener('keydown', (e) => {
            const navLinks = document.querySelector('.nav-links');
            if (navLinks?.classList.contains('active') && e.key === 'Tab') {
                this.handleMenuFocusTrap(e, navLinks);
            }
        });

        // Focus management for animated elements
        document.addEventListener('elementAnimated', (e) => {
            if (e.target.hasAttribute('tabindex')) {
                e.target.setAttribute('tabindex', '0');
            }
        });
    },

    // Handle focus trap in mobile menu
    handleMenuFocusTrap(event, navLinks) {
        const focusableElements = navLinks.querySelectorAll('li');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    },

    // Detect high contrast mode
    detectHighContrastMode() {
        const testElement = document.createElement('div');
        Object.assign(testElement.style, {
            border: '1px solid',
            borderColor: 'red green'
        });

        document.body.appendChild(testElement);

        const computedStyle = window.getComputedStyle(testElement);
        const isHighContrast = computedStyle.borderTopColor === computedStyle.borderRightColor;

        document.body.removeChild(testElement);

        if (isHighContrast) {
            document.body.classList.add('high-contrast');
            this.log('🎨 High contrast mode detected');
        }
    },

    // Initialize service worker
    initializeServiceWorker() {
        if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => this.log('✅ Service Worker registered:', registration))
                .catch(error => this.log('❌ Service Worker registration failed:', error));
        }
    },

    // Setup error handling
    setupErrorHandling() {
        // Global error handler
        window.addEventListener('error', (e) => {
            this.handleError(e.error, 'runtime', {
                filename: e.filename,
                lineno: e.lineno,
                colno: e.colno
            });
        });

        // Unhandled promise rejection handler
        window.addEventListener('unhandledrejection', (e) => {
            this.handleError(e.reason, 'promise-rejection');
        });

        // Resource loading error handler
        window.addEventListener('error', (e) => {
            if (e.target !== window) {
                this.handleError(
                    new Error(`Failed to load resource: ${e.target.src || e.target.href}`),
                    'resource-loading'
                );
            }
        }, true);
    },

    // Handle application errors
    handleError(error, context, details = {}) {
        const errorInfo = {
            message: error.message || 'Unknown error',
            stack: error.stack,
            context,
            details,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };

        console.error('🚨 Application Error:', errorInfo);
        this.showErrorNotification(error, context);
        this.reportError(errorInfo);
        this.triggerEvent('appError', errorInfo);
    },

    // Show error notification to user
    showErrorNotification(error, context) {
        const friendlyMessages = {
            'initialization': 'The application failed to start properly. Please refresh the page.',
            'content-loading': 'Some content failed to load. Please try refreshing the page.',
            'runtime': 'An unexpected error occurred. The application should continue to work normally.',
            'resource-loading': 'Some resources failed to load. Some features may not work correctly.',
            'promise-rejection': 'A background operation failed. The application should continue to work normally.'
        };

        const message = friendlyMessages[context] || 'An unexpected error occurred.';
        Components.renderNotification(message, 'error', 8000);
    },

    // Report error to monitoring service
    reportError(errorInfo) {
        if (!AppConfig.debug.enableLogging) return;

        try {
            const errors = JSON.parse(localStorage.getItem('app-errors') || '[]');
            errors.push(errorInfo);

            // Keep only last 50 errors
            if (errors.length > 50) {
                errors.splice(0, errors.length - 50);
            }

            localStorage.setItem('app-errors', JSON.stringify(errors));
        } catch (e) {
            console.warn('Failed to store error info:', e);
        }
    },

    // Setup performance monitoring
    setupPerformanceMonitoring() {
        if (!AppConfig.debug.enablePerformanceMonitoring) return;

        // Monitor page load performance
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    this.performanceMetrics.renderTime = perfData.loadEventEnd - perfData.loadEventStart;

                    this.log('📊 Performance Metrics:', {
                        loadTime: this.performanceMetrics.loadTime.toFixed(2) + 'ms',
                        renderTime: this.performanceMetrics.renderTime.toFixed(2) + 'ms',
                        domContentLoaded: (perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart).toFixed(2) + 'ms'
                    });
                }
            }, 0);
        });

        // Monitor interaction performance
        document.addEventListener('click', () => {
            const startTime = performance.now();
            setTimeout(() => {
                this.performanceMetrics.interactionTime = performance.now() - startTime;
            }, 0);
        });
    },

    // Trigger custom events
    triggerEvent(eventName, detail = {}) {
        const event = new CustomEvent(eventName, {
            detail: { ...detail, timestamp: Date.now() }
        });
        document.dispatchEvent(event);
    },

    // Logging utility
    log(...args) {
        if (AppConfig.debug.enableLogging) {
            console.log(...args);
        }
    },

    // Utility functions
    utils: {
        // Debounce function
        debounce(func, wait, immediate) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    timeout = null;
                    if (!immediate) func.apply(this, args);
                };
                const callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(this, args);
            };
        },

        // Throttle function
        throttle(func, limit) {
            let inThrottle;
            return function executedFunction(...args) {
                if (!inThrottle) {
                    func.apply(this, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },

        // Deep clone object
        deepClone(obj) {
            if (obj === null || typeof obj !== 'object') return obj;
            if (obj instanceof Date) return new Date(obj.getTime());
            if (obj instanceof Array) return obj.map(item => this.deepClone(item));

            if (typeof obj === 'object') {
                return Object.fromEntries(
                    Object.entries(obj).map(([key, value]) => [key, this.deepClone(value)])
                );
            }
        },

        // Format file size
        formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        },

        // Generate UUID
        generateUUID() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                const r = Math.random() * 16 | 0;
                const v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
    },

    // Cleanup function
    cleanup() {
        Animations.cleanup();

        if (this.performanceInterval) {
            clearInterval(this.performanceInterval);
        }

        this.log('🧹 Application cleanup completed');
    },

    // Get application state
    getState() {
        return {
            isInitialized: this.isInitialized,
            isLoading: this.isLoading,
            currentTheme: this.currentTheme,
            performanceMetrics: { ...this.performanceMetrics },
            navigation: Navigation.getNavigationState(),
            timestamp: Date.now()
        };
    }
};

// Initialize the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
} else {
    App.init();
}

// Handle page lifecycle events
window.addEventListener('beforeunload', () => App.cleanup());

document.addEventListener('visibilitychange', () => {
    const isHidden = document.hidden;
    App.log(isHidden ? '⏸️ Page hidden, pausing operations' : '▶️ Page visible, resuming operations');

    if (!isHidden) {
        setTimeout(() => Animations.observeElements(), 100);
    }
});

// Export App for debugging or external access
window.TechFlowApp = App;

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { App };
}