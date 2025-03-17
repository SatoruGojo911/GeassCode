# Chrome Extension Installation Guide

## Download & Install

Follow these steps to install the Chrome extension from GitHub (without publishing it to the Chrome Web Store).

### 1️ Download the Extension

- Go to the GitHub repository: [(https://github.com/utsav1072/CodeGeass/tree/main/ChromeGeass)]
- run `git clone https://github.com/utsav1072/CodeGeass/tree/main/CodeGeassExtention`


### 2️ Load the Extension in Chrome

- Open Google Chrome
- Go to `chrome://extensions/`
- Enable **Developer Mode** (toggle in the top right corner)
- Click **Load unpacked**
- Select the extracted folder containing `manifest.json`

The extension will now be installed and appear in the toolbar.

### 3️ Using the Extension

- Click the extension icon in the toolbar to open the popup
- If the extension interacts with specific websites (like LeetCode), ensure it has the correct permissions in `manifest.json`

### 4️ Updating the Extension

If a new version is available:
- Delete the old version from `chrome://extensions/`
- Re-download and extract the latest ZIP from GitHub
- Reload it using **"Load unpacked"**

## Troubleshooting

- **Extension not appearing?** Ensure Developer Mode is enabled and `manifest.json` is present.
- **Permission issues?** Check Chrome's settings to allow necessary permissions.
- **Errors in console?** Open Chrome Developer Tools (F12 → Console) to debug.
