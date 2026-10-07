var idVideo = "M_ONGazIFsg";

const input = document.getElementById("inputId");

input.addEventListener("submit", (e) => {

    e.preventDefault();
    const formData = new FormData(input);
    var listaForm = [];
    for (var obj of formData) {
        listaForm.push(obj);
    };         

    idVideo = listaForm[0][1];


})

console.log(document.getElementById("playvideo"));

let timer;
let count = 0;
let inicio;
let tempo;



function startCountdown() {

    myDisplayer(count);

    if (count !== 0 & !tempo) {
        player.pauseVideo();
        clearInterval(timer);
        myDisplayer("Finished!");
        tempo = count;
        document.getElementById("loop").innerHTML = "replay";
        document.getElementById("playvideo").disabled = false;      
        
    } else if (tempo == count){

        document.getElementById("playvideo").disabled = true;
        player.seekTo(seconds=inicio);
        player.playVideo();
        myDisplayer("Looping...");

    }    
    
    else {
        document.getElementById("playvideo").disabled = true;
        player.playVideo();
        document.getElementById("loop").innerHTML = "stop_circle";
        inicio = player.getCurrentTime();
        timer = setInterval(function() {
        count++;
        myDisplayer(count);
        }, 1000);          

    }       


}


// Function to display any text
function myDisplayer(text) {
let demo = document.getElementById("demo"); 
demo.innerHTML = text;
}        
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;

function onYouTubeIframeAPIReady() {
player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: idVideo,
    playerVars: {
    'playsinline': 1,
    },
    events: {
    'onReady': onPlayerReady,
    'onStateChange': onPlayerStateChange
    }
});


}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.

function onPlayerStateChange(event) {
if (event.data == YT.PlayerState.PLAYING && tempo) {
    setTimeout(pauseVideo, tempo * 1000);
    
}
}


function pauseVideo() {
player.pauseVideo();
document.getElementById("playvideo").disabled = false;

}

function playVideo() {
    document.getElementById("loop").innerHTML = "radio_button_checked";
    tempo = undefined;
    count = 0;
    myDisplayer(" ");

    if (player.getPlayerState() == 1) {
        player.pauseVideo();
    } else {
        player.playVideo();
    }

}
