import { Utils } from './utils.js';

/**
 * コンパスtoGIS (.xlsm / .xls) が作成する Microsoft Access (.mdb) ファイルを
 * ブラウザおよび Node.js 上で直接解析し、測量箇所一覧および測量データを抽出するモジュール。
 * (Jet 4.0 / Jet 3.0 対応)
 */

const JET4_SIGNATURE = 'Standard Jet DB';
const ACE_SIGNATURE = 'Standard ACE DB';

/**
 * Jet 4.0 の文字列カラム (UTF-16LE または 0xFF 0xFE 圧縮 Unicode) をデコードする
 */
function decodeJetString(bytes, isJet3 = false) {
    if (!bytes || bytes.length === 0) return '';
    if (isJet3) {
        try {
            return new TextDecoder('shift_jis').decode(bytes).replace(/\0+$/, '');
        } catch {
            return new TextDecoder('utf-8').decode(bytes).replace(/\0+$/, '');
        }
    }
    if (bytes.length >= 2 && bytes[0] === 0xff && bytes[1] === 0xfe) {
        const out = [];
        let compressed = true;
        let i = 2;
        while (i < bytes.length) {
            if (bytes[i] === 0x00) {
                compressed = !compressed;
                i += 1;
            } else if (compressed) {
                out.push(bytes[i], 0x00);
                i += 1;
            } else {
                if (i + 1 < bytes.length) {
                    out.push(bytes[i], bytes[i + 1]);
                }
                i += 2;
            }
        }
        return new TextDecoder('utf-16le').decode(new Uint8Array(out)).replace(/\0+$/, '');
    }
    return new TextDecoder('utf-16le').decode(bytes).replace(/\0+$/, '');
}

/**
 * LVAL (Long Value: OLE / Memo) ポインタからバイナリデータを復元する
 */
function readLvalBytes(buf, pageSize, rawPointer, isJet3 = false) {
    if (!rawPointer || rawPointer.length < 12) return new Uint8Array(0);
    const view = new DataView(rawPointer.buffer, rawPointer.byteOffset, rawPointer.byteLength);
    const val = view.getUint32(0, true);
    const length = val & 0x3fffffff;
    const flag = (val >>> 30) & 3;
    if (length === 0) return new Uint8Array(0);

    // Inline LVAL (0x80000000)
    if (flag === 2) {
        return rawPointer.subarray(12, Math.min(rawPointer.length, 12 + length));
    }

    let recNum = rawPointer[4];
    let pageNum = rawPointer[5] | (rawPointer[6] << 8) | (rawPointer[7] << 16);
    const recTableOffset = isJet3 ? 10 : 14;
    const offsetMask = isJet3 ? 0x07ff : 0x0fff;

    // Single-page LVAL (0x40000000)
    if (flag === 1) {
        if (pageNum <= 0 || (pageNum + 1) * pageSize > buf.length) return new Uint8Array(0);
        const page = buf.subarray(pageNum * pageSize, (pageNum + 1) * pageSize);
        const pView = new DataView(page.buffer, page.byteOffset, page.byteLength);
        const numRecs = pView.getUint16(recTableOffset - 2, true);
        if (recNum >= numRecs) return new Uint8Array(0);
        const rStart = pView.getUint16(recTableOffset + recNum * 2, true) & offsetMask;
        const rEnd = recNum === 0 ? pageSize : (pView.getUint16(recTableOffset + (recNum - 1) * 2, true) & offsetMask);
        if (rStart >= rEnd || rEnd > pageSize) return new Uint8Array(0);
        return page.subarray(rStart, Math.min(rEnd, rStart + length));
    }

    // Multi-page LVAL chain (0x00000000)
    if (flag === 0) {
        const out = new Uint8Array(length);
        let written = 0;
        let safety = 0;
        while (pageNum > 0 && written < length && safety < 2000) {
            safety++;
            if ((pageNum + 1) * pageSize > buf.length) break;
            const page = buf.subarray(pageNum * pageSize, (pageNum + 1) * pageSize);
            const pView = new DataView(page.buffer, page.byteOffset, page.byteLength);
            const numRecs = pView.getUint16(recTableOffset - 2, true);
            if (recNum >= numRecs) break;
            const rStart = pView.getUint16(recTableOffset + recNum * 2, true) & offsetMask;
            const rEnd = recNum === 0 ? pageSize : (pView.getUint16(recTableOffset + (recNum - 1) * 2, true) & offsetMask);
            if (rStart + 4 > rEnd || rEnd > pageSize) break;
            const chunk = page.subarray(rStart, rEnd);
            recNum = chunk[0];
            pageNum = chunk[1] | (chunk[2] << 8) | (chunk[3] << 16);
            const payload = chunk.subarray(4);
            const copyLen = Math.min(payload.length, length - written);
            out.set(payload.subarray(0, copyLen), written);
            written += copyLen;
        }
        return out.subarray(0, written);
    }

    return new Uint8Array(0);
}

/**
 * Uint8Array の画像バイナリ (GIF / PNG / JPEG / BMP) を Data URL に変換する
 */
function imageBytesToDataURL(bytes) {
    if (!bytes || bytes.length < 8) return null;
    let mime = null;
    let startOffset = 0;

    // GIF87a / GIF89a を検索 (先頭付近にヘッダがある場合にも対応)
    for (let i = 0; i <= Math.min(64, bytes.length - 6); i++) {
        if (
            bytes[i] === 0x47 &&
            bytes[i + 1] === 0x49 &&
            bytes[i + 2] === 0x46 &&
            bytes[i + 3] === 0x38 &&
            (bytes[i + 4] === 0x37 || bytes[i + 4] === 0x39) &&
            bytes[i + 5] === 0x61
        ) {
            mime = 'image/gif';
            startOffset = i;
            break;
        }
    }

    if (!mime) {
        if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) {
            mime = 'image/png';
        } else if (bytes[0] === 0xff && bytes[1] === 0xd8) {
            mime = 'image/jpeg';
        } else if (bytes[0] === 0x42 && bytes[1] === 0x4d) {
            mime = 'image/bmp';
        }
    }
    if (!mime) return null;

    const imgBytes = startOffset > 0 ? bytes.subarray(startOffset) : bytes;
    let binary = '';
    const chunkSize = 8192;
    for (let i = 0; i < imgBytes.length; i += chunkSize) {
        const sub = imgBytes.subarray(i, Math.min(i + chunkSize, imgBytes.length));
        binary += String.fromCharCode.apply(null, sub);
    }
    if (typeof btoa === 'function') {
        return `data:${mime};base64,${btoa(binary)}`;
    }
    return `data:${mime};base64,${Buffer.from(imgBytes).toString('base64')}`;
}

/**
 * TDEF (テーブル定義ページ: 0x02) を解析する
 */
