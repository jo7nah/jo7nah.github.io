const titles = [
    "‧₊˚ ⋅* ‧₊ j o n a h‧₊˚ ⋅* ‧₊",
    "*ੈ✩‧₊˚༺ jonah ༻*ੈ✩‧₊˚",
    "⛧°. ⋆༺JONAH༻⋆. °⛧",
    "JONAH ALISIC",
    "jonah"
]

function changeTitle(){
    var title = titles[Math.floor(Math.random()*titles.length)];
    document.title = title;
}

setInterval(changeTitle, 1000);