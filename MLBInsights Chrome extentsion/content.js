// content.js

// Listen for changes in the URL
chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'logPlayerName') {
      const playerNameElement = document.querySelector('player-header--vitals-name');
      if (playerNameElement) {
        const playerName = playerNameElement.textContent.trim();
        console.log('Player Name:', playerName);
        alert('Player Name:', playerName);
      }
    }
  });