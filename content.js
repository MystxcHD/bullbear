// This function extracts the visible text from the page and sends it to the background script.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "analyzeArticle") {
        let articleText = document.body.innerText;
        
        chrome.runtime.sendMessage({
            action: "sendToServer",
            text: articleText
        });
    }
});
