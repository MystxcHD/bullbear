<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Google Sign-In with Firebase</title>
  </head>
  <body>
    <button id="googleSignInBtn">Sign in with Google</button>

    <script type="module">
      import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
      import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
      import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
      
      // Firebase API Key
      const firebaseConfig = {
        apiKey: "AIzaSyBo-ea5LQOpCrVfoSu5J-8XWmXw8PBL51k",
        authDomain: "bullbear-26d2f.firebaseapp.com",
        projectId: "bullbear-26d2f",
        storageBucket: "bullbear-26d2f.firebasestorage.app",
        messagingSenderId: "1056896725486",
        appId: "1:1056896725486:web:5b15f822e28e83f5fedeff",
        measurementId: "G-PKJD6TVY3M"
      };

      const app = initializeApp(firebaseConfig);
      const analytics = getAnalytics(app);

      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();

      const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
          .then((result) => {
            const user = result.user;
            console.log("Signed in user:", user);

            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            console.log("Access Token:", token);
          })
          .catch((error) => {
            console.error("Error during sign in:", error);
          });
      };

      document.getElementById("googleSignInBtn").addEventListener("click", signInWithGoogle);
    </script>
  </body>
</html>
