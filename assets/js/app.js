// List of audio files
const audioFiles = [
        { audio: "1mp4_rrv0wHLB.mp3" },
        { audio: "2mp4_QNM1yUR5.mp3" },
        { audio: "3_0b4KrBAO.mp3" },
        { audio: "4.mp3" },
        { audio: "5mp4_kAPP35NP.mp3" },
        { audio: "6ya_lili_yalila.mp3" },
        { audio: "7vande_mataram.mp3" },
        { audio:'8mp4_FEf7X0hs.mp3'},
        { audio:'9mp4_mIWlqV9m.mp3'},
        { audio:'10mp4_FNJ9lgxA.mp3'},
        { audio:'11.mp3'},
        { audio:'12mp4_pIEz2h5t.mp3'},
];

const boxContainer = document.getElementById('box-container');
audioFiles.forEach((audioSource, index) => {
const wrapper = document.createElement('div');
wrapper.style.textAlign = 'center'; 
wrapper.style.marginBottom = '20px'; 

   
    const box = document.createElement('div');
    box.classList.add('box');
    box.style.backgroundColor = ["lightgray", "lightcoral", 'lightgreen', "lightblue", "GreenYellow",'#490a0a','pink','gray'
   ,'#583d6c','#bb5f91','#141313','#11b072'][index] || 'lightgray';
    box.style.width = '100px';
    box.style.height = '100px'; 
    box.style.margin = '0 auto';
    box.style.display = 'flex';
    box.style.justifyContent = 'center';
    box.style.alignItems = 'center';

    
    const icon = document.createElement('i');
    icon.classList.add('fa-solid', 'fa-circle-play');
    icon.style.fontSize = '32px';
    icon.style.color = 'white';
    icon.style.backgroundColor = 'black';
    icon.style.borderRadius = '50px';
    box.appendChild(icon);

    box.addEventListener('click', () => {
        toggleMusic(audioSource.audio, icon);
    });

    const downloadButton = document.createElement('a');
    downloadButton.classList.add('downloadBtn')
    downloadButton.href = audioSource.audio;
    downloadButton.download = audioSource.audio.split('/').pop(); 
    downloadButton.innerText = 'Download';
    downloadButton.style.display = 'inline-block';
    downloadButton.style.marginTop = '15px';
    downloadButton.style.color = 'white';
//    downloadButton.style.background = 'linear-gradient(to right,rgb(234, 178, 66),rgb(52, 5, 57)';
    downloadButton.style.padding = '5px 10px';
    downloadButton.style.borderRadius = '5px';
    downloadButton.style.textDecoration = 'none';
    downloadButton.style.fontFamily  = 'Elephant'

    wrapper.appendChild(box);
    wrapper.appendChild(downloadButton);

    boxContainer.appendChild(wrapper);
});

let currentPlayingAudio = null;
let currentIcon = null;

const toggleMusic = (audioPath, icon) => {
    if (currentPlayingAudio && currentPlayingAudio.src !== new URL(audioPath, document.baseURI).href) {
        currentPlayingAudio.pause();
        if (currentIcon) {
            currentIcon.classList.remove('fa-circle-pause');
            currentIcon.classList.add('fa-circle-play');
        }
    }

    let audioElement = currentPlayingAudio;

    if (!audioElement || audioElement.src !== new URL(audioPath, document.baseURI).href) {
        audioElement = new Audio(audioPath);
        currentPlayingAudio = audioElement;
        currentIcon = icon;
        audioElement.addEventListener('ended', () => {
            icon.classList.remove('fa-circle-pause');
            icon.classList.add('fa-circle-play');
        });
    }

    if (!audioElement.paused) {
        audioElement.pause();
        icon.classList.remove('fa-circle-pause');
        icon.classList.add('fa-circle-play');
    } else {
        audioElement.play().catch(error => {
            console.error("Error playing audio:", error);
        });
        icon.classList.remove('fa-circle-play');
        icon.classList.add('fa-circle-pause');
    }
};
