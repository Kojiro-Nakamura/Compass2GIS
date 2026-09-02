import { $id, bindClick, CONSTANTS, Utils } from './utils.js';

        import { surveyMath } from './surveyMath.js';
import { drawing } from './drawing.js';
import { mapView } from './mapView.js';
import { exportUtils } from './exportUtils.js';

class CompassSurveyApp {
            constructor() {
                this.initConfig();
                this.initDOM();
                this.initState();
                this.initEvents();
                
                this.resizeCanvas();
                this.calculateMagDeclination(false);
                this.loadInitialApp();
            }

            initConfig() {
                this.CONFIG = {
                    colors: {
                        lineMain: '#2E5C8A', lineBranch: '#B36A22', startNode: '#A13D44', normalNode: '#217270',   
                        text: '#1f2937', gridMain: '#cbd5e1', gridSub: '#e2e8f0', compassText: '#1f2937',
                        compassArrow: '#2E5C8A', areaFill: 'rgba(33, 114, 112, 0.25)', labelBg: 'rgba(255, 255, 255, 0.7)'
                    },
                    canvas: { padding: 50, nodeRadius: 4, hitRadius: 8, zoomFactor: 1.1, gridBaseSize: 50 },
                    initialData: [
                        ['BP', '1', '33', '-38', '45.3', false], ['1', '2', '122', '35', '50.7', false],
                        ['2', '3', '129', '38', '33.5', false], ['3', '4', '130', '28', '13.3', false],
                        ['4', '5', '156', '25', '34.5', false], ['5', '6', '163', '28', '48.3', false],
                        ['6', '7', '147', '27', '31.7', false], ['7', '8', '174', '16', '12', false],
                        ['8', '9', '166', '12', '24', false], ['9', '10', '154', '30', '27.8', false],
                        ['10', '11', '181', '32', '16.7', false], ['11', '12', '247', '-7', '14.5', false],
                        ['12', '13', '236', '-4', '21.3', false], ['13', '14', '279', '-27', '18.6', false],
                        ['14', '15', '274', '-6', '27.3', false], ['15', '16', '263', '-1', '34', false],
                        ['16', '17', '252', '10', '22.2', false], ['17', '18', '261', '14', '24.2', false],
                        ['18', '19', '318', '-14', '29', false], ['19', '20', '317', '-2', '22.4', false],
                        ['20', '21', '61', '-38', '12.8', false], ['21', '22', '49', '-43', '16', false],
                        ['22', '23', '61', '-38', '15.7', false], ['23', '24', '56', '-43', '19.2', false],
                        ['24', '25', '21', '-48', '15.8', false], ['25', '26', '34', '-45', '18.3', false],
                        ['26', '27', '28', '-43', '27.3', false], ['27', '28', '9', '-28', '20.7', false],
                        ['28', '29', '348', '-25', '25.9', false], ['29', '30', '351', '-20', '26.6', false],
                        ['30', '31', '357', '-11', '13.3', false], ['31', '32', '327', '9', '15.5', false],
                        ['32', '33', '10', '-27', '9.5', false], ['33', 'BP', '328', '-8', '6.7', false],
                        ['27', '50', '65', '10', '52', false], ['50', '6', '90', '8', '48', false],
                        ['2', '60', '52', '5', '30', true], ['60', '61', '45', '1', '28', true],
                        ['61', '62', '20', '2', '30', false], ['62', '63', '280', '0', '40', false],
                        ['63', '64', '180', '5', '30', false], ['64', '61', '95', '-5', '30', false],
                        ['31', '80', '275', '5', '25', false], ['80', '81', '270', '5', '43', false],
                        ['50', '90', '180', '2', '20', true], ['90', '91', '90', '1', '20', false],
                        ['91', '92', '180', '0', '30', false], ['92', '93', '270', '0', '40', false],
                        ['93', '94', '0', '0', '30', false], ['94', '91', '90', '0', '20', false]
                    ],
                    defaultAttributes: [
                        { name: '年度', value: '令和8年度' }, { name: '事業名', value: '育成複層林整備' },
                        { name: '所有者名', value: '山田太郎' }, { name: '備考', value: 'No.10' }
                    ]
                };
            }

            initDOM() {
                this.els = {
                    tbody: $id('tableBody'), canvas: $id('previewCanvas'), container: $id('canvasContainer'),
                    tooltip: $id('tooltip'), mapContainer: $id('mapContainer'), dropdown: document.createElement('ul'),
                    btnModeSelect: $id('btnModeSelect'), btnModePan: $id('btnModePan'), btnModeText: $id('btnModeText'),
                    btnModeLine: $id('btnModeLine'), btnModeErase: $id('btnModeErase'), btnZoomFit: $id('btnZoomFit'),
                    btnLoadDemo: $id('btnLoadDemo'), btnClear: $id('btnClear'), btnPasteClipboard: $id('btnPasteClipboard'),
                    btnCopyClipboard: $id('btnCopyClipboard'), btnToggleMap: $id('btnToggleMap'), btnExportGeoJSON: $id('btnExportGeoJSON'),
                    btnExportHTML: $id('btnExportHTML'), btnSaveJSON: $id('btnSaveJSON'), inputFileJSON: $id('inputFileJSON'),
                    btnUndo: $id('btnUndo'), btnRedo: $id('btnRedo'), chkCompassAdjustment: $id('chkCompassAdjustment'),
                    closureInfo: $id('closureInfo'), btnCopyClosureInfo: $id('btnCopyClosureInfo'),
                    inputLat: $id('inputLat'), inputLon: $id('inputLon'), inputDeclination: $id('inputDeclination'),
                    btnCalcMag: $id('btnCalcMag'), btnCopyDeclination: $id('btnCopyDeclination'), chkMagDeclination: $id('chkMagDeclination'),
                    selNodeLabelInterval: $id('selNodeLabelInterval'),
                    pasteModal: $id('pasteModal'), pasteArea: $id('pasteArea'), btnCancelPaste: $id('btnCancelPaste'), btnApplyPaste: $id('btnApplyPaste'),
                    chkConvertEPtoBP: $id('chkConvertEPtoBP'), btnOpenDMSModal: $id('btnOpenDMSModal'), btnCopyLatLon: $id('btnCopyLatLon'),
                    dmsModal: $id('dmsModal'), dmsArea: $id('dmsArea'), btnCancelDMS: $id('btnCancelDMS'), btnApplyDMS: $id('btnApplyDMS'),
                    attrPasteModal: $id('attrPasteModal'), attrPasteArea: $id('attrPasteArea'), btnCopyAttr: $id('btnCopyAttr'),
                    btnPasteAttr: $id('btnPasteAttr'), btnCancelAttrPaste: $id('btnCancelAttrPaste'), btnApplyAttrPaste: $id('btnApplyAttrPaste'),
                    exportModal: $id('exportModal'), exportModalTitle: $id('exportModalTitle'), inputExportFileName: $id('inputExportFileName'),
                    exportExtension: $id('exportExtension'), btnCancelExport: $id('btnCancelExport'), btnApplyExport: $id('btnApplyExport'),
                    htmlExportOptions: $id('htmlExportOptions'), inputCustomScale: $id('inputCustomScale'), radioCustomScale: $id('radioCustomScale'),
                    importPreviewModal: $id('importPreviewModal'), importFileList: $id('importFileList'), importPreviewImage: $id('importPreviewImage'),
                    importNoPreviewText: $id('importNoPreviewText'), importPreviewInfo: $id('importPreviewInfo'), btnCancelImport: $id('btnCancelImport'),
                    btnApplyImport: $id('btnApplyImport'), confirmModal: $id('confirmModal'), confirmTitle: $id('confirmTitle'),
                    confirmMessage: $id('confirmMessage'), btnCancelConfirm: $id('btnCancelConfirm'), btnApplyConfirm: $id('btnApplyConfirm'),
                    textPromptModal: $id('textPromptModal'), inputTextPrompt: $id('inputTextPrompt'), inputTextColor: $id('inputTextColor'),
                    inputTextSize: $id('inputTextSize'), btnCancelTextPrompt: $id('btnCancelTextPrompt'), btnApplyTextPrompt: $id('btnApplyTextPrompt'),
                    attrTableBody: $id('attrTableBody'),
                    propertyPanel: $id('propertyPanel'), propColor: $id('propColor'), propLineWidth: $id('propLineWidth'),
                    propLineStyle: $id('propLineStyle'), propFontSize: $id('propFontSize'), rowLineWidth: $id('rowLineWidth'),
                    rowLineStyle: $id('rowLineStyle'), rowFontSize: $id('rowFontSize'), btnCloseProp: $id('btnCloseProp')
                };

                this.els.dropdown.className = 'custom-dropdown';
                document.body.appendChild(this.els.dropdown);
                this.ctx = this.els.canvas.getContext('2d');

                this.modals = [
                    { el: this.els.exportModal, cancel: this.els.btnCancelExport, apply: this.els.btnApplyExport },
                    { el: this.els.pasteModal, cancel: this.els.btnCancelPaste, apply: this.els.btnApplyPaste, input: this.els.pasteArea },
                    { el: this.els.dmsModal, cancel: this.els.btnCancelDMS, apply: this.els.btnApplyDMS, input: this.els.dmsArea },
                    { el: this.els.attrPasteModal, cancel: this.els.btnCancelAttrPaste, apply: this.els.btnApplyAttrPaste, input: this.els.attrPasteArea },
                    { el: this.els.importPreviewModal, cancel: this.els.btnCancelImport, apply: this.els.btnApplyImport },
                    { el: this.els.confirmModal, cancel: this.els.btnCancelConfirm, apply: this.els.btnApplyConfirm },
                    { el: this.els.textPromptModal, cancel: this.els.btnCancelTextPrompt, apply: this.els.btnApplyTextPrompt, input: this.els.inputTextPrompt }
                ];
            }

