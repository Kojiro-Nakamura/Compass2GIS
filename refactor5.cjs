const fs = require('fs');
let html = fs.readFileSync('profile.html', 'utf8');

// I will just add an extra </div> right before the dataModal.
const target = '<!-- データ入力モーダル -->';
html = html.replace(target, '</div>\n\n' + target);
fs.writeFileSync('profile.html', html);
console.log('Fixed missing div');
