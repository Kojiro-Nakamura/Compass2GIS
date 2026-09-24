const fs = require('fs');

const html = fs.readFileSync('profile.html', 'utf8');

const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);

if (scriptMatch) {
    const scriptContent = scriptMatch[1];
    
    // Save to src/profile.js
    fs.writeFileSync('src/profile.js', scriptContent.trim());
    
    // Replace inline script with external script
    const newHtml = html.replace(scriptMatch[0], '<script type="module" src="./src/profile.js"></script>');
    fs.writeFileSync('profile.html', newHtml);
    
    console.log('Extracted profile.js');
} else {
    console.log('No script found');
}
