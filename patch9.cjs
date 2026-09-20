const fs = require('fs');
let js = fs.readFileSync('src/main.js', 'utf8');

const startStr = 'handleMouseMove = (e) => {';
const startIdx = js.indexOf(startStr);
const endIdx = js.indexOf('handleMouseUp = (e) => {', startIdx);

if (startIdx !== -1 && endIdx !== -1) {
    let methodBody = js.substring(startIdx + startStr.length, endIdx);
    
    // Replace ALL e.clientX and e.clientY
    methodBody = methodBody.replace(/e\.clientX/g, 'clientX').replace(/e\.clientY/g, 'clientY');
    
    // Construct the new method
    const newMethod = 'handleMouseMove = (e) => {\n' +
        '                const clientX = e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX;\n' +
        '                const clientY = e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY;' +
        methodBody;
        
    js = js.substring(0, startIdx) + newMethod + js.substring(endIdx);
    
    fs.writeFileSync('src/main.js', js);
    console.log('Fixed handleMouseMove successfully');
} else {
    console.log('Could not find handleMouseMove or handleMouseUp', startIdx, endIdx);
}

// 2. Add _updateLiveAnnotationDrawing
const replacement = `    _updateLiveAnnotationDrawing() {
        if (this.isMapMode) {
            if ((this.state.view.isMovingAnnotation || this.state.view.isScaling || this.state.view.isRotating) && this.state.view.movingLayer) {
                const target = this.state.view.isScaling ? this.state.view.scalingTarget : (this.state.view.isRotating ? this.state.view.rotatingTarget : this.state.view.movingTarget);
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
                    const icon = this.state.view.movingLayer.options.icon;
                    if (icon && icon.options) {
                        const newSize = ref.fontSize || 14;
                        icon.options.html = \`<div style="font-size:\${newSize}px;color:\${ref.color || '#000'};white-space:nowrap;transform:translate(-50%,-50%) rotate(\${(ref.rotation||0)*180/Math.PI}deg);">\${Utils.escapeHTML(ref.text || '')}</div>\`;
                        this.state.view.movingLayer.setIcon(icon);
                    }
                }
            } else {
                this.updateMapDrawing(false);
            }
        } else {
            this.draw();
        }
    }

    pushState`;

if (!js.includes('_updateLiveAnnotationDrawing')) {
    js = js.replace(/    pushState/, replacement);
    fs.writeFileSync('src/main.js', js);
    console.log('Added _updateLiveAnnotationDrawing successfully');
}
