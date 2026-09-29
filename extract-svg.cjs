const fs = require('fs');
const oldHtml = fs.readFileSync('old_profile.html', 'utf8');
const match = oldHtml.match(/function drawVectorPreview\(\) \{([\s\S]*?)\n\}\n\nfunction setupSvgInteractions/);
let body = match[1];

let newContent = `export function drawProfileSVG(drawingData, attrs, svg) {
    if (!drawingData || !svg) return;
    const { results, graphElevBase, pw, ph, scaleH, scaleV, viewX, viewY, viewW, viewH } = drawingData;
    
    // キャンバスのサイズを実際の描画範囲(viewBox)に設定して、はみ出し部分も表示
    svg.setAttribute('width', viewW);
    svg.setAttribute('height', viewH);
    svg.setAttribute('viewBox', \`\${viewX} \${viewY} \${viewW} \${viewH}\`);
    svg.style.overflow = 'visible';
`;

// Extract everything after the first `svg.innerHTML = ` 
const contentPart = body.split(/svg\.innerHTML = /);
newContent += '    svg.innerHTML = ' + contentPart[1];
newContent += '\n}\n';

// Replace the hardcoded document.getElementById(...) inside the function with `attrs` properties
// In the old profile.html, we had:
// putT(document.getElementById('attrYear').value, ...)
// We need to map these to `attrs.year`, etc.
newContent = newContent.replace(/document\.getElementById\('attrYear'\)\.value/g, 'attrs.year');
newContent = newContent.replace(/document\.getElementById\('attrConstName'\)\.value/g, 'attrs.constName');
newContent = newContent.replace(/document\.getElementById\('attrTitle'\)\.value/g, 'attrs.title');
newContent = newContent.replace(/document\.getElementById\('attrLocation'\)\.value/g, 'attrs.location');
newContent = newContent.replace(/document\.getElementById\('attrProject'\)\.value/g, 'attrs.project');
newContent = newContent.replace(/document\.getElementById\('attrOffice'\)\.value/g, 'attrs.office');
newContent = newContent.replace(/document\.getElementById\('attrDrawNo'\)\.value/g, 'attrs.drawNo');
newContent = newContent.replace(/document\.getElementById\('attrScaleText'\)\.value/g, 'attrs.scaleText');

fs.writeFileSync('src/svgProfile.js', newContent);
console.log('Done mapping svgProfile.js');
