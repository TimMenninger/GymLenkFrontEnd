//
// USED EXAMPLE FROM:
// https://gts-webflow-playground.webflow.io/samples/fetch-data-from-external-api-to-webflow
//

<script>
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
    const FE_onboarding = "/onboarding";
    const FE_login = "/login";

    // Request Headers
    const HDR_content_type_json = "application/json; charset=UTF-8";

    // Other URLs
    const URL_landing_after_login = FE_mygym;
    const URL_landing_after_signup = FE_onboarding;
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

    document.getElementById("navbar-log-out").addEventListener("click", function() {
        clearState();
    })

    ////////////////////////////////////////////////////////////////////////////
    //
    // SIDEBAR
    //

    document.getElementById("sidebar-log-out").addEventListener("click", function() {
        clearState();
    })

</script>
