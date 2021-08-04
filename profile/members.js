function addMemberToList(table, member) {
    var row = document.getElementById("my-members-row-div");
    var template_row = row.cloneNode(true);

    row.id  = "my-members-row-div-" + member["phone_number"];
    row.style.display = "flex";

    const row_items = [
        { "id" : "member-list-first-name",  "key" : "first_name"                },
        { "id" : "member-list-last-name",   "key" : "last_name"                 },
        { "id" : "member-list-phone",       "key" : "formatted_phone_number"    },
        { "id" : "member-list-zip",         "key" : "zip"                       },
    ];
    row_items.forEach(function (info) {
        var item = document.getElementById(info["id"]);
        item.id = info["id"] + "-" + member["phone_number"];
        item.innerText = member[info["key"]];
    });

    table.appendChild(template_row);
}

$(document).ready(function() {
    // If not logged in, go back to sign in
    ifNotLoggedIn(function() {
        clearState();
        window.location.replace(URL_landing_after_involuntary_logout());
        return;
    });

    // Get all members (so we can list them)
    var request = new XMLHttpRequest();

    // Open a new connection, using the POST request on the URL endpoint
    request.open("POST", backend_URL + BE_list_all_members, true);
    request.setRequestHeader("Content-Type", HDR_content_type_json);
    request.withCredentials = true;
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            // Check error on response status
            if (request.status == 200) {
                var data = JSON.parse(request.responseText);
                if (!data["success"]) {
                    console.log("Failed to get list of members with error " + data["error"])
                    return
                }

                // Duplicate the template and remove it from the list
                var table = document.getElementById("my-members-list-div");
                data["members"].forEach(function (member) {
                    member["formatted_phone_number"] = formatPhoneNumber(member["phone_number"]);
                    addMemberToList(table, member);
                })
            }
        }
    }

    // Send request
    request.send(JSON.stringify({
        "session_id"    : localStorage.getItem("session_id")
    }));
});

// Format items
forcePhoneNumberFormat("new-member-phone");
forceZIPCodeFormat("new-member-zip");

// Click submit on enter
clickSubmitOnPressEnter("new-member-first-name", "new-member-sign-up-button");
clickSubmitOnPressEnter("new-member-last-name", "new-member-sign-up-button");
clickSubmitOnPressEnter("new-member-phone", "new-member-sign-up-button");
clickSubmitOnPressEnter("new-member-zip", "new-member-sign-up-button");

document.getElementById("new-member-sign-up-button").addEventListener("click", function() {
    // Send to backend the current password and the new one
    var first_name      = document.getElementById("new-member-first-name").value;
    var last_name       = document.getElementById("new-member-last-name").value;
    var phone_number    = unformatPhoneNumber(document.getElementById("new-member-phone").value);
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
                var table = document.getElementById("my-members-list-div");
                var member = {
                    "first_name"    : first_name,
                    "last_name"     : last_name,
                    "phone_number"  : phone_number,
                    "formatted_phone_number" : formatPhoneNumber(phone_number),
                    "zip"           : zip
                };
                addMemberToList(table, member);

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
    request.send(JSON.stringify({
        "session_id"    : localStorage.getItem("session_id"),
        "first_name"    : first_name,
        "last_name"     : last_name,
        "phone_number"  : phone_number,
        "zip"           : zip
    }));
});
