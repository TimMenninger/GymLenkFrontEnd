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

    // New password and confirmation must match
    var pw_err = checkPasswordRequirements(new_password, conf_new_password);
    if (pw_err != PasswordError.SUCCESS) {
        alert(passwordErrorString(error));
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
            document.getElementById("new-pw").value = "";
            document.getElementById("confirm-new-pw").value = "";
            if (request.status != 200) {
                alert(`Request failed with status ${request.status}`);
                return;
            }

            // Begin accessing JSON data here
            var data = JSON.parse(request.responseText);
            if (!data["success"]) {
                alert(data["message"]);
                return;
            }

            // Done changing password
            alert("Password successfully changed")
            document.getElementById("current-pw").value = "";
        }
    }

    // Send request
    request.send(JSON.stringify(data));
});
