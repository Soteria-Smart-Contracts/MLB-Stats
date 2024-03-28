// background.js
//check if the url has https://www.mlb.com/player/ in it using window.location.href
// Listen for tab change events
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    //check if the url has https://www.mlb.com/player/ in it using contains
    if (tab
        && tab.url
        && tab.url