$(document).ready(function() {
    // Shorthand
    const days_of_week = [ "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday" ]

    // Load the info that we have so far and replace items (if applicable)
    if (localStorage.getItem("onboard_info") !== null) {
        var data = JSON.parse(localStorage.getItem("onboard_info"));

        // Get gym info
        document.getElementById("onboarding-gym-name").value = data["organization_name"];
        document.getElementById("onboarding-location-name").value = data["location_name"];
        document.getElementById("onboarding-address1").value = data["physical_address"]["line1"];
        document.getElementById("onboarding-address2").value = data["physical_address"]["line2"];
        document.getElementById("onboarding-zip").value = data["physical_address"]["zip"];
        document.getElementById("onboarding-phone").value = formatToPhone(data["phone"]);
        document.getElementById("onboarding-email").value = data["email"];
        document.getElementById("onboarding-description").value = data["description"];
    }

    // Format phone number
    document.getElementById("onboarding-phone").addEventListener("keydown", enforceFormat);
    document.getElementById("onboarding-phone").addEventListener("keyup", formatToPhone);

    // Hours checkboxes
    for (const dow of days_of_week) {
        document.getElementById("24h-" + dow + "-onboarding-checkbox").addEventListener("change", function() {
            document.getElementById("closed-" + dow + "-onboarding-checkbox").disabled = this.checked;
            document.getElementById("onboarding-hours-" + dow + "-open").disabled = this.checked;
            document.getElementById("onboarding-hours-" + dow + "-close").disabled = this.checked;
        });
        document.getElementById("closed-" + dow + "-onboarding-checkbox").addEventListener("change", function() {
            document.getElementById("24h-" + dow + "-onboarding-checkbox").disabled = this.checked;
            document.getElementById("onboarding-hours-" + dow + "-open").disabled = this.checked;
            document.getElementById("onboarding-hours-" + dow + "-close").disabled = this.checked;
        });
        document.getElementById("onboarding-hours-" + dow + "-open").addEventListener("change", function(event) {
            document.getElementById("24h-" + dow + "-onboarding-checkbox").disabled = (event.target.value !== "");
            document.getElementById("closed-" + dow + "-onboarding-checkbox").disabled = (event.target.value !== "");
        });
        document.getElementById("onboarding-hours-" + dow + "-close").addEventListener("change", function(event) {
            document.getElementById("24h-" + dow + "-onboarding-checkbox").disabled = (event.target.value !== "");
            document.getElementById("closed-" + dow + "-onboarding-checkbox").disabled = (event.target.value !== "");
        });
    }
});

document.getElementById("onboarding-about-continue-button").addEventListener("click", function() {
    var data = {};

    // Get gym info
    data["organization_name"]   = document.getElementById("onboarding-gym-name").value;
    data["location_name"]       = document.getElementById("onboarding-location-name").value;
    data["physical_address"]    = {
        line1   : document.getElementById("onboarding-address1").value,
        line2   : document.getElementById("onboarding-address2").value,
        zip     : document.getElementById("onboarding-zip").value
    };
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
    localStorage.setItem("onboarding_aboutyourgym", "done")
    window.location.assign(URL_landing_after_onboarding_aboutmygym);
});
