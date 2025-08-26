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
  var menuToggle = document.getElementById('menu-toggle');
  var nav = document.getElementById('primary-navigation');

  /**
   * Close all dropdowns except for an optional one to remain open.
   * @param {HTMLElement} except Optional list item to remain open.
   */
  function closeAllDropdowns(except) {
    document.querySelectorAll('.dropdown').forEach(function (li) {
      if (li !== except) {
        li.classList.remove('open');
      }
    });
  }

  // Toggle the navigation open or closed and lock/unlock page scroll.
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      var expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', (!expanded).toString());
      nav.classList.toggle('nav-open', !expanded);
      document.body.classList.toggle('menu-open', !expanded);
    });
  }

  /**
   * Set up or tear down dropdown click handlers based on viewport width.
   * On small screens (≤900px) the dropdown toggles open their submenus.
   */
  function setupDropdowns() {
    var isMobile = window.innerWidth <= 900;
    document.querySelectorAll('.dropdown > .dropdown-toggle').forEach(function (toggle) {
      // Remove any existing click handler
      toggle.onclick = null;
      if (isMobile) {
        toggle.onclick = function (e) {
          e.preventDefault();
          var parent = this.parentElement;
          var wasOpen = parent.classList.contains('open');
          closeAllDropdowns(parent);
          parent.classList.toggle('open', !wasOpen);
        };
      }
    });
  }
  // Initialise dropdowns on page load and adjust on resize.
  setupDropdowns();
  window.addEventListener('resize', setupDropdowns);

  // Close the menu when any link inside it is clicked.
  if (nav) {
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('nav-open');
        document.body.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        closeAllDropdowns();
      }
    });
  }

  // Close the menu when tapping outside of it on small screens.
  document.addEventListener('click', function (e) {
    if (window.innerWidth <= 900 && nav && nav.classList.contains('nav-open')) {
      var insideNav = nav.contains(e.target) || e.target === menuToggle;
      if (!insideNav) {
        nav.classList.remove('nav-open');
        document.body.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        closeAllDropdowns();
      }
    }
  });
});