/**
 * ScopeLock Local Storage & Serialization Engine
 * Handles zero-telemetry local persistence, JSON export, and data validation.
 */

window.ScopeLockStorage = {
  STORAGE_KEY: 'scopelock_project_v2',
  SIGNOFF_KEY: 'scopelock_signoff_v2',

  save: function(projectData) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(projectData));
      return true;
    } catch (e) {
      console.warn('ScopeLock Storage Save Warning:', e);
      return false;
    }
  },

  load: function() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (!data) return null;
      const parsed = JSON.parse(data);
      if (parsed && parsed.deliverables && Array.isArray(parsed.deliverables)) {
        return parsed;
      }
    } catch (e) {
      console.warn('ScopeLock Storage Load Warning:', e);
    }
    return null;
  },

  exportJSON: function(projectData) {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(projectData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `scopelock-${(projectData.projectName || 'project').toLowerCase().replace(/\s+/g, '-')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  },

  importJSON: function(file, callback) {
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const parsed = JSON.parse(e.target.result);
        if (parsed && parsed.deliverables) {
          callback(null, parsed);
        } else {
          callback(new Error('Invalid ScopeLock project schema'));
        }
      } catch (err) {
        callback(err);
      }
    };
    reader.readAsText(file);
  },

  saveSignoff: function(signoffData) {
    try {
      localStorage.setItem(this.SIGNOFF_KEY, JSON.stringify(signoffData));
      return true;
    } catch (e) {
      return false;
    }
  },

  loadSignoff: function() {
    try {
      const data = localStorage.getItem(this.SIGNOFF_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }
};
