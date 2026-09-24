const fs = require('fs');

let pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
if (pkg.version === '0.0.0') {
    pkg.version = '1.0.0';
}
let [major, minor, patch] = pkg.version.split('.').map(Number);

patch++;
if (patch >= 10) {
    patch = 0;
    minor++;
}
if (minor >= 10) {
    minor = 0;
    major++;
}

const newVersion = `${major}.${minor}.${patch}`;
pkg.version = newVersion;
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));

let indexHtml = fs.readFileSync('index.html', 'utf8');
if (indexHtml.includes('<title>Compass2GIS v')) {
    indexHtml = indexHtml.replace(/<title>Compass2GIS v.*?<\/title>/, `<title>Compass2GIS v${newVersion}</title>`);
} else {
    indexHtml = indexHtml.replace(/<title>Compass2GIS<\/title>/, `<title>Compass2GIS v${newVersion}</title>`);
}
fs.writeFileSync('index.html', indexHtml);

let profileHtml = fs.readFileSync('profile.html', 'utf8');
if (profileHtml.includes('<title>コンパス測量 縦断図作成ツール v')) {
    profileHtml = profileHtml.replace(/<title>コンパス測量 縦断図作成ツール v.*?<\/title>/, `<title>コンパス測量 縦断図作成ツール v${newVersion}</title>`);
} else {
    profileHtml = profileHtml.replace(/<title>コンパス測量 縦断図作成ツール<\/title>/, `<title>コンパス測量 縦断図作成ツール v${newVersion}</title>`);
}
fs.writeFileSync('profile.html', profileHtml);

console.log(`Version incremented to v${newVersion}`);
