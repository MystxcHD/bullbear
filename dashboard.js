import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

const auth = getAuth();

const usernameElement = document.getElementById("username");
const logoutBtn = document.getElementById("logoutBtn");

// Set the user's name (can customize this further based on the user's profile)
const user = auth.currentUser;
if (user) {
  usernameElement.textContent = user.displayName || user.email; // Display user's name
}

logoutBtn.addEventListener("click", () => {
  signOut(auth).then(() => {
    // Sign-out successful, redirect to login page
    window.location.href = "login.html"; // Redirect to login page after logout
  }).catch((error) => {
    console.error("Sign-out error:", error);
  });
});
