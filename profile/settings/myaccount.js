$(document).ready(function() {
    // If not logged in, go back to sign in
    ifNotLoggedIn(function() {
        clearState();
        window.location.replace(URL_landing_after_involuntary_logout());
        return;
    });

    // Set email address for acocunt email
    var email = localStorage.getItem("account_email");
    document.getElementById("gym-account-email").innerText = email;
});

clickSubmitOnPressEnter("current-pw", "update-pw-button");
clickSubmitOnPressEnter("new-pw", "update-pw-button");
clickSubmitOnPressEnter("confirm-new-pw", "update-pw-button");

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
    hideErrors();

    // New password and confirmation must match
    if (current_password === "") {
        showError(ChangePasswordError.PASSWORD_EMPTY);
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
            let { _, error } = parseResponse(request, ErrorInfo.ChangePasswordError, SubmitButton.SaveAccountSettings);

            if (error === ChangePasswordError.SUCCESS) {
                // Clear text on success, but not on error since they might want
                // to keep their entries there
                document.getElementById("current-pw").value = "";
                document.getElementById("new-pw").value = "";
                document.getElementById("confirm-new-pw").value = "";
            }
        }
    }

    // Remove submit button in favor of a lottie
    showLoadingLottie(SubmitButton.SaveAccountSettings);

    // Send request
    request.send(JSON.stringify(data));
});
