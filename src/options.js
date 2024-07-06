// Saves options to chrome.storage
const saveOptions = () => {
    const limitKeys = document.getElementById('limitKeys').checked;
    const dismissChallengePopup = document.getElementById('dismissChallengePopup').checked;
    const autoSearch = document.getElementById('autoSearch').checked;
  
    chrome.storage.sync.set(
      { limitKeys: limitKeys, dismissChallengePopup: dismissChallengePopup, autoSearch: autoSearch },
      () => {
        // Update status to let user know options were saved.
        const status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(() => {
          status.textContent = '';
        }, 750);
      }
    );
  };
  
  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  const restoreOptions = () => {
    chrome.storage.sync.get(
      { limitKeys: false, dismissChallengePopup: true, autoSearch: true },
      (items) => {
        document.getElementById('limitKeys').checked = items.limitKeys;
        document.getElementById('dismissChallengePopup').checked = items.dismissChallengePopup;
        document.getElementById('autoSearch').checked = items.autoSearch;
      }
    );
  };
  
  document.addEventListener('DOMContentLoaded', restoreOptions);
  document.getElementById('save').addEventListener('click', saveOptions);