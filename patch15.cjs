const fs = require('fs');
let js = fs.readFileSync('src/mapView.js', 'utf8');

js = js.replace(/this\.state\.view\.scalingTarget = \{ type: 'line', index: i, ref: line, corner: cornerIds\[cIdx\] \};\r?\n[\s]+this\.state\.view\.scalingInitialState = JSON\.parse\(JSON\.stringify\(line\)\);/g, 
    "this.state.view.scalingTarget = { type: 'line', index: i, ref: line, corner: cornerIds[cIdx] };\n                        this.state.view.scalingInitialState = JSON.parse(JSON.stringify(line));\n                        this.state.view.movingLayer = polyline;\n                        this.state.view.movingExtras = { highlightPolyline, handleLine, hMarker };");

js = js.replace(/this\.state\.view\.scalingTarget = \{ type: 'text', index: i, ref: t, corner: cornerIds\[cIdx\] \};\r?\n[\s]+this\.state\.view\.scalingInitialState = JSON\.parse\(JSON\.stringify\(t\)\);/g, 
    "this.state.view.scalingTarget = { type: 'text', index: i, ref: t, corner: cornerIds[cIdx] };\n                        this.state.view.scalingInitialState = JSON.parse(JSON.stringify(t));\n                        this.state.view.movingLayer = marker;\n                        this.state.view.movingExtras = { handleLine, hMarker };");

fs.writeFileSync('src/mapView.js', js);
console.log('Fixed sMarker movingLayer assignment in mapView.js');
