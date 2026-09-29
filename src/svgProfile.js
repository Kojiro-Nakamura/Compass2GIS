export function drawProfileSVG(drawingData, attrs, svgElement) {
    if (!drawingData || !svgElement) return;
    const { results, graphElevBase, pw, ph, scaleH, scaleV, viewX, viewY, viewW, viewH } = drawingData;

    svgElement.setAttribute('viewBox', `${viewX} ${viewY} ${viewW} ${viewH}`);
    svgElement.setAttribute('width', viewW);
    svgElement.setAttribute('height', viewH);

    let html = `<style>text { font-family: 'Inter', sans-serif; }</style>`;
    
    // 背景(白)
    html += `<rect x="${viewX}" y="${viewY}" width="${viewW}" height="${viewH}" fill="#ffffff" />`;
    html += `<rect x="0" y="0" width="${pw}" height="${ph}" fill="none" stroke="#000000" stroke-width="0.5" />`;

    // 帯表の寸法とレイアウト (profile.js の viewBox 計算と統一)
    const pitch = 12; 
    const boxHeight = 10; 
    const numBands = 5;
    const bandLabels = [ "測点", "単距離", "追加距離", "勾配", "地盤高" ];

    const marginX = 12;
    const labelBoxW = 35;
    const colGap = 2;
    const dataBoxX = 20 + labelBoxW + colGap;
    const startX = dataBoxX + marginX; 
    
    // グラフ基準位置 (DL線の位置)
    const graphBaseY = ph - 30 - (numBands * pitch) - 5;

    // 終点の計算
    const totalDistCAD = (results[results.length - 1].cDist * 1000) / scaleH;
    const endX = startX + totalDistCAD;
    const tableEndX = endX + marginX; 

    // Y軸スケール (グリッド)
    const minElev = Math.min(...results.map(r => r.elev));
    const maxElev = Math.max(...results.map(r => r.elev));
    
    let gridMinY = Math.floor(minElev / 5) * 5;
    let gridMaxY = Math.ceil(maxElev / 5) * 5;
    if (gridMaxY === gridMinY) gridMaxY += 5;

    // グリッド線
    for (let e = gridMinY; e <= gridMaxY; e += 5) {
        const y = graphBaseY - ((e - graphElevBase) * 1000) / scaleV;
        html += `<line x1="${dataBoxX}" y1="${y}" x2="${tableEndX}" y2="${y}" stroke="#e5e7eb" stroke-width="0.5" />`;
        html += `<text x="${dataBoxX - 2}" y="${y}" font-size="2.5" fill="#6b7280" text-anchor="end" dominant-baseline="middle">${e.toFixed(2)}</text>`;
        html += `<text x="${tableEndX + 2}" y="${y}" font-size="2.5" fill="#6b7280" text-anchor="start" dominant-baseline="middle">${e.toFixed(2)}</text>`;
    }

    // 地盤線
    let polyPts = "";
    for (let i = 0; i < results.length; i++) {
        const r = results[i];
        const px = startX + r.cDist * (1000 / scaleH);
        const py = graphBaseY - (r.elev - graphElevBase) * (1000 / scaleV);
        polyPts += `${px},${py} `;
    }
    html += `<polyline points="${polyPts.trim()}" fill="none" stroke="#ef4444" stroke-width="1.0" />`;

    // DL線とテキスト
    html += `<line x1="20" y1="${graphBaseY}" x2="${tableEndX}" y2="${graphBaseY}" stroke="#000" stroke-width="0.3" />`;
    html += `<text x="20" y="${graphBaseY - 2}" font-size="4" fill="#000" text-anchor="start">DL = ${graphElevBase.toFixed(2)}</text>`;

    // 帯表の箱描画
    for (let i = 0; i < numBands; i++) {
        const yTop = graphBaseY + 3 + i * pitch + 1;
        
        // 項目名箱
        html += `<rect x="20" y="${yTop}" width="${labelBoxW}" height="${boxHeight}" fill="none" stroke="#000" stroke-width="0.2" />`;
        html += `<text x="${20 + labelBoxW/2}" y="${yTop + boxHeight/2}" font-size="3" fill="#374151" text-anchor="middle" dominant-baseline="central">${bandLabels[i]}</text>`;
        
        // データ箱
        html += `<rect x="${dataBoxX}" y="${yTop}" width="${tableEndX - dataBoxX}" height="${boxHeight}" fill="none" stroke="#000" stroke-width="0.2" />`;
    }

    // 縦線とデータ
    for (let i = 0; i < results.length; i++) {
        const r = results[i];
        const px = startX + r.cDist * (1000 / scaleH);
        const py = graphBaseY - (r.elev - graphElevBase) * (1000 / scaleV);

        // グラフへの縦線 (破線)
        html += `<line x1="${px}" y1="${graphBaseY}" x2="${px}" y2="${py}" stroke="#d1d5db" stroke-width="0.3" stroke-dasharray="1 1" />`;
        // 表を貫く縦線
        html += `<line x1="${px}" y1="${graphBaseY + 3 + 1}" x2="${px}" y2="${graphBaseY + 3 + numBands * pitch + 1}" stroke="#9ca3af" stroke-width="0.2" />`;

        const ptTxt = r.pt || i.toString();
        const sDistTxt = i === 0 ? "" : r.hDist.toFixed(2);
        const cDistTxt = r.cDist.toFixed(2);
        const gradTxt = i === 0 ? "" : (r.grad > 0 ? "+" : "") + r.grad.toFixed(1) + "%";
        const elevTxt = r.elev.toFixed(2);

        const align = "end";
        const offsetX = -1;

        // 文字
        html += `<text x="${px + offsetX}" y="${graphBaseY + 3 + 0*pitch + 1 + boxHeight/2}" font-size="2.5" fill="#111827" text-anchor="${align}" dominant-baseline="central">${ptTxt}</text>`;
        html += `<text x="${px + offsetX}" y="${graphBaseY + 3 + 1*pitch + 1 + boxHeight/2}" font-size="2.5" fill="#111827" text-anchor="${align}" dominant-baseline="central">${sDistTxt}</text>`;
        html += `<text x="${px + offsetX}" y="${graphBaseY + 3 + 2*pitch + 1 + boxHeight/2}" font-size="2.5" fill="#111827" text-anchor="${align}" dominant-baseline="central">${cDistTxt}</text>`;
        html += `<text x="${px + offsetX}" y="${graphBaseY + 3 + 3*pitch + 1 + boxHeight/2}" font-size="2.5" fill="#111827" text-anchor="${align}" dominant-baseline="central">${gradTxt}</text>`;
        html += `<text x="${px + offsetX}" y="${graphBaseY + 3 + 4*pitch + 1 + boxHeight/2}" font-size="2.5" fill="#111827" text-anchor="${align}" dominant-baseline="central">${elevTxt}</text>`;
    }

    // 図面枠 (右下) - DXFと同じように右下に配置
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