            initState() {
                this.state = {
                    tableData: [], points: [], nodes: new Map(), uniqueNames: new Set(), activeInput: null,
                    bounds: { minX: 0, maxX: 0, minY: 0, maxY: 0 },
                    view: { scale: 1, offsetX: 0, offsetY: 0, isDragging: false, dragMoved: false, dragStartX: 0, dragStartY: 0, dragStartInternalX: 0, dragStartInternalY: 0, lastMouseX: 0, lastMouseY: 0, isRightDragging: false, rightDragMoved: false, isRotating: false, rotatingTarget: null, isMovingAnnotation: false, movingTarget: null, movingLayer: null, movingExtras: null, movingInitialState: null },
                    isClosed: false, detectedAreas: [], attributes: JSON.parse(JSON.stringify(this.CONFIG.defaultAttributes)),
                    dropdownSelectedIndex: -1, annotations: { texts: [], lines: [] },
                    interactionMode: 'pan', currentLine: [], selectedAnnotation: null, hoveredAnnotation: null, 
                    mapView: { isRightDragging: false, dragStartX: 0, dragStartY: 0, lastMouseX: 0, lastMouseY: 0, rightDragMoved: false }
                };
                document.body.classList.add('mode-pan');
                this.history = []; this.historyIndex = -1; this.isUndoing = false;
                this.importFilesList = []; this.selectedImportIndex = -1;
                this.isMapMode = false; this.map = null; this.mapLayerGroup = null;
            }

            loadInitialApp() {
                const isLoaded = this.loadFromLocalStorage();
                this.renderAttrTable();
                setTimeout(() => {
                    if (isLoaded) { this.renderTable(); this.resizeCanvas(); this.updateDrawing(true); } 
                    else { this.loadData(this.CONFIG.initialData); }
                    this.pushState(true);
                    if (navigator.onLine && !this.isMapMode) this.toggleMapMode();
                }, 200);
            }

            // ------------------------------------------
            // Events Binding
            // ------------------------------------------
            initEvents() {
                this._initToolbarEvents();
                this._initModalEvents();
                this._initSettingsEvents();
                this._initCanvasAndGlobalEvents();
                this._initDragDropEvents();
                this._initPropertyPanelEvents();
            }

            _initToolbarEvents() {
                bindClick(this.els.btnLoadDemo, () => {
                    this.showConfirm('現在のデータが上書きされます。デモデータを読み込みますか？', () => {
                        this.state.attributes = JSON.parse(JSON.stringify(this.CONFIG.defaultAttributes));
                        this.renderAttrTable(); this.loadData(this.CONFIG.initialData); this.pushState();
                    });
                });
                bindClick(this.els.btnClear, () => this.clearData());
                bindClick(this.els.btnCopyClipboard, () => this.copyToClipboard());
                bindClick(this.els.btnToggleMap, () => this.toggleMapMode());
                bindClick(this.els.btnUndo, () => this.undo());
                bindClick(this.els.btnRedo, () => this.redo());
                
                bindClick(this.els.btnSaveJSON, () => this.openExportModal('json'));
                bindClick(this.els.btnExportGeoJSON, () => this.openExportModal('geojson'));
                bindClick(this.els.btnExportHTML, () => this.openExportModal('html'));
                
                bindClick(this.els.btnPasteClipboard, () => this.openModal(this.els.pasteModal, this.els.pasteArea));
                this.els.tbody.addEventListener('paste', (e) => this.handlePaste(e));
                
                bindClick(this.els.btnOpenDMSModal, () => this.openModal(this.els.dmsModal, this.els.dmsArea));
                bindClick(this.els.btnCopyLatLon, () => this.copyLatLonToClipboard());
                
                bindClick(this.els.btnPasteAttr, () => this.openModal(this.els.attrPasteModal, this.els.attrPasteArea));
                bindClick(this.els.btnCopyAttr, () => this.copyAttrToClipboard());
                
                if (this.els.inputFileJSON) this.els.inputFileJSON.addEventListener('change', (e) => this.importJSON(e));
            }

