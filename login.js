const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'punktuate123'
};

function checkAlreadyLoggedIn() {
    const session = localStorage.getItem('punktuate_admin_session');
    if (session) {
        window.location.href = 'admin.html';
    }
}

function initLoginForm() {
    const form = document.getElementById('loginForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const errorDiv = document.getElementById('errorMessage');

            if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
                localStorage.setItem('punktuate_admin_session', JSON.stringify({ 
                    username, 
                    timestamp: Date.now() 
                }));
                window.location.href = 'admin.html';
            } else {
                errorDiv.textContent = 'Invalid credentials!';
                errorDiv.classList.remove('hidden');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    checkAlreadyLoggedIn();
    initLoginForm();
});
