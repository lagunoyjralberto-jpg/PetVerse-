// =====================================
// JUNAKIS: RISE OF LEGENDS
// MMORPG GAME CORE
// Alpha 0.2
// =====================================

// =====================================
// PLAYER DATA
// =====================================

let player = {
    name: "Hero",
    class: "",
    level: 1,
    exp: 0,
    maxExp: 100,

    hp: 100,
    maxHp: 100,

    mana: 50,
    maxMana: 50,

    attack: 10,
    defense: 5,

    gold: 100,

    x: 5,
    y: 5,

    pet: null,
    mount: null,

    equipment: {
        armor: null,
        weapon: null,
        astralBoard: null,
        astralBike: null,
        costume: null,
        accessory: null,
        wings: null
    },

    inventory: []
};


// =====================================
// GAME ITEMS
// =====================================

const gameItems = [

    {
        id: "moonlord_armor_15",
        name: "Moonlord Armor +15",
        type: "armor",
        rarity: "Mythic",
        attack: 0,
        defense: 100
    },

    {
        id: "moonlord_greatsword_15",
        name: "Moonlord Greatsword +15",
        type: "weapon",
        rarity: "Mythic",
        attack: 150,
        defense: 0
    },

    {
        id: "rw3_astral_bike_15",
        name: "RW3 Astral Bike +15",
        type: "astralBike",
        rarity: "Legendary",
        speed: 100
    },

    {
        id: "celestial_astral_board_15",
        name: "Celestial Astral Board +15",
        type: "astralBoard",
        rarity: "Mythic",
        speed: 120
    },

    {
        id: "celestial_dragon",
        name: "Celestial Dragon",
        type: "mount",
        rarity: "Legendary",
        speed: 150
    },

    {
        id: "astral_phoenix",
        name: "Astral Phoenix",
        type: "pet",
        rarity: "Mythic",
        attack: 50
    },

    {
        id: "alberto_costume",
        name: "Alberto Legend Costume",
        type: "costume",
        rarity: "Legendary"
    },

    {
        id: "celestial_ring_15",
        name: "Celestial Ring +15",
        type: "accessory",
        rarity: "Mythic",
        attack: 30,
        defense: 30
    },

    {
        id: "astral_king_wings",
        name: "Wings of Astral King",
        type: "wings",
        rarity: "Mythic",
        defense: 50
    }

];


// =====================================
// START GAME
// =====================================

function chooseHero() {

    document.body.innerHTML = `

    <div style="
    text-align:center;
    padding:40px 20px;
    background:#05070d;
    color:white;
    min-height:100vh;
    font-family:Arial;
    ">

    <h1 style="color:#FFD700;">
    ⚔️ JUNAKIS: RISE OF LEGENDS ⚔️
    </h1>

    <h2>Choose Your Hero</h2>

    <p>Choose your class and begin your adventure.</p>

    <br>

    <button onclick="enterWorld('Warrior')">
    ⚔️ Warrior
    </button>

    <br><br>

    <button onclick="enterWorld('Mage')">
    🧙 Mage
    </button>

    <br><br>

    <button onclick="enterWorld('Assassin')">
    🗡️ Assassin
    </button>

    <br><br>

    <button onclick="enterWorld('Archer')">
    🏹 Archer
    </button>

    </div>

    `;

}


// =====================================
// ENTER WORLD
// =====================================

function enterWorld(heroClass) {

    player.class = heroClass;

    if (heroClass === "Warrior") {

        player.maxHp = 150;
        player.hp = 150;
        player.maxMana = 50;
        player.mana = 50;
        player.attack = 15;
        player.defense = 15;

    }

    if (heroClass === "Mage") {

        player.maxHp = 80;
        player.hp = 80;
        player.maxMana = 150;
        player.mana = 150;
        player.attack = 25;
        player.defense = 5;

    }

    if (heroClass === "Assassin") {

        player.maxHp = 90;
        player.hp = 90;
        player.maxMana = 80;
        player.mana = 80;
        player.attack = 20;
        player.defense = 8;

    }

    if (heroClass === "Archer") {

        player.maxHp = 100;
        player.hp = 100;
        player.maxMana = 80;
        player.mana = 80;
        player.attack = 18;
        player.defense = 10;

    }

    showWorld();

}


// =====================================
// WORLD SCREEN
// =====================================

