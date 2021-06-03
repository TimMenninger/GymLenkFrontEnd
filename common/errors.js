/*******************************************************************************
 *
 * P A S S W O R D   E R R O R S
 *
 */

const PasswordError = {
    FAILURE:             -1,
    SUCCESS:              0,
    MISMATCH:             1,
    TOO_SHORT:            2,
    NEEDS_LETTER:         3,
    NEEDS_NONLETTER:      4,
    PASSWORD_EMPTY:       5,
    CONF_PASSWORD_EMPTY:  6,
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
function passwordErrorString(error) {
    switch (error) {
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
    default:
        return "Error changing password";
    }
}



/*******************************************************************************
 *
 * S I G N U P   E R R O R S
 *
 */

const SignupError = {
    FAILURE:             -1,
    SUCCESS:              0,
    INVALID_EMAIL:        1,
    INVALID_PASSWORD:     2,
    ACCEPT_TERMS:         3,
    EMAIL_EMPTY:          4,
    EMAIL_EXISTS:         5,
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
function signupErrorString(error) {
    switch (error) {
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
    default:
        return "Error signing up";
    }
}



/*******************************************************************************
 *
 * L O G I N   E R R O R S
 *
 */

const LoginError = {
    FAILURE:             -1,
    SUCCESS:              0,
    INCORRECT_PASSWORD:   1,
    EMAIL_EMPTY:          2,
    PASSWORD_EMPTY:       3,
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
function loginErrorString(error) {
    switch (error) {
    case LoginError.SUCCESS:
        return "Success";
    case LoginError.INCORRECT_PASSWORD:
        return "Incorrect email/password combination";
    case EMAIL_EMPTY:
        return "Email is empty";
    case PASSWORD_EMPTY:
        return "Password is empty";
    case LoginError.FAILURE:
    default:
        return "Error logging in";
    }
}



/*******************************************************************************
 *
 * F O R G O T   P A S S W O R D   E R R O R S
 *
 */

const ForgotPasswordError = {
    FAILURE:             -1,
    SUCCESS:              0,
    INVALID_EMAIL:        1,
    EMAIL_NOT_FOUND:      2,
    EMAIL_EMPTY:          3,
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
function forgotPasswordErrorString(error) {
    switch (error) {
    case ForgotPasswordError.SUCCESS:
        return "Password link emailed";
    case ForgotPasswordError.INVALID_EMAIL:
        return "Email was invalid";
    case ForgotPasswordError.EMAIL_NOT_FOUND:
        return "No account found for that email";
    case ForgotPasswordError.EMAIL_EMPTY:
        return "Please enter an email";
    case ForgotPasswordError.FAILURE:
    default:
        return "Error getting password link";
    }
}



/*******************************************************************************
 *
 * R E C O V E R   P A S S W O R D   E R R O R S
 *
 */

const RecoverPasswordError = {
    FAILURE:             -1,
    SUCCESS:              0,
    INVALID_PASSWORD:     1,
    KEY_EXPIRED:          2,
    INVALID_KEY:          3,
    EMAIL_NOT_FOUND:      4,
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
function recoverPasswordErrorString(error) {
    switch (error) {
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
    default:
        return "Error getting password link";
    }
}

