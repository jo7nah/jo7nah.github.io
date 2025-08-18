const biographies = [
    "into retro-futurism 📺",
    "currently watching Neon Genisis Evangelion 🤖",
    "designer who grew up in the digital space 👾",
    "etc. other random biographies i guess",
    "i still need to do the animation for this",
    "i wanna get into oil painting"
]

function changeBio(){
    var bio = biographies[Math.floor(Math.random()*biographies.length)];
    document.getElementById("biography").innerHTML = bio;
}

setInterval(changeBio, 3000);