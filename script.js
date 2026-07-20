
   // =====================================
// JUNAKIS : RISE OF LEGENDS
// Alpha 0.1
// =====================================

// Player Data
let hero = "";
let level = 1;
let exp = 0;

let hp = 100;
let maxHp = 100;
let attack = 10;

let gold = 0;
let pet = "None";

// Main Menu
function chooseHero() {

    document.body.innerHTML = `

    <h1>⚔️ JUNAKIS : RISE OF LEGENDS ⚔️</h1>

    <h2>Choose Your Hero</h2>

    <button onclick="enterWorld('Warrior')">⚔ Warrior</button><br><br>

    <button onclick="enterWorld('Mage')">🧙 Mage</button><br><br>

    <button onclick="enterWorld('Assassin')">🗡 Assassin</button><br><br>

    <button onclick="enterWorld('Archer')">🏹 Archer</button>

    `;
}

// Enter World
function enterWorld(heroName){

    hero = heroName;

    if(hero=="Warrior"){
        maxHp = 150;
        hp = 150;
        attack = 15;
    }

    if(hero=="Mage"){
        maxHp = 80;
        hp = 80;
        attack = 25;
    }

    if(hero=="Assassin"){
        maxHp = 90;
        hp = 90;
        attack = 20;
    }

    if(hero=="Archer"){
        maxHp = 100;
        hp = 100;
        attack = 18;
    }

    showWorld();

}

// World Screen
function showWorld(){

document.body.innerHTML = `

<h1>🌍 JUNAKIS : RISE OF LEGENDS</h1>

<h2>${hero}</h2>

<p>❤️ HP : ${hp}/${maxHp}</p>

<p>⚔ Attack : ${attack}</p>

<p>⭐ Level : ${level}</p>

<p>✨ EXP : ${exp}</p>

<p>💰 Gold : ${gold}</p>

<p>🐾 Pet : ${pet}</p>

<br>

<h3>🌲 Whispering Forest</h3>

<p>Movement and Battle System coming next...</p>

`;

}