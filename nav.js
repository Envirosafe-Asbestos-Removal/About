/*
 * Mobile navigation behaviour for Envirosafe Removal.
 *
 * This script controls the responsive navigation menu, replicating the
 * behaviour seen on the Goodbye Asbestos website. It toggles the menu
 * open and closed, locks page scrolling while the menu is open,
 * manages dropdown submenus so only one is open at a time, and
 * closes the menu when a navigation link is selected or when
 * the user taps outside the menu on a small screen.
 */
document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('primary-navigation');

  if (!menuToggle || !nav) {
    return; // Exit if essential elements are not found
  }

  /**
   * Close all dropdowns except for an optional one to remain open.
   * @param {HTMLElement} except - Optional list item to keep open.
   */
  function closeAllDropdowns(except) {
    document.querySelectorAll('.dropdown.open').forEach(function (li) {
      if (li !== except) {
        li.classList.remove('open');
      }
    });
  }

  /**
   * Toggles the main navigation menu open or closed.
   */
  function toggleMenu() {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    nav.classList.toggle('nav-open', !isExpanded);
    document.body.classList.toggle('menu-open', !isExpanded);

    // If we are closing the menu, also close any open dropdowns
    if (isExpanded) {
      closeAllDropdowns();
    }
  }
  
  menuToggle.addEventListener('click', toggleMenu);

  /**
   * Closes the menu completely.
   */
  function closeMenu() {
    menuToggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('nav-open');
    document.body.classList.remove('menu-open');
    closeAllDropdowns();
  }

  /**
   * Sets up dropdown click handlers for mobile viewports.
   * On small screens (≤900px), top-level dropdown links toggle their submenus.
   */
  function setupDropdowns() {
    const isMobile = window.innerWidth <= 900;
    // Target the anchor tag directly within the dropdown list item.
    document.querySelectorAll('.dropdown > a').forEach(function (toggle) {
      // Clear any previously attached event listener to avoid duplicates
      if (toggle.mobileClickHandler) {
        toggle.removeEventListener('click', toggle.mobileClickHandler);
      }
      
      if (isMobile) {
        toggle.mobileClickHandler = function (e) {
          e.preventDefault(); // Prevent navigation on tap
          const parent = this.parentElement;
          const wasOpen = parent.classList.contains('open');
          
          closeAllDropdowns(parent); // Close other dropdowns
          parent.classList.toggle('open', !wasOpen); // Toggle current dropdown
        };
        toggle.addEventListener('click', toggle.mobileClickHandler);
      }
    });
  }

  // Initialise dropdowns on page load and update on resize.
  setupDropdowns();
  window.addEventListener('resize', setupDropdowns);

  // Close the menu when any link inside it is clicked.
  nav.addEventListener('click', function (e) {
    // Only close if an actual link (not a dropdown toggle) is clicked on mobile
    const link = e.target.closest('a');
    if (!link) return;

    const isDropdownToggle = link.parentElement.classList.contains('dropdown');
    const isMobile = window.innerWidth <= 900;

    // On mobile, dropdown toggles should not close the entire menu.
    if (isMobile && isDropdownToggle) {
      return;
    }
    
    // For any other link, close the menu.
    closeMenu();
  });

  // Close the menu when tapping outside of it on small screens.
  document.addEventListener('click', function (e) {
    if (window.innerWidth <= 900 && nav.classList.contains('nav-open')) {
      const isClickInsideNav = nav.contains(e.target);
      const isClickOnToggle = menuToggle.contains(e.target);
      
      if (!isClickInsideNav && !isClickOnToggle) {
        closeMenu();
      }
    }
  });
});