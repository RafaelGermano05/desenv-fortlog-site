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
  if ($(window).width() >= 992) {
    const truck = $('#animated-truck');
    const floatingTruck = $('.floating-truck');
    const scrollPosition = $(window).scrollTop();
    
    // Só anima o caminhão flutuante se ainda estiver na seção hero
    if (scrollPosition < $('#about').offset().top) {
      // Diminui a opacidade do caminhão flutuante conforme scroll
      const opacity = 1 - (scrollPosition / ($('#about').offset().top * 0.8));
      floatingTruck.css('opacity', Math.max(opacity, 0));
      
      // Aumenta o tamanho do caminhão animado conforme scroll
      const scale = 1 + (scrollPosition / ($(window).height() * 2));
      truck.css('transform', `translateX(${truckPosition}px) scale(${Math.min(scale, 1.2)})`);
    } else {
      floatingTruck.css('opacity', 0);
    }
    
    // Restante da animação existente...
  }
}

function animateTruckOnScroll() {
  if ($(window).width() >= 992) { 
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
// Função corrigida para animar os contadores
function animateCounters() {
  document.querySelectorAll('.counter-value').forEach(counter => {
    if (isElementInViewport(counter) && !counter.classList.contains('animated')) {
      counter.classList.add('animated');
      const countTo = parseInt(counter.getAttribute('data-count'));
      const duration = 2000;
      let start = null;
      
      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const value = Math.floor(progress * countTo);
        
        // Atualiza o valor exibido
        counter.textContent = formatNumber(value);
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          counter.textContent = formatNumber(countTo);
        }
      };
      
      window.requestAnimationFrame(step);
    }
  });
}

// Função auxiliar para formatar números
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Função para verificar se elemento está visível
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
}

// Inicializa os contadores quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
  animateCounters();
  window.addEventListener('scroll', animateCounters);
});

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