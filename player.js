class Player {
    constructor(x, y, heroType) {
        this.x = x; this.y = y; this.width = 32; this.height = 58;
        this.speed = 5; this.jumpPower = 16; this.vy = 0; this.grounded = true; 
        this.heroType = heroType;
        this.attackCooldown = 0;
        this.skillCooldown = 0;

        if(heroType === 'WARRIOR') { 
            this.speed = 4; this.damage = 3;
            this.color = '#790e0e'; this.acc = '#b71c1c';
            this.skillName = 'DAGITAB NG KATAPANGAN'; this.skillDmg = 6;
        }
        if(heroType === 'MAGE') { 
            this.speed = 5; this.damage = 2;
            this.color = '#0d1b4d'; this.acc = '#3949ab';
            this.skillName = 'BAGYO NG KAGUBATAN'; this.skillDmg = 7;
        }
        if(heroType === 'RANGER') { 
            this.speed = 7; this.damage = 2.5;
            this.color = '#0d3d14'; this.acc = '#2e7d32';
            this.skillName = 'PAGHABILIN NG KAGUBATAN'; this.skillDmg = 5;
        }
    }

    update(keys, platforms, monsters) {
        // Galaw at Talon
        if(keys.left) this.x -= this.speed;
        if(keys.right) this.x += this.speed;
        if(keys.jump && this.grounded) { this.vy = -this.jumpPower; this.grounded = false; }
        
        this.vy += 0.8; this.y += this.vy;
        this.grounded = false;
        platforms.forEach(p => {
            if(this.x < p.x+p.w && this.x+this.width > p.x && this.y < p.y+p.h && this.y+this.height > p.y) {
                if(this.vy > 0) { this.y = p.y - this.height; this.vy = 0; this.grounded = true; }
            }
        });

        if(this.x < 0) this.x = 0;
        if(this.x+this.width > canvas.width) this.x = canvas.width - this.width;
        if(this.y+this.height > canvas.height) { this.y = canvas.height - this.height; this.grounded = true; this.vy = 0; }

        // ⚔️ AUTO ATTACK - BUMALIK NA AT MATIBAY NA
        if(this.attackCooldown <= 0){
            monsters.forEach(m=>{
                let dist = Math.hypot((this.x+16)-(m.x+16), (this.y+29)-(m.y+20));
                if(dist < 75){
                    m.hp -= this.damage;
                    this.attackCooldown = 28;
                }
            });
        }
        if(this.attackCooldown > 0) this.attackCooldown--;
        if(this.skillCooldown > 0) this.skillCooldown--;

        // ✨ ESPESYAL NA KAKAYAHAN
        if(keys.skill && this.skillCooldown <= 0){
            monsters.forEach(m=>{
                let dist = Math.hypot((this.x+16)-(m.x+16), (this.y+29)-(m.y+20));
                if(dist < 150){
                    m.hp -= this.skillDmg;
                }
            });
            this.skillCooldown = 150;
            keys.skill = false;
        }
    }

    draw(ctx) {
        // Baluti at Anyo
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x+4, this.y+18, 24, 40);
        ctx.fillStyle = this.acc;
        ctx.fillRect(this.x+6, this.y+20, 20, 36);
        // Ulo at Proteksyon
        ctx.fillStyle = '#424242';
        ctx.fillRect(this.x+8, this.y+4, 16, 16);
        ctx.fillStyle = '#e0e0e0';
        ctx.fillRect(this.x+10, this.y+6, 12, 12);
        // Pangalan ng Kakayahan
        ctx.font = 'bold 10px Arial';
        ctx.fillStyle = this.skillCooldown<=0 ? '#00e676' : '#616161';
        ctx.fillText(this.skillName, this.x+16, this.y-5);
    }
}
