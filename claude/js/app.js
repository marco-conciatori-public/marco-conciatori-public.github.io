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
    
    // Initialize the application
    init: function() {
        if (this.isInitialized) {
            return;
        }
        
        const startTime = performance.now();
        
        try {
            // Initialize core modules
            this.initializeModules();
            
            // Load and render content
            this.loadContent();
            
            // Setup error handling
            this.setupErrorHandling();
            
            // Setup performance monitoring
            this.setupPerformanceMonitoring();
            
            // Mark as initialized
            this.isInitialized = true;
            
            // Calculate load time
            this.performanceMetrics.loadTime = performance.now() - startTime;
            
            // Log initialization
            if (AppConfig.debug.enableLogging) {
                console.log('🚀 TechFlow application initialized successfully');
                console.log('📊 Load time:', this.performanceMetrics.loadTime.toFixed(2), 'ms');
            }
            
            // Trigger initialization complete event
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
    initializeModules: function() {
        // Initialize navigation
        Navigation.init();
        
        // Initialize animations
        Animations.init();
        
        // Initialize accessibility features
        this.initializeAccessibility();
        
        // Initialize service worker if available
        this.initializeServiceWorker();
    },
    
    // Load and render content
    loadContent: function() {
        this.isLoading = true;
        
        try {
            // Render home page features
            this.renderSection('home-features', AppData.homeFeatures, 'feature');
            
            // Render setup content
            this.renderSection('setup-steps', AppData.setupSteps, 'step');
            this.renderSection('setup-tips', AppData.setupTips, 'feature');
            
            // Render hardware content
            this.renderSection('hardware-specs', AppData.hardwareSpecs, 'spec');
            this.renderSection('hardware-features', AppData.hardwareFeatures, 'feature');
            this.renderSection('hardware-benchmarks', AppData.hardwareBenchmarks, 'spec');
            
            // Render software content
            this.renderSection('software-os', AppData.softwareOS, 'feature');
            this.renderSection('software-apps', AppData.softwareApps, 'spec');
            this.renderSection('software-dev-tools', AppData.softwareDevTools, 'feature');
            this.renderSection('software-system', AppData.softwareSystem, 'spec');
            
            // Render capabilities content
            this.renderSection('capabilities-ai', AppData.capabilitiesAI, 'capability');
            this.renderSection('capabilities-data', AppData.capabilitiesData, 'capability');
            this.renderSection('capabilities-dev', AppData.capabilitiesDev, 'capability');
            this.renderSection('capabilities-metrics', AppData.capabilitiesMetrics, 'spec');
            this.renderSection('capabilities-industry', AppData.capabilitiesIndustry, 'capability');
            this.renderSection('capabilities-roadmap', AppData.capabilitiesRoadmap, 'feature');
            
            this.isLoading = false;
            
        } catch (error) {
            this.isLoading = false;
            console.error('❌ Failed to load content:', error);
            this.handleError(error, 'content-loading');
        }
    },
    
    // Render a section with data
    renderSection: function(containerId, data, type) {
        const container = document.getElementById(containerId);
        if (!container || !data) {
            return;
        }
        
        try {
            let html = '';
            
            // Show loading state
            container.innerHTML = this.getLoadingHTML(type);
            
            // Simulate async loading with timeout
            setTimeout(() => {
                data.forEach(item => {
                    switch (type) {
                        case 'feature':
                            html += Components.renderFeatureCard(item);
                            break;
                        case 'capability':
                            html += Components.renderCapabilityCard(item);
                            break;
                        case 'spec':
                            html += Components.renderSpecItem(item);
                            break;
                        case 'step':
                            html += Components.renderStep(item);
                            break;
                        default:
                            html += Components.renderFeatureCard(item);
                    }
                });
                
                container.innerHTML = html;
                
                // Re-observe elements for animations
                setTimeout(() => {
                    Animations.observeElements();
                }, 50);
                
            }, Math.random() * 200 + 100); // Random delay to simulate real loading
            
        } catch (error) {
            container.innerHTML = Components.renderError(`Failed to load ${type} content`);
            console.error(`❌ Failed to render section ${containerId}:`, error);
        }
    },
    
    // Get loading HTML for different types
    getLoadingHTML: function(type) {
        const count = type === 'step' ? 5 : 6;
        let html = '';
        
        for (let i = 0; i < count; i++) {
            html += Components.renderSkeleton(type);
        }
        
        return html;
    },
    
    // Initialize accessibility features
    initializeAccessibility: function() {
        // Skip links for keyboard navigation
        this.addSkipLinks();
        
        // ARIA labels and roles
        this.setupAriaAttributes();
        
        // Focus management
        this.setupFocusManagement();
        
        // High contrast mode detection
        this.detectHighContrastMode();
    },
    
    // Add skip links for accessibility
    addSkipLinks: function() {
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
            link.addEventListener('focus', () => {
                link.parentElement.classList.remove('sr-only');
                link.style.position = 'fixed';
                link.style.top = '10px';
                link.style.left = '10px';
                link.style.background = 'var(--accent-color)';
                link.style.color = 'var(--primary-bg)';
                link.style.padding = 'var(--spacing-sm)';
                link.style.borderRadius = 'var(--radius-sm)';
                link.style.textDecoration = 'none';
                link.style.zIndex = '10000';
            });
            
            link.addEventListener('blur', () => {
                link.parentElement.classList.add('sr-only');
            });
        });
    },
    
    // Setup ARIA attributes
    setupAriaAttributes: function() {
        // Main navigation
        const nav = document.querySelector('.navbar');
        if (nav) {
            nav.setAttribute('role', 'navigation');
            nav.setAttribute('aria-label', 'Main navigation');
        }
        
        // Navigation links
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            navLinks.setAttribute('role', 'menubar');
            navLinks.setAttribute('aria-label', 'Main menu');
        }
        
        // Mobile menu button
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu) {
            mobileMenu.setAttribute('role', 'button');
            mobileMenu.setAttribute('aria-label', 'Toggle mobile menu');
            mobileMenu.setAttribute('aria-expanded', 'false');
        }
        
        // Pages
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
    setupFocusManagement: function() {
        // Trap focus in mobile menu when open
        document.addEventListener('keydown', (e) => {
            const navLinks = document.querySelector('.nav-links');
            if (navLinks && navLinks.classList.contains('active') && e.key === 'Tab') {
                const focusableElements = navLinks.querySelectorAll('li');
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });
        
        // Focus visible elements when they come into view
        document.addEventListener('elementAnimated', (e) => {
            if (e.target.hasAttribute('tabindex')) {
                e.target.setAttribute('tabindex', '0');
            }
        });
    },
    
    // Detect high contrast mode
    detectHighContrastMode: function() {
        const testElement = document.createElement('div');
        testElement.style.border = '1px solid';
        testElement.style.borderColor = 'red green';
        document.body.appendChild(testElement);
        
        const computedStyle = window.getComputedStyle(testElement);
        const isHighContrast = computedStyle.borderTopColor === computedStyle.borderRightColor;
        
        document.body.removeChild(testElement);
        
        if (isHighContrast) {
            document.body.classList.add('high-contrast');
            if (AppConfig.debug.enableLogging) {
                console.log('🎨 High contrast mode detected');
            }
        }
    },
    
    // Initialize service worker
    initializeServiceWorker: function() {
        if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    if (AppConfig.debug.enableLogging) {
                        console.log('✅ Service Worker registered:', registration);
                    }
                })
                .catch(error => {
                    if (AppConfig.debug.enableLogging) {
                        console.log('❌ Service Worker registration failed:', error);
                    }
                });
        }
    },
    
    // Setup error handling
    setupErrorHandling: function() {
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
                this.handleError(new Error(`Failed to load resource: ${e.target.src || e.target.href}`), 'resource-loading');
            }
        }, true);
    },
    
    // Handle application errors
    handleError: function(error, context, details = {}) {
        const errorInfo = {
            message: error.message || 'Unknown error',
            stack: error.stack,
            context,
            details,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };
        
        // Log error
        console.error('🚨 Application Error:', errorInfo);
        
        // Show user-friendly error message
        this.showErrorNotification(error, context);
        
        // Send error to monitoring service (if available)
        this.reportError(errorInfo);
        
        // Trigger error event
        this.triggerEvent('appError', errorInfo);
    },
    
    // Show error notification to user
    showErrorNotification: function(error, context) {
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
    reportError: function(errorInfo) {
        // This would typically send the error to a monitoring service
        // For demo purposes, we'll just store it locally
        if (AppConfig.debug.enableLogging) {
            const errors = JSON.parse(localStorage.getItem('app-errors') || '[]');
            errors.push(errorInfo);
            
            // Keep only last 50 errors
            if (errors.length > 50) {
                errors.splice(0, errors.length - 50);
            }
            
            localStorage.setItem('app-errors', JSON.stringify(errors));
        }
    },
    
    // Setup performance monitoring
    setupPerformanceMonitoring: function() {
        if (!AppConfig.debug.enablePerformanceMonitoring) return;
        
        // Monitor page load performance
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    this.performanceMetrics.renderTime = perfData.loadEventEnd - perfData.loadEventStart;
                    
                    if (AppConfig.debug.enableLogging) {
                        console.log('📊 Performance Metrics:', {
                            loadTime: this.performanceMetrics.loadTime.toFixed(2) + 'ms',
                            renderTime: this.performanceMetrics.renderTime.toFixed(2) + 'ms',
                            domContentLoaded: (perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart).toFixed(2) + 'ms'
                        });
                    }
                }
            }, 0);
        });
        
        // Monitor interaction performance
        document.addEventListener('click', (e) => {
            const startTime = performance.now();
            setTimeout(() => {
                this.performanceMetrics.interactionTime = performance.now() - startTime;
            }, 0);
        });
    },
    
    // Trigger custom events
    triggerEvent: function(eventName, detail = {}) {
        const event = new CustomEvent(eventName, {
            detail: {
                ...detail,
                timestamp: Date.now()
            }
        });
        
        document.dispatchEvent(event);
    },
    
    // Utility functions
    utils: {
        // Debounce function
        debounce: function(func, wait, immediate) {
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
        throttle: function(func, limit) {
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
        deepClone: function(obj) {
            if (obj === null || typeof obj !== 'object') return obj;
            if (obj instanceof Date) return new Date(obj.getTime());
            if (obj instanceof Array) return obj.map(item => this.deepClone(item));
            if (typeof obj === 'object') {
                const clonedObj = {};
                for (const key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        clonedObj[key] = this.deepClone(obj[key]);
                    }
                }
                return clonedObj;
            }
        },
        
        // Format file size
        formatFileSize: function(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        },
        
        // Generate UUID
        generateUUID: function() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                const r = Math.random() * 16 | 0;
                const v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
    },
    
    // Cleanup function
    cleanup: function() {
        // Clean up animations
        Animations.cleanup();
        
        // Clear any intervals or timeouts
        if (this.performanceInterval) {
            clearInterval(this.performanceInterval);
        }
        
        // Remove event listeners if needed
        // (most are handled automatically by the browser)
        
        if (AppConfig.debug.enableLogging) {
            console.log('🧹 Application cleanup completed');
        }
    },
    
    // Get application state
    getState: function() {
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
    document.addEventListener('DOMContentLoaded', () => {
        App.init();
    });
} else {
    App.init();
}

// Handle page unload cleanup
window.addEventListener('beforeunload', () => {
    App.cleanup();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden, pause expensive operations
        if (AppConfig.debug.enableLogging) {
            console.log('⏸️ Page hidden, pausing operations');
        }
    } else {
        // Page is visible, resume operations
        if (AppConfig.debug.enableLogging) {
            console.log('▶️ Page visible, resuming operations');
        }
        
        // Re-observe elements that might have been added while hidden
        setTimeout(() => {
            Animations.observeElements();
        }, 100);
    }
});

// Export App for debugging or external access
window.TechFlowApp = App;

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { App };
}