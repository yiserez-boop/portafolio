document.addEventListener("DOMContentLoaded", () => {

    // Menú para celulares
    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".nav-links");

    if (menuButton && navigation) {
        menuButton.addEventListener("click", () => {
            navigation.classList.toggle("active");
        });
    }

    // Acordeones para mostrar y ocultar información
    const accordionButtons = document.querySelectorAll(".accordion-button");

    accordionButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const content = button.nextElementSibling;

            if (content) {
                content.classList.toggle("active");
                button.classList.toggle("active");
            }
        });
    });

    // Ampliar imágenes al hacer clic
    const images = document.querySelectorAll("[data-lightbox]");
    const lightbox = document.querySelector(".lightbox");
    const lightboxImage = document.querySelector(".lightbox-image");
    const closeButton = document.querySelector(".lightbox-close");

    images.forEach((image) => {
        image.addEventListener("click", () => {
            if (lightbox && lightboxImage) {
                lightboxImage.src = image.src;
                lightbox.classList.add("active");
            }
        });
    });

    if (closeButton && lightbox) {
        closeButton.addEventListener("click", () => {
            lightbox.classList.remove("active");
        });
    }

    if (lightbox) {
        lightbox.addEventListener("click", (event) => {
            if (event.target === lightbox) {
                lightbox.classList.remove("active");
            }
        });
    }

});