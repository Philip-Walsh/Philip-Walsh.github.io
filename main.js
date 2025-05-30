// Import modules
import { initializeNavigation } from "./js/navigation.js";
import { setupThemeToggle } from "./js/theme.js";
import { initializeScrollEffects } from "./js/scroll-effects.js";
import { initializeMobileNav } from "./js/mobile-nav.js";

// Initialize the application when DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("Philip Walsh Portfolio initialized");

  // Initialize theme first to prevent flash of unstyled content
  setupThemeToggle();

  // Initialize navigation functionality
  initializeNavigation();

  // Initialize mobile navigation
  initializeMobileNav();

  // Initialize scroll effects for neon glow
  initializeScrollEffects();

  // Set current year in footer
  document.getElementById("current-year").textContent =
    new Date().getFullYear();

  // Load all data immediately
  loadAllData();
});

// Function to show skeleton loaders
function showSkeletonLoaders() {
  // Projects skeleton
  const projectsContainer = document.getElementById("projects-container");
  projectsContainer.innerHTML = Array(2)
    .fill(
      `
    <article class="project-card skeleton">
      <figure class="project-image"></figure>
      <section class="project-info">
        <h3 class="skeleton"></h3>
        <p class="skeleton"></p>
        <section class="project-technologies" role="list" aria-label="Technologies used">
          ${Array(3).fill('<span class="tech-tag skeleton" role="listitem"></span>').join("")}
        </section>
      </section>
    </article>
  `,
    )
    .join("");

  // Experience skeleton
  const experienceContent = document.querySelector(".experience-content");
  experienceContent.innerHTML = Array(2)
    .fill(
      `
    <article class="job skeleton">
      <header class="job-header">
        <h3 class="skeleton"></h3>
        <p class="skeleton"></p>
        <p class="skeleton"></p>
        <p class="skeleton"></p>
      </header>
      <section class="job-description">
        <ul>
          ${Array(2).fill('<li class="skeleton"></li>').join("")}
        </ul>
      </section>
    </article>
  `,
    )
    .join("");

  // Education skeleton
  const educationContent = document.querySelector(".education-content");
  educationContent.innerHTML = Array(2)
    .fill(
      `
    <article class="education-item skeleton">
      <h3 class="skeleton"></h3>
      <p class="skeleton"></p>
      <p class="skeleton"></p>
      <section class="education-description">
        ${Array(2).fill('<p class="skeleton"></p>').join("")}
      </section>
    </article>
  `,
    )
    .join("");

  // Skills skeleton
  const skillsList = document.querySelector(".skills-list");
  skillsList.innerHTML = Array(6)
    .fill('<li class="skill-item skeleton"></li>')
    .join("");

  // Recommendations skeleton
  const recommendationsContainer = document.getElementById(
    "recommendations-container",
  );
  recommendationsContainer.innerHTML = `
    <section class="recommendations-grid">
      ${Array(3)
        .fill(
          `
        <article class="recommendation-category skeleton">
          <h3 class="skeleton"></h3>
          <ul class="recommendation-list">
            ${Array(2).fill('<li class="skeleton"></li>').join("")}
          </ul>
        </article>
      `,
        )
        .join("")}
    </section>
  `;
}

// Function to load all data
async function loadAllData() {
  try {
    // Show skeleton loaders
    showSkeletonLoaders();

    // Load data in parallel
    const [projectsData, resumeData] = await Promise.all([
      fetch("./data/data.json").then((res) => res.json()),
      fetch("./data/resume.json").then((res) => res.json()),
    ]);

    // Load all sections immediately
    loadAbout(resumeData.about);
    loadSkills(resumeData.skills);
    loadProjects(projectsData.projects);
    loadExperience(resumeData.experience);
    loadEducation(resumeData.education);
    loadAccomplishments(resumeData.accomplishments);
    loadRecommendations(projectsData.recommendations);
  } catch (error) {
    console.error("Error loading data:", error);
    showErrorState();
  }
}

// Function to load about section
function loadAbout(about) {
  const aboutContent = document.querySelector(".about-content");
  if (aboutContent && about) {
    aboutContent.innerHTML = `
      <section class="personal-statement">
        <h3>Personal Statement</h3>
        <p>${about.personalStatement}</p>
      </section>
    `;
  }
}

// Function to load skills
function loadSkills(skills) {
  const skillsList = document.querySelector(".skills-list");
  if (skillsList && skills) {
    skillsList.innerHTML = skills
      .map(
        (skill) => `
      <li class="skill-item">
        <i class="${skill.icon}" aria-hidden="true"></i>
        <span>${skill.name}</span>
      </li>
    `,
      )
      .join("");
  }
}

