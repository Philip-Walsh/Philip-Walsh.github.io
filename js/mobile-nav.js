/**
 * Mobile navigation module for Philip Walsh's portfolio
 * Handles the mobile navigation toggle functionality
 */

/**
 * Initialize mobile navigation
 */
export function initializeMobileNav() {
  const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
  const nav = document.querySelector("nav");
  const navLinks = document.querySelectorAll("nav a");

  // Check if elements exist
  if (!mobileNavToggle || !nav) return;

  // Toggle navigation when hamburger is clicked
  mobileNavToggle.addEventListener("click", () => {
    const isExpanded = mobileNavToggle.getAttribute("aria-expanded") === "true";

    // Toggle navigation
    mobileNavToggle.setAttribute("aria-expanded", !isExpanded);
    mobileNavToggle.classList.toggle("active");
    nav.classList.toggle("active");

    // Prevent body scrolling when nav is open
    document.body.style.overflow = isExpanded ? "" : "hidden";
  });

  // Close navigation when a link is clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileNavToggle.setAttribute("aria-expanded", "false");
      mobileNavToggle.classList.remove("active");
      nav.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // Close navigation when clicking outside
  document.addEventListener("click", (event) => {
    if (
      nav.classList.contains("active") &&
      !nav.contains(event.target) &&
      !mobileNavToggle.contains(event.target)
    ) {
      mobileNavToggle.setAttribute("aria-expanded", "false");
      mobileNavToggle.classList.remove("active");
      nav.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Close navigation on escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("active")) {
      mobileNavToggle.setAttribute("aria-expanded", "false");
      mobileNavToggle.classList.remove("active");
      nav.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Update navigation state on resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && nav.classList.contains("active")) {
      mobileNavToggle.setAttribute("aria-expanded", "false");
      mobileNavToggle.classList.remove("active");
      nav.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}
