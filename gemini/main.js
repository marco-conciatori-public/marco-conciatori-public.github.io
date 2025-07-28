// main.js

document.addEventListener('DOMContentLoaded', function() {
    // Function to load the footer from footer.html
    function loadFooter() {
        fetch('footer.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                const footerPlaceholder = document.getElementById('footer-placeholder');
                if (footerPlaceholder) {
                    footerPlaceholder.innerHTML = data;
                } else {
                    console.warn('Footer placeholder not found. Ensure a div with id="footer-placeholder" exists.');
                }
            })
            .catch(error => console.error('Error loading footer:', error));
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

    // Execute functions when the DOM is fully loaded
    loadFooter();
    setupImageErrorFallback();
});
