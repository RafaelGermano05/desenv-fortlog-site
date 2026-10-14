document.addEventListener("DOMContentLoaded", function () {
  const whatsappNumber = "5585999211671";

  if (window.AOS) {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true
    });
  }

  document.querySelectorAll(".js-whatsapp-link").forEach(function (link) {
    const message = link.dataset.message || "Olá, Simone! Gostaria de falar com a FORTLOG.";
    link.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  });

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (event) {
      const targetSelector = this.getAttribute("href");
      if (!targetSelector || targetSelector === "#") return;

      const target = document.querySelector(targetSelector);
      if (!target) return;

      event.preventDefault();
      const navbar = document.querySelector(".navbar");
      const scrollOffset = navbar ? navbar.offsetHeight + 24 : 76;

      window.scrollTo({
        top: target.offsetTop - scrollOffset,
        behavior: "smooth"
      });

      const navbarCollapse = document.querySelector(".navbar-collapse.show");
      if (navbarCollapse && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(navbarCollapse).hide();
      }
    });
  });

  const movingTruck = document.getElementById("movingTruck");
  const roadContainer = document.querySelector(".road-container");
  const roadSection = document.querySelector(".road-timeline-section");
  const timelineItems = document.querySelectorAll(".timeline-item-road");

  if (!movingTruck || !roadContainer || !roadSection || !timelineItems.length) return;

  movingTruck.style.top = "0px";

  function moveTruckOnScroll() {
    const scrollPosition = window.scrollY;
    const roadSectionTop = roadSection.offsetTop;
    const roadSectionHeight = roadSection.offsetHeight;
    const windowHeight = window.innerHeight;

    if (window.innerWidth <= 768) {
      timelineItems.forEach(function (item) {
        item.classList.add("visible");
      });
      return;
    }

    if (
      scrollPosition > roadSectionTop - windowHeight &&
      scrollPosition < roadSectionTop + roadSectionHeight
    ) {
      const scrollPercent =
        (scrollPosition - roadSectionTop + windowHeight / 2) /
        (roadSectionHeight - windowHeight / 2);
      const limitedScrollPercent = Math.min(Math.max(scrollPercent, 0), 1);
      const truckPosition = limitedScrollPercent * (roadContainer.offsetHeight - 100);

      movingTruck.style.top = `${truckPosition}px`;

      timelineItems.forEach(function (item) {
        const itemTop = parseInt(item.style.top, 10);

        if (truckPosition > itemTop - 220 && truckPosition < itemTop + 220) {
          item.classList.add("visible");
        } else {
          item.classList.remove("visible");
        }
      });
    }
  }

  let ticking = false;

  window.addEventListener(
    "scroll",
    function () {
      if (ticking) return;

      window.requestAnimationFrame(function () {
        moveTruckOnScroll();
        ticking = false;
      });

      ticking = true;
    },
    { passive: true }
  );

  window.addEventListener("resize", moveTruckOnScroll);
  moveTruckOnScroll();
});
