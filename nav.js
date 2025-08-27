/*
 * Mobile navigation behaviour for Envirosafe Removal.
 *
 * This script controls the responsive navigation menu. It toggles the main
 * menu and also handles sub-menu dropdowns.
 */
document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('primary-navigation');

  if (!menuToggle || !nav) {
    console.error('Essential navigation elements not found.');
    return;
  }

  /**
   * Toggles the main navigation menu open or closed.
   */
  function toggleMenu() {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isExpanded));
    nav.classList.toggle('nav-open');
  }

  menuToggle.addEventListener('click', toggleMenu);

  /**
   * Handles dropdown menu toggles.
   */
  const dropdownToggles = document.querySelectorAll('.nav-toggle-button');
  dropdownToggles.forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      const dropdown = document.getElementById(this.getAttribute('aria-controls'));
      if (dropdown) {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', String(!isExpanded));
        dropdown.classList.toggle('visible');
      }
    });
  });
});