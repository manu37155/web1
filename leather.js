// Leather-specific Effects and Animations

// Leather Texture Initialization
function initLeatherTextures() {
    // Add leather texture to elements with leather class
    const leatherElements = document.querySelectorAll('.leather-texture'); // This class isn't used in the HTML
    
    leatherElements.forEach(element => {
        // Assuming images folder is at root relative to HTML, or adjust path
        element.style.backgroundImage = 'url(images/leather-texture.jpg)'; 
        element.style.backgroundSize = 'cover';
        element.style.position = 'relative'; // For positioning pseudo-elements like stitching
        
        // Add stitching effect dynamically (if not handled by CSS)
        // This might be redundant if CSS already applies stitching
        const stitching = document.createElement('div');
        stitching.className = 'leather-stitching'; // Ensure this class is defined in CSS
        element.appendChild(stitching);
    });
}

// Leather Binding Effect for Sections
function addLeatherBinding() {
    // This function adds a 'leather-binding' div to all sections.
    // Functionality might be visually intrusive or undesired unless specifically designed for.
    // Consider if this is needed, as it adds elements to the DOM.
    const sections = document.querySelectorAll('section'); 
    
    sections.forEach(section => {
        const binding = document.createElement('div');
        binding.className = 'leather-binding'; // CSS for .leather-binding would be needed
        
        if (section.classList.contains('dark-section')) { // .dark-section class not used in HTML
            binding.style.backgroundColor = 'var(--leather-dark)';
        } else {
            binding.style.backgroundColor = 'var(--leather-medium)';
        }
        // Example CSS for .leather-binding:
        // .leather-binding { height: 5px; width: 100%; position: absolute; bottom: 0; left: 0; }
        
        // section.appendChild(binding); // Commented out to avoid altering structure without explicit need
    });
}

// Animate Leather Stitching
function animateStitching() {
    // This function tries to apply 'stitchAnimation' to elements.
    // CSS already handles this for .leather-stitch and .card-stitching.
    // This JS might be redundant or could conflict if not careful.
    const stitchingElements = document.querySelectorAll('.leather-stitch, .card-stitching');
    
    stitchingElements.forEach(stitch => {
        // stitch.style.animation = 'stitchAnimation 3s linear infinite'; // CSS already does this
    });
}

// Initialize all leather effects
function initLeatherEffects() {
    // initLeatherTextures(); // Called, but .leather-texture class is not on elements in index.html
    // addLeatherBinding();   // Called, but might be visually intrusive without specific design
    // animateStitching();    // Called, but likely redundant with CSS animations

    // Add leather hover effect to navigation
    // This is generally better handled by CSS :hover pseudo-class for performance and simplicity.
    const navItems = document.querySelectorAll('.leather-nav a'); // Targets desktop nav links
    
    navItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // item.style.color = 'var(--gold-accent)'; // CSS handles this
        });
        
        item.addEventListener('mouseleave', () => {
            // if (!item.classList.contains('active')) {
                // item.style.color = 'var(--text-light)'; // CSS handles this
            // }
        });
    });
}

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', initLeatherEffects);
// The functions in this file seem largely redundant or better handled by CSS.
// Keeping the file as is, but noting that its effects might be overridden by CSS or unnecessary.