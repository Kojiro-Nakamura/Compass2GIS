const fs = require('fs');
let js = fs.readFileSync('src/profile.js', 'utf8');
js = js.replace(/customMessage\(/g, 'alert(');
fs.writeFileSync('src/profile.js', js);
console.log('Replaced customMessage with alert');
