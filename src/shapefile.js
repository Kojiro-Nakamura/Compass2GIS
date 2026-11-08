// src/shapefile.js
// Pure JS Shapefile (.shp, .shx, .dbf, .prj, .cpg) + ZIP archive generator

const WGS84_PRJ =
    'GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]]';

let _sjisEncodeMap = null;

function getSJISEncodeMap() {
    if (_sjisEncodeMap) return _sjisEncodeMap;
    _sjisEncodeMap = new Map();
    try {
        const decoder = new TextDecoder('shift-jis');
        // Decode all valid 2-byte Shift_JIS / CP932 lead + trail combinations at once
        const pairs = [];
        const coords = [];
        for (let b1 = 0x81; b1 <= 0xfc; b1++) {
            if (b1 > 0x9f && b1 < 0xe0) continue;
            for (let b2 = 0x40; b2 <= 0xfc; b2++) {
                if (b2 === 0x7f) continue;
                pairs.push(b1, b2, 0x0a); // newline separator to prevent state bleed
                coords.push([b1, b2]);
            }
        }
        const decoded = decoder.decode(new Uint8Array(pairs)).split('\n');
        for (let i = 0; i < coords.length; i++) {
            const s = decoded[i];
            if (s && s.length === 1 && s !== '\uFFFD') {
                const cp = s.codePointAt(0);
                if (!_sjisEncodeMap.has(cp)) {
                    _sjisEncodeMap.set(cp, coords[i]);
                }
            }
        }
        // Common CP932 / Windows-31J full-width compatibility aliases
        const aliases = [
            [0xff5e, [0x81, 0x60]], // ～ (Fullwidth Tilde) -> Wave Dash
            [0x301c, [0x81, 0x60]], // 〜 (Wave Dash)
            [0x2212, [0x81, 0x7c]], // − (Minus Sign)
            [0xff0d, [0x81, 0x7c]], // － (Fullwidth Hyphen-Minus)
            [0x2014, [0x81, 0x5c]], // — (Em Dash)
            [0x2015, [0x81, 0x5c]], // ― (Horizontal Bar)
            [0x2225, [0x81, 0x61]], // ∥ (Parallel To)
            [0x2016, [0x81, 0x61]], // ‖ (Double Vertical Line)
            [0xffe0, [0x81, 0x91]], // ¢
            [0xffe1, [0x81, 0x92]], // £
            [0xffe2, [0x81, 0xca]], // ¬
            [0xffe4, [0x81, 0x50]], // ￤
        ];
        for (const [cp, bytes] of aliases) {
            if (!_sjisEncodeMap.has(cp)) _sjisEncodeMap.set(cp, bytes);
        }
    } catch (e) {
        console.warn('Shift_JIS map initialization failed:', e);
    }
    return _sjisEncodeMap;
}

export function encodeText(str, encoding = 'SJIS') {
    const s = str == null ? '' : String(str);
    if (encoding === 'UTF-8') {
        return new TextEncoder().encode(s);
    }
    const map = getSJISEncodeMap();
    const out = [];
    for (const ch of s) {
        const cp = ch.codePointAt(0);
        if (cp < 0x80) {
            out.push(cp);
        } else if (cp >= 0xff61 && cp <= 0xff9f) {
            // Half-width katakana
            out.push(cp - 0xff61 + 0xa1);
        } else if (map.has(cp)) {
            const pair = map.get(cp);
            out.push(pair[0], pair[1]);
        } else {
            out.push(0x3f); // '?' fallback for unmappable characters
        }
    }
    return new Uint8Array(out);
}

/**
 * Truncates a string so its encoded byte representation does not exceed maxBytes,
 * without ever splitting a multi-byte character.
 */
export function truncateEncodedBytes(str, maxBytes, encoding = 'SJIS') {
    const s = str == null ? '' : String(str);
    const chunks = [];
    let totalLen = 0;
    let keptText = '';
    for (const ch of s) {
        const encoded = encodeText(ch, encoding);
        if (totalLen + encoded.length > maxBytes) break;
        chunks.push(encoded);
        totalLen += encoded.length;
        keptText += ch;
    }
    const out = new Uint8Array(totalLen);
    let offset = 0;
    for (const c of chunks) {
        out.set(c, offset);
        offset += c.length;
    }
    return { bytes: out, text: keptText };
}