function parseTdef(buf, pageNum, pageSize, isJet3 = false) {
    const chunks = [];
    let totalLen = 0;
    let curPage = pageNum;
    let safety = 0;

    while (curPage !== 0 && safety < 64) {
        safety++;
        if ((curPage + 1) * pageSize > buf.length) break;
        const page = buf.subarray(curPage * pageSize, (curPage + 1) * pageSize);
        if (page[0] !== 0x02) break;
        const pView = new DataView(page.buffer, page.byteOffset, page.byteLength);
        const nextPage = pView.getUint32(4, true);
        const slice = curPage === pageNum ? page : page.subarray(8);
        chunks.push(slice);
        totalLen += slice.length;
        curPage = nextPage;
    }

    if (chunks.length === 0) return null;
    const tdefBytes = new Uint8Array(totalLen);
    let offset = 0;
    for (const c of chunks) {
        tdefBytes.set(c, offset);
        offset += c.length;
    }

    const view = new DataView(tdefBytes.buffer, tdefBytes.byteOffset, tdefBytes.byteLength);

    if (isJet3) {
        const numRows = view.getUint32(12, true);
        const tableType = tdefBytes[20];
        const maxCols = view.getUint16(21, true);
        const numVarCols = view.getUint16(23, true);
        const numCols = view.getUint16(25, true);
        const numRealIdx = view.getUint32(31, true);
        let pos = 43 + numRealIdx * 8;
        const cols = [];
        for (let c = 0; c < numCols; c++) {
            if (pos + 18 > tdefBytes.length) break;
            const colType = tdefBytes[pos];
            const colId = view.getUint16(pos + 1, true);
            const varColNum = view.getUint16(pos + 3, true);
            const colNum = view.getUint16(pos + 5, true);
            const flags = tdefBytes[pos + 9];
            const fixedOffset = view.getUint16(pos + 14, true);
            const colLen = view.getUint16(pos + 16, true);
            cols.push({
                type: colType,
                id: colId,
                varColNum,
                colNum,
                flags,
                isFixed: Boolean(flags & 1),
                fixedOffset,
                len: colLen,
                name: ''
            });
            pos += 18;
        }
        for (let c = 0; c < cols.length; c++) {
            if (pos >= tdefBytes.length) break;
            const nameLen = tdefBytes[pos];
            pos += 1;
            cols[c].name = decodeJetString(tdefBytes.subarray(pos, pos + nameLen), true);
            pos += nameLen;
        }
        return { page: pageNum, numRows, tableType, maxCols, numVarCols, cols };
    }

    // Jet 4.0 / ACE
    const numRows = view.getUint32(16, true);
    const tableType = tdefBytes[40];
    const maxCols = view.getUint16(41, true);
    const numVarCols = view.getUint16(43, true);
    const numCols = view.getUint16(45, true);
    const numRealIdx = view.getUint32(51, true);

    let pos = 63 + numRealIdx * 12;
    const cols = [];
    for (let c = 0; c < numCols; c++) {
        if (pos + 25 > tdefBytes.length) break;
        const colType = tdefBytes[pos];
        const colId = view.getUint16(pos + 5, true);
        const varColNum = view.getUint16(pos + 7, true);
        const colNum = view.getUint16(pos + 9, true);
        const flags = tdefBytes[pos + 15];
        const fixedOffset = view.getUint16(pos + 21, true);
        const colLen = view.getUint16(pos + 23, true);
        cols.push({
            type: colType,
            id: colId,
            varColNum,
            colNum,
            flags,
            isFixed: Boolean(flags & 1),
            fixedOffset,
            len: colLen,
            name: ''
        });
        pos += 25;
    }

    for (let c = 0; c < cols.length; c++) {
        if (pos + 2 > tdefBytes.length) break;
        const nameLen = view.getUint16(pos, true);
        pos += 2;
        cols[c].name = decodeJetString(tdefBytes.subarray(pos, pos + nameLen), false);
        pos += nameLen;
    }

    return { page: pageNum, numRows, tableType, maxCols, numVarCols, cols };
}

/**
 * 指定された TDEF に属するすべてのデータページ (0x01) から行データを読み取る
 */
function readTableRows(buf, tdef, pageSize, isJet3 = false) {
    if (!tdef) return [];
    const totalPages = Math.floor(buf.length / pageSize);
    const rows = [];
    const recTableOffset = isJet3 ? 10 : 14;
    const offsetMask = isJet3 ? 0x07ff : 0x0fff;
    const headerFixedStart = isJet3 ? 1 : 2;

    for (let p = 0; p < totalPages; p++) {
        const page = buf.subarray(p * pageSize, (p + 1) * pageSize);
        if (page[0] !== 0x01) continue;
        const pView = new DataView(page.buffer, page.byteOffset, page.byteLength);
        const owner = pView.getUint32(4, true);
        if (owner !== tdef.page) continue;

        const numRecs = pView.getUint16(recTableOffset - 2, true);
        for (let r = 0; r < numRecs; r++) {
            const recOff = pView.getUint16(recTableOffset + r * 2, true);
            // 0x8000 = deleted record, 0x4000 = overflow pointer record
            if ((recOff & 0x8000) !== 0 || (recOff & 0x4000) !== 0) continue;

            const recStart = recOff & offsetMask;
            const recEnd = r === 0 ? pageSize : (pView.getUint16(recTableOffset + (r - 1) * 2, true) & offsetMask);
            if (recStart >= recEnd || recEnd > pageSize) continue;

            const rec = page.subarray(recStart, recEnd);
            if (rec.length < headerFixedStart) continue;
            const rView = new DataView(rec.buffer, rec.byteOffset, rec.byteLength);

            const numColsInRow = isJet3 ? rec[0] : rView.getUint16(0, true);
            const nullMaskLen = Math.ceil(numColsInRow / 8);
            if (rec.length < headerFixedStart + nullMaskLen) continue;
            const nullMask = rec.subarray(rec.length - nullMaskLen);
            const varEnd = rec.length - nullMaskLen;

            let numVar = 0;
            const varOffsets = [];
            if (tdef.numVarCols > 0) {
                if (isJet3) {
                    if (varEnd >= 1) {
                        numVar = rec[varEnd - 1];
                        const numJumps = Math.floor((rec.length - nullMaskLen - 1) / 256);
                        let jumpIdx = 0;
                        let hiByte = 0;
                        for (let v = 0; v <= numVar; v++) {
                            const offPos = varEnd - 2 - numJumps - v;
                            if (offPos >= headerFixedStart) {
                                if (jumpIdx < numJumps && rec[varEnd - 2 - jumpIdx] === v) {
                                    hiByte += 0x100;
                                    jumpIdx++;
                                }
                                varOffsets.push(hiByte | rec[offPos]);
                            }
                        }
                    }
                } else if (varEnd >= 2) {
                    numVar = rView.getUint16(varEnd - 2, true);
                    for (let v = 0; v <= numVar; v++) {
                        const offPos = varEnd - 4 - v * 2;
                        if (offPos >= headerFixedStart) {
                            varOffsets.push(rView.getUint16(offPos, true));
                        }
                    }
                }
            }

            const rowObj = {};
            for (const c of tdef.cols) {
                const cid = c.colNum;
                let isNotNull = false;
                if (cid < numColsInRow) {
                    const byteIdx = cid >> 3;
                    const bitIdx = cid & 7;
                    if (byteIdx < nullMask.length) {
                        isNotNull = (nullMask[byteIdx] & (1 << bitIdx)) !== 0;
                    }
                }

                // Boolean (0x01) is stored directly in nullMask
                if (c.type === 0x01) {
                    rowObj[c.name] = isNotNull;
                    continue;
                }
                if (!isNotNull) {
                    rowObj[c.name] = null;
                    continue;
                }

                if (c.isFixed) {
                    const off = headerFixedStart + c.fixedOffset;
                    if (off + c.len > rec.length) {
                        rowObj[c.name] = null;
                        continue;
                    }
                    if (c.type === 0x02) {
                        rowObj[c.name] = rec[off];
                    } else if (c.type === 0x03) {
                        rowObj[c.name] = rView.getInt16(off, true);
                    } else if (c.type === 0x04) {
                        rowObj[c.name] = rView.getInt32(off, true);
                    } else if (c.type === 0x06) {
                        rowObj[c.name] = rView.getFloat32(off, true);
                    } else if (c.type === 0x07 || c.type === 0x08) {
                        rowObj[c.name] = rView.getFloat64(off, true);
                    } else {
                        rowObj[c.name] = null;
                    }
                } else {
                    const vIdx = c.varColNum;
                    if (vIdx < numVar && vIdx + 1 < varOffsets.length) {
                        const vStart = varOffsets[vIdx] & 0xffff;
                        const vEnd = varOffsets[vIdx + 1] & 0xffff;
                        if (vStart <= vEnd && vEnd <= rec.length) {
                            const raw = rec.subarray(vStart, vEnd);
                            if (c.type === 0x0a) {
                                rowObj[c.name] = decodeJetString(raw, isJet3);
                            } else if (c.type === 0x0c) {
                                const lvalBytes = readLvalBytes(buf, pageSize, raw, isJet3);
                                rowObj[c.name] = decodeJetString(lvalBytes, isJet3);
                            } else if (c.type === 0x0b) {
                                rowObj[c.name] = readLvalBytes(buf, pageSize, raw, isJet3);
                            } else {
                                rowObj[c.name] = raw;
                            }
                        } else {
                            rowObj[c.name] = null;
                        }
                    } else {
                        rowObj[c.name] = null;
                    }
                }
            }
            rows.push(rowObj);
        }
    }
    return rows;
}

/**
 * 測点名から次の測点名を自動生成する (開放トラバース終端用)
 */
function nextPointName(prevName) {
    if (!prevName || /^b\.?p\.?$/i.test(prevName)) return '1';
    if (/^(\d+)$/.test(prevName)) return `${parseInt(prevName, 10) + 1}`;
    if (/^No\.?\s*(\d+)$/i.test(prevName)) return `No.${parseInt(prevName.match(/\d+/)[0], 10) + 1}`;
    if (/^T-?\s*(\d+)$/i.test(prevName)) return `T-${parseInt(prevName.match(/\d+/)[0], 10) + 1}`;
    return 'EP';
}

