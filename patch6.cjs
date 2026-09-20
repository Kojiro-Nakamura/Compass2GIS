const fs = require('fs');
let js = fs.readFileSync('src/main.js', 'utf8');

const startIdx = js.indexOf('            handleMouseMove = (e) => {');
const endIdx = js.indexOf('            handleMouseUp = (e) => {', startIdx);

if (startIdx !== -1 && endIdx !== -1) {
    let methodBody = js.substring(startIdx, endIdx);
    
    // Completely remove the old declaration if it exists
    methodBody = methodBody.replace('                const clientX = e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX;\r\n', '');
    methodBody = methodBody.replace('                const clientY = e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY;\r\n', '');
    methodBody = methodBody.replace('                const clientX = e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX;\n', '');
    methodBody = methodBody.replace('                const clientY = e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY;\n', '');
    
    // Also remove the newly added ones from patch2 just in case they were formatted slightly differently
    methodBody = methodBody.replace(/const clientX = e\.touches[^;]+;/g, '');
    methodBody = methodBody.replace(/const clientY = e\.touches[^;]+;/g, '');
    
    // Replace all e.clientX with clientX
    methodBody = methodBody.replace(/e\.clientX/g, 'clientX').replace(/e\.clientY/g, 'clientY');
    
    // Prepend the declaration
    methodBody = methodBody.replace('            handleMouseMove = (e) => {', 
        '            handleMouseMove = (e) => {\n' +
        '                const clientX = e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX;\n' +
        '                const clientY = e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY;'
    );
    
    js = js.substring(0, startIdx) + methodBody + js.substring(endIdx);
    fs.writeFileSync('src/main.js', js);
    console.log('Fixed handleMouseMove successfully');
} else {
    console.log('Could not find handleMouseMove or handleMouseUp');
}
