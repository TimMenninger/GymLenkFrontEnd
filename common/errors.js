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
    UnknownError:           { base: -1,                 errorElement: null,                             "successElement": null                              },
    PasswordError:          { base: ErrorBandWidth*1,   errorElement: null,                             "successElement": null                              },
    SignupError:            { base: ErrorBandWidth*2,   errorElement: "gym-sign-up-error-div",          "successElement": null                              },
    LoginError:             { base: ErrorBandWidth*3,   errorElement: "gym-login-error-div",            "successElement": null                              },
    ForgotPasswordError:    { base: ErrorBandWidth*4,   errorElement: "gym-pwreset-error-div",          "successElement": "gym-pwreset-success-div"         },
    RecoverPasswordError:   { base: ErrorBandWidth*5,   errorElement: "gym-newpw-error-div",            "successElement": null                              },
    ChangePasswordError:    { base: ErrorBandWidth*6,   errorElement: "gym-update-pw-error-div",        "successElement": "gym-update-pw-success-div"       },
    CheckInError:           { base: ErrorBandWidth*7,   errorElement: "user-beta-confirm-error-div",    "successElement": "user-beta-confirm-success-div"   },
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
    case INVALID_PASSWORD:
        return "New password is invalid";
    case KEY_EXPIRED:
        return "This key has expired";
    case INVALID_KEY:
        return "This is not a valid key";
    case EMAIL_NOT_FOUND:
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
    // default
    //
    default:
        console.log("Unknown error:");
        console.log(error);
        return "Unknown error";
    }
}