function showWorld() {

    document.body.innerHTML = `

    <div style="
    min-height:100vh;
    background:#05070d;
    color:white;
    padding:20px;
    font-family:Arial;
    ">

    <h1 style="color:#FFD700;">
    🌍 JUNAKIS: RISE OF LEGENDS
    </h1>

    <hr>

    <h2>
    ⚔️ ${player.class}
    </h2>

    <p>❤️ HP: ${player.hp} / ${player.maxHp}</p>

    <p>🔷 Mana: ${player.mana} / ${player.maxMana}</p>

    <p>⚔️ Attack: ${player.attack}</p>

    <p>🛡️ Defense: ${player.defense}</p>

    <p>⭐ Level: ${player.level}</p>

    <p>✨ EXP: ${player.exp} / ${player.maxExp}</p>

    <p>💰 Gold: ${player.gold}</p>

    <p>🐾 Pet: ${player.pet || "None"}</p>

    <p>🐉 Mount: ${player.mount || "None"}</p>

    <br>

    <h2>🌲 Whispering Forest</h2>

    <p>
    Welcome, ${player.class}.
    Your adventure in JUNAKIS begins here.
    </p>

    <br>

    <button onclick="openInventory()">
    🎒 Inventory
    </button>

    <button onclick="openEquipment()">
    🛡️ Equipment
    </button>

    <button onclick="openMarketplace()">
    🛒 Marketplace
    </button>

    <br><br>

    <button onclick="startBattle()">
    ⚔️ Find Monster
    </button>

    </div>

    `;

}


// =====================================
// INVENTORY
// =====================================

function openInventory() {

    let inventoryText = "";

    if (player.inventory.length === 0) {

        inventoryText = "Inventory is empty.";

    } else {

        player.inventory.forEach(item => {

            inventoryText +=
            item.name +
            " [" +
            item.rarity +
            "]<br>";

        });

    }

    document.body.innerHTML = `

    <div style="
    padding:30px;
    background:#05070d;
    color:white;
    min-height:100vh;
    font-family:Arial;
    ">

    <h1>🎒 Inventory</h1>

    <br>

    <div>
    ${inventoryText}
    </div>

    <br>

    <button onclick="showWorld()">
    🌍 Back to World
    </button>

    </div>

    `;

}


// =====================================
// EQUIPMENT
// =====================================

function openEquipment() {

    document.body.innerHTML = `

    <div style="
    padding:30px;
    background:#05070d;
    color:white;
    min-height:100vh;
    font-family:Arial;
    ">

    <h1>🛡️ Equipment</h1>

    <p>Armor:
    ${player.equipment.armor || "Empty"}
    </p>

    <p>Weapon:
    ${player.equipment.weapon || "Empty"}
    </p>

    <p>Astral Board:
    ${player.equipment.astralBoard || "Empty"}
    </p>

    <p>Astral Bike:
    ${player.equipment.astralBike || "Empty"}
    </p>

    <p>Costume:
    ${player.equipment.costume || "Empty"}
    </p>

    <p>Accessory:
    ${player.equipment.accessory || "Empty"}
    </p>

    <p>Wings:
    ${player.equipment.wings || "Empty"}
    </p>

    <br>

    <button onclick="showWorld()">
    🌍 Back to World
    </button>

    </div>

    `;

}


// =====================================
// MARKETPLACE
// =====================================

function openMarketplace() {

    document.body.innerHTML = `

    <div style="
    padding:30px;
    background:#05070d;
    color:white;
    min-height:100vh;
    font-family:Arial;
    ">

    <h1 style="color:#FFD700;">
    🛒 ALBERTO NFT MARKETPLACE
    </h1>

    <p>
    Game Items Marketplace
    </p>

    <br>

    <button onclick="showWorld()">
    🌍 Back to World
    </button>

    </div>

    `;

}


// =====================================
// BATTLE SYSTEM
// =====================================

function startBattle() {

    let monsterHp = 50;

    let damage = player.attack;

    monsterHp -= damage;

    if (monsterHp <= 0) {

        player.exp += 25;
        player.gold += 50;

        checkLevelUp();

        alert(
        "Victory!\n\n" +
        "+25 EXP\n" +
        "+50 Gold"
        );

    } else {

        player.hp -= 10;

        if (player.hp <= 0) {

            player.hp = player.maxHp;

            alert("You were defeated!");

        } else {

            alert(
            "Battle!\n\n" +
            "You dealt " +
            damage +
            " damage."
            );

        }

    }

    showWorld();

}


// =====================================
// LEVEL SYSTEM
// =====================================

function checkLevelUp() {

    if (player.exp >= player.maxExp) {

        player.level++;

        player.exp = 0;

        player.maxExp += 100;

        player.maxHp += 20;

        player.hp = player.maxHp;

        player.attack += 5;

        player.defense += 3;

        alert(
        "🎉 LEVEL UP!\n\n" +
        "You are now Level " +
        player.level
        );

    }

}