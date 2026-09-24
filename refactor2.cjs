const fs = require('fs');

const js = fs.readFileSync('src/profile.js', 'utf8');

const targetFunction = js.match(/function generateDXF\(\) \{[\s\S]*?\}\n\nfunction triggerDownload/)[0];

const replacementFunction = `import { generateProfileDXF } from './dxfProfile.js';

function generateDXF() {
    if (!drawingData) { customMessage("先に計算を実行してください。"); return; }
    const attrIds = ['attrYear', 'attrConstName', 'attrTitle', 'attrLocation', 'attrProject', 'attrOffice', 'attrDrawNo', 'attrScaleText'];
    const attrs = {
        year: document.getElementById('attrYear').value,
        constName: document.getElementById('attrConstName').value,
        title: document.getElementById('attrTitle').value,
        location: document.getElementById('attrLocation').value,
        project: document.getElementById('attrProject').value,
        office: document.getElementById('attrOffice').value,
        drawNo: document.getElementById('attrDrawNo').value,
        scaleText: document.getElementById('attrScaleText').value,
    };
    const warningEl = document.getElementById('dxfWarning');
    const showWarning = (show) => {
        if (show) warningEl.classList.remove('hidden');
        else warningEl.classList.add('hidden');
    };
    generateProfileDXF(drawingData, attrs, triggerDownload, showWarning);
}

function triggerDownload`;

const newJs = js.replace(targetFunction, replacementFunction);
fs.writeFileSync('src/profile.js', newJs);
console.log('Patched profile.js with DXF module');
