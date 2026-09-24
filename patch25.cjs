const fs = require('fs');
let js = fs.readFileSync('src/main.js', 'utf8');

js = js.split("['', '', '', '', '', false]").join("['', '', '', '', '', false, true]");

fs.writeFileSync('src/main.js', js);
console.log('Fixed empty rows');
