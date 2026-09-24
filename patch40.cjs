const fs = require('fs');
let html = fs.readFileSync('profile.html', 'utf8');

const target = '<div class="canvas-container rounded border" id="svgContainer">';
const replacement = '<div class="canvas-container rounded border flex-1 w-full relative overflow-hidden" id="svgContainer">';

html = html.replace(target, replacement);
fs.writeFileSync('profile.html', html);
console.log('Fixed svgContainer classes');
