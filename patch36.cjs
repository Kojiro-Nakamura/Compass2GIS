const fs = require('fs');
let html = fs.readFileSync('profile.html', 'utf8');

const targetApply = `function applySvgTransform() {
    const wrapper = document.getElementById('svgTransformWrapper');
    const transformStr = \`translate(\${Number(translateX).toFixed(2)}px, \${Number(translateY).toFixed(2)}px) scale(\${Number(currentZoom).toFixed(6)})\`;
    wrapper.style.transform = transformStr;
}`;

const replacementApply = `function applySvgTransform() {
    if (isNaN(translateX) || isNaN(translateY) || isNaN(currentZoom)) return;
    const wrapper = document.getElementById('svgTransformWrapper');
    if (!wrapper) return;
    const transformStr = \`translate(\${Number(translateX).toFixed(2)}px, \${Number(translateY).toFixed(2)}px) scale(\${Number(currentZoom).toFixed(6)})\`;
    wrapper.style.transform = transformStr;
}`;

html = html.replace(targetApply, replacementApply);

fs.writeFileSync('profile.html', html);
console.log('Added NaN safety net to applySvgTransform');
