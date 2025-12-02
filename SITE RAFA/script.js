
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.card, .stat-item').forEach((el) => {
  observer.observe(el);
});


window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  let current = '';
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 60) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href') && link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

const style = document.createElement('style');
style.textContent = `
  .nav-link.active {
    color: var(--surface);
  }
  .nav-link.active::after {
    width: 100%;
  }
`;
document.head.appendChild(style);


const carrossel = document.querySelector('.carrossel');
const banner = document.querySelector('.banner');

if (banner && banner.children.length > 0) {
  // marca slides originais
  Array.from(banner.children).forEach((el) => el.classList.add('slide'));

  // cria clones para loop infinito
  const firstClone = banner.children[0].cloneNode(true);
  const lastClone = banner.children[banner.children.length - 1].cloneNode(true);
  firstClone.classList.add('clone');
  lastClone.classList.add('clone');
  firstClone.dataset.clone = 'true';
  lastClone.dataset.clone = 'true';

  banner.appendChild(firstClone);
  banner.insertBefore(lastClone, banner.firstChild);

  // posição inicial (1 = primeiro slide original)
  let index = 1;
  banner.style.transform = `translateX(-${index * 100}%)`;
  // desativa transição momentaneamente
  banner.style.transition = 'none';
  requestAnimationFrame(() => {
    // reativa transição depois do paint
    banner.style.transition = 'transform 0.5s ease-in-out';
  });

  function goToIndex(i) {
    index = i;
    banner.style.transform = `translateX(-${index * 100}%)`;
  }

  function next() {
    if (index >= banner.children.length - 1) return;
    goToIndex(index + 1);
  }

  function prev() {
    if (index <= 0) return;
    goToIndex(index - 1);
  }

  // autoplay sempre ativo
  let autoplay = setInterval(next, 3000);

  function restartAutoplay() {
    clearInterval(autoplay);
    autoplay = setInterval(next, 3000);
  }

  // ao terminar transição, ajustar se estamos em clone (sem delay visível)
  banner.addEventListener('transitionend', () => {
    const slidesCount = banner.children.length;
    const current = banner.children[index];
    if (current && (current.dataset.clone === 'true' || current.classList.contains('clone'))) {
      // se estamos no primeiro clone (final), volte para primeiro original
      if (index === slidesCount - 1) {
        banner.style.transition = 'none';
        index = 1;
        banner.style.transform = `translateX(-${index * 100}%)`;
      }
      // se estamos no último clone (início), vá para último original
      if (index === 0) {
        banner.style.transition = 'none';
        index = slidesCount - 2;
        banner.style.transform = `translateX(-${index * 100}%)`;
      }
    }
    // sempre reinicia autoplay após qualquer transição
    restartAutoplay();
  });

  // controles via botões
  const btnPrev = document.querySelector('.carousel-btn.prev');
  const btnNext = document.querySelector('.carousel-btn.next');
  if (btnPrev && btnNext) {
    btnPrev.addEventListener('click', () => {
      prev();
      restartAutoplay();
    });
    btnNext.addEventListener('click', () => {
      next();
      restartAutoplay();
    });
  }

  // pausa ao hover (mas sempre reinicia ao sair)
  if (carrossel) {
    carrossel.addEventListener('mouseenter', () => clearInterval(autoplay));
    carrossel.addEventListener('mouseleave', () => restartAutoplay());
  }
}



  const finalDate = new Date("Dec 10, 2025 23:59:59").getTime();

  const timer = setInterval(function () {
    const now = new Date().getTime();
    const distance = finalDate - now;

    if (distance < 0) {
      clearInterval(timer);
      document.getElementById("countdown").innerHTML = "Promoção encerrada!";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
  }, 1000);

const modal = document.getElementById("propaganda-modal");

// Função para abrir o modal
function abrirModal() {
    modal.style.display = "flex"; 
}

// Função para fechar o modal
function fecharModal() {
    modal.style.display = "none";
}

// Mostra o pop-up automaticamente após   

setTimeout(abrirModal, 2000);