/**
 * Ensures unique DBF field names (<= 10 encoded bytes each).
 */
function resolveDbfFieldNames(fieldDefs, encoding) {
    const usedHex = new Set();
    return fieldDefs.map((f, idx) => {
        const rawName = (f.name || f.key || `FIELD_${idx + 1}`).replace(/[\r\n\t\0]/g, '_').trim() || `FIELD_${idx + 1}`;
        let { bytes } = truncateEncodedBytes(rawName, 10, encoding);
        if (bytes.length === 0) {
            bytes = encodeText(`F_${idx + 1}`, 'UTF-8');
        }
        let hex = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
        let suffixNum = 1;
        while (usedHex.has(hex)) {
            const suffixStr = `_${suffixNum++}`;
            const suffixBytes = encodeText(suffixStr, 'UTF-8');
            const prefix = truncateEncodedBytes(rawName, Math.max(1, 10 - suffixBytes.length), encoding).bytes;
            const combined = new Uint8Array(prefix.length + suffixBytes.length);
            combined.set(prefix, 0);
            combined.set(suffixBytes, prefix.length);
            bytes = combined;
            hex = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
        }
        usedHex.add(hex);
        return { ...f, nameBytes: bytes };
    });
}

/**
 * Builds a dBASE III+ (.dbf) binary file as a Uint8Array.
 */
export function buildDbf(records, fieldDefs, encoding = 'SJIS') {
    const resolvedFields = resolveDbfFieldNames(fieldDefs, encoding).map(f => {
        if (f.type === 'N') {
            return {
                ...f,
                size: f.size || 18,
                decimals: f.decimals || 0
            };
        }
        // Character field: compute max byte length across all records (up to 254)
        let maxBytes = f.minSize || 10;
        for (const rec of records) {
            const val = rec[f.key];
            if (val != null && val !== '') {
                const len = encodeText(String(val), encoding).length;
                if (len > maxBytes) maxBytes = len;
            }
        }
        return {
            ...f,
            type: 'C',
            size: Math.min(254, maxBytes),
            decimals: 0
        };
    });

    const numRecords = records.length;
    const numFields = resolvedFields.length;
    const headerBytes = 32 + 32 * numFields + 1;
    const recordBytes = 1 + resolvedFields.reduce((sum, f) => sum + f.size, 0);
    const totalBytes = headerBytes + numRecords * recordBytes + 1;

    const buffer = new ArrayBuffer(totalBytes);
    const view = new DataView(buffer);
    const bytes = new Uint8Array(buffer);

    const now = new Date();
    view.setUint8(0, 0x03); // dBASE III+ without memo
    view.setUint8(1, now.getFullYear() - 1900);
    view.setUint8(2, now.getMonth() + 1);
    view.setUint8(3, now.getDate());
    view.setUint32(4, numRecords, true);
    view.setUint16(8, headerBytes, true);
    view.setUint16(10, recordBytes, true);
    // Language Driver ID: 0x13 = Japanese Shift-JIS (CP932), 0x00 = default/use .cpg
    view.setUint8(29, encoding === 'SJIS' ? 0x13 : 0x00);

    // Field descriptors
    resolvedFields.forEach((f, i) => {
        const base = 32 + i * 32;
        bytes.set(f.nameBytes.slice(0, 10), base); // 0..10 (byte 10 stays 0x00 terminator)
        view.setUint8(base + 11, f.type.charCodeAt(0));
        view.setUint8(base + 16, f.size);
        view.setUint8(base + 17, f.decimals);
    });

    // Header terminator
    view.setUint8(headerBytes - 1, 0x0d);

    // Records
    let offset = headerBytes;
    for (let r = 0; r < numRecords; r++) {
        const rec = records[r];
        bytes.fill(0x20, offset, offset + recordBytes); // Fill entire record with spaces (including deletion flag 0x20)
        let fieldOffset = offset + 1;

        for (const f of resolvedFields) {
            const val = rec[f.key];
            if (f.type === 'N') {
                if (val !== null && val !== undefined && val !== '' && !Number.isNaN(Number(val))) {
                    const num = Number(val);
                    const str = f.decimals > 0 ? num.toFixed(f.decimals) : String(Math.round(num));
                    const ascii = encodeText(str, 'UTF-8');
                    const copyLen = Math.min(f.size, ascii.length);
                    // Right-align numeric string within field
                    bytes.set(ascii.slice(0, copyLen), fieldOffset + (f.size - copyLen));
                }
            } else {
                if (val !== null && val !== undefined && val !== '') {
                    const { bytes: strBytes } = truncateEncodedBytes(String(val), f.size, encoding);
                    bytes.set(strBytes, fieldOffset);
                }
            }
            fieldOffset += f.size;
        }
        offset += recordBytes;
    }

    // EOF marker
    view.setUint8(totalBytes - 1, 0x1a);
    return bytes;
}

