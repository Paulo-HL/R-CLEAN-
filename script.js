{/* script.js */}
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })


const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeInUp 0.8s ease-out forwards"
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

document.querySelectorAll(".card, .stat-item").forEach((el) => {
  observer.observe(el)
})

window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    if (pageYOffset >= sectionTop - 60) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active")
    }
  })
})

const style = document.createElement("style")
style.textContent = `
  .nav-link.active {
    color: var(--primary-light);
  }
  
  .nav-link.active::after {
    width: 100%;
  }
`
document.head.appendChild(style)


document.addEventListener('DOMContentLoaded', () => {
    const slidesContainer = document.querySelector('.carousel-slides');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');
    const dotsContainer = document.querySelector('.carousel-dots');
    const totalSlides = slides.length;
    let currentSlide = 0;
    
    // 1. Função para atualizar a posição do carrossel
    const updateCarousel = () => {
        // Calcula o deslocamento horizontal necessário
        const offset = -currentSlide * 100;
        slidesContainer.style.transform = `translateX(${offset}%)`;
        updateDots();
    };

    // 2. Criação dos pontos de navegação
    const createDots = () => {
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) {
                dot.classList.add('active');
            }
            // Adiciona evento de clique para ir para o slide específico
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateCarousel();
            });
            dotsContainer.appendChild(dot);
        });
    };

    // 3. Atualiza o estado dos pontos (qual está ativo)
    const updateDots = () => {
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    };

    // 4. Navegação para o próximo slide
    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    };

    // 5. Navegação para o slide anterior
    const prevSlide = () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    };
    
    // Adiciona os eventos de clique às setas
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // Inicializa a criação dos pontos
    createDots();

    // 6. Configura o Auto-Slide (Opcional)
    const autoSlideInterval = 5000; // Troca a cada 5 segundos
    setInterval(nextSlide, autoSlideInterval);
});