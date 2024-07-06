// Saves options to chrome.storage
const saveOptions = () => {
  const limitKeys = document.getElementById("limitKeys").checked;
  const dismissChallengePopup = document.getElementById(
    "dismissChallengePopup"
  ).checked;
  const autoSearch = document.getElementById("autoSearch").checked;
  const setWidth = document.getElementById("setWidth").checked;
  const slider = document.getElementById("slider").value;
  chrome.storage.sync.set(
    {
      limitKeys: limitKeys,
      dismissChallengePopup: dismissChallengePopup,
      autoSearch: autoSearch,
      setWidth: setWidth,
      slider: slider,
    },
    () => {
      // Update status to let user know options were saved.
      const status = document.getElementById("status");
      status.textContent = "Options saved.";
      setTimeout(() => {
        status.textContent = "";
      }, 750);
    }
  );
};

// Saves options to chrome.storage
const revertOptions = () => {
  
    chrome.storage.sync.set(
      {
        limitKeys: false,
        dismissChallengePopup: true,
        autoSearch: true,
        setWidth: true,
        slider: 150,
      },
      () => {
        // Update status to let user know options were saved.
        restoreOptions();
        const status = document.getElementById("status");
        status.textContent = "Options reverted.";
        setTimeout(() => {
          status.textContent = "";
        }, 750);
      }
    );
  };

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
  chrome.storage.sync.get(
    { limitKeys: false, dismissChallengePopup: true, autoSearch: true, setWidth: true, slider: 150 },
    (items) => {
      document.getElementById("limitKeys").checked = items.limitKeys;
      document.getElementById("dismissChallengePopup").checked =
        items.dismissChallengePopup;
      document.getElementById("autoSearch").checked = items.autoSearch;
      document.getElementById("setWidth").checked = items.setWidth;
      document.getElementById("slider").value = items.slider;
    }
  );
};

document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("save").addEventListener("click", saveOptions);
document.getElementById("revert").addEventListener("click", revertOptions);