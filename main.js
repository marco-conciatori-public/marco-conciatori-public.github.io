document.addEventListener('DOMContentLoaded', function() {
    // Function to handle image loading errors and set a fallback
    function setupImageErrorFallback() {
        document.querySelectorAll('img').forEach(img => {
            // Check if the image has already failed or has a src
            // This prevents adding multiple listeners or acting on already loaded images
            if (!img.complete || img.naturalWidth === 0) { // Check if image is not loaded or broken
                img.addEventListener('error', function handleError() {
                    console.warn(`Failed to load image: ${this.src}. Setting fallback.`);
                    // Set a placeholder image if the original fails to load
                    this.src = 'https://placehold.co/600x300/e0e7ff/4338ca?text=Image+Not+Found';
                    // Remove the event listener to prevent infinite loops if fallback also fails
                    this.removeEventListener('error', handleError);
                });
            }
        });
    }

    // Function to highlight the current page in the navigation bar
    function highlightActiveNavLink() {
        const navLinks = document.querySelectorAll('.nav-link');
        const currentPath = window.location.pathname.split('/').pop(); // Gets 'index.html', 'capabilities.html', etc.

        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href').split('/').pop();
            // Handle empty currentPath for index.html if accessed directly (e.g., your_domain.com/)
            const isActive = linkPath === currentPath || (currentPath === '' && linkPath === 'index.html');
            link.classList.toggle('nav-link-active', isActive);
        });
    }

    // Function to observe content sections and highlight the corresponding side-nav link
    function setupSideNavObserver() {
        const sections = document.querySelectorAll('main section[id]');
        const navLinks = document.querySelectorAll('aside nav a.side-nav-link');

        if (sections.length === 0 || navLinks.length === 0) {
            return; // Don't run if the required elements aren't on the page
        }

        const observerOptions = {
            root: null, // relative to the viewport
            rootMargin: '-50% 0px -50% 0px', // trigger when the section is in the middle of the screen
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const id = entry.target.getAttribute('id');
                const correspondingLink = document.querySelector(`a.side-nav-link[href="#${id}"]`);

                if (entry.isIntersecting) {
                    // Remove active class from all links first
                    navLinks.forEach(link => link.classList.remove('active-nav-link'));
                    // Add active class to the link of the intersecting section
                    if(correspondingLink) {
                        correspondingLink.classList.add('active-nav-link');
                    }
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // Fetches and displays content from GitHub text files
    function fetchGithubContent() {
        const todoElement = document.getElementById('todo-content');
        const bugsElement = document.getElementById('bugs-content');

        // Only run the fetch logic if these elements exist on the current page
        if (todoElement && bugsElement) {
            const todoUrl = 'https://raw.githubusercontent.com/marco-conciatori-public/yahboom_rdk_x3_robot/arm_inverse_kinematics/sunriseRobot/app_SunriseRobot/info/TODO.txt';
            const bugsUrl = 'https://raw.githubusercontent.com/marco-conciatori-public/yahboom_rdk_x3_robot/arm_inverse_kinematics/sunriseRobot/app_SunriseRobot/info/known_bugs.txt';

            const displayTextFile = async (url, element) => {
                try {
                    const response = await fetch(url);
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    element.textContent = await response.text();
                } catch (error) {
                    console.error(`Failed to fetch ${url}:`, error);
                    element.textContent = `Error: Could not load content from ${url}.`;
                }
            };

            displayTextFile(todoUrl, todoElement);
            displayTextFile(bugsUrl, bugsElement);
        }
    }


    // Toggles the mobile navigation menu (hamburger button in the navbar).
    function setupMobileNav() {
        const toggle = document.getElementById('nav-toggle');
        const menu = document.getElementById('mobile-menu');
        if (!toggle || !menu) {
            return;
        }
        const openIcon = document.getElementById('nav-icon-open');
        const closeIcon = document.getElementById('nav-icon-close');

        const setOpen = (open) => {
            menu.classList.toggle('hidden', !open);
            toggle.setAttribute('aria-expanded', String(open));
            if (openIcon && closeIcon) {
                openIcon.classList.toggle('hidden', open);
                closeIcon.classList.toggle('hidden', !open);
            }
        };

        toggle.addEventListener('click', () => {
            setOpen(menu.classList.contains('hidden'));
        });
        // Close the menu after tapping a link so navigation feels natural.
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => setOpen(false));
        });
    }

    // Builds a collapsible "On this page" menu on pages that have a sticky side
    // nav, so section links are reachable on small screens (where the aside is
    // hidden). Generated from the existing side-nav links to stay in sync.
    function setupMobileToc() {
        const aside = document.querySelector('aside nav');
        const main = document.querySelector('main');
        if (!aside || !main) {
            return;
        }
        const links = aside.querySelectorAll('a.side-nav-link');
        if (links.length === 0) {
            return;
        }

        const details = document.createElement('details');
        details.className = 'lg:hidden mb-6 bg-surface border border-line rounded';

        const summary = document.createElement('summary');
        summary.className = 'cursor-pointer select-none px-4 py-3 font-mono text-sm uppercase tracking-widest text-ink';
        summary.textContent = '// On this page';
        details.appendChild(summary);

        const list = document.createElement('div');
        list.className = 'px-2 pb-2 flex flex-col gap-1';
        links.forEach(link => {
            const a = document.createElement('a');
            a.href = link.getAttribute('href');
            a.textContent = link.textContent;
            a.className = 'side-nav-link';
            a.addEventListener('click', () => { details.open = false; });
            list.appendChild(a);
        });
        details.appendChild(list);

        main.insertBefore(details, main.firstChild);
    }

    // Makes every content image open in the shared lightbox on click.
    function setupImageZoom() {
        document.querySelectorAll('main img, section img').forEach(img => {
            if (img.closest('#image-modal')) {
                return; // never wire the modal's own image
            }
            img.classList.add('cursor-pointer');
            // Skip images that already open the modal via inline onclick.
            if (!img.getAttribute('onclick')) {
                img.addEventListener('click', () => openModal(img));
            }
        });
    }

    // Shows a back-to-top button once the user has scrolled down.
    function setupBackToTop() {
        const btn = document.getElementById('back-to-top');
        if (!btn) {
            return;
        }
        const update = () => {
            const show = window.scrollY > 400;
            btn.classList.toggle('hidden', !show);
            btn.classList.toggle('flex', show);
        };
        update();
        window.addEventListener('scroll', update, { passive: true });
        btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // The navbar and footer are now included at build time by Jekyll, so they
    // are already in the DOM when this runs. Run the page setup directly.
    highlightActiveNavLink();
    setupImageErrorFallback();
    setupSideNavObserver();
    fetchGithubContent();
    setupMobileNav();
    setupMobileToc();
    setupImageZoom();
    setupBackToTop();
});

// Get the modal and its content
const modal = document.getElementById("image-modal");
const modalImage = document.getElementById("modal-image");

// Function to open the modal
function openModal(element) {
    modal.classList.remove('hidden');
    modalImage.src = element.src;
    modalImage.alt = element.alt;
}

// Function to close the modal
function closeModal() {
    modal.classList.add('hidden');
}

// Close the modal when the user presses the Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape" && !modal.classList.contains('hidden')) {
        closeModal();
    }
});