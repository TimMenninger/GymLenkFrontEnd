$(document).ready(function() {
    if (!checkLoggedIn()) {
        // Sanity - if no dashboard items, clear everything else to start
        // fresh
        clearState();
        return;
    }

    var data = JSON.parse(localStorage.getItem("dashboard"));

    // Get gym info
    document.getElementById("gym-edit-name").value = data["organization_name"];
    document.getElementById("gym-edit-location").value = data["location_name"];
    document.getElementById("gym-edit-address").value = data["physical_address"]["line1"];
    document.getElementById("gym-edit-address2").value = data["physical_address"]["line2"];
    document.getElementById("gym-edit-zip").value = data["physical_address"]["zip"];
    document.getElementById("gym-edit-phone").value = data["formatted_phone_number"];
    document.getElementById("gym-edit-email").value = data["email"];
    document.getElementById("gym-edit-description").value = data["description"];

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

        document.getElementById("gym-edit-hours-" + dow + "-open").value = open;
        document.getElementById("gym-edit-hours-" + dow + "-close").value = close;

        if (document.getElementById("24h-" + dow + "-gym-edit-checkbox").checked != is_24h) {
            document.getElementById("24h-" + dow + "-gym-edit-checkbox").click();
        }
        if (document.getElementById("closed-" + dow + "-gym-edit-checkbox").checked != is_closed) {
            document.getElementById("closed-" + dow + "-gym-edit-checkbox").click();
        }
        if (open !== "" || close !== "") {
            document.getElementById("24h-" + dow + "-gym-edit-checkbox").disabled    = true;
            document.getElementById("closed-" + dow + "-gym-edit-checkbox").disabled = true;
        }
    }

    /* Amenities checkboxes */
    if (document.getElementById("edit-gym-amenities-free-weights").checked != data["has_free_weights"]) {
        document.getElementById("edit-gym-amenities-free-weights").click();
    }
    if (document.getElementById("edit-gym-amenities-cardio").checked != data["has_cardio"]) {
        document.getElementById("edit-gym-amenities-cardio").click();
    }
    if (document.getElementById("edit-gym-amenities-spinning").checked != data["has_spinning"]) {
        document.getElementById("edit-gym-amenities-spinning").click();
    }
    if (document.getElementById("edit-gym-amenities-classes").checked != data["has_classes"]) {
        document.getElementById("edit-gym-amenities-classes").click();
    }
    if (document.getElementById("edit-gym-amenities-squat-rack").checked != data["has_squat_rack"]) {
        document.getElementById("edit-gym-amenities-squat-rack").click();
    }
    if (document.getElementById("edit-gym-amenities-smith-machine").checked != data["has_smith_machine"]) {
        document.getElementById("edit-gym-amenities-smith-machine").click();
    }
    if (document.getElementById("edit-gym-amenities-bench-press").checked != data["has_bench_press"]) {
        document.getElementById("edit-gym-amenities-bench-press").click();
    }
    if (document.getElementById("edit-gym-amenities-trx").checked != data["has_trx"]) {
        document.getElementById("edit-gym-amenities-trx").click();
    }
    if (document.getElementById("edit-gym-amenities-pt").checked != data["has_pt"]) {
        document.getElementById("edit-gym-amenities-pt").click();
    }
    if (document.getElementById("edit-gym-amenities-turf").checked != data["has_turf"]) {
        document.getElementById("edit-gym-amenities-turf").click();
    }
    if (document.getElementById("edit-gym-amenities-outdoor").checked != data["has_outdoor"]) {
        document.getElementById("edit-gym-amenities-outdoor").click();
    }
    if (document.getElementById("edit-gym-amenities-wifi").checked != data["has_wifi"]) {
        document.getElementById("edit-gym-amenities-wifi").click();
    }
    if (document.getElementById("edit-gym-amenities-showers").checked != data["has_showers"]) {
        document.getElementById("edit-gym-amenities-showers").click();
    }
    if (document.getElementById("edit-gym-amenities-lockers").checked != data["has_lockers"]) {
        document.getElementById("edit-gym-amenities-lockers").click();
    }
    if (document.getElementById("edit-gym-amenities-pool").checked != data["has_pool"]) {
        document.getElementById("edit-gym-amenities-pool").click();
    }
    if (document.getElementById("edit-gym-amenities-hot-tub").checked != data["has_hot_tub"]) {
        document.getElementById("edit-gym-amenities-hot-tub").click();
    }
    if (document.getElementById("edit-gym-amenities-sauna").checked != data["has_sauna"]) {
        document.getElementById("edit-gym-amenities-sauna").click();
    }
    if (document.getElementById("edit-gym-amenities-basketball").checked != data["has_basketball"]) {
        document.getElementById("edit-gym-amenities-basketball").click();
    }

    /* Links */
    document.getElementById("gym-edit-website").value   = data["website"];
    document.getElementById("gym-edit-facebook").value  = data["facebook"];
    document.getElementById("gym-edit-instagram").value = data["instagram"];
    document.getElementById("gym-edit-linkedin").value  = data["linkedin"];
    document.getElementById("gym-edit-tiktok").value    = data["tiktok"];
    document.getElementById("gym-edit-yelp").value      = data["yelp"];
    document.getElementById("gym-edit-twitter").value   = data["twitter"];
})

