const fs = require('fs');
let html = fs.readFileSync('profile.html', 'utf8');

const targetObj = `        surveyData.push({
            pt: cols[0],
            target: cols[1],
            azi: parseFloat(cols[2]),
            vAngle: parseFloat(cols[3]),
            sDist: parseFloat(cols[4])
        });`;

const replaceObj = `        surveyData.push({
            pt: cols[0],
            target: cols[1] || '',
            azi: parseFloat(cols[2]) || 0,
            vAngle: parseFloat(cols[3]) || 0,
            sDist: parseFloat(cols[4]) || 0
        });`;

html = html.replace(targetObj, replaceObj);
fs.writeFileSync('profile.html', html);
console.log('Fixed NaN in parsing');
