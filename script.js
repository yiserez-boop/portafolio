
document.addEventListener("DOMContentLoaded", () => {

  // ==========================================
  // 1. MENÚ PARA CELULARES
  // ==========================================

  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");

  if (menuButton && navigation) {

    const closeMenu = () => {
      navigation.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Abrir menú");
    };

    menuButton.addEventListener("click", () => {

      const isOpen = navigation.classList.toggle("open");

      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Cerrar menú" : "Abrir menú"
      );

    });

    navigation.querySelectorAll("a").forEach((link) => {

      link.addEventListener("click", () => {
        closeMenu();
      });

    });

    document.addEventListener("keydown", (event) => {

      if (event.key === "Escape") {
        closeMenu();
      }

    });

  }


  // ==========================================
  // 2. BOTONES PARA VOLVER AL INICIO
  // ==========================================

  const homeLinks = document.querySelectorAll(
    '.main-nav a[href="#inicio"], .back-top, .brand'
  );

  const homeSection = document.getElementById("inicio");

  homeLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

      event.preventDefault();

      if (homeSection) {

        homeSection.scrollIntoView({
          behavior: window.matchMedia(
            "(prefers-reduced-motion: reduce)"
          ).matches ? "auto" : "smooth",
          block: "start"
        });

      } else {

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

      }

      // Actualiza la dirección de la página
      history.replaceState(null, "", "#inicio");

    });

  });


  // ==========================================
  // 3. ACORDEONES DE HABILIDADES Y HERRAMIENTAS
  // ==========================================

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

        button.setAttribute(
          "aria-expanded",
          String(!isExpanded)
        );

        panel.hidden = isExpanded;

      }

    });

  });


  // ==========================================
  // 4. AMPLIAR IMÁGENES
  // ==========================================

  const images = document.querySelectorAll(".zoomable");

  const lightbox = document.querySelector(".lightbox");

  const lightboxImage = lightbox?.querySelector("img");

  const closeButton = document.querySelector(".lightbox-close");

  let previousFocus = null;


  // Preparar las imágenes para navegación con teclado

  images.forEach((image) => {

    image.setAttribute("tabindex", "0");
    image.setAttribute("role", "button");

    image.setAttribute(
      "aria-label",
      "Ampliar imagen: " + image.alt
    );


    // Abrir con clic

    image.addEventListener("click", () => {
      openLightbox(image);
    });


    // Abrir con teclado

    image.addEventListener("keydown", (event) => {

      if (event.key === "Enter" || event.key === " ") {

        event.preventDefault();
        openLightbox(image);

      }

    });

  });


  // Función para abrir el visor

  function openLightbox(image) {

    if (!lightbox || !lightboxImage) return;

    previousFocus = image;

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    lightbox.hidden = false;

    // Llevar el foco al botón de cerrar

    if (closeButton) {
      closeButton.focus();
    } else {
      lightbox.focus();
    }

  }


  // Función para cerrar el visor

  function closeLightbox() {

    if (!lightbox || !lightboxImage || lightbox.hidden) {
      return;
    }

    lightbox.hidden = true;

    lightboxImage.removeAttribute("src");
    lightboxImage.alt = "";

    // Devolver el foco a la imagen seleccionada

    if (previousFocus) {
      previousFocus.focus();
      previousFocus = null;
    }

  }


  // Botón para cerrar

  if (closeButton) {

    closeButton.addEventListener("click", closeLightbox);

  }


  // Cerrar al hacer clic fuera de la imagen

  if (lightbox) {

    lightbox.addEventListener("click", (event) => {

      if (event.target === lightbox) {
        closeLightbox();
      }

    });

  }


  // ==========================================
  // 5. CONTROLES DE TECLADO DEL VISOR
  // ==========================================

  document.addEventListener("keydown", (event) => {

    if (!lightbox || lightbox.hidden) return;


    // Cerrar con Escape

    if (event.key === "Escape") {

      event.preventDefault();
      closeLightbox();

    }


    // Mantener el foco dentro del visor

    if (event.key === "Tab" && closeButton) {

      const focusableElements = [
        closeButton
      ];

      const firstElement = focusableElements[0];

      if (event.shiftKey && document.activeElement === firstElement) {

        event.preventDefault();
        firstElement.focus();

      } else if (
        !event.shiftKey &&
        document.activeElement === firstElement
      ) {

        event.preventDefault();
        firstElement.focus();

      }

    }

  });


});
