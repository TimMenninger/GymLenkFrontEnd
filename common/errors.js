/*******************************************************************************
 *
 * C O M M O N
 *
 */

const ErrorBaseStep = 1000;
const ErrorInfo = {
    UnknownError:           { "success": -1,                "errorElement": null,                       "successElement": null                          },
    PasswordError:          { "success": ErrorBaseStep*1,   "errorElement": null,                       "successElement": null                          },
    SignupError:            { "success": ErrorBaseStep*2,   "errorElement": "gym-sign-up-error-div",    "successElement": null                          },
    LoginError:             { "success": ErrorBaseStep*3,   "errorElement": "gym-login-error-div",      "successElement": null                          },
    ForgotPasswordError:    { "success": ErrorBaseStep*4,   "errorElement": "gym-pwreset-error-div",    "successElement": "gym-pwreset-success-div"     },
    RecoverPasswordError:   { "success": ErrorBaseStep*5,   "errorElement": "gym-newpw-error-div",      "successElement": null                          },
    ChangePasswordError:    { "success": ErrorBaseStep*6,   "errorElement": "gym-update-pw-error-div",  "successElement": "gym-update-pw-success-div"   },
}

function getErrorInfo(error) {
    if (error >= ErrorInfo.PasswordError.success && error < (ErrorInfo.PasswordError.success + ErrorBaseStep)) {
        return ErrorInfo.PasswordError;
    }
    if (error >= ErrorInfo.SignupError.success && error < (ErrorInfo.SignupError.success + ErrorBaseStep)) {
        return ErrorInfo.SignupError;
    }
    if (error >= ErrorInfo.LoginError.success && error < (ErrorInfo.LoginError.success + ErrorBaseStep)) {
        return ErrorInfo.LoginError;
    }
    if (error >= ErrorInfo.ForgotPasswordError.success && error < (ErrorInfo.ForgotPasswordError.success + ErrorBaseStep)) {
        return ErrorInfo.ForgotPasswordError;
    }
    if (error >= ErrorInfo.RecoverPasswordError.success && error < (ErrorInfo.RecoverPasswordError.success + ErrorBaseStep)) {
        return ErrorInfo.RecoverPasswordError;
    }
    if (error >= ErrorInfo.ChangePasswordError.success && error < (ErrorInfo.ChangePasswordError.success + ErrorBaseStep)) {
        return ErrorInfo.ChangePasswordError;
    }
    return ErrorInfo.UnknownError;
}

function showError(error) {
    hideErrors();
    showErrorElement(getErrorInfo(error).errorElement, errorString(error));
}
function showSuccess(error_info) {
    hideErrors();
    showErrorElement(error_info.successElement, errorString(error_info.success));
}
function showErrorElement(element_name, error_desc) {
    var elem = document.getElementById(element_name);
    if (elem !== null) {
        elem.style.display = "block";
        elem.innerText = (error_desc !== null) ? error_desc : "Unknown error";
    }
}
function hideErrors(element_name) {
    for (error in ErrorInfo) {
        var error_elem = document.getElementById(ErrorInfo[error].errorElement);
        if (error_elem !== null) {
            error_elem.style.display = "none";
        }

        var success_elem = document.getElementById(ErrorInfo[error].successElement);
        if (success_elem !== null) {
            success_elem.style.display = "none";
        }
    }
}



/*******************************************************************************
 *
 * P A S S W O R D   E R R O R S
 *
 */

