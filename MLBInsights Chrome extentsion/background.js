// background.js
let xanax;
// Listen for tab change events
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    let xanax = '12';

  });
  
  // Listen for the extension icon click event
  chrome.action.onClicked.addListener((tab) => {
    xanax = '13';
  });
  