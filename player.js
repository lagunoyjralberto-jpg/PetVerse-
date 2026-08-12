class Player {
    constructor(x, y, heroType) {
        this.x = x; this.y = y; this.width = 35; this.height = 55;
        this.speed = 5; this.jumpPower = 16; this.vy = 0; this.grounded = true; 
        this.heroType = heroType;
        this.attackCooldown = 0;
        this.skillCooldown = 0;

        // TUNAY NA KATANGIAN NG BAWAT BAYANI
        if(heroType === 'WARRIOR') { 
            this.speed = 4; this.jumpPower = 14; this.damage = 3;
            this.color = '#b71c1c'; this.icon = '🛡️';
            this.skillName = 'DAGITAB NG KATAPANGAN';
            this.skillDmg = 6;
        }
        if(heroType === 'MAGE') { 
            this.speed = 5; this.jumpPower = 17; this.damage = 2;
            this.color = '#1a237e'; this.icon = '🔮';
            this.skillName = 'BAGYO NG KAGUBATAN';
            this.skillDmg = 7;
        }
        if(heroType === 'RANGER') { 
            this.speed = 7; this.jumpPower = 19; this.damage = 2.5;
            this.color = '#1b5e20'; this.icon = '🏹';
            this.skillName = 'PAGHABILIN NG KAGUBATAN';
            this.skillDmg = 5;
        }
    }

    update(keys, platforms, monsters) {
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

        // AUTO ATTACK - SERYOSO AT MAY SAKIT
        if(this.attackCooldown <= 0){
            monsters.forEach(m=>{
                let dist = Math.hypot((this.x+17)-(m.x+17), (this.y+27)-(m.y+20));
                if(dist < 70){
                    m.hp -= this.damage;
                    this.attackCooldown = 30;
                }
            });
        }
        if(this.attackCooldown > 0) this.attackCooldown--;
        if(this.skillCooldown > 0) this.skillCooldown--;

        // ESPESYAL NA KAKAYAHAN
        if(keys.skill && this.skillCooldown <= 0){
            monsters.forEach(m=>{
                let dist = Math.hypot((this.x+17)-(m.x+17), (this.y+27)-(m.y+20));
                if(dist < 140){
                    m.hp -= this.skillDmg;
                }
            });
            this.skillCooldown = 150;
            keys.skill = false;
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = '#e0e0e0';
        ctx.beginPath();
        ctx.arc(this.x+17, this.y+12, 10, 0, Math.PI*2);
        ctx.fill();
        ctx.fillStyle = '#000';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(this.icon, this.x+17, this.y+17);
        ctx.font = '10px Arial';
        ctx.fillStyle = this.skillCooldown<=0 ? '#00e676' : '#616161';
        ctx.fillText(this.skillName, this.x+17, this.y-5);
    }
}
