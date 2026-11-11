function toggleMenu(target) {
    var parent = target.parentElement;
    if(parent.classList.contains('dd-open')) {
        parent.classList.remove('dd-open');
    } else {
        parent.classList.add('dd-open');
    }
}