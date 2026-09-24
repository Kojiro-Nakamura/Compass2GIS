const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const exportHTMLBtn = '<button id="btnExportHTML" style="background-color: #217270; margin-left: 8px;">📄 平面図出力</button>';
const profileBtn = '<button id="btnProfile" style="background-color: #B36A22; margin-left: 8px;">📈 縦断図を作成</button>';
if (!html.includes('btnProfile')) {
    html = html.replace(exportHTMLBtn, exportHTMLBtn + '\n                ' + profileBtn);
}

const thKikai = '<th style="width: 15%;">器械点</th>';
const thCheckbox = '<th style="width: 5%;" title="縦断図に含める"><input type="checkbox" id="chkAllProfile" checked></th>';
if (!html.includes('chkAllProfile')) {
    html = html.replace(thKikai, thCheckbox + thKikai);
}

fs.writeFileSync('index.html', html);
console.log('Modified index.html');
