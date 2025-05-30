/**
 * Navigation module for Philip Walsh's portfolio
 * Handles smooth scrolling and active link highlighting
 */

/**
 * Initialize navigation functionality
 */
export function initializeNavigation() {
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  // Add click event listeners to navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", smoothScroll);
  });

  // Update active link on scroll
  window.addEventListener("scroll", updateActiveLink);

  // Initialize active link on page load
  updateActiveLink();
}

/**
 * Smooth scroll to section when navigation link is clicked
 * @param {Event} e - Click event
 */
function smoothScroll(e) {
  e.preventDefault();

  const targetId = this.getAttribute("href");
  const targetElement = document.querySelector(targetId);

  if (targetElement) {
    const offsetTop = targetElement.offsetTop;
    window.scrollTo({
      top: offsetTop - 50,
      behavior: "smooth",
    });
  }
}

/**
 * Update active navigation link based on scroll position
 */
function updateActiveLink() {
  const sections = document.querySelectorAll("article[id]");
  const scrollPosition = window.scrollY + 100;

  // First remove active class from all links
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  navLinks.forEach((link) => {
    link.classList.remove("active");
  });

  // Then add active class to the current section's link
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");
    const navLink = document.querySelector(`nav a[href="#${sectionId}"]`);

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      if (navLink) navLink.classList.add("active");
    }
  });
}
