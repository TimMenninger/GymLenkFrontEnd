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
        showError(LoginError.EMAIL_EMPTY);
        return;
    }
    if (password === "") {
        showError(LoginError.PASSWORD_EMPTY);
        return;
    }

    // If there was an error, don't display it anymore until if there's another
    // error
    hideErrors();

    // Create a request variable and assign a new XMLHttpRequest object to
    // it.
    var request = new XMLHttpRequest();

    // Open a new connection, using the POST request on the URL endpoint
    request.open("POST", backend_URL + BE_sign_in, true);
    request.setRequestHeader("Content-Type", HDR_content_type_json);
    request.withCredentials = true;
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            let { data, error } = parseResponse(ErrorInfo.LoginError, SubmitButton.LogIn);

            if (error_type === LoginError.SUCCESS) {
                // Success - go to dashboard if the account is complete, or to
                // onboarding if they must still set things up
                localStorage.setItem("logged_in", "true");

                // Store the session ID, which must be used with subsequent
                // requests
                localStorage.setItem("session_id", data["session_id"]);
                localStorage.setItem("account_email", email);

                if ("dashboard" in data && "location_id" in data["dashboard"]) {
                    storeDashboardData(data["dashboard"]);
                    window.location.replace(URL_landing_after_login);
                } else {
                    window.location.replace(URL_landing_after_signup);
                }
            }
        }
    }

    // Show loading animation
    showLoadingLottie(SubmitButton.LogIn);

    // Send request
    request.send(JSON.stringify({
        "email"    : email,
        "password" : password
    }));
});