/**
 * T_測量箇所レコードから Compass2GIS 用の属性配列 [{ name, value }, ...] を生成する
 */
function buildAttributesFromKasho(kasho) {
    const isZourin = kasho['造林治山'] !== false;
    // コンパスtoGIS.xlsm の造林 / 治山ラベル対応表
    const fieldMap = isZourin
        ? [
              { col: '年度', label: '年度' },
              { col: '番号', label: '番号' },
              { col: '事業', label: '事業' },
              { col: '事業区分', label: '事業区分' },
              { col: '事業主体', label: '事業主体' },
              { col: '作業種', label: '作業種' },
              { col: '搬出量', label: '搬出量' },
              { col: '樹種', label: '樹種' },
              { col: '林齢', label: '林齢' },
              { col: '所有者', label: '所有者名' },
              { col: '代理申請者', label: '代理申請者' },
              { col: '所在地', label: '所在地' },
              { col: '小班', label: '小班' },
              { col: '備考', label: '備考' },
              { col: '測量者氏名', label: '測量者氏名' }
          ]
        : [
              { col: '年度', label: '年度' },
              { col: '番号', label: '事業名' },
              { col: '事業', label: '工事番号' },
              { col: '事業区分', label: '工事枝番' },
              { col: '事業主体', label: '施工地名' },
              { col: '作業種', label: '工種' },
              { col: '搬出量', label: '樹種' },
              { col: '樹種', label: '間伐率％' },
              { col: '林齢', label: '成立本数' },
              { col: '所有者', label: '現成立本数' },
              { col: '代理申請者', label: '胸高直径' },
              { col: '所在地', label: '樹高' },
              { col: '小班', label: '所有者名' },
              { col: '備考', label: '備考' },
              { col: '測量者氏名', label: '測量者氏名' }
          ];

    const attrs = [];
    for (const { col, label } of fieldMap) {
        const rawVal = kasho[col];
        if (rawVal == null) continue;
        const strVal = String(rawVal).trim();
        // Excelの数式文字列 ('=IF(...)') や空文字列は除外
        if (!strVal || strVal.startsWith('=')) continue;
        attrs.push({ name: label, value: strVal });
    }

    if (attrs.length === 0 && kasho['箇所名']) {
        attrs.push({ name: '箇所名', value: String(kasho['箇所名']).trim() });
    }
    return attrs;
}

/**
 * T_測量箇所レコードと T_測量データ行リストから Compass2GIS の tableData を構築する
 */
function buildTableDataFromMdbRows(kasho, dataRows) {
    if (!dataRows || dataRows.length === 0) return [];

    // BP番号=0 (主テーブル) を優先取得
    let bp0Rows = dataRows
        .filter(r => (r['BP番号'] ?? 0) === 0)
        .sort((a, b) => (a['測点並び順'] ?? 0) - (b['測点並び順'] ?? 0));

    // 万一 BP番号=0 が空で BP番号>=1 のみ存在する場合は「表の合成」ロジックで合成
    if (bp0Rows.length === 0) {
        const bpNums = Array.from(new Set(dataRows.map(r => r['BP番号'] ?? 0))).filter(n => n > 0).sort((a, b) => a - b);
        const synthesized = [];
        for (const bpNum of bpNums) {
            const sub = dataRows
                .filter(r => r['BP番号'] === bpNum && r['斜距離'] != null && Number(r['斜距離']) > 0)
                .sort((a, b) => (a['測点並び順'] ?? 0) - (b['測点並び順'] ?? 0));
            const dir = kasho[`BP方向${bpNum}`] || '↓';
            if (dir === '↑') {
                for (let m = sub.length - 1; m >= 0; m--) {
                    const origAz = Number(sub[m]['方位角'] ?? 0);
                    const revAz = origAz < 180 ? origAz + 180 : origAz - 180;
                    const revEl = -Number(sub[m]['高低角'] ?? 0);
                    const nextPt = m + 1 < sub.length ? sub[m + 1]['測点名'] : `${synthesized.length + 1}`;
                    synthesized.push({
                        測点名: nextPt,
                        方位角: revAz,
                        高低角: revEl,
                        斜距離: sub[m]['斜距離']
                    });
                }
            } else {
                synthesized.push(...sub);
            }
        }
        bp0Rows = synthesized;
    }

    const isClosedTraverse = kasho['トラバース種別'] !== false;
    const firstStation = String(bp0Rows[0]?.['測点名'] ?? '').trim() || 'BP';
    const tableData = [];

    for (let i = 0; i < bp0Rows.length; i++) {
        const row = bp0Rows[i];
        const fromName = String(row['測点名'] ?? '').trim() || (i === 0 ? 'BP' : String(i));
        const sdNum = row['斜距離'] != null ? Number(row['斜距離']) : 0;

        // 最終行で斜距離が0または空の場合は終点名のみの行とみなす
        if (i === bp0Rows.length - 1 && (!sdNum || isNaN(sdNum))) {
            break;
        }

        let toName = '';
        if (i < bp0Rows.length - 1) {
            toName = String(bp0Rows[i + 1]['測点名'] ?? '').trim() || String(i + 1);
        } else {
            toName = isClosedTraverse ? firstStation : nextPointName(fromName);
        }

        const azStr = row['方位角'] != null ? String(Number(Number(row['方位角']).toFixed(4))) : '0';
        const elStr = row['高低角'] != null ? String(Number(Number(row['高低角']).toFixed(4))) : '0';
        const sdStr = row['斜距離'] != null ? String(Number(Number(row['斜距離']).toFixed(4))) : '0';

        tableData.push([fromName, toName, azStr, elStr, sdStr, false, true]);
    }

    return tableData;
}

/**
 * T_測量箇所から基準点(BP)の10進数緯度・経度を取得する
 */
function extractLatLonFromKasho(kasho) {
    const latDeg = Number(kasho['緯度_度'] ?? 0);
    const latMin = Number(kasho['緯度_分'] ?? 0);
    const latSec = Number(kasho['緯度_秒'] ?? 0);
    const lonDeg = Number(kasho['経度_度'] ?? 0);
    const lonMin = Number(kasho['経度_分'] ?? 0);
    const lonSec = Number(kasho['経度_秒'] ?? 0);

    if (latDeg > 0 && lonDeg > 0) {
        const lat = latDeg + latMin / 60 + latSec / 3600;
        const lon = lonDeg + lonMin / 60 + lonSec / 3600;
        return { lat: lat.toFixed(6), lon: lon.toFixed(6) };
    }

    // 測位点緯度・経度に10進数の緯度経度が直接入っている場合
    const rawLat = Number(kasho['測位点緯度'] ?? 0);
    const rawLon = Number(kasho['測位点経度'] ?? 0);
    if (rawLat >= 20 && rawLat <= 50 && rawLon >= 120 && rawLon <= 155) {
        return { lat: rawLat.toFixed(6), lon: rawLon.toFixed(6) };
    }

    return { lat: '34.097294', lon: '135.434808' };
}

/**
 * ArrayBuffer または Uint8Array の .mdb ファイルを解析し、
 * Compass2GIS のインポートアイテム配列を返す
 */
