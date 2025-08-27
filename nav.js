/*
 * Mobile navigation behaviour for Envirosafe Removal.
 *
 * This script controls the responsive navigation menu. It toggles the menu
 * open and closed, and also handles the sub-menu dropdowns.
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
   * Closes the main menu completely.
   */
  function closeMenu() {
    menuToggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('nav-open');
  }

  // Handle dropdown toggles on mobile
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  dropdownToggles.forEach(button => {
    button.addEventListener('click', function (e) {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        const dropdown = this.nextElementSibling;
        if (dropdown && dropdown.classList.contains('dropdown-menu')) {
          dropdown.classList.toggle('visible');
        }
      }
    });
  });

  // Close the main menu when any link inside it is clicked on mobile
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) {
      if (window.innerWidth <= 900) {
        closeMenu();
      }
    }
  });
});