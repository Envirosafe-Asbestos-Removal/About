/*
 * FINAL CORRECTED: Mobile navigation script for Envirosafe Removal.
 *
 * This version specifically fixes the issue where dropdowns would not open on mobile.
 * The conflict between the accordion-toggle and the menu-close scripts has been resolved.
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
   */
  const closeAllSubmenus = () => {
    nav.querySelectorAll('.dropdown.open').forEach(openDropdown => {
      openDropdown.classList.remove('open');
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
        
        // First, close all dropdowns to ensure only one is ever open
        closeAllSubmenus();

        // If the clicked one wasn't already open, open it now.
        // This also handles closing a dropdown if it's clicked again.
        if (!wasOpen) {
          parentLi.classList.add('open');
        }
      }
    });
  });

  // 3. Add listener to the whole nav element to close on SUB-MENU link clicks
  nav.addEventListener('click', (e) => {
    // Only close the menu if a link that IS NOT a dropdown toggle is clicked.
    if (e.target.tagName === 'A' && !e.target.classList.contains('dropdown-toggle')) {
      closeMenu();
    }
  });

  // 4. Add listener to the document to close the menu on an outside click
  document.addEventListener('click', (e) => {
    if (!nav.classList.contains('nav-open')) return;

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