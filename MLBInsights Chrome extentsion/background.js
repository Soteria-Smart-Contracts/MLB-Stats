// background.js
// Listen for extension button click events
brave.browserAction.onClicked.addListener((tab) => {

    alert('Button clicked!');
});
