// =====================================
// JUNAKIS : RISE OF LEGENDS
// script.js
// Main Game Controller
// Alpha 0.3
// =====================================


// =====================================
// START GAME
// =====================================

function chooseHero() {

    document.body.innerHTML = `

    <div class="game-container">

        <header>

            <h1>⚔️ JUNAKIS: RISE OF LEGENDS ⚔️</h1>

            <h2>CHOOSE YOUR HERO</h2>

            <p>Forge Your Destiny. Rise Together.</p>

        </header>


        <main>

            <section class="hero-section">

                <h2>Choose Your Class</h2>

                <p>
                Select your hero and begin your adventure
                in the world of JUNAKIS.
                </p>


                <button onclick="startGame('Warrior')">
                    ⚔️ WARRIOR
                </button>

                <br><br>


                <button onclick="startGame('Mage')">
                    🧙 MAGE
                </button>

                <br><br>


                <button onclick="startGame('Assassin')">
                    🗡️ ASSASSIN
                </button>

                <br><br>


                <button onclick="startGame('Archer')">
                    🏹 ARCHER
                </button>

            </section>

        </main>

    </div>

    `;

}


// =====================================
// START PLAYER
// =====================================

function startGame(heroClass) {

    createPlayer("Hero", heroClass);

    showGameWorld();

}


// =====================================
// MAIN GAME WORLD
// =====================================

function showGameWorld() {

    document.body.innerHTML = `

    <div class="game-container">

        <header>

            <h1>🌍 JUNAKIS: RISE OF LEGENDS</h1>

            <h2>${player.class}</h2>

            <p>
            Welcome, ${player.name}.
            Your legend begins now.
            </p>

        </header>


        <main>

            <!-- PLAYER STATUS -->

            <section class="hero-section">

                <h2>⚔️ HERO STATUS</h2>

                <p>
                ❤️ HP:
                ${player.hp} / ${player.maxHp}
                </p>

                <p>
                🔷 MANA:
                ${player.mana} / ${player.maxMana}
                </p>

                <p>
                ⚔️ ATTACK:
                ${player.attack}
                </p>

                <p>
                🛡️ DEFENSE:
                ${player.defense}
                </p>

                <p>
                ⭐ LEVEL:
                ${player.level}
                </p>

                <p>
                ✨ EXP:
                ${player.exp} / ${player.maxExp}
                </p>

                <p>
                💰 GOLD:
                ${player.gold}
                </p>

            </section>


            <!-- WORLD -->

            <section
            id="world-screen"
            class="hero-section">

                <h2>🌲 ${world.currentZone}</h2>

                <p>
                📍 Position:
                X: ${player.x}
                |
                Y: ${player.y}
                </p>


                <button onclick="movePlayer('up')">
                    ⬆️
                </button>

                <br><br>

                <button onclick="movePlayer('left')">
                    ⬅️
                </button>

                <button onclick="movePlayer('down')">
                    ⬇️
                </button>

                <button onclick="movePlayer('right')">
                    ➡️
                </button>

                <br><br>

                <p>
                Explore the world of JUNAKIS.
                </p>

            </section>


            <!-- GAME ACTIONS -->

            <section class="features">


                <div class="feature">

                    <h3>👾 BATTLE</h3>

                    <p>
                    Fight monsters and earn EXP.
                    </p>

                    <button onclick="startBattle()">
                    ⚔️ FIND MONSTER
                    </button>

                </div>


                <div class="feature">

                    <h3>🎒 INVENTORY</h3>

                    <p>
                    View your collected items.
                    </p>

                    <button onclick="openInventory()">
                    🎒 OPEN INVENTORY
                    </button>

                </div>


                <div class="feature">

                    <h3>🛡️ EQUIPMENT</h3>

                    <p>
                    Manage your equipped items.
                    </p>

                    <button onclick="openEquipment()">
                    🛡️ EQUIPMENT
                    </button>

                </div>


                <div class="feature">

                    <h3>🐾 PET & MOUNT</h3>

                    <p>
                    Your companions and mounts.
                    </p>

                    <button onclick="openCompanions()">
                    🐾 VIEW COMPANIONS
                    </button>

                </div>


                <div class="feature">

                    <h3>🗺️ WORLD ZONES</h3>

                    <p>
                    Explore different regions.
                    </p>

                    <button onclick="openWorldZones()">
                    🗺️ WORLD MAP
                    </button>

                </div>


                <div class="feature">

                    <h3>🛒 MARKETPLACE</h3>

                    <p>
                    Access the Alberto NFT Marketplace.
                    </p>

                    <button onclick="openMarketplace()">
                    🛒 MARKETPLACE
                    </button>

                </div>


            </section>

        </main>


        <footer>

            <p>
            <strong>
            JUNAKIS: RISE OF LEGENDS
            </strong>
            </p>

            <p>
            Powered by Alberto Digital Art Work Studio
            </p>

        </footer>

    </div>

    `;

}


// =====================================
// BATTLE SYSTEM
// =====================================

