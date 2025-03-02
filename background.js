chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "analyzeArticle") {
        if (!message.url) {
            sendResponse({ error: "No URL provided" });
            return;
        }

        fetch('http://localhost:5000/api/url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: message.url }),
        })
        .then(response => response.json())
        .then(data => {
            console.log("Response received:", data);
            sendResponse(data);  // ✅ Send actual result
        })
        .catch(error => {
            console.error("Error:", error);
            sendResponse({ error: "Failed to process" });
        });

        return true;  // ✅ Keep sendResponse valid for async call
    }
});
