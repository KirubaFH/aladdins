// Branch Timings - Clean Version with Explicit Time Ranges
document.addEventListener("DOMContentLoaded", function() {
    const branchTimings = {
        "rugeley-branch": { open: 720, close: 180 },        // 12:00-3:00 (720-180, crosses midnight) 
        "brownhills-branch": { open: 720, close: 180 },     // 12:00-3:00 (720-180, crosses midnight)
        "cannock-branch": { open: 720, close: 180 },        // 12:00-3:00 (720-180, crosses midnight)
        "halesowen-branch": { open: 720, close: 180 },      // 12:00-3:00 (720-180, crosses midnight)
        "birmingham-branch": { open: 720, close: 180 },     // 12:00-3:00 (720-180, crosses midnight)
        "longbridge-branch": { open: 720, close: 180 },     // 12:00-3:00 (720-180, crosses midnight)
        "handsacre-branch": { open: 720, close: 1320 },     // 12:00-10:00 (720-1320, crosses midnight)
        "netherton-branch": { open: 720, close: 1380 },     // 12:00-11:00 (720-1380, crosses midnight)
        "upperGornal-branch": { open: 720, close: 0 },      // 12:00-0:00 (midnight)
        "stafford-branch": { open: 720, close: 0 },         // 12:00-0:00 (midnight)
        "wednesbury-branch": { open: 900, close: 180 },     // 15:00-3:00
        "willenhall-branch": { open: 900, close: 180 },     // 15:00-3:00
        "wolverhampton-branch": { open: 900, close: 180 },  // 15:00-3:00
        "tipton-branch": { open: 720, close: 180 },         // 12:00-3:00
        "greatBarr-branch": { open: 901, close: 181 },      // 15:01-3:01
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

// Opening Hours 
document.addEventListener("DOMContentLoaded", function () {

    function getUKDate() {
        const formatter = new Intl.DateTimeFormat("en-GB", {
            timeZone: "Europe/London",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            year: "numeric",
            month: "numeric",
            day: "numeric"
        });

        const parts = formatter.formatToParts(new Date());
        const lookup = Object.fromEntries(parts.map(p => [p.type, p.value]));

        // Construct clean ISO date string
        return new Date(
            `${lookup.year}-${lookup.month}-${lookup.day}T${lookup.hour}:${lookup.minute}:${lookup.second}`
        );
    }

    const ukNow = getUKDate();
    const today = ukNow.getDay();   // ALWAYS correct now
    console.log("Detected UK Time:", ukNow.toString());
  const storeTimings = {
    rugeley: {
      0: { day: 'Sun', hours: '12:00 PM - 03:00 AM' },
      1: { day: 'Mon', hours: '12:00 PM - 03:00 AM' },
      2: { day: 'Tue', hours: '12:00 PM - 03:00 AM' },
      3: { day: 'Wed', hours: '12:00 PM - 03:00 AM' },
      4: { day: 'Thu', hours: '12:00 PM - 03:00 AM' },
      5: { day: 'Fri', hours: '12:00 PM - 03:00 AM' },
      6: { day: 'Sat', hours: '12:00 PM - 03:00 AM' }
    },
    brownhills: {
      0: { day: 'Sun', hours: '12:00 PM - 03:00 AM' },
      1: { day: 'Mon', hours: '12:00 PM - 03:00 AM' },
      2: { day: 'Tue', hours: '12:00 PM - 03:00 AM' },
      3: { day: 'Wed', hours: '12:00 PM - 03:00 AM' },
      4: { day: 'Thu', hours: '12:00 PM - 03:00 AM' },
      5: { day: 'Fri', hours: '12:00 PM - 03:00 AM' },
      6: { day: 'Sat', hours: '12:00 PM - 03:00 AM' }
    },
    cannock: {
      0: { day: 'Sun', hours: '12:00 PM - 03:00 AM' },
      1: { day: 'Mon', hours: '12:00 PM - 03:00 AM' },
      2: { day: 'Tue', hours: '12:00 PM - 03:00 AM' },
      3: { day: 'Wed', hours: '12:00 PM - 03:00 AM' },
      4: { day: 'Thu', hours: '12:00 PM - 03:00 AM' },
      5: { day: 'Fri', hours: '12:00 PM - 03:00 AM' },
      6: { day: 'Sat', hours: '12:00 PM - 03:00 AM' }
    },
    halesowen: {
      0: { day: 'Sun', hours: '12:00 PM - 03:00 AM' },
      1: { day: 'Mon', hours: '12:00 PM - 03:00 AM' },
      2: { day: 'Tue', hours: '12:00 PM - 03:00 AM' },
      3: { day: 'Wed', hours: '12:00 PM - 03:00 AM' },
      4: { day: 'Thu', hours: '12:00 PM - 03:00 AM' },
      5: { day: 'Fri', hours: '12:00 PM - 03:00 AM' },
      6: { day: 'Sat', hours: '12:00 PM - 03:00 AM' }
    },
    kittsgreen: {
      0: { day: 'Sun', hours: '12:00 PM - 03:00 AM' },
      1: { day: 'Mon', hours: '12:00 PM - 03:00 AM' },
      2: { day: 'Tue', hours: '12:00 PM - 03:00 AM' },
      3: { day: 'Wed', hours: '12:00 PM - 03:00 AM' },
      4: { day: 'Thu', hours: '12:00 PM - 03:00 AM' },
      5: { day: 'Fri', hours: '12:00 PM - 03:00 AM' },
      6: { day: 'Sat', hours: '12:00 PM - 03:00 AM' }
    },
    uppergornal: {
      0: { day: 'Sun', hours: '12:00 PM - 12:00 AM' },
      1: { day: 'Mon', hours: '12:00 PM - 12:00 AM' },
      2: { day: 'Tue', hours: '12:00 PM - 12:00 AM' },
      3: { day: 'Wed', hours: '12:00 PM - 12:00 AM' },
      4: { day: 'Thu', hours: '12:00 PM - 12:00 AM' },
      5: { day: 'Fri', hours: '12:00 PM - 12:00 AM' },
      6: { day: 'Sat', hours: '12:00 PM - 12:00 AM' }
    },
    wednesbury: {
      0: { day: 'Sun', hours: '03:00 PM - 03:00 AM' },
      1: { day: 'Mon', hours: '03:00 PM - 03:00 AM' },
      2: { day: 'Tue', hours: '03:00 PM - 03:00 AM' },
      3: { day: 'Wed', hours: '03:00 PM - 03:00 AM' },
      4: { day: 'Thu', hours: '03:00 PM - 03:00 AM' },
      5: { day: 'Fri', hours: '03:00 PM - 03:00 AM' },
      6: { day: 'Sat', hours: '03:00 PM - 03:00 AM' }
    },
    willenhall: {
      0: { day: 'Sun', hours: '03:00 PM - 03:00 AM' },
      1: { day: 'Mon', hours: '03:00 PM - 03:00 AM' },
      2: { day: 'Tue', hours: '03:00 PM - 03:00 AM' },
      3: { day: 'Wed', hours: '03:00 PM - 03:00 AM' },
      4: { day: 'Thu', hours: '03:00 PM - 03:00 AM' },
      5: { day: 'Fri', hours: '03:00 PM - 03:00 AM' },
      6: { day: 'Sat', hours: '03:00 PM - 03:00 AM' }
    },
    wolverhampton: {
      0: { day: 'Sun', hours: '03:00 PM - 03:00 AM' },
      1: { day: 'Mon', hours: '03:00 PM - 03:00 AM' },
      2: { day: 'Tue', hours: '03:00 PM - 03:00 AM' },
      3: { day: 'Wed', hours: '03:00 PM - 03:00 AM' },
      4: { day: 'Thu', hours: '03:00 PM - 03:00 AM' },
      5: { day: 'Fri', hours: '03:00 PM - 03:00 AM' },
      6: { day: 'Sat', hours: '03:00 PM - 03:00 AM' }
    },
    greatbarr: {
      0: { day: 'Sun', hours: '03:01 PM - 03:01 AM' },
      1: { day: 'Mon', hours: '03:01 PM - 03:01 AM' },
      2: { day: 'Tue', hours: '03:01 PM - 03:01 AM' },
      3: { day: 'Wed', hours: '03:01 PM - 03:01 AM' },
      4: { day: 'Thu', hours: '03:01 PM - 03:01 AM' },
      5: { day: 'Fri', hours: '03:01 PM - 03:01 AM' },
      6: { day: 'Sat', hours: '03:01 PM - 03:01 AM' }
    },
    Tipton: {
      0: { day: 'Sun', hours: '12:00 PM - 03:00 AM' },
      1: { day: 'Mon', hours: '12:00 PM - 03:00 AM' },
      2: { day: 'Tue', hours: '12:00 PM - 03:00 AM' },
      3: { day: 'Wed', hours: '12:00 PM - 03:00 AM' },
      4: { day: 'Thu', hours: '12:00 PM - 03:00 AM' },
      5: { day: 'Fri', hours: '12:00 PM - 03:00 AM' },
      6: { day: 'Sat', hours: '12:00 PM - 03:00 AM' }
    },
    Stafford: {
      0: { day: 'Sun', hours: '12:00 PM - 12:00 AM' },
      1: { day: 'Mon', hours: '12:00 PM - 12:00 AM' },
      2: { day: 'Tue', hours: '12:00 PM - 12:00 AM' },
      3: { day: 'Wed', hours: '12:00 PM - 12:00 AM' },
      4: { day: 'Thu', hours: '12:00 PM - 12:00 AM' },
      5: { day: 'Fri', hours: '12:00 PM - 12:00 AM' },
      6: { day: 'Sat', hours: '12:00 PM - 12:00 AM' }
    },
    Netherton: {
      0: { day: 'Sun', hours: '12:00 PM - 11:00 PM' },
      1: { day: 'Mon', hours: '12:00 PM - 11:00 PM' },
      2: { day: 'Tue', hours: '12:00 PM - 11:00 PM' },
      3: { day: 'Wed', hours: '12:00 PM - 11:00 PM' },
      4: { day: 'Thu', hours: '12:00 PM - 11:00 PM' },
      5: { day: 'Fri', hours: '12:00 PM - 11:00 PM' },
      6: { day: 'Sat', hours: '12:00 PM - 11:00 PM' }
    },
    Longbridge: {
      0: { day: 'Sun', hours: '12:00 PM - 03:00 AM' },
      1: { day: 'Mon', hours: '12:00 PM - 03:00 AM' },
      2: { day: 'Tue', hours: '12:00 PM - 03:00 AM' },
      3: { day: 'Wed', hours: '12:00 PM - 03:00 AM' },
      4: { day: 'Thu', hours: '12:00 PM - 03:00 AM' },
      5: { day: 'Fri', hours: '12:00 PM - 03:00 AM' },
      6: { day: 'Sat', hours: '12:00 PM - 03:00 AM' }
    },
    Handsacre: {
      0: { day: 'Sun', hours: '12:00 PM - 03:00 AM' },
      1: { day: 'Mon', hours: '12:00 PM - 03:00 AM' },
      2: { day: 'Tue', hours: '12:00 PM - 03:00 AM' },
      3: { day: 'Wed', hours: '12:00 PM - 03:00 AM' },
      4: { day: 'Thu', hours: '12:00 PM - 03:00 AM' },
      5: { day: 'Fri', hours: '12:00 PM - 03:00 AM' },
      6: { day: 'Sat', hours: '12:00 PM - 03:00 AM' }
    },
    Handsacre: {
      0: { day: 'Sun', hours: '12:00 PM - 10:00 PM' },
      1: { day: 'Mon', hours: '12:00 PM - 10:00 PM' },
      2: { day: 'Tue', hours: '12:00 PM - 10:00 PM' },
      3: { day: 'Wed', hours: '12:00 PM - 10:00 PM' },
      4: { day: 'Thu', hours: '12:00 PM - 10:00 PM' },
      5: { day: 'Fri', hours: '12:00 PM - 10:00 PM' },
      6: { day: 'Sat', hours: '12:00 PM - 10:00 PM' }
    },
  };

function formatTiming(t) {
        if (!t) return '<span class="store-time">No hours available</span>';
        return `<span class="store-time">${t.day}: <b>${t.hours}</b></span>`;
    }

    document.querySelectorAll('.store').forEach(storeEl => {
        const storeId = storeEl.getAttribute('data-store-id');
        let hoursEl = storeEl.querySelector('.store-hours');

        if (!hoursEl) {
            hoursEl = document.createElement('div');
            hoursEl.className = 'store-hours';
            storeEl.appendChild(hoursEl);
        }

        const timings = storeTimings[storeId];
        const dayTiming = timings ? timings[today] : null;

        hoursEl.innerHTML = formatTiming(dayTiming);
    });

});