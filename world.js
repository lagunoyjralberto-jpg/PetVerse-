const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let player, keys = {left:false, right:false, jump:false, skill:false};
let platforms = [], monsters = [], gameRunning = false;
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

// 📱 PINDUTAN SA CELLPHONE - MAS MALAKI AT MALINAW
function createMobileControls(){
    if(!document.getElementById('mobileControls')){
        let ctrl = document.createElement('div');
        ctrl.id = 'mobileControls';
        ctrl.style.cssText = 'position:fixed; bottom:20px; left:0; right:0; display:flex; justify-content:space-between; padding:0 25px; z-index:9999;';
        
        let dir = document.createElement('div');
        dir.style.display = 'flex'; dir.style.gap = '15px';
        dir.append(makeBtn('⬅️', ()=>keys.left=true, ()=>keys.left=false));
        dir.append(makeBtn('➡️', ()=>keys.right=true, ()=>keys.right=false));

        let act = document.createElement('div');
        act.style.display = 'flex'; act.style.gap = '15px';
        act.append(makeBtn('⬆️', ()=>keys.jump=true, ()=>keys.jump=false));
        act.append(makeBtn('⚡', ()=>keys.skill=true, ()=>{}));

        ctrl.append(dir, act);
        document.body.appendChild(ctrl);
    }
}

function makeBtn(txt, down, up){
    let b = document.createElement('button');
    b.innerText = txt;
    b.style.cssText = 'width:70px; height:70px; font-size:30px; border-radius:50%; background:rgba(20,20,40,0.9); color:#00e5ff; border:2px solid #00bcd4; touch-action:none;';
    b.addEventListener('touchstart', e=>{e.preventDefault(); down();});
    b.addEventListener('touchend', e=>{e.preventDefault(); up();});
    return b;
}

// 🗺️ MAPANG SERYOSO - HINDI NA PARANG LARO NG BATA
function setupWorld() {
    platforms = [
        {x:0,y:450,w:800,h:50},
        {x:50,y:370,w:120,h:18},
        {x:220,y:310,w:90,h:18},
        {x:380,y:250,w:130,h:18},
        {x:600,y:340,w:100,h:18},
        {x:120,y:180,w:80,h:18},
        {x:480,y:160,w:90,h:18},
        {x:680,y:200,w:70,h:18}
    ];
    monsters = [
        {x:180,y:400,w:38,h:42,speed:1.1,dir:1,hp:8,color:'#4a0000'},
        {x:550,y:400,w:38,h:42,speed:1.5,dir:-1,hp:7,color:'#5d2906'},
        {x:420,y:200,w:32,h:38,speed:0.9,dir:1,hp:10,color:'#300060'}
    ];
}

function loadPlayer(hero) {
    player = new Player(50,350,hero); player.hp = 5; player.gold = 0;
    createMobileControls();
    setupWorld(); gameRunning = true; gameLoop();
}

function checkCollision(a,b) {
    return a.x < b.x+b.w && a.x+a.width > b.x && a.y < b.y+b.h && a.y+this.height > b.y;
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
    
    // MAPANG MADILIM AT SERYOSO
    platforms.forEach(p => {
        ctx.fillStyle = '#2c2416'; ctx.fillRect(p.x,p.y,p.w,p.h);
        ctx.fillStyle = '#443a28'; ctx.fillRect(p.x,p.y,p.w,5);
    });

    monsters.forEach((m,i) => {
        m.x += m.speed * m.dir; if(m.x < 30 || m.x > 770) m.dir *= -1;
        ctx.fillStyle = m.color; ctx.fillRect(m.x,m.y,m.w,m.h);
        ctx.fillStyle='#ff1744'; ctx.fillRect(m.x,m.y-10,m.w*(m.hp/10),5);

        if(checkCollision(player,m)) { player.hp--; player.x=50; if(player.hp<=0){alert('Natalo ka! Simulan muli ang paglalakbay.');gameRunning=false;} }
        
        if(m.hp <= 0){
            dropLoot(m.x,m.y); player.gold += 15;
            updateQuest(1, 1);
            monsters.splice(i,1);
            setTimeout(()=> monsters.push({x:Math.random()*650+80,y:400,w:38,h:42,speed:1+Math.random()*0.8,dir:1,hp:6+Math.floor(Math.random()*5),color:'#550022'}),5000);
        }
    });

    inventory.forEach((it,i)=>{
        ctx.fillStyle = it.isNFT ? '#ffd600' : '#ffab00';
        ctx.fillRect(it.x, it.y, 18,18);
        if(checkCollision(player,{x:it.x,y:it.y,w:18,h:18})){
            alert(`Nakuha mo: ${it.name}\nUri: ${it.rarity}`);
            inventory.splice(i,1); shopItems.push(it);
        }
    });

    player.update(keys, platforms, monsters);
    player.draw(ctx);
    
    ctx.fillStyle='#e0e0e0'; ctx.font='14px Arial';
    ctx.fillText(`Buhay: ${player.hp} | Ginto: ${player.gold}`,15,25);
    ctx.fillText(`Bayani: ${player.heroType}`,15,45);
    ctx.fillText(`M=Tindahan | C=Gawa | N=Mint | Q=Misyon`, 380, 25);

    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown',e=>{
    if(e.key==='ArrowLeft') keys.left=true;
    if(e.key==='ArrowRight') keys.right=true;
    if(e.key===' ') keys.jump=true;
    if(e.key==='Shift') keys.skill=true;
    if(e.key.toLowerCase()==='m') openMarketplace();
    if(e.key.toLowerCase()==='c') openCrafting();
    if(e.key.toLowerCase()==='n') mintItem();
    if(e.key.toLowerCase()==='q') showQuests();
});
document.addEventListener('keyup',e=>{
    if(e.key==='ArrowLeft') keys.left=false;
    if(e.key==='ArrowRight') keys.right=false;
    if(e.key===' ') keys.jump=false;
    if(e.key==='Shift') keys.skill=false;
});

