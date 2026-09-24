const fs = require('fs');
let html = fs.readFileSync('profile.html', 'utf8');

const targetAddRow = `function addEditableRow(tbody, row) {
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
    \`;`;

const replaceAddRow = `function addEditableRow(tbody, row, insertBeforeTr = null) {
    const tr = document.createElement('tr');
    tr.innerHTML = \`
        <td><input type="text" value="\${row.pt}"></td>
        <td><input type="text" value="\${row.target}"></td>
        <td><input type="text" value="\${row.azi}"></td>
        <td><input type="text" value="\${row.vAngle}"></td>
        <td><input type="text" value="\${row.sDist}"></td>
        <td class="w-12 flex items-center justify-center">
            <button class="text-green-500 hover:text-green-700 font-bold px-1 ins-btn cursor-pointer" title="下に挿入">+</button>
            <button class="text-red-500 hover:text-red-700 font-bold px-1 del-btn cursor-pointer" title="削除">×</button>
        </td>
    \`;`;

html = html.replace(targetAddRow, replaceAddRow);

const targetEvents = `    tr.querySelector('.del-btn').addEventListener('click', () => {
        tr.remove();
        syncTableToRaw();
    });
    tbody.appendChild(tr);`;

const replaceEvents = `    tr.querySelector('.del-btn').addEventListener('click', () => {
        tr.remove();
        syncTableToRaw();
    });
    tr.querySelector('.ins-btn').addEventListener('click', () => {
        addEditableRow(tbody, {pt:'', target:'', azi:'', vAngle:'', sDist:''}, tr.nextSibling);
        syncTableToRaw();
    });
    if (insertBeforeTr) {
        tbody.insertBefore(tr, insertBeforeTr);
    } else {
        tbody.appendChild(tr);
    }`;

html = html.replace(targetEvents, replaceEvents);
fs.writeFileSync('profile.html', html);
console.log('Fixed insert buttons');
