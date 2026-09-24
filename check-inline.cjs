const fs = require('fs');
const html = fs.readFileSync('profile.html', 'utf8');
const onClicks = html.match(/on\w+="[^"]*"/g);
console.log(onClicks);
