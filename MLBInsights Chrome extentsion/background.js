// background.js

// Listen for tab change events
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url.startsWith('https://www.mlb.com/player/')) {
      chrome.tabs.sendMessage(tabId, { action: 'logPlayerName' });
    }
  });