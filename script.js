function loadbellaboo() {
    document.getElementById('opening-screen').style.top = '-100%';
    setTimeout(() => {
        document.getElementById('opening-screen').remove();
    }, 1000);
}
