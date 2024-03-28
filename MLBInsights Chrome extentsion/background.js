// background.js

// Listen for tab change events
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

  });
  
  // Listen for the extension icon click event
  chrome.action.onClicked.addListener((tab) => {
    alert('Extension icon clicked!');
  });
  