const PasswordError = {
    FAILURE:             -ErrorInfo.PasswordError.success,
    SUCCESS:              ErrorInfo.PasswordError.success + 0,
    MISMATCH:             ErrorInfo.PasswordError.success + 1,
    TOO_SHORT:            ErrorInfo.PasswordError.success + 2,
    NEEDS_LETTER:         ErrorInfo.PasswordError.success + 3,
    NEEDS_NONLETTER:      ErrorInfo.PasswordError.success + 4,
    PASSWORD_EMPTY:       ErrorInfo.PasswordError.success + 5,
    CONF_PASSWORD_EMPTY:  ErrorInfo.PasswordError.success + 6,
}
function stringToPasswordError(error_string) {
    if (error_string === "FAILURE") {
        return PasswordError.FAILURE;
    }
    if (error_string === "SUCCESS") {
        return PasswordError.SUCCESS;
    }
    if (error_string === "MISMATCH") {
        return PasswordError.MISMATCH;
    }
    if (error_string === "TOO_SHORT") {
        return PasswordError.TOO_SHORT;
    }
    if (error_string === "NEEDS_LETTER") {
        return PasswordError.NEEDS_LETTER;
    }
    if (error_string === "NEEDS_NONLETTER") {
        return PasswordError.NEEDS_NONLETTER;
    }
    if (error_string === "PASSWORD_EMPTY") {
        return PasswordError.PASSWORD_EMPTY;
    }
    if (error_string === "CONF_PASSWORD_EMPTY") {
        return PasswordError.CONF_PASSWORD_EMPTY;
    }
    return PasswordError.FAILURE;
}
function showPasswordError(error_type, password_error) {
    showErrorElement(error_type.errorElement, errorString(password_error));
}



/*******************************************************************************
 *
 * S I G N U P   E R R O R S
 *
 */

const SignupError = {
    FAILURE:             -ErrorInfo.SignupError.success,
    SUCCESS:              ErrorInfo.SignupError.success + 0,
    INVALID_EMAIL:        ErrorInfo.SignupError.success + 1,
    INVALID_PASSWORD:     ErrorInfo.SignupError.success + 2,
    ACCEPT_TERMS:         ErrorInfo.SignupError.success + 3,
    EMAIL_EMPTY:          ErrorInfo.SignupError.success + 4,
    EMAIL_EXISTS:         ErrorInfo.SignupError.success + 5,
}
function stringToSignupError(error_string) {
    if (error_string === "FAILURE") {
        return SignupError.FAILURE;
    }
    if (error_string === "SUCCESS") {
        return SignupError.SUCCESS;
    }
    if (error_string === "INVALID_EMAIL") {
        return SignupError.INVALID_EMAIL;
    }
    if (error_string === "INVALID_PASSWORD") {
        return PasswordError.INVALID_PASSWORD;
    }
    if (error_string === "ACCEPT_TERMS") {
        return SignupError.ACCEPT_TERMS;
    }
    if (error_string === "EMAIL_EMPTY") {
        return SignupError.EMAIL_EMPTY;
    }
    if (error_string === "EMAIL_EXISTS") {
        return SignupError.EMAIL_EXISTS;
    }
    return SignupError.FAILURE;
}



/*******************************************************************************
 *
 * L O G I N   E R R O R S
 *
 */

const LoginError = {
    FAILURE:             -ErrorInfo.LoginError.success,
    SUCCESS:              ErrorInfo.LoginError.success + 0,
    INCORRECT_PASSWORD:   ErrorInfo.LoginError.success + 1,
    EMAIL_EMPTY:          ErrorInfo.LoginError.success + 2,
    PASSWORD_EMPTY:       ErrorInfo.LoginError.success + 3,
}
function stringToLoginError(error_string) {
    if (error_string === "FAILURE") {
        return LoginError.FAILURE;
    }
    if (error_string === "SUCCESS") {
        return LoginError.SUCCESS;
    }
    if (error_string === "INCORRECT_PASSWORD") {
        return LoginError.INCORRECT_PASSWORD;
    }
    if (error_string == "EMAIL_EMPTY") {
        return RecoverPasswordError.EMAIL_EMPTY;
    }
    if (error_string == "PASSWORD_EMPTY") {
        return RecoverPasswordError.PASSWORD_EMPTY;
    }
    return LoginError.FAILURE;
}



/*******************************************************************************
 *
 * F O R G O T   P A S S W O R D   E R R O R S
 *
 */

