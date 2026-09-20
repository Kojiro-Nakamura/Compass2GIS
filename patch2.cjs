const fs = require('fs');
let js = fs.readFileSync('src/main.js', 'utf8');

// 1. Touch normalization in handleMouseMove
const oldMouseMoveStart = '            handleMouseMove = (e) => {\n                if (this.isMapMode && this.state.mapView.isRightDragging)';
const oldMouseMoveStartCRLF = oldMouseMoveStart.replace(/\n/g, '\r\n');

const newMouseMoveStart = `            handleMouseMove = (e) => {
                const clientX = e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX;
                const clientY = e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY;
                if (this.isMapMode && this.state.mapView.isRightDragging)`;

if (js.includes(oldMouseMoveStart)) {
    js = js.replace(oldMouseMoveStart, newMouseMoveStart);
} else if (js.includes(oldMouseMoveStartCRLF)) {
    js = js.replace(oldMouseMoveStartCRLF, newMouseMoveStart.replace(/\n/g, '\r\n'));
}

// Now replace all e.clientX/e.clientY inside handleMouseMove using regex
// We match everything from handleMouseMove = (e) => { until the next method `            handleMouseUp = (e) => {`
const mMatch = js.match(/handleMouseMove = \(e\) => \{[\s\S]*?handleMouseUp = \(e\) => \{/);
if (mMatch) {
    let methodBody = mMatch[0];
    methodBody = methodBody.replace(/e\.clientX/g, 'clientX');
    methodBody = methodBody.replace(/e\.clientY/g, 'clientY');
    js = js.replace(mMatch[0], methodBody);
}

// 2. _updateLiveAnnotationDrawing fix
const target = `    _updateLiveAnnotationDrawing() {\n        if (this.isMapMode) {\n            this.updateMapDrawing(false);\n        } else {\n            this.draw();\n        }\n    }`;
const targetCRLF = target.replace(/\n/g, '\r\n');

const replacement = `    _updateLiveAnnotationDrawing() {
        if (this.isMapMode) {
            if ((this.state.view.isMovingAnnotation || this.state.view.isScaling) && this.state.view.movingLayer) {
                const target = this.state.view.isScaling ? this.state.view.scalingTarget : this.state.view.movingTarget;
                const ref = target.target ? target.target.ref : target.ref;
                const type = target.target ? target.target.type : target.type;
                if (type === 'line' && this.state.view.movingLayer.setLatLngs) {
                    const lat0 = parseFloat(this.els.inputLat.value) || 0, lon0 = parseFloat(this.els.inputLon.value) || 0;
                    const lonDPM = CONSTANTS.LAT_DEG_PER_METER / Math.cos(Utils.deg2rad(lat0));
                    const coords = ref.points.map(p => [lat0 + p.y * CONSTANTS.LAT_DEG_PER_METER, lon0 + p.x * lonDPM]);
                    this.state.view.movingLayer.setLatLngs(coords);
                } else if (type === 'text' && this.state.view.movingLayer.setLatLng) {
                    const lat0 = parseFloat(this.els.inputLat.value) || 0, lon0 = parseFloat(this.els.inputLon.value) || 0;
                    const lonDPM = CONSTANTS.LAT_DEG_PER_METER / Math.cos(Utils.deg2rad(lat0));
                    this.state.view.movingLayer.setLatLng([lat0 + ref.y * CONSTANTS.LAT_DEG_PER_METER, lon0 + ref.x * lonDPM]);
                    if (this.state.view.isScaling) {
                        const icon = this.state.view.movingLayer.options.icon;
                        if (icon && icon.options) {
                            const newSize = ref.fontSize || 14;
                            icon.options.html = \`<div style="font-size:\${newSize}px;color:\${ref.color || '#000'};white-space:nowrap;transform:translate(-50%,-50%) rotate(\${(ref.rotation||0)*180/Math.PI}deg);">\${Utils.escapeHTML(ref.text || '')}</div>\`;
                            this.state.view.movingLayer.setIcon(icon);
                        }
                    }
                }
            } else {
                this.updateMapDrawing(false);
            }
        } else {
            this.draw();
        }
    }`;

if (js.includes(target)) {
    js = js.replace(target, replacement);
} else if (js.includes(targetCRLF)) {
    js = js.replace(targetCRLF, replacement.replace(/\n/g, '\r\n'));
}

fs.writeFileSync('src/main.js', js);
console.log('Patch complete.');