export function parseCompassMdb(buffer, sourceFileName = 'database.mdb') {
    const buf = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
    if (buf.length < 4096) {
        throw new Error('ファイルサイズが小さすぎるため、有効なMDBファイルではありません。');
    }

    const sig = new TextDecoder('ascii').decode(buf.subarray(4, 19));
    if (sig !== JET4_SIGNATURE && sig !== ACE_SIGNATURE) {
        throw new Error('Microsoft Access (Jet/ACE) データベース形式ではありません。');
    }

    const hView = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    const jetVersion = hView.getUint32(20, true);
    const isJet3 = jetVersion === 0;
    const pageSize = isJet3 ? 2048 : 4096;
    const totalPages = Math.floor(buf.length / pageSize);

    // 1. MSysObjects (Page 2) からテーブル名とTDEFページ番号を取得、または全TDEFをスキャン
    let kashoTdef = null;
    let dataTdef = null;

    const msysTdef = parseTdef(buf, 2, pageSize, isJet3);
    if (msysTdef) {
        const msysRows = readTableRows(buf, msysTdef, pageSize, isJet3);
        for (const r of msysRows) {
            if (r.Type === 1 && r.Id > 0) {
                if (r.Name === 'T_測量箇所') {
                    kashoTdef = parseTdef(buf, r.Id, pageSize, isJet3);
                } else if (r.Name === 'T_測量データ') {
                    dataTdef = parseTdef(buf, r.Id, pageSize, isJet3);
                }
            }
        }
    }

    // フォールバック: カラム名から T_測量箇所 と T_測量データ を特定
    if (!kashoTdef || !dataTdef) {
        for (let p = 2; p < totalPages; p++) {
            if (buf[p * pageSize] !== 0x02) continue;
            const t = parseTdef(buf, p, pageSize, isJet3);
            if (!t || !t.cols) continue;
            const colNames = new Set(t.cols.map(c => c.name));
            if (!kashoTdef && colNames.has('箇所ID') && colNames.has('箇所名')) {
                kashoTdef = t;
            } else if (!dataTdef && colNames.has('箇所ID') && colNames.has('測点名') && colNames.has('方位角')) {
                dataTdef = t;
            }
        }
    }

    if (!kashoTdef || !dataTdef) {
        throw new Error('MDB内に「T_測量箇所」または「T_測量データ」テーブルが見つかりませんでした。');
    }

    const kashoRows = readTableRows(buf, kashoTdef, pageSize, isJet3);
    const allDataRows = readTableRows(buf, dataTdef, pageSize, isJet3);

    // 箇所IDごとに測量データをグループ化
    const dataByKasho = new Map();
    for (const r of allDataRows) {
        const kid = r['箇所ID'];
        if (kid == null) continue;
        if (!dataByKasho.has(kid)) dataByKasho.set(kid, []);
        dataByKasho.get(kid).push(r);
    }

    // コンパスtoGIS.xlsm と同様に「箇所並び順 ASC, 箇所ID ASC」でソート
    kashoRows.sort((a, b) => {
        const orderA = a['箇所並び順'] ?? 999999;
        const orderB = b['箇所並び順'] ?? 999999;
        if (orderA !== orderB) return orderA - orderB;
        return (a['箇所ID'] ?? 0) - (b['箇所ID'] ?? 0);
    });

    const items = [];
    for (const kasho of kashoRows) {
        const kid = kasho['箇所ID'];
        const rowsForKasho = dataByKasho.get(kid) || [];
        const tableData = buildTableDataFromMdbRows(kasho, rowsForKasho);
        if (tableData.length === 0) continue;

        const attributes = buildAttributesFromKasho(kasho);
        const { lat, lon } = extractLatLonFromKasho(kasho);

        // 磁気偏角の算出 (方位回転角が設定されている場合はそれを考慮、0ならBP緯度経度から自動計算)
        const rotAngle = Number(kasho['方位回転角'] ?? 0);
        let declination = Utils.calculateMagDeclination(parseFloat(lat), parseFloat(lon)).toFixed(2);
        if (rotAngle > 0 && rotAngle < 360) {
            let md = 360 - rotAngle;
            if (md > 180) md -= 360;
            declination = md.toFixed(2);
        }

        const previewImage = imageBytesToDataURL(kasho['イメージ']);
        const kashoName = String(kasho['箇所名'] ?? '').trim() || `箇所ID ${kid}`;
        const areaVal = kasho['面積'] != null ? Number(kasho['面積']) : null;
        const areaDigits = kasho['面積桁数'] != null ? Number(kasho['面積桁数']) : 2;
        const areaText = areaVal != null && !isNaN(areaVal) ? `${areaVal.toFixed(Math.max(0, areaDigits))} ha` : '';

        items.push({
            name: kashoName,
            sourceFileName,
            kashoId: kid,
            kashoOrder: kasho['箇所並び順'],
            areaText,
            _rawKasho: kasho,
            data: {
                tableData,
                attributes,
                annotations: { texts: [], lines: [] },
                settings: {
                    lat,
                    lon,
                    declination,
                    magDeclinationChecked: true,
                    compassAdjustmentChecked: kasho['トラバース種別'] !== false,
                    convertEPtoBPChecked: true,
                    nodeLabelInterval: '5'
                },
                previewImage
            }
        });
    }

    return items;
}

/**
 * RGBA ピクセル配列 (Canvas getImageData().data) から GIF89a バイナリ (Uint8Array) を生成する
 */
export function encodeRgbaToGif89a(width, height, rgba) {
    const palette = new Uint8Array(256 * 3);
    let pIdx = 0;
    for (let r = 0; r < 6; r++) {
        for (let g = 0; g < 6; g++) {
            for (let b = 0; b < 6; b++) {
                palette[pIdx * 3] = Math.round((r * 255) / 5);
                palette[pIdx * 3 + 1] = Math.round((g * 255) / 5);
                palette[pIdx * 3 + 2] = Math.round((b * 255) / 5);
                pIdx++;
            }
        }
    }
    while (pIdx < 256) {
        palette[pIdx * 3] = 255;
        palette[pIdx * 3 + 1] = 255;
        palette[pIdx * 3 + 2] = 255;
        pIdx++;
    }

    const indexed = new Uint8Array(width * height);
    for (let i = 0, j = 0; i < indexed.length; i++, j += 4) {
        const a = rgba[j + 3];
        if (a < 128) {
            indexed[i] = 215;
        } else {
            const r = Math.round((rgba[j] * 5) / 255);
            const g = Math.round((rgba[j + 1] * 5) / 255);
            const b = Math.round((rgba[j + 2] * 5) / 255);
            indexed[i] = r * 36 + g * 6 + b;
        }
    }

    const minCodeSize = 8;
    const clearCode = 256;
    const eoiCode = 257;
    const bytes = [];
    let bitBuf = 0;
    let bitCount = 0;
    const subBlock = [];

    const flushSubBlock = () => {
        if (subBlock.length > 0) {
            bytes.push(subBlock.length, ...subBlock);
            subBlock.length = 0;
        }
    };
    const writeBits = (code, size) => {
        bitBuf |= code << bitCount;
        bitCount += size;
        while (bitCount >= 8) {
            subBlock.push(bitBuf & 0xff);
            if (subBlock.length === 255) flushSubBlock();
            bitBuf >>>= 8;
            bitCount -= 8;
        }
    };

    let codeSize = 9;
    let nextCode = 258;
    const dict = new Map();
    writeBits(clearCode, codeSize);

    let prefix = indexed[0] || 0;
    for (let i = 1; i < indexed.length; i++) {
        const k = indexed[i];
        const key = (prefix << 8) | k;
        const hit = dict.get(key);
        if (hit !== undefined) {
            prefix = hit;
        } else {
            writeBits(prefix, codeSize);
            if (nextCode < 4096) {
                dict.set(key, nextCode++);
                if (nextCode > 1 << codeSize && codeSize < 12) {
                    codeSize++;
                }
            } else {
                writeBits(clearCode, codeSize);
                dict.clear();
                codeSize = 9;
                nextCode = 258;
            }
            prefix = k;
        }
    }
    writeBits(prefix, codeSize);
    writeBits(eoiCode, codeSize);
    if (bitCount > 0) subBlock.push(bitBuf & 0xff);
    flushSubBlock();
    bytes.push(0x00);

    const header = new Uint8Array([
        0x47, 0x49, 0x46, 0x38, 0x39, 0x61,
        width & 0xff, (width >> 8) & 0xff,
        height & 0xff, (height >> 8) & 0xff,
        0xf7, 0x00, 0x00
    ]);
    const imgDesc = new Uint8Array([
        0x2c, 0x00, 0x00, 0x00, 0x00,
        width & 0xff, (width >> 8) & 0xff,
        height & 0xff, (height >> 8) & 0xff,
        0x00, minCodeSize
    ]);
    const trailer = new Uint8Array([0x3b]);

    const out = new Uint8Array(header.length + palette.length + imgDesc.length + bytes.length + trailer.length);
    let off = 0;
    out.set(header, off); off += header.length;
    out.set(palette, off); off += palette.length;
    out.set(imgDesc, off); off += imgDesc.length;
    out.set(bytes, off); off += bytes.length;
    out.set(trailer, off);
    return out;
}

/**
 * 和暦文字列（例: 令和8年度, 平成18年度, 昭和60年度）から西暦を推定する
 */