function showQuests(){
    gameRunning=false;
    let list = quests.map(q=>`${q.done?'✅':'🔴'} ${q.name}: ${q.desc} (${q.progress}/${q.target}) - ${q.reward} Ginto`).join("\n");
    alert(`=== MGA MISYON NG JUNAKIS ===\n\n${list}`);
    gameRunning=true;
}

function mintItem(){
    if(shopItems.length===0){alert('Wala kang gamit na maaaring gawing NFT!');return;}
    gameRunning=false;
    let list = shopItems.map((it,i)=>`${i+1}. ${it.name} [${it.rarity}] ${it.isNFT?'✅ NAKATALA NA':'🔴 HINDI PA'}`).join("\n");
    let pick = prompt(`=== PAGTATALA NG KAYAMANAN (MINT) ===\n\nPiliin ang gamit na nais mong gawing opisyal na ari-arian:\n${list}\n\nIlagay ang Numero:`);
    if(pick && shopItems[pick-1] && !shopItems[pick-1].isNFT){
        if(confirm(`Sigurado ka bang itatala bilang NFT ang:\n"${shopItems[pick-1].name}"?\nIto ay magiging opisyal na sa iyo at maaari nang ibenta sa merkado.`)){
            shopItems[pick-1].isNFT = true;
            updateQuest(4,1);
            alert(`TAGUMPAY!\nAng "${shopItems[pick-1].name}" ay nakatala na bilang iyong ari-arian.`);
        }
    }
    gameRunning=true;
}

function openMarketplace(){
    gameRunning = false;
    let list = shopItems.map((it,i)=>`${i+1}. ${it.name} [${it.rarity}] ${it.isNFT?'✅ NFT':'📦 Gamit'} - Halaga: ${it.price} Ginto`).join("\n");
    let pick = prompt(`=== JUNAKIS MARKETPLACE ===\n\nMga Gamit na Pwedeng Ipagbenta:\n${list}\n\nIlagay ang Numero ng Ibibenta:`);
    if(pick && shopItems[pick-1]){
        let item = shopItems.splice(pick-1,1)[0];
        player.gold += item.price;
        updateQuest(5,1);
        alert(`Matagumpay na naibenta!\nNakuha mong ginto: ${item.price}`);
    }
    gameRunning = true;
}

function openCrafting(){
    gameRunning = false;
    let list = craftList.map((cr,i)=>`${i+1}. ${cr.result}\nKailangan: ${cr.need.join(", ")}`).join("\n\n");
    let pick = prompt(`=== PAGGAGAWA NG SANDATA AT KAGAMITAN ===\n\nMaaari mong likhain:\n\n${list}\n\nIlagay ang Numero ng nais mong gawin:`);
    if(pick && craftList[pick-1]){
        let recipe = craftList[pick-1];
        let hasAll = recipe.need.every(req => shopItems.some(it=>it.name === req));
        if(hasAll){
            recipe.need.forEach(nam=>{ let idx = shopItems.findIndex(it=>it.name === nam); if(idx > -1) shopItems.splice(idx,1); });
            shopItems.push({name:recipe.result, rarity:"Gawang Kamay", price:recipe.price, isNFT:false});
            updateQuest(3,1);
            alert(`MATAGUMPAY NA NALIKHA!\nNagawa mo na ang: ${recipe.result}\nMaaari mo na itong gamitin o ibenta.`);
        }else{ alert("Hindi sapat ang mga materyales na nasa iyong pag-aari."); }
    }
    gameRunning = true;
}
