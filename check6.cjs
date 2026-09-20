const fs = require('fs');
const js = fs.readFileSync('src/main.js', 'utf8');
const s = js.indexOf('if (this.state.view.isRotating && this.state.view.rotatingTarget) {');
console.log(js.substring(s + 1200, s + 2200));
