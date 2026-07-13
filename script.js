const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });
revealItems.forEach((item) => revealObserver.observe(item));

const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count || 0);
    const start = performance.now();
    const duration = 1300;
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      el.textContent = Math.floor(target * eased).toLocaleString('ru-RU');
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = `${target.toLocaleString('ru-RU')}+`;
    };
    requestAnimationFrame(tick);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach((counter) => counterObserver.observe(counter));

const cursor = document.querySelector('.cursor-dot');
if (cursor && window.matchMedia('(pointer:fine)').matches) {
  window.addEventListener('pointermove', (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  });
  document.querySelectorAll('a, .benefit-card, .audience-row, .program-card').forEach((item) => {
    item.addEventListener('mouseenter', () => {
      cursor.style.width = '34px';
      cursor.style.height = '34px';
    });
    item.addEventListener('mouseleave', () => {
      cursor.style.width = '13px';
      cursor.style.height = '13px';
    });
  });
}

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.magnetic').forEach((button) => {
    button.addEventListener('pointermove', (event) => {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      button.style.transform = `translate(${x * 0.08}px, ${y * 0.1}px)`;
    });
    button.addEventListener('pointerleave', () => {
      button.style.transform = '';
    });
  });

  const poster = document.querySelector('.hero-poster');
  if (poster && window.matchMedia('(pointer:fine)').matches) {
    poster.addEventListener('pointermove', (event) => {
      const rect = poster.getBoundingClientRect();
      const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 5;
      const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -5;
      poster.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotate(1.8deg)`;
    });
    poster.addEventListener('pointerleave', () => {
      poster.style.transform = 'rotate(1.8deg)';
    });
  }
}
