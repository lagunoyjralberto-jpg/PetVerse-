function startAdventure() {
    document.body.innerHTML = `
        <h1>Choose Your Hero</h1>

        <button onclick="enterForest('Warrior')">⚔️ Warrior</button><br><br>

        <button onclick="enterForest('Mage')">🧙 Mage</button><br><br>

        <button onclick="enterForest('Archer')">🏹 Archer</button>
    `;
}

function enterForest(hero) {
    document.body.innerHTML = `
        <h1>🌲 Whispering Forest</h1>

        <h2>Welcome, ${hero}!</h2>

        <p>Your adventure begins here...</p>
    `;
}