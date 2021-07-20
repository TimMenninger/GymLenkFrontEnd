$(document).ready(function() {
    // Create a request variable and assign a new XMLHttpRequest object to
    // it.  This will be to get a list of all gyms to pre-populate gym dropdown
    // with
    var request = new XMLHttpRequest();

    // Open a new connection, using the GET request on the URL endpoint
    request.open("GET", backend_URL + BE_get_location_list, true);
    request.withCredentials = true;
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            // Check error on response status
            if (request.status == 200) {
                var data = JSON.parse(request.responseText);
                if (!data["success"]) {
                    console.log("Failed to get list of locations with error " + data["error"])
                    return
                }

                var select = document.getElementById("user-beta-gym-dropdown");
                data.forEach(function (loc) {
                    var option = document.createElement("option");
                    option.text = loc.name;
                    option.value = loc.id;
                    select.appendChild(option);
                })
            }
        }
    }

    // Remove submit button in favor of a lottie
    showLoadingLottie(SubmitButton.CheckIn);

    // Send request
    request.send();
});

$(document).keyup(function(event) {
    if (event.which === 13) {
        document.getElementById("user-beta-confirm-button").click()
    }
});

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
    request.open("POST", backend_URL + BE_check_in, true);
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
    request.send(JSON.stringify({
        "location_id"   : loc_id,
        "phone_number"  : phone
    }));
});
