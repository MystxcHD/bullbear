// From FIREBASE
// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBo-ea5LQOpCrVfoSu5J-8XWmXw8PBL51k",
  authDomain: "bullbear-26d2f.firebaseapp.com",
  projectId: "bullbear-26d2f",
  storageBucket: "bullbear-26d2f.appspot.com",
  messagingSenderId: "1056896725486",
  appId: "1:1056896725486:web:4e01ce0ac86c1c29fedeff",
  measurementId: "G-RLET89YZYT"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const googleBtn = document.getElementById("googleBtn"); // Add Google button in HTML
const message = document.getElementById("message");

// loginBtn.addEventListener("click", () => {
//     const email = emailInput.value;
//     const password = passwordInput.value;

//     signInWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             message.innerText = "Login successful!";
//             window.location.href = "dashboard.html";
//         })
//         .catch((error) => {
//             message.innerText = error.message;
//         });
// });


googleBtn.addEventListener("click", () => {
    console.log("Google Sign-In button clicked!");
    signInWithPopup(auth, provider)
    .then((result) => {
      // Successfully signed in
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;  // Google Access Token
      const user = result.user;  // Signed-in user info
    })
    .catch((error) => {
      console.error("Error during sign-in:", error.message);
      message.innerText = error.message; // Display error on the page
  });
});

// Get the Google Sign-In button
//const googleBtn = document.getElementById("googleBtn");

// Add event listener to log a message when clicked
//googleBtn.addEventListener("click", () => {
//    console.log("Google Sign-In button clicked!");
//});