/**
 * Signed area (2x) in Cartesian (X=lon, Y=lat) plane.
 * > 0 means Counter-Clockwise (CCW)
 * < 0 means Clockwise (CW)
 */
function getRingSignedArea2(ring) {
    let sum = 0;
    for (let i = 0; i < ring.length - 1; i++) {
        const [x1, y1] = ring[i];
        const [x2, y2] = ring[i + 1];
        sum += x1 * y2 - x2 * y1;
    }
    return sum;
}

/**
 * Normalizes a polygon ring: closes it if not closed, and enforces ESRI winding order
 * (clockwise for outer ring, counter-clockwise for holes).
 */
function normalizePolygonRing(ring, isHole = false) {
    const pts = ring.map(p => [Number(p[0]), Number(p[1])]);
    if (pts.length < 3) return pts;
    const first = pts[0];
    const last = pts[pts.length - 1];
    if (first[0] !== last[0] || first[1] !== last[1]) {
        pts.push([first[0], first[1]]);
    }
    const area2 = getRingSignedArea2(pts);
    // Outer ring must be CW (area2 < 0); Hole ring must be CCW (area2 > 0)
    if (!isHole && area2 > 0) {
        pts.reverse();
    } else if (isHole && area2 < 0) {
        pts.reverse();
    }
    return pts;
}

/**
 * Builds .shp and .shx binary buffers for Point (1), PolyLine (3), or Polygon (5).
 */
