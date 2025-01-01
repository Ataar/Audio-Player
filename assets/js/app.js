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

    // Display the time and date
    clock.innerHTML = `
        ${hours}:${minutes}:${seconds} <span class="am-pm">${amPm}</span><br>
        ${day}/${month}/${year}
    `;

    // Announce time at the start of each minute
    if (seconds === "00") {
        announceTimeInHindi(hours, minutes, amPm, day, month, year);
    }
};

const announceTimeInHindi = (hours, minutes, amPm, day, month, year) => {
    const amPmHindi = amPm === "AM" ? "सुबह के " : "शाम के ";
    const message = `अभी वक्त हुआ है देखो ${hours}:${minutes} ${amPmHindi}.और आज की तारीख है ${day}/${month}/${year}.अपडेट टाइम सुनने के लिए 1 मिनट इंतजार करें`;
    const speech = new SpeechSynthesisUtterance(message);

    const voices = window.speechSynthesis.getVoices();
    const hindiVoice = voices.find(voice => voice.lang === 'hi-IN');

    if (hindiVoice) {
        speech.voice = hindiVoice;
    } else {
        console.error("Hindi voice not found. Using default voice.");
    }

    speech.lang = 'hi-IN'; // Set the language to Hindi
    speech.rate = 1; // Normal speed
    speech.pitch = 1; // Normal pitch
    window.speechSynthesis.speak(speech);
};

// Ensure voices are loaded
window.speechSynthesis.onvoiceschanged = () => {
    console.log("Voices loaded.");
    setInterval(updateClock, 1000);
    updateClock();
};


