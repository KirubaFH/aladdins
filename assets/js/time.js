document.addEventListener("DOMContentLoaded", function() {
    const branchTimings = {
        "wednesbury-branch": {
            open: 15, // 11 AM
            close: 3 // 10 PM
        },
        "willenhall-branch": {
            open: 1, // 10 AM
            close: 3 // 11 PM
        }
    };

    async function fetchUKTime() {
        try {
            const response = await fetch("https://worldtimeapi.org/api/timezone/Europe/London");
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return new Date(data.datetime);
        } catch (error) {
            console.warn("Using local time as fallback");
            return new Date();
        }
    }

    function updateBranchStatus(ukTime) {
        const hour = ukTime.getHours();
        const minutes = ukTime.getMinutes();
        const currentTimeInMinutes = hour * 60 + minutes;

        Object.keys(branchTimings).forEach(branchId => {
            const indicator = document.getElementById(branchId);

            if (!indicator) return;

            const branch = branchTimings[branchId];
            const openTimeInMinutes = branch.open * 60;
            const closeTimeInMinutes = branch.close * 60;

            // Check if current time is within opening hours
            if (currentTimeInMinutes >= openTimeInMinutes && currentTimeInMinutes < closeTimeInMinutes) {
                indicator.classList.add("open");
                indicator.classList.remove("closed");
            } else {
                indicator.classList.add("closed");
                indicator.classList.remove("open");
            }
        });
    }

    async function updateIndicators() {
        const ukTime = await fetchUKTime();
        updateBranchStatus(ukTime);
    }

    // Initialize and update every minute
    updateIndicators();
    setInterval(updateIndicators, 60000);
});