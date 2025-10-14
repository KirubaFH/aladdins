// Branch Timings   
document.addEventListener("DOMContentLoaded", function() {
    const branchTimings = {
        "rugeley-branch": {
            open: { hours: 12, minutes: 0 },   // 12:00 PM UK time
            close: { hours: 3, minutes: 0 }    // 3:00 AM UK time (next day)
        },
        "brownhills-branch": {
            open: { hours: 12, minutes: 0 },   // 12:00 PM UK time
            close: { hours: 3, minutes: 0 }    // 3:00 AM UK time (next day)
        },
        "cannock-branch": {
            open: { hours: 12, minutes: 0 },   // 12:00 PM UK time
            close: { hours: 3, minutes: 0 }    // 3:00 AM UK time (next day)
        },
        "halesowen-branch": {
            open: { hours: 12, minutes: 0 },   // 12:00 PM UK time
            close: { hours: 3, minutes: 0 }    // 3:00 AM UK time (next day)
        },
        "birmingham-branch": {
            open: { hours: 12, minutes: 0 },   // 12:00 PM UK time
            close: { hours: 3, minutes: 0 }    // 3:00 AM UK time (next day)
        },
        "upperGornal-branch": {
            open: { hours: 12, minutes: 0 },   // 12:00 PM UK time
            close: { hours: 0, minutes: 0 }    // 12:00 AM UK time (next day)
        },
        "wednesbury-branch": {
            open: { hours: 15, minutes: 0 },   // 3:00 PM UK time
            close: { hours: 3, minutes: 0 }    // 3:00 AM UK time (next day)
        },
        "willenhall-branch": {
            open: { hours: 15, minutes: 0 },   // 3:00 PM UK time
            close: { hours: 3, minutes: 0 }    // 3:00 AM UK time (next day)
        },
        "wolverhampton-branch": {
            open: { hours: 15, minutes: 0 },   // 3:00 PM UK time
            close: { hours: 3, minutes: 0 }    // 3:00 AM UK time (next day)
        },
        "greatBarr-branch": {
            open: { hours: 15, minutes: 1 },   // 3:01 PM UK time
            close: { hours: 3, minutes: 1 }    // 3:01 AM UK time (next day)
        }
    };

    async function fetchUKTime() {
    try {
        const response = await fetch("https://worldtimeapi.org/api/timezone/Europe/London");
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return new Date(data.datetime);
    } catch (error) {
        console.warn("API failed, using browser UK time");
        return new Date(new Date().toLocaleString("en-US", {timeZone: "Europe/London"}));
    }
}

    function updateBranchStatus(ukTime) {
        console.log("Current UK time:", ukTime.toLocaleString('en-GB', { timeZone: 'Europe/London' }));
        
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

            console.log(`${branchId}: Open at ${branch.open.hours}:${branch.open.minutes}, Close at ${branch.close.hours}:${branch.close.minutes}, Current: ${hour}:${minutes}`);

            // Handle businesses that cross midnight (close time < open time)
            if (closeTimeInMinutes < openTimeInMinutes) {
                // Business crosses midnight
                if (currentTimeInMinutes >= openTimeInMinutes) {
                    // Evening hours (after open time)
                    isOpen = true;
                } else if (currentTimeInMinutes < closeTimeInMinutes) {
                    // Early morning hours (before close time)
                    isOpen = true;
                } else {
                    // Morning hours between close and open - CLOSED
                    isOpen = false;
                }
            } else {
                // Business operates within the same day
                isOpen = currentTimeInMinutes >= openTimeInMinutes && currentTimeInMinutes < closeTimeInMinutes;
            }

            if (isOpen) {
                indicator.classList.add("open");
                indicator.classList.remove("closed");
                console.log(`${branchId}: OPEN`);
            } else {
                indicator.classList.add("closed");
                indicator.classList.remove("open");
                console.log(`${branchId}: CLOSED`);
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