const fs = require('fs');
let js = fs.readFileSync('src/main.js', 'utf8');

js = js.replace(/window\.addEventListener\('mouseup', this\.handleMouseUp\);/g, 
    "window.addEventListener('mouseup', this.handleMouseUp, { capture: true });");

js = js.replace(/window\.addEventListener\('touchend', this\.handleMouseUp\);/g, 
    "window.addEventListener('touchend', this.handleMouseUp, { capture: true });");

js = js.replace(/window\.addEventListener\('mousemove', this\.handleMouseMove, \{ passive: false \}\);/g, 
    "window.addEventListener('mousemove', this.handleMouseMove, { passive: false, capture: true });");

js = js.replace(/window\.addEventListener\('touchmove', this\.handleMouseMove, \{ passive: false \}\);/g, 
    "window.addEventListener('touchmove', this.handleMouseMove, { passive: false, capture: true });");

fs.writeFileSync('src/main.js', js);
console.log('Added capture: true to global event listeners');
