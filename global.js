//
// USED EXAMPLE FROM:
// https://gts-webflow-playground.webflow.io/samples/fetch-data-from-external-api-to-webflow
//

<script>
    ////////////////////////////////////////////////////////////////////////////
    //
    // CONSTANTS
    //

    // Endpoints
    var EP_sign_in = "/sign-in";

    // Request Headers
    var HDR_content_type_json = "application/json; charset=UTF-8";

    // Backend URL
    var host = "127.0.0.1";
    var port = "8181";
    var backend_URL = "http://" + host + ":" + port;

    ////////////////////////////////////////////////////////////////////////////
    //
    // COMMON
    //

    function clearState() {
        localStorage.clear();
    }

</script>
