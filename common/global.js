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
const BE_check_password_key = "/check-password-key";
const BE_change_forgotten_password = "/change-forgotten-password";
const BE_check_in = "/validate-member";
const BE_get_location_list = "/get-location-list";
const BE_enroll_member = "/begin-membership";
const BE_list_all_members = "/list-all-members";

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
const FE_recover_password = "/newpassword";

// Request Headers
const HDR_content_type_json = "application/json; charset=UTF-8";

// Other URLs
const    URL_homepage = FE_dashboard;

const    URL_log_in = FE_login;

const    URL_landing_after_login_default = FE_mygym;
const    URL_landing_after_signup = FE_onboarding;
const    URL_landing_after_onboarding = FE_onboarding_aboutmygym;
const    URL_landing_after_onboarding_aboutmygym = FE_onboarding_amenities;
const    URL_landing_after_onboarding_amenities = FE_onboarding_links;
const    URL_landing_after_onboarding_links = FE_onboarding_getstarted
const    URL_landing_after_onboarding_getstarted = URL_landing_after_login_default;
const    URL_landing_after_logout = URL_log_in;

const    URL_landing_after_involuntary_logout__ = "URL_landing_after_involuntary_logout";
function URL_landing_after_involuntary_logout() {
    localStorage.setItem(URL_landing_after_login__, window.location.pathname);
    window.location.replace(URL_landing_after_logout);
}

const    URL_landing_after_login__ = "URL_landing_after_login";
function URL_landing_after_login() {
    let url = localStorage.getItem(URL_landing_after_login__);
    localStorage.removeItem(URL_landing_after_login__);
    window.location.replace(url !== null ? url : URL_landing_after_login_default);
}

const    URL_onboarding_aboutmygym = FE_onboarding_aboutmygym;
const    URL_onboarding_amenities  = FE_onboarding_amenities;
const    URL_onboarding_links      = FE_onboarding_links;

// Convenience
const DaysOfWeek = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];

////////////////////////////////////////////////////////////////////////////
//
// COMMON
//

function isNumericInput(event) {
  const key = event.keyCode;
  return ((key >= 48 && key <= 57) || // Allow number line
    (key >= 96 && key <= 105) // Allow number pad
  );
};

function isModifierKey(event) {
  const key = event.keyCode;
  return (event.shiftKey === true || key === 35 || key === 36) || // Allow Shift, Home, End
    (key === 8 || key === 9 || key === 13 || key === 46) || // Allow Backspace, Tab, Enter, Delete
    (key > 36 && key < 41) || // Allow left, up, right, down
    (
      // Allow Ctrl/Command + A,C,V,X,Z
      (event.ctrlKey === true || event.metaKey === true) &&
      (key === 65 || key === 67 || key === 86 || key === 88 || key === 90)
    )
};

//
// ERRORS
//

function stringToError(error_type, error_str) {
    for (error in error_type.Errors) {
        if (error === error_str) {
            return error_type.Errors[error];
        }
    }
    return -1;
}

function getErrorInfo(error) {
    for (error_type in ErrorInfo) {
        if (error >= ErrorInfo[error_type].base && error < (ErrorInfo[error_type].base + ErrorBandWidth)) {
            return ErrorInfo[error_type];
        }
    }
    return ErrorInfo.UnknownError;
}

function showError(error) {
    hideErrors();
    showErrorElement(getErrorInfo(error).errorElement, errorString(error));
}

function showPasswordError(error_type, password_error) {
    showErrorElement(error_type.errorElement, errorString(password_error));
}

function showHTTPError(error_type, http_status) {
    showErrorElement(error_type.errorElement, httpStatusString(http_status));
}

function showSuccess(error_info) {
    hideErrors();
    showErrorElement(error_info.successElement, errorString(error_info.Errors.SUCCESS));
}

function showErrorElement(element_name_base, error_desc) {
    var div_elem = document.getElementById(element_name_base + "-div");
    if (div_elem !== null) {
        div_elem.style.display = "block";
    }

    var text_elem = document.getElementById(element_name_base + "-text");
    if (text_elem !== null) {
        text_elem.innerText = (error_desc !== null) ? error_desc : "Unknown error";
    }
}

function hideErrors() {
    for (error in ErrorInfo) {
        var error_elem = document.getElementById(ErrorInfo[error].errorElement + "-div");
        if (error_elem !== null) {
            error_elem.style.display = "none";
        }

        var success_elem = document.getElementById(ErrorInfo[error].successElement + "-div");
        if (success_elem !== null) {
            success_elem.style.display = "none";
        }
    }
}

//
// SUBMIT BUTTON
//

const SubmitButton = {
    UnknownSubmitButton:        { submit: null,                             lottie: null                                    },
    SaveAccountSettings:        { submit: "update-pw-button",               lottie: "updatepw-loading-lottie"               },
    SaveLocationInfo:           { submit: "save-changes-my-gym-button",     lottie: "save-changes-my-gym-loading-lottie"    },
    SignUp:                     { submit: "gym-sign-up-button",             lottie: "signup-loading-lottie"                 },
    RecoverPassword:            { submit: "gym-newpw-button",               lottie: "newpw-loading-lottie"                  },
    LogIn:                      { submit: "gym-login-button",               lottie: "login-loading-lottie"                  },
    ForgotPassword:             { submit: "gym-pwreset-button",             lottie: "pwreset-loading-lottie"                },
    CheckIn:                    { submit: "user-beta-confirm-button",       lottie: "user-beta-loading-lottie"              },
    EnrollMember:               { submit: "new-member-sign-up-button",      lottie: "new-member-loading-lottie"             },
};