            _initModalEvents() {
                this.modals.forEach(m => {
                    if (m.cancel) {
                        bindClick(m.cancel, () => {
                            if (document.activeElement) document.activeElement.blur();
                            m.el.style.display = 'none';
                            if (m.el === this.els.importPreviewModal) { this.importFilesList = []; this.els.inputFileJSON.value = ''; }
                            if (m.el === this.els.confirmModal) this.confirmCallback = null;
                            if (m.el === this.els.textPromptModal) this.textPromptCallback = null;
                        });
                    }
                });

                bindClick(this.els.btnApplyExport, () => {
                    if (document.activeElement) document.activeElement.blur();
                    const fileName = this.els.inputExportFileName.value.trim();
                    if (this.currentExportType === 'json') {
                        this.exportJSON(fileName);
                        this.els.exportModal.style.display = 'none';
                    }
                    else if (this.currentExportType === 'geojson') {
                        this.exportGeoJSON(fileName);
                        this.els.exportModal.style.display = 'none';
                    }
                    else if (this.currentExportType === 'html') {
                        const size = document.querySelector('input[name="paperSize"]:checked').value;
                        const orientation = document.querySelector('input[name="paperOrientation"]:checked').value;
                        let scaleOption = document.querySelector('input[name="printScale"]:checked').value;
                        if (scaleOption === 'custom') scaleOption = this.els.inputCustomScale.value;
                        const splitRows = parseInt($id('selSplitRows').value, 10) || 0;
                        this.showHTMLPreview(fileName, size, orientation, scaleOption, splitRows);
                        this.els.exportModal.style.display = 'none';
                    }
                });

                if (this.els.inputCustomScale) {
                    this.els.inputCustomScale.addEventListener('focus', () => this.els.radioCustomScale.checked = true);
                    this.els.inputCustomScale.addEventListener('click', () => this.els.radioCustomScale.checked = true);
                }

                bindClick(this.els.btnApplyImport, () => {
                    if (document.activeElement) document.activeElement.blur();
                    if (this.selectedImportIndex >= 0 && this.importFilesList[this.selectedImportIndex]) {
                        this.els.importPreviewModal.style.display = 'none';
                        this.applyImportData(this.importFilesList[this.selectedImportIndex].data);
                        this.importFilesList = []; this.els.inputFileJSON.value = '';
                    }
                });

                bindClick(this.els.btnApplyPaste, () => this.applyPasteModal());
                bindClick(this.els.btnApplyDMS, () => this.applyDMSModal());
                bindClick(this.els.btnApplyAttrPaste, () => this.applyAttrPasteModal());
                bindClick(this.els.btnApplyConfirm, () => {
                    if (document.activeElement) document.activeElement.blur();
                    this.els.confirmModal.style.display = 'none';
                    if (this.confirmCallback) { this.confirmCallback(); this.confirmCallback = null; }
                });

                bindClick(this.els.btnApplyTextPrompt, () => {
                    const text = this.els.inputTextPrompt.value.trim();
                    const color = this.els.inputTextColor.value || '#059669';
                    const fontSize = parseInt(this.els.inputTextSize.value, 10) || 14;
                    if (document.activeElement) document.activeElement.blur();
                    this.els.textPromptModal.style.display = 'none';
                    if (this.textPromptCallback && text) this.textPromptCallback(text, color, fontSize);
                    this.textPromptCallback = null;
                });

                this.els.inputTextPrompt.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') { this.els.btnApplyTextPrompt.click(); e.preventDefault(); }
                });
            }

            _initSettingsEvents() {
                const reDraw = (fit) => () => {
                    this.updateDrawing(fit);
                    this.saveToLocalStorage();
                    this.pushState();
                };
                this.els.chkCompassAdjustment.addEventListener('change', reDraw(true));
                bindClick(this.els.btnCalcMag, () => {
                    this.calculateMagDeclination();
                    this.saveToLocalStorage();
                    this.pushState();
                });
                this.els.inputDeclination.addEventListener('input', () => this.updateDrawing(false));
                this.els.inputDeclination.addEventListener('change', () => { this.saveToLocalStorage(); this.pushState(); });
                this.els.chkMagDeclination.addEventListener('change', reDraw(false));
                this.els.inputLat.addEventListener('change', () => { this.calculateMagDeclination(); this.saveToLocalStorage(); this.pushState(); });
                this.els.inputLon.addEventListener('change', () => { this.calculateMagDeclination(); this.saveToLocalStorage(); this.pushState(); });
                this.els.selNodeLabelInterval.addEventListener('change', reDraw(false));
                if (this.els.chkConvertEPtoBP) this.els.chkConvertEPtoBP.addEventListener('change', () => this.saveToLocalStorage());

                bindClick(this.els.btnCopyClosureInfo, () => this._execCopy(this.els.closureInfo.innerText, '閉合状況をクリップボードにコピーしました。'));
                bindClick(this.els.btnCopyDeclination, () => {
                    const dec = this.els.inputDeclination.value;
                    if (!dec) return this.showToast('偏角が入力されていません。');
                    this._execCopy(dec, '偏角をクリップボードにコピーしました。');
                });
            }

            _initCanvasAndGlobalEvents() {
                window.addEventListener('resize', () => this.resizeCanvas());
                this.els.canvas.addEventListener('wheel', this.handleWheel);
                this.els.canvas.addEventListener('mousedown', this.handleMouseDown);
                window.addEventListener('mouseup', this.handleMouseUp);
                window.addEventListener('mousemove', this.handleMouseMove);
                
                this.els.canvas.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    if (this.state.view.rightDragMoved) return;
                    if (this.state.interactionMode === 'line') this.finishCurrentLine();
                });

                bindClick(this.els.btnZoomFit, () => {
                    if (this.isMapMode && this.map && this.mapLayerGroup && this.mapLayerGroup.getLayers().length > 0) {
                        this.map.fitBounds(this.mapLayerGroup.getBounds(), { padding: [50, 50] });
                    } else {
                        this.autoFit(); this.draw();
                    }
                });

                document.addEventListener('mousedown', (e) => {
                    if (this.els.dropdown.style.display === 'block' && !this.els.dropdown.contains(e.target) && e.target !== this.state.activeInput) {
                        this.hideDropdown();
                    }
                });
                const tableContainer = document.querySelector('.table-container');
                if (tableContainer) tableContainer.addEventListener('scroll', () => this.hideDropdown());

                const setMode = (mode) => {
                    if (this.state.interactionMode === 'line' && this.state.currentLine.length > 0) this.finishCurrentLine();
                    this.state.interactionMode = mode;
                    ['btnModeSelect', 'btnModePan', 'btnModeText', 'btnModeLine', 'btnModeErase'].forEach(id => {
                        const btn = $id(id); if (btn) btn.classList.remove('active-btn');
                    });
                    const activeBtn = { 'select': 'btnModeSelect', 'pan': 'btnModePan', 'text': 'btnModeText', 'line': 'btnModeLine', 'erase': 'btnModeErase' }[mode];
                    if (activeBtn) $id(activeBtn).classList.add('active-btn');
                    
                    document.body.classList.remove('mode-select', 'mode-pan', 'mode-text', 'mode-line', 'mode-erase');
                    document.body.classList.add('mode-' + mode);
                    this._clearSelection();
                    if (this.map) this.map.dragging.enable();
                };

                bindClick(this.els.btnModeSelect, () => { setMode('select'); this.showToast('変更したいテキストや線をクリックしてください'); });
                bindClick(this.els.btnModePan, () => setMode('pan'));
                bindClick(this.els.btnModeText, () => { setMode('text'); this.showToast('キャンバス上をクリックしてテキストを追加します'); });
                bindClick(this.els.btnModeLine, () => { setMode('line'); this.showToast('クリックで頂点を追加、右クリックで線を確定します'); });
                bindClick(this.els.btnModeErase, () => { setMode('erase'); this.showToast('削除したいテキストや線をクリックしてください'); });

                document.addEventListener('keydown', (e) => {
                    const activeModal = this.modals.find(m => m.el && (m.el.style.display === 'flex' || m.el.style.display === 'block'));
                    
                    if (e.key === 'Escape') {
                        if (this.state.interactionMode === 'line') this.finishCurrentLine();
                        if (this.state.selectedAnnotation) this._clearSelection();
                        if (activeModal && activeModal.cancel) activeModal.cancel.click();
                    } else if (e.key === 'Enter') {
                        if (document.activeElement && document.activeElement.tagName.toLowerCase() === 'textarea') return;
                        if (activeModal && activeModal.apply && !activeModal.apply.disabled) {
                            e.preventDefault(); activeModal.apply.click();
                        }
                    } else if (e.ctrlKey || e.metaKey) {
                        if (e.key.toLowerCase() === 'z') { e.preventDefault(); e.shiftKey ? this.redo() : this.undo(); }
                        else if (e.key.toLowerCase() === 'y') { e.preventDefault(); this.redo(); }
                    }
                });
            }

            _initPropertyPanelEvents() {
                const updateProp = (key, val) => {
                    if (!this.state.selectedAnnotation) return;
                    this.state.selectedAnnotation.ref[key] = val;
                    this._redrawAll(); this.saveToLocalStorage();
                };
                const pushHistory = () => this.pushState();

                this.els.propColor.addEventListener('input', (e) => updateProp('color', e.target.value));
                this.els.propColor.addEventListener('change', pushHistory);
                this.els.propLineWidth.addEventListener('input', (e) => updateProp('lineWidth', parseInt(e.target.value, 10) || 2));
                this.els.propLineWidth.addEventListener('change', pushHistory);
                this.els.propLineStyle.addEventListener('change', (e) => { updateProp('lineStyle', e.target.value); pushHistory(); });
                this.els.propFontSize.addEventListener('input', (e) => updateProp('fontSize', parseInt(e.target.value, 10) || 14));
                this.els.propFontSize.addEventListener('change', pushHistory);
                bindClick(this.els.btnCloseProp, () => this._clearSelection());
            }

            _initDragDropEvents() {
                document.body.addEventListener('dragover', (e) => { e.preventDefault(); e.stopPropagation(); document.body.classList.add('drag-active'); });
                document.body.addEventListener('dragleave', (e) => { e.preventDefault(); e.stopPropagation(); if (e.clientX === 0 || e.clientY === 0) document.body.classList.remove('drag-active'); });
                document.body.addEventListener('drop', (e) => this.handleDrop(e));
            }

            // ------------------------------------------
            // State & Storage Management
            // ------------------------------------------
            loadFromLocalStorage() {
                try {
                    const saved = localStorage.getItem('compassSurveyApp_State');
                    if (saved) {
                        const parsed = JSON.parse(saved);
                        if (parsed.tableData && parsed.tableData.length > 0) {
                            this.state.tableData = parsed.tableData;
                            if (parsed.attributes) this.state.attributes = parsed.attributes;
                            if (parsed.annotations) this.state.annotations = parsed.annotations;
                            
                            const set = parsed.settings || {};
                            if (set.lat !== undefined) this.els.inputLat.value = set.lat;
                            if (set.lon !== undefined) this.els.inputLon.value = set.lon;
                            if (set.declination !== undefined) this.els.inputDeclination.value = set.declination;
                            if (set.magDeclinationChecked !== undefined) this.els.chkMagDeclination.checked = set.magDeclinationChecked;
                            if (set.compassAdjustmentChecked !== undefined) this.els.chkCompassAdjustment.checked = set.compassAdjustmentChecked;
                            if (set.convertEPtoBPChecked !== undefined && this.els.chkConvertEPtoBP) this.els.chkConvertEPtoBP.checked = set.convertEPtoBPChecked;
                            if (set.nodeLabelInterval !== undefined) this.els.selNodeLabelInterval.value = set.nodeLabelInterval;
                            
                            return true;
                        }
                    }
                } catch (e) { console.warn("Load failed", e); }
                return false;
            }

            saveToLocalStorage() {
                try {
                    const stateToSave = {
                        tableData: this.state.tableData, attributes: this.state.attributes, annotations: this.state.annotations,
                        settings: {
                            lat: this.els.inputLat.value, lon: this.els.inputLon.value, declination: this.els.inputDeclination.value,
                            magDeclinationChecked: this.els.chkMagDeclination.checked, compassAdjustmentChecked: this.els.chkCompassAdjustment.checked,
                            convertEPtoBPChecked: this.els.chkConvertEPtoBP ? this.els.chkConvertEPtoBP.checked : true,
                            nodeLabelInterval: this.els.selNodeLabelInterval.value
                        }
                    };
                    localStorage.setItem('compassSurveyApp_State', JSON.stringify(stateToSave));
                } catch (e) { console.warn("Save failed", e); }
            }

            loadData(data) {
                this.state.tableData = JSON.parse(JSON.stringify(data));
                this.renderTable(); this.resizeCanvas(); this.updateDrawing(true);
            }

            pushState(isInitial = false) {
                if (this.isUndoing) return;
                const currentState = {
                    tableData: JSON.parse(JSON.stringify(this.state.tableData)),
                    attributes: JSON.parse(JSON.stringify(this.state.attributes)),
                    annotations: JSON.parse(JSON.stringify(this.state.annotations)),
                    settings: {
                        lat: this.els.inputLat.value,
                        lon: this.els.inputLon.value,
                        declination: this.els.inputDeclination.value,
                        magDeclinationChecked: this.els.chkMagDeclination.checked,
                        compassAdjustmentChecked: this.els.chkCompassAdjustment.checked,
                        convertEPtoBPChecked: this.els.chkConvertEPtoBP ? this.els.chkConvertEPtoBP.checked : true,
                        nodeLabelInterval: this.els.selNodeLabelInterval.value
                    }
                };
                if (this.historyIndex < this.history.length - 1) this.history = this.history.slice(0, this.historyIndex + 1);
                if (this.history.length > 0 && !isInitial && JSON.stringify(this.history[this.history.length - 1]) === JSON.stringify(currentState)) return;

                this.history.push(currentState);
                if (this.history.length > 50) this.history.shift(); else this.historyIndex++;
                this.updateUndoRedoButtons();
            }

            undo() {
                if (this.historyIndex > 0) {
                    this._clearSelection(); this.historyIndex--;
                    this.restoreState(this.history[this.historyIndex]); this.updateUndoRedoButtons();
                }
            }

            redo() {
                if (this.historyIndex < this.history.length - 1) {
                    this._clearSelection(); this.historyIndex++;
                    this.restoreState(this.history[this.historyIndex]); this.updateUndoRedoButtons();
                }
            }

            restoreState(savedState) {
                this.isUndoing = true;
                this.state.tableData = JSON.parse(JSON.stringify(savedState.tableData));
                this.state.attributes = JSON.parse(JSON.stringify(savedState.attributes));
                this.state.annotations = savedState.annotations ? JSON.parse(JSON.stringify(savedState.annotations)) : { texts: [], lines: [] };
                
                if (savedState.settings) {
                    ['lat','lon','declination'].forEach(k => { if(savedState.settings[k]!==undefined) this.els['input'+k.charAt(0).toUpperCase()+k.slice(1)].value = savedState.settings[k]; });
                    ['magDeclinationChecked','compassAdjustmentChecked'].forEach(k => { if(savedState.settings[k]!==undefined) this.els['chk'+k.charAt(0).toUpperCase()+k.slice(1).replace('Checked','')].checked = savedState.settings[k]; });
                    if(savedState.settings.convertEPtoBPChecked !== undefined && this.els.chkConvertEPtoBP) this.els.chkConvertEPtoBP.checked = savedState.settings.convertEPtoBPChecked;
                    if(savedState.settings.nodeLabelInterval !== undefined) this.els.selNodeLabelInterval.value = savedState.settings.nodeLabelInterval;
                }
                
                this.renderAttrTable(); this.renderTable(); this.updateDrawing(false); this.saveToLocalStorage();
                this.isUndoing = false;
            }

            updateUndoRedoButtons() {
                const updateBtn = (btn, condition) => {
                    if (btn) {
                        btn.disabled = !condition;
                        btn.style.opacity = condition ? '1' : '0.5';
                        btn.style.cursor = condition ? 'pointer' : 'not-allowed';
                    }
                };
                updateBtn(this.els.btnUndo, this.historyIndex > 0);
                updateBtn(this.els.btnRedo, this.historyIndex < this.history.length - 1);
            }

            // ------------------------------------------
            // Utility & UI Helpers
            // ------------------------------------------


            // ★地図のズームレベルに関わらず、画面上のピクセルサイズを内部距離(m)に変換する関数


            _showTextPrompt(internalX, internalY) {
                this.openModal(this.els.textPromptModal, this.els.inputTextPrompt);
                this.textPromptCallback = (text, color, fontSize) => {
                    if (!this.state.annotations) this.state.annotations = { texts: [], lines: [] };
                    
                    const currentDec = this.els.chkMagDeclination.checked ? (parseFloat(this.els.inputDeclination.value) || 0) : 0;
                    const rad = Utils.deg2rad(currentDec);
                    const cos = Math.cos(-rad);
                    const sin = Math.sin(-rad);
                    
                    const centerX = internalX;
                    const centerY = internalY;
                    
                    const baseX = centerX * cos - centerY * sin;
                    const baseY = centerX * sin + centerY * cos;
                    const baseRotation = rad;

                    this.state.annotations.texts.push({ 
                        text, x: centerX, y: centerY, color, fontSize, rotation: 0, 
                        baseX: baseX, baseY: baseY, baseRotation: baseRotation 
                    });
                    this.saveToLocalStorage(); this.pushState(); this._redrawAll();
                };
            }









            _execCopy(text, successMsg) {
                if (!text) return this.showToast('コピーするデータがありません。');
                const ta = document.createElement("textarea");
                ta.value = text; ta.style.position = "fixed"; ta.style.left = "-9999px"; document.body.appendChild(ta);
                ta.focus(); ta.select();
                try { document.execCommand('copy') ? this.showToast(successMsg) : this.showToast('コピーに失敗しました。'); } 
                catch (err) { this.showToast('コピーに失敗しました。'); }
                document.body.removeChild(ta);
            }

            copyAttrToClipboard() { this._execCopy(this.state.attributes.map(a => `${a.name}\t${a.value}`).join('\n'), '属性データをクリップボードにコピーしました。'); }
            copyLatLonToClipboard() {
                const lat = this.els.inputLat.value, lon = this.els.inputLon.value;
                if (!lat || !lon) return this.showToast('緯度経度が入力されていません。');
                this._execCopy(`${lat}, ${lon}`, '緯度経度をクリップボードにコピーしました。');
            }
            copyToClipboard() { this._execCopy(this.state.tableData.map(r => r.join('\t')).join('\n'), '測量データをクリップボードにコピーしました。'); }

            showConfirm(message, callback, title = '確認') {
                this.els.confirmTitle.textContent = title;
                this.els.confirmMessage.textContent = message;
                this.confirmCallback = callback;
                this.els.confirmModal.style.display = 'flex';
            }

            clearData() {
                this.showConfirm('すべての測量データをクリアしますか？', () => {
                    this.state.tableData = []; this.renderTable(); this.updateDrawing(true);
                    this.saveToLocalStorage(); this.pushState(); this.showToast('データをクリアしました。');
                });
            }

            showToast(msg) {
                const toast = $id('toast'); toast.textContent = msg; toast.classList.add('show');
                setTimeout(() => toast.classList.remove('show'), 3000);
            }

            openModal(modalEl, textAreaEl) {
                modalEl.style.display = 'flex';
                if (textAreaEl) { textAreaEl.value = ''; setTimeout(() => textAreaEl.focus(), 100); }
            }
            
            closeModal(modalEl, textAreaEl) {
                modalEl.style.display = 'none';
                if (textAreaEl) textAreaEl.value = '';
            }

            openExportModal(type) {
                this.currentExportType = type;
                const attrValues = this.state.attributes.map(a => a.value ? a.value.trim() : '').filter(v => v !== '');
                this.els.inputExportFileName.value = attrValues.length > 0 ? attrValues.join('_') : '令和8年度_育成複層林整備_山田太郎_No.10';
                
                if (type === 'json') { 
                    this.els.exportModalTitle.textContent = 'データの保存 (JSON)'; 
                    this.els.exportExtension.textContent = '.json'; 
                    this.els.htmlExportOptions.style.display = 'none'; 
                    this.els.btnApplyExport.textContent = '保存';
                }
                else if (type === 'geojson') { 
                    this.els.exportModalTitle.textContent = 'GeoJSON出力'; 
                    this.els.exportExtension.textContent = '.geojson'; 
                    this.els.htmlExportOptions.style.display = 'none'; 
                    this.els.btnApplyExport.textContent = '保存';
                }
                else if (type === 'html') { 
                    this.els.exportModalTitle.textContent = '平面図出力設定'; 
                    this.els.exportExtension.textContent = '.html'; 
                    this.els.htmlExportOptions.style.display = 'block'; 
                    this.els.btnApplyExport.textContent = 'プレビュー';
                }
                this.openModal(this.els.exportModal);
                setTimeout(() => {
                    this.els.inputExportFileName.focus();
                    this.els.inputExportFileName.select();
                }, 100);
            }

            calculateMagDeclination(shouldDraw = true) {
                const lat = parseFloat(this.els.inputLat.value), lon = parseFloat(this.els.inputLon.value);
                if (isNaN(lat) || isNaN(lon)) return this.els.inputDeclination.value = '0.00';
                this.els.inputDeclination.value = Utils.calculateMagDeclination(lat, lon).toFixed(2);
                if (shouldDraw) this.updateDrawing(false); 
            }

            // ------------------------------------------
            // Rendering UI (Tables)
            // ------------------------------------------
            renderTable() {
                this.els.tbody.innerHTML = '';
                this.state.tableData.forEach((row, i) => this.els.tbody.appendChild(this.createRow(row, i)));
                this.els.tbody.appendChild(this.createRow(['', '', '', '', '', false], this.state.tableData.length));
                this.updateUniqueNames();
            }

            createRow(rowData, index) {
                const tr = document.createElement('tr'); tr.dataset.index = index;
                const ph = ['BP', '1', '45.30', '10.5', '12.34'];
                
                for (let i = 0; i < 5; i++) {
                    const td = document.createElement('td'); const inp = document.createElement('input');
                    inp.type = i < 2 ? 'text' : 'number'; if (i >= 2) inp.step = 'any';
                    inp.value = rowData[i] || ''; inp.placeholder = ph[i];
                    this.setupRowEvents(inp, index, i, tr);
                    td.appendChild(inp); tr.appendChild(td);
                }

                const isAux = rowData[5] === true || rowData[5] === 'true';
                if (rowData.length < 6) rowData[5] = isAux;

                const tdAux = document.createElement('td'), chkAux = document.createElement('input');
                chkAux.type = 'checkbox'; chkAux.checked = isAux; chkAux.title = 'チェックを入れると作図から除外され、補助線になります';
                chkAux.addEventListener('change', (e) => { this.state.tableData[index][5] = e.target.checked; this.updateDrawing(false); this.saveToLocalStorage(); this.pushState(); });
                tdAux.appendChild(chkAux); tr.appendChild(tdAux);

                const tdAction = document.createElement('td'); tdAction.className = 'action-col';
                const btnIn = document.createElement('button'), btnDel = document.createElement('button');
                btnIn.className = 'small'; btnIn.textContent = '＋'; btnIn.onclick = () => { this.state.tableData.splice(index + 1, 0, ['', '', '', '', '', false]); this.renderTable(); this.saveToLocalStorage(); this.pushState(); };
                btnDel.className = 'small danger'; btnDel.textContent = '－'; btnDel.onclick = () => { this.state.tableData.splice(index, 1); this.renderTable(); this.updateDrawing(); this.saveToLocalStorage(); this.pushState(); };
                tdAction.appendChild(btnIn); tdAction.appendChild(btnDel); tr.appendChild(tdAction);

                this.validateRow(tr);
                return tr;
            }

            validateRow(tr) {
                const fromInp = tr.cells[0]?.querySelector('input'), toInp = tr.cells[1]?.querySelector('input');
                if (!fromInp || !toInp) return;
                const fVal = fromInp.value.trim(), tVal = toInp.value.trim();
                if (fVal && tVal && fVal === tVal) {
                    fromInp.classList.add('error'); toInp.classList.add('error');
                    fromInp.title = '警告: 器械点と視準点が同じ名前です'; toInp.title = '警告: 器械点と視準点が同じ名前です';
                } else {
                    fromInp.classList.remove('error'); toInp.classList.remove('error');
                    fromInp.title = ''; toInp.title = '';
                }
            }

            setupRowEvents(input, index, colIndex, tr) {
                input.addEventListener('focus', () => {
                    this.state.activeInput = input;
                    if (colIndex < 2) this.addDropdown(input, colIndex, index);
                });
                input.addEventListener('input', (e) => {
                    if (index >= this.state.tableData.length) { this.state.tableData.push(['', '', '', '', '', false]); this.els.tbody.appendChild(this.createRow(['', '', '', '', '', false], this.state.tableData.length)); }
                    this.state.tableData[index][colIndex] = e.target.value;
                    if (colIndex < 2) { this.addDropdown(input, colIndex, index); this.updateUniqueNames(); this.validateRow(tr); }
                    this.updateDrawing();
                });
                input.addEventListener('change', () => this.pushState());
                input.addEventListener('keydown', (e) => {
                    const visible = this.els.dropdown.style.display === 'block', items = this.els.dropdown.querySelectorAll('li');
                    if (visible && items.length > 0) {
                        if (e.key === 'ArrowDown') { e.preventDefault(); this.state.dropdownSelectedIndex = Math.min(this.state.dropdownSelectedIndex + 1, items.length - 1); this.updateDropdownSelection(items); return; }
                        if (e.key === 'ArrowUp') { e.preventDefault(); this.state.dropdownSelectedIndex = Math.max(this.state.dropdownSelectedIndex - 1, 0); this.updateDropdownSelection(items); return; }
                        if (e.key === 'Escape') { this.hideDropdown(); return; }
                    }
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        if (visible && this.state.dropdownSelectedIndex >= 0 && items[this.state.dropdownSelectedIndex]) { this.applyDropdownSelection(input, colIndex, index, items[this.state.dropdownSelectedIndex].dataset.value, tr); return; }
                        this.hideDropdown();
                        const nextCol = colIndex + 1;
                        if (nextCol < 5) tr.cells[nextCol].querySelector('input').focus();
                        else if (tr.nextElementSibling) tr.nextElementSibling.cells[0].querySelector('input').focus();
                    } else if (e.key === 'Tab') { this.hideDropdown(); }
                });
            }

            renderAttrTable() {
                this.els.attrTableBody.innerHTML = '';
                this.state.attributes.forEach((attr, index) => {
                    const tr = document.createElement('tr');
                    const tdN = document.createElement('td'), inpN = document.createElement('input');
                    inpN.type = 'text'; inpN.value = attr.name; inpN.placeholder = '項目名';
                    inpN.addEventListener('input', e => { this.state.attributes[index].name = e.target.value; this.saveToLocalStorage(); });
                    inpN.addEventListener('change', () => this.pushState());
                    tdN.appendChild(inpN);
                    
                    const tdV = document.createElement('td'), inpV = document.createElement('input');
                    inpV.type = 'text'; inpV.value = attr.value; inpV.placeholder = '値';
                    inpV.addEventListener('input', e => { this.state.attributes[index].value = e.target.value; this.saveToLocalStorage(); });
                    inpV.addEventListener('change', () => this.pushState());
                    tdV.appendChild(inpV);
                    
                    const tdA = document.createElement('td'); tdA.className = 'action-col';
                    const btnI = document.createElement('button'), btnD = document.createElement('button');
                    btnI.className = 'small'; btnI.textContent = '＋'; btnI.addEventListener('click', () => { this.state.attributes.splice(index + 1, 0, { name: '', value: '' }); this.renderAttrTable(); this.saveToLocalStorage(); this.pushState(); });
                    btnD.className = 'small danger'; btnD.textContent = '－'; btnD.addEventListener('click', () => { this.state.attributes.splice(index, 1); this.renderAttrTable(); this.saveToLocalStorage(); this.pushState(); });
                    tdA.appendChild(btnI); tdA.appendChild(btnD);
                    tr.appendChild(tdN); tr.appendChild(tdV); tr.appendChild(tdA);
                    this.els.attrTableBody.appendChild(tr);
                });
            }

            _renderAreaResults(complexAreas) {
                const container = $id('areaResults');
                if (complexAreas.length > 0) {
                    container.style.display = 'block';
                    let html = '<div style="display: flex; justify-content: flex-start; align-items: center; gap: 8px; margin-bottom: 2px;"><div style="font-weight: bold; color: #217270; font-size: 0.75rem;">■ 区画ごとの面積</div><button id="btnCopyAreaResults" class="small" style="background-color: #2E5C8A; color: white; height: 20px; font-size: 0.7rem; padding: 2px 4px;">📋 コピー</button></div><div class="area-container">';
                    let totalNetArea = 0, holeGlobalIndex = 1, copyText = '区画名 面積(ha)\n'; 
                    
                    complexAreas.forEach((a, i) => {
                        const netHaTxt = Utils.round4(a.netArea / 10000); totalNetArea += parseFloat(netHaTxt);
                        let donutL = '', donutC = '';
                        if (a.isDonut) {
                            const totalHaTxt = Utils.round4(a.area / 10000);
                            copyText += `区画 ${i + 1} (全体)  ${totalHaTxt} ha\n`;
                            a.holes.forEach(h => {
                                const hAreaTxt = Utils.round4(h.area / 10000); h.globalIndex = holeGlobalIndex;
                                donutC += `  － 除地 ${h.globalIndex}  ${hAreaTxt} ha\n`; holeGlobalIndex++;
                            });
                            donutL = `<span style="font-size:0.75rem; color:#A13D44; margin-left:4px;">(内 除地あり)</span>`;
                            copyText += donutC;
                            copyText += `区画 ${i + 1} 小計  ${netHaTxt} ha\n`;
                        } else {
                            copyText += `区画 ${i + 1}  ${netHaTxt} ha\n`;
                        }
                        html += `<div class="area-item"><span>区画${i+1}:</span><strong>${netHaTxt} ha</strong>${donutL}</div>`;
                        a.originalName = `区画 ${i + 1}`;
                    });
                    html += '</div>';
                    if (complexAreas.length > 1) {
                        const tTxt = Utils.round4(totalNetArea);
                        html += `<div class="area-total"><span>合計面積:</span><span>${tTxt} ha</span></div>`; copyText += `合計 ${tTxt}\n`;
                    }
                    container.innerHTML = html;
                    bindClick($id('btnCopyAreaResults'), () => this._execCopy(copyText.trim(), '面積結果をクリップボードにコピーしました。'));
                } else {
                    container.style.display = 'none';
                }
            }

            updateClosureInfo(errorX, errorY, totalLength, isClosed) {
                const info = this.els.closureInfo;
                info.style.display = 'inline-block'; info.style.fontWeight = 'normal';
                if (totalLength === 0) { info.style.color = '#9ca3af'; info.innerHTML = `（閉合誤差：- m　閉合比：-　面積：- ha　周長：- m）`; return; }
                const errDist = Math.sqrt(errorX * errorX + errorY * errorY), ratio = errDist > 0 ? totalLength / errDist : 0;
                if (this.els.chkCompassAdjustment.checked && isClosed) {
                    info.style.color = '#064e3b';
                    const polyPts = [{x: 0, y: 0}, ...this.state.points.filter(p => p.type === 'main' && p.isDraw).map(p => ({x: p.toX, y: p.toY}))];
                    info.innerHTML = `（閉合誤差：${errDist.toFixed(3)}m　閉合比：1/${Math.round(ratio).toLocaleString()}　面積：${Utils.round4(Utils.calculatePolygonArea(polyPts) / 10000)}ha　周長：${totalLength.toFixed(1)}m）`;
                } else {
                    info.style.color = '#1f2937'; info.innerHTML = `（閉合誤差：- m　閉合比：-　面積：- ha　周長：- m）`;
                }
            }

            // ------------------------------------------
            // Data Parsers & Handlers
            // ------------------------------------------
            handlePaste(e) {
                e.preventDefault();
                this.els.pasteArea.value = (e.clipboardData || window.clipboardData).getData('text');
                this.openModal(this.els.pasteModal, this.els.pasteArea);
            }

            applyPasteModal() {
                const text = this.els.pasteArea.value;
                if (!text) return this.showToast('データが入力されていません。');
                
                const rows = text.split(/\r\n|\n|\r/).filter(r => r.trim() !== '');
                const newData = []; let hasValidData = false;
                rows.forEach(rowStr => {
                    const cells = rowStr.split('\t');
                    if (cells.length >= 2) {
                        const newRow = ['', '', '', '', '', false]; 
                        for (let i = 0; i < Math.min(cells.length, 5); i++) {
                            let val = cells[i] ? cells[i].trim() : '';
                            if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
                            newRow[i] = val;
                        }
                        if (cells.length > 5) {
                            let val = cells[5].trim().toLowerCase();
                            if (['true','1','補助線','はい'].includes(val)) newRow[5] = true;
                        }
                        newData.push(newRow); hasValidData = true;
                    }
                });

                if (hasValidData) {
                    this.state.tableData = newData;
                    if (this.els.chkConvertEPtoBP && this.els.chkConvertEPtoBP.checked) this.resolveEPtoBP();
                    this.renderTable(); this.updateDrawing(true); this.saveToLocalStorage(); this.pushState();
                    this.showToast('データを貼り付けました。'); this.closeModal(this.els.pasteModal, this.els.pasteArea);
                } else {
                    this.showToast('有効なデータが見つかりませんでした。タブ区切りのデータが必要です。');
                }
            }

            applyDMSModal() {
                const text = this.els.dmsArea.value.trim();
                if (!text) return this.showToast('データが入力されていません。');
                let lat = null, lon = null;
                const decMatch = text.match(/^\s*(-?\d+\.\d+)\s*[, ]\s*(-?\d+\.\d+)\s*$/);
                
                if (decMatch) { lat = parseFloat(decMatch[1]); lon = parseFloat(decMatch[2]); } 
                else {
                    const dmsRegex = /(\d+)[^\d\w]+(\d+)[^\d\w]+(\d+(?:\.\d+)?)[^\d\w]*([NSEW])/gi;
                    const coords = []; let m;
                    while ((m = dmsRegex.exec(text)) !== null) {
                        let val = parseFloat(m[1]) + parseFloat(m[2])/60 + parseFloat(m[3])/3600;
                        if (m[4]?.toUpperCase() === 'S' || m[4]?.toUpperCase() === 'W') val = -val;
                        coords.push(val);
                    }
                    if (coords.length >= 2) { lat = coords[0]; lon = coords[1]; } 
                    else {
                        const lines = text.split(/\r\n|\n|\r/).filter(l => l.trim() !== '');
                        if (lines.length >= 2) { lat = Utils.parseDMS(lines[0]); lon = Utils.parseDMS(lines[1]); }
                    }
                }

                if (lat !== null && lon !== null && !isNaN(lat) && !isNaN(lon)) {
                    this.els.inputLat.value = lat.toFixed(6); this.els.inputLon.value = lon.toFixed(6);
                    this.calculateMagDeclination(); this.showToast('座標を変換して反映しました。');
                    this.closeModal(this.els.dmsModal, this.els.dmsArea);
                } else { this.showToast('正しい座標形式で読み取れませんでした。'); }
            }

            applyAttrPasteModal() {
                const text = this.els.attrPasteArea.value;
                if (!text) return this.showToast('データが入力されていません。');
                const rows = text.split(/\r\n|\n|\r/).filter(r => r.trim() !== '');
                if (rows.length === 0) return this.showToast('有効なデータがありません。');

                if (rows.some(r => r.includes('\t'))) {
                    const newAttrs = [];
                    rows.forEach(rowStr => {
                        const cells = rowStr.split('\t');
                        let name = (cells[0] || '').trim(), value = (cells[1] || '').trim();
                        if (name.startsWith('"') && name.endsWith('"')) name = name.slice(1, -1);
                        if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
                        newAttrs.push({ name, value });
                    });
                    this.state.attributes = newAttrs;
                } else {
                    rows.forEach((rowStr, i) => {
                        let val = rowStr.trim();
                        if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
                        if (i < this.state.attributes.length) this.state.attributes[i].value = val;
                        else this.state.attributes.push({ name: '', value: val });
                    });
                }
                this.renderAttrTable(); this.saveToLocalStorage(); this.pushState();
                this.showToast('属性データを貼り付けました。'); this.closeModal(this.els.attrPasteModal, this.els.attrPasteArea);
            }

            resolveEPtoBP() {
                const firstStation = this._getFirstPointName();
                if (!firstStation) return;
                for (let i = this.state.tableData.length - 1; i >= 0; i--) {
                    if (this.state.tableData[i].join('').trim() !== '') {
                        if (/^e\.?p\.?$/i.test((this.state.tableData[i][1] || '').trim())) this.state.tableData[i][1] = firstStation;
                        break;
                    }
                }
            }

            // ------------------------------------------
            // Dropdown & Point Name Management
            // ------------------------------------------
            _getFirstPointName() { return this.state.tableData.length > 0 && this.state.tableData[0][0] ? this.state.tableData[0][0].trim() : 'BP'; }

            generateNextPointName(prevName) {
                if (!prevName || /^b\.?p\.?$/i.test(prevName)) return '1';
                if (/^(\d+)$/.test(prevName)) return `${parseInt(prevName, 10) + 1}`;
                if (/^No\.?\s*(\d+)$/i.test(prevName)) return `No.${parseInt(prevName.match(/\d+/)[0], 10) + 1}`;
                if (/^T-?\s*(\d+)$/i.test(prevName)) return `T-${parseInt(prevName.match(/\d+/)[0], 10) + 1}`;
                return '';
            }

            updateUniqueNames() {
                this.state.uniqueNames.clear();
                this.state.tableData.forEach(r => { if (r[0]) this.state.uniqueNames.add(r[0].trim()); if (r[1]) this.state.uniqueNames.add(r[1].trim()); });
            }

            addDropdown(input, colIndex, rowIndex) {
                const val = input.value.toLowerCase();
                this.els.dropdown.innerHTML = ''; this.state.dropdownSelectedIndex = -1; let hasItems = false;
                const addOption = (text, isAuto = false) => {
                    const li = document.createElement('li'); li.dataset.value = text;
                    li.innerHTML = isAuto ? `<span style="color:var(--primary);font-weight:bold;">✨ ${text}</span> (自動)` : text;
                    li.onmousedown = (e) => { e.preventDefault(); e.stopPropagation(); this.applyDropdownSelection(input, colIndex, rowIndex, text, input.closest('tr')); };
                    this.els.dropdown.appendChild(li); hasItems = true;
                };

                if (colIndex === 0) {
                    if (rowIndex === 0 && !val) addOption('BP', true);
                    else if (rowIndex > 0 && this.state.tableData[rowIndex - 1]?.[1] && !val) addOption(this.state.tableData[rowIndex - 1][1], true);
                } else if (colIndex === 1) {
                    if (this.state.tableData[rowIndex]?.[0] && !val) {
                        const next = this.generateNextPointName(this.state.tableData[rowIndex][0]);
                        if (next) addOption(next, true);
                    }
                }

                Array.from(this.state.uniqueNames).filter(n => n.toLowerCase().includes(val)).forEach(s => addOption(s));

                if (hasItems) {
                    const rect = input.getBoundingClientRect();
                    this.els.dropdown.style.left = `${rect.left}px`; this.els.dropdown.style.width = `${rect.width}px`;
                    this.els.dropdown.style.display = 'block';
                    const ddH = this.els.dropdown.offsetHeight;
                    if (rect.bottom + ddH > window.innerHeight) {
                        this.els.dropdown.style.top = `${rect.top - ddH}px`; this.els.dropdown.style.boxShadow = '0 -4px 6px -1px rgba(0,0,0,0.1)';
                    } else {
                        this.els.dropdown.style.top = `${rect.bottom}px`; this.els.dropdown.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)';
                    }
                } else { this.hideDropdown(); }
            }

            updateDropdownSelection(items) {
                items.forEach((item, idx) => {
                    if (idx === this.state.dropdownSelectedIndex) { item.classList.add('active'); item.scrollIntoView({ block: 'nearest' }); } 
                    else { item.classList.remove('active'); }
                });
            }

            applyDropdownSelection(input, colIndex, rowIndex, text, tr) {
                input.value = text;
                if (rowIndex >= this.state.tableData.length) {
                    this.state.tableData.push(['', '', '', '', '', false]);
                    this.els.tbody.appendChild(this.createRow(['', '', '', '', '', false], this.state.tableData.length));
                }
                this.state.tableData[rowIndex][colIndex] = text;
                this.hideDropdown(); this.updateUniqueNames(); this.validateRow(tr); this.updateDrawing(); this.saveToLocalStorage(); this.pushState();
                
                const nextCol = colIndex + 1;
                if (nextCol < 5) tr.cells[nextCol].querySelector('input').focus();
                else if (tr.nextElementSibling) tr.nextElementSibling.cells[0].querySelector('input').focus();
            }

            hideDropdown() { this.els.dropdown.style.display = 'none'; }

            // ------------------------------------------
            // Survey Core Logics (Coordinates & Areas)
            // ------------------------------------------






















            // ------------------------------------------
            // Canvas Drawing
            // ------------------------------------------
























            handleWheel = (e) => {
                if (this.isMapMode) return;
                e.preventDefault(); const old = this.state.view.scale;
                this.state.view.scale *= (e.deltaY < 0) ? this.CONFIG.canvas.zoomFactor : (1 / this.CONFIG.canvas.zoomFactor);
                const ratio = this.state.view.scale / old;
                this.state.view.offsetX = e.offsetX - (e.offsetX - this.state.view.offsetX) * ratio;
                this.state.view.offsetY = e.offsetY - (e.offsetY - this.state.view.offsetY) * ratio;
                this.draw();
            };

            handleMouseDown = (e) => {
                if (this.isMapMode) return;
                e.preventDefault();

                const r = this.els.canvas.getBoundingClientRect(), mX = e.clientX - r.left, mY = e.clientY - r.top;
                
                if (e.button === 2) {
                    this.state.view.isRightDragging = true; this.state.view.rightDragMoved = false;
                    this.state.view.dragStartX = this.state.view.lastMouseX = e.clientX; this.state.view.dragStartY = this.state.view.lastMouseY = e.clientY;
                    document.body.classList.add('right-dragging'); return; 
                }

                if (e.button === 0) {
                    const target = this._findAnnotationAtCanvas(mX, mY);
                    if (target) {
                        if (target.type === 'handle') { 
                            this.state.view.isRotating = true; 
                            this.state.view.rotatingTarget = target.target; 
                            document.body.classList.add('left-dragging'); 
                            return; 
                        } else if (this.state.interactionMode === 'select') {
                            this._selectAnnotation(target);
                            this.state.view.isMovingAnnotation = true;
                            this.state.view.movingTarget = target;
                            this.state.view.dragMoved = false;
                            this.state.view.dragStartX = this.state.view.lastMouseX = e.clientX; 
                            this.state.view.dragStartY = this.state.view.lastMouseY = e.clientY;
                            
                            this.state.view.dragStartInternalX = (mX - this.state.view.offsetX) / this.state.view.scale;
                            this.state.view.dragStartInternalY = (this.state.view.offsetY - mY) / this.state.view.scale;
                            this.state.view.movingInitialState = JSON.parse(JSON.stringify(target.ref));
                            
                            document.body.classList.add('left-dragging');
                            return;
                        }
                    }
                    this.state.view.isDragging = true; this.state.view.dragMoved = false;
                    this.state.view.dragStartX = this.state.view.lastMouseX = e.clientX; this.state.view.dragStartY = this.state.view.lastMouseY = e.clientY;
                }
            };



            handleMouseUp = (e) => {
                if (e.button === 2) {
                    this.state.view.isRightDragging = false; if (this.state.mapView) this.state.mapView.isRightDragging = false;
                    document.body.classList.remove('right-dragging');
                }
                if (e.button === 0) {
                    if (this.state.view.isRotating) { 
                        this.state.view.isRotating = false; 
                        this.state.view.rotatingTarget = null; 
                        document.body.classList.remove('left-dragging'); 
                        this.saveToLocalStorage(); 
                        this.pushState(); 
                        if (this.isMapMode && this.map) {
                            this.map.dragging.enable();
                            this.updateMapDrawing(false);
                        }
                        return; 
                    }
                    if (this.state.view.isMovingAnnotation) {
                        this.state.view.isMovingAnnotation = false;
                        this.state.view.movingTarget = null;
                        this.state.view.movingLayer = null;
                        this.state.view.movingExtras = null;
                        document.body.classList.remove('left-dragging');
                        if (this.isMapMode && this.map) this.map.dragging.enable();

                        if (this.state.view.dragMoved) {
                            this.saveToLocalStorage();
                            this.pushState();
                            if (this.isMapMode) this.updateMapDrawing(false); 
                        }
                        return;
                    }
                    if (this.state.view.isDragging) {
                        this.state.view.isDragging = false; document.body.classList.remove('left-dragging');
                        if (!this.state.view.dragMoved) {
                            const r = this.els.canvas.getBoundingClientRect(), mx = e.clientX - r.left, my = e.clientY - r.top;
                            const ix = (mx - this.state.view.offsetX) / this.state.view.scale, iy = (this.state.view.offsetY - my) / this.state.view.scale;

                            if (this.state.interactionMode === 'text') this._showTextPrompt(ix, iy);
                            else if (this.state.interactionMode === 'line') { this.state.currentLine.push({ x: ix, y: iy }); this.state.view.currentMouseInternalX = ix; this.state.view.currentMouseInternalY = iy; this._redrawAll(); }
                            else if (this.state.interactionMode === 'select' || this.state.interactionMode === 'erase') {
                                const target = this._findAnnotationAtCanvas(mx, my);
                                if (target && target.type !== 'handle') {
                                    if (this.state.interactionMode === 'select') this._selectAnnotation(target);
                                    else { if (target.type === 'text') this.state.annotations.texts.splice(target.index, 1); else if (target.type === 'line') this.state.annotations.lines.splice(target.index, 1); this.saveToLocalStorage(); this.pushState(); this._redrawAll(); }
                                } else if (this.state.interactionMode === 'select') this._clearSelection();
                            }
                        }
                    }
                }
            };

            // ==== CanvasとMapのドラッグ操作を統合したhandleMouseMove ====
            handleMouseMove = (e) => {
                if (this.isMapMode && this.state.mapView.isRightDragging) {
                    const dx = e.clientX - this.state.mapView.lastMouseX, dy = e.clientY - this.state.mapView.lastMouseY;
                    if (!this.state.mapView.rightDragMoved && (Math.abs(e.clientX - this.state.mapView.dragStartX) > 5 || Math.abs(e.clientY - this.state.mapView.dragStartY) > 5)) this.state.mapView.rightDragMoved = true;
                    if (this.state.mapView.rightDragMoved) this.map.panBy([-dx, -dy], {animate: false});
                    this.state.mapView.lastMouseX = e.clientX; this.state.mapView.lastMouseY = e.clientY;
                    return;
                }

                // 1. 【共通化】現在のマウス位置から「内部座標」を計算する
                let currentInternalX, currentInternalY, mX, mY;
                if (this.isMapMode) {
                    const rect = this.els.mapContainer.getBoundingClientRect();
                    mX = e.clientX - rect.left;
                    mY = e.clientY - rect.top;
                    const point = L.point(mX, mY);
                    const latlng = this.map.containerPointToLatLng(point);
                    const im = this.getInternalCoordsFromLatLng(latlng.lat, latlng.lng);
                    currentInternalX = im.x;
                    currentInternalY = im.y;
                } else {
                    const r = this.els.canvas.getBoundingClientRect();
                    mX = e.clientX - r.left; 
                    mY = e.clientY - r.top;
                    currentInternalX = (mX - this.state.view.offsetX) / this.state.view.scale;
                    currentInternalY = (this.state.view.offsetY - mY) / this.state.view.scale;
                }

                // 2. 回転処理 (isRotating)
                if (this.state.view.isRotating && this.state.view.rotatingTarget) {
                    const ref = this.state.view.rotatingTarget.ref;
                    let cPx, cPy;

                    if (this.isMapMode) {
                        let cx, cy;
                        if (this.state.view.rotatingTarget.type === 'text') {
                            cx = ref.x; cy = ref.y;
                        } else {
                            let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
                            ref.points.forEach(p => { if(p.x<minX)minX=p.x; if(p.x>maxX)maxX=p.x; if(p.y<minY)minY=p.y; if(p.y>maxY)maxY=p.y; });
                            cx = (minX + maxX) / 2; cy = (minY + maxY) / 2;
                        }
                        const latlng = this._getRotLatLng({x: cx, y: cy}, cx, cy, 0); 
                        const pt = this.map.latLngToContainerPoint([latlng[0], latlng[1]]);
                        const rect = this.els.mapContainer.getBoundingClientRect();
                        cPx = pt.x + rect.left;
                        cPy = pt.y + rect.top;
                    } else {
                        let cx, cy;
                        if (this.state.view.rotatingTarget.type === 'text') {
                            cx = ref.x; cy = ref.y;
                        } else {
                            let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
                            ref.points.forEach(p => { if(p.x<minX)minX=p.x; if(p.x>maxX)maxX=p.x; if(p.y<minY)minY=p.y; if(p.y>maxY)maxY=p.y; });
                            cx = (minX + maxX) / 2; cy = (minY + maxY) / 2;
                        }
                        const r = this.els.canvas.getBoundingClientRect();
                        cPx = r.left + this.state.view.offsetX + cx * this.state.view.scale;
                        cPy = r.top + this.state.view.offsetY - cy * this.state.view.scale;
                    }

                    const currentDec = this.els.chkMagDeclination.checked ? (parseFloat(this.els.inputDeclination.value) || 0) : 0;
                    
                    ref.rotation = Math.atan2(e.clientY - cPy, e.clientX - cPx) + Math.PI / 2;
                    ref.baseRotation = ref.rotation + Utils.deg2rad(currentDec);

                    this._updateLiveAnnotationDrawing();
                    
                    this.state.view.lastMouseX = e.clientX;
                    this.state.view.lastMouseY = e.clientY;
                    return;
                }

                // 3. 移動処理 (isMovingAnnotation)
                if (this.state.view.isMovingAnnotation && this.state.view.movingTarget && this.state.view.movingInitialState) {
                    const dx = e.clientX - this.state.view.dragStartX;
                    const dy = e.clientY - this.state.view.dragStartY;
                    
                    if (!this.state.view.dragMoved && (Math.abs(dx) > 2 || Math.abs(dy) > 2)) {
                        this.state.view.dragMoved = true;
                        document.body.classList.add('left-dragging');
                    }

                    if (this.state.view.dragMoved) {
                        const internalDx = currentInternalX - this.state.view.dragStartInternalX;
                        const internalDy = currentInternalY - this.state.view.dragStartInternalY;
                        
                        const currentDec = this.els.chkMagDeclination.checked ? (parseFloat(this.els.inputDeclination.value) || 0) : 0;
                        const rad = Utils.deg2rad(currentDec);
                        const cos = Math.cos(-rad);
                        const sin = Math.sin(-rad);
                        
                        const baseDx = internalDx * cos - internalDy * sin;
                        const baseDy = internalDx * sin + internalDy * cos;

                        const ref = this.state.view.movingTarget.ref;
                        const initRef = this.state.view.movingInitialState;
                        
                        if (this.state.view.movingTarget.type === 'text') {
                            ref.x = initRef.x + internalDx;
                            ref.y = initRef.y + internalDy;
                            ref.baseX = initRef.baseX + baseDx;
                            ref.baseY = initRef.baseY + baseDy;
                        } else if (this.state.view.movingTarget.type === 'line') {
                            ref.points.forEach((p, i) => {
                                p.x = initRef.points[i].x + internalDx;
                                p.y = initRef.points[i].y + internalDy;
                                p.baseX = initRef.points[i].baseX + baseDx;
                                p.baseY = initRef.points[i].baseY + baseDy;
                            });
                        }
                        
                        this._updateLiveAnnotationDrawing();
                    }

                    this.state.view.lastMouseX = e.clientX;
                    this.state.view.lastMouseY = e.clientY;
                    return;
                }

                // 4. キャンバスパン移動処理
                if (this.state.view.isRightDragging || this.state.view.isDragging) {
                    const isRight = this.state.view.isRightDragging;
                    const dx = e.clientX - this.state.view.lastMouseX, dy = e.clientY - this.state.view.lastMouseY;
                    const dragMovedKey = isRight ? 'rightDragMoved' : 'dragMoved';
                    if (!this.state.view[dragMovedKey] && (Math.abs(e.clientX - this.state.view.dragStartX) > 5 || Math.abs(e.clientY - this.state.view.dragStartY) > 5)) {
                        this.state.view[dragMovedKey] = true; if (!isRight) document.body.classList.add('left-dragging');
                    }
                    if (this.state.view[dragMovedKey]) { this.state.view.offsetX += dx; this.state.view.offsetY += dy; this.draw(); }
                    this.state.view.lastMouseX = e.clientX; this.state.view.lastMouseY = e.clientY;
                }

                // 5. ライン描画モード時のガイド線
                if (this.state.interactionMode === 'line') {
                    this.state.view.currentMouseInternalX = currentInternalX;
                    this.state.view.currentMouseInternalY = currentInternalY;
                    if (this.state.currentLine.length > 0) {
                        if (this.isMapMode) {
                            this._updateMapTempLine();
                        } else {
                            this.draw(); 
                        }
                    }
                }

                // 6. キャンバスホバー判定 (isMapMode ではない場合のみ)
                if (!this.isMapMode && ['pan', 'erase', 'select'].includes(this.state.interactionMode)) {
                    const { offsetX, offsetY, scale } = this.state.view;
                    const lat0 = parseFloat(this.els.inputLat.value) || 0, lon0 = parseFloat(this.els.inputLon.value) || 0;
                    const lonDPM = CONSTANTS.LAT_DEG_PER_METER / Math.cos(Utils.deg2rad(lat0));
                    
                    if (['select', 'erase'].includes(this.state.interactionMode)) {
                        const target = this._findAnnotationAtCanvas(mX, mY);
                        let changed = false;
                        const h = this.state.hoveredAnnotation;
                        
                        if (target) {
                            if (!h || h.type !== target.type || (target.type !== 'handle' && h.index !== target.index)) {
                                this.state.hoveredAnnotation = target;
                                changed = true;
                            }
                            if (target.type === 'handle') {
                                document.body.classList.add('hovering-handle');
                                document.body.classList.remove('hovering-annotation');
                            } else {
                                document.body.classList.add('hovering-annotation');
                                document.body.classList.remove('hovering-handle');
                            }
                        } else {
                            if (h) {
                                this.state.hoveredAnnotation = null;
                                changed = true;
                            }
                            document.body.classList.remove('hovering-annotation', 'hovering-handle');
                        }
                        if (changed) this.draw(); 
                    }

                    let hit = false;
                    for (let [name, node] of this.state.nodes) {
                        const px = offsetX + node.x * scale, py = offsetY - node.y * scale;
                        if (Math.sqrt(Math.pow(mX - px, 2) + Math.pow(mY - py, 2)) < this.CONFIG.canvas.hitRadius) { 
                            hit = true; this.els.tooltip.style.opacity = 1; this.els.tooltip.style.left = `${e.clientX + 15}px`; this.els.tooltip.style.top = `${e.clientY + 15}px`;
                            this.els.tooltip.innerHTML = `<strong>${name}</strong><br>X: ${node.x.toFixed(2)}m<br>Y: ${node.y.toFixed(2)}m<hr style="margin:4px 0;border-color:rgba(255,255,255,0.2);"><span style="color:#a7f3d0">Lat: ${(lat0 + node.y * CONSTANTS.LAT_DEG_PER_METER).toFixed(6)}<br>Lon: ${(lon0 + node.x * lonDPM).toFixed(6)}</span>`;
                            break;
                        }
                    }
                    if (!hit) this.els.tooltip.style.opacity = 0;
                } else { 
                    this.els.tooltip.style.opacity = 0; 
                }
            };

            // リアルタイム描画更新用メソッド



            // ------------------------------------------
            // Map (Leaflet) Interactions
            // ------------------------------------------




















            // ------------------------------------------
            // Data Exports
            // ------------------------------------------
























            // ------------------------------------------
            // File Imports (Drag & Drop)
            // ------------------------------------------
            async handleDrop(e) {
                e.preventDefault(); e.stopPropagation(); document.body.classList.remove('drag-active');
                if (!e.dataTransfer) return; const jsonFiles = [], items = e.dataTransfer.items;
                if (items) { const ps = []; for(let i=0; i<items.length; i++) { const it = items[i].webkitGetAsEntry(); if (it) ps.push(this.traverseFileTree(it, jsonFiles)); } await Promise.all(ps); } 
                else if (e.dataTransfer.files) Array.from(e.dataTransfer.files).forEach(f => { if (f.name.toLowerCase().endsWith('.json')) jsonFiles.push(f); });
                this.processJsonFiles(jsonFiles);
            }

            async traverseFileTree(item, fileList) {
                if (item.isFile) return new Promise(res => item.file(f => { if (f.name.toLowerCase().endsWith('.json')) fileList.push(f); res(); }));
                else if (item.isDirectory) {
                    const reader = item.createReader();
                    const entries = await (async () => { let all = [], ents; do { ents = await new Promise(r => reader.readEntries(r)); all = all.concat(ents); } while (ents.length > 0); return all; })();
                    await Promise.all(entries.map(e => this.traverseFileTree(e, fileList)));
                }
            }



            async processJsonFiles(jsonFiles) {
                if (jsonFiles.length === 0) { this.showToast('JSONファイルが見つかりませんでした。'); if (this.els.inputFileJSON) this.els.inputFileJSON.value = ''; return; }
                this.importFilesList = []; this.selectedImportIndex = -1; this.els.importFileList.innerHTML = '';
                this.els.importPreviewImage.style.display = 'none'; this.els.importNoPreviewText.style.display = 'inline-block';
                this.els.importPreviewInfo.innerHTML = ''; this.els.btnApplyImport.disabled = true;
                this.els.importPreviewModal.style.display = 'flex'; this.els.importNoPreviewText.textContent = '読み込み中...';

                const results = await Promise.all(jsonFiles.map(file => new Promise(res => {
                    const r = new FileReader();
                    r.onload = e => { try { const s = JSON.parse(e.target.result); res((s && Array.isArray(s.tableData)) ? { file, name: file.name, data: s } : null); } catch(err) { res(null); } };
                    r.onerror = () => res(null); r.readAsText(file);
                })));

                this.importFilesList = results.filter(i => i !== null).sort((a, b) => a.name.localeCompare(b.name));
                if (this.importFilesList.length === 0) { this.els.importNoPreviewText.textContent = '有効なデータが見つかりませんでした。'; return; }
                this.renderImportFileList(); this.selectImportFile(0);
            }






        }
        window.onload = () => { window.app = new CompassSurveyApp(); };
Object.assign(CompassSurveyApp.prototype, surveyMath);
Object.assign(CompassSurveyApp.prototype, drawing);
Object.assign(CompassSurveyApp.prototype, mapView);
Object.assign(CompassSurveyApp.prototype, exportUtils);