export function buildShpAndShx(geometries, shapeType) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    const updateBounds = (x, y) => {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
    };

    const prepared = geometries.map(geom => {
        if (shapeType === 1) {
            const x = Number(geom[0]);
            const y = Number(geom[1]);
            updateBounds(x, y);
            return { x, y, contentWords: 10 }; // 20 bytes
        } else {
            // PolyLine (array of parts, each part is array of [x, y]) or Polygon (array of rings)
            const parts = geom.map((part, idx) =>
                shapeType === 5 ? normalizePolygonRing(part, idx > 0) : part.map(p => [Number(p[0]), Number(p[1])])
            ).filter(part => part.length >= (shapeType === 5 ? 4 : 2));

            let bMinX = Infinity, bMinY = Infinity, bMaxX = -Infinity, bMaxY = -Infinity;
            let numPoints = 0;
            for (const part of parts) {
                for (const [x, y] of part) {
                    if (x < bMinX) bMinX = x;
                    if (x > bMaxX) bMaxX = x;
                    if (y < bMinY) bMinY = y;
                    if (y > bMaxY) bMaxY = y;
                    updateBounds(x, y);
                    numPoints++;
                }
            }
            if (!Number.isFinite(bMinX)) {
                bMinX = bMinY = bMaxX = bMaxY = 0;
            }
            const numParts = parts.length;
            const contentWords = 22 + 2 * numParts + 8 * numPoints;
            return {
                parts,
                numParts,
                numPoints,
                box: [bMinX, bMinY, bMaxX, bMaxY],
                contentWords
            };
        }
    });

    if (!Number.isFinite(minX)) {
        minX = minY = maxX = maxY = 0;
    }

    const totalShpWords = 50 + prepared.reduce((sum, r) => sum + 4 + r.contentWords, 0);
    const totalShxWords = 50 + prepared.length * 4;

    const shpBuffer = new ArrayBuffer(totalShpWords * 2);
    const shxBuffer = new ArrayBuffer(totalShxWords * 2);
    const shpView = new DataView(shpBuffer);
    const shxView = new DataView(shxBuffer);

    const writeHeader = (view, fileLengthWords) => {
        view.setInt32(0, 9994, false); // Big Endian file code
        view.setInt32(24, fileLengthWords, false); // Big Endian length in 16-bit words
        view.setInt32(28, 1000, true); // Little Endian version
        view.setInt32(32, shapeType, true); // Little Endian shape type
        view.setFloat64(36, minX, true);
        view.setFloat64(44, minY, true);
        view.setFloat64(52, maxX, true);
        view.setFloat64(60, maxY, true);
    };

    writeHeader(shpView, totalShpWords);
    writeHeader(shxView, totalShxWords);

    let shpByteOffset = 100;
    let shxByteOffset = 100;

    prepared.forEach((rec, i) => {
        const recNum = i + 1;
        const offsetWords = shpByteOffset / 2;

        // .shx record (8 bytes Big Endian)
        shxView.setInt32(shxByteOffset, offsetWords, false);
        shxView.setInt32(shxByteOffset + 4, rec.contentWords, false);
        shxByteOffset += 8;

        // .shp record header (8 bytes Big Endian)
        shpView.setInt32(shpByteOffset, recNum, false);
        shpView.setInt32(shpByteOffset + 4, rec.contentWords, false);
        shpByteOffset += 8;

        // .shp record content (Little Endian)
        if (shapeType === 1) {
            shpView.setInt32(shpByteOffset, 1, true);
            shpView.setFloat64(shpByteOffset + 4, rec.x, true);
            shpView.setFloat64(shpByteOffset + 12, rec.y, true);
            shpByteOffset += 20;
        } else {
            shpView.setInt32(shpByteOffset, shapeType, true);
            shpView.setFloat64(shpByteOffset + 4, rec.box[0], true);
            shpView.setFloat64(shpByteOffset + 12, rec.box[1], true);
            shpView.setFloat64(shpByteOffset + 20, rec.box[2], true);
            shpView.setFloat64(shpByteOffset + 28, rec.box[3], true);
            shpView.setInt32(shpByteOffset + 36, rec.numParts, true);
            shpView.setInt32(shpByteOffset + 40, rec.numPoints, true);

            let partOffset = shpByteOffset + 44;
            let ptOffset = partOffset + 4 * rec.numParts;
            let ptIdx = 0;

            for (const part of rec.parts) {
                shpView.setInt32(partOffset, ptIdx, true);
                partOffset += 4;
                for (const [x, y] of part) {
                    shpView.setFloat64(ptOffset, x, true);
                    shpView.setFloat64(ptOffset + 8, y, true);
                    ptOffset += 16;
                    ptIdx++;
                }
            }
            shpByteOffset += rec.contentWords * 2;
        }
    });

    return {
        shp: new Uint8Array(shpBuffer),
        shx: new Uint8Array(shxBuffer)
    };
}

/**
 * Builds the 5-file shapefile set (.shp, .shx, .dbf, .prj, .cpg) for a single layer.
 */
export function buildShapefileLayerFiles(baseLayerName, shapeType, geometries, records, fieldDefs, encoding = 'SJIS') {
    const { shp, shx } = buildShpAndShx(geometries, shapeType);
    const dbf = buildDbf(records, fieldDefs, encoding);
    const prj = encodeText(WGS84_PRJ, 'UTF-8');
    const cpg = encodeText(encoding === 'SJIS' ? 'CP932' : 'UTF-8', 'UTF-8');

    return [
        { name: `${baseLayerName}.shp`, data: shp },
        { name: `${baseLayerName}.shx`, data: shx },
        { name: `${baseLayerName}.dbf`, data: dbf },
        { name: `${baseLayerName}.prj`, data: prj },
        { name: `${baseLayerName}.cpg`, data: cpg }
    ];
}

// --- CRC-32 & ZIP Archive Builder (Store / Uncompressed, UTF-8 filenames) ---

const _crcTable = (() => {
    const table = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
        let c = n;
        for (let k = 0; k < 8; k++) {
            c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
        }
        table[n] = c >>> 0;
    }
    return table;
})();

function crc32(bytes) {
    let c = 0xffffffff;
    for (let i = 0; i < bytes.length; i++) {
        c = _crcTable[(c ^ bytes[i]) & 0xff] ^ (c >>> 8);
    }
    return (c ^ 0xffffffff) >>> 0;
}

/**
 * Packages an array of { name: string, data: Uint8Array } into a standard .zip Uint8Array.
 */
