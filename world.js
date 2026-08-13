const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let player, keys = {up:false, down:false, left:false, right:false, skill:false};
let monsters = [], gameRunning = false;
let inventory = [], shopItems = [];

const possibleLoot = [
    {name: "Bakal ng Kaharian", rarity: "Karaniwan", price: 8},
    {name: "Matibay na Kahoy", rarity: "Karaniwan", price: 5},
    {name: "Bato ng Mahika", rarity: "Bihira", price: 20},
    {name: "Ginto ng Sinauna", rarity: "Bihira", price: 35},
    {name: "Balahibo ng Dragon", rarity: "Napakabihira", price: 120}
];

const craftList = [
    {name: "Espada ng Mandirigma", need:["Bakal ng Kaharian","Bakal ng Kaharian","Matibay na Kahoy"], result:"Espada ng Mandirigma", price:45},
    {name: "Kalasag ng Kaharian", need:["Bakal ng Kaharian","Bakal ng Kaharian","Bakal ng Kaharian"], result:"Matibay na Kalasag", price:70},
    {name: "Sulo ng Mahika", need:["Bato ng Mahika","Matibay na Kahoy"], result:"Sulo ng Mahika", price:100}
];

let quests = [
    {id:1, name:"Unang Pakikipaglaban", desc:"Talo ang 5 Kalaban", target:5, progress:0, reward:80, done:false},
    {id:2, name:"Mangangalakal", desc:"Kumuha ng 6 Bakal", target:6, progress:0, reward:50, done:false},
    {id:3, name:"Panday ng Kaharian", desc:"Gumawa ng 1 Espada", target:1, progress:0, reward:120, done:false},
    {id:4, name:"Tagapagtatag ng Kayamanan", desc:"Gawing NFT ang 1 Gamit", target:1, progress:0, reward:150, done:false},
    {id:5, name:"Tunay na Mangangalakal", desc:"Magbenta ng 3 Gamit", target:3, progress:0, reward:100, done:false}
];

// 📱 PINDUTAN SA CELLPHONE (Top-Down na Galaw)
function createMobileControls(){
    if(!document.getElementById('mobileControls')){
        let ctrl = document.createElement('div');
        ctrl.id = 'mobileControls';
        ctrl.style.cssText = 'position:fixed; bottom:20px; left:0; right:0; display:flex; justify-content:space-between; padding:0 25px; z-index:9999;';
        
        let dpad = document.createElement('div');
        dpad.style.display = 'grid'; dpad.style.gridTemplateColumns='repeat(3,50px)'; dpad.style.gap='5px';
        dpad.append(makeBtn('⬆️', ()=>keys.up=true, ()=>keys.up=false));
        dpad.append(makeBtn('⬅️', ()=>keys.left=true, ()=>keys.left=false));
        dpad.append(makeBtn('➡️', ()=>keys.right=true, ()=>keys.right=false));
        dpad.append(makeBtn('⬇️', ()=>keys.down=true, ()=>keys.down=false));

        let act = document.createElement('div');
        act.style.display = 'flex'; act.style.alignItems='center';
        act.append(makeBtn('⚡', ()=>keys.skill=true, ()=>{}));

        ctrl.append(dpad, act);
        document.body.appendChild(ctrl);
    }
}

function makeBtn(txt, down, up){
    let b = document.createElement('button');
    b.innerText = txt;
    b.style.cssText = 'width:60px; height:60px; font-size:24px; border-radius:50%; background:rgba(15,15,35,0.9); color:#00e5ff; border:2px solid #00bcd4; touch-action:none;';
    b.addEventListener('touchstart', e=>{e.preventDefault(); down();});
    b.addEventListener('touchend', e=>{e.preventDefault(); up();});
    return b;
}

