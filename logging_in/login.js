$(document).ready(function() {
    ifLoggedIn(function() {
        window.location.replace(URL_landing_after_login);
        return;
    });
});

$(document).keyup(function(event) {
    if (event.which === 13) {
        document.getElementById("gym-login-button").click()
    }
});

document.getElementById("gym-login-button").addEventListener("click", function() {
    // Get email and password
    var email    = document.getElementById("gym-login-email").value;
    var password = document.getElementById("gym-login-password").value;

    // Validate
    if (email === "") {
        alert(loginErrorString(LoginError.EMAIL_EMPTY))
        return
    }
    if (password === "") {
        alert(loginErrorString(LoginError.PASSWORD_EMPTY))
        return
    }

    // Create a request variable and assign a new XMLHttpRequest object to
    // it.
    var request = new XMLHttpRequest();

    // Open a new connection, using the POST request on the URL endpoint
    request.open("POST", backend_URL + BE_sign_in, true);
    request.setRequestHeader("Content-Type", HDR_content_type_json);
    request.withCredentials = true;
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            var error_type = LoginError.SUCCESS;
            var data = "{}";

            // Check error on response status
            if (request.status != 200) {
                // Error message
                console.log(`Request failed with status ${request.status}`);
                error_type = LoginError.ERR_FAILURE;
            }
            // Begin accessing JSON data here
            else {
                data = JSON.parse(request.responseText);
                if (!data["success"]) {
                    error_type = stringToLoginError(data["error"]);
                }
            }

            // Check for failure pulled from above
            if (error_type != LoginError.SUCCESS) {
                // Display error
                document.getElementById("gym-login-error-div").style.display = "block";
                document.getElementById("gym-login-error-div").innerText = loginErrorString(stringToLoginError(error_type));

                // Spinner
                document.getElementById("gym-login-button").style.display = "block";
                document.getElementById("login-loading-lottie").style.display = "none";
            }

            // Success - go to dashboard if the account is complete, or to
            // onboarding if they must still set things up
            localStorage.setItem("logged_in", "true");

            // Store the session ID, which must be used with subsequent requests
            localStorage.setItem("session_id", data["session_id"]);
            localStorage.setItem("account_email", email);

            // Remove any error message there was
            document.getElementById("gym-login-error-div").style.display = "none";

            if ("dashboard" in data && "location_id" in data["dashboard"]) {
                storeDashboardData(data["dashboard"]);
                window.location.replace(URL_landing_after_login);
            } else {
                window.location.replace(URL_landing_after_signup);
            }
        }
    }

    // Show loading animation
    document.getElementById("gym-login-button").style.display = "none";
    document.getElementById("login-loading-lottie").style.display = "block";

    // Send request
    request.send(JSON.stringify({
        "email"    : email,
        "password" : password
    }));
});
