
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let player, keys = {}, platforms = [], monsters = [], gameRunning = false;

// DITO NAKATAGO ANG MGA NAKUHA AT GINAWANG GAMIT
let inventory = [];
let shopItems = [];

// LISTAHAN NG MGA PWEDENG IBAGSAK NG KALABAN
const possibleLoot = [
    {name: "Bakal", rarity: "Karaniwan", price: 5},
    {name: "Kahoy na Matibay", rarity: "Karaniwan", price: 3},
    {name: "Bato ng Kapangyarihan", rarity: "Bihira", price: 15},
    {name: "Ginto", rarity: "Bihira", price: 25},
    {name: "Balahibo ng Dragon", rarity: "Napakabihira", price: 100}
];

// LISTAHAN NG PWEDENG GAWAIN
const craftList = [
    {name: "Espada ng Bakal", need:["Bakal","Bakal","Kahoy na Matibay"], result:"Espada ng Bakal", price:30},
    {name: "Kalasag", need:["Bakal","Bakal","Bakal"], result:"Matibay na Kalasag", price:50},
    {name: "Sulo ng Apoy", need:["Bato ng Kapangyarihan","Kahoy na Matibay"], result:"Sulo ng Apoy", price:80}
];

function setupWorld() {
    platforms = [{x:0,y:450,w:800,h:50},{x:150,y:370,w:120,h:20},{x:350,y:300,w:120,h:20},{x:550,y:230,w:120,h:20},{x:200,y:180,w:100,h:20}];
    monsters = [{x:300,y:400,w:35,h:40,speed:1.5,dir:1,hp:3,color:'#ff2222'},{x:600,y:400,w:35,h:40,speed:2,dir:-1,hp:2,color:'#ff6600'},{x:400,y:250,w:30,h:35,speed:1,dir:1,hp:4,color:'#aa00ff'}];
}

function loadPlayer(hero) {
    player = new Player(50,350,hero); player.hp = 5; player.gold = 0; setupWorld(); gameRunning = true; gameLoop();
}

function checkCollision(a,b) {
    return a.x < b.x+b.w && a.x+a.width > b.x && a.y < b.y+b.h && a.y+a.height > b.y;
}

// KAPAG NATALO ANG KALABAN, MAY DADATING NA GAMIT
function dropLoot(x,y) {
    let item = possibleLoot[Math.floor(Math.random()*possibleLoot.length)];
    inventory.push({...item, x:x, y:y});
}

function gameLoop() {
    if(!gameRunning) return;
    ctx.fillStyle = '#0f1925'; ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = '#2d5016'; platforms.forEach(p => ctx.fillRect(p.x,p.y,p.w,p.h));

    monsters.forEach((m,i) => {
        m.x += m.speed * m.dir; if(m.x < 100 || m.x > 700) m.dir *= -1;
        ctx.fillStyle = m.color; ctx.fillRect(m.x,m.y,m.w,m.h);
        if(checkCollision(player,m)) {
            player.hp--; player.x=50;
            if(player.hp<=0){alert('Natalo ka!');gameRunning=false;}
        }
        // KAPAG TINUMBOK ANG KALABAN (PIPINDUTIN MO MAMAYA ANG PANG-ATAKE)
        if(keys['f'] && checkCollision(player,m)){
            m.hp--;
            if(m.hp <= 0){
                dropLoot(m.x,m.y);
                player.gold += 10;
                monsters.splice(i,1);
                setTimeout(()=> monsters.push({x:Math.random()*600+100,y:400,w:35,h:40,speed:1+Math.random(),dir:1,hp:2+Math.floor(Math.random()*3),color:'#ff4466'}),3000);
            }
        }
    });

    // IGUHIT ANG MGA NAKUHA NA GAMIT SA LUPA
    inventory.forEach((it,i)=>{
        ctx.fillStyle = '#ffdd00';
        ctx.fillRect(it.x, it.y, 15,15);
        // KUNIN ANG GAMIT KAPAG NILAPITAN
        if(checkCollision(player,{x:it.x,y:it.y,w:15,h:15})){
            alert(`Nakuha mo: ${it.name} [${it.rarity}]`);
            inventory.splice(i,1);
            shopItems.push(it);
        }
    });

    player.update(keys,platforms); player.draw(ctx);
    ctx.fillStyle='#fff'; ctx.font='14px Arial';
    ctx.fillText(`Buhay: ${player.hp}`,20,25);
    ctx.fillText(`Ginto: ${player.gold}`,20,45);
    ctx.fillText(`Gamit sa Bag: ${shopItems.length}`,20,65);
    ctx.fillText(`Pindutin F para umatake`, 550, 25);
    ctx.fillText(`Pindutin M para Marketplace`, 550, 45);

    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown',e=>{
    keys[e.key]=true;
    if(e.key.toLowerCase() === 'm') openMarketplace();
    if(e.key.toLowerCase() === 'c') openCrafting();
});
document.addEventListener('keyup',e=>keys[e.key]=false);

// MARKETPLACE SYSTEM
function openMarketplace(){
    gameRunning = false;
    let list = shopItems.map((it,i)=>`${i+1}. ${it.name} [${it.rarity}] - Ibenta sa ${it.price} Ginto`).join("\n");
    let pick = prompt(`=== JUNAKIS MARKETPLACE ===\n\nMga Gamit na Pwedeng Ibenta:\n${list}\n\nIlagay ang Numero ng Gamit na Ibibenta:`);
    if(pick && shopItems[pick-1]){
        let item = shopItems.splice(pick-1,1)[0];
        player.gold += item.price;
        alert(`Matagumpay na naibenta! Nakuha mo ang ${item.price} Ginto!`);
    }
    gameRunning = true;
}

// PAGGAGAWA NG GAMIT
function openCrafting(){
    gameRunning = false;
    let list = craftList.map((cr,i)=>`${i+1}. ${cr.result} - Kailangan: ${cr.need.join(", ")}`).join("\n");
    let pick = prompt(`=== PAGGAGAWA NG GAMIT ===\n\nPwede mong gawin:\n${list}\n\nIlagay ang Numero ng Gustong Gawin:`);
    if(pick && craftList[pick-1]){
        let recipe = craftList[pick-1];
        let hasAll = recipe.need.every(req => shopItems.some(it=>it.name === req));
        if(hasAll){
            recipe.need.forEach(nam=>{
                let idx = shopItems.findIndex(it=>it.name === nam);
                if(idx > -1) shopItems.splice(idx,1);
            });
            shopItems.push({name:recipe.result, rarity:"Gawa", price:recipe.price});
            alert(`Matagumpay na nagawa: ${recipe.result}! Pwede mo na itong ibenta o gamitin!`);
        }else{
            alert("Kulang ang mga gamit sa iyong bag!");
        }
    }
    gameRunning = true;
}
