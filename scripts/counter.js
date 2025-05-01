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
    document.getElementById('tap-count').innerHTML = JSON.parse(response)['value'];
}


run();