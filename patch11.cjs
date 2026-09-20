const fs = require('fs');
let js = fs.readFileSync('src/main.js', 'utf8');

js = js.replace(/if \(this\.isMapMode\) this\.updateMapDrawing\(false\);[\s]*else this\.draw\(\);/g, 'this._updateLiveAnnotationDrawing();');
js = js.replace(/if \(this\.isMapMode\) this\.updateMapDrawing\(false\);/g, 'this._updateLiveAnnotationDrawing();');

fs.writeFileSync('src/main.js', js);
console.log('Replaced updateMapDrawing with _updateLiveAnnotationDrawing');
