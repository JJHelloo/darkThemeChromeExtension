let darkMode = false;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(['darkMode'], function(result) {
    if (result.darkMode !== undefined) {
      darkMode = result.darkMode;
    } else {
      chrome.storage.local.set({darkMode: darkMode});
    }
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getDarkMode') {
    chrome.storage.local.get(['darkMode'], function(result) {
      sendResponse({ darkMode: result.darkMode });
    });
    return true;  // Indicates we will send a response asynchronously
  } else if (request.action === 'toggleDarkMode') {
    darkMode = !darkMode;
    chrome.storage.local.set({darkMode: darkMode});
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (tabs.length > 0) {
        if (darkMode) {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: () => {
              document.body.classList.add('dark-theme');
            }
          });
        } else {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: () => {
              document.body.classList.remove('dark-theme');
            }
          });
        }
      }
    });
  }
});
