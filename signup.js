document.getElementById("gym-sign-up-button").addEventListener("click", function() {
    // Get email and password
    var email         = document.getElementById("gym-sign-up-email").value;
    var password      = document.getElementById("gym-sign-up-pw").value;
    var conf_password = document.getElementById("gym-sign-up-confirmpw").value;
    var terms_accepted= document.getElementById("sign-up-terms-checkbox").value;

    // Must accept terms
    if (!terms_accepted) {
        alert("You must accept the terms and conditions to create an account");
        return;
    }

    // New password and confirmation must match
    var pw_err = checkPasswordRequirements(password, conf_password);
    switch (pw_err) {
    case PasswordError.SUCCESS:
        break;
    case PasswordError.MISMATCH:
        alert("Passwords do not match");
        return;
    case PasswordError.TOO_SHORT:
        alert("Password must be at least 8 characters");
        return;
    case PasswordError.NEEDS_LETTER:
        alert("Password must have at least one letter");
        return;
    case PasswordError.NEEDS_NONLETTER:
        alert("Password must have at least one number or special character");
        return;
    default:
        alert("Error changing password");
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
                console.log("Request failed");
                return;
            }

            // Begin accessing JSON data here
            var data = JSON.parse(request.responseText);
            if (!data["success"]) {
                console.log(data["message"]);
                return;
            }

            // Success - now signed in even if we haven't done onboarding yet
            localStorage.setItem("logged_in", "true");

            // Store the session ID, which must be used with subsequent requests
            localStorage.setItem("session_id", data["session_id"]);

            // Success
            localStorage.setItem("account_id", data["account_id"]);
            window.location.replace(URL_landing_after_signup);
        }
    }

    // Send request
    request.send(JSON.stringify({
        "email"    : email,
        "password" : password
    }));
});
