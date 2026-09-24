const fs = require('fs');
let html = fs.readFileSync('profile.html', 'utf8');

html = html.replace('<div class="max-w-7xl mx-auto p-4 flex flex-col h-screen">', '<div class="w-full px-2 lg:px-4 py-4 flex flex-col h-screen">');
html = html.replace('<div class="w-full lg:w-1/3 bg-white p-4 rounded shadow flex flex-col gap-4 overflow-y-auto">', '<div class="w-full lg:w-[360px] bg-white p-4 rounded shadow flex flex-col gap-4 overflow-y-auto shrink-0">');
html = html.replace('<div class="w-full lg:w-2/3 bg-white p-4 rounded shadow flex flex-col min-h-0">', '<div class="w-full flex-1 bg-white p-4 rounded shadow flex flex-col min-h-0 overflow-hidden">');

fs.writeFileSync('profile.html', html);
console.log('Fixed profile layout');
