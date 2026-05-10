'use strict';

document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const lectureSection = document.querySelector('.lecture');
  const lecturePhoto   = document.querySelector('.lecture__photo');
  if (lectureSection && lecturePhoto) {
    const photoObserver = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        lecturePhoto.classList.add('lecture__photo--pop');
        photoObserver.disconnect();
      }
    }, { threshold: 0.2 });
    photoObserver.observe(lectureSection);
  }

  const lectureCollage = document.querySelector('.lecture__collage');
  if (lectureCollage) {
    const collageObserver = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        lectureCollage.classList.add('lecture__collage--animated');
        collageObserver.disconnect();
      }
    }, { threshold: 0.3 });
    collageObserver.observe(lectureCollage);
  }

  (function () {
    const grid    = document.getElementById('stagesGrid');
    const controls = document.getElementById('stagesControls');
    const dotsEl  = document.getElementById('stagesDots');
    const prevBtn = document.getElementById('stagesPrev');
    const nextBtn = document.getElementById('stagesNext');
    if (!grid || !controls || !dotsEl || !prevBtn || !nextBtn) return;

    const slides   = Array.from(grid.querySelectorAll('.stages__slide'));
    const total    = slides.length;
    const MQ       = window.matchMedia('(max-width: 768px)');
    const MQ_SMALL = window.matchMedia('(max-width: 450px)');
    let track   = null;
    let current = 0;

    function getMetrics() {
      return MQ_SMALL.matches ? { w: grid.clientWidth, gap: 8 } : { w: 335, gap: 20 };
    }

    function goTo(n) {
      current = Math.max(0, Math.min(n, total - 1));
      const { w, gap } = getMetrics();
      slides.forEach(s => { s.style.width = w + 'px'; });
      track.style.gap = gap + 'px';
      const maxOffset = Math.max(0, total * w + (total - 1) * gap - grid.clientWidth);
      const offset    = Math.min(current * (w + gap), maxOffset);
      track.style.transform = `translateX(-${offset}px)`;

      prevBtn.disabled = current === 0;
      nextBtn.disabled = current === total - 1 || offset >= maxOffset;

      dotsEl.querySelectorAll('.stages__dot').forEach((d, i) =>
        d.classList.toggle('stages__dot--active', i === current)
      );
    }

    function onPrev() { goTo(current - 1); }
    function onNext() { goTo(current + 1); }

    function initCarousel() {
      if (grid.classList.contains('stages__grid--carousel')) return;

      track = document.createElement('div');
      track.className = 'stages__track';
      slides.forEach(s => track.appendChild(s));
      grid.appendChild(track);
      grid.classList.add('stages__grid--carousel');

      dotsEl.innerHTML = '';
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'stages__dot';
        dot.setAttribute('aria-label', `Слайд ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsEl.appendChild(dot);
      });

      prevBtn.addEventListener('click', onPrev);
      nextBtn.addEventListener('click', onNext);
      goTo(0);
      controls.style.display = 'flex';
    }

    function destroyCarousel() {
      if (!grid.classList.contains('stages__grid--carousel')) return;
      prevBtn.removeEventListener('click', onPrev);
      nextBtn.removeEventListener('click', onNext);
      if (track) {
        while (track.firstChild) grid.insertBefore(track.firstChild, track);
        track.remove();
        track = null;
      }
      grid.classList.remove('stages__grid--carousel');
      dotsEl.innerHTML = '';
      controls.style.display = '';
      slides.forEach(s => { s.style.width = ''; });
      current = 0;
    }

    MQ.addEventListener('change', e => e.matches ? initCarousel() : destroyCarousel());
    window.addEventListener('resize', () => {
      if (grid.classList.contains('stages__grid--carousel')) goTo(current);
    });

    if (MQ.matches) initCarousel();
  }());

  /* Members carousel — looping, auto-advance 4s */
  (function () {
    const viewport  = document.getElementById('membersViewport');
    const track     = document.getElementById('membersTrack');
    const prevBtn   = document.getElementById('membersPrev');
    const nextBtn   = document.getElementById('membersNext');
    const counterEl = document.getElementById('membersCurrent');
    if (!viewport || !track || !prevBtn || !nextBtn || !counterEl) return;

    const MQ_MOB     = window.matchMedia('(max-width: 768px)');
    const origSlides = Array.from(track.querySelectorAll('.members__slide'));
    const total      = origSlides.length;
    const OFFSET     = 3; 

    for (let i = total - 1; i >= total - OFFSET; i--) {
      const c = origSlides[i].cloneNode(true);
      c.setAttribute('aria-hidden', 'true');
      track.prepend(c);
    }
    for (let i = 0; i < OFFSET; i++) {
      const c = origSlides[i].cloneNode(true);
      c.setAttribute('aria-hidden', 'true');
      track.appendChild(c);
    }

    const allSlides     = Array.from(track.children);
    let current         = OFFSET;
    let isTransitioning = false;
    let autoTimer;

    function getSlideWidth() { return MQ_MOB.matches ? viewport.clientWidth : 394; }
    function getGap()        { return MQ_MOB.matches ? 8 : 20; }

    function updateCounter(idx) {
      counterEl.textContent = ((idx - OFFSET + total) % total) + 1;
    }

    function applyPos(idx, animate) {
      const w   = getSlideWidth();
      const gap = getGap();
      allSlides.forEach(s => { s.style.width = w + 'px'; });
      track.style.gap = gap + 'px';
      if (!animate) {
        track.style.transition = 'none';
        track.style.transform  = `translateX(-${idx * (w + gap)}px)`;
        track.getBoundingClientRect();
      } else {
        track.style.transition = 'transform 0.5s ease';
        track.style.transform  = `translateX(-${idx * (w + gap)}px)`;
      }
      current = idx;
      updateCounter(idx);
    }

    track.addEventListener('transitionend', e => {
      if (e.propertyName !== 'transform') return;
      isTransitioning = false;
      if (current < OFFSET)              applyPos(current + total, false);
      else if (current >= OFFSET + total) applyPos(current - total, false);
    });

    function goNext() {
      if (isTransitioning) return;
      isTransitioning = true;
      applyPos(current + 1, true);
    }

    function goPrev() {
      if (isTransitioning) return;
      isTransitioning = true;
      applyPos(current - 1, true);
    }

    function startAuto() {
      clearInterval(autoTimer);
      autoTimer = setInterval(goNext, 4000);
    }

    nextBtn.addEventListener('click', () => { goNext(); startAuto(); });
    prevBtn.addEventListener('click', () => { goPrev(); startAuto(); });

    viewport.addEventListener('mouseenter', () => clearInterval(autoTimer));
    viewport.addEventListener('mouseleave', startAuto);

    MQ_MOB.addEventListener('change', () => applyPos(current, false));
    window.addEventListener('resize',  () => applyPos(current, false));

    applyPos(OFFSET, false);
    startAuto();
  }());

  document.querySelectorAll('.stages__plane').forEach(plane => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        plane.classList.add('stages__plane--animated');
        obs.disconnect();
      }
    }, { threshold: 0.25 });
    obs.observe(plane);
  });

});
