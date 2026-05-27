// script.js — Portfolio frontend logic
// Fetches data from the Express API and renders it into the DOM

// ─── Navbar scroll effect ───────────────────────────────────────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ─── Mobile nav toggle ──────────────────────────────────────────────────────
const menuToggle = document.getElementById('menuToggle');
const mobileNav  = document.getElementById('mobileNav');

menuToggle.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
});

function closeMobileNav() {
  mobileNav.classList.remove('open');
}

// ─── Footer year ───────────────────────────────────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();


// ═══════════════════════════════════════════════════════════════════════════════
// FETCH & RENDER SKILLS
// ═══════════════════════════════════════════════════════════════════════════════

async function loadSkills() {
  const container = document.getElementById('skills-container');

  try {
    const res  = await fetch('/api/skills');

    if (!res.ok) throw new Error('Server error');

    const skills = await res.json();

    if (skills.length === 0) {
      container.innerHTML = '<p class="skills-loading">No skills found.</p>';
      return;
    }

    // Group skills by category
    const grouped = skills.reduce((acc, skill) => {
      const cat = skill.category || 'Other';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(skill);
      return acc;
    }, {});

    // Build HTML for each category
    const html = Object.entries(grouped).map(([category, items]) => `
      <div class="skill-category">
        <p class="skill-category-title">${escapeHTML(category)}</p>
        <ul class="skill-list">
          ${items.map(s => `
            <li class="skill-item">
              <span class="skill-name">${escapeHTML(s.name)}</span>
              <span class="skill-level ${(s.level || '').toLowerCase()}">
                ${escapeHTML(s.level || '')}
              </span>
            </li>
          `).join('')}
        </ul>
      </div>
    `).join('');

    container.innerHTML = html;

  } catch (err) {
    console.error('Failed to load skills:', err);
    container.innerHTML = '<p class="skills-loading" style="color:#ef4444">Failed to load skills.</p>';
  }
}


// ═══════════════════════════════════════════════════════════════════════════════
// FETCH & RENDER PROJECTS
// ═══════════════════════════════════════════════════════════════════════════════

async function loadProjects() {
  const container = document.getElementById('projects-container');

  try {
    const res      = await fetch('/api/projects');

    if (!res.ok) throw new Error('Server error');

    const projects = await res.json();

    if (projects.length === 0) {
      container.innerHTML = '<p class="projects-loading">No projects found.</p>';
      return;
    }

    const html = projects.map((project, index) => {
      // Split the tech_stack string into individual tags
      const techTags = (project.tech_stack || '')
        .split(',')
        .map(t => t.trim())
        .filter(Boolean)
        .map(t => `<span class="tech-tag">${escapeHTML(t)}</span>`)
        .join('');

      // Build GitHub link if present
      const githubLink = project.github_url
        ? `<a href="${escapeHTML(project.github_url)}" target="_blank" rel="noopener" class="project-link">
             <span class="project-link-icon">⌘</span> GitHub
           </a>`
        : '';

      // Build Live link if present
      const liveLink = project.live_url
        ? `<a href="${escapeHTML(project.live_url)}" target="_blank" rel="noopener" class="project-link">
             <span class="project-link-icon">↗</span> Live Demo
           </a>`
        : '';

      return `
        <article class="project-card">
          <p class="project-number">0${index + 1}</p>
          <h3 class="project-title">${escapeHTML(project.title)}</h3>
          <p class="project-desc">${escapeHTML(project.description || '')}</p>
          <div class="project-stack">${techTags}</div>
          ${(githubLink || liveLink) ? `
            <div class="project-links">
              ${githubLink}
              ${liveLink}
            </div>
          ` : ''}
        </article>
      `;
    }).join('');

    container.innerHTML = html;

  } catch (err) {
    console.error('Failed to load projects:', err);
    container.innerHTML = '<p class="projects-loading" style="color:#ef4444">Failed to load projects.</p>';
  }
}


// ═══════════════════════════════════════════════════════════════════════════════
// CONTACT FORM SUBMISSION
// ═══════════════════════════════════════════════════════════════════════════════

const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');
const feedback    = document.getElementById('formFeedback');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  // Basic client-side validation
  if (!name || !email || !message) {
    showFeedback('Please fill in all fields.', 'error');
    return;
  }

  if (!isValidEmail(email)) {
    showFeedback('Please enter a valid email address.', 'error');
    return;
  }

  // Disable button while submitting
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  try {
    const res = await fetch('/api/contact', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ name, email, message }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      showFeedback(data.message || 'Message sent! I\'ll be in touch soon.', 'success');
      contactForm.reset();
    } else {
      showFeedback(data.error || 'Something went wrong. Please try again.', 'error');
    }

  } catch (err) {
    console.error('Contact form error:', err);
    showFeedback('Network error. Please check your connection and try again.', 'error');
  } finally {
    // Re-enable button
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Send Message <span class="btn-arrow">→</span>';
  }
});


// ─── Helpers ────────────────────────────────────────────────────────────────

/**
 * Show form feedback message.
 * @param {string} msg  - Message text
 * @param {'success'|'error'} type
 */
function showFeedback(msg, type) {
  feedback.textContent    = msg;
  feedback.className      = `form-feedback ${type}`;
  // Auto-clear success messages after 5 seconds
  if (type === 'success') {
    setTimeout(() => { feedback.className = 'form-feedback'; }, 5000);
  }
}

/**
 * Basic email format validation.
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Escape HTML special characters to prevent XSS.
 * @param {string} str
 * @returns {string}
 */
function escapeHTML(str) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return String(str).replace(/[&<>"']/g, m => map[m]);
}


// ─── Init ────────────────────────────────────────────────────────────────────
// Load both data sets when the page is ready
loadSkills();
loadProjects();
