<script>
    $(document).ready(function() {
        if (!loggedIn()) {
            // Sanity - if no dashboard items, clear everything else to start
            // fresh
            clearState();

            // TODO
            console.log("Not logged in");
            return;
        }

        // Get the dashboard items.  For some, we'll have to massage them so
        // they look how we want for displaying
        var dashboard = JSON.parse(localStorage.getItem("dashboard"));

        // Address came in parts, make it line1 / line2 / city, state zip
        var address = "[No Address]";
        if ("address" in dashboard) {
            var address_lines = [];
            if ("line1" in dashboard["address"]) {
                address_lines.push(dashboard["address"]["line1"])
            }
            if ("line2" in dashboard["address"]) {
                address_lines.push(dashboard["address"]["line2"])
            }
            if ("city" in dashboard["address"] && "state" in dashboard["address"] && "zip" in dashboard["address"]) {
                address_lines.push(dashboard["address"]["city"] + ", " + dashboard["address"]["state"] + " " + dashboard["address"]["zip"]);
            }

            address_lines.filter(function (el) {
                return el !== null && el !== "";
            })

            if (address_lines.length > 0) {
                address = address_lines.join("\n");
            }
        }

        // Hours. Description of how to interpret array is in dashboard.go
        var hours = "[Not Specified]";
        if ("hours" in dashboard) {
            hours_list = [];
            sunday_hours = "[Not Specified]";
            if ("Sunday" in dashboard["hours"]) {
                if (dashboard["hours"]["Sunday"].length === 1) {
                    if (dashboard["hours"]["Sunday"][0] === -1) {
                        sunday_hours = "Closed";
                    } else if (dashboard["hours"]["Sunday"][0] === 0) {
                        sunday_hours = "24 Hours";
                    }
                } else if (dashboard["hours"]["Sunday"].length > 1) {
                    // TODO
                }
            }
            hours_list.push("Sunday: " + sunday_hours);
        }

        function setOrDefault(element_id, dashboard_key, default_value) {
            document.getElementbyId(element_id).innerText = (dashboard_key in dashboard)
                ? dashboard[dashboard_key]
                : document.getElementbyId(element_id).innerText = default_value;
        }

        setOrDefault("gym-name",         "organizationName", "[No Name]");
        setOrDefault("gym-name2",        "organizationName", "[No Name]");
        setOrDefault("gym-location",     "locationName",     "");
        setOrDefault("gym-location2",    "locationName",     "");
        setOrDefault("gym-phone-number", "phone",            "[No Phone]");
        setOrDefault("gym-email",        "email",            "[No Email]");
        setOrDefault("gym-website-link", "website",          "[No URL]");
        setOrDefault("gym-description",  "description",      "[No Description]");
        document.getElementById("gym-address").innerText = address;
        document.getElementById("gym-hours").innerText   = "hello\nhi";
    })
</script>
