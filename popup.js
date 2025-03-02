document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("analyzeButton").addEventListener("click", () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length === 0) return;

            const url = tabs[0].url;

            chrome.runtime.sendMessage({ action: "analyzeArticle", url: url }, (response) => {
                console.log("Received response:", response);

                if (response && response.result) {
                    document.getElementById("result").textContent = response.result; // ✅ Display analysis
                } else {
                    document.getElementById("result").textContent = "Error processing the article.";
                }
            });
        });
    });
});
