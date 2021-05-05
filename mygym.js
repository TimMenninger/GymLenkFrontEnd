$(document).ready(function() {
    if (!loggedIn()) {
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
    var address = "[No Address]";
    if ("address" in dashboard) {
        var address_lines = [];
        if ("line1" in dashboard["address"]) {
            address_lines.push(dashboard["address"]["line1"])
        }
        if ("line2" in dashboard["address"]) {
            address_lines.push(dashboard["address"]["line2"])
        }
        if ("city" in dashboard["address"] && "state" in dashboard["address"] && "zip" in dashboard["address"]) {
            address_lines.push(dashboard["address"]["city"] + ", " + dashboard["address"]["state"] + " " + dashboard["address"]["zip"]);
        }

        address_lines.filter(function (el) {
            return el !== null && el !== "";
        })

        if (address_lines.length > 0) {
            address = address_lines.join("\n");
        }
    }

    // Hours. Description of how to interpret array is in dashboard.go
    var hours = "[Not Specified]";
    if ("hours" in dashboard) {
        hours_list = [];
        sunday_hours = "[Not Specified]";
        if ("Sunday" in dashboard["hours"]) {
            if (dashboard["hours"]["Sunday"].length === 1) {
                if (dashboard["hours"]["Sunday"][0] === -1) {
                    sunday_hours = "Closed";
                } else if (dashboard["hours"]["Sunday"][0] === 0) {
                    sunday_hours = "24 Hours";
                }
            } else if (dashboard["hours"]["Sunday"].length > 1) {
                // TODO
            }
        }
        hours_list.push("Sunday: " + sunday_hours);
    }

    function setOrHide(element_id, dashboard_key) {
        if (dashboard_key in dashboard && dashboard[dashboard_key] === "") {
            document.getElementById(element_id).style.display = "none";
        } else {
            document.getElementById(element_id).style.display = "block";
            document.getElementById(element_id).innerText = dashboard[dashboard_key];
        }

    }

    dashboard["formatted_address"] = address;
    dashboard["formatted_hours"] = "";

    setOrHide("gym-name2",          "organizationName")
    setOrHide("gym-name3",          "organizationName")
    setOrHide("gym-location3",      "locationName")
    setOrHide("gym-location2",      "locationName")
    setOrHide("gym-phone-number",   "phone")
    setOrHide("gym-email",          "email")
    setOrHide("gym-link-website",   "website")
    setOrHide("gym-description",    "description")
    setOrHide("gym-address",        "formatted_address")
    setOrHide("gym-hours",          "formatted_hours")

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
