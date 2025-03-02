chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "login") {
        const { username, password } = message;

        
        if (username === "admin" && password === "password") {
            chrome.storage.sync.set({ loggedInUser: username }, () => {
                sendResponse({ success: true, message: "Login successful!" });
            });
        } else {
            sendResponse({ success: false, message: "Invalid username or password." });
        }

        return true; 
    }

    if (message.action === "logout") {
        chrome.storage.sync.remove("loggedInUser", () => {
            sendResponse({ success: true, message: "Logged out successfully." });
        });

        return true;
    }
});
