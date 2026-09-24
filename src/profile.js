import { generateProfileDXF } from './dxfProfile.js';
import { drawProfileSVG } from './svgProfile.js';
let surveyData = [];
let results = [];
let drawingData = null; 

// SVGパン・ズーム用変数
let currentZoom = 1;
let translateX = 0;
let translateY = 0;
let isDragging = false;
let startDragX = 0;
let startDragY = 0;
let isUserZoomed = false; // ユーザーが手動でズームしたか

// 数値をカンマ区切りにするヘルパー関数
function formatNum(num, dec = 2) {
    return Number(num).toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

window.onload = () => {
    const savedData = localStorage.getItem('compassProfileData');
    if (savedData) {
        document.getElementById('rawData').value = savedData;
        localStorage.removeItem('compassProfileData');
    }
    setupUI();
    setupSvgInteractions();
    setTimeout(() => processData(), 100);
};

function setupUI() {
    // タブ切り替え
    const tabPreview = document.getElementById('tabPreview');
    const tabTable = document.getElementById('tabTable');
    const previewArea = document.getElementById('previewArea');
    const tableArea = document.getElementById('tableArea');

    tabPreview.addEventListener('click', () => {
        tabPreview.classList.replace('text-gray-500', 'bg-gray-200');
        tabPreview.classList.add('font-semibold');
        tabPreview.classList.remove('hover:bg-gray-100');
        tabTable.classList.replace('bg-gray-200', 'text-gray-500');
        tabTable.classList.remove('font-semibold');
        tabTable.classList.add('hover:bg-gray-100');
        previewArea.classList.remove('hidden'); tableArea.classList.add('hidden');
    });

    tabTable.addEventListener('click', () => {
        tabTable.classList.replace('text-gray-500', 'bg-gray-200');
        tabTable.classList.add('font-semibold');
        tabTable.classList.remove('hover:bg-gray-100');
        tabPreview.classList.replace('bg-gray-200', 'text-gray-500');
        tabPreview.classList.remove('font-semibold');
        tabPreview.classList.add('hover:bg-gray-100');
        tableArea.classList.remove('hidden'); previewArea.classList.add('hidden');
    });

    // モーダル操作
    const modal = document.getElementById('dataModal');
    const inputTextArea = document.getElementById('rawData');
    let tempData = '';

    document.getElementById('btnOpenModal').addEventListener('click', () => {
        tempData = inputTextArea.value;
        modal.classList.remove('hidden');
    });
    document.getElementById('btnCancelModal').addEventListener('click', () => {
        inputTextArea.value = tempData;
        modal.classList.add('hidden');
    });
    document.getElementById('btnApplyModal').addEventListener('click', () => {
        modal.classList.add('hidden');
        isUserZoomed = false; 
        renderEditableTable(); // Update table from pasted data
        processData();
    });

    document.getElementById('btnAddRowTable').addEventListener('click', () => {
        addEditableRow(document.getElementById('editableTableBody'), {pt:'', target:'', azi:'', vAngle:'', sDist:''});
        syncTableToRaw();
    });

    // 各種ボタン・入力変更イベント (自動更新)
    document.getElementById('btnCalc').addEventListener('click', processData);
    document.getElementById('btnDxf').addEventListener('click', generateDXF);
    
    // 設定値が変更されたら即座に再計算・再描画
    document.getElementById('baseElevation').addEventListener('change', processData);
    document.getElementById('scaleH').addEventListener('change', processData);
    document.getElementById('scaleV').addEventListener('change', processData);
    document.getElementById('paperSize').addEventListener('change', () => { 
        isUserZoomed = false; // 用紙サイズ変更時はフィットさせ直す
        processData(); 
    });

    // 属性表の入力イベント
    const attrIds = ['attrYear', 'attrConstName', 'attrTitle', 'attrLocation', 'attrProject', 'attrOffice', 'attrDrawNo', 'attrScaleText'];
    renderEditableTable();
    attrIds.forEach(id => {
        document.getElementById(id).addEventListener('input', processData);
    });

    // 縮尺自動更新ロジック
    const updateScaleText = () => {
        const sh = document.getElementById('scaleH').value;
        const sv = document.getElementById('scaleV').value;
        const scaleTextEl = document.getElementById('attrScaleText');
        if (sh === sv) {
            scaleTextEl.value = `1/${Number(sh).toLocaleString()}`;
        } else {
            scaleTextEl.value = `横1/${Number(sh).toLocaleString()} 縦1/${Number(sv).toLocaleString()}`;
        }
        processData();
    };
    document.getElementById('scaleH').addEventListener('change', updateScaleText);
    document.getElementById('scaleV').addEventListener('change', updateScaleText);
    updateScaleText(); // 初期実行
}

function renderEditableTable() {
    const rawText = document.getElementById('rawData').value;
    const lines = rawText.trim().split('\n');
    const tbody = document.getElementById('editableTableBody');
    if(!tbody) return;
    tbody.innerHTML = '';
    
    let data = [];
    for (let i = 0; i < lines.length; i++) {
        const cols = lines[i].split('\t').map(c => c.trim());
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
    let tsv = '器械点\t視準点\t方位角\t高低角\t斜距離\n';
    Array.from(tbody.children).forEach(tr => {
        const inputs = tr.querySelectorAll('input');
        if (inputs.length === 5) {
            tsv += Array.from(inputs).map(inp => inp.value).join('\t') + '\n';
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

function addEditableRow(tbody, row, insertBeforeTr = null) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td><input type="text" value="${row.pt}"></td>
        <td><input type="text" value="${row.target}"></td>
        <td><input type="text" value="${row.azi}"></td>
        <td><input type="text" value="${row.vAngle}"></td>
        <td><input type="text" value="${row.sDist}"></td>
        <td class="w-12"><div class="flex items-center justify-center">
            <button class="text-green-500 hover:text-green-700 font-bold px-1 ins-btn cursor-pointer" title="下に挿入">+</button>
            <button class="text-red-500 hover:text-red-700 font-bold px-1 del-btn cursor-pointer" title="削除">×</button>
        </div></td>
    `;
    const inputs = tr.querySelectorAll('input');
    inputs.forEach(inp => {
        inp.addEventListener('input', () => syncTableToRaw());
        inp.addEventListener('keydown', (e) => handleTableKeydown(e, tr, tbody));
    });
    tr.querySelector('.del-btn').addEventListener('click', () => {
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
    }
}

function processData() {
    const rawText = document.getElementById('rawData').value;
    const lines = rawText.trim().split('\n');
    surveyData = [];

    // Parse Data
    for (let i = 0; i < lines.length; i++) {
        const cols = lines[i].split('\t').map(c => c.trim());
        if (cols.length < 5) continue;
        if (i === 0 && isNaN(parseFloat(cols[2]))) continue; // header skip

        surveyData.push({
            pt: cols[0],
            target: cols[1] || '',
            azi: parseFloat(cols[2]) || 0,
            vAngle: parseFloat(cols[3]) || 0,
            sDist: parseFloat(cols[4]) || 0
        });
    }

    if (surveyData.length === 0) return;
    calculateProfile();
    updateTable();
    drawVectorPreview();
}

function calculateProfile() {
    results = [];
    let currentElev = parseFloat(document.getElementById('baseElevation').value) || 0;
    let currentDist = 0;
    let minElev = currentElev;

    results.push({
        pt: surveyData[0].pt,
        hDist: 0.00,
        cDist: 0.00,
        vDist: 0.00,
        cvDist: 0.00,
        grad: 0.0,
        elev: currentElev
    });

    let cvDist = 0;

    for (let i = 0; i < surveyData.length; i++) {
        const d = surveyData[i];
        
        const vRad = d.vAngle * (Math.PI / 180);
        const hDist = d.sDist * Math.cos(vRad);
        const vDist = d.sDist * Math.sin(vRad);
        
        currentDist += hDist;
        cvDist += vDist;
        currentElev += vDist;

        if(currentElev < minElev) minElev = currentElev;

        const grad = (hDist === 0) ? 0 : (vDist / hDist) * 100;

        results.push({
            pt: d.target,
            hDist: hDist,
            cDist: currentDist,
            vDist: vDist,
            cvDist: cvDist,
            grad: grad,
            elev: currentElev
        });
    }

    // グラフの基準標高 (一番低い標高から20m下げた切りの良い数字)
    const graphElevBase = Math.floor(minElev / 5) * 5 - 20;

    const paperSelect = document.getElementById('paperSize');
    const paperOpt = paperSelect.options[paperSelect.selectedIndex];
    const pw = parseFloat(paperOpt.getAttribute('data-w'));
    const ph = parseFloat(paperOpt.getAttribute('data-h'));
    const scaleH = parseFloat(document.getElementById('scaleH').value);
    const scaleV = parseFloat(document.getElementById('scaleV').value);

    // 属性表データの取得
    const attrData = {
        year: document.getElementById('attrYear').value,
        constName: document.getElementById('attrConstName').value,
        title: document.getElementById('attrTitle').value,
        location: document.getElementById('attrLocation').value,
        project: document.getElementById('attrProject').value,
        office: document.getElementById('attrOffice').value,
        drawNo: document.getElementById('attrDrawNo').value,
        scaleText: document.getElementById('attrScaleText').value,
    };

    // --- はみ出し判定とプレビュー表示領域(viewBox)の計算 ---
    const pitch = 12; 
    const numBands = 5; // (項目数)
    const marginX = 12;
    const labelBoxW = 35;
    const colGap = 2;
    const dataBoxX = 20 + labelBoxW + colGap;
    const startX = dataBoxX + marginX; 
    
    // X方向の最大幅 (グラフ終端)
    const totalDistCAD = (results[results.length - 1].cDist * 1000) / scaleH;
    const maxDrawX = startX + totalDistCAD + 20; 

    // Y方向の最小値 (上へはみ出すか)
    let minDrawY = 0;
    const graphBaseY = ph - 30 - (numBands * pitch) - 5;
    results.forEach(r => {
        const cy = graphBaseY - ((r.elev - graphElevBase) * 1000) / scaleV;
        if (cy < minDrawY) minDrawY = cy;
    });

    const isOverflow = (maxDrawX > pw || minDrawY < 0);
    if (isOverflow) {
        customMessage("図面が用紙サイズからはみ出しています（プレビューでスクロール確認可能）");
    }

    // プレビュー表示用(viewBox)の範囲を拡張する（緑枠自体はpw, phのまま）
    const viewX = Math.min(0, -20);
    const viewY = Math.min(0, minDrawY - 20);
    const viewW = Math.max(pw, maxDrawX) - viewX + 20;
    const viewH = Math.max(ph, ph) - viewY + 20;

    drawingData = {
        results, graphElevBase, pw, ph, scaleH, scaleV, attrData,
        viewX, viewY, viewW, viewH
    };
}

function updateTable() {
    const tbody = document.getElementById('resultTableBody');
    tbody.innerHTML = '';
    results.forEach(r => {
        const tr = document.createElement('tr');
        tr.className = "border-b hover:bg-gray-50";
        tr.innerHTML = `
            <td class="p-2 border-r font-medium">${r.pt}</td>
            <td class="p-2 border-r text-right">${formatNum(r.hDist)}</td>
            <td class="p-2 border-r text-right">${formatNum(r.cDist)}</td>
            <td class="p-2 border-r text-right">${formatNum(r.vDist)}</td>
            <td class="p-2 border-r text-right text-blue-600 font-bold">${formatNum(r.elev)}</td>
            <td class="p-2 text-right">${formatNum(r.grad, 1)}</td>
        `;
        tbody.appendChild(tr);
    });
}

function drawVectorPreview() {
    const attrIds = ['attrYear', 'attrConstName', 'attrTitle', 'attrLocation', 'attrProject', 'attrOffice', 'attrDrawNo', 'attrScaleText'];
    const attrs = {
        year: document.getElementById('attrYear').value,
        constName: document.getElementById('attrConstName').value,
        title: document.getElementById('attrTitle').value,
        location: document.getElementById('attrLocation').value,
        project: document.getElementById('attrProject').value,
        office: document.getElementById('attrOffice').value,
        drawNo: document.getElementById('attrDrawNo').value,
        scaleText: document.getElementById('attrScaleText').value,
    };
    drawProfileSVG(drawingData, attrs, document.getElementById('previewSvg'));
}

function setupSvgInteractions() {
    const container = document.getElementById('svgContainer');

    // ホイールでズーム
    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        isUserZoomed = true;

        const zoomFactor = 1.1;
        const oldZoom = currentZoom;
        
        if (e.deltaY < 0) currentZoom *= zoomFactor;
        else currentZoom /= zoomFactor;

        currentZoom = Math.max(0.0001, Math.min(currentZoom, 10000));

        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        translateX = mouseX - (mouseX - translateX) * (currentZoom / oldZoom);
        translateY = mouseY - (mouseY - translateY) * (currentZoom / oldZoom);

        applySvgTransform();
    }, { passive: false });

    // タッチ＆マウス操作（パン＆ピンチズーム）
    let activePointers = new Map();
    let initialPinchDist = 0;
    let initialPinchZoom = 1;
    let initialPinchCenter = { x: 0, y: 0 };

    container.addEventListener('pointerdown', (e) => {
        activePointers.set(e.pointerId, e);
        if (activePointers.size === 2) {
            isDragging = false;
            isUserZoomed = true;
            const pts = Array.from(activePointers.values());
            initialPinchDist = Math.hypot(pts[0].clientX - pts[1].clientX, pts[0].clientY - pts[1].clientY);
            initialPinchZoom = currentZoom;
            const rect = container.getBoundingClientRect();
            initialPinchCenter = {
                x: ((pts[0].clientX + pts[1].clientX) / 2) - rect.left,
                y: ((pts[0].clientY + pts[1].clientY) / 2) - rect.top
            };
        } else if (activePointers.size === 1) {
            isDragging = true;
            startDragX = e.clientX - translateX;
            startDragY = e.clientY - translateY;
        }
    });

    window.addEventListener('pointermove', (e) => {
        if (activePointers.has(e.pointerId)) {
            activePointers.set(e.pointerId, e);
        }
        if (activePointers.size === 2) {
            e.preventDefault(); // ピンチ中のスクロール防止
            const pts = Array.from(activePointers.values());
            const newDist = Math.hypot(pts[0].clientX - pts[1].clientX, pts[0].clientY - pts[1].clientY);
            if (initialPinchDist > 0) {
                const oldZoom = currentZoom;
                currentZoom = initialPinchZoom * (newDist / initialPinchDist);
                currentZoom = Math.max(0.0001, Math.min(currentZoom, 10000));
                
                translateX = initialPinchCenter.x - (initialPinchCenter.x - translateX) * (currentZoom / oldZoom);
                translateY = initialPinchCenter.y - (initialPinchCenter.y - translateY) * (currentZoom / oldZoom);
                applySvgTransform();
            }
        } else if (isDragging && activePointers.size === 1) {
            e.preventDefault(); // ドラッグ中のスクロール防止
            translateX = e.clientX - startDragX;
            translateY = e.clientY - startDragY;
            applySvgTransform();
        }
    }, { passive: false });

    const handlePointerUp = (e) => {
        activePointers.delete(e.pointerId);
        if (activePointers.size < 2) {
            initialPinchDist = 0;
        }
        if (activePointers.size === 1) {
            const pt = Array.from(activePointers.values())[0];
            startDragX = pt.clientX - translateX;
            startDragY = pt.clientY - translateY;
            isDragging = true;
        } else if (activePointers.size === 0) {
            isDragging = false;
        }
    };

    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
    window.addEventListener('pointerleave', handlePointerUp);

    // ズームコントロールボタンの処理
    const doZoom = (factor) => {
        isUserZoomed = true;
        const oldZoom = currentZoom;
        currentZoom *= factor;
        currentZoom = Math.max(0.0001, Math.min(currentZoom, 10000));

        const cWidth = container.clientWidth;
        const cHeight = container.clientHeight;
        const centerX = cWidth / 2;
        const centerY = cHeight / 2;

        translateX = centerX - (centerX - translateX) * (currentZoom / oldZoom);
        translateY = centerY - (centerY - translateY) * (currentZoom / oldZoom);
        
        applySvgTransform();
    };

    document.getElementById('btnZoomIn').addEventListener('click', () => doZoom(1.2));
    document.getElementById('btnZoomOut').addEventListener('click', () => doZoom(1 / 1.2));
    document.getElementById('btnFit').addEventListener('click', () => {
        isUserZoomed = false;
        fitSvgToContainer();
    });
}

function fitSvgToContainer() {
    if (!drawingData) return;
    const container = document.getElementById('svgContainer');
    const cWidth = container.clientWidth;
    const cHeight = container.clientHeight;
    
    // レイアウトが完了しておらず幅が0の場合は少し待ってから再実行
    if (cWidth === 0 || cHeight === 0) {
        setTimeout(fitSvgToContainer, 100);
        return;
    }
    
    const { viewW, viewH } = drawingData;
    
    // 描画領域全体(はみ出し分含む)がすっぽり収まるようにフィットさせる
    const zoomW = cWidth / viewW;
    const zoomH = cHeight / viewH;
    currentZoom = Math.min(zoomW, zoomH) * 0.95;
    if (isNaN(currentZoom) || currentZoom <= 0 || !isFinite(currentZoom)) currentZoom = 1; 
    
    // 画面中央に配置
    translateX = (cWidth - viewW * currentZoom) / 2;
    translateY = (cHeight - viewH * currentZoom) / 2;
    
    applySvgTransform();
}

function applySvgTransform() {
    if (isNaN(translateX) || isNaN(translateY) || isNaN(currentZoom)) return;
    const wrapper = document.getElementById('svgTransformWrapper');
    if (!wrapper) return;
    const transformStr = `translate(${Number(translateX).toFixed(2)}px, ${Number(translateY).toFixed(2)}px) scale(${Number(currentZoom).toFixed(6)})`;
    wrapper.style.transform = transformStr;
}
function generateDXF() {
    if (!drawingData) { customMessage("先に計算を実行してください。"); return; }
    const attrIds = ['attrYear', 'attrConstName', 'attrTitle', 'attrLocation', 'attrProject', 'attrOffice', 'attrDrawNo', 'attrScaleText'];
    const attrs = {
        year: document.getElementById('attrYear').value,
        constName: document.getElementById('attrConstName').value,
        title: document.getElementById('attrTitle').value,
        location: document.getElementById('attrLocation').value,
        project: document.getElementById('attrProject').value,
        office: document.getElementById('attrOffice').value,
        drawNo: document.getElementById('attrDrawNo').value,
        scaleText: document.getElementById('attrScaleText').value,
    };
    const warningEl = document.getElementById('dxfWarning');
    const showWarning = (show) => {
        if (show) warningEl.classList.remove('hidden');
        else warningEl.classList.add('hidden');
    };
    generateProfileDXF(drawingData, attrs, triggerDownload, showWarning);
}

function triggerDownload(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}