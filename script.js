document.addEventListener("DOMContentLoaded", () => {

  // MENÚ PARA CELULARES
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      navigation.classList.toggle("open");

      const isOpen = navigation.classList.contains("open");
      menuButton.setAttribute("aria-expanded", isOpen);
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navigation.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ACORDEONES DE HABILIDADES Y HERRAMIENTAS
  const accordionButtons = document.querySelectorAll(
    ".accordion-trigger"
  );

  accordionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const panelId = button.getAttribute("aria-controls");
      const panel = document.getElementById(panelId);

      if (panel) {
        const isExpanded =
          button.getAttribute("aria-expanded") === "true";

        button.setAttribute("aria-expanded", !isExpanded);
        panel.hidden = isExpanded;
      }
    });
  });

  // AMPLIAR IMÁGENES
  const images = document.querySelectorAll(".zoomable");
  const lightbox = document.querySelector(".lightbox");
  const lightboxImage = lightbox?.querySelector("img");
  const closeButton = document.querySelector(".lightbox-close");

  const closeLightbox = () => {
    if (lightbox && lightboxImage) {
      lightbox.hidden = true;
      lightboxImage.removeAttribute("src");
    }
  };

  images.forEach((image) => {
    image.addEventListener("click", () => {
      if (lightbox && lightboxImage) {
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        lightbox.hidden = false;
      }
    });
  });

  if (closeButton) {
    closeButton.addEventListener("click", closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
    }
  });

});
