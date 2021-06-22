$(document).ready(function() {
    ifLoggedIn(function() {
        window.location.replace(URL_landing_after_login);
        return;
    });
});

$(document).keyup(function(event) {
    if (event.which === 13) {
        document.getElementById("gym-sign-up-button").click();
    }
});

document.getElementById("gym-sign-up-button").addEventListener("click", function() {
    // Get email and password
    var email         = document.getElementById("gym-sign-up-email").value;
    var password      = document.getElementById("gym-sign-up-pw").value;
    var conf_password = document.getElementById("gym-sign-up-confirmpw").value;
    var terms_accepted= document.getElementById("sign-up-terms-checkbox").value;

    // Validity
    if (!terms_accepted) {
        alert(signupErrorString(SignupError.ACCEPT_TERMS));
        return;
    } else if (email === "") {
        alert(signupErrorString(SignupError.EMAIL_EMPTY));
        return;
    }

    // New password and confirmation must match
    var pw_err = checkPasswordRequirements(password, conf_password);
    if (pw_err != PasswordError.SUCCESS) {
        alert(passwordErrorString(pw_err));
        return;
    }

    // Create a request variable and assign a new XMLHttpRequest object to
    // it.
    var request = new XMLHttpRequest();

    // Open a new connection, using the POST request on the URL endpoint
    request.open("POST", backend_URL + BE_create_account, true);
    request.setRequestHeader("Content-Type", HDR_content_type_json);
    request.withCredentials = true;
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status != 200) {
                alert(`Request failed with status ${request.status}`);
                return;
            }

            // Begin accessing JSON data here
            var data = JSON.parse(request.responseText);
            if (!data["success"]) {
                alert(signupErrorString(stringToSignupError(data["error"])));

                // Spinner
                document.getElementById("gym-sign-up-button").style.display = "block";
                document.getElementById("signup-loading-lottie").style.display = "none";
                return;
            }

            // Success - now signed in even if we haven't done onboarding yet
            localStorage.setItem("logged_in", "true");

            // Store the session ID, which must be used with subsequent requests
            localStorage.setItem("session_id", data["session_id"]);
            localStorage.setItem("account_email", email);

            // Success
            localStorage.setItem("account_id", data["account_id"]);
            window.location.replace(URL_landing_after_signup);
        }
    }

    // Show loading animation
    document.getElementById("gym-sign-up-button").style.display = "none";
    document.getElementById("signup-loading-lottie").style.display = "block";

    // Send request
    request.send(JSON.stringify({
        "email"    : email,
        "password" : password
    }));
});
