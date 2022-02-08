$(document).ready(function() {
    // If not logged in, go back to sign in
    ifNotLoggedIn(function() {
        clearState();
        window.location.replace(URL_landing_after_involuntary_logout());
        return;
    });

    // Hack for making the selection bar on the left highlight "settings" for
    // this tab within settings
    var Webflow = Webflow || [];
    Webflow.push(function() {
        $('#settings-sidebar-link').addClass("w--current");
    });
});

document.getElementById("link-gmb-button").addEventListener("click", function() {
    auth2.grantOfflineAccess().then(function(authResult) {
        console.log(authResult);
    });
});
