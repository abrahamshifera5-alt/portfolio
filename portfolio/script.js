/**
 * 1. Mobile Hamburger Menu Toggle Action
 */
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const line1 = document.getElementById('line1');
const line2 = document.getElementById('line2');
const line3 = document.getElementById('line3');

function toggleMenu() {
    const isOpened = mobileMenu.classList.contains('hidden');
    if (isOpened) {
        mobileMenu.classList.remove('hidden');
        // Smooth transformation to cross (close) icon
        line1.style.transform = 'rotate(45deg) translate(2px, 2px)';
        line2.style.opacity = '0';
        line3.style.transform = 'rotate(-45deg) translate(1px, -1px)';
    } else {
        mobileMenu.classList.add('hidden');
        // Reset transformation back to Hamburger
        line1.style.transform = 'none';
        line2.style.opacity = '1';
        line3.style.transform = 'none';
    }
}
if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
}

/**
 * 2. Active Section Highlighting via Scroll (Intersection Observer)
 */
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px', // Focus region in viewport height
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === id) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

/**
 * 3. Contact Dialog Modal Operations
 */
const modal = document.getElementById('contact-modal');
const modalCard = document.getElementById('modal-card');

function openContactModal() {
    if (!modal || !modalCard) return;
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.add('opacity-100');
        modalCard.classList.remove('scale-95', 'opacity-0');
        modalCard.classList.add('scale-100', 'opacity-100');
    }, 10);
}

function closeContactModal() {
    if (!modal || !modalCard) return;
    modalCard.classList.remove('scale-100', 'opacity-100');
    modalCard.classList.add('scale-95', 'opacity-0');
    modal.classList.remove('opacity-100');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeContactModal();
        }
    });
}

/**
 * 4. Toast Notification Manager
 */
const customAlert = document.getElementById('custom-alert');
const alertTitle = document.getElementById('alert-title');
const alertText = document.getElementById('alert-text');

function triggerAlert(title, text) {
    if (!customAlert || !alertTitle || !alertText) return;
    alertTitle.innerText = title;
    alertText.innerText = text;
    customAlert.classList.remove('hidden');
    setTimeout(() => {
        customAlert.classList.remove('translate-y-10', 'opacity-0');
        customAlert.classList.add('translate-y-0', 'opacity-100');
    }, 10);

    // Fade and slide down out of view after 4 seconds
    setTimeout(() => {
        customAlert.classList.remove('translate-y-0', 'opacity-100');
        customAlert.classList.add('translate-y-10', 'opacity-0');
        setTimeout(() => {
            customAlert.classList.add('hidden');
        }, 500);
    }, 4000);
}

/**
 * 5. Form Submissions Handlers
 */
function handleFormSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('form-name').value;
    triggerAlert("Thank you, " + name + "!", "Your direct message has been successfully logged.");
    document.getElementById('direct-contact-form').reset();
}

function handleModalSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('modal-name').value;
    closeContactModal();
    setTimeout(() => {
        triggerAlert("Proposal Sent!", "Hey " + name + ", Marlon will review your proposal and respond shortly.");
        document.getElementById('modal-contact-form').reset();
    }, 350);
}