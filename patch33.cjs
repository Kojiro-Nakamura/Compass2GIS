const fs = require('fs');
let html = fs.readFileSync('profile.html', 'utf8');

const targetStyle = '<div id="svgTransformWrapper" style="transform-origin: 0 0; width: 100%; height: 100%;">';
const replaceStyle = '<div id="svgTransformWrapper" style="transform-origin: 0 0; width: 100%; height: 100%; will-change: transform;">';

html = html.replace(targetStyle, replaceStyle);
fs.writeFileSync('profile.html', html);
console.log('Added will-change');
