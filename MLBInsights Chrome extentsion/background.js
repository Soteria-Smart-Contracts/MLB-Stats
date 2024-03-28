// background.js
//check if the ur
// Listen for tab change events
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && ) {
      chrome.tabs.sendMessage(tabId, { action: 'logPlayerName' });
    }
  });