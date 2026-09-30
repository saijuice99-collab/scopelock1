/**
 * ScopeLock Master Application Orchestrator
 * Bootstraps modules, configures DOM delegations, and verifies application lifecycle.
 */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize State and Local Storage
    window.ScopeLockState.init();

    // 2. Initialize UI Components
    window.ScopeLockUI.init();

    // 3. Initialize View Router
    window.ScopeLockRouter.init();

    // 4. Bind Global Navigation Actions
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const tab = link.dataset.tab;
        if (tab) window.ScopeLockRouter.navigate(tab);
      });
    });

    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    if (mobileBtn && navMenu) {
      mobileBtn.addEventListener('click', () => {
        navMenu.classList.toggle('open');
      });
    }

    // 5. Preset Chip Selection Listeners
    document.querySelectorAll('.preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const presetId = btn.dataset.preset;
        if (presetId) {
          window.ScopeLockState.loadPreset(presetId);
          document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          window.ScopeLockUI.showToast(`Loaded "${btn.innerText.trim()}" preset`);
        }
      });
    });

    // 6. Change Order Submission
    const coForm = document.getElementById('co-create-form');
    if (coForm) {
      coForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('co-input-title')?.value.trim();
        const reason = document.getElementById('co-input-reason')?.value.trim();
        const hours = Number(document.getElementById('co-input-hours')?.value) || 0;
        const days = Number(document.getElementById('co-input-days')?.value) || 0;
        const rate = Number(document.getElementById('co-input-rate')?.value) || (window.ScopeLockState.project.hourlyRate || 150);

        if (!title) {
          window.ScopeLockUI.showToast('Please provide a title for the Change Order', 'warning');
          return;
        }

        const co = window.ScopeLockState.addChangeOrder({
          title,
          reason,
          additionalHours: hours,
          additionalDays: days,
          hourlyRate: rate
        });

        // Reset form inputs
        document.getElementById('co-input-title').value = '';
        document.getElementById('co-input-reason').value = '';

        window.ScopeLockUI.showToast(`Change Order ${co.id} issued (+${window.ScopeLockState.project.symbol || '$'}${co.totalCost.toLocaleString()})`, 'success');
        window.ScopeLockUI.renderChangeOrders();
      });
    }

    // 7. Add Deliverable Action
    const addDelBtn = document.getElementById('btn-add-deliverable');
    if (addDelBtn) {
      addDelBtn.addEventListener('click', () => {
        window.ScopeLockState.addDeliverable();
        window.ScopeLockUI.showToast('New deliverable line item added');
      });
    }

    // 8. Document Print & Markdown Export
    const printBtn = document.getElementById('btn-print-doc');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }

    const copyMdBtn = document.getElementById('btn-copy-md');
    if (copyMdBtn) {
      copyMdBtn.addEventListener('click', () => {
        const md = window.ScopeLockDocument.toMarkdown(window.ScopeLockState.project);
        navigator.clipboard.writeText(md).then(() => {
          window.ScopeLockUI.showToast('Statement of Work copied to clipboard as Markdown');
        }).catch(() => {
          window.ScopeLockUI.showToast('Clipboard access unavailable', 'warning');
        });
      });
    }

    // 9. JSON Export & Import
    const exportBtn = document.getElementById('btn-export-json');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        window.ScopeLockStorage.exportJSON(window.ScopeLockState.project);
        window.ScopeLockUI.showToast('Project JSON exported');
      });
    }

    const importInput = document.getElementById('input-import-json');
    if (importInput) {
      importInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        window.ScopeLockStorage.importJSON(file, (err, data) => {
          if (err) {
            window.ScopeLockUI.showToast('Failed to parse project JSON file', 'danger');
          } else {
            window.ScopeLockStorage.save(data);
            window.ScopeLockState.init();
            window.ScopeLockUI.renderAll();
            window.ScopeLockUI.showToast('Project restored from JSON backup', 'success');
          }
          importInput.value = '';
        });
      });
    }

    console.log('ScopeLock Production Engine initialized successfully.');
  });
})();
