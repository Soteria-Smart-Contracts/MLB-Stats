// background.js
//check if the url has https://www.mlb.com/player/ in it using a real 
// Listen for tab change events
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url.includes('https://www.mlb.com/player/')) {
      chrome.tabs.sendMessage(tabId, { action: 'logPlayerName' });
    }
  });