/* ==========================================================================
   ReHarvest — scroll reveal controller
   Toggles `.is-visible` on `.reveal` elements as they enter the viewport and
   keeps the side progress-nav dot in sync with the active slide section.
   The actual fade-in animation (opacity/transform transition) lives in
   css/style.css; this script only flips the class.
   ========================================================================== */
(function () {
  "use strict";

  var revealTargets = document.querySelectorAll(".reveal");
  var navLinks = document.querySelectorAll(".progress-nav a");

  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    revealTargets.forEach(function (target) {
      revealObserver.observe(target);
    });

    if (navLinks.length) {
      var navObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            var link = document.querySelector(
              '.progress-nav a[href="#' + entry.target.id + '"]'
            );
            if (link && entry.isIntersecting) {
              navLinks.forEach(function (l) {
                l.classList.remove("is-active");
              });
              link.classList.add("is-active");
            }
          });
        },
        { threshold: 0.5 }
      );

      document.querySelectorAll(".slide-section[id]").forEach(function (section) {
        navObserver.observe(section);
      });
    }
  } else {
    // Fallback: no IntersectionObserver support, just reveal everything.
    revealTargets.forEach(function (target) {
      target.classList.add("is-visible");
    });
  }
})();
