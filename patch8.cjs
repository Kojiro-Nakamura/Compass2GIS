const fs = require('fs');
let js = fs.readFileSync('src/main.js', 'utf8');

const startStr = '            handleMouseMove = (e) => {';
const startIdx = js.indexOf(startStr);
const endIdx = js.indexOf('            handleMouseUp = (e) => {', startIdx);

if (startIdx !== -1 && endIdx !== -1) {
    let methodBody = js.substring(startIdx + startStr.length, endIdx);
    
    // Replace ALL e.clientX and e.clientY
    methodBody = methodBody.replace(/e\.clientX/g, 'clientX').replace(/e\.clientY/g, 'clientY');
    
    // Construct the new method
    const newMethod = '            handleMouseMove = (e) => {\n' +
        '                const clientX = e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX;\n' +
        '                const clientY = e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY;' +
        methodBody;
        
    js = js.substring(0, startIdx) + newMethod + js.substring(endIdx);
    
    fs.writeFileSync('src/main.js', js);
    console.log('Fixed handleMouseMove successfully');
}
