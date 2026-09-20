const fs = require('fs');
const js = fs.readFileSync('src/mapView.js', 'utf8');
const s = js.indexOf("hMarker.on('mousedown',");
console.log(js.substring(s + 600, s + 1600));
