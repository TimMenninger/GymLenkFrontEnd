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
            let { _, error } = parseResponse(request, ErrorInfo.CheckInError, SubmitButton.CheckIn);

            if (error === CheckInError.SUCCESS) {
                // Clear text on success, but not on error since they might want
                // to keep their entries there
                document.getElementById("user-beta-phone").value = "";
                document.getElementById("user-beta-gym-dropdown").selectedIndex = 0;
            }
        }
    }

    // Remove submit button in favor of a lottie
    showLoadingLottie(SubmitButton.CheckIn);

    // Send request
    request.send(JSON.stringify(data));
});
