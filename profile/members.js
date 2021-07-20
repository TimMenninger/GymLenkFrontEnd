$(document).ready(function() {
    // If not logged in, go back to sign in
    ifNotLoggedIn(function() {
        clearState();
        window.location.replace(URL_log_in);
        return;
    });
});

document.getElementById("new-member-sign-up-button").addEventListener("click", function() {
    // Send to backend the current password and the new one
    var first_name      = document.getElementById("new-member-first-name").value;
    var last_name       = document.getElementById("new-member-last-name").value;
    var phone_number    = document.getElementById("new-member-phone").value;
    var zip             = document.getElementById("new-member-zip").value;

    // Hide any previous error/success message before the next attempt
    hideErrors();

    // Create a request variable and assign a new XMLHttpRequest object to
    // it.
    var request = new XMLHttpRequest();

    // Open a new connection, using the POST request on the URL endpoint
    request.open("POST", backend_URL + BE_enroll_member, true);
    request.setRequestHeader("Content-Type", HDR_content_type_json);
    request.withCredentials = true;
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            let { _, error } = parseResponse(request, ErrorInfo.EnrollMemberError, SubmitButton.EnrollMember);

            if (error === EnrollMemberError.SUCCESS) {
                // Clear text on success, but not on error since they might want
                // to keep their entries there
                document.getElementById("new-member-first-name").value = "";
                document.getElementById("new-member-last-name").value = "";
                document.getElementById("new-member-phone").value = "";
                document.getElementById("new-member-zip").value = "";
            }
        }
    }

    // Remove submit button in favor of a lottie
    showLoadingLottie(SubmitButton.EnrollMember);

    // Send request
    request.send(JSON.stringify(data));
});
