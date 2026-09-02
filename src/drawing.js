import { Utils, CONSTANTS } from "./utils.js";

export const drawing = {
    _redrawAll() {
        this.draw();
        if (this.isMapMode) { this.updateMapDrawing(false); this._updateMapTempLine(); }
    },

    _getPixelsToInternalDistance(px) {
        if (this.isMapMode && this.map) {
            const center = this.map.getCenter();
            const point = this.map.project(center);
            const latlng2 = this.map.unproject(point.add([0, -px])); // 上にpxピクセル移動
            const im1 = this.getInternalCoordsFromLatLng(center.lat, center.lng);
            const im2 = this.getInternalCoordsFromLatLng(latlng2.lat, latlng2.lng);
            return Math.sqrt(Math.pow(im2.x - im1.x, 2) + Math.pow(im2.y - im1.y, 2));
        }
        return px / this.state.view.scale;
    },

    getInternalCoordsFromLatLng(lat, lon) {
        const lat0 = parseFloat(this.els.inputLat.value) || 0, lon0 = parseFloat(this.els.inputLon.value) || 0;
        const lonDegPerMeter = CONSTANTS.LAT_DEG_PER_METER / Math.cos(Utils.deg2rad(lat0));
        return { x: (lon - lon0) / lonDegPerMeter, y: (lat - lat0) / CONSTANTS.LAT_DEG_PER_METER };
    },

    _findAnnotationAtCanvas(mouseX, mouseY) {
        const { offsetX, offsetY, scale } = this.state.view;
        const threshold = 20; 
        
        if (!this.state.annotations) return null;

        if (this.state.selectedAnnotation && this.state.interactionMode === 'select') {
            const target = this.state.selectedAnnotation;
            const ref = target.ref;
            let cPx, cPy, boxH;
            if (target.type === 'text') {
                const baseSize = ref.fontSize || 14;
                cPx = offsetX + ref.x * scale; cPy = offsetY - ref.y * scale; boxH = baseSize * scale;
            } else {
                let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
                ref.points.forEach(p => { if(p.x<minX)minX=p.x; if(p.x>maxX)maxX=p.x; if(p.y<minY)minY=p.y; if(p.y>maxY)maxY=p.y; });
                cPx = offsetX + ((minX + maxX) / 2) * scale; cPy = offsetY - ((minY + maxY) / 2) * scale; boxH = (maxY - minY) * scale;
            }
            const topPy = cPy - boxH / 2 - 20; 
            const rot = ref.rotation || 0;
            const handlePx = cPx - (topPy - cPy) * Math.sin(rot), handlePy = cPy + (topPy - cPy) * Math.cos(rot);
            
            if (Math.sqrt(Math.pow(mouseX - handlePx, 2) + Math.pow(mouseY - handlePy, 2)) < 16) return { type: 'handle', target };
        }

        for (let i = this.state.annotations.texts.length - 1; i >= 0; i--) {
            const t = this.state.annotations.texts[i], baseSize = t.fontSize || 14, w = Utils.estimateTextWidth(t.text, baseSize);
            const cPx = offsetX + t.x * scale, cPy = offsetY - t.y * scale, rot = t.rotation || 0;
            const dx = mouseX - cPx, dy = mouseY - cPy, cos = Math.cos(-rot), sin = Math.sin(-rot);
            const rotPx = cPx + dx * cos - dy * sin, rotPy = cPy + dx * sin + dy * cos;
            
            const boxLeft = cPx - (w / 2) * scale, boxRight = cPx + (w / 2) * scale;
            const boxTop = cPy - (baseSize / 2) * scale, boxBottom = cPy + (baseSize / 2) * scale;

            if (rotPx >= boxLeft - threshold && rotPx <= boxRight + threshold && rotPy >= boxTop - threshold && rotPy <= boxBottom + threshold) {
                return { type: 'text', index: i, ref: t };
            }
        }

        for (let i = this.state.annotations.lines.length - 1; i >= 0; i--) {
            const line = this.state.annotations.lines[i];
            let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
            line.points.forEach(p => { if(p.x<minX)minX=p.x; if(p.x>maxX)maxX=p.x; if(p.y<minY)minY=p.y; if(p.y>maxY)maxY=p.y; });
            const cPx = offsetX + ((minX + maxX) / 2) * scale, cPy = offsetY - ((minY + maxY) / 2) * scale, rot = line.rotation || 0;
            const dx = mouseX - cPx, dy = mouseY - cPy, cos = Math.cos(-rot), sin = Math.sin(-rot);
            const rotPx = cPx + dx * cos - dy * sin, rotPy = cPy + dx * sin + dy * cos;

            const lineThreshold = Math.max(threshold, (line.lineWidth || 2) / 2 + 10);

            for (let j = 0; j < line.points.length - 1; j++) {
                const pt1 = { x: offsetX + line.points[j].x * scale, y: offsetY - line.points[j].y * scale };
                const pt2 = { x: offsetX + line.points[j+1].x * scale, y: offsetY - line.points[j+1].y * scale };
                if (Utils.pointToLineDistance({x: rotPx, y: rotPy}, pt1, pt2) < lineThreshold) return { type: 'line', index: i, ref: line };
            }
        }
        return null;
    },

    _selectAnnotation(target) {
        this.state.selectedAnnotation = target;
        const { type, ref } = target;
        this.els.propColor.value = ref.color || '#059669';

        if (type === 'line') {
            this.els.rowLineWidth.style.display = 'flex'; this.els.rowLineStyle.style.display = 'flex'; this.els.rowFontSize.style.display = 'none';
            this.els.propLineWidth.value = ref.lineWidth || 2; this.els.propLineStyle.value = ref.lineStyle || 'solid';
        } else if (type === 'text') {
            this.els.rowLineWidth.style.display = 'none'; this.els.rowLineStyle.style.display = 'none'; this.els.rowFontSize.style.display = 'flex';
            this.els.propFontSize.value = ref.fontSize || 14;
        }
        this.els.propertyPanel.style.display = 'flex';
        this._redrawAll();
    },

    _clearSelection() {
        if (this.state.selectedAnnotation !== null) {
            this.state.selectedAnnotation = null;
            this.els.propertyPanel.style.display = 'none';
            this._redrawAll();
        }
    },

    updateBounds() {
        if (this.state.nodes.size === 0) return;
        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        this.state.nodes.forEach(n => {
            if(n.x<minX)minX=n.x; if(n.x>maxX)maxX=n.x; if(n.y<minY)minY=n.y; if(n.y>maxY)maxY=n.y;
        });
        this.state.bounds = { minX, maxX, minY, maxY };
    },

    resizeCanvas() {
        this.els.canvas.width = this.els.container.clientWidth; this.els.canvas.height = this.els.container.clientHeight;
        this.draw(); if (this.isMapMode && this.map) this.map.invalidateSize();
    },

    autoFit() {
        if (this.state.nodes.size < 2) {
            this.state.view.scale = 1; this.state.view.offsetX = this.els.canvas.width / 2; this.state.view.offsetY = this.els.canvas.height / 2; return;
        }
        const { padding } = this.CONFIG.canvas, { bounds } = this.state, dW = bounds.maxX - bounds.minX, dH = bounds.maxY - bounds.minY;
        if (dW === 0 && dH === 0) this.state.view.scale = 10;
        else this.state.view.scale = Math.max(0.1, Math.min(Math.max(10, this.els.canvas.width - padding * 2) / (dW || 1), Math.max(10, this.els.canvas.height - padding * 2) / (dH || 1)));
        const cx = (bounds.minX + bounds.maxX) / 2, cy = (bounds.minY + bounds.maxY) / 2;
        this.state.view.offsetX = this.els.canvas.width / 2 - cx * this.state.view.scale;
        this.state.view.offsetY = this.els.canvas.height / 2 + cy * this.state.view.scale;
    },

    updateDrawing(fit = false) {
        this.calculateCoordinates(); this.findClosedAreas();
        if (fit || this.state.nodes.size === 2) this.autoFit();
        this.draw(); if (this.isMapMode) this.updateMapDrawing(fit); 
    },

    draw() {
        const { ctx, els: { canvas } } = this, { view: { offsetX, offsetY, scale }, points, nodes, detectedAreas } = this.state;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this._drawGrid(ctx, offsetX, offsetY, scale); this._drawCompassRose(ctx);
        this._drawAreas(ctx, offsetX, offsetY, scale, detectedAreas, nodes);
        if (points.length > 0) {
            this._drawLines(ctx, offsetX, offsetY, scale, points);
            this._drawNodes(ctx, offsetX, offsetY, scale, nodes, true);
            this._drawLabels(ctx, offsetX, offsetY, scale, detectedAreas);
        }
        this._drawAnnotations(ctx, offsetX, offsetY, scale);

        if (this.state.currentLine.length > 0) {
            ctx.beginPath(); ctx.strokeStyle = '#059669'; ctx.lineWidth = 2; let lastPx, lastPy;
            this.state.currentLine.forEach((pt, i) => {
                const px = offsetX + pt.x * scale, py = offsetY - pt.y * scale;
                if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); lastPx = px; lastPy = py;
            });
            ctx.stroke();
            if (this.state.view.currentMouseInternalX !== undefined && this.state.interactionMode === 'line') {
                ctx.beginPath(); ctx.strokeStyle = '#059669'; ctx.lineWidth = 2; ctx.setLineDash([6, 6]); ctx.moveTo(lastPx, lastPy);
                ctx.lineTo(offsetX + this.state.view.currentMouseInternalX * scale, offsetY - this.state.view.currentMouseInternalY * scale);
                ctx.stroke(); ctx.setLineDash([]);
            }
        }
    },

    _drawAnnotations(ctx, offsetX, offsetY, scale, uiScale = 1) {
        const texts = this.state.annotations?.texts || [], lines = this.state.annotations?.lines || [];
        const sel = this.state.selectedAnnotation, hov = this.state.hoveredAnnotation; 

        lines.forEach((line, index) => {
            const isSel = sel?.type === 'line' && sel?.index === index, rot = line.rotation || 0;
            const isHov = hov?.type === 'line' && hov?.index === index; 
            
            let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
            line.points.forEach(p => { if(p.x<minX)minX=p.x; if(p.x>maxX)maxX=p.x; if(p.y<minY)minY=p.y; if(p.y>maxY)maxY=p.y; });
            const cPx = offsetX + ((minX + maxX) / 2) * scale, cPy = offsetY - ((minY + maxY) / 2) * scale;

            ctx.save(); ctx.translate(cPx, cPy); ctx.rotate(rot); ctx.translate(-cPx, -cPy);

            if ((isSel || isHov) && uiScale === 1) {
                ctx.beginPath(); 
                ctx.strokeStyle = isSel ? 'rgba(59, 130, 246, 0.4)' : 'rgba(59, 130, 246, 0.2)'; 
                ctx.lineWidth = (line.lineWidth || 2) * uiScale + 8;
                line.points.forEach((pt, i) => { const px = offsetX + pt.x * scale, py = offsetY - pt.y * scale; if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); });
                ctx.stroke();
                
                if (isSel) {
                    const topPy = cPy - ((maxY - minY) / 2) * scale - 20; 
                    ctx.beginPath(); ctx.moveTo(cPx, cPy - ((maxY - minY) / 2) * scale); ctx.lineTo(cPx, topPy); ctx.strokeStyle = '#3b82f6'; ctx.lineWidth = 1.5; ctx.stroke();
                    ctx.beginPath(); ctx.arc(cPx, topPy, 6, 0, Math.PI * 2); ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.stroke();
                }
            }

            ctx.beginPath(); ctx.strokeStyle = line.color || '#059669'; ctx.lineWidth = (line.lineWidth || 2) * uiScale;
            if (line.lineStyle === 'dashed') ctx.setLineDash([8 * uiScale, 6 * uiScale]); else if (line.lineStyle === 'dotted') ctx.setLineDash([2 * uiScale, 4 * uiScale]);
            line.points.forEach((pt, i) => { const px = offsetX + pt.x * scale, py = offsetY - pt.y * scale; if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); });
            ctx.stroke(); ctx.setLineDash([]); ctx.restore();
        });

        ctx.textAlign = 'left'; ctx.textBaseline = 'bottom';
        texts.forEach((t, index) => {
            const isSel = sel?.type === 'text' && sel?.index === index, rot = t.rotation || 0, color = t.color || '#059669';
            const isHov = hov?.type === 'text' && hov?.index === index; 
            const baseSize = t.fontSize || 14, fontSize = Math.round(baseSize * uiScale), w = Utils.estimateTextWidth(t.text, baseSize) * uiScale;
            
            const cPx = offsetX + t.x * scale, cPy = offsetY - t.y * scale;

            ctx.save(); ctx.translate(cPx, cPy); ctx.rotate(rot); ctx.translate(-cPx, -cPy);
            ctx.font = `bold ${fontSize}px sans-serif`; 
            
            const drawPx = cPx - w / 2;
            const drawPy = cPy + (baseSize * uiScale) / 2;
            const h = baseSize * uiScale;

            if ((isSel || isHov) && uiScale === 1) {
                ctx.fillStyle = isSel ? 'rgba(59, 130, 246, 0.15)' : 'rgba(59, 130, 246, 0.08)'; 
                ctx.fillRect(drawPx - 2, drawPy - h - 2, w + 4, h + 4);
                ctx.strokeStyle = isSel ? 'rgba(59, 130, 246, 0.8)' : 'rgba(59, 130, 246, 0.4)'; 
                ctx.lineWidth = 1; ctx.strokeRect(drawPx - 2, drawPy - h - 2, w + 4, h + 4);
                
                if (isSel) {
                    const topPy = cPy - h / 2 - 20;
                    ctx.beginPath(); ctx.moveTo(cPx, cPy - h / 2); ctx.lineTo(cPx, topPy); ctx.strokeStyle = '#3b82f6'; ctx.lineWidth = 1.5; ctx.stroke();
                    ctx.beginPath(); ctx.arc(cPx, topPy, 6, 0, Math.PI * 2); ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.stroke();
                }
            }
            ctx.strokeStyle = 'white'; ctx.lineWidth = Math.max(2, baseSize * 0.2) * uiScale; ctx.lineJoin = 'round';
            ctx.strokeText(t.text, drawPx, drawPy); ctx.fillStyle = color; ctx.fillText(t.text, drawPx, drawPy); ctx.restore();
        });
    },

    _drawAreas(ctx, offsetX, offsetY, scale, detectedAreas, nodes) {
        detectedAreas.forEach(a => {
            ctx.beginPath();
            a.path.forEach((n, idx) => { const node = nodes.get(n); if (idx === 0) ctx.moveTo(offsetX + node.x * scale, offsetY - node.y * scale); else ctx.lineTo(offsetX + node.x * scale, offsetY - node.y * scale); });
            ctx.closePath();
            if (a.isDonut) a.holes.forEach(h => { h.path.forEach((n, idx) => { const node = nodes.get(n); if (idx === 0) ctx.moveTo(offsetX + node.x * scale, offsetY - node.y * scale); else ctx.lineTo(offsetX + node.x * scale, offsetY - node.y * scale); }); ctx.closePath(); });
            ctx.fillStyle = this.CONFIG.colors.areaFill; ctx.fill('evenodd');
        });
    },

    _drawLines(ctx, offsetX, offsetY, scale, points) {
        points.forEach(p => {
            const px1 = offsetX + p.fromX * scale, py1 = offsetY - p.fromY * scale, px2 = offsetX + p.toX * scale, py2 = offsetY - p.toY * scale;
            if (!p.isDraw) {
                ctx.beginPath(); ctx.strokeStyle = '#9ca3af'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 4]); ctx.moveTo(px1, py1); ctx.lineTo(px2, py2); ctx.stroke(); ctx.setLineDash([]); return;
            }
            ctx.beginPath(); ctx.strokeStyle = '#ffffff'; ctx.lineWidth = p.type === 'branch' ? 3.5 : 4; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.moveTo(px1, py1); ctx.lineTo(px2, py2); ctx.stroke();
            ctx.beginPath(); ctx.strokeStyle = p.type === 'branch' ? this.CONFIG.colors.lineBranch : this.CONFIG.colors.lineMain; ctx.lineWidth = p.type === 'branch' ? 1.5 : 2; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.moveTo(px1, py1); ctx.lineTo(px2, py2); ctx.stroke();
        });
    },

    _drawNodes(ctx, offsetX, offsetY, scale, nodes, drawText = true) {
        const fp = this._getFirstPointName(), intv = parseInt(this.els.selNodeLabelInterval.value, 10);
        const sNode = nodes.get(fp); if(sNode) this._drawSingleNode(ctx, offsetX + sNode.x * scale, offsetY - sNode.y * scale, true, fp, drawText);
        let nIdx = 1;
        nodes.forEach((node, name) => {
            if (name === fp && Math.abs(node.x) < 0.001 && Math.abs(node.y) < 0.001) return;
            this._drawSingleNode(ctx, offsetX + node.x * scale, offsetY - node.y * scale, false, name, drawText && (intv === 1 || (intv > 1 && nIdx % intv === 0)));
            nIdx++;
        });
    },

    _drawSingleNode(ctx, px, py, isStart, name, showText) {
        ctx.beginPath(); ctx.arc(px, py, this.CONFIG.canvas.nodeRadius, 0, Math.PI * 2); ctx.fillStyle = isStart ? this.CONFIG.colors.startNode : this.CONFIG.colors.normalNode; ctx.fill(); ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1.5; ctx.stroke();
        if (showText) { ctx.fillStyle = this.CONFIG.colors.text; ctx.font = '12px sans-serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'; ctx.fillText(name, px + 8, py - 8); }
    },

    _drawLabels(ctx, offsetX, offsetY, scale, detectedAreas) {
        detectedAreas.forEach((a, i) => {
            const l1 = `区画 ${i + 1}`, l2 = `${Utils.round4(a.netArea / 10000)}ha`, px = offsetX + a.center.x * scale, py = offsetY - a.center.y * scale;
            ctx.font = 'bold 12px sans-serif'; const bw = Math.max(ctx.measureText(l1).width, ctx.measureText(l2).width) + 12, bh = 32;
            ctx.fillStyle = this.CONFIG.colors.labelBg; ctx.fillRect(px - bw/2, py - bh/2, bw, bh); ctx.strokeStyle = '#217270'; ctx.lineWidth = 1; ctx.strokeRect(px - bw/2, py - bh/2, bw, bh);
            ctx.fillStyle = '#217270'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(l1, px, py - 6); ctx.fillText(l2, px, py + 8);
            
            if (a.isDonut) a.holes.forEach(h => {
                const hl1 = `除地 ${h.globalIndex}`, hl2 = `${Utils.round4(h.area / 10000)}ha`, hpx = offsetX + h.center.x * scale, hpy = offsetY - h.center.y * scale;
                ctx.font = 'bold 11px sans-serif'; const hbw = Math.max(ctx.measureText(hl1).width, ctx.measureText(hl2).width) + 12, hbh = 30;
                ctx.fillStyle = this.CONFIG.colors.labelBg; ctx.fillRect(hpx - hbw/2, hpy - hbh/2, hbw, hbh); ctx.strokeStyle = '#A13D44'; ctx.lineWidth = 1; ctx.strokeRect(hpx - hbw/2, hpy - hbh/2, hbw, hbh);
                ctx.fillStyle = '#A13D44'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(hl1, hpx, hpy - 5); ctx.fillText(hl2, hpx, hpy + 7);
            });
        });
    },

    _drawGrid(ctx, offsetX, offsetY, scale) {
        const gs = this.CONFIG.canvas.gridBaseSize * scale; if (gs < 10 || gs > 500) return;
        ctx.strokeStyle = this.CONFIG.colors.gridSub; ctx.lineWidth = 1;
        const sx = Math.floor((-offsetX) / gs) * gs, sy = Math.floor((-offsetY) / gs) * gs;
        ctx.beginPath();
        for (let x = sx; x < this.els.canvas.width - offsetX; x += gs) { ctx.moveTo(offsetX + x, 0); ctx.lineTo(offsetX + x, this.els.canvas.height); }
        for (let y = sy; y < this.els.canvas.height - offsetY; y += gs) { ctx.moveTo(0, offsetY + y); ctx.lineTo(this.els.canvas.width, offsetY + y); }
        ctx.stroke();
        ctx.beginPath(); ctx.strokeStyle = this.CONFIG.colors.gridMain; ctx.moveTo(offsetX, 0); ctx.lineTo(offsetX, this.els.canvas.height); ctx.moveTo(0, offsetY); ctx.lineTo(this.els.canvas.width, offsetY); ctx.stroke();
    },

    _drawCompassRose(ctx) {
        const r = 25, dec = this.els.chkMagDeclination.checked ? (parseFloat(this.els.inputDeclination.value) || 0) : 0;
        ctx.save(); ctx.translate(50, 50);
        ctx.beginPath(); ctx.moveTo(0, -r); ctx.lineTo(0, r); ctx.moveTo(-r, 0); ctx.lineTo(r, 0); ctx.strokeStyle = '#9ca3af'; ctx.lineWidth = 1; ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, -r - 5); ctx.lineTo(4, -r + 8); ctx.lineTo(-4, -r + 8); ctx.closePath(); ctx.fillStyle = this.CONFIG.colors.compassText; ctx.fill();
        ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'bottom'; ctx.fillText('N', 0, -r - 8);

        if (dec !== 0) {
            ctx.save(); ctx.rotate(Utils.deg2rad(-dec)); 
            ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -r); ctx.strokeStyle = this.CONFIG.colors.compassArrow; ctx.lineWidth = 2; ctx.stroke();
            ctx.beginPath(); ctx.moveTo(0, -r - 2); ctx.lineTo(3, -r + 5); ctx.lineTo(-3, -r + 5); ctx.closePath(); ctx.fillStyle = this.CONFIG.colors.compassArrow; ctx.fill();
            ctx.font = '10px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'bottom'; ctx.fillText('MN', 0, -r - 4); ctx.restore();
        }
        ctx.restore();
    },

    finishCurrentLine() {
        if (this.state.currentLine.length >= 2) {
            if (!this.state.annotations) this.state.annotations = { texts: [], lines: [] };
            
            const currentDec = this.els.chkMagDeclination.checked ? (parseFloat(this.els.inputDeclination.value) || 0) : 0;
            const rad = Utils.deg2rad(currentDec);
            const cos = Math.cos(-rad);
            const sin = Math.sin(-rad);

            const pts = this.state.currentLine.map(p => {
                const bx = p.x * cos - p.y * sin;
                const by = p.x * sin + p.y * cos;
                return { x: p.x, y: p.y, baseX: bx, baseY: by };
            });
            
            this.state.annotations.lines.push({ 
                points: pts, color: '#059669', lineWidth: 2, lineStyle: 'solid', 
                rotation: 0 
            });
            this.saveToLocalStorage(); this.pushState();
        }
        this.state.currentLine = []; this.state.view.currentMouseInternalX = undefined; this._redrawAll();
    },

    _updateLiveAnnotationDrawing() {
        if (this.isMapMode) {
            this.updateMapDrawing(false);
        } else {
            this.draw();
        }
    },

};
