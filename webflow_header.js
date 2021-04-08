//
// USED EXAMPLE FROM:
// https://gts-webflow-playground.webflow.io/samples/fetch-data-from-external-api-to-webflow
//

<script>
    ////////////////////////////////////////////////////////////////////////////
    //
    // CONSTANTS
    //

    // Endpoints
    var EP_sign_in = "/sign-in";

    // Request Headers
    var HDR_content_type_json = "application/json; charset=UTF-8";

    // Backend URL
    var host = "http://127.0.0.1";
    var port = "8181";
    var backend_URL = host.concat(":").concat(port);

    ////////////////////////////////////////////////////////////////////////////
    //
    // GLOBALS
    //

    var logged_in = false;
    var dashboard = null;

    ////////////////////////////////////////////////////////////////////////////
    //
    // LOG IN
    //

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
                dashboard = data["dashboard"];
                console.log("success");
            }
        }

        // Send request
        request.send(JSON.stringify({
            "email"    : email,
            "password" : password
        }));
    })

    ////////////////////////////////////////////////////////////////////////////
    //
    // LOG OUT
    //

    ////////////////////////////////////////////////////////////////////////////
    //
    // DASHBOARD
    //

    $(document).ready(function() {
        console.log("HI");
    })
</script>
