const fs = require('fs');
let js = fs.readFileSync('src/main.js', 'utf8');

const target = `const clientX = e.touches && e.touches.length > 0 ? e.touches[0].clientX : (e.changedTouches && e.changedTouches.length > 0 ? e.changedTouches[0].clientX : e.clientX);`;
const replacement = `if (e.cancelable && (this.state.view.isMovingAnnotation || this.state.view.isScaling || this.state.view.isRotating || (this.isMapMode && this.state.mapView.isRightDragging) || (!this.isMapMode && this.state.view.isRightDragging))) { e.preventDefault(); }
                const clientX = e.touches && e.touches.length > 0 ? e.touches[0].clientX : (e.changedTouches && e.changedTouches.length > 0 ? e.changedTouches[0].clientX : e.clientX);`;

js = js.replace(target, replacement);

fs.writeFileSync('src/main.js', js);
console.log('Added preventDefault to handleMouseMove');
