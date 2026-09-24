const fs = require('fs');

const js = fs.readFileSync('src/profile.js', 'utf8');

let newJs = js.replace(`import { generateProfileDXF } from './dxfProfile.js';\n\n`, ``);
newJs = `import { generateProfileDXF } from './dxfProfile.js';\n` + newJs;

fs.writeFileSync('src/profile.js', newJs);
console.log('Moved import to top');