function parseSeirekiFromNendo(nendoStr) {
    if (!nendoStr) return new Date().getFullYear();
    const s = String(nendoStr).replace(/[０-９]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0xfee0));
    let m = s.match(/令和\s*(元|\d+)/);
    if (m) return 2018 + (m[1] === '元' ? 1 : parseInt(m[1], 10));
    m = s.match(/平成\s*(元|\d+)/);
    if (m) return 1988 + (m[1] === '元' ? 1 : parseInt(m[1], 10));
    m = s.match(/昭和\s*(元|\d+)/);
    if (m) return 1925 + (m[1] === '元' ? 1 : parseInt(m[1], 10));
    m = s.match(/(19\d{2}|20\d{2})/);
    if (m) return parseInt(m[1], 10);
    return new Date().getFullYear();
}

/**
 * 10進数の度を 度・分・秒 に分解する
 */
function decimalToDMS(degVal) {
    const abs = Math.abs(Number(degVal) || 0);
    const deg = Math.floor(abs);
    const minFloat = (abs - deg) * 60;
    const min = Math.floor(minFloat);
    const sec = (minFloat - min) * 60;
    return { deg, min, sec };
}

/**
 * UTF-16LE エンコードヘルパー
 */
function encodeUtf16LE(str, maxBytes = 0) {
    let s = String(str ?? '');
    if (maxBytes > 0) {
        const maxChars = Math.floor(maxBytes / 2);
        if (s.length > maxChars) s = s.slice(0, maxChars);
    }
    const out = new Uint8Array(s.length * 2);
    for (let i = 0; i < s.length; i++) {
        const code = s.charCodeAt(i);
        out[i * 2] = code & 0xff;
        out[i * 2 + 1] = (code >>> 8) & 0xff;
    }
    return out;
}

/**
 * Jet 4.0 の1行レコードバイナリを構築する
 */
function encodeJet4Row(tdef, rowObj, rawLvalPtrBytes = null) {
    const colCount = tdef.maxCols;
    const varCount = tdef.numVarCols;
    const nullLen = Math.ceil(colCount / 8);
    const nullMask = new Uint8Array(nullLen);

    let fixedLen = 0;
    for (const c of tdef.cols) {
        if (c.isFixed && c.type !== 1) {
            const end = c.fixedOffset + c.len;
            if (end > fixedLen) fixedLen = end;
        }
    }

    const fixedBuf = new Uint8Array(fixedLen);
    const fixedView = new DataView(fixedBuf.buffer);
    const varChunks = new Array(varCount).fill(new Uint8Array(0));

    for (const c of tdef.cols) {
        const val = rowObj[c.name];
        if (c.type === 1) {
            if (val) nullMask[c.colNum >> 3] |= 1 << (c.colNum & 7);
            continue;
        }
        if (val === null || val === undefined) continue;
        nullMask[c.colNum >> 3] |= 1 << (c.colNum & 7);

        if (c.isFixed) {
            if (c.type === 2) fixedView.setInt8(c.fixedOffset, Number(val) || 0);
            else if (c.type === 3) fixedView.setInt16(c.fixedOffset, Number(val) || 0, true);
            else if (c.type === 4) fixedView.setInt32(c.fixedOffset, Number(val) || 0, true);
            else if (c.type === 6) fixedView.setFloat32(c.fixedOffset, Number(val) || 0, true);
            else if (c.type === 7 || c.type === 8) fixedView.setFloat64(c.fixedOffset, Number(val) || 0, true);
        } else {
            if (c.type === 10 || c.type === 12) {
                varChunks[c.varColNum] = encodeUtf16LE(val, c.len);
            } else if (c.type === 11) {
                if (rawLvalPtrBytes && rawLvalPtrBytes.length > 0) {
                    varChunks[c.varColNum] = rawLvalPtrBytes;
                } else {
                    nullMask[c.colNum >> 3] &= ~(1 << (c.colNum & 7));
                }
            }
        }
    }

    let totalVarLen = 0;
    for (const ch of varChunks) totalVarLen += ch.length;

    const recLen = 2 + fixedLen + totalVarLen + (varCount + 1) * 2 + 2 + nullLen;
    const out = new Uint8Array(recLen);
    const outView = new DataView(out.buffer);
    outView.setUint16(0, colCount, true);
    out.set(fixedBuf, 2);

    let varWritePos = 2 + fixedLen;
    for (const ch of varChunks) {
        out.set(ch, varWritePos);
        varWritePos += ch.length;
    }

    const varCountPos = recLen - nullLen - 2;
    outView.setUint16(varCountPos, varCount, true);
    let curOff = 2 + fixedLen;
    for (let i = 0; i < varCount; i++) {
        outView.setUint16(varCountPos - (i + 1) * 2, curOff, true);
        curOff += varChunks[i].length;
    }
    outView.setUint16(varCountPos - (varCount + 1) * 2, curOff, true);
    out.set(nullMask, recLen - nullLen);
    return out;
}

/**
 * TDEF ページのインデックス・使用マップポインタを取得する
 */
function getJet4TdefPointers(buf, pageNum) {
    const off = pageNum * 4096;
    const dv = new DataView(buf.buffer, buf.byteOffset + off, 4096);
    const numRows = dv.getUint32(16, true);
    const autonum = dv.getUint32(20, true);
    const numCols = dv.getUint16(45, true);
    const numIdx = dv.getUint32(47, true);
    const numRealIdx = dv.getUint32(51, true);
    const rowPageMapPtr = dv.getUint32(55, true);
    const freePageMapPtr = dv.getUint32(59, true);

    let pos = 63 + numRealIdx * 12 + numCols * 25;
    for (let i = 0; i < numCols; i++) {
        pos += 2 + dv.getUint16(pos, true);
    }
    const realIdxPos = pos;
    const idxMapPtr = dv.getUint32(realIdxPos + 34, true);
    const idxRootPage = dv.getUint32(realIdxPos + 38, true);

    pos += numRealIdx * 52 + numIdx * 28;
    for (let i = 0; i < numIdx; i++) {
        pos += 2 + dv.getUint16(pos, true);
    }
    let lvalUsedMapPtr = 0;
    let lvalFreeMapPtr = 0;
    while (pos + 2 <= 4096) {
        const colId = dv.getUint16(pos, true);
        if (colId === 0xffff) break;
        lvalUsedMapPtr = dv.getUint32(pos + 2, true);
        lvalFreeMapPtr = dv.getUint32(pos + 6, true);
        pos += 10;
    }
    return {
        pageNum,
        numRows,
        autonum,
        rowPageMapPtr,
        freePageMapPtr,
        realIdxPos,
        idxMapPtr,
        idxRootPage,
        lvalUsedMapPtr,
        lvalFreeMapPtr
    };
}

/**
 * 使用マップレコード (type 0 bitmap) からページ番号配列を取得・更新するヘルパー
 */
function getUsageMapRecordSlice(buf, mapPtr) {
    if (!mapPtr) return null;
    const slot = mapPtr & 0xff;
    const page = mapPtr >>> 8;
    const pOff = page * 4096;
    if (pOff + 4096 > buf.length) return null;
    const dv = new DataView(buf.buffer, buf.byteOffset + pOff, 4096);
    const rCount = dv.getUint16(12, true);
    if (slot >= rCount) return null;
    const rOff = dv.getUint16(14 + slot * 2, true) & 0x0fff;
    const rEnd = slot === 0 ? 4096 : dv.getUint16(14 + (slot - 1) * 2, true) & 0x0fff;
    return buf.subarray(pOff + rOff, pOff + rEnd);
}

function readUsageMapPages(buf, mapPtr) {
    const rec = getUsageMapRecordSlice(buf, mapPtr);
    if (!rec || rec.length < 5 || rec[0] !== 0) return [];
    const dv = new DataView(rec.buffer, rec.byteOffset, rec.byteLength);
    const startPage = dv.getUint32(1, true);
    const pages = [];
    for (let i = 5; i < rec.length; i++) {
        for (let b = 0; b < 8; b++) {
            if (rec[i] & (1 << b)) pages.push(startPage + (i - 5) * 8 + b);
        }
    }
    return pages;
}

function writeUsageMapPages(buf, mapPtr, pages) {
    const rec = getUsageMapRecordSlice(buf, mapPtr);
    if (!rec || rec.length < 5 || rec[0] !== 0) return;
    const dv = new DataView(rec.buffer, rec.byteOffset, rec.byteLength);
    const startPage = dv.getUint32(1, true);
    for (let i = 5; i < rec.length; i++) rec[i] = 0;
    for (const p of pages) {
        const bitIndex = p - startPage;
        if (bitIndex < 0) continue;
        const byteIndex = 5 + (bitIndex >> 3);
        if (byteIndex < rec.length) {
            rec[byteIndex] |= 1 << (bitIndex & 7);
        }
    }
}

