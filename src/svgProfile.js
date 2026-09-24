export function drawProfileSVG(drawingData, attrs, svgElement) {
    if (!drawingData || !svgElement) return;
    const { results, graphElevBase, pw, ph, scaleH, scaleV, viewX, viewY, viewW, viewH } = drawingData;

    svgElement.setAttribute('viewBox', `${viewX} ${viewY} ${viewW} ${viewH}`);
    svgElement.setAttribute('width', viewW);
    svgElement.setAttribute('height', viewH);

    let html = `<style>text { font-family: 'Inter', sans-serif; }</style>`;
    
    // 背景(白)
    html += `<rect x="${viewX}" y="${viewY}" width="${viewW}" height="${viewH}" fill="#ffffff" />`;

    // グラフ領域パラメータ
    const graphW = results[results.length - 1].cDist * (1000 / scaleH);
    const minElev = Math.min(...results.map(r => r.elev));
    const maxElev = Math.max(...results.map(r => r.elev));
    
    // Y軸：5m刻み
    let gridMinY = Math.floor(minElev / 5) * 5;
    let gridMaxY = Math.ceil(maxElev / 5) * 5;
    if (gridMaxY === gridMinY) gridMaxY += 5;

    // グリッド線
    for (let e = gridMinY; e <= gridMaxY; e += 5) {
        // SVGはY下向きだが、座標系は右・下を正として計算されているため
        // 標高が高い＝マイナス方向へ描画するが、ここでは calculateProfile で py = (elev - base)*(1000/V) としている（上方向が正）。
        // しかし SVG では下方向が正。
        // ※ 元の generateDXF / drawVectorPreview の仕様に合わせる
        const plotY = (e - graphElevBase) * (1000 / scaleV);
        html += `<line x1="0" y1="${-plotY}" x2="${graphW}" y2="${-plotY}" stroke="#e5e7eb" stroke-width="0.5" />`;
        html += `<text x="-2" y="${-plotY}" font-size="2.5" fill="#6b7280" text-anchor="end" dominant-baseline="middle">${e.toFixed(2)}</text>`;
        html += `<text x="${graphW + 2}" y="${-plotY}" font-size="2.5" fill="#6b7280" text-anchor="start" dominant-baseline="middle">${e.toFixed(2)}</text>`;
    }

    // 地盤線
    let polyPts = "";
    for (let i = 0; i < results.length; i++) {
        const r = results[i];
        const px = r.cDist * (1000 / scaleH);
        const py = (r.elev - graphElevBase) * (1000 / scaleV);
        polyPts += `${px},${-py} `;
    }
    html += `<polyline points="${polyPts.trim()}" fill="none" stroke="#ef4444" stroke-width="1.0" />`;

    // 縦罫線とデータ表
    // 表の基準はSVG座標 Y=5 (グラフより下) とする。元の仕様に合わせる。
    const tableBaseY = 5;
    const rowH = 8;
    const labels = ["測点", "単距離", "追加距離", "勾配", "地盤高"];
    const rowsCount = labels.length;
    const tableBottom = tableBaseY + rowH * rowsCount;
    const tableTitleWidth = 20;
    const tableTitleX = -tableTitleWidth;

    // 表 横線
    for (let i = 0; i <= rowsCount; i++) {
        const lineY = tableBaseY + i * rowH;
        html += `<line x1="${tableTitleX}" y1="${lineY}" x2="${graphW}" y2="${lineY}" stroke="#9ca3af" stroke-width="0.3" />`;
    }
    // 表 タイトル文字
    for (let i = 0; i < rowsCount; i++) {
        const lineY = tableBaseY + i * rowH;
        html += `<text x="${tableTitleX + tableTitleWidth/2}" y="${lineY + rowH/2}" font-size="3" fill="#374151" text-anchor="middle" dominant-baseline="central">${labels[i]}</text>`;
    }

    // 縦線とデータ
    for (let i = 0; i < results.length; i++) {
        const r = results[i];
        const px = r.cDist * (1000 / scaleH);
        const py = (r.elev - graphElevBase) * (1000 / scaleV);

        // グラフへの縦線
        html += `<line x1="${px}" y1="0" x2="${px}" y2="${-py}" stroke="#d1d5db" stroke-width="0.3" stroke-dasharray="1 1" />`;
        // 表の縦線
        html += `<line x1="${px}" y1="${tableBaseY}" x2="${px}" y2="${tableBottom}" stroke="#9ca3af" stroke-width="0.3" />`;

        const ptTxt = r.pt || i.toString();
        const sDistTxt = i === 0 ? "" : r.hDist.toFixed(2);
        const cDistTxt = r.cDist.toFixed(2);
        const gradTxt = i === 0 ? "" : (r.grad > 0 ? "+" : "") + r.grad.toFixed(1) + "%";
        const elevTxt = r.elev.toFixed(2);

        const align = "end";
        const offsetX = -1;

        // 文字
        html += `<text x="${px + offsetX}" y="${tableBaseY + 0*rowH + rowH/2}" font-size="2.5" fill="#111827" text-anchor="${align}" dominant-baseline="central">${ptTxt}</text>`;
        if(i > 0) html += `<text x="${px + offsetX}" y="${tableBaseY + 1*rowH + rowH/2}" font-size="2.5" fill="#111827" text-anchor="${align}" dominant-baseline="central">${sDistTxt}</text>`;
        html += `<text x="${px + offsetX}" y="${tableBaseY + 2*rowH + rowH/2}" font-size="2.5" fill="#111827" text-anchor="${align}" dominant-baseline="central">${cDistTxt}</text>`;
        if(i > 0) html += `<text x="${px + offsetX}" y="${tableBaseY + 3*rowH + rowH/2}" font-size="2.5" fill="#111827" text-anchor="${align}" dominant-baseline="central">${gradTxt}</text>`;
        html += `<text x="${px + offsetX}" y="${tableBaseY + 4*rowH + rowH/2}" font-size="2.5" fill="#111827" text-anchor="${align}" dominant-baseline="central">${elevTxt}</text>`;
    }

    // 図面枠 (右下)
    const titleW = 90;
    const titleH = 40;
    const rx = viewX + viewW - 10;
    const ry = viewY + viewH - 10 - titleH;

    html += `<rect x="${rx - titleW}" y="${ry}" width="${titleW}" height="${titleH}" fill="none" stroke="#374151" stroke-width="0.5" />`;
    
    const tRows = 5;
    const tRowH = titleH / tRows;
    for(let i = 1; i < tRows; i++) {
        html += `<line x1="${rx - titleW}" y1="${ry + i*tRowH}" x2="${rx}" y2="${ry + i*tRowH}" stroke="#374151" stroke-width="0.5" />`;
    }
    html += `<line x1="${rx - titleW + 20}" y1="${ry}" x2="${rx - titleW + 20}" y2="${ry + titleH}" stroke="#374151" stroke-width="0.5" />`;
    html += `<line x1="${rx - titleW + 55}" y1="${ry}" x2="${rx - titleW + 55}" y2="${ry + titleH}" stroke="#374151" stroke-width="0.5" />`;

    const putT = (txt, cx, cy) => {
        html += `<text x="${cx}" y="${cy}" font-size="3" fill="#111827" text-anchor="middle" dominant-baseline="central">${txt}</text>`;
    };
    putT(attrs.year, rx - titleW + 10, ry + 4*tRowH - tRowH/2);
    putT(attrs.constName, rx - titleW + 37.5, ry + 4*tRowH - tRowH/2);
    putT("名称", rx - titleW + 10, ry + 3*tRowH - tRowH/2);
    putT(attrs.title, rx - titleW + 37.5, ry + 3*tRowH - tRowH/2);
    putT("施工地", rx - titleW + 10, ry + 2*tRowH - tRowH/2);
    putT(attrs.location, rx - titleW + 37.5, ry + 2*tRowH - tRowH/2);
    putT(attrs.project, rx - titleW + 37.5, ry + 1*tRowH - tRowH/2);
    putT(attrs.office, rx - titleW + 37.5, ry + 0*tRowH - tRowH/2);
    
    putT("図面番号", rx - titleW + 55 + 17.5, ry + 4*tRowH - tRowH/2);
    putT(attrs.drawNo, rx - titleW + 55 + 17.5, ry + 3*tRowH - tRowH/2);
    putT("縮尺", rx - titleW + 55 + 17.5, ry + 2*tRowH - tRowH/2);
    putT(attrs.scaleText, rx - titleW + 55 + 17.5, ry + 1*tRowH - tRowH/2);

    svgElement.innerHTML = html;
}
