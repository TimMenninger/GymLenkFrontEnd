$(document).ready(function() {
    // If not logged in, go back to sign in
    ifNotLoggedIn(function() {
        clearState();
        window.location.replace(URL_landing_after_involuntary_logout());
        return;
    })

    // Get the dashboard items.  For some, we'll have to massage them so
    // they look how we want for displaying
    var dashboard = JSON.parse(localStorage.getItem("dashboard"));

    document.getElementById("gym-name").innerText = dashboard["organization_name"]
    if (dashboard["location_name"] !== "") {
        document.getElementById("gym-location").innerText = dashboard["location_name"]
        document.getElementById("gym-location").style.display = "block";
    } else {
        document.getElementById("gym-location").style.display = "none";
    }
});
