document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector("form");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); 

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (username === "" || password === "") {
            alert("Please enter both username and password.");
            return;
        }

        
        if (username === "admin" && password === "password") {
            alert("Login successful!"); 
            
        } else {
            alert("Invalid username or password. Try again.");
        }
    });
});