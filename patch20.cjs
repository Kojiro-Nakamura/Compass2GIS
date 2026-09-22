const fs = require('fs');
let js = fs.readFileSync('src/main.js', 'utf8');

if (!js.includes("import L from 'leaflet'")) {
    js = "import 'leaflet/dist/leaflet.css';\nimport L from 'leaflet';\nwindow.L = L;\n" + js;
    fs.writeFileSync('src/main.js', js);
    console.log('Added leaflet imports to main.js');
} else {
    console.log('Leaflet already imported');
}
