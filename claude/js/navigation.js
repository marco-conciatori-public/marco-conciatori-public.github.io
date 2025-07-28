// Navigation functionality
const Navigation = {
    // Configuration
    validPages: ['home', 'hardware', 'software', 'setup', 'capabilities', 'gallery'],

    // State
    currentPage: 'home',
    previousPage: null,

    // Page titles mapping
    pageTitles: {
        home: 'TechFlow Robot - Advanced Personal Robotics Project',
        hardware: 'TechFlow Robot - Hardware Components',
        software: 'TechFlow Robot - Software Stack',
        setup: 'TechFlow Robot - Setup Guide',
        capabilities: 'TechFlow Robot - Capabilities',
        gallery: 'TechFlow Robot - Gallery'
    },

    // Initialize navigation
    init() {
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
    bindEvents() {
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
    setupMobileMenu() {
        const mobileMenuBtn = document.querySelector('.mobile-menu');
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleMobileMenu();
            });
        }
    },

    // Setup scroll effects
    setupScrollEffects() {
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
    updateNavbarOnScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        const isScrolled = window.scrollY > 50;

        // Apply styles based on scroll position
        Object.assign(navbar.style, {
            background: isScrolled ? 'rgba(26, 26, 46, 0.98)' : 'rgba(26, 26, 46, 0.95)',
            backdropFilter: isScrolled ? 'blur(10px)' : 'none',
            boxShadow: isScrolled ? '0 2px 20px rgba(0, 0, 0, 0.3)' : 'none'
        });
    },

    // Show specific page
    showPage(pageId, addToHistory = true) {
        if (!this.isValidPage(pageId) || pageId === this.currentPage) {
            return false;
        }

        const pages = document.querySelectorAll('.page');
        const targetPage = document.getElementById(pageId);

        if (!targetPage) {
            console.warn(`Page ${pageId} not found`);
            return false;
        }

        // Store previous page
        this.previousPage = this.currentPage;

        // Update page visibility
        this.updatePageVisibility(pages, targetPage);

        // Update navigation state
        this.updateNavigationState(pageId);

        // Update current page
        this.currentPage = pageId;

        // Close mobile menu and scroll to top
        this.closeMobileMenu();
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Update URL and history
        if (addToHistory) {
            this.updateHistory(pageId);
        }

        // Update document title
        this.updateTitle(pageId);

        // Trigger page change event
        document.dispatchEvent(new CustomEvent('pageChange', { detail: { pageId } }));

        return true;
    },

    // Update page visibility
    updatePageVisibility(pages, targetPage) {
        pages.forEach(page => {
            const isTarget = page === targetPage;
            page.classList.toggle('active', isTarget);
            page.setAttribute('aria-hidden', !isTarget);
        });
    },

    // Update navigation state
    updateNavigationState(pageId) {
        const navLinks = document.querySelectorAll('.nav-links li');
        const activeIndex = this.validPages.indexOf(pageId);

        navLinks.forEach((link, index) => {
            const isActive = index === activeIndex;
            link.classList.toggle('active', isActive);
            link.setAttribute('aria-current', isActive ? 'page' : 'false');
        });
    },

    // Check if page ID is valid
    isValidPage(pageId) {
        return this.validPages.includes(pageId);
    },

    // Update browser history
    updateHistory(pageId) {
        const url = pageId === 'home' ? window.location.pathname : `${window.location.pathname}#${pageId}`;
        const title = this.pageTitles[pageId];

        window.history.pushState({ page: pageId }, title, url);
    },

    // Update document title
    updateTitle(pageId) {
        document.title = this.pageTitles[pageId] || 'TechFlow Robot';
    },

    // Mobile menu functions
    toggleMobileMenu() {
        const navLinks = document.querySelector('.nav-links');
        const mobileMenu = document.querySelector('.mobile-menu');

        if (navLinks) {
            const isActive = navLinks.classList.toggle('active');
            this.updateMenuAttributes(navLinks, mobileMenu, isActive);
        }
    },

    closeMobileMenu() {
        const navLinks = document.querySelector('.nav-links');
        const mobileMenu = document.querySelector('.mobile-menu');

        if (navLinks?.classList.contains('active')) {
            navLinks.classList.remove('active');
            this.updateMenuAttributes(navLinks, mobileMenu, false);
        }
    },

    // Update menu ARIA attributes
    updateMenuAttributes(navLinks, mobileMenu, isActive) {
        navLinks.setAttribute('aria-expanded', isActive);
        if (mobileMenu) {
            mobileMenu.classList.toggle('active', isActive);
            mobileMenu.setAttribute('aria-expanded', isActive);
        }
    },

    // Get navigation state (for debugging/monitoring)
    getNavigationState() {
        return {
            currentPage: this.currentPage,
            previousPage: this.previousPage,
            validPages: this.validPages
        };
    }
};

// Global navigation functions for inline event handlers
window.showPage = (pageId) => Navigation.showPage(pageId);
window.toggleMobileMenu = () => Navigation.toggleMobileMenu();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Navigation };
}