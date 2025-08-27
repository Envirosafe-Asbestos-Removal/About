/*
 * REPLACEMENT: Mobile navigation script for Envirosafe Removal.
 *
 * Implements "Goodbye Asbestos" style behavior:
 * - Toggles a push-down menu.
 * - Locks body scroll when the menu is open.
 * - Handles mobile accordion submenus (one open at a time).
 * - Closes the menu on link clicks or when clicking outside.
 * - Resets state on resize to desktop view.
 */
document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('primary-navigation');
  const body = document.body;
  const dropdowns = document.querySelectorAll('#primary-navigation .dropdown');

  if (!menuToggle || !nav) {
    console.error('Essential navigation elements not found.');
    return; // Exit if elements are missing
  }

  /**
   * Closes all open dropdown submenus.
   * @param {HTMLElement} except - An optional dropdown element to exclude from closing.
   */
  function closeAllDropdowns(except = null) {
    dropdowns.forEach(dropdown => {
      if (dropdown !== except) {
        dropdown.classList.remove('open');
      }
    });
  }

  /**
   * Closes the main navigation menu and resets associated states.
   */
  function closeMenu() {
    if (nav.classList.contains('nav-open')) {
      nav.classList.remove('nav-open');
      body.classList.remove('menu-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      closeAllDropdowns();
    }
  }

  // --- Event Listeners ---

  // 1. Toggle the main menu on hamburger click.
  menuToggle.addEventListener('click', function () {
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeMenu();
    } else {
      nav.classList.add('nav-open');
      body.classList.add('menu-open');
      this.setAttribute('aria-expanded', 'true');
    }
  });

  // 2. Handle accordion behavior for dropdowns on mobile.
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    if (toggle) {
      toggle.addEventListener('click', function (e) {
        // This logic should only apply in the mobile view.
        if (window.innerWidth <= 900) {
          e.preventDefault(); // Prevent navigation on top-level link click
          const parentLi = this.parentElement;
          const wasOpen = parentLi.classList.contains('open');

          // Close all other dropdowns first.
          closeAllDropdowns();

          // If the clicked dropdown was not already open, open it.
          if (!wasOpen) {
            parentLi.classList.add('open');
          }
        }
      });
    }
  });

  // 3. Close the menu when any navigation link is clicked.
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) {
      closeMenu();
    }
  });

  // 4. Close the menu if a click occurs outside of it.
  document.addEventListener('click', function (e) {
    if (nav.classList.contains('nav-open')) {
      const isClickInsideNav = nav.contains(e.target);
      const isClickOnToggle = menuToggle.contains(e.target);

      if (!isClickInsideNav && !isClickOnToggle) {
        closeMenu();
      }
    }
  });

  // 5. Reset menu state when resizing the window to desktop view.
  window.addEventListener('resize', function () {
    if (window.innerWidth > 900) {
      closeMenu();
    }
  });
});