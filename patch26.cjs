const fs = require('fs');
let js = fs.readFileSync('src/main.js', 'utf8');

// Add to els
js = js.replace(/btnExportHTML: \$id\('btnExportHTML'\),/, "btnExportHTML: $id('btnExportHTML'), btnProfile: $id('btnProfile'), chkAllProfile: $id('chkAllProfile'),");

// Add bindings
js = js.replace(/bindClick\(this\.els\.btnExportHTML, \(\) => this\.openExportModal\('html'\)\);/, match => {
    return match + `\n                if (this.els.btnProfile) {
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
console.log('Fixed btnProfile bindings');
