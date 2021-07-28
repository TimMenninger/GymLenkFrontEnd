$(document).ready(function() {
    // If logged in, set some callbacks and stuff.  Otherwise this isn't loaded
    ifLoggedIn(function() {
        // Gym name goes on side bar
        displayOrganizationName("sidebar-gym-name-2");

        // Log out when sidebar log out is clicked
        document.getElementById("sidebar-log-out").addEventListener("click", function() {
            clearState();
        });
    });
});
