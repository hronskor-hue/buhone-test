(function() {
  'use strict';

  // ---------- СЛАЙДЕР ----------
  const slides = [
    {
      bg: 'images/hero-bg.jpg',
      title: 'Бухгалтерские услуги<br>в Санкт-Петербурге',
    },
    {
      bg: 'images/contact-bg.jpg', // можно заменить на другие картинки
      title: 'Профессиональный подход<br>к вашему бизнесу',
    },
    {
      bg: 'images/hero-bg.jpg',
      title: 'Более 10 лет опыта<br>в бухгалтерии',
    }
  ];

  const heroSection = document.querySelector('.hero');
  const heroTitle = document.querySelector('.hero h1');
  const dotsContainer = document.getElementById('sliderDots');
  let currentSlide = 0;

  // Установка фона и заголовка по индексу
  function setSlide(index) {
    if (!heroSection || !heroTitle) return;
    const slide = slides[index];
    heroSection.style.backgroundImage = `linear-gradient(0deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.55) 100%), url('${slide.bg}')`;
    heroTitle.innerHTML = slide.title;
    
    // Обновление активной точки
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
    currentSlide = index;
  }

  // Создание точек
  if (dotsContainer) {
    slides.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => setSlide(i));
      dotsContainer.appendChild(dot);
    });
  }

  // Инициализация первого слайда
  if (slides.length > 0) {
    setSlide(0);
  }

  // Автоматическое переключение (опционально)
  // setInterval(() => {
  //   const next = (currentSlide + 1) % slides.length;
  //   setSlide(next);
  // }, 5000);

  // ---------- ПЛАВНАЯ НАВИГАЦИЯ ----------
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href !== '#') {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Закрываем мобильное меню, если открыто
          const burgerCheck = document.getElementById('burger');
          if (burgerCheck) burgerCheck.checked = false;
          
          // Подсветка активной ссылки (только для десктопной навигации)
          document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
          this.classList.add('active');
        }
      }
    });
  });

  // ---------- ФОРМА И ПОПАП ----------
  const form = document.getElementById('contactForm');
  const popup = document.getElementById('successPopup');
  const closeBtn = document.getElementById('closePopup');

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const inputs = form.querySelectorAll('input[required], textarea[required]');
      let valid = true;
      inputs.forEach(input => {
        if (!input.value.trim()) valid = false;
      });
      if (valid) {
        popup.classList.add('active');
        form.reset();
      } else {
        alert('Пожалуйста, заполните все обязательные поля.');
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => popup.classList.remove('active'));
  }
  if (popup) {
    popup.addEventListener('click', (e) => {
      if (e.target === popup) popup.classList.remove('active');
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popup && popup.classList.contains('active')) {
      popup.classList.remove('active');
    }
  });

})();