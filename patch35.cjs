const fs = require('fs');
let html = fs.readFileSync('profile.html', 'utf8');

const targetDebug = `    // Debug info
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
    debugInfo.innerText = 'Zoom: ' + Number(currentZoom).toFixed(4) + ' | ' + transformStr;`;

html = html.replace(targetDebug, '');

fs.writeFileSync('profile.html', html);
console.log('Removed debug info');
