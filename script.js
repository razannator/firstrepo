/**
 * Developer Profile - Interactive Scripts
 * Features: Dark/Light Mode toggle with persistence, meta theme-color sync, dynamic year, and accessible interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initDynamicYear();
  initInteractiveFeedback();
});

/**
 * Handles Dark / Light mode switching with localStorage persistence,
 * system preference detection, and dynamic theme-color meta synchronization.
 */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  // Check saved theme in localStorage or system preferences
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  applyTheme(currentTheme);

  // Toggle button event listener
  toggleBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
    
    applyTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
  });

  // Listen to OS system color-scheme changes if no explicit user override
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}

/**
 * Applies the selected theme to the root HTML element, updates ARIA attributes,
 * and synchronizes mobile browser theme-color.
 * @param {string} theme - 'dark' or 'light'
 */
function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  
  const toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) {
    const actionLabel = `Switch to ${isDark ? 'Light' : 'Dark'} Mode`;
    toggleBtn.setAttribute('aria-label', actionLabel);
    toggleBtn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    toggleBtn.title = actionLabel;
  }

  // Synchronize mobile address bar color
  const metaThemeColor = document.getElementById('meta-theme-color');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', isDark ? '#121316' : '#ffffff');
  }
}

/**
 * Sets the current year dynamically in the footer.
 */
function initDynamicYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/**
 * Adds micro-interactions to social icons.
 */
function initInteractiveFeedback() {
  const socialIcons = document.querySelectorAll('.social-icon');
  
  socialIcons.forEach((icon) => {
    icon.addEventListener('mouseenter', () => {
      icon.style.transition = 'transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275), background-color 0.25s ease';
    });
  });
}
