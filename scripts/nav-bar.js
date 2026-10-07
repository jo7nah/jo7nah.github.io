const navBar = document.getElementById("nav-bar");
const menuBtn = document.getElementById("nav-menu");
let i = 0;

function toggleNav() {
    if (i == 0) {
        navBar.classList.remove("closed-nav");
        navBar.classList.add("open-nav");
        menuBtn.innerHTML = `close <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.3636 2.68994C13.7151 2.68994 14 3.02573 14 3.43994C14 3.85415 13.7151 4.18994 13.3636 4.18994L0.636364 4.18994C0.28491 4.18994 0 3.85415 0 3.43994C0 3.02573 0.28491 2.68994 0.636364 2.68994L13.3636 2.68994Z" fill="currentColor"/>
            <path d="M13.3636 9.54346C13.7151 9.54346 14 9.87924 14 10.2935C14 10.7077 13.7151 11.0435 13.3636 11.0435L0.636364 11.0435C0.28491 11.0435 0 10.7077 0 10.2935C0 9.87924 0.28491 9.54346 0.636364 9.54346L13.3636 9.54346Z" fill="currentColor"/>
        </svg>`;
        i = 1;
    } else if (i == 1) {
        navBar.classList.remove("open-nav");
        navBar.classList.add("closed-nav");
        menuBtn.innerHTML = `menu <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.3636 2.68994C13.7151 2.68994 14 3.02573 14 3.43994C14 3.85415 13.7151 4.18994 13.3636 4.18994L0.636364 4.18994C0.28491 4.18994 0 3.85415 0 3.43994C0 3.02573 0.28491 2.68994 0.636364 2.68994L13.3636 2.68994Z" fill="currentColor"/>
            <path d="M13.3636 9.54346C13.7151 9.54346 14 9.87924 14 10.2935C14 10.7077 13.7151 11.0435 13.3636 11.0435L0.636364 11.0435C0.28491 11.0435 0 10.7077 0 10.2935C0 9.87924 0.28491 9.54346 0.636364 9.54346L13.3636 9.54346Z" fill="currentColor"/>
        </svg>`;
        i = 0;
    } else {
        console.log("error: navigation bar reset.");
        navBar.classList.remove("closed-nav");
        navBar.classList.remove("open-nav");
        menuBtn.innerHTML = `menu <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.3636 2.68994C13.7151 2.68994 14 3.02573 14 3.43994C14 3.85415 13.7151 4.18994 13.3636 4.18994L0.636364 4.18994C0.28491 4.18994 0 3.85415 0 3.43994C0 3.02573 0.28491 2.68994 0.636364 2.68994L13.3636 2.68994Z" fill="currentColor"/>
            <path d="M13.3636 9.54346C13.7151 9.54346 14 9.87924 14 10.2935C14 10.7077 13.7151 11.0435 13.3636 11.0435L0.636364 11.0435C0.28491 11.0435 0 10.7077 0 10.2935C0 9.87924 0.28491 9.54346 0.636364 9.54346L13.3636 9.54346Z" fill="currentColor"/>
        </svg>`;
        i = 0;
    }
}