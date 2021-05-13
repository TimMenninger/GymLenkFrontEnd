$(document).ready(function() {
    ifLoggedIn(function() {
        window.location.replace(URL_landing_after_login);
        return;
    });

    // Get the password key from the URL so we can check that it exists and is
    // not expired
    const urlParams = new URLSearchParams(window.location.search);
    var password_key = urlParams.get("key");

    // Create a request variable and assign a new XMLHttpRequest object to
    // it.
    var request = new XMLHttpRequest();

    // Open a new connection, using the POST request on the URL endpoint
    request.open("GET", backend_URL + BE_check_password_key + "?key=" + password_key, true);
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
                alert(data["message"]);
                window.location.replace(FE_forgot_password);
                return;
            }
        }
    }

    // Send request
    request.send(null);
});

document.getElementById("gym-pwrecover-button").addEventListener("click", function() {
    // Get the password key from the URL
    const urlParams = new URLSearchParams(window.location.search);
    var password_key = urlParams.get("key");

    // Get email and password
    var password      = document.getElementById("gym-pwrecover-pw").value;
    var conf_password = document.getElementById("gym-pwrecover-confirmpw").value;

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
    request.open("POST", backend_URL + BE_sign_in, true);
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

            alert("Password successfully changed")
        }
    }

    // Send request
    request.send(JSON.stringify({
        "email"    : email,
        "password" : password
    }));
});
