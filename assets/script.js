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
  
  // Animação do caminhão baseada no scroll
  animateTruckOnScroll();
}).scroll();

// Animação do caminhão
function animateTruckOnScroll() {
  if ($(window).width() >= 992) { // Somente para desktop
    const truck = $('#animated-truck');
    const scrollPosition = $(window).scrollTop();
    const windowHeight = $(window).height();
    const documentHeight = $(document).height();
    
    // Posição horizontal baseada no scroll
    const scrollPercentage = scrollPosition / (documentHeight - windowHeight);
    const truckPosition = scrollPercentage * ($(window).width() + 200) - 200;
    
    // Movimento básico da esquerda para a direita
    truck.css('transform', `translateX(${truckPosition}px)`);
    
    // Efeitos especiais em seções específicas
    if (scrollPosition > $('#services').offset().top - windowHeight/2 && 
        scrollPosition < $('#services').offset().top + $('#services').height() - windowHeight/3) {
      // Tremor quando chegar na seção de serviços
      truck.css('animation', 'shake 0.5s infinite alternate');
    } else {
      truck.css('animation', 'none');
    }
    
    // Inclinação nas curvas (efeito de perspectiva)
    if (scrollPosition > $('#about').offset().top && scrollPosition < $('#contact').offset().top) {
      const tilt = (scrollPosition - $('#about').offset().top) / 20;
      truck.find('img').css('transform', `rotate(${Math.min(tilt, 10)}deg)`);
    } else {
      truck.find('img').css('transform', 'rotate(0deg)');
    }
  }
}

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
    var duration = 2000;
    
    if (isElementInViewport($this[0])) {
      if (!$this.hasClass('animated')) {
        $this.addClass('animated');
        
        $({ countNum: 0 }).animate({ countNum: countTo }, {
          duration: duration,
          easing: 'swing',
          step: function() {
            var num = Math.floor(this.countNum);
            if (countTo > 1000) {
              $this.text(num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
            } else {
              $this.text(num);
            }
          },
          complete: function() {
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

// Efeito inicial do caminhão entrando na tela
$(document).ready(function() {
  if ($(window).width() >= 992) {
    $('#animated-truck').css({
      'transform': 'translateX(0)',
      'transition': 'transform 2s ease-out'
    });
    
    setTimeout(() => {
      $('#animated-truck').css('transition', 'transform 0.5s ease-out');
    }, 2000);
  }
  
  animateCounters();
  $(window).scroll(animateCounters);
});

// Adiciona a animação de shake no CSS dinamicamente
$('<style>')
  .prop('type', 'text/css')
  .html('\
    @keyframes shake {\
      0% { transform: translateX(0) translateY(0); }\
      25% { transform: translateX(-5px) translateY(-2px); }\
      50% { transform: translateX(5px) translateY(2px); }\
      75% { transform: translateX(-5px) translateY(-2px); }\
      100% { transform: translateX(5px) translateY(2px); }\
    }')
  .appendTo('head');