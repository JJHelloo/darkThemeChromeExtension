let toggleButton = document.getElementById('toggleButton');

toggleButton.addEventListener('change', function() {
  let newDarkMode = toggleButton.checked;
  chrome.storage.local.set({darkMode: newDarkMode});
  chrome.runtime.sendMessage({ action: 'toggleDarkMode', darkMode: newDarkMode });
});

// Load the state of the switch from the Chrome storage when the popup is opened
window.onload = function() {
  chrome.storage.local.get('darkMode', function(data) {
    toggleButton.checked = data.darkMode;
  });
}
