/**
 * ============================================
 * ÀṢỌ ÌBÍLẸ̀ — Script interactif
 * Musée numérique de la mode Yoruba précoloniale
 * JavaScript pur — aucun framework ni bibliothèque
 * ============================================
 */

(function () {
  "use strict";

  /* ========== ANNÉE DU FOOTER ========== */
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* ========== INTRO OVERLAY ========== */
  var introOverlay = document.getElementById("intro-overlay");
  var autoHideTimer = null;

  function hideIntro() {
    if (!introOverlay || introOverlay.classList.contains("hidden")) return;
    introOverlay.classList.add("hidden");
    setTimeout(function () {
      introOverlay.style.display = "none";
    }, 1200);
  }

  if (introOverlay) {
    autoHideTimer = setTimeout(hideIntro, 3500);
    introOverlay.addEventListener("click", function () {
      if (autoHideTimer) clearTimeout(autoHideTimer);
      hideIntro();
    });
    window.addEventListener("scroll", function () {
      if (window.scrollY > 30) {
        if (autoHideTimer) clearTimeout(autoHideTimer);
        hideIntro();
      }
    }, { passive: true });
    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        if (autoHideTimer) clearTimeout(autoHideTimer);
        hideIntro();
      }
    });
  }

  /* ========== NAVIGATION SMOOTH SCROLL ========== */
  function scrollTo(id) {
    var el = document.getElementById(id);
    if (el) {
      hideIntro();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  const navButtons = document.querySelectorAll("[data-target]");
  for (var i = 0; i < navButtons.length; i++) {
    navButtons[i].addEventListener("click", function (e) {
      e.preventDefault();
      var target = this.getAttribute("data-target");
      if (target) scrollTo(target);
      if (mobileMenu) {
        mobileMenu.classList.remove("open");
        updateMenuIcon(false);
      }
    });
  }

  var footerLinks = document.querySelectorAll('footer a[href^="#"]');
  for (var j = 0; j < footerLinks.length; j++) {
    footerLinks[j].addEventListener("click", function (e) {
      e.preventDefault();
      var id = this.getAttribute("href").substring(1);
      if (id) scrollTo(id);
    });
  }

  var logoLinks = document.querySelectorAll('a.logo[href="#accueil"]');
  for (var k = 0; k < logoLinks.length; k++) {
    logoLinks[k].addEventListener("click", function (e) {
      e.preventDefault();
      scrollTo("accueil");
    });
  }

  /* ========== MENU MOBILE ========== */
  var menuToggle = document.getElementById("menu-toggle");
  var mobileMenu = document.getElementById("mobile-menu");
  var menuIcon = document.getElementById("menu-icon");

  function updateMenuIcon(open) {
    if (!menuIcon) return;
    if (open) {
      menuIcon.innerHTML = '<path d="M6 6L18 18M6 18L18 6" stroke-linecap="round"/>';
    } else {
      menuIcon.innerHTML = '<path d="M3 6h18M3 12h18M3 18h18" stroke-linecap="round"/>';
    }
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", function () {
      var isOpen = mobileMenu.classList.toggle("open");
      updateMenuIcon(isOpen);
    });
  }

  /* ========== NAVBAR ACTIVE SECTION ========== */
  var navbar = document.getElementById("navbar");
  var desktopBtns = document.querySelectorAll(".nav-links button");
  var mobileBtns = document.querySelectorAll(".mobile-menu button");
  var sections = ["accueil", "heritage", "tissus", "collections", "philosophie"];

  function updateActiveSection() {
    var scrollPos = window.scrollY + window.innerHeight / 3;
    var activeId = "accueil";

    for (var s = sections.length - 1; s >= 0; s--) {
      var sec = document.getElementById(sections[s]);
      if (sec && sec.offsetTop <= scrollPos) {
        activeId = sections[s];
        break;
      }
    }

    for (var d = 0; d < desktopBtns.length; d++) {
      if (desktopBtns[d].getAttribute("data-target") === activeId) {
        desktopBtns[d].classList.add("active");
      } else {
        desktopBtns[d].classList.remove("active");
      }
    }

    for (var m = 0; m < mobileBtns.length; m++) {
      if (mobileBtns[m].getAttribute("data-target") === activeId) {
        mobileBtns[m].classList.add("active");
      } else {
        mobileBtns[m].classList.remove("active");
      }
    }
  }

  function updateNavbarScroll() {
    if (!navbar) return;
    if (window.scrollY > 60) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  var ticking = false;
  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        updateNavbarScroll();
        updateActiveSection();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  updateNavbarScroll();
  updateActiveSection();

  /* ========== REVEAL ON SCROLL ========== */
  var revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    for (var r = 0; r < revealElements.length; r++) {
      observer.observe(revealElements[r]);
    }
  } else {
    for (var f = 0; f < revealElements.length; f++) {
      revealElements[f].classList.add("visible");
    }
  }
})();
