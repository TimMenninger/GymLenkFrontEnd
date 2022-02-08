$(document).ready(function() {
    // If not logged in, go back to sign in
    ifNotLoggedIn(function() {
        clearState();
        window.location.replace(URL_landing_after_involuntary_logout());
        return;
    });

    // Hack for making the selection bar on the left highlight "settings" for
    // this tab within settings
    var Webflow = Webflow || [];
    Webflow.push(function() {
        $('#settings-sidebar-link').addClass("w--current");
    });
});

document.getElementById("link-gmb-button").addEventListener("click", function() {
    auth2.grantOfflineAccess().then(function(auth_result) {
        if (auth_result["code"]) {
            var auth_code = auth_result["code"];

            // Create a request variable and assign a new XMLHttpRequest object to
            // it.
            var request = new XMLHttpRequest();

            // Open a new connection, using the POST request on the URL endpoint
            request.open("POST", backend_URL + BE_set_gapi_auth_code, true);
            request.setRequestHeader("Content-Type", HDR_content_type_json);
            request.withCredentials = true;
            request.onreadystatechange = function () {
                if (request.readyState === 4) {
                    // Store the access token for getting and setting Google My
                    // Business info
                    console.log(request)
                }
            }

            // Send to backend
            request.send(JSON.stringify({
                "auth_code" : auth_result["code"]
            }));
        } else {
            alert("error");
        }
    });
});
