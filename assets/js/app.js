let lastAnnouncedMinute = null;
let isActivated = false; // Track if user activation occurred

const updateClock = () => {
    const clock = document.getElementById('clock');
    const now = new Date();

    // Get the time
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    // Determine AM or PM
    const amPm = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12 || 12;

    // Get the date
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = now.getFullYear();

    // Get the day of the week
    const daysOfWeek = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
    const dayOfWeek = daysOfWeek[now.getDay()]; // Get the current day of the week

    // Display the time and date
    clock.innerHTML = `
        ${hours}:${minutes}:${seconds} <span class="am-pm">${amPm}</span><br>
        ${dayOfWeek} ${day}/${month}/${year}
    `;

    // Announce time only at the start of a new minute if activated
    const currentMinute = `${hours}:${minutes} ${amPm}`;
    if (isActivated && seconds === "00" && lastAnnouncedMinute !== currentMinute) {
        lastAnnouncedMinute = currentMinute;
        announceTimeInHindi(hours, minutes, amPm, day, month, year, dayOfWeek);
    }
};

const announceTimeInHindi = (hours, minutes, amPm, day, month, year, dayOfWeek) => {
    const amPmHindi = amPm === "AM" ? "सुबह के " : "शाम के ";
    const message = `अभी वक्त हुआ है देखो ${hours}:${minutes} ${amPmHindi}. आज ${dayOfWeek} है और आज की तारीख है ${day}/${month}/${year}. आप इस नंबर पर संपर्क कर सकते हैं 7058804143. Thank You!`;
    const speech = new SpeechSynthesisUtterance(message);

    // Load voices and find a Hindi voice
    const voices = window.speechSynthesis.getVoices();
    const hindiVoice = voices.find(voice => voice.lang === 'hi-IN');

    if (hindiVoice) {
        speech.voice = hindiVoice;
    } else {
        console.error("Hindi voice not found. Using default voice.");
    }

    // Set speech properties
    speech.lang = 'hi-IN';
    speech.rate = 1;
    speech.pitch = 1;

    // Speak the message
    window.speechSynthesis.speak(speech);
};

const startClock = () => {
    // Ensure voices are loaded before starting announcements
    if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
            console.log("Voices loaded.");
            setInterval(updateClock, 1000); // Update the clock every second
            updateClock(); // Ensure the clock updates immediately on load
        };
    } else {
        console.log("Voices already loaded.");
        setInterval(updateClock, 1000); // Update the clock every second
        updateClock(); // Ensure the clock updates immediately on load
    }
};

// Add event listener for user activation
document.getElementById('startButton').addEventListener('click', () => {
    isActivated = true; // Allow announcements after activation
    console.log("Speech synthesis activated.");
    startClock();
});
