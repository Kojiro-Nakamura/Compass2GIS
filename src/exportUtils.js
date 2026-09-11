import { Utils, CONSTANTS } from "./utils.js";

export const exportUtils = {
    exportGeoJSON(fileName) {
        const lat0 = parseFloat(this.els.inputLat.value), lon0 = parseFloat(this.els.inputLon.value);
        if (isNaN(lat0) || isNaN(lon0)) return this.showToast("基準点(B.P.)の緯度・経度を正しく入力してください。");
        const lonDPM = CONSTANTS.LAT_DEG_PER_METER / Math.cos(Utils.deg2rad(lat0)), features = [], customProps = {};
        this.state.attributes.forEach(a => { if (a.name) customProps[a.name] = a.value; });
        const fp = this._getFirstPointName();
        
        features.push({ type: "Feature", properties: { "測点名": fp, "緯度": parseFloat(lat0.toFixed(6)), "経度": parseFloat(lon0.toFixed(6)), ...customProps }, geometry: { type: "Point", coordinates: [lon0, lat0] } });
        this.state.nodes.forEach((node, name) => {
            if (name === fp && Math.abs(node.x) < 0.001 && Math.abs(node.y) < 0.001) return;
            features.push({ type: "Feature", properties: { "測点名": name, "緯度": parseFloat((lat0 + node.y * CONSTANTS.LAT_DEG_PER_METER).toFixed(6)), "経度": parseFloat((lon0 + node.x * lonDPM).toFixed(6)), ...customProps }, geometry: { type: "Point", coordinates: [lon0 + node.x * lonDPM, lat0 + node.y * CONSTANTS.LAT_DEG_PER_METER] } });
        });

        if (this.els.chkCompassAdjustment.checked) {
            this.state.detectedAreas.forEach(p => {
                const coords = [p.coords]; p.holes.forEach(h => coords.push(h.coords));
                features.push({ type: "Feature", properties: { name: p.originalName, "全体面積(m2)": parseFloat(p.area.toFixed(2)), "除地面積(m2)": parseFloat((p.area - p.netArea).toFixed(2)), "正味面積(m2)": parseFloat(p.netArea.toFixed(2)), "全体面積(ha)": parseFloat(Utils.round4(p.area / 10000)), "除地面積(ha)": parseFloat(Utils.round4((p.area - p.netArea) / 10000)), "正味面積(ha)": parseFloat(Utils.round4(p.netArea / 10000)), "周長(m)": parseFloat(p.perimeter.toFixed(2)), "構造": p.isDonut ? `ドーナツポリゴン（${p.holes.length}つの穴）` : "通常ポリゴン", ...customProps }, geometry: { type: "Polygon", coordinates: coords } });
            });
        }
        this.state.points.forEach(p => {
            features.push({ type: "Feature", properties: { "タイプ": p.type === 'main' ? '本線' : '支線', "作図対象": p.isDraw ? 'はい' : 'いいえ', "器械点": p.fromName, "視準点": p.toName, "方位角": parseFloat(p.input.az.toFixed(2)), "高低角": p.input.el, "斜距離": p.input.sd, "水平距離": parseFloat(p.input.hd.toFixed(2)), ...customProps }, geometry: { type: "LineString", coordinates: [[lon0 + p.fromX * lonDPM, lat0 + p.fromY * CONSTANTS.LAT_DEG_PER_METER], [lon0 + p.toX * lonDPM, lat0 + p.toY * CONSTANTS.LAT_DEG_PER_METER]] } });
        });
        if (this.state.annotations) {
            this.state.annotations.texts.forEach(t => features.push({ type: "Feature", properties: { "タイプ": "注記", "テキスト": t.text, "文字色": t.color || '#059669', "サイズ": t.fontSize || 14, "回転角度": parseFloat(((t.rotation || 0) * 180 / Math.PI).toFixed(2)), ...customProps }, geometry: { type: "Point", coordinates: [lon0 + t.x * lonDPM, lat0 + t.y * CONSTANTS.LAT_DEG_PER_METER] } }));
            this.state.annotations.lines.forEach(l => features.push({ type: "Feature", properties: { "タイプ": "連続線", "回転角度": parseFloat(((l.rotation || 0) * 180 / Math.PI).toFixed(2)), ...customProps }, geometry: { type: "LineString", coordinates: l.points.map(pt => [lon0 + pt.x * lonDPM, lat0 + pt.y * CONSTANTS.LAT_DEG_PER_METER]) } }));
        }

        if (!fileName) fileName = '令和8年度_育成複層林整備_山田太郎_No.10';
        if (!fileName.endsWith('.geojson')) fileName += '.geojson';
        this._downloadFile("data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ type: "FeatureCollection", features }, null, 2)), fileName);
    },

    showHTMLPreview(fileName, pSize = 'A4', ori = 'landscape', sOpt = 'auto', split = 50, existingWin = null) {
        const origMag = this.els.chkMagDeclination.checked; this.els.chkMagDeclination.checked = false;
        this.calculateCoordinates(); this.findClosedAreas();

        const lat = parseFloat(this.els.inputLat.value) || 0, lon = parseFloat(this.els.inputLon.value) || 0, dec = this.els.inputDeclination.value, conf = CONSTANTS.PAPER_CONFIGS[`${pSize}_${ori}`];
        const resTable = this._buildExportHTMLResultsTable(split), { expScale, expOffsetX, expOffsetY, displayScaleText } = this._calcExportScaleOptions(conf, sOpt);
        const attrTable = this._buildExportHTMLAttrTable(displayScaleText, lat, lon, dec), areaTable = this._buildExportHTMLAreaTable();
        
        const showMapBg = this.isMapMode;
        
        let currentTileUrl = 'https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png';
        if (this.map) {
            this.map.eachLayer(layer => {
                if (layer instanceof L.TileLayer) {
                    currentTileUrl = layer._url;
                }
            });
        }
        
        // SVG（背景となる線や面、ドットのみ出力する）と、ドラッグ可能なテキスト群（HTML）を生成
        const expRes = this._generateExportSVGDataURL(conf, expScale, expOffsetX, expOffsetY);
        const compSVG = this._generateCompassSVGDataURL(conf, dec);
        const labelsHTML = this._generateDraggableLabelsHTML(expScale, expOffsetX, expOffsetY, expRes.pxPerMm, expRes.x, expRes.y);
        
        // 地図ビュー用の緯度経度境界を計算
        // 地図ビュー用の緯度経度境界を計算 (printMapBg が用紙全体と同じサイズになるため)
        const ixLeft = -expOffsetX / expScale;
        const iyTop = expOffsetY / expScale;
        const ixRight = (conf.expW - expOffsetX) / expScale;
        const iyBottom = (expOffsetY - conf.expH) / expScale;

        const lonDegPerMeter = CONSTANTS.LAT_DEG_PER_METER / Math.cos(Utils.deg2rad(lat));
        const latTop = lat + iyTop * CONSTANTS.LAT_DEG_PER_METER;
        const lonLeft = lon + ixLeft * lonDegPerMeter;
        const latBottom = lat + iyBottom * CONSTANTS.LAT_DEG_PER_METER;
        const lonRight = lon + ixRight * lonDegPerMeter;
        
        let outFileName = fileName || 'compass_survey_data';
        if (!outFileName.endsWith('.html')) outFileName += '.html';

        const htmlContent = `<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><title>平面図 (${pSize} ${ori})</title>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/><script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"><\/script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/encoding-japanese/2.0.0/encoding.min.js"><\/script>
<style>
@page { size: ${pSize} ${ori}; margin: 0; }
body { font-family: sans-serif; font-size: 10pt; background: #ececec; margin:0; padding-top: 60px; }
.page-wrapper { width: 100%; display: flex; justify-content: center; }
.page-container { position: relative; width: ${conf.w}mm; height: ${conf.h}mm; background: #fff; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.2); transform-origin: top center; transition: transform 0.1s ease; margin-bottom: 20px; flex-shrink: 0; }
.draggable { position: absolute; z-index: 2; background: #fff; cursor: move; transform-origin: top left; white-space: nowrap; box-sizing: border-box; }
.draggable.no-bg { background: transparent; }
.draggable:not(.map-group):hover, .sub-draggable:hover { box-shadow: 0 0 12px rgba(46,92,138,0.4); outline: 2px dashed rgba(46,92,138,0.6); z-index: 10; }
.compass-image { position: absolute; bottom: 30mm; left: 25mm; width: 30mm; height: 30mm; z-index: 3; }
table { border-collapse: collapse; border: 1px solid #000; } th, td { border: 1px solid #000; padding: 6px; } th { background: #f2f2f2; }
.attr-table-wrapper { top: 15mm; left: 15mm; } .result-table-wrapper { top: 15mm; right: 15mm; transform-origin: top right; } .area-table-wrapper { top: 80mm; left: 15mm; }
.instruction { position: fixed; top: 0; left: 0; width: 100%; box-sizing: border-box; background: #3f3f46; color: white; padding: 10px 20px; display: flex; justify-content: space-between; align-items: center; z-index: 100; box-shadow: 0 2px 4px rgba(0,0,0,0.2); }
.btn { background: #2E5C8A; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 0.9rem; font-weight: bold; margin-left: 10px; }
.btn-save { background: #059669; }
.btn-zoom { background: #52525b; color: white; border: 1px solid #71717a; border-radius: 4px; width: 24px; height: 24px; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; padding: 0; line-height: 1; transition: all 0.2s; }
.btn-zoom:hover { background: #6366f1; border-color: #818cf8; }
.map-cropper { outline: 1px dashed transparent; pointer-events: auto; }
.map-cropper.active { outline-color: #f59e0b; }
.resize-handle { position: absolute; width: 12px; height: 12px; background: #fff; border: 1px solid #333; display: none; z-index: 10; pointer-events: auto; }
.map-group:hover .resize-handle, .map-cropper.active .resize-handle { display: block; }
.resize-handle.n { top: -6px; left: calc(50% - 6px); cursor: ns-resize; }
.resize-handle.s { bottom: -6px; left: calc(50% - 6px); cursor: ns-resize; }
.resize-handle.e { top: calc(50% - 6px); right: -6px; cursor: ew-resize; }
.resize-handle.w { top: calc(50% - 6px); left: -6px; cursor: ew-resize; }
.resize-handle.ne { top: -6px; right: -6px; cursor: nesw-resize; }
.resize-handle.nw { top: -6px; left: -6px; cursor: nwse-resize; }
.resize-handle.se { bottom: -6px; right: -6px; cursor: nwse-resize; }
.resize-handle.sw { bottom: -6px; left: -6px; cursor: nesw-resize; }
@media print { body { background: none; padding: 0; } .page-wrapper { display: block; } .page-container { box-shadow: none; page-break-after: always; transform: none !important; margin: 0; } .instruction, .draggable:hover, .sub-draggable:hover, .map-group:hover, .resize-handle { display: none !important; outline: none; box-shadow: none; } .map-cropper { outline: none !important; } }
</style></head><body>
<div class="instruction" id="toolbar">
    <div style="display: flex; align-items: center; gap: 15px;">
        <span>💡 図面全体、または表、文字要素を個別にドラッグして自由に移動・調整できます。</span>
        <div style="display: flex; align-items: center; gap: 6px; background: rgba(0,0,0,0.2); padding: 4px 10px; border-radius: 6px;">
    <span style="font-size: 0.85rem;">表示倍率:</span>
    <button class="btn-zoom" id="btnZoomOut" title="縮小">－</button>
    <span id="zoomLevel" style="font-size: 0.9rem; min-width: 45px; text-align: center; font-weight: bold;">100%</span>
    <button class="btn-zoom" id="btnZoomIn" title="拡大">＋</button>
    <button class="btn-zoom" id="btnFitScreen" title="画面に合わせる" style="width: auto; padding: 0 8px; font-size: 0.8rem; margin-left: 4px;">⛶ フィット</button>
    <label style="font-size:13px; margin-left: 10px; cursor: pointer; color: white;"><input type="checkbox" id="chkBgMap" ${showMapBg ? 'checked' : ''}> 背景地図</label>
    <select id="bgMapType" style="margin-left:5px; font-size:13px; padding: 2px;">
        <option value="https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png" ${currentTileUrl.includes('std') ? 'selected' : ''}>標準地図</option>
        <option value="https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg" ${currentTileUrl.includes('seamlessphoto') ? 'selected' : ''}>写真</option>
        <option value="https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png" ${currentTileUrl.includes('pale') ? 'selected' : ''}>淡色地図</option>
    </select>
        </div>
        
        <div style="display: flex; align-items: center; gap: 6px; background: rgba(0,0,0,0.2); padding: 4px 10px; border-radius: 6px;">
    <span style="font-size: 0.85rem;">用紙:</span>
    <select id="plPaperSize" style="font-size:12px; padding:2px;">
        <option value="A4" ${pSize==='A4'?'selected':''}>A4</option>
        <option value="A3" ${pSize==='A3'?'selected':''}>A3</option>
        <option value="A2" ${pSize==='A2'?'selected':''}>A2</option>
        <option value="A1" ${pSize==='A1'?'selected':''}>A1</option>
        <option value="A0" ${pSize==='A0'?'selected':''}>A0</option>
    </select>
    <select id="plOrientation" style="font-size:12px; padding:2px;">
        <option value="landscape" ${ori==='landscape'?'selected':''}>横</option>
        <option value="portrait" ${ori==='portrait'?'selected':''}>縦</option>
    </select>
    <span style="font-size: 0.85rem; margin-left: 6px;">縮尺:</span>
    <select id="plScale" style="font-size:12px; padding:2px;">
        <option value="auto" ${sOpt==='auto'?'selected':''}>自動縮尺</option>
        <option value="100" ${sOpt==='100'?'selected':''}>1/100</option>
        <option value="200" ${sOpt==='200'?'selected':''}>1/200</option>
        <option value="250" ${sOpt==='250'?'selected':''}>1/250</option>
        <option value="300" ${sOpt==='300'?'selected':''}>1/300</option>
        <option value="500" ${sOpt==='500'?'selected':''}>1/500</option>
        <option value="1000" ${sOpt==='1000'?'selected':''}>1/1,000</option>
        <option value="2000" ${sOpt==='2000'?'selected':''}>1/2,000</option>
        <option value="2500" ${sOpt==='2500'?'selected':''}>1/2,500</option>
        <option value="5000" ${sOpt==='5000'?'selected':''}>1/5,000</option>
    </select>
    <span style="font-size: 0.85rem; margin-left: 6px;">成果表折返:</span>
    <input type="number" id="plTableSplit" value="${split}" style="width:45px; font-size:12px; padding:2px;">
        </div>
    </div>
    <div>
        <button class="btn" onclick="window.print()">🖨️ 印刷</button>
        <button class="btn" id="btnSaveDXF" style="background: #c2410c;">💾 DXF保存</button>
        <button class="btn btn-save" id="btnSaveHTML">💾 HTML保存</button>
        <button class="btn" onclick="window.close()" style="background: #dc2626;">✖ 閉じる</button>
    </div>
</div>
<div class="page-wrapper">
    <div class="page-container">
        <div class="map-group draggable no-bg no-scale" style="position: absolute; left: ${expRes.x / expRes.pxPerMm}mm; top: ${expRes.y / expRes.pxPerMm}mm; width: ${expRes.w / expRes.pxPerMm}mm; height: ${expRes.h / expRes.pxPerMm}mm; z-index: 1;">
    <div id="map-cropper" class="map-cropper" style="position:absolute; z-index:0; top: ${-(expRes.y / expRes.pxPerMm) + 10}mm; left: ${-(expRes.x / expRes.pxPerMm) + 10}mm; width: ${conf.w - 20}mm; height: ${conf.h - 20}mm; overflow:hidden;">
        <div id="printMapBg" style="position:absolute; top: -10mm; left: -10mm; width: ${conf.w}mm; height: ${conf.h}mm; z-index: 0; opacity: 0.7; pointer-events: none;"></div>
        <div class="resize-handle n" data-dir="n"></div><div class="resize-handle s" data-dir="s"></div><div class="resize-handle w" data-dir="w"></div><div class="resize-handle e" data-dir="e"></div>
        <div class="resize-handle nw" data-dir="nw"></div><div class="resize-handle ne" data-dir="ne"></div><div class="resize-handle sw" data-dir="sw"></div><div class="resize-handle se" data-dir="se"></div>
    </div>
    <div style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; z-index: 1;">
        ${expRes.svgString}
    </div>
    ${labelsHTML}
        </div>
        <div class="compass-image draggable no-scale no-bg">
            ${compSVG.svgString}
        </div>
        <div class="attr-table-wrapper draggable"><table>${attrTable}</table></div>${resTable}${areaTable}
        ${this.els.closureInfo.innerText ? `<div class="closure-info draggable" style="bottom:15mm; left:15mm; padding:5px; font-size:9pt;">閉合状況: ${this.els.closureInfo.innerText}</div>` : ''}
    </div>
</div>
<script>
window.onerror = function(m, u, l) { alert('Error: ' + m + '\\nLine: ' + l); };
setTimeout(() => { try {
    document.querySelectorAll('.result-table-wrapper, .area-table-wrapper, .attr-table-wrapper').forEach(w => {
        const p = w.parentElement, s = Math.min((p.clientHeight*0.85)/w.offsetHeight, (p.clientWidth*0.85)/w.offsetWidth);
        if (s < 1) { w.style.transform = \`scale(\${s})\`; w.dataset.scale = s; }
    });
    
    let active = null, sX, sY, iL, iT;
    document.querySelectorAll('.draggable, .sub-draggable').forEach(el => {
        if (!el.classList.contains('no-bg') && !el.classList.contains('sub-draggable') && !el.innerHTML.includes('<br>')) {
    el.style.width = el.offsetWidth + 'px'; el.style.height = el.offsetHeight + 'px';
        }
        const r = el.getBoundingClientRect(), p = el.parentElement.getBoundingClientRect();
        
        if (!el.style.left) {
    el.dataset.initLeft = el.offsetLeft + 'px';
    el.dataset.initTop = el.offsetTop + 'px';
    el.style.left = el.dataset.initLeft; 
    el.style.top = el.dataset.initTop;
    el.style.right = 'auto'; el.style.bottom = 'auto';
        }
        
        el.onmousedown = (e) => { 
    e.stopPropagation(); 
    active = el; 
    sX = e.clientX; 
    sY = e.clientY; 
    iL = parseFloat(el.style.left)||0; 
    iT = parseFloat(el.style.top)||0;
    active.isMm = el.style.left.includes('mm');
    e.preventDefault(); 
        };
        
        el.onwheel = (e) => { 
    if(el.classList.contains('no-scale') || e.ctrlKey) return; 
    e.preventDefault(); 
    
    const oldScale = parseFloat(el.dataset.scale||1);
    let newScale = oldScale + (e.deltaY<0?0.05:-0.05); 
    newScale = Math.max(0.2, Math.min(newScale,3)); 
    if (oldScale === newScale) return;
    
    const r1 = el.getBoundingClientRect();
    const relX = e.clientX - r1.left;
    const relY = e.clientY - r1.top;
    
    el.dataset.scale = newScale; 
    
    let baseTransform = '';
    if (el.style.transform && (el.style.transform.includes('rotate') || el.style.transform.includes('translate'))) {
        baseTransform = el.style.transform.replace(/scale\\([^)]+\\)/g, '').trim();
    }
    el.style.transform = baseTransform + (baseTransform ? ' ' : '') + \`scale(\${newScale})\`; 
    
    const r2 = el.getBoundingClientRect();
    const targetClientX = r2.left + relX * (newScale / oldScale);
    const targetClientY = r2.top + relY * (newScale / oldScale);
    
    const diffX = targetClientX - e.clientX;
    const diffY = targetClientY - e.clientY;
    
    const isMm = el.style.left.includes('mm');
    const pxToMm = 0.264583;
    const adjX = -diffX / window.pageScale;
    const adjY = -diffY / window.pageScale;
    
    if (isMm) {
        const curL = parseFloat(el.style.left) || 0;
        const curT = parseFloat(el.style.top) || 0;
        el.style.left = (curL + adjX * pxToMm) + 'mm';
        el.style.top = (curT + adjY * pxToMm) + 'mm';
    } else {
        const curL = parseFloat(el.style.left) || 0;
        const curT = parseFloat(el.style.top) || 0;
        el.style.left = (curL + adjX) + 'px';
        el.style.top = (curT + adjY) + 'px';
    }
        };
    });
    
    const pxToMm = 0.264583;

    document.onmousemove = e => { 
        if (active) { 
    let dx = (e.clientX - sX) / window.pageScale;
    let dy = (e.clientY - sY) / window.pageScale;
    
    if (active.isMm) {
        active.style.left = (iL + dx * pxToMm) + 'mm'; 
        active.style.top = (iT + dy * pxToMm) + 'mm'; 
    } else {
        active.style.left = (iL + dx) + 'px'; 
        active.style.top = (iT + dy) + 'px'; 
    }
        }
    };
    document.onmouseup = () => active = null;
    
    // --- 用紙ズーム・自動フィット機能 ---
    window.pageScale = 1.0;
    let isAutoFit = true;
    const pageContainer = document.querySelector('.page-container');
    const zoomLevelText = document.getElementById('zoomLevel');

    function fitToScreen() {
        const paddingX = 40;
        const paddingY = 90; 
        const scaleX = (window.innerWidth - paddingX) / pageContainer.offsetWidth;
        const scaleY = (window.innerHeight - paddingY) / pageContainer.offsetHeight;
        window.pageScale = Math.min(scaleX, scaleY);
        updatePageScale(true);
    }

    function updatePageScale(auto = false) {
        isAutoFit = auto;
        pageContainer.style.transform = \`scale(\${window.pageScale})\`;
        zoomLevelText.textContent = Math.round(window.pageScale * 100) + '%';
        pageContainer.style.marginBottom = (pageContainer.offsetHeight * (window.pageScale - 1)) + 40 + 'px';
        
        const btnFit = document.getElementById('btnFitScreen');
        if (auto) {
    btnFit.style.background = '#6366f1';
    btnFit.style.borderColor = '#818cf8';
        } else {
    btnFit.style.background = '#52525b';
    btnFit.style.borderColor = '#71717a';
        }
    }

    function zoomPage(direction) {
        const oldScale = window.pageScale;
        let newScale = oldScale + (direction * 0.1);
        newScale = Math.max(0.2, Math.min(newScale, 5.0));
        if (oldScale === newScale) return;
        
        const rect = pageContainer.getBoundingClientRect();
        const relX = (window.innerWidth / 2) - rect.left;
        const relY = (window.innerHeight / 2) - rect.top;
        const ratio = newScale / oldScale;
        
        window.pageScale = newScale;
        updatePageScale(false);
        
        const newRect = pageContainer.getBoundingClientRect();
        const shiftX = newRect.left - rect.left;
        const shiftY = newRect.top - rect.top;
        const diffX = relX * ratio - relX;
        const diffY = relY * ratio - relY;
        
        window.scrollBy(diffX + shiftX, diffY + shiftY);
    }

    document.getElementById('btnZoomIn').addEventListener('click', () => zoomPage(1));
    document.getElementById('btnZoomOut').addEventListener('click', () => zoomPage(-1));

    document.getElementById('btnFitScreen').addEventListener('click', fitToScreen);

    window.addEventListener('resize', () => {
        if (isAutoFit) fitToScreen();
    });

    document.addEventListener('wheel', (e) => {
        if (e.target.closest('.draggable') && !e.ctrlKey) return;

        e.preventDefault();
        const oldScale = window.pageScale;
        let newScale = oldScale + (e.deltaY < 0 ? 0.05 : -0.05);
        newScale = Math.max(0.2, Math.min(newScale, 5.0));
        if (oldScale === newScale) return;
        
        const rect = pageContainer.getBoundingClientRect();
        const relX = e.clientX - rect.left;
        const relY = e.clientY - rect.top;
        const ratio = newScale / oldScale;
        
        window.pageScale = newScale;
        updatePageScale(false);
        
        const newRect = pageContainer.getBoundingClientRect();
        const shiftX = newRect.left - rect.left;
        const shiftY = newRect.top - rect.top;
        const diffX = relX * ratio - relX;
        const diffY = relY * ratio - relY;
        
        window.scrollBy(diffX + shiftX, diffY + shiftY);
    }, { passive: false });

    fitToScreen();

    // --- HTML保存機能 ---
    document.getElementById('btnSaveHTML').addEventListener('click', () => {
        const currentScale = window.pageScale;
        const currentAutoFit = isAutoFit;
        
        window.pageScale = 1.0;
        updatePageScale(false); 
        
        const html = '<!DOCTYPE html>\\n' + document.documentElement.outerHTML;
        
        window.pageScale = currentScale;
        updatePageScale(currentAutoFit); 
        
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = '${outFileName}';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    let isResizing = false;
    let startX, startY, initL, initT, initW, initH, initInnerT, initInnerL, dir;
    const cropper = document.getElementById('map-cropper');
    const mapBgDiv = document.getElementById('printMapBg');
    
    cropper.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('resize-handle')) {
    isResizing = true;
    dir = e.target.getAttribute('data-dir');
    e.stopPropagation(); e.preventDefault();
    startX = e.clientX; startY = e.clientY;
    const cs = window.getComputedStyle(cropper);
    initL = parseFloat(cs.left); initT = parseFloat(cs.top);
    initW = parseFloat(cs.width); initH = parseFloat(cs.height);
    const is = window.getComputedStyle(mapBgDiv);
    initInnerL = parseFloat(is.left); initInnerT = parseFloat(is.top);
    cropper.classList.add('active');
        }
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isResizing) return;
        const s = window.pageScale || 1;
        const dx = (e.clientX - startX) / s;
        const dy = (e.clientY - startY) / s;
        
        if (dir.includes('n')) { cropper.style.top = (initT + dy) + 'px'; cropper.style.height = (initH - dy) + 'px'; mapBgDiv.style.top = (initInnerT - dy) + 'px'; }
        if (dir.includes('s')) { cropper.style.height = (initH + dy) + 'px'; }
        if (dir.includes('w')) { cropper.style.left = (initL + dx) + 'px'; cropper.style.width = (initW - dx) + 'px'; mapBgDiv.style.left = (initInnerL - dx) + 'px'; }
        if (dir.includes('e')) { cropper.style.width = (initW + dx) + 'px'; }
    });
    
    document.addEventListener('mouseup', () => {
        if (isResizing) {
    isResizing = false;
    cropper.classList.remove('active');
    if (mapBg) mapBg.invalidateSize();
        }
    });

    let mapBg = null;
    function updateMapBg() {
        const isChecked = document.getElementById('chkBgMap').checked;
        const tileUrl = document.getElementById('bgMapType').value;
        const cropperDiv = document.getElementById('map-cropper');
        
        if (isChecked) {
    cropperDiv.style.display = 'block';
    if (!mapBg) {
        mapBg = L.map('printMapBg', {
            zoomControl: false, attributionControl: false, dragging: false, scrollWheelZoom: false,
            doubleClickZoom: false, boxZoom: false, keyboard: false, zoomSnap: 0
        });
    } else {
        mapBg.eachLayer(layer => {
            if (layer instanceof L.TileLayer) {
                mapBg.removeLayer(layer);
            }
        });
    }
    mapBg.invalidateSize();
    L.tileLayer(tileUrl, { maxNativeZoom: 18, maxZoom: 24 }).addTo(mapBg);
    const bounds = L.latLngBounds([${latBottom}, ${lonLeft}], [${latTop}, ${lonRight}]);
    mapBg.fitBounds(bounds);
        } else {
    if (mapBg) {
        mapBg.remove();
        mapBg = null;
    }
    cropperDiv.style.display = 'none';
        }
    }
    
    document.getElementById('chkBgMap').addEventListener('change', updateMapBg);
    document.getElementById('bgMapType').addEventListener('change', updateMapBg);
    
    if (document.getElementById('chkBgMap').checked) {
        setTimeout(updateMapBg, 100);
    } else {
        document.getElementById('map-cropper').style.display = 'none';
    }

    // --- Preview Settings Update ---
    function applyPreviewSettings() {
        if (window.opener && window.opener.app && typeof window.opener.app.showHTMLPreview === 'function') {
    const newPSize = document.getElementById('plPaperSize').value;
    const newOri = document.getElementById('plOrientation').value;
    const newSOpt = document.getElementById('plScale').value;
    const newSplit = parseInt(document.getElementById('plTableSplit').value, 10) || 50;
    window.opener.app.showHTMLPreview(${JSON.stringify(fileName)}, newPSize, newOri, newSOpt, newSplit, window);
        } else {
    alert('元の画面が閉じられているか、アクセスできないため設定を反映できません。');
        }
    }
    
    document.getElementById('plPaperSize').addEventListener('change', applyPreviewSettings);
    document.getElementById('plOrientation').addEventListener('change', applyPreviewSettings);
    document.getElementById('plScale').addEventListener('change', applyPreviewSettings);
    document.getElementById('plTableSplit').addEventListener('change', applyPreviewSettings);



    class SimpleDxfWriter {
        constructor(w = 297, h = 210) {
    this.header = ['0', 'SECTION', '2', 'HEADER', '9', '$ACADVER', '1', 'AC1009', '9', '$DWGCODEPAGE', '3', 'ANSI_932', '9', '$LIMMIN', '10', '0.0', '20', '0.0', '9', '$LIMMAX', '10', w.toFixed(2), '20', h.toFixed(2), '9', '$EXTMIN', '10', '0.0', '20', '0.0', '9', '$EXTMAX', '10', w.toFixed(2), '20', h.toFixed(2), '0', 'ENDSEC'];
    this.blocks = ['0', 'SECTION', '2', 'BLOCKS'];
    this.entities = ['0', 'SECTION', '2', 'ENTITIES'];
    this.currentSection = this.entities;
    this.blockCounter = 1;
    this.inBlock = false;
        }
        startGroup() {
    const blockName = 'GROUP_' + this.blockCounter++;
    this.blocks.push('0', 'BLOCK', '8', '0', '2', blockName, '70', '0', '10', '0.0', '20', '0.0', '3', blockName);
    this.currentSection = this.blocks;
    this.currentBlockName = blockName;
    this.inBlock = true;
        }
        endGroup() {
    if (!this.inBlock) return;
    this.blocks.push('0', 'ENDBLK', '8', '0');
    this.entities.push('0', 'INSERT', '8', '0', '2', this.currentBlockName, '10', '0.0', '20', '0.0');
    this.currentSection = this.entities;
    this.inBlock = false;
        }
        addLine(x1, y1, x2, y2, color=256) {
    this.currentSection.push('0', 'LINE', '8', '0', '62', color, '10', x1.toFixed(3), '20', y1.toFixed(3), '11', x2.toFixed(3), '21', y2.toFixed(3));
        }
        addPolyline(pts, closed, color=256) {
    if (pts.length < 2) return;
    for (let i=0; i<pts.length - 1; i++) {
        this.addLine(pts[i].x, pts[i].y, pts[i+1].x, pts[i+1].y, color);
    }
    if (closed && pts.length > 2) {
        this.addLine(pts[pts.length-1].x, pts[pts.length-1].y, pts[0].x, pts[0].y, color);
    }
        }
        addText(text, x, y, height, color=256, align='L', angle=0) {
    this.currentSection.push('0', 'TEXT', '8', '0', '62', color, '10', x.toFixed(3), '20', y.toFixed(3), '40', height.toFixed(3), '50', angle.toFixed(3), '1', text);
    if (align === 'C') {
        this.currentSection.push('72', '1', '11', x.toFixed(3), '21', y.toFixed(3));
    } else if (align === 'R') {
        this.currentSection.push('72', '2', '11', x.toFixed(3), '21', y.toFixed(3));
    }
        }
        addCircle(x, y, radius, color=256) {
    this.currentSection.push('0', 'CIRCLE', '8', '0', '62', color, '10', x.toFixed(3), '20', y.toFixed(3), '40', radius.toFixed(3));
        }
        toString() { 
    this.blocks.push('0', 'ENDSEC');
    this.entities.push('0', 'ENDSEC');
    return [...this.header, ...this.blocks, ...this.entities, '0', 'EOF'].join(String.fromCharCode(13, 10)); 
        }
    }

    document.getElementById('btnSaveDXF').addEventListener('click', () => {
        const paperRect = document.querySelector('.page-container').getBoundingClientRect();
        const unscale = (val) => val / (window.pageScale || 1);
        const paperH_px = unscale(paperRect.height);
        const pxToMm = 1 / 3.7795;
        const paperW_mm = unscale(paperRect.width) * pxToMm;
        const paperH_mm = paperH_px * pxToMm;
        const dxf = new SimpleDxfWriter(paperW_mm, paperH_mm);
        
        const toDxfX = (px) => px * pxToMm;
        const toDxfY = (py) => (paperH_px - py) * pxToMm;
        dxf.addLine(0, 0, paperW_mm, 0, 7);
        dxf.addLine(paperW_mm, 0, paperW_mm, paperH_mm, 7);
        dxf.addLine(paperW_mm, paperH_mm, 0, paperH_mm, 7);
        dxf.addLine(0, paperH_mm, 0, 0, 7);

        const drawTextEl = (el, draggable) => {
    if (!el) return;
    const textContent = (el.innerHTML || el.textContent || '').trim();
    if (textContent === '') return;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    
    const style = window.getComputedStyle(el);
    let text = textContent.replace(/<br\\s*\\/?>/gi, String.fromCharCode(10)).replace(/<[^>]+>/g, "");
    text = text.replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
    const scale = draggable ? parseFloat(draggable.getAttribute('data-scale')) || 1 : 1;
    const fontSizePx = parseFloat(style.fontSize) || 12;
    const hMm = (fontSizePx * scale) * pxToMm;
    
    const align = style.textAlign;
    let px = unscale(rect.left - paperRect.left) + 2; 
    let alignCode = 'L';
    if (align === 'center') {
        px = unscale(rect.left + rect.width / 2 - paperRect.left);
        alignCode = 'C';
    } else if (align === 'right') {
        px = unscale(rect.right - paperRect.left) - 2;
        alignCode = 'R';
    }
    
    let rot = 0;
    if (el.style.transform && el.style.transform.includes('rotate')) {
        const m = el.style.transform.match(/rotate\\(([-.\\d]+)/);
        if (m) rot = parseFloat(m[1]) || 0;
    }
    
    const lines = text.split(String.fromCharCode(10));
    const lineHeightPx = fontSizePx * scale * 1.4; // 1.4 spacing for better readability
    const totalTextHeight = lines.length * lineHeightPx;
    const startY = unscale(rect.top - paperRect.top) + (unscale(rect.height) - totalTextHeight) / 2;
    
    lines.forEach((line, idx) => {
        let yOffset = startY + (idx * lineHeightPx) + (fontSizePx * scale * 0.9);
        dxf.addText(line.trim(), toDxfX(px), toDxfY(yOffset), hMm, 7, alignCode, rot);
    });
        };

        const svgs = document.querySelectorAll('svg');
        svgs.forEach(svg => {
    const svgRect = svg.getBoundingClientRect();
    const svgLeft = unscale(svgRect.left - paperRect.left);
    const svgTop = unscale(svgRect.top - paperRect.top);
    const vBox = svg.viewBox.baseVal;
    if(!vBox) return;
    const scaleX = unscale(svgRect.width) / (vBox.width || 1);
    const scaleY = unscale(svgRect.height) / (vBox.height || 1);
    
    const tx = (x) => toDxfX(svgLeft + (x - vBox.x) * scaleX);
    const ty = (y) => toDxfY(svgTop + (y - vBox.y) * scaleY);
    
    svg.querySelectorAll('line').forEach(line => {
        const x1 = parseFloat(line.getAttribute('x1')||0), y1 = parseFloat(line.getAttribute('y1')||0);
        const x2 = parseFloat(line.getAttribute('x2')||0), y2 = parseFloat(line.getAttribute('y2')||0);
        dxf.addLine(tx(x1), ty(y1), tx(x2), ty(y2), 7);
    });
    svg.querySelectorAll('circle').forEach(c => {
        const cx = parseFloat(c.getAttribute('cx')||0), cy = parseFloat(c.getAttribute('cy')||0), r = parseFloat(c.getAttribute('r')||0);
        dxf.addCircle(tx(cx), ty(cy), r * scaleX * pxToMm, 7);
    });
    svg.querySelectorAll('polygon').forEach(poly => {
        const pts = poly.getAttribute('points').trim().split(/\\s+/).map(p => {
            const [x,y] = p.split(',').map(Number);
            return {x: tx(x), y: ty(y)};
        });
        dxf.addPolyline(pts, true, 7);
    });
    svg.querySelectorAll('path').forEach(path => {
        const d = path.getAttribute('d');
        if(!d) return;
        const cmds = d.match(/[A-Za-z][^A-Za-z]*/g);
        if(!cmds) return;
        let curX = 0, curY = 0;
        let startX = 0, startY = 0;
        cmds.forEach(cmd => {
            const type = cmd[0];
            const args = cmd.slice(1).trim().split(/[\\s,]+/).map(Number);
            if(type === 'M' || type === 'm') {
                if(type==='M') { curX = args[0]; curY = args[1]; }
                else { curX += args[0]; curY += args[1]; }
                startX = curX; startY = curY;
            } else if(type === 'L' || type === 'l') {
                let nx, ny;
                if(type==='L') { nx = args[0]; ny = args[1]; }
                else { nx = curX + args[0]; ny = curY + args[1]; }
                dxf.addLine(tx(curX), ty(curY), tx(nx), ty(ny), 7);
                curX = nx; curY = ny;
            } else if(type === 'Z' || type === 'z') {
                dxf.addLine(tx(curX), ty(curY), tx(startX), ty(startY), 7);
                curX = startX; curY = startY;
            }
        });
    });
    svg.querySelectorAll('text').forEach(t => {
        const x = parseFloat(t.getAttribute('x')||0), y = parseFloat(t.getAttribute('y')||0);
        const fs = parseFloat(t.getAttribute('font-size')||12);
        dxf.addText(t.textContent, tx(x), ty(y), (fs * scaleY) * pxToMm, 7, 'C');
    });
        });

        const draggables = document.querySelectorAll('.draggable');
        draggables.forEach(draggable => {
    dxf.startGroup();
    
    draggable.querySelectorAll('table').forEach(table => {
        const tableRect = table.getBoundingClientRect();
        const x1 = toDxfX(unscale(tableRect.left - paperRect.left));
        const y1 = toDxfY(unscale(tableRect.top - paperRect.top));
        const x2 = toDxfX(unscale(tableRect.right - paperRect.left));
        const y2 = toDxfY(unscale(tableRect.bottom - paperRect.top));
        dxf.addLine(x1, y1, x2, y1, 7);
        dxf.addLine(x2, y1, x2, y2, 7);
        dxf.addLine(x2, y2, x1, y2, 7);
        dxf.addLine(x1, y2, x1, y1, 7);

        const cells = table.querySelectorAll('th, td');
        cells.forEach(cell => {
            const r = cell.getBoundingClientRect();
            const cx1 = toDxfX(unscale(r.left - paperRect.left));
            const cy1 = toDxfY(unscale(r.top - paperRect.top));
            const cx2 = toDxfX(unscale(r.right - paperRect.left));
            const cy2 = toDxfY(unscale(r.bottom - paperRect.top));
            dxf.addLine(cx1, cy2, cx2, cy2, 7);
            dxf.addLine(cx2, cy1, cx2, cy2, 7);
        });
    });

    const textElements = Array.from(draggable.querySelectorAll('table td, table th, .sub-draggable'));
    // 成果表・面積表のタイトル行
    const titleDiv = draggable.querySelector('div:first-child');
    if (titleDiv && titleDiv.textContent.includes('表') && !titleDiv.querySelector('table')) {
        textElements.push(titleDiv);
    }
    if (draggable.classList.contains('closure-info')) {
        textElements.push(draggable);
    }
    textElements.forEach(el => drawTextEl(el, draggable));
    
    dxf.endGroup();
        });

        const dxfStr = dxf.toString();
        let blob;
        if (window.Encoding) {
    const sjisArray = Encoding.convert(Encoding.stringToCode(dxfStr), { to: 'SJIS', from: 'UNICODE' });
    blob = new Blob([new Uint8Array(sjisArray)], { type: 'application/dxf' });
        } else {
    blob = new Blob([dxfStr], { type: 'application/dxf;charset=utf-8;' });
        }
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = '${outFileName}'.replace('.html', '.dxf');
        a.click();
        URL.revokeObjectURL(url);
    });
    } catch(e) { alert('Try Error: ' + e.message); }
}, 100);
<\/script></body></html>`;

        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        if (existingWin) {
            existingWin.location.replace(url);
        } else {
            window.open(url, '_blank');
        }

        this.els.chkMagDeclination.checked = origMag; this.updateDrawing(false);
    },

    _buildExportHTMLResultsTable(splitRows) {
        const data = this.state.tableData.filter(r => r[0] && r[1]); let html = '', curHtml = '', tSD = 0, tHD = 0;
        data.forEach((r, i) => {
            const pt = this.state.points.find(p => p.fromName === r[0] && p.toName === r[1]);
            const hd = pt ? pt.input.hd : 0; tHD += hd; tSD += parseFloat(r[4]||0);
            curHtml += `<tr><td style="text-align:center;">${r[0]} - ${r[1]}</td><td style="text-align:right;">${r[2]}</td><td style="text-align:right;">${r[3]}</td><td style="text-align:right;">${(parseFloat(r[4]||0)).toFixed(2)}</td><td style="text-align:right;">${hd ? hd.toFixed(2) : ''}</td></tr>`;
            if ((splitRows > 0 && (i + 1) % splitRows === 0) || i === data.length - 1) {
                if (i === data.length - 1) curHtml += `<tr style="border-top:2px solid #000;"><td colspan="3" style="text-align:center;">合 計</td><td style="text-align:right;">${tSD.toFixed(2)}</td><td style="text-align:right;">${tHD.toFixed(2)}</td></tr>`;
                html += `<table style="width:85mm; font-size:8pt; border-collapse:collapse; margin-left:10px;"><thead><tr><th>測 点</th><th>方位角</th><th>高低角</th><th>斜距離</th><th>水平距離</th></tr></thead><tbody>${curHtml}</tbody></table>`; curHtml = '';
            }
        });
        return `<div class="result-table-wrapper draggable"><div style="font-weight:bold;text-align:center;border-bottom:1px solid #000;margin-bottom:5px;">成 果 表</div><div style="display:flex; justify-content:flex-end;">${html}</div></div>`;
    },

    _buildExportHTMLAttrTable(scTxt, lat, lon, dec) {
        let html = this.state.attributes.map(a => `<tr><th style="text-align:left;white-space:nowrap;">${a.name}</th><td>${a.value||''}</td></tr>`).join('');
        return html + `<tr><th style="text-align:left;">縮尺</th><td style="font-weight:bold;">${scTxt}</td></tr><tr><th style="text-align:left;">基準点</th><td style="font-size:8pt;">Lat ${lat}<br>Lon ${lon}<br>(偏角: ${dec}度)</td></tr>`;
    },

    _buildExportHTMLAreaTable() {
        if (this.state.detectedAreas.length === 0) return '';
        let tArea = 0, html = '';
        this.state.detectedAreas.forEach((a, i) => {
            const netHa = Utils.round4(a.netArea / 10000);
            tArea += parseFloat(netHa);
            if (a.isDonut) {
                const totalHa = Utils.round4(a.area / 10000);
                html += `<tr><td style="border-bottom-style: dashed; border-bottom-color: #999;">区画 ${i + 1} (全体)</td><td style="text-align:right; border-bottom-style: dashed; border-bottom-color: #999;">${totalHa} ha</td></tr>`;
                a.holes.forEach(h => {
                    const hHa = Utils.round4(h.area / 10000);
                    html += `<tr><td style="border-bottom-style: dashed; border-bottom-color: #999; color: #A13D44; padding-left: 12px;">－ 除地 ${h.globalIndex || ''}</td><td style="text-align:right; border-bottom-style: dashed; border-bottom-color: #999; color: #A13D44;">${hHa} ha</td></tr>`;
                });
                html += `<tr><td>区画 ${i + 1} 小計</td><td style="text-align:right; font-weight: bold;">${netHa} ha</td></tr>`;
            } else {
                html += `<tr><td>区画 ${i + 1}</td><td style="text-align:right;">${netHa} ha</td></tr>`;
            }
        });
        return `<div class="area-table-wrapper draggable"><div style="font-weight:bold;text-align:center;border-bottom:1px solid #000;margin-bottom:5px;">面 積 表</div><table style="width:100%;font-size:9pt;">${html}<tr style="border-top:2px solid #000;font-weight:bold;"><td>合 計</td><td style="text-align:right;">${Utils.round4(tArea)} ha</td></tr></table></div>`;
    },

    _calcExportScaleOptions(conf, scaleOption) {
        let expScale = 1, cx = 0, cy = 0, displayScaleText = '';
        if (this.state.nodes.size >= 2) {
            const dW = this.state.bounds.maxX - this.state.bounds.minX, dH = this.state.bounds.maxY - this.state.bounds.minY;
            cx = (this.state.bounds.minX + this.state.bounds.maxX) / 2; cy = (this.state.bounds.minY + this.state.bounds.maxY) / 2;
            if (scaleOption === 'auto') {
                const fit = Math.max(0.1, Math.min(Math.max(10, conf.expW - conf.paddingX * 2) / (dW || 1), Math.max(10, conf.expH - conf.paddingY * 2) / (dH || 1)));
                const exact = (1000 / fit) * (conf.expW / conf.w);
                let mag = 100, sc = 100;
                while(sc < exact) { for(let b of [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8]) { sc = b * mag; if(sc >= exact) break; } if(sc < exact) mag *= 10; }
                expScale = (1000 / sc) * (conf.expW / conf.w); displayScaleText = `1 / ${sc.toLocaleString()}`;
            } else {
                const s = parseFloat(scaleOption); if (!isNaN(s) && s > 0) { expScale = (1000 / s) * (conf.expW / conf.w); displayScaleText = `1 / ${s.toLocaleString()}`; }
            }
        }
        return { expScale, expOffsetX: conf.expW / 2 - cx * expScale, expOffsetY: conf.expH / 2 + cy * expScale + (scaleOption === 'auto' ? conf.shiftY : 0), displayScaleText };
    },

    _generateExportSVGDataURL(conf, scale, ox, oy) {
        const uiSc = Math.min(conf.expW, conf.expH) / 800; let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        const uB = (x, y) => { if(x<minX)minX=x; if(x>maxX)maxX=x; if(y<minY)minY=y; if(y>maxY)maxY=y; };

        let svg = this.state.detectedAreas.map(a => {
            let d = ''; a.path.forEach((n, i) => { const nd = this.state.nodes.get(n), x = ox+nd.x*scale, y = oy-nd.y*scale; uB(x,y); d += (i===0?'M':'L') + `${x} ${y} `; }); d += 'Z ';
            if (a.isDonut) a.holes.forEach(h => { h.path.forEach((n, i) => { const nd = this.state.nodes.get(n), x = ox+nd.x*scale, y = oy-nd.y*scale; uB(x,y); d += (i===0?'M':'L') + `${x} ${y} `; }); d += 'Z '; });
            return `<path d="${d}" fill="${this.CONFIG.colors.areaFill}" fill-rule="evenodd" />`;
        }).join('');

        this.state.points.forEach(p => { const x1=ox+p.fromX*scale, y1=oy-p.fromY*scale, x2=ox+p.toX*scale, y2=oy-p.toY*scale; uB(x1,y1); uB(x2,y2); if(p.isDraw) svg+=`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#ffffff" stroke-width="${(p.type==='branch'?3.5:4)*uiSc}" stroke-linecap="round" />`; });
        this.state.points.forEach(p => { const x1=ox+p.fromX*scale, y1=oy-p.fromY*scale, x2=ox+p.toX*scale, y2=oy-p.toY*scale; svg+=`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${!p.isDraw?'#9ca3af':(p.type==='branch'?this.CONFIG.colors.lineBranch:this.CONFIG.colors.lineMain)}" stroke-width="${(!p.isDraw?1.5:(p.type==='branch'?1.5:2))*uiSc}" ${!p.isDraw?`stroke-dasharray="${4*uiSc} ${4*uiSc}"`:''} stroke-linecap="round" />`; });

        const drawNd = (x, y, s) => { uB(x,y); svg+=`<circle cx="${x}" cy="${y}" r="${4*uiSc}" fill="${s?this.CONFIG.colors.startNode:this.CONFIG.colors.normalNode}" stroke="#ffffff" stroke-width="${1.5*uiSc}" />`; };
        const fp = this._getFirstPointName(); drawNd(ox, oy, true);
        this.state.nodes.forEach((nd, nm) => { if(nm===fp && Math.abs(nd.x)<0.001 && Math.abs(nd.y)<0.001) return; drawNd(ox+nd.x*scale, oy-nd.y*scale, false); });

        (this.state.annotations?.lines||[]).forEach(l => {
            let d = ''; let mx=Infinity, mxx=-Infinity, my=Infinity, myy=-Infinity;
            l.points.forEach((pt, i) => { const x=ox+pt.x*scale, y=oy-pt.y*scale; uB(x,y); if(x<mx)mx=x; if(x>mxx)mxx=x; if(y<my)my=y; if(y>myy)myy=y; d += (i===0?'M':'L') + `${x} ${y} `; });
            let dash = ''; if(l.lineStyle==='dashed') dash=`stroke-dasharray="${8*uiSc},${6*uiSc}"`; else if(l.lineStyle==='dotted') dash=`stroke-dasharray="${2*uiSc},${4*uiSc}"`;
            svg += `<path d="${d}" fill="none" stroke="${l.color||'#059669'}" stroke-width="${(l.lineWidth||2)*uiSc}" stroke-linecap="round" ${dash} transform="rotate(${-(l.rotation||0)*180/Math.PI} ${(mx+mxx)/2} ${(my+myy)/2})" />`;
        });

        if (minX === Infinity) { minX = 0; minY = 0; maxX = conf.expW; maxY = conf.expH; }
        const mg = 20, tx = Math.max(0, minX-mg), ty = Math.max(0, minY-mg), tw = maxX-minX+mg*2, th = maxY-minY+mg*2;
        const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${tx} ${ty} ${tw} ${th}" width="100%" height="100%">${svg}</svg>`;
        return { dataURL: 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString))), svgString, x: tx, y: ty, w: tw, h: th, pxPerMm: conf.expW / conf.w };
    },

    _generateDraggableLabelsHTML(scale, ox, oy, pxPerMm, tx, ty) {
        let html = '';
        
        // 親コンテナ（map-group）の起点オフセット(mm)
        const offsetMmX = tx / pxPerMm;
        const offsetMmY = ty / pxPerMm;
        
        // 1. 測点名
        const fp = this._getFirstPointName();
        let nIdx = 1, intv = parseInt(this.els.selNodeLabelInterval.value, 10);
        const addNodeLabel = (x, y, name, show) => {
            if(!show) return;
            const lX = ((x + 8) / pxPerMm) - offsetMmX;
            const lY = ((y - 8) / pxPerMm) - offsetMmY;
            html += `<div class="sub-draggable no-bg" style="position: absolute; left:${lX}mm; top:${lY}mm; transform:translate(0,-100%); font-family:sans-serif; font-size:12px; font-weight:bold; color:${this.CONFIG.colors.text}; z-index: 2; cursor: move; white-space: nowrap;">${name}</div>`;
        };
        addNodeLabel(ox, oy, fp, true);
        this.state.nodes.forEach((nd, nm) => { 
            if(nm===fp && Math.abs(nd.x)<0.001 && Math.abs(nd.y)<0.001) return; 
            addNodeLabel(ox+nd.x*scale, oy-nd.y*scale, nm, intv===1||(intv>1&&nIdx%intv===0)); 
            nIdx++; 
        });

        // 2. 面積ラベル
        this.state.detectedAreas.forEach((a, i) => {
            const l1 = `区画 ${i+1}`, l2 = `${Utils.round4(a.netArea/10000)}ha`;
            const px = ((ox+a.center.x*scale) / pxPerMm) - offsetMmX;
            const py = ((oy-a.center.y*scale) / pxPerMm) - offsetMmY;
            html += `<div class="sub-draggable" style="position: absolute; left:${px}mm; top:${py}mm; transform:translate(-50%, -50%); background:${this.CONFIG.colors.labelBg}; border:1px solid #217270; padding:2px 6px; text-align:center; font-family:sans-serif; font-size:12px; font-weight:bold; color:#217270; border-radius:3px; z-index: 2; cursor: move; white-space: nowrap;">${l1}<br><span style="font-weight:normal; font-size:11px;">${l2}</span></div>`;
            
            if (a.isDonut) {
                a.holes.forEach(h => {
                    const hl1 = `除地 ${h.globalIndex}`, hl2 = `${Utils.round4(h.area/10000)}ha`;
                    const hpx = ((ox+h.center.x*scale) / pxPerMm) - offsetMmX;
                    const hpy = ((oy-h.center.y*scale) / pxPerMm) - offsetMmY;
                    html += `<div class="sub-draggable" style="position: absolute; left:${hpx}mm; top:${hpy}mm; transform:translate(-50%, -50%); background:${this.CONFIG.colors.labelBg}; border:1px solid #A13D44; padding:2px 6px; text-align:center; font-family:sans-serif; font-size:11px; font-weight:bold; color:#A13D44; border-radius:3px; z-index: 2; cursor: move; white-space: nowrap;">${hl1}<br><span style="font-weight:normal; font-size:10px;">${hl2}</span></div>`;
                });
            }
        });

        // 3. テキスト注記
        (this.state.annotations?.texts||[]).forEach((t, i) => {
            const fs = t.fontSize || 14;
            const w = Utils.estimateTextWidth(t.text, fs);
            const cx = ox + t.x * scale, cy = oy - t.y * scale;
            const px = ((cx - w / 2) / pxPerMm) - offsetMmX;
            const py = ((cy - fs / 2) / pxPerMm) - offsetMmY;
            const rotDeg = (t.rotation || 0) * 180 / Math.PI; 
            html += `<div class="sub-draggable no-bg" style="position: absolute; left:${px}mm; top:${py}mm; transform:rotate(${rotDeg}deg); transform-origin: center center; font-family:sans-serif; font-size:${fs}px; font-weight:bold; color:${t.color||'#059669'}; text-shadow: 1px 1px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff; z-index: 2; cursor: move; white-space: nowrap;">${t.text}</div>`;
        });

        return html;
    },

    _generateCompassSVGDataURL(conf, dec) {
        const uS = Math.min(conf.expW, conf.expH) / 800, r = 35 * uS, s = r * 4, cx = s/2, cy = s/2;
        let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${s} ${s}" width="100%" height="100%"><line x1="${cx}" y1="${cy-r}" x2="${cx}" y2="${cy+r}" stroke="#9ca3af" stroke-width="${1.5*uS}" /><line x1="${cx-r}" y1="${cy}" x2="${cx+r}" y2="${cy}" stroke="#9ca3af" stroke-width="${1.5*uS}" /><polygon points="${cx},${cy-r-6*uS} ${cx+5*uS},${cy-r+12*uS} ${cx-5*uS},${cy-r+12*uS}" fill="${this.CONFIG.colors.compassText}" /><text x="${cx}" y="${cy-r-13*uS}" font-family="sans-serif" font-size="${Math.round(16*uS)}px" font-weight="bold" fill="${this.CONFIG.colors.compassText}" text-anchor="middle">N</text>`;
        if (this.els.chkMagDeclination.checked && parseFloat(dec) !== 0) { const rad = -parseFloat(dec) * Math.PI / 180; const cos = Math.cos(rad), sin = Math.sin(rad); const rx = (px, py) => cx + px * cos - py * sin; const ry = (px, py) => cy + px * sin + py * cos; const l1x = rx(0, -r), l1y = ry(0, -r); const p1x = rx(0, -r-2*uS), p1y = ry(0, -r-2*uS); const p2x = rx(4*uS, -r+8*uS), p2y = ry(4*uS, -r+8*uS); const p3x = rx(-4*uS, -r+8*uS), p3y = ry(-4*uS, -r+8*uS); const tx = rx(0, -r-6*uS), ty = ry(0, -r-6*uS); svg += `<line x1="${cx}" y1="${cy}" x2="${l1x}" y2="${l1y}" stroke="${this.CONFIG.colors.compassArrow}" stroke-width="${2.5*uS}" /><polygon points="${p1x},${p1y} ${p2x},${p2y} ${p3x},${p3y}" fill="${this.CONFIG.colors.compassArrow}" /><text x="${tx}" y="${ty}" font-family="sans-serif" font-size="${Math.round(14*uS)}px" fill="${this.CONFIG.colors.compassArrow}" text-anchor="middle">MN</text>`; }
        const svgString = svg + `</svg>`;
        return { dataURL: 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString))), svgString };
    },

    exportJSON(fileName) {
        const st = { tableData: this.state.tableData, attributes: this.state.attributes, annotations: this.state.annotations, settings: { lat: this.els.inputLat.value, lon: this.els.inputLon.value, declination: this.els.inputDeclination.value, magDeclinationChecked: this.els.chkMagDeclination.checked, compassAdjustmentChecked: this.els.chkCompassAdjustment.checked, convertEPtoBPChecked: this.els.chkConvertEPtoBP ? this.els.chkConvertEPtoBP.checked : true, nodeLabelInterval: this.els.selNodeLabelInterval.value }, previewImage: this.generatePreviewImage() };
        if (!fileName) fileName = '令和8年度_育成複層林整備_山田太郎_No.10'; if (!fileName.endsWith('.json')) fileName += '.json';
        this._downloadFile("data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(st)), fileName);
        this.showToast('JSONファイルとして保存しました。');
    },

    generatePreviewImage() {
        const cv = document.createElement('canvas'), ctx = cv.getContext('2d'); cv.width = 600; cv.height = 600;
        ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, 600, 600); if (this.state.points.length === 0) return cv.toDataURL('image/jpeg', 0.8);
        const bs = this.state.bounds, dw = bs.maxX - bs.minX, dh = bs.maxY - bs.minY, s = (dw===0&&dh===0) ? 10 : Math.min(500/(dw||1), 500/(dh||1));
        const ox = 300 - ((bs.minX+bs.maxX)/2)*s, oy = 300 + ((bs.minY+bs.maxY)/2)*s;
        this._drawAreas(ctx, ox, oy, s, this.state.detectedAreas, this.state.nodes);
        this._drawLines(ctx, ox, oy, s, this.state.points);
        this._drawNodes(ctx, ox, oy, s, this.state.nodes, false);
        this._drawAnnotations(ctx, ox, oy, s, 1.5);
        ctx.save(); ctx.translate(40, 40); ctx.beginPath(); ctx.moveTo(0,-25); ctx.lineTo(0,25); ctx.moveTo(-25,0); ctx.lineTo(25,0); ctx.strokeStyle='#9ca3af'; ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0,-30); ctx.lineTo(4,-17); ctx.lineTo(-4,-17); ctx.fillStyle=this.CONFIG.colors.compassText; ctx.fill();
        if (this.els.chkMagDeclination.checked && parseFloat(this.els.inputDeclination.value)) { ctx.rotate(Utils.deg2rad(-parseFloat(this.els.inputDeclination.value))); ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(0,-25); ctx.strokeStyle=this.CONFIG.colors.compassArrow; ctx.lineWidth=2; ctx.stroke(); ctx.beginPath(); ctx.moveTo(0,-27); ctx.lineTo(3,-20); ctx.lineTo(-3,-20); ctx.fillStyle=this.CONFIG.colors.compassArrow; ctx.fill(); }
        ctx.restore(); return cv.toDataURL('image/jpeg', 0.8);
    },

    _downloadFile(dStr, fName) { const a = document.createElement('a'); a.href = dStr; a.download = fName; document.body.appendChild(a); a.click(); a.remove(); },

    importJSON(event) {
        const files = event.target.files; if (!files || files.length === 0) return;
        this.processJsonFiles(Array.from(files).filter(f => f.name.toLowerCase().endsWith('.json')));
    },

    renderImportFileList() {
        this.els.importFileList.innerHTML = '';
        this.importFilesList.forEach((item, index) => {
            const li = document.createElement('li'); li.textContent = item.name; li.title = item.name;
            if (this.selectedImportIndex === index) li.classList.add('selected');
            li.onclick = () => this.selectImportFile(index);
            li.ondblclick = () => { this.selectImportFile(index); this.els.btnApplyImport.click(); };
            this.els.importFileList.appendChild(li);
        });
    },

    selectImportFile(index) {
        this.selectedImportIndex = index; this.renderImportFileList();
        const item = this.importFilesList[index]; if (!item) return;
        
        if (item.data.previewImage) { this.els.importPreviewImage.src = item.data.previewImage; this.els.importPreviewImage.style.display = 'inline-block'; this.els.importNoPreviewText.style.display = 'none'; } 
        else { this.els.importPreviewImage.style.display = 'none'; this.els.importNoPreviewText.style.display = 'inline-block'; this.els.importNoPreviewText.textContent = 'プレビュー画像なし'; }

        let attrText = item.data.attributes ? item.data.attributes.filter(a=>a.value).map(a=>a.value).join(' / ') : '';
        this.els.importPreviewInfo.innerHTML = `<strong>ファイル名:</strong> ${item.name}<br>` + (item.data.tableData ? `<strong>データ数:</strong> ${item.data.tableData.length}行<br>` : '') + (attrText ? `<strong>属性情報:</strong> <span style="color:#4b5563;">${attrText}</span>` : '');
        this.els.btnApplyImport.disabled = false;
    },

    applyImportData(saved) {
        if (Array.isArray(saved.tableData)) this.state.tableData = saved.tableData;
        if (Array.isArray(saved.attributes)) this.state.attributes = saved.attributes;
        this.state.annotations = saved.annotations ? JSON.parse(JSON.stringify(saved.annotations)) : { texts: [], lines: [] };
        if (saved.settings) {
            ['lat','lon','declination'].forEach(k => { if(saved.settings[k]!==undefined) this.els['input'+k.charAt(0).toUpperCase()+k.slice(1)].value = saved.settings[k]; });
            ['magDeclinationChecked','compassAdjustmentChecked'].forEach(k => { if(saved.settings[k]!==undefined) this.els['chk'+k.charAt(0).toUpperCase()+k.slice(1).replace('Checked','')].checked = saved.settings[k]; });
            if(saved.settings.convertEPtoBPChecked !== undefined && this.els.chkConvertEPtoBP) this.els.chkConvertEPtoBP.checked = saved.settings.convertEPtoBPChecked;
            if(saved.settings.nodeLabelInterval !== undefined) this.els.selNodeLabelInterval.value = saved.settings.nodeLabelInterval;
        }
        this.renderAttrTable(); this.renderTable();
        setTimeout(() => { this.resizeCanvas(); this.updateDrawing(true); if (this.isMapMode && this.map) { this.map.invalidateSize(); this.updateMapDrawing(true); } }, 100);
        this.pushState(); this.showToast('データを読み込みました。');
    },

};
