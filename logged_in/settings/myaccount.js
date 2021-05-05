$(document).ready(function() {
    if (!checkLoggedIn()) {
        // Sanity - if no dashboard items, clear everything else to start
        // fresh
        clearState();

        // TODO
        console.log("Not logged in");
        return;
    }
})

