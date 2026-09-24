const fs = require('fs');
let html = fs.readFileSync('profile.html', 'utf8');

const startStr = "function applySvgTransform() {";
const endStr = "wrapper.style.transform = transformStr;";

const startIndex = html.indexOf(startStr);
const endIndex = html.indexOf(endStr, startIndex) + endStr.length;

if (startIndex !== -1 && endIndex !== -1) {
    // There are some closing braces or spaces after, but we can just replace the body
    const replacement = `function applySvgTransform() {
    if (isNaN(translateX) || isNaN(translateY) || isNaN(currentZoom)) return;
    const wrapper = document.getElementById('svgTransformWrapper');
    if (!wrapper) return;
    const transformStr = \`translate(\${Number(translateX).toFixed(2)}px, \${Number(translateY).toFixed(2)}px) scale(\${Number(currentZoom).toFixed(6)})\`;
    wrapper.style.transform = transformStr;`;

    html = html.substring(0, startIndex) + replacement + html.substring(endIndex);
    fs.writeFileSync('profile.html', html);
    console.log('Replaced applySvgTransform manually');
} else {
    console.log('Not found');
}
