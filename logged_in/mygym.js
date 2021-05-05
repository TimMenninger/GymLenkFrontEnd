$(document).ready(function() {
    if (!checkLoggedIn()) {
        // Sanity - if no dashboard items, clear everything else to start
        // fresh
        clearState();

        // TODO
        console.log("Not logged in");
        return;
    }

    // Get the dashboard items.  For some, we'll have to massage them so
    // they look how we want for displaying
    var dashboard = JSON.parse(localStorage.getItem("dashboard"));

    // Address came in parts, make it line1 / line2 / city, state zip
    var address_lines = [];
    if ("physical_address" in dashboard) {
        if ("line1" in dashboard["physical_address"]) {
            address_lines.push(dashboard["physical_address"]["line1"])
        }
        if ("line2" in dashboard["physical_address"]) {
            address_lines.push(dashboard["physical_address"]["line2"])
        }
        var city_state_zip = "";
        if ("city" in dashboard["physical_address"]) {
            city_state_zip += dashboard["physical_address"]["city"];
            if ("state" in dashboard["physical_address"] || "zip" in dashboard["physical_address"]) {
                city_state_zip += ", ";
            }
        }
        if ("state" in dashboard["physical_address"]) {
            city_state_zip += dashboard["physical_address"]["state"];
            if ("zip" in dashboard["physical_address"]) {
                city_state_zip += " ";
            }
        }
        if ("zip" in dashboard["physical_address"]) {
            city_state_zip += dashboard["physical_address"]["zip"];
        }
        address_lines.push(city_state_zip);

        address_lines.filter(function (el) {
            return el !== null && el !== "";
        })
    }
    dashboard["formatted_address"] = address_lines.join("\n");

    // Hours. Description of how to interpret array is in dashboard.go
    var hours_list = [];
    for (dow in DaysOfWeek) {
        var day_hours = "[Not Specified]";
        if ("hours" in dashboard) {
            if (dow in dashboard["hours"]) {
                if (dashboard["hours"][dow].length === 1) {
                    if (dashboard["hours"][dow][0] === -1) {
                        day_hours = "Closed";
                    } else if (dashboard["hours"][dow][0] === 0) {
                        day_hours = "24 Hours";
                    }
                } else if (dashboard["hours"][dow].length > 1) {
                    var time_range = "";
                    var time_ranges = [];
                    for (i = 0; i < dashboard["hours"][dow].length; i++) {
                        var hour = dashboard["hours"][dow][i] / 60;
                        var min  = dashboard["hours"][dow][i] % 60;
                        time_range += hour.toString() + ":" + min.toString();
                        if (i % 2 == 0) {
                            time_range += "-";
                        } else {
                            time_ranges.push(time_range);
                            time_range = "";
                        }
                    }
                    day_hours = time_ranges.join(", ");
                }
            }
        }
        hours_list.push(dow + ": " + day_hours);
    }
    dashboard["formatted_hours"] = hours_list.join("\n");

    function setOrHide(element_id, dashboard_key, text_only) {
        if (dashboard_key in dashboard && dashboard[dashboard_key] === "") {
            document.getElementById(element_id).style.display = "none";
        } else if (text_only) {
            document.getElementById(element_id).style.display = "block";
            document.getElementById(element_id).innerText = dashboard[dashboard_key];
        } else {
            document.getElementById(element_id+"-section").style.display = "block";
            document.getElementById(element_id).innerText = dashboard[dashboard_key];
        }

    }

    setOrHide("gym-name2",          "organization_name",    true)
    setOrHide("gym-name3",          "organization_name",    true)
    setOrHide("gym-location3",      "location_name",        true)
    setOrHide("gym-location2",      "location_name",        true)
    setOrHide("gym-phone-number",   "phone_number",         false)
    setOrHide("gym-email",          "email",                false)
    setOrHide("gym-link-website",   "website",              false)
    setOrHide("gym-description",    "description",          false)
    setOrHide("gym-address",        "formatted_address",    false)
    setOrHide("gym-hours",          "formatted_hours",      false)

    function showOrHide(element_id, dashboard_key) {
        document.getElementById(element_id).href = dashboard[dashboard_key]
        if (dashboard[dashboard_key] === "") {
            document.getElementById(element_id).style.display = "none";
        } else {
            document.getElementById(element_id).style.display = "block";
        }
    }

    showOrHide("gym-link-fb",       "facebook");
    showOrHide("gym-link-twitter",  "twitter");
    showOrHide("gym-link-ig",       "instagram");
    showOrHide("gym-link-linkedin", "linkedin");
    showOrHide("gym-link-tiktok",   "tiktok");

    showOrHide("gym-amenities-free-weights",    "has_free_weights");
    showOrHide("gym-amenities-cardio",          "has_cardio");
    showOrHide("gym-amenities-turf",            "has_turf");
    showOrHide("gym-amenities-trx",             "has_trx");
    showOrHide("gym-amenities-bench",           "has_bench_press");
    showOrHide("gym-amenities-squat-rack",      "has_squat_rack");
    showOrHide("gym-amenities-smith-machine",   "has_smith_machine");
    showOrHide("gym-amenities-pt",              "has_training");
    showOrHide("gym-amenities-outdoor",         "has_outdoor");
    showOrHide("gym-amenities-showers",         "has_showers");
    showOrHide("gym-amenities-lockers",         "has_lockers");
    showOrHide("gym-amenities-wifi",            "has_wifi");
    showOrHide("gym-amenities-classes",         "has_classes");
    showOrHide("gym-amenities-spinning",        "has_spinning");
    showOrHide("gym-amenities-pool",            "has_pool");
    showOrHide("gym-amenities-hot-tub",         "has_hot_tub");
    showOrHide("gym-amenities-sauna",           "has_sauna");
    showOrHide("gym-amenities-basketball",      "has_basketball");
})
