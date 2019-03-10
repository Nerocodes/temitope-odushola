const songs = ["music/ibelieve.mp3", "music/thankyoulord.mp3"];
const songTitles = ["I BELIEVE", "THANK YOU LORD"];

let songTitle = $('.song-title');
let fillBar = $('.fill-bar');
let currentTime = $('.current-time');
let songDuration = $('.song-duration');
let fillVolume = $('.fill-volume');

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
    console.log(fillVolume.css('width'));
    song.volume = parseInt(fillVolume.css('width')) / 100;
}

function playSong(){
    song.src = songs[currentSong];
    songTitle.html(songTitles[currentSong]);
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
    fillBar.css('width', position * 100 + '%' );

    convertTime(Math.round(song.currentTime));
    totalTime(Math.round(song.duration));
    if(song.ended){
        next();
    }
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
    if(isNaN(seconds)){
        seconds = 0;
    }
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

$(document).on('click','.fill-volume, .v-seek-bar', function(e){
    var offset = $(this).offset();
    var relativeX = e.pageX - offset.left;
    var wide = $(this).width();
    var percentX = (relativeX*100)/wide;
    song.volume = percentX / 100;
    fillVolume.css('width', percentX);
    console.log(percentX);
});

$(document).on('click','.fill-bar, .s-seek-bar', function(e){
    var offset = $(this).offset();
    var relativeX = e.pageX - offset.left;
    var wide = $(this).width();
    var percentX = (relativeX*100)/wide;
    let position = percentX / 100;
    song.currentTime = position * song.duration;
    fillBar.css('width', `${percentX}%`);
    console.log(percentX);
});

$('.repeat').click(function() {
    if($('.repeat').css('background-color') == 'rgb(232, 5, 76)'){
        $('.repeat').css({
            'background-color': '#e8054c00',
            'border-radius': '0%'
        });
    } else{
        $('.repeat').css({
            'background-color': '#e8054c',
            'border-radius': '50%'
        });
    }
});

$('.shuffle').click(function() {
    if($('.shuffle').css('background-color') == 'rgb(232, 5, 76)'){
        $('.shuffle').css({
            'background-color': '#e8054c00',
            'border-radius': '0px'
        });
    } else {
        $('.shuffle').css({
            'background-color': '#e8054c',
            'border-radius': '50%'
        });
    }
});