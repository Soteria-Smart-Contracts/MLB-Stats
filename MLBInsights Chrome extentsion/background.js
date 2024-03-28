// background.js

// Listen for tab change events
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    alert('Tab updated!');

  });
  
  // Listen for the extension icon click event
  chrome.action.onClicked.addListener((tab) => {
    alert('Extension icon clicked!');
  });
  