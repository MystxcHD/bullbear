chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "analyzeArticle") {
        const url = message.url; // Retrieve URL sent from popup.js

        fetch('http://localhost:5000/api/url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: url }),
        })
        .then(response => response.json())
        .then(data => {
            console.log("URL sent successfully:", data);
            sendResponse(data); // Send the response back to popup.js
        })
        .catch(error => {
            console.error("Error sending URL:", error);
            sendResponse("Error processing the URL");
        });

        return true; // Indicates you want to send a response asynchronously
    }
});
