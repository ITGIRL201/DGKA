const audioPlayer = document.getElementById("audio");
const playlistEl = document.getElementById("playlist");
const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const shuffleBtn = document.getElementById("shuffleBtn");
const repeatBtn = document.getElementById("repeatBtn");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const trackTitle = document.getElementById("trackTitle");
const trackArtist = document.getElementById("trackArtist");
const playerCover = document.getElementById("playerCover");
const songSearch = document.getElementById("songSearch");

let isPlaying = false;
let shuffle = false;
let repeat = false;
let currentIndex = 0;

let songs = Array.from(playlistEl.getElementsByTagName("li"));

// Load a song by index
function loadTrack(index) {
  const song = songs[index];
  const src = song.getAttribute("data-src");
  const cover = song.getAttribute("data-cover") || "https://via.placeholder.com/400x400?text=Mezmur";
  const artist = song.getAttribute("data-artist") || "Debre Genet Kidus Amanuel";
  const title = song.textContent;

  audioPlayer.src = src;
  trackTitle.textContent = title;
  trackArtist.textContent = artist;
  playerCover.src = cover;

  updateActiveSong();
}

// Highlight the active song
function updateActiveSong() {
  songs.forEach((song, idx) => song.classList.toggle("active", idx === currentIndex));
}

// Play / Pause
function playAudio() {
  audioPlayer.play();
  isPlaying = true;
  playBtn.textContent = "⏸";
}

function pauseAudio() {
  audioPlayer.pause();
  isPlaying = false;
  playBtn.textContent = "▶️";
}

playBtn.addEventListener("click", () => (isPlaying ? pauseAudio() : playAudio()));

// Next / Previous
function nextTrack() {
  if (shuffle) currentIndex = Math.floor(Math.random() * songs.length);
  else currentIndex = (currentIndex + 1) % songs.length;
  loadTrack(currentIndex);
  playAudio();
}

function prevTrack() {
  if (shuffle) currentIndex = Math.floor(Math.random() * songs.length);
  else currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadTrack(currentIndex);
  playAudio();
}

nextBtn.addEventListener("click", nextTrack);
prevBtn.addEventListener("click", prevTrack);

// Shuffle & Repeat
shuffleBtn.addEventListener("click", () => {
  shuffle = !shuffle;
  shuffleBtn.style.color = shuffle ? "green" : "";
});

repeatBtn.addEventListener("click", () => {
  repeat = !repeat;
  repeatBtn.style.color = repeat ? "green" : "";
});

audioPlayer.addEventListener("ended", () => {
  if (repeat) playAudio();
  else nextTrack();
});

// Progress bar
audioPlayer.addEventListener("timeupdate", () => {
  const { currentTime, duration } = audioPlayer;
  progress.value = (currentTime / duration) * 100 || 0;
  currentTimeEl.textContent = formatTime(currentTime);
  durationEl.textContent = formatTime(duration);
});

progress.addEventListener("input", () => {
  audioPlayer.currentTime = (progress.value / 100) * audioPlayer.duration;
});

// Format mm:ss
function formatTime(time) {
  if (isNaN(time)) return "00:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

// Click on a song
songs.forEach((song, idx) => {
  song.addEventListener("click", () => {
    currentIndex = idx;
    loadTrack(currentIndex);
    playAudio();
  });
});

// Search filter
songSearch.addEventListener("input", () => {
  const query = songSearch.value.toLowerCase();
  songs.forEach(song => {
    const text = song.textContent.toLowerCase();
    song.style.display = text.includes(query) ? "" : "none";
  });
});

// Initial load
if (songs.length > 0) loadTrack(currentIndex);


function googleTranslateElementInit(){
  new google.translate.TranslateElement({
    pageLanguage:'en',
    includedLanguages:'am,es,en', // Amharic, Spanish, English + users can open "More"
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');
}

<script src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>

<button id="toTop" aria-label="Back to top">↑</button>
// Welcome dismiss
document.getElementById('skipWelcome').addEventListener('click',()=> {
  const w=document.getElementById('welcome'); w.style.animation='fadeOut .6s ease forwards';
});

// Live search (Books & Songs)
function attachSearch(inputId, cardsSelector){
  const input=document.getElementById(inputId);
  input.addEventListener('input',()=>{
    const q=input.value.trim().toLowerCase();
    document.querySelectorAll(cardsSelector).forEach(card=>{
      const txt=card.textContent.toLowerCase();
      card.style.display = txt.includes(q) ? '' : 'none';
    });
  });
}
attachSearch('searchBooks', '#books .media-card');
attachSearch('searchSongs', '#songs .media-card');

// Back to top
const toTop=document.getElementById('toTop');
window.addEventListener('scroll',()=>{ if(window.scrollY>600){toTop.classList.add('show')} else {toTop.classList.remove('show')}});
toTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

// Year
document.getElementById('year').textContent=new Date().getFullYear();

