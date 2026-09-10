document.addEventListener("DOMContentLoaded", () => {
  // Custom cursor
  const cursor = document.querySelector(".cursor");

  if (cursor && window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("mousemove", (event) => {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
    });

    document.querySelectorAll("a, button, video").forEach((element) => {
      element.addEventListener("mouseenter", () => cursor.classList.add("big"));
      element.addEventListener("mouseleave", () => cursor.classList.remove("big"));
    });
  }

  // Scroll reveal
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("visible"));
  }

  // Video autoplay handling
  document.querySelectorAll("video").forEach((video) => {
    if (video.hasAttribute("autoplay")) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  });

  // Active navigation
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav nav a");

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          navLinks.forEach((link) => link.classList.remove("active"));

          const active = document.querySelector(
            `.nav nav a[href="#${entry.target.id}"]`
          );

          if (active) active.classList.add("active");
        });
      },
      { threshold: 0.25, rootMargin: "-20% 0px -60% 0px" }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }

  // Smooth anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;

      const target = document.querySelector(id);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
});