const ForgotPasswordError = {
    FAILURE:             -ErrorInfo.ForgotPasswordError.success,
    SUCCESS:              ErrorInfo.ForgotPasswordError.success + 0,
    INVALID_EMAIL:        ErrorInfo.ForgotPasswordError.success + 1,
    EMAIL_NOT_FOUND:      ErrorInfo.ForgotPasswordError.success + 2,
    EMAIL_EMPTY:          ErrorInfo.ForgotPasswordError.success + 3,
}
function stringToForgotPasswordError(error_string) {
    if (error_string === "FAILURE") {
        return ForgotPasswordError.FAILURE;
    }
    if (error_string === "SUCCESS") {
        return ForgotPasswordError.SUCCESS;
    }
    if (error_string === "INVALID_EMAIL") {
        return ForgotPasswordError.INVALID_EMAIL;
    }
    if (error_string === "EMAIL_NOT_FOUND") {
        return ForgotPasswordError.EMAIL_NOT_FOUND;
    }
    if (error_string === "EMAIL_EMPTY") {
        return PasswordError.EMAIL_EMPTY;
    }
    return ForgotPasswordError.FAILURE;
}



/*******************************************************************************
 *
 * R E C O V E R   P A S S W O R D   E R R O R S
 *
 */

const RecoverPasswordError = {
    FAILURE:             -ErrorInfo.RecoverPasswordError.success,
    SUCCESS:              ErrorInfo.RecoverPasswordError.success + 0,
    INVALID_PASSWORD:     ErrorInfo.RecoverPasswordError.success + 1,
    KEY_EXPIRED:          ErrorInfo.RecoverPasswordError.success + 2,
    INVALID_KEY:          ErrorInfo.RecoverPasswordError.success + 3,
    EMAIL_NOT_FOUND:      ErrorInfo.RecoverPasswordError.success + 4,
}
function stringToRecoverPasswordError(error_string) {
    if (error_string === "FAILURE") {
        return RecoverPasswordError.FAILURE;
    }
    if (error_string === "SUCCESS") {
        return RecoverPasswordError.SUCCESS;
    }
    if (error_string == "INVALID_PASSWORD") {
        return RecoverPasswordError.INVALID_PASSWORD;
    }
    if (error_string == "KEY_EXPIRED") {
        return RecoverPasswordError.KEY_EXPIRED;
    }
    if (error_string == "INVALID_KEY") {
        return RecoverPasswordError.INVALID_KEY;
    }
    if (error_string == "EMAIL_NOT_FOUND") {
        return RecoverPasswordError.EMAIL_NOT_FOUND;
    }
    return RecoverPasswordError.FAILURE;
}



/*******************************************************************************
 *
 * C H A N G E   P A S S W O R D   E R R O R S
 *
 */

const ChangePasswordError = {
    FAILURE:             -ErrorInfo.ChangePasswordError.success,
    SUCCESS:              ErrorInfo.ChangePasswordError.success + 0,
    INVALID_PASSWORD:     ErrorInfo.ChangePasswordError.success + 1,
    INCORRECT_PASSWORD:   ErrorInfo.ChangePasswordError.success + 2,
    PASSWORD_EMPTY:       ErrorInfo.ChangePasswordError.success + 3,
}
function stringToChangePasswordError(error_string) {
    if (error_string === "FAILURE") {
        return ChangePasswordError.FAILURE;
    }
    if (error_string === "SUCCESS") {
        return ChangePasswordError.SUCCESS;
    }
    if (error_string == "INVALID_PASSWORD") {
        return ChangePasswordError.INVALID_PASSWORD;
    }
    if (error_string == "INCORRECT_PASSWORD") {
        return ChangePasswordError.INCORRECT_PASSWORD;
    }
    if (error_string == "PASSWORD_EMPTY") {
        return ChangePasswordError.PASSWORD_EMPTY;
    }
    return ChangePasswordError.FAILURE;
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
    // default
    //
    default:
        console.log("Unknown error:");
        console.log(error);
        return "Unknown error";
    }
}
