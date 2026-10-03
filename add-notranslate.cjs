const fs = require('fs');

for (const file of ['index.html', 'profile.html']) {
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('name="google" content="notranslate"')) {
    content = content.replace(/<meta charset="UTF-8" \/>/, '<meta charset="UTF-8" />\n    <meta name="google" content="notranslate">');
    fs.writeFileSync(file, content);
    console.log(file + ' updated.');
  }
}
