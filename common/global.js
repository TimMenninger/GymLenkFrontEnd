////////////////////////////////////////////////////////////////////////////
//
// CONSTANTS
//

// Backend URL
const host = "18.218.204.67";
const port = "443";
const backend_URL = "https://" + host + ":" + port;

// Backend Endpoints
const BE_create_account = "/create-account";
const BE_change_password = "/change-password";
const BE_check_signed_in = "/check-signed-in";
const BE_onboard = "/onboard";
const BE_sign_in = "/sign-in";
const BE_set_dashboard_info = "/set-dashboard-info";
const BE_forgot_password = "/forgot-password";

// Frontend Pages
const FE_mygym = "/mygym";
const FE_dashboard = "/dashboard";
const FE_onboard = "/onboard";
const FE_onboarding = "/onboarding/welcome";
const FE_onboarding_aboutmygym = "/onboarding/aboutyourgym";
const FE_onboarding_amenities = "/onboarding/amenities";
const FE_onboarding_links = "/onboarding/links";
const FE_onboarding_getstarted = "/onboarding/getstarted";
const FE_login = "/login";
const FE_forgot_password = "/forgot";
const FE_recover_password = "/recover";

// Request Headers
const HDR_content_type_json = "application/json; charset=UTF-8";

// Other URLs
const URL_homepage = FE_dashboard;

const URL_log_in = FE_login;

const URL_landing_after_login = FE_mygym;
const URL_landing_after_signup = FE_onboarding;
const URL_landing_after_onboarding = FE_onboarding_aboutmygym;
const URL_landing_after_onboarding_aboutmygym = FE_onboarding_amenities;
const URL_landing_after_onboarding_amenities = FE_onboarding_links;
const URL_landing_after_onboarding_links = FE_onboarding_getstarted
const URL_landing_after_onboarding_getstarted = URL_landing_after_login;
const URL_landing_after_logout = FE_login;

const URL_onboarding_aboutmygym = FE_onboarding_aboutmygym;
const URL_onboarding_amenities  = FE_onboarding_amenities;
const URL_onboarding_links      = FE_onboarding_links;

// Convenience
const DaysOfWeek = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];

////////////////////////////////////////////////////////////////////////////
//
// COMMON
//

function clearState() {
    localStorage.clear();
}

function ifLoggedIn(fxn_if_logged_in) {
    checkLoggedIn_Internal(false, fxn_if_logged_in);
}

function ifNotLoggedIn(fxn_if_not_logged_in) {
    checkLoggedIn_Internal(true, fxn_if_not_logged_in);
}

function checkLoggedIn_Internal(expect_logged_in, fxn_if_wrong_state) {
    // If no data, definitely not logged in
    var have_logged_in_data =
        ((localStorage.getItem("dashboard") === null)
            || (localStorage.getItem("session_id") === null)
            || (localStorage.getItem("logged_in") !== "true"));
    if (expect_logged_in != have_logged_in_data) {
        fxn_if_wrong_state();
        return;
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
            var backend_logged_in =
                ("success" in data
                    && data["success"]
                    && "authenticated" in data
                    && data["authenticated"]);
            if (backend_logged_in != expect_logged_in) {
                fxn_if_wrong_state();
                return;
            }
        }
    }

    // Send request
    request.send(JSON.stringify({
        "session_id" : localStorage.getItem("session_id")
    }));

    return true;
}

const PasswordError = {
    SUCCESS:            0,
    MISMATCH:           1,
    TOO_SHORT:          2,
    NEEDS_LETTER:       3,
    NEEDS_NONLETTER:    4,
}
function checkPasswordRequirements(new_pw, confirm_new_pw) {
    // Passwords must match first and foremost
    if (new_pw !== confirm_new_pw) {
        return PasswordError.MISMATCH;
    }

    // Password must have:
    //      8+ characters
    //      1+ letter
    //      1+ nonletter
    if (new_pw.length < 8) {
        return PasswordError.TOO_SHORT;
    }
    if (!new_pw.match(/.*[a-zA-Z]+.*/i)) {
        return PasswordError.NEEDS_LETTER;
    }
    if (!new_pw.match(/.*[^a-zA-Z]+.*/i)) {
        return PasswordError.NEEDS_NONLETTER;
    }

    return PasswordError.SUCCESS;
}

function storeDashboardData(dashboard) {
    // Format phone number
    dashboard["formatted_phone_number"] = formatPhoneNumber(dashboard["phone_number"]);

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
    for (const raw_dow of DaysOfWeek) {
        var dow = raw_dow.toLowerCase();

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
                        var hour = (dashboard["hours"][dow][i] / 60 / 1000) / 60;
                        var min  = (dashboard["hours"][dow][i] / 60 / 1000) % 60;
                        time_range += hour.toString().padStart(2, '0') + ":" + min.toString().padStart(2, '0');
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
        hours_list.push(raw_dow + ": " + day_hours);
    }
    dashboard["formatted_hours"] = hours_list.join("\n");

    // Store the dashboard now
    localStorage.setItem("dashboard", JSON.stringify(dashboard));
}
