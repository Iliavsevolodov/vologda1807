const renderLucideIcons = () => {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons({
      attrs: {
        'stroke-width': 2.2
      }
    });
  }
};

const compactFaqStyles = document.createElement('link');
compactFaqStyles.rel = 'stylesheet';
compactFaqStyles.href = 'faq-compact.css';
document.head.appendChild(compactFaqStyles);

const extraFaqItems = [
  {
    icon: 'briefcase-business',
    question: 'Можно ли совмещать это с основной работой?',
    answer: 'Да. Формат можно развивать параллельно с работой, услугами, бизнесом, учёбой или семьёй. На встрече покажем, как встроить действия в обычный график без резких решений.'
  },
  {
    icon: 'badge-russian-ruble',
    question: 'Нужны ли большие вложения для старта?',
    answer: 'На презентации разберём реальные варианты старта и объясним, из чего складываются расходы. Вы сможете спокойно оценить формат и принять решение только после того, как получите полную информацию.'
  },
  {
    icon: 'megaphone-off',
    question: 'Я не продавец и не люблю навязывать. Мне подойдёт?',
    answer: 'Да. Речь не про давление на людей и агрессивные продажи. Основа — рекомендации, контент, общение и понятная система работы с теми, кому действительно интересен продукт или возможность.'
  },
  {
    icon: 'camera-off',
    question: 'Обязательно вести блог и постоянно снимать себя?',
    answer: 'Нет. Блог может быть инструментом, но это не единственный способ развития. На встрече расскажем о разных форматах коммуникации и продвижения.'
  },
  {
    icon: 'users-round',
    question: 'Нужно ли сразу приглашать друзей и родственников?',
    answer: 'Нет. Система не строится только на близком окружении. Есть современные онлайн-инструменты, контент и способы находить людей за пределами списка знакомых.'
  },
  {
    icon: 'chart-no-axes-column-increasing',
    question: 'Как быстро можно начать зарабатывать?',
    answer: 'У всех разный темп и результат зависит от действий, навыков и времени, которое человек готов уделять направлению. На встрече мы не обещаем гарантированный доход, а показываем модель и конкретные шаги старта.'
  },
  {
    icon: 'circle-help',
    question: 'А если я вообще ничего не понимаю в таком бизнесе?',
    answer: 'Это нормально. Многие начинают без опыта. Есть обучение, наставничество и последовательные действия. На презентации всё объясним простым языком без сложных терминов.'
  },
  {
    icon: 'shield-question',
    question: 'Что, если у меня не получится?',
    answer: 'Приходить на презентацию — не значит брать на себя обязательства. Сначала вы изучаете информацию, задаёте вопросы и оцениваете систему. Решение о старте принимаете самостоятельно.'
  },
  {
    icon: 'clock',
    question: 'Сколько времени нужно уделять этому направлению?',
    answer: 'Зависит от вашей цели и графика. Кто-то начинает с нескольких часов в неделю, кто-то выделяет больше времени. Главное — регулярные действия, а не работа круглосуточно.'
  },
  {
    icon: 'package-open',
    question: 'Нужно ли хранить товар дома или заниматься доставкой?',
    answer: 'Нет. Не нужно открывать склад и самостоятельно выстраивать логистику с нуля. На встрече покажем, как устроена инфраструктура компании и работа с заказами.'
  },
  {
    icon: 'calendar-check-2',
    question: 'Я могу просто прийти и ничего не решать на месте?',
    answer: 'Конечно. Можно просто послушать, познакомиться с системой, задать вопросы и уйти подумать. Никаких обязательных решений на встрече нет.'
  }
];

const faqList = document.querySelector('.faq-premium-list');
if (faqList) {
  const startNumber = faqList.querySelectorAll('.faq-premium-item').length + 1;
  extraFaqItems.forEach((item, index) => {
    const details = document.createElement('details');
    details.className = 'faq-item faq-premium-item';
    const number = String(startNumber + index).padStart(2, '0');
    details.innerHTML = `
      <summary><span>${number}</span><i data-lucide="${item.icon}" class="faq-question-icon" aria-hidden="true"></i><strong>${item.question}</strong></summary>
      <div class="faq-answer"><p>${item.answer}</p></div>
    `;
    faqList.appendChild(details);
  });
}

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