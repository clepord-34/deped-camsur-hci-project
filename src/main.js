/* =============================================
   DepEd CamSur — Main JavaScript
   ============================================= */

import './styles/main.css';

// ---- Sticky Header Shadow on Scroll ----
const mainHeader = document.getElementById('mainHeader');
if (mainHeader) {
  window.addEventListener('scroll', () => {
    mainHeader.classList.toggle('main-header--scrolled', window.scrollY > 10);
  });
}

// ---- High Contrast Toggle ----
const contrastToggle = document.getElementById('contrastToggle');
if (contrastToggle) {
  // Restore saved preference
  if (localStorage.getItem('highContrast') === 'true') {
    document.documentElement.setAttribute('data-theme', 'high-contrast');
  }

  contrastToggle.addEventListener('click', () => {
    const isHC = document.documentElement.getAttribute('data-theme') === 'high-contrast';
    if (isHC) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('highContrast', 'false');
    } else {
      document.documentElement.setAttribute('data-theme', 'high-contrast');
      localStorage.setItem('highContrast', 'true');
    }
  });
}

// ---- Mobile Navigation ----
const burgerBtn = document.getElementById('burgerBtn');
const mobileNav = document.getElementById('mobileNav');
const mobileOverlay = document.getElementById('mobileOverlay');
const mobileClose = document.getElementById('mobileClose');

function openMobileNav() {
  mobileNav?.classList.add('mobile-nav--open');
  mobileOverlay?.classList.add('mobile-nav__overlay--active');
  document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
  mobileNav?.classList.remove('mobile-nav--open');
  mobileOverlay?.classList.remove('mobile-nav__overlay--active');
  document.body.style.overflow = '';
}

burgerBtn?.addEventListener('click', openMobileNav);
mobileClose?.addEventListener('click', closeMobileNav);
mobileOverlay?.addEventListener('click', closeMobileNav);

// ---- Scroll-triggered Animations (Intersection Observer) ----
const animatedElements = document.querySelectorAll('.animate-on-scroll');

if (animatedElements.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  animatedElements.forEach((el) => observer.observe(el));
}

// ---- Filter Buttons (Archive & IM pages) ----
document.querySelectorAll('.filter-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('filter-btn--active'));
    btn.classList.add('filter-btn--active');

    const filter = btn.dataset.filter;
    const cards = document.querySelectorAll('.gallery-card, .la-card');

    cards.forEach((card) => {
      if (filter === 'all' || card.dataset.type === filter) {
        card.style.display = '';
        card.style.animation = 'fadeInUp 0.4s ease forwards';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ---- Global Search Placeholder Interaction ----
const globalSearchInput = document.getElementById('globalSearch');
if (globalSearchInput) {
  const placeholders = [
    'Search memos, forms, school names...',
    'Try: "DM No. 089"',
    'Try: "CS Form 212"',
    'Try: "Pili Central School"',
  ];
  let currentPlaceholder = 0;

  setInterval(() => {
    currentPlaceholder = (currentPlaceholder + 1) % placeholders.length;
    globalSearchInput.setAttribute('placeholder', placeholders[currentPlaceholder]);
  }, 3000);
}

console.log('✅ DepEd CamSur Website — Loaded Successfully');
