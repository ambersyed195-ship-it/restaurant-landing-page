// ===== Mobile hamburger menu toggle =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
 
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
 
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});
 
// ===== Navbar shadow + active link highlight on scroll =====
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section[id]');
const navLinkItems = document.querySelectorAll('.nav-link');
const backToTopBtn = document.getElementById('backToTop');
 
window.addEventListener('scroll', () => {
    // Navbar shadow
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
 
    // Active nav link
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
 
    navLinkItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
 
    // Back to top button visibility
    if (window.scrollY > 400) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});
 
// ===== Back to top button click =====
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
 
// ===== Menu filter =====
const filterButtons = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');
 
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
 
        const filter = button.getAttribute('data-filter');
 
        menuItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
});
 
// ===== Gallery lightbox =====
const galleryItems = document.querySelectorAll('.gallery-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');
 
galleryItems.forEach(img => {
    img.addEventListener('click', () => {
        lightbox.classList.add('active');
        lightboxImg.src = img.src;
    });
});
 
lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
});
 
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
    }
});
 
// ===== Testimonial slider =====
const track = document.querySelector('.testimonial-track');
const cards = document.querySelectorAll('.testimonial-card');
const dotsContainer = document.querySelector('.slider-dots');
let currentSlide = 0;
 
// Create dots dynamically
cards.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});
 
const dots = document.querySelectorAll('.dot');
 
function goToSlide(index) {
    currentSlide = index;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentSlide].classList.add('active');
}
 
function nextSlide() {
    currentSlide = (currentSlide + 1) % cards.length;
    goToSlide(currentSlide);
}
 
// Auto-slide every 4 seconds
setInterval(nextSlide, 4000);
 
// ===== Contact form validation =====
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const formSuccess = document.getElementById('formSuccess');
 
function showError(input, errorId, message) {
    input.classList.add('invalid');
    document.getElementById(errorId).textContent = message;
}
 
function clearError(input, errorId) {
    input.classList.remove('invalid');
    document.getElementById(errorId).textContent = '';
}
 
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
 
    // Name validation
    if (nameInput.value.trim() === '') {
        showError(nameInput, 'nameError', 'Please enter your name');
        isValid = false;
    } else {
        clearError(nameInput, 'nameError');
    }
 
    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() === '') {
        showError(emailInput, 'emailError', 'Please enter your email');
        isValid = false;
    } else if (!emailPattern.test(emailInput.value.trim())) {
        showError(emailInput, 'emailError', 'Please enter a valid email');
        isValid = false;
    } else {
        clearError(emailInput, 'emailError');
    }
 
    // Message validation
    if (messageInput.value.trim() === '') {
        showError(messageInput, 'messageError', 'Please enter a message');
        isValid = false;
    } else {
        clearError(messageInput, 'messageError');
    }
 
    if (isValid) {
        formSuccess.classList.add('show');
        contactForm.reset();
        setTimeout(() => {
            formSuccess.classList.remove('show');
        }, 4000);
    }
});
 
