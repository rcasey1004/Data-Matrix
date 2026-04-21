// A simple gatekeeper function
const Security = {
    // Set your password here
    SECRET_KEY: "Shift2026", 

    checkPassword() {
        const userInput = document.getElementById('pass-input').value;
        const overlay = document.getElementById('login-overlay');
        
        if (userInput === this.SECRET_KEY) {
            overlay.classList.add('hidden');
            // Save to session so they don't have to login every refresh
            sessionStorage.setItem('authenticated', 'true');
        } else {
            alert("Incorrect Password. Access Denied.");
        }
    },

    init() {
        // If already logged in this session, hide the overlay immediately
        if (sessionStorage.getItem('authenticated') === 'true') {
            document.getElementById('login-overlay').classList.add('hidden');
        }
    }
};

// Run on page load
window.onload = () => Security.init();
