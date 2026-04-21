(function() {
  'use strict';

  // ---------- СЛАЙДЕР ----------
  const slides = [
    {
      bg: 'images/hero-bg.jpg',
      title: 'Бухгалтерские услуги<br>в Санкт-Петербурге',
    },
    {
      bg: 'images/contact-bg.jpg',
      title: 'Налоговое планирование<br>и консультации',
    },
    {
      bg: 'images/hero-bg.jpg',
      title: 'Кадровый учёт<br>и аутсорсинг',
    }
  ];

  const heroSection = document.querySelector('.hero');
  const heroTitle = document.getElementById('heroTitle');
  const dotsContainer = document.getElementById('sliderDots');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  
  let currentSlide = 0;
  let autoplayInterval = null;

  // Установка слайда по индексу
  function setSlide(index) {
    if (!heroSection || !heroTitle) return;
    
    // Зацикливание слайдов
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    
    const slide = slides[index];
    heroSection.style.backgroundImage = `url('${slide.bg}')`;
    heroTitle.innerHTML = slide.title;
    
    // Обновление активной точки
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    
    currentSlide = index;
  }

  // Создание точек
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      setSlide(i);
      resetAutoplay();
    });
    dotsContainer.appendChild(dot);
  });

  // Стрелки навигации
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      setSlide(currentSlide - 1);
      resetAutoplay();
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      setSlide(currentSlide + 1);
      resetAutoplay();
    });
  }

  // Инициализация первого слайда
  if (slides.length > 0) {
    setSlide(0);
  }

  // Автоматическое переключение
  function startAutoplay() {
    autoplayInterval = setInterval(() => {
      setSlide(currentSlide + 1);
    }, 5000);
  }

  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  }

  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  // Запуск автоплея при загрузке
  startAutoplay();

  // Остановка автоплея при наведении на слайдер
  heroSection.addEventListener('mouseenter', stopAutoplay);
  heroSection.addEventListener('mouseleave', startAutoplay);

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
          
          const burgerCheck = document.getElementById('burger');
          if (burgerCheck) burgerCheck.checked = false;
          
          document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
          this.classList.add('active');
        }
      }
    });
  });

  // Подсветка активной ссылки при скролле
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionBottom = sectionTop + section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
        current = section.getAttribute('id');
      }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href && href.substring(1) === current) {
        link.classList.add('active');
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