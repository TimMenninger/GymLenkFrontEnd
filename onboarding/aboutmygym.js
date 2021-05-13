$(document).ready(function() {
    // If logged in, don't allow onboarding
    ifLoggedIn(function() {
        window.location.replace(URL_landing_after_login);
        return;
    })

    // Load the info that we have so far and replace items (if applicable)
    if (localStorage.getItem("onboard_info") !== null) {
        var data = JSON.parse(localStorage.getItem("onboard_info"));

        // Get gym info
        document.getElementById("onboarding-gym-name").value = data["organization_name"];
        document.getElementById("onboarding-location-name").value = data["location_name"];
        document.getElementById("onboarding-address1").value = data["physical_address"]["line1"];
        document.getElementById("onboarding-address2").value = data["physical_address"]["line2"];
        document.getElementById("onboarding-zip").value = data["physical_address"]["zip"];
        document.getElementById("onboarding-phone").value = formatPhoneNumber(data["phone_number"]);
        document.getElementById("onboarding-email").value = data["email"];
        document.getElementById("onboarding-description").value = data["description"];

        for (const raw_dow of DaysOfWeek) {
            var dow = raw_dow.toLowerCase();

            var is_24h = false;
            var is_closed = false;
            var open = "";
            var close = "";
            if (data["hours"][dow].length == 1) {
                if (data["hours"][dow][0] == 0) {
                    is_24h = true;
                } else if (data["hours"][dow][0] < 0) {
                    is_closed = true;
                }
            }
            if (!is_24h && !is_closed && data["hours"][dow].length >= 1) {
                var mins = data["hours"][dow][0] / 60 / 1000;
                open = (mins / 60).toString().padStart(2, '0') + ":" + (mins % 60).toString().padStart(2, '0');
            }
            if (data["hours"][dow].length > 1) {
                var mins = data["hours"][dow][1] / 60 / 1000;
                close = (mins / 60).toString().padStart(2, '0') + ":" + (mins % 60).toString().padStart(2, '0');
            }

            document.getElementById("onboarding-hours-" + dow + "-open").value = open;
            document.getElementById("onboarding-hours-" + dow + "-close").value = close;

            if (document.getElementById("24h-" + dow + "-onboarding-checkbox").checked != is_24h) {
                document.getElementById("24h-" + dow + "-onboarding-checkbox").click();
            }
            if (document.getElementById("closed-" + dow + "-onboarding-checkbox").checked != is_closed) {
                document.getElementById("closed-" + dow + "-onboarding-checkbox").click();
            }
        }
    }
});

// Format phone number
document.getElementById("onboarding-phone").addEventListener("keydown", enforceFormat);
document.getElementById("onboarding-phone").addEventListener("keyup", formatToPhone);

// Hours checkboxes
for (const raw_dow of DaysOfWeek) {
    (function() {
        var dow = raw_dow.toLowerCase();
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
    }()); // Immediate invocation
}

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
    data["phone_number"]        = ('' + document.getElementById("onboarding-phone").value).replace(/\D/g, '');
    data["email"]               = document.getElementById("onboarding-email").value;
    data["description"]         = document.getElementById("onboarding-description").value;
    data["hours"]               = {};

    // Gym hours
    for (const raw_dow of DaysOfWeek) {
        var dow        = raw_dow.toLowerCase();

        var is_24h     = document.getElementById("24h-" + dow + "-onboarding-checkbox").checked;
        var is_closed  = document.getElementById("closed-" + dow + "-onboarding-checkbox").checked;
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
            data["hours"][dow] = [ -1 ];
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

