/* =============================================
   script.js — Portfolio Interactions
   ============================================= */

/* ----- Navbar Scroll Behaviour ----- */
(function initNavbar() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();

/* ----- Mobile Menu Toggle ----- */
(function initMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll("#mobile-menu a");
  if (!hamburger || !mobileMenu) return;

  const toggle = () => {
    const isOpen = hamburger.classList.toggle("open");
    mobileMenu.classList.toggle("open", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  };

  hamburger.addEventListener("click", toggle);
  mobileLinks.forEach((link) =>
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      mobileMenu.classList.remove("open");
      document.body.style.overflow = "";
    }),
  );
})();

/* ----- Active Nav Highlight (Scroll Spy) ----- */
(function initScrollSpy() {
  const navLinks = document.querySelectorAll(".nav-links a[data-section]");
  const sections = Array.from(document.querySelectorAll("section[id]"));
  if (!navLinks.length || !sections.length) return;

  const setActive = () => {
    const scrollMid = window.scrollY + window.innerHeight * 0.35;
    let current = sections[0].id;

    sections.forEach((section) => {
      if (section.offsetTop <= scrollMid) current = section.id;
    });

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.dataset.section === current);
    });
  };

  window.addEventListener("scroll", setActive, { passive: true });
  setActive();
})();

/* ----- Smooth Scroll for Nav Links ----- */
(function initSmoothScroll() {
  document.querySelectorAll('a[data-section], a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;
      const targetId = link.dataset.section || href.slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
})();

/* ----- Scroll Reveal (IntersectionObserver) ----- */
(function initReveal() {
  const revealEls = document.querySelectorAll(".reveal");
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -50px 0px" },
  );

  revealEls.forEach((el) => observer.observe(el));
})();

/* ----- Animated Counter ----- */
(function initCounters() {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;

  const formatValue = (val, suffix) => (suffix ? `${val}${suffix}` : `${val}`);

  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const duration = 1400;
    const startTime = performance.now();
    const start = 0;

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(start + (target - start) * eased);
      el.textContent = formatValue(value, suffix);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((el) => observer.observe(el));
})();

/* ----- Contact Form ----- */
(function initContactForm() {
  const form = document.querySelector("form");
  if (!form) return;

  const btn = form.querySelector(".form-submit");

  form.addEventListener("submit", () => {
    if (!btn) return;

    btn.textContent = "Sending...";
    btn.disabled = true;

    // Netlify will handle submission automatically
    // No preventDefault here!
  });
})();

/* ----- Parallax Hero Glows on Mouse Move ----- */
(function initParallax() {
  const hero = document.getElementById("home");
  if (!hero) return;
  const glow1 = hero.querySelector(".hero-glow-1");
  const glow2 = hero.querySelector(".hero-glow-2");
  if (!glow1 && !glow2) return;

  let rafId;
  hero.addEventListener("mousemove", (e) => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      const { left, top, width, height } = hero.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      if (glow1) glow1.style.transform = `translate(${x * 40}px, ${y * 30}px)`;
      if (glow2)
        glow2.style.transform = `translate(${-x * 30}px, ${-y * 20}px)`;
    });
  });
})();

/* ----- Project Card Tilt on Hover ----- */
(function initTilt() {
  const cards = document.querySelectorAll(".project-img-wrap");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = ((e.clientX - left) / width - 0.5) * 6;
      const y = ((e.clientY - top) / height - 0.5) * -6;
      card.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
})();

/* ----- Current Year in Footer ----- */
(function initYear() {
  const el = document.getElementById("current-year");
  if (el) el.textContent = new Date().getFullYear();
})();
