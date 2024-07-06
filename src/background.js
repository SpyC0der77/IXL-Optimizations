// background.js

chrome.omnibox.onInputEntered.addListener(function (text) {
  const searchUrl = `https://www.ixl.com/search?q=${encodeURIComponent(text)}`;
  chrome.tabs.create({ url: searchUrl });
});

