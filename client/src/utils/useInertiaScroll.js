import { useEffect } from "react";

export default function useInertiaScroll(containerId = "scrollable-content") {
  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const SCROLL_SPEED = 2.2;
    const FRICTION = 0.92;
    let velocity = 0;
    let rafId = null;

    const sections = Array.from(document.querySelectorAll(".content-container > div[id]"));
    const navLinks = document.querySelectorAll(".nav-link");

    const animate = () => {
      if (Math.abs(velocity) > 0.1) {
        container.scrollTop += velocity;
        velocity *= FRICTION;
        rafId = requestAnimationFrame(animate);
      } else {
        velocity = 0;
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      updateActiveLink();
    };

    const handleWheel = (e) => {
      e.preventDefault();
      velocity += e.deltaY * SCROLL_SPEED;
      if (!rafId) animate();
    };

    // Touch handling
    let touchStartY = 0;
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
      velocity = 0;
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      velocity += deltaY * SCROLL_SPEED;
      touchStartY = touchY;
      if (!rafId) animate();
    };

    // Highlight nav link for visible section
    const updateActiveLink = () => {
      const containerTop = container.scrollTop;
      const containerHeight = container.clientHeight;

      let currentSection = sections[0]?.id;
      for (const section of sections) {
        const offsetTop = section.offsetTop;
        if (containerTop >= offsetTop - containerHeight / 3) {
          currentSection = section.id;
        }
      }

      navLinks.forEach((link) => {
        const targetId = link.getAttribute("href").substring(1);
        if (targetId === currentSection) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    };

    // Nav link handling
    const handleNavClick = (e) => {
      e.preventDefault();
      const targetId = e.currentTarget.getAttribute("href").substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl && container) {
        const targetOffset =
          targetEl.getBoundingClientRect().top -
          container.getBoundingClientRect().top +
          container.scrollTop;

        container.scrollTo({
          top: targetOffset,
          behavior: "smooth",
        });

        velocity = 0;
        cancelAnimationFrame(rafId);
        rafId = null;

        updateActiveLink();
      }
    };

    navLinks.forEach((link) =>
      link.addEventListener("click", handleNavClick)
    );

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    container.addEventListener("scroll", updateActiveLink);

    updateActiveLink(); // initial highlight

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("scroll", updateActiveLink);
      navLinks.forEach((link) =>
        link.removeEventListener("click", handleNavClick)
      );
      cancelAnimationFrame(rafId);
    };
  }, [containerId]);
}
