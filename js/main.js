/**
 * COSAMI - Funcionalidad general
 * Archivo: js/main.js
 */

(function () {
  'use strict';

  /* =============================================
     1. Menú hamburguesa (móvil)
     ============================================= */
  const menuToggle = document.getElementById('menuToggle');
  const navbar     = document.getElementById('navbar');

  menuToggle.addEventListener('click', () => {
    const isOpen = navbar.classList.toggle('open');
    menuToggle.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';

    // Inyectar botones de nav dentro del menú móvil si no existen
    if (isOpen && !navbar.querySelector('.nav-buttons-mobile')) {
      const mobileButtons = document.createElement('div');
      mobileButtons.className = 'nav-buttons-mobile';
      mobileButtons.innerHTML = `
        <a href="#micoope"  class="btn btn-outline">Mi Coope en línea</a>
        <a href="#contacto" class="btn btn-primary">Contáctanos</a>
      `;
      navbar.appendChild(mobileButtons);
    }
  });

  // Cerrar menú al hacer clic en un enlace
  navbar.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      navbar.classList.remove('open');
      menuToggle.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // Animación del botón hamburguesa (3 líneas → X)
  const style = document.createElement('style');
  style.textContent = `
    .menu-toggle.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    .menu-toggle.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
    .menu-toggle.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
  `;
  document.head.appendChild(style);

  /* =============================================
     2. Cotizador de préstamos
     ============================================= */
  const loanTerm    = document.getElementById('loanTerm');
  const plazoDisplay = document.getElementById('plazoDisplay');

  if (loanTerm) {
    loanTerm.addEventListener('input', () => {
      plazoDisplay.textContent = loanTerm.value;
    });
  }

  window.calcularCuota = function () {
    const tipo   = document.getElementById('loanType').value;
    const monto  = parseFloat(document.getElementById('loanAmount').value);
    const meses  = parseInt(document.getElementById('loanTerm').value, 10);
    const result = document.getElementById('calcResult');

    if (!tipo || !monto || monto < 1000) {
      showCalcError('Por favor ingresa un monto válido (mínimo Q1,000) y selecciona el tipo de préstamo.');
      return;
    }

    // Tasas anuales aproximadas por tipo
    const tasas = {
      personal:   0.18,  // 18% anual
      vivienda:   0.10,  // 10% anual
      vehiculo:   0.14,  // 14% anual
      empresarial: 0.16  // 16% anual
    };

    const tasaMensual = (tasas[tipo] || 0.18) / 12;
    let cuota;

    if (tasaMensual === 0) {
      cuota = monto / meses;
    } else {
      // Fórmula de amortización francesa
      cuota = (monto * tasaMensual * Math.pow(1 + tasaMensual, meses))
              / (Math.pow(1 + tasaMensual, meses) - 1);
    }

    const total = cuota * meses;

    document.getElementById('resultCuota').textContent = `Q ${cuota.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
    document.getElementById('resultTotal').textContent  = `Q ${total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;

    result.style.display = 'block';
    result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  function showCalcError(msg) {
    const r = document.getElementById('calcResult');
    r.style.display    = 'block';
    r.style.borderColor = '#dc2626';
    r.innerHTML = `<p style="color:#dc2626;font-size:.875rem;">${msg}</p>`;
    setTimeout(() => {
      r.style.display    = 'none';
      r.style.borderColor = '';
    }, 3000);
  }

  /* =============================================
     3. Formulario de contacto (AJAX)
     ============================================= */
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('[type="submit"]');
      submitBtn.disabled   = true;
      submitBtn.innerHTML  = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

      try {
        const formData = new FormData(contactForm);
        const response = await fetch('php/contact.php', {
          method: 'POST',
          body: formData
        });

        const data = await response.json();

        if (data.success) {
          formMessage.className = 'form-message success';
          formMessage.textContent = '✓ Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.';
          contactForm.reset();
        } else {
          throw new Error(data.message || 'Error al enviar');
        }
      } catch (err) {
        formMessage.className = 'form-message error';
        formMessage.textContent = '✗ ' + (err.message || 'Ocurrió un error. Intenta nuevamente o llámanos directamente.');
      }

      submitBtn.disabled  = false;
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar mensaje';

      setTimeout(() => {
        formMessage.className = 'form-message';
        formMessage.textContent = '';
      }, 6000);
    });
  }

  /* =============================================
     4. Smooth scroll para todos los anchors
     ============================================= */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const headerH = document.getElementById('header').offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH - 8;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* =============================================
     5. Lazy loading de imágenes
     ============================================= */
  if ('IntersectionObserver' in window) {
    const lazyImgs = document.querySelectorAll('img[data-src]');
    const imgObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imgObs.unobserve(img);
        }
      });
    });
    lazyImgs.forEach(img => imgObs.observe(img));
  }

  /* =============================================
     6. Cerrar dropdown al hacer clic fuera
     ============================================= */
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.style.opacity = '';
        menu.style.visibility = '';
      });
    }
  });

})();
