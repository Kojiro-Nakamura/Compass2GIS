import { Utils, CONSTANTS } from "./utils.js";

export const mapView = {
    initMap() {
        if (this.map) return;
        const lat0 = parseFloat(this.els.inputLat.value) || 35.0, lon0 = parseFloat(this.els.inputLon.value) || 135.0;
        this.map = L.map('mapContainer', { maxZoom: 24 }).setView([lat0, lon0], 16);
        const to = { maxNativeZoom: 18, maxZoom: 24, attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>" };
        const std = L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', to), photo = L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg', to), pale = L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png', to);
        std.addTo(this.map); L.control.layers({"標準地図": std, "写真（オルソ）": photo, "淡色地図": pale}).addTo(this.map);
        this.mapLayerGroup = L.featureGroup().addTo(this.map);
        this.tempLineLayer = L.polyline([], { color: '#059669', weight: 2, dashArray: '6, 6', interactive: false }).addTo(this.map);

        this.map.on('click', (e) => this.handleMapClick(e));
        this.map.on('dragstart', () => document.body.classList.add('left-dragging'));
        this.map.on('dragend', () => document.body.classList.remove('left-dragging'));
        this.map.on('contextmenu', (e) => { e.originalEvent.preventDefault(); if (this.state.mapView.rightDragMoved) return; if (this.state.interactionMode === 'line') this.finishCurrentLine(); });

        this.els.mapContainer.addEventListener('mousedown', (e) => {
            if (e.button === 2) {
                this.state.mapView.isRightDragging = true; this.state.mapView.rightDragMoved = false;
                this.state.mapView.dragStartX = this.state.mapView.lastMouseX = e.clientX; this.state.mapView.dragStartY = this.state.mapView.lastMouseY = e.clientY;
                document.body.classList.add('right-dragging');
            }
        });
    },

    handleMapClick(e) {
        if (['pan', 'erase', 'select'].includes(this.state.interactionMode)) { if (this.state.interactionMode === 'select') this._clearSelection(); return; }
        const coords = this.getInternalCoordsFromLatLng(e.latlng.lat, e.latlng.lng);
        if (this.state.interactionMode === 'text') this._showTextPrompt(coords.x, coords.y);
        else if (this.state.interactionMode === 'line') { this.state.currentLine.push({ x: coords.x, y: coords.y }); this.state.view.currentMouseInternalX = coords.x; this.state.view.currentMouseInternalY = coords.y; this._redrawAll(); }
    },

    _updateMapTempLine() {
        if (!this.tempLineLayer) return;
        if (this.state.interactionMode === 'line' && this.state.currentLine.length > 0) {
            const lat0 = parseFloat(this.els.inputLat.value) || 0, lon0 = parseFloat(this.els.inputLon.value) || 0, lonDPM = CONSTANTS.LAT_DEG_PER_METER / Math.cos(Utils.deg2rad(lat0));
            const latlngs = this.state.currentLine.map(pt => [lat0 + pt.y * CONSTANTS.LAT_DEG_PER_METER, lon0 + pt.x * lonDPM]);
            if (this.state.view.currentMouseInternalX !== undefined) latlngs.push([lat0 + this.state.view.currentMouseInternalY * CONSTANTS.LAT_DEG_PER_METER, lon0 + this.state.view.currentMouseInternalX * lonDPM]);
            this.tempLineLayer.setLatLngs(latlngs);
        } else { this.tempLineLayer.setLatLngs([]); }
    },

    toggleMapMode() {
        this.isMapMode = !this.isMapMode;
        if (this.isMapMode) {
            this.els.mapContainer.style.display = 'block'; this.els.btnToggleMap.textContent = '✏️ 図面ビュー'; this.els.btnToggleMap.classList.add('active-map');
            if (!this.map) this.initMap(); this.map.dragging.enable();
            setTimeout(() => { this.map.invalidateSize(); this.updateMapDrawing(true); this._updateMapTempLine(); }, 100);
        } else {
            this.els.mapContainer.style.display = 'none'; this.els.btnToggleMap.textContent = '🗺️ 地図ビュー'; this.els.btnToggleMap.classList.remove('active-map');
            this.resizeCanvas(); this.updateDrawing(true);
        }
    },

    updateMapDrawing(fit = false) {
        if (!this.map || !this.mapLayerGroup) return;
        this.mapLayerGroup.clearLayers();
        const lat0 = parseFloat(this.els.inputLat.value), lon0 = parseFloat(this.els.inputLon.value); if (isNaN(lat0) || isNaN(lon0)) return;
        const lonDPM = CONSTANTS.LAT_DEG_PER_METER / Math.cos(Utils.deg2rad(lat0));

        this._drawMapAreas(lat0, lon0, lonDPM); this._drawMapLines(lat0, lon0, lonDPM); this._drawMapNodesAndLabels(lat0, lon0, lonDPM); this._drawMapAnnotations(lat0, lon0, lonDPM);

        if (fit) {
            if (this.mapLayerGroup.getLayers().length > 0) this.map.fitBounds(this.mapLayerGroup.getBounds(), { padding: [50, 50] });
            else this.map.setView([lat0, lon0], 16);
        }
    },

    _getRotLatLng(pt, cx, cy, rot) {
        const lat0 = parseFloat(this.els.inputLat.value) || 0, lon0 = parseFloat(this.els.inputLon.value) || 0;
        const lonDPM = CONSTANTS.LAT_DEG_PER_METER / Math.cos(Utils.deg2rad(lat0));
        const dx = pt.x - cx, dy = pt.y - cy, cos = Math.cos(rot), sin = Math.sin(rot);
        return [lat0 + (cy - dx * sin + dy * cos) * CONSTANTS.LAT_DEG_PER_METER, lon0 + (cx + dx * cos + dy * sin) * lonDPM];
    },

    _drawMapAnnotations(lat0, lon0, lonDPM) {
        const selected = this.state.selectedAnnotation;

        (this.state.annotations?.lines || []).forEach((line, i) => {
            const rot = line.rotation || 0;
            let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
            line.points.forEach(p => { if(p.x<minX)minX=p.x; if(p.x>maxX)maxX=p.x; if(p.y<minY)minY=p.y; if(p.y>maxY)maxY=p.y; });
            const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2, coords = line.points.map(pt => this._getRotLatLng(pt, cx, cy, rot));
            const weight = line.lineWidth || 3, color = line.color || '#059669', isSel = selected?.type === 'line' && selected?.index === i;
            let dashArray = null; if (line.lineStyle === 'dashed') dashArray = '8, 6'; else if (line.lineStyle === 'dotted') dashArray = '2, 4';

            let highlightPolyline = null, handleLine = null, cLatLng = null, handleInternalY = 0, hMarker = null;

            if (isSel) {
                highlightPolyline = L.polyline(coords, { color: '#3b82f6', weight: weight + 8, opacity: 0.4, interactive: false }).addTo(this.mapLayerGroup);
                cLatLng = this._getRotLatLng({x: cx, y: cy}, cx, cy, rot);
                
                const pxOffset = 20;
                const internalOffset = this._getPixelsToInternalDistance(pxOffset);
                handleInternalY = maxY + internalOffset;
                
                const topLatLng = this._getRotLatLng({x: cx, y: handleInternalY}, cx, cy, rot);
                handleLine = L.polyline([cLatLng, topLatLng], { color: '#3b82f6', weight: 2, interactive: false }).addTo(this.mapLayerGroup);
            }

            const polyline = L.polyline(coords, { color, weight, dashArray, opacity: 0.9, interactive: true, className: 'leaflet-interactive no-select-text' }).addTo(this.mapLayerGroup);

            if (isSel) {
                const topLatLng = this._getRotLatLng({x: cx, y: handleInternalY}, cx, cy, rot);
                hMarker = L.marker(topLatLng, { 
                    icon: L.divIcon({ className: 'map-rotate-handle', html: '<div style="width:12px;height:12px;background:#fff;border:2px solid #3b82f6;border-radius:50%;cursor:grab;margin:-6px 0 0 -6px;pointer-events:auto;"></div>', iconSize: [0, 0] }), 
                    draggable: false, 
                    zIndexOffset: 1000 
                }).addTo(this.mapLayerGroup);
                
                hMarker.on('mouseover', () => document.body.classList.add('hovering-handle'));
                hMarker.on('mouseout', () => document.body.classList.remove('hovering-handle'));
                hMarker.on('mousedown', (e) => { 
                    L.DomEvent.stopPropagation(e);
                    L.DomEvent.preventDefault(e.originalEvent);
                    this.map.dragging.disable();
                    
                    this.state.view.isRotating = true;
                    this.state.view.rotatingTarget = { type: 'line', index: i, ref: line };
                    
                    const rect = this.els.mapContainer.getBoundingClientRect();
                    const mX = e.originalEvent.clientX - rect.left;
                    const mY = e.originalEvent.clientY - rect.top;
                    const point = L.point(mX, mY);
                    const latlng = this.map.containerPointToLatLng(point);
                    const im = this.getInternalCoordsFromLatLng(latlng.lat, latlng.lng);
                    this.state.view.dragStartInternalX = im.x;
                    this.state.view.dragStartInternalY = im.y;
                    this.state.view.dragStartX = e.originalEvent.clientX;
                    this.state.view.dragStartY = e.originalEvent.clientY;
                    
                    this.state.view.movingLayer = polyline;
                    this.state.view.movingExtras = { highlightPolyline, handleLine, hMarker };

                    document.body.classList.add('left-dragging');
                });
            }

            polyline.on('mouseover', () => {
                if (['select', 'erase'].includes(this.state.interactionMode)) {
                    document.body.classList.add('hovering-annotation');
                    if (!isSel) polyline.setStyle({ color: '#3b82f6', weight: weight + 4, opacity: 0.6 });
                }
            });
            polyline.on('mouseout', () => {
                document.body.classList.remove('hovering-annotation');
                if (!isSel) polyline.setStyle({ color, weight, dashArray, opacity: 0.9 });
            });
            polyline.on('mousedown', (e) => {
                if (this.state.interactionMode === 'select') {
                    L.DomEvent.stopPropagation(e);
                    L.DomEvent.preventDefault(e.originalEvent); // ネイティブドラッグを防止
                    this.map.dragging.disable();
                    
                    document.body.classList.add('left-dragging'); // クリックした瞬間にグーにする

                    this._selectAnnotation({ type: 'line', index: i, ref: line });
                    this.state.view.isMovingAnnotation = true;
                    this.state.view.movingTarget = { type: 'line', index: i, ref: line };
                    this.state.view.movingLayer = polyline;
                    
                    // 初期状態を記録
                    this.state.view.movingInitialState = JSON.parse(JSON.stringify(line));
                    
                    const rect = this.els.mapContainer.getBoundingClientRect();
                    const mX = e.originalEvent.clientX - rect.left;
                    const mY = e.originalEvent.clientY - rect.top;
                    const point = L.point(mX, mY);
                    const latlng = this.map.containerPointToLatLng(point);
                    const im = this.getInternalCoordsFromLatLng(latlng.lat, latlng.lng);
                    this.state.view.dragStartInternalX = im.x;
                    this.state.view.dragStartInternalY = im.y;
                    
                    this.state.view.dragStartX = e.originalEvent.clientX;
                    this.state.view.dragStartY = e.originalEvent.clientY;

                    if (isSel && highlightPolyline && handleLine && hMarker) {
                        this.state.view.movingExtras = { highlightPolyline, handleLine, hMarker };
                    } else {
                        this.state.view.movingExtras = null;
                    }
                    this.state.view.lastInternalX = im.x;
                    this.state.view.lastInternalY = im.y;
                    this.state.view.dragMoved = false;
                }
            });
            polyline.on('click', (e) => { L.DomEvent.stopPropagation(e); if (this.state.interactionMode === 'erase') { this.state.annotations.lines.splice(i, 1); this.saveToLocalStorage(); this.pushState(); this._redrawAll(); } });
            polyline.on('contextmenu', (e) => { if (this.state.interactionMode === 'line') { L.DomEvent.stopPropagation(e); this.finishCurrentLine(); } });
        });

        (this.state.annotations?.texts || []).forEach((t, i) => {
            const bs = t.fontSize || 14;
            const cx = t.x, cy = t.y; 
            const cLatLng = this._getRotLatLng({x: cx, y: cy}, cx, cy, 0), isSel = selected?.type === 'text' && selected?.index === i;
            const hlStyle = isSel ? `border: 1px solid #3b82f6; background: rgba(59, 130, 246, 0.15); margin-left:-2px; padding:0 2px;` : '';
            
            const marker = L.marker(cLatLng, { icon: L.divIcon({ className: 'map-annotation-label', html: `<div style="transform: rotate(${(t.rotation || 0) * 180 / Math.PI}deg) translate(-50%, -50%); transform-origin: 0 0; position: absolute; user-select: none; -webkit-user-select: none;"><div draggable="false" style="${hlStyle} color: ${t.color || '#059669'}; font-weight: bold; font-size: ${bs}px; text-shadow: 1px 1px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff; white-space: nowrap; pointer-events: auto; transition: background-color 0.1s, border 0.1s; user-select: none; -webkit-user-select: none;">${t.text}</div></div>`, iconSize: [0, 0], iconAnchor: [0, 0] }), interactive: true }).addTo(this.mapLayerGroup);
            
            let handleLine = null, hMarker = null;

            if (isSel) {
                const pxOffset = bs / 2 + 20;
                const internalOffset = this._getPixelsToInternalDistance(pxOffset);
                const handleInternalY = cy + internalOffset;
                
                const topLatLng = this._getRotLatLng({x: cx, y: handleInternalY}, cx, cy, t.rotation || 0);
                handleLine = L.polyline([cLatLng, topLatLng], { color: '#3b82f6', weight: 2, interactive: false }).addTo(this.mapLayerGroup);
                hMarker = L.marker(topLatLng, { 
                    icon: L.divIcon({ className: 'map-rotate-handle', html: '<div style="width:12px;height:12px;background:#fff;border:2px solid #3b82f6;border-radius:50%;cursor:grab;margin:-6px 0 0 -6px;pointer-events:auto;"></div>', iconSize: [0, 0] }), 
                    draggable: false, 
                    zIndexOffset: 1000 
                }).addTo(this.mapLayerGroup);
                
                hMarker.on('mouseover', () => document.body.classList.add('hovering-handle'));
                hMarker.on('mouseout', () => document.body.classList.remove('hovering-handle'));
                hMarker.on('mousedown', (e) => { 
                    L.DomEvent.stopPropagation(e);
                    L.DomEvent.preventDefault(e.originalEvent);
                    this.map.dragging.disable();
                    
                    this.state.view.isRotating = true;
                    this.state.view.rotatingTarget = { type: 'text', index: i, ref: t };
                    
                    const rect = this.els.mapContainer.getBoundingClientRect();
                    const mX = e.originalEvent.clientX - rect.left;
                    const mY = e.originalEvent.clientY - rect.top;
                    const point = L.point(mX, mY);
                    const latlng = this.map.containerPointToLatLng(point);
                    const im = this.getInternalCoordsFromLatLng(latlng.lat, latlng.lng);
                    this.state.view.dragStartInternalX = im.x;
                    this.state.view.dragStartInternalY = im.y;
                    this.state.view.dragStartX = e.originalEvent.clientX;
                    this.state.view.dragStartY = e.originalEvent.clientY;
                    
                    this.state.view.movingLayer = marker;
                    this.state.view.movingExtras = { handleLine, hMarker };

                    document.body.classList.add('left-dragging');
                });
            }

            marker.on('mouseover', () => {
                if (['select', 'erase'].includes(this.state.interactionMode)) {
                    document.body.classList.add('hovering-annotation');
                    if (!isSel) {
                        const el = marker.getElement()?.querySelector('div > div');
                        if (el) { el.style.border = '1px dashed rgba(59, 130, 246, 0.6)'; el.style.background = 'rgba(59, 130, 246, 0.08)'; el.style.marginLeft = '-2px'; el.style.padding = '0 2px'; }
                    }
                }
            });
            marker.on('mouseout', () => {
                document.body.classList.remove('hovering-annotation');
                if (!isSel) {
                    const el = marker.getElement()?.querySelector('div > div');
                    if (el) { el.style.border = 'none'; el.style.background = 'transparent'; el.style.marginLeft = '0'; el.style.padding = '0'; }
                }
            });
            marker.on('mousedown', (e) => {
                if (this.state.interactionMode === 'select') {
                    L.DomEvent.stopPropagation(e);
                    L.DomEvent.preventDefault(e.originalEvent); // ネイティブドラッグを防止
                    this.map.dragging.disable();

                    document.body.classList.add('left-dragging'); // クリックした瞬間にグーにする

                    this._selectAnnotation({ type: 'text', index: i, ref: t });
                    this.state.view.isMovingAnnotation = true;
                    this.state.view.movingTarget = { type: 'text', index: i, ref: t };
                    this.state.view.movingLayer = marker;
                    
                    // 初期状態を記録
                    this.state.view.movingInitialState = JSON.parse(JSON.stringify(t));
                    
                    const rect = this.els.mapContainer.getBoundingClientRect();
                    const mX = e.originalEvent.clientX - rect.left;
                    const mY = e.originalEvent.clientY - rect.top;
                    const point = L.point(mX, mY);
                    const latlng = this.map.containerPointToLatLng(point);
                    const im = this.getInternalCoordsFromLatLng(latlng.lat, latlng.lng);
                    this.state.view.dragStartInternalX = im.x;
                    this.state.view.dragStartInternalY = im.y;
                    
                    this.state.view.dragStartX = e.originalEvent.clientX;
                    this.state.view.dragStartY = e.originalEvent.clientY;

                    if (isSel && handleLine && hMarker) {
                        this.state.view.movingExtras = { handleLine, hMarker };
                    } else {
                        this.state.view.movingExtras = null;
                    }
                    this.state.view.lastInternalX = im.x;
                    this.state.view.lastInternalY = im.y;
                    this.state.view.dragMoved = false;
                }
            });

            marker.on('click', (e) => { L.DomEvent.stopPropagation(e); if (this.state.interactionMode === 'erase') { this.state.annotations.texts.splice(i, 1); this.saveToLocalStorage(); this.pushState(); this._redrawAll(); } });
        });
    },

    _drawMapAreas(lat0, lon0, lonDPM) {
        this.state.detectedAreas.forEach(a => {
            const lls = [a.path.map(n => [lat0 + (this.state.nodes.get(n).y * CONSTANTS.LAT_DEG_PER_METER), lon0 + (this.state.nodes.get(n).x * lonDPM)])];
            if (a.isDonut) a.holes.forEach(h => lls.push(h.path.map(n => [lat0 + (this.state.nodes.get(n).y * CONSTANTS.LAT_DEG_PER_METER), lon0 + (this.state.nodes.get(n).x * lonDPM)])));
            L.polygon(lls, { stroke: false, fillColor: '#217270', fillOpacity: 0.25, interactive: false }).addTo(this.mapLayerGroup);
        });
    },

    _drawMapLines(lat0, lon0, lonDPM) {
        this.state.points.forEach(p => {
            const coords = [[lat0 + p.fromY * CONSTANTS.LAT_DEG_PER_METER, lon0 + p.fromX * lonDPM], [lat0 + p.toY * CONSTANTS.LAT_DEG_PER_METER, lon0 + p.toX * lonDPM]];
            if (!p.isDraw) { L.polyline(coords, { color: '#9ca3af', weight: 3, opacity: 0.8, dashArray: '5, 5', interactive: false }).addTo(this.mapLayerGroup); return; }
            L.polyline(coords, { color: '#ffffff', weight: p.type === 'branch' ? 6 : 7, opacity: 0.9, lineCap: 'round', lineJoin: 'round', interactive: false }).addTo(this.mapLayerGroup);
            L.polyline(coords, { color: p.type === 'branch' ? this.CONFIG.colors.lineBranch : this.CONFIG.colors.lineMain, weight: p.type === 'branch' ? 3 : 4, opacity: 0.9, lineCap: 'round', lineJoin: 'round', interactive: false }).addTo(this.mapLayerGroup);
        });
    },

    _drawMapNodesAndLabels(lat0, lon0, lonDPM) {
        const fp = this._getFirstPointName(), intv = parseInt(this.els.selNodeLabelInterval.value, 10);
        L.circleMarker([lat0, lon0], { radius: 5, fillColor: this.CONFIG.colors.startNode, color: "#ffffff", weight: 2.5, opacity: 1, fillOpacity: 1, interactive: false }).addTo(this.mapLayerGroup).bindTooltip(fp, { permanent: true, direction: 'right', className: 'map-label', offset: [5, 0] });
        
        let nIdx = 1;
        this.state.nodes.forEach((node, name) => {
            if (name === fp && Math.abs(node.x) < 0.001 && Math.abs(node.y) < 0.001) return;
            const m = L.circleMarker([lat0 + node.y * CONSTANTS.LAT_DEG_PER_METER, lon0 + node.x * lonDPM], { radius: 5, fillColor: this.CONFIG.colors.normalNode, color: "#ffffff", weight: 2.5, opacity: 1, fillOpacity: 1, interactive: false }).addTo(this.mapLayerGroup);
            if (intv === 1 || (intv > 1 && nIdx % intv === 0)) m.bindTooltip(name, { permanent: true, direction: 'right', className: 'map-label', offset: [5, 0] });
            nIdx++;
        });

        this.state.detectedAreas.forEach((a, i) => {
            L.marker([lat0 + a.center.y * CONSTANTS.LAT_DEG_PER_METER, lon0 + a.center.x * lonDPM], { icon: L.divIcon({ className: 'map-label-container', html: `<div class="area-map-label">区画 ${i + 1}<br><span style="font-weight:normal; font-size:1em;">${Utils.round4(a.netArea / 10000)}ha</span></div>`, iconSize: [0, 0], iconAnchor: [0, 0] }), interactive: false }).addTo(this.mapLayerGroup);
            if (a.isDonut) a.holes.forEach(h => L.marker([lat0 + h.center.y * CONSTANTS.LAT_DEG_PER_METER, lon0 + h.center.x * lonDPM], { icon: L.divIcon({ className: 'map-label-container', html: `<div class="hole-map-label">除地 ${h.globalIndex}<br><span style="font-weight:normal; font-size:1em;">${Utils.round4(h.area / 10000)}ha</span></div>`, iconSize: [0, 0], iconAnchor: [0, 0] }), interactive: false }).addTo(this.mapLayerGroup));
        });
    },

};
