/**
 * ScopeLock Client-Side View Router
 * Coordinates view panels, navigation states, deep hash links, and focus management.
 */

window.ScopeLockRouter = {
  routes: ['home', 'studio', 'clauses', 'calculator', 'client-portal', 'faq'],

  init: function() {
    window.addEventListener('hashchange', () => {
      this.handleHashChange();
    });

    // Check initial hash
    if (window.location.hash) {
      const route = window.location.hash.replace('#', '');
      if (this.routes.includes(route)) {
        this.navigate(route, false);
      } else {
        this.navigate('studio', false);
      }
    } else {
      this.navigate('studio', false);
    }
  },

  handleHashChange: function() {
    const route = window.location.hash.replace('#', '');
    if (this.routes.includes(route)) {
      this.navigate(route, false);
    }
  },

  navigate: function(routeId, updateHash = true) {
    if (!this.routes.includes(routeId)) routeId = 'studio';

    if (updateHash) {
      window.location.hash = routeId;
    }

    // Toggle panels
    document.querySelectorAll('.view-panel').forEach(panel => {
      panel.classList.remove('active');
    });

    const targetPanel = document.getElementById(`view-${routeId}`);
    if (targetPanel) {
      targetPanel.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Update Nav Links
    document.querySelectorAll('.nav-link').forEach(link => {
      if (link.dataset.tab === routeId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Close mobile menu if open
    const navMenu = document.getElementById('nav-menu');
    if (navMenu && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
    }

    // Notify UI
    if (window.ScopeLockUI && typeof window.ScopeLockUI.onRouteEnter === 'function') {
      window.ScopeLockUI.onRouteEnter(routeId);
    }
  }
};
