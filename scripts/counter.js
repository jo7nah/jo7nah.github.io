const GET_COUNTER_ENDPOINT = "https://jo7nah-portfolio.netlify.app/.netlify/functions/server/counter/";
const POST_COUNTER_ENDPOINT = "https://jo7nah-portfolio.netlify.app/.netlify/functions/server/counter/increment";

function run() {
    getCounter();
}

function getCounter() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", GET_COUNTER_ENDPOINT, true);
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

function increaseCounter() {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", POST_COUNTER_ENDPOINT, true);
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
    if(JSON.parse(response)['value'] < 1000) {
        document.getElementById('tap-button').innerHTML = JSON.parse(response)['value'];
    } else if (1000 <= JSON.parse(response)['value'] < 1000000) {
        document.getElementById('tap-button').innerHTML = Math.floor(JSON.parse(response)['value'] / 1000) + '.' + Math.floor((JSON.parse(response)['value'] % 1000) / 100) + "K";
    }
}


run();