import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import { initializeMobileNav } from '../js/mobile-nav.js';

describe('Mobile Navigation', () => {
  let dom;
  let window;
  let document;
  let mobileNavToggle;
  let nav;
  
  beforeEach(() => {
    // Set up a fake DOM environment
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <head></head>
        <body>
          <button class="mobile-nav-toggle" aria-expanded="false">
            <i class="fas fa-bars"></i>
            <i class="fas fa-times"></i>
          </button>
          <nav>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#skills">Skills</a></li>
            </ul>
          </nav>
        </body>
      </html>
    `, { url: 'http://localhost' });
    
    window = dom.window;
    document = window.document;
    
    // Mock global objects
    global.document = document;
    global.window = window;
    
    // Get elements
    mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    nav = document.querySelector('nav');
    
    // Initialize mobile navigation
    initializeMobileNav();
  });
  
  afterEach(() => {
    // Clean up
    vi.restoreAllMocks();
  });
  
  it('should toggle navigation when hamburger is clicked', () => {
    // Initial state
    expect(mobileNavToggle.getAttribute('aria-expanded')).toBe('false');
    expect(nav.classList.contains('active')).toBe(false);
    
    // Click the toggle
    mobileNavToggle.click();
    
    // Navigation should be open
    expect(mobileNavToggle.getAttribute('aria-expanded')).toBe('true');
    expect(mobileNavToggle.classList.contains('active')).toBe(true);
    expect(nav.classList.contains('active')).toBe(true);
    expect(document.body.style.overflow).toBe('hidden');
    
    // Click again to close
    mobileNavToggle.click();
    
    // Navigation should be closed
    expect(mobileNavToggle.getAttribute('aria-expanded')).toBe('false');
    expect(mobileNavToggle.classList.contains('active')).toBe(false);
    expect(nav.classList.contains('active')).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });
  
  it('should close navigation when a link is clicked', () => {
    // Open navigation first
    mobileNavToggle.click();
    expect(nav.classList.contains('active')).toBe(true);
    
    // Click a navigation link
    const link = document.querySelector('nav a');
    link.click();
    
    // Navigation should be closed
    expect(mobileNavToggle.getAttribute('aria-expanded')).toBe('false');
    expect(mobileNavToggle.classList.contains('active')).toBe(false);
    expect(nav.classList.contains('active')).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });
  
  it('should close navigation when escape key is pressed', () => {
    // Open navigation first
    mobileNavToggle.click();
    expect(nav.classList.contains('active')).toBe(true);
    
    // Simulate escape key press
    const escapeEvent = new window.KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(escapeEvent);
    
    // Navigation should be closed
    expect(mobileNavToggle.getAttribute('aria-expanded')).toBe('false');
    expect(mobileNavToggle.classList.contains('active')).toBe(false);
    expect(nav.classList.contains('active')).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });
  
  it('should close navigation when clicking outside', () => {
    // Open navigation first
    mobileNavToggle.click();
    expect(nav.classList.contains('active')).toBe(true);
    
    // Simulate click outside navigation
    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true
    });
    document.body.dispatchEvent(clickEvent);
    
    // Navigation should be closed
    expect(mobileNavToggle.getAttribute('aria-expanded')).toBe('false');
    expect(mobileNavToggle.classList.contains('active')).toBe(false);
    expect(nav.classList.contains('active')).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });
  
  it('should handle window resize', () => {
    // Open navigation first
    mobileNavToggle.click();
    expect(nav.classList.contains('active')).toBe(true);
    
    // Mock window resize to desktop size
    window.innerWidth = 1024;
    const resizeEvent = new window.Event('resize');
    window.dispatchEvent(resizeEvent);
    
    // Navigation should be closed
    expect(mobileNavToggle.getAttribute('aria-expanded')).toBe('false');
    expect(mobileNavToggle.classList.contains('active')).toBe(false);
    expect(nav.classList.contains('active')).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });
});
