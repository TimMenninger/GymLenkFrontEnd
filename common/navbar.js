$(document).ready(function() {
    // If logged in, set some callbacks and stuff.  Otherwise this isn't loaded
    ifLoggedIn(function() {
        // Log out when navbar logout is pressed
        if (document.getElementById("navbar-log-out") !== nil) {
            document.getElementById("navbar-log-out").addEventListener("click", function() {
                clearState();
            });
        }

        // Log out when navbar logout is pressed
        if (document.getElementById("navbar-gymlenk-button") === nil) {
            document.getElementById("navbar-gymlenk-button").addEventListener("click", function() {
                window.location.replace(URL_homepage);
            });
        }

        // Gym name
        displayOrganizationName("gym-name");
    });
});

