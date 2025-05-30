/**
 * Scroll effects module for Philip Walsh's portfolio
 * Handles neon glow intensity and section animations on scroll
 */

// Variables to track scroll position and glow intensity
let lastScrollPosition = 0;
let maxScrollPosition = 0;
let neonIntensity = 0;
let prefersReducedMotion = false;

/**
 * Initialize scroll effects
 */
export function initializeScrollEffects() {
  // Check for reduced motion preference
  prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  // Get references to DOM elements
  const neonGlow = document.querySelector(".neon-glow");
  const sections = document.querySelectorAll(".section");
  const neonTexts = document.querySelectorAll(".neon-text");

  // Add flux-text class to some headings for variety
  const headings = document.querySelectorAll("h3");
  headings.forEach((heading, index) => {
    // Add flux-text to every other h3
    if (index % 2 === 1) {
      heading.classList.add("flux-text");
      heading.classList.remove("neon-text");
    }
  });

  // Set data-text attributes for neon text elements if not already set
  neonTexts.forEach((text) => {
    if (!text.hasAttribute("data-text")) {
      text.setAttribute("data-text", text.textContent);
    }
  });

  // Calculate max scroll position (document height minus viewport height)
  maxScrollPosition = document.body.scrollHeight - window.innerHeight;

  // Update max scroll position on window resize
  window.addEventListener("resize", () => {
    maxScrollPosition = document.body.scrollHeight - window.innerHeight;
    prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  });

  // Add scroll event listener
  window.addEventListener("scroll", () => {
    // Get current scroll position
    const scrollPosition = window.scrollY;

    // Calculate scroll percentage (0 to 1)
    const scrollPercentage = Math.min(scrollPosition / maxScrollPosition, 1);

    // Update neon glow intensity based on scroll percentage
    if (!prefersReducedMotion) {
      updateNeonGlow(neonGlow, scrollPercentage);
    }

    // Check for visible sections (always do this regardless of motion preference)
    checkVisibleSections(sections);

    // Update last scroll position
    lastScrollPosition = scrollPosition;
  });

  // Trigger initial check
  checkVisibleSections(sections);

  // If reduced motion is preferred, make all sections visible immediately
  if (prefersReducedMotion) {
    sections.forEach((section) => {
      section.classList.add("visible");
    });

    // Also set a minimal glow
    if (neonGlow) {
      neonGlow.style.opacity = 0.2;
      neonGlow.style.height = "50%";
    }
  }
}

/**
 * Update neon glow intensity based on scroll percentage
 * @param {HTMLElement} neonGlow - The neon glow element
 * @param {number} scrollPercentage - Current scroll percentage (0 to 1)
 */
function updateNeonGlow(neonGlow, scrollPercentage) {
  // Calculate neon intensity (0 to 1)
  neonIntensity = Math.min(scrollPercentage * 1.5, 1);

  // Update neon glow element
  if (neonGlow) {
    // Set opacity based on intensity
    neonGlow.style.opacity = 0.2 + neonIntensity * 0.3;

    // Set height based on intensity (20% to 100%)
    neonGlow.style.height = `${20 + neonIntensity * 80}%`;
  }
}

/**
 * Check which sections are visible in the viewport
 * @param {NodeList} sections - List of section elements
 */
function checkVisibleSections(sections) {
  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;
    const sectionBottom = section.getBoundingClientRect().bottom;
    const windowHeight = window.innerHeight;

    // Check if section is visible
    if (sectionTop < windowHeight * 0.9 && sectionBottom > 0) {
      section.classList.add("visible");
    }
  });
}
