// background.js
//check if the url has https://www.mlb.com/player/ 
// Listen for tab change events
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    //get the url of the current tab, check if it contains 'https://www.mlb.com/player/' using indexOf
    const url = tab.url;
    console.log(url);
    if (url.indexOf('https://www.mlb.com/player/') !== -1) {
        // Send a message to the active tab
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'logPlayerName' });
        });
    }
    }
);