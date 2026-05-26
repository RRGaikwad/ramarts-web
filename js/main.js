/**
 * RamArts — Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initFAQ();
  initCounters();
  initLightbox();
  initPortfolioFilter();
  initInquiryPopup();
  initRevealFallback();
});

function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const banner = document.querySelector('.offer-banner');
  if (banner) {
    header.classList.add('has-banner');
    document.body.classList.add('has-offer-banner');
  }

  function onScroll() {
    const scrollY = window.scrollY;
    header.classList.toggle('scrolled', scrollY > 50);

    if (banner) {
      const bannerH = banner.offsetHeight;
      const pastBanner = scrollY >= bannerH;
      header.classList.toggle('banner-scrolled', pastBanner);
      document.body.classList.toggle('banner-scrolled', pastBanner);
    }
  }

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function closeMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  const overlay = document.querySelector('.nav-overlay');

  toggle?.classList.remove('active');
  menu?.classList.remove('active');
  overlay?.classList.remove('active');
  document.body.classList.remove('nav-open');
}

function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  if (!toggle || !menu) return;

  let overlay = document.querySelector('.nav-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    document.body.appendChild(overlay);
  }

  function openNav() {
    const isOpen = menu.classList.contains('active');
    if (isOpen) {
      closeMobileNav();
      return;
    }
    toggle.classList.add('active');
    menu.classList.add('active');
    overlay.classList.add('active');
    document.body.classList.add('nav-open');
  }

  toggle.addEventListener('click', openNav);
  overlay.addEventListener('click', closeMobileNav);

  menu.querySelectorAll('.nav-link, .btn').forEach((link) => {
    link.addEventListener('click', closeMobileNav);
  });

  window.addEventListener(
    'scroll',
    () => {
      if (menu.classList.contains('active')) closeMobileNav();
    },
    { passive: true }
  );

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMobileNav();
  });
}

function initFAQ() {
  if (initFAQ.bound) return;
  initFAQ.bound = true;

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.faq-question');
    if (!btn) return;

    const item = btn.closest('.faq-item');
    const wasActive = item?.classList.contains('active');

    document.querySelectorAll('.faq-item').forEach((i) => i.classList.remove('active'));
    if (!wasActive && item) item.classList.add('active');
  });
}

function initCounters() {
  const counters = document.querySelectorAll('.counter-item .number');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((el) => observer.observe(el));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = current.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');

  let images = [];
  let currentIndex = 0;

  function openLightbox(index) {
    images = Array.from(document.querySelectorAll('[data-lightbox]'));
    currentIndex = index;
    updateImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function updateImage() {
    if (!images[currentIndex]) return;
    const src = images[currentIndex].dataset.lightbox || images[currentIndex].src;
    lightboxImg.src = src;
    lightboxImg.alt = images[currentIndex].alt || 'Portfolio image';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-lightbox]').forEach((img, index) => {
    img.addEventListener('click', () => openLightbox(index));
  });

  closeBtn?.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  prevBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
  });

  nextBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateImage();
    }
    if (e.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % images.length;
      updateImage();
    }
  });
}

function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.portfolio-item[data-category], .masonry-item[data-category]');

  if (!filterBtns.length || !items.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      items.forEach((item) => {
        const category = item.dataset.category;
        const show = filter === 'all' || category === filter;
        item.style.display = show ? '' : 'none';
        item.style.opacity = show ? '1' : '0';
      });
    });
  });
}

function initInquiryPopup() {
  const popup = document.querySelector('.inquiry-popup');
  if (!popup) return;

  const closeBtn = popup.querySelector('.inquiry-popup-close');
  const dismissed = sessionStorage.getItem('inquiryDismissed');

  if (!dismissed) {
    setTimeout(() => popup.classList.add('show'), 5000);
  }

  closeBtn?.addEventListener('click', () => {
    popup.classList.remove('show');
    sessionStorage.setItem('inquiryDismissed', 'true');
  });
}

function initRevealFallback() {
  if (typeof AOS !== 'undefined') return;

  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  reveals.forEach((el) => observer.observe(el));
}
