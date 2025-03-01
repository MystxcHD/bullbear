document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    // Hardcoded login for demo purposes
    if (username === 'bullbearuser' && password === 'securepassword123') {
        // Simulate successful login (replace with real authentication if needed)
        alert('Login Successful');
        // Redirect to another page or show the logged-in view
    } else {
        document.getElementById('loginMessage').textContent = 'Invalid username or password. Please try again.';
    }
});
