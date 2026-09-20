const fs = require('fs');
const js = fs.readFileSync('src/main.js', 'utf8');
const s = js.indexOf("if (this.state.view.movingTarget.type === 'text')");
console.log(js.substring(s, s + 1000));
