/**
 * ADDING ERRORS
 *      Adding an error type:
 *          - Put a row in the ErrorInfo
 *          - Put entries into errorString function
 *          - Create the error type below, e.g. const NewError = {}
 *      Adding to existing error
 *          - Add to ExistingError enum
 */

const ErrorBandWidth = 1000;
const ErrorInfo = {
    /* Cannot change the base for these */
    UnknownError:           { base: -1,                 errorElement: null,                         successElement: null                            },

    /* These can have base changes and other changes */
    PasswordError:          { base: ErrorBandWidth*1,   errorElement: null,                         successElement: null                            },
    SignupError:            { base: ErrorBandWidth*2,   errorElement: "gym-sign-up-error",          successElement: null                            },
    LoginError:             { base: ErrorBandWidth*3,   errorElement: "gym-login-error",            successElement: null                            },
    ForgotPasswordError:    { base: ErrorBandWidth*4,   errorElement: "gym-pwreset-error",          successElement: "gym-pwreset-success"           },
    RecoverPasswordError:   { base: ErrorBandWidth*5,   errorElement: "gym-newpw-error",            successElement: null                            },
    ChangePasswordError:    { base: ErrorBandWidth*6,   errorElement: "gym-update-pw-error",        successElement: "gym-update-pw-success"         },
    CheckInError:           { base: ErrorBandWidth*7,   errorElement: "user-beta-confirm-error",    successElement: "user-beta-confirm-success"     },
    LocationSettingsError:  { base: ErrorBandWidth*8,   errorElement: "my-gym-edit-error",          successElement: "my-gym-edit-success"           },
    EnrollMemberError:      { base: ErrorBandWidth*9,   errorElement: "new-member-error",           successElement: "new-member-success"            },
}



/*******************************************************************************
 *
 * P R O T O C O L   E R R O R S
 *
 */

// These values are dictated by the HTTP protocol
function httpStatusString(stat) {
    if (stat === 200) { // OK - Success
        return "Success";
    }
    if (stat === 400) { // BAD_REQUEST - Request not understandable
        return "Something went wrong. Try refreshing.";
    }
    if (stat === 403) { // FORBIDDEN - Request understood but explicitly forbidden, usually due to not being signed in
        return "You must be logged in.";
    }
    if (stat === 404) { // NOT_FOUND - Path was not found
        return "Not found";
    }
    if (stat === 500) { // INTERNAL_SERVER_ERROR - Unknown error on the server side
        return "Something went wrong. Please contact support or try again later.";
    }
    if (stat === 501) { // NOT_IMPLEMENTED - Server-side not implemented
        return "Cool your jets, this doesn't work yet but we're getting to it.";
    }
    return "Unexpected status code " + stat.toString();
}



/*******************************************************************************
 *
 * P A S S W O R D   E R R O R S
 *
 */

const PasswordError = ErrorInfo.PasswordError.Errors = {
    FAILURE:             -ErrorInfo.PasswordError.base,
    SUCCESS:              ErrorInfo.PasswordError.base + 0,
    MISMATCH:             ErrorInfo.PasswordError.base + 1,
    TOO_SHORT:            ErrorInfo.PasswordError.base + 2,
    NEEDS_LETTER:         ErrorInfo.PasswordError.base + 3,
    NEEDS_NONLETTER:      ErrorInfo.PasswordError.base + 4,
    PASSWORD_EMPTY:       ErrorInfo.PasswordError.base + 5,
    CONF_PASSWORD_EMPTY:  ErrorInfo.PasswordError.base + 6,
}



/*******************************************************************************
 *
 * S I G N U P   E R R O R S
 *
 */

const SignupError = ErrorInfo.SignupError.Errors = {
    FAILURE:             -ErrorInfo.SignupError.base,
    SUCCESS:              ErrorInfo.SignupError.base + 0,
    INVALID_EMAIL:        ErrorInfo.SignupError.base + 1,
    INVALID_PASSWORD:     ErrorInfo.SignupError.base + 2,
    ACCEPT_TERMS:         ErrorInfo.SignupError.base + 3,
    EMAIL_EMPTY:          ErrorInfo.SignupError.base + 4,
    EMAIL_EXISTS:         ErrorInfo.SignupError.base + 5,
}



/*******************************************************************************
 *
 * L O G I N   E R R O R S
 *
 */

const LoginError = ErrorInfo.LoginError.Errors = {
    FAILURE:             -ErrorInfo.LoginError.base,
    SUCCESS:              ErrorInfo.LoginError.base + 0,
    INCORRECT_PASSWORD:   ErrorInfo.LoginError.base + 1,
    EMAIL_EMPTY:          ErrorInfo.LoginError.base + 2,
    PASSWORD_EMPTY:       ErrorInfo.LoginError.base + 3,
}



