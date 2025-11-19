function loadbellaboo() {
    document.getElementById('opening-screen').style.top = '-100%';
    setTimeout(() => {
        document.getElementById('opening-screen').remove();
        document.getElementById('page-after-open').style.display = 'block';
    }, 750);
}