// 🗺️ MAPANG KAHARIAN - PATAG AT MALUWAG TULAD NG REALM LEGEND
function setupWorld() {
    monsters = [
        {x:200,y:250,size:30,speed:1.2,dir:1,hp:10,color:'#3a0000'},
        {x:600,y:300,size:30,speed:1.5,dir:-1,hp:9,color:'#4b2000'},
        {x:400,y:150,size:28,speed:1,dir:1,hp:12,color:'#250040'}
    ];
}

function loadPlayer(hero) {
    player = new Player(400, 400, hero); player.hp = 5; player.gold = 0;
    createMobileControls();
    setupWorld(); gameRunning = true; gameLoop();
}

function checkCollision(a,b) {
    return Math.hypot(a.x - b.x, a.y - b.y) < (a.size + b.size)/2;
}

function dropLoot(x,y) {
    let item = possibleLoot[Math.floor(Math.random()*possibleLoot.length)];
    inventory.push({...item, x:x, y:y, isNFT:false});
    if(item.name.includes("Bakal")) updateQuest(2, 1);
}

function updateQuest(id, dagdag){
    let q = quests.find(x=>x.id===id);
    if(q && !q.done){
        q.progress += dagdag;
        if(q.progress >= q.target){
            q.done = true;
            player.gold += q.reward;
            alert(`🏆 MISYON NATAPOS!\n${q.name}\nNakuha mo: ${q.reward} Ginto!`);
        }
    }
}

function gameLoop() {
    if(!gameRunning) return;
    ctx.fillStyle = '#0a0a1a'; ctx.fillRect(0,0,canvas.width,canvas.height);
    
    // DISENYO NG LUPA - TULAD NG KAHARIAN
    ctx.fillStyle = '#121224';
    for(let x=0;x<canvas.width;x+=40){
        for(let y=0;y<canvas.height;y+=40){
            if((x+y)%80===0) ctx.fillRect(x,y,40,40);
        }
    }
    ctx.strokeStyle = '#1a1a35';
    ctx.lineWidth = 2;
    ctx.strokeRect(5,5,canvas.width-10,canvas.height-10);

    monsters.forEach((m,i) => {
        // Galaw ng kalaban
        m.x += m.speed * m.dir;
        if(m.x < 50 || m.x > 750) m.dir *= -1;
        if(m.y < 50 || m.y > 450) m.dir *= -1;
        
        // Itsura ng kalaban
        ctx.fillStyle = m.color;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size/2, 0, Math.PI*2);
        ctx.fill();
        ctx.fillStyle='#ff0033';
        ctx.fillRect(m.x-15, m.y-25, 30*(m.hp/12), 5);

        // Kapag natamaan o natalo
        if(checkCollision(player,m)) { player.hp--; player.x=400; player.y=400; if(player.hp<=0){alert('Natalo ka! Simulan muli.');gameRunning=false;} }
        if(m.hp <= 0){
            dropLoot(m.x,m.y); player.gold += 15;
            updateQuest(1, 1);
            monsters.splice(i,1);
            setTimeout(()=> monsters.push({x:Math.random()*650+80,y:Math.random()*350+80,size:30,speed:1+Math.random()*0.8,dir:1,hp:8+Math.floor(Math.random()*5),color:'#330011'}),4000);
        }
    });

    // Mga Gamit na nahulog
    inventory.forEach((it,i)=>{
        ctx.fillStyle = it.isNFT ? '#ffd700' : '#ffab00';
        ctx.beginPath();
        ctx.arc(it.x, it.y, 8, 0, Math.PI*2);
        ctx.fill();
        if(checkCollision(player,{x:it.x,y:it.y,size:16})){
            alert(`Nakuha mo: ${it.name}\nUri: ${it.rarity}`);
            inventory.splice(i,1); shopItems.push(it);
        }
    });

    player.update(keys, monsters);
    player.draw(ctx);
    
    ctx.fillStyle='#bdbdbd'; ctx.font='14px Arial';
    ctx.fillText(`Buhay: ${player.hp} | Ginto: ${player.gold}`,15,25);
    ctx.fillText(`Bayani: ${player.heroType}`,15,45);
    ctx.fillText(`M=Tindahan | C=Gawa | N=Mint | Q=Misyon`, 380, 25);

    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown',e=>{
    if(e.key==='ArrowUp') keys.up=true;
    if(e.key==='ArrowDown') keys.down=true;
    if(e.key==='ArrowLeft') keys.left=true;
    if(e.key==='ArrowRight') keys.right=true;
    if(e.key==='Shift') keys.skill=true;
    if(e.key.toLowerCase()==='m') openMarketplace();
    if(e.key.toLowerCase()==='c') openCrafting();
    if(e.key.toLowerCase()==='n') mintItem();
    if(e.key.toLowerCase()==='q') showQuests();
});
document.addEventListener('keyup',e=>{
    if(e.key==='ArrowUp') keys.up=false;
    if(e.key==='ArrowDown') keys.down=false;
    if(e.key==='ArrowLeft') keys.left=false;
    if(e.key==='ArrowRight') keys.right=false;
    if(e.key==='Shift') keys.skill=false;
});

