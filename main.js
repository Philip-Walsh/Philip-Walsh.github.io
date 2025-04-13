// Import modules
import { initializeNavigation } from './js/navigation.js';
import { loadProjects } from './js/projects.js';
import { setupThemeToggle } from './js/theme.js';
import { initializeScrollEffects } from './js/scroll-effects.js';
import { initializeMobileNav } from './js/mobile-nav.js';

// Initialize the application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Philip Walsh Portfolio initialized');
  
  // Initialize theme first to prevent flash of unstyled content
  setupThemeToggle();
  
  // Initialize navigation functionality
  initializeNavigation();
  
  // Initialize mobile navigation
  initializeMobileNav();
  
  // Initialize scroll effects for neon glow
  initializeScrollEffects();
  
  // Load projects data
  loadProjects();
  
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
});