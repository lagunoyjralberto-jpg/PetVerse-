class Player {
    constructor(x, y, heroType) {
        this.x = x; this.y = y; this.width = 40; this.height = 50;
        this.speed = 5; this.jumpPower = 15; this.vy = 0; this.grounded = true; this.heroType = heroType;
        if(heroType === 'Warrior') { this.speed = 4; this.jumpPower = 14; }
        if(heroType === 'Mage') { this.speed = 5; this.jumpPower = 16; }
        if(heroType === 'Ranger') { this.speed = 7; this.jumpPower = 18; }
    }
    update(keys, platforms) {
        if(keys['ArrowLeft']) this.x -= this.speed;
        if(keys['ArrowRight']) this.x += this.speed;
        if(keys[' '] && this.grounded) { this.vy = -this.jumpPower; this.grounded = false; }
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
    }
    draw(ctx) {
        let color = '#ff4444';
        if(this.heroType === 'Mage') color = '#4444ff';
        if(this.heroType === 'Ranger') color = '#44ff44';
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = '#fff'; ctx.font = '12px Arial';
        ctx.fillText(this.heroType, this.x - 5, this.y - 5);
    }
}
