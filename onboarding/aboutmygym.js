$(document).ready(function() {
    /* Format phone number */
    const inputElement = document.getElementById("onboarding-edit-phone");
    inputElement.addEventListener("keydown", enforceFormat);
    inputElement.addEventListener("keyup", formatToPhone);
})

document.getElementById("onboarding-about-continue-button").addEventListener("click", function() {
    var data = {};

    // Get gym info
    data["organization_name"]   = document.getElementById("onboarding-gym-name").value;
    data["location_name"]       = document.getElementById("onboarding-location-name").value;
    data["address_line_1"]      = document.getElementById("onboarding-address1").value;
    data["address_line_2"]      = document.getElementById("onboarding-address2").value;
    data["zip"]                 = document.getElementById("onboarding-zip").value;
    data["phone"]               = ('' + document.getElementById("onboarding-phone").value).replace(/\D/g, '');
    data["email"]               = document.getElementById("onboarding-email").value;
    data["description"]         = document.getElementById("onboarding-description").value;
    data["hours"]               = {};

    // Gym hours
    const days_of_week = [ "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday" ]
    for (const dow of days_of_week) {
        var is_24h     = document.getElementById("24h-" + dow + "-onboarding-checkbox").value;
        var is_closed  = document.getElementById("closed-" + dow + "-onboarding-checkbox").value;
        var open_time  = document.getElementById("onboarding-hours-" + dow + "-open").value;
        var close_time = document.getElementById("onboarding-hours-" + dow + "-close").value;

        // Sanitize open time
        if (open_time === "") {
            open_time = "00:00";
        }

        data["hours"][dow] = [];
        if (is_24h) {
            data["hours"][dow] = [ 0 ];
        } else if (is_closed) {
            data["hours"][dow] = [];
        } else {
            data["hours"][dow].push(Date.parse("01 Jan 1970 " + open_time + ":00 GMT"))
            if (close_time !== "") {
                data["hours"][dow].push(Date.parse("01 Jan 1970 " + close_time + ":00 GMT"))
            }
        }
    }

    // Store for later.  We don't use the info till we have it all
    localStorage.setItem("onboard_info", JSON.stringify(data));

    // Go to next onboarding item
    window.location.assign(URL_landing_after_onboarding_aboutmygym);
});
