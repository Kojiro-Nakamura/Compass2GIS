var j=Object.defineProperty;var W=(e,t,i)=>t in e?j(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var Y=(e,t,i)=>W(e,typeof t!="symbol"?t+"":t,i);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function i(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(a){if(a.ep)return;a.ep=!0;const n=i(a);fetch(a.href,n)}})();const m=e=>document.getElementById(e),P=(e,t)=>{e&&e.addEventListener("click",t)},I={LAT_DEG_PER_METER:1/111111,PAPER_CONFIGS:{A4_portrait:{w:210,h:296,expW:1600,expH:2262,paddingX:250,paddingY:300,shiftY:150},A4_landscape:{w:296,h:210,expW:2262,expH:1600,paddingX:300,paddingY:200,shiftY:50},A3_portrait:{w:297,h:420,expW:2262,expH:3200,paddingX:350,paddingY:400,shiftY:200},A3_landscape:{w:420,h:297,expW:3200,expH:2262,paddingX:400,paddingY:300,shiftY:100},A2_portrait:{w:420,h:594,expW:3200,expH:4526,paddingX:500,paddingY:600,shiftY:300},A2_landscape:{w:594,h:420,expW:4526,expH:3200,paddingX:600,paddingY:500,shiftY:200},A1_portrait:{w:594,h:841,expW:4526,expH:6408,paddingX:700,paddingY:800,shiftY:400},A1_landscape:{w:841,h:594,expW:6408,expH:4526,paddingX:800,paddingY:700,shiftY:300},A0_portrait:{w:841,h:1189,expW:6408,expH:9060,paddingX:1e3,paddingY:1100,shiftY:550},A0_landscape:{w:1189,h:841,expW:9060,expH:6408,paddingX:1100,paddingY:1e3,shiftY:450}}},C={deg2rad:e=>e*(Math.PI/180),round4:e=>(Math.round((e+Number.EPSILON)*1e4)/1e4).toFixed(4),parseDMS:e=>{const t=e.match(/-?\d+(\.\d+)?/g);return!t||t.length<3?null:(parseFloat(t[0])<0?-1:1)*(Math.abs(parseFloat(t[0]))+parseFloat(t[1])/60+parseFloat(t[2])/3600)},calculatePolygonArea:e=>{if(e.length<3)return 0;let t=0;for(let i=0;i<e.length;i++){let s=(i+1)%e.length;t+=e[i].x*e[s].y-e[s].x*e[i].y}return Math.abs(t/2)},isPointInPolygon:(e,t)=>{let i=e[0],s=e[1],a=!1;for(let n=0,l=t.length-1;n<t.length;l=n++){let o=t[n][0],r=t[n][1],d=t[l][0],c=t[l][1];r>s!=c>s&&i<(d-o)*(s-r)/(c-r)+o&&(a=!a)}return a},calculateMagDeclination:(e,t)=>{const i=e-37,s=t-138;return(501+22.31*i-7.85*s+.54*Math.pow(i,2)-.7*i*s-.14*Math.pow(s,2))/60},estimateTextWidth:(e,t)=>{let i=0;for(let s=0;s<e.length;s++)i+=e.charCodeAt(s)>255?t:t*.6;return i},pointToLineDistance:(e,t,i)=>{const s=Math.pow(i.x-t.x,2)+Math.pow(i.y-t.y,2);if(s===0)return Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2));let a=((e.x-t.x)*(i.x-t.x)+(e.y-t.y)*(i.y-t.y))/s;return a=Math.max(0,Math.min(1,a)),Math.sqrt(Math.pow(e.x-(t.x+a*(i.x-t.x)),2)+Math.pow(e.y-(t.y+a*(i.y-t.y)),2))}},H={calculateCoordinates(){const e=this.els.chkMagDeclination.checked&&parseFloat(this.els.inputDeclination.value)||0,t=C.deg2rad(e),i=Math.cos(t),s=Math.sin(t);if(this.state.annotations&&(this.state.annotations.texts.forEach(h=>{if(h.baseX===void 0){const p=h.fontSize||14,g=C.estimateTextWidth(h.text,p);h.x=h.x+g/2,h.y=h.y+p/2,h.baseX=h.x,h.baseY=h.y,h.baseRotation=h.rotation||0}h.x=h.baseX*i-h.baseY*s,h.y=h.baseX*s+h.baseY*i,h.rotation=h.baseRotation-t}),this.state.annotations.lines.forEach(h=>{h.points.forEach(p=>{p.baseX===void 0&&(p.baseX=p.x,p.baseY=p.y),p.x=p.baseX*i-p.baseY*s,p.y=p.baseX*s+p.baseY*i})})),this.state.points=[],this.state.nodes.clear(),this.state.tableData.length===0){this.updateClosureInfo(0,0,0,!1),this.updateBounds();return}const a=this._getFirstPointName();this.state.nodes.set(a,{x:0,y:0,name:a});const{totalLength:n,mainSegments:l,branchSegments:o,isClosed:r}=this._parseSegments(a);this.state.isClosed=r;const d=l.reduce((h,p)=>h+p.dx,0),c=l.reduce((h,p)=>h+p.dy,0);this._resolveMainSegments(l,d,c,n,r),this._resolveBranchSegments(o),this.updateClosureInfo(d,c,n,r),this.updateBounds()},_parseSegments(e){let t=0,i=!1;const s=[],a=[];return this.state.tableData.forEach((n,l)=>{var b;const[o,r,d,c,h]=n;if(!o||!r||d===""||h==="")return;const p=parseFloat(h);if(isNaN(p))return;let g=parseFloat(d)||0;const f=parseFloat(c)||0,M=this.els.chkMagDeclination.checked&&parseFloat(this.els.inputDeclination.value)||0;g-=M;const v=p*Math.cos(C.deg2rad(f)),y=v*Math.sin(C.deg2rad(g)),x=v*Math.cos(C.deg2rad(g)),w=!(n[5]===!0||n[5]==="true"),u={from:o,to:r,dx:y,dy:x,hd:v,isDraw:w,input:{az:g+M,el:f,sd:p,hd:v}};l===0||!i&&o===((b=s[s.length-1])==null?void 0:b.to)?(s.push(u),t+=v,r===e&&(i=!0)):a.push(u)}),{totalLength:t,mainSegments:s,branchSegments:a,isClosed:i}},_resolveMainSegments(e,t,i,s,a){const n=this.els.chkCompassAdjustment.checked;let l=0,o=0;e.forEach((r,d)=>{let c=r.dx,h=r.dy;n&&a&&s>0&&(c-=t*(r.hd/s),h-=i*(r.hd/s)),l+=c,o+=h,n&&a&&d===e.length-1&&(l=0,o=0),this.state.nodes.set(r.to,{x:l,y:o,name:r.to}),this.state.points.push({type:"main",fromName:r.from,toName:r.to,isDraw:r.isDraw,fromX:this.state.nodes.get(r.from).x,fromY:this.state.nodes.get(r.from).y,toX:l,toY:o,input:r.input})})},_resolveBranchSegments(e){let t=[...e],i=-1;for(;t.length>0&&i!==0;){i=0;let s=[];for(const a of t){const n=this.state.nodes.get(a.from);if(n){const l=this.state.nodes.get(a.to),o=l?l.x:n.x+a.dx,r=l?l.y:n.y+a.dy;l||this.state.nodes.set(a.to,{x:o,y:r,name:a.to}),this.state.points.push({type:"branch",fromName:a.from,toName:a.to,isDraw:a.isDraw,fromX:n.x,fromY:n.y,toX:o,toY:r,input:a.input}),i++}else s.push(a)}t=s}},findClosedAreas(){if(!this.els.chkCompassAdjustment.checked){this.state.detectedAreas=[],$id("areaResults").style.display="none";return}const{edges:e,adj:t}=this._buildAdjacencyGraph(),i=this._extractFaces(e,t),s=this._identifyConnectedComponents(t),a=this._removeOuterBoundary(i,s);this.state.detectedAreas=this._buildPolygonHierarchy(a),this._renderAreaResults(this.state.detectedAreas)},_buildAdjacencyGraph(){const e=new Map,t=(s,a)=>{if(s===a)return;const n=`${s}|${a}`,l=`${a}|${s}`;!e.has(n)&&!e.has(l)&&e.set(n,{u:s,v:a})};this.state.points.forEach(s=>{s.isDraw&&t(s.fromName,s.toName)});const i=new Map;for(let[,s]of e){const a=this.state.nodes.get(s.u),n=this.state.nodes.get(s.v);!a||!n||(i.has(a.name)||i.set(a.name,[]),i.has(n.name)||i.set(n.name,[]),i.get(a.name).push({name:n.name,angle:Math.atan2(n.y-a.y,n.x-a.x)}),i.get(n.name).push({name:a.name,angle:Math.atan2(a.y-n.y,a.x-n.x)}))}for(let[,s]of i)s.sort((a,n)=>a.angle-n.angle);return{edges:e,adj:i}},_extractFaces(e,t){const i=new Set,s=[],a=parseFloat(this.els.inputLat.value)||0,n=parseFloat(this.els.inputLon.value)||0,l=I.LAT_DEG_PER_METER/Math.cos(C.deg2rad(a));for(let[,o]of e)for(let r of[{from:o.u,to:o.v},{from:o.v,to:o.u}]){if(i.has(`${r.from}|${r.to}`))continue;const d=[];let c=r.from,h=r.to,p=!1,g=0;for(;!i.has(`${c}|${h}`)&&g<e.size*2;){i.add(`${c}|${h}`),d.push(c);const f=t.get(h);if(!f)break;const M=f.findIndex(v=>v.name===c);if(M===-1)break;if(c=h,h=f[(M+1)%f.length].name,g++,c===r.from&&h===r.to){p=!0;break}}if(p&&d.length>=3){let f=0,M=0,v=0,y=0;const x=d.map(E=>this.state.nodes.get(E)),w=[];for(let E=0;E<x.length;E++){const b=x[E],T=x[(E+1)%x.length],S=b.x*T.y-T.x*b.y;f+=S,M+=(b.x+T.x)*S,v+=(b.y+T.y)*S,w.push([n+b.x*l,a+b.y*I.LAT_DEG_PER_METER]),y+=Math.sqrt(Math.pow(T.x-b.x,2)+Math.pow(T.y-b.y,2))}w.length>0&&w.push([...w[0]]),f/=2;let u=Math.abs(f);u>1e-4&&s.push({path:d,area:u,perimeter:y,coords:w,center:{x:M/(6*f),y:v/(6*f)},centerGeo:[n+M/(6*f)*l,a+v/(6*f)*I.LAT_DEG_PER_METER]})}}return s},_identifyConnectedComponents(e){const t=[],i=new Set,s=Array.from(e.keys());for(const n of s)if(!i.has(n)){const l=new Set,o=[n];for(i.add(n);o.length>0;){const r=o.shift();l.add(r),(e.get(r)||[]).forEach(d=>{i.has(d.name)||(i.add(d.name),o.push(d.name))})}t.push(l)}const a=new Map;return t.forEach((n,l)=>n.forEach(o=>a.set(o,l))),a},_removeOuterBoundary(e,t){const i=new Map;e.forEach(a=>{a.hash=[...a.path].sort().join(",");const n=t.get(a.path[0]);i.has(n)||i.set(n,new Map),i.get(n).has(a.hash)||i.get(n).set(a.hash,a)});const s=[];return i.forEach(a=>{const n=Array.from(a.values()).sort((l,o)=>o.area-l.area);if(n.length===1)s.push(n[0]);else if(n.length>1)for(let l=1;l<n.length;l++)s.push(n[l])}),s.sort((a,n)=>n.area-a.area)},_buildPolygonHierarchy(e){const t=(a,n)=>{if(C.isPointInPolygon(a.centerGeo,n.coords))return!0;for(let l of a.coords)if(!n.coords.some(r=>Math.abs(r[0]-l[0])<1e-8&&Math.abs(r[1]-l[1])<1e-8)&&C.isPointInPolygon(l,n.coords))return!0;return!1};e.forEach((a,n)=>{a.children=[],a.parent=null;for(let l=n-1;l>=0;l--)if(t(a,e[l])){a.parent=e[l],e[l].children.push(a);break}});const i=[],s=(a,n)=>{if(n%2===0){let l=0;const o=[];a.children.forEach(r=>{l+=r.area,o.push(r)}),a.netArea=a.area-l,a.holes=o,a.isDonut=o.length>0,i.push(a)}a.children.forEach(l=>s(l,n+1))};return e.filter(a=>a.parent===null).forEach(a=>s(a,0)),i}},J={_redrawAll(){this.draw(),this.isMapMode&&(this.updateMapDrawing(!1),this._updateMapTempLine())},_getPixelsToInternalDistance(e){if(this.isMapMode&&this.map){const t=this.map.getCenter(),i=this.map.project(t),s=this.map.unproject(i.add([0,-e])),a=this.getInternalCoordsFromLatLng(t.lat,t.lng),n=this.getInternalCoordsFromLatLng(s.lat,s.lng);return Math.sqrt(Math.pow(n.x-a.x,2)+Math.pow(n.y-a.y,2))}return e/this.state.view.scale},getInternalCoordsFromLatLng(e,t){const i=parseFloat(this.els.inputLat.value)||0,s=parseFloat(this.els.inputLon.value)||0,a=I.LAT_DEG_PER_METER/Math.cos(C.deg2rad(i));return{x:(t-s)/a,y:(e-i)/I.LAT_DEG_PER_METER}},_findAnnotationAtCanvas(e,t){const{offsetX:i,offsetY:s,scale:a}=this.state.view,n=20;if(!this.state.annotations)return null;if(this.state.selectedAnnotation&&this.state.interactionMode==="select"){const l=this.state.selectedAnnotation,o=l.ref;let r,d,c;if(l.type==="text"){const M=o.fontSize||14;r=i+o.x*a,d=s-o.y*a,c=M*a}else{let M=1/0,v=-1/0,y=1/0,x=-1/0;o.points.forEach(w=>{w.x<M&&(M=w.x),w.x>v&&(v=w.x),w.y<y&&(y=w.y),w.y>x&&(x=w.y)}),r=i+(M+v)/2*a,d=s-(y+x)/2*a,c=(x-y)*a}const h=d-c/2-20,p=o.rotation||0,g=r-(h-d)*Math.sin(p),f=d+(h-d)*Math.cos(p);if(Math.sqrt(Math.pow(e-g,2)+Math.pow(t-f,2))<16)return{type:"handle",target:l}}for(let l=this.state.annotations.texts.length-1;l>=0;l--){const o=this.state.annotations.texts[l],r=o.fontSize||14,d=C.estimateTextWidth(o.text,r),c=i+o.x*a,h=s-o.y*a,p=o.rotation||0,g=e-c,f=t-h,M=Math.cos(-p),v=Math.sin(-p),y=c+g*M-f*v,x=h+g*v+f*M,w=c-d/2*a,u=c+d/2*a,E=h-r/2*a,b=h+r/2*a;if(y>=w-n&&y<=u+n&&x>=E-n&&x<=b+n)return{type:"text",index:l,ref:o}}for(let l=this.state.annotations.lines.length-1;l>=0;l--){const o=this.state.annotations.lines[l];let r=1/0,d=-1/0,c=1/0,h=-1/0;o.points.forEach(b=>{b.x<r&&(r=b.x),b.x>d&&(d=b.x),b.y<c&&(c=b.y),b.y>h&&(h=b.y)});const p=i+(r+d)/2*a,g=s-(c+h)/2*a,f=o.rotation||0,M=e-p,v=t-g,y=Math.cos(-f),x=Math.sin(-f),w=p+M*y-v*x,u=g+M*x+v*y,E=Math.max(n,(o.lineWidth||2)/2+10);for(let b=0;b<o.points.length-1;b++){const T={x:i+o.points[b].x*a,y:s-o.points[b].y*a},S={x:i+o.points[b+1].x*a,y:s-o.points[b+1].y*a};if(C.pointToLineDistance({x:w,y:u},T,S)<E)return{type:"line",index:l,ref:o}}}return null},_selectAnnotation(e){this.state.selectedAnnotation=e;const{type:t,ref:i}=e;this.els.propColor.value=i.color||"#059669",t==="line"?(this.els.rowLineWidth.style.display="flex",this.els.rowLineStyle.style.display="flex",this.els.rowFontSize.style.display="none",this.els.propLineWidth.value=i.lineWidth||2,this.els.propLineStyle.value=i.lineStyle||"solid"):t==="text"&&(this.els.rowLineWidth.style.display="none",this.els.rowLineStyle.style.display="none",this.els.rowFontSize.style.display="flex",this.els.propFontSize.value=i.fontSize||14),this.els.propertyPanel.style.display="flex",this._redrawAll()},_clearSelection(){this.state.selectedAnnotation!==null&&(this.state.selectedAnnotation=null,this.els.propertyPanel.style.display="none",this._redrawAll())},updateBounds(){if(this.state.nodes.size===0)return;let e=1/0,t=-1/0,i=1/0,s=-1/0;this.state.nodes.forEach(a=>{a.x<e&&(e=a.x),a.x>t&&(t=a.x),a.y<i&&(i=a.y),a.y>s&&(s=a.y)}),this.state.bounds={minX:e,maxX:t,minY:i,maxY:s}},resizeCanvas(){this.els.canvas.width=this.els.container.clientWidth,this.els.canvas.height=this.els.container.clientHeight,this.draw(),this.isMapMode&&this.map&&this.map.invalidateSize()},autoFit(){if(this.state.nodes.size<2){this.state.view.scale=1,this.state.view.offsetX=this.els.canvas.width/2,this.state.view.offsetY=this.els.canvas.height/2;return}const{padding:e}=this.CONFIG.canvas,{bounds:t}=this.state,i=t.maxX-t.minX,s=t.maxY-t.minY;i===0&&s===0?this.state.view.scale=10:this.state.view.scale=Math.max(.1,Math.min(Math.max(10,this.els.canvas.width-e*2)/(i||1),Math.max(10,this.els.canvas.height-e*2)/(s||1)));const a=(t.minX+t.maxX)/2,n=(t.minY+t.maxY)/2;this.state.view.offsetX=this.els.canvas.width/2-a*this.state.view.scale,this.state.view.offsetY=this.els.canvas.height/2+n*this.state.view.scale},updateDrawing(e=!1){this.calculateCoordinates(),this.findClosedAreas(),(e||this.state.nodes.size===2)&&this.autoFit(),this.draw(),this.isMapMode&&this.updateMapDrawing(e)},draw(){const{ctx:e,els:{canvas:t}}=this,{view:{offsetX:i,offsetY:s,scale:a},points:n,nodes:l,detectedAreas:o}=this.state;if(e.clearRect(0,0,t.width,t.height),this._drawGrid(e,i,s,a),this._drawCompassRose(e),this._drawAreas(e,i,s,a,o,l),n.length>0&&(this._drawLines(e,i,s,a,n),this._drawNodes(e,i,s,a,l,!0),this._drawLabels(e,i,s,a,o)),this._drawAnnotations(e,i,s,a),this.state.currentLine.length>0){e.beginPath(),e.strokeStyle="#059669",e.lineWidth=2;let r,d;this.state.currentLine.forEach((c,h)=>{const p=i+c.x*a,g=s-c.y*a;h===0?e.moveTo(p,g):e.lineTo(p,g),r=p,d=g}),e.stroke(),this.state.view.currentMouseInternalX!==void 0&&this.state.interactionMode==="line"&&(e.beginPath(),e.strokeStyle="#059669",e.lineWidth=2,e.setLineDash([6,6]),e.moveTo(r,d),e.lineTo(i+this.state.view.currentMouseInternalX*a,s-this.state.view.currentMouseInternalY*a),e.stroke(),e.setLineDash([]))}},_drawAnnotations(e,t,i,s,a=1){var d,c;const n=((d=this.state.annotations)==null?void 0:d.texts)||[],l=((c=this.state.annotations)==null?void 0:c.lines)||[],o=this.state.selectedAnnotation,r=this.state.hoveredAnnotation;l.forEach((h,p)=>{const g=(o==null?void 0:o.type)==="line"&&(o==null?void 0:o.index)===p,f=h.rotation||0,M=(r==null?void 0:r.type)==="line"&&(r==null?void 0:r.index)===p;let v=1/0,y=-1/0,x=1/0,w=-1/0;h.points.forEach(b=>{b.x<v&&(v=b.x),b.x>y&&(y=b.x),b.y<x&&(x=b.y),b.y>w&&(w=b.y)});const u=t+(v+y)/2*s,E=i-(x+w)/2*s;if(e.save(),e.translate(u,E),e.rotate(f),e.translate(-u,-E),(g||M)&&a===1&&(e.beginPath(),e.strokeStyle=g?"rgba(59, 130, 246, 0.4)":"rgba(59, 130, 246, 0.2)",e.lineWidth=(h.lineWidth||2)*a+8,h.points.forEach((b,T)=>{const S=t+b.x*s,A=i-b.y*s;T===0?e.moveTo(S,A):e.lineTo(S,A)}),e.stroke(),g)){const b=E-(w-x)/2*s-20;e.beginPath(),e.moveTo(u,E-(w-x)/2*s),e.lineTo(u,b),e.strokeStyle="#3b82f6",e.lineWidth=1.5,e.stroke(),e.beginPath(),e.arc(u,b,6,0,Math.PI*2),e.fillStyle="#ffffff",e.fill(),e.stroke()}e.beginPath(),e.strokeStyle=h.color||"#059669",e.lineWidth=(h.lineWidth||2)*a,h.lineStyle==="dashed"?e.setLineDash([8*a,6*a]):h.lineStyle==="dotted"&&e.setLineDash([2*a,4*a]),h.points.forEach((b,T)=>{const S=t+b.x*s,A=i-b.y*s;T===0?e.moveTo(S,A):e.lineTo(S,A)}),e.stroke(),e.setLineDash([]),e.restore()}),e.textAlign="left",e.textBaseline="bottom",n.forEach((h,p)=>{const g=(o==null?void 0:o.type)==="text"&&(o==null?void 0:o.index)===p,f=h.rotation||0,M=h.color||"#059669",v=(r==null?void 0:r.type)==="text"&&(r==null?void 0:r.index)===p,y=h.fontSize||14,x=Math.round(y*a),w=C.estimateTextWidth(h.text,y)*a,u=t+h.x*s,E=i-h.y*s;e.save(),e.translate(u,E),e.rotate(f),e.translate(-u,-E),e.font=`bold ${x}px sans-serif`;const b=u-w/2,T=E+y*a/2,S=y*a;if((g||v)&&a===1&&(e.fillStyle=g?"rgba(59, 130, 246, 0.15)":"rgba(59, 130, 246, 0.08)",e.fillRect(b-2,T-S-2,w+4,S+4),e.strokeStyle=g?"rgba(59, 130, 246, 0.8)":"rgba(59, 130, 246, 0.4)",e.lineWidth=1,e.strokeRect(b-2,T-S-2,w+4,S+4),g)){const A=E-S/2-20;e.beginPath(),e.moveTo(u,E-S/2),e.lineTo(u,A),e.strokeStyle="#3b82f6",e.lineWidth=1.5,e.stroke(),e.beginPath(),e.arc(u,A,6,0,Math.PI*2),e.fillStyle="#ffffff",e.fill(),e.stroke()}e.strokeStyle="white",e.lineWidth=Math.max(2,y*.2)*a,e.lineJoin="round",e.strokeText(h.text,b,T),e.fillStyle=M,e.fillText(h.text,b,T),e.restore()})},_drawAreas(e,t,i,s,a,n){a.forEach(l=>{e.beginPath(),l.path.forEach((o,r)=>{const d=n.get(o);r===0?e.moveTo(t+d.x*s,i-d.y*s):e.lineTo(t+d.x*s,i-d.y*s)}),e.closePath(),l.isDonut&&l.holes.forEach(o=>{o.path.forEach((r,d)=>{const c=n.get(r);d===0?e.moveTo(t+c.x*s,i-c.y*s):e.lineTo(t+c.x*s,i-c.y*s)}),e.closePath()}),e.fillStyle=this.CONFIG.colors.areaFill,e.fill("evenodd")})},_drawLines(e,t,i,s,a){a.forEach(n=>{const l=t+n.fromX*s,o=i-n.fromY*s,r=t+n.toX*s,d=i-n.toY*s;if(!n.isDraw){e.beginPath(),e.strokeStyle="#9ca3af",e.lineWidth=1.5,e.setLineDash([4,4]),e.moveTo(l,o),e.lineTo(r,d),e.stroke(),e.setLineDash([]);return}e.beginPath(),e.strokeStyle="#ffffff",e.lineWidth=n.type==="branch"?3.5:4,e.lineJoin="round",e.lineCap="round",e.moveTo(l,o),e.lineTo(r,d),e.stroke(),e.beginPath(),e.strokeStyle=n.type==="branch"?this.CONFIG.colors.lineBranch:this.CONFIG.colors.lineMain,e.lineWidth=n.type==="branch"?1.5:2,e.lineJoin="round",e.lineCap="round",e.moveTo(l,o),e.lineTo(r,d),e.stroke()})},_drawNodes(e,t,i,s,a,n=!0){const l=this._getFirstPointName(),o=parseInt(this.els.selNodeLabelInterval.value,10),r=a.get(l);r&&this._drawSingleNode(e,t+r.x*s,i-r.y*s,!0,l,n);let d=1;a.forEach((c,h)=>{h===l&&Math.abs(c.x)<.001&&Math.abs(c.y)<.001||(this._drawSingleNode(e,t+c.x*s,i-c.y*s,!1,h,n&&(o===1||o>1&&d%o===0)),d++)})},_drawSingleNode(e,t,i,s,a,n){e.beginPath(),e.arc(t,i,this.CONFIG.canvas.nodeRadius,0,Math.PI*2),e.fillStyle=s?this.CONFIG.colors.startNode:this.CONFIG.colors.normalNode,e.fill(),e.strokeStyle="#ffffff",e.lineWidth=1.5,e.stroke(),n&&(e.fillStyle=this.CONFIG.colors.text,e.font="12px sans-serif",e.textAlign="left",e.textBaseline="alphabetic",e.fillText(a,t+8,i-8))},_drawLabels(e,t,i,s,a){a.forEach((n,l)=>{const o=`区画 ${l+1}`,r=`${C.round4(n.netArea/1e4)}ha`,d=t+n.center.x*s,c=i-n.center.y*s;e.font="bold 12px sans-serif";const h=Math.max(e.measureText(o).width,e.measureText(r).width)+12,p=32;e.fillStyle=this.CONFIG.colors.labelBg,e.fillRect(d-h/2,c-p/2,h,p),e.strokeStyle="#217270",e.lineWidth=1,e.strokeRect(d-h/2,c-p/2,h,p),e.fillStyle="#217270",e.textAlign="center",e.textBaseline="middle",e.fillText(o,d,c-6),e.fillText(r,d,c+8),n.isDonut&&n.holes.forEach(g=>{const f=`除地 ${g.globalIndex}`,M=`${C.round4(g.area/1e4)}ha`,v=t+g.center.x*s,y=i-g.center.y*s;e.font="bold 11px sans-serif";const x=Math.max(e.measureText(f).width,e.measureText(M).width)+12,w=30;e.fillStyle=this.CONFIG.colors.labelBg,e.fillRect(v-x/2,y-w/2,x,w),e.strokeStyle="#A13D44",e.lineWidth=1,e.strokeRect(v-x/2,y-w/2,x,w),e.fillStyle="#A13D44",e.textAlign="center",e.textBaseline="middle",e.fillText(f,v,y-5),e.fillText(M,v,y+7)})})},_drawGrid(e,t,i,s){const a=this.CONFIG.canvas.gridBaseSize*s;if(a<10||a>500)return;e.strokeStyle=this.CONFIG.colors.gridSub,e.lineWidth=1;const n=Math.floor(-t/a)*a,l=Math.floor(-i/a)*a;e.beginPath();for(let o=n;o<this.els.canvas.width-t;o+=a)e.moveTo(t+o,0),e.lineTo(t+o,this.els.canvas.height);for(let o=l;o<this.els.canvas.height-i;o+=a)e.moveTo(0,i+o),e.lineTo(this.els.canvas.width,i+o);e.stroke(),e.beginPath(),e.strokeStyle=this.CONFIG.colors.gridMain,e.moveTo(t,0),e.lineTo(t,this.els.canvas.height),e.moveTo(0,i),e.lineTo(this.els.canvas.width,i),e.stroke()},_drawCompassRose(e){const i=this.els.chkMagDeclination.checked&&parseFloat(this.els.inputDeclination.value)||0;e.save(),e.translate(50,50),e.beginPath(),e.moveTo(0,-25),e.lineTo(0,25),e.moveTo(-25,0),e.lineTo(25,0),e.strokeStyle="#9ca3af",e.lineWidth=1,e.stroke(),e.beginPath(),e.moveTo(0,-30),e.lineTo(4,-17),e.lineTo(-4,-17),e.closePath(),e.fillStyle=this.CONFIG.colors.compassText,e.fill(),e.font="bold 12px sans-serif",e.textAlign="center",e.textBaseline="bottom",e.fillText("N",0,-33),i!==0&&(e.save(),e.rotate(C.deg2rad(-i)),e.beginPath(),e.moveTo(0,0),e.lineTo(0,-25),e.strokeStyle=this.CONFIG.colors.compassArrow,e.lineWidth=2,e.stroke(),e.beginPath(),e.moveTo(0,-27),e.lineTo(3,-20),e.lineTo(-3,-20),e.closePath(),e.fillStyle=this.CONFIG.colors.compassArrow,e.fill(),e.font="10px sans-serif",e.textAlign="center",e.textBaseline="bottom",e.fillText("MN",0,-29),e.restore()),e.restore()},finishCurrentLine(){if(this.state.currentLine.length>=2){this.state.annotations||(this.state.annotations={texts:[],lines:[]});const e=this.els.chkMagDeclination.checked&&parseFloat(this.els.inputDeclination.value)||0,t=C.deg2rad(e),i=Math.cos(-t),s=Math.sin(-t),a=this.state.currentLine.map(n=>{const l=n.x*i-n.y*s,o=n.x*s+n.y*i;return{x:n.x,y:n.y,baseX:l,baseY:o}});this.state.annotations.lines.push({points:a,color:"#059669",lineWidth:2,lineStyle:"solid",rotation:0}),this.saveToLocalStorage(),this.pushState()}this.state.currentLine=[],this.state.view.currentMouseInternalX=void 0,this._redrawAll()},_updateLiveAnnotationDrawing(){this.isMapMode?this.updateMapDrawing(!1):this.draw()}},U={initMap(){if(this.map)return;const e=parseFloat(this.els.inputLat.value)||35,t=parseFloat(this.els.inputLon.value)||135;this.map=L.map("mapContainer",{maxZoom:24}).setView([e,t],16);const i={maxNativeZoom:18,maxZoom:24,attribution:"<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"},s=L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png",i),a=L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg",i),n=L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png",i);s.addTo(this.map),L.control.layers({標準地図:s,"写真（オルソ）":a,淡色地図:n}).addTo(this.map),this.mapLayerGroup=L.featureGroup().addTo(this.map),this.tempLineLayer=L.polyline([],{color:"#059669",weight:2,dashArray:"6, 6",interactive:!1}).addTo(this.map),this.map.on("click",l=>this.handleMapClick(l)),this.map.on("dragstart",()=>document.body.classList.add("left-dragging")),this.map.on("dragend",()=>document.body.classList.remove("left-dragging")),this.map.on("contextmenu",l=>{l.originalEvent.preventDefault(),!this.state.mapView.rightDragMoved&&this.state.interactionMode==="line"&&this.finishCurrentLine()}),this.els.mapContainer.addEventListener("mousedown",l=>{l.button===2&&(this.state.mapView.isRightDragging=!0,this.state.mapView.rightDragMoved=!1,this.state.mapView.dragStartX=this.state.mapView.lastMouseX=l.clientX,this.state.mapView.dragStartY=this.state.mapView.lastMouseY=l.clientY,document.body.classList.add("right-dragging"))})},handleMapClick(e){if(["pan","erase","select"].includes(this.state.interactionMode)){this.state.interactionMode==="select"&&this._clearSelection();return}const t=this.getInternalCoordsFromLatLng(e.latlng.lat,e.latlng.lng);this.state.interactionMode==="text"?this._showTextPrompt(t.x,t.y):this.state.interactionMode==="line"&&(this.state.currentLine.push({x:t.x,y:t.y}),this.state.view.currentMouseInternalX=t.x,this.state.view.currentMouseInternalY=t.y,this._redrawAll())},_updateMapTempLine(){if(this.tempLineLayer)if(this.state.interactionMode==="line"&&this.state.currentLine.length>0){const e=parseFloat(this.els.inputLat.value)||0,t=parseFloat(this.els.inputLon.value)||0,i=I.LAT_DEG_PER_METER/Math.cos(C.deg2rad(e)),s=this.state.currentLine.map(a=>[e+a.y*I.LAT_DEG_PER_METER,t+a.x*i]);this.state.view.currentMouseInternalX!==void 0&&s.push([e+this.state.view.currentMouseInternalY*I.LAT_DEG_PER_METER,t+this.state.view.currentMouseInternalX*i]),this.tempLineLayer.setLatLngs(s)}else this.tempLineLayer.setLatLngs([])},toggleMapMode(){this.isMapMode=!this.isMapMode,this.isMapMode?(this.els.mapContainer.style.display="block",this.els.btnToggleMap.textContent="✏️ 図面ビュー",this.els.btnToggleMap.classList.add("active-map"),this.map||this.initMap(),this.map.dragging.enable(),setTimeout(()=>{this.map.invalidateSize(),this.updateMapDrawing(!0),this._updateMapTempLine()},100)):(this.els.mapContainer.style.display="none",this.els.btnToggleMap.textContent="🗺️ 地図ビュー",this.els.btnToggleMap.classList.remove("active-map"),this.resizeCanvas(),this.updateDrawing(!0))},updateMapDrawing(e=!1){if(!this.map||!this.mapLayerGroup)return;this.mapLayerGroup.clearLayers();const t=parseFloat(this.els.inputLat.value),i=parseFloat(this.els.inputLon.value);if(isNaN(t)||isNaN(i))return;const s=I.LAT_DEG_PER_METER/Math.cos(C.deg2rad(t));this._drawMapAreas(t,i,s),this._drawMapLines(t,i,s),this._drawMapNodesAndLabels(t,i,s),this._drawMapAnnotations(t,i,s),e&&(this.mapLayerGroup.getLayers().length>0?this.map.fitBounds(this.mapLayerGroup.getBounds(),{padding:[50,50]}):this.map.setView([t,i],16))},_getRotLatLng(e,t,i,s){const a=parseFloat(this.els.inputLat.value)||0,n=parseFloat(this.els.inputLon.value)||0,l=I.LAT_DEG_PER_METER/Math.cos(C.deg2rad(a)),o=e.x-t,r=e.y-i,d=Math.cos(s),c=Math.sin(s);return[a+(i-o*c+r*d)*I.LAT_DEG_PER_METER,n+(t+o*d+r*c)*l]},_drawMapAnnotations(e,t,i){var a,n;const s=this.state.selectedAnnotation;(((a=this.state.annotations)==null?void 0:a.lines)||[]).forEach((l,o)=>{const r=l.rotation||0;let d=1/0,c=-1/0,h=1/0,p=-1/0;l.points.forEach(D=>{D.x<d&&(d=D.x),D.x>c&&(c=D.x),D.y<h&&(h=D.y),D.y>p&&(p=D.y)});const g=(d+c)/2,f=(h+p)/2,M=l.points.map(D=>this._getRotLatLng(D,g,f,r)),v=l.lineWidth||3,y=l.color||"#059669",x=(s==null?void 0:s.type)==="line"&&(s==null?void 0:s.index)===o;let w=null;l.lineStyle==="dashed"?w="8, 6":l.lineStyle==="dotted"&&(w="2, 4");let u=null,E=null,b=null,T=0,S=null;if(x){u=L.polyline(M,{color:"#3b82f6",weight:v+8,opacity:.4,interactive:!1}).addTo(this.mapLayerGroup),b=this._getRotLatLng({x:g,y:f},g,f,r);const k=this._getPixelsToInternalDistance(20);T=p+k;const N=this._getRotLatLng({x:g,y:T},g,f,r);E=L.polyline([b,N],{color:"#3b82f6",weight:2,interactive:!1}).addTo(this.mapLayerGroup)}const A=L.polyline(M,{color:y,weight:v,dashArray:w,opacity:.9,interactive:!0,className:"leaflet-interactive no-select-text"}).addTo(this.mapLayerGroup);if(x){const D=this._getRotLatLng({x:g,y:T},g,f,r);S=L.marker(D,{icon:L.divIcon({className:"map-rotate-handle",html:'<div style="width:12px;height:12px;background:#fff;border:2px solid #3b82f6;border-radius:50%;cursor:grab;margin:-6px 0 0 -6px;pointer-events:auto;"></div>',iconSize:[0,0]}),draggable:!1,zIndexOffset:1e3}).addTo(this.mapLayerGroup),S.on("mouseover",()=>document.body.classList.add("hovering-handle")),S.on("mouseout",()=>document.body.classList.remove("hovering-handle")),S.on("mousedown",k=>{L.DomEvent.stopPropagation(k),L.DomEvent.preventDefault(k.originalEvent),this.map.dragging.disable(),this.state.view.isRotating=!0,this.state.view.rotatingTarget={type:"line",index:o,ref:l};const N=this.els.mapContainer.getBoundingClientRect(),F=k.originalEvent.clientX-N.left,_=k.originalEvent.clientY-N.top,R=L.point(F,_),$=this.map.containerPointToLatLng(R),B=this.getInternalCoordsFromLatLng($.lat,$.lng);this.state.view.dragStartInternalX=B.x,this.state.view.dragStartInternalY=B.y,this.state.view.dragStartX=k.originalEvent.clientX,this.state.view.dragStartY=k.originalEvent.clientY,this.state.view.movingLayer=A,this.state.view.movingExtras={highlightPolyline:u,handleLine:E,hMarker:S},document.body.classList.add("left-dragging")})}A.on("mouseover",()=>{["select","erase"].includes(this.state.interactionMode)&&(document.body.classList.add("hovering-annotation"),x||A.setStyle({color:"#3b82f6",weight:v+4,opacity:.6}))}),A.on("mouseout",()=>{document.body.classList.remove("hovering-annotation"),x||A.setStyle({color:y,weight:v,dashArray:w,opacity:.9})}),A.on("mousedown",D=>{if(this.state.interactionMode==="select"){L.DomEvent.stopPropagation(D),L.DomEvent.preventDefault(D.originalEvent),this.map.dragging.disable(),document.body.classList.add("left-dragging"),this._selectAnnotation({type:"line",index:o,ref:l}),this.state.view.isMovingAnnotation=!0,this.state.view.movingTarget={type:"line",index:o,ref:l},this.state.view.movingLayer=A,this.state.view.movingInitialState=JSON.parse(JSON.stringify(l));const k=this.els.mapContainer.getBoundingClientRect(),N=D.originalEvent.clientX-k.left,F=D.originalEvent.clientY-k.top,_=L.point(N,F),R=this.map.containerPointToLatLng(_),$=this.getInternalCoordsFromLatLng(R.lat,R.lng);this.state.view.dragStartInternalX=$.x,this.state.view.dragStartInternalY=$.y,this.state.view.dragStartX=D.originalEvent.clientX,this.state.view.dragStartY=D.originalEvent.clientY,x&&u&&E&&S?this.state.view.movingExtras={highlightPolyline:u,handleLine:E,hMarker:S}:this.state.view.movingExtras=null,this.state.view.lastInternalX=$.x,this.state.view.lastInternalY=$.y,this.state.view.dragMoved=!1}}),A.on("click",D=>{L.DomEvent.stopPropagation(D),this.state.interactionMode==="erase"&&(this.state.annotations.lines.splice(o,1),this.saveToLocalStorage(),this.pushState(),this._redrawAll())}),A.on("contextmenu",D=>{this.state.interactionMode==="line"&&(L.DomEvent.stopPropagation(D),this.finishCurrentLine())})}),(((n=this.state.annotations)==null?void 0:n.texts)||[]).forEach((l,o)=>{const r=l.fontSize||14,d=l.x,c=l.y,h=this._getRotLatLng({x:d,y:c},d,c,0),p=(s==null?void 0:s.type)==="text"&&(s==null?void 0:s.index)===o,g=p?"border: 1px solid #3b82f6; background: rgba(59, 130, 246, 0.15); margin-left:-2px; padding:0 2px;":"",f=L.marker(h,{icon:L.divIcon({className:"map-annotation-label",html:`<div style="transform: rotate(${(l.rotation||0)*180/Math.PI}deg) translate(-50%, -50%); transform-origin: 0 0; position: absolute; user-select: none; -webkit-user-select: none;"><div draggable="false" style="${g} color: ${l.color||"#059669"}; font-weight: bold; font-size: ${r}px; text-shadow: 1px 1px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff; white-space: nowrap; pointer-events: auto; transition: background-color 0.1s, border 0.1s; user-select: none; -webkit-user-select: none;">${l.text}</div></div>`,iconSize:[0,0],iconAnchor:[0,0]}),interactive:!0}).addTo(this.mapLayerGroup);let M=null,v=null;if(p){const y=r/2+20,x=this._getPixelsToInternalDistance(y),w=c+x,u=this._getRotLatLng({x:d,y:w},d,c,l.rotation||0);M=L.polyline([h,u],{color:"#3b82f6",weight:2,interactive:!1}).addTo(this.mapLayerGroup),v=L.marker(u,{icon:L.divIcon({className:"map-rotate-handle",html:'<div style="width:12px;height:12px;background:#fff;border:2px solid #3b82f6;border-radius:50%;cursor:grab;margin:-6px 0 0 -6px;pointer-events:auto;"></div>',iconSize:[0,0]}),draggable:!1,zIndexOffset:1e3}).addTo(this.mapLayerGroup),v.on("mouseover",()=>document.body.classList.add("hovering-handle")),v.on("mouseout",()=>document.body.classList.remove("hovering-handle")),v.on("mousedown",E=>{L.DomEvent.stopPropagation(E),L.DomEvent.preventDefault(E.originalEvent),this.map.dragging.disable(),this.state.view.isRotating=!0,this.state.view.rotatingTarget={type:"text",index:o,ref:l};const b=this.els.mapContainer.getBoundingClientRect(),T=E.originalEvent.clientX-b.left,S=E.originalEvent.clientY-b.top,A=L.point(T,S),D=this.map.containerPointToLatLng(A),k=this.getInternalCoordsFromLatLng(D.lat,D.lng);this.state.view.dragStartInternalX=k.x,this.state.view.dragStartInternalY=k.y,this.state.view.dragStartX=E.originalEvent.clientX,this.state.view.dragStartY=E.originalEvent.clientY,this.state.view.movingLayer=f,this.state.view.movingExtras={handleLine:M,hMarker:v},document.body.classList.add("left-dragging")})}f.on("mouseover",()=>{var y;if(["select","erase"].includes(this.state.interactionMode)&&(document.body.classList.add("hovering-annotation"),!p)){const x=(y=f.getElement())==null?void 0:y.querySelector("div > div");x&&(x.style.border="1px dashed rgba(59, 130, 246, 0.6)",x.style.background="rgba(59, 130, 246, 0.08)",x.style.marginLeft="-2px",x.style.padding="0 2px")}}),f.on("mouseout",()=>{var y;if(document.body.classList.remove("hovering-annotation"),!p){const x=(y=f.getElement())==null?void 0:y.querySelector("div > div");x&&(x.style.border="none",x.style.background="transparent",x.style.marginLeft="0",x.style.padding="0")}}),f.on("mousedown",y=>{if(this.state.interactionMode==="select"){L.DomEvent.stopPropagation(y),L.DomEvent.preventDefault(y.originalEvent),this.map.dragging.disable(),document.body.classList.add("left-dragging"),this._selectAnnotation({type:"text",index:o,ref:l}),this.state.view.isMovingAnnotation=!0,this.state.view.movingTarget={type:"text",index:o,ref:l},this.state.view.movingLayer=f,this.state.view.movingInitialState=JSON.parse(JSON.stringify(l));const x=this.els.mapContainer.getBoundingClientRect(),w=y.originalEvent.clientX-x.left,u=y.originalEvent.clientY-x.top,E=L.point(w,u),b=this.map.containerPointToLatLng(E),T=this.getInternalCoordsFromLatLng(b.lat,b.lng);this.state.view.dragStartInternalX=T.x,this.state.view.dragStartInternalY=T.y,this.state.view.dragStartX=y.originalEvent.clientX,this.state.view.dragStartY=y.originalEvent.clientY,p&&M&&v?this.state.view.movingExtras={handleLine:M,hMarker:v}:this.state.view.movingExtras=null,this.state.view.lastInternalX=T.x,this.state.view.lastInternalY=T.y,this.state.view.dragMoved=!1}}),f.on("click",y=>{L.DomEvent.stopPropagation(y),this.state.interactionMode==="erase"&&(this.state.annotations.texts.splice(o,1),this.saveToLocalStorage(),this.pushState(),this._redrawAll())})})},_drawMapAreas(e,t,i){this.state.detectedAreas.forEach(s=>{const a=[s.path.map(n=>[e+this.state.nodes.get(n).y*I.LAT_DEG_PER_METER,t+this.state.nodes.get(n).x*i])];s.isDonut&&s.holes.forEach(n=>a.push(n.path.map(l=>[e+this.state.nodes.get(l).y*I.LAT_DEG_PER_METER,t+this.state.nodes.get(l).x*i]))),L.polygon(a,{stroke:!1,fillColor:"#217270",fillOpacity:.25,interactive:!1}).addTo(this.mapLayerGroup)})},_drawMapLines(e,t,i){this.state.points.forEach(s=>{const a=[[e+s.fromY*I.LAT_DEG_PER_METER,t+s.fromX*i],[e+s.toY*I.LAT_DEG_PER_METER,t+s.toX*i]];if(!s.isDraw){L.polyline(a,{color:"#9ca3af",weight:3,opacity:.8,dashArray:"5, 5",interactive:!1}).addTo(this.mapLayerGroup);return}L.polyline(a,{color:"#ffffff",weight:s.type==="branch"?6:7,opacity:.9,lineCap:"round",lineJoin:"round",interactive:!1}).addTo(this.mapLayerGroup),L.polyline(a,{color:s.type==="branch"?this.CONFIG.colors.lineBranch:this.CONFIG.colors.lineMain,weight:s.type==="branch"?3:4,opacity:.9,lineCap:"round",lineJoin:"round",interactive:!1}).addTo(this.mapLayerGroup)})},_drawMapNodesAndLabels(e,t,i){const s=this._getFirstPointName(),a=parseInt(this.els.selNodeLabelInterval.value,10);L.circleMarker([e,t],{radius:5,fillColor:this.CONFIG.colors.startNode,color:"#ffffff",weight:2.5,opacity:1,fillOpacity:1,interactive:!1}).addTo(this.mapLayerGroup).bindTooltip(s,{permanent:!0,direction:"right",className:"map-label",offset:[5,0]});let n=1;this.state.nodes.forEach((l,o)=>{if(o===s&&Math.abs(l.x)<.001&&Math.abs(l.y)<.001)return;const r=L.circleMarker([e+l.y*I.LAT_DEG_PER_METER,t+l.x*i],{radius:5,fillColor:this.CONFIG.colors.normalNode,color:"#ffffff",weight:2.5,opacity:1,fillOpacity:1,interactive:!1}).addTo(this.mapLayerGroup);(a===1||a>1&&n%a===0)&&r.bindTooltip(o,{permanent:!0,direction:"right",className:"map-label",offset:[5,0]}),n++}),this.state.detectedAreas.forEach((l,o)=>{L.marker([e+l.center.y*I.LAT_DEG_PER_METER,t+l.center.x*i],{icon:L.divIcon({className:"map-label-container",html:`<div class="area-map-label">区画 ${o+1}<br><span style="font-weight:normal; font-size:1em;">${C.round4(l.netArea/1e4)}ha</span></div>`,iconSize:[0,0],iconAnchor:[0,0]}),interactive:!1}).addTo(this.mapLayerGroup),l.isDonut&&l.holes.forEach(r=>L.marker([e+r.center.y*I.LAT_DEG_PER_METER,t+r.center.x*i],{icon:L.divIcon({className:"map-label-container",html:`<div class="hole-map-label">除地 ${r.globalIndex}<br><span style="font-weight:normal; font-size:1em;">${C.round4(r.area/1e4)}ha</span></div>`,iconSize:[0,0],iconAnchor:[0,0]}),interactive:!1}).addTo(this.mapLayerGroup))})}},q={exportGeoJSON(e){const t=parseFloat(this.els.inputLat.value),i=parseFloat(this.els.inputLon.value);if(isNaN(t)||isNaN(i))return this.showToast("基準点(B.P.)の緯度・経度を正しく入力してください。");const s=I.LAT_DEG_PER_METER/Math.cos(C.deg2rad(t)),a=[],n={};this.state.attributes.forEach(o=>{o.name&&(n[o.name]=o.value)});const l=this._getFirstPointName();a.push({type:"Feature",properties:{測点名:l,緯度:parseFloat(t.toFixed(6)),経度:parseFloat(i.toFixed(6)),...n},geometry:{type:"Point",coordinates:[i,t]}}),this.state.nodes.forEach((o,r)=>{r===l&&Math.abs(o.x)<.001&&Math.abs(o.y)<.001||a.push({type:"Feature",properties:{測点名:r,緯度:parseFloat((t+o.y*I.LAT_DEG_PER_METER).toFixed(6)),経度:parseFloat((i+o.x*s).toFixed(6)),...n},geometry:{type:"Point",coordinates:[i+o.x*s,t+o.y*I.LAT_DEG_PER_METER]}})}),this.els.chkCompassAdjustment.checked&&this.state.detectedAreas.forEach(o=>{const r=[o.coords];o.holes.forEach(d=>r.push(d.coords)),a.push({type:"Feature",properties:{name:o.originalName,"全体面積(m2)":parseFloat(o.area.toFixed(2)),"除地面積(m2)":parseFloat((o.area-o.netArea).toFixed(2)),"正味面積(m2)":parseFloat(o.netArea.toFixed(2)),"全体面積(ha)":parseFloat(C.round4(o.area/1e4)),"除地面積(ha)":parseFloat(C.round4((o.area-o.netArea)/1e4)),"正味面積(ha)":parseFloat(C.round4(o.netArea/1e4)),"周長(m)":parseFloat(o.perimeter.toFixed(2)),構造:o.isDonut?`ドーナツポリゴン（${o.holes.length}つの穴）`:"通常ポリゴン",...n},geometry:{type:"Polygon",coordinates:r}})}),this.state.points.forEach(o=>{a.push({type:"Feature",properties:{タイプ:o.type==="main"?"本線":"支線",作図対象:o.isDraw?"はい":"いいえ",器械点:o.fromName,視準点:o.toName,方位角:parseFloat(o.input.az.toFixed(2)),高低角:o.input.el,斜距離:o.input.sd,水平距離:parseFloat(o.input.hd.toFixed(2)),...n},geometry:{type:"LineString",coordinates:[[i+o.fromX*s,t+o.fromY*I.LAT_DEG_PER_METER],[i+o.toX*s,t+o.toY*I.LAT_DEG_PER_METER]]}})}),this.state.annotations&&(this.state.annotations.texts.forEach(o=>a.push({type:"Feature",properties:{タイプ:"注記",テキスト:o.text,文字色:o.color||"#059669",サイズ:o.fontSize||14,回転角度:parseFloat(((o.rotation||0)*180/Math.PI).toFixed(2)),...n},geometry:{type:"Point",coordinates:[i+o.x*s,t+o.y*I.LAT_DEG_PER_METER]}})),this.state.annotations.lines.forEach(o=>a.push({type:"Feature",properties:{タイプ:"連続線",回転角度:parseFloat(((o.rotation||0)*180/Math.PI).toFixed(2)),...n},geometry:{type:"LineString",coordinates:o.points.map(r=>[i+r.x*s,t+r.y*I.LAT_DEG_PER_METER])}}))),e||(e="令和8年度_育成複層林整備_山田太郎_No.10"),e.endsWith(".geojson")||(e+=".geojson"),this._downloadFile("data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify({type:"FeatureCollection",features:a},null,2)),e)},showHTMLPreview(e,t="A4",i="landscape",s="auto",a=50,n=null){const l=this.els.chkMagDeclination.checked;this.els.chkMagDeclination.checked=!1,this.calculateCoordinates(),this.findClosedAreas();const o=parseFloat(this.els.inputLat.value)||0,r=parseFloat(this.els.inputLon.value)||0,d=this.els.inputDeclination.value,c=I.PAPER_CONFIGS[`${t}_${i}`],h=this._buildExportHTMLResultsTable(a),{expScale:p,expOffsetX:g,expOffsetY:f,displayScaleText:M}=this._calcExportScaleOptions(c,s),v=this._buildExportHTMLAttrTable(M,o,r,d),y=this._buildExportHTMLAreaTable(),x=this.isMapMode;let w="https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png";this.map&&this.map.eachLayer(O=>{O instanceof L.TileLayer&&(w=O._url)});const u=this._generateExportSVGDataURL(c,p,g,f),E=this._generateCompassSVGDataURL(c,d),b=this._generateDraggableLabelsHTML(p,g,f,u.pxPerMm,u.x,u.y),T=-g/p,S=f/p,A=(c.expW-g)/p,D=(f-c.expH)/p,k=I.LAT_DEG_PER_METER/Math.cos(C.deg2rad(o)),N=o+S*I.LAT_DEG_PER_METER,F=r+T*k,_=o+D*I.LAT_DEG_PER_METER,R=r+A*k;let $=e||"compass_survey_data";$.endsWith(".html")||($+=".html");const B=`<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><title>平面図 (${t} ${i})</title>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/><script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"><\/script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/encoding-japanese/2.0.0/encoding.min.js"><\/script>
<style>
@page { size: ${t} ${i}; margin: 0; }
body { font-family: sans-serif; font-size: 10pt; background: #ececec; margin:0; padding-top: 60px; }
.page-wrapper { width: 100%; display: flex; justify-content: center; }
.page-container { position: relative; width: ${c.w}mm; height: ${c.h}mm; background: #fff; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.2); transform-origin: top center; transition: transform 0.1s ease; margin-bottom: 20px; flex-shrink: 0; }
.draggable { position: absolute; z-index: 2; background: #fff; cursor: move; transform-origin: top left; white-space: nowrap; box-sizing: border-box; }
.draggable.no-bg { background: transparent; }
.draggable:not(.map-group):hover, .sub-draggable:hover { box-shadow: 0 0 12px rgba(46,92,138,0.4); outline: 2px dashed rgba(46,92,138,0.6); z-index: 10; }
.compass-image { position: absolute; bottom: 30mm; left: 25mm; width: 30mm; height: 30mm; z-index: 3; }
table { border-collapse: collapse; border: 1px solid #000; } th, td { border: 1px solid #000; padding: 6px; } th { background: #f2f2f2; }
.attr-table-wrapper { top: 15mm; left: 15mm; } .result-table-wrapper { top: 15mm; right: 15mm; transform-origin: top right; } .area-table-wrapper { top: 80mm; left: 15mm; }
.instruction { position: fixed; top: 0; left: 0; width: 100%; box-sizing: border-box; background: #3f3f46; color: white; padding: 10px 20px; display: flex; justify-content: space-between; align-items: center; z-index: 100; box-shadow: 0 2px 4px rgba(0,0,0,0.2); }
.btn { background: #2E5C8A; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 0.9rem; font-weight: bold; margin-left: 10px; }
.btn-save { background: #059669; }
.btn-zoom { background: #52525b; color: white; border: 1px solid #71717a; border-radius: 4px; width: 24px; height: 24px; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; padding: 0; line-height: 1; transition: all 0.2s; }
.btn-zoom:hover { background: #6366f1; border-color: #818cf8; }
.map-cropper { outline: 1px dashed transparent; pointer-events: auto; }
.map-cropper.active { outline-color: #f59e0b; }
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
    <label style="font-size:13px; margin-left: 10px; cursor: pointer; color: white;"><input type="checkbox" id="chkBgMap" ${x?"checked":""}> 背景地図</label>
    <select id="bgMapType" style="margin-left:5px; font-size:13px; padding: 2px;">
        <option value="https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png" ${w.includes("std")?"selected":""}>標準地図</option>
        <option value="https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg" ${w.includes("seamlessphoto")?"selected":""}>写真</option>
        <option value="https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png" ${w.includes("pale")?"selected":""}>淡色地図</option>
    </select>
        </div>
        
        <div style="display: flex; align-items: center; gap: 6px; background: rgba(0,0,0,0.2); padding: 4px 10px; border-radius: 6px;">
    <span style="font-size: 0.85rem;">用紙:</span>
    <select id="plPaperSize" style="font-size:12px; padding:2px;">
        <option value="A4" ${t==="A4"?"selected":""}>A4</option>
        <option value="A3" ${t==="A3"?"selected":""}>A3</option>
        <option value="A2" ${t==="A2"?"selected":""}>A2</option>
        <option value="A1" ${t==="A1"?"selected":""}>A1</option>
        <option value="A0" ${t==="A0"?"selected":""}>A0</option>
    </select>
    <select id="plOrientation" style="font-size:12px; padding:2px;">
        <option value="landscape" ${i==="landscape"?"selected":""}>横</option>
        <option value="portrait" ${i==="portrait"?"selected":""}>縦</option>
    </select>
    <span style="font-size: 0.85rem; margin-left: 6px;">縮尺:</span>
    <select id="plScale" style="font-size:12px; padding:2px;">
        <option value="auto" ${s==="auto"?"selected":""}>自動縮尺</option>
        <option value="100" ${s==="100"?"selected":""}>1/100</option>
        <option value="200" ${s==="200"?"selected":""}>1/200</option>
        <option value="250" ${s==="250"?"selected":""}>1/250</option>
        <option value="300" ${s==="300"?"selected":""}>1/300</option>
        <option value="500" ${s==="500"?"selected":""}>1/500</option>
        <option value="1000" ${s==="1000"?"selected":""}>1/1,000</option>
        <option value="2000" ${s==="2000"?"selected":""}>1/2,000</option>
        <option value="2500" ${s==="2500"?"selected":""}>1/2,500</option>
        <option value="5000" ${s==="5000"?"selected":""}>1/5,000</option>
    </select>
    <span style="font-size: 0.85rem; margin-left: 6px;">成果表折返:</span>
    <input type="number" id="plTableSplit" value="${a}" style="width:45px; font-size:12px; padding:2px;">
        </div>
    </div>
    <div>
        <button class="btn" onclick="window.print()">🖨️ 印刷</button>
        <button class="btn" id="btnSaveDXF" style="background: #c2410c;">💾 DXF保存</button>
        <button class="btn btn-save" id="btnSaveHTML">💾 HTML保存</button>
        <button class="btn" onclick="window.close()" style="background: #dc2626;">✖ 閉じる</button>
    </div>
</div>
<div class="page-wrapper">
    <div class="page-container">
        <div class="map-group draggable no-bg no-scale" style="position: absolute; left: ${u.x/u.pxPerMm}mm; top: ${u.y/u.pxPerMm}mm; width: ${u.w/u.pxPerMm}mm; height: ${u.h/u.pxPerMm}mm; z-index: 1;">
    <div id="map-cropper" class="map-cropper" style="position:absolute; z-index:0; top: ${-(u.y/u.pxPerMm)+10}mm; left: ${-(u.x/u.pxPerMm)+10}mm; width: ${c.w-20}mm; height: ${c.h-20}mm; overflow:hidden;">
        <div id="printMapBg" style="position:absolute; top: -10mm; left: -10mm; width: ${c.w}mm; height: ${c.h}mm; z-index: 0; opacity: 0.7; pointer-events: none;"></div>
        <div class="resize-handle n" data-dir="n"></div><div class="resize-handle s" data-dir="s"></div><div class="resize-handle w" data-dir="w"></div><div class="resize-handle e" data-dir="e"></div>
        <div class="resize-handle nw" data-dir="nw"></div><div class="resize-handle ne" data-dir="ne"></div><div class="resize-handle sw" data-dir="sw"></div><div class="resize-handle se" data-dir="se"></div>
    </div>
    <div style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; z-index: 1;">
        ${u.svgString}
    </div>
    ${b}
        </div>
        <div class="compass-image draggable no-scale no-bg">
            ${E.svgString}
        </div>
        <div class="attr-table-wrapper draggable"><table>${v}</table></div>${h}${y}
        ${this.els.closureInfo.innerText?`<div class="closure-info draggable" style="bottom:15mm; left:15mm; padding:5px; font-size:9pt;">閉合状況: ${this.els.closureInfo.innerText}</div>`:""}
    </div>
</div>
<script>
window.onerror = function(m, u, l) { alert('Error: ' + m + '\\nLine: ' + l); };
setTimeout(() => { try {
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
    el.dataset.initLeft = el.offsetLeft + 'px';
    el.dataset.initTop = el.offsetTop + 'px';
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
        a.download = '${$}';
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
        const cropperDiv = document.getElementById('map-cropper');
        
        if (isChecked) {
    cropperDiv.style.display = 'block';
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
    const bounds = L.latLngBounds([${_}, ${F}], [${N}, ${R}]);
    mapBg.fitBounds(bounds);
        } else {
    if (mapBg) {
        mapBg.remove();
        mapBg = null;
    }
    cropperDiv.style.display = 'none';
        }
    }
    
    document.getElementById('chkBgMap').addEventListener('change', updateMapBg);
    document.getElementById('bgMapType').addEventListener('change', updateMapBg);
    
    if (document.getElementById('chkBgMap').checked) {
        setTimeout(updateMapBg, 100);
    } else {
        document.getElementById('map-cropper').style.display = 'none';
    }

    // --- Preview Settings Update ---
    function applyPreviewSettings() {
        if (window.opener && window.opener.app && typeof window.opener.app.showHTMLPreview === 'function') {
    const newPSize = document.getElementById('plPaperSize').value;
    const newOri = document.getElementById('plOrientation').value;
    const newSOpt = document.getElementById('plScale').value;
    const newSplit = parseInt(document.getElementById('plTableSplit').value, 10) || 50;
    window.opener.app.showHTMLPreview(${JSON.stringify(e)}, newPSize, newOri, newSOpt, newSplit, window);
        } else {
    alert('元の画面が閉じられているか、アクセスできないため設定を反映できません。');
        }
    }
    
    document.getElementById('plPaperSize').addEventListener('change', applyPreviewSettings);
    document.getElementById('plOrientation').addEventListener('change', applyPreviewSettings);
    document.getElementById('plScale').addEventListener('change', applyPreviewSettings);
    document.getElementById('plTableSplit').addEventListener('change', applyPreviewSettings);



    class SimpleDxfWriter {
        constructor(w = 297, h = 210) {
    this.header = ['0', 'SECTION', '2', 'HEADER', '9', '$ACADVER', '1', 'AC1009', '9', '$DWGCODEPAGE', '3', 'ANSI_932', '9', '$LIMMIN', '10', '0.0', '20', '0.0', '9', '$LIMMAX', '10', w.toFixed(2), '20', h.toFixed(2), '9', '$EXTMIN', '10', '0.0', '20', '0.0', '9', '$EXTMAX', '10', w.toFixed(2), '20', h.toFixed(2), '0', 'ENDSEC'];
    this.blocks = ['0', 'SECTION', '2', 'BLOCKS'];
    this.entities = ['0', 'SECTION', '2', 'ENTITIES'];
    this.currentSection = this.entities;
    this.blockCounter = 1;
    this.inBlock = false;
        }
        startGroup() {
    const blockName = 'GROUP_' + this.blockCounter++;
    this.blocks.push('0', 'BLOCK', '8', '0', '2', blockName, '70', '0', '10', '0.0', '20', '0.0', '3', blockName);
    this.currentSection = this.blocks;
    this.currentBlockName = blockName;
    this.inBlock = true;
        }
        endGroup() {
    if (!this.inBlock) return;
    this.blocks.push('0', 'ENDBLK', '8', '0');
    this.entities.push('0', 'INSERT', '8', '0', '2', this.currentBlockName, '10', '0.0', '20', '0.0');
    this.currentSection = this.entities;
    this.inBlock = false;
        }
        addLine(x1, y1, x2, y2, color=256) {
    this.currentSection.push('0', 'LINE', '8', '0', '62', color, '10', x1.toFixed(3), '20', y1.toFixed(3), '11', x2.toFixed(3), '21', y2.toFixed(3));
        }
        addPolyline(pts, closed, color=256) {
    if (pts.length < 2) return;
    for (let i=0; i<pts.length - 1; i++) {
        this.addLine(pts[i].x, pts[i].y, pts[i+1].x, pts[i+1].y, color);
    }
    if (closed && pts.length > 2) {
        this.addLine(pts[pts.length-1].x, pts[pts.length-1].y, pts[0].x, pts[0].y, color);
    }
        }
        addText(text, x, y, height, color=256, align='L', angle=0) {
    this.currentSection.push('0', 'TEXT', '8', '0', '62', color, '10', x.toFixed(3), '20', y.toFixed(3), '40', height.toFixed(3), '50', angle.toFixed(3), '1', text);
    if (align === 'C') {
        this.currentSection.push('72', '1', '11', x.toFixed(3), '21', y.toFixed(3));
    } else if (align === 'R') {
        this.currentSection.push('72', '2', '11', x.toFixed(3), '21', y.toFixed(3));
    }
        }
        addCircle(x, y, radius, color=256) {
    this.currentSection.push('0', 'CIRCLE', '8', '0', '62', color, '10', x.toFixed(3), '20', y.toFixed(3), '40', radius.toFixed(3));
        }
        toString() { 
    this.blocks.push('0', 'ENDSEC');
    this.entities.push('0', 'ENDSEC');
    return [...this.header, ...this.blocks, ...this.entities, '0', 'EOF'].join(String.fromCharCode(13, 10)); 
        }
    }

    document.getElementById('btnSaveDXF').addEventListener('click', () => {
        const paperRect = document.querySelector('.page-container').getBoundingClientRect();
        const unscale = (val) => val / (window.pageScale || 1);
        const paperH_px = unscale(paperRect.height);
        const pxToMm = 1 / 3.7795;
        const paperW_mm = unscale(paperRect.width) * pxToMm;
        const paperH_mm = paperH_px * pxToMm;
        const dxf = new SimpleDxfWriter(paperW_mm, paperH_mm);
        
        const toDxfX = (px) => px * pxToMm;
        const toDxfY = (py) => (paperH_px - py) * pxToMm;
        dxf.addLine(0, 0, paperW_mm, 0, 7);
        dxf.addLine(paperW_mm, 0, paperW_mm, paperH_mm, 7);
        dxf.addLine(paperW_mm, paperH_mm, 0, paperH_mm, 7);
        dxf.addLine(0, paperH_mm, 0, 0, 7);

        const drawTextEl = (el, draggable) => {
    if (!el) return;
    const textContent = (el.innerHTML || el.textContent || '').trim();
    if (textContent === '') return;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    
    const style = window.getComputedStyle(el);
    let text = textContent.replace(/<br\\s*\\/?>/gi, String.fromCharCode(10)).replace(/<[^>]+>/g, "");
    text = text.replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
    const scale = draggable ? parseFloat(draggable.getAttribute('data-scale')) || 1 : 1;
    const fontSizePx = parseFloat(style.fontSize) || 12;
    const hMm = (fontSizePx * scale) * pxToMm;
    
    const align = style.textAlign;
    let px = unscale(rect.left - paperRect.left) + 2; 
    let alignCode = 'L';
    if (align === 'center') {
        px = unscale(rect.left + rect.width / 2 - paperRect.left);
        alignCode = 'C';
    } else if (align === 'right') {
        px = unscale(rect.right - paperRect.left) - 2;
        alignCode = 'R';
    }
    
    let rot = 0;
    if (el.style.transform && el.style.transform.includes('rotate')) {
        const m = el.style.transform.match(/rotate\\(([-.\\d]+)/);
        if (m) rot = parseFloat(m[1]) || 0;
    }
    
    const lines = text.split(String.fromCharCode(10));
    const lineHeightPx = fontSizePx * scale * 1.4; // 1.4 spacing for better readability
    const totalTextHeight = lines.length * lineHeightPx;
    const startY = unscale(rect.top - paperRect.top) + (unscale(rect.height) - totalTextHeight) / 2;
    
    lines.forEach((line, idx) => {
        let yOffset = startY + (idx * lineHeightPx) + (fontSizePx * scale * 0.9);
        dxf.addText(line.trim(), toDxfX(px), toDxfY(yOffset), hMm, 7, alignCode, rot);
    });

    if (el.tagName !== 'TD' && el.tagName !== 'TH' && parseFloat(style.borderTopWidth) > 0 && style.borderTopStyle !== 'none') {
        const cx1 = toDxfX(unscale(rect.left - paperRect.left));
        const cy1 = toDxfY(unscale(rect.top - paperRect.top));
        const cx2 = toDxfX(unscale(rect.right - paperRect.left));
        const cy2 = toDxfY(unscale(rect.bottom - paperRect.top));
        dxf.addLine(cx1, cy2, cx2, cy2, 7);
        dxf.addLine(cx2, cy1, cx2, cy2, 7);
        dxf.addLine(cx2, cy1, cx1, cy1, 7);
        dxf.addLine(cx1, cy2, cx1, cy1, 7);
    }
        };

        const svgs = document.querySelectorAll('svg');
        svgs.forEach(svg => {
            dxf.startGroup();
            const svgRect = svg.getBoundingClientRect();
            const svgLeft = unscale(svgRect.left - paperRect.left);
            const svgTop = unscale(svgRect.top - paperRect.top);
            const vBox = svg.viewBox.baseVal;
            if(!vBox) { dxf.endGroup(); return; }
            const scaleX = unscale(svgRect.width) / (vBox.width || 1);
            const scaleY = unscale(svgRect.height) / (vBox.height || 1);
            
            const tx = (x) => toDxfX(svgLeft + (x - vBox.x) * scaleX);
            const ty = (y) => toDxfY(svgTop + (y - vBox.y) * scaleY);
            
            svg.querySelectorAll('line').forEach(line => {
                const x1 = parseFloat(line.getAttribute('x1')||0), y1 = parseFloat(line.getAttribute('y1')||0);
                const x2 = parseFloat(line.getAttribute('x2')||0), y2 = parseFloat(line.getAttribute('y2')||0);
                dxf.addLine(tx(x1), ty(y1), tx(x2), ty(y2), 7);
            });
            svg.querySelectorAll('circle').forEach(c => {
                const cx = parseFloat(c.getAttribute('cx')||0), cy = parseFloat(c.getAttribute('cy')||0), r = parseFloat(c.getAttribute('r')||0);
                dxf.addCircle(tx(cx), ty(cy), r * scaleX * pxToMm, 7);
            });
            svg.querySelectorAll('polygon').forEach(poly => {
                const pts = poly.getAttribute('points').trim().split(/s+/).map(p => {
                    const [x,y] = p.split(',').map(Number);
                    return {x: tx(x), y: ty(y)};
                });
                dxf.addPolyline(pts, true, 7);
            });
            svg.querySelectorAll('path').forEach(path => {
                const d = path.getAttribute('d');
                if(!d) return;
                const cmds = d.match(/[A-Za-z][^A-Za-z]*/g);
                if(!cmds) return;
                let curX = 0, curY = 0;
                let startX = 0, startY = 0;
                cmds.forEach(cmd => {
                    const type = cmd[0];
                    const args = cmd.slice(1).trim().split(/[s,]+/).map(Number);
                    if(type === 'M' || type === 'm') {
                        if(type==='M') { curX = args[0]; curY = args[1]; }
                        else { curX += args[0]; curY += args[1]; }
                        startX = curX; startY = curY;
                    } else if(type === 'L' || type === 'l') {
                        let nx, ny;
                        if(type==='L') { nx = args[0]; ny = args[1]; }
                        else { nx = curX + args[0]; ny = curY + args[1]; }
                        dxf.addLine(tx(curX), ty(curY), tx(nx), ty(ny), 7);
                        curX = nx; curY = ny;
                    } else if(type === 'Z' || type === 'z') {
                        dxf.addLine(tx(curX), ty(curY), tx(startX), ty(startY), 7);
                        curX = startX; curY = startY;
                    }
                });
            });
            svg.querySelectorAll('text').forEach(t => {
                const x = parseFloat(t.getAttribute('x')||0), y = parseFloat(t.getAttribute('y')||0);
                const fs = parseFloat(t.getAttribute('font-size')||12);
                dxf.addText(t.textContent, tx(x), ty(y), (fs * scaleY) * pxToMm, 7, 'C');
            });
            dxf.endGroup();
        });

        document.querySelectorAll('.sub-draggable').forEach(sub => {
            dxf.startGroup();
            drawTextEl(sub, null);
            dxf.endGroup();
        });

        const draggables = document.querySelectorAll('.draggable');
        draggables.forEach(draggable => {
            dxf.startGroup();
            
            draggable.querySelectorAll('table').forEach(table => {
                const tableRect = table.getBoundingClientRect();
                const x1 = toDxfX(unscale(tableRect.left - paperRect.left));
                const y1 = toDxfY(unscale(tableRect.top - paperRect.top));
                const x2 = toDxfX(unscale(tableRect.right - paperRect.left));
                const y2 = toDxfY(unscale(tableRect.bottom - paperRect.top));
                dxf.addLine(x1, y1, x2, y1, 7);
                dxf.addLine(x2, y1, x2, y2, 7);
                dxf.addLine(x2, y2, x1, y2, 7);
                dxf.addLine(x1, y2, x1, y1, 7);

                const cells = table.querySelectorAll('th, td');
                cells.forEach(cell => {
                    const r = cell.getBoundingClientRect();
                    const cx1 = toDxfX(unscale(r.left - paperRect.left));
                    const cy1 = toDxfY(unscale(r.top - paperRect.top));
                    const cx2 = toDxfX(unscale(r.right - paperRect.left));
                    const cy2 = toDxfY(unscale(r.bottom - paperRect.top));
                    dxf.addLine(cx1, cy2, cx2, cy2, 7);
                    dxf.addLine(cx2, cy1, cx2, cy2, 7);
                });
            });

            const textElements = Array.from(draggable.querySelectorAll('table td, table th'));
            const titleDiv = draggable.querySelector('div:first-child');
            if (titleDiv && titleDiv.textContent.includes('表') && !titleDiv.querySelector('table')) {
                textElements.push(titleDiv);
            }
            if (draggable.classList.contains('closure-info')) {
                textElements.push(draggable);
            }
            textElements.forEach(el => drawTextEl(el, draggable));
            
            dxf.endGroup();
        });

        const dxfStr = dxf.toString();
        let blob;
        if (window.Encoding) {
    const sjisArray = Encoding.convert(Encoding.stringToCode(dxfStr), { to: 'SJIS', from: 'UNICODE' });
    blob = new Blob([new Uint8Array(sjisArray)], { type: 'application/dxf' });
        } else {
    blob = new Blob([dxfStr], { type: 'application/dxf;charset=utf-8;' });
        }
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = '${$}'.replace('.html', '.dxf');
        a.click();
        URL.revokeObjectURL(url);
    });
    } catch(e) { alert('Try Error: ' + e.message); }
}, 100);
<\/script></body></html>`,G=new Blob([B],{type:"text/html"}),z=URL.createObjectURL(G);n?n.location.replace(z):window.open(z,"_blank"),this.els.chkMagDeclination.checked=l,this.updateDrawing(!1)},_buildExportHTMLResultsTable(e){const t=this.state.tableData.filter(l=>l[0]&&l[1]);let i="",s="",a=0,n=0;return t.forEach((l,o)=>{const r=this.state.points.find(c=>c.fromName===l[0]&&c.toName===l[1]),d=r?r.input.hd:0;n+=d,a+=parseFloat(l[4]||0),s+=`<tr><td style="text-align:center;">${l[0]} - ${l[1]}</td><td style="text-align:right;">${l[2]}</td><td style="text-align:right;">${l[3]}</td><td style="text-align:right;">${parseFloat(l[4]||0).toFixed(2)}</td><td style="text-align:right;">${d?d.toFixed(2):""}</td></tr>`,(e>0&&(o+1)%e===0||o===t.length-1)&&(o===t.length-1&&(s+=`<tr style="border-top:2px solid #000;"><td colspan="3" style="text-align:center;">合 計</td><td style="text-align:right;">${a.toFixed(2)}</td><td style="text-align:right;">${n.toFixed(2)}</td></tr>`),i+=`<table style="width:85mm; font-size:8pt; border-collapse:collapse; margin-left:10px;"><thead><tr><th>測 点</th><th>方位角</th><th>高低角</th><th>斜距離</th><th>水平距離</th></tr></thead><tbody>${s}</tbody></table>`,s="")}),`<div class="result-table-wrapper draggable"><div style="font-weight:bold;text-align:center;border-bottom:1px solid #000;margin-bottom:5px;">成 果 表</div><div style="display:flex; justify-content:flex-end;">${i}</div></div>`},_buildExportHTMLAttrTable(e,t,i,s){return this.state.attributes.map(n=>`<tr><th style="text-align:left;white-space:nowrap;">${n.name}</th><td>${n.value||""}</td></tr>`).join("")+`<tr><th style="text-align:left;">縮尺</th><td style="font-weight:bold;">${e}</td></tr><tr><th style="text-align:left;">基準点</th><td style="font-size:8pt;">Lat ${t}<br>Lon ${i}<br>(偏角: ${s}度)</td></tr>`},_buildExportHTMLAreaTable(){if(this.state.detectedAreas.length===0)return"";let e=0,t="";return this.state.detectedAreas.forEach((i,s)=>{const a=C.round4(i.netArea/1e4);if(e+=parseFloat(a),i.isDonut){const n=C.round4(i.area/1e4);t+=`<tr><td style="border-bottom-style: dashed; border-bottom-color: #999;">区画 ${s+1} (全体)</td><td style="text-align:right; border-bottom-style: dashed; border-bottom-color: #999;">${n} ha</td></tr>`,i.holes.forEach(l=>{const o=C.round4(l.area/1e4);t+=`<tr><td style="border-bottom-style: dashed; border-bottom-color: #999; color: #A13D44; padding-left: 12px;">－ 除地 ${l.globalIndex||""}</td><td style="text-align:right; border-bottom-style: dashed; border-bottom-color: #999; color: #A13D44;">${o} ha</td></tr>`}),t+=`<tr><td>区画 ${s+1} 小計</td><td style="text-align:right; font-weight: bold;">${a} ha</td></tr>`}else t+=`<tr><td>区画 ${s+1}</td><td style="text-align:right;">${a} ha</td></tr>`}),`<div class="area-table-wrapper draggable"><div style="font-weight:bold;text-align:center;border-bottom:1px solid #000;margin-bottom:5px;">面 積 表</div><table style="width:100%;font-size:9pt;">${t}<tr style="border-top:2px solid #000;font-weight:bold;"><td>合 計</td><td style="text-align:right;">${C.round4(e)} ha</td></tr></table></div>`},_calcExportScaleOptions(e,t){let i=1,s=0,a=0,n="";if(this.state.nodes.size>=2){const l=this.state.bounds.maxX-this.state.bounds.minX,o=this.state.bounds.maxY-this.state.bounds.minY;if(s=(this.state.bounds.minX+this.state.bounds.maxX)/2,a=(this.state.bounds.minY+this.state.bounds.maxY)/2,t==="auto"){const d=1e3/Math.max(.1,Math.min(Math.max(10,e.expW-e.paddingX*2)/(l||1),Math.max(10,e.expH-e.paddingY*2)/(o||1)))*(e.expW/e.w);let c=100,h=100;for(;h<d;){for(let p of[1,1.5,2,2.5,3,4,5,6,8])if(h=p*c,h>=d)break;h<d&&(c*=10)}i=1e3/h*(e.expW/e.w),n=`1 / ${h.toLocaleString()}`}else{const r=parseFloat(t);!isNaN(r)&&r>0&&(i=1e3/r*(e.expW/e.w),n=`1 / ${r.toLocaleString()}`)}}return{expScale:i,expOffsetX:e.expW/2-s*i,expOffsetY:e.expH/2+a*i+(t==="auto"?e.shiftY:0),displayScaleText:n}},_generateExportSVGDataURL(e,t,i,s){var w;const a=Math.min(e.expW,e.expH)/800;let n=1/0,l=1/0,o=-1/0,r=-1/0;const d=(u,E)=>{u<n&&(n=u),u>o&&(o=u),E<l&&(l=E),E>r&&(r=E)};let c=this.state.detectedAreas.map(u=>{let E="";return u.path.forEach((b,T)=>{const S=this.state.nodes.get(b),A=i+S.x*t,D=s-S.y*t;d(A,D),E+=(T===0?"M":"L")+`${A} ${D} `}),E+="Z ",u.isDonut&&u.holes.forEach(b=>{b.path.forEach((T,S)=>{const A=this.state.nodes.get(T),D=i+A.x*t,k=s-A.y*t;d(D,k),E+=(S===0?"M":"L")+`${D} ${k} `}),E+="Z "}),`<path d="${E}" fill="${this.CONFIG.colors.areaFill}" fill-rule="evenodd" />`}).join("");this.state.points.forEach(u=>{const E=i+u.fromX*t,b=s-u.fromY*t,T=i+u.toX*t,S=s-u.toY*t;d(E,b),d(T,S),u.isDraw&&(c+=`<line x1="${E}" y1="${b}" x2="${T}" y2="${S}" stroke="#ffffff" stroke-width="${(u.type==="branch"?3.5:4)*a}" stroke-linecap="round" />`)}),this.state.points.forEach(u=>{const E=i+u.fromX*t,b=s-u.fromY*t,T=i+u.toX*t,S=s-u.toY*t;c+=`<line x1="${E}" y1="${b}" x2="${T}" y2="${S}" stroke="${u.isDraw?u.type==="branch"?this.CONFIG.colors.lineBranch:this.CONFIG.colors.lineMain:"#9ca3af"}" stroke-width="${(u.isDraw?u.type==="branch"?1.5:2:1.5)*a}" ${u.isDraw?"":`stroke-dasharray="${4*a} ${4*a}"`} stroke-linecap="round" />`});const h=(u,E,b)=>{d(u,E),c+=`<circle cx="${u}" cy="${E}" r="${4*a}" fill="${b?this.CONFIG.colors.startNode:this.CONFIG.colors.normalNode}" stroke="#ffffff" stroke-width="${1.5*a}" />`},p=this._getFirstPointName();h(i,s,!0),this.state.nodes.forEach((u,E)=>{E===p&&Math.abs(u.x)<.001&&Math.abs(u.y)<.001||h(i+u.x*t,s-u.y*t,!1)}),(((w=this.state.annotations)==null?void 0:w.lines)||[]).forEach(u=>{let E="",b=1/0,T=-1/0,S=1/0,A=-1/0;u.points.forEach((k,N)=>{const F=i+k.x*t,_=s-k.y*t;d(F,_),F<b&&(b=F),F>T&&(T=F),_<S&&(S=_),_>A&&(A=_),E+=(N===0?"M":"L")+`${F} ${_} `});let D="";u.lineStyle==="dashed"?D=`stroke-dasharray="${8*a},${6*a}"`:u.lineStyle==="dotted"&&(D=`stroke-dasharray="${2*a},${4*a}"`),c+=`<path d="${E}" fill="none" stroke="${u.color||"#059669"}" stroke-width="${(u.lineWidth||2)*a}" stroke-linecap="round" ${D} transform="rotate(${-(u.rotation||0)*180/Math.PI} ${(b+T)/2} ${(S+A)/2})" />`}),n===1/0&&(n=0,l=0,o=e.expW,r=e.expH);const g=20,f=Math.max(0,n-g),M=Math.max(0,l-g),v=o-n+g*2,y=r-l+g*2,x=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${f} ${M} ${v} ${y}" width="100%" height="100%">${c}</svg>`;return{dataURL:"data:image/svg+xml;base64,"+btoa(unescape(encodeURIComponent(x))),svgString:x,x:f,y:M,w:v,h:y,pxPerMm:e.expW/e.w}},_generateDraggableLabelsHTML(e,t,i,s,a,n){var g;let l="";const o=a/s,r=n/s,d=this._getFirstPointName();let c=1,h=parseInt(this.els.selNodeLabelInterval.value,10);const p=(f,M,v,y)=>{if(!y)return;const x=(f+8)/s-o,w=(M-8)/s-r;l+=`<div class="sub-draggable no-bg" style="position: absolute; left:${x}mm; top:${w}mm; transform:translate(0,-100%); font-family:sans-serif; font-size:12px; font-weight:bold; color:${this.CONFIG.colors.text}; z-index: 2; cursor: move; white-space: nowrap;">${v}</div>`};return p(t,i,d,!0),this.state.nodes.forEach((f,M)=>{M===d&&Math.abs(f.x)<.001&&Math.abs(f.y)<.001||(p(t+f.x*e,i-f.y*e,M,h===1||h>1&&c%h===0),c++)}),this.state.detectedAreas.forEach((f,M)=>{const v=`区画 ${M+1}`,y=`${C.round4(f.netArea/1e4)}ha`,x=(t+f.center.x*e)/s-o,w=(i-f.center.y*e)/s-r;l+=`<div class="sub-draggable" style="position: absolute; left:${x}mm; top:${w}mm; transform:translate(-50%, -50%); background:${this.CONFIG.colors.labelBg}; border:1px solid #217270; padding:2px 6px; text-align:center; font-family:sans-serif; font-size:12px; font-weight:bold; color:#217270; border-radius:3px; z-index: 2; cursor: move; white-space: nowrap;">${v}<br><span style="font-weight:normal; font-size:11px;">${y}</span></div>`,f.isDonut&&f.holes.forEach(u=>{const E=`除地 ${u.globalIndex}`,b=`${C.round4(u.area/1e4)}ha`,T=(t+u.center.x*e)/s-o,S=(i-u.center.y*e)/s-r;l+=`<div class="sub-draggable" style="position: absolute; left:${T}mm; top:${S}mm; transform:translate(-50%, -50%); background:${this.CONFIG.colors.labelBg}; border:1px solid #A13D44; padding:2px 6px; text-align:center; font-family:sans-serif; font-size:11px; font-weight:bold; color:#A13D44; border-radius:3px; z-index: 2; cursor: move; white-space: nowrap;">${E}<br><span style="font-weight:normal; font-size:10px;">${b}</span></div>`})}),(((g=this.state.annotations)==null?void 0:g.texts)||[]).forEach((f,M)=>{const v=f.fontSize||14,y=C.estimateTextWidth(f.text,v),x=t+f.x*e,w=i-f.y*e,u=(x-y/2)/s-o,E=(w-v/2)/s-r,b=(f.rotation||0)*180/Math.PI;l+=`<div class="sub-draggable no-bg" style="position: absolute; left:${u}mm; top:${E}mm; transform:rotate(${b}deg); transform-origin: center center; font-family:sans-serif; font-size:${v}px; font-weight:bold; color:${f.color||"#059669"}; text-shadow: 1px 1px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff; z-index: 2; cursor: move; white-space: nowrap;">${f.text}</div>`}),l},_generateCompassSVGDataURL(e,t){const i=Math.min(e.expW,e.expH)/800,s=35*i,a=s*4,n=a/2,l=a/2;let o=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${a} ${a}" width="100%" height="100%"><line x1="${n}" y1="${l-s}" x2="${n}" y2="${l+s}" stroke="#9ca3af" stroke-width="${1.5*i}" /><line x1="${n-s}" y1="${l}" x2="${n+s}" y2="${l}" stroke="#9ca3af" stroke-width="${1.5*i}" /><polygon points="${n},${l-s-6*i} ${n+5*i},${l-s+12*i} ${n-5*i},${l-s+12*i}" fill="${this.CONFIG.colors.compassText}" /><text x="${n}" y="${l-s-13*i}" font-family="sans-serif" font-size="${Math.round(16*i)}px" font-weight="bold" fill="${this.CONFIG.colors.compassText}" text-anchor="middle">N</text>`;if(this.els.chkMagDeclination.checked&&parseFloat(t)!==0){const d=-parseFloat(t)*Math.PI/180,c=Math.cos(d),h=Math.sin(d),p=(S,A)=>n+S*c-A*h,g=(S,A)=>l+S*h+A*c,f=p(0,-s),M=g(0,-s),v=p(0,-s-2*i),y=g(0,-s-2*i),x=p(4*i,-s+8*i),w=g(4*i,-s+8*i),u=p(-4*i,-s+8*i),E=g(-4*i,-s+8*i),b=p(0,-s-6*i),T=g(0,-s-6*i);o+=`<line x1="${n}" y1="${l}" x2="${f}" y2="${M}" stroke="${this.CONFIG.colors.compassArrow}" stroke-width="${2.5*i}" /><polygon points="${v},${y} ${x},${w} ${u},${E}" fill="${this.CONFIG.colors.compassArrow}" /><text x="${b}" y="${T}" font-family="sans-serif" font-size="${Math.round(14*i)}px" fill="${this.CONFIG.colors.compassArrow}" text-anchor="middle">MN</text>`}const r=o+"</svg>";return{dataURL:"data:image/svg+xml;base64,"+btoa(unescape(encodeURIComponent(r))),svgString:r}},exportJSON(e){const t={tableData:this.state.tableData,attributes:this.state.attributes,annotations:this.state.annotations,settings:{lat:this.els.inputLat.value,lon:this.els.inputLon.value,declination:this.els.inputDeclination.value,magDeclinationChecked:this.els.chkMagDeclination.checked,compassAdjustmentChecked:this.els.chkCompassAdjustment.checked,convertEPtoBPChecked:this.els.chkConvertEPtoBP?this.els.chkConvertEPtoBP.checked:!0,nodeLabelInterval:this.els.selNodeLabelInterval.value},previewImage:this.generatePreviewImage()};e||(e="令和8年度_育成複層林整備_山田太郎_No.10"),e.endsWith(".json")||(e+=".json"),this._downloadFile("data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(t)),e),this.showToast("JSONファイルとして保存しました。")},generatePreviewImage(){const e=document.createElement("canvas"),t=e.getContext("2d");if(e.width=600,e.height=600,t.fillStyle="#ffffff",t.fillRect(0,0,600,600),this.state.points.length===0)return e.toDataURL("image/jpeg",.8);const i=this.state.bounds,s=i.maxX-i.minX,a=i.maxY-i.minY,n=s===0&&a===0?10:Math.min(500/(s||1),500/(a||1)),l=300-(i.minX+i.maxX)/2*n,o=300+(i.minY+i.maxY)/2*n;return this._drawAreas(t,l,o,n,this.state.detectedAreas,this.state.nodes),this._drawLines(t,l,o,n,this.state.points),this._drawNodes(t,l,o,n,this.state.nodes,!1),this._drawAnnotations(t,l,o,n,1.5),t.save(),t.translate(40,40),t.beginPath(),t.moveTo(0,-25),t.lineTo(0,25),t.moveTo(-25,0),t.lineTo(25,0),t.strokeStyle="#9ca3af",t.stroke(),t.beginPath(),t.moveTo(0,-30),t.lineTo(4,-17),t.lineTo(-4,-17),t.fillStyle=this.CONFIG.colors.compassText,t.fill(),this.els.chkMagDeclination.checked&&parseFloat(this.els.inputDeclination.value)&&(t.rotate(C.deg2rad(-parseFloat(this.els.inputDeclination.value))),t.beginPath(),t.moveTo(0,0),t.lineTo(0,-25),t.strokeStyle=this.CONFIG.colors.compassArrow,t.lineWidth=2,t.stroke(),t.beginPath(),t.moveTo(0,-27),t.lineTo(3,-20),t.lineTo(-3,-20),t.fillStyle=this.CONFIG.colors.compassArrow,t.fill()),t.restore(),e.toDataURL("image/jpeg",.8)},_downloadFile(e,t){const i=document.createElement("a");i.href=e,i.download=t,document.body.appendChild(i),i.click(),i.remove()},importJSON(e){const t=e.target.files;!t||t.length===0||this.processJsonFiles(Array.from(t).filter(i=>i.name.toLowerCase().endsWith(".json")))},renderImportFileList(){this.els.importFileList.innerHTML="",this.importFilesList.forEach((e,t)=>{const i=document.createElement("li");i.textContent=e.name,i.title=e.name,this.selectedImportIndex===t&&i.classList.add("selected"),i.onclick=()=>this.selectImportFile(t),i.ondblclick=()=>{this.selectImportFile(t),this.els.btnApplyImport.click()},this.els.importFileList.appendChild(i)})},selectImportFile(e){this.selectedImportIndex=e,this.renderImportFileList();const t=this.importFilesList[e];if(!t)return;t.data.previewImage?(this.els.importPreviewImage.src=t.data.previewImage,this.els.importPreviewImage.style.display="inline-block",this.els.importNoPreviewText.style.display="none"):(this.els.importPreviewImage.style.display="none",this.els.importNoPreviewText.style.display="inline-block",this.els.importNoPreviewText.textContent="プレビュー画像なし");let i=t.data.attributes?t.data.attributes.filter(s=>s.value).map(s=>s.value).join(" / "):"";this.els.importPreviewInfo.innerHTML=`<strong>ファイル名:</strong> ${t.name}<br>`+(t.data.tableData?`<strong>データ数:</strong> ${t.data.tableData.length}行<br>`:"")+(i?`<strong>属性情報:</strong> <span style="color:#4b5563;">${i}</span>`:""),this.els.btnApplyImport.disabled=!1},applyImportData(e){Array.isArray(e.tableData)&&(this.state.tableData=e.tableData),Array.isArray(e.attributes)&&(this.state.attributes=e.attributes),this.state.annotations=e.annotations?JSON.parse(JSON.stringify(e.annotations)):{texts:[],lines:[]},e.settings&&(["lat","lon","declination"].forEach(t=>{e.settings[t]!==void 0&&(this.els["input"+t.charAt(0).toUpperCase()+t.slice(1)].value=e.settings[t])}),["magDeclinationChecked","compassAdjustmentChecked"].forEach(t=>{e.settings[t]!==void 0&&(this.els["chk"+t.charAt(0).toUpperCase()+t.slice(1).replace("Checked","")].checked=e.settings[t])}),e.settings.convertEPtoBPChecked!==void 0&&this.els.chkConvertEPtoBP&&(this.els.chkConvertEPtoBP.checked=e.settings.convertEPtoBPChecked),e.settings.nodeLabelInterval!==void 0&&(this.els.selNodeLabelInterval.value=e.settings.nodeLabelInterval)),this.renderAttrTable(),this.renderTable(),setTimeout(()=>{this.resizeCanvas(),this.updateDrawing(!0),this.isMapMode&&this.map&&(this.map.invalidateSize(),this.updateMapDrawing(!0))},100),this.pushState(),this.showToast("データを読み込みました。")}};class X{constructor(){Y(this,"handleWheel",t=>{if(this.isMapMode)return;t.preventDefault();const i=this.state.view.scale;this.state.view.scale*=t.deltaY<0?this.CONFIG.canvas.zoomFactor:1/this.CONFIG.canvas.zoomFactor;const s=this.state.view.scale/i;this.state.view.offsetX=t.offsetX-(t.offsetX-this.state.view.offsetX)*s,this.state.view.offsetY=t.offsetY-(t.offsetY-this.state.view.offsetY)*s,this.draw()});Y(this,"handleMouseDown",t=>{if(this.isMapMode)return;t.preventDefault();const i=this.els.canvas.getBoundingClientRect(),s=t.clientX-i.left,a=t.clientY-i.top;if(t.button===2){this.state.view.isRightDragging=!0,this.state.view.rightDragMoved=!1,this.state.view.dragStartX=this.state.view.lastMouseX=t.clientX,this.state.view.dragStartY=this.state.view.lastMouseY=t.clientY,document.body.classList.add("right-dragging");return}if(t.button===0){const n=this._findAnnotationAtCanvas(s,a);if(n){if(n.type==="handle"){this.state.view.isRotating=!0,this.state.view.rotatingTarget=n.target,document.body.classList.add("left-dragging");return}else if(this.state.interactionMode==="select"){this._selectAnnotation(n),this.state.view.isMovingAnnotation=!0,this.state.view.movingTarget=n,this.state.view.dragMoved=!1,this.state.view.dragStartX=this.state.view.lastMouseX=t.clientX,this.state.view.dragStartY=this.state.view.lastMouseY=t.clientY,this.state.view.dragStartInternalX=(s-this.state.view.offsetX)/this.state.view.scale,this.state.view.dragStartInternalY=(this.state.view.offsetY-a)/this.state.view.scale,this.state.view.movingInitialState=JSON.parse(JSON.stringify(n.ref)),document.body.classList.add("left-dragging");return}}this.state.view.isDragging=!0,this.state.view.dragMoved=!1,this.state.view.dragStartX=this.state.view.lastMouseX=t.clientX,this.state.view.dragStartY=this.state.view.lastMouseY=t.clientY}});Y(this,"handleMouseUp",t=>{if(t.button===2&&(this.state.view.isRightDragging=!1,this.state.mapView&&(this.state.mapView.isRightDragging=!1),document.body.classList.remove("right-dragging")),t.button===0){if(this.state.view.isRotating){this.state.view.isRotating=!1,this.state.view.rotatingTarget=null,document.body.classList.remove("left-dragging"),this.saveToLocalStorage(),this.pushState(),this.isMapMode&&this.map&&(this.map.dragging.enable(),this.updateMapDrawing(!1));return}if(this.state.view.isMovingAnnotation){this.state.view.isMovingAnnotation=!1,this.state.view.movingTarget=null,this.state.view.movingLayer=null,this.state.view.movingExtras=null,document.body.classList.remove("left-dragging"),this.isMapMode&&this.map&&this.map.dragging.enable(),this.state.view.dragMoved&&(this.saveToLocalStorage(),this.pushState(),this.isMapMode&&this.updateMapDrawing(!1));return}if(this.state.view.isDragging&&(this.state.view.isDragging=!1,document.body.classList.remove("left-dragging"),!this.state.view.dragMoved)){const i=this.els.canvas.getBoundingClientRect(),s=t.clientX-i.left,a=t.clientY-i.top,n=(s-this.state.view.offsetX)/this.state.view.scale,l=(this.state.view.offsetY-a)/this.state.view.scale;if(this.state.interactionMode==="text")this._showTextPrompt(n,l);else if(this.state.interactionMode==="line")this.state.currentLine.push({x:n,y:l}),this.state.view.currentMouseInternalX=n,this.state.view.currentMouseInternalY=l,this._redrawAll();else if(this.state.interactionMode==="select"||this.state.interactionMode==="erase"){const o=this._findAnnotationAtCanvas(s,a);o&&o.type!=="handle"?this.state.interactionMode==="select"?this._selectAnnotation(o):(o.type==="text"?this.state.annotations.texts.splice(o.index,1):o.type==="line"&&this.state.annotations.lines.splice(o.index,1),this.saveToLocalStorage(),this.pushState(),this._redrawAll()):this.state.interactionMode==="select"&&this._clearSelection()}}}});Y(this,"handleMouseMove",t=>{if(this.isMapMode&&this.state.mapView.isRightDragging){const l=t.clientX-this.state.mapView.lastMouseX,o=t.clientY-this.state.mapView.lastMouseY;!this.state.mapView.rightDragMoved&&(Math.abs(t.clientX-this.state.mapView.dragStartX)>5||Math.abs(t.clientY-this.state.mapView.dragStartY)>5)&&(this.state.mapView.rightDragMoved=!0),this.state.mapView.rightDragMoved&&this.map.panBy([-l,-o],{animate:!1}),this.state.mapView.lastMouseX=t.clientX,this.state.mapView.lastMouseY=t.clientY;return}let i,s,a,n;if(this.isMapMode){const l=this.els.mapContainer.getBoundingClientRect();a=t.clientX-l.left,n=t.clientY-l.top;const o=L.point(a,n),r=this.map.containerPointToLatLng(o),d=this.getInternalCoordsFromLatLng(r.lat,r.lng);i=d.x,s=d.y}else{const l=this.els.canvas.getBoundingClientRect();a=t.clientX-l.left,n=t.clientY-l.top,i=(a-this.state.view.offsetX)/this.state.view.scale,s=(this.state.view.offsetY-n)/this.state.view.scale}if(this.state.view.isRotating&&this.state.view.rotatingTarget){const l=this.state.view.rotatingTarget.ref;let o,r;if(this.isMapMode){let c,h;if(this.state.view.rotatingTarget.type==="text")c=l.x,h=l.y;else{let M=1/0,v=-1/0,y=1/0,x=-1/0;l.points.forEach(w=>{w.x<M&&(M=w.x),w.x>v&&(v=w.x),w.y<y&&(y=w.y),w.y>x&&(x=w.y)}),c=(M+v)/2,h=(y+x)/2}const p=this._getRotLatLng({x:c,y:h},c,h,0),g=this.map.latLngToContainerPoint([p[0],p[1]]),f=this.els.mapContainer.getBoundingClientRect();o=g.x+f.left,r=g.y+f.top}else{let c,h;if(this.state.view.rotatingTarget.type==="text")c=l.x,h=l.y;else{let g=1/0,f=-1/0,M=1/0,v=-1/0;l.points.forEach(y=>{y.x<g&&(g=y.x),y.x>f&&(f=y.x),y.y<M&&(M=y.y),y.y>v&&(v=y.y)}),c=(g+f)/2,h=(M+v)/2}const p=this.els.canvas.getBoundingClientRect();o=p.left+this.state.view.offsetX+c*this.state.view.scale,r=p.top+this.state.view.offsetY-h*this.state.view.scale}const d=this.els.chkMagDeclination.checked&&parseFloat(this.els.inputDeclination.value)||0;l.rotation=Math.atan2(t.clientY-r,t.clientX-o)+Math.PI/2,l.baseRotation=l.rotation+C.deg2rad(d),this._updateLiveAnnotationDrawing(),this.state.view.lastMouseX=t.clientX,this.state.view.lastMouseY=t.clientY;return}if(this.state.view.isMovingAnnotation&&this.state.view.movingTarget&&this.state.view.movingInitialState){const l=t.clientX-this.state.view.dragStartX,o=t.clientY-this.state.view.dragStartY;if(!this.state.view.dragMoved&&(Math.abs(l)>2||Math.abs(o)>2)&&(this.state.view.dragMoved=!0,document.body.classList.add("left-dragging")),this.state.view.dragMoved){const r=i-this.state.view.dragStartInternalX,d=s-this.state.view.dragStartInternalY,c=this.els.chkMagDeclination.checked&&parseFloat(this.els.inputDeclination.value)||0,h=C.deg2rad(c),p=Math.cos(-h),g=Math.sin(-h),f=r*p-d*g,M=r*g+d*p,v=this.state.view.movingTarget.ref,y=this.state.view.movingInitialState;this.state.view.movingTarget.type==="text"?(v.x=y.x+r,v.y=y.y+d,v.baseX=y.baseX+f,v.baseY=y.baseY+M):this.state.view.movingTarget.type==="line"&&v.points.forEach((x,w)=>{x.x=y.points[w].x+r,x.y=y.points[w].y+d,x.baseX=y.points[w].baseX+f,x.baseY=y.points[w].baseY+M}),this._updateLiveAnnotationDrawing()}this.state.view.lastMouseX=t.clientX,this.state.view.lastMouseY=t.clientY;return}if(this.state.view.isRightDragging||this.state.view.isDragging){const l=this.state.view.isRightDragging,o=t.clientX-this.state.view.lastMouseX,r=t.clientY-this.state.view.lastMouseY,d=l?"rightDragMoved":"dragMoved";!this.state.view[d]&&(Math.abs(t.clientX-this.state.view.dragStartX)>5||Math.abs(t.clientY-this.state.view.dragStartY)>5)&&(this.state.view[d]=!0,l||document.body.classList.add("left-dragging")),this.state.view[d]&&(this.state.view.offsetX+=o,this.state.view.offsetY+=r,this.draw()),this.state.view.lastMouseX=t.clientX,this.state.view.lastMouseY=t.clientY}if(this.state.interactionMode==="line"&&(this.state.view.currentMouseInternalX=i,this.state.view.currentMouseInternalY=s,this.state.currentLine.length>0&&(this.isMapMode?this._updateMapTempLine():this.draw())),!this.isMapMode&&["pan","erase","select"].includes(this.state.interactionMode)){const{offsetX:l,offsetY:o,scale:r}=this.state.view,d=parseFloat(this.els.inputLat.value)||0,c=parseFloat(this.els.inputLon.value)||0,h=I.LAT_DEG_PER_METER/Math.cos(C.deg2rad(d));if(["select","erase"].includes(this.state.interactionMode)){const g=this._findAnnotationAtCanvas(a,n);let f=!1;const M=this.state.hoveredAnnotation;g?((!M||M.type!==g.type||g.type!=="handle"&&M.index!==g.index)&&(this.state.hoveredAnnotation=g,f=!0),g.type==="handle"?(document.body.classList.add("hovering-handle"),document.body.classList.remove("hovering-annotation")):(document.body.classList.add("hovering-annotation"),document.body.classList.remove("hovering-handle"))):(M&&(this.state.hoveredAnnotation=null,f=!0),document.body.classList.remove("hovering-annotation","hovering-handle")),f&&this.draw()}let p=!1;for(let[g,f]of this.state.nodes){const M=l+f.x*r,v=o-f.y*r;if(Math.sqrt(Math.pow(a-M,2)+Math.pow(n-v,2))<this.CONFIG.canvas.hitRadius){p=!0,this.els.tooltip.style.opacity=1,this.els.tooltip.style.left=`${t.clientX+15}px`,this.els.tooltip.style.top=`${t.clientY+15}px`,this.els.tooltip.innerHTML=`<strong>${g}</strong><br>X: ${f.x.toFixed(2)}m<br>Y: ${f.y.toFixed(2)}m<hr style="margin:4px 0;border-color:rgba(255,255,255,0.2);"><span style="color:#a7f3d0">Lat: ${(d+f.y*I.LAT_DEG_PER_METER).toFixed(6)}<br>Lon: ${(c+f.x*h).toFixed(6)}</span>`;break}}p||(this.els.tooltip.style.opacity=0)}else this.els.tooltip.style.opacity=0});this.initConfig(),this.initDOM(),this.initState(),this.initEvents(),this.resizeCanvas(),this.calculateMagDeclination(!1),this.loadInitialApp()}initConfig(){this.CONFIG={colors:{lineMain:"#2E5C8A",lineBranch:"#B36A22",startNode:"#A13D44",normalNode:"#217270",text:"#1f2937",gridMain:"#cbd5e1",gridSub:"#e2e8f0",compassText:"#1f2937",compassArrow:"#2E5C8A",areaFill:"rgba(33, 114, 112, 0.25)",labelBg:"rgba(255, 255, 255, 0.7)"},canvas:{padding:50,nodeRadius:4,hitRadius:8,zoomFactor:1.1,gridBaseSize:50},initialData:[["BP","1","33","-38","45.3",!1],["1","2","122","35","50.7",!1],["2","3","129","38","33.5",!1],["3","4","130","28","13.3",!1],["4","5","156","25","34.5",!1],["5","6","163","28","48.3",!1],["6","7","147","27","31.7",!1],["7","8","174","16","12",!1],["8","9","166","12","24",!1],["9","10","154","30","27.8",!1],["10","11","181","32","16.7",!1],["11","12","247","-7","14.5",!1],["12","13","236","-4","21.3",!1],["13","14","279","-27","18.6",!1],["14","15","274","-6","27.3",!1],["15","16","263","-1","34",!1],["16","17","252","10","22.2",!1],["17","18","261","14","24.2",!1],["18","19","318","-14","29",!1],["19","20","317","-2","22.4",!1],["20","21","61","-38","12.8",!1],["21","22","49","-43","16",!1],["22","23","61","-38","15.7",!1],["23","24","56","-43","19.2",!1],["24","25","21","-48","15.8",!1],["25","26","34","-45","18.3",!1],["26","27","28","-43","27.3",!1],["27","28","9","-28","20.7",!1],["28","29","348","-25","25.9",!1],["29","30","351","-20","26.6",!1],["30","31","357","-11","13.3",!1],["31","32","327","9","15.5",!1],["32","33","10","-27","9.5",!1],["33","BP","328","-8","6.7",!1],["27","50","65","10","52",!1],["50","6","90","8","48",!1],["2","60","52","5","30",!0],["60","61","45","1","28",!0],["61","62","20","2","30",!1],["62","63","280","0","40",!1],["63","64","180","5","30",!1],["64","61","95","-5","30",!1],["31","80","275","5","25",!1],["80","81","270","5","43",!1],["50","90","180","2","20",!0],["90","91","90","1","20",!1],["91","92","180","0","30",!1],["92","93","270","0","40",!1],["93","94","0","0","30",!1],["94","91","90","0","20",!1]],defaultAttributes:[{name:"年度",value:"令和8年度"},{name:"事業名",value:"育成複層林整備"},{name:"所有者名",value:"山田太郎"},{name:"備考",value:"No.10"}]}}initDOM(){this.els={tbody:m("tableBody"),canvas:m("previewCanvas"),container:m("canvasContainer"),tooltip:m("tooltip"),mapContainer:m("mapContainer"),dropdown:document.createElement("ul"),btnModeSelect:m("btnModeSelect"),btnModePan:m("btnModePan"),btnModeText:m("btnModeText"),btnModeLine:m("btnModeLine"),btnModeErase:m("btnModeErase"),btnZoomFit:m("btnZoomFit"),btnLoadDemo:m("btnLoadDemo"),btnClear:m("btnClear"),btnPasteClipboard:m("btnPasteClipboard"),btnCopyClipboard:m("btnCopyClipboard"),btnToggleMap:m("btnToggleMap"),btnExportGeoJSON:m("btnExportGeoJSON"),btnExportHTML:m("btnExportHTML"),btnSaveJSON:m("btnSaveJSON"),inputFileJSON:m("inputFileJSON"),btnUndo:m("btnUndo"),btnRedo:m("btnRedo"),chkCompassAdjustment:m("chkCompassAdjustment"),closureInfo:m("closureInfo"),btnCopyClosureInfo:m("btnCopyClosureInfo"),inputLat:m("inputLat"),inputLon:m("inputLon"),inputDeclination:m("inputDeclination"),btnCalcMag:m("btnCalcMag"),btnCopyDeclination:m("btnCopyDeclination"),chkMagDeclination:m("chkMagDeclination"),selNodeLabelInterval:m("selNodeLabelInterval"),pasteModal:m("pasteModal"),pasteArea:m("pasteArea"),btnCancelPaste:m("btnCancelPaste"),btnApplyPaste:m("btnApplyPaste"),chkConvertEPtoBP:m("chkConvertEPtoBP"),btnOpenDMSModal:m("btnOpenDMSModal"),btnCopyLatLon:m("btnCopyLatLon"),dmsModal:m("dmsModal"),dmsArea:m("dmsArea"),btnCancelDMS:m("btnCancelDMS"),btnApplyDMS:m("btnApplyDMS"),attrPasteModal:m("attrPasteModal"),attrPasteArea:m("attrPasteArea"),btnCopyAttr:m("btnCopyAttr"),btnPasteAttr:m("btnPasteAttr"),btnCancelAttrPaste:m("btnCancelAttrPaste"),btnApplyAttrPaste:m("btnApplyAttrPaste"),exportModal:m("exportModal"),exportModalTitle:m("exportModalTitle"),inputExportFileName:m("inputExportFileName"),exportExtension:m("exportExtension"),btnCancelExport:m("btnCancelExport"),btnApplyExport:m("btnApplyExport"),htmlExportOptions:m("htmlExportOptions"),inputCustomScale:m("inputCustomScale"),radioCustomScale:m("radioCustomScale"),importPreviewModal:m("importPreviewModal"),importFileList:m("importFileList"),importPreviewImage:m("importPreviewImage"),importNoPreviewText:m("importNoPreviewText"),importPreviewInfo:m("importPreviewInfo"),btnCancelImport:m("btnCancelImport"),btnApplyImport:m("btnApplyImport"),confirmModal:m("confirmModal"),confirmTitle:m("confirmTitle"),confirmMessage:m("confirmMessage"),btnCancelConfirm:m("btnCancelConfirm"),btnApplyConfirm:m("btnApplyConfirm"),textPromptModal:m("textPromptModal"),inputTextPrompt:m("inputTextPrompt"),inputTextColor:m("inputTextColor"),inputTextSize:m("inputTextSize"),btnCancelTextPrompt:m("btnCancelTextPrompt"),btnApplyTextPrompt:m("btnApplyTextPrompt"),attrTableBody:m("attrTableBody"),propertyPanel:m("propertyPanel"),propColor:m("propColor"),propLineWidth:m("propLineWidth"),propLineStyle:m("propLineStyle"),propFontSize:m("propFontSize"),rowLineWidth:m("rowLineWidth"),rowLineStyle:m("rowLineStyle"),rowFontSize:m("rowFontSize"),btnCloseProp:m("btnCloseProp")},this.els.dropdown.className="custom-dropdown",document.body.appendChild(this.els.dropdown),this.ctx=this.els.canvas.getContext("2d"),this.modals=[{el:this.els.exportModal,cancel:this.els.btnCancelExport,apply:this.els.btnApplyExport},{el:this.els.pasteModal,cancel:this.els.btnCancelPaste,apply:this.els.btnApplyPaste,input:this.els.pasteArea},{el:this.els.dmsModal,cancel:this.els.btnCancelDMS,apply:this.els.btnApplyDMS,input:this.els.dmsArea},{el:this.els.attrPasteModal,cancel:this.els.btnCancelAttrPaste,apply:this.els.btnApplyAttrPaste,input:this.els.attrPasteArea},{el:this.els.importPreviewModal,cancel:this.els.btnCancelImport,apply:this.els.btnApplyImport},{el:this.els.confirmModal,cancel:this.els.btnCancelConfirm,apply:this.els.btnApplyConfirm},{el:this.els.textPromptModal,cancel:this.els.btnCancelTextPrompt,apply:this.els.btnApplyTextPrompt,input:this.els.inputTextPrompt}]}initState(){this.state={tableData:[],points:[],nodes:new Map,uniqueNames:new Set,activeInput:null,bounds:{minX:0,maxX:0,minY:0,maxY:0},view:{scale:1,offsetX:0,offsetY:0,isDragging:!1,dragMoved:!1,dragStartX:0,dragStartY:0,dragStartInternalX:0,dragStartInternalY:0,lastMouseX:0,lastMouseY:0,isRightDragging:!1,rightDragMoved:!1,isRotating:!1,rotatingTarget:null,isMovingAnnotation:!1,movingTarget:null,movingLayer:null,movingExtras:null,movingInitialState:null},isClosed:!1,detectedAreas:[],attributes:JSON.parse(JSON.stringify(this.CONFIG.defaultAttributes)),dropdownSelectedIndex:-1,annotations:{texts:[],lines:[]},interactionMode:"pan",currentLine:[],selectedAnnotation:null,hoveredAnnotation:null,mapView:{isRightDragging:!1,dragStartX:0,dragStartY:0,lastMouseX:0,lastMouseY:0,rightDragMoved:!1}},document.body.classList.add("mode-pan"),this.history=[],this.historyIndex=-1,this.isUndoing=!1,this.importFilesList=[],this.selectedImportIndex=-1,this.isMapMode=!1,this.map=null,this.mapLayerGroup=null}loadInitialApp(){const t=this.loadFromLocalStorage();this.renderAttrTable(),setTimeout(()=>{t?(this.renderTable(),this.resizeCanvas(),this.updateDrawing(!0)):this.loadData(this.CONFIG.initialData),this.pushState(!0),navigator.onLine&&!this.isMapMode&&this.toggleMapMode()},200)}initEvents(){this._initToolbarEvents(),this._initModalEvents(),this._initSettingsEvents(),this._initCanvasAndGlobalEvents(),this._initDragDropEvents(),this._initPropertyPanelEvents()}_initToolbarEvents(){P(this.els.btnLoadDemo,()=>{this.showConfirm("現在のデータが上書きされます。デモデータを読み込みますか？",()=>{this.state.attributes=JSON.parse(JSON.stringify(this.CONFIG.defaultAttributes)),this.renderAttrTable(),this.loadData(this.CONFIG.initialData),this.pushState()})}),P(this.els.btnClear,()=>this.clearData()),P(this.els.btnCopyClipboard,()=>this.copyToClipboard()),P(this.els.btnToggleMap,()=>this.toggleMapMode()),P(this.els.btnUndo,()=>this.undo()),P(this.els.btnRedo,()=>this.redo()),P(this.els.btnSaveJSON,()=>this.openExportModal("json")),P(this.els.btnExportGeoJSON,()=>this.openExportModal("geojson")),P(this.els.btnExportHTML,()=>this.openExportModal("html")),P(this.els.btnPasteClipboard,()=>this.openModal(this.els.pasteModal,this.els.pasteArea)),this.els.tbody.addEventListener("paste",t=>this.handlePaste(t)),P(this.els.btnOpenDMSModal,()=>this.openModal(this.els.dmsModal,this.els.dmsArea)),P(this.els.btnCopyLatLon,()=>this.copyLatLonToClipboard()),P(this.els.btnPasteAttr,()=>this.openModal(this.els.attrPasteModal,this.els.attrPasteArea)),P(this.els.btnCopyAttr,()=>this.copyAttrToClipboard()),this.els.inputFileJSON&&this.els.inputFileJSON.addEventListener("change",t=>this.importJSON(t))}_initModalEvents(){this.modals.forEach(t=>{t.cancel&&P(t.cancel,()=>{document.activeElement&&document.activeElement.blur(),t.el.style.display="none",t.el===this.els.importPreviewModal&&(this.importFilesList=[],this.els.inputFileJSON.value=""),t.el===this.els.confirmModal&&(this.confirmCallback=null),t.el===this.els.textPromptModal&&(this.textPromptCallback=null)})}),P(this.els.btnApplyExport,()=>{document.activeElement&&document.activeElement.blur();const t=this.els.inputExportFileName.value.trim();if(this.currentExportType==="json")this.exportJSON(t),this.els.exportModal.style.display="none";else if(this.currentExportType==="geojson")this.exportGeoJSON(t),this.els.exportModal.style.display="none";else if(this.currentExportType==="html"){const i=document.querySelector('input[name="paperSize"]:checked').value,s=document.querySelector('input[name="paperOrientation"]:checked').value;let a=document.querySelector('input[name="printScale"]:checked').value;a==="custom"&&(a=this.els.inputCustomScale.value);const n=parseInt(m("selSplitRows").value,10)||0;this.showHTMLPreview(t,i,s,a,n),this.els.exportModal.style.display="none"}}),this.els.inputCustomScale&&(this.els.inputCustomScale.addEventListener("focus",()=>this.els.radioCustomScale.checked=!0),this.els.inputCustomScale.addEventListener("click",()=>this.els.radioCustomScale.checked=!0)),P(this.els.btnApplyImport,()=>{document.activeElement&&document.activeElement.blur(),this.selectedImportIndex>=0&&this.importFilesList[this.selectedImportIndex]&&(this.els.importPreviewModal.style.display="none",this.applyImportData(this.importFilesList[this.selectedImportIndex].data),this.importFilesList=[],this.els.inputFileJSON.value="")}),P(this.els.btnApplyPaste,()=>this.applyPasteModal()),P(this.els.btnApplyDMS,()=>this.applyDMSModal()),P(this.els.btnApplyAttrPaste,()=>this.applyAttrPasteModal()),P(this.els.btnApplyConfirm,()=>{document.activeElement&&document.activeElement.blur(),this.els.confirmModal.style.display="none",this.confirmCallback&&(this.confirmCallback(),this.confirmCallback=null)}),P(this.els.btnApplyTextPrompt,()=>{const t=this.els.inputTextPrompt.value.trim(),i=this.els.inputTextColor.value||"#059669",s=parseInt(this.els.inputTextSize.value,10)||14;document.activeElement&&document.activeElement.blur(),this.els.textPromptModal.style.display="none",this.textPromptCallback&&t&&this.textPromptCallback(t,i,s),this.textPromptCallback=null}),this.els.inputTextPrompt.addEventListener("keydown",t=>{t.key==="Enter"&&(this.els.btnApplyTextPrompt.click(),t.preventDefault())})}_initSettingsEvents(){const t=i=>()=>{this.updateDrawing(i),this.saveToLocalStorage(),this.pushState()};this.els.chkCompassAdjustment.addEventListener("change",t(!0)),P(this.els.btnCalcMag,()=>{this.calculateMagDeclination(),this.saveToLocalStorage(),this.pushState()}),this.els.inputDeclination.addEventListener("input",()=>this.updateDrawing(!1)),this.els.inputDeclination.addEventListener("change",()=>{this.saveToLocalStorage(),this.pushState()}),this.els.chkMagDeclination.addEventListener("change",t(!1)),this.els.inputLat.addEventListener("change",()=>{this.calculateMagDeclination(),this.saveToLocalStorage(),this.pushState()}),this.els.inputLon.addEventListener("change",()=>{this.calculateMagDeclination(),this.saveToLocalStorage(),this.pushState()}),this.els.selNodeLabelInterval.addEventListener("change",t(!1)),this.els.chkConvertEPtoBP&&this.els.chkConvertEPtoBP.addEventListener("change",()=>this.saveToLocalStorage()),P(this.els.btnCopyClosureInfo,()=>this._execCopy(this.els.closureInfo.innerText,"閉合状況をクリップボードにコピーしました。")),P(this.els.btnCopyDeclination,()=>{const i=this.els.inputDeclination.value;if(!i)return this.showToast("偏角が入力されていません。");this._execCopy(i,"偏角をクリップボードにコピーしました。")})}_initCanvasAndGlobalEvents(){window.addEventListener("resize",()=>this.resizeCanvas()),this.els.canvas.addEventListener("wheel",this.handleWheel),this.els.canvas.addEventListener("mousedown",this.handleMouseDown),window.addEventListener("mouseup",this.handleMouseUp),window.addEventListener("mousemove",this.handleMouseMove),this.els.canvas.addEventListener("contextmenu",s=>{s.preventDefault(),!this.state.view.rightDragMoved&&this.state.interactionMode==="line"&&this.finishCurrentLine()}),P(this.els.btnZoomFit,()=>{this.isMapMode&&this.map&&this.mapLayerGroup&&this.mapLayerGroup.getLayers().length>0?this.map.fitBounds(this.mapLayerGroup.getBounds(),{padding:[50,50]}):(this.autoFit(),this.draw())}),document.addEventListener("mousedown",s=>{this.els.dropdown.style.display==="block"&&!this.els.dropdown.contains(s.target)&&s.target!==this.state.activeInput&&this.hideDropdown()});const t=document.querySelector(".table-container");t&&t.addEventListener("scroll",()=>this.hideDropdown());const i=s=>{this.state.interactionMode==="line"&&this.state.currentLine.length>0&&this.finishCurrentLine(),this.state.interactionMode=s,["btnModeSelect","btnModePan","btnModeText","btnModeLine","btnModeErase"].forEach(n=>{const l=m(n);l&&l.classList.remove("active-btn")});const a={select:"btnModeSelect",pan:"btnModePan",text:"btnModeText",line:"btnModeLine",erase:"btnModeErase"}[s];a&&m(a).classList.add("active-btn"),document.body.classList.remove("mode-select","mode-pan","mode-text","mode-line","mode-erase"),document.body.classList.add("mode-"+s),this._clearSelection(),this.map&&this.map.dragging.enable()};P(this.els.btnModeSelect,()=>{i("select"),this.showToast("変更したいテキストや線をクリックしてください")}),P(this.els.btnModePan,()=>i("pan")),P(this.els.btnModeText,()=>{i("text"),this.showToast("キャンバス上をクリックしてテキストを追加します")}),P(this.els.btnModeLine,()=>{i("line"),this.showToast("クリックで頂点を追加、右クリックで線を確定します")}),P(this.els.btnModeErase,()=>{i("erase"),this.showToast("削除したいテキストや線をクリックしてください")}),document.addEventListener("keydown",s=>{const a=this.modals.find(n=>n.el&&(n.el.style.display==="flex"||n.el.style.display==="block"));if(s.key==="Escape")this.state.interactionMode==="line"&&this.finishCurrentLine(),this.state.selectedAnnotation&&this._clearSelection(),a&&a.cancel&&a.cancel.click();else if(s.key==="Enter"){if(document.activeElement&&document.activeElement.tagName.toLowerCase()==="textarea")return;a&&a.apply&&!a.apply.disabled&&(s.preventDefault(),a.apply.click())}else(s.ctrlKey||s.metaKey)&&(s.key.toLowerCase()==="z"?(s.preventDefault(),s.shiftKey?this.redo():this.undo()):s.key.toLowerCase()==="y"&&(s.preventDefault(),this.redo()))})}_initPropertyPanelEvents(){const t=(s,a)=>{this.state.selectedAnnotation&&(this.state.selectedAnnotation.ref[s]=a,this._redrawAll(),this.saveToLocalStorage())},i=()=>this.pushState();this.els.propColor.addEventListener("input",s=>t("color",s.target.value)),this.els.propColor.addEventListener("change",i),this.els.propLineWidth.addEventListener("input",s=>t("lineWidth",parseInt(s.target.value,10)||2)),this.els.propLineWidth.addEventListener("change",i),this.els.propLineStyle.addEventListener("change",s=>{t("lineStyle",s.target.value),i()}),this.els.propFontSize.addEventListener("input",s=>t("fontSize",parseInt(s.target.value,10)||14)),this.els.propFontSize.addEventListener("change",i),P(this.els.btnCloseProp,()=>this._clearSelection())}_initDragDropEvents(){document.body.addEventListener("dragover",t=>{t.preventDefault(),t.stopPropagation(),document.body.classList.add("drag-active")}),document.body.addEventListener("dragleave",t=>{t.preventDefault(),t.stopPropagation(),(t.clientX===0||t.clientY===0)&&document.body.classList.remove("drag-active")}),document.body.addEventListener("drop",t=>this.handleDrop(t))}loadFromLocalStorage(){try{const t=localStorage.getItem("compassSurveyApp_State");if(t){const i=JSON.parse(t);if(i.tableData&&i.tableData.length>0){this.state.tableData=i.tableData,i.attributes&&(this.state.attributes=i.attributes),i.annotations&&(this.state.annotations=i.annotations);const s=i.settings||{};return s.lat!==void 0&&(this.els.inputLat.value=s.lat),s.lon!==void 0&&(this.els.inputLon.value=s.lon),s.declination!==void 0&&(this.els.inputDeclination.value=s.declination),s.magDeclinationChecked!==void 0&&(this.els.chkMagDeclination.checked=s.magDeclinationChecked),s.compassAdjustmentChecked!==void 0&&(this.els.chkCompassAdjustment.checked=s.compassAdjustmentChecked),s.convertEPtoBPChecked!==void 0&&this.els.chkConvertEPtoBP&&(this.els.chkConvertEPtoBP.checked=s.convertEPtoBPChecked),s.nodeLabelInterval!==void 0&&(this.els.selNodeLabelInterval.value=s.nodeLabelInterval),!0}}}catch(t){console.warn("Load failed",t)}return!1}saveToLocalStorage(){try{const t={tableData:this.state.tableData,attributes:this.state.attributes,annotations:this.state.annotations,settings:{lat:this.els.inputLat.value,lon:this.els.inputLon.value,declination:this.els.inputDeclination.value,magDeclinationChecked:this.els.chkMagDeclination.checked,compassAdjustmentChecked:this.els.chkCompassAdjustment.checked,convertEPtoBPChecked:this.els.chkConvertEPtoBP?this.els.chkConvertEPtoBP.checked:!0,nodeLabelInterval:this.els.selNodeLabelInterval.value}};localStorage.setItem("compassSurveyApp_State",JSON.stringify(t))}catch(t){console.warn("Save failed",t)}}loadData(t){this.state.tableData=JSON.parse(JSON.stringify(t)),this.renderTable(),this.resizeCanvas(),this.updateDrawing(!0)}pushState(t=!1){if(this.isUndoing)return;const i={tableData:JSON.parse(JSON.stringify(this.state.tableData)),attributes:JSON.parse(JSON.stringify(this.state.attributes)),annotations:JSON.parse(JSON.stringify(this.state.annotations)),settings:{lat:this.els.inputLat.value,lon:this.els.inputLon.value,declination:this.els.inputDeclination.value,magDeclinationChecked:this.els.chkMagDeclination.checked,compassAdjustmentChecked:this.els.chkCompassAdjustment.checked,convertEPtoBPChecked:this.els.chkConvertEPtoBP?this.els.chkConvertEPtoBP.checked:!0,nodeLabelInterval:this.els.selNodeLabelInterval.value}};this.historyIndex<this.history.length-1&&(this.history=this.history.slice(0,this.historyIndex+1)),!(this.history.length>0&&!t&&JSON.stringify(this.history[this.history.length-1])===JSON.stringify(i))&&(this.history.push(i),this.history.length>50?this.history.shift():this.historyIndex++,this.updateUndoRedoButtons())}undo(){this.historyIndex>0&&(this._clearSelection(),this.historyIndex--,this.restoreState(this.history[this.historyIndex]),this.updateUndoRedoButtons())}redo(){this.historyIndex<this.history.length-1&&(this._clearSelection(),this.historyIndex++,this.restoreState(this.history[this.historyIndex]),this.updateUndoRedoButtons())}restoreState(t){this.isUndoing=!0,this.state.tableData=JSON.parse(JSON.stringify(t.tableData)),this.state.attributes=JSON.parse(JSON.stringify(t.attributes)),this.state.annotations=t.annotations?JSON.parse(JSON.stringify(t.annotations)):{texts:[],lines:[]},t.settings&&(["lat","lon","declination"].forEach(i=>{t.settings[i]!==void 0&&(this.els["input"+i.charAt(0).toUpperCase()+i.slice(1)].value=t.settings[i])}),["magDeclinationChecked","compassAdjustmentChecked"].forEach(i=>{t.settings[i]!==void 0&&(this.els["chk"+i.charAt(0).toUpperCase()+i.slice(1).replace("Checked","")].checked=t.settings[i])}),t.settings.convertEPtoBPChecked!==void 0&&this.els.chkConvertEPtoBP&&(this.els.chkConvertEPtoBP.checked=t.settings.convertEPtoBPChecked),t.settings.nodeLabelInterval!==void 0&&(this.els.selNodeLabelInterval.value=t.settings.nodeLabelInterval)),this.renderAttrTable(),this.renderTable(),this.updateDrawing(!1),this.saveToLocalStorage(),this.isUndoing=!1}updateUndoRedoButtons(){const t=(i,s)=>{i&&(i.disabled=!s,i.style.opacity=s?"1":"0.5",i.style.cursor=s?"pointer":"not-allowed")};t(this.els.btnUndo,this.historyIndex>0),t(this.els.btnRedo,this.historyIndex<this.history.length-1)}_showTextPrompt(t,i){this.openModal(this.els.textPromptModal,this.els.inputTextPrompt),this.textPromptCallback=(s,a,n)=>{this.state.annotations||(this.state.annotations={texts:[],lines:[]});const l=this.els.chkMagDeclination.checked&&parseFloat(this.els.inputDeclination.value)||0,o=C.deg2rad(l),r=Math.cos(-o),d=Math.sin(-o),c=t,h=i,p=c*r-h*d,g=c*d+h*r,f=o;this.state.annotations.texts.push({text:s,x:c,y:h,color:a,fontSize:n,rotation:0,baseX:p,baseY:g,baseRotation:f}),this.saveToLocalStorage(),this.pushState(),this._redrawAll()}}_execCopy(t,i){if(!t)return this.showToast("コピーするデータがありません。");const s=document.createElement("textarea");s.value=t,s.style.position="fixed",s.style.left="-9999px",document.body.appendChild(s),s.focus(),s.select();try{document.execCommand("copy")?this.showToast(i):this.showToast("コピーに失敗しました。")}catch{this.showToast("コピーに失敗しました。")}document.body.removeChild(s)}copyAttrToClipboard(){this._execCopy(this.state.attributes.map(t=>`${t.name}	${t.value}`).join(`
`),"属性データをクリップボードにコピーしました。")}copyLatLonToClipboard(){const t=this.els.inputLat.value,i=this.els.inputLon.value;if(!t||!i)return this.showToast("緯度経度が入力されていません。");this._execCopy(`${t}, ${i}`,"緯度経度をクリップボードにコピーしました。")}copyToClipboard(){this._execCopy(this.state.tableData.map(t=>t.join("	")).join(`
`),"測量データをクリップボードにコピーしました。")}showConfirm(t,i,s="確認"){this.els.confirmTitle.textContent=s,this.els.confirmMessage.textContent=t,this.confirmCallback=i,this.els.confirmModal.style.display="flex"}clearData(){this.showConfirm("すべての測量データをクリアしますか？",()=>{this.state.tableData=[],this.renderTable(),this.updateDrawing(!0),this.saveToLocalStorage(),this.pushState(),this.showToast("データをクリアしました。")})}showToast(t){const i=m("toast");i.textContent=t,i.classList.add("show"),setTimeout(()=>i.classList.remove("show"),3e3)}openModal(t,i){t.style.display="flex",i&&(i.value="",setTimeout(()=>i.focus(),100))}closeModal(t,i){t.style.display="none",i&&(i.value="")}openExportModal(t){this.currentExportType=t;const i=this.state.attributes.map(s=>s.value?s.value.trim():"").filter(s=>s!=="");this.els.inputExportFileName.value=i.length>0?i.join("_"):"令和8年度_育成複層林整備_山田太郎_No.10",t==="json"?(this.els.exportModalTitle.textContent="データの保存 (JSON)",this.els.exportExtension.textContent=".json",this.els.htmlExportOptions.style.display="none",this.els.btnApplyExport.textContent="保存"):t==="geojson"?(this.els.exportModalTitle.textContent="GeoJSON出力",this.els.exportExtension.textContent=".geojson",this.els.htmlExportOptions.style.display="none",this.els.btnApplyExport.textContent="保存"):t==="html"&&(this.els.exportModalTitle.textContent="平面図出力設定",this.els.exportExtension.textContent=".html",this.els.htmlExportOptions.style.display="block",this.els.btnApplyExport.textContent="プレビュー"),this.openModal(this.els.exportModal),setTimeout(()=>{this.els.inputExportFileName.focus(),this.els.inputExportFileName.select()},100)}calculateMagDeclination(t=!0){const i=parseFloat(this.els.inputLat.value),s=parseFloat(this.els.inputLon.value);if(isNaN(i)||isNaN(s))return this.els.inputDeclination.value="0.00";this.els.inputDeclination.value=C.calculateMagDeclination(i,s).toFixed(2),t&&this.updateDrawing(!1)}renderTable(){this.els.tbody.innerHTML="",this.state.tableData.forEach((t,i)=>this.els.tbody.appendChild(this.createRow(t,i))),this.els.tbody.appendChild(this.createRow(["","","","","",!1],this.state.tableData.length)),this.updateUniqueNames()}createRow(t,i){const s=document.createElement("tr");s.dataset.index=i;const a=["BP","1","45.30","10.5","12.34"];for(let h=0;h<5;h++){const p=document.createElement("td"),g=document.createElement("input");g.type=h<2?"text":"number",h>=2&&(g.step="any"),g.value=t[h]||"",g.placeholder=a[h],this.setupRowEvents(g,i,h,s),p.appendChild(g),s.appendChild(p)}const n=t[5]===!0||t[5]==="true";t.length<6&&(t[5]=n);const l=document.createElement("td"),o=document.createElement("input");o.type="checkbox",o.checked=n,o.title="チェックを入れると作図から除外され、補助線になります",o.addEventListener("change",h=>{this.state.tableData[i][5]=h.target.checked,this.updateDrawing(!1),this.saveToLocalStorage(),this.pushState()}),l.appendChild(o),s.appendChild(l);const r=document.createElement("td");r.className="action-col";const d=document.createElement("button"),c=document.createElement("button");return d.className="small",d.textContent="＋",d.onclick=()=>{this.state.tableData.splice(i+1,0,["","","","","",!1]),this.renderTable(),this.saveToLocalStorage(),this.pushState()},c.className="small danger",c.textContent="－",c.onclick=()=>{this.state.tableData.splice(i,1),this.renderTable(),this.updateDrawing(),this.saveToLocalStorage(),this.pushState()},r.appendChild(d),r.appendChild(c),s.appendChild(r),this.validateRow(s),s}validateRow(t){var l,o;const i=(l=t.cells[0])==null?void 0:l.querySelector("input"),s=(o=t.cells[1])==null?void 0:o.querySelector("input");if(!i||!s)return;const a=i.value.trim(),n=s.value.trim();a&&n&&a===n?(i.classList.add("error"),s.classList.add("error"),i.title="警告: 器械点と視準点が同じ名前です",s.title="警告: 器械点と視準点が同じ名前です"):(i.classList.remove("error"),s.classList.remove("error"),i.title="",s.title="")}setupRowEvents(t,i,s,a){t.addEventListener("focus",()=>{this.state.activeInput=t,s<2&&this.addDropdown(t,s,i)}),t.addEventListener("input",n=>{i>=this.state.tableData.length&&(this.state.tableData.push(["","","","","",!1]),this.els.tbody.appendChild(this.createRow(["","","","","",!1],this.state.tableData.length))),this.state.tableData[i][s]=n.target.value,s<2&&(this.addDropdown(t,s,i),this.updateUniqueNames(),this.validateRow(a)),this.updateDrawing()}),t.addEventListener("change",()=>this.pushState()),t.addEventListener("keydown",n=>{const l=this.els.dropdown.style.display==="block",o=this.els.dropdown.querySelectorAll("li");if(l&&o.length>0){if(n.key==="ArrowDown"){n.preventDefault(),this.state.dropdownSelectedIndex=Math.min(this.state.dropdownSelectedIndex+1,o.length-1),this.updateDropdownSelection(o);return}if(n.key==="ArrowUp"){n.preventDefault(),this.state.dropdownSelectedIndex=Math.max(this.state.dropdownSelectedIndex-1,0),this.updateDropdownSelection(o);return}if(n.key==="Escape"){this.hideDropdown();return}}if(n.key==="Enter"){if(n.preventDefault(),l&&this.state.dropdownSelectedIndex>=0&&o[this.state.dropdownSelectedIndex]){this.applyDropdownSelection(t,s,i,o[this.state.dropdownSelectedIndex].dataset.value,a);return}this.hideDropdown();const r=s+1;r<5?a.cells[r].querySelector("input").focus():a.nextElementSibling&&a.nextElementSibling.cells[0].querySelector("input").focus()}else n.key==="Tab"&&this.hideDropdown()})}renderAttrTable(){this.els.attrTableBody.innerHTML="",this.state.attributes.forEach((t,i)=>{const s=document.createElement("tr"),a=document.createElement("td"),n=document.createElement("input");n.type="text",n.value=t.name,n.placeholder="項目名",n.addEventListener("input",h=>{this.state.attributes[i].name=h.target.value,this.saveToLocalStorage()}),n.addEventListener("change",()=>this.pushState()),a.appendChild(n);const l=document.createElement("td"),o=document.createElement("input");o.type="text",o.value=t.value,o.placeholder="値",o.addEventListener("input",h=>{this.state.attributes[i].value=h.target.value,this.saveToLocalStorage()}),o.addEventListener("change",()=>this.pushState()),l.appendChild(o);const r=document.createElement("td");r.className="action-col";const d=document.createElement("button"),c=document.createElement("button");d.className="small",d.textContent="＋",d.addEventListener("click",()=>{this.state.attributes.splice(i+1,0,{name:"",value:""}),this.renderAttrTable(),this.saveToLocalStorage(),this.pushState()}),c.className="small danger",c.textContent="－",c.addEventListener("click",()=>{this.state.attributes.splice(i,1),this.renderAttrTable(),this.saveToLocalStorage(),this.pushState()}),r.appendChild(d),r.appendChild(c),s.appendChild(a),s.appendChild(l),s.appendChild(r),this.els.attrTableBody.appendChild(s)})}_renderAreaResults(t){const i=m("areaResults");if(t.length>0){i.style.display="block";let s='<div style="display: flex; justify-content: flex-start; align-items: center; gap: 8px; margin-bottom: 2px;"><div style="font-weight: bold; color: #217270; font-size: 0.75rem;">■ 区画ごとの面積</div><button id="btnCopyAreaResults" class="small" style="background-color: #2E5C8A; color: white; height: 20px; font-size: 0.7rem; padding: 2px 4px;">📋 コピー</button></div><div class="area-container">',a=0,n=1,l=`区画名 面積(ha)
`;if(t.forEach((o,r)=>{const d=C.round4(o.netArea/1e4);a+=parseFloat(d);let c="",h="";if(o.isDonut){const p=C.round4(o.area/1e4);l+=`区画 ${r+1} (全体)  ${p} ha
`,o.holes.forEach(g=>{const f=C.round4(g.area/1e4);g.globalIndex=n,h+=`  － 除地 ${g.globalIndex}  ${f} ha
`,n++}),c='<span style="font-size:0.75rem; color:#A13D44; margin-left:4px;">(内 除地あり)</span>',l+=h,l+=`区画 ${r+1} 小計  ${d} ha
`}else l+=`区画 ${r+1}  ${d} ha
`;s+=`<div class="area-item"><span>区画${r+1}:</span><strong>${d} ha</strong>${c}</div>`,o.originalName=`区画 ${r+1}`}),s+="</div>",t.length>1){const o=C.round4(a);s+=`<div class="area-total"><span>合計面積:</span><span>${o} ha</span></div>`,l+=`合計 ${o}
`}i.innerHTML=s,P(m("btnCopyAreaResults"),()=>this._execCopy(l.trim(),"面積結果をクリップボードにコピーしました。"))}else i.style.display="none"}updateClosureInfo(t,i,s,a){const n=this.els.closureInfo;if(n.style.display="inline-block",n.style.fontWeight="normal",s===0){n.style.color="#9ca3af",n.innerHTML="（閉合誤差：- m　閉合比：-　面積：- ha　周長：- m）";return}const l=Math.sqrt(t*t+i*i),o=l>0?s/l:0;if(this.els.chkCompassAdjustment.checked&&a){n.style.color="#064e3b";const r=[{x:0,y:0},...this.state.points.filter(d=>d.type==="main"&&d.isDraw).map(d=>({x:d.toX,y:d.toY}))];n.innerHTML=`（閉合誤差：${l.toFixed(3)}m　閉合比：1/${Math.round(o).toLocaleString()}　面積：${C.round4(C.calculatePolygonArea(r)/1e4)}ha　周長：${s.toFixed(1)}m）`}else n.style.color="#1f2937",n.innerHTML="（閉合誤差：- m　閉合比：-　面積：- ha　周長：- m）"}handlePaste(t){t.preventDefault(),this.els.pasteArea.value=(t.clipboardData||window.clipboardData).getData("text"),this.openModal(this.els.pasteModal,this.els.pasteArea)}applyPasteModal(){const t=this.els.pasteArea.value;if(!t)return this.showToast("データが入力されていません。");const i=t.split(/\r\n|\n|\r/).filter(n=>n.trim()!==""),s=[];let a=!1;i.forEach(n=>{const l=n.split("	");if(l.length>=2){const o=["","","","","",!1];for(let r=0;r<Math.min(l.length,5);r++){let d=l[r]?l[r].trim():"";d.startsWith('"')&&d.endsWith('"')&&(d=d.slice(1,-1)),o[r]=d}if(l.length>5){let r=l[5].trim().toLowerCase();["true","1","補助線","はい"].includes(r)&&(o[5]=!0)}s.push(o),a=!0}}),a?(this.state.tableData=s,this.els.chkConvertEPtoBP&&this.els.chkConvertEPtoBP.checked&&this.resolveEPtoBP(),this.renderTable(),this.updateDrawing(!0),this.saveToLocalStorage(),this.pushState(),this.showToast("データを貼り付けました。"),this.closeModal(this.els.pasteModal,this.els.pasteArea)):this.showToast("有効なデータが見つかりませんでした。タブ区切りのデータが必要です。")}applyDMSModal(){var n,l;const t=this.els.dmsArea.value.trim();if(!t)return this.showToast("データが入力されていません。");let i=null,s=null;const a=t.match(/^\s*(-?\d+\.\d+)\s*[, ]\s*(-?\d+\.\d+)\s*$/);if(a)i=parseFloat(a[1]),s=parseFloat(a[2]);else{const o=/(\d+)[^\d\w]+(\d+)[^\d\w]+(\d+(?:\.\d+)?)[^\d\w]*([NSEW])/gi,r=[];let d;for(;(d=o.exec(t))!==null;){let c=parseFloat(d[1])+parseFloat(d[2])/60+parseFloat(d[3])/3600;(((n=d[4])==null?void 0:n.toUpperCase())==="S"||((l=d[4])==null?void 0:l.toUpperCase())==="W")&&(c=-c),r.push(c)}if(r.length>=2)i=r[0],s=r[1];else{const c=t.split(/\r\n|\n|\r/).filter(h=>h.trim()!=="");c.length>=2&&(i=C.parseDMS(c[0]),s=C.parseDMS(c[1]))}}i!==null&&s!==null&&!isNaN(i)&&!isNaN(s)?(this.els.inputLat.value=i.toFixed(6),this.els.inputLon.value=s.toFixed(6),this.calculateMagDeclination(),this.showToast("座標を変換して反映しました。"),this.closeModal(this.els.dmsModal,this.els.dmsArea)):this.showToast("正しい座標形式で読み取れませんでした。")}applyAttrPasteModal(){const t=this.els.attrPasteArea.value;if(!t)return this.showToast("データが入力されていません。");const i=t.split(/\r\n|\n|\r/).filter(s=>s.trim()!=="");if(i.length===0)return this.showToast("有効なデータがありません。");if(i.some(s=>s.includes("	"))){const s=[];i.forEach(a=>{const n=a.split("	");let l=(n[0]||"").trim(),o=(n[1]||"").trim();l.startsWith('"')&&l.endsWith('"')&&(l=l.slice(1,-1)),o.startsWith('"')&&o.endsWith('"')&&(o=o.slice(1,-1)),s.push({name:l,value:o})}),this.state.attributes=s}else i.forEach((s,a)=>{let n=s.trim();n.startsWith('"')&&n.endsWith('"')&&(n=n.slice(1,-1)),a<this.state.attributes.length?this.state.attributes[a].value=n:this.state.attributes.push({name:"",value:n})});this.renderAttrTable(),this.saveToLocalStorage(),this.pushState(),this.showToast("属性データを貼り付けました。"),this.closeModal(this.els.attrPasteModal,this.els.attrPasteArea)}resolveEPtoBP(){const t=this._getFirstPointName();if(t){for(let i=this.state.tableData.length-1;i>=0;i--)if(this.state.tableData[i].join("").trim()!==""){/^e\.?p\.?$/i.test((this.state.tableData[i][1]||"").trim())&&(this.state.tableData[i][1]=t);break}}}_getFirstPointName(){return this.state.tableData.length>0&&this.state.tableData[0][0]?this.state.tableData[0][0].trim():"BP"}generateNextPointName(t){return!t||/^b\.?p\.?$/i.test(t)?"1":/^(\d+)$/.test(t)?`${parseInt(t,10)+1}`:/^No\.?\s*(\d+)$/i.test(t)?`No.${parseInt(t.match(/\d+/)[0],10)+1}`:/^T-?\s*(\d+)$/i.test(t)?`T-${parseInt(t.match(/\d+/)[0],10)+1}`:""}updateUniqueNames(){this.state.uniqueNames.clear(),this.state.tableData.forEach(t=>{t[0]&&this.state.uniqueNames.add(t[0].trim()),t[1]&&this.state.uniqueNames.add(t[1].trim())})}addDropdown(t,i,s){var o,r;const a=t.value.toLowerCase();this.els.dropdown.innerHTML="",this.state.dropdownSelectedIndex=-1;let n=!1;const l=(d,c=!1)=>{const h=document.createElement("li");h.dataset.value=d,h.innerHTML=c?`<span style="color:var(--primary);font-weight:bold;">✨ ${d}</span> (自動)`:d,h.onmousedown=p=>{p.preventDefault(),p.stopPropagation(),this.applyDropdownSelection(t,i,s,d,t.closest("tr"))},this.els.dropdown.appendChild(h),n=!0};if(i===0)s===0&&!a?l("BP",!0):s>0&&((o=this.state.tableData[s-1])!=null&&o[1])&&!a&&l(this.state.tableData[s-1][1],!0);else if(i===1&&(r=this.state.tableData[s])!=null&&r[0]&&!a){const d=this.generateNextPointName(this.state.tableData[s][0]);d&&l(d,!0)}if(Array.from(this.state.uniqueNames).filter(d=>d.toLowerCase().includes(a)).forEach(d=>l(d)),n){const d=t.getBoundingClientRect();this.els.dropdown.style.left=`${d.left}px`,this.els.dropdown.style.width=`${d.width}px`,this.els.dropdown.style.display="block";const c=this.els.dropdown.offsetHeight;d.bottom+c>window.innerHeight?(this.els.dropdown.style.top=`${d.top-c}px`,this.els.dropdown.style.boxShadow="0 -4px 6px -1px rgba(0,0,0,0.1)"):(this.els.dropdown.style.top=`${d.bottom}px`,this.els.dropdown.style.boxShadow="0 4px 6px -1px rgba(0,0,0,0.1)")}else this.hideDropdown()}updateDropdownSelection(t){t.forEach((i,s)=>{s===this.state.dropdownSelectedIndex?(i.classList.add("active"),i.scrollIntoView({block:"nearest"})):i.classList.remove("active")})}applyDropdownSelection(t,i,s,a,n){t.value=a,s>=this.state.tableData.length&&(this.state.tableData.push(["","","","","",!1]),this.els.tbody.appendChild(this.createRow(["","","","","",!1],this.state.tableData.length))),this.state.tableData[s][i]=a,this.hideDropdown(),this.updateUniqueNames(),this.validateRow(n),this.updateDrawing(),this.saveToLocalStorage(),this.pushState();const l=i+1;l<5?n.cells[l].querySelector("input").focus():n.nextElementSibling&&n.nextElementSibling.cells[0].querySelector("input").focus()}hideDropdown(){this.els.dropdown.style.display="none"}async handleDrop(t){if(t.preventDefault(),t.stopPropagation(),document.body.classList.remove("drag-active"),!t.dataTransfer)return;const i=[],s=t.dataTransfer.items;if(s){const a=[];for(let n=0;n<s.length;n++){const l=s[n].webkitGetAsEntry();l&&a.push(this.traverseFileTree(l,i))}await Promise.all(a)}else t.dataTransfer.files&&Array.from(t.dataTransfer.files).forEach(a=>{a.name.toLowerCase().endsWith(".json")&&i.push(a)});this.processJsonFiles(i)}async traverseFileTree(t,i){if(t.isFile)return new Promise(s=>t.file(a=>{a.name.toLowerCase().endsWith(".json")&&i.push(a),s()}));if(t.isDirectory){const s=t.createReader(),a=await(async()=>{let n=[],l;do l=await new Promise(o=>s.readEntries(o)),n=n.concat(l);while(l.length>0);return n})();await Promise.all(a.map(n=>this.traverseFileTree(n,i)))}}async processJsonFiles(t){if(t.length===0){this.showToast("JSONファイルが見つかりませんでした。"),this.els.inputFileJSON&&(this.els.inputFileJSON.value="");return}this.importFilesList=[],this.selectedImportIndex=-1,this.els.importFileList.innerHTML="",this.els.importPreviewImage.style.display="none",this.els.importNoPreviewText.style.display="inline-block",this.els.importPreviewInfo.innerHTML="",this.els.btnApplyImport.disabled=!0,this.els.importPreviewModal.style.display="flex",this.els.importNoPreviewText.textContent="読み込み中...";const i=await Promise.all(t.map(s=>new Promise(a=>{const n=new FileReader;n.onload=l=>{try{const o=JSON.parse(l.target.result);a(o&&Array.isArray(o.tableData)?{file:s,name:s.name,data:o}:null)}catch{a(null)}},n.onerror=()=>a(null),n.readAsText(s)})));if(this.importFilesList=i.filter(s=>s!==null).sort((s,a)=>s.name.localeCompare(a.name)),this.importFilesList.length===0){this.els.importNoPreviewText.textContent="有効なデータが見つかりませんでした。";return}this.renderImportFileList(),this.selectImportFile(0)}}window.onload=()=>{window.app=new X};Object.assign(X.prototype,H);Object.assign(X.prototype,J);Object.assign(X.prototype,U);Object.assign(X.prototype,q);
