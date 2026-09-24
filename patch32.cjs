const fs = require('fs');
let html = fs.readFileSync('profile.html', 'utf8');

const targetApply = `function applySvgTransform() {
    const wrapper = document.getElementById('svgTransformWrapper');
    wrapper.style.transform = \`translate(\${Number(translateX).toFixed(2)}px, \${Number(translateY).toFixed(2)}px) scale(\${Number(currentZoom).toFixed(6)})\`;
}`;

const replacementApply = `function applySvgTransform() {
    const wrapper = document.getElementById('svgTransformWrapper');
    const transformStr = \`translate(\${Number(translateX).toFixed(2)}px, \${Number(translateY).toFixed(2)}px) scale(\${Number(currentZoom).toFixed(6)})\`;
    wrapper.style.transform = transformStr;
    
    // Debug info
    let debugInfo = document.getElementById('debugInfo');
    if (!debugInfo) {
        debugInfo = document.createElement('div');
        debugInfo.id = 'debugInfo';
        debugInfo.style.position = 'absolute';
        debugInfo.style.top = '10px';
        debugInfo.style.left = '10px';
        debugInfo.style.background = 'rgba(255,255,255,0.8)';
        debugInfo.style.padding = '5px';
        debugInfo.style.fontSize = '12px';
        debugInfo.style.zIndex = '9999';
        document.getElementById('previewArea').appendChild(debugInfo);
    }
    debugInfo.innerText = 'Zoom: ' + Number(currentZoom).toFixed(4) + ' | ' + transformStr;
}`;

html = html.replace(targetApply, replacementApply);

fs.writeFileSync('profile.html', html);
console.log('Added debug info');
