/* ==========================================================================
   In-page lightbox — shows a full-size image over the current page.
   Opens from any [data-lightbox-target] trigger and closes via the backdrop,
   the close icon, or the Escape key. Never navigates away from the page.
   ========================================================================== */
(function () {
  "use strict";

  var lightbox = document.querySelector("[data-lightbox]");
  if (!lightbox) return;

  var lightboxImage = lightbox.querySelector("[data-lightbox-image]");
  var triggers = document.querySelectorAll("[data-lightbox-target]");
  var closeEls = lightbox.querySelectorAll("[data-lightbox-close]");
  var lastFocused = null;

  function openLightbox(src, alt) {
    lastFocused = document.activeElement;
    lightboxImage.src = src;
    lightboxImage.alt = alt || "";
    lightbox.classList.add("is-open");
    document.body.classList.add("lightbox-open");
    document.addEventListener("keydown", handleKeydown);

    var closeButton = lightbox.querySelector(".lightbox-close");
    if (closeButton) closeButton.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    document.body.classList.remove("lightbox-open");
    document.removeEventListener("keydown", handleKeydown);

    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }
  }

  function handleKeydown(event) {
    if (event.key === "Escape") {
      closeLightbox();
    }
  }

  triggers.forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      var triggerImage = trigger.querySelector("img");
      openLightbox(
        trigger.getAttribute("data-lightbox-target"),
        triggerImage ? triggerImage.alt : ""
      );
    });
  });

  closeEls.forEach(function (el) {
    el.addEventListener("click", closeLightbox);
  });
})();
