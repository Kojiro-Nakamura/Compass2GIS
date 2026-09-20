const fs = require('fs');
const js = fs.readFileSync('src/main.js', 'utf8');
const s = js.indexOf('if (this.state.view.isRotating && this.state.view.rotatingTarget) {');
console.log(js.substring(s + 2000, s + 2500));