function showSubmitButton(submit_type) {
    var button = document.getElementById(submit_type.submit);
    var lottie = document.getElementById(submit_type.lottie);
    button.style.display = "block";
    lottie.style.display = "none";
}

function showLoadingLottie(submit_type) {
    var button = document.getElementById(submit_type.submit);
    var lottie = document.getElementById(submit_type.lottie);
    button.style.display = "none";
    lottie.style.display = "block";
}

//
// REQUESTS
//

function parseResponse(request, error_type, submit_type) {
    // Replace the submit button and remove the lottie, regardless of
    // success/failure
    showSubmitButton(submit_type);

    // Check error on response status
    var data = null;
    if (request.status !== 200) {
        showHTTPError(request.status);
        return { data, error_type.Errors.FAILURE };
    }

    // Begin accessing JSON data here on success
    data = JSON.parse(request.responseText);
    if (!data["success"]) {
        // Display error
        let error = stringToError(error_type, data["error"]);
        showError(error);
        showSubmitButton(submit_type);
        return { data, error };
    }

    // Successful if here
    showSuccess(error_type);
    return { data, error_type.Errors.SUCCESS };
}

//
// CHECK LOGGED IN/OUT
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
    var missing_logged_in_data =
        ((localStorage.getItem("session_id") === null)
            || (localStorage.getItem("dashboard") === null)
            || (localStorage.getItem("logged_in") !== "true"));
    if (expect_logged_in && missing_logged_in_data) {
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
            } else if (backend_logged_in && (localStorage.getItem("dashboard") === null)) {
                // If here, we're logged in, but are missing some info
                window.location.replace(URL_landing_after_signup);
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

//
// PASSWORD REQUIREMENTS
//

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

//
// PHONE NUMBER FORMAT
// Copied from: https://stackoverflow.com/questions/30058927/format-a-phone-number-as-a-user-types-using-pure-javascript
//

function formatPhoneNumber(input) {
  // Check if the input is of correct
  let offset = 0;
  let intlCode = '';
  let match = input.match(/^(1|)?(\d{0,10})$/);

  if (match && match[1]) {
    // Remove the matched extension code
    // Change this to format for any country code.
    intlCode = '+1 ';
    offset = 1;
  }

  let area = input.substring(0 + offset, 3 + offset);
  let middle = input.substring(3 + offset, 6 + offset);
  let last = input.substring(6 + offset, 10 + offset);

  if (input.length > 10+offset) {
    return input;
  } else if (input.length > 6+offset) {
    return intlCode + "(" + area + ") " + middle + "-" + last;
  } else if (input.length > 3+offset) {
    return intlCode + "(" + area + ") " + middle;
  } else if (input.length > 0+offset) {
    return intlCode + "(" + area;
  } else {
    return input;
  }
};

function unformatPhoneNumber(formatted) {
    return ('' + formatted).replace(/\D/g, '');
}

function forcePhoneNumberFormat(element_id) {
    var inputElement = document.getElementById(element_id);

    inputElement.addEventListener("keydown", function(event) {
      // Input must be of a valid number format or a modifier key, and not longer than ten digits
      if (!isNumericInput(event) && !isModifierKey(event)) {
        event.preventDefault();
      }
    });

    inputElement.addEventListener("keyup", function(event) {
      if (isModifierKey(event)) {
        return;
      }

      let target = event.target;
      if (target != null) {
          let input = ('' + target.value).replace(/\D/g, ''); // First ten digits of input only
          let formatted = formatPhoneNumber(input);
          target.value = `${formatted}`;
      }
    });
}

//
// PRESSING ENTER
//

function clickSubmitOnPressEnter(text_element_id, submit_button_id) {
    document.getElementById(text_element_id).addEventListener("keyup", function(event) {
        if (event.which === 13) {
            document.getElementById(submit_button_id).click();
        }
    });
}

//
// FORMAT ZIP CODE
//

function forceZIPCodeFormat(element_id) {
    var inputElement = document.getElementById(element_id);

    inputElement.addEventListener("keydown", function(event) {
      // Input must be of a valid number format or a modifier key, and not longer than ten digits
      if (!isNumericInput(event) && !isModifierKey(event)) {
        event.preventDefault();
      }
    });

    inputElement.addEventListener("keyup", function(event) {
      if (isModifierKey(event)) {
        return;
      }

      let target = event.target;
      if (target != null) {
          let input = ('' + target.value).replace(/\D/g, ''); // First ten digits of input only
          if (input.length > 5) {
              input = input.substring(0, 5);
          }

          target.value = `${input}`;
      }
    });
}

//
// FORMAT GYM NAME
//

function displayOrganizationName(text_element_id) {
    var dashboard = JSON.parse(localStorage.getItem("dashboard"));
    var org_name = dashboard["organization_name"];
    var loc_name = dashboard["location_name"];
    var display_name = "";

    if (org_name !== "" && loc_name !== "") {
        display_name = org_name + " - " + loc_name;
    } else if (org_name !== "") {
        display_name = org_name;
    } else if (loc_name !== "") {
        display_name = loc_name;
    } else {
        display_name = "";
    }

    if (document.getElementById(text_element_id) !== nil) {
        document.getElementById(text_element_id).innerText = display_name;
    }
}

//
// DASHBOARD
//

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
