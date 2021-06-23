$(document).ready(function() {
    // If not logged in, go back to sign in
    ifNotLoggedIn(function() {
        clearState();
        window.location.replace(URL_log_in);
        return;
    });

    // Get the dashboard items.  For some, we'll have to massage them so
    // they look how we want for displaying
    var dashboard = JSON.parse(localStorage.getItem("dashboard"));

    // Fix links
    dashboard["website-fixed"]      = "http://" + dashboard["website"];
    dashboard["facebook-fixed"]     = "https://www.facebook.com/" + dashboard["facebook"];
    dashboard["twitter-fixed"]      = "https://www.twitter.com/" + dashboard["twitter"];
    dashboard["instagram-fixed"]    = "https://www.instagram.com/" + dashboard["instagram"];
    dashboard["linkedin-fixed"]     = "https://www.linkedin.com/in/" + dashboard["linkedin"];
    dashboard["tiktok-fixed"]       = "https://www.tiktok.com/@" + dashboard["tiktok"];
    dashboard["yelp-fixed"]         = "https://www.yelp.com/biz/" + dashboard["yelp"];

    if (dashboard["website"] === "") {
        dashboard["website-fixed"] = "";
    }
    if (dashboard["facebook"] === "") {
        dashboard["facebook-fixed"] = "";
    }
    if (dashboard["twitter"] === "") {
        dashboard["twitter-fixed"] = "";
    }
    if (dashboard["instagram"] === "") {
        dashboard["instagram-fixed"] = "";
    }
    if (dashboard["linkedin"] === "") {
        dashboard["linkedin-fixed"] = "";
    }
    if (dashboard["tiktok"] === "") {
        dashboard["tiktok-fixed"] = "";
    }
    if (dashboard["yelp"] === "") {
        dashboard["yelp-fixed"] = "";
    }

    function setOrHide(element_id, dashboard_key, text_only) {
        if (dashboard_key in dashboard && dashboard[dashboard_key] === "") {
            document.getElementById(element_id).style.display = "none";
            if (!text_only) {
                document.getElementById(element_id+"-section").style.display = "none";
            }
        } else {
            var suffix = text_only ? "" : "-section";
            document.getElementById(element_id+suffix).style.display = "block";
            document.getElementById(element_id).innerText = dashboard[dashboard_key];
        }
    }

    setOrHide("gym-name2",          "organization_name",        true)
    setOrHide("gym-name3",          "organization_name",        true)
    setOrHide("gym-location3",      "location_name",            true)
    setOrHide("gym-location2",      "location_name",            true)
    setOrHide("gym-phone-number",   "formatted_phone_number",   false)
    setOrHide("gym-email",          "email",                    false)
    setOrHide("gym-link-website",   "website-fixed",            false)
    setOrHide("gym-description",    "description",              false)
    setOrHide("gym-address",        "formatted_address",        false)
    setOrHide("gym-hours",          "formatted_hours",          false)

    // The website specifically must also set href.  If it's hidden, this will
    // have no noticeable effect
    document.getElementById("website-section").href = dashboard[dashboard_key]

    function showOrHide(element_id, dashboard_key) {
        document.getElementById(element_id).href = dashboard[dashboard_key]
        if (dashboard[dashboard_key] === "" || dashboard[dashboard_key] === false) {
            document.getElementById(element_id).style.display = "none";
        } else {
            document.getElementById(element_id).style.display = "block";
        }
    }

    showOrHide("gym-link-fb",       "facebook-fixed");
    showOrHide("gym-link-twitter",  "twitter-fixed");
    showOrHide("gym-link-ig",       "instagram-fixed");
    showOrHide("gym-link-linkedin", "linkedin-fixed");
    showOrHide("gym-link-tiktok",   "tiktok-fixed");
    showOrHide("gym-link-yelp",     "yelp-fixed");

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
});
