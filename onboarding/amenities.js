$(document).ready(function() {
    // Don't do amenities until after done about gym
    if (localStorage.getItem("onboarding_aboutyourgym") !== "done") {
        window.location.replace(URL_onboarding_aboutmygym);
    }
});

document.getElementById("onboarding-amenities-continue-button").addEventListener("click", function() {
    // Load the info that we have so far
    var data = JSON.parse(localStorage.getItem("onboard_info"));

    // Store for later.  We don't use the info till we have it all
    localStorage.setItem("onboard_info", JSON.stringify(data));

    // Go to next onboarding item
    localStorage.setItem("onboarding_amenities", "done");
    window.location.assign(URL_landing_after_onboarding_amenities);
});
