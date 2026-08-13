class Player {
    constructor(x, y, heroType) {
        this.x = x; this.y = y; this.size = 36;
        this.speed = 4;
        this.heroType = heroType;
        this.attackCooldown = 0;
        this.skillCooldown = 0;

        if(heroType === 'WARRIOR') { 
            this.damage = 3;
            this.color = '#8B0000'; this.acc = '#CD5C5C';
            this.skillName = 'DAGITAB NG KATAPANGAN'; this.skillDmg = 6;
        }
        if(heroType === 'MAGE') { 
            this.damage = 2;
            this.color = '#00008B'; this.acc = '#6495ED';
            this.skillName = 'BAGYO NG KAGUBATAN'; this.skillDmg = 7;
        }
        if(heroType === 'RANGER') { 
            this.damage = 2.5;
            this.color = '#006400'; this.acc = '#90EE90';
            this.skillName = 'PAGHABILIN NG KAGUBATAN'; this.skillDmg = 5;
        }
    }

    update(keys, monsters) {
        // 🎮 TOP-DOWN GALAW: Pataas, Pababa, Kaliwa, Kanan - WALA NANG TALON!
        if(keys.up) this.y -= this.speed;
        if(keys.down) this.y += this.speed;
        if(keys.left) this.x -= this.speed;
        if(keys.right) this.x += this.speed;

        // Huwag lumabas sa mapa
        if(this.x < 20) this.x = 20;
        if(this.x > canvas.width - 20) this.x = canvas.width - 20;
        if(this.y < 20) this.y = 20;
        if(this.y > canvas.height - 20) this.y = canvas.height - 20;

        // ⚔️ AUTO ATTACK
        if(this.attackCooldown <= 0){
            monsters.forEach(m=>{
                let dist = Math.hypot(this.x - m.x, this.y - m.y);
                if(dist < 60){ m.hp -= this.damage; this.attackCooldown = 25; }
            });
        }
        if(this.attackCooldown > 0) this.attackCooldown--;
        if(this.skillCooldown > 0) this.skillCooldown--;

        // ✨ SKILL
        if(keys.skill && this.skillCooldown <= 0){
            monsters.forEach(m=>{
                let dist = Math.hypot(this.x - m.x, this.y - m.y);
                if(dist < 120){ m.hp -= this.skillDmg; }
            });
            this.skillCooldown = 180; keys.skill = false;
        }
    }

    draw(ctx) {
        // Itsura na parang Realm Legend
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 16, 0, Math.PI*2);
        ctx.fill();
        ctx.fillStyle = this.acc;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 11, 0, Math.PI*2);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(this.x, this.y-3, 6, 0, Math.PI*2);
        ctx.fill();
        ctx.font = 'bold 9px Arial';
        ctx.fillStyle = this.skillCooldown<=0 ? '#00ff88' : '#555';
        ctx.textAlign = 'center';
        ctx.fillText(this.skillName, this.x, this.y-22);
    }
}
