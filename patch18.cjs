const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const headEnd = '</head>';
const pwaMeta = `
    <meta name="theme-color" content="#059669">
    <link rel="apple-touch-icon" href="./favicon.svg">
    <meta name="description" content="コンパス測量データをGIS図面に変換するツール">
`;

if (!html.includes('theme-color')) {
    html = html.replace(headEnd, pwaMeta + headEnd);
    fs.writeFileSync('index.html', html);
    console.log('Added PWA meta tags to index.html');
} else {
    console.log('PWA meta tags already exist');
}
