import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';
import { setupThemeToggle, THEME_KEY, DARK_THEME, LIGHT_THEME } from '../js/theme.js';

describe('Theme Module', () => {
  let dom;
  let document;
  let window;
  let localStorageMock;
  
  beforeEach(() => {
    // Setup DOM environment with theme toggle button
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <head><title>Test</title></head>
        <body>
          <header>
            <button id="theme-toggle" class="theme-toggle" aria-label="Toggle dark/light mode">
              <span class="sun-icon">☀️</span>
              <span class="moon-icon">🌙</span>
            </button>
          </header>
        </body>
      </html>
    `, { url: 'http://localhost' });
    
    window = dom.window;
    document = window.document;
    
    // Mock localStorage
    localStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      store: {},
      clear() {
        this.store = {};
      }
    };
    
    // Ensure getItem returns null by default
    localStorageMock.getItem.mockReturnValue(null);
    
    // Attach mocks to global/window
    global.document = document;
    global.window = window;

    // Define localStorage as a property on both window and global
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      configurable: true
    });
    Object.defineProperty(global, 'localStorage', {
      value: localStorageMock,
      configurable: true
    });

    // Mock matchMedia - default to light mode
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn()
    }));
    global.matchMedia = window.matchMedia;
    
    // Mock console.warn to avoid test output pollution
    console.warn = vi.fn();
  });
  
  afterEach(() => {
    vi.restoreAllMocks();
  });
  
  it('should create theme toggle button', () => {
    setupThemeToggle();
    
    const themeToggle = document.getElementById('theme-toggle');
    expect(themeToggle).not.toBeNull();
    expect(themeToggle.classList.contains('theme-toggle')).toBe(true);
  });
  
  it('should check localStorage for saved theme', () => {
    setupThemeToggle();
    
    expect(localStorageMock.getItem).toHaveBeenCalledWith(THEME_KEY);
  });
  
  it('should set light theme when no saved theme and system prefers light', () => {
    // Mock matchMedia to prefer light mode
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: false, // false = light mode
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn()
    }));
    
    setupThemeToggle();
    
    expect(document.documentElement.getAttribute('data-theme')).toBe(LIGHT_THEME);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(THEME_KEY, LIGHT_THEME);
  });
  
  it('should set dark theme when no saved theme and system prefers dark', () => {
    // Mock matchMedia to prefer dark mode
    window.matchMedia = vi.fn().mockImplementation(query => {
      if (query === '(prefers-color-scheme: dark)') {
        return {
          matches: true,
          media: query,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn()
        };
      }
      return {
        matches: false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn()
      };
    });
    global.matchMedia = window.matchMedia;

    setupThemeToggle();
    
    expect(document.documentElement.getAttribute('data-theme')).toBe(DARK_THEME);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(THEME_KEY, DARK_THEME);
  });
  
  it('should use saved theme from localStorage if available', () => {
    // Mock localStorage to return a saved theme
    localStorageMock.getItem.mockReturnValue(DARK_THEME);

    setupThemeToggle();
    
    expect(document.documentElement.getAttribute('data-theme')).toBe(DARK_THEME);
  });
  
  it('should toggle theme when button is clicked', () => {
    // Start with light theme
    document.documentElement.setAttribute('data-theme', LIGHT_THEME);
    
    setupThemeToggle();
    
    const themeToggle = document.getElementById('theme-toggle');
    
    // Create a click event and dispatch it
    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });
    
    // Dispatch the click event
    themeToggle.dispatchEvent(clickEvent);
    
    // Check if theme was toggled to dark
    expect(document.documentElement.getAttribute('data-theme')).toBe(DARK_THEME);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(THEME_KEY, DARK_THEME);
    
    // Reset the mock to check second call
    localStorageMock.setItem.mockClear();
    
    // Click again to toggle back to light
    themeToggle.dispatchEvent(clickEvent);
    
    // Check if theme was toggled back to light
    expect(document.documentElement.getAttribute('data-theme')).toBe(LIGHT_THEME);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(THEME_KEY, LIGHT_THEME);
  });
});
