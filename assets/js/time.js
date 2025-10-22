// Branch Timings - Clean Version with Explicit Time Ranges
document.addEventListener("DOMContentLoaded", function() {
    const branchTimings = {
        "rugeley-branch": { open: 720, close: 180 },        // 12:00-3:00 (720-180, crosses midnight) 
        "brownhills-branch": { open: 720, close: 180 },     // 12:00-3:00 (720-180, crosses midnight)
        "cannock-branch": { open: 720, close: 180 },        // 12:00-3:00 (720-180, crosses midnight)
        "halesowen-branch": { open: 720, close: 180 },      // 12:00-3:00 (720-180, crosses midnight)
        "birmingham-branch": { open: 720, close: 180 },     // 12:00-3:00 (720-180, crosses midnight)
        "upperGornal-branch": { open: 720, close: 0 },      // 12:00-0:00 (midnight)
        "wednesbury-branch": { open: 900, close: 180 },     // 15:00-3:00
        "willenhall-branch": { open: 900, close: 180 },     // 15:00-3:00
        "wolverhampton-branch": { open: 900, close: 180 },  // 15:00-3:00
        "greatBarr-branch": { open: 901, close: 181 }       // 15:01-3:01
    };

    function getUKTime() {
        const now = new Date();
        return new Date(now.toLocaleString("en-US", { timeZone: "Europe/London" }));
    }

    function updateBranchStatus() {
        const ukTime = getUKTime();
        const currentMinutes = ukTime.getHours() * 60 + ukTime.getMinutes();

        console.log(`UK Time: ${ukTime.getHours()}:${ukTime.getMinutes().toString().padStart(2, '0')} (${currentMinutes}min)`);

        Object.keys(branchTimings).forEach(branchId => {
            const indicator = document.getElementById(branchId);
            if (!indicator) return;

            const { open, close } = branchTimings[branchId];
            
            // Simple logic: crosses midnight if close < open
            const isOpen = close < open ? 
                (currentMinutes >= open || currentMinutes < close) :
                (currentMinutes >= open && currentMinutes < close);

            indicator.classList.toggle("open", isOpen);
            indicator.classList.toggle("closed", !isOpen);
            
            // console.log(`${branchId}: ${isOpen ? 'OPEN' : 'CLOSED'} (${open}-${close}min)`);
        });
    }

    updateBranchStatus();
    setInterval(updateBranchStatus, 30000);
});