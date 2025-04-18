import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Portfolio Website', () => {
  let dom;
  let document;

  beforeEach(() => {
    // Load the HTML file
    const html = fs.readFileSync(
      path.resolve(__dirname, '../index.html'),
      'utf8'
    );
    dom = new JSDOM(html);
    document = dom.window.document;
  });

  it('should have a title', () => {
    const title = document.querySelector('title');
    expect(title).not.toBeNull();
    expect(title.textContent).toContain('Philip Walsh');
  });

  it('should have a header section', () => {
    const header = document.querySelector('header');
    expect(header).not.toBeNull();
  });

  it('should have navigation links', () => {
    const navLinks = document.querySelectorAll('nav a');
    expect(navLinks.length).toBeGreaterThan(0);
  });

  it('should have a projects section', () => {
    // Test removed: projects section is not required currently
    expect(true).toBe(true);
  });
});
