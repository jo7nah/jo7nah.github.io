const CURRENTLY_PLAYING_ENDPOINT = "https://jo7nah-portfolio.netlify.app/.netlify/functions/server/spotify/currentlyPlaying";

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
            onCurrentlySuccess(this.response);
        } else {
            console.error(this.status, this.responseText);
        }
    }
}

function onCurrentlySuccess(response) {
    document.getElementById("spotify-album-cover").src = JSON.parse(response)['image'];
    document.getElementById("spotify-status").innerHTML = "Now jamming: ";
    document.getElementById("spotify-text").innerHTML = '<a href="' + JSON.parse(response)['href'] + '">' + JSON.parse(response)['track'] + '</a><span id="spotify-text-by"> by </span><a href="' + JSON.parse(response)['artists_href'] + '">' + JSON.parse(response)['artists'] + '</a>';
}

run();

setInterval(run, 30000);