/* Format phone number */
const inputElement = document.getElementById("gym-edit-phone");
inputElement.addEventListener("keydown", enforceFormat);
inputElement.addEventListener("keyup", formatToPhone);

// Hours checkboxes
for (const raw_dow of DaysOfWeek) {
    (function () {
        var dow = raw_dow.toLowerCase();
        document.getElementById("24h-" + dow + "-gym-edit-checkbox").addEventListener("change", function() {
            document.getElementById("closed-" + dow + "-gym-edit-checkbox").disabled = this.checked;
            document.getElementById("gym-edit-hours-" + dow + "-open").disabled = this.checked;
            document.getElementById("gym-edit-hours-" + dow + "-close").disabled = this.checked;
        });
        document.getElementById("closed-" + dow + "-gym-edit-checkbox").addEventListener("change", function() {
            document.getElementById("24h-" + dow + "-gym-edit-checkbox").disabled = this.checked;
            document.getElementById("gym-edit-hours-" + dow + "-open").disabled = this.checked;
            document.getElementById("gym-edit-hours-" + dow + "-close").disabled = this.checked;
        });
    }()); // Immediate invocation
}

document.getElementById("save-changes-my-gym-button").addEventListener("click", function() {
    // Load the info that we have so far
    var data = JSON.parse(localStorage.getItem("dashboard"));

    // Session ID so the backend knows we're logged on
    data["session_id"]  = localStorage.getItem("session_id");

    // Get gym info
    data["organization_name"]   = document.getElementById("gym-edit-name").value;
    data["location_name"]       = document.getElementById("gym-edit-location").value;
    data["physical_address"]    = {
        line1   : document.getElementById("gym-edit-address").value,
        line2   : document.getElementById("gym-edit-address2").value,
        zip     : document.getElementById("gym-edit-zip").value
    };
    data["phone_number"]               = ('' + document.getElementById("gym-edit-phone").value).replace(/\D/g, '');
    data["email"]               = document.getElementById("gym-edit-email").value;
    data["description"]         = document.getElementById("gym-edit-description").value;
    data["hours"]               = {};

    // Gym hours
    for (const raw_dow of DaysOfWeek) {
        var dow        = raw_dow.toLowerCase();

        var is_24h     = document.getElementById("24h-" + dow + "-gym-edit-checkbox").checked;
        var is_closed  = document.getElementById("closed-" + dow + "-gym-edit-checkbox").checked;
        var open_time  = document.getElementById("gym-edit-hours-" + dow + "-open").value;
        var close_time = document.getElementById("gym-edit-hours-" + dow + "-close").value;

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

    /* Amenities checkboxes */
    data["has_free_weights"]    = document.getElementById("edit-gym-amenities-free-weights").checked;
    data["has_cardio"]          = document.getElementById("edit-gym-amenities-cardio").checked;
    data["has_spinning"]        = document.getElementById("edit-gym-amenities-spinning").checked;
    data["has_classes"]         = document.getElementById("edit-gym-amenities-classes").checked;
    data["has_squat_rack"]      = document.getElementById("edit-gym-amenities-squat-rack").checked;
    data["has_smith_machine"]   = document.getElementById("edit-gym-amenities-smith-machine").checked;
    data["has_bench_press"]     = document.getElementById("edit-gym-amenities-bench-press").checked;
    data["has_trx"]             = document.getElementById("edit-gym-amenities-trx").checked;
    data["has_pt"]              = document.getElementById("edit-gym-amenities-pt").checked;
    data["has_turf"]            = document.getElementById("edit-gym-amenities-turf").checked;
    data["has_outdoor"]         = document.getElementById("edit-gym-amenities-outdoor").checked;
    data["has_wifi"]            = document.getElementById("edit-gym-amenities-wifi").checked;
    data["has_showers"]         = document.getElementById("edit-gym-amenities-showers").checked;
    data["has_lockers"]         = document.getElementById("edit-gym-amenities-lockers").checked;
    data["has_pool"]            = document.getElementById("edit-gym-amenities-pool").checked;
    data["has_hot_tub"]         = document.getElementById("edit-gym-amenities-hot-tub").checked;
    data["has_sauna"]           = document.getElementById("edit-gym-amenities-sauna").checked;
    data["has_basketball"]      = document.getElementById("edit-gym-amenities-basketball").checked;

    // Insert links
    data["website"]     = document.getElementById("gym-edit-website").value;
    data["facebook"]    = document.getElementById("gym-edit-facebook").value;
    data["instagram"]   = document.getElementById("gym-edit-instagram").value;
    data["linkedin"]    = document.getElementById("gym-edit-linkedin").value;
    data["tiktok"]      = document.getElementById("gym-edit-tiktok").value;
    data["yelp"]        = document.getElementById("gym-edit-yelp").value;
    data["twitter"]     = document.getElementById("gym-edit-twitter").value;

    // Create a request variable and assign a new XMLHttpRequest object to
    // it.
    var request = new XMLHttpRequest();

    // Open a new connection, using the POST request on the URL endpoint
    request.open("POST", backend_URL + BE_set_dashboard_info, true);
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

            // Done Editing
            storeDashboardData(data["dashboard"]);
            alert("Update successful");
        }
    }

    // Send request
    request.send(JSON.stringify(data));
});

