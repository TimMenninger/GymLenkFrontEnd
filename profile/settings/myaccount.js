$(document).ready(function() {
    // If not logged in, go back to sign in
    ifNotLoggedIn(function() {
        clearState();
        window.location.replace(URL_log_in);
        return;
    });

    // Set email address for acocunt email
    var email = localStorage.getItem("account_email");
    document.getElementById("gym-account-email").innerText = email;
});

document.getElementById("update-pw-button").addEventListener("click", function() {
    // Send to backend the current password and the new one
    var current_password  = document.getElementById("current-pw").value;
    var new_password      = document.getElementById("new-pw").value;
    var conf_new_password = document.getElementById("confirm-new-pw").value;
    var data = {
        session_id:         localStorage.getItem("session_id"),
        current_password:   current_password,
        new_password:       new_password
    };

    // Hide any previous error/success message before the next attempt
    hideChangePasswordError();

    // New password and confirmation must match
    if (current_password === "") {
        showError(ChangePassword.PASSWORD_EMPTY);
        return;
    }
    var pw_err = checkPasswordRequirements(new_password, conf_new_password);
    if (pw_err != PasswordError.SUCCESS) {
        showPasswordError(ErrorInfo.ChangePasswordError, pw_err);
        return;
    }

    // Create a request variable and assign a new XMLHttpRequest object to
    // it.
    var request = new XMLHttpRequest();

    // Open a new connection, using the POST request on the URL endpoint
    request.open("POST", backend_URL + BE_change_password, true);
    request.setRequestHeader("Content-Type", HDR_content_type_json);
    request.withCredentials = true;
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            var error_type = ChangePasswordError.SUCCESS;
            var data = "{}";

            // Check error on response status
            if (request.status != 200) {
                // Error message
                console.log(`Request failed with status ${request.status}`);
                error_type = ChangePasswordError.FAILURE;
            }
            // Begin accessing JSON data here
            else {
                data = JSON.parse(request.responseText);
                if (!data["success"]) {
                    error_type = stringToChangePasswordError(data["error"]);
                }
            }

            // Replace the password button and remove the lottie, regardless of
            // success/failure
            document.getElementById("update-pw-button").style.display = "block";
            document.getElementById("updatepw-loading-lottie").style.display = "none";

            // Check for failure pulled from above
            if (error_type != ChangePasswordError.SUCCESS) {
                // Display error
                showError(error_type);
                return;
            }

            // Clear text on success, but not on error since they might want to
            // keep their entries there
            document.getElementById("current-pw").value = "";
            document.getElementById("new-pw").value = "";
            document.getElementById("confirm-new-pw").value = "";

            // Remove any error message there was
            showChangePasswordSuccess();

            // Done changing password
            alert("Password successfully changed")
        }
    }

    // Remove submit button in favor of a lottie
    document.getElementById("update-pw-button").style.display = "none";
    document.getElementById("updatepw-loading-lottie").style.display = "block";

    // Send request
    request.send(JSON.stringify(data));
});
