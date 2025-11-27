function loadbellaboo() {
    document.getElementById('opening-screen').style.top = '-100%';
    setTimeout(() => {
        document.getElementById('opening-screen').remove();
        document.getElementById('page-after-open').style.display = 'block';
    }, 750);
}

function timeSince(dateString) {
    const start = new Date(dateString);
    const now = new Date();
    let diff = now - start;
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const week = 7 * day;
    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    if (months < 0) {
        years--;
        months += 12;
    }
    const midDate = new Date(start);
    midDate.setFullYear(start.getFullYear() + years);
    midDate.setMonth(start.getMonth() + months);
    diff = now - midDate;
    const weeks = Math.floor(diff / week);
    diff -= weeks * week;
    const days = Math.floor(diff / day);
    diff -= days * day;
    const hours = Math.floor(diff / hour);
    diff -= hours * hour;
    const minutes = Math.floor(diff / minute);
    diff -= minutes * minute;
    const seconds = Math.floor(diff / 1000);
    return { years, months, weeks, days, hours, minutes, seconds };
}


function startTimeSinceLoop(dateString, callback) {
    function tick() {
        const diff = timeSince(dateString);
        callback(diff);
    }
    tick();
    return setInterval(tick, 1000);
}

const dateString = "2025-08-03T07:15:00";

const timerId = startTimeSinceLoop(dateString, diff => {
    document.getElementById('timer-years').innerText = `${diff.years} Years`;
    document.getElementById('timer-months').innerText = `${diff.months} Months`;
    document.getElementById('timer-weeks').innerText = `${diff.weeks} Weeks`;
    document.getElementById('timer-days').innerText = `${diff.days} Days`;
    document.getElementById('timer-hours').innerText = `${diff.hours} Hours`;
    document.getElementById('timer-minutes').innerText = `${diff.minutes} Minutes`;
    document.getElementById('timer-seconds').innerText = `${diff.seconds} Seconds`;
});