// Function to load projects
function loadProjects(projects) {
  const projectsContainer = document.getElementById("projects-container");
  if (projectsContainer && projects) {
    projectsContainer.innerHTML = Object.entries(projects)
      .map(
        ([category, projects]) => `
      <section class="project-category">
        <h3>${category
          .replace(/([A-Z])/g, " $1")
          .trim()
          .replace(/^\w/, (c) => c.toUpperCase())}</h3>
        <section class="projects-grid">
          ${projects
            .map(
              (project) => `
            <article class="project-card">
              <figure class="project-image">
                <img src="${project.image}" alt="${project.title} Screenshot" loading="lazy" />
              </figure>
              <section class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <section class="project-technologies" role="list" aria-label="Technologies used">
                  ${project.technologies
                    .map(
                      (tech) => `
                    <span class="tech-tag" role="listitem">${tech}</span>
                  `,
                    )
                    .join("")}
                </section>
                <section class="project-links">
                  ${
                    project.links.demo
                      ? `
                    <a href="${project.links.demo}" target="_blank" rel="noopener noreferrer" class="project-link">
                      <i class="fas fa-external-link-alt" aria-hidden="true"></i>
                      <span>Live Demo</span>
                    </a>
                  `
                      : ""
                  }
                  <a href="${project.links.github}" target="_blank" rel="noopener noreferrer" class="project-link">
                    <i class="fab fa-github" aria-hidden="true"></i>
                    <span>GitHub</span>
                  </a>
                </section>
              </section>
            </article>
          `,
            )
            .join("")}
        </section>
      </section>
    `,
      )
      .join("");
  }
}

// Function to load experience
function loadExperience(experience) {
  const experienceContent = document.querySelector(".experience-content");
  if (experienceContent && experience) {
    experienceContent.innerHTML = experience
      .map(
        (job) => `
      <article class="job">
        <header class="job-header">
          <h3>${job.title}</h3>
          <p class="company">${job.company}</p>
          <p class="period">
            <i class="far fa-calendar-alt" aria-hidden="true"></i>
            <span>${job.period}</span>
          </p>
          <p class="location">
            <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
            <span>${job.location}</span>
          </p>
        </header>
        <section class="job-description">
          <ul>
            ${job.responsibilities.map((resp) => `<li>${resp}</li>`).join("")}
          </ul>
        </section>
      </article>
    `,
      )
      .join("");
  }
}

// Function to load education
function loadEducation(education) {
  const educationContent = document.querySelector(".education-content");
  if (educationContent && education) {
    educationContent.innerHTML = education
      .map(
        (edu) => `
      <article class="education-item">
        <h3>${edu.degree}</h3>
        <p class="institution">${edu.institution}</p>
        <p class="period">
          <i class="far fa-calendar-alt" aria-hidden="true"></i>
          <span>${edu.period}</span>
        </p>
        <section class="education-description">
          ${edu.details.map((detail) => `<p>${detail}</p>`).join("")}
        </section>
      </article>
    `,
      )
      .join("");
  }
}

// Function to load accomplishments
function loadAccomplishments(accomplishments) {
  const accomplishmentsGrid = document.querySelector(".accomplishments-grid");
  if (accomplishmentsGrid && accomplishments) {
    accomplishmentsGrid.innerHTML = `
      <article class="accomplishment-item">
        <h3>
          <i class="fas fa-certificate" aria-hidden="true"></i>
          <span>Certifications</span>
        </h3>
        <ul>
          ${accomplishments.certifications.map((cert) => `<li>${cert}</li>`).join("")}
        </ul>
      </article>
      <article class="accomplishment-item">
        <h3>
          <i class="fas fa-users" aria-hidden="true"></i>
          <span>Leadership & Volunteering</span>
        </h3>
        <ul>
          ${accomplishments.leadership.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </article>
    `;
  }
}

// Function to load recommendations
function loadRecommendations(recommendations) {
  const recommendationsContainer = document.getElementById(
    "recommendations-container",
  );
  if (recommendationsContainer && recommendations) {
    recommendationsContainer.innerHTML = `
      <section class="recommendations-grid">
        ${Object.entries(recommendations)
          .map(
            ([category, items]) => `
          <article class="recommendation-category">
            <h3>
              <i class="fas fa-${getCategoryIcon(category)}" aria-hidden="true"></i>
              <span>${category.replace(/([A-Z])/g, " $1").trim()}</span>
            </h3>
            <ul class="recommendation-list">
              ${items
                .map(
                  (item) => `
                <li>
                  <a href="${item.url}" target="_blank" rel="noopener noreferrer">
                    <strong>${item.title}</strong>
                    <p>${item.description}</p>
                  </a>
                </li>
              `,
                )
                .join("")}
            </ul>
          </article>
        `,
          )
          .join("")}
      </section>
    `;
  }
}

// Helper function to get category icons
function getCategoryIcon(category) {
  const icons = {
    podcasts: "podcast",
    books: "book",
    youtubeChannels: "youtube",
    learningResources: "graduation-cap",
  };
  return icons[category] || "link";
}

// Function to show error state
function showErrorState() {
  const errorMessage = `
    <section class="error-message">
      <i class="fas fa-exclamation-circle" aria-hidden="true"></i>
      <p>Unable to load content. Please refresh the page or try again later.</p>
    </section>
  `;

  document.getElementById("projects-container").innerHTML = errorMessage;
  document.querySelector(".experience-content").innerHTML = errorMessage;
  document.querySelector(".education-content").innerHTML = errorMessage;
  document.querySelector(".skills-list").innerHTML = errorMessage;
  document.getElementById("recommendations-container").innerHTML = errorMessage;
}
