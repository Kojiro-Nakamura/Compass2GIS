const fs = require('fs');
let html = fs.readFileSync('profile.html', 'utf8');

const targetSvg = '<svg id="previewSvg" xmlns="http://www.w3.org/2000/svg">';
const wrapperStart = '<div id="svgTransformWrapper" style="transform-origin: 0 0; width: 100%; height: 100%;">\n                      <svg id="previewSvg" xmlns="http://www.w3.org/2000/svg">';
html = html.replace(targetSvg, wrapperStart);

const targetEndSvg = '<!-- ここにベクター作図されます -->\n                      </svg>';
const wrapperEnd = '<!-- ここにベクター作図されます -->\n                      </svg>\n                  </div>';
html = html.replace(targetEndSvg, wrapperEnd);
// Also try this fallback if the comment is garbled due to Shift-JIS
const targetEndSvg2 = '</svg>\n                  </div>\n                  <!-- ズームコントロールボタン -->';
const wrapperEnd2 = '</svg>\n                  </div>\n                  </div>\n                  <!-- ズームコントロールボタン -->';
html = html.replace(targetEndSvg2, wrapperEnd2);

const targetApply = 'const svg = document.getElementById(\'previewSvg\');\n    svg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentZoom})`;';
const replaceApply = 'const wrapper = document.getElementById(\'svgTransformWrapper\');\n    wrapper.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentZoom})`;';
html = html.replace(targetApply, replaceApply);

html = html.replace('transform-origin: 0 0;', '');

fs.writeFileSync('profile.html', html);
console.log('Wrapped SVG in div');
