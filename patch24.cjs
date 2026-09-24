const fs = require('fs');
let js = fs.readFileSync('src/main.js', 'utf8');

// 1. Modify createRow
js = js.replace(/for \((let|var) i = 0; i < 5; i\+\+\) \{[\s\S]*?const td = document\.createElement\('td'\); const inp = document\.createElement\('input'\);/, match => {
    return `const isProfile = rowData[6] !== false;
                if (rowData.length < 7) rowData[6] = isProfile;
                
                const tdProfile = document.createElement('td');
                const chkProfile = document.createElement('input');
                chkProfile.type = 'checkbox'; chkProfile.checked = isProfile;
                chkProfile.title = '縦断図に含める';
                chkProfile.addEventListener('change', (e) => {
                    this.state.tableData[index][6] = e.target.checked;
                    this.saveToLocalStorage();
                });
                tdProfile.appendChild(chkProfile);
                tr.appendChild(tdProfile);

                ` + match;
});

// 2. Add button bindings
js = js.replace(/this\.els\.btnExportHTML = \$id\('btnExportHTML'\);/, match => {
    return match + `\n            this.els.btnProfile = $id('btnProfile');\n            this.els.chkAllProfile = $id('chkAllProfile');`;
});

js = js.replace(/bindClick\(this\.els\.btnExportHTML, \(\) => this\.exportHTML\(\)\);/, match => {
    return match + `\n            if (this.els.btnProfile) {
                bindClick(this.els.btnProfile, () => {
                    let tsv = '器械点\\t視準点\\t方位角\\t高低角\\t斜距離\\n';
                    for (const row of this.state.tableData) {
                        if (row[0] && row[6] !== false && row[5] !== true) {
                            tsv += \`\${row[0]}\\t\${row[1] || ''}\\t\${row[2] || '0'}\\t\${row[3] || '0'}\\t\${row[4] || '0'}\\n\`;
                        }
                    }
                    localStorage.setItem('compassProfileData', tsv);
                    window.open('profile.html', '_blank');
                });
            }
            if (this.els.chkAllProfile) {
                this.els.chkAllProfile.addEventListener('change', (e) => {
                    const checked = e.target.checked;
                    this.state.tableData.forEach(row => { row[6] = checked; });
                    this.renderTable();
                    this.saveToLocalStorage();
                });
            }`;
});

fs.writeFileSync('src/main.js', js);
console.log('Modified src/main.js successfully');
