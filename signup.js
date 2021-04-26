<script>
    document.getElementById("gym-sign-up-button").addEventListener("click", function() {
        // Get email and password
        var email         = document.getElementById("gym-sign-up-email").value;
        var password      = document.getElementById("gym-sign-up-pw").value;
        var conf_password = document.getElementById("gym-sign-up-confirmpw").value;

        // Create a request variable and assign a new XMLHttpRequest object to
        // it.
        var request = new XMLHttpRequest();

        // Open a new connection, using the POST request on the URL endpoint
        request.open("POST", backend_URL + BE_create_account, true);
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
                localStorage.setItem("account_id", data["account_id"]);
                window.location.replace(URL_landing_after_signup);
            }
        }

        // Send request
        request.send(JSON.stringify({
            "email"    : email,
            "password" : password
        }));
    });
</script>
