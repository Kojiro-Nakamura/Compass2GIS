const fs = require('fs');
let html = fs.readFileSync('profile.html', 'utf8');

// 1. Change sidebar width from 360px to 450px
html = html.replace('lg:w-[360px]', 'lg:w-[450px]');

// 2. Replace the data input area
const targetSidebarTop = `<div class="flex flex-col gap-2">
                <label class="text-sm font-semibold">測量データ</label>
                <button id="btnOpenModal" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full flex items-center justify-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    データ入力ウィンドウを開く
                </button>
            </div>`;

const replacementSidebarTop = `<h2 class="font-bold text-lg border-b pb-2">測量データ</h2>
            <div class="flex flex-col gap-2">
                <button id="btnOpenModal" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded flex items-center justify-center gap-1 text-sm shadow">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    エクセル等からペースト
                </button>
                <div class="border rounded overflow-x-auto shadow-sm">
                    <table class="min-w-full text-xs text-center border-collapse editable-table">
                        <thead>
                            <tr class="bg-gray-100 border-b">
                                <th class="p-1 border-r font-medium">測点</th>
                                <th class="p-1 border-r font-medium">ﾀｰｹﾞｯﾄ</th>
                                <th class="p-1 border-r font-medium">方位角</th>
                                <th class="p-1 border-r font-medium">高低角</th>
                                <th class="p-1 border-r font-medium">斜距離</th>
                                <th class="p-1 w-6"></th>
                            </tr>
                        </thead>
                        <tbody id="editableTableBody">
                        </tbody>
                    </table>
                    <div class="p-1 border-t text-center bg-gray-50">
                        <button id="btnAddRowTable" class="text-blue-600 hover:text-blue-800 text-xs font-semibold py-1 px-2">+ 行を追加</button>
                    </div>
                </div>
            </div>
            <style>
               .editable-table td { padding: 0; border-right: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; }
               .editable-table input { width: 100%; box-sizing: border-box; padding: 4px; border: none; text-align: center; background: transparent; }
               .editable-table input:focus { outline: 1px solid #2563eb; background: #fff; z-index: 10; position: relative; }
               /* Remove number spinners */
               .editable-table input[type="number"]::-webkit-inner-spin-button, 
               .editable-table input[type="number"]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
            </style>`;

if (html.includes(targetSidebarTop)) {
    html = html.replace(targetSidebarTop, replacementSidebarTop);
} else {
    console.log("Could not find sidebar top");
}

// 3. Inject JS logic
const targetJS = `document.getElementById('btnApplyModal').addEventListener('click', () => {
        modal.classList.add('hidden');
        isUserZoomed = false; 
        processData();
    });`;

const replacementJS = `document.getElementById('btnApplyModal').addEventListener('click', () => {
        modal.classList.add('hidden');
        isUserZoomed = false; 
        renderEditableTable(); // Update table from pasted data
        processData();
    });

    document.getElementById('btnAddRowTable').addEventListener('click', () => {
        addEditableRow(document.getElementById('editableTableBody'), {pt:'', target:'', azi:'', vAngle:'', sDist:''});
        syncTableToRaw();
    });`;

if (html.includes(targetJS)) {
    html = html.replace(targetJS, replacementJS);
} else {
    console.log("Could not find apply modal js");
}

const targetInitJS = `const attrIds = ['attrYear', 'attrConstName', 'attrTitle', 'attrLocation', 'attrProject', 'attrOffice', 'attrDrawNo', 'attrScaleText'];`;
const replacementInitJS = `const attrIds = ['attrYear', 'attrConstName', 'attrTitle', 'attrLocation', 'attrProject', 'attrOffice', 'attrDrawNo', 'attrScaleText'];
    renderEditableTable();`;

if (html.includes(targetInitJS)) {
    html = html.replace(targetInitJS, replacementInitJS);
}

const targetProcessData = `function processData() {`;
const replacementProcessData = `function renderEditableTable() {
    const rawText = document.getElementById('rawData').value;
    const lines = rawText.trim().split('\\n');
    const tbody = document.getElementById('editableTableBody');
    if(!tbody) return;
    tbody.innerHTML = '';
    
    let data = [];
    for (let i = 0; i < lines.length; i++) {
        const cols = lines[i].split('\\t').map(c => c.trim());
        if (i === 0 && (cols[0] === '器械点' || cols[0] === '測点')) continue;
        if (cols.length < 2 && cols.join('') === '') continue; 
        data.push({
            pt: cols[0] || '',
            target: cols[1] || '',
            azi: cols[2] || '',
            vAngle: cols[3] || '',
            sDist: cols[4] || ''
        });
    }
    
    if (data.length === 0) {
        data.push({pt:'', target:'', azi:'', vAngle:'', sDist:''});
    }

    data.forEach((row, idx) => addEditableRow(tbody, row));
}

function syncTableToRaw() {
    const tbody = document.getElementById('editableTableBody');
    if(!tbody) return;
    let tsv = '器械点\\t視準点\\t方位角\\t高低角\\t斜距離\\n';
    Array.from(tbody.children).forEach(tr => {
        const inputs = tr.querySelectorAll('input');
        if (inputs.length === 5) {
            tsv += Array.from(inputs).map(inp => inp.value).join('\\t') + '\\n';
        }
    });
    document.getElementById('rawData').value = tsv;
    processData();
}

function handleTableKeydown(e, tr, tbody) {
    const inputs = Array.from(tbody.querySelectorAll('input'));
    const idx = inputs.indexOf(e.target);
    if (idx === -1) return;
    
    if (e.key === 'ArrowRight') {
        if (idx + 1 < inputs.length) inputs[idx + 1].focus();
    } else if (e.key === 'ArrowLeft') {
        if (idx - 1 >= 0) inputs[idx - 1].focus();
    } else if (e.key === 'ArrowDown' || e.key === 'Enter') {
        if (idx + 5 < inputs.length) {
            inputs[idx + 5].focus();
        } else if (e.key === 'Enter') {
            document.getElementById('btnAddRowTable').click();
            setTimeout(() => {
                const newInputs = Array.from(tbody.querySelectorAll('input'));
                if (idx + 5 < newInputs.length) newInputs[idx + 5].focus();
            }, 10);
        }
    } else if (e.key === 'ArrowUp') {
        if (idx - 5 >= 0) inputs[idx - 5].focus();
    }
}

function addEditableRow(tbody, row) {
    const tr = document.createElement('tr');
    tr.innerHTML = \`
        <td><input type="text" value="\${row.pt}"></td>
        <td><input type="text" value="\${row.target}"></td>
        <td><input type="text" value="\${row.azi}"></td>
        <td><input type="text" value="\${row.vAngle}"></td>
        <td><input type="text" value="\${row.sDist}"></td>
        <td class="w-8">
            <button class="text-red-500 hover:text-red-700 font-bold px-2 del-btn cursor-pointer">×</button>
        </td>
    \`;
    const inputs = tr.querySelectorAll('input');
    inputs.forEach(inp => {
        inp.addEventListener('input', () => syncTableToRaw());
        inp.addEventListener('keydown', (e) => handleTableKeydown(e, tr, tbody));
    });
    tr.querySelector('.del-btn').addEventListener('click', () => {
        tr.remove();
        syncTableToRaw();
    });
    tbody.appendChild(tr);
}

function processData() {`;

if (html.includes(targetProcessData)) {
    html = html.replace(targetProcessData, replacementProcessData);
}

fs.writeFileSync('profile.html', html);
console.log("Patched successfully");
