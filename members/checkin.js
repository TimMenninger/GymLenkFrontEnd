document.getElementById("user-beta-confirm-button").addEventListener("click", function() {
    // The chosen gym
    var loc_id = parseInt(document.getElementById("user-beta-gym-dropdown").value, 10);
    var phone  = document.getElementById("user-beta-phone").value;

    // Hide any previous error/success message before the next attempt
    hideErrors();

    // Check validity
    if (isNaN(loc_id)) {
        showError(CheckInError.PHONE_NOT_FOUND);
        return;
    }

    // Create a request variable and assign a new XMLHttpRequest object to
    // it.
    var request = new XMLHttpRequest();

    // Open a new connection, using the POST request on the URL endpoint
    request.open("POST", backend_URL + BE_change_password, true);
    request.setRequestHeader("Content-Type", HDR_content_type_json);
    request.withCredentials = true;
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            var error_type = CheckInError.SUCCESS;
            var data = "{}";

            // Check error on response status
            if (request.status != 200) {
                // Error message
                console.log(`Request failed with status ${request.status}`);
                error_type = CheckInError.FAILURE;
            }
            // Begin accessing JSON data here
            else {
                data = JSON.parse(request.responseText);
                if (!data["success"]) {
                    error_type = stringToCheckInError(data["error"]);
                }
            }

            // Replace the confirm button and remove the lottie, regardless of
            // success/failure
            document.getElementById("user-beta-confirm-button").style.display = "block";
            document.getElementById("user-beta-loading-lottie").style.display = "none";

            // Check for failure pulled from above
            if (error_type != CheckInError.SUCCESS) {
                // Display error
                showError(error_type);
                return;
            }

            // Clear text on success, but not on error since they might want to
            // keep their entries there
            document.getElementById("user-beta-phone").value = "";
            document.getElementById("user-beta-gym-dropdown").selectedIndex = 0;

            // Remove any error message there was
            showSuccess(ErrorInfo.CheckInError);
        }
    }

    // Remove submit button in favor of a lottie
    document.getElementById("user-beta-confirm-button").style.display = "none";
    document.getElementById("user-beta-loading-lottie").style.display = "block";

    // Send request
    request.send(JSON.stringify(data));
});
