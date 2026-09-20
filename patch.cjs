const fs = require('fs');
let js = fs.readFileSync('src/main.js', 'utf8');

const target = `    _updateLiveAnnotationDrawing() {
        if (this.isMapMode) {
            this.updateMapDrawing(false);
        } else {
            this.draw();
        }
    }`;

const replacement = `    _updateLiveAnnotationDrawing() {
        if (this.isMapMode) {
            if ((this.state.view.isMovingAnnotation || this.state.view.isScaling) && this.state.view.movingLayer) {
                const target = this.state.view.isScaling ? this.state.view.scalingTarget : this.state.view.movingTarget;
                const ref = target.target ? target.target.ref : target.ref;
                const type = target.target ? target.target.type : target.type;
                
                if (type === 'line' && this.state.view.movingLayer.setLatLngs) {
                    const lat0 = parseFloat(this.els.inputLat.value), lon0 = parseFloat(this.els.inputLon.value);
                    const lonDPM = CONSTANTS.LAT_DEG_PER_METER / Math.cos(Utils.deg2rad(lat0));
                    const coords = ref.points.map(p => {
                        return [lat0 + p.y * CONSTANTS.LAT_DEG_PER_METER, lon0 + p.x * lonDPM];
                    });
                    this.state.view.movingLayer.setLatLngs(coords);
                } else if (type === 'text' && this.state.view.movingLayer.setLatLng) {
                    const lat0 = parseFloat(this.els.inputLat.value), lon0 = parseFloat(this.els.inputLon.value);
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

const targetCRLF = target.replace(/\n/g, '\r\n');

if (js.includes(target)) {
    js = js.replace(target, replacement);
    fs.writeFileSync('src/main.js', js);
    console.log('Successfully updated _updateLiveAnnotationDrawing (LF)');
} else if (js.includes(targetCRLF)) {
    js = js.replace(targetCRLF, replacement);
    fs.writeFileSync('src/main.js', js);
    console.log('Successfully updated _updateLiveAnnotationDrawing (CRLF)');
} else {
    console.log('Target function still not found!');
}
