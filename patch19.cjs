const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The replacement duplicated the first 7 lines.
const lines = html.split('\n');
if (lines[0].includes('<!DOCTYPE html>') && lines[1].includes('<!DOCTYPE html>')) {
    html = lines.slice(8).join('\n');
    html = '<!DOCTYPE html>\n<html lang="ja">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>コンパスtoGIS（ブラウザ版）</title>\n    <link rel="icon" type="image/svg+xml" href="./favicon.svg" />\n' + html;
}

// Remove leaflet.js
html = html.replace(/<script src="https:\/\/unpkg\.com\/leaflet@1\.9\.4\/dist\/leaflet\.js" integrity="[^"]*" crossorigin=""><\/script>/, '');

fs.writeFileSync('index.html', html);
console.log('Fixed index.html');
