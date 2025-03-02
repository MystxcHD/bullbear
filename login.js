document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    if (username === 'bullbearuser' && password === 'securepassword123') {
        alert('Login Successful');
    } else {
        document.getElementById('loginMessage').textContent = 'Invalid username or password. Please try again.';
    }
});