function showQuests(){
    gameRunning=false;
    let list = quests.map(q=>`${q.done?'✅':'🔴'} ${q.name}: ${q.desc} (${q.progress}/${q.target}) - ${q.reward} Ginto`).join("\n");
    alert(`=== MGA MISYON NG JUNAKIS ===\n\n${list}`);
    gameRunning=true;
}

function mintItem(){
    if(shopItems.length===0){alert('Wala kang gamit!');return;}
    gameRunning=false;
    let list = shopItems.map((it,i)=>`${i+1}. ${it.name} [${it.rarity}] ${it.isNFT?'✅ NFT':'🔴 HINDI PA'}`).join("\n");
    let pick = prompt(`=== PAGTATALA NG KAYAMANAN ===\n\n${list}\nIlagay ang Numero:`);
    if(pick && shopItems[pick-1] && !shopItems[pick-1].isNFT){
        if(confirm(`Sigurado ka bang i-mint ang ${shopItems[pick-1].name}?`)){
            shopItems[pick-1].isNFT = true;
            updateQuest(4,1);
            alert(`TAGUMPAY! Naging NFT na ito!`);
        }
    }
    gameRunning=true;
}

function openMarketplace(){
    gameRunning = false;
    let list = shopItems.map((it,i)=>`${i+1}. ${it.name} [${it.rarity}] - ${it.price} Ginto`).join("\n");
    let pick = prompt(`=== JUNAKIS MARKETPLACE ===\n\n${list}\nIlagay ang Numero:`);
    if(pick && shopItems[pick-1]){
        let item = shopItems.splice(pick-1,1)[0];
        player.gold += item.price;
        updateQuest(5,1);
        alert(`Naibenta mo na! Nakuha: ${item.price} Ginto`);
    }
    gameRunning = true;
}

function openCrafting(){
    gameRunning = false;
    let list = craftList.map((cr,i)=>`${i+1}. ${cr.result}\nKailangan: ${cr.need.join(", ")}`).join("\n\n");
    let pick = prompt(`=== PAGGAGAWA NG SANDATA ===\n\n${list}\nIlagay ang Numero:`);
    if(pick && craftList[pick-1]){
        let recipe = craftList[pick-1];
        let hasAll = recipe.need.every(req => shopItems.some(it=>it.name === req));
        if(hasAll){
            recipe.need.forEach(nam=>{ let idx = shopItems.findIndex(it=>it.name === nam); if(idx > -1) shopItems.splice(idx,1); });
            shopItems.push({name:recipe.result, rarity:"Gawang Kamay", price:recipe.price, isNFT:false});
            updateQuest(3,1);
            alert(`MATAGUMPAY! Nagawa mo na ang: ${recipe.result}`);
        }else{ alert("Hindi sapat ang gamit!"); }
    }
    gameRunning = true;
}
