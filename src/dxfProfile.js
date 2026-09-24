export function generateProfileDXF(drawingData, attrs, triggerDownload, showWarning) {
    if (!drawingData) return false;
    const { results, graphElevBase, pw, ph, scaleH, scaleV, viewW, viewH } = drawingData;

    let dxf = "";
    // DXF Header
    dxf += "0\nSECTION\n2\nHEADER\n";
    dxf += "9\n$ACADVER\n1\nAC1015\n"; 
    dxf += "9\n$DWGCODEPAGE\n3\nANSI_932\n"; // Shift-JIS

    // 図面範囲 (LIMITS) は用紙サイズ(A3等)に固定し、オブジェクト範囲 (EXTENTS) にはみ出し分を含める
    dxf += "9\n$EXTMIN\n10\n0.0\n20\n0.0\n30\n0.0\n";
    dxf += "9\n$EXTMAX\n10\n" + viewW.toFixed(3) + "\n20\n" + viewH.toFixed(3) + "\n30\n0.0\n";
    dxf += "9\n$LIMMIN\n10\n0.0\n20\n0.0\n30\n0.0\n";
    dxf += "9\n$LIMMAX\n10\n" + pw.toFixed(3) + "\n20\n" + ph.toFixed(3) + "\n30\n0.0\n";
    dxf += "0\nENDSEC\n";

    dxf += "0\nSECTION\n2\nENTITIES\n";

    const addDxfLine = (x1, y1, x2, y2, layer="0") => {
        dxf += "0\nLINE\n8\n" + layer + "\n";
        dxf += "10\n" + x1.toFixed(3) + "\n20\n" + y1.toFixed(3) + "\n30\n0.0\n";
        dxf += "11\n" + x2.toFixed(3) + "\n21\n" + y2.toFixed(3) + "\n31\n0.0\n";
    };

    const addDxfText = (txt, x, y, h, rot=0, layer="TEXT", align="center") => {
        dxf += "0\nTEXT\n8\n" + layer + "\n";
        dxf += "1\n" + txt + "\n";
        dxf += "10\n" + x.toFixed(3) + "\n20\n" + y.toFixed(3) + "\n30\n0.0\n";
        dxf += "40\n" + h.toFixed(2) + "\n";
        
        let alignGrp = 0; // 0:Left, 1:Center, 2:Right
        if (align === "center") alignGrp = 1;
        else if (align === "right") alignGrp = 2;
        
        dxf += "50\n" + rot.toFixed(2) + "\n";
        
        if (alignGrp > 0) {
            dxf += "72\n" + alignGrp + "\n";
            dxf += "11\n" + x.toFixed(3) + "\n21\n" + y.toFixed(3) + "\n31\n0.0\n";
        }
    };

    // 背景グリッドと目盛り
    const gridLayer = "GRID";
    const graphW = results[results.length - 1].cDist * (1000 / scaleH);
    const minElev = Math.min(...results.map(r => r.elev));
    const maxElev = Math.max(...results.map(r => r.elev));
    
    // Y軸：5m刻みでグリッド線を引く
    let gridMinY = Math.floor(minElev / 5) * 5;
    let gridMaxY = Math.ceil(maxElev / 5) * 5;
    if (gridMaxY === gridMinY) gridMaxY += 5;

    for (let e = gridMinY; e <= gridMaxY; e += 5) {
        const plotY = (e - graphElevBase) * (1000 / scaleV);
        addDxfLine(0, plotY, graphW, plotY, gridLayer);
        addDxfText(e.toFixed(2), -2, plotY, 2.5, 0, "TEXT", "right");
        addDxfText(e.toFixed(2), graphW + 2, plotY, 2.5, 0, "TEXT", "left");
    }

    // 地盤線 (赤い太線)
    let prevX = 0;
    let prevY = (results[0].elev - graphElevBase) * (1000 / scaleV);
    
    // ポリライン開始
    dxf += "0\nPOLYLINE\n8\nTERRAIN\n66\n1\n";
    // 頂点1
    dxf += "0\nVERTEX\n8\nTERRAIN\n10\n" + prevX.toFixed(3) + "\n20\n" + prevY.toFixed(3) + "\n30\n0.0\n";
    
    for (let i = 1; i < results.length; i++) {
        const r = results[i];
        const px = r.cDist * (1000 / scaleH);
        const py = (r.elev - graphElevBase) * (1000 / scaleV);
        dxf += "0\nVERTEX\n8\nTERRAIN\n10\n" + px.toFixed(3) + "\n20\n" + py.toFixed(3) + "\n30\n0.0\n";
    }
    dxf += "0\nSEQEND\n";

    // 縦罫線と測点情報（表）
    // 表の基準Y座標は、グラフベースより下側に固定する
    // DXFでは表をグラフの下に配置する
    const tableBaseY = -5; // グラフのX軸より5mm下
    const rowH = 8;
    const labels = ["測点", "単距離", "追加距離", "勾配", "地盤高"];
    const rowsCount = labels.length;
    const tableBottom = tableBaseY - rowH * rowsCount;
    const tableTitleWidth = 20;
    const tableTitleX = -tableTitleWidth;

    // 表の外枠・横線
    for (let i = 0; i <= rowsCount; i++) {
        const lineY = tableBaseY - i * rowH;
        addDxfLine(tableTitleX, lineY, graphW, lineY, "TABLE");
    }
    
    // 表のタイトル列（左側）
    for (let i = 0; i < rowsCount; i++) {
        const lineY = tableBaseY - i * rowH;
        addDxfText(labels[i], tableTitleX + tableTitleWidth/2, lineY - rowH/2 - 1.5, 3.5, 0, "TEXT", "center");
    }

    // 縦線とデータ
    for (let i = 0; i < results.length; i++) {
        const r = results[i];
        const px = r.cDist * (1000 / scaleH);
        const py = (r.elev - graphElevBase) * (1000 / scaleV);

        // グラフへの縦線
        addDxfLine(px, 0, px, py, "GRID_V");
        
        // 表の縦罫線
        addDxfLine(px, tableBaseY, px, tableBottom, "TABLE");
        
        // 表データ文字
        const dx = px;
        const ptTxt = r.pt || (i.toString());
        const sDistTxt = i === 0 ? "" : r.hDist.toFixed(2);
        const cDistTxt = r.cDist.toFixed(2);
        const gradTxt = i === 0 ? "" : (r.grad > 0 ? "+" : "") + r.grad.toFixed(1) + "%";
        const elevTxt = r.elev.toFixed(2);

        const align = "right";
        const offsetX = -1; // 縦線の左側に右揃え
        
        // 測点 (縦書きにしたい場合は90度回転)
        addDxfText(ptTxt, dx + offsetX, tableBaseY - 0*rowH - rowH/2 - 1.5, 2.5, 0, "TEXT", align);
        if(i > 0) addDxfText(sDistTxt, dx + offsetX, tableBaseY - 1*rowH - rowH/2 - 1.5, 2.5, 0, "TEXT", align);
        addDxfText(cDistTxt, dx + offsetX, tableBaseY - 2*rowH - rowH/2 - 1.5, 2.5, 0, "TEXT", align);
        if(i > 0) addDxfText(gradTxt, dx + offsetX, tableBaseY - 3*rowH - rowH/2 - 1.5, 2.5, 0, "TEXT", align);
        addDxfText(elevTxt, dx + offsetX, tableBaseY - 4*rowH - rowH/2 - 1.5, 2.5, 0, "TEXT", align);
    }

    // 図面枠 (右下基準に配置)
    // viewW, viewH を使って右下座標を求める
    // 枠自体のサイズは幅80mm, 高さ30mm 程度とする
    const titleW = 90;
    const titleH = 40;
    // 描画領域の右下マージン
    const rx = viewW - 10;
    const ry = - (viewH - (maxElev - graphElevBase)*(1000/scaleV) - 40); // ざっくりと下の方に配置
    
    addDxfLine(rx - titleW, ry, rx, ry, "FRAME");
    addDxfLine(rx - titleW, ry + titleH, rx, ry + titleH, "FRAME");
    addDxfLine(rx - titleW, ry, rx - titleW, ry + titleH, "FRAME");
    addDxfLine(rx, ry, rx, ry + titleH, "FRAME");

    const tRows = 5;
    const tRowH = titleH / tRows;
    for(let i = 1; i < tRows; i++) {
        addDxfLine(rx - titleW, ry + i*tRowH, rx, ry + i*tRowH, "FRAME");
    }
    
    // 縦線
    addDxfLine(rx - titleW + 20, ry, rx - titleW + 20, ry + titleH, "FRAME");
    addDxfLine(rx - titleW + 55, ry, rx - titleW + 55, ry + titleH, "FRAME");

    // 文字
    const putT = (txt, cx, cy) => { addDxfText(txt, cx, cy - 2, 3, 0, "FRAME_TEXT", "center"); };
    
    putT(attrs.year, rx - titleW + 10, ry + 4*tRowH + tRowH/2);
    putT(attrs.constName, rx - titleW + 37.5, ry + 4*tRowH + tRowH/2);
    putT("名称", rx - titleW + 10, ry + 3*tRowH + tRowH/2);
    putT(attrs.title, rx - titleW + 37.5, ry + 3*tRowH + tRowH/2);
    putT("施工地", rx - titleW + 10, ry + 2*tRowH + tRowH/2);
    putT(attrs.location, rx - titleW + 37.5, ry + 2*tRowH + tRowH/2);
    putT(attrs.project, rx - titleW + 37.5, ry + 1*tRowH + tRowH/2);
    putT(attrs.office, rx - titleW + 37.5, ry + 0*tRowH + tRowH/2);
    
    putT("図面番号", rx - titleW + 55 + 17.5, ry + 4*tRowH + tRowH/2);
    putT(attrs.drawNo, rx - titleW + 55 + 17.5, ry + 3*tRowH + tRowH/2);
    putT("縮尺", rx - titleW + 55 + 17.5, ry + 2*tRowH + tRowH/2);
    putT(attrs.scaleText, rx - titleW + 55 + 17.5, ry + 1*tRowH + tRowH/2);

    dxf += "0\nENDSEC\n0\nEOF\n";

    // Download Logic with Shift-JIS
    try {
        if (typeof Encoding === 'undefined') throw new Error("Encoding.js is not loaded.");
        const unicodeArray = Encoding.stringToCode(dxf);
        const sjisArray = Encoding.convert(unicodeArray, 'SJIS', 'UNICODE');
        const uint8Array = new Uint8Array(sjisArray);
        const blob = new Blob([uint8Array], { type: 'application/dxf' });
        
        if (showWarning) showWarning(false);
        triggerDownload(blob, 'profile.dxf');
    } catch (e) {
        console.warn("Shift-JIS conversion failed, falling back to UTF-8", e);
        if (showWarning) showWarning(true);
        const blob = new Blob([dxf], { type: 'application/dxf' });
        triggerDownload(blob, 'profile_utf8.dxf');
    }
    return true;
}
