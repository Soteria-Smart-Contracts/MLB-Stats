// background.js
//check if the url has https://www.mlb.com/player/ 
// Listen for tab change events
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    //get the url of the current tab
    const url = tab.url;
    if (url.contains('https://www.mlb.com/player/')) {
        // Send a message to the active tab
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'logPlayerName' });
        });
    }
    }
);