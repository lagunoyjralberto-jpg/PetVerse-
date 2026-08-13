class Player {
    constructor(x, y, heroType) {
        this.x = x;
        this.y = y;
        this.size = 36;
        this.speed = 4;
        this.heroType = heroType;
        this.attackCooldown = 0;
        this.skillCooldown = 0;

        if(heroType === 'WARRIOR') {
            this.damage = 3;
            this.color = '#8B0000';
            this.acc = '#CD5C5C';
            this.skillName = 'STRIKE OF VALOR';
            this.skillDamage = 6;
        }
        if(heroType === 'MAGE') {
            this.damage = 2;
            this.color = '#00008B';
            this.acc = '#6495ED';
            this.skillName = 'STORM FLAME';
            this.skillDamage = 7;
        }
        if(heroType === 'RANGER') {
            this.damage = 2.5;
            this.color = '#006400';
            this.acc = '#90EE90';
            this.skillName = 'NATURE’S WRATH';
            this.skillDamage = 5;
        }
    }

    update(keys, monsters) {
        // Movement
        if(keys.up) this.y -= this.speed;
        if(keys.down) this.y += this.speed;
        if(keys.left) this.x -= this.speed;
        if(keys.right) this.x += this.speed;

        // Boundaries
        if(this.x < 20) this.x = 20;
        if(this.x > canvas.width - 20) this.x = canvas.width - 20;
        if(this.y < 20) this.y = 20;
        if(this.y > canvas.height - 20) this.y = canvas.height - 20;

        // AUTO ATTACK - FIXED
        if(this.attackCooldown <= 0) {
            monsters.forEach(enemy => {
                let distance = Math.hypot(this.x - enemy.x, this.y - enemy.y);
                if(distance < 65) {
                    enemy.hp -= this.damage;
                    this.attackCooldown = 25;
                }
            });
        }
        if(this.attackCooldown > 0) this.attackCooldown--;
        if(this.skillCooldown > 0) this.skillCooldown--;

        // SKILL ATTACK - FIXED
        if(keys.skill && this.skillCooldown <= 0) {
            monsters.forEach(enemy => {
                let distance = Math.hypot(this.x - enemy.x, this.y - enemy.y);
                if(distance < 130) {
                    enemy.hp -= this.skillDamage;
                }
            });
            this.skillCooldown = 180;
            keys.skill = false;
        }
    }

    draw(ctx) {
        // Player Body
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = this.acc;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 11, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(this.x, this.y - 3, 6, 0, Math.PI * 2);
        ctx.fill();

        // Skill Name Display
        ctx.font = 'bold 10px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = this.skillCooldown <= 0 ? '#00ff88' : '#555555';
        ctx.fillText(this.skillName, this.x, this.y - 24);
    }
}
