$(document).ready(function() {
    // Don't do links until after about gym and amenities
    if (localStorage.getItem("onboarding_aboutyourgym") !== "done") {
        window.location.replace(URL_onboarding_aboutmygym);
    }
    if (localStorage.getItem("onboarding_amenities") !== "done") {
        window.location.replace(URL_onboarding_aboutmygym);
    }

    // Load the info that we have so far and replace items (if applicable)
    if (localStorage.getItem("onboard_info") !== null) {
        var data = JSON.parse(localStorage.getItem("onboard_info"));

        // Get gym info
        document.getElementById("Gym-Website-Link-4").value = data["website"];
        document.getElementById("Gym-Facebook-Link").value = data["facebook"];
        document.getElementById("Gym-Instagram-Link").value = data["instagram"];
        document.getElementById("Gym-LinkedIn-Link").value = data["linkedin"];
        document.getElementById("Gym-TikTok").value = data["tiktok"];
        document.getElementById("Gym-Yelp-Link").value = data["yelp"];
    }
});

document.getElementById("onboarding-links-continue-button").addEventListener("click", function() {
    // Load the info that we have so far
    var data = JSON.parse(localStorage.getItem("onboard_info"));

    // Session ID so the backend knows we're logged on
    data["session_id"]  = localStorage.getItem("session_id");

    // Insert links
    data["website"]     = document.getElementById("Gym-Website-Link-4").value;
    data["facebook"]    = document.getElementById("Gym-Facebook-Link").value;
    data["instagram"]   = document.getElementById("Gym-Instagram-Link").value;
    data["linkedin"]    = document.getElementById("Gym-LinkedIn-Link").value;
    data["tiktok"]      = document.getElementById("Gym-TikTok").value;
    data["yelp"]        = document.getElementById("Gym-Yelp-Link").value;
    data["twitter"]     = ""; // document.getElementById("Gym-Twitter-Handle").value;

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
