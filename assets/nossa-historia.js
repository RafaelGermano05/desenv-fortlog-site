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

      // Animação do caminhão na estrada com scroll
      const movingTruck = document.getElementById('movingTruck');
      const roadContainer = document.querySelector('.road-container');
      const timelineItems = document.querySelectorAll('.timeline-item-road');
      
      // Posição inicial do caminhão
      movingTruck.style.top = '0px';
      
      // Evento de scroll para mover o caminhão
      window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const roadSection = document.querySelector('.road-timeline-section');
        const roadSectionTop = roadSection.offsetTop;
        const roadSectionHeight = roadSection.offsetHeight;
        const windowHeight = window.innerHeight;
        
        // Verifica se a seção da estrada está visível
        if (scrollPosition > roadSectionTop - windowHeight && 
            scrollPosition < roadSectionTop + roadSectionHeight) {
          
          // Calcula a posição do caminhão baseada no scroll
          const scrollPercent = (scrollPosition - roadSectionTop + windowHeight/2) / 
                                (roadSectionHeight - windowHeight/2);
          
          // Limita entre 0 e 1
          const limitedScrollPercent = Math.min(Math.max(scrollPercent, 0), 1);
          
          // Posição do caminhão (90% da altura do container para dar margem)
          const truckPosition = limitedScrollPercent * (roadContainer.offsetHeight - 100);
          movingTruck.style.top = `${truckPosition}px`;
          
          // Mostra/oculta os itens da linha do tempo conforme o scroll
          // AUMENTEI a área de visibilidade para que os containers fiquem visíveis por mais tempo
          timelineItems.forEach(item => {
            const itemTop = parseInt(item.style.top);
            // Aumentei a margem de 100px para 200px para os containers ficarem visíveis por mais tempo
            if (truckPosition > itemTop - 200 && truckPosition < itemTop + 200) {
              item.classList.add('visible');
            } else {
              item.classList.remove('visible');
            }
          });
        }
      });
      
      // Forçar verificação inicial para exibir itens visíveis no carregamento
      window.dispatchEvent(new Event('scroll'));
    });