const songs = ["music/ibelieve.mp3", "music/thankyoulord.mp3"];
const songTitles = ["I BELIEVE", "THANK YOU LORD"];

let songTitle = $('.song-title');
let fillBar = $('.fill-bar');
let currentDuration = $('.current-time');

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
    songTitle.textContent = songTitles[currentSong];
    console.log(song);
}

function playSong(){
    song.src = songs[currentSong];
    songTitle.html(songTitles[currentSong]);
    console.log(song);
    playOrPauseSong();
    song.play();
};

function playOrPauseSong(){
    console.log('working');
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
});

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