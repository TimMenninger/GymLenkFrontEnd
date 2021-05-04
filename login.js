document.getElementById("gym-login-button").addEventListener("click", function() {
    // Get email and password
    var email    = document.getElementById("gym-login-email").value;
    var password = document.getElementById("gym-login-password").value;

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

            // Success - go to dashboard if the account is complete, or to
            // onboarding if they must still set things up
            localStorage.setItem("logged_in", "true");

            // Store the session ID, which must be used with subsequent requests
            localStorage.setItem("session_id", data["session_id"].toString());

            if ("dashboard" in data && "locationId" in data["dashboard"]) {
                localStorage.setItem("dashboard", JSON.stringify(data["dashboard"]));
                window.location.replace(URL_landing_after_login);
            } else {
                window.location.replace(URL_landing_after_signup);
            }
        }
    }

    // Send request
    request.send(JSON.stringify({
        "email"    : email,
        "password" : password
    }));
});
