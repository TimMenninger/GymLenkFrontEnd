$(document).ready(function() {
    ifLoggedIn(function() {
        window.location.replace(URL_landing_after_login);
        return;
    });
});

$(document).keyup(function(event) {
    if (event.which === 13) {
        document.getElementById("gym-pwreset-button").submit()
    }
});

document.getElementById("gym-pwreset-button").addEventListener("submit", function() {
    // Get email
    var email = document.getElementById("gym-pwreset-email").value;

    // Validity
    if (email === "") {
        alert(forgotPasswordErrorString(ForgotPasswordError.EMAIL_EMPTY));
        return;
    }

    // Create a request variable and assign a new XMLHttpRequest object to
    // it.
    var request = new XMLHttpRequest();

    // Open a new connection, using the POST request on the URL endpoint
    request.open("POST", backend_URL + BE_forgot_password, true);
    request.setRequestHeader("Content-Type", HDR_content_type_json);
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
                alert(forgotPasswordErrorString(stringToForgotPasswordError(data["error"])));
                return;
            }

            alert(forgotPasswordErrorString(ForgotPasswordError.SUCCESS))
        }
    }

    // Send request
    request.send(JSON.stringify({
        "email"    : email
    }));
});
