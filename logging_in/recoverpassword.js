$(document).ready(function() {
    ifLoggedIn(function() {
        window.location.replace(URL_landing_after_login());
        return;
    });

    // Get the password key from the URL so we can check that it exists and is
    // not expired
    const url_params = new URLSearchParams(window.location.search);
    var password_key = url_params.get("key");

    if (password_key === "") {
        alert(recoverPasswordErrorString(RecoverPasswordError.INVALID_KEY));
        window.location.replace(FE_forgot_password);
        return;
    }

    // Create a request variable and assign a new XMLHttpRequest object to
    // it.
    var request = new XMLHttpRequest();

    // Open a new connection, using the POST request on the URL endpoint
    request.open("GET", backend_URL + BE_check_password_key + "?key=" + password_key, true);
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
                alert(errorString(stringToError(RecoverPasswordError, data["error"])));
                window.location.replace(FE_forgot_password);
                return;
            }

            // Otherwise display the email with stars blocking most letters
            document.getElementById("gym-email-newpw").innerText = data["email"];
        }
    }

    // Send request
    request.send(null);
});

clickSubmitOnPressEnter("gym-newpw", "gym-newpw-button");
clickSubmitOnPressEnter("gym-confirm-newpw", "gym-newpw-button");

document.getElementById("gym-newpw-button").addEventListener("click", function() {
    // Get the password key from the URL
    const url_params = new URLSearchParams(window.location.search);
    var password_key = url_params.get("key");

    // Get email and password
    var password      = document.getElementById("gym-newpw").value;
    var conf_password = document.getElementById("gym-confirm-newpw").value;

    // New password and confirmation must match
    var pw_err = checkPasswordRequirements(password, conf_password);
    if (pw_err != PasswordError.SUCCESS) {
        showPasswordError(ErrorInfo.RecoverPasswordError, pw_err);
        return;
    }

    // Create a request variable and assign a new XMLHttpRequest object to
    // it.
    var request = new XMLHttpRequest();

    // Open a new connection, using the POST request on the URL endpoint
    request.open("POST", backend_URL + BE_change_forgotten_password, true);
    request.setRequestHeader("Content-Type", HDR_content_type_json);
    request.withCredentials = true;
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            let { _, error } = parseResponse(request, ErrorInfo.RecoverPasswordError, SubmitButton.RecoverPassword);

            if (error === RecoverPasswordError.SUCCESS) {
                window.location.assign(URL_log_in);
            }
        }
    }

    // Show loading animation
    showLoadingLottie(SubmitButton.RecoverPassword)

    // Send request
    request.send(JSON.stringify({
        "password_key" : password_key,
        "password"     : password
    }));
});
