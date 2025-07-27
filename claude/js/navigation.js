// Navigation functionality
const Navigation = {
    // Current page tracking
    currentPage: 'home',
    previousPage: null,
    
    // Page history
    history: ['home'],
    historyIndex: 0,
    
    // Initialize navigation
    init: function() {
        this.bindEvents();
        this.setupKeyboardNavigation();
        this.setupMobileMenu();
        this.setupScrollEffects();
        
        // Set initial page from URL hash
        const hash = window.location.hash.substring(1);
        if (hash && this.isValidPage(hash)) {
            this.showPage(hash, false);
        }
    },
    
    // Bind navigation events
    bindEvents: function() {
        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            const page = e.state?.page || 'home';
            this.showPage(page, false);
        });
        
        // Handle hash changes
        window.addEventListener('hashchange', (e) => {
            const hash = window.location.hash.substring(1);
            if (hash && this.isValidPage(hash)) {
                this.showPage(hash, false);
            }
        });
        
        // Click outside mobile menu
        document.addEventListener('click', (e) => {
            const navbar = document.querySelector('.navbar');
            const navLinks = document.querySelector('.nav-links');
            
            if (!navbar?.contains(e.target) && navLinks?.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });
    },
    
    // Setup keyboard navigation
    setupKeyboardNavigation: function() {
        if (!AppConfig.navigation.enableKeyboardNav) return;
        
        document.addEventListener('keydown', (e) => {
            // Skip if user is typing in an input
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }
            
            const pages = ['home', 'setup', 'hardware', 'software', 'capabilities'];
            const currentIndex = pages.indexOf(this.currentPage);
            
            switch (e.key) {
                case 'ArrowLeft':
                case 'ArrowUp':
                    if (currentIndex > 0) {
                        e.preventDefault();
                        this.showPage(pages[currentIndex - 1]);
                    }
                    break;
                    
                case 'ArrowRight':
                case 'ArrowDown':
                    if (currentIndex < pages.length - 1) {
                        e.preventDefault();
                        this.showPage(pages[currentIndex + 1]);
                    }
                    break;
                    
                case 'Home':
                    e.preventDefault();
                    this.showPage('home');
                    break;
                    
                case 'End':
                    e.preventDefault();
                    this.showPage('capabilities');
                    break;
                    
                case 'Escape':
                    this.closeMobileMenu();
                    break;
            }
        });
    },
    
    // Setup mobile menu functionality
    setupMobileMenu: function() {
        const mobileMenuBtn = document.querySelector('.mobile-menu');
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleMobileMenu();
            });
        }
    },
    
    // Setup scroll effects
    setupScrollEffects: function() {
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking) {
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateNavbarOnScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
    },
    
    // Update navbar appearance on scroll
    updateNavbarOnScroll: function() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(26, 26, 46, 0.98)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(26, 26, 46, 0.95)';
            navbar.style.backdropFilter = 'none';
            navbar.style.boxShadow = 'none';
        }
    },
    
    // Show specific page
    showPage: function(pageId, addToHistory = true) {
        if (!this.isValidPage(pageId) || pageId === this.currentPage) {
            return false;
        }
        
        const pages = document.querySelectorAll('.page');
        const targetPage = document.getElementById(pageId);
        const navLinks = document.querySelectorAll('.nav-links li');
        
        if (!targetPage) {
            console.warn(`Page ${pageId} not found`);
            return false;
        }
        
        // Store previous page
        this.previousPage = this.currentPage;
        
        // Hide all pages
        pages.forEach(page => {
            page.classList.remove('active');
            page.setAttribute('aria-hidden', 'true');
        });
        
        // Remove active class from nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
            link.setAttribute('aria-current', 'false');
        });
        
        // Show target page
        targetPage.classList.add('active');
        targetPage.setAttribute('aria-hidden', 'false');
        
        // Update active nav link
        const activeNavIndex = ['home', 'setup', 'hardware', 'software', 'capabilities'].indexOf(pageId);
        if (activeNavIndex !== -1 && navLinks[activeNavIndex]) {
            navLinks[activeNavIndex].classList.add('active');
            navLinks[activeNavIndex].setAttribute('aria-current', 'page');
        }
        
        // Update current page
        this.currentPage = pageId;
        
        // Close mobile menu
        this.closeMobileMenu();
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Update URL and history
        if (addToHistory) {
            this.updateHistory(pageId);
        }
        
        // Update document title
        this.updateTitle(pageId);
        
        // Trigger page change event
        this.triggerPageChangeEvent(pageId, this.previousPage);
        
        // Focus management for accessibility
        this.manageFocus(targetPage);
        
        return true;
    },
    
    // Check if page ID is valid
    isValidPage: function(pageId) {
        const validPages = ['home', 'setup', 'hardware', 'software', 'capabilities'];
        return validPages.includes(pageId);
    },
    
    // Update browser history
    updateHistory: function(pageId) {
        const url = pageId === 'home' ? window.location.pathname : `${window.location.pathname}#${pageId}`;
        const title = this.getPageTitle(pageId);
        
        // Add to browser history
        window.history.pushState({ page: pageId }, title, url);
        
        // Add to internal history
        if (this.history[this.historyIndex + 1] !== pageId) {
            this.history = this.history.slice(0, this.historyIndex + 1);
            this.history.push(pageId);
            this.historyIndex = this.history.length - 1;
        }
    },
    
    // Update document title
    updateTitle: function(pageId) {
        const titles = {
            home: 'TechFlow Solutions - Home',
            setup: 'TechFlow Solutions - Setup Guide',
            hardware: 'TechFlow Solutions - Hardware Specifications',
            software: 'TechFlow Solutions - Software Stack',
            capabilities: 'TechFlow Solutions - System Capabilities'
        };
        
        document.title = titles[pageId] || 'TechFlow Solutions';
    },
    
    // Get page title
    getPageTitle: function(pageId) {
        const titles = {
            home: 'Home',
            setup: 'Setup Guide',
            hardware: 'Hardware Specifications',
            software: 'Software Stack',
            capabilities: 'System Capabilities'
        };
        
        return titles[pageId] || 'Home';
    },
    
    // Manage focus for accessibility
    manageFocus: function(targetPage) {
        // Find the first focusable element in the page
        const firstFocusable = targetPage.querySelector('h1, .cta-button, [tabindex="0"]');
        if (firstFocusable) {
            setTimeout(() => {
                firstFocusable.focus();
            }, 100);
        }
    },
    
    // Trigger page change event
    triggerPageChangeEvent: function(newPage, oldPage) {
        const event = new CustomEvent('pageChange', {
            detail: {
                newPage,
                oldPage,
                timestamp: Date.now()
            }
        });
        
        document.dispatchEvent(event);
    },
    
    // Mobile menu functions
    toggleMobileMenu: function() {
        const navLinks = document.querySelector('.nav-links');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (navLinks) {
            const isActive = navLinks.classList.toggle('active');
            navLinks.setAttribute('aria-expanded', isActive);
            
            if (mobileMenu) {
                mobileMenu.classList.toggle('active', isActive);
                mobileMenu.setAttribute('aria-expanded', isActive);
            }
            
            // Manage focus for accessibility
            if (isActive) {
                const firstLink = navLinks.querySelector('li');
                if (firstLink) {
                    firstLink.focus();
                }
            }
        }
    },
    
    closeMobileMenu: function() {
        const navLinks = document.querySelector('.nav-links');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            navLinks.setAttribute('aria-expanded', 'false');
            
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
                mobileMenu.setAttribute('aria-expanded', 'false');
            }
        }
    },
    
    // Navigation history functions
    goBack: function() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            this.showPage(this.history[this.historyIndex], false);
        }
    },
    
    goForward: function() {
        if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            this.showPage(this.history[this.historyIndex], false);
        }
    },
    
    // Get navigation state
    getNavigationState: function() {
        return {
            currentPage: this.currentPage,
            previousPage: this.previousPage,
            history: [...this.history],
            historyIndex: this.historyIndex,
            canGoBack: this.historyIndex > 0,
            canGoForward: this.historyIndex < this.history.length - 1
        };
    },
    
    // Set up breadcrumb navigation
    setupBreadcrumbs: function() {
        const pageHierarchy = {
            home: [],
            setup: [{ text: 'Home', href: '#home' }],
            hardware: [{ text: 'Home', href: '#home' }],
            software: [{ text: 'Home', href: '#home' }],
            capabilities: [{ text: 'Home', href: '#home' }]
        };
        
        const currentHierarchy = pageHierarchy[this.currentPage] || [];
        currentHierarchy.push({ text: this.getPageTitle(this.currentPage) });
        
        return currentHierarchy;
    },
    
    // Prefetch next page content
    prefetchPage: function(pageId) {
        if (!this.isValidPage(pageId)) return;
        
        // This would typically prefetch content if using AJAX
        // For now, just log the intention
        if (AppConfig.debug.enableLogging) {
            console.log(`Prefetching content for page: ${pageId}`);
        }
    },
    
    // Handle resize events
    handleResize: function() {
        if (window.innerWidth > 768) {
            this.closeMobileMenu();
        }
    }
};

// Global navigation functions for inline event handlers
window.showPage = function(pageId) {
    Navigation.showPage(pageId);
};

window.toggleMobileMenu = function() {
    Navigation.toggleMobileMenu();
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Navigation };
}