document.getElementById("onboarding-links-continue-button").addEventListener("click", function() {
    // Load the info that we have so far
    var data = JSON.parse(localStorage.getItem("onboard_info"));

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
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status != 200) {
                console.log("Request failed");
                console.log(data)
                return;
            }

            // Begin accessing JSON data here
            var data = JSON.parse(request.responseText);
            if (!data["success"]) {
                console.log(data["message"]);
                return;
            }

            // Go to next onboarding item
            window.location.assign(URL_landing_after_onboarding_links);
        }
    }

    // Send request
    console.log(data)
    request.send(JSON.stringify(data));
});
