import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';
import { loadProjects } from '../js/projects.js';

describe('Projects Module', () => {
  let dom;
  let document;
  let window;
  
  beforeEach(() => {
    // Setup DOM environment
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <head><title>Test</title></head>
        <body>
          <ul id="project-list"></ul>
        </body>
      </html>
    `, { url: 'http://localhost' });
    
    window = dom.window;
    document = window.document;
    
    // Attach mocks to global/window
    global.document = document;
    global.window = window;
    
    // Mock console.error
    console.error = vi.fn();
  });
  
  afterEach(() => {
    vi.restoreAllMocks();
  });
  
  it('should load projects and render them to the page', () => {
    loadProjects();
    
    const projectsList = document.getElementById('project-list');
    const projectItems = projectsList.querySelectorAll('li.project-item');
    
    // Check if at least one project is rendered
    expect(projectItems.length).toBeGreaterThan(0);
    
    // Check if the WindSurfRules project is rendered
    const windSurfProject = document.getElementById('windsurfrules');
    expect(windSurfProject).not.toBeNull();
    
    // Check project content
    expect(windSurfProject.querySelector('h3').textContent).toBe('WindSurfRules');
    expect(windSurfProject.querySelector('.project-technologies').innerHTML).toContain('JavaScript');
    expect(windSurfProject.querySelector('.project-links a').getAttribute('href')).toBe('https://github.com/Philip-Walsh/windSurfRules');
  });
  
  it('should handle missing project list element', () => {
    // Remove the project list element
    document.getElementById('project-list').remove();
    
    loadProjects();
    
    // Should log an error
    expect(console.error).toHaveBeenCalledWith('Project list element not found');
  });
  
  it('should create project elements with correct structure', () => {
    loadProjects();
    
    const projectItem = document.querySelector('.project-item');
    
    // Check structure
    expect(projectItem.querySelector('.project-card')).not.toBeNull();
    expect(projectItem.querySelector('h3')).not.toBeNull();
    expect(projectItem.querySelector('.project-technologies')).not.toBeNull();
    expect(projectItem.querySelector('.project-links')).not.toBeNull();
  });
  
  it('should display technology tags for each project', () => {
    loadProjects();
    
    const techTags = document.querySelectorAll('.tech-tag');
    
    // Check if technology tags are rendered
    expect(techTags.length).toBeGreaterThan(0);
  });
  
  it('should only show live demo link when URL is provided', () => {
    loadProjects();
    
    const projectLinks = document.querySelector('.project-links');
    const links = projectLinks.querySelectorAll('a');
    
    // WindSurfRules project doesn't have a live URL, so only GitHub link should be present
    expect(links.length).toBe(1);
    expect(links[0].textContent).toBe('GitHub');
  });
});
