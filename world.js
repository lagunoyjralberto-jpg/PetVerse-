// KEYBOARD CONTROLS
document.addEventListener('keydown', e => {
    if(e.key === 'ArrowUp') keys.up = true;
    if(e.key === 'ArrowDown') keys.down = true;
    if(e.key === 'ArrowLeft') keys.left = true;
    if(e.key === 'ArrowRight') keys.right = true;
    if(e.key === 'Shift') keys.skill = true;
    if(e.key.toLowerCase() === 'm') openMarketplace();
    if(e.key.toLowerCase() === 'c') openCrafting();
    if(e.key.toLowerCase() === 'n') mintItem();
    if(e.key.toLowerCase() === 'q') showQuests();
});

document.addEventListener('keyup', e => {
    if(e.key === 'ArrowUp') keys.up = false;
    if(e.key === 'ArrowDown') keys.down = false;
    if(e.key === 'ArrowLeft') keys.left = false;
    if(e.key === 'ArrowRight') keys.right = false;
    if(e.key === 'Shift') keys.skill = false;
});
