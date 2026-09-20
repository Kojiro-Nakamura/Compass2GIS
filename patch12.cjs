const fs = require('fs');
let js = fs.readFileSync('src/main.js', 'utf8');

js = js.replace(/this\.els\.canvas\.addEventListener\('mousedown', this\.handleMouseDown\);/, 
    "this.els.canvas.addEventListener('mousedown', this.handleMouseDown, { passive: false });\n                this.els.canvas.addEventListener('touchstart', this.handleMouseDown, { passive: false });");

js = js.replace(/window\.addEventListener\('mouseup', this\.handleMouseUp\);/, 
    "window.addEventListener('mouseup', this.handleMouseUp);\n                window.addEventListener('touchend', this.handleMouseUp);");

js = js.replace(/window\.addEventListener\('mousemove', this\.handleMouseMove\);/, 
    "window.addEventListener('mousemove', this.handleMouseMove, { passive: false });\n                window.addEventListener('touchmove', this.handleMouseMove, { passive: false });");

fs.writeFileSync('src/main.js', js);
console.log('Added touch event listeners successfully');
