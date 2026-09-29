const fs = require('fs');
let js = fs.readFileSync('src/svgProfile.js', 'utf8');

// The problematic lines:
// 12:     html += `<rect x="${viewX}" y="${viewY}" width="${viewW}" height="${viewH}" fill="#ffffff" />
// 13:     html += `<rect x="0" y="0" width="${pw}" height="${ph}" fill="none" stroke="#000000" stroke-width="0.5" />`;`;

// Let's just fix lines 11-14.
const lines = js.split('\n');
lines[11] = '    html += `<rect x="${viewX}" y="${viewY}" width="${viewW}" height="${viewH}" fill="#ffffff" />`;';
lines[12] = '    html += `<rect x="0" y="0" width="${pw}" height="${ph}" fill="none" stroke="#000000" stroke-width="0.5" />`;';
fs.writeFileSync('src/svgProfile.js', lines.join('\n'));
