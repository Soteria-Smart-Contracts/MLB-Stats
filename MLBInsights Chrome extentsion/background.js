// background.js
//check if the url has https://www.mlb.com/player/ in it
// Listen for tab change events
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url.includes) {
      chrome.tabs.sendMessage(tabId, { action: 'logPlayerName' });
    }
  });