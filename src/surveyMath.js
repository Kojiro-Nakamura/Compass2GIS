import { Utils, CONSTANTS } from "./utils.js";

export const surveyMath = {
    calculateCoordinates() {
        const currentDec = this.els.chkMagDeclination.checked ? (parseFloat(this.els.inputDeclination.value) || 0) : 0;
        const rad = Utils.deg2rad(currentDec);
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);

        // --- Annotation Coordinates Absolute Recalculation ---
        if (this.state.annotations) {
            this.state.annotations.texts.forEach(t => {
                if (t.baseX === undefined) { 
                    const bs = t.fontSize || 14, w = Utils.estimateTextWidth(t.text, bs);
                    t.x = t.x + w / 2; 
                    t.y = t.y + bs / 2;
                    t.baseX = t.x; 
                    t.baseY = t.y; 
                    t.baseRotation = t.rotation || 0; 
                }
                
                t.x = t.baseX * cos - t.baseY * sin;
                t.y = t.baseX * sin + t.baseY * cos;
                t.rotation = t.baseRotation - rad;
            });

            this.state.annotations.lines.forEach(l => {
                l.points.forEach(p => {
                    if (p.baseX === undefined) { 
                        p.baseX = p.x; 
                        p.baseY = p.y; 
                    }
                    p.x = p.baseX * cos - p.baseY * sin;
                    p.y = p.baseX * sin + p.baseY * cos;
                });
            });
        }
        // -----------------------------------------------------

        this.state.points = []; this.state.nodes.clear();
        if (this.state.tableData.length === 0) { this.updateClosureInfo(0, 0, 0, false); this.updateBounds(); return; }

        const fp = this._getFirstPointName();
        this.state.nodes.set(fp, { x: 0, y: 0, name: fp });

        const { totalLength, mainSegments, branchSegments, isClosed } = this._parseSegments(fp);
        this.state.isClosed = isClosed;

        const errorX = mainSegments.reduce((s, seg) => s + seg.dx, 0), errorY = mainSegments.reduce((s, seg) => s + seg.dy, 0);
        this._resolveMainSegments(mainSegments, errorX, errorY, totalLength, isClosed);
        this._resolveBranchSegments(branchSegments);

        this.updateClosureInfo(errorX, errorY, totalLength, isClosed);
        this.updateBounds();
    },

    _parseSegments(firstPointName) {
        let totalLength = 0, isClosed = false;
        const mainSegments = [], branchSegments = [];

        this.state.tableData.forEach((row, i) => {
            const [fromName, toName, azStr, elStr, sdStr] = row;
            if (!fromName || !toName || azStr === '' || sdStr === '') return;

            const slopeDist = parseFloat(sdStr); if (isNaN(slopeDist)) return;
            let azDeg = parseFloat(azStr) || 0;
            const elDeg = parseFloat(elStr) || 0, dec = this.els.chkMagDeclination.checked ? (parseFloat(this.els.inputDeclination.value) || 0) : 0;
            
            azDeg -= dec;
            const hd = slopeDist * Math.cos(Utils.deg2rad(elDeg)), dx = hd * Math.sin(Utils.deg2rad(azDeg)), dy = hd * Math.cos(Utils.deg2rad(azDeg));
            const isDraw = !(row[5] === true || row[5] === 'true');
            const segment = { from: fromName, to: toName, dx, dy, hd, isDraw, input: { az: azDeg + dec, el: elDeg, sd: slopeDist, hd } };

            const isMain = (i === 0) || (!isClosed && fromName === mainSegments[mainSegments.length - 1]?.to);
            if (isMain) {
                mainSegments.push(segment); totalLength += hd;
                if (toName === firstPointName) isClosed = true;
            } else { branchSegments.push(segment); }
        });
        return { totalLength, mainSegments, branchSegments, isClosed };
    },

    _resolveMainSegments(mainSegments, errorX, errorY, totalLength, isClosed) {
        const isClosedAdj = this.els.chkCompassAdjustment.checked;
        let cX = 0, cY = 0;
        mainSegments.forEach((seg, i) => {
            let dx = seg.dx, dy = seg.dy;
            if (isClosedAdj && isClosed && totalLength > 0) { dx -= errorX * (seg.hd / totalLength); dy -= errorY * (seg.hd / totalLength); }
            cX += dx; cY += dy;
            if (isClosedAdj && isClosed && i === mainSegments.length - 1) { cX = 0; cY = 0; }
            this.state.nodes.set(seg.to, { x: cX, y: cY, name: seg.to });
            this.state.points.push({ type: 'main', fromName: seg.from, toName: seg.to, isDraw: seg.isDraw, fromX: this.state.nodes.get(seg.from).x, fromY: this.state.nodes.get(seg.from).y, toX: cX, toY: cY, input: seg.input });
        });
    },

    _resolveBranchSegments(branchSegments) {
        let unresolved = [...branchSegments], resolvedCount = -1;
        while (unresolved.length > 0 && resolvedCount !== 0) {
            resolvedCount = 0; let nextUnresolved = [];
            for (const seg of unresolved) {
                const fn = this.state.nodes.get(seg.from);
                if (fn) {
                    const en = this.state.nodes.get(seg.to), toX = en ? en.x : fn.x + seg.dx, toY = en ? en.y : fn.y + seg.dy;
                    if (!en) this.state.nodes.set(seg.to, { x: toX, y: toY, name: seg.to });
                    this.state.points.push({ type: 'branch', fromName: seg.from, toName: seg.to, isDraw: seg.isDraw, fromX: fn.x, fromY: fn.y, toX, toY, input: seg.input });
                    resolvedCount++;
                } else { nextUnresolved.push(seg); }
            }
            unresolved = nextUnresolved; 
        }
    },

    findClosedAreas() {
        if (!this.els.chkCompassAdjustment.checked) { this.state.detectedAreas = []; $id('areaResults').style.display = 'none'; return; }
        const { edges, adj } = this._buildAdjacencyGraph();
        const allFaces = this._extractFaces(edges, adj);
        const nodeToComponent = this._identifyConnectedComponents(adj);
        const finalFaces = this._removeOuterBoundary(allFaces, nodeToComponent);
        this.state.detectedAreas = this._buildPolygonHierarchy(finalFaces);
        this._renderAreaResults(this.state.detectedAreas);
    },

    _buildAdjacencyGraph() {
        const edges = new Map();
        const addEdge = (u, v) => {
            if (u === v) return;
            const id1 = `${u}|${v}`, id2 = `${v}|${u}`;
            if (!edges.has(id1) && !edges.has(id2)) edges.set(id1, {u, v});
        };
        this.state.points.forEach(p => { if (p.isDraw) addEdge(p.fromName, p.toName); });
        const adj = new Map();
        for (let [, edge] of edges) {
            const u = this.state.nodes.get(edge.u), v = this.state.nodes.get(edge.v);
            if (!u || !v) continue;
            if (!adj.has(u.name)) adj.set(u.name, []);
            if (!adj.has(v.name)) adj.set(v.name, []);
            adj.get(u.name).push({ name: v.name, angle: Math.atan2(v.y - u.y, v.x - u.x) });
            adj.get(v.name).push({ name: u.name, angle: Math.atan2(u.y - v.y, u.x - v.x) });
        }
        for (let [, neighbors] of adj) neighbors.sort((a, b) => a.angle - b.angle);
        return { edges, adj };
    },

    _extractFaces(edges, adj) {
        const visitedHalfEdges = new Set(), allFaces = [];
        const lat0 = parseFloat(this.els.inputLat.value) || 0, lon0 = parseFloat(this.els.inputLon.value) || 0;
        const lonDegPerMeter = CONSTANTS.LAT_DEG_PER_METER / Math.cos(Utils.deg2rad(lat0));

        for (let [, edge] of edges) {
            for (let he of [{from: edge.u, to: edge.v}, {from: edge.v, to: edge.u}]) {
                if (visitedHalfEdges.has(`${he.from}|${he.to}`)) continue;
                const face = []; let cU = he.from, cV = he.to, isClosed = false, steps = 0;

                while (!visitedHalfEdges.has(`${cU}|${cV}`) && steps < edges.size * 2) {
                    visitedHalfEdges.add(`${cU}|${cV}`); face.push(cU);
                    const nbs = adj.get(cV); if (!nbs) break;
                    const idx = nbs.findIndex(n => n.name === cU); if (idx === -1) break;
                    cU = cV; cV = nbs[(idx + 1) % nbs.length].name; steps++;
                    if (cU === he.from && cV === he.to) { isClosed = true; break; }
                }

                if (isClosed && face.length >= 3) {
                    let sArea = 0, cx = 0, cy = 0, perimeter = 0;
                    const pts = face.map(n => this.state.nodes.get(n)), coords = [];
                    
                    for (let i = 0; i < pts.length; i++) {
                        const p1 = pts[i], p2 = pts[(i + 1) % pts.length], a = p1.x * p2.y - p2.x * p1.y;
                        sArea += a; cx += (p1.x + p2.x) * a; cy += (p1.y + p2.y) * a;
                        coords.push([lon0 + p1.x * lonDegPerMeter, lat0 + p1.y * CONSTANTS.LAT_DEG_PER_METER]);
                        perimeter += Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
                    }
                    if (coords.length > 0) coords.push([...coords[0]]); 
                    sArea /= 2; let area = Math.abs(sArea);
                    if (area > 0.0001) {
                        allFaces.push({ path: face, area, perimeter, coords, center: {x: cx / (6 * sArea), y: cy / (6 * sArea)}, centerGeo: [lon0 + (cx / (6 * sArea)) * lonDegPerMeter, lat0 + (cy / (6 * sArea)) * CONSTANTS.LAT_DEG_PER_METER] });
                    }
                }
            }
        }
        return allFaces;
    },

    _identifyConnectedComponents(adj) {
        const comps = [], visited = new Set(), nodes = Array.from(adj.keys());
        for (const start of nodes) {
            if (!visited.has(start)) {
                const comp = new Set(), queue = [start]; visited.add(start);
                while(queue.length > 0) {
                    const u = queue.shift(); comp.add(u);
                    (adj.get(u) || []).forEach(n => { if (!visited.has(n.name)) { visited.add(n.name); queue.push(n.name); } });
                }
                comps.push(comp);
            }
        }
        const n2c = new Map();
        comps.forEach((comp, idx) => comp.forEach(n => n2c.set(n, idx)));
        return n2c;
    },

    _removeOuterBoundary(allFaces, nodeToComponent) {
        const facesByComp = new Map();
        allFaces.forEach(face => {
            face.hash = [...face.path].sort().join(',');
            const cIdx = nodeToComponent.get(face.path[0]);
            if (!facesByComp.has(cIdx)) facesByComp.set(cIdx, new Map());
            if (!facesByComp.get(cIdx).has(face.hash)) facesByComp.get(cIdx).set(face.hash, face);
        });
        const finalFaces = [];
        facesByComp.forEach(map => {
            const arr = Array.from(map.values()).sort((a, b) => b.area - a.area);
            if (arr.length === 1) finalFaces.push(arr[0]);
            else if (arr.length > 1) { for (let i = 1; i < arr.length; i++) finalFaces.push(arr[i]); }
        });
        return finalFaces.sort((a, b) => b.area - a.area);
    },

    _buildPolygonHierarchy(finalFaces) {
        const isInside = (inner, outer) => {
            if (Utils.isPointInPolygon(inner.centerGeo, outer.coords)) return true;
            for (let pt of inner.coords) {
                const isShared = outer.coords.some(op => Math.abs(op[0] - pt[0]) < 1e-8 && Math.abs(op[1] - pt[1]) < 1e-8);
                if (!isShared && Utils.isPointInPolygon(pt, outer.coords)) return true;
            }
            return false;
        };

        finalFaces.forEach((poly, i) => {
            poly.children = []; poly.parent = null;
            for (let j = i - 1; j >= 0; j--) {
                if (isInside(poly, finalFaces[j])) { poly.parent = finalFaces[j]; finalFaces[j].children.push(poly); break; }
            }
        });

        const areas = [];
        const buildAreas = (poly, depth) => {
            if (depth % 2 === 0) {
                let iArea = 0; const holes = [];
                poly.children.forEach(c => { iArea += c.area; holes.push(c); });
                poly.netArea = poly.area - iArea; poly.holes = holes; poly.isDonut = holes.length > 0;
                areas.push(poly);
            }
            poly.children.forEach(c => buildAreas(c, depth + 1));
        };
        finalFaces.filter(p => p.parent === null).forEach(root => buildAreas(root, 0));
        return areas;
    },

};
