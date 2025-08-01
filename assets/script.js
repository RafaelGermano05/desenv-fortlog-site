// Inicializa AOS (Animate On Scroll)
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
    
    // Suaviza rolagem para links internos
    $('a[href^="#"]').on('click', function(event) {
      var target = $(this.getAttribute('href'));
      if (target.length) {
        event.preventDefault();
        $('html, body').stop().animate({
          scrollTop: target.offset().top - 70
        }, 1000);
      }
    });
    
    // Adiciona classe ativa ao item do menu conforme rolagem
    $(window).scroll(function() {
      var scrollDistance = $(window).scrollTop() + 100;
      
      $('section').each(function(i) {
        if ($(this).position().top <= scrollDistance) {
          $('.navbar-nav a.active').removeClass('active');
          $('.navbar-nav a').eq(i).addClass('active');
        }
      });
    }).scroll();
    
    // Animação infinita do slider de parceiros
    function duplicatePartners() {
      $('.partners-track').append($('.partners-track').html());
    }
    
    duplicatePartners();
    
    // Contador de números otimizado
    function animateCounters() {
      $('.counter-number').each(function() {
        var $this = $(this);
        var countTo = $this.attr('data-count');
        var duration = 2000; // Duração em milissegundos
        
        // Verifica se o elemento está visível na tela
        if (isElementInViewport($this[0])) {
          // Só anima se ainda não foi animado
          if (!$this.hasClass('animated')) {
            $this.addClass('animated');
            
            $({ countNum: 0 }).animate({ countNum: countTo }, {
              duration: duration,
              easing: 'swing',
              step: function() {
                var num = Math.floor(this.countNum);
                if (countTo > 1000) {
                  // Formata números grandes com separador de milhar
                  $this.text(num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                } else {
                  $this.text(num);
                }
              },
              complete: function() {
                // Garante que o número final seja exato
                if (countTo > 1000) {
                  $this.text(countTo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                } else {
                  $this.text(countTo);
                }
              }
            });
          }
        }
      });
    }
    
    // Verifica se o elemento está visível na viewport
    function isElementInViewport(el) {
      var rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
    
    // Executa a animação quando a página carrega e quando o usuário rola
    $(document).ready(function() {
      animateCounters();
      
      $(window).scroll(function() {
        animateCounters();
      });
    });