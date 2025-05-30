// Function to load project images
function loadProjectImages() {
    const projectImages = document.querySelectorAll('.project-image img');

    projectImages.forEach(img => {
        // Add loading class initially
        img.classList.add('loading');

        // Try to load the Open Graph image
        const projectUrl = img.closest('.project-card').querySelector('.project-link').href;
        const ogImageUrl = `https://opengraph.io/api/1.1/site/${encodeURIComponent(projectUrl)}?app_id=YOUR_APP_ID`;

        fetch(ogImageUrl)
            .then(response => response.json())
            .then(data => {
                if (data.hybridGraph && data.hybridGraph.image) {
                    img.src = data.hybridGraph.image;
                }
            })
            .catch(() => {
                // If Open Graph fetch fails, keep the placeholder
                img.classList.remove('loading');
            })
            .finally(() => {
                img.classList.remove('loading');
            });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', loadProjectImages); 