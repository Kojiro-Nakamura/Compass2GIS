const fs = require('fs');
let js = fs.readFileSync('src/main.js', 'utf8');

// Insert pointermove and pointerup alongside touchmove and touchend
js = js.replace(/window\.addEventListener\('touchmove', this\.handleMouseMove, \{ passive: false, capture: true \}\);/, 
    "window.addEventListener('touchmove', this.handleMouseMove, { passive: false, capture: true });\n                window.addEventListener('pointermove', this.handleMouseMove, { passive: false, capture: true });");

js = js.replace(/window\.addEventListener\('touchend', this\.handleMouseUp, \{ capture: true \}\);/, 
    "window.addEventListener('touchend', this.handleMouseUp, { capture: true });\n                window.addEventListener('pointerup', this.handleMouseUp, { capture: true });\n                window.addEventListener('pointercancel', this.handleMouseUp, { capture: true });");

fs.writeFileSync('src/main.js', js);
console.log('Added pointer events to window listeners');
