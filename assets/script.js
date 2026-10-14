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

  function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top <= window.innerHeight && rect.bottom >= 0;
  }

  function formatNumber(value) {
    return value.toLocaleString("pt-BR");
  }

  function animateCounters() {
    document.querySelectorAll(".counter-number").forEach(function (counter) {
      if (!isElementInViewport(counter) || counter.classList.contains("animated")) return;

      counter.classList.add("animated");
      const countTo = parseInt(counter.dataset.count, 10) || 0;
      const duration = 1800;
      let start = null;

      function step(timestamp) {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const currentValue = Math.floor(progress * countTo);
        counter.textContent = formatNumber(currentValue);

        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          counter.textContent = formatNumber(countTo);
        }
      }

      window.requestAnimationFrame(step);
    });
  }

  function initPartnersSlider() {
    const track = document.querySelector(".partners-track");
    if (!track || track.dataset.cloned === "true") return;

    const originalLogos = Array.from(track.children);
    originalLogos.forEach(function (logo) {
      const clone = logo.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      clone.setAttribute("loading", "lazy");
      track.appendChild(clone);
    });

    track.dataset.cloned = "true";
  }

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const formData = new FormData(contactForm);
      const name = formData.get("name") || "";
      const phone = formData.get("phone") || "";
      const email = formData.get("email") || "";
      const service = formData.get("service") || "Não informado";
      const message = formData.get("message") || "";

      const whatsappMessage = [
        "Olá, Simone! Gostaria de solicitar um orçamento com a FORTLOG.",
        "",
        `Nome: ${name}`,
        `Telefone: ${phone}`,
        `E-mail: ${email || "Não informado"}`,
        `Serviço de interesse: ${service}`,
        `Mensagem: ${message || "Não informada"}`
      ].join("\n");

      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, "_blank", "noopener");
    });
  }

  window.addEventListener("scroll", animateCounters, { passive: true });
  animateCounters();
  initPartnersSlider();
});
