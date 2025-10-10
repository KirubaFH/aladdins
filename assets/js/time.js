document.addEventListener("DOMContentLoaded", function() {
    const branchTimings = {
        "rugeley-branch": {
            open: { hours: 16, minutes: 30 },   // 4:30 PM
            close: { hours: 7, minutes: 30 }    // 7:30 AM (next day)
        },
        "brownhills-branch": {
            open: { hours: 16, minutes: 30 },   // 4:30 PM
            close: { hours: 7, minutes: 30 }    // 7:30 AM (next day)
        },
        "cannock-branch": {
            open: { hours: 16, minutes: 30 },   // 4:30 PM
            close: { hours: 7, minutes: 30 }    // 7:30 AM (next day)
        },
        "halesowen-branch": {
            open: { hours: 16, minutes: 30 },   // 4:30 PM
            close: { hours: 4, minutes: 30 }    // 4:30 AM (next day)
        },
        "birmingham-branch": {
            open: { hours: 16, minutes: 30 },   // 4:30 PM
            close: { hours: 7, minutes: 30 }    // 7:30 AM (next day)
        },
        "upperGornal-branch": {
            open: { hours: 16, minutes: 30 },   // 4:30 PM
            close: { hours: 4, minutes: 30 }    // 4:30 AM (next day)
        },
        "wednesbury-branch": {
            open: { hours: 19, minutes: 30 },   // 7:30 PM
            close: { hours: 7, minutes: 30 }    // 7:30 AM (next day)
        },
        "willenhall-branch": {
            open: { hours: 19, minutes: 30 },   // 7:30 PM
            close: { hours: 7, minutes: 30 }    // 7:30 AM (next day)
        },
        "wolverhampton-branch": {
            open: { hours: 19, minutes: 30 },   // 7:30 PM
            close: { hours: 7, minutes: 30 }    // 7:30 AM (next day)
        },
        "greatBarr-branch": {
            open: { hours: 19, minutes: 31 },   // 7:31 PM
            close: { hours: 7, minutes: 31 }    // 7:31 AM (next day)
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
            const openTimeInMinutes = branch.open.hours * 60 + branch.open.minutes;
            const closeTimeInMinutes = branch.close.hours * 60 + branch.close.minutes;

            let isOpen = false;

            // Handle businesses that cross midnight (close time < open time)
            if (closeTimeInMinutes < openTimeInMinutes) {
                // Business crosses midnight (e.g., 12:00 to 03:00)
                // Only open if we're in the "overnight" period
                // This means we're either in the evening (after open time) OR early morning (before close time)
                if (currentTimeInMinutes >= openTimeInMinutes) {
                    // Evening hours (e.g., after 12:00 PM)
                    isOpen = true;
                } else if (currentTimeInMinutes < closeTimeInMinutes) {
                    // Early morning hours (e.g., before 3:00 AM)
                    isOpen = true;
                } else {
                    // Morning hours between close and open (e.g., 3:00 AM - 12:00 PM) - CLOSED
                    isOpen = false;
                }
            } else {
                // Business operates within the same day
                isOpen = currentTimeInMinutes >= openTimeInMinutes && currentTimeInMinutes < closeTimeInMinutes;
            }

            if (isOpen) {
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