document.getElementById('analyzeButton').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'analyzeArticle' }, (response) => {
      document.getElementById('result').textContent = response || 'Error processing the article';
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      document.getElementById("url").textContent = tabs[0].url;
    });
  });
  
  