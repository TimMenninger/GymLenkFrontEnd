$(document).ready(function() {
    // Don't do links until after about gym and amenities
    if (localStorage.getItem("onboarding_aboutyourgym") !== "done") {
        window.location.replace(URL_onboarding_aboutmygym);
    }
    if (localStorage.getItem("onboarding_amenities") !== "done") {
        window.location.replace(URL_onboarding_aboutmygym);
    }
});

document.getElementById("onboarding-links-continue-button").addEventListener("click", function() {
    // Load the info that we have so far
    var data = JSON.parse(localStorage.getItem("onboard_info"));

    // Session ID so the backend knows we're logged on
    data["session_id"]  = localStorage.getItem("session_id");

    // Insert links
    data["website"]     = document.getElementById("gym-website-link").value;
    data["facebook"]    = document.getElementById("gym-facebook-link").value;
    data["instagram"]   = document.getElementById("gym-instagram-link").value;
    data["linkedin"]    = document.getElementById("gym-linkedin-link").value;
    data["tiktok"]      = document.getElementById("gym-tiktok-link").value;
    data["yelp"]        = document.getElementById("gym-yelp-link").value;
    data["twitter"]     = document.getElementById("gym-twitter-handle").value;

    // Store for later.  We don't use the info till we have it all
    localStorage.setItem("onboard_info", JSON.stringify(data));

    // Create a request variable and assign a new XMLHttpRequest object to
    // it.
    var request = new XMLHttpRequest();

    // Open a new connection, using the POST request on the URL endpoint
    request.open("POST", backend_URL + BE_onboard, true);
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

            // Done onboarding
            storeDashboardData(data["dashboard"]);
            window.location.assign(URL_landing_after_onboarding_links);
        }
    }

    // Send request
    request.send(JSON.stringify(data));
});
