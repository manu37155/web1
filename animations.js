// Animation Functions for KILT Website (using ScrollReveal and data-animate)

// Scroll Reveal Animation (using ScrollReveal library - ensure it's linked in HTML if used)
// Note: The current index.html does not link ScrollReveal.js.
// AOS is used via data-aos and handled by main.js IntersectionObserver.
// This ScrollReveal setup might be for a different version or page.
function initScrollReveal() {
    if (typeof ScrollReveal !== 'function') {
        // console.warn('ScrollReveal is not loaded. Animations via initScrollReveal will not work.');
        return;
    }

    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1000,
        delay: 200,
        reset: true // Animations repeat on scroll up/down
    });
    
    // These specific reveals might conflict with AOS if both are active on same elements.
    sr.reveal('.leather-card', { interval: 200 });
    sr.reveal('.about-content', { origin: 'left' });
    sr.reveal('.about-image', { origin: 'right', delay: 400 }); // .about-image is campus image
    sr.reveal('.section-title', { origin: 'top' });
}

// Animate elements when they come into view using data-animate
// This is an alternative to AOS or ScrollReveal, using IntersectionObserver (handled in main.js)
function animateOnScroll() {
    const elements = document.querySelectorAll('[data-animate]');
    if (elements.length === 0) return;

    // The IntersectionObserver logic for 'data-animate' is now in main.js
    // This function can be simplified or removed if main.js handles it completely.

    // const observer = new IntersectionObserver((entries) => {
    //     entries.forEach(entry => {
    //         if (entry.isIntersecting) {
    //             const animation = entry.target.getAttribute('data-animate');
    //             // Assuming animate.css classes are used, e.g., 'animate__fadeInUp'
    //             entry.target.classList.add('animate__animated', `animate__${animation}`);
    //             observer.unobserve(entry.target); // Animate only once
    //         }
    //     });
    // }, { threshold: 0.1 }); // Trigger when 10% visible
    
    // elements.forEach(el => observer.observe(el));
}

// Hover animations for leather elements
function initHoverAnimations() {
    const leatherCards = document.querySelectorAll('.leather-card');
    const leatherButtons = document.querySelectorAll('.leather-button, .leather-button-outline');
    
    // Card stitching animation on hover
    leatherCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const stitching = card.querySelector('.card-stitching');
            if (stitching) {
                // stitching.style.animation = 'stitchAnimation 2s linear infinite'; // CSS handles this on hover
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const stitching = card.querySelector('.card-stitching');
            if (stitching) {
                // stitching.style.animation = 'none'; // CSS handles return to static
            }
        });
    });
    
    // Button translateY on hover
    leatherButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            // button.style.transform = 'translateY(-3px)'; // CSS handles this
        });
        
        button.addEventListener('mouseleave', () => {
            // button.style.transform = 'translateY(0)'; // CSS handles this
        });
    });
}

// Initialize all animations
function initKiltAnimations() { // Renamed to avoid conflict if main.js also has initAnimations
    // initScrollReveal(); // Call if ScrollReveal is being used and loaded
    // animateOnScroll();    // This logic is now primarily in main.js's IntersectionObserver
    // initHoverAnimations(); // Hover effects are mostly handled by CSS
}

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', initKiltAnimations);

// Most functionalities in this file are either dependent on external libraries not linked (ScrollReveal)
// or are better handled/already handled by CSS and the IntersectionObserver in main.js.
// Kept the structure but noted redundancies.