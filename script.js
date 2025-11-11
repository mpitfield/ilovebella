function loadbellaboo() {
    document.getElementById('opening-screen').style.top = '-75%';
    setTimeout(() => {
        document.getElementById('opening-screen').remove();
    }, 400);
}
