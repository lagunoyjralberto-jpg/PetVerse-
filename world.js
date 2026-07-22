// =====================================
// JUNAKIS : RISE OF LEGENDS
// world.js
// World & Movement System
// =====================================


// =====================================
// WORLD DATA
// =====================================

const world = {

    name: "JUNAKIS",

    mapWidth: 20,

    mapHeight: 20,

    currentZone: "Whispering Forest"

};


// =====================================
// PLAYER MOVEMENT
// =====================================

function movePlayer(direction) {

    if(direction === "up") {

        if(player.y > 0) {

            player.y--;

        }

    }


    if(direction === "down") {

        if(player.y < world.mapHeight - 1) {

            player.y++;

        }

    }


    if(direction === "left") {

        if(player.x > 0) {

            player.x--;

        }

    }


    if(direction === "right") {

        if(player.x < world.mapWidth - 1) {

            player.x++;

        }

    }


    updateWorldScreen();

}


// =====================================
// CHANGE ZONE
// =====================================

function changeZone(zoneName) {

    world.currentZone = zoneName;

    updateWorldScreen();

}


// =====================================
// WORLD SCREEN
// =====================================

function updateWorldScreen() {

    const worldElement =
    document.getElementById("world-screen");


    if(!worldElement) {

        return;

    }


    worldElement.innerHTML = `

    <div class="world-panel">

        <h2>🌍 ${world.name}</h2>

        <h3>🌲 ${world.currentZone}</h3>

        <p>
        📍 Position:
        X: ${player.x}
        |
        Y: ${player.y}
        </p>


        <div class="movement-controls">

            <button onclick="movePlayer('up')">
            ⬆️
            </button>

            <br>

            <button onclick="movePlayer('left')">
            ⬅️
            </button>

            <button onclick="movePlayer('down')">
            ⬇️
            </button>

            <button onclick="movePlayer('right')">
            ➡️
            </button>

        </div>


        <br>

        <p>
        Explore the world of JUNAKIS.
        </p>

    </div>

    `;

}


// =====================================
// KEYBOARD MOVEMENT
// =====================================

document.addEventListener(
    "keydown",
    function(event) {

        if(event.key === "ArrowUp") {

            movePlayer("up");

        }


        if(event.key === "ArrowDown") {

            movePlayer("down");

        }


        if(event.key === "ArrowLeft") {

            movePlayer("left");

        }


        if(event.key === "ArrowRight") {

            movePlayer("right");

        }

    }
);


// =====================================
// WORLD ZONES
// =====================================

const worldZones = [

    {
        id: "whispering_forest",
        name: "Whispering Forest",
        level: 1
    },

    {
        id: "crystal_valley",
        name: "Crystal Valley",
        level: 10
    },

    {
        id: "dragon_mountains",
        name: "Dragon Mountains",
        level: 20
    },

    {
        id: "shadow_realm",
        name: "Shadow Realm",
        level: 30
    },

    {
        id: "ancient_kingdom",
        name: "Ancient Kingdom",
        level: 50
    }

];


// =====================================
// GET CURRENT ZONE
// =====================================

function getCurrentZone() {

    return world.currentZone;

}


// =====================================
// CHECK ZONE ACCESS
// =====================================

function canEnterZone(requiredLevel) {

    return player.level >= requiredLevel;

}