const fs = require('fs');
const js = fs.readFileSync('src/profile.js', 'utf8');

const regex = /function drawVectorPreview\(\) \{[\s\S]*?\n\}\n/;
const match = js.match(regex);

if(match) {
    let newJs = js.replace(match[0], `function drawVectorPreview() {
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
    drawProfileSVG(drawingData, attrs, document.getElementById('previewSvg'));
}\n`);
    
    newJs = newJs.replace(`import { generateProfileDXF } from './dxfProfile.js';\n`, `import { generateProfileDXF } from './dxfProfile.js';\nimport { drawProfileSVG } from './svgProfile.js';\n`);
    fs.writeFileSync('src/profile.js', newJs);
    console.log('Patched profile.js with SVG module');
} else {
    console.log('Could not find drawVectorPreview');
}
