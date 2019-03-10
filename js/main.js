const songs = ["music/ibelieve.mp3", "music/thankyoulord.mp3"];
const songTitles = ["I BELIEVE", "THANK YOU LORD"];

let songTitle = $('.song-title');
let fillBar = $('.fill-bar');
let currentTime = $('.current-time');
let songDuration = $('.song-duration');

let song = new Audio();
let currentSong = 0;

window.onload = loadSong();

$('.play').click(function(){ 
    playOrPauseSong();
});

$('.next').click(function(){ 
    next();
});

$('.prev').click(function(){ 
    prev();
});

function loadSong(){
    song.src = songs[currentSong];
    songTitle.html(songTitles[currentSong]);
}

function playSong(){
    song.src = songs[currentSong];
    songTitle.html(songTitles[currentSong]);
    // totalTime(Math.round(song.duration));
    playOrPauseSong();
    song.play();
};

function playOrPauseSong(){
    console.log('working');
    totalTime(Math.round(song.duration));
    if(song.paused){
        song.play();
        $('.play').attr("src", "img/pause-icon.png");
    }
    else{
        song.pause();
        $('.play').attr("src", "img/play-icon.png");
    }
}

song.addEventListener('timeupdate', function() {
    let position = song.currentTime / song.duration;
    // currentDuration.textContent = song.currentTime;
    fillBar.css('width', position * 100 + '%' );

    convertTime(Math.round(song.currentTime));
});

function convertTime(seconds){
    let min = Math.floor( seconds / 60 );
    let sec = seconds % 60;
    min = (min < 10) ? `0${min}` : min;
    sec = (sec < 10) ? `0${sec}` : sec;
    currentTime.html(`${min}:${sec}`);
}

function totalTime(seconds){
    console.log('I was called');
    let min = Math.floor( seconds / 60 );
    let sec = seconds % 60;
    min = (min < 10) ? `0${min}` : min;
    sec = (sec < 10) ? `0${sec}` : sec;
    console.log(min, sec, seconds, currentTime);
    songDuration.html(`${min}:${sec}`);
}

function next(){
    currentSong++;
    if( currentSong >= songs.length){
        currentSong = 0;
    }
    playSong();
}

function prev(){
    currentSong--;
    if( currentSong < 0){
        currentSong = songs.length - 1;
    }
    playSong();
}