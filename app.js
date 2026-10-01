(() => {
  'use strict';

  const storageKey = 'mgt3745.checklists.v1';
  const form = document.querySelector('#checklist-form');
  const sectionInput = document.querySelector('#section-input');
  const criterionInput = document.querySelector('#criterion-input');
  const list = document.querySelector('#checklist-list');
  const errorBox = document.querySelector('#checklist-error');
  const saveStatus = document.querySelector('#save-status');
  const emptyState = document.querySelector('#empty-state');
  // ?failSave forces every save to fail, so AC-F01-4 can be tested repeatably.
  const simulateFailedSave = new URLSearchParams(window.location.search).has('failSave');
  let checklists = loadChecklists();

  function isValidEntry(entry) {
    return entry !== null
      && typeof entry === 'object'
      && typeof entry.id === 'string'
      && typeof entry.sectionName === 'string'
      && typeof entry.criterion === 'string';
  }

  function loadChecklists() {
    try {
      const storedText = window.localStorage.getItem(storageKey);
      const parsed = storedText === null ? [] : JSON.parse(storedText);
      if (!Array.isArray(parsed) || !parsed.every(isValidEntry)) {
        throw new Error('Unexpected stored data');
      }
      return parsed;
    } catch {
      saveStatus.textContent = 'Saved checklist could not be read. Original storage was left unchanged. A successful new save will replace it.';
      return [];
    }
  }

  // Tries to persist the proposed state. Returns true only if it worked.
  function saveChecklists(nextChecklists) {
    try {
      if (simulateFailedSave) {
        throw new Error('Simulated save failure');
      }
      window.localStorage.setItem(storageKey, JSON.stringify(nextChecklists));
      return true;
    } catch {
      return false;
    }
  }

  function makeId() {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') {
      return window.crypto.randomUUID();
    }
    return 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
  }

  function renderChecklists() {
    list.replaceChildren();
    emptyState.hidden = checklists.length > 0;

    checklists.forEach(entry => {
      const item = document.createElement('li');

      const name = document.createElement('strong');
      name.textContent = entry.sectionName;

      const criterion = document.createElement('p');
      criterion.textContent = 'Done when: ' + entry.criterion;

      const idLabel = document.createElement('small');
      idLabel.textContent = 'ID: ' + entry.id;

      const deleteButton = document.createElement('button');
      deleteButton.type = 'button';
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => deleteEntry(entry.id));

      item.append(name, criterion, idLabel, deleteButton);
      list.append(item);
    });
  }

  function deleteEntry(id) {
    const next = checklists.filter(entry => entry.id !== id);
    if (!saveChecklists(next)) {
      errorBox.textContent = 'Could not delete. The section is still in your list.';
      saveStatus.textContent = '';
      return;
    }
    checklists = next;
    errorBox.textContent = '';
    saveStatus.textContent = 'Section deleted.';
    renderChecklists();
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    const sectionName = sectionInput.value.trim();
    const criterion = criterionInput.value.trim();

    // AC-F01-1: a section needs a name and at least one completion criterion.
    if (sectionName === '' || criterion === '') {
      errorBox.textContent = sectionName === ''
        ? 'Enter a section name.'
        : 'Enter at least one completion criterion for this section.';
      saveStatus.textContent = '';
      return;
    }

    const entry = { id: makeId(), sectionName, criterion };
    const next = [...checklists, entry];

    // AC-F01-4: update the visible state and clear the form only after a successful save.
    if (!saveChecklists(next)) {
      errorBox.textContent = 'Could not save. Your text and existing list are still here. Try again.';
      saveStatus.textContent = '';
      return;
    }

    checklists = next;
    errorBox.textContent = '';
    saveStatus.textContent = 'Saved.';
    renderChecklists();
    form.reset();
    sectionInput.focus();
  });

  renderChecklists();
})();
