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
