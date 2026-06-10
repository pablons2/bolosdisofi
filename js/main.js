/**
 * Main JavaScript - Bolos di Sofi
 */

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add/remove scrolled class
    if (currentScroll > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }, { passive: true });
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ============================================
// SCROLL REVEAL ANIMATION
// ============================================
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

// ============================================
// WHATSAPP BUTTON TRACKING
// ============================================
function initWhatsAppTracking() {
  document.querySelectorAll('.btn-whatsapp, .whatsapp-float, .gallery-cta').forEach(btn => {
    btn.addEventListener('click', () => {
      // Optional: Add analytics tracking here
      console.log('WhatsApp CTA clicked');
    });
  });
}

// ============================================
// LAZY LOADING FOR IMAGES
// ============================================
function initLazyLoading() {
  // Check if native lazy loading is supported
  if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    return;
  }

  // Fallback for browsers without native support
  const lazyImages = document.querySelectorAll('img[data-src]');
  if (lazyImages.length === 0) return;

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => imageObserver.observe(img));
}

// ============================================
// NUMBER COUNTER ANIMATION
// ============================================
class NumberCounter {
  constructor() {
    this.counters = document.querySelectorAll('[data-count]');
    this.init();
  }

  init() {
    if (this.counters.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    this.counters.forEach(counter => observer.observe(counter));
  }

  animate(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const suffix = element.textContent.includes('+') ? '+' : '';
    const decimal = element.textContent.includes('.') ? 1 : 0;

    const update = () => {
      current += step;
      if (current < target) {
        element.textContent = current.toFixed(decimal) + suffix;
        requestAnimationFrame(update);
      } else {
        element.textContent = target.toFixed(decimal) + suffix;
      }
    };

    requestAnimationFrame(update);
  }
}

// ============================================
// GALLERY FILTER (placeholder for future use)
// ============================================
class GalleryFilter {
  constructor() {
    this.container = document.querySelector('.gallery-grid');
    this.buttons = document.querySelectorAll('.filter-btn');
    this.items = document.querySelectorAll('.gallery-item');
    
    if (this.buttons.length === 0) return;
    
    this.init();
  }

  init() {
    this.buttons.forEach(btn => {
      btn.addEventListener('click', (e) => this.handleFilter(e));
    });

    // CTA de personalização
    document.querySelectorAll('.gallery-cta').forEach(btn => {
      btn.addEventListener('click', () => {
        const message = encodeURIComponent('Olá! Vi um bolo na galeria e gostaria de personalizar um similar.');
        window.open(`https://wa.me/5555829883593?text=${message}`, '_blank');
      });
    });
  }

  handleFilter(e) {
    const filter = e.target.dataset.filter;
    if (!filter) return;
    
    // Atualizar botões
    this.buttons.forEach(btn => {
      btn.classList.remove('active');
      btn.setAttribute('aria-selected', 'false');
    });
    e.target.classList.add('active');
    e.target.setAttribute('aria-selected', 'true');

    // Filtrar itens
    this.items.forEach(item => {
      const category = item.dataset.category;
      
      if (filter === 'all' || category === filter) {
        item.classList.remove('hidden');
        item.style.opacity = '1';
        item.style.transform = 'scale(1)';
      } else {
        item.classList.add('hidden');
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
      }
    });
  }
}

// ============================================
// INITIALIZE ALL
// ============================================
function initAll() {
  initNavbar();
  initSmoothScroll();
  initScrollReveal();
  initWhatsAppTracking();
  initLazyLoading();
  
  // Initialize classes
  new NumberCounter();
  new GalleryFilter();
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAll);
} else {
  initAll();
}
