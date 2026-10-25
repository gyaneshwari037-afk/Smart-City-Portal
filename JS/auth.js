// ========================================
// SMART CITY - AUTHENTICATION
// Front-end demo using localStorage
// ========================================


// ---------- REGISTER ----------

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("registerName").value.trim();
        const email = document.getElementById("registerEmail").value.trim();
        const password = document.getElementById("registerPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        const message = document.getElementById("registerMessage");


        // Check passwords
        if (password !== confirmPassword) {

            message.textContent = "Passwords do not match.";
            message.style.color = "red";

            return;
        }


        // Create user
        const user = {
            name: name,
            email: email,
            password: password
        };


        // Save user in browser
        localStorage.setItem("smartCityUser", JSON.stringify(user));


        message.textContent = "Account created successfully! Redirecting to login...";
        message.style.color = "green";


        // Go to login page
        setTimeout(function () {

            window.location.href = "login.html";

        }, 1500);

    });

}



// ---------- LOGIN ----------

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;

        const message = document.getElementById("loginMessage");


        // Get registered user
        const savedUser = localStorage.getItem("smartCityUser");


        // No account
        if (!savedUser) {

            message.textContent = "No account found. Please register first.";
            message.style.color = "red";

            return;
        }


        const user = JSON.parse(savedUser);


        // Check login details
        if (email === user.email && password === user.password) {

            // Save login status
            localStorage.setItem("smartCityLoggedIn", "true");

            localStorage.setItem(
                "smartCityCurrentUser",
                JSON.stringify(user)
            );


            message.textContent = "Login successful! Opening dashboard...";
            message.style.color = "green";


            // Open dashboard
            setTimeout(function () {

                window.location.href = "dashboard.html";

            }, 1000);

        } else {

            message.textContent = "Incorrect email or password.";
            message.style.color = "red";

        }

    });

}
// ========================================
// NAVBAR LOGIN STATUS
// ========================================

const authNav = document.getElementById("authNav");

if (authNav) {

    const isLoggedIn =
        localStorage.getItem("smartCityLoggedIn") === "true";

    if (isLoggedIn) {

        authNav.textContent = "Dashboard";
        authNav.href = "dashboard.html";

    } else {

        authNav.textContent = "Citizen Login";
        authNav.href = "login.html";

    }
}