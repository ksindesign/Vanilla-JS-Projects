const musicContainer = document.getElementById('music-container')
const musicPlayerContainer = document.getElementById('music-player-container')
const playBtn = document.getElementById('play')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')

const audio = document.getElementById('audio')
const progress = document.getElementById('progress')
const progressContainer = document.getElementById('progress-container')
const title = document.getElementById('title')
const cover = document.getElementById('cover')
const currTime = document.querySelector('#currTime')
const durTime = document.querySelector('#durTime')

// Song titles
const songs = ['hey', 'summer', 'ukulele']

// Keep track of song
let songIndex = 2

// Initially load song details into DOM
loadSong(songs[songIndex])

// update song details
function loadSong(song) {
  title.innerText = song
  audio.src = `music/${song}.mp3`
  cover.src = `images/${song}.jpg`
}

// Play song
function playSong() {
  musicPlayerContainer.classList.add('play')
  musicContainer.classList.add('play')
  playBtn.querySelector('i.fas').classList.remove('fa-play')
  playBtn.querySelector('i.fas').classList.add('fa-pause')

  audio.play()
}

// Pause song
function pauseSong() {
  musicPlayerContainer.classList.remove('play')
  musicContainer.classList.remove('play')
  playBtn.querySelector('i.fas').classList.add('fa-play')
  playBtn.querySelector('i.fas').classList.remove('fa-pause')

  audio.pause()
}

// Previous song
function prevSong() {
  songIndex--

  if (songIndex < 0) {
    songIndex = songs.length - 1
  }

  loadSong(songs[songIndex])

  playSong()
}
// Next song
function nextSong() {
  songIndex++

  if (songIndex > songs.length - 1) {
    songIndex = 0
  }

  loadSong(songs[songIndex])

  playSong()
}

// update progress bar{
function updateProgress(e) {
  const {duration, currentTime} = e.srcElement
  const progressPercent = (currentTime / duration) * 100
  progress.style.width = `${progressPercent}%`
}

// Event Listener
playBtn.addEventListener('click', () => {
  const isPlaying = musicPlayerContainer.classList.contains('play')

  if (isPlaying) {
    pauseSong()
  } else {
    playSong()
  }
})

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth
  const clickX = e.offsetX
  const duration = audio.duration

  audio.currentTime = (clickX / width) * duration
}

//  Change song
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

// Time/song update
audio.addEventListener('timeupdate', updateProgress)

//  Click on progress bar
progressContainer.addEventListener('click', setProgress)

//  song ends
audio.addEventListener('ended', nextSong)
