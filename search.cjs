const fs = require('fs');
const lines = fs.readFileSync('src/main.js', 'utf8').split('\n');
lines.forEach((line, i) => {
    if (line.includes('_updateLiveAnnotationDrawing')) {
        console.log(`Line ${i+1}: ${line}`);
    }
});
