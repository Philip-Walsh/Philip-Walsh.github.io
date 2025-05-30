/**
 * Theme module for Philip Walsh's portfolio
 * Handles theme toggling functionality (light/dark mode)
 */

export const THEME_KEY = "philip-walsh-portfolio-theme";
export const DARK_THEME = "dark";
export const LIGHT_THEME = "light";

/**
 * Setup theme toggle functionality
 */
export function setupThemeToggle() {
  // Initialize theme based on user preference or system preference
  initializeTheme();

  // Add event listener to theme toggle button
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }
}

/**
 * Initialize theme based on saved preference or system preference
 */
function initializeTheme() {
  // Check for saved theme preference
  let savedTheme = null;

  try {
    savedTheme = localStorage.getItem(THEME_KEY);
  } catch (e) {
    console.warn("Unable to access localStorage:", e);
  }

  if (savedTheme) {
    // Apply saved theme
    document.documentElement.setAttribute("data-theme", savedTheme);
  } else {
    // Check system preference
    let prefersDarkMode = false;

    try {
      prefersDarkMode =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch (e) {
      console.warn("Unable to check system preference:", e);
    }

    const initialTheme = prefersDarkMode ? DARK_THEME : LIGHT_THEME;

    // Apply initial theme
    document.documentElement.setAttribute("data-theme", initialTheme);

    try {
      localStorage.setItem(THEME_KEY, initialTheme);
    } catch (e) {
      console.warn("Unable to save theme to localStorage:", e);
    }
  }
}

/**
 * Toggle between light and dark themes
 */
function toggleTheme() {
  const currentTheme =
    document.documentElement.getAttribute("data-theme") || LIGHT_THEME;
  const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;

  // Apply new theme
  document.documentElement.setAttribute("data-theme", newTheme);

  // Save theme preference
  try {
    localStorage.setItem(THEME_KEY, newTheme);
  } catch (e) {
    console.warn("Unable to save theme to localStorage:", e);
  }
}
