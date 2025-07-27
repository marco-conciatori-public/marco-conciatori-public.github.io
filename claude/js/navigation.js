// Navigation functionality
const Navigation = {
    // Current page tracking
    currentPage: 'home',
    previousPage: null,
    
    // Initialize navigation
    init: function() {
        this.bindEvents();
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
        const activeNavIndex = ['home', 'hardware', 'software', 'setup', 'capabilities', 'gallery'].indexOf(pageId);
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

        return true;
    },

    // Check if page ID is valid
    isValidPage: function(pageId) {
        const validPages = ['home', 'hardware', 'software', 'setup', 'capabilities', 'gallery'];
        return validPages.includes(pageId);
    },

    // Update browser history
    updateHistory: function(pageId) {
        const url = pageId === 'home' ? window.location.pathname : `${window.location.pathname}#${pageId}`;
        const title = this.getPageTitle(pageId);

        // Add to browser history
        window.history.pushState({ page: pageId }, title, url);
    },

    // Update document title
    updateTitle: function(pageId) {
        const titles = {
            home: 'TechFlow Robot - Advanced Personal Robotics Project',
            hardware: 'TechFlow Robot - Hardware Components',
            software: 'TechFlow Robot - Software Stack',
            setup: 'TechFlow Robot - Setup Guide',
            capabilities: 'TechFlow Robot - Capabilities',
            gallery: 'TechFlow Robot - Gallery'
        };

        document.title = titles[pageId] || 'TechFlow Robot';
    },

    // Get page title
    getPageTitle: function(pageId) {
        const titles = {
            home: 'Home',
            hardware: 'Hardware',
            software: 'Software',
            setup: 'Setup Guide',
            capabilities: 'Capabilities',
            gallery: 'Gallery'
        };

        return titles[pageId] || 'Home';
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