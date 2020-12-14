const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const type = document.getElementById('type');
const buttonA = document.getElementById('button_A');
const buttonB = document.getElementById('button_B');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songList = {
  A: [
    {
      id: 1,
      name: 'jacinto-1',
      displayName: 'Electric Chill Machine',
      artist: 'Jacinto Design',
      type: 'Original'
    },
    {
      id: 2,
      name: 'jacinto-2',
      displayName: 'Seven Nation Army (Remix)',
      artist: 'Jacinto Design',
      type: 'Original'
    },
    {
      id: 3,
      name: 'jacinto-3',
      displayName: 'Goodnight, Disco Queen',
      artist: 'Jacinto Design',
      type: 'Original'
    }
  ],
  B: [
    {
      id: 4,
      name: 'jacinto-1',
      displayName: 'Electric Chill Machine',
      artist: 'Jacinto Design',
      type: 'Master'
    },
    {
      id: 5,
      name: 'jacinto-2',
      displayName: 'Seven Nation Army (Remix)',
      artist: 'Jacinto Design',
      type: 'Master'
    },
    {
      id: 6,
      name: 'jacinto-3',
      displayName: 'Goodnight, Disco Queen',
      artist: 'Jacinto Design',
      type: 'Master'
    }
  ]
};

// Check if Playing
let isPlaying = false;

//Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title','Pause');
  music.play();
}

//Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title','Play');
  music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  type.textContent = song.type;
  music.src =  `music/${song.name}.mp3`;
  image.src =`img/${song.name}.jpg`;
}

// Check if Button A selected
let isButtonA = true;

// Check if List B selected
let isButtonB = false;

buttonA.style.color = 'red';

//Load Initial songList as A
let loadSongList = songList.A;

// Current Song
let songIndex = 0;

// Select Button A to highlight button, change state and song list
function SelectButtonA() {
  isButtonA = true;
  isButtonB = false;
  buttonA.style.color = 'red';
  buttonB.style.color = 'black';
  if (isButtonA) {
    loadSongList = songList.A;
  }
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title','Pause');
  loadSong(loadSongList[songIndex]);
  console.log(loadSongList);
  music.play();
}

// Select Button A to Highlight and change state
function SelectButtonB() {
  isButtonA = false;
  isButtonB = true;
  buttonA.style.color = 'black';
  buttonB.style.color = 'red';
  if (isButtonB) {
    loadSongList = songList.B;
  }
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title','Pause');
  loadSong(loadSongList[songIndex]);
  console.log(loadSongList);
  music.play();
}

// Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = loadSongList.length - 1;
  }

  loadSong(loadSongList[songIndex]);
}

// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > loadSongList.length - 1) {
    songIndex = 0;
  }

  loadSong(loadSongList[songIndex]);

  playSong();
}

// On Load = Select First Song
loadSong(loadSongList[songIndex]);

//Update Progress Bar
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    //Update progress bar width
    const progressPercent = (currentTime/duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10 ) {
      durationSeconds = `0${durationSeconds}`;
    }
    //Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // Calculate display for current
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10 ) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}


// Event Listeners
buttonA.addEventListener('click', SelectButtonA);
buttonB.addEventListener('click', SelectButtonB);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);


