// Kingfisher — Main JS

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// Mobile nav toggle
const burger = document.querySelector('.nav-burger');
const navLinks = document.querySelector('.nav-links');
if (burger && navLinks) {
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = burger.querySelectorAll('span');
    const open = navLinks.classList.contains('open');
    spans[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
    spans[1].style.opacity   = open ? '0' : '1';
    spans[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
  });
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      navLinks.classList.remove('open');
    }
  });
}

// Active nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// Fade-up scroll animations
const fadeEls = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
fadeEls.forEach(el => observer.observe(el));

// Modal helpers
function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
}
function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('active');
}
document.querySelectorAll('[data-close-modal]').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.closeModal;
    closeModal(id);
  });
});
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('active');
  });
});

// Moving form
const movingForm = document.getElementById('moving-form');
if (movingForm) {
  const propertyType = document.getElementById('property-type');
  const sizeGroup    = document.getElementById('size-group');
  const commercialSizes = ['1 Room','2 Rooms','3 Rooms','4 Rooms','5 Rooms'];
  const residentialSizes = ['Studio','1 Bedroom','2 Bedrooms','3 Bedrooms','4+ Bedrooms'];

  if (propertyType && sizeGroup) {
    propertyType.addEventListener('change', () => {
      const sizeSelect = sizeGroup.querySelector('select');
      const sizes = propertyType.value === 'commercial' ? commercialSizes : residentialSizes;
      sizeSelect.innerHTML = '<option value="">Select size...</option>' +
        sizes.map(s => `<option value="${s.toLowerCase().replace(/\s/g,'-')}">${s}</option>`).join('');
    });
  }

  movingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    openModal('moving-success-modal');
    movingForm.reset();
  });
}

// Rental booking modal
document.querySelectorAll('.rent-now-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const carName = btn.dataset.car || 'Selected Vehicle';
    const carPrice = btn.dataset.price || '';
    const el = document.getElementById('rental-car-name');
    const pe = document.getElementById('rental-car-price');
    if (el) el.textContent = carName;
    if (pe) pe.textContent = carPrice ? `$${carPrice}/day` : '';
    openModal('rental-modal');
  });
});

const rentalForm = document.getElementById('rental-form');
if (rentalForm) {
  rentalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    closeModal('rental-modal');
    setTimeout(() => openModal('rental-success-modal'), 200);
    rentalForm.reset();
  });
}

// Driving form
const drivingForm = document.getElementById('driving-form');
if (drivingForm) {
  drivingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    openModal('driving-success-modal');
    drivingForm.reset();
  });
}

// Contact form
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    openModal('contact-success-modal');
    contactForm.reset();
  });
}

// File upload labels
document.querySelectorAll('.upload-area').forEach(area => {
  const input = area.querySelector('input[type="file"]');
  if (!input) return;
  area.addEventListener('click', () => input.click());
  area.addEventListener('dragover', (e) => { e.preventDefault(); area.style.borderColor = 'var(--kf-bright)'; });
  area.addEventListener('dragleave', () => { area.style.borderColor = ''; });
  area.addEventListener('drop', (e) => {
    e.preventDefault();
    area.style.borderColor = '';
    const files = e.dataTransfer.files;
    if (files.length) updateUploadLabel(area, files[0].name);
  });
  input.addEventListener('change', () => {
    if (input.files.length) updateUploadLabel(area, input.files[0].name);
  });
});

function updateUploadLabel(area, name) {
  const p = area.querySelector('p');
  if (p) p.innerHTML = `<strong>✓ ${name}</strong>`;
}
