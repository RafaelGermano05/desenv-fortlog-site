document.addEventListener('DOMContentLoaded', function() {
      // Inicializa AOS
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
      });

      // Suaviza rolagem para links internos
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            window.scrollTo({
              top: target.offsetTop - 70,
              behavior: 'smooth'
            });
          }
        });
      });

      // Animação do caminhão com scroll
      function animateTruck() {
        if (window.innerWidth >= 992) {
          const truck = document.getElementById('truck-animation');
          if (!truck) return;
          
          const scrollPosition = window.scrollY;
          const documentHeight = document.body.scrollHeight - window.innerHeight;
          const scrollPercentage = scrollPosition / documentHeight;
          
          // Posição horizontal baseada no scroll (limitada para não ultrapassar a tela)
          const truckPosition = Math.min(scrollPercentage * (window.innerWidth + 200), window.innerWidth - 100);
          
          // Movimento suave da esquerda para a direita
          truck.style.transform = `translateX(${truckPosition}px)`;
          
          // Efeito de tremor na seção de serviços
          const servicesSection = document.getElementById('services');
          if (servicesSection) {
            const servicesTop = servicesSection.offsetTop;
            const servicesHeight = servicesSection.offsetHeight;
            
            if (scrollPosition > servicesTop - window.innerHeight/2 && 
                scrollPosition < servicesTop + servicesHeight - window.innerHeight/3) {
              truck.style.animation = 'truckShake 0.5s infinite alternate';
            } else {
              truck.style.animation = 'none';
            }
          }
        }
      }

      // Adiciona a animação de shake no CSS
      const style = document.createElement('style');
      style.textContent = `
        @keyframes truckShake {
          0% { transform: translateX(var(--truck-x)) translateY(0); }
          25% { transform: translateX(calc(var(--truck-x) - 5px)) translateY(-2px); }
          50% { transform: translateX(calc(var(--truck-x) + 5px)) translateY(2px); }
          75% { transform: translateX(calc(var(--truck-x) - 5px)) translateY(-2px); }
          100% { transform: translateX(calc(var(--truck-x) + 5px)) translateY(2px); }
        }
      `;
      document.head.appendChild(style);

      // Evento de scroll
      window.addEventListener('scroll', animateTruck);
      
      // Inicia o caminhão fora da tela (somente desktop)
      if (window.innerWidth >= 992) {
        const truck = document.getElementById('truck-animation');
        if (truck) {
          setTimeout(() => {
            truck.style.transition = 'transform 2s ease-out';
            truck.style.transform = 'translateX(0)';
            
            setTimeout(() => {
              truck.style.transition = 'transform 0.5s ease-out';
            }, 2000);
          }, 500);
        }
      }

      // Animação dos contadores
      function animateCounters() {
        document.querySelectorAll('.counter-number').forEach(counter => {
          if (isElementInViewport(counter) && !counter.classList.contains('animated')) {
            counter.classList.add('animated');
            const countTo = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            let start = null;
            
            const step = (timestamp) => {
              if (!start) start = timestamp;
              const progress = Math.min((timestamp - start) / duration, 1);
              const value = Math.floor(progress * countTo);
              
              if (countTo > 1000) {
                counter.textContent = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              } else {
                counter.textContent = value;
              }
              
              if (progress < 1) {
                window.requestAnimationFrame(step);
              } else {
                if (countTo > 1000) {
                  counter.textContent = countTo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                } else {
                  counter.textContent = countTo;
                }
              }
            };
            
            window.requestAnimationFrame(step);
          }
        });
      }

      function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
          rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.bottom >= 0
        );
      }

      // Slider de parceiros automático
      function initPartnersSlider() {
        const track = document.querySelector('.partners-track');
        if (track) {
          // Duplica os logos para criar efeito contínuo
          track.innerHTML += track.innerHTML;
          
          let position = 0;
          const speed = 1;
          const animate = () => {
            position -= speed;
            if (position <= -track.scrollWidth / 2) {
              position = 0;
            }
            track.style.transform = `translateX(${position}px)`;
            requestAnimationFrame(animate);
          };
          animate();
        }
      }

      window.addEventListener('scroll', animateCounters);
      animateCounters(); // Executa uma vez ao carregar
      initPartnersSlider();
    });