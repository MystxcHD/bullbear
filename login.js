document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector("form");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the form from submitting the default way

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (username === "" || password === "") {
            alert("Please enter both username and password.");
            return;
        }

        // Send message to background.js to handle login
        chrome.runtime.sendMessage(
            { action: "login", username: username, password: password },
            function (response) {
                if (response.success) {
                    alert(response.message); // Login successful
                    window.location.href = "popup.html"; // Redirect to popup.html after successful login
                } else {
                    alert(response.message); // Invalid login
                }
            }
        );
    });
});
