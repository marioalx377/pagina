/**
 * COSAMI - Slider / Carrusel
 * Archivo: js/slider.js
 */

(function () {
  'use strict';

  const slides     = document.querySelectorAll('.slide');
  const dotsWrap   = document.getElementById('sliderDots');
  const prevBtn    = document.getElementById('prevBtn');
  const nextBtn    = document.getElementById('nextBtn');

  if (!slides.length) return;

  let current   = 0;
  let timer     = null;
  const DELAY   = 5000; // ms entre slides automáticos

  /* ---------- Crear dots ---------- */
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('dot');
    dot.setAttribute('aria-label', `Ir al slide ${i + 1}`);
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  /* ---------- Ir a slide ---------- */
  function goTo(index) {
    // Quitar clase active del slide actual
    slides[current].classList.remove('active');
    dotsWrap.children[current].classList.remove('active');

    current = (index + slides.length) % slides.length;

    slides[current].classList.add('active');
    dotsWrap.children[current].classList.add('active');

    resetTimer();
  }

  /* ---------- Siguiente / Anterior ---------- */
  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  /* ---------- Auto-play ---------- */
  function startTimer() {
    timer = setInterval(next, DELAY);
  }
  function resetTimer() {
    clearInterval(timer);
    startTimer();
  }

  /* ---------- Eventos ---------- */
  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  /* Swipe táctil */
  let touchStartX = 0;
  const sliderEl = document.getElementById('slider');

  sliderEl.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  sliderEl.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
  }, { passive: true });

  /* Pausa al pasar el mouse */
  sliderEl.addEventListener('mouseenter', () => clearInterval(timer));
  sliderEl.addEventListener('mouseleave', startTimer);

  /* Teclado */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  prev();
    if (e.key === 'ArrowRight') next();
  });

  /* ---------- Iniciar ---------- */
  startTimer();

})();
