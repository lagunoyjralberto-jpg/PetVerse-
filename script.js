
function chooseHero() {
    document.body.innerHTML = `
        <h1>⚔️ JUNAKIS: RISE OF LEGENDS</h1>

        <h2>Choose Your Legend</h2>

        <button onclick="enterWorld('Guardian')">🛡️ Guardian</button><br><br>

        <button onclick="enterWorld('Arcane Sage')">🔮 Arcane Sage</button><br><br>

        <button onclick="enterWorld('Shadow Blade')">🗡️ Shadow Blade</button><br><br>

        <button onclick="enterWorld('Ranger')">🏹 Ranger</button>
    `;
}

function enterWorld(hero) {

    let hp = 100;
    let atk = 10;

    if (hero == "Guardian") {
        hp = 150;
        atk = 15;
    }

    if (hero == "Arcane Sage") {
        hp = 80;
        atk = 25;
    }

    if (hero == "Shadow Blade") {
        hp = 90;
        atk = 20;
    }

    if (hero == "Ranger") {
        hp = 100;
        atk = 18;
    }

    document.body.innerHTML = `
        <h1>⚔️ JUNAKIS: RISE OF LEGENDS</h1>

        <h2>${hero}</h2>

        <p>❤️ HP: ${hp}</p>

        <p>⚔️ Attack: ${atk}</p>

        <p>⭐ Level: 1</p>

        <p>🐾 Companion: None</p>

        <p>💰 Gold: 100</p>

        <button onclick="explore()">🌲 Explore</button><br><br>

        <button onclick="alert('Inventory Coming Soon!')">🎒 Inventory</button><br><br>

        <button onclick="alert('Companion System Coming Soon!')">🐾 Companion</button><br><br>

        <button onclick="alert('Guild System Coming Soon!')">🏰 Guild</button>
    `;
}

function explore() {
    document.body.innerHTML = `
        <h1>🌲 Emerald Forest</h1>

        <h2>🐺 A Dire Wolf Appeared!</h2>

        <p>❤️ Dire Wolf HP: 30</p>

        <button onclick="alert('Battle System Coming in Alpha v0.3!')">⚔️ Attack</button><br><br>

        <button onclick="alert('You escaped safely!')">🏃 Escape</button>
    `;
}
   