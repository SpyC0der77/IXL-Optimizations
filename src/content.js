// content.js

// Function to retrieve options from chrome.storage and use them
let config = {
  limitKeys: false,
  dismissChallengePopup: true,
  autoSearch: true,
};
function useOptions() {
  chrome.storage.sync.get(
    { limitKeys: false, dismissChallengePopup: true, autoSearch: true },
    (items) => {
      config = items;
    }
  );
}

// Call useOptions when content.js is loaded
useOptions();

// Function to check if a key is allowed
function isAllowedKey(event) {
  const allowedKeys = [
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "Backspace",
    "Tab",
    "Enter",
    "Escape",
    "Delete",
    "Control",
  ];
  return allowedKeys.includes(event.key);
}

// Function to check if a character is allowed
function isAllowedCharacter(event) {
  const allowedChars = /^[0-9+\-*/=()^%., x, y, z]$/;
  if (["a", "z", "c", "v"].includes(event.key.toLowerCase()) && event.ctrlKey) {
    return true;
  } else {
    return allowedChars.test(event.key);
  }
}

// Function to check if the current page is on an IXL math or quiz/test page
function isOnIXLPage() {
  return (
    /^https:\/\/www\.ixl\.com\/math\/level-[a-z]+\/.+$/.test(
      window.location.href
    ) ||
    /^https:\/\/www\.ixl\.com\/takeoff\/math\/level-[a-z]+\/unit-[0-9]+\/test$/.test(
      window.location.href
    )
  );
}

// Function to adjust the width of input fields on IXL pages
function adjustInputFields() {
  if (isOnIXLPage()) {
    document
      .querySelectorAll("input[type='text'], input.fillIn")
      .forEach(function (target) {
        target.style.width = "150px"; // Adjust the width as needed
      });
  }
}

// Event listener for keydown events on input fields
document.addEventListener("keydown", function (event) {
  const target = event.target;
  if (
    target.tagName.toLowerCase() === "input" &&
    (target.type === "text" || target.classList.contains("fillIn")) &&
    isOnIXLPage()
  ) {
    if (isAllowedKey(event)) {
      return;
    }
    if (!isAllowedCharacter(event)) {
      if (config.limitKeys) {
        event.preventDefault();
      }
    }
    target.style.width = "150px"; // Adjust the width as needed
  }
});

console.log(isOnIXLPage());
if (isOnIXLPage()) {
  // Adjust input fields every second
  setInterval(adjustInputFields, 1000);
  if (config.dismissChallengePopup) {
    setInterval(function () {
      if (
        document
          .querySelector(".countdown")
          .parentElement.classList.contains("practice-item-hidden")
      ) {
      } else {
        document.querySelector(".close-countdown-button").click();
      }
    }, 100);
  }
}
