const fs = require('fs');
let js = fs.readFileSync('src/profile.js', 'utf8');
js = js.replace(/if \(isOverflow\) \{\s*alert\("図面が用紙サイズからはみ出しています（プレビューでスクロール確認可能）"\);\s*\}/g, '');
fs.writeFileSync('src/profile.js', js);
console.log('Removed alert for overflow');
