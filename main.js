// Main JavaScript File for KILT Website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const leatherNav = document.querySelector('.leather-nav');
    
    if (mobileMenuBtn && leatherNav) {
        mobileMenuBtn.addEventListener('click', function() {
            leatherNav.classList.toggle('active');
            mobileMenuBtn.innerHTML = leatherNav.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });

        // Handle dropdowns in mobile menu (tap to open)
        const dropdownLinks = leatherNav.querySelectorAll('.dropdown > a');
        dropdownLinks.forEach(link => {
            const submenu = link.nextElementSibling; // The .leather-dropdown
            if (submenu && submenu.classList.contains('leather-dropdown')) {
                // Create a new span for the toggle icon to avoid issues with existing icon
                let toggleIcon = link.querySelector('.fas.fa-chevron-down');
                if (!toggleIcon) { // If no icon, create one (optional, depends on design)
                    // toggleIcon = document.createElement('i');
                    // toggleIcon.className = 'fas fa-chevron-down mobile-dropdown-indicator';
                    // link.appendChild(toggleIcon);
                }

                link.addEventListener('click', function(event) {
                    if (leatherNav.classList.contains('active')) { // Only if mobile menu is active
                        event.preventDefault(); // Prevent default link behavior
                        submenu.classList.toggle('open');
                        link.classList.toggle('open-dropdown'); // For rotating the icon via CSS
                    }
                });
            }
        });
    }
    
   // Update the video hero controls section in main.js
    const heroVideo = document.getElementById('heroVideo');
    const videoBackground = document.querySelector('.video-background');
    const videoOverlay = document.querySelector('.leather-overlay');

   // Try to autoplay video (muted)
    if (heroVideo && videoBackground) {
        heroVideo.muted = true;
        const playPromise = heroVideo.play();

        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Autoplay started
                if(videoBackground) videoBackground.classList.add('playing');
            }).catch(error => {
                // Autoplay was prevented
                if(videoBackground) videoBackground.style.display = 'none';
                if(videoOverlay) videoOverlay.style.display = 'none';
                // Fallback image will show via CSS
                console.log("Video autoplay prevented: ", error);
            });
        }
         // Ensure content is visible if video takes time to load or fails
        setTimeout(() => {
            if (videoBackground && !videoBackground.classList.contains('playing')) {
                videoBackground.style.display = 'none';
                if(videoOverlay) videoOverlay.style.display = 'none';
            }
        }, 3000); // 3 second timeout
    }
    
    // Scroll Down Button
    const scrollDownBtn = document.querySelector('.scroll-down');
    
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', function() {
            // Scroll to the next section after the hero
            const firstSectionAfterHero = document.querySelector('.video-hero + section');
            if (firstSectionAfterHero) {
                 firstSectionAfterHero.scrollIntoView({ behavior: 'smooth' });
            } else { // Fallback to scrolling by window height
                window.scrollBy({
                    top: window.innerHeight * 0.8, // Scroll 80% of viewport height
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Tab Functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length > 0 && tabContents.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                this.classList.add('active');
                const activeTabContent = document.getElementById(tabId);
                if (activeTabContent) {
                    activeTabContent.classList.add('active');
                }
            });
        });
    }
    
    // Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersAnimated = false; // Flag to ensure animation runs once

    function animateCounters() {
        if (countersAnimated) return; // Don't re-animate
        countersAnimated = true;

        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            if (isNaN(target)) return;

            const duration = 2000; // 2 seconds
            let current = 0;
            const increment = target / (duration / 16); // Calculate increment per frame (approx 60fps)
            
            const counter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    clearInterval(counter);
                    current = target;
                }
                stat.textContent = Math.floor(current);
            }, 16);
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1 // Trigger when 10% of the element is visible
    };
    
    const observerCallback = (entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('about-stats')) {
                    animateCounters(); // Animate counters when .about-stats is visible
                }
                
                // For AOS animations (data-aos attribute)
                if (entry.target.hasAttribute('data-aos')) {
                    entry.target.classList.add('aos-animate');
                }
                
                // For other custom animations (data-animate attribute from animations.js)
                if (entry.target.hasAttribute('data-animate')) {
                    const animation = entry.target.getAttribute('data-animate');
                    entry.target.classList.add('animate__animated', `animate__${animation}`);
                }
                
                observerInstance.unobserve(entry.target); // Stop observing once animated
            }
        });
    };

    const animationObserver = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe elements that need animation
    document.querySelectorAll('[data-aos], .about-stats, [data-animate]').forEach(el => {
        animationObserver.observe(el);
    });
    
    // Preloader
    const preloader = document.querySelector('.leather-preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500); // Match opacity transition time
            }, 500); // Minimum display time for preloader
        });
    }
    
    // Initialize slider (News Slider)
    initNewsSlider();
});

// Slider Functionality (News Slider)
function initNewsSlider() {
    const sliderContainer = document.querySelector('.news-slider .leather-slider'); // More specific selector
    if (!sliderContainer) return;

    const slides = sliderContainer.querySelectorAll('.slide');
    // Assuming slider controls are direct children of .news-slider or near it
    const newsSection = document.querySelector('.news-section');
    if (!newsSection) return;

    const prevBtn = newsSection.querySelector('.slider-prev'); // Scope to news section
    const nextBtn = newsSection.querySelector('.slider-next');
    
    if (slides.length === 0 || !prevBtn || !nextBtn) {
      if (slides.length > 0 && (!prevBtn || !nextBtn)) {
        console.warn("News slider controls not found. Slider will not be interactive.");
      }
      return;
    }
    
    let currentIndex = 0;
    const slideCount = slides.length;
    
    // Arrange slides in a row (JS will handle translateX)
    sliderContainer.style.display = 'flex'; // Use flex for slide arrangement
    slides.forEach(slide => {
        slide.style.width = '100%'; // Each slide takes full width of container
        slide.style.flexShrink = '0'; // Prevent slides from shrinking
    });
    
    function updateSliderPosition() {
        sliderContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        sliderContainer.style.transition = 'transform 0.5s ease-in-out';
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateSliderPosition();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateSliderPosition();
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    let slideInterval = setInterval(nextSlide, 5000); // Autoplay
    
    // Pause on hover (optional, consider for UX)
    const newsSliderWrapper = document.querySelector('.news-slider');
    if(newsSliderWrapper) {
        newsSliderWrapper.addEventListener('mouseenter', () => clearInterval(slideInterval));
        newsSliderWrapper.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });
    }
    
    updateSliderPosition(); // Set initial position
}

// Note: The campus image slider functionality is not implemented in the original JS.
// The .about-image .slider-controls are present in HTML but not wired up.
// This script focuses on the News Slider as per original main.js structure.