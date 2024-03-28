// background.js

// Listen for tab change events
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url.startsWith('https://www.mlb.com/player/')) {
      chrome.tabs.sendMessage(tabId, { action: 'logPlayerName' });
    }
  });
  
  // Listen for the extension icon click event
  chrome.action.onClicked.addListener((tab) => {
    // Execute JavaScript code here when the extension icon is clicked
    // For example, you can open a new tab with a specific URL
    chrome.tabs.create({ url: 'https://www.example.com' });
  });
  