// DOM Elements
const themeToggle = document.querySelector('.theme-toggle');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const currentYear = document.getElementById('currentYear');
const contactForm = document.getElementById('contactForm');
const testimonialDots = document.querySelectorAll('.dot');
const testimonialSlides = document.querySelectorAll('.testimonial-slide');

// Set current year in footer
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Theme Toggle Functionality
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Update theme attribute
    html.setAttribute('data-theme', newTheme);
    
    // Save preference to localStorage
    localStorage.setItem('theme', newTheme);
    
    // Update ARIA label for accessibility
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.setAttribute('aria-label', `Switch to ${currentTheme} mode`);
    }
}

// Initialize theme from localStorage or system preference
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Toggle body scroll when menu is open
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
}

// Close mobile menu when clicking on a nav link
const navLinksList = document.querySelectorAll('.nav-links a');
navLinksList.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            toggleMobileMenu();
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form Submission Handler
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Here you would typically send the form data to a server
        console.log('Form submitted:', formObject);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

// Testimonial Slider
let currentSlide = 0;

function showSlide(index) {
    // Hide all slides
    testimonialSlides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Remove active class from all dots
    testimonialDots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show current slide and update active dot
    testimonialSlides[index].classList.add('active');
    testimonialDots[index].classList.add('active');
}

// Add click event listeners to dots
testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Auto-advance slides
setInterval(() => {
    currentSlide = (currentSlide + 1) % testimonialSlides.length;
    showSlide(currentSlide);
}, 5000);

// Initialize Chart.js for Performance Section
function initPerformanceChart() {
    const ctx = document.getElementById('performanceChart');
    if (!ctx) return;
    
    // Sample data - replace with actual performance data
    const performanceData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Monthly Returns',
            data: [85000, 92000, 78000, 105000, 95000, 110000, 102000, 115000, 108000, 125000, 118000, 135000],
            backgroundColor: 'rgba(37, 99, 235, 0.1)',
            borderColor: '#2563eb',
            borderWidth: 2,
            tension: 0.3,
            fill: true
        }]
    };
    
    const config = {
        type: 'line',
        data: performanceData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    };
    
    new Chart(ctx, config);
}

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in-up');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize everything when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initTheme();
    
    // Initialize performance chart
    initPerformanceChart();
    
    // Show first testimonial slide
    if (testimonialSlides.length > 0) {
        showSlide(0);
    }
    
    // Add fade-in-up class to elements with animation
    const animatedElements = document.querySelectorAll('.service-card, .blog-card, .about-content, .performance-stats');
    animatedElements.forEach((element, index) => {
        element.classList.add('fade-in-up');
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        element.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Initial animation check
    animateOnScroll();
});

// Event Listeners
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
}

window.addEventListener('scroll', animateOnScroll);

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper');
    }, 400);
});

// Add active class to nav links on scroll
function highlightNavOnScroll() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelector(`.nav-links a[href*=${sectionId}]`).classList.add('active');
        } else {
            const navLink = document.querySelector(`.nav-links a[href*=${sectionId}]`);
            if (navLink && !navLink.getAttribute('href').endsWith('#')) {
                navLink.classList.remove('active');
            }
        }
    });
}

// Run once on page load
highlightNavOnScroll();

// Run on scroll
window.addEventListener('scroll', highlightNavOnScroll);
