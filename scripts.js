document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    // This targets a '.navbar' class which is not present in index.html.
    // index.html uses '.leather-header'.
    const navbar = document.querySelector('.leather-header'); // Changed to '.leather-header'
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled'); // CSS for .scrolled would be needed
                                                  // e.g., .leather-header.scrolled { background-color: var(--leather-dark-scrolled); }
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Video controls for #heroVideo
    // index.html <video> tag has 'controls' attribute, so browser default controls are shown.
    // These custom buttons (muteBtn, fullscreenBtn) are not in index.html.
    // If custom controls are desired, HTML needs to be added and 'controls' attribute removed from video.
    const video = document.getElementById('heroVideo');
    const muteBtn = document.getElementById('muteBtn'); // Not in HTML
    const fullscreenBtn = document.getElementById('fullscreenBtn'); // Not in HTML

    if (video && muteBtn) {
        muteBtn.addEventListener('click', function() {
            if (video.muted) {
                video.muted = false;
                muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            } else {
                video.muted = true;
                muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            }
        });
    }

    if (video && fullscreenBtn) {
        fullscreenBtn.addEventListener('click', function() {
            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.webkitRequestFullscreen) { /* Safari */
                video.webkitRequestFullscreen();
            } else if (video.msRequestFullscreen) { /* IE11 */
                video.msRequestFullscreen();
            }
        });
    }

    // Smooth scrolling for navigation links (anchor links like #sectionId)
    // This is good for on-page navigation.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === "#" || href === "") { // Ignore simple hash or empty href links
                // e.preventDefault(); // Optional: prevent default for "#" if it causes unwanted jump
                return;
            }

            try {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    let headerOffset = 0;
                    const fixedHeader = document.querySelector('.leather-header.fixed-top'); // Or your fixed header class
                    if (fixedHeader) {
                        headerOffset = fixedHeader.offsetHeight;
                    }
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - headerOffset - 10, // Extra 10px offset
                        behavior: 'smooth'
                    });
                }
            } catch (error) {
                // console.error("Error finding element for smooth scroll:", error);
                // This can happen if href is not a valid selector (e.g., href="#some[value]")
                // Allow default behavior for such links.
            }
        });
    });
});
// Mobile menu toggle
document.querySelector('.mobile-menu').addEventListener('click', function() {
    document.querySelector('.leather-nav').classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.mobile-menu') && !e.target.closest('.leather-nav')) {
        document.querySelector('.leather-nav').classList.remove('active');
    }
});
// Mobile dropdown functionality
document.querySelectorAll('.dropdown > a').forEach(dropdown => {
    dropdown.addEventListener('click', function(e) {
        if (window.innerWidth <= 992) { // Match your media query breakpoint
            e.preventDefault();
            this.classList.toggle('open-dropdown');
            this.nextElementSibling.classList.toggle('open');
        }
    });
});

// Note: The .navbar scroll effect needs CSS for '.scrolled'.
// Video controls (muteBtn, fullscreenBtn) require corresponding HTML elements.
// Smooth scrolling is functional for valid anchor links.