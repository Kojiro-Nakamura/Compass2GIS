const fs = require('fs');
let js = fs.readFileSync('src/main.js', 'utf8');

const mMouseMove = js.match(/[\s]+handleMouseMove = \(e\) => \{/);
const mMouseUp = js.match(/[\s]+handleMouseUp = \(e\) => \{/);

if (mMouseMove && mMouseUp) {
    const startIdx = mMouseMove.index;
    const endIdx = mMouseUp.index;
    
    let methodBody = js.substring(startIdx, endIdx);
    
    // Also remove the newly added ones from patch2 just in case they were formatted slightly differently
    methodBody = methodBody.replace(/[ \t]*const clientX = e\.touches[^;]+;\r?\n/g, '');
    methodBody = methodBody.replace(/[ \t]*const clientY = e\.touches[^;]+;\r?\n/g, '');
    
    // Replace all e.clientX with clientX
    methodBody = methodBody.replace(/e\.clientX/g, 'clientX').replace(/e\.clientY/g, 'clientY');
    
    // Prepend the declaration
    methodBody = methodBody.replace(/([\s]+)handleMouseMove = \(e\) => \{/, 
        '$1handleMouseMove = (e) => {\n' +
        '$1    const clientX = e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX;\n' +
        '$1    const clientY = e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY;'
    );
    
    js = js.substring(0, startIdx) + methodBody + js.substring(endIdx);
    fs.writeFileSync('src/main.js', js);
    console.log('Fixed handleMouseMove successfully');
} else {
    console.log('Could not find handleMouseMove or handleMouseUp');
}