/*******************************************************************************
 *
 * F O R G O T   P A S S W O R D   E R R O R S
 *
 */

const ForgotPasswordError = ErrorInfo.ForgotPasswordError.Errors = {
    FAILURE:             -ErrorInfo.ForgotPasswordError.base,
    SUCCESS:              ErrorInfo.ForgotPasswordError.base + 0,
    INVALID_EMAIL:        ErrorInfo.ForgotPasswordError.base + 1,
    EMAIL_NOT_FOUND:      ErrorInfo.ForgotPasswordError.base + 2,
    EMAIL_EMPTY:          ErrorInfo.ForgotPasswordError.base + 3,
}



/*******************************************************************************
 *
 * R E C O V E R   P A S S W O R D   E R R O R S
 *
 */

const RecoverPasswordError = ErrorInfo.RecoverPasswordError.Errors = {
    FAILURE:             -ErrorInfo.RecoverPasswordError.base,
    SUCCESS:              ErrorInfo.RecoverPasswordError.base + 0,
    INVALID_PASSWORD:     ErrorInfo.RecoverPasswordError.base + 1,
    KEY_EXPIRED:          ErrorInfo.RecoverPasswordError.base + 2,
    INVALID_KEY:          ErrorInfo.RecoverPasswordError.base + 3,
    EMAIL_NOT_FOUND:      ErrorInfo.RecoverPasswordError.base + 4,
}



/*******************************************************************************
 *
 * C H A N G E   P A S S W O R D   E R R O R S
 *
 */

const ChangePasswordError = ErrorInfo.ChangePasswordError.Errors = {
    FAILURE:             -ErrorInfo.ChangePasswordError.base,
    SUCCESS:              ErrorInfo.ChangePasswordError.base + 0,
    INVALID_PASSWORD:     ErrorInfo.ChangePasswordError.base + 1,
    INCORRECT_PASSWORD:   ErrorInfo.ChangePasswordError.base + 2,
    PASSWORD_EMPTY:       ErrorInfo.ChangePasswordError.base + 3,
}



/*******************************************************************************
 *
 * M E M B E R   C H E C K   I N   E R R O R S
 *
 */

const CheckInError = ErrorInfo.CheckInError.Errors = {
    FAILURE:             -ErrorInfo.CheckInError.base,
    SUCCESS:              ErrorInfo.CheckInError.base + 0,
    PHONE_NOT_FOUND:      ErrorInfo.CheckInError.base + 1,
    LOC_NOT_FOUND:        ErrorInfo.CheckInError.base + 2,
    TOO_CLOSE_TO_GYM:     ErrorInfo.CheckInError.base + 3,
    TOO_CLOSE_TO_HOME:    ErrorInfo.CheckInError.base + 4,
}



/*******************************************************************************
 *
 * L O C A T I O N   S E T T I N G S   E R R O R S
 *
 */

const LocationSettingsError = ErrorInfo.LocationSettingsError.Errors = {
    FAILURE:             -ErrorInfo.LocationSettingsError.base,
    SUCCESS:              ErrorInfo.LocationSettingsError.base + 0,
}



/*******************************************************************************
 *
 * E N R O L L   M E M B E R   E R R O R
 *
 */

const EnrollMemberError = ErrorInfo.EnrollMemberError.Errors = {
    FAILURE:             -ErrorInfo.EnrollMemberError.base,
    SUCCESS:              ErrorInfo.EnrollMemberError.base + 0,
    PHONE_INVALID:        ErrorInfo.EnrollMemberError.base + 1,
    ZIP_INVALID:          ErrorInfo.EnrollMemberError.base + 2,
    TEXT_FAILED:          ErrorInfo.EnrollMemberError.base + 3,
    NAME_EMPTY:           ErrorInfo.EnrollMemberError.base + 4,
    MEMBER_EXISTS:        ErrorInfo.EnrollMemberError.base + 5,
}



/*******************************************************************************
 *
 * U T I L I T I E S
 *
 */

