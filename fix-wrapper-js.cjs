const fs = require('fs');
let js = fs.readFileSync('src/profile.js', 'utf8');

js = js.replace(/document\.getElementById\('svgTransformWrapper'\)/g, "document.getElementById('previewSvg')");

fs.writeFileSync('src/profile.js', js);
console.log('Updated profile.js wrapper ID');
