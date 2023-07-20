chrome.runtime.sendMessage({ action: 'getDarkMode' }, (response) => {
    if (response.darkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  });
  