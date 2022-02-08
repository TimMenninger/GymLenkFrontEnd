function start() {
    gapi.load("auth2", function() {
        auth2 = gapi.auth2.init({
            client_id: GAPI_client_id + ".apps.googleusercontent.com",
            Scopes to request in addition to "profile" and "email"
            scope: "https://www.googleapis.com/auth/business.manage",
            immediate: true
        });
    });
}
