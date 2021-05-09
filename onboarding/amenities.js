$(document).ready(function() {
    // Don't do amenities until after done about gym
    if (localStorage.getItem("onboarding_aboutyourgym") !== "done") {
        window.location.replace(URL_onboarding_aboutmygym);
    }

    // Load the info that we have so far
    var data = JSON.parse(localStorage.getItem("onboard_info"));

    // If we've done amenities before, re-populate them
    if (localStorage.getItem("onboarding_amenities") === "done") {
        document.getElementById("onboarding-has-free-weights").checked  = data["has_free_weights"];
        document.getElementById("onboarding-has-cardio").checked        = data["has_cardio"];
        document.getElementById("onboarding-has-spinning").checked      = data["has_spinning"];
        document.getElementById("onboarding-has-classes").checked       = data["has_classes"];
        document.getElementById("onboarding-has-squat-rack").checked    = data["has_squat_rack"];
        document.getElementById("onboarding-has-smith-machine").checked = data["has_smith_machine"];
        document.getElementById("onboarding-has-bench-press").checked   = data["has_bench_press"];
        document.getElementById("onboarding-has-trx").checked           = data["has_trx"];
        document.getElementById("onboarding-has-pt").checked            = data["has_pt"];
        document.getElementById("onboarding-has-turf").checked          = data["has_turf"];
        document.getElementById("onboarding-has-outdoor").checked       = data["has_outdoor"];
        document.getElementById("onboarding-has-wifi").checked          = data["has_wifi"];
        document.getElementById("onboarding-has-showers").checked       = data["has_showers"];
        document.getElementById("onboarding-has-lockers").checked       = data["has_lockers"];
        document.getElementById("onboarding-has-pool").checked          = data["has_pool"];
        document.getElementById("onboarding-has-hot-tub").checked       = data["has_hot_tub"];
        document.getElementById("onboarding-has-sauna").checked         = data["has_sauna"];
        document.getElementById("onboarding-has-basketball").checked    = data["has_basketball"];
    }
});

document.getElementById("onboarding-amenities-continue-button").addEventListener("click", function() {
    // Load the info that we have so far
    var data = JSON.parse(localStorage.getItem("onboard_info"));

    // Store flags
    data["has_free_weights"]    = document.getElementById("onboarding-has-free-weights").checked;
    data["has_cardio"]          = document.getElementById("onboarding-has-cardio").checked;
    data["has_spinning"]        = document.getElementById("onboarding-has-spinning").checked;
    data["has_classes"]         = document.getElementById("onboarding-has-classes").checked;
    data["has_squat_rack"]      = document.getElementById("onboarding-has-squat-rack").checked;
    data["has_smith_machine"]   = document.getElementById("onboarding-has-smith-machine").checked;
    data["has_bench_press"]     = document.getElementById("onboarding-has-bench-press").checked;
    data["has_trx"]             = document.getElementById("onboarding-has-trx").checked;
    data["has_pt"]              = document.getElementById("onboarding-has-pt").checked;
    data["has_turf"]            = document.getElementById("onboarding-has-turf").checked;
    data["has_outdoor"]         = document.getElementById("onboarding-has-outdoor").checked;
    data["has_wifi"]            = document.getElementById("onboarding-has-wifi").checked;
    data["has_showers"]         = document.getElementById("onboarding-has-showers").checked;
    data["has_lockers"]         = document.getElementById("onboarding-has-lockers").checked;
    data["has_pool"]            = document.getElementById("onboarding-has-pool").checked;
    data["has_hot_tub"]         = document.getElementById("onboarding-has-hot-tub").checked;
    data["has_sauna"]           = document.getElementById("onboarding-has-sauna").checked;
    data["has_basketball"]      = document.getElementById("onboarding-has-basketball").checked;

    // Store for later.  We don't use the info till we have it all
    localStorage.setItem("onboard_info", JSON.stringify(data));

    // Go to next onboarding item
    localStorage.setItem("onboarding_amenities", "done");
    window.location.assign(URL_landing_after_onboarding_amenities);
});
