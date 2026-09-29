import"./modulepreload-polyfill-B5Qt9EMX.js";function mt(n,t,s,e){if(!n)return!1;const{results:i,graphElevBase:f,pw:D,ph:x,scaleH:d,scaleV:y,viewW:I,viewH:$}=n;let m="";m+=`0
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
0.0
30
0.0
`,m+=`9
$EXTMAX
10
`+I.toFixed(3)+`
20
`+$.toFixed(3)+`
30
0.0
`,m+=`9
$LIMMIN
10
0.0
20
0.0
30
0.0
`,m+=`9
$LIMMAX
10
`+D.toFixed(3)+`
20
`+x.toFixed(3)+`
30
0.0
`,m+=`0
ENDSEC
`,m+=`0
SECTION
2
ENTITIES
`;const g=(l,p,B,Y,R="0")=>{m+=`0
LINE
8
`+R+`
`,m+=`10
`+l.toFixed(3)+`
20
`+p.toFixed(3)+`
30
0.0
`,m+=`11
`+B.toFixed(3)+`
21
`+Y.toFixed(3)+`
31
0.0
`},N=(l,p,B,Y,R=0,_="TEXT",C="center")=>{m+=`0
TEXT
8
`+_+`
`,m+=`1
`+l+`
`,m+=`10
`+p.toFixed(3)+`
20
`+B.toFixed(3)+`
30
0.0
`,m+=`40
`+Y.toFixed(2)+`
`;let X=0;C==="center"?X=1:C==="right"&&(X=2),m+=`50
`+R.toFixed(2)+`
`,X>0&&(m+=`72
`+X+`
`,m+=`11
`+p.toFixed(3)+`
21
`+B.toFixed(3)+`
31
0.0
`)},nt="GRID",V=i[i.length-1].cDist*(1e3/d),q=Math.min(...i.map(l=>l.elev)),z=Math.max(...i.map(l=>l.elev));let j=Math.floor(q/5)*5,F=Math.ceil(z/5)*5;F===j&&(F+=5);for(let l=j;l<=F;l+=5){const p=(l-f)*(1e3/y);g(0,p,V,p,nt),N(l.toFixed(2),-2,p,2.5,0,"TEXT","right"),N(l.toFixed(2),V+2,p,2.5,0,"TEXT","left")}let T=0,U=(i[0].elev-f)*(1e3/y);m+=`0
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
`+T.toFixed(3)+`
20
`+U.toFixed(3)+`
30
0.0
`;for(let l=1;l<i.length;l++){const p=i[l],B=p.cDist*(1e3/d),Y=(p.elev-f)*(1e3/y);m+=`0
VERTEX
8
TERRAIN
10
`+B.toFixed(3)+`
20
`+Y.toFixed(3)+`
30
0.0
`}m+=`0
SEQEND
`;const L=-5,w=8,O=["測点","単距離","追加距離","勾配","地盤高"],P=O.length,E=L-w*P,A=20,b=-A;for(let l=0;l<=P;l++){const p=L-l*w;g(b,p,V,p,"TABLE")}for(let l=0;l<P;l++){const p=L-l*w;N(O[l],b+A/2,p-w/2-1.5,3.5,0,"TEXT","center")}for(let l=0;l<i.length;l++){const p=i[l],B=p.cDist*(1e3/d),Y=(p.elev-f)*(1e3/y);g(B,0,B,Y,"GRID_V"),g(B,L,B,E,"TABLE");const R=B,_=p.pt||l.toString(),C=l===0?"":p.hDist.toFixed(2),X=p.cDist.toFixed(2),rt=l===0?"":(p.grad>0?"+":"")+p.grad.toFixed(1)+"%",dt=p.elev.toFixed(2),J="right",K=-1;N(_,R+K,L-0*w-w/2-1.5,2.5,0,"TEXT",J),l>0&&N(C,R+K,L-1*w-w/2-1.5,2.5,0,"TEXT",J),N(X,R+K,L-2*w-w/2-1.5,2.5,0,"TEXT",J),l>0&&N(rt,R+K,L-3*w-w/2-1.5,2.5,0,"TEXT",J),N(dt,R+K,L-4*w-w/2-1.5,2.5,0,"TEXT",J)}const c=90,M=40,o=I-10,u=-($-(z-f)*(1e3/y)-40);g(o-c,u,o,u,"FRAME"),g(o-c,u+M,o,u+M,"FRAME"),g(o-c,u,o-c,u+M,"FRAME"),g(o,u,o,u+M,"FRAME");const r=5,a=M/r;for(let l=1;l<r;l++)g(o-c,u+l*a,o,u+l*a,"FRAME");g(o-c+20,u,o-c+20,u+M,"FRAME"),g(o-c+55,u,o-c+55,u+M,"FRAME");const h=(l,p,B)=>{N(l,p,B-2,3,0,"FRAME_TEXT","center")};h(t.year,o-c+10,u+4*a+a/2),h(t.constName,o-c+37.5,u+4*a+a/2),h("名称",o-c+10,u+3*a+a/2),h(t.title,o-c+37.5,u+3*a+a/2),h("施工地",o-c+10,u+2*a+a/2),h(t.location,o-c+37.5,u+2*a+a/2),h(t.project,o-c+37.5,u+1*a+a/2),h(t.office,o-c+37.5,u+0*a+a/2),h("図面番号",o-c+55+17.5,u+4*a+a/2),h(t.drawNo,o-c+55+17.5,u+3*a+a/2),h("縮尺",o-c+55+17.5,u+2*a+a/2),h(t.scaleText,o-c+55+17.5,u+1*a+a/2),m+=`0
ENDSEC
0
EOF
`;try{if(typeof Encoding>"u")throw new Error("Encoding.js is not loaded.");const l=Encoding.stringToCode(m),p=Encoding.convert(l,"SJIS","UNICODE"),B=new Uint8Array(p),Y=new Blob([B],{type:"application/dxf"});e&&e(!1),s(Y,"profile.dxf")}catch(l){console.warn("Shift-JIS conversion failed, falling back to UTF-8",l),e&&e(!0);const p=new Blob([m],{type:"application/dxf"});s(p,"profile_utf8.dxf")}return!0}function ut(n,t,s){if(!n||!s)return;const{results:e,graphElevBase:i,pw:f,ph:D,scaleH:x,scaleV:d,viewX:y,viewY:I,viewW:$,viewH:m}=n;s.setAttribute("viewBox",`${y} ${I} ${$} ${m}`),s.setAttribute("width",$),s.setAttribute("height",m);let g="<style>text { font-family: 'Inter', sans-serif; }</style>";g+=`<rect x="${y}" y="${I}" width="${$}" height="${m}" fill="#ffffff" />`;const N=e[e.length-1].cDist*(1e3/x),nt=Math.min(...e.map(r=>r.elev)),V=Math.max(...e.map(r=>r.elev));let q=Math.floor(nt/5)*5,z=Math.ceil(V/5)*5;z===q&&(z+=5);for(let r=q;r<=z;r+=5){const a=(r-i)*(1e3/d);g+=`<line x1="0" y1="${-a}" x2="${N}" y2="${-a}" stroke="#e5e7eb" stroke-width="0.5" />`,g+=`<text x="-2" y="${-a}" font-size="2.5" fill="#6b7280" text-anchor="end" dominant-baseline="middle">${r.toFixed(2)}</text>`,g+=`<text x="${N+2}" y="${-a}" font-size="2.5" fill="#6b7280" text-anchor="start" dominant-baseline="middle">${r.toFixed(2)}</text>`}let j="";for(let r=0;r<e.length;r++){const a=e[r],h=a.cDist*(1e3/x),l=(a.elev-i)*(1e3/d);j+=`${h},${-l} `}g+=`<polyline points="${j.trim()}" fill="none" stroke="#ef4444" stroke-width="1.0" />`;const F=5,T=8,U=["測点","単距離","追加距離","勾配","地盤高"],L=U.length,w=F+T*L,O=20,P=-O;for(let r=0;r<=L;r++){const a=F+r*T;g+=`<line x1="${P}" y1="${a}" x2="${N}" y2="${a}" stroke="#9ca3af" stroke-width="0.3" />`}for(let r=0;r<L;r++){const a=F+r*T;g+=`<text x="${P+O/2}" y="${a+T/2}" font-size="3" fill="#374151" text-anchor="middle" dominant-baseline="central">${U[r]}</text>`}for(let r=0;r<e.length;r++){const a=e[r],h=a.cDist*(1e3/x),l=(a.elev-i)*(1e3/d);g+=`<line x1="${h}" y1="0" x2="${h}" y2="${-l}" stroke="#d1d5db" stroke-width="0.3" stroke-dasharray="1 1" />`,g+=`<line x1="${h}" y1="${F}" x2="${h}" y2="${w}" stroke="#9ca3af" stroke-width="0.3" />`;const p=a.pt||r.toString(),B=r===0?"":a.hDist.toFixed(2),Y=a.cDist.toFixed(2),R=r===0?"":(a.grad>0?"+":"")+a.grad.toFixed(1)+"%",_=a.elev.toFixed(2),C="end",X=-1;g+=`<text x="${h+X}" y="${F+0*T+T/2}" font-size="2.5" fill="#111827" text-anchor="${C}" dominant-baseline="central">${p}</text>`,r>0&&(g+=`<text x="${h+X}" y="${F+1*T+T/2}" font-size="2.5" fill="#111827" text-anchor="${C}" dominant-baseline="central">${B}</text>`),g+=`<text x="${h+X}" y="${F+2*T+T/2}" font-size="2.5" fill="#111827" text-anchor="${C}" dominant-baseline="central">${Y}</text>`,r>0&&(g+=`<text x="${h+X}" y="${F+3*T+T/2}" font-size="2.5" fill="#111827" text-anchor="${C}" dominant-baseline="central">${R}</text>`),g+=`<text x="${h+X}" y="${F+4*T+T/2}" font-size="2.5" fill="#111827" text-anchor="${C}" dominant-baseline="central">${_}</text>`}const E=90,A=40,b=y+$-10,c=I+m-10-A;g+=`<rect x="${b-E}" y="${c}" width="${E}" height="${A}" fill="none" stroke="#374151" stroke-width="0.5" />`;const M=5,o=A/M;for(let r=1;r<M;r++)g+=`<line x1="${b-E}" y1="${c+r*o}" x2="${b}" y2="${c+r*o}" stroke="#374151" stroke-width="0.5" />`;g+=`<line x1="${b-E+20}" y1="${c}" x2="${b-E+20}" y2="${c+A}" stroke="#374151" stroke-width="0.5" />`,g+=`<line x1="${b-E+55}" y1="${c}" x2="${b-E+55}" y2="${c+A}" stroke="#374151" stroke-width="0.5" />`;const u=(r,a,h)=>{g+=`<text x="${a}" y="${h}" font-size="3" fill="#111827" text-anchor="middle" dominant-baseline="central">${r}</text>`};u(t.year,b-E+10,c+4*o-o/2),u(t.constName,b-E+37.5,c+4*o-o/2),u("名称",b-E+10,c+3*o-o/2),u(t.title,b-E+37.5,c+3*o-o/2),u("施工地",b-E+10,c+2*o-o/2),u(t.location,b-E+37.5,c+2*o-o/2),u(t.project,b-E+37.5,c+1*o-o/2),u(t.office,b-E+37.5,c+0*o-o/2),u("図面番号",b-E+55+17.5,c+4*o-o/2),u(t.drawNo,b-E+55+17.5,c+3*o-o/2),u("縮尺",b-E+55+17.5,c+2*o-o/2),u(t.scaleText,b-E+55+17.5,c+1*o-o/2),s.innerHTML=g}let G=[],W=[],Z=null,v=1,k=0,S=0,Q=!1,it=0,at=0;function tt(n,t=2){return Number(n).toLocaleString("en-US",{minimumFractionDigits:t,maximumFractionDigits:t})}window.onload=()=>{const n=localStorage.getItem("compassProfileData");n&&(document.getElementById("rawData").value=n,localStorage.removeItem("compassProfileData")),ft(),yt(),setTimeout(()=>H(),100)};function ft(){const n=document.getElementById("tabPreview"),t=document.getElementById("tabTable"),s=document.getElementById("previewArea"),e=document.getElementById("tableArea");n.addEventListener("click",()=>{n.classList.replace("text-gray-500","bg-gray-200"),n.classList.add("font-semibold"),n.classList.remove("hover:bg-gray-100"),t.classList.replace("bg-gray-200","text-gray-500"),t.classList.remove("font-semibold"),t.classList.add("hover:bg-gray-100"),s.classList.remove("hidden"),e.classList.add("hidden")}),t.addEventListener("click",()=>{t.classList.replace("text-gray-500","bg-gray-200"),t.classList.add("font-semibold"),t.classList.remove("hover:bg-gray-100"),n.classList.replace("bg-gray-200","text-gray-500"),n.classList.remove("font-semibold"),n.classList.add("hover:bg-gray-100"),e.classList.remove("hidden"),s.classList.add("hidden")});const i=document.getElementById("dataModal"),f=document.getElementById("rawData");let D="";document.getElementById("btnOpenModal").addEventListener("click",()=>{D=f.value,i.classList.remove("hidden")}),document.getElementById("btnCancelModal").addEventListener("click",()=>{f.value=D,i.classList.add("hidden")}),document.getElementById("btnApplyModal").addEventListener("click",()=>{i.classList.add("hidden"),st(),H()}),document.getElementById("btnAddRowTable").addEventListener("click",()=>{lt(document.getElementById("editableTableBody"),{pt:"",target:"",azi:"",vAngle:"",sDist:""}),ot()}),document.getElementById("btnCalc").addEventListener("click",H),document.getElementById("btnDxf").addEventListener("click",Et),document.getElementById("baseElevation").addEventListener("change",H),document.getElementById("scaleH").addEventListener("change",H),document.getElementById("scaleV").addEventListener("change",H),document.getElementById("paperSize").addEventListener("change",()=>{H()});const x=["attrYear","attrConstName","attrTitle","attrLocation","attrProject","attrOffice","attrDrawNo","attrScaleText"];st(),x.forEach(y=>{document.getElementById(y).addEventListener("input",H)});const d=()=>{const y=document.getElementById("scaleH").value,I=document.getElementById("scaleV").value,$=document.getElementById("attrScaleText");y===I?$.value=`1/${Number(y).toLocaleString()}`:$.value=`横1/${Number(y).toLocaleString()} 縦1/${Number(I).toLocaleString()}`,H()};document.getElementById("scaleH").addEventListener("change",d),document.getElementById("scaleV").addEventListener("change",d),d()}function st(){const t=document.getElementById("rawData").value.trim().split(`
`),s=document.getElementById("editableTableBody");if(!s)return;s.innerHTML="";let e=[];for(let i=0;i<t.length;i++){const f=t[i].split("	").map(D=>D.trim());i===0&&(f[0]==="器械点"||f[0]==="測点")||f.length<2&&f.join("")===""||e.push({pt:f[0]||"",target:f[1]||"",azi:f[2]||"",vAngle:f[3]||"",sDist:f[4]||""})}e.length===0&&e.push({pt:"",target:"",azi:"",vAngle:"",sDist:""}),e.forEach((i,f)=>lt(s,i))}function ot(){const n=document.getElementById("editableTableBody");if(!n)return;let t=`器械点	視準点	方位角	高低角	斜距離
`;Array.from(n.children).forEach(s=>{const e=s.querySelectorAll("input");e.length===5&&(t+=Array.from(e).map(i=>i.value).join("	")+`
`)}),document.getElementById("rawData").value=t,H()}function gt(n,t,s){const e=Array.from(s.querySelectorAll("input")),i=e.indexOf(n.target);i!==-1&&(n.key==="ArrowRight"?i+1<e.length&&e[i+1].focus():n.key==="ArrowLeft"?i-1>=0&&e[i-1].focus():n.key==="ArrowDown"||n.key==="Enter"?i+5<e.length?e[i+5].focus():n.key==="Enter"&&(document.getElementById("btnAddRowTable").click(),setTimeout(()=>{const f=Array.from(s.querySelectorAll("input"));i+5<f.length&&f[i+5].focus()},10)):n.key==="ArrowUp"&&i-5>=0&&e[i-5].focus())}function lt(n,t,s=null){const e=document.createElement("tr");e.innerHTML=`
        <td><input type="text" value="${t.pt}"></td>
        <td><input type="text" value="${t.target}"></td>
        <td><input type="text" value="${t.azi}"></td>
        <td><input type="text" value="${t.vAngle}"></td>
        <td><input type="text" value="${t.sDist}"></td>
        <td class="w-12"><div class="flex items-center justify-center">
            <button class="text-green-500 hover:text-green-700 font-bold px-1 ins-btn cursor-pointer" title="下に挿入">+</button>
            <button class="text-red-500 hover:text-red-700 font-bold px-1 del-btn cursor-pointer" title="削除">×</button>
        </div></td>
    `,e.querySelectorAll("input").forEach(f=>{f.addEventListener("input",()=>ot()),f.addEventListener("keydown",D=>gt(D,e,n))}),e.querySelector(".del-btn").addEventListener("click",()=>{e.remove(),ot()}),e.querySelector(".ins-btn").addEventListener("click",()=>{lt(n,{pt:"",target:"",azi:"",vAngle:"",sDist:""},e.nextSibling),ot()}),s?n.insertBefore(e,s):n.appendChild(e)}function H(){const t=document.getElementById("rawData").value.trim().split(`
`);G=[];for(let s=0;s<t.length;s++){const e=t[s].split("	").map(i=>i.trim());e.length<5||s===0&&isNaN(parseFloat(e[2]))||G.push({pt:e[0],target:e[1]||"",azi:parseFloat(e[2])||0,vAngle:parseFloat(e[3])||0,sDist:parseFloat(e[4])||0})}G.length!==0&&(pt(),xt(),vt())}function pt(){W=[];let n=parseFloat(document.getElementById("baseElevation").value)||0,t=0,s=n;W.push({pt:G[0].pt,hDist:0,cDist:0,vDist:0,cvDist:0,grad:0,elev:n});let e=0;for(let E=0;E<G.length;E++){const A=G[E],b=A.vAngle*(Math.PI/180),c=A.sDist*Math.cos(b),M=A.sDist*Math.sin(b);t+=c,e+=M,n+=M,n<s&&(s=n);const o=c===0?0:M/c*100;W.push({pt:A.target,hDist:c,cDist:t,vDist:M,cvDist:e,grad:o,elev:n})}const i=Math.floor(s/5)*5-20,f=document.getElementById("paperSize"),D=f.options[f.selectedIndex],x=parseFloat(D.getAttribute("data-w")),d=parseFloat(D.getAttribute("data-h")),y=parseFloat(document.getElementById("scaleH").value),I=parseFloat(document.getElementById("scaleV").value),$={year:document.getElementById("attrYear").value,constName:document.getElementById("attrConstName").value,title:document.getElementById("attrTitle").value,location:document.getElementById("attrLocation").value,project:document.getElementById("attrProject").value,office:document.getElementById("attrOffice").value,drawNo:document.getElementById("attrDrawNo").value,scaleText:document.getElementById("attrScaleText").value},m=12,g=5,z=20+35+2+12,j=W[W.length-1].cDist*1e3/y,F=z+j+20;let T=0;const U=d-30-g*m-5;W.forEach(E=>{const A=U-(E.elev-i)*1e3/I;A<T&&(T=A)});const L=Math.min(0,-20),w=Math.min(0,T-20),O=Math.max(x,F)-L+20,P=Math.max(d,d)-w+20;Z={results:W,graphElevBase:i,pw:x,ph:d,scaleH:y,scaleV:I,attrData:$,viewX:L,viewY:w,viewW:O,viewH:P}}function xt(){const n=document.getElementById("resultTableBody");n.innerHTML="",W.forEach(t=>{const s=document.createElement("tr");s.className="border-b hover:bg-gray-50",s.innerHTML=`
            <td class="p-2 border-r font-medium">${t.pt}</td>
            <td class="p-2 border-r text-right">${tt(t.hDist)}</td>
            <td class="p-2 border-r text-right">${tt(t.cDist)}</td>
            <td class="p-2 border-r text-right">${tt(t.vDist)}</td>
            <td class="p-2 border-r text-right text-blue-600 font-bold">${tt(t.elev)}</td>
            <td class="p-2 text-right">${tt(t.grad,1)}</td>
        `,n.appendChild(s)})}function vt(){const n={year:document.getElementById("attrYear").value,constName:document.getElementById("attrConstName").value,title:document.getElementById("attrTitle").value,location:document.getElementById("attrLocation").value,project:document.getElementById("attrProject").value,office:document.getElementById("attrOffice").value,drawNo:document.getElementById("attrDrawNo").value,scaleText:document.getElementById("attrScaleText").value};ut(Z,n,document.getElementById("previewSvg"))}function yt(){const n=document.getElementById("svgContainer");n.addEventListener("wheel",x=>{x.preventDefault();const d=1.1,y=v;x.deltaY<0?v*=d:v/=d,v=Math.max(1e-4,Math.min(v,1e4));const I=n.getBoundingClientRect(),$=x.clientX-I.left,m=x.clientY-I.top;k=$-($-k)*(v/y),S=m-(m-S)*(v/y),et()},{passive:!1});let t=new Map,s=0,e=1,i={x:0,y:0};n.addEventListener("pointerdown",x=>{if(t.set(x.pointerId,x),t.size===2){Q=!1;const d=Array.from(t.values());s=Math.hypot(d[0].clientX-d[1].clientX,d[0].clientY-d[1].clientY),e=v;const y=n.getBoundingClientRect();i={x:(d[0].clientX+d[1].clientX)/2-y.left,y:(d[0].clientY+d[1].clientY)/2-y.top}}else t.size===1&&(Q=!0,it=x.clientX-k,at=x.clientY-S)}),window.addEventListener("pointermove",x=>{if(t.has(x.pointerId)&&t.set(x.pointerId,x),t.size===2){x.preventDefault();const d=Array.from(t.values()),y=Math.hypot(d[0].clientX-d[1].clientX,d[0].clientY-d[1].clientY);if(s>0){const I=v;v=e*(y/s),v=Math.max(1e-4,Math.min(v,1e4)),k=i.x-(i.x-k)*(v/I),S=i.y-(i.y-S)*(v/I),et()}}else Q&&t.size===1&&(x.preventDefault(),k=x.clientX-it,S=x.clientY-at,et())},{passive:!1});const f=x=>{if(t.delete(x.pointerId),t.size<2&&(s=0),t.size===1){const d=Array.from(t.values())[0];it=d.clientX-k,at=d.clientY-S,Q=!0}else t.size===0&&(Q=!1)};window.addEventListener("pointerup",f),window.addEventListener("pointercancel",f),window.addEventListener("pointerleave",f);const D=x=>{const d=v;v*=x,v=Math.max(1e-4,Math.min(v,1e4));const y=n.clientWidth,I=n.clientHeight,$=y/2,m=I/2;k=$-($-k)*(v/d),S=m-(m-S)*(v/d),et()};document.getElementById("btnZoomIn").addEventListener("click",()=>D(1.2)),document.getElementById("btnZoomOut").addEventListener("click",()=>D(1/1.2)),document.getElementById("btnFit").addEventListener("click",()=>{ct()})}function ct(){if(!Z)return;const n=document.getElementById("svgContainer"),t=n.clientWidth,s=n.clientHeight;if(t===0||s===0){setTimeout(ct,100);return}const{viewW:e,viewH:i}=Z,f=t/e,D=s/i;v=Math.min(f,D)*.95,(isNaN(v)||v<=0||!isFinite(v))&&(v=1),k=(t-e*v)/2,S=(s-i*v)/2,et()}function et(){if(isNaN(k)||isNaN(S)||isNaN(v))return;const n=document.getElementById("svgTransformWrapper");if(!n)return;const t=`translate(${Number(k).toFixed(2)}px, ${Number(S).toFixed(2)}px) scale(${Number(v).toFixed(6)})`;n.style.transform=t}function Et(){if(!Z){alert("先に計算を実行してください。");return}const n={year:document.getElementById("attrYear").value,constName:document.getElementById("attrConstName").value,title:document.getElementById("attrTitle").value,location:document.getElementById("attrLocation").value,project:document.getElementById("attrProject").value,office:document.getElementById("attrOffice").value,drawNo:document.getElementById("attrDrawNo").value,scaleText:document.getElementById("attrScaleText").value},t=document.getElementById("dxfWarning");mt(Z,n,ht,e=>{e?t.classList.remove("hidden"):t.classList.add("hidden")})}function ht(n,t){const s=URL.createObjectURL(n),e=document.createElement("a");e.href=s,e.download=t,document.body.appendChild(e),e.click(),document.body.removeChild(e),URL.revokeObjectURL(s)}
