let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlicon = document.getElementById("ctrlicon");
let songList = document.getElementById("songList");

let songs = [
    { title: "Agnathavasi", name: "Galli Valuga", src: "Media/Audio/Galli Valuga.m4a", image: "Media/Images/galli.jpeg" },
    { title: "Gang Leader", name: "Ninnu Chuse Anandamlo", src: "Media/Audio/Ninnu Chuse Anandamlo.mp3", image: "Media/Images/gang1.jpeg" },
    { title: "I Manoharudu", name: "Nuvvunte Naa Jathagaa", src: "Media/Audio/Nuvvunte Naa Jathagaa.mp3", image: "Media/Images/nuvvu.jpeg" },
    { title: "Tholiprema", name: "Ninnila", src: "Media/Audio/Ninnila.mp3", image: "Media/Images/tholiprema.jpeg" },
    { title: "ABCD 2", name: "Sun Saathiya", src: "Media/Audio/Sun Saathiya.mp3", image: "Media/Images/sunsathiya.jpeg" },
    { title: "Vellake", name: "Vellake", src: "Media/Audio/Vellake.mp3", image: "Media/Images/vellake.jpeg" },
    { title: "Hi Nanna", name: "Ammaadi", src: "Media/Audio/[Ammaadi.mp3", image: "Media/Images/Hinanna1.jpeg" },
    { title: "Arjun Suravaram", name: "Kanne kanne", src: "Media/Audio/Kanne kanne.mp3", image: "Media/Images/nikil.jpeg" },
    { title: "Bachlor", name: "Adiye", src: "Media/Audio/Adiye.mp3", image: "Media/Images/adiye.jpeg" },
    { title: "Animal", name: "Ammayi", src: "Media/Audio/ammayi.m4a", image: "Media/Images/Animal1.jpeg" }
];

let currentSongIndex = 0;

// Initialize the playlist
function loadSong(index) {
    let songData = songs[index];
    document.getElementById("songTitle").innerText = songData.title;
    document.getElementById("songArtist").innerText = songData.name;
    document.getElementById("songImage").src = songData.image;
    document.getElementById("songSource").src = songData.src;
    song.load(); // Reload the audio element
    playpause(); // Auto play the song
}

// Populate the song list menu
function populateSongList() {
    songList.innerHTML = ""; // Clear the existing list
    songs.forEach((song, index) => {
        let li = document.createElement("li");
        li.innerText = `${song.title} - ${song.name}`;
        li.onclick = () => { loadSong(index); };
        songList.appendChild(li);
    });
}

populateSongList(); // Run on page load

// Toggle the song menu
function toggleMenu() {
    songList.classList.toggle("hidden");
}

// Play the next song
function playNext() {
    currentSongIndex = (currentSongIndex + 1) % songs.length; // Loop back to first song
    loadSong(currentSongIndex);
}

// Play the previous song
function playPrevious() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length; // Loop to last song
    loadSong(currentSongIndex);
}

// Update the progress bar max value based on the song duration
song.onloadedmetadata = function(){
    progress.max = song.duration;
    progress.value = 0;
};

// Toggle play/pause functionality
function playpause(){
    if(ctrlicon.classList.contains("fa-pause")){
        song.pause();
        ctrlicon.classList.remove("fa-pause");
        ctrlicon.classList.add("fa-play");
    } else {
        song.play();
        ctrlicon.classList.add("fa-pause");
        ctrlicon.classList.remove("fa-play");
    }
}

// Sync the progress bar with the current time of the song
song.ontimeupdate = function(){
    progress.value = song.currentTime;
};

// Update song time when progress bar is changed
progress.oninput = function(){
    song.currentTime = progress.value;
};

// Automatically go to next song when the current song ends
song.onended = function() {
    playNext();
};


let menuIcon = document.querySelector(".fa-bars");
let songLists = document.querySelector(".song-list");
menuIcon.addEventListener("click", function() {
    songLists.classList.toggle("show");
});