$(document).ready(function() {
    if (!checkLoggedIn()) {
        // Sanity - if no dashboard items, clear everything else to start
        // fresh
        clearState();

        // TODO
        console.log("Not logged in");
        return;
    }
})

document.getElementById("update-pw-button").addEventListener("click", function() {
    // Send to backend the current password and the new one
    var current_password  = document.getElementById("current-pw").value;
    var new_password      = document.getElementById("new-pw").value;
    var conf_new_password = document.getElementById("confirm-new-pw").value;
    var data = {
        current_password:   current_password,
        new_password:       new_password
    };

    // New password and confirmation must match
    var pw_err = checkPasswordRequirements(new_password, conf_new_password);
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
    request.open("POST", backend_URL + BE_change_password, true);
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

            // Done changing password
            alert("Password successfully changed")
        }
    }

    // Send request
    request.send(JSON.stringify(data));
});