export function buildZipArchive(files) {
    const now = new Date();
    const dosTime = ((now.getHours() & 0x1f) << 11) | ((now.getMinutes() & 0x3f) << 5) | ((now.getSeconds() >> 1) & 0x1f);
    const dosDate = (((now.getFullYear() - 1980) & 0x7f) << 9) | (((now.getMonth() + 1) & 0x0f) << 5) | (now.getDate() & 0x1f);

    const entries = files.map(f => {
        const nameBytes = new TextEncoder().encode(f.name);
        const data = f.data instanceof Uint8Array ? f.data : new Uint8Array(f.data);
        const crc = crc32(data);
        return { nameBytes, data, crc };
    });

    let localSize = 0;
    let centralSize = 0;
    for (const e of entries) {
        localSize += 30 + e.nameBytes.length + e.data.length;
        centralSize += 46 + e.nameBytes.length;
    }
    const totalSize = localSize + centralSize + 22;

    const buffer = new ArrayBuffer(totalSize);
    const view = new DataView(buffer);
    const bytes = new Uint8Array(buffer);

    let localOffset = 0;
    for (const e of entries) {
        e.localHeaderOffset = localOffset;
        view.setUint32(localOffset, 0x04034b50, true); // Local file header signature
        view.setUint16(localOffset + 4, 20, true); // Version needed to extract (2.0)
        view.setUint16(localOffset + 6, 0x0800, true); // General purpose bit flag: Bit 11 = UTF-8 filename
        view.setUint16(localOffset + 8, 0, true); // Compression method: 0 (Store)
        view.setUint16(localOffset + 10, dosTime, true);
        view.setUint16(localOffset + 12, dosDate, true);
        view.setUint32(localOffset + 14, e.crc, true);
        view.setUint32(localOffset + 18, e.data.length, true); // Compressed size
        view.setUint32(localOffset + 22, e.data.length, true); // Uncompressed size
        view.setUint16(localOffset + 26, e.nameBytes.length, true);
        view.setUint16(localOffset + 28, 0, true); // Extra field length
        bytes.set(e.nameBytes, localOffset + 30);
        bytes.set(e.data, localOffset + 30 + e.nameBytes.length);
        localOffset += 30 + e.nameBytes.length + e.data.length;
    }

    let centralOffset = localOffset;
    for (const e of entries) {
        view.setUint32(centralOffset, 0x02014b50, true); // Central directory file header signature
        view.setUint16(centralOffset + 4, 20, true); // Version made by
        view.setUint16(centralOffset + 6, 20, true); // Version needed
        view.setUint16(centralOffset + 8, 0x0800, true); // Bit 11 = UTF-8 filename
        view.setUint16(centralOffset + 10, 0, true); // Compression method: 0 (Store)
        view.setUint16(centralOffset + 12, dosTime, true);
        view.setUint16(centralOffset + 14, dosDate, true);
        view.setUint32(centralOffset + 16, e.crc, true);
        view.setUint32(centralOffset + 20, e.data.length, true);
        view.setUint32(centralOffset + 24, e.data.length, true);
        view.setUint16(centralOffset + 28, e.nameBytes.length, true);
        view.setUint16(centralOffset + 30, 0, true); // Extra field length
        view.setUint16(centralOffset + 32, 0, true); // File comment length
        view.setUint16(centralOffset + 34, 0, true); // Disk number start
        view.setUint16(centralOffset + 36, 0, true); // Internal file attributes
        view.setUint32(centralOffset + 38, 0, true); // External file attributes
        view.setUint32(centralOffset + 42, e.localHeaderOffset, true);
        bytes.set(e.nameBytes, centralOffset + 46);
        centralOffset += 46 + e.nameBytes.length;
    }

    // End of Central Directory Record (EOCD)
    view.setUint32(centralOffset, 0x06054b50, true);
    view.setUint16(centralOffset + 4, 0, true); // Number of this disk
    view.setUint16(centralOffset + 6, 0, true); // Disk where central directory starts
    view.setUint16(centralOffset + 8, entries.length, true);
    view.setUint16(centralOffset + 10, entries.length, true);
    view.setUint32(centralOffset + 12, centralSize, true);
    view.setUint32(centralOffset + 16, localSize, true);
    view.setUint16(centralOffset + 20, 0, true); // Comment length

    return bytes;
}
