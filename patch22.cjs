const fs = require('fs');
let html = fs.readFileSync('profile.html', 'utf8');

const target = 'window.onload = () => {\n    setupUI();';
const loadLogic = `window.onload = () => {
    const savedData = localStorage.getItem('compassProfileData');
    if (savedData) {
        document.getElementById('rawData').value = savedData;
        localStorage.removeItem('compassProfileData');
    }
    setupUI();`;

if (html.includes(target)) {
    html = html.replace(target, loadLogic);
    fs.writeFileSync('profile.html', html);
    console.log('Modified profile.html');
} else {
    console.log('Target not found in profile.html');
}
