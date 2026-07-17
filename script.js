function chooseHero() {
    document.body.innerHTML = `
        <h1>⚔ Choose Your Hero</h1>

        <button onclick="enterWorld('Warrior')">⚔ Warrior</button><br><br>

        <button onclick="enterWorld('Mage')">🧙 Mage</button><br><br>

        <button onclick="enterWorld('Assassin')">🗡 Assassin</button><br><br>

        <button onclick="enterWorld('Archer')">🏹 Archer</button>
    `;
}


    function enterWorld(hero) {

    let hp = 100;
    let atk = 10;

    if (hero == "Warrior") {
        hp = 150;
        atk = 15;
    }

    if (hero == "Mage") {
        hp = 80;
        atk = 25;
    }

    if (hero == "Assassin") {
        hp = 90;
        atk = 20;
    }

    if (hero == "Archer") {
        hp = 100;
        atk = 18;
    }

    document.body.innerHTML = `
        <h1>🌍 PetVerse Alpha</h1>

        <h2>${hero}</h2>

        <p>❤️ HP: ${hp}</p>

        <p>⚔ Attack: ${atk}</p>

        <p>⭐ Level: 1</p>

        <p>🐾 Pet: None</p>

        <p>💰 Gold: 0</p>

        <button onclick="explore()">🌲 Explore</button>

        <button onclick="alert('Coming Soon!')">🎒 Inventory</button><br><br>

        <button onclick="alert('Coming Soon!')">🐾 Pet</button><br><br>

        <button onclick="alert('Coming Soon!')">🏰 Guild</button>
    `;
}function explore() {
    document.body.innerHTML = `
        <h1>🌲 Whispering Forest</h1>

        <h2>🐺 A Wild Wolf Appeared!</h2>

        <p>❤️ Wolf HP: 30</p>

        <button onclick="alert('Battle system coming next!')">⚔ Attack</button><br><br>

        <button onclick="alert('You escaped safely!')">🏃 Run</button>
    `;
}