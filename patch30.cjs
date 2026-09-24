const fs = require('fs');
let html = fs.readFileSync('profile.html', 'utf8');

const target = `    const cWidth = container.clientWidth;
    const cHeight = container.clientHeight;`;
const replacement = `    const cWidth = container.clientWidth;
    const cHeight = container.clientHeight;
    
    // レイアウトが完了しておらず幅が0の場合は少し待ってから再実行
    if (cWidth === 0 || cHeight === 0) {
        setTimeout(fitSvgToContainer, 100);
        return;
    }`;
html = html.replace(target, replacement);

fs.writeFileSync('profile.html', html);
console.log('Fixed cWidth 0 issue');
