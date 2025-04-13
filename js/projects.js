/**
 * Projects module for Philip Walsh's portfolio
 * Handles loading and displaying project data
 */

// Sample project data - in a real application, this could be loaded from an API or JSON file
const projectsData = [
  {
    id: 'windsurfrules',
    title: 'WindSurfRules',
    description: 'An application for windsurfing enthusiasts to track rules and regulations.',
    technologies: ['JavaScript', 'HTML', 'CSS'],
    githubUrl: 'https://github.com/Philip-Walsh/windSurfRules',
    liveUrl: ''
  },
  // Additional projects can be added here
];

/**
 * Load projects data and render to the page
 */
export function loadProjects() {
  const projectsList = document.getElementById('project-list');
  
  if (!projectsList) {
    console.error('Project list element not found');
    return;
  }
  
  // Clear existing projects
  projectsList.innerHTML = '';
  
  // Render each project
  projectsData.forEach(project => {
    const projectElement = createProjectElement(project);
    projectsList.appendChild(projectElement);
  });
}

/**
 * Create a DOM element for a project
 * @param {Object} project - Project data object
 * @returns {HTMLElement} - Project list item element
 */
function createProjectElement(project) {
  const projectItem = document.createElement('li');
  projectItem.classList.add('project-item');
  projectItem.id = project.id;
  
  const projectContent = `
    <div class="project-card">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="project-technologies">
        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
      </div>
      <div class="project-links">
        <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer">GitHub</a>
        ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer">Live Demo</a>` : ''}
      </div>
    </div>
  `;
  
  projectItem.innerHTML = projectContent;
  return projectItem;
}
