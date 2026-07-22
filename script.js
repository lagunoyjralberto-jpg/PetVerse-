// =====================================
// JUNAKIS : RISE OF LEGENDS
// script.js
// Main Game Controller
// Alpha 0.4
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