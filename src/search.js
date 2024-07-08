// Function to simulate clicking on a search result with the specified skill ID
function clickOnSkillId() {
  const result = document.querySelector(".code-match");
  if (result) {
    window.location.href = result.querySelector("a").href;
  }
}

// Function to retrieve options from chrome.storage and use them
function useOptions() {
  chrome.storage.sync.get(
    { autoSearch: true },
    (items) => {

      // Example usage: Check if autoSearch is enabled
      if (items.autoSearch) {
        clickOnSkillId();
      }
    }
  );
}

useOptions();