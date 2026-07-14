const renderLucideIcons = () => {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons({
      attrs: {
        'stroke-width': 2.2
      }
    });
  }
};

window.addEventListener('load', renderLucideIcons);

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
  document.querySelectorAll('a, button, .benefit-card, .audience-row, .program-card, .rules-card, .faq-item').forEach((item) => {
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

const leadForm = document.querySelector('.lead-form');
const submitButton = document.querySelector('.form-submit');
if (leadForm && submitButton) {
  leadForm.addEventListener('submit', () => {
    submitButton.disabled = true;
    submitButton.innerHTML = 'ОТПРАВЛЯЕМ ЗАЯВКУ <i data-lucide="send" class="lucide-icon" aria-hidden="true"></i>';
    renderLucideIcons();
  });
}

const successModal = document.querySelector('#successModal');
const successCloseItems = document.querySelectorAll('[data-success-close]');
const url = new URL(window.location.href);
const openSuccessModal = () => {
  if (!successModal) return;
  successModal.classList.add('is-open');
  successModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  successModal.querySelector('.success-close')?.focus();
};
const closeSuccessModal = () => {
  if (!successModal) return;
  successModal.classList.remove('is-open');
  successModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  if (url.searchParams.has('sent')) {
    url.searchParams.delete('sent');
    history.replaceState({}, '', `${url.pathname}${url.search}${url.hash || ''}`);
  }
};

if (url.searchParams.get('sent') === '1') {
  window.addEventListener('load', () => {
    setTimeout(openSuccessModal, 250);
  });
}

successCloseItems.forEach((item) => {
  item.addEventListener('click', closeSuccessModal);
});

const legalModal = document.querySelector('#legalModal');
const legalOpenItems = document.querySelectorAll('[data-legal-open]');
const legalCloseItems = document.querySelectorAll('[data-legal-close]');

const openLegalModal = () => {
  if (!legalModal) return;
  legalModal.classList.add('is-open');
  legalModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  legalModal.querySelector('.legal-close')?.focus();
};

const closeLegalModal = () => {
  if (!legalModal) return;
  legalModal.classList.remove('is-open');
  legalModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
};

legalOpenItems.forEach((item) => {
  item.addEventListener('click', openLegalModal);
});

legalCloseItems.forEach((item) => {
  item.addEventListener('click', closeLegalModal);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (successModal?.classList.contains('is-open')) closeSuccessModal();
    if (legalModal?.classList.contains('is-open')) closeLegalModal();
  }
});
