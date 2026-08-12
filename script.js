
       function showFeatures() {
    document.getElementById('welcomeScreen').style.display='none';
    document.getElementById('featuresScreen').style.display='block';
}
function chooseHero() {
    document.getElementById('featuresScreen').style.display='none';
    document.getElementById('heroSelect').style.display='block';
}
function backToFeatures() {
    document.getElementById('heroSelect').style.display='none';
    document.getElementById('featuresScreen').style.display='block';
}
function startGame(heroClass) {
    document.getElementById('heroSelect').style.display='none';
    document.getElementById('gameCanvas').style.display='block';
    loadPlayer(heroClass);
}
