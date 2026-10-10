# IXL Optimizations

A Manifest V3 Chrome extension that adjusts IXL search and answer-input behavior. Settings are available in the extension popup and options page.

## Install locally

```bash
git clone https://github.com/SpyC0der77/IXL-Optimizations.git
```

Open `chrome://extensions`, enable **Developer mode**, choose **Load unpacked**, and select the cloned folder containing `manifest.json`. No build step or package installation is required.

## Settings

- Redirect skill-code searches to the matching skill.
- Search through Chrome's address bar by typing `skill`, pressing Tab, and entering a query.
- Set answer-input widths between 100 and 250 pixels.
- Dismiss the Challenge Zone and incomplete-answer popups automatically.
- Optionally restrict accepted keys. Leave this off when answers require algebraic variables or other blocked characters.

Open the extension popup, change the settings, and click **Save**. **Revert** restores the default options. Settings use `chrome.storage.sync`.

The options page also contains a **Claim All Rewards** button, but the current options script does not attach a handler to it.

## Source and permissions

[`manifest.json`](manifest.json) declares `activeTab`, `storage`, and `tabs` permissions. Content scripts run on matching `https://www.ixl.com/` pages:

- [`src/content.js`](src/content.js): answer-input and popup adjustments.
- [`src/search.js`](src/search.js): search redirects.
- [`src/background.js`](src/background.js): address-bar keyword handling.
- [`src/diagnostic.js`](src/diagnostic.js) and [`src/awards.js`](src/awards.js): page-specific behavior.
- [`src/options.html`](src/options.html) and [`src/options.js`](src/options.js): configuration UI and persistence.

This is an unofficial extension. IXL page changes can break selectors or redirects, and the skill list bundled in the background script can become outdated.
