const fs = require('fs');
let html = fs.readFileSync('profile.html', 'utf8');

const target = "wrapper.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentZoom})`;";
const replacement = "wrapper.style.transform = `translate(${Number(translateX).toFixed(2)}px, ${Number(translateY).toFixed(2)}px) scale(${Number(currentZoom).toFixed(6)})`;";
html = html.replace(target, replacement);

fs.writeFileSync('profile.html', html);
console.log('Fixed CSS Transform toFixed');
