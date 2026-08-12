const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let player, keys = {}, platforms = [], monsters = [], gameRunning = false;
let inventory = [];
let shopItems = [];

// MGA MATERYAL AT GAMIT
const possibleLoot = [
    {name: "Bakal", rarity: "Karaniwan", price: 5},
    {name: "Kahoy na Matibay", rarity: "Karaniwan", price: 3},
    {name: "Bato ng Kapangyarihan", rarity: "Bihira", price: 15},
    {name: "Ginto", rarity: "Bihira", price: 25},
    {name: "Balahibo ng Dragon", rarity: "Napakabihira", price: 100}
];

// PAGGAGAWA NG GAMIT
const craftList = [
    {name: "Espada ng Bakal", need:["Bakal","Bakal","Kahoy na Matibay"], result:"Espada ng Bakal", price:30},
    {name: "Kalasag", need:["Bakal","Bakal","Bakal"], result:"Matibay na Kalasag", price:50},
    {name: "Sulo ng Apoy", need:["Bato ng Kapangyarihan","Kahoy na Matibay"], result:"Sulo ng Apoy", price:80}
];

// 🆕 QUEST SYSTEM - MGA MISYON
let quests = [
    {id:1, name:"Unang Laban", desc:"Talo ang 3 Kalaban", target:3, progress:0, reward:50, done:false},
    {id:2, name:"Mangangalakal", desc:"Kumuha ng 5 Bakal", target:5, progress:0, reward:30, done:false},
    {id:3, name:"Panday", desc:"Gumawa ng 1 Espada ng Bakal", target:1, progress:0, reward:80, done:false},
    {id:4, name:"Tagapagtatag", desc:"Gawing NFT ang 1 Gamit", target:1, progress:0, reward:100, done:false},
    {id:5, name:"Mangangalakal", desc:"Magbenta ng 2 Gamit", target:2, progress:0, reward:60, done:false}
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

function dropLoot(x,y) {
    let item = possibleLoot[Math.floor(Math.random()*possibleLoot.length)];
    inventory.push({...item, x:x, y:y, isNFT:false});
    // I-update quest kapag nakakuha ng bakal
    if(item.name === "Bakal") updateQuest(2, 1);
}

// 🆕 TUMUTULONG SA PAG-UPDATE NG MISYON
function updateQuest(id, dagdag){
    let q = quests.find(x=>x.id===id);
    if(q && !q.done){
        q.progress += dagdag;
        if(q.progress >= q.target){
            q.done = true;
            player.gold += q.reward;
            alert(`🎉 MISYON NATAPOS!\n${q.name}\nNakuha mo: ${q.reward} Ginto!`);
        }
    }
}

function gameLoop() {
    if(!gameRunning) return;
    ctx.fillStyle = '#0f1925'; ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = '#2d5016'; platforms.forEach(p => ctx.fillRect(p.x,p.y,p.w,p.h));

    monsters.forEach((m,i) => {
        m.x += m.speed * m.dir; if(m.x < 100 || m.x > 700) m.dir *= -1;
        ctx.fillStyle = m.color; ctx.fillRect(m.x,m.y,m.w,m.h);
        if(checkCollision(player,m)) { player.hp--; player.x=50; if(player.hp<=0){alert('Natalo ka!');gameRunning=false;} }
        if(keys['f'] && checkCollision(player,m)){
            m.hp--;
            if(m.hp <= 0){
                dropLoot(m.x,m.y);
                player.gold += 10;
                updateQuest(1, 1); // Bilang sa misyon
                monsters.splice(i,1);
                setTimeout(()=> monsters.push({x:Math.random()*600+100,y:400,w:35,h:40,speed:1+Math.random(),dir:1,hp:2+Math.floor(Math.random()*3),color:'#ff4466'}),3000);
            }
        }
    });

    inventory.forEach((it,i)=>{
        ctx.fillStyle = it.isNFT ? '#ffd700' : '#ffaa00';
        ctx.fillRect(it.x, it.y, 15,15);
        if(checkCollision(player,{x:it.x,y:it.y,w:15,h:15})){
            alert(`Nakuha mo: ${it.name} [${it.rarity}] ${it.isNFT ? '✅ NFT NA' : ''}`);
            inventory.splice(i,1); shopItems.push(it);
        }
    });

    player.update(keys,platforms); player.draw(ctx);
    
    // IMPORMASYON SA SCREEN
    ctx.fillStyle='#fff'; ctx.font='13px Arial';
    ctx.fillText(`Buhay: ${player.hp}`,10,20);
    ctx.fillText(`Ginto: ${player.gold}`,10,40);
    ctx.fillText(`Gamit: ${shopItems.length}`,10,60);
    ctx.fillText(`📜 MISYON: ${quests.filter(q=>!q.done).length} ang natitira`,10,80);
    ctx.fillText(`F=Atake | M=Tindahan | C=Gawa | N=Mint | Q=Listahan ng Misyon`, 320, 20);

    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown',e=>{
    keys[e.key]=true;
    if(e.key.toLowerCase()==='m') openMarketplace();
    if(e.key.toLowerCase()==='c') openCrafting();
    if(e.key.toLowerCase()==='n') mintItem();
    if(e.key.toLowerCase()==='q') showQuests();
});
document.addEventListener('keyup',e=>keys[e.key]=false);

