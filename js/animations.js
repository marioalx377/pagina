/**
 * COSAMI - Animaciones con IntersectionObserver
 * Archivo: js/animations.js
 */

(function () {
  'use strict';

  /* =============================================
     1. Animate on scroll
     ============================================= */
  const animatedEls = document.querySelectorAll(
    '.quick-card, .service-card, .benefit-item, .agency-card, .stat-item'
  );

  // Añadir clase base
  animatedEls.forEach(el => el.classList.add('animate-on-scroll'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target); // solo una vez
        }
      });
    },
    { threshold: 0.15 }
  );

  animatedEls.forEach(el => observer.observe(el));

  /* =============================================
     2. Contador animado para estadísticas
     ============================================= */
  const counters = document.querySelectorAll('.stat-number');

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(counter => counterObserver.observe(counter));

  function animateCounter(el) {
    const target   = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1800; // ms
    const step     = Math.ceil(target / (duration / 16));
    let   current  = 0;

    const tick = () => {
      current = Math.min(current + step, target);
      el.textContent = current.toLocaleString('es-GT');

      if (current < target) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target.toLocaleString('es-GT');
        // Añadir símbolo especial para porcentaje
        if (el.closest('.stat-item') &&
            el.nextElementSibling &&
            el.nextElementSibling.textContent.includes('%')) {
          el.textContent = target + '%';
        }
      }
    };

    requestAnimationFrame(tick);
  }

  /* =============================================
     3. Header: sombra al hacer scroll
     ============================================= */
  const header = document.getElementById('header');

  const scrollHandler = () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  };

  window.addEventListener('scroll', scrollHandler, { passive: true });

  /* =============================================
     4. Back to top
     ============================================= */
  const backBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    backBtn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  backBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* =============================================
     5. Highlight nav link activo al hacer scroll
     ============================================= */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === `#${id}`
            );
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach(s => sectionObserver.observe(s));

  /* =============================================
     6. Ripple en tarjetas (clic)
     ============================================= */
  document.querySelectorAll('.quick-card').forEach(card => {
    card.addEventListener('click', function (e) {
      const href = this.dataset.href;
      if (href) {
        // Crear efecto ripple visual
        const ripple = document.createElement('span');
        ripple.style.cssText = `
          position:absolute; border-radius:50%;
          background:rgba(13,49,101,0.08);
          width:100px; height:100px;
          top:${e.offsetY - 50}px; left:${e.offsetX - 50}px;
          animation:ripple-out 0.5s ease forwards;
          pointer-events:none;
        `;
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 500);

        // Navegar
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

})();
