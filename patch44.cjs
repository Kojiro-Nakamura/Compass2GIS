const fs = require('fs');
let html = fs.readFileSync('profile.html', 'utf8');

const targetStr = '<td class="w-12 flex items-center justify-center">';
const replaceStr = '<td class="w-12"><div class="flex items-center justify-center">';

html = html.replace(targetStr, replaceStr).replace('title="削除">×</button>\n        </td>', 'title="削除">×</button>\n        </div></td>');
fs.writeFileSync('profile.html', html);
console.log('Fixed flex on td');
