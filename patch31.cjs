const fs = require('fs');
let html = fs.readFileSync('profile.html', 'utf8');

let replaced = html.replace(/mousedown/g, 'pointerdown')
                   .replace(/mousemove/g, 'pointermove')
                   .replace(/mouseup/g, 'pointerup')
                   .replace(/mouseleave/g, 'pointerleave');

fs.writeFileSync('profile.html', replaced);
console.log('Converted mouse to pointer events');