// 🆕 IPAKITA ANG LAHAT NG MISYON
function showQuests(){
    gameRunning=false;
    let list = quests.map(q=>`${q.done?'✅':'🔴'} ${q.name}: ${q.desc} (${q.progress}/${q.target}) - Gantimpala: ${q.reward} Ginto`).join("\n");
    alert(`=== LISTAHAN NG MISYON ===\n\n${list}`);
    gameRunning=true;
}

function mintItem(){
    if(shopItems.length===0){alert('Wala kang gamit na pwedeng gawing NFT!');return;}
    gameRunning=false;
    let list = shopItems.map((it,i)=>`${i+1}. ${it.name} [${it.rarity}] ${it.isNFT?'✅ NAKA-MINT NA':'🔴 HINDI PA'}`).join("\n");
    let pick = prompt(`=== GAWING NFT (MINT) ===\n\nPiliin ang gamit:\n${list}\n\nIlagay ang Numero:`);
    if(pick && shopItems[pick-1] && !shopItems[pick-1].isNFT){
        if(confirm(`Sigurado ka bang gawing NFT ang ${shopItems[pick-1].name}?`)){
            shopItems[pick-1].isNFT = true;
            updateQuest(4,1); // Bilang sa misyon
            alert(`TAGUMPAY! Naging NFT na ito!`);
        }
    }
    gameRunning=true;
}

function openMarketplace(){
    gameRunning = false;
    let list = shopItems.map((it,i)=>`${i+1}. ${it.name} [${it.rarity}] ${it.isNFT?'✅ NFT':'📦 Laro lang'} - ${it.price} Ginto`).join("\n");
    let pick = prompt(`=== JUNAKIS MARKETPLACE ===\n\nMga Gamit:\n${list}\n\nIlagay ang Numero ng Ibibenta:`);
    if(pick && shopItems[pick-1]){
        shopItems.splice(pick-1,1);
        player.gold += shopItems[pick-1]?.price || 0;
        updateQuest(5,1); // Bilang sa misyon
        alert(`Matagumpay na naibenta!`);
    }
    gameRunning = true;
}

function openCrafting(){
    gameRunning = false;
    let list = craftList.map((cr,i)=>`${i+1}. ${cr.result} - Kailangan: ${cr.need.join(", ")}`).join("\n");
    let pick = prompt(`=== PAGGAGAWA NG GAMIT ===\n\nPiliin ang gagawin:\n${list}\n\nIlagay ang Numero:`);
    if(pick && craftList[pick-1]){
        let recipe = craftList[pick-1];
        let hasAll = recipe.need.every(req => shopItems.some(it=>it.name === req));
        if(hasAll){
            recipe.need.forEach(nam=>{ let idx = shopItems.findIndex(it=>it.name === nam); if(idx > -1) shopItems.splice(idx,1); });
            shopItems.push({name:recipe.result, rarity:"Gawa", price:recipe.price, isNFT:false});
            updateQuest(3,1); // Bilang sa misyon
            alert(`Matagumpay na nagawa: ${recipe.result}!`);
        }else{ alert("Kulang ang mga gamit!"); }
    }
    gameRunning = true;
}
