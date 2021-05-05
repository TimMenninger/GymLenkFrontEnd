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

    // Create a request variable and assign a new XMLHttpRequest object to
    // it.
    var request = new XMLHttpRequest();

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

    return true;
}

function storeDashboardData(dashboard) {
    // Address came in parts, make it line1 / line2 / city, state zip
    var address_lines = [];
    if ("physical_address" in dashboard) {
        var addr_line_1 = "";
        var addr_line_2 = "";
        var city_state_zip = "";

        // Set the address fields if they're given
        if ("line1" in dashboard["physical_address"]) {
            addr_line_1 = dashboard["physical_address"]["line1"];
        }

        if ("line2" in dashboard["physical_address"]) {
            addr_line_2 = dashboard["physical_address"]["line2"];
        }

        if ("city" in dashboard["physical_address"]) {
            city_state_zip += dashboard["physical_address"]["city"];
            if ("state" in dashboard["physical_address"] || "zip" in dashboard["physical_address"]) {
                city_state_zip += ", ";
            }
        }
        if ("state" in dashboard["physical_address"]) {
            city_state_zip += dashboard["physical_address"]["state"];
            if ("zip" in dashboard["physical_address"]) {
                city_state_zip += " ";
            }
        }
        if ("zip" in dashboard["physical_address"]) {
            city_state_zip += dashboard["physical_address"]["zip"];
        }

        // Append only nonempty address fields
        if (addr_line_1 !== "") {
            address_lines.push(addr_line_1);
        }
        if (addr_line_2 !== "") {
            address_lines.push(addr_line_2);
        }
        if (city_state_zip !== "") {
            address_lines.push(city_state_zip);
        }
    }
    dashboard["formatted_address"] = address_lines.join("\n");

    // Hours. Description of how to interpret array is in dashboard.go
    var hours_list = [];
    for (i in DaysOfWeek) {
        var dow = DaysOfWeek[i];
        var day_hours = "[Not Specified]";
        if ("hours" in dashboard) {
            if (dow in dashboard["hours"]) {
                if (dashboard["hours"][dow].length === 1) {
                    if (dashboard["hours"][dow][0] === -1) {
                        day_hours = "Closed";
                    } else if (dashboard["hours"][dow][0] === 0) {
                        day_hours = "24 Hours";
                    }
                } else if (dashboard["hours"][dow].length > 1) {
                    var time_range = "";
                    var time_ranges = [];
                    for (i = 0; i < dashboard["hours"][dow].length; i++) {
                        var hour = dashboard["hours"][dow][i] / 60;
                        var min  = dashboard["hours"][dow][i] % 60;
                        time_range += hour.toString() + ":" + min.toString();
                        if (i % 2 == 0) {
                            time_range += "-";
                        } else {
                            time_ranges.push(time_range);
                            time_range = "";
                        }
                    }
                    day_hours = time_ranges.join(", ");
                }
            }
        }
        hours_list.push(dow + ": " + day_hours);
    }
    dashboard["formatted_hours"] = hours_list.join("\n");

    // Store the dashboard now
    localStorage.setItem("dashboard", JSON.stringify(dashboard));
}

