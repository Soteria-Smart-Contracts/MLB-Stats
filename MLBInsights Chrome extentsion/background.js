// background.js
// Listen for extension button click events
chrome.browserAction.onClicked.addListener((tab) => {

    alert('Button clicked!');
});