/**
 * Jet 4.0 リーフインデックスページ (0x04) を構築する
 */
function buildJet4IndexLeafPage(tdefPage, entries, prevPage = 0, nextPage = 0, compressPrefix3 = false) {
    const page = new Uint8Array(4096);
    const dv = new DataView(page.buffer);
    page[0] = 0x04;
    page[1] = 0x01;
    dv.setUint32(4, tdefPage, true);
    dv.setUint32(8, prevPage, true);
    dv.setUint32(12, nextPage, true);
    page[24] = compressPrefix3 ? 0x03 : 0x00;

    let pos = 480;
    const fullEntry = new Uint8Array(9);
    const entryView = new DataView(fullEntry.buffer);

    for (let i = 0; i < entries.length; i++) {
        const { key, rowPage, rowSlot } = entries[i];
        fullEntry[0] = 0x7f;
        entryView.setUint32(1, (key ^ 0x80000000) >>> 0, false);
        fullEntry[5] = (rowPage >>> 16) & 0xff;
        fullEntry[6] = (rowPage >>> 8) & 0xff;
        fullEntry[7] = rowPage & 0xff;
        fullEntry[8] = rowSlot & 0xff;

        const slice = compressPrefix3 && i > 0 ? fullEntry.subarray(3) : fullEntry;
        page.set(slice, pos);
        pos += slice.length;
        const bitPos = pos - 480;
        page[27 + (bitPos >> 3)] |= 1 << (bitPos & 7);
    }

    const usedBytes = pos - 480;
    dv.setUint16(2, 3616 - usedBytes, true);
    return page;
}

/**
 * Jet 4.0 ルートノードインデックスページ (0x03) を構築する
 */
function buildJet4IndexNodePage(tdefPage, leafMetas) {
    const page = new Uint8Array(4096);
    const dv = new DataView(page.buffer);
    page[0] = 0x03;
    page[1] = 0x01;
    dv.setUint32(4, tdefPage, true);
    const lastLeaf = leafMetas[leafMetas.length - 1];
    dv.setUint32(20, lastLeaf.pageNum, true);
    page[26] = 0x01;

    let pos = 480;
    const nodeEntry = new Uint8Array(13);
    const entryView = new DataView(nodeEntry.buffer);

    for (let i = 0; i < leafMetas.length - 1; i++) {
        const { maxKey, maxRowPage, maxRowSlot, pageNum } = leafMetas[i];
        nodeEntry[0] = 0x7f;
        entryView.setUint32(1, (maxKey ^ 0x80000000) >>> 0, false);
        nodeEntry[5] = (maxRowPage >>> 16) & 0xff;
        nodeEntry[6] = (maxRowPage >>> 8) & 0xff;
        nodeEntry[7] = maxRowPage & 0xff;
        nodeEntry[8] = maxRowSlot & 0xff;
        entryView.setUint32(9, pageNum >>> 0, false);

        page.set(nodeEntry, pos);
        pos += 13;
        const bitPos = pos - 480;
        page[27 + (bitPos >> 3)] |= 1 << (bitPos & 7);
    }

    const usedBytes = pos - 480;
    dv.setUint16(2, 3616 - usedBytes, true);
    return page;
}

/**
 * MDBバイナリ内の T_測量箇所・T_測量データ に測量データを保存（上書きまたは新規追加）し、
 * 更新済みの MDB バイナリ (Uint8Array) を返す
 */
