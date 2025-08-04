document.addEventListener('DOMContentLoaded', function() {
    // Function to load reusable HTML content into a placeholder
    async function loadContent(placeholderId, filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.text();
            const placeholder = document.getElementById(placeholderId);
            if (placeholder) {
                placeholder.innerHTML = data;
            } else {
                console.warn(`Placeholder '${placeholderId}' not found. Ensure a div with id='${placeholderId}' exists.`);
            }
        } catch (error) {
            console.error(`Error loading ${filePath}:`, error);
        }
    }

    // Function to handle image loading errors and set a fallback
    function setupImageErrorFallback() {
        document.querySelectorAll('img').forEach(img => {
            // Check if the image has already failed or has a src
            // This prevents adding multiple listeners or acting on already loaded images
            if (!img.complete || img.naturalWidth === 0) { // Check if image is not loaded or broken
                img.addEventListener('error', function handleError() {
                    console.warn(`Failed to load image: ${this.src}. Setting fallback.`);
                    // Set a placeholder image if the original fails to load
                    // Ensure the placeholder has appropriate dimensions or styling
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
            if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
                // Add Tailwind classes for highlighting
                link.classList.add('bg-indigo-100', 'text-indigo-800', 'font-semibold');
                link.classList.remove('text-gray-700', 'hover:text-indigo-700'); // Remove default hover styles
            } else {
                // Ensure other links don't have the active style if they were previously active
                link.classList.remove('bg-indigo-100', 'text-indigo-800', 'font-semibold');
                link.classList.add('text-gray-700', 'hover:text-indigo-700');
            }
        });
    }

    // Execute functions when the DOM is fully loaded
    // Load navbar first, then footer, then set up image fallbacks and highlight nav
    loadContent('navbar-placeholder', 'navbar.html').then(() => {
        highlightActiveNavLink(); // Highlight after navbar is loaded
    });
    loadContent('footer-placeholder', 'footer.html');
    setupImageErrorFallback();
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