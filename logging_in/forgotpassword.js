$(document).ready(function() {
    ifLoggedIn(function() {
        window.location.replace(URL_landing_after_login);
        return;
    });
});

document.getElementById("gym-pwreset-email").keyup(function(event) {
    if (event.which === 13) {
        document.getElementById("gym-pwreset-button").click()
    }
});

//$(document).keyup(function(event) {
//    if (event.which === 13) {
//        document.getElementById("gym-pwreset-button").click()
//    }
//});

document.getElementById("gym-pwreset-button").addEventListener("click", function() {
    // Get email
    var email = document.getElementById("gym-pwreset-email").value;

    // Validity
    if (email === "") {
        showError(ForgotPasswordError.EMAIL_EMPTY);
        return;
    }

    // Hide error if there was one before
    hideErrors();

    // Create a request variable and assign a new XMLHttpRequest object to
    // it.
    var request = new XMLHttpRequest();

    // Open a new connection, using the POST request on the URL endpoint
    request.open("POST", backend_URL + BE_forgot_password, true);
    request.setRequestHeader("Content-Type", HDR_content_type_json);
    request.withCredentials = true;
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            parseResponse(request, ErrorInfo.ForgotPasswordError, SubmitButton.ForgotPassword);
        }
    }

    // Show loading animation
    showLoadingLottie(SubmitButton.ForgotPassword);

    // Send request
    request.send(JSON.stringify({
        "email"    : email
    }));
});
