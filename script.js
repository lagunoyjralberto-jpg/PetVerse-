function startAdventure() {
    document.body.innerHTML = `
        <h1>Choose Your Hero</h1>

        <button onclick="enterForest('Warrior')">⚔️ Warrior</button><br><br>

        <button onclick="enterForest('Mage')">🧙 Mage</button><br><br>

        <button onclick="enterForest('Archer')">🏹 Archer</button>
    
>
function enterForest(hero) {
    document.body.innerHTML = `
        <h1>🌲 Whispering Forest</h1>

        <h2>👤 Hero: ${hero}</h2>

        <p>❤️ HP: 100 / 100</p>

        <p>⭐ Level: 1</p>

        <p>🐾 Pet: None</p>

        <hr>

        <p>You hear birds singing in the distance...</p>

        <button>🔍 Explore</button>
    `;
}