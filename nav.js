/*
 * CORRECTED: Mobile navigation script for Envirosafe Removal.
 *
 * This script provides a complete and working implementation for:
 * - Toggling the main push-down menu.
 * - Locking body scroll when the menu is active.
 * - Accordion submenus (only one can be open at a time).
 * - Closing the menu when a navigation link is clicked.
 * - Closing the menu when clicking outside of it.
 * - Resetting the menu state when resizing to a desktop view.
 */
document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('primary-navigation');
  const body = document.body;
  const dropdownToggles = nav.querySelectorAll('.dropdown > .dropdown-toggle');

  // Exit if essential elements aren't found.
  if (!menuToggle || !nav) {
    console.error('Navigation elements missing from the DOM.');
    return;
  }

  /**
   * Closes any currently open accordion submenus.
   * @param {HTMLElement} [except] - An optional element to ignore, preventing it from being closed.
   */
  const closeAllSubmenus = (except = null) => {
    nav.querySelectorAll('.dropdown.open').forEach(openDropdown => {
      if (openDropdown !== except) {
        openDropdown.classList.remove('open');
      }
    });
  };

  /**
   * Closes the main mobile navigation menu and resets all related states.
   */
  const closeMenu = () => {
    if (nav.classList.contains('nav-open')) {
      nav.classList.remove('nav-open');
      body.classList.remove('menu-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      closeAllSubmenus();
    }
  };

  /**
   * Opens the main mobile navigation menu.
   */
  const openMenu = () => {
    if (!nav.classList.contains('nav-open')) {
      nav.classList.add('nav-open');
      body.classList.add('menu-open');
      menuToggle.setAttribute('aria-expanded', 'true');
    }
  };

  // 1. Add click listener to the main menu toggle (hamburger)
  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // 2. Add click listeners for mobile accordion functionality
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      // This accordion logic should only run on mobile viewports
      if (window.innerWidth <= 900) {
        e.preventDefault(); // Prevent the link from navigating
        const parentLi = toggle.parentElement;
        const wasOpen = parentLi.classList.contains('open');

        // Always close other submenus
        closeAllSubmenus(parentLi);

        // Toggle the current submenu
        if (!wasOpen) {
          parentLi.classList.add('open');
        }
      }
    });
  });

  // 3. Add listener to the whole nav element to close on any link click
  nav.addEventListener('click', (e) => {
    // If the clicked element is a link, close the menu.
    if (e.target.tagName === 'A') {
      closeMenu();
    }
  });

  // 4. Add listener to the document to close the menu on an outside click
  document.addEventListener('click', (e) => {
    // Only run if the menu is open
    if (!nav.classList.contains('nav-open')) {
      return;
    }

    // Check if the click was inside the nav or on the toggle button itself
    const isClickInsideNav = nav.contains(e.target);
    const isClickOnToggle = menuToggle.contains(e.target);

    if (!isClickInsideNav && !isClickOnToggle) {
      closeMenu();
    }
  });

  // 5. Add a resize listener to reset the menu if the window is resized to desktop view
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      closeMenu();
    }
  });
});
