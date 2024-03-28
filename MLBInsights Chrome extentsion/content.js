// content.js

// Listen for changes in the URL
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'logPlayerName') {
      const playerNameElement = document.querySelector('.player-header__title h1');
      if (playerNameElement) {
        const playerName = playerNameElement.textContent.trim();
        console.log('Player Name:', playerName);
        alert('Player Name:', playerName);
      }
    }
  });