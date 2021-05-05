$(document).ready(function() {
    if (!checkLoggedIn()) {
        // Sanity - if no dashboard items, clear everything else to start
        // fresh
        clearState();

        // TODO
        console.log("Not logged in");
        return;
    }

    /* Format phone number */
    const inputElement = document.getElementById("gym-edit-phone");
    inputElement.addEventListener("keydown", enforceFormat);
    inputElement.addEventListener("keyup", formatToPhone);
})

