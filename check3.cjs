const fs = require('fs');
const js = fs.readFileSync('src/mapView.js', 'utf8');
const s = js.indexOf("sMarker.on('mousedown',");
console.log(js.substring(s, s + 1500));
