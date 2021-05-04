////////////////////////////////////////////////////////////////////////////
//
// CONSTANTS
//

// Backend URL
const host = "127.0.0.1";
const port = "8181";
const backend_URL = "http://" + host + ":" + port;

// Backend Endpoints
const BE_sign_in = "/sign-in";
const BE_create_account = "/create-account";

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

////////////////////////////////////////////////////////////////////////////
//
// COMMON
//

function clearState() {
    localStorage.clear();
    window.location.replace(URL_landing_after_logout);
}

function loggedIn() {
    return (localStorage.getItem("dashboard") !== null)
        && (localStorage.getItem("logged_in") === "true");
}

////////////////////////////////////////////////////////////////////////////
//
// NAVBAR
//

//document.getElementById("navbar-log-out").addEventListener("click", function() {
//    clearState();
//})

////////////////////////////////////////////////////////////////////////////
//
// SIDEBAR
//

//document.getElementById("sidebar-log-out").addEventListener("click", function() {
//    clearState();
//})

