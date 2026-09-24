const fs = require('fs');
let js = fs.readFileSync('src/main.js', 'utf8');

// 1. Modify createRow
const createRowTarget = `                for (let i = 0; i < 5; i++) {
                    const td = document.createElement('td'); const inp = document.createElement('input');`;

const createRowReplacement = `                const isProfile = rowData[6] !== false; // Default true if undefined
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

                for (let i = 0; i < 5; i++) {
                    const td = document.createElement('td'); const inp = document.createElement('input');`;

if (js.includes(createRowTarget)) {
    js = js.replace(createRowTarget, createRowReplacement);
} else {
    console.log('Failed to patch createRow');
}

// 2. Add button bindings in _initDOMAndEvents
const btnTarget = `            this.els.btnExportHTML = $id('btnExportHTML');`;
const btnReplacement = `            this.els.btnExportHTML = $id('btnExportHTML');
            this.els.btnProfile = $id('btnProfile');
            this.els.chkAllProfile = $id('chkAllProfile');`;

if (js.includes(btnTarget)) {
    js = js.replace(btnTarget, btnReplacement);
} else {
    console.log('Failed to patch btnTarget in _initDOMAndEvents');
}

const eventTarget = `            bindClick(this.els.btnExportHTML, () => this.exportHTML());`;
const eventReplacement = `            bindClick(this.els.btnExportHTML, () => this.exportHTML());
            if (this.els.btnProfile) {
                bindClick(this.els.btnProfile, () => {
                    let tsv = '器械点\\t視準点\\t方位角\\t高低角\\t斜距離\\n';
                    for (const row of this.state.tableData) {
                        // ignore empty rows, unchecked rows, and auxiliary lines
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

if (js.includes(eventTarget)) {
    js = js.replace(eventTarget, eventReplacement);
} else {
    console.log('Failed to patch eventTarget in _initDOMAndEvents');
}

fs.writeFileSync('src/main.js', js);
console.log('Modified src/main.js');
