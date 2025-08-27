/*
 * Mobile navigation behaviour for Envirosafe Removal.
 *
 * This script controls the responsive navigation menu. It toggles the menu
 * open and closed, pushing content down. It also closes the menu
 * when any navigation link is selected.
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
    // The menu-open class on the body is no longer needed for this effect
  }
  
  menuToggle.addEventListener('click', toggleMenu);

  /**
   * Closes the menu completely.
   */
  function closeMenu() {
    menuToggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('nav-open');
  }

  // Close the menu when any link inside it is clicked.
  // This is now simplified: ANY link click will close the menu on mobile.
  nav.addEventListener('click', function (e) {
    // Check if the click was on an anchor tag
    if (e.target.closest('a')) {
      if (window.innerWidth <= 900) {
        closeMenu();
      }
    }
  });
});