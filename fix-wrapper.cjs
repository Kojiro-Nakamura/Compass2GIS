const fs = require('fs');
let html = fs.readFileSync('profile.html', 'utf8');

// The wrapper in HTML might be multiline due to prettier.
// It looks like:
// <div
//   id="svgTransformWrapper"
//   style="
//     transform-origin: 0 0;
//     width: 100%;
//     height: 100%;
//     will-change: transform;
//   "
// >
const regex = /<div\s+id="svgTransformWrapper"\s+style="[^"]*will-change:\s*transform;[^"]*"\s*>/m;
html = html.replace(regex, '');

// Also remove one closing </div> after </svg>
html = html.replace(/<\/svg>\s*<\/div>/, '</svg>');

// Add the style to <svg> directly
html = html.replace(/<svg id="previewSvg" xmlns="http:\/\/www.w3.org\/2000\/svg">/, '<svg id="previewSvg" xmlns="http://www.w3.org/2000/svg" style="transform-origin: 0 0;">');

fs.writeFileSync('profile.html', html);
console.log('Fixed profile.html wrapper');
