$(document).ready(function() {
    // If not logged in, go back to sign in
    ifNotLoggedIn(function() {
        clearState();
        window.location.replace(URL_log_in);
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
                var template_row = document.getElementById("my-members-div-template");
                data["members"].forEach(function (member) {
                    var row = template_row.cloneNode(true);
                    row.id  = "my-members-div-" + member["phone_number"];

                    const row_items = [
                        { "id" : "member-list-first-name",  "key" : "first_name"    },
                        { "id" : "member-list-last-name",   "key" : "last_name"     },
                        { "id" : "member-list-phone",       "key" : "phone_number"  },
                        { "id" : "member-list-zip",         "key" : "zip"           },
                    ];
                    row_items.forEach(function (info) {
                        var item = row.getElementById(info["id"]);
                        item.innerText = member[info["key"]];

                        console.log(item);
                        row.appendChild(item);
                    });

                    console.log("----");
                    console.log(row);
                    table.appendChild(row);
                })
                console.log("====");
                console.log(table);
            }
            template_row.remove();
        }
    }

    // Send request
    request.send(JSON.stringify({
        "session_id"    : localStorage.getItem("session_id")
    }));
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
    request.send(JSON.stringify({
        "session_id"    : localStorage.getItem("session_id"),
        "first_name"    : first_name,
        "last_name"     : last_name,
        "phone_number"  : phone_number,
        "zip"           : zip
    }));
});
