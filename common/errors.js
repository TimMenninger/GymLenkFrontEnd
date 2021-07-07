/*******************************************************************************
 *
 * C O M M O N
 *
 */

const ErrorBaseStep = 1000;
const ErrorInfo = {
    UnknownError:           { "base": -1,               "success": -1,                              "errorElement": null,                       "successElement": null                          },
    PasswordError:          { "base": ErrorBaseStep*1,  "success": PasswordError.SUCCESS,           "errorElement": null,                       "successElement": null                          },
    SignupError:            { "base": ErrorBaseStep*2,  "success": SignupError.SUCCESS,             "errorElement": "gym-sign-up-error-div",    "successElement": null                          },
    LoginError:             { "base": ErrorBaseStep*3,  "success": LoginError.SUCCESS,              "errorElement": "gym-login-error-div",      "successElement": null                          },
    ForgotPasswordError:    { "base": ErrorBaseStep*4,  "success": ForgotPasswordError.SUCCESS,     "errorElement": "gym-pwreset-error-div",    "successElement": "gym-pwreset-success-div"     },
    RecoverPasswordError:   { "base": ErrorBaseStep*5,  "success": RecoverPasswordError.SUCCESS,    "errorElement": "gym-newpw-error-div",      "successElement": null                          },
    ChangePasswordError:    { "base": ErrorBaseStep*6,  "success": ChangePasswordError.SUCCESS,     "errorElement": "gym-update-pw-error-div",  "successElement": "gym-update-pw-success-div"   },
}

function getErrorInfo(error) {
    if (error >= ErrorInfo.PasswordError && error < (ErrorInfo.PasswordError + ErrorInfoStep)) {
        return ErrorInfo.PasswordError;
    }
    if (error >= ErrorInfo.SignupError && error < (ErrorInfo.SignupError + ErrorInfoStep)) {
        return ErrorInfo.SignupError;
    }
    if (error >= ErrorInfo.LoginError && error < (ErrorInfo.LoginError + ErrorInfoStep)) {
        return ErrorInfo.LoginError;
    }
    if (error >= ErrorInfo.ForgotPasswordError && error < (ErrorInfo.ForgotPasswordError + ErrorInfoStep)) {
        return ErrorInfo.ForgotPasswordError;
    }
    if (error >= ErrorInfo.RecoverPasswordError && error < (ErrorInfo.RecoverPasswordError + ErrorInfoStep)) {
        return ErrorInfo.RecoverPasswordError;
    }
    if (error >= ErrorInfo.ChangePasswordError && error < (ErrorInfo.ChangePasswordError + ErrorInfoStep)) {
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
    showErrorElement(error_info.successElement, error_info.base);
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
    FAILURE:             -ErrorBase.PasswordError,
    SUCCESS:              ErrorBase.PasswordError + 0,
    MISMATCH:             ErrorBase.PasswordError + 1,
    TOO_SHORT:            ErrorBase.PasswordError + 2,
    NEEDS_LETTER:         ErrorBase.PasswordError + 3,
    NEEDS_NONLETTER:      ErrorBase.PasswordError + 4,
    PASSWORD_EMPTY:       ErrorBase.PasswordError + 5,
    CONF_PASSWORD_EMPTY:  ErrorBase.PasswordError + 6,
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
    FAILURE:             -ErrorBase.SignupError,
    SUCCESS:              ErrorBase.SignupError + 0,
    INVALID_EMAIL:        ErrorBase.SignupError + 1,
    INVALID_PASSWORD:     ErrorBase.SignupError + 2,
    ACCEPT_TERMS:         ErrorBase.SignupError + 3,
    EMAIL_EMPTY:          ErrorBase.SignupError + 4,
    EMAIL_EXISTS:         ErrorBase.SignupError + 5,
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
    FAILURE:             -ErrorBase.LoginError,
    SUCCESS:              ErrorBase.LoginError + 0,
    INCORRECT_PASSWORD:   ErrorBase.LoginError + 1,
    EMAIL_EMPTY:          ErrorBase.LoginError + 2,
    PASSWORD_EMPTY:       ErrorBase.LoginError + 3,
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
    FAILURE:             -ErrorBase.ForgotPasswordError,
    SUCCESS:              ErrorBase.ForgotPasswordError + 0,
    INVALID_EMAIL:        ErrorBase.ForgotPasswordError + 1,
    EMAIL_NOT_FOUND:      ErrorBase.ForgotPasswordError + 2,
    EMAIL_EMPTY:          ErrorBase.ForgotPasswordError + 3,
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
    FAILURE:             -ErrorBase.RecoverPasswordError,
    SUCCESS:              ErrorBase.RecoverPasswordError + 0,
    INVALID_PASSWORD:     ErrorBase.RecoverPasswordError + 1,
    KEY_EXPIRED:          ErrorBase.RecoverPasswordError + 2,
    INVALID_KEY:          ErrorBase.RecoverPasswordError + 3,
    EMAIL_NOT_FOUND:      ErrorBase.RecoverPasswordError + 4,
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
    FAILURE:             -ErrorBase.ChangePasswordError,
    SUCCESS:              ErrorBase.ChangePasswordError + 0,
    INVALID_PASSWORD:     ErrorBase.ChangePasswordError + 1,
    INCORRECT_PASSWORD:   ErrorBase.ChangePasswordError + 2,
    PASSWORD_EMPTY:       ErrorBase.ChangePasswordError + 3,
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
