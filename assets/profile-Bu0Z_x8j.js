import"./modulepreload-polyfill-B5Qt9EMX.js";function ut(o,t,a,n){if(!o)return!1;const{results:i,graphElevBase:f,pw:I,ph:g,scaleH:d,scaleV:h,viewW:w,viewH:D}=o;let m="";m+=`0
SECTION
2
HEADER
`,m+=`9
$ACADVER
1
AC1015
`,m+=`9
$DWGCODEPAGE
3
ANSI_932
`,m+=`9
$EXTMIN
10
0.0
20
-100.0
30
0.0
`,m+=`9
$EXTMAX
10
`+w.toFixed(3)+`
20
`+D.toFixed(3)+`
30
0.0
`,m+=`9
$LIMMIN
10
0.0
20
-100.0
30
0.0
`,m+=`9
$LIMMAX
10
`+I.toFixed(3)+`
20
`+g.toFixed(3)+`
30
0.0
`,m+=`0
ENDSEC
`,m+=`0
SECTION
2
ENTITIES
`;const u=(e,r,l,p,b="0")=>{m+=`0
LINE
8
`+b+`
`,m+=`10
`+e.toFixed(3)+`
20
`+r.toFixed(3)+`
30
0.0
`,m+=`11
`+l.toFixed(3)+`
21
`+p.toFixed(3)+`
31
0.0
`},T=(e,r,l,p,b=0,U="TEXT",q="center")=>{m+=`0
TEXT
8
`+U+`
`,m+=`1
`+e+`
`,m+=`10
`+r.toFixed(3)+`
20
`+l.toFixed(3)+`
30
0.0
`,m+=`40
`+p.toFixed(2)+`
`;let W=0;q==="center"?W=1:q==="right"&&(W=2),m+=`50
`+b.toFixed(2)+`
`,W>0&&(m+=`72
`+W+`
`,m+=`11
`+r.toFixed(3)+`
21
`+l.toFixed(3)+`
31
0.0
`)},X="GRID",C=i[i.length-1].cDist*(1e3/d),ot=Math.min(...i.map(e=>e.elev)),O=Math.max(...i.map(e=>e.elev));let H=Math.floor(ot/5)*5,Z=Math.ceil(O/5)*5;Z===H&&(Z+=5);for(let e=H;e<=Z;e+=5){const r=(e-f)*(1e3/h);u(0,r,C,r,X),T(e.toFixed(2),-2,r,2.5,0,"TEXT","right"),T(e.toFixed(2),C+2,r,2.5,0,"TEXT","left")}let k=0,V=(i[0].elev-f)*(1e3/h);m+=`0
POLYLINE
8
TERRAIN
66
1
`,m+=`0
VERTEX
8
TERRAIN
10
`+k.toFixed(3)+`
20
`+V.toFixed(3)+`
30
0.0
`;for(let e=1;e<i.length;e++){const r=i[e],l=r.cDist*(1e3/d),p=(r.elev-f)*(1e3/h);m+=`0
VERTEX
8
TERRAIN
10
`+l.toFixed(3)+`
20
`+p.toFixed(3)+`
30
0.0
`}m+=`0
SEQEND
`;const E=-5,B=8,K=["測点","単距離","追加距離","勾配","地盤高"],R=K.length,z=E-B*R,F=20,P=-F;for(let e=0;e<=R;e++){const r=E-e*B;u(P,r,C,r,"TABLE")}for(let e=0;e<R;e++){const r=E-e*B;T(K[e],P+F/2,r-B/2-1.5,3.5,0,"TEXT","center")}for(let e=0;e<i.length;e++){const r=i[e],l=r.cDist*(1e3/d),p=(r.elev-f)*(1e3/h);u(l,0,l,p,"GRID_V"),u(l,E,l,z,"TABLE");const b=l,U=r.pt||e.toString(),q=e===0?"":r.hDist.toFixed(2),W=r.cDist.toFixed(2),at=e===0?"":(r.grad>0?"+":"")+r.grad.toFixed(1)+"%",lt=r.elev.toFixed(2),G="right",S=-1;T(U,b+S,E-0*B-B/2-1.5,2.5,0,"TEXT",G),e>0&&T(q,b+S,E-1*B-B/2-1.5,2.5,0,"TEXT",G),T(W,b+S,E-2*B-B/2-1.5,2.5,0,"TEXT",G),e>0&&T(at,b+S,E-3*B-B/2-1.5,2.5,0,"TEXT",G),T(lt,b+S,E-4*B-B/2-1.5,2.5,0,"TEXT",G)}const y=90,L=40,s=w-10,x=-(D-(O-f)*(1e3/h)-40);u(s-y,x,s,x,"FRAME"),u(s-y,x+L,s,x+L,"FRAME"),u(s-y,x,s-y,x+L,"FRAME"),u(s,x,s,x+L,"FRAME");const $=5,c=L/$;for(let e=1;e<$;e++)u(s-y,x+e*c,s,x+e*c,"FRAME");u(s-y+20,x,s-y+20,x+L,"FRAME"),u(s-y+55,x,s-y+55,x+L,"FRAME");const A=(e,r,l)=>{T(e,r,l-2,3,0,"FRAME_TEXT","center")};A(t.year,s-y+10,x+4*c+c/2),A(t.constName,s-y+37.5,x+4*c+c/2),A("名称",s-y+10,x+3*c+c/2),A(t.title,s-y+37.5,x+3*c+c/2),A("施工地",s-y+10,x+2*c+c/2),A(t.location,s-y+37.5,x+2*c+c/2),A(t.project,s-y+37.5,x+1*c+c/2),A(t.office,s-y+37.5,x+0*c+c/2),A("図面番号",s-y+55+17.5,x+4*c+c/2),A(t.drawNo,s-y+55+17.5,x+3*c+c/2),A("縮尺",s-y+55+17.5,x+2*c+c/2),A(t.scaleText,s-y+55+17.5,x+1*c+c/2),m+=`0
ENDSEC
0
EOF
`;try{if(typeof Encoding>"u")throw new Error("Encoding.js is not loaded.");const e=Encoding.stringToCode(m),r=Encoding.convert(e,"SJIS","UNICODE"),l=new Uint8Array(r),p=new Blob([l],{type:"application/dxf"});n&&n(!1),a(p,"profile.dxf")}catch(e){console.warn("Shift-JIS conversion failed, falling back to UTF-8",e),n&&n(!0);const r=new Blob([m],{type:"application/dxf"});a(r,"profile_utf8.dxf")}return!0}function ft(o,t,a){if(!o||!a)return;const{results:n,graphElevBase:i,pw:f,ph:I,scaleH:g,scaleV:d,viewX:h,viewY:w,viewW:D,viewH:m}=o;a.setAttribute("viewBox",`${h} ${w} ${D} ${m}`),a.setAttribute("width",D),a.setAttribute("height",m);let u="<style>text { font-family: 'Inter', sans-serif; }</style>";u+=`<rect x="${h}" y="${w}" width="${D}" height="${m}" fill="#ffffff" />`,u+=`<rect x="0" y="0" width="${f}" height="${I}" fill="none" stroke="#000000" stroke-width="0.5" />`;const T=12,X=10,C=5,ot=["測点","単距離","追加距離","勾配","地盤高"],O=12,H=35,k=20+H+2,V=k+O,E=I-30-C*T-5,B=n[n.length-1].cDist*1e3/g,R=V+B+O,z=Math.min(...n.map(l=>l.elev)),F=Math.max(...n.map(l=>l.elev));let P=Math.floor(z/5)*5,y=Math.ceil(F/5)*5;y===P&&(y+=5);for(let l=P;l<=y;l+=5){const p=E-(l-i)*1e3/d;u+=`<line x1="${k}" y1="${p}" x2="${R}" y2="${p}" stroke="#e5e7eb" stroke-width="0.5" />`,u+=`<text x="${k-2}" y="${p}" font-size="2.5" fill="#6b7280" text-anchor="end" dominant-baseline="middle">${l.toFixed(2)}</text>`,u+=`<text x="${R+2}" y="${p}" font-size="2.5" fill="#6b7280" text-anchor="start" dominant-baseline="middle">${l.toFixed(2)}</text>`}let L="";for(let l=0;l<n.length;l++){const p=n[l],b=V+p.cDist*(1e3/g),U=E-(p.elev-i)*(1e3/d);L+=`${b},${U} `}u+=`<polyline points="${L.trim()}" fill="none" stroke="#ef4444" stroke-width="1.0" />`,u+=`<line x1="20" y1="${E}" x2="${R}" y2="${E}" stroke="#000" stroke-width="0.3" />`,u+=`<text x="20" y="${E-2}" font-size="4" fill="#000" text-anchor="start">DL = ${i.toFixed(2)}</text>`;for(let l=0;l<C;l++){const p=E+3+l*T+1;u+=`<rect x="20" y="${p}" width="${H}" height="${X}" fill="none" stroke="#000" stroke-width="0.2" />`,u+=`<text x="${20+H/2}" y="${p+X/2}" font-size="3" fill="#374151" text-anchor="middle" dominant-baseline="central">${ot[l]}</text>`,u+=`<rect x="${k}" y="${p}" width="${R-k}" height="${X}" fill="none" stroke="#000" stroke-width="0.2" />`}for(let l=0;l<n.length;l++){const p=n[l],b=V+p.cDist*(1e3/g),U=E-(p.elev-i)*(1e3/d);u+=`<line x1="${b}" y1="${E}" x2="${b}" y2="${U}" stroke="#d1d5db" stroke-width="0.3" stroke-dasharray="1 1" />`,u+=`<line x1="${b}" y1="${E+3+1}" x2="${b}" y2="${E+3+C*T+1}" stroke="#9ca3af" stroke-width="0.2" />`;const q=p.pt||l.toString(),W=l===0?"":p.hDist.toFixed(2),at=p.cDist.toFixed(2),lt=l===0?"":(p.grad>0?"+":"")+p.grad.toFixed(1)+"%",G=p.elev.toFixed(2),S="end",Q=-1;u+=`<text x="${b+Q}" y="${E+3+0*T+1+X/2}" font-size="2.5" fill="#111827" text-anchor="${S}" dominant-baseline="central">${q}</text>`,u+=`<text x="${b+Q}" y="${E+3+1*T+1+X/2}" font-size="2.5" fill="#111827" text-anchor="${S}" dominant-baseline="central">${W}</text>`,u+=`<text x="${b+Q}" y="${E+3+2*T+1+X/2}" font-size="2.5" fill="#111827" text-anchor="${S}" dominant-baseline="central">${at}</text>`,u+=`<text x="${b+Q}" y="${E+3+3*T+1+X/2}" font-size="2.5" fill="#111827" text-anchor="${S}" dominant-baseline="central">${lt}</text>`,u+=`<text x="${b+Q}" y="${E+3+4*T+1+X/2}" font-size="2.5" fill="#111827" text-anchor="${S}" dominant-baseline="central">${G}</text>`}const s=90,x=40,$=h+D-10,c=w+m-10-x;u+=`<rect x="${$-s}" y="${c}" width="${s}" height="${x}" fill="none" stroke="#374151" stroke-width="0.5" />`;const A=5,e=x/A;for(let l=1;l<A;l++)u+=`<line x1="${$-s}" y1="${c+l*e}" x2="${$}" y2="${c+l*e}" stroke="#374151" stroke-width="0.5" />`;u+=`<line x1="${$-s+20}" y1="${c}" x2="${$-s+20}" y2="${c+x}" stroke="#374151" stroke-width="0.5" />`,u+=`<line x1="${$-s+55}" y1="${c}" x2="${$-s+55}" y2="${c+x}" stroke="#374151" stroke-width="0.5" />`;const r=(l,p,b)=>{u+=`<text x="${p}" y="${b}" font-size="3" fill="#111827" text-anchor="middle" dominant-baseline="central">${l}</text>`};r(t.year,$-s+10,c+4*e-e/2),r(t.constName,$-s+37.5,c+4*e-e/2),r("名称",$-s+10,c+3*e-e/2),r(t.title,$-s+37.5,c+3*e-e/2),r("施工地",$-s+10,c+2*e-e/2),r(t.location,$-s+37.5,c+2*e-e/2),r(t.project,$-s+37.5,c+1*e-e/2),r(t.office,$-s+37.5,c+0*e-e/2),r("図面番号",$-s+55+17.5,c+4*e-e/2),r(t.drawNo,$-s+55+17.5,c+3*e-e/2),r("縮尺",$-s+55+17.5,c+2*e-e/2),r(t.scaleText,$-s+55+17.5,c+1*e-e/2),a.innerHTML=u}let _=[],j=[],J=null,v=1,M=0,N=0,tt=!1,st=0,ct=0;function et(o,t=2){return Number(o).toLocaleString("en-US",{minimumFractionDigits:t,maximumFractionDigits:t})}window.onload=()=>{const o=localStorage.getItem("compassProfileData");o&&(document.getElementById("rawData").value=o,localStorage.removeItem("compassProfileData")),gt(),ht(),setTimeout(()=>Y(),100)};function gt(){const o=document.getElementById("tabPreview"),t=document.getElementById("tabTable"),a=document.getElementById("previewArea"),n=document.getElementById("tableArea");o.addEventListener("click",()=>{o.classList.replace("text-gray-500","bg-gray-200"),o.classList.add("font-semibold"),o.classList.remove("hover:bg-gray-100"),t.classList.replace("bg-gray-200","text-gray-500"),t.classList.remove("font-semibold"),t.classList.add("hover:bg-gray-100"),a.classList.remove("hidden"),n.classList.add("hidden")}),t.addEventListener("click",()=>{t.classList.replace("text-gray-500","bg-gray-200"),t.classList.add("font-semibold"),t.classList.remove("hover:bg-gray-100"),o.classList.replace("bg-gray-200","text-gray-500"),o.classList.remove("font-semibold"),o.classList.add("hover:bg-gray-100"),n.classList.remove("hidden"),a.classList.add("hidden")});const i=document.getElementById("dataModal"),f=document.getElementById("rawData");let I="";document.getElementById("btnOpenModal").addEventListener("click",()=>{I=f.value,i.classList.remove("hidden")}),document.getElementById("btnCancelModal").addEventListener("click",()=>{f.value=I,i.classList.add("hidden")}),document.getElementById("btnApplyModal").addEventListener("click",()=>{i.classList.add("hidden"),dt(),Y()}),document.getElementById("btnAddRowTable").addEventListener("click",()=>{rt(document.getElementById("editableTableBody"),{pt:"",target:"",azi:"",vAngle:"",sDist:""}),it()}),document.getElementById("btnCalc").addEventListener("click",Y),document.getElementById("btnDxf").addEventListener("click",Et),document.getElementById("baseElevation").addEventListener("change",Y),document.getElementById("scaleH").addEventListener("change",Y),document.getElementById("scaleV").addEventListener("change",Y),document.getElementById("paperSize").addEventListener("change",()=>{Y()});const g=["attrYear","attrConstName","attrTitle","attrLocation","attrProject","attrOffice","attrDrawNo","attrScaleText"];dt(),g.forEach(h=>{document.getElementById(h).addEventListener("input",Y)});const d=()=>{const h=document.getElementById("scaleH").value,w=document.getElementById("scaleV").value,D=document.getElementById("attrScaleText");h===w?D.value=`1/${Number(h).toLocaleString()}`:D.value=`横1/${Number(h).toLocaleString()} 縦1/${Number(w).toLocaleString()}`,Y()};document.getElementById("scaleH").addEventListener("change",d),document.getElementById("scaleV").addEventListener("change",d),d()}function dt(){const t=document.getElementById("rawData").value.trim().split(`
`),a=document.getElementById("editableTableBody");if(!a)return;a.innerHTML="";let n=[];for(let i=0;i<t.length;i++){const f=t[i].split("	").map(I=>I.trim());i===0&&(f[0]==="器械点"||f[0]==="測点")||f.length<2&&f.join("")===""||n.push({pt:f[0]||"",target:f[1]||"",azi:f[2]||"",vAngle:f[3]||"",sDist:f[4]||""})}n.length===0&&n.push({pt:"",target:"",azi:"",vAngle:"",sDist:""}),n.forEach((i,f)=>rt(a,i))}function it(){const o=document.getElementById("editableTableBody");if(!o)return;let t=`器械点	視準点	方位角	高低角	斜距離
`;Array.from(o.children).forEach(a=>{const n=a.querySelectorAll("input");n.length===5&&(t+=Array.from(n).map(i=>i.value).join("	")+`
`)}),document.getElementById("rawData").value=t,Y()}function xt(o,t,a){const n=Array.from(a.querySelectorAll("input")),i=n.indexOf(o.target);i!==-1&&(o.key==="ArrowRight"?i+1<n.length&&n[i+1].focus():o.key==="ArrowLeft"?i-1>=0&&n[i-1].focus():o.key==="ArrowDown"||o.key==="Enter"?i+5<n.length?n[i+5].focus():o.key==="Enter"&&(document.getElementById("btnAddRowTable").click(),setTimeout(()=>{const f=Array.from(a.querySelectorAll("input"));i+5<f.length&&f[i+5].focus()},10)):o.key==="ArrowUp"&&i-5>=0&&n[i-5].focus())}function rt(o,t,a=null){const n=document.createElement("tr");n.innerHTML=`
        <td><input type="text" value="${t.pt}"></td>
        <td><input type="text" value="${t.target}"></td>
        <td><input type="text" value="${t.azi}"></td>
        <td><input type="text" value="${t.vAngle}"></td>
        <td><input type="text" value="${t.sDist}"></td>
        <td class="w-12"><div class="flex items-center justify-center">
            <button class="text-green-500 hover:text-green-700 font-bold px-1 ins-btn cursor-pointer" title="下に挿入">+</button>
            <button class="text-red-500 hover:text-red-700 font-bold px-1 del-btn cursor-pointer" title="削除">×</button>
        </div></td>
    `,n.querySelectorAll("input").forEach(f=>{f.addEventListener("input",()=>it()),f.addEventListener("keydown",I=>xt(I,n,o))}),n.querySelector(".del-btn").addEventListener("click",()=>{n.remove(),it()}),n.querySelector(".ins-btn").addEventListener("click",()=>{rt(o,{pt:"",target:"",azi:"",vAngle:"",sDist:""},n.nextSibling),it()}),a?o.insertBefore(n,a):o.appendChild(n)}function Y(){const t=document.getElementById("rawData").value.trim().split(`
`);_=[];for(let a=0;a<t.length;a++){const n=t[a].split("	").map(i=>i.trim());n.length<5||a===0&&isNaN(parseFloat(n[2]))||_.push({pt:n[0],target:n[1]||"",azi:parseFloat(n[2])||0,vAngle:parseFloat(n[3])||0,sDist:parseFloat(n[4])||0})}_.length!==0&&(pt(),yt(),vt())}function pt(){j=[];let o=parseFloat(document.getElementById("baseElevation").value)||0,t=0,a=o;j.push({pt:_[0].pt,hDist:0,cDist:0,vDist:0,cvDist:0,grad:0,elev:o});let n=0;for(let z=0;z<_.length;z++){const F=_[z],P=F.vAngle*(Math.PI/180),y=F.sDist*Math.cos(P),L=F.sDist*Math.sin(P);t+=y,n+=L,o+=L,o<a&&(a=o);const s=y===0?0:L/y*100;j.push({pt:F.target,hDist:y,cDist:t,vDist:L,cvDist:n,grad:s,elev:o})}const i=Math.floor(a/5)*5-20,f=document.getElementById("paperSize"),I=f.options[f.selectedIndex],g=parseFloat(I.getAttribute("data-w")),d=parseFloat(I.getAttribute("data-h")),h=parseFloat(document.getElementById("scaleH").value),w=parseFloat(document.getElementById("scaleV").value),D={year:document.getElementById("attrYear").value,constName:document.getElementById("attrConstName").value,title:document.getElementById("attrTitle").value,location:document.getElementById("attrLocation").value,project:document.getElementById("attrProject").value,office:document.getElementById("attrOffice").value,drawNo:document.getElementById("attrDrawNo").value,scaleText:document.getElementById("attrScaleText").value},m=12,u=5,O=20+35+2+12,H=j[j.length-1].cDist*1e3/h,Z=O+H+20;let k=0;const V=d-30-u*m-5;j.forEach(z=>{const F=V-(z.elev-i)*1e3/w;F<k&&(k=F)});const E=Math.min(0,-20),B=Math.min(0,k-20),K=Math.max(g,Z)-E+20,R=Math.max(d,d)-B+20;J={results:j,graphElevBase:i,pw:g,ph:d,scaleH:h,scaleV:w,attrData:D,viewX:E,viewY:B,viewW:K,viewH:R}}function yt(){const o=document.getElementById("resultTableBody");o.innerHTML="",j.forEach(t=>{const a=document.createElement("tr");a.className="border-b hover:bg-gray-50",a.innerHTML=`
            <td class="p-2 border-r font-medium">${t.pt}</td>
            <td class="p-2 border-r text-right">${et(t.hDist)}</td>
            <td class="p-2 border-r text-right">${et(t.cDist)}</td>
            <td class="p-2 border-r text-right">${et(t.vDist)}</td>
            <td class="p-2 border-r text-right text-blue-600 font-bold">${et(t.elev)}</td>
            <td class="p-2 text-right">${et(t.grad,1)}</td>
        `,o.appendChild(a)})}function vt(){const o={year:document.getElementById("attrYear").value,constName:document.getElementById("attrConstName").value,title:document.getElementById("attrTitle").value,location:document.getElementById("attrLocation").value,project:document.getElementById("attrProject").value,office:document.getElementById("attrOffice").value,drawNo:document.getElementById("attrDrawNo").value,scaleText:document.getElementById("attrScaleText").value};ft(J,o,document.getElementById("previewSvg"))}function ht(){const o=document.getElementById("svgContainer");o.addEventListener("wheel",g=>{g.preventDefault();const d=1.1,h=v;g.deltaY<0?v*=d:v/=d,v=Math.max(1e-4,Math.min(v,1e4));const w=o.getBoundingClientRect(),D=g.clientX-w.left,m=g.clientY-w.top;M=D-(D-M)*(v/h),N=m-(m-N)*(v/h),nt()},{passive:!1});let t=new Map,a=0,n=1,i={x:0,y:0};o.addEventListener("pointerdown",g=>{if(t.set(g.pointerId,g),t.size===2){tt=!1;const d=Array.from(t.values());a=Math.hypot(d[0].clientX-d[1].clientX,d[0].clientY-d[1].clientY),n=v;const h=o.getBoundingClientRect();i={x:(d[0].clientX+d[1].clientX)/2-h.left,y:(d[0].clientY+d[1].clientY)/2-h.top}}else t.size===1&&(tt=!0,st=g.clientX-M,ct=g.clientY-N)}),window.addEventListener("pointermove",g=>{if(t.has(g.pointerId)&&t.set(g.pointerId,g),t.size===2){g.preventDefault();const d=Array.from(t.values()),h=Math.hypot(d[0].clientX-d[1].clientX,d[0].clientY-d[1].clientY);if(a>0){const w=v;v=n*(h/a),v=Math.max(1e-4,Math.min(v,1e4)),M=i.x-(i.x-M)*(v/w),N=i.y-(i.y-N)*(v/w),nt()}}else tt&&t.size===1&&(g.preventDefault(),M=g.clientX-st,N=g.clientY-ct,nt())},{passive:!1});const f=g=>{if(t.delete(g.pointerId),t.size<2&&(a=0),t.size===1){const d=Array.from(t.values())[0];st=d.clientX-M,ct=d.clientY-N,tt=!0}else t.size===0&&(tt=!1)};window.addEventListener("pointerup",f),window.addEventListener("pointercancel",f),window.addEventListener("pointerleave",f);const I=g=>{const d=v;v*=g,v=Math.max(1e-4,Math.min(v,1e4));const h=o.clientWidth,w=o.clientHeight,D=h/2,m=w/2;M=D-(D-M)*(v/d),N=m-(m-N)*(v/d),nt()};document.getElementById("btnZoomIn").addEventListener("click",()=>I(1.2)),document.getElementById("btnZoomOut").addEventListener("click",()=>I(1/1.2)),document.getElementById("btnFit").addEventListener("click",()=>{mt()})}function mt(){if(!J)return;const o=document.getElementById("svgContainer"),t=o.clientWidth,a=o.clientHeight;if(t===0||a===0){setTimeout(mt,100);return}const{viewW:n,viewH:i}=J,f=t/n,I=a/i;v=Math.min(f,I)*.95,(isNaN(v)||v<=0||!isFinite(v))&&(v=1),M=(t-n*v)/2,N=(a-i*v)/2,nt()}function nt(){if(isNaN(M)||isNaN(N)||isNaN(v))return;const o=document.getElementById("previewSvg");if(!o)return;const t=`translate(${Number(M).toFixed(2)}px, ${Number(N).toFixed(2)}px) scale(${Number(v).toFixed(6)})`;o.style.transform=t}function Et(){if(!J){alert("先に計算を実行してください。");return}const o={year:document.getElementById("attrYear").value,constName:document.getElementById("attrConstName").value,title:document.getElementById("attrTitle").value,location:document.getElementById("attrLocation").value,project:document.getElementById("attrProject").value,office:document.getElementById("attrOffice").value,drawNo:document.getElementById("attrDrawNo").value,scaleText:document.getElementById("attrScaleText").value},t=document.getElementById("dxfWarning");ut(J,o,bt,n=>{n?t.classList.remove("hidden"):t.classList.add("hidden")})}function bt(o,t){const a=URL.createObjectURL(o),n=document.createElement("a");n.href=a,n.download=t,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(a)}
