const fs = require('fs');
let js = fs.readFileSync('src/main.js', 'utf8');

js = js.replace(/if \(e\.button === 2\) \{/g, 'const btn = e.button !== undefined ? e.button : 0;\n                    if (btn === 2) {');
js = js.replace(/if \(e\.button === 0\) \{/g, 'if (btn === 0) {');

// We also need to fix e.clientX in handleMouseDown!
js = js.replace(/handleMouseDown = \(e\) => \{[\s\S]*?(?=handleMouseUp =)/, (match) => {
    let replaced = match.replace(/e\.clientX/g, '(e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX)');
    replaced = replaced.replace(/e\.clientY/g, '(e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY)');
    return replaced;
});

// We need to fix e.clientX in handleMouseUp! But handleMouseUp doesn't use clientX, wait, does it?
// Let's check handleMouseUp for clientX
js = js.replace(/handleMouseUp = \(e\) => \{[\s\S]*?(?=handleDrop)/, (match) => {
    let replaced = match.replace(/e\.clientX/g, '(e.changedTouches && e.changedTouches.length > 0 ? e.changedTouches[0].clientX : e.clientX)');
    replaced = replaced.replace(/e\.clientY/g, '(e.changedTouches && e.changedTouches.length > 0 ? e.changedTouches[0].clientY : e.clientY)');
    return replaced;
});

fs.writeFileSync('src/main.js', js);
console.log('Fixed mouse handlers for touch events');
