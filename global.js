////////////////////////////////////////////////////////////////////////////
//
// CONSTANTS
//

// Backend URL
const host = "18.218.204.67";
const port = "443";
const backend_URL = "https://" + host + ":" + port;

// Backend Endpoints
const BE_sign_in = "/sign-in";
const BE_create_account = "/create-account";
const BE_check_signed_in = "/check-signed-in";
const BE_onboard = "/onboard";

// Frontend URL
const frontend_URL = "gymlenk-dashboard.webflow.io"

// Frontend Pages
const FE_mygym = "/mygym";
const FE_dashboard = "/dashboard";
const FE_onboarding = "/onboarding-2";
const FE_onboarding_aboutmygym = "/onboarding/aboutmygym";
const FE_onboarding_amenities = "/onboarding/amenities";
const FE_onboarding_links = "/onboarding/links";
const FE_onboarding_getstarted = "/onboarding/getstarted";
const FE_login = "/login";
const FE_onboard = "/onboard";

// Request Headers
const HDR_content_type_json = "application/json; charset=UTF-8";

// Other URLs
const URL_landing_after_login = FE_mygym;
const URL_landing_after_signup = FE_onboarding;
const URL_landing_after_onboarding = FE_onboarding_aboutmygym;
const URL_landing_after_onboarding_aboutmygym = FE_onboarding_amenities;
const URL_landing_after_onboarding_amenities = FE_onboarding_links;
const URL_landing_after_onboarding_links = FE_onboarding_getstarted
const URL_landing_after_onboarding_getstarted = "";
const URL_landing_after_logout = FE_login;

// Convenience
const DaysOfWeek = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];

////////////////////////////////////////////////////////////////////////////
//
// COMMON
//

function clearState() {
    localStorage.clear();
    window.location.replace(URL_landing_after_logout);
}

function checkLoggedIn() {
    // If no data, definitely not logged in
    if ((localStorage.getItem("dashboard") === null)
        || (localStorage.getItem("session_id") === null)
        || (localStorage.getItem("logged_in") !== "true")) {
        return false;
    }

    // Otherwise make a request to check
    request.open("POST", backend_URL + BE_check_signed_in, true);
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
            if ("success" in data && data["success"] && "authenticated" in data && data["authenticated"]) {
                return;
            }

            // Not signed in, go to sign in page
            clearState();
            console.log(data["message"]);
        }
    }

    // Send request
    request.send(JSON.stringify({
        "session_id" : localStorage.getItem("session_id")
    }));
}

