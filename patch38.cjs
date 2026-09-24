const fs = require('fs');
let html = fs.readFileSync('profile.html', 'utf8');

const regex = /function applySvgTransform\(\) \{[\s\S]*?\}\s*\n/m;
const replacement = `function applySvgTransform() {
    if (isNaN(translateX) || isNaN(translateY) || isNaN(currentZoom)) return;
    const wrapper = document.getElementById('svgTransformWrapper');
    if (!wrapper) return;
    const transformStr = \`translate(\${Number(translateX).toFixed(2)}px, \${Number(translateY).toFixed(2)}px) scale(\${Number(currentZoom).toFixed(6)})\`;
    wrapper.style.transform = transformStr;
}\n`;

html = html.replace(regex, replacement);
fs.writeFileSync('profile.html', html);
console.log('Fixed NaN check (regex)');
