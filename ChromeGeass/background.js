
chrome.action.onClicked.addListener((tab) => {
    console.log("Extension icon clicked!");
});

chrome.runtime.onInstalled.addListener(() => {
    chrome.sidePanel.setOptions({
        enabled: true,
        defaultPath: "popup.html"
    });
});
chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "openPopup") {
        chrome.windows.create({
            url: "popup.html",
            type: "popup",
            width: 400,
            height: 600
        });
    }
});