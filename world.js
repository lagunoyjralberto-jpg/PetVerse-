const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let player, keys = {}, platforms = [], monsters = [], gameRunning = false;
function setupWorld() {
    platforms = [{x:0,y:450,w:800,h:50},{x:150,y:370,w:120,h:20},{x:350,y:300,w:120,h:20},{x:550,y:230,w:120,h:20},{x:200,y:180,w:100,h:20}];
    monsters = [{x:300,y:400,w:35,h:40,speed:1.5,dir:1,hp:3,color:'#ff2222'},{x:600,y:400,w:35,h:40,speed:2,dir:-1,hp:2,color:'#ff6600'},{x:400,y:250,w:30,h:35,speed:1,dir:1,hp:4,color:'#aa00ff'}];
}
function loadPlayer(hero) {
    player = new Player(50,350,hero); player.hp = 5; setupWorld(); gameRunning = true; gameLoop();
}
function checkCollision(a,b) {
    return a.x < b.x+b.w && a.x+a.width > b.x && a.y < b.y+b.h && a.y+a.height > b.y;
}
function gameLoop() {
    if(!gameRunning) return;
    ctx.fillStyle = '#0f1925'; ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = '#2d5016'; platforms.forEach(p => ctx.fillRect(p.x,p.y,p.w,p.h));
    monsters.forEach((m,i) => {
        m.x += m.speed * m.dir; if(m.x < 100 || m.x > 700) m.dir *= -1;
        ctx.fillStyle = m.color; ctx.fillRect(m.x,m.y,m.w,m.h);
        if(checkCollision(player,m)) { player.hp--; player.x=50; if(player.hp<=0){alert('Natalo ka!');gameRunning=false;} }
    });
    player.update(keys,platforms); player.draw(ctx);
    ctx.fillStyle='#fff'; ctx.font='16px Arial'; ctx.fillText(`Buhay: ${player.hp}`,20,30); ctx.fillText(`Kalaban: ${monsters.length}`,20,55);
    requestAnimationFrame(gameLoop);
}
document.addEventListener('keydown',e=>keys[e.key]=true);
document.addEventListener('keyup',e=>keys[e.key]=false);
