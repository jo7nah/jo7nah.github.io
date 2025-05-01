const CURRENTLY_PLAYING_ENDPOINT = "https://jo7nah-portfolio.netlify.app/.netlify/functions/server/spotify/currentlyPlaying";
const albumCover = document.getElementById('spotify-album-cover');
const cssRoot = document.querySelector(':root');

function run() {
    getCurrentlyPlaying();
}

function getCurrentlyPlaying() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", CURRENTLY_PLAYING_ENDPOINT, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.send();
    xhr.onload = function () {
        if (this.status === 200 || this.status === 201) {
            onSuccess(this.response);
        } else {
            console.error(this.status, this.responseText);
        }
    }
}

function onSuccess(response) {
    albumCover.src = JSON.parse(response)['image'];
    if(JSON.parse(response)['currentlyPlaying'] == true) {
        console.log("jonah is currently playing music");
        document.getElementById("spotify-status").innerHTML = "Now jamming: ";
        document.getElementById("spotify-text").innerHTML = '<a href="' + JSON.parse(response)['href'] + '">' + JSON.parse(response)['track'] + '</a><span id="spotify-text-by"> by </span><a href="' + JSON.parse(response)['artists_href'] + '">' + JSON.parse(response)['artists'] + '</a>';

        const vibrant = new Vibrant(albumCover);
        vibrant.getPalette().then(palette => {
            const color = palette.Vibrant.hex;
            cssRoot.style.setProperty('--spotify-color', color);
            console.log('album color is: ' + color);
            
        });
    } else {
        console.log("jonah is not playing any music right now");
        document.getElementById("spotify-status").innerHTML = "Recently played: ";
        document.getElementById("spotify-text").innerHTML = '<a href="' + JSON.parse(response)['href'] + '">' + JSON.parse(response)['track'] + '</a><span id="spotify-text-by"> by </span><a href="' + JSON.parse(response)['artists_href'] + '">' + JSON.parse(response)['artists'] + '</a>';
    }
}

run();

setInterval(run, 30000);