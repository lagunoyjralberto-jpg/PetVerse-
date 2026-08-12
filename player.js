class Player {
    constructor(x, y, heroType) {
        this.x = x; this.y = y; this.width = 40; this.height = 50;
        this.speed = 5; this.jumpPower = 15; this.vy = 0; this.grounded = true; 
        this.heroType = heroType;
        this.attackCooldown = 0;
        this.skillCooldown = 0;

        // KATANGIAN AT SKILLS NG BAWAT BAYANI
        if(heroType === 'Warrior') { 
            this.speed = 4; this.jumpPower = 14; this.damage = 2;
            this.color = '#ff3333'; this.mark = '⚔️';
            this.skillName = 'PAGBAGSAK';
            this.skillDmg = 4;
        }
        if(heroType === 'Mage') { 
            this.speed = 5; this.jumpPower = 16; this.damage = 1.5;
            this.color = '#3366ff'; this.mark = '🔮';
            this.skillName = 'BAGYO NG APOY';
            this.skillDmg = 5;
        }
        if(heroType === 'Ranger') { 
            this.speed = 7; this.jumpPower = 18; this.damage = 1.2;
            this.color = '#33cc33'; this.mark = '🏹';
            this.skillName = 'PANALANGIN NG PALADIN';
            this.skillDmg = 3;
        }
    }

    update(keys, platforms, monsters) {
        // Galaw
        if(keys.left) this.x -= this.speed;
        if(keys.right) this.x += this.speed;
        if(keys.jump && this.grounded) { this.vy = -this.jumpPower; this.grounded = false; }
        
        // Grabidad
        this.vy += 0.8; this.y += this.vy;
        this.grounded = false;
        platforms.forEach(p => {
            if(this.x < p.x+p.w && this.x+this.width > p.x && this.y < p.y+p.h && this.y+this.height > p.y) {
                if(this.vy > 0) { this.y = p.y - this.height; this.vy = 0; this.grounded = true; }
            }
        });

        // HINDI LALABAS SA LARO
        if(this.x < 0) this.x = 0;
        if(this.x+this.width > canvas.width) this.x = canvas.width - this.width;
        if(this.y+this.height > canvas.height) { this.y = canvas.height - this.height; this.grounded = true; this.vy = 0; }

        // ⚔️ AUTO ATTACK - KAPAG MALAPIT MAY KUSA NANG TATAMA
        if(this.attackCooldown <= 0){
            monsters.forEach(m=>{
                let dist = Math.hypot((this.x+20)-(m.x+17), (this.y+25)-(m.y+20));
                if(dist < 60){
                    m.hp -= this.damage;
                    this.attackCooldown = 25;
                }
            });
        }
        if(this.attackCooldown > 0) this.attackCooldown--;
        if(this.skillCooldown > 0) this.skillCooldown--;

        // ✨ PINDUTIN SPACE O BUTTON PARA SA SKILL
        if(keys.skill && this.skillCooldown <= 0){
            monsters.forEach(m=>{
                let dist = Math.hypot((this.x+20)-(m.x+17), (this.y+25)-(m.y+20));
                if(dist < 120){
                    m.hp -= this.skillDmg;
                }
            });
            this.skillCooldown = 120;
            keys.skill = false;
        }
    }

    draw(ctx) {
        // Katawan
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        // Ulo at Tanda
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(this.x+20, this.y+12, 10, 0, Math.PI*2);
        ctx.fill();
        ctx.fillStyle = '#000';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(this.mark, this.x+20, this.y+18);
        // Ipakita kung handa na ang Skill
        ctx.font = '11px Arial';
        ctx.fillStyle = this.skillCooldown<=0 ? '#00ff88' : '#888';
        ctx.fillText(this.skillName, this.x+20, this.y-5);
    }
}
