export const $id = id => document.getElementById(id);
export const bindClick = (el, fn) => { if (el) el.addEventListener('click', fn); };

export const CONSTANTS = {
    LAT_DEG_PER_METER: 1 / 111111,
    PAPER_CONFIGS: {
        'A4_portrait': { w: 210, h: 296, expW: 1600, expH: 2262, paddingX: 250, paddingY: 300, shiftY: 150 },
        'A4_landscape': { w: 296, h: 210, expW: 2262, expH: 1600, paddingX: 300, paddingY: 200, shiftY: 50 },
        'A3_portrait': { w: 297, h: 420, expW: 2262, expH: 3200, paddingX: 350, paddingY: 400, shiftY: 200 },
        'A3_landscape': { w: 420, h: 297, expW: 3200, expH: 2262, paddingX: 400, paddingY: 300, shiftY: 100 },
        'A2_portrait': { w: 420, h: 594, expW: 3200, expH: 4526, paddingX: 500, paddingY: 600, shiftY: 300 },
        'A2_landscape': { w: 594, h: 420, expW: 4526, expH: 3200, paddingX: 600, paddingY: 500, shiftY: 200 },
        'A1_portrait': { w: 594, h: 841, expW: 4526, expH: 6408, paddingX: 700, paddingY: 800, shiftY: 400 },
        'A1_landscape': { w: 841, h: 594, expW: 6408, expH: 4526, paddingX: 800, paddingY: 700, shiftY: 300 },
        'A0_portrait': { w: 841, h: 1189, expW: 6408, expH: 9060, paddingX: 1000, paddingY: 1100, shiftY: 550 },
        'A0_landscape': { w: 1189, h: 841, expW: 9060, expH: 6408, paddingX: 1100, paddingY: 1000, shiftY: 450 }
    }
};

export const Utils = {
    deg2rad: (deg) => deg * (Math.PI / 180),
    round4: (val) => (Math.round((val + Number.EPSILON) * 10000) / 10000).toFixed(4),
    parseDMS: (str) => {
        const matches = str.match(/-?\d+(\.\d+)?/g);
        if (!matches || matches.length < 3) return null;
        const sign = parseFloat(matches[0]) < 0 ? -1 : 1;
        return sign * (Math.abs(parseFloat(matches[0])) + parseFloat(matches[1])/60 + parseFloat(matches[2])/3600);
    },
    calculatePolygonArea: (points) => {
        if (points.length < 3) return 0;
        let area = 0;
        for (let i = 0; i < points.length; i++) {
            let j = (i + 1) % points.length;
            area += points[i].x * points[j].y - points[j].x * points[i].y;
        }
        return Math.abs(area / 2);
    },
    isPointInPolygon: (point, vs) => {
        let x = point[0], y = point[1];
        let inside = false;
        for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
            let xi = vs[i][0], yi = vs[i][1];
            let xj = vs[j][0], yj = vs[j][1];
            let intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
        return inside;
    },
    calculateMagDeclination: (lat, lon) => {
        const dPhi = lat - 37.0;
        const dLam = lon - 138.0;
        const dMin = 501.0 + 22.31 * dPhi - 7.85 * dLam + 0.54 * Math.pow(dPhi, 2) - 0.70 * dPhi * dLam - 0.14 * Math.pow(dLam, 2);
        return (dMin / 60.0);
    },
    estimateTextWidth: (text, fontSize) => {
        let width = 0;
        for (let i = 0; i < text.length; i++) { width += (text.charCodeAt(i) > 255) ? fontSize : fontSize * 0.6; }
        return width;
    },
    pointToLineDistance: (p, p1, p2) => {
        const l2 = Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2);
        if (l2 === 0) return Math.sqrt(Math.pow(p.x - p1.x, 2) + Math.pow(p.y - p1.y, 2));
        let t = ((p.x - p1.x) * (p2.x - p1.x) + (p.y - p1.y) * (p2.y - p1.y)) / l2;
        t = Math.max(0, Math.min(1, t));
        return Math.sqrt(Math.pow(p.x - (p1.x + t * (p2.x - p1.x)), 2) + Math.pow(p.y - (p1.y + t * (p2.y - p1.y)), 2));
    }
};
