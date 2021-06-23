$(document).ready(function() {
    ifLoggedIn(function() {
        window.location.replace(URL_landing_after_login);
        return;
    });
});

$(document).keyup(function(event) {
    if (event.which === 13) {
        document.getElementById("gym-pwreset-button").click()
    }
});

document.getElementById("gym-pwreset-button").addEventListener("click", function() {
    // Get email
    var email = document.getElementById("gym-pwreset-email").value;

    // Validity
    if (email === "") {
        showForgotPasswordError(ForgotPasswordError.EMAIL_EMPTY);
        return;
    }

    // Hide error if there was one before
    hideForgotPasswordError();

    // Create a request variable and assign a new XMLHttpRequest object to
    // it.
    var request = new XMLHttpRequest();

    // Open a new connection, using the POST request on the URL endpoint
    request.open("POST", backend_URL + BE_forgot_password, true);
    request.setRequestHeader("Content-Type", HDR_content_type_json);
    request.withCredentials = true;
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            var error_type = ForgotPasswordError.SUCCESS;
            var data = "{}";

            if (request.status != 200) {
                console.log(`Request failed with status ${request.status}`);
                error_type = ForgotPasswordError.FAILURE;
            }
            // Begin accessing JSON data here
            else {
                data = JSON.parse(request.responseText);
                if (!data["success"]) {
                    error_type = stringToForgotPasswordError(data["error"]);
                }
            }

            // Begin accessing JSON data here
            if (error_type != ForgotPasswordError.SUCCESS) {
                showForgotPasswordError(error_type);

                // Spinner
                document.getElementById("gym-pwreset-button").style.display = "block";
                document.getElementById("pwreset-loading-lottie").style.display = "none";
                return;
            }

            document.getElementById("pwreset-loading-lottie").style.display = "none";
            showForgotPasswordSuccess();
        }
    }

    // Show loading animation
    document.getElementById("gym-pwreset-button").style.display = "none";
    document.getElementById("pwreset-loading-lottie").style.display = "block";

    // Send request
    request.send(JSON.stringify({
        "email"    : email
    }));
});