function startBattle() {

    let monster = {

        name: "Forest Goblin",

        hp: 50,

        attack: 10

    };


    let damage = player.attack;

    monster.hp -= damage;


    if(monster.hp <= 0) {

        addExp(25);

        addGold(50);


        alert(

            "⚔️ VICTORY!\n\n" +

            "Monster: " +
            monster.name +

            "\n\n" +

            "+25 EXP\n" +

            "+50 GOLD"

        );

    }

    else {

        let defeated =
        damagePlayer(monster.attack);


        if(defeated) {

            alert(
                "💀 YOU WERE DEFEATED!\n\n" +
                "Returning to town..."
            );


            player.hp =
            player.maxHp;

        }

        else {

            alert(

                "⚔️ BATTLE!\n\n" +

                "You dealt " +
                damage +
                " damage.\n\n" +

                "Monster HP: " +
                monster.hp +
                "\n\n" +

                "You received " +
                monster.attack +
                " damage."

            );

        }

    }


    showGameWorld();

}


// =====================================
// INVENTORY
// =====================================

function openInventory() {

    let inventoryHTML = "";


    if(player.inventory.length === 0) {

        inventoryHTML =
        "<p>🎒 Inventory is empty.</p>";

    }

    else {

        player.inventory.forEach(
        function(item) {

            inventoryHTML += `

            <div class="feature">

                <h3>
                ${item.name}
                </h3>

                <p>
                Rarity:
                ${item.rarity || "Common"}
                </p>

                <button
                onclick='equipItem(${JSON.stringify(item)})'>
                EQUIP
                </button>

            </div>

            `;

        });

    }


    document.body.innerHTML = `

    <main>

        <section class="hero-section">

            <h1>🎒 INVENTORY</h1>

            ${inventoryHTML}

            <br>

            <button onclick="showGameWorld()">
            🌍 BACK TO WORLD
            </button>

        </section>

    </main>

    `;

}


// =====================================
// EQUIPMENT
// =====================================

function openEquipment() {

    document.body.innerHTML = `

    <main>

        <section class="hero-section">

            <h1>🛡️ EQUIPMENT</h1>


            <p>
            🛡️ Armor:
            ${getItemName(player.equipment.armor)}
            </p>


            <p>
            ⚔️ Weapon:
            ${getItemName(player.equipment.weapon)}
            </p>


            <p>
            🛹 Astral Board:
            ${getItemName(player.equipment.astralBoard)}
            </p>


            <p>
            🏍️ Astral Bike:
            ${getItemName(player.equipment.astralBike)}
            </p>


            <p>
            👕 Costume:
            ${getItemName(player.equipment.costume)}
            </p>


            <p>
            💍 Accessory:
            ${getItemName(player.equipment.accessory)}
            </p>


            <p>
            🪽 Wings:
            ${getItemName(player.equipment.wings)}
            </p>


            <br>


            <button onclick="showGameWorld()">
            🌍 BACK TO WORLD
            </button>

        </section>

    </main>

    `;

}


// =====================================
// ITEM NAME
// =====================================

function getItemName(item) {

    if(!item) {

        return "Empty";

    }


    return item.name;

}


// =====================================
// PET & MOUNT
// =====================================

function openCompanions() {

    document.body.innerHTML = `

    <main>

        <section class="hero-section">

            <h1>🐾 PETS & MOUNTS</h1>


            <p>
            🐾 Pet:
            ${getItemName(player.pet)}
            </p>


            <p>
            🐉 Mount:
            ${getItemName(player.mount)}
            </p>


            <br>


            <button onclick="showGameWorld()">
            🌍 BACK TO WORLD
            </button>

        </section>

    </main>

    `;

}


// =====================================
// WORLD MAP
// =====================================

function openWorldZones() {

    let zonesHTML = "";


    worldZones.forEach(
    function(zone) {

        let unlocked =
        canEnterZone(zone.level);


        zonesHTML += `

        <div class="feature">

            <h3>
            ${zone.name}
            </h3>

            <p>
            Required Level:
            ${zone.level}
            </p>


            ${
            unlocked

            ?

            `<button
            onclick="enterZone('${zone.name}')">
            ENTER
            </button>`

            :

            `<p>
            🔒 LOCKED
            </p>`

            }

        </div>

        `;

    });


    document.body.innerHTML = `

    <main>

        <section class="hero-section">

            <h1>🗺️ JUNAKIS WORLD MAP</h1>

            <div class="features">

            ${zonesHTML}

            </div>

            <br>

            <button onclick="showGameWorld()">
            🌍 BACK TO WORLD
            </button>

        </section>

    </main>

    `;

}


// =====================================
// ENTER ZONE
// =====================================

function enterZone(zoneName) {

    changeZone(zoneName);

    alert(
        "🌍 You entered:\n\n" +
        zoneName
    );

    showGameWorld();

}


// =====================================
// MARKETPLACE
// =====================================

function openMarketplace() {

    alert(

        "🛒 ALBERTO NFT MARKETPLACE\n\n" +

        "The marketplace is connected to the JUNAKIS ecosystem.\n\n" +

        "NFT trading system coming soon."

    );

}


// =====================================
// GAME INITIALIZATION
// =====================================

window.addEventListener(
"DOMContentLoaded",
function() {

    console.log(
        "JUNAKIS MMORPG loaded successfully."
    );

});