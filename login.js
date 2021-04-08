<script>
    document.getElementById("gym-login-button").addEventListener("click", function() {
        // Get email and password
        var email    = document.getElementById("gym-login-email").value;
        var password = document.getElementById("gym-login-password").value;

        // Create a request variable and assign a new XMLHttpRequest object to it.
        var request = new XMLHttpRequest();

        // Open a new connection, using the POST request on the URL endpoint
        request.open("POST", backend_URL.concat(EP_sign_in), true);
        request.setRequestHeader("Content-Type", HDR_content_type_json);
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

                // Success
                // TODO
                logged_in = true;
                localStorage.setItem("dashboard", JSON.stringify(data["dashboard"]))
                console.log("success");
            }
        }

        // Send request
        request.send(JSON.stringify({
            "email"    : email,
            "password" : password
        }));
    })
</script>
