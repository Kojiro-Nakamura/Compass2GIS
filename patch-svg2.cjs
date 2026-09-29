const fs = require('fs');
let js = fs.readFileSync('src/svgProfile.js', 'utf8');
js = js.replace(/fill="#ffffff" \/>/, 'fill="#ffffff" />\n    html += `<rect x="0" y="0" width="${pw}" height="${ph}" fill="none" stroke="#000000" stroke-width="0.5" />`;');
fs.writeFileSync('src/svgProfile.js', js);
