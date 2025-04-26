const CURRENTLY_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENT_TRACKS_ENDPOINT = "https://api.spotify.com/v1/me/player/recently-played?limit=1"
const REFRESH_TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'

const CLIENT_ID = "1364015f67e142548c70d4aa548978e1";
const CLIENT_SECRET = 'a02c580c261b4dc8b2076883b66e00d3';
const REFRESH_TOKEN = "AQCcEh1wXexs1XH39LrxepEbmg5H2_f3CCKr-y17UgvVsd88LUdlBARIC72QnBdumq7RAJIDRn2mfH55KabyeXN9E_ksPRWNsD-1Ijfib1gzEP3pqmXD_T58BMGkJgahr4k";
let accessToken = "BQDUuo506MOwJyvXeGjuL98J6140-I1zMYzxsP8N6IPPn3UhukW7m7ve79ODDG3ywBERC-8hrRzboPZCZaZW3BSGRF7J7bfP1kbW7_wCbEk8KsXplR0B7UwAx05_UvswwT9MoIp7cHjPHZqfEtKw3xqdYE9lgJmsEeHMclQmSAfHXiyDuq4NcMjRBWCZ6gDQsrIcA3OmU6PSIodhLUgZLdrufwywQL0wFAsj43vN2e7x8JmmEVAcmQ";

function run() {
    getCurrentlyPlaying();
}

function getCurrentlyPlaying() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", CURRENTLY_PLAYING_ENDPOINT, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    xhr.send();
    xhr.onload = function () {
        if (this.status === 200 || this.status === 201) {
            onCurrentlySuccess(this.response);
        } else if (this.status === 204) {
            getRecentTrack();
        } else if (this.status === 401) {
            refreshToken();
        } else {
            console.error(this.status, this.responseText);
        }
    }
}

function getRecentTrack() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", RECENT_TRACKS_ENDPOINT, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    xhr.send();
    xhr.onload = function () {
        if (this.status === 200 || this.status === 201) {
            onRecentSuccess(this.response);
        } else {
            console.error(this.status, this.responseText);
        }
    }
}

function refreshToken() {
    console.log("Refreshing Token")
    const body = new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: REFRESH_TOKEN
    });

    let xhr = new XMLHttpRequest();
    xhr.open("POST", REFRESH_TOKEN_ENDPOINT, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET));
    xhr.send(body);
    xhr.onload = function() {
        if (this.status === 200) {
            const data = JSON.parse(this.responseText);
            const accessToken_ = data['access_token'];
            if (accessToken_ !== undefined) {
                console.log("Refreshed access token", accessToken_);
                accessToken = accessToken_;
                // Run again on success
                run();
            }
        } else {
            console.error(this.status, this.responseText);
        }
    };
}

function onCurrentlySuccess(response) {
    document.getElementById("spotify-album-cover").src = JSON.parse(response)['item']['album']['images'][0]['url'];
    document.getElementById("spotify-status").innerHTML = "Now jamming: ";
    document.getElementById("spotify-text").innerHTML = '<a href="' + JSON.parse(response)['item']['external_urls']['spotify'] + '">' + JSON.parse(response)['item']['name'] + '</a><span id="spotify-text-by"> by </span><a href="' + JSON.parse(response)['item']['artists'][0]['external_urls']['spotify'] + '">' + JSON.parse(response)['item']['artists'][0]['name']+ '</a>';
}

function onRecentSuccess(response) {
    document.getElementById("spotify-album-cover").src = JSON.parse(response)['items'][0]['track']['album']['images'][0]['url'];
    document.getElementById("spotify-status").innerHTML = "Last played: ";
    document.getElementById("spotify-text").innerHTML = '<a href="' + JSON.parse(response)['items'][0]['track']['external_urls']['spotify'] + '">' + JSON.parse(response)['items'][0]['track']['name'] + '</a><span id="spotify-text-by"> by </span><a href="' + JSON.parse(response)['items'][0]['track']['artists'][0]['external_urls']['spotify'] + '">' + JSON.parse(response)['items'][0]['track']['artists'][0]['name'] + '</a>';
    // document.getElementById("spotify-text").innerHTML = JSON.parse(response)['items'][0]['track']['name'] + ' <span style="color: var(--text-color)">by</span> ' + JSON.parse(response)['items'][0]['track']['artists'][0]['name'];
}

run();

setInterval(run, 60000);