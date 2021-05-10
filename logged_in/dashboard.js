$(document).ready(function() {
    if (!checkLoggedIn()) {
        // Sanity - if no dashboard items, clear everything else to start
        // fresh
        clearState();
        console.log("Not logged in");
        return;
    }

    // Get the dashboard items.  For some, we'll have to massage them so
    // they look how we want for displaying
    var dashboard = JSON.parse(localStorage.getItem("dashboard"));

    document.getElementById("gym-name").innerText = data["organization_name"]
    if (data["location_name"] !== "") {
        document.getElementById("gym-location").innerText = data["location_name"]
        document.getElementById("gym-location").style.display = "none";
    } else {
        document.getElementById("gym-location").style.display = "block";
    }
})
