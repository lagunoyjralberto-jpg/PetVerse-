// =====================================
// JUNAKIS : RISE OF LEGENDS
// player.js
// Player System
// =====================================

let player = {

    name: "Hero",

    class: "",

    level: 1,

    exp: 0,

    maxExp: 100,


    // ================================
    // HEALTH & MANA
    // ================================

    hp: 100,

    maxHp: 100,

    mana: 50,

    maxMana: 50,


    // ================================
    // COMBAT STATS
    // ================================

    attack: 10,

    defense: 5,


    // ================================
    // ECONOMY
    // ================================

    gold: 100,


    // ================================
    // POSITION
    // ================================

    x: 5,

    y: 5,


    // ================================
    // PET & MOUNT
    // ================================

    pet: null,

    mount: null,


    // ================================
    // EQUIPMENT
    // ================================

    equipment: {

        armor: null,

        weapon: null,

        astralBoard: null,

        astralBike: null,

        costume: null,

        accessory: null,

        wings: null

    },


    // ================================
    // INVENTORY
    // ================================

    inventory: []

};


// =====================================
// CREATE PLAYER
// =====================================

function createPlayer(name, heroClass) {

    player.name = name || "Hero";

    player.class = heroClass;

    player.level = 1;

    player.exp = 0;

    player.maxExp = 100;

    player.gold = 100;

    player.x = 5;

    player.y = 5;

    player.pet = null;

    player.mount = null;

    player.inventory = [];

    player.equipment = {

        armor: null,

        weapon: null,

        astralBoard: null,

        astralBike: null,

        costume: null,

        accessory: null,

        wings: null

    };


    // ================================
    // CLASS STATS
    // ================================

    if(heroClass === "Warrior") {

        player.maxHp = 150;

        player.hp = 150;

        player.maxMana = 50;

        player.mana = 50;

        player.attack = 15;

        player.defense = 15;

    }


    if(heroClass === "Mage") {

        player.maxHp = 80;

        player.hp = 80;

        player.maxMana = 150;

        player.mana = 150;

        player.attack = 25;

        player.defense = 5;

    }


    if(heroClass === "Assassin") {

        player.maxHp = 90;

        player.hp = 90;

        player.maxMana = 80;

        player.mana = 80;

        player.attack = 20;

        player.defense = 8;

    }


    if(heroClass === "Archer") {

        player.maxHp = 100;

        player.hp = 100;

        player.maxMana = 80;

        player.mana = 80;

        player.attack = 18;

        player.defense = 10;

    }

}


// =====================================
// ADD EXP
// =====================================

function addExp(amount) {

    player.exp += amount;

    checkPlayerLevelUp();

}


// =====================================
// LEVEL UP
// =====================================

function checkPlayerLevelUp() {

    while(player.exp >= player.maxExp) {

        player.exp -= player.maxExp;

        player.level++;

        player.maxExp += 100;

        player.maxHp += 20;

        player.maxMana += 10;

        player.attack += 5;

        player.defense += 3;

        player.hp = player.maxHp;

        player.mana = player.maxMana;


        alert(
            "🎉 LEVEL UP!\n\n" +
            "You are now Level " +
            player.level
        );

    }

}


// =====================================
// ADD GOLD
// =====================================

function addGold(amount) {

    player.gold += amount;

}


// =====================================
// REMOVE GOLD
// =====================================

function removeGold(amount) {

    if(player.gold < amount) {

        return false;

    }

    player.gold -= amount;

    return true;

}


// =====================================
// ADD ITEM TO INVENTORY
// =====================================

function addItem(item) {

    player.inventory.push(item);

}


// =====================================
// REMOVE ITEM FROM INVENTORY
// =====================================

function removeItem(itemId) {

    player.inventory =
    player.inventory.filter(
        item => item.id !== itemId
    );

}


// =====================================
// EQUIP ITEM
// =====================================

function equipItem(item) {

    if(!item || !item.type) {

        return false;

    }


    if(item.type === "armor") {

        player.equipment.armor = item;

    }


    if(item.type === "weapon") {

        player.equipment.weapon = item;

    }


    if(item.type === "astralBoard") {

        player.equipment.astralBoard = item;

    }


    if(item.type === "astralBike") {

        player.equipment.astralBike = item;

    }


    if(item.type === "costume") {

        player.equipment.costume = item;

    }


    if(item.type === "accessory") {

        player.equipment.accessory = item;

    }


    if(item.type === "wings") {

        player.equipment.wings = item;

    }


    if(item.type === "pet") {

        player.pet = item;

    }


    if(item.type === "mount") {

        player.mount = item;

    }


    updatePlayerStats();

    return true;

}


// =====================================
// UPDATE PLAYER STATS
// =====================================

function updatePlayerStats() {

    let baseAttack = 10;

    let baseDefense = 5;


    if(player.class === "Warrior") {

        baseAttack = 15;

        baseDefense = 15;

    }


    if(player.class === "Mage") {

        baseAttack = 25;

        baseDefense = 5;

    }


    if(player.class === "Assassin") {

        baseAttack = 20;

        baseDefense = 8;

    }


    if(player.class === "Archer") {

        baseAttack = 18;

        baseDefense = 10;

    }


    player.attack = baseAttack;

    player.defense = baseDefense;


    // Weapon

    if(player.equipment.weapon) {

        player.attack +=
        player.equipment.weapon.attack || 0;

    }


    // Armor

    if(player.equipment.armor) {

        player.defense +=
        player.equipment.armor.defense || 0;

    }


    // Accessory

    if(player.equipment.accessory) {

        player.attack +=
        player.equipment.accessory.attack || 0;

        player.defense +=
        player.equipment.accessory.defense || 0;

    }


    // Pet

    if(player.pet) {

        player.attack +=
        player.pet.attack || 0;

    }


    // Wings

    if(player.equipment.wings) {

        player.defense +=
        player.equipment.wings.defense || 0;

    }

}


// =====================================
// HEAL PLAYER
// =====================================

function healPlayer(amount) {

    player.hp += amount;

    if(player.hp > player.maxHp) {

        player.hp = player.maxHp;

    }

}


// =====================================
// RESTORE MANA
// =====================================

function restoreMana(amount) {

    player.mana += amount;

    if(player.mana > player.maxMana) {

        player.mana = player.maxMana;

    }

}


// =====================================
// PLAYER DAMAGE
// =====================================

function damagePlayer(amount) {

    let finalDamage =
    Math.max(1, amount - player.defense);

    player.hp -= finalDamage;


    if(player.hp <= 0) {

        player.hp = 0;

        return true;

    }


    return false;

}


// =====================================
// RESET PLAYER
// =====================================

function resetPlayer() {

    player = {

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

}