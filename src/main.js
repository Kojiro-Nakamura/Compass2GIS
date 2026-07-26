import { $id, bindClick, CONSTANTS, Utils } from './utils.js';

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
            _redrawAll() {
                this.draw();
                if (this.isMapMode) { this.updateMapDrawing(false); this._updateMapTempLine(); }
            }

            // ★地図のズームレベルに関わらず、画面上のピクセルサイズを内部距離(m)に変換する関数
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
            }

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

            getInternalCoordsFromLatLng(lat, lon) {
                const lat0 = parseFloat(this.els.inputLat.value) || 0, lon0 = parseFloat(this.els.inputLon.value) || 0;
                const lonDegPerMeter = CONSTANTS.LAT_DEG_PER_METER / Math.cos(Utils.deg2rad(lat0));
                return { x: (lon - lon0) / lonDegPerMeter, y: (lat - lat0) / CONSTANTS.LAT_DEG_PER_METER };
            }

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
            }

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
            }

            _clearSelection() {
                if (this.state.selectedAnnotation !== null) {
                    this.state.selectedAnnotation = null;
                    this.els.propertyPanel.style.display = 'none';
                    this._redrawAll();
                }
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
            }

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
            }

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
            }

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
            }

            findClosedAreas() {
                if (!this.els.chkCompassAdjustment.checked) { this.state.detectedAreas = []; $id('areaResults').style.display = 'none'; return; }
                const { edges, adj } = this._buildAdjacencyGraph();
                const allFaces = this._extractFaces(edges, adj);
                const nodeToComponent = this._identifyConnectedComponents(adj);
                const finalFaces = this._removeOuterBoundary(allFaces, nodeToComponent);
                this.state.detectedAreas = this._buildPolygonHierarchy(finalFaces);
                this._renderAreaResults(this.state.detectedAreas);
            }

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
            }

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
            }

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
            }

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
            }

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
            }

            updateBounds() {
                if (this.state.nodes.size === 0) return;
                let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
                this.state.nodes.forEach(n => {
                    if(n.x<minX)minX=n.x; if(n.x>maxX)maxX=n.x; if(n.y<minY)minY=n.y; if(n.y>maxY)maxY=n.y;
                });
                this.state.bounds = { minX, maxX, minY, maxY };
            }

            // ------------------------------------------
            // Canvas Drawing
            // ------------------------------------------
            resizeCanvas() {
                this.els.canvas.width = this.els.container.clientWidth; this.els.canvas.height = this.els.container.clientHeight;
                this.draw(); if (this.isMapMode && this.map) this.map.invalidateSize();
            }

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
            }

            updateDrawing(fit = false) {
                this.calculateCoordinates(); this.findClosedAreas();
                if (fit || this.state.nodes.size === 2) this.autoFit();
                this.draw(); if (this.isMapMode) this.updateMapDrawing(fit); 
            }

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
            }

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
            }

            _drawAreas(ctx, offsetX, offsetY, scale, detectedAreas, nodes) {
                detectedAreas.forEach(a => {
                    ctx.beginPath();
                    a.path.forEach((n, idx) => { const node = nodes.get(n); if (idx === 0) ctx.moveTo(offsetX + node.x * scale, offsetY - node.y * scale); else ctx.lineTo(offsetX + node.x * scale, offsetY - node.y * scale); });
                    ctx.closePath();
                    if (a.isDonut) a.holes.forEach(h => { h.path.forEach((n, idx) => { const node = nodes.get(n); if (idx === 0) ctx.moveTo(offsetX + node.x * scale, offsetY - node.y * scale); else ctx.lineTo(offsetX + node.x * scale, offsetY - node.y * scale); }); ctx.closePath(); });
                    ctx.fillStyle = this.CONFIG.colors.areaFill; ctx.fill('evenodd');
                });
            }

            _drawLines(ctx, offsetX, offsetY, scale, points) {
                points.forEach(p => {
                    const px1 = offsetX + p.fromX * scale, py1 = offsetY - p.fromY * scale, px2 = offsetX + p.toX * scale, py2 = offsetY - p.toY * scale;
                    if (!p.isDraw) {
                        ctx.beginPath(); ctx.strokeStyle = '#9ca3af'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 4]); ctx.moveTo(px1, py1); ctx.lineTo(px2, py2); ctx.stroke(); ctx.setLineDash([]); return;
                    }
                    ctx.beginPath(); ctx.strokeStyle = '#ffffff'; ctx.lineWidth = p.type === 'branch' ? 3.5 : 4; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.moveTo(px1, py1); ctx.lineTo(px2, py2); ctx.stroke();
                    ctx.beginPath(); ctx.strokeStyle = p.type === 'branch' ? this.CONFIG.colors.lineBranch : this.CONFIG.colors.lineMain; ctx.lineWidth = p.type === 'branch' ? 1.5 : 2; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.moveTo(px1, py1); ctx.lineTo(px2, py2); ctx.stroke();
                });
            }

            _drawNodes(ctx, offsetX, offsetY, scale, nodes, drawText = true) {
                const fp = this._getFirstPointName(), intv = parseInt(this.els.selNodeLabelInterval.value, 10);
                const sNode = nodes.get(fp); if(sNode) this._drawSingleNode(ctx, offsetX + sNode.x * scale, offsetY - sNode.y * scale, true, fp, drawText);
                let nIdx = 1;
                nodes.forEach((node, name) => {
                    if (name === fp && Math.abs(node.x) < 0.001 && Math.abs(node.y) < 0.001) return;
                    this._drawSingleNode(ctx, offsetX + node.x * scale, offsetY - node.y * scale, false, name, drawText && (intv === 1 || (intv > 1 && nIdx % intv === 0)));
                    nIdx++;
                });
            }

            _drawSingleNode(ctx, px, py, isStart, name, showText) {
                ctx.beginPath(); ctx.arc(px, py, this.CONFIG.canvas.nodeRadius, 0, Math.PI * 2); ctx.fillStyle = isStart ? this.CONFIG.colors.startNode : this.CONFIG.colors.normalNode; ctx.fill(); ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1.5; ctx.stroke();
                if (showText) { ctx.fillStyle = this.CONFIG.colors.text; ctx.font = '12px sans-serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'; ctx.fillText(name, px + 8, py - 8); }
            }

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
            }

            _drawGrid(ctx, offsetX, offsetY, scale) {
                const gs = this.CONFIG.canvas.gridBaseSize * scale; if (gs < 10 || gs > 500) return;
                ctx.strokeStyle = this.CONFIG.colors.gridSub; ctx.lineWidth = 1;
                const sx = Math.floor((-offsetX) / gs) * gs, sy = Math.floor((-offsetY) / gs) * gs;
                ctx.beginPath();
                for (let x = sx; x < this.els.canvas.width - offsetX; x += gs) { ctx.moveTo(offsetX + x, 0); ctx.lineTo(offsetX + x, this.els.canvas.height); }
                for (let y = sy; y < this.els.canvas.height - offsetY; y += gs) { ctx.moveTo(0, offsetY + y); ctx.lineTo(this.els.canvas.width, offsetY + y); }
                ctx.stroke();
                ctx.beginPath(); ctx.strokeStyle = this.CONFIG.colors.gridMain; ctx.moveTo(offsetX, 0); ctx.lineTo(offsetX, this.els.canvas.height); ctx.moveTo(0, offsetY); ctx.lineTo(this.els.canvas.width, offsetY); ctx.stroke();
            }

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
            }

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
            }

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
            _updateLiveAnnotationDrawing() {
                if (this.isMapMode) {
                    this.updateMapDrawing(false);
                } else {
                    this.draw();
                }
            }


            // ------------------------------------------
            // Map (Leaflet) Interactions
            // ------------------------------------------
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
            }

            handleMapClick(e) {
                if (['pan', 'erase', 'select'].includes(this.state.interactionMode)) { if (this.state.interactionMode === 'select') this._clearSelection(); return; }
                const coords = this.getInternalCoordsFromLatLng(e.latlng.lat, e.latlng.lng);
                if (this.state.interactionMode === 'text') this._showTextPrompt(coords.x, coords.y);
                else if (this.state.interactionMode === 'line') { this.state.currentLine.push({ x: coords.x, y: coords.y }); this.state.view.currentMouseInternalX = coords.x; this.state.view.currentMouseInternalY = coords.y; this._redrawAll(); }
            }

            _updateMapTempLine() {
                if (!this.tempLineLayer) return;
                if (this.state.interactionMode === 'line' && this.state.currentLine.length > 0) {
                    const lat0 = parseFloat(this.els.inputLat.value) || 0, lon0 = parseFloat(this.els.inputLon.value) || 0, lonDPM = CONSTANTS.LAT_DEG_PER_METER / Math.cos(Utils.deg2rad(lat0));
                    const latlngs = this.state.currentLine.map(pt => [lat0 + pt.y * CONSTANTS.LAT_DEG_PER_METER, lon0 + pt.x * lonDPM]);
                    if (this.state.view.currentMouseInternalX !== undefined) latlngs.push([lat0 + this.state.view.currentMouseInternalY * CONSTANTS.LAT_DEG_PER_METER, lon0 + this.state.view.currentMouseInternalX * lonDPM]);
                    this.tempLineLayer.setLatLngs(latlngs);
                } else { this.tempLineLayer.setLatLngs([]); }
            }

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
            }

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
            }

            _getRotLatLng(pt, cx, cy, rot) {
                const lat0 = parseFloat(this.els.inputLat.value) || 0, lon0 = parseFloat(this.els.inputLon.value) || 0;
                const lonDPM = CONSTANTS.LAT_DEG_PER_METER / Math.cos(Utils.deg2rad(lat0));
                const dx = pt.x - cx, dy = pt.y - cy, cos = Math.cos(rot), sin = Math.sin(rot);
                return [lat0 + (cy - dx * sin + dy * cos) * CONSTANTS.LAT_DEG_PER_METER, lon0 + (cx + dx * cos + dy * sin) * lonDPM];
            }

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
            }

            _drawMapAreas(lat0, lon0, lonDPM) {
                this.state.detectedAreas.forEach(a => {
                    const lls = [a.path.map(n => [lat0 + (this.state.nodes.get(n).y * CONSTANTS.LAT_DEG_PER_METER), lon0 + (this.state.nodes.get(n).x * lonDPM)])];
                    if (a.isDonut) a.holes.forEach(h => lls.push(h.path.map(n => [lat0 + (this.state.nodes.get(n).y * CONSTANTS.LAT_DEG_PER_METER), lon0 + (this.state.nodes.get(n).x * lonDPM)])));
                    L.polygon(lls, { stroke: false, fillColor: '#217270', fillOpacity: 0.25, interactive: false }).addTo(this.mapLayerGroup);
                });
            }

            _drawMapLines(lat0, lon0, lonDPM) {
                this.state.points.forEach(p => {
                    const coords = [[lat0 + p.fromY * CONSTANTS.LAT_DEG_PER_METER, lon0 + p.fromX * lonDPM], [lat0 + p.toY * CONSTANTS.LAT_DEG_PER_METER, lon0 + p.toX * lonDPM]];
                    if (!p.isDraw) { L.polyline(coords, { color: '#9ca3af', weight: 3, opacity: 0.8, dashArray: '5, 5', interactive: false }).addTo(this.mapLayerGroup); return; }
                    L.polyline(coords, { color: '#ffffff', weight: p.type === 'branch' ? 6 : 7, opacity: 0.9, lineCap: 'round', lineJoin: 'round', interactive: false }).addTo(this.mapLayerGroup);
                    L.polyline(coords, { color: p.type === 'branch' ? this.CONFIG.colors.lineBranch : this.CONFIG.colors.lineMain, weight: p.type === 'branch' ? 3 : 4, opacity: 0.9, lineCap: 'round', lineJoin: 'round', interactive: false }).addTo(this.mapLayerGroup);
                });
            }

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
            }

            // ------------------------------------------
            // Data Exports
            // ------------------------------------------
            exportGeoJSON(fileName) {
                const lat0 = parseFloat(this.els.inputLat.value), lon0 = parseFloat(this.els.inputLon.value);
                if (isNaN(lat0) || isNaN(lon0)) return this.showToast("基準点(B.P.)の緯度・経度を正しく入力してください。");
                const lonDPM = CONSTANTS.LAT_DEG_PER_METER / Math.cos(Utils.deg2rad(lat0)), features = [], customProps = {};
                this.state.attributes.forEach(a => { if (a.name) customProps[a.name] = a.value; });
                const fp = this._getFirstPointName();
                
                features.push({ type: "Feature", properties: { "測点名": fp, "緯度": parseFloat(lat0.toFixed(6)), "経度": parseFloat(lon0.toFixed(6)), ...customProps }, geometry: { type: "Point", coordinates: [lon0, lat0] } });
                this.state.nodes.forEach((node, name) => {
                    if (name === fp && Math.abs(node.x) < 0.001 && Math.abs(node.y) < 0.001) return;
                    features.push({ type: "Feature", properties: { "測点名": name, "緯度": parseFloat((lat0 + node.y * CONSTANTS.LAT_DEG_PER_METER).toFixed(6)), "経度": parseFloat((lon0 + node.x * lonDPM).toFixed(6)), ...customProps }, geometry: { type: "Point", coordinates: [lon0 + node.x * lonDPM, lat0 + node.y * CONSTANTS.LAT_DEG_PER_METER] } });
                });

                if (this.els.chkCompassAdjustment.checked) {
                    this.state.detectedAreas.forEach(p => {
                        const coords = [p.coords]; p.holes.forEach(h => coords.push(h.coords));
                        features.push({ type: "Feature", properties: { name: p.originalName, "全体面積(m2)": parseFloat(p.area.toFixed(2)), "除地面積(m2)": parseFloat((p.area - p.netArea).toFixed(2)), "正味面積(m2)": parseFloat(p.netArea.toFixed(2)), "全体面積(ha)": parseFloat(Utils.round4(p.area / 10000)), "除地面積(ha)": parseFloat(Utils.round4((p.area - p.netArea) / 10000)), "正味面積(ha)": parseFloat(Utils.round4(p.netArea / 10000)), "周長(m)": parseFloat(p.perimeter.toFixed(2)), "構造": p.isDonut ? `ドーナツポリゴン（${p.holes.length}つの穴）` : "通常ポリゴン", ...customProps }, geometry: { type: "Polygon", coordinates: coords } });
                    });
                }
                this.state.points.forEach(p => {
                    features.push({ type: "Feature", properties: { "タイプ": p.type === 'main' ? '本線' : '支線', "作図対象": p.isDraw ? 'はい' : 'いいえ', "器械点": p.fromName, "視準点": p.toName, "方位角": parseFloat(p.input.az.toFixed(2)), "高低角": p.input.el, "斜距離": p.input.sd, "水平距離": parseFloat(p.input.hd.toFixed(2)), ...customProps }, geometry: { type: "LineString", coordinates: [[lon0 + p.fromX * lonDPM, lat0 + p.fromY * CONSTANTS.LAT_DEG_PER_METER], [lon0 + p.toX * lonDPM, lat0 + p.toY * CONSTANTS.LAT_DEG_PER_METER]] } });
                });
                if (this.state.annotations) {
                    this.state.annotations.texts.forEach(t => features.push({ type: "Feature", properties: { "タイプ": "注記", "テキスト": t.text, "文字色": t.color || '#059669', "サイズ": t.fontSize || 14, "回転角度": parseFloat(((t.rotation || 0) * 180 / Math.PI).toFixed(2)), ...customProps }, geometry: { type: "Point", coordinates: [lon0 + t.x * lonDPM, lat0 + t.y * CONSTANTS.LAT_DEG_PER_METER] } }));
                    this.state.annotations.lines.forEach(l => features.push({ type: "Feature", properties: { "タイプ": "連続線", "回転角度": parseFloat(((l.rotation || 0) * 180 / Math.PI).toFixed(2)), ...customProps }, geometry: { type: "LineString", coordinates: l.points.map(pt => [lon0 + pt.x * lonDPM, lat0 + pt.y * CONSTANTS.LAT_DEG_PER_METER]) } }));
                }

                if (!fileName) fileName = '令和8年度_育成複層林整備_山田太郎_No.10';
                if (!fileName.endsWith('.geojson')) fileName += '.geojson';
                this._downloadFile("data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ type: "FeatureCollection", features }, null, 2)), fileName);
            }

            showHTMLPreview(fileName, pSize = 'A4', ori = 'landscape', sOpt = 'auto', split = 50) {
                const origMag = this.els.chkMagDeclination.checked; this.els.chkMagDeclination.checked = false;
                this.calculateCoordinates(); this.findClosedAreas();

                const lat = parseFloat(this.els.inputLat.value) || 0, lon = parseFloat(this.els.inputLon.value) || 0, dec = this.els.inputDeclination.value, conf = CONSTANTS.PAPER_CONFIGS[`${pSize}_${ori}`];
                const resTable = this._buildExportHTMLResultsTable(split), { expScale, expOffsetX, expOffsetY, displayScaleText } = this._calcExportScaleOptions(conf, sOpt);
                const attrTable = this._buildExportHTMLAttrTable(displayScaleText, lat, lon, dec), areaTable = this._buildExportHTMLAreaTable();
                
                const showMapBg = this.isMapMode;
                
                let currentTileUrl = 'https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png';
                if (this.map) {
                    this.map.eachLayer(layer => {
                        if (layer instanceof L.TileLayer) {
                            currentTileUrl = layer._url;
                        }
                    });
                }
                
                // SVG（背景となる線や面、ドットのみ出力する）と、ドラッグ可能なテキスト群（HTML）を生成
                const expRes = this._generateExportSVGDataURL(conf, expScale, expOffsetX, expOffsetY);
                const compSVG = this._generateCompassSVGDataURL(conf, dec);
                const labelsHTML = this._generateDraggableLabelsHTML(expScale, expOffsetX, expOffsetY, expRes.pxPerMm, expRes.x, expRes.y);
                
                // 地図ビュー用の緯度経度境界を計算
                // 地図ビュー用の緯度経度境界を計算 (printMapBg が用紙全体と同じサイズになるため)
                const ixLeft = -expOffsetX / expScale;
                const iyTop = expOffsetY / expScale;
                const ixRight = (conf.expW - expOffsetX) / expScale;
                const iyBottom = (expOffsetY - conf.expH) / expScale;

                const lonDegPerMeter = CONSTANTS.LAT_DEG_PER_METER / Math.cos(Utils.deg2rad(lat));
                const latTop = lat + iyTop * CONSTANTS.LAT_DEG_PER_METER;
                const lonLeft = lon + ixLeft * lonDegPerMeter;
                const latBottom = lat + iyBottom * CONSTANTS.LAT_DEG_PER_METER;
                const lonRight = lon + ixRight * lonDegPerMeter;
                
                let outFileName = fileName || 'compass_survey_data';
                if (!outFileName.endsWith('.html')) outFileName += '.html';

                const htmlContent = `<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><title>平面図 (${pSize} ${ori})</title>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/><script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"><\/script>
<style>
@page { size: ${pSize} ${ori}; margin: 0; }
body { font-family: sans-serif; font-size: 10pt; background: #ececec; margin:0; padding-top: 60px; }
.page-wrapper { width: 100%; display: flex; justify-content: center; }
.page-container { position: relative; width: ${conf.w}mm; height: ${conf.h}mm; background: #fff; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.2); transform-origin: top center; transition: transform 0.1s ease; margin-bottom: 20px; }
.draggable { position: absolute; z-index: 2; background: rgba(255,255,255,0.85); cursor: move; transform-origin: top left; white-space: nowrap; box-sizing: border-box; }
.draggable.no-bg { background: transparent; }
.draggable:hover, .sub-draggable:hover, .map-group:hover { box-shadow: 0 0 12px rgba(46,92,138,0.4); outline: 2px dashed rgba(46,92,138,0.6); z-index: 10; }
.compass-image { position: absolute; bottom: 30mm; left: 25mm; width: 30mm; height: 30mm; z-index: 3; }
table { border-collapse: collapse; border: 1px solid #000; } th, td { border: 1px solid #000; padding: 6px; } th { background: #f2f2f2; }
.attr-table-wrapper { top: 15mm; left: 15mm; } .result-table-wrapper { top: 15mm; right: 15mm; transform-origin: top right; } .area-table-wrapper { top: 80mm; left: 15mm; }
.instruction { position: fixed; top: 0; left: 0; width: 100%; box-sizing: border-box; background: #3f3f46; color: white; padding: 10px 20px; display: flex; justify-content: space-between; align-items: center; z-index: 100; box-shadow: 0 2px 4px rgba(0,0,0,0.2); }
.btn { background: #2E5C8A; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 0.9rem; font-weight: bold; margin-left: 10px; }
.btn-save { background: #059669; }
.btn-zoom { background: #52525b; color: white; border: 1px solid #71717a; border-radius: 4px; width: 24px; height: 24px; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; padding: 0; line-height: 1; transition: all 0.2s; }
.btn-zoom:hover { background: #6366f1; border-color: #818cf8; }
.map-cropper { outline: 1px dashed transparent; pointer-events: auto; }
.map-group:hover .map-cropper, .map-cropper.active { outline-color: #f59e0b; }
.resize-handle { position: absolute; width: 12px; height: 12px; background: #fff; border: 1px solid #333; display: none; z-index: 10; pointer-events: auto; }
.map-group:hover .resize-handle, .map-cropper.active .resize-handle { display: block; }
.resize-handle.n { top: -6px; left: calc(50% - 6px); cursor: ns-resize; }
.resize-handle.s { bottom: -6px; left: calc(50% - 6px); cursor: ns-resize; }
.resize-handle.e { top: calc(50% - 6px); right: -6px; cursor: ew-resize; }
.resize-handle.w { top: calc(50% - 6px); left: -6px; cursor: ew-resize; }
.resize-handle.ne { top: -6px; right: -6px; cursor: nesw-resize; }
.resize-handle.nw { top: -6px; left: -6px; cursor: nwse-resize; }
.resize-handle.se { bottom: -6px; right: -6px; cursor: nwse-resize; }
.resize-handle.sw { bottom: -6px; left: -6px; cursor: nesw-resize; }
@media print { body { background: none; padding: 0; } .page-wrapper { display: block; } .page-container { box-shadow: none; page-break-after: always; transform: none !important; margin: 0; } .instruction, .draggable:hover, .sub-draggable:hover, .map-group:hover, .resize-handle { display: none !important; outline: none; box-shadow: none; } .map-cropper { outline: none !important; } }
</style></head><body>
<div class="instruction" id="toolbar">
    <div style="display: flex; align-items: center; gap: 15px;">
        <span>💡 図面全体、または表、文字要素を個別にドラッグして自由に移動・調整できます。</span>
        <div style="display: flex; align-items: center; gap: 6px; background: rgba(0,0,0,0.2); padding: 4px 10px; border-radius: 6px;">
            <span style="font-size: 0.85rem;">表示倍率:</span>
            <button class="btn-zoom" id="btnZoomOut" title="縮小">－</button>
            <span id="zoomLevel" style="font-size: 0.9rem; min-width: 45px; text-align: center; font-weight: bold;">100%</span>
            <button class="btn-zoom" id="btnZoomIn" title="拡大">＋</button>
            <button class="btn-zoom" id="btnFitScreen" title="画面に合わせる" style="width: auto; padding: 0 8px; font-size: 0.8rem; margin-left: 4px;">⛶ フィット</button>
            <label style="font-size:13px; margin-left: 10px; cursor: pointer; color: white;"><input type="checkbox" id="chkBgMap" ${showMapBg ? 'checked' : ''}> 背景地図</label>
            <select id="bgMapType" style="margin-left:5px; font-size:13px; padding: 2px;">
                <option value="https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png" ${currentTileUrl.includes('std') ? 'selected' : ''}>標準地図</option>
                <option value="https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg" ${currentTileUrl.includes('seamlessphoto') ? 'selected' : ''}>写真</option>
                <option value="https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png" ${currentTileUrl.includes('pale') ? 'selected' : ''}>淡色地図</option>
            </select>
        </div>
    </div>
    <div>
        <button class="btn" onclick="window.print()">🖨️ 印刷</button>
        <button class="btn btn-save" id="btnSaveHTML">💾 HTML保存</button>
    </div>
</div>
<div class="page-wrapper">
    <div class="page-container">
        <div class="map-group draggable no-bg no-scale" style="position: absolute; left: ${expRes.x / expRes.pxPerMm}mm; top: ${expRes.y / expRes.pxPerMm}mm; width: ${expRes.w / expRes.pxPerMm}mm; height: ${expRes.h / expRes.pxPerMm}mm; z-index: 1;">
            <div id="map-cropper" class="map-cropper" style="position:absolute; z-index:0; top: ${-(expRes.y / expRes.pxPerMm) + 10}mm; left: ${-(expRes.x / expRes.pxPerMm) + 10}mm; width: ${conf.w - 20}mm; height: ${conf.h - 20}mm; overflow:hidden;">
                <div id="printMapBg" style="position:absolute; top: -10mm; left: -10mm; width: ${conf.w}mm; height: ${conf.h}mm; z-index: 0; opacity: 0.7; pointer-events: none;"></div>
                <div class="resize-handle n" data-dir="n"></div><div class="resize-handle s" data-dir="s"></div><div class="resize-handle w" data-dir="w"></div><div class="resize-handle e" data-dir="e"></div>
                <div class="resize-handle nw" data-dir="nw"></div><div class="resize-handle ne" data-dir="ne"></div><div class="resize-handle sw" data-dir="sw"></div><div class="resize-handle se" data-dir="se"></div>
            </div>
            <img src="${expRes.dataURL}" draggable="false" style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; z-index: 1;">
            ${labelsHTML}
        </div>
        <img src="${compSVG}" class="compass-image draggable no-scale" draggable="false">
        <div class="attr-table-wrapper draggable"><table>${attrTable}</table></div>${resTable}${areaTable}
        ${this.els.closureInfo.innerText ? `<div class="closure-info draggable" style="bottom:15mm; left:15mm; padding:5px; font-size:9pt;">閉合状況: ${this.els.closureInfo.innerText}</div>` : ''}
    </div>
</div>
<script>
window.addEventListener('load', () => {
    document.querySelectorAll('.result-table-wrapper, .area-table-wrapper, .attr-table-wrapper').forEach(w => {
        const p = w.parentElement, s = Math.min((p.clientHeight*0.85)/w.offsetHeight, (p.clientWidth*0.85)/w.offsetWidth);
        if (s < 1) { w.style.transform = \`scale(\${s})\`; w.dataset.scale = s; }
    });
    
    let active = null, sX, sY, iL, iT;
    document.querySelectorAll('.draggable, .sub-draggable').forEach(el => {
        if (!el.classList.contains('no-bg') && !el.classList.contains('sub-draggable') && !el.innerHTML.includes('<br>')) {
            el.style.width = el.offsetWidth + 'px'; el.style.height = el.offsetHeight + 'px';
        }
        const r = el.getBoundingClientRect(), p = el.parentElement.getBoundingClientRect();
        
        if (!el.style.left) {
            el.dataset.initLeft = (r.left - p.left) + 'px';
            el.dataset.initTop = (r.top - p.top) + 'px';
            el.style.left = el.dataset.initLeft; 
            el.style.top = el.dataset.initTop;
            el.style.right = 'auto'; el.style.bottom = 'auto';
        }
        
        el.onmousedown = (e) => { 
            e.stopPropagation(); 
            active = el; 
            sX = e.clientX; 
            sY = e.clientY; 
            iL = parseFloat(el.style.left)||0; 
            iT = parseFloat(el.style.top)||0;
            active.isMm = el.style.left.includes('mm');
            e.preventDefault(); 
        };
        
        el.onwheel = (e) => { 
            if(el.classList.contains('no-scale') || e.ctrlKey) return; 
            e.preventDefault(); 
            
            const oldScale = parseFloat(el.dataset.scale||1);
            let newScale = oldScale + (e.deltaY<0?0.05:-0.05); 
            newScale = Math.max(0.2, Math.min(newScale,3)); 
            if (oldScale === newScale) return;
            
            const r1 = el.getBoundingClientRect();
            const relX = e.clientX - r1.left;
            const relY = e.clientY - r1.top;
            
            el.dataset.scale = newScale; 
            
            let baseTransform = '';
            if (el.style.transform && (el.style.transform.includes('rotate') || el.style.transform.includes('translate'))) {
                baseTransform = el.style.transform.replace(/scale\\([^)]+\\)/g, '').trim();
            }
            el.style.transform = baseTransform + (baseTransform ? ' ' : '') + \`scale(\${newScale})\`; 
            
            const r2 = el.getBoundingClientRect();
            const targetClientX = r2.left + relX * (newScale / oldScale);
            const targetClientY = r2.top + relY * (newScale / oldScale);
            
            const diffX = targetClientX - e.clientX;
            const diffY = targetClientY - e.clientY;
            
            const isMm = el.style.left.includes('mm');
            const pxToMm = 0.264583;
            const adjX = -diffX / window.pageScale;
            const adjY = -diffY / window.pageScale;
            
            if (isMm) {
                const curL = parseFloat(el.style.left) || 0;
                const curT = parseFloat(el.style.top) || 0;
                el.style.left = (curL + adjX * pxToMm) + 'mm';
                el.style.top = (curT + adjY * pxToMm) + 'mm';
            } else {
                const curL = parseFloat(el.style.left) || 0;
                const curT = parseFloat(el.style.top) || 0;
                el.style.left = (curL + adjX) + 'px';
                el.style.top = (curT + adjY) + 'px';
            }
        };
    });
    
    const pxToMm = 0.264583;

    document.onmousemove = e => { 
        if (active) { 
            let dx = (e.clientX - sX) / window.pageScale;
            let dy = (e.clientY - sY) / window.pageScale;
            
            if (active.isMm) {
                active.style.left = (iL + dx * pxToMm) + 'mm'; 
                active.style.top = (iT + dy * pxToMm) + 'mm'; 
            } else {
                active.style.left = (iL + dx) + 'px'; 
                active.style.top = (iT + dy) + 'px'; 
            }
        }
    };
    document.onmouseup = () => active = null;
    
    // --- 用紙ズーム・自動フィット機能 ---
    window.pageScale = 1.0;
    let isAutoFit = true;
    const pageContainer = document.querySelector('.page-container');
    const zoomLevelText = document.getElementById('zoomLevel');

    function fitToScreen() {
        const paddingX = 40;
        const paddingY = 90; 
        const scaleX = (window.innerWidth - paddingX) / pageContainer.offsetWidth;
        const scaleY = (window.innerHeight - paddingY) / pageContainer.offsetHeight;
        window.pageScale = Math.min(scaleX, scaleY);
        updatePageScale(true);
    }

    function updatePageScale(auto = false) {
        isAutoFit = auto;
        pageContainer.style.transform = \`scale(\${window.pageScale})\`;
        zoomLevelText.textContent = Math.round(window.pageScale * 100) + '%';
        pageContainer.style.marginBottom = (pageContainer.offsetHeight * (window.pageScale - 1)) + 40 + 'px';
        
        const btnFit = document.getElementById('btnFitScreen');
        if (auto) {
            btnFit.style.background = '#6366f1';
            btnFit.style.borderColor = '#818cf8';
        } else {
            btnFit.style.background = '#52525b';
            btnFit.style.borderColor = '#71717a';
        }
    }

    function zoomPage(direction) {
        const oldScale = window.pageScale;
        let newScale = oldScale + (direction * 0.1);
        newScale = Math.max(0.2, Math.min(newScale, 5.0));
        if (oldScale === newScale) return;
        
        const rect = pageContainer.getBoundingClientRect();
        const relX = (window.innerWidth / 2) - rect.left;
        const relY = (window.innerHeight / 2) - rect.top;
        const ratio = newScale / oldScale;
        
        window.pageScale = newScale;
        updatePageScale(false);
        
        const newRect = pageContainer.getBoundingClientRect();
        const shiftX = newRect.left - rect.left;
        const shiftY = newRect.top - rect.top;
        const diffX = relX * ratio - relX;
        const diffY = relY * ratio - relY;
        
        window.scrollBy(diffX + shiftX, diffY + shiftY);
    }

    document.getElementById('btnZoomIn').addEventListener('click', () => zoomPage(1));
    document.getElementById('btnZoomOut').addEventListener('click', () => zoomPage(-1));

    document.getElementById('btnFitScreen').addEventListener('click', fitToScreen);

    window.addEventListener('resize', () => {
        if (isAutoFit) fitToScreen();
    });

    document.addEventListener('wheel', (e) => {
        if (e.target.closest('.draggable') && !e.ctrlKey) return;

        e.preventDefault();
        const oldScale = window.pageScale;
        let newScale = oldScale + (e.deltaY < 0 ? 0.05 : -0.05);
        newScale = Math.max(0.2, Math.min(newScale, 5.0));
        if (oldScale === newScale) return;
        
        const rect = pageContainer.getBoundingClientRect();
        const relX = e.clientX - rect.left;
        const relY = e.clientY - rect.top;
        const ratio = newScale / oldScale;
        
        window.pageScale = newScale;
        updatePageScale(false);
        
        const newRect = pageContainer.getBoundingClientRect();
        const shiftX = newRect.left - rect.left;
        const shiftY = newRect.top - rect.top;
        const diffX = relX * ratio - relX;
        const diffY = relY * ratio - relY;
        
        window.scrollBy(diffX + shiftX, diffY + shiftY);
    }, { passive: false });

    fitToScreen();

    // --- HTML保存機能 ---
    document.getElementById('btnSaveHTML').addEventListener('click', () => {
        const currentScale = window.pageScale;
        const currentAutoFit = isAutoFit;
        
        window.pageScale = 1.0;
        updatePageScale(false); 
        
        const html = '<!DOCTYPE html>\\n' + document.documentElement.outerHTML;
        
        window.pageScale = currentScale;
        updatePageScale(currentAutoFit); 
        
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = '${outFileName}';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    let isResizing = false;
    let startX, startY, initL, initT, initW, initH, initInnerT, initInnerL, dir;
    const cropper = document.getElementById('map-cropper');
    const mapBgDiv = document.getElementById('printMapBg');
    
    cropper.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('resize-handle')) {
            isResizing = true;
            dir = e.target.getAttribute('data-dir');
            e.stopPropagation(); e.preventDefault();
            startX = e.clientX; startY = e.clientY;
            const cs = window.getComputedStyle(cropper);
            initL = parseFloat(cs.left); initT = parseFloat(cs.top);
            initW = parseFloat(cs.width); initH = parseFloat(cs.height);
            const is = window.getComputedStyle(mapBgDiv);
            initInnerL = parseFloat(is.left); initInnerT = parseFloat(is.top);
            cropper.classList.add('active');
        }
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isResizing) return;
        const s = window.pageScale || 1;
        const dx = (e.clientX - startX) / s;
        const dy = (e.clientY - startY) / s;
        
        if (dir.includes('n')) { cropper.style.top = (initT + dy) + 'px'; cropper.style.height = (initH - dy) + 'px'; mapBgDiv.style.top = (initInnerT - dy) + 'px'; }
        if (dir.includes('s')) { cropper.style.height = (initH + dy) + 'px'; }
        if (dir.includes('w')) { cropper.style.left = (initL + dx) + 'px'; cropper.style.width = (initW - dx) + 'px'; mapBgDiv.style.left = (initInnerL - dx) + 'px'; }
        if (dir.includes('e')) { cropper.style.width = (initW + dx) + 'px'; }
    });
    
    document.addEventListener('mouseup', () => {
        if (isResizing) {
            isResizing = false;
            cropper.classList.remove('active');
            if (mapBg) mapBg.invalidateSize();
        }
    });

    let mapBg = null;
    function updateMapBg() {
        const isChecked = document.getElementById('chkBgMap').checked;
        const tileUrl = document.getElementById('bgMapType').value;
        const mapDiv = document.getElementById('printMapBg');
        
        if (isChecked) {
            mapDiv.style.display = 'block';
            if (!mapBg) {
                mapBg = L.map('printMapBg', {
                    zoomControl: false, attributionControl: false, dragging: false, scrollWheelZoom: false,
                    doubleClickZoom: false, boxZoom: false, keyboard: false, zoomSnap: 0
                });
            } else {
                mapBg.eachLayer(layer => {
                    if (layer instanceof L.TileLayer) {
                        mapBg.removeLayer(layer);
                    }
                });
            }
            mapBg.invalidateSize();
            L.tileLayer(tileUrl, { maxNativeZoom: 18, maxZoom: 24 }).addTo(mapBg);
            const bounds = L.latLngBounds([${latBottom}, ${lonLeft}], [${latTop}, ${lonRight}]);
            mapBg.fitBounds(bounds);
        } else {
            if (mapBg) {
                mapBg.remove();
                mapBg = null;
            }
            mapDiv.style.display = 'none';
        }
    }
    
    document.getElementById('chkBgMap').addEventListener('change', updateMapBg);
    document.getElementById('bgMapType').addEventListener('change', updateMapBg);
    
    if (document.getElementById('chkBgMap').checked) {
        setTimeout(updateMapBg, 100);
    } else {
        document.getElementById('printMapBg').style.display = 'none';
    }

});
<\/script></body></html>`;

                const blob = new Blob([htmlContent], { type: 'text/html' });
                const url = URL.createObjectURL(blob);
                window.open(url, '_blank');

                this.els.chkMagDeclination.checked = origMag; this.updateDrawing(false);
            }

            _buildExportHTMLResultsTable(splitRows) {
                const data = this.state.tableData.filter(r => r[0] && r[1]); let html = '', curHtml = '', tSD = 0, tHD = 0;
                data.forEach((r, i) => {
                    const pt = this.state.points.find(p => p.fromName === r[0] && p.toName === r[1]);
                    const hd = pt ? pt.input.hd : 0; tHD += hd; tSD += parseFloat(r[4]||0);
                    curHtml += `<tr><td style="text-align:center;">${r[0]} - ${r[1]}</td><td style="text-align:right;">${r[2]}</td><td style="text-align:right;">${r[3]}</td><td style="text-align:right;">${(parseFloat(r[4]||0)).toFixed(2)}</td><td style="text-align:right;">${hd ? hd.toFixed(2) : ''}</td></tr>`;
                    if ((splitRows > 0 && (i + 1) % splitRows === 0) || i === data.length - 1) {
                        if (i === data.length - 1) curHtml += `<tr style="border-top:2px solid #000;"><td colspan="3" style="text-align:center;">合 計</td><td style="text-align:right;">${tSD.toFixed(2)}</td><td style="text-align:right;">${tHD.toFixed(2)}</td></tr>`;
                        html += `<table style="width:85mm; font-size:8pt; border-collapse:collapse; margin-left:10px;"><thead><tr><th>測 点</th><th>方位角</th><th>高低角</th><th>斜距離</th><th>水平距離</th></tr></thead><tbody>${curHtml}</tbody></table>`; curHtml = '';
                    }
                });
                return `<div class="result-table-wrapper draggable"><div style="font-weight:bold;text-align:center;border-bottom:1px solid #000;margin-bottom:5px;">成 果 表</div><div style="display:flex; justify-content:flex-end;">${html}</div></div>`;
            }

            _buildExportHTMLAttrTable(scTxt, lat, lon, dec) {
                let html = this.state.attributes.map(a => `<tr><th style="text-align:left;white-space:nowrap;">${a.name}</th><td>${a.value||''}</td></tr>`).join('');
                return html + `<tr><th style="text-align:left;">縮尺</th><td style="font-weight:bold;">${scTxt}</td></tr><tr><th style="text-align:left;">基準点</th><td style="font-size:8pt;">Lat ${lat} / Lon ${lon} <br>(偏角: ${dec}度)</td></tr>`;
            }

            _buildExportHTMLAreaTable() {
                if (this.state.detectedAreas.length === 0) return '';
                let tArea = 0, html = '';
                this.state.detectedAreas.forEach((a, i) => {
                    const netHa = Utils.round4(a.netArea / 10000);
                    tArea += parseFloat(netHa);
                    if (a.isDonut) {
                        const totalHa = Utils.round4(a.area / 10000);
                        html += `<tr><td style="border-bottom-style: dashed; border-bottom-color: #999;">区画 ${i + 1} (全体)</td><td style="text-align:right; border-bottom-style: dashed; border-bottom-color: #999;">${totalHa} ha</td></tr>`;
                        a.holes.forEach(h => {
                            const hHa = Utils.round4(h.area / 10000);
                            html += `<tr><td style="border-bottom-style: dashed; border-bottom-color: #999; color: #A13D44; padding-left: 12px;">－ 除地 ${h.globalIndex || ''}</td><td style="text-align:right; border-bottom-style: dashed; border-bottom-color: #999; color: #A13D44;">${hHa} ha</td></tr>`;
                        });
                        html += `<tr><td>区画 ${i + 1} 小計</td><td style="text-align:right; font-weight: bold;">${netHa} ha</td></tr>`;
                    } else {
                        html += `<tr><td>区画 ${i + 1}</td><td style="text-align:right;">${netHa} ha</td></tr>`;
                    }
                });
                return `<div class="area-table-wrapper draggable"><div style="font-weight:bold;text-align:center;border-bottom:1px solid #000;margin-bottom:5px;">面 積 表</div><table style="width:100%;font-size:9pt;">${html}<tr style="border-top:2px solid #000;font-weight:bold;"><td>合 計</td><td style="text-align:right;">${Utils.round4(tArea)} ha</td></tr></table></div>`;
            }

            _calcExportScaleOptions(conf, scaleOption) {
                let expScale = 1, cx = 0, cy = 0, displayScaleText = '';
                if (this.state.nodes.size >= 2) {
                    const dW = this.state.bounds.maxX - this.state.bounds.minX, dH = this.state.bounds.maxY - this.state.bounds.minY;
                    cx = (this.state.bounds.minX + this.state.bounds.maxX) / 2; cy = (this.state.bounds.minY + this.state.bounds.maxY) / 2;
                    if (scaleOption === 'auto') {
                        const fit = Math.max(0.1, Math.min(Math.max(10, conf.expW - conf.paddingX * 2) / (dW || 1), Math.max(10, conf.expH - conf.paddingY * 2) / (dH || 1)));
                        const exact = (1000 / fit) * (conf.expW / conf.w);
                        let mag = 100, sc = 100;
                        while(sc < exact) { for(let b of [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8]) { sc = b * mag; if(sc >= exact) break; } if(sc < exact) mag *= 10; }
                        expScale = (1000 / sc) * (conf.expW / conf.w); displayScaleText = `1 / ${sc.toLocaleString()}`;
                    } else {
                        const s = parseFloat(scaleOption); if (!isNaN(s) && s > 0) { expScale = (1000 / s) * (conf.expW / conf.w); displayScaleText = `1 / ${s.toLocaleString()}`; }
                    }
                }
                return { expScale, expOffsetX: conf.expW / 2 - cx * expScale, expOffsetY: conf.expH / 2 + cy * expScale + (scaleOption === 'auto' ? conf.shiftY : 0), displayScaleText };
            }

            _generateExportSVGDataURL(conf, scale, ox, oy) {
                const uiSc = Math.min(conf.expW, conf.expH) / 800; let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
                const uB = (x, y) => { if(x<minX)minX=x; if(x>maxX)maxX=x; if(y<minY)minY=y; if(y>maxY)maxY=y; };

                let svg = this.state.detectedAreas.map(a => {
                    let d = ''; a.path.forEach((n, i) => { const nd = this.state.nodes.get(n), x = ox+nd.x*scale, y = oy-nd.y*scale; uB(x,y); d += (i===0?'M':'L') + `${x} ${y} `; }); d += 'Z ';
                    if (a.isDonut) a.holes.forEach(h => { h.path.forEach((n, i) => { const nd = this.state.nodes.get(n), x = ox+nd.x*scale, y = oy-nd.y*scale; uB(x,y); d += (i===0?'M':'L') + `${x} ${y} `; }); d += 'Z '; });
                    return `<path d="${d}" fill="${this.CONFIG.colors.areaFill}" fill-rule="evenodd" />`;
                }).join('');

                this.state.points.forEach(p => { const x1=ox+p.fromX*scale, y1=oy-p.fromY*scale, x2=ox+p.toX*scale, y2=oy-p.toY*scale; uB(x1,y1); uB(x2,y2); if(p.isDraw) svg+=`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#ffffff" stroke-width="${(p.type==='branch'?3.5:4)*uiSc}" stroke-linecap="round" />`; });
                this.state.points.forEach(p => { const x1=ox+p.fromX*scale, y1=oy-p.fromY*scale, x2=ox+p.toX*scale, y2=oy-p.toY*scale; svg+=`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${!p.isDraw?'#9ca3af':(p.type==='branch'?this.CONFIG.colors.lineBranch:this.CONFIG.colors.lineMain)}" stroke-width="${(!p.isDraw?1.5:(p.type==='branch'?1.5:2))*uiSc}" ${!p.isDraw?`stroke-dasharray="${4*uiSc} ${4*uiSc}"`:''} stroke-linecap="round" />`; });

                const drawNd = (x, y, s) => { uB(x,y); svg+=`<circle cx="${x}" cy="${y}" r="${4*uiSc}" fill="${s?this.CONFIG.colors.startNode:this.CONFIG.colors.normalNode}" stroke="#ffffff" stroke-width="${1.5*uiSc}" />`; };
                const fp = this._getFirstPointName(); drawNd(ox, oy, true);
                this.state.nodes.forEach((nd, nm) => { if(nm===fp && Math.abs(nd.x)<0.001 && Math.abs(nd.y)<0.001) return; drawNd(ox+nd.x*scale, oy-nd.y*scale, false); });

                (this.state.annotations?.lines||[]).forEach(l => {
                    let d = ''; let mx=Infinity, mxx=-Infinity, my=Infinity, myy=-Infinity;
                    l.points.forEach((pt, i) => { const x=ox+pt.x*scale, y=oy-pt.y*scale; uB(x,y); if(x<mx)mx=x; if(x>mxx)mxx=x; if(y<my)my=y; if(y>myy)myy=y; d += (i===0?'M':'L') + `${x} ${y} `; });
                    let dash = ''; if(l.lineStyle==='dashed') dash=`stroke-dasharray="${8*uiSc},${6*uiSc}"`; else if(l.lineStyle==='dotted') dash=`stroke-dasharray="${2*uiSc},${4*uiSc}"`;
                    svg += `<path d="${d}" fill="none" stroke="${l.color||'#059669'}" stroke-width="${(l.lineWidth||2)*uiSc}" stroke-linecap="round" ${dash} transform="rotate(${-(l.rotation||0)*180/Math.PI} ${(mx+mxx)/2} ${(my+myy)/2})" />`;
                });

                if (minX === Infinity) { minX = 0; minY = 0; maxX = conf.expW; maxY = conf.expH; }
                const mg = 20, tx = Math.max(0, minX-mg), ty = Math.max(0, minY-mg), tw = maxX-minX+mg*2, th = maxY-minY+mg*2;
                return { dataURL: 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${tx} ${ty} ${tw} ${th}" width="${tw}" height="${th}">${svg}</svg>`))), x: tx, y: ty, w: tw, h: th, pxPerMm: conf.expW / conf.w };
            }

            _generateDraggableLabelsHTML(scale, ox, oy, pxPerMm, tx, ty) {
                let html = '';
                
                // 親コンテナ（map-group）の起点オフセット(mm)
                const offsetMmX = tx / pxPerMm;
                const offsetMmY = ty / pxPerMm;
                
                // 1. 測点名
                const fp = this._getFirstPointName();
                let nIdx = 1, intv = parseInt(this.els.selNodeLabelInterval.value, 10);
                const addNodeLabel = (x, y, name, show) => {
                    if(!show) return;
                    const lX = ((x + 8) / pxPerMm) - offsetMmX;
                    const lY = ((y - 8) / pxPerMm) - offsetMmY;
                    html += `<div class="sub-draggable no-bg" style="position: absolute; left:${lX}mm; top:${lY}mm; transform:translate(0,-100%); font-family:sans-serif; font-size:12px; font-weight:bold; color:${this.CONFIG.colors.text}; z-index: 2; cursor: move; white-space: nowrap;">${name}</div>`;
                };
                addNodeLabel(ox, oy, fp, true);
                this.state.nodes.forEach((nd, nm) => { 
                    if(nm===fp && Math.abs(nd.x)<0.001 && Math.abs(nd.y)<0.001) return; 
                    addNodeLabel(ox+nd.x*scale, oy-nd.y*scale, nm, intv===1||(intv>1&&nIdx%intv===0)); 
                    nIdx++; 
                });

                // 2. 面積ラベル
                this.state.detectedAreas.forEach((a, i) => {
                    const l1 = `区画 ${i+1}`, l2 = `${Utils.round4(a.netArea/10000)}ha`;
                    const px = ((ox+a.center.x*scale) / pxPerMm) - offsetMmX;
                    const py = ((oy-a.center.y*scale) / pxPerMm) - offsetMmY;
                    html += `<div class="sub-draggable" style="position: absolute; left:${px}mm; top:${py}mm; transform:translate(-50%, -50%); background:${this.CONFIG.colors.labelBg}; border:1px solid #217270; padding:2px 6px; text-align:center; font-family:sans-serif; font-size:12px; font-weight:bold; color:#217270; border-radius:3px; z-index: 2; cursor: move; white-space: nowrap;">${l1}<br><span style="font-weight:normal; font-size:11px;">${l2}</span></div>`;
                    
                    if (a.isDonut) {
                        a.holes.forEach(h => {
                            const hl1 = `除地 ${h.globalIndex}`, hl2 = `${Utils.round4(h.area/10000)}ha`;
                            const hpx = ((ox+h.center.x*scale) / pxPerMm) - offsetMmX;
                            const hpy = ((oy-h.center.y*scale) / pxPerMm) - offsetMmY;
                            html += `<div class="sub-draggable" style="position: absolute; left:${hpx}mm; top:${hpy}mm; transform:translate(-50%, -50%); background:${this.CONFIG.colors.labelBg}; border:1px solid #A13D44; padding:2px 6px; text-align:center; font-family:sans-serif; font-size:11px; font-weight:bold; color:#A13D44; border-radius:3px; z-index: 2; cursor: move; white-space: nowrap;">${hl1}<br><span style="font-weight:normal; font-size:10px;">${hl2}</span></div>`;
                        });
                    }
                });

                // 3. テキスト注記
                (this.state.annotations?.texts||[]).forEach((t, i) => {
                    const fs = t.fontSize || 14;
                    const w = Utils.estimateTextWidth(t.text, fs);
                    const cx = ox + t.x * scale, cy = oy - t.y * scale;
                    const px = ((cx - w / 2) / pxPerMm) - offsetMmX;
                    const py = ((cy - fs / 2) / pxPerMm) - offsetMmY;
                    const rotDeg = (t.rotation || 0) * 180 / Math.PI; 
                    html += `<div class="sub-draggable no-bg" style="position: absolute; left:${px}mm; top:${py}mm; transform:rotate(${rotDeg}deg); transform-origin: center center; font-family:sans-serif; font-size:${fs}px; font-weight:bold; color:${t.color||'#059669'}; text-shadow: 1px 1px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff; z-index: 2; cursor: move; white-space: nowrap;">${t.text}</div>`;
                });

                return html;
            }

            _generateCompassSVGDataURL(conf, dec) {
                const uS = Math.min(conf.expW, conf.expH) / 800, r = 35 * uS, s = r * 4, cx = s/2, cy = s/2;
                let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${s} ${s}" width="${s}" height="${s}"><g transform="translate(${cx}, ${cy})"><line x1="0" y1="${-r}" x2="0" y2="${r}" stroke="#9ca3af" stroke-width="${1.5*uS}" /><line x1="${-r}" y1="0" x2="${r}" y2="0" stroke="#9ca3af" stroke-width="${1.5*uS}" /><polygon points="0,${-r-6*uS} ${5*uS},${-r+12*uS} ${-5*uS},${-r+12*uS}" fill="${this.CONFIG.colors.compassText}" /><text x="0" y="${-r-13*uS}" font-family="sans-serif" font-size="${Math.round(16*uS)}px" font-weight="bold" fill="${this.CONFIG.colors.compassText}" text-anchor="middle">N</text>`;
                if (this.els.chkMagDeclination.checked && parseFloat(dec) !== 0) svg += `<g transform="rotate(${-parseFloat(dec)})"><line x1="0" y1="0" x2="0" y2="${-r}" stroke="${this.CONFIG.colors.compassArrow}" stroke-width="${2.5*uS}" /><polygon points="0,${-r-2*uS} ${4*uS},${-r+8*uS} ${-4*uS},${-r+8*uS}" fill="${this.CONFIG.colors.compassArrow}" /><text x="0" y="${-r-6*uS}" font-family="sans-serif" font-size="${Math.round(14*uS)}px" fill="${this.CONFIG.colors.compassArrow}" text-anchor="middle">MN</text></g>`;
                return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg + `</g></svg>`)));
            }

            exportJSON(fileName) {
                const st = { tableData: this.state.tableData, attributes: this.state.attributes, annotations: this.state.annotations, settings: { lat: this.els.inputLat.value, lon: this.els.inputLon.value, declination: this.els.inputDeclination.value, magDeclinationChecked: this.els.chkMagDeclination.checked, compassAdjustmentChecked: this.els.chkCompassAdjustment.checked, convertEPtoBPChecked: this.els.chkConvertEPtoBP ? this.els.chkConvertEPtoBP.checked : true, nodeLabelInterval: this.els.selNodeLabelInterval.value }, previewImage: this.generatePreviewImage() };
                if (!fileName) fileName = '令和8年度_育成複層林整備_山田太郎_No.10'; if (!fileName.endsWith('.json')) fileName += '.json';
                this._downloadFile("data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(st)), fileName);
                this.showToast('JSONファイルとして保存しました。');
            }

            generatePreviewImage() {
                const cv = document.createElement('canvas'), ctx = cv.getContext('2d'); cv.width = 600; cv.height = 600;
                ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, 600, 600); if (this.state.points.length === 0) return cv.toDataURL('image/jpeg', 0.8);
                const bs = this.state.bounds, dw = bs.maxX - bs.minX, dh = bs.maxY - bs.minY, s = (dw===0&&dh===0) ? 10 : Math.min(500/(dw||1), 500/(dh||1));
                const ox = 300 - ((bs.minX+bs.maxX)/2)*s, oy = 300 + ((bs.minY+bs.maxY)/2)*s;
                this._drawAreas(ctx, ox, oy, s, this.state.detectedAreas, this.state.nodes);
                this._drawLines(ctx, ox, oy, s, this.state.points);
                this._drawNodes(ctx, ox, oy, s, this.state.nodes, false);
                this._drawAnnotations(ctx, ox, oy, s, 1.5);
                ctx.save(); ctx.translate(40, 40); ctx.beginPath(); ctx.moveTo(0,-25); ctx.lineTo(0,25); ctx.moveTo(-25,0); ctx.lineTo(25,0); ctx.strokeStyle='#9ca3af'; ctx.stroke();
                ctx.beginPath(); ctx.moveTo(0,-30); ctx.lineTo(4,-17); ctx.lineTo(-4,-17); ctx.fillStyle=this.CONFIG.colors.compassText; ctx.fill();
                if (this.els.chkMagDeclination.checked && parseFloat(this.els.inputDeclination.value)) { ctx.rotate(Utils.deg2rad(-parseFloat(this.els.inputDeclination.value))); ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(0,-25); ctx.strokeStyle=this.CONFIG.colors.compassArrow; ctx.lineWidth=2; ctx.stroke(); ctx.beginPath(); ctx.moveTo(0,-27); ctx.lineTo(3,-20); ctx.lineTo(-3,-20); ctx.fillStyle=this.CONFIG.colors.compassArrow; ctx.fill(); }
                ctx.restore(); return cv.toDataURL('image/jpeg', 0.8);
            }

            _downloadFile(dStr, fName) { const a = document.createElement('a'); a.href = dStr; a.download = fName; document.body.appendChild(a); a.click(); a.remove(); }

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

            importJSON(event) {
                const files = event.target.files; if (!files || files.length === 0) return;
                this.processJsonFiles(Array.from(files).filter(f => f.name.toLowerCase().endsWith('.json')));
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

            renderImportFileList() {
                this.els.importFileList.innerHTML = '';
                this.importFilesList.forEach((item, index) => {
                    const li = document.createElement('li'); li.textContent = item.name; li.title = item.name;
                    if (this.selectedImportIndex === index) li.classList.add('selected');
                    li.onclick = () => this.selectImportFile(index);
                    li.ondblclick = () => { this.selectImportFile(index); this.els.btnApplyImport.click(); };
                    this.els.importFileList.appendChild(li);
                });
            }

            selectImportFile(index) {
                this.selectedImportIndex = index; this.renderImportFileList();
                const item = this.importFilesList[index]; if (!item) return;
                
                if (item.data.previewImage) { this.els.importPreviewImage.src = item.data.previewImage; this.els.importPreviewImage.style.display = 'inline-block'; this.els.importNoPreviewText.style.display = 'none'; } 
                else { this.els.importPreviewImage.style.display = 'none'; this.els.importNoPreviewText.style.display = 'inline-block'; this.els.importNoPreviewText.textContent = 'プレビュー画像なし'; }

                let attrText = item.data.attributes ? item.data.attributes.filter(a=>a.value).map(a=>a.value).join(' / ') : '';
                this.els.importPreviewInfo.innerHTML = `<strong>ファイル名:</strong> ${item.name}<br>` + (item.data.tableData ? `<strong>データ数:</strong> ${item.data.tableData.length}行<br>` : '') + (attrText ? `<strong>属性情報:</strong> <span style="color:#4b5563;">${attrText}</span>` : '');
                this.els.btnApplyImport.disabled = false;
            }

            applyImportData(saved) {
                if (Array.isArray(saved.tableData)) this.state.tableData = saved.tableData;
                if (Array.isArray(saved.attributes)) this.state.attributes = saved.attributes;
                this.state.annotations = saved.annotations ? JSON.parse(JSON.stringify(saved.annotations)) : { texts: [], lines: [] };
                if (saved.settings) {
                    ['lat','lon','declination'].forEach(k => { if(saved.settings[k]!==undefined) this.els['input'+k.charAt(0).toUpperCase()+k.slice(1)].value = saved.settings[k]; });
                    ['magDeclinationChecked','compassAdjustmentChecked'].forEach(k => { if(saved.settings[k]!==undefined) this.els['chk'+k.charAt(0).toUpperCase()+k.slice(1).replace('Checked','')].checked = saved.settings[k]; });
                    if(saved.settings.convertEPtoBPChecked !== undefined && this.els.chkConvertEPtoBP) this.els.chkConvertEPtoBP.checked = saved.settings.convertEPtoBPChecked;
                    if(saved.settings.nodeLabelInterval !== undefined) this.els.selNodeLabelInterval.value = saved.settings.nodeLabelInterval;
                }
                this.renderAttrTable(); this.renderTable();
                setTimeout(() => { this.resizeCanvas(); this.updateDrawing(true); if (this.isMapMode && this.map) { this.map.invalidateSize(); this.updateMapDrawing(true); } }, 100);
                this.pushState(); this.showToast('データを読み込みました。');
            }
        }
        window.onload = () => new CompassSurveyApp();