function errorString(error) {
    switch (error) {

    //
    // PasswordError
    //
    case PasswordError.SUCCESS:
        return "Success";
    case PasswordError.MISMATCH:
        return "Passwords do not match";
    case PasswordError.TOO_SHORT:
        return "Password must be at least 8 characters";
    case PasswordError.NEEDS_LETTER:
        return "Password must have at least one letter";
    case PasswordError.NEEDS_NONLETTER:
        return "Password must have at least one number or special character";
    case PasswordError.PASSWORD_EMPTY:
        return "Password field is empty";
    case PasswordError.CONF_PASSWORD_EMPTY:
        return "Confirm password field is empty";
    case PasswordError.FAILURE:
        return "Error changing password";

    //
    // SignupError
    //
    case SignupError.SUCCESS:
        return "Success";
    case SignupError.INVALID_EMAIL:
        return "Email address is invalid";
    case SignupError.INVALID_PASSWORD:
        return "Password did not meet security criteria";
    case SignupError.ACCEPT_TERMS:
        return "Please accept the terms & conditions";
    case SignupError.EMAIL_EMPTY:
        return "Email address is empty";
    case SignupError.EMAIL_EXISTS:
        return "Email address already exists";
    case SignupError.FAILURE:
        return "Error signing up";

    //
    // LoginError
    //
    case LoginError.SUCCESS:
        return "Success";
    case LoginError.INCORRECT_PASSWORD:
        return "Incorrect email/password combination";
    case LoginError.EMAIL_EMPTY:
        return "Email is empty";
    case LoginError.PASSWORD_EMPTY:
        return "Password is empty";
    case LoginError.FAILURE:
        return "Error logging in";

    //
    // ForgotPasswordError
    //
    case ForgotPasswordError.SUCCESS:
        return "Password link emailed";
    case ForgotPasswordError.INVALID_EMAIL:
        return "Email was invalid";
    case ForgotPasswordError.EMAIL_NOT_FOUND:
        return "No account found for that email";
    case ForgotPasswordError.EMAIL_EMPTY:
        return "Please enter an email";
    case ForgotPasswordError.FAILURE:
        return "Error getting password link";

    //
    // RecoverPasswordError
    //
    case RecoverPasswordError.SUCCESS:
        return "Password successfully changed";
    case RecoverPasswordError.INVALID_EMAIL:
        return "Email is invalid";
    case RecoverPasswordError.INVALID_PASSWORD:
        return "New password is invalid";
    case RecoverPasswordError.KEY_EXPIRED:
        return "This key has expired";
    case RecoverPasswordError.INVALID_KEY:
        return "This is not a valid key";
    case RecoverPasswordError.EMAIL_NOT_FOUND:
        return "There was no account found for this email";
    case RecoverPasswordError.FAILURE:
        return "Error changing forgotten password";

    //
    // ChangePasswordError
    //
    case ChangePasswordError.SUCCESS:
        return "Password successfully changed";
    case ChangePasswordError.INVALID_EMAIL:
        return "Email is invalid";
    case ChangePasswordError.INVALID_PASSWORD:
        return "New password is invalid";
    case ChangePasswordError.INCORRECT_PASSWORD:
        return "Current password is incorrect";
    case ChangePasswordError.PASSWORD_EMPTY:
        return "Current password is empty";
    case ChangePasswordError.FAILURE:
        return "Error changing password";

    //
    // CheckInError
    //
    case CheckInError.SUCCESS:
        return "A text has been sent with further instructions";
    case CheckInError.PHONE_NOT_FOUND:
        return "This phone number was not found";
    case CheckInError.LOC_NOT_FOUND:
        return "This gym was not found";
    case CheckInError.TOO_CLOSE_TO_GYM:
        return "You cannot use this gym because it is too close to your home gym";
    case CheckInError.TOO_CLOSE_TO_HOME:
        return "You cannot use this gym because it is too close to your home";
    case CheckInError.FAILURE:
        return "Failed to check in";

    //
    // LocationSettingsError
    //
    case LocationSettingsError.SUCCESS:
        return "Successfully saved settings";
    case LocationSettingsError.FAILURE:
        return "Failed to save settings";

    //
    // EnrollMemberError
    //
    case EnrollMemberError.SUCCESS:
        return "Successfully enrolled member";
    case EnrollMemberError.PHONE_INVALID:
        return "The phone number is invalid";
    case EnrollMemberError.ZIP_INVALID:
        return "Please enter a valid 5-digit ZIP code";
    case EnrollMemberError.TEXT_FAILED:
        return "Failed to send a text message with instructions";
    case EnrollMemberError.NAME_EMPTY:
        return "Must enter a name";
    case EnrollMemberError.MEMBER_EXISTS:
        return "You have already added this member to GymLenk";
    case EnrollMemberError.FAILURE:
        return "Failed to enroll member";

    //
    // default
    //
    default:
        console.log("Unknown error:");
        console.log(error);
        return "Unknown error";
    }
}
