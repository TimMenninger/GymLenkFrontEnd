$(document).ready(function() {
    // If logged in, set some callbacks and stuff.  Otherwise this isn't loaded
    ifLoggedIn(function() {
        // Dashboard info to get gym name
        var data = JSON.parse(localStorage.getItem("dashboard"));

        // Gym name goes on side bar
        document.getElementById("sidebar-gym-name-2").innerText = data["organization_name"];

        // Log out when sidebar log out is clicked
        document.getElementById("sidebar-log-out").addEventListener("click", function() {
            clearState();
        });
    });
});