export function saveRecordToCompassMdb(mdbBuffer, options) {
    const srcBuf = mdbBuffer instanceof Uint8Array ? mdbBuffer : new Uint8Array(mdbBuffer);
    if (srcBuf.length < 4096) {
        throw new Error('有効なMDBファイルではありません。');
    }
    const sig = new TextDecoder('ascii').decode(srcBuf.subarray(4, 19));
    if (sig !== JET4_SIGNATURE && sig !== ACE_SIGNATURE) {
        throw new Error('Microsoft Access (Jet/ACE) データベース形式ではありません。');
    }
    const hView = new DataView(srcBuf.buffer, srcBuf.byteOffset, srcBuf.byteLength);
    const jetVersion = hView.getUint32(20, true);
    if (jetVersion === 0) {
        throw new Error('Jet 3.0 (Access 97) 形式への書き込みは現在サポートされていません (Jet 4.0 / Access 2000以降のみ対応)。');
    }

    const pageSize = 4096;
    const totalOrigPages = Math.floor(srcBuf.length / pageSize);

    // 1. T_測量箇所 と T_測量データ の TDEF を特定
    let kashoTdef = null;
    let dataTdef = null;
    const msysTdef = parseTdef(srcBuf, 2, pageSize, false);
    if (msysTdef) {
        const msysRows = readTableRows(srcBuf, msysTdef, pageSize, false);
        for (const r of msysRows) {
            if (r.Type === 1 && r.Id > 0) {
                if (r.Name === 'T_測量箇所') kashoTdef = parseTdef(srcBuf, r.Id, pageSize, false);
                else if (r.Name === 'T_測量データ') dataTdef = parseTdef(srcBuf, r.Id, pageSize, false);
            }
        }
    }
    if (!kashoTdef || !dataTdef) {
        for (let p = 2; p < totalOrigPages; p++) {
            if (srcBuf[p * pageSize] !== 0x02) continue;
            const t = parseTdef(srcBuf, p, pageSize, false);
            if (!t || !t.cols) continue;
            const colNames = new Set(t.cols.map(c => c.name));
            if (!kashoTdef && colNames.has('箇所ID') && colNames.has('箇所名')) kashoTdef = t;
            else if (!dataTdef && colNames.has('箇所ID') && colNames.has('測点名') && colNames.has('方位角')) dataTdef = t;
        }
    }
    if (!kashoTdef || !dataTdef) {
        throw new Error('MDB内に「T_測量箇所」または「T_測量データ」テーブルが見つかりませんでした。');
    }

    const kashoMeta = getJet4TdefPointers(srcBuf, kashoTdef.page);
    const dataMeta = getJet4TdefPointers(srcBuf, dataTdef.page);

    const kashoRows = readTableRows(srcBuf, kashoTdef, pageSize, false);
    let allDataRows = readTableRows(srcBuf, dataTdef, pageSize, false);

    const {
        mode = 'overwrite',
        targetKashoId = null,
        kashoName = '',
        tableData = [],
        attributes = [],
        lat = 34.097294,
        lon = 135.434808,
        declination = 0,
        compassAdjustmentChecked = true,
        totalAreaHa = 0,
        previewGifBytes = null
    } = options || {};

    // 2. 対象 箇所ID の決定と T_測量箇所 レコードの構築
    let existingKashoIdx = -1;
    if (mode === 'overwrite' && targetKashoId != null) {
        existingKashoIdx = kashoRows.findIndex(r => Number(r['箇所ID']) === Number(targetKashoId));
    }

    const maxKashoId = Math.max(kashoMeta.autonum, ...kashoRows.map(r => Number(r['箇所ID']) || 0));
    const maxKashoOrder = Math.max(0, ...kashoRows.map(r => Number(r['箇所並び順']) || 0));

    let kashoRecord;
    let finalKashoId;
    if (existingKashoIdx >= 0) {
        kashoRecord = { ...kashoRows[existingKashoIdx] };
        finalKashoId = Number(kashoRecord['箇所ID']);
    } else {
        finalKashoId = maxKashoId + 1;
        const attrNames = new Set(attributes.map(a => (a.name || '').trim()));
        const isChisan = attrNames.has('工種') || attrNames.has('施工地名') || attrNames.has('工事番号');
        kashoRecord = {
            箇所ID: finalKashoId,
            箇所並び順: maxKashoOrder + 1,
            箇所名: '',
            造林治山: !isChisan,
            測量種別: true,
            ポリゴンタイプ: 0,
            トラバース種別: true,
            西暦: new Date().getFullYear(),
            年度: null,
            番号: null,
            事業: null,
            事業区分: null,
            事業主体: null,
            Chk面積: false,
            面積: 0,
            作業種: null,
            搬出量: null,
            樹種: null,
            林齢: null,
            所有者: null,
            代理申請者: null,
            所在地: null,
            小班: null,
            備考: null,
            CRC: false,
            面積桁数: 2,
            誤差桁数: 2,
            測位点: 'BP',
            測位点経度: 0,
            測位点緯度: 0,
            OB_公共座標: false,
            緯度_度: 34,
            緯度_分: 5,
            緯度_秒: 50.26,
            経度_度: 135,
            経度_分: 26,
            経度_秒: 5.31,
            シェイプファイル名:
                '=IF(造林治山="造林",年度&事業区分&作業種&所有者&面積属性&"ha",年度&番号&事業&IF(事業区分<>"","-"&事業区分,"")&事業主体&面積属性&"ha")',
            測量者氏名: null,
            縮尺: 1000,
            方位回転角: 0,
            用紙: 'A3',
            用紙向き: '横',
            BP数: 1,
            BP方向1: '↓',
            BP方向2: '↓',
            BP方向3: '↓',
            BP方向4: '↓',
            BP方向5: '↓',
            BP方向6: '↓',
            BP方向7: '↓',
            BP方向8: '↓',
            BP方向9: '↓',
            BP方向10: '↓',
            Option1: null,
            Option2: null,
            Option3: null,
            Option4: null,
            Option5: null,
            Version: 'コンパスtoGIS_8.20.xlsm',
            イメージ: null
        };
    }

    // 属性値を T_測量箇所 の各カラムへ反映
    const isZourin = kashoRecord['造林治山'] !== false;
    const labelToCol = isZourin
        ? {
              年度: '年度',
              番号: '番号',
              事業: '事業',
              事業区分: '事業区分',
              事業主体: '事業主体',
              作業種: '作業種',
              搬出量: '搬出量',
              樹種: '樹種',
              林齢: '林齢',
              所有者名: '所有者',
              所有者: '所有者',
              代理申請者: '代理申請者',
              所在地: '所在地',
              小班: '小班',
              備考: '備考',
              測量者氏名: '測量者氏名'
          }
        : {
              年度: '年度',
              事業名: '番号',
              工事番号: '事業',
              工事枝番: '事業区分',
              施工地名: '事業主体',
              工種: '作業種',
              樹種: '搬出量',
              '間伐率％': '樹種',
              成立本数: '林齢',
              現成立本数: '所有者',
              胸高直径: '代理申請者',
              樹高: '所在地',
              所有者名: '小班',
              備考: '備考',
              測量者氏名: '測量者氏名'
          };

    for (const a of attributes) {
        const key = (a.name || '').trim();
        const val = (a.value ?? '').toString().trim();
        const colName = labelToCol[key];
        if (colName) {
            kashoRecord[colName] = val !== '' ? val : null;
        }
    }

    if (kashoRecord['年度']) {
        kashoRecord['西暦'] = parseSeirekiFromNendo(kashoRecord['年度']);
    }

    const areaRounded = Number(Number(totalAreaHa || 0).toFixed(kashoRecord['面積桁数'] || 2));
    kashoRecord['面積'] = areaRounded;
    kashoRecord['トラバース種別'] = Boolean(compassAdjustmentChecked);

    const firstPt = String(tableData[0]?.[0] ?? '').trim() || 'BP';
    kashoRecord['測位点'] = firstPt;

    const latDMS = decimalToDMS(lat);
    const lonDMS = decimalToDMS(lon);
    kashoRecord['緯度_度'] = latDMS.deg;
    kashoRecord['緯度_分'] = latDMS.min;
    kashoRecord['緯度_秒'] = latDMS.sec;
    kashoRecord['経度_度'] = lonDMS.deg;
    kashoRecord['経度_分'] = lonDMS.min;
    kashoRecord['経度_秒'] = lonDMS.sec;

    const autoName =
        [
            kashoRecord['年度'] || '',
            kashoRecord['事業区分'] || '',
            kashoRecord['作業種'] || '',
            kashoRecord['所有者'] || '',
            areaRounded > 0 ? `${areaRounded}ha` : ''
        ]
            .join('')
            .trim() || `箇所ID_${finalKashoId}`;
    kashoRecord['箇所名'] = String(kashoName || '').trim() || autoName;

    if (previewGifBytes && previewGifBytes.length > 0) {
        kashoRecord['イメージ'] = previewGifBytes;
    }

    if (existingKashoIdx >= 0) {
        kashoRows[existingKashoIdx] = kashoRecord;
    } else {
        kashoRows.push(kashoRecord);
    }

    // 3. T_測量データ 行の更新
    allDataRows = allDataRows.filter(r => Number(r['箇所ID']) !== finalKashoId);
    let nextDataId = Math.max(dataMeta.autonum, ...allDataRows.map(r => Number(r['データID']) || 0)) + 1;

    const validTableRows = tableData.filter(r => r && (String(r[0] ?? '').trim() !== '' || String(r[4] ?? '').trim() !== ''));
    validTableRows.forEach((r, idx) => {
        allDataRows.push({
            データID: nextDataId++,
            箇所ID: finalKashoId,
            BP番号: 0,
            測点並び順: idx + 1,
            測点名: String(r[0] ?? '').trim() || (idx === 0 ? 'BP' : String(idx)),
            方位角: parseFloat(r[2]) || 0,
            高低角: parseFloat(r[3]) || 0,
            斜距離: parseFloat(r[4]) || 0
        });
    });

    // PrimaryKey 順にソート
    kashoRows.sort((a, b) => (Number(a['箇所ID']) || 0) - (Number(b['箇所ID']) || 0));
    allDataRows.sort((a, b) => (Number(a['データID']) || 0) - (Number(b['データID']) || 0));

    // 4. ページ割り当て管理 (Page 1 slot 0 の空きページビットマップ + 元の T_測量箇所 / T_測量データ ページの解放)
    const oldKashoDataPages = readUsageMapPages(srcBuf, kashoMeta.rowPageMapPtr);
    const oldKashoLvalPages = readUsageMapPages(srcBuf, kashoMeta.lvalUsedMapPtr);
    const oldKashoIdxPages = readUsageMapPages(srcBuf, kashoMeta.idxMapPtr);
    const oldDataRowPages = readUsageMapPages(srcBuf, dataMeta.rowPageMapPtr);
    const oldDataIdxPages = readUsageMapPages(srcBuf, dataMeta.idxMapPtr);

    // 書き込み用のページマップ (既存のページデータをコピーし、必要に応じて拡張)
    const pageBuffers = [];
    for (let p = 0; p < totalOrigPages; p++) {
        const copy = new Uint8Array(pageSize);
        copy.set(srcBuf.subarray(p * pageSize, (p + 1) * pageSize));
        pageBuffers.push(copy);
    }

    const globalFreePages = new Set(readUsageMapPages(srcBuf, 0x00000100));
    for (const p of [
        ...oldKashoDataPages,
        ...oldKashoLvalPages,
        ...oldKashoIdxPages,
        ...oldDataRowPages,
        ...oldDataIdxPages
    ]) {
        if (p >= 2) {
            globalFreePages.add(p);
            if (p < pageBuffers.length) {
                pageBuffers[p].fill(0);
            }
        }
    }

    const allocPage = () => {
        // 既存のファイル内ページ (p < pageBuffers.length) を優先再利用
        const sortedFree = Array.from(globalFreePages).sort((a, b) => a - b);
        for (const p of sortedFree) {
            if (p >= 2 && p < pageBuffers.length) {
                globalFreePages.delete(p);
                pageBuffers[p].fill(0);
                return p;
            }
        }
        // ファイル末尾に新規ページを追加
        const newP = pageBuffers.length;
        globalFreePages.delete(newP);
        pageBuffers.push(new Uint8Array(pageSize));
        return newP;
    };

    // 5. T_測量箇所 の イメージ (LVAL ページチェーン) を構築
    const newKashoLvalPages = [];
    const kashoLvalPtrs = [];

    for (const row of kashoRows) {
        const imgBytes = row['イメージ'];
        if (!imgBytes || imgBytes.length === 0) {
            kashoLvalPtrs.push(null);
            continue;
        }
        const totalLen = imgBytes.length;
        const chunkPages = [];
        let offset = 0;
        while (offset < totalLen) {
            const p = allocPage();
            newKashoLvalPages.push(p);
            chunkPages.push({ page: p, slice: imgBytes.subarray(offset, Math.min(totalLen, offset + 4072)) });
            offset += 4072;
        }
        for (let i = 0; i < chunkPages.length; i++) {
            const { page: p, slice } = chunkPages[i];
            const nextP = i + 1 < chunkPages.length ? chunkPages[i + 1].page : 0;
            const recLen = 4 + slice.length;
            const recStart = pageSize - recLen;
            const pBuf = pageBuffers[p];
            const pView = new DataView(pBuf.buffer);
            pBuf[0] = 0x01;
            pBuf[1] = 0x01;
            pView.setUint16(2, pageSize - 16 - recLen, true);
            pBuf[4] = 0x4c; pBuf[5] = 0x56; pBuf[6] = 0x41; pBuf[7] = 0x4c; // "LVAL"
            pView.setUint32(8, 0, true);
            pView.setUint16(12, 1, true);
            pView.setUint16(14, recStart, true);
            pView.setUint32(recStart, nextP ? (nextP << 8) : 0, true);
            pBuf.set(slice, recStart + 4);
        }

        const lvalPtr = new Uint8Array(12);
        const lvalView = new DataView(lvalPtr.buffer);
        lvalView.setUint32(0, totalLen, true); // bit 30, 31 = 0 (type 2 multi-page LVAL)
        lvalView.setUint32(4, chunkPages[0].page << 8, true);
        lvalView.setUint32(8, 0, true);
        kashoLvalPtrs.push(lvalPtr);
    }

    // 6. データページを構築する共通関数
    const buildTableDataPages = (tdef, rows, lvalPtrs, keyColName) => {
        const dataPages = [];
        const freeSpacePages = [];
        const indexEntries = [];

        let curPage = -1;
        let curSlot = 0;
        let curWriteEnd = pageSize;
        let curOffsets = [];

        const flushDataPage = () => {
            if (curPage < 0) return;
            const pBuf = pageBuffers[curPage];
            const pView = new DataView(pBuf.buffer);
            const headerLen = 14 + curOffsets.length * 2;
            const freeBytes = curWriteEnd - headerLen;
            pBuf[0] = 0x01;
            pBuf[1] = 0x01;
            pView.setUint16(2, freeBytes, true);
            pView.setUint32(4, tdef.page, true);
            pView.setUint32(8, 0, true);
            pView.setUint16(12, curOffsets.length, true);
            for (let s = 0; s < curOffsets.length; s++) {
                pView.setUint16(14 + s * 2, curOffsets[s], true);
            }
            if (freeBytes >= 256) freeSpacePages.push(curPage);
        };

        for (let i = 0; i < rows.length; i++) {
            const recBytes = encodeJet4Row(tdef, rows[i], lvalPtrs ? lvalPtrs[i] : null);
            const needed = recBytes.length + 2; // +2 for offset entry in header
            const headerLenIfAdded = 14 + (curOffsets.length + 1) * 2;
            if (curPage < 0 || curWriteEnd - recBytes.length < headerLenIfAdded) {
                flushDataPage();
                curPage = allocPage();
                dataPages.push(curPage);
                curSlot = 0;
                curWriteEnd = pageSize;
                curOffsets = [];
            }
            curWriteEnd -= recBytes.length;
            pageBuffers[curPage].set(recBytes, curWriteEnd);
            curOffsets.push(curWriteEnd);
            indexEntries.push({
                key: Number(rows[i][keyColName]) || 0,
                rowPage: curPage,
                rowSlot: curSlot
            });
            curSlot++;
        }
        flushDataPage();
        if (dataPages.length === 0) {
            const emptyP = allocPage();
            dataPages.push(emptyP);
            freeSpacePages.push(emptyP);
            const pBuf = pageBuffers[emptyP];
            const pView = new DataView(pBuf.buffer);
            pBuf[0] = 0x01;
            pBuf[1] = 0x01;
            pView.setUint16(2, pageSize - 14, true);
            pView.setUint32(4, tdef.page, true);
        }
        return { dataPages, freeSpacePages, indexEntries };
    };

    const kashoBuilt = buildTableDataPages(kashoTdef, kashoRows, kashoLvalPtrs, '箇所ID');
    const dataBuilt = buildTableDataPages(dataTdef, allDataRows, null, 'データID');

    // 7. インデックスページを構築する共通関数
    const buildPrimaryKeyIndexPages = (tdefPage, entries, forceNodeRoot = false) => {
        const idxPages = [];
        const maxPerLeaf = 380; // 380 * 9 = 3420 <= 3616 bytes (uncompressed)
        if (!forceNodeRoot && entries.length <= maxPerLeaf) {
            const leafPage = allocPage();
            idxPages.push(leafPage);
            pageBuffers[leafPage].set(buildJet4IndexLeafPage(tdefPage, entries, 0, 0, false));
            return { rootPage: leafPage, idxPages };
        }

        // 複数リーフ + ルートノード (または forceNodeRoot)
        const rootPage = allocPage();
        idxPages.push(rootPage);
        const chunks = [];
        for (let i = 0; i < entries.length; i += maxPerLeaf) {
            chunks.push(entries.slice(i, i + maxPerLeaf));
        }
        if (chunks.length === 0) chunks.push([]);

        const leafPageNums = chunks.map(() => {
            const lp = allocPage();
            idxPages.push(lp);
            return lp;
        });

        const leafMetas = [];
        for (let c = 0; c < chunks.length; c++) {
            const chunk = chunks[c];
            const lp = leafPageNums[c];
            const prevP = c > 0 ? leafPageNums[c - 1] : 0;
            const nextP = c + 1 < chunks.length ? leafPageNums[c + 1] : 0;
            pageBuffers[lp].set(buildJet4IndexLeafPage(tdefPage, chunk, prevP, nextP, false));
            const last = chunk[chunk.length - 1] || { key: 0, rowPage: 0, rowSlot: 0 };
            leafMetas.push({
                pageNum: lp,
                maxKey: last.key,
                maxRowPage: last.rowPage,
                maxRowSlot: last.rowSlot
            });
        }

        pageBuffers[rootPage].set(buildJet4IndexNodePage(tdefPage, leafMetas));
        return { rootPage, idxPages };
    };

    const kashoIdxBuilt = buildPrimaryKeyIndexPages(kashoTdef.page, kashoBuilt.indexEntries, false);
    const dataIdxBuilt = buildPrimaryKeyIndexPages(dataTdef.page, dataBuilt.indexEntries, true);

    // 8. 全体バッファへ結合し、TDEF と使用マップを更新
    const outBuf = new Uint8Array(pageBuffers.length * pageSize);
    for (let p = 0; p < pageBuffers.length; p++) {
        outBuf.set(pageBuffers[p], p * pageSize);
    }

    const updateTdefHeader = (meta, rowCount, nextAutoNum, rootIdxPage) => {
        const off = meta.pageNum * pageSize;
        const dv = new DataView(outBuf.buffer, outBuf.byteOffset + off, pageSize);
        dv.setUint32(16, rowCount, true);
        dv.setUint32(20, nextAutoNum, true);
        dv.setUint32(63 + 4, rowCount, true); // uniqueEntryCount
        dv.setUint32(meta.realIdxPos + 38, rootIdxPage, true);
    };

    const newKashoAutonum = Math.max(kashoMeta.autonum, ...kashoRows.map(r => Number(r['箇所ID']) || 0));
    const newDataAutonum = Math.max(dataMeta.autonum, nextDataId);

    updateTdefHeader(kashoMeta, kashoRows.length, newKashoAutonum, kashoIdxBuilt.rootPage);
    updateTdefHeader(dataMeta, allDataRows.length, newDataAutonum, dataIdxBuilt.rootPage);

    writeUsageMapPages(outBuf, kashoMeta.rowPageMapPtr, kashoBuilt.dataPages);
    writeUsageMapPages(outBuf, kashoMeta.freePageMapPtr, kashoBuilt.freeSpacePages);
    writeUsageMapPages(outBuf, kashoMeta.lvalUsedMapPtr, newKashoLvalPages);
    writeUsageMapPages(outBuf, kashoMeta.lvalFreeMapPtr, []);
    writeUsageMapPages(outBuf, kashoMeta.idxMapPtr, kashoIdxBuilt.idxPages);

    writeUsageMapPages(outBuf, dataMeta.rowPageMapPtr, dataBuilt.dataPages);
    writeUsageMapPages(outBuf, dataMeta.freePageMapPtr, dataBuilt.freeSpacePages);
    writeUsageMapPages(outBuf, dataMeta.idxMapPtr, dataIdxBuilt.idxPages);

    writeUsageMapPages(outBuf, 0x00000100, Array.from(globalFreePages));

    return {
        buffer: outBuf,
        kashoId: finalKashoId,
        kashoName: kashoRecord['箇所名']
    };
}

