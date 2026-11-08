var to=Object.defineProperty;var eo=(l,s,o)=>s in l?to(l,s,{enumerable:!0,configurable:!0,writable:!0,value:o}):l[s]=o;var pe=(l,s,o)=>eo(l,typeof s!="symbol"?s+"":s,o);import"./modulepreload-polyfill-B5Qt9EMX.js";var io=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function no(l){return l&&l.__esModule&&Object.prototype.hasOwnProperty.call(l,"default")?l.default:l}var gi={exports:{}};/* @preserve
 * Leaflet 1.9.4, a JS library for interactive maps. https://leafletjs.com
 * (c) 2010-2023 Vladimir Agafonkin, (c) 2010-2011 CloudMade
 */(function(l,s){(function(o,r){r(s)})(io,function(o){var r="1.9.4";function h(t){var e,i,n,a;for(i=1,n=arguments.length;i<n;i++){a=arguments[i];for(e in a)t[e]=a[e]}return t}var u=Object.create||function(){function t(){}return function(e){return t.prototype=e,new t}}();function c(t,e){var i=Array.prototype.slice;if(t.bind)return t.bind.apply(t,i.call(arguments,1));var n=i.call(arguments,2);return function(){return t.apply(e,n.length?n.concat(i.call(arguments)):arguments)}}var f=0;function p(t){return"_leaflet_id"in t||(t._leaflet_id=++f),t._leaflet_id}function m(t,e,i){var n,a,d,_;return _=function(){n=!1,a&&(d.apply(i,a),a=!1)},d=function(){n?a=arguments:(t.apply(i,arguments),setTimeout(_,e),n=!0)},d}function g(t,e,i){var n=e[1],a=e[0],d=n-a;return t===n&&i?t:((t-a)%d+d)%d+a}function v(){return!1}function y(t,e){if(e===!1)return t;var i=Math.pow(10,e===void 0?6:e);return Math.round(t*i)/i}function M(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")}function T(t){return M(t).split(/\s+/)}function E(t,e){Object.prototype.hasOwnProperty.call(t,"options")||(t.options=t.options?u(t.options):{});for(var i in e)t.options[i]=e[i];return t.options}function I(t,e,i){var n=[];for(var a in t)n.push(encodeURIComponent(i?a.toUpperCase():a)+"="+encodeURIComponent(t[a]));return(!e||e.indexOf("?")===-1?"?":"&")+n.join("&")}var x=/\{ *([\w_ -]+) *\}/g;function S(t,e){return t.replace(x,function(i,n){var a=e[n];if(a===void 0)throw new Error("No value provided for variable "+i);return typeof a=="function"&&(a=a(e)),a})}var C=Array.isArray||function(t){return Object.prototype.toString.call(t)==="[object Array]"};function w(t,e){for(var i=0;i<t.length;i++)if(t[i]===e)return i;return-1}var A="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";function k(t){return window["webkit"+t]||window["moz"+t]||window["ms"+t]}var N=0;function B(t){var e=+new Date,i=Math.max(0,16-(e-N));return N=e+i,window.setTimeout(t,i)}var Z=window.requestAnimationFrame||k("RequestAnimationFrame")||B,U=window.cancelAnimationFrame||k("CancelAnimationFrame")||k("CancelRequestAnimationFrame")||function(t){window.clearTimeout(t)};function H(t,e,i){if(i&&Z===B)t.call(e);else return Z.call(window,c(t,e))}function K(t){t&&U.call(window,t)}var X={__proto__:null,extend:h,create:u,bind:c,get lastId(){return f},stamp:p,throttle:m,wrapNum:g,falseFn:v,formatNum:y,trim:M,splitWords:T,setOptions:E,getParamString:I,template:S,isArray:C,indexOf:w,emptyImageUrl:A,requestFn:Z,cancelFn:U,requestAnimFrame:H,cancelAnimFrame:K};function st(){}st.extend=function(t){var e=function(){E(this),this.initialize&&this.initialize.apply(this,arguments),this.callInitHooks()},i=e.__super__=this.prototype,n=u(i);n.constructor=e,e.prototype=n;for(var a in this)Object.prototype.hasOwnProperty.call(this,a)&&a!=="prototype"&&a!=="__super__"&&(e[a]=this[a]);return t.statics&&h(e,t.statics),t.includes&&(j(t.includes),h.apply(null,[n].concat(t.includes))),h(n,t),delete n.statics,delete n.includes,n.options&&(n.options=i.options?u(i.options):{},h(n.options,t.options)),n._initHooks=[],n.callInitHooks=function(){if(!this._initHooksCalled){i.callInitHooks&&i.callInitHooks.call(this),this._initHooksCalled=!0;for(var d=0,_=n._initHooks.length;d<_;d++)n._initHooks[d].call(this)}},e},st.include=function(t){var e=this.prototype.options;return h(this.prototype,t),t.options&&(this.prototype.options=e,this.mergeOptions(t.options)),this},st.mergeOptions=function(t){return h(this.prototype.options,t),this},st.addInitHook=function(t){var e=Array.prototype.slice.call(arguments,1),i=typeof t=="function"?t:function(){this[t].apply(this,e)};return this.prototype._initHooks=this.prototype._initHooks||[],this.prototype._initHooks.push(i),this};function j(t){if(!(typeof L>"u"||!L||!L.Mixin)){t=C(t)?t:[t];for(var e=0;e<t.length;e++)t[e]===L.Mixin.Events&&console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.",new Error().stack)}}var G={on:function(t,e,i){if(typeof t=="object")for(var n in t)this._on(n,t[n],e);else{t=T(t);for(var a=0,d=t.length;a<d;a++)this._on(t[a],e,i)}return this},off:function(t,e,i){if(!arguments.length)delete this._events;else if(typeof t=="object")for(var n in t)this._off(n,t[n],e);else{t=T(t);for(var a=arguments.length===1,d=0,_=t.length;d<_;d++)a?this._off(t[d]):this._off(t[d],e,i)}return this},_on:function(t,e,i,n){if(typeof e!="function"){console.warn("wrong listener type: "+typeof e);return}if(this._listens(t,e,i)===!1){i===this&&(i=void 0);var a={fn:e,ctx:i};n&&(a.once=!0),this._events=this._events||{},this._events[t]=this._events[t]||[],this._events[t].push(a)}},_off:function(t,e,i){var n,a,d;if(this._events&&(n=this._events[t],!!n)){if(arguments.length===1){if(this._firingCount)for(a=0,d=n.length;a<d;a++)n[a].fn=v;delete this._events[t];return}if(typeof e!="function"){console.warn("wrong listener type: "+typeof e);return}var _=this._listens(t,e,i);if(_!==!1){var b=n[_];this._firingCount&&(b.fn=v,this._events[t]=n=n.slice()),n.splice(_,1)}}},fire:function(t,e,i){if(!this.listens(t,i))return this;var n=h({},e,{type:t,target:this,sourceTarget:e&&e.sourceTarget||this});if(this._events){var a=this._events[t];if(a){this._firingCount=this._firingCount+1||1;for(var d=0,_=a.length;d<_;d++){var b=a[d],P=b.fn;b.once&&this.off(t,P,b.ctx),P.call(b.ctx||this,n)}this._firingCount--}}return i&&this._propagateEvent(n),this},listens:function(t,e,i,n){typeof t!="string"&&console.warn('"string" type argument expected');var a=e;typeof e!="function"&&(n=!!e,a=void 0,i=void 0);var d=this._events&&this._events[t];if(d&&d.length&&this._listens(t,a,i)!==!1)return!0;if(n){for(var _ in this._eventParents)if(this._eventParents[_].listens(t,e,i,n))return!0}return!1},_listens:function(t,e,i){if(!this._events)return!1;var n=this._events[t]||[];if(!e)return!!n.length;i===this&&(i=void 0);for(var a=0,d=n.length;a<d;a++)if(n[a].fn===e&&n[a].ctx===i)return a;return!1},once:function(t,e,i){if(typeof t=="object")for(var n in t)this._on(n,t[n],e,!0);else{t=T(t);for(var a=0,d=t.length;a<d;a++)this._on(t[a],e,i,!0)}return this},addEventParent:function(t){return this._eventParents=this._eventParents||{},this._eventParents[p(t)]=t,this},removeEventParent:function(t){return this._eventParents&&delete this._eventParents[p(t)],this},_propagateEvent:function(t){for(var e in this._eventParents)this._eventParents[e].fire(t.type,h({layer:t.target,propagatedFrom:t.target},t),!0)}};G.addEventListener=G.on,G.removeEventListener=G.clearAllEventListeners=G.off,G.addOneTimeEventListener=G.once,G.fireEvent=G.fire,G.hasEventListeners=G.listens;var at=st.extend(G);function F(t,e,i){this.x=i?Math.round(t):t,this.y=i?Math.round(e):e}var _t=Math.trunc||function(t){return t>0?Math.floor(t):Math.ceil(t)};F.prototype={clone:function(){return new F(this.x,this.y)},add:function(t){return this.clone()._add(R(t))},_add:function(t){return this.x+=t.x,this.y+=t.y,this},subtract:function(t){return this.clone()._subtract(R(t))},_subtract:function(t){return this.x-=t.x,this.y-=t.y,this},divideBy:function(t){return this.clone()._divideBy(t)},_divideBy:function(t){return this.x/=t,this.y/=t,this},multiplyBy:function(t){return this.clone()._multiplyBy(t)},_multiplyBy:function(t){return this.x*=t,this.y*=t,this},scaleBy:function(t){return new F(this.x*t.x,this.y*t.y)},unscaleBy:function(t){return new F(this.x/t.x,this.y/t.y)},round:function(){return this.clone()._round()},_round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this},floor:function(){return this.clone()._floor()},_floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this},ceil:function(){return this.clone()._ceil()},_ceil:function(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this},trunc:function(){return this.clone()._trunc()},_trunc:function(){return this.x=_t(this.x),this.y=_t(this.y),this},distanceTo:function(t){t=R(t);var e=t.x-this.x,i=t.y-this.y;return Math.sqrt(e*e+i*i)},equals:function(t){return t=R(t),t.x===this.x&&t.y===this.y},contains:function(t){return t=R(t),Math.abs(t.x)<=Math.abs(this.x)&&Math.abs(t.y)<=Math.abs(this.y)},toString:function(){return"Point("+y(this.x)+", "+y(this.y)+")"}};function R(t,e,i){return t instanceof F?t:C(t)?new F(t[0],t[1]):t==null?t:typeof t=="object"&&"x"in t&&"y"in t?new F(t.x,t.y):new F(t,e,i)}function et(t,e){if(t)for(var i=e?[t,e]:t,n=0,a=i.length;n<a;n++)this.extend(i[n])}et.prototype={extend:function(t){var e,i;if(!t)return this;if(t instanceof F||typeof t[0]=="number"||"x"in t)e=i=R(t);else if(t=dt(t),e=t.min,i=t.max,!e||!i)return this;return!this.min&&!this.max?(this.min=e.clone(),this.max=i.clone()):(this.min.x=Math.min(e.x,this.min.x),this.max.x=Math.max(i.x,this.max.x),this.min.y=Math.min(e.y,this.min.y),this.max.y=Math.max(i.y,this.max.y)),this},getCenter:function(t){return R((this.min.x+this.max.x)/2,(this.min.y+this.max.y)/2,t)},getBottomLeft:function(){return R(this.min.x,this.max.y)},getTopRight:function(){return R(this.max.x,this.min.y)},getTopLeft:function(){return this.min},getBottomRight:function(){return this.max},getSize:function(){return this.max.subtract(this.min)},contains:function(t){var e,i;return typeof t[0]=="number"||t instanceof F?t=R(t):t=dt(t),t instanceof et?(e=t.min,i=t.max):e=i=t,e.x>=this.min.x&&i.x<=this.max.x&&e.y>=this.min.y&&i.y<=this.max.y},intersects:function(t){t=dt(t);var e=this.min,i=this.max,n=t.min,a=t.max,d=a.x>=e.x&&n.x<=i.x,_=a.y>=e.y&&n.y<=i.y;return d&&_},overlaps:function(t){t=dt(t);var e=this.min,i=this.max,n=t.min,a=t.max,d=a.x>e.x&&n.x<i.x,_=a.y>e.y&&n.y<i.y;return d&&_},isValid:function(){return!!(this.min&&this.max)},pad:function(t){var e=this.min,i=this.max,n=Math.abs(e.x-i.x)*t,a=Math.abs(e.y-i.y)*t;return dt(R(e.x-n,e.y-a),R(i.x+n,i.y+a))},equals:function(t){return t?(t=dt(t),this.min.equals(t.getTopLeft())&&this.max.equals(t.getBottomRight())):!1}};function dt(t,e){return!t||t instanceof et?t:new et(t,e)}function yt(t,e){if(t)for(var i=e?[t,e]:t,n=0,a=i.length;n<a;n++)this.extend(i[n])}yt.prototype={extend:function(t){var e=this._southWest,i=this._northEast,n,a;if(t instanceof rt)n=t,a=t;else if(t instanceof yt){if(n=t._southWest,a=t._northEast,!n||!a)return this}else return t?this.extend(it(t)||ut(t)):this;return!e&&!i?(this._southWest=new rt(n.lat,n.lng),this._northEast=new rt(a.lat,a.lng)):(e.lat=Math.min(n.lat,e.lat),e.lng=Math.min(n.lng,e.lng),i.lat=Math.max(a.lat,i.lat),i.lng=Math.max(a.lng,i.lng)),this},pad:function(t){var e=this._southWest,i=this._northEast,n=Math.abs(e.lat-i.lat)*t,a=Math.abs(e.lng-i.lng)*t;return new yt(new rt(e.lat-n,e.lng-a),new rt(i.lat+n,i.lng+a))},getCenter:function(){return new rt((this._southWest.lat+this._northEast.lat)/2,(this._southWest.lng+this._northEast.lng)/2)},getSouthWest:function(){return this._southWest},getNorthEast:function(){return this._northEast},getNorthWest:function(){return new rt(this.getNorth(),this.getWest())},getSouthEast:function(){return new rt(this.getSouth(),this.getEast())},getWest:function(){return this._southWest.lng},getSouth:function(){return this._southWest.lat},getEast:function(){return this._northEast.lng},getNorth:function(){return this._northEast.lat},contains:function(t){typeof t[0]=="number"||t instanceof rt||"lat"in t?t=it(t):t=ut(t);var e=this._southWest,i=this._northEast,n,a;return t instanceof yt?(n=t.getSouthWest(),a=t.getNorthEast()):n=a=t,n.lat>=e.lat&&a.lat<=i.lat&&n.lng>=e.lng&&a.lng<=i.lng},intersects:function(t){t=ut(t);var e=this._southWest,i=this._northEast,n=t.getSouthWest(),a=t.getNorthEast(),d=a.lat>=e.lat&&n.lat<=i.lat,_=a.lng>=e.lng&&n.lng<=i.lng;return d&&_},overlaps:function(t){t=ut(t);var e=this._southWest,i=this._northEast,n=t.getSouthWest(),a=t.getNorthEast(),d=a.lat>e.lat&&n.lat<i.lat,_=a.lng>e.lng&&n.lng<i.lng;return d&&_},toBBoxString:function(){return[this.getWest(),this.getSouth(),this.getEast(),this.getNorth()].join(",")},equals:function(t,e){return t?(t=ut(t),this._southWest.equals(t.getSouthWest(),e)&&this._northEast.equals(t.getNorthEast(),e)):!1},isValid:function(){return!!(this._southWest&&this._northEast)}};function ut(t,e){return t instanceof yt?t:new yt(t,e)}function rt(t,e,i){if(isNaN(t)||isNaN(e))throw new Error("Invalid LatLng object: ("+t+", "+e+")");this.lat=+t,this.lng=+e,i!==void 0&&(this.alt=+i)}rt.prototype={equals:function(t,e){if(!t)return!1;t=it(t);var i=Math.max(Math.abs(this.lat-t.lat),Math.abs(this.lng-t.lng));return i<=(e===void 0?1e-9:e)},toString:function(t){return"LatLng("+y(this.lat,t)+", "+y(this.lng,t)+")"},distanceTo:function(t){return Nt.distance(this,it(t))},wrap:function(){return Nt.wrapLatLng(this)},toBounds:function(t){var e=180*t/40075017,i=e/Math.cos(Math.PI/180*this.lat);return ut([this.lat-e,this.lng-i],[this.lat+e,this.lng+i])},clone:function(){return new rt(this.lat,this.lng,this.alt)}};function it(t,e,i){return t instanceof rt?t:C(t)&&typeof t[0]!="object"?t.length===3?new rt(t[0],t[1],t[2]):t.length===2?new rt(t[0],t[1]):null:t==null?t:typeof t=="object"&&"lat"in t?new rt(t.lat,"lng"in t?t.lng:t.lon,t.alt):e===void 0?null:new rt(t,e,i)}var At={latLngToPoint:function(t,e){var i=this.projection.project(t),n=this.scale(e);return this.transformation._transform(i,n)},pointToLatLng:function(t,e){var i=this.scale(e),n=this.transformation.untransform(t,i);return this.projection.unproject(n)},project:function(t){return this.projection.project(t)},unproject:function(t){return this.projection.unproject(t)},scale:function(t){return 256*Math.pow(2,t)},zoom:function(t){return Math.log(t/256)/Math.LN2},getProjectedBounds:function(t){if(this.infinite)return null;var e=this.projection.bounds,i=this.scale(t),n=this.transformation.transform(e.min,i),a=this.transformation.transform(e.max,i);return new et(n,a)},infinite:!1,wrapLatLng:function(t){var e=this.wrapLng?g(t.lng,this.wrapLng,!0):t.lng,i=this.wrapLat?g(t.lat,this.wrapLat,!0):t.lat,n=t.alt;return new rt(i,e,n)},wrapLatLngBounds:function(t){var e=t.getCenter(),i=this.wrapLatLng(e),n=e.lat-i.lat,a=e.lng-i.lng;if(n===0&&a===0)return t;var d=t.getSouthWest(),_=t.getNorthEast(),b=new rt(d.lat-n,d.lng-a),P=new rt(_.lat-n,_.lng-a);return new yt(b,P)}},Nt=h({},At,{wrapLng:[-180,180],R:6371e3,distance:function(t,e){var i=Math.PI/180,n=t.lat*i,a=e.lat*i,d=Math.sin((e.lat-t.lat)*i/2),_=Math.sin((e.lng-t.lng)*i/2),b=d*d+Math.cos(n)*Math.cos(a)*_*_,P=2*Math.atan2(Math.sqrt(b),Math.sqrt(1-b));return this.R*P}}),vi=6378137,Ne={R:vi,MAX_LATITUDE:85.0511287798,project:function(t){var e=Math.PI/180,i=this.MAX_LATITUDE,n=Math.max(Math.min(i,t.lat),-i),a=Math.sin(n*e);return new F(this.R*t.lng*e,this.R*Math.log((1+a)/(1-a))/2)},unproject:function(t){var e=180/Math.PI;return new rt((2*Math.atan(Math.exp(t.y/this.R))-Math.PI/2)*e,t.x*e/this.R)},bounds:function(){var t=vi*Math.PI;return new et([-t,-t],[t,t])}()};function Be(t,e,i,n){if(C(t)){this._a=t[0],this._b=t[1],this._c=t[2],this._d=t[3];return}this._a=t,this._b=e,this._c=i,this._d=n}Be.prototype={transform:function(t,e){return this._transform(t.clone(),e)},_transform:function(t,e){return e=e||1,t.x=e*(this._a*t.x+this._b),t.y=e*(this._c*t.y+this._d),t},untransform:function(t,e){return e=e||1,new F((t.x/e-this._b)/this._a,(t.y/e-this._d)/this._c)}};function te(t,e,i,n){return new Be(t,e,i,n)}var Oe=h({},Nt,{code:"EPSG:3857",projection:Ne,transformation:function(){var t=.5/(Math.PI*Ne.R);return te(t,.5,-t,.5)}()}),An=h({},Oe,{code:"EPSG:900913"});function yi(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function xi(t,e){var i="",n,a,d,_,b,P;for(n=0,d=t.length;n<d;n++){for(b=t[n],a=0,_=b.length;a<_;a++)P=b[a],i+=(a?"L":"M")+P.x+" "+P.y;i+=e?Y.svg?"z":"x":""}return i||"M0 0"}var Fe=document.documentElement.style,ge="ActiveXObject"in window,kn=ge&&!document.addEventListener,wi="msLaunchUri"in navigator&&!("documentMode"in document),Re=Pt("webkit"),bi=Pt("android"),Li=Pt("android 2")||Pt("android 3"),In=parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1],10),Dn=bi&&Pt("Google")&&In<537&&!("AudioNode"in window),Ze=!!window.opera,Mi=!wi&&Pt("chrome"),Ti=Pt("gecko")&&!Re&&!Ze&&!ge,zn=!Mi&&Pt("safari"),Pi=Pt("phantom"),Ei="OTransition"in Fe,Nn=navigator.platform.indexOf("Win")===0,Si=ge&&"transition"in Fe,$e="WebKitCSSMatrix"in window&&"m11"in new window.WebKitCSSMatrix&&!Li,Ci="MozPerspective"in Fe,Bn=!window.L_DISABLE_3D&&(Si||$e||Ci)&&!Ei&&!Pi,ee=typeof orientation<"u"||Pt("mobile"),On=ee&&Re,Fn=ee&&$e,Ai=!window.PointerEvent&&window.MSPointerEvent,ki=!!(window.PointerEvent||Ai),Ii="ontouchstart"in window||!!window.TouchEvent,Rn=!window.L_NO_TOUCH&&(Ii||ki),Zn=ee&&Ze,$n=ee&&Ti,Yn=(window.devicePixelRatio||window.screen.deviceXDPI/window.screen.logicalXDPI)>1,Xn=function(){var t=!1;try{var e=Object.defineProperty({},"passive",{get:function(){t=!0}});window.addEventListener("testPassiveEventSupport",v,e),window.removeEventListener("testPassiveEventSupport",v,e)}catch{}return t}(),Wn=function(){return!!document.createElement("canvas").getContext}(),Ye=!!(document.createElementNS&&yi("svg").createSVGRect),Hn=!!Ye&&function(){var t=document.createElement("div");return t.innerHTML="<svg/>",(t.firstChild&&t.firstChild.namespaceURI)==="http://www.w3.org/2000/svg"}(),Gn=!Ye&&function(){try{var t=document.createElement("div");t.innerHTML='<v:shape adj="1"/>';var e=t.firstChild;return e.style.behavior="url(#default#VML)",e&&typeof e.adj=="object"}catch{return!1}}(),Un=navigator.platform.indexOf("Mac")===0,jn=navigator.platform.indexOf("Linux")===0;function Pt(t){return navigator.userAgent.toLowerCase().indexOf(t)>=0}var Y={ie:ge,ielt9:kn,edge:wi,webkit:Re,android:bi,android23:Li,androidStock:Dn,opera:Ze,chrome:Mi,gecko:Ti,safari:zn,phantom:Pi,opera12:Ei,win:Nn,ie3d:Si,webkit3d:$e,gecko3d:Ci,any3d:Bn,mobile:ee,mobileWebkit:On,mobileWebkit3d:Fn,msPointer:Ai,pointer:ki,touch:Rn,touchNative:Ii,mobileOpera:Zn,mobileGecko:$n,retina:Yn,passiveEvents:Xn,canvas:Wn,svg:Ye,vml:Gn,inlineSvg:Hn,mac:Un,linux:jn},Di=Y.msPointer?"MSPointerDown":"pointerdown",zi=Y.msPointer?"MSPointerMove":"pointermove",Ni=Y.msPointer?"MSPointerUp":"pointerup",Bi=Y.msPointer?"MSPointerCancel":"pointercancel",Xe={touchstart:Di,touchmove:zi,touchend:Ni,touchcancel:Bi},Oi={touchstart:ts,touchmove:_e,touchend:_e,touchcancel:_e},Ht={},Fi=!1;function Jn(t,e,i){return e==="touchstart"&&Qn(),Oi[e]?(i=Oi[e].bind(this,i),t.addEventListener(Xe[e],i,!1),i):(console.warn("wrong event specified:",e),v)}function Vn(t,e,i){if(!Xe[e]){console.warn("wrong event specified:",e);return}t.removeEventListener(Xe[e],i,!1)}function qn(t){Ht[t.pointerId]=t}function Kn(t){Ht[t.pointerId]&&(Ht[t.pointerId]=t)}function Ri(t){delete Ht[t.pointerId]}function Qn(){Fi||(document.addEventListener(Di,qn,!0),document.addEventListener(zi,Kn,!0),document.addEventListener(Ni,Ri,!0),document.addEventListener(Bi,Ri,!0),Fi=!0)}function _e(t,e){if(e.pointerType!==(e.MSPOINTER_TYPE_MOUSE||"mouse")){e.touches=[];for(var i in Ht)e.touches.push(Ht[i]);e.changedTouches=[e],t(e)}}function ts(t,e){e.MSPOINTER_TYPE_TOUCH&&e.pointerType===e.MSPOINTER_TYPE_TOUCH&&gt(e),_e(t,e)}function es(t){var e={},i,n;for(n in t)i=t[n],e[n]=i&&i.bind?i.bind(t):i;return t=e,e.type="dblclick",e.detail=2,e.isTrusted=!1,e._simulated=!0,e}var is=200;function ns(t,e){t.addEventListener("dblclick",e);var i=0,n;function a(d){if(d.detail!==1){n=d.detail;return}if(!(d.pointerType==="mouse"||d.sourceCapabilities&&!d.sourceCapabilities.firesTouchEvents)){var _=Wi(d);if(!(_.some(function(P){return P instanceof HTMLLabelElement&&P.attributes.for})&&!_.some(function(P){return P instanceof HTMLInputElement||P instanceof HTMLSelectElement}))){var b=Date.now();b-i<=is?(n++,n===2&&e(es(d))):n=1,i=b}}}return t.addEventListener("click",a),{dblclick:e,simDblclick:a}}function ss(t,e){t.removeEventListener("dblclick",e.dblclick),t.removeEventListener("click",e.simDblclick)}var We=xe(["transform","webkitTransform","OTransform","MozTransform","msTransform"]),ie=xe(["webkitTransition","transition","OTransition","MozTransition","msTransition"]),Zi=ie==="webkitTransition"||ie==="OTransition"?ie+"End":"transitionend";function $i(t){return typeof t=="string"?document.getElementById(t):t}function ne(t,e){var i=t.style[e]||t.currentStyle&&t.currentStyle[e];if((!i||i==="auto")&&document.defaultView){var n=document.defaultView.getComputedStyle(t,null);i=n?n[e]:null}return i==="auto"?null:i}function ot(t,e,i){var n=document.createElement(t);return n.className=e||"",i&&i.appendChild(n),n}function ht(t){var e=t.parentNode;e&&e.removeChild(t)}function ve(t){for(;t.firstChild;)t.removeChild(t.firstChild)}function Gt(t){var e=t.parentNode;e&&e.lastChild!==t&&e.appendChild(t)}function Ut(t){var e=t.parentNode;e&&e.firstChild!==t&&e.insertBefore(t,e.firstChild)}function He(t,e){if(t.classList!==void 0)return t.classList.contains(e);var i=ye(t);return i.length>0&&new RegExp("(^|\\s)"+e+"(\\s|$)").test(i)}function q(t,e){if(t.classList!==void 0)for(var i=T(e),n=0,a=i.length;n<a;n++)t.classList.add(i[n]);else if(!He(t,e)){var d=ye(t);Ge(t,(d?d+" ":"")+e)}}function ct(t,e){t.classList!==void 0?t.classList.remove(e):Ge(t,M((" "+ye(t)+" ").replace(" "+e+" "," ")))}function Ge(t,e){t.className.baseVal===void 0?t.className=e:t.className.baseVal=e}function ye(t){return t.correspondingElement&&(t=t.correspondingElement),t.className.baseVal===void 0?t.className:t.className.baseVal}function wt(t,e){"opacity"in t.style?t.style.opacity=e:"filter"in t.style&&os(t,e)}function os(t,e){var i=!1,n="DXImageTransform.Microsoft.Alpha";try{i=t.filters.item(n)}catch{if(e===1)return}e=Math.round(e*100),i?(i.Enabled=e!==100,i.Opacity=e):t.style.filter+=" progid:"+n+"(opacity="+e+")"}function xe(t){for(var e=document.documentElement.style,i=0;i<t.length;i++)if(t[i]in e)return t[i];return!1}function Rt(t,e,i){var n=e||new F(0,0);t.style[We]=(Y.ie3d?"translate("+n.x+"px,"+n.y+"px)":"translate3d("+n.x+"px,"+n.y+"px,0)")+(i?" scale("+i+")":"")}function ft(t,e){t._leaflet_pos=e,Y.any3d?Rt(t,e):(t.style.left=e.x+"px",t.style.top=e.y+"px")}function Zt(t){return t._leaflet_pos||new F(0,0)}var se,oe,Ue;if("onselectstart"in document)se=function(){J(window,"selectstart",gt)},oe=function(){lt(window,"selectstart",gt)};else{var ae=xe(["userSelect","WebkitUserSelect","OUserSelect","MozUserSelect","msUserSelect"]);se=function(){if(ae){var t=document.documentElement.style;Ue=t[ae],t[ae]="none"}},oe=function(){ae&&(document.documentElement.style[ae]=Ue,Ue=void 0)}}function je(){J(window,"dragstart",gt)}function Je(){lt(window,"dragstart",gt)}var we,Ve;function qe(t){for(;t.tabIndex===-1;)t=t.parentNode;t.style&&(be(),we=t,Ve=t.style.outlineStyle,t.style.outlineStyle="none",J(window,"keydown",be))}function be(){we&&(we.style.outlineStyle=Ve,we=void 0,Ve=void 0,lt(window,"keydown",be))}function Yi(t){do t=t.parentNode;while((!t.offsetWidth||!t.offsetHeight)&&t!==document.body);return t}function Ke(t){var e=t.getBoundingClientRect();return{x:e.width/t.offsetWidth||1,y:e.height/t.offsetHeight||1,boundingClientRect:e}}var as={__proto__:null,TRANSFORM:We,TRANSITION:ie,TRANSITION_END:Zi,get:$i,getStyle:ne,create:ot,remove:ht,empty:ve,toFront:Gt,toBack:Ut,hasClass:He,addClass:q,removeClass:ct,setClass:Ge,getClass:ye,setOpacity:wt,testProp:xe,setTransform:Rt,setPosition:ft,getPosition:Zt,get disableTextSelection(){return se},get enableTextSelection(){return oe},disableImageDrag:je,enableImageDrag:Je,preventOutline:qe,restoreOutline:be,getSizedParentNode:Yi,getScale:Ke};function J(t,e,i,n){if(e&&typeof e=="object")for(var a in e)ti(t,a,e[a],i);else{e=T(e);for(var d=0,_=e.length;d<_;d++)ti(t,e[d],i,n)}return this}var Et="_leaflet_events";function lt(t,e,i,n){if(arguments.length===1)Xi(t),delete t[Et];else if(e&&typeof e=="object")for(var a in e)ei(t,a,e[a],i);else if(e=T(e),arguments.length===2)Xi(t,function(b){return w(e,b)!==-1});else for(var d=0,_=e.length;d<_;d++)ei(t,e[d],i,n);return this}function Xi(t,e){for(var i in t[Et]){var n=i.split(/\d/)[0];(!e||e(n))&&ei(t,n,null,null,i)}}var Qe={mouseenter:"mouseover",mouseleave:"mouseout",wheel:!("onwheel"in window)&&"mousewheel"};function ti(t,e,i,n){var a=e+p(i)+(n?"_"+p(n):"");if(t[Et]&&t[Et][a])return this;var d=function(b){return i.call(n||t,b||window.event)},_=d;!Y.touchNative&&Y.pointer&&e.indexOf("touch")===0?d=Jn(t,e,d):Y.touch&&e==="dblclick"?d=ns(t,d):"addEventListener"in t?e==="touchstart"||e==="touchmove"||e==="wheel"||e==="mousewheel"?t.addEventListener(Qe[e]||e,d,Y.passiveEvents?{passive:!1}:!1):e==="mouseenter"||e==="mouseleave"?(d=function(b){b=b||window.event,ni(t,b)&&_(b)},t.addEventListener(Qe[e],d,!1)):t.addEventListener(e,_,!1):t.attachEvent("on"+e,d),t[Et]=t[Et]||{},t[Et][a]=d}function ei(t,e,i,n,a){a=a||e+p(i)+(n?"_"+p(n):"");var d=t[Et]&&t[Et][a];if(!d)return this;!Y.touchNative&&Y.pointer&&e.indexOf("touch")===0?Vn(t,e,d):Y.touch&&e==="dblclick"?ss(t,d):"removeEventListener"in t?t.removeEventListener(Qe[e]||e,d,!1):t.detachEvent("on"+e,d),t[Et][a]=null}function $t(t){return t.stopPropagation?t.stopPropagation():t.originalEvent?t.originalEvent._stopped=!0:t.cancelBubble=!0,this}function ii(t){return ti(t,"wheel",$t),this}function re(t){return J(t,"mousedown touchstart dblclick contextmenu",$t),t._leaflet_disable_click=!0,this}function gt(t){return t.preventDefault?t.preventDefault():t.returnValue=!1,this}function Yt(t){return gt(t),$t(t),this}function Wi(t){if(t.composedPath)return t.composedPath();for(var e=[],i=t.target;i;)e.push(i),i=i.parentNode;return e}function Hi(t,e){if(!e)return new F(t.clientX,t.clientY);var i=Ke(e),n=i.boundingClientRect;return new F((t.clientX-n.left)/i.x-e.clientLeft,(t.clientY-n.top)/i.y-e.clientTop)}var rs=Y.linux&&Y.chrome?window.devicePixelRatio:Y.mac?window.devicePixelRatio*3:window.devicePixelRatio>0?2*window.devicePixelRatio:1;function Gi(t){return Y.edge?t.wheelDeltaY/2:t.deltaY&&t.deltaMode===0?-t.deltaY/rs:t.deltaY&&t.deltaMode===1?-t.deltaY*20:t.deltaY&&t.deltaMode===2?-t.deltaY*60:t.deltaX||t.deltaZ?0:t.wheelDelta?(t.wheelDeltaY||t.wheelDelta)/2:t.detail&&Math.abs(t.detail)<32765?-t.detail*20:t.detail?t.detail/-32765*60:0}function ni(t,e){var i=e.relatedTarget;if(!i)return!0;try{for(;i&&i!==t;)i=i.parentNode}catch{return!1}return i!==t}var ls={__proto__:null,on:J,off:lt,stopPropagation:$t,disableScrollPropagation:ii,disableClickPropagation:re,preventDefault:gt,stop:Yt,getPropagationPath:Wi,getMousePosition:Hi,getWheelDelta:Gi,isExternalTarget:ni,addListener:J,removeListener:lt},Ui=at.extend({run:function(t,e,i,n){this.stop(),this._el=t,this._inProgress=!0,this._duration=i||.25,this._easeOutPower=1/Math.max(n||.5,.2),this._startPos=Zt(t),this._offset=e.subtract(this._startPos),this._startTime=+new Date,this.fire("start"),this._animate()},stop:function(){this._inProgress&&(this._step(!0),this._complete())},_animate:function(){this._animId=H(this._animate,this),this._step()},_step:function(t){var e=+new Date-this._startTime,i=this._duration*1e3;e<i?this._runFrame(this._easeOut(e/i),t):(this._runFrame(1),this._complete())},_runFrame:function(t,e){var i=this._startPos.add(this._offset.multiplyBy(t));e&&i._round(),ft(this._el,i),this.fire("step")},_complete:function(){K(this._animId),this._inProgress=!1,this.fire("end")},_easeOut:function(t){return 1-Math.pow(1-t,this._easeOutPower)}}),nt=at.extend({options:{crs:Oe,center:void 0,zoom:void 0,minZoom:void 0,maxZoom:void 0,layers:[],maxBounds:void 0,renderer:void 0,zoomAnimation:!0,zoomAnimationThreshold:4,fadeAnimation:!0,markerZoomAnimation:!0,transform3DLimit:8388608,zoomSnap:1,zoomDelta:1,trackResize:!0},initialize:function(t,e){e=E(this,e),this._handlers=[],this._layers={},this._zoomBoundLayers={},this._sizeChanged=!0,this._initContainer(t),this._initLayout(),this._onResize=c(this._onResize,this),this._initEvents(),e.maxBounds&&this.setMaxBounds(e.maxBounds),e.zoom!==void 0&&(this._zoom=this._limitZoom(e.zoom)),e.center&&e.zoom!==void 0&&this.setView(it(e.center),e.zoom,{reset:!0}),this.callInitHooks(),this._zoomAnimated=ie&&Y.any3d&&!Y.mobileOpera&&this.options.zoomAnimation,this._zoomAnimated&&(this._createAnimProxy(),J(this._proxy,Zi,this._catchTransitionEnd,this)),this._addLayers(this.options.layers)},setView:function(t,e,i){if(e=e===void 0?this._zoom:this._limitZoom(e),t=this._limitCenter(it(t),e,this.options.maxBounds),i=i||{},this._stop(),this._loaded&&!i.reset&&i!==!0){i.animate!==void 0&&(i.zoom=h({animate:i.animate},i.zoom),i.pan=h({animate:i.animate,duration:i.duration},i.pan));var n=this._zoom!==e?this._tryAnimatedZoom&&this._tryAnimatedZoom(t,e,i.zoom):this._tryAnimatedPan(t,i.pan);if(n)return clearTimeout(this._sizeTimer),this}return this._resetView(t,e,i.pan&&i.pan.noMoveStart),this},setZoom:function(t,e){return this._loaded?this.setView(this.getCenter(),t,{zoom:e}):(this._zoom=t,this)},zoomIn:function(t,e){return t=t||(Y.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom+t,e)},zoomOut:function(t,e){return t=t||(Y.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom-t,e)},setZoomAround:function(t,e,i){var n=this.getZoomScale(e),a=this.getSize().divideBy(2),d=t instanceof F?t:this.latLngToContainerPoint(t),_=d.subtract(a).multiplyBy(1-1/n),b=this.containerPointToLatLng(a.add(_));return this.setView(b,e,{zoom:i})},_getBoundsCenterZoom:function(t,e){e=e||{},t=t.getBounds?t.getBounds():ut(t);var i=R(e.paddingTopLeft||e.padding||[0,0]),n=R(e.paddingBottomRight||e.padding||[0,0]),a=this.getBoundsZoom(t,!1,i.add(n));if(a=typeof e.maxZoom=="number"?Math.min(e.maxZoom,a):a,a===1/0)return{center:t.getCenter(),zoom:a};var d=n.subtract(i).divideBy(2),_=this.project(t.getSouthWest(),a),b=this.project(t.getNorthEast(),a),P=this.unproject(_.add(b).divideBy(2).add(d),a);return{center:P,zoom:a}},fitBounds:function(t,e){if(t=ut(t),!t.isValid())throw new Error("Bounds are not valid.");var i=this._getBoundsCenterZoom(t,e);return this.setView(i.center,i.zoom,e)},fitWorld:function(t){return this.fitBounds([[-90,-180],[90,180]],t)},panTo:function(t,e){return this.setView(t,this._zoom,{pan:e})},panBy:function(t,e){if(t=R(t).round(),e=e||{},!t.x&&!t.y)return this.fire("moveend");if(e.animate!==!0&&!this.getSize().contains(t))return this._resetView(this.unproject(this.project(this.getCenter()).add(t)),this.getZoom()),this;if(this._panAnim||(this._panAnim=new Ui,this._panAnim.on({step:this._onPanTransitionStep,end:this._onPanTransitionEnd},this)),e.noMoveStart||this.fire("movestart"),e.animate!==!1){q(this._mapPane,"leaflet-pan-anim");var i=this._getMapPanePos().subtract(t).round();this._panAnim.run(this._mapPane,i,e.duration||.25,e.easeLinearity)}else this._rawPanBy(t),this.fire("move").fire("moveend");return this},flyTo:function(t,e,i){if(i=i||{},i.animate===!1||!Y.any3d)return this.setView(t,e,i);this._stop();var n=this.project(this.getCenter()),a=this.project(t),d=this.getSize(),_=this._zoom;t=it(t),e=e===void 0?_:e;var b=Math.max(d.x,d.y),P=b*this.getZoomScale(_,e),D=a.distanceTo(n)||1,O=1.42,W=O*O;function Q(pt){var ze=pt?-1:1,Vs=pt?P:b,qs=P*P-b*b+ze*W*W*D*D,Ks=2*Vs*W*D,pi=qs/Ks,Sn=Math.sqrt(pi*pi+1)-pi,Qs=Sn<1e-9?-18:Math.log(Sn);return Qs}function vt(pt){return(Math.exp(pt)-Math.exp(-pt))/2}function mt(pt){return(Math.exp(pt)+Math.exp(-pt))/2}function Lt(pt){return vt(pt)/mt(pt)}var xt=Q(0);function Qt(pt){return b*(mt(xt)/mt(xt+O*pt))}function Gs(pt){return b*(mt(xt)*Lt(xt+O*pt)-vt(xt))/W}function Us(pt){return 1-Math.pow(1-pt,1.5)}var js=Date.now(),Pn=(Q(1)-xt)/O,Js=i.duration?1e3*i.duration:1e3*Pn*.8;function En(){var pt=(Date.now()-js)/Js,ze=Us(pt)*Pn;pt<=1?(this._flyToFrame=H(En,this),this._move(this.unproject(n.add(a.subtract(n).multiplyBy(Gs(ze)/D)),_),this.getScaleZoom(b/Qt(ze),_),{flyTo:!0})):this._move(t,e)._moveEnd(!0)}return this._moveStart(!0,i.noMoveStart),En.call(this),this},flyToBounds:function(t,e){var i=this._getBoundsCenterZoom(t,e);return this.flyTo(i.center,i.zoom,e)},setMaxBounds:function(t){return t=ut(t),this.listens("moveend",this._panInsideMaxBounds)&&this.off("moveend",this._panInsideMaxBounds),t.isValid()?(this.options.maxBounds=t,this._loaded&&this._panInsideMaxBounds(),this.on("moveend",this._panInsideMaxBounds)):(this.options.maxBounds=null,this)},setMinZoom:function(t){var e=this.options.minZoom;return this.options.minZoom=t,this._loaded&&e!==t&&(this.fire("zoomlevelschange"),this.getZoom()<this.options.minZoom)?this.setZoom(t):this},setMaxZoom:function(t){var e=this.options.maxZoom;return this.options.maxZoom=t,this._loaded&&e!==t&&(this.fire("zoomlevelschange"),this.getZoom()>this.options.maxZoom)?this.setZoom(t):this},panInsideBounds:function(t,e){this._enforcingBounds=!0;var i=this.getCenter(),n=this._limitCenter(i,this._zoom,ut(t));return i.equals(n)||this.panTo(n,e),this._enforcingBounds=!1,this},panInside:function(t,e){e=e||{};var i=R(e.paddingTopLeft||e.padding||[0,0]),n=R(e.paddingBottomRight||e.padding||[0,0]),a=this.project(this.getCenter()),d=this.project(t),_=this.getPixelBounds(),b=dt([_.min.add(i),_.max.subtract(n)]),P=b.getSize();if(!b.contains(d)){this._enforcingBounds=!0;var D=d.subtract(b.getCenter()),O=b.extend(d).getSize().subtract(P);a.x+=D.x<0?-O.x:O.x,a.y+=D.y<0?-O.y:O.y,this.panTo(this.unproject(a),e),this._enforcingBounds=!1}return this},invalidateSize:function(t){if(!this._loaded)return this;t=h({animate:!1,pan:!0},t===!0?{animate:!0}:t);var e=this.getSize();this._sizeChanged=!0,this._lastCenter=null;var i=this.getSize(),n=e.divideBy(2).round(),a=i.divideBy(2).round(),d=n.subtract(a);return!d.x&&!d.y?this:(t.animate&&t.pan?this.panBy(d):(t.pan&&this._rawPanBy(d),this.fire("move"),t.debounceMoveend?(clearTimeout(this._sizeTimer),this._sizeTimer=setTimeout(c(this.fire,this,"moveend"),200)):this.fire("moveend")),this.fire("resize",{oldSize:e,newSize:i}))},stop:function(){return this.setZoom(this._limitZoom(this._zoom)),this.options.zoomSnap||this.fire("viewreset"),this._stop()},locate:function(t){if(t=this._locateOptions=h({timeout:1e4,watch:!1},t),!("geolocation"in navigator))return this._handleGeolocationError({code:0,message:"Geolocation not supported."}),this;var e=c(this._handleGeolocationResponse,this),i=c(this._handleGeolocationError,this);return t.watch?this._locationWatchId=navigator.geolocation.watchPosition(e,i,t):navigator.geolocation.getCurrentPosition(e,i,t),this},stopLocate:function(){return navigator.geolocation&&navigator.geolocation.clearWatch&&navigator.geolocation.clearWatch(this._locationWatchId),this._locateOptions&&(this._locateOptions.setView=!1),this},_handleGeolocationError:function(t){if(this._container._leaflet_id){var e=t.code,i=t.message||(e===1?"permission denied":e===2?"position unavailable":"timeout");this._locateOptions.setView&&!this._loaded&&this.fitWorld(),this.fire("locationerror",{code:e,message:"Geolocation error: "+i+"."})}},_handleGeolocationResponse:function(t){if(this._container._leaflet_id){var e=t.coords.latitude,i=t.coords.longitude,n=new rt(e,i),a=n.toBounds(t.coords.accuracy*2),d=this._locateOptions;if(d.setView){var _=this.getBoundsZoom(a);this.setView(n,d.maxZoom?Math.min(_,d.maxZoom):_)}var b={latlng:n,bounds:a,timestamp:t.timestamp};for(var P in t.coords)typeof t.coords[P]=="number"&&(b[P]=t.coords[P]);this.fire("locationfound",b)}},addHandler:function(t,e){if(!e)return this;var i=this[t]=new e(this);return this._handlers.push(i),this.options[t]&&i.enable(),this},remove:function(){if(this._initEvents(!0),this.options.maxBounds&&this.off("moveend",this._panInsideMaxBounds),this._containerId!==this._container._leaflet_id)throw new Error("Map container is being reused by another instance");try{delete this._container._leaflet_id,delete this._containerId}catch{this._container._leaflet_id=void 0,this._containerId=void 0}this._locationWatchId!==void 0&&this.stopLocate(),this._stop(),ht(this._mapPane),this._clearControlPos&&this._clearControlPos(),this._resizeRequest&&(K(this._resizeRequest),this._resizeRequest=null),this._clearHandlers(),this._loaded&&this.fire("unload");var t;for(t in this._layers)this._layers[t].remove();for(t in this._panes)ht(this._panes[t]);return this._layers=[],this._panes=[],delete this._mapPane,delete this._renderer,this},createPane:function(t,e){var i="leaflet-pane"+(t?" leaflet-"+t.replace("Pane","")+"-pane":""),n=ot("div",i,e||this._mapPane);return t&&(this._panes[t]=n),n},getCenter:function(){return this._checkIfLoaded(),this._lastCenter&&!this._moved()?this._lastCenter.clone():this.layerPointToLatLng(this._getCenterLayerPoint())},getZoom:function(){return this._zoom},getBounds:function(){var t=this.getPixelBounds(),e=this.unproject(t.getBottomLeft()),i=this.unproject(t.getTopRight());return new yt(e,i)},getMinZoom:function(){return this.options.minZoom===void 0?this._layersMinZoom||0:this.options.minZoom},getMaxZoom:function(){return this.options.maxZoom===void 0?this._layersMaxZoom===void 0?1/0:this._layersMaxZoom:this.options.maxZoom},getBoundsZoom:function(t,e,i){t=ut(t),i=R(i||[0,0]);var n=this.getZoom()||0,a=this.getMinZoom(),d=this.getMaxZoom(),_=t.getNorthWest(),b=t.getSouthEast(),P=this.getSize().subtract(i),D=dt(this.project(b,n),this.project(_,n)).getSize(),O=Y.any3d?this.options.zoomSnap:1,W=P.x/D.x,Q=P.y/D.y,vt=e?Math.max(W,Q):Math.min(W,Q);return n=this.getScaleZoom(vt,n),O&&(n=Math.round(n/(O/100))*(O/100),n=e?Math.ceil(n/O)*O:Math.floor(n/O)*O),Math.max(a,Math.min(d,n))},getSize:function(){return(!this._size||this._sizeChanged)&&(this._size=new F(this._container.clientWidth||0,this._container.clientHeight||0),this._sizeChanged=!1),this._size.clone()},getPixelBounds:function(t,e){var i=this._getTopLeftPoint(t,e);return new et(i,i.add(this.getSize()))},getPixelOrigin:function(){return this._checkIfLoaded(),this._pixelOrigin},getPixelWorldBounds:function(t){return this.options.crs.getProjectedBounds(t===void 0?this.getZoom():t)},getPane:function(t){return typeof t=="string"?this._panes[t]:t},getPanes:function(){return this._panes},getContainer:function(){return this._container},getZoomScale:function(t,e){var i=this.options.crs;return e=e===void 0?this._zoom:e,i.scale(t)/i.scale(e)},getScaleZoom:function(t,e){var i=this.options.crs;e=e===void 0?this._zoom:e;var n=i.zoom(t*i.scale(e));return isNaN(n)?1/0:n},project:function(t,e){return e=e===void 0?this._zoom:e,this.options.crs.latLngToPoint(it(t),e)},unproject:function(t,e){return e=e===void 0?this._zoom:e,this.options.crs.pointToLatLng(R(t),e)},layerPointToLatLng:function(t){var e=R(t).add(this.getPixelOrigin());return this.unproject(e)},latLngToLayerPoint:function(t){var e=this.project(it(t))._round();return e._subtract(this.getPixelOrigin())},wrapLatLng:function(t){return this.options.crs.wrapLatLng(it(t))},wrapLatLngBounds:function(t){return this.options.crs.wrapLatLngBounds(ut(t))},distance:function(t,e){return this.options.crs.distance(it(t),it(e))},containerPointToLayerPoint:function(t){return R(t).subtract(this._getMapPanePos())},layerPointToContainerPoint:function(t){return R(t).add(this._getMapPanePos())},containerPointToLatLng:function(t){var e=this.containerPointToLayerPoint(R(t));return this.layerPointToLatLng(e)},latLngToContainerPoint:function(t){return this.layerPointToContainerPoint(this.latLngToLayerPoint(it(t)))},mouseEventToContainerPoint:function(t){return Hi(t,this._container)},mouseEventToLayerPoint:function(t){return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(t))},mouseEventToLatLng:function(t){return this.layerPointToLatLng(this.mouseEventToLayerPoint(t))},_initContainer:function(t){var e=this._container=$i(t);if(e){if(e._leaflet_id)throw new Error("Map container is already initialized.")}else throw new Error("Map container not found.");J(e,"scroll",this._onScroll,this),this._containerId=p(e)},_initLayout:function(){var t=this._container;this._fadeAnimated=this.options.fadeAnimation&&Y.any3d,q(t,"leaflet-container"+(Y.touch?" leaflet-touch":"")+(Y.retina?" leaflet-retina":"")+(Y.ielt9?" leaflet-oldie":"")+(Y.safari?" leaflet-safari":"")+(this._fadeAnimated?" leaflet-fade-anim":""));var e=ne(t,"position");e!=="absolute"&&e!=="relative"&&e!=="fixed"&&e!=="sticky"&&(t.style.position="relative"),this._initPanes(),this._initControlPos&&this._initControlPos()},_initPanes:function(){var t=this._panes={};this._paneRenderers={},this._mapPane=this.createPane("mapPane",this._container),ft(this._mapPane,new F(0,0)),this.createPane("tilePane"),this.createPane("overlayPane"),this.createPane("shadowPane"),this.createPane("markerPane"),this.createPane("tooltipPane"),this.createPane("popupPane"),this.options.markerZoomAnimation||(q(t.markerPane,"leaflet-zoom-hide"),q(t.shadowPane,"leaflet-zoom-hide"))},_resetView:function(t,e,i){ft(this._mapPane,new F(0,0));var n=!this._loaded;this._loaded=!0,e=this._limitZoom(e),this.fire("viewprereset");var a=this._zoom!==e;this._moveStart(a,i)._move(t,e)._moveEnd(a),this.fire("viewreset"),n&&this.fire("load")},_moveStart:function(t,e){return t&&this.fire("zoomstart"),e||this.fire("movestart"),this},_move:function(t,e,i,n){e===void 0&&(e=this._zoom);var a=this._zoom!==e;return this._zoom=e,this._lastCenter=t,this._pixelOrigin=this._getNewPixelOrigin(t),n?i&&i.pinch&&this.fire("zoom",i):((a||i&&i.pinch)&&this.fire("zoom",i),this.fire("move",i)),this},_moveEnd:function(t){return t&&this.fire("zoomend"),this.fire("moveend")},_stop:function(){return K(this._flyToFrame),this._panAnim&&this._panAnim.stop(),this},_rawPanBy:function(t){ft(this._mapPane,this._getMapPanePos().subtract(t))},_getZoomSpan:function(){return this.getMaxZoom()-this.getMinZoom()},_panInsideMaxBounds:function(){this._enforcingBounds||this.panInsideBounds(this.options.maxBounds)},_checkIfLoaded:function(){if(!this._loaded)throw new Error("Set map center and zoom first.")},_initEvents:function(t){this._targets={},this._targets[p(this._container)]=this;var e=t?lt:J;e(this._container,"click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup",this._handleDOMEvent,this),this.options.trackResize&&e(window,"resize",this._onResize,this),Y.any3d&&this.options.transform3DLimit&&(t?this.off:this.on).call(this,"moveend",this._onMoveEnd)},_onResize:function(){K(this._resizeRequest),this._resizeRequest=H(function(){this.invalidateSize({debounceMoveend:!0})},this)},_onScroll:function(){this._container.scrollTop=0,this._container.scrollLeft=0},_onMoveEnd:function(){var t=this._getMapPanePos();Math.max(Math.abs(t.x),Math.abs(t.y))>=this.options.transform3DLimit&&this._resetView(this.getCenter(),this.getZoom())},_findEventTargets:function(t,e){for(var i=[],n,a=e==="mouseout"||e==="mouseover",d=t.target||t.srcElement,_=!1;d;){if(n=this._targets[p(d)],n&&(e==="click"||e==="preclick")&&this._draggableMoved(n)){_=!0;break}if(n&&n.listens(e,!0)&&(a&&!ni(d,t)||(i.push(n),a))||d===this._container)break;d=d.parentNode}return!i.length&&!_&&!a&&this.listens(e,!0)&&(i=[this]),i},_isClickDisabled:function(t){for(;t&&t!==this._container;){if(t._leaflet_disable_click)return!0;t=t.parentNode}},_handleDOMEvent:function(t){var e=t.target||t.srcElement;if(!(!this._loaded||e._leaflet_disable_events||t.type==="click"&&this._isClickDisabled(e))){var i=t.type;i==="mousedown"&&qe(e),this._fireDOMEvent(t,i)}},_mouseEvents:["click","dblclick","mouseover","mouseout","contextmenu"],_fireDOMEvent:function(t,e,i){if(t.type==="click"){var n=h({},t);n.type="preclick",this._fireDOMEvent(n,n.type,i)}var a=this._findEventTargets(t,e);if(i){for(var d=[],_=0;_<i.length;_++)i[_].listens(e,!0)&&d.push(i[_]);a=d.concat(a)}if(a.length){e==="contextmenu"&&gt(t);var b=a[0],P={originalEvent:t};if(t.type!=="keypress"&&t.type!=="keydown"&&t.type!=="keyup"){var D=b.getLatLng&&(!b._radius||b._radius<=10);P.containerPoint=D?this.latLngToContainerPoint(b.getLatLng()):this.mouseEventToContainerPoint(t),P.layerPoint=this.containerPointToLayerPoint(P.containerPoint),P.latlng=D?b.getLatLng():this.layerPointToLatLng(P.layerPoint)}for(_=0;_<a.length;_++)if(a[_].fire(e,P,!0),P.originalEvent._stopped||a[_].options.bubblingMouseEvents===!1&&w(this._mouseEvents,e)!==-1)return}},_draggableMoved:function(t){return t=t.dragging&&t.dragging.enabled()?t:this,t.dragging&&t.dragging.moved()||this.boxZoom&&this.boxZoom.moved()},_clearHandlers:function(){for(var t=0,e=this._handlers.length;t<e;t++)this._handlers[t].disable()},whenReady:function(t,e){return this._loaded?t.call(e||this,{target:this}):this.on("load",t,e),this},_getMapPanePos:function(){return Zt(this._mapPane)||new F(0,0)},_moved:function(){var t=this._getMapPanePos();return t&&!t.equals([0,0])},_getTopLeftPoint:function(t,e){var i=t&&e!==void 0?this._getNewPixelOrigin(t,e):this.getPixelOrigin();return i.subtract(this._getMapPanePos())},_getNewPixelOrigin:function(t,e){var i=this.getSize()._divideBy(2);return this.project(t,e)._subtract(i)._add(this._getMapPanePos())._round()},_latLngToNewLayerPoint:function(t,e,i){var n=this._getNewPixelOrigin(i,e);return this.project(t,e)._subtract(n)},_latLngBoundsToNewLayerBounds:function(t,e,i){var n=this._getNewPixelOrigin(i,e);return dt([this.project(t.getSouthWest(),e)._subtract(n),this.project(t.getNorthWest(),e)._subtract(n),this.project(t.getSouthEast(),e)._subtract(n),this.project(t.getNorthEast(),e)._subtract(n)])},_getCenterLayerPoint:function(){return this.containerPointToLayerPoint(this.getSize()._divideBy(2))},_getCenterOffset:function(t){return this.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint())},_limitCenter:function(t,e,i){if(!i)return t;var n=this.project(t,e),a=this.getSize().divideBy(2),d=new et(n.subtract(a),n.add(a)),_=this._getBoundsOffset(d,i,e);return Math.abs(_.x)<=1&&Math.abs(_.y)<=1?t:this.unproject(n.add(_),e)},_limitOffset:function(t,e){if(!e)return t;var i=this.getPixelBounds(),n=new et(i.min.add(t),i.max.add(t));return t.add(this._getBoundsOffset(n,e))},_getBoundsOffset:function(t,e,i){var n=dt(this.project(e.getNorthEast(),i),this.project(e.getSouthWest(),i)),a=n.min.subtract(t.min),d=n.max.subtract(t.max),_=this._rebound(a.x,-d.x),b=this._rebound(a.y,-d.y);return new F(_,b)},_rebound:function(t,e){return t+e>0?Math.round(t-e)/2:Math.max(0,Math.ceil(t))-Math.max(0,Math.floor(e))},_limitZoom:function(t){var e=this.getMinZoom(),i=this.getMaxZoom(),n=Y.any3d?this.options.zoomSnap:1;return n&&(t=Math.round(t/n)*n),Math.max(e,Math.min(i,t))},_onPanTransitionStep:function(){this.fire("move")},_onPanTransitionEnd:function(){ct(this._mapPane,"leaflet-pan-anim"),this.fire("moveend")},_tryAnimatedPan:function(t,e){var i=this._getCenterOffset(t)._trunc();return(e&&e.animate)!==!0&&!this.getSize().contains(i)?!1:(this.panBy(i,e),!0)},_createAnimProxy:function(){var t=this._proxy=ot("div","leaflet-proxy leaflet-zoom-animated");this._panes.mapPane.appendChild(t),this.on("zoomanim",function(e){var i=We,n=this._proxy.style[i];Rt(this._proxy,this.project(e.center,e.zoom),this.getZoomScale(e.zoom,1)),n===this._proxy.style[i]&&this._animatingZoom&&this._onZoomTransitionEnd()},this),this.on("load moveend",this._animMoveEnd,this),this._on("unload",this._destroyAnimProxy,this)},_destroyAnimProxy:function(){ht(this._proxy),this.off("load moveend",this._animMoveEnd,this),delete this._proxy},_animMoveEnd:function(){var t=this.getCenter(),e=this.getZoom();Rt(this._proxy,this.project(t,e),this.getZoomScale(e,1))},_catchTransitionEnd:function(t){this._animatingZoom&&t.propertyName.indexOf("transform")>=0&&this._onZoomTransitionEnd()},_nothingToAnimate:function(){return!this._container.getElementsByClassName("leaflet-zoom-animated").length},_tryAnimatedZoom:function(t,e,i){if(this._animatingZoom)return!0;if(i=i||{},!this._zoomAnimated||i.animate===!1||this._nothingToAnimate()||Math.abs(e-this._zoom)>this.options.zoomAnimationThreshold)return!1;var n=this.getZoomScale(e),a=this._getCenterOffset(t)._divideBy(1-1/n);return i.animate!==!0&&!this.getSize().contains(a)?!1:(H(function(){this._moveStart(!0,i.noMoveStart||!1)._animateZoom(t,e,!0)},this),!0)},_animateZoom:function(t,e,i,n){this._mapPane&&(i&&(this._animatingZoom=!0,this._animateToCenter=t,this._animateToZoom=e,q(this._mapPane,"leaflet-zoom-anim")),this.fire("zoomanim",{center:t,zoom:e,noUpdate:n}),this._tempFireZoomEvent||(this._tempFireZoomEvent=this._zoom!==this._animateToZoom),this._move(this._animateToCenter,this._animateToZoom,void 0,!0),setTimeout(c(this._onZoomTransitionEnd,this),250))},_onZoomTransitionEnd:function(){this._animatingZoom&&(this._mapPane&&ct(this._mapPane,"leaflet-zoom-anim"),this._animatingZoom=!1,this._move(this._animateToCenter,this._animateToZoom,void 0,!0),this._tempFireZoomEvent&&this.fire("zoom"),delete this._tempFireZoomEvent,this.fire("move"),this._moveEnd(!0))}});function hs(t,e){return new nt(t,e)}var Mt=st.extend({options:{position:"topright"},initialize:function(t){E(this,t)},getPosition:function(){return this.options.position},setPosition:function(t){var e=this._map;return e&&e.removeControl(this),this.options.position=t,e&&e.addControl(this),this},getContainer:function(){return this._container},addTo:function(t){this.remove(),this._map=t;var e=this._container=this.onAdd(t),i=this.getPosition(),n=t._controlCorners[i];return q(e,"leaflet-control"),i.indexOf("bottom")!==-1?n.insertBefore(e,n.firstChild):n.appendChild(e),this._map.on("unload",this.remove,this),this},remove:function(){return this._map?(ht(this._container),this.onRemove&&this.onRemove(this._map),this._map.off("unload",this.remove,this),this._map=null,this):this},_refocusOnMap:function(t){this._map&&t&&t.screenX>0&&t.screenY>0&&this._map.getContainer().focus()}}),le=function(t){return new Mt(t)};nt.include({addControl:function(t){return t.addTo(this),this},removeControl:function(t){return t.remove(),this},_initControlPos:function(){var t=this._controlCorners={},e="leaflet-",i=this._controlContainer=ot("div",e+"control-container",this._container);function n(a,d){var _=e+a+" "+e+d;t[a+d]=ot("div",_,i)}n("top","left"),n("top","right"),n("bottom","left"),n("bottom","right")},_clearControlPos:function(){for(var t in this._controlCorners)ht(this._controlCorners[t]);ht(this._controlContainer),delete this._controlCorners,delete this._controlContainer}});var ji=Mt.extend({options:{collapsed:!0,position:"topright",autoZIndex:!0,hideSingleBase:!1,sortLayers:!1,sortFunction:function(t,e,i,n){return i<n?-1:n<i?1:0}},initialize:function(t,e,i){E(this,i),this._layerControlInputs=[],this._layers=[],this._lastZIndex=0,this._handlingClick=!1,this._preventClick=!1;for(var n in t)this._addLayer(t[n],n);for(n in e)this._addLayer(e[n],n,!0)},onAdd:function(t){this._initLayout(),this._update(),this._map=t,t.on("zoomend",this._checkDisabledLayers,this);for(var e=0;e<this._layers.length;e++)this._layers[e].layer.on("add remove",this._onLayerChange,this);return this._container},addTo:function(t){return Mt.prototype.addTo.call(this,t),this._expandIfNotCollapsed()},onRemove:function(){this._map.off("zoomend",this._checkDisabledLayers,this);for(var t=0;t<this._layers.length;t++)this._layers[t].layer.off("add remove",this._onLayerChange,this)},addBaseLayer:function(t,e){return this._addLayer(t,e),this._map?this._update():this},addOverlay:function(t,e){return this._addLayer(t,e,!0),this._map?this._update():this},removeLayer:function(t){t.off("add remove",this._onLayerChange,this);var e=this._getLayer(p(t));return e&&this._layers.splice(this._layers.indexOf(e),1),this._map?this._update():this},expand:function(){q(this._container,"leaflet-control-layers-expanded"),this._section.style.height=null;var t=this._map.getSize().y-(this._container.offsetTop+50);return t<this._section.clientHeight?(q(this._section,"leaflet-control-layers-scrollbar"),this._section.style.height=t+"px"):ct(this._section,"leaflet-control-layers-scrollbar"),this._checkDisabledLayers(),this},collapse:function(){return ct(this._container,"leaflet-control-layers-expanded"),this},_initLayout:function(){var t="leaflet-control-layers",e=this._container=ot("div",t),i=this.options.collapsed;e.setAttribute("aria-haspopup",!0),re(e),ii(e);var n=this._section=ot("section",t+"-list");i&&(this._map.on("click",this.collapse,this),J(e,{mouseenter:this._expandSafely,mouseleave:this.collapse},this));var a=this._layersLink=ot("a",t+"-toggle",e);a.href="#",a.title="Layers",a.setAttribute("role","button"),J(a,{keydown:function(d){d.keyCode===13&&this._expandSafely()},click:function(d){gt(d),this._expandSafely()}},this),i||this.expand(),this._baseLayersList=ot("div",t+"-base",n),this._separator=ot("div",t+"-separator",n),this._overlaysList=ot("div",t+"-overlays",n),e.appendChild(n)},_getLayer:function(t){for(var e=0;e<this._layers.length;e++)if(this._layers[e]&&p(this._layers[e].layer)===t)return this._layers[e]},_addLayer:function(t,e,i){this._map&&t.on("add remove",this._onLayerChange,this),this._layers.push({layer:t,name:e,overlay:i}),this.options.sortLayers&&this._layers.sort(c(function(n,a){return this.options.sortFunction(n.layer,a.layer,n.name,a.name)},this)),this.options.autoZIndex&&t.setZIndex&&(this._lastZIndex++,t.setZIndex(this._lastZIndex)),this._expandIfNotCollapsed()},_update:function(){if(!this._container)return this;ve(this._baseLayersList),ve(this._overlaysList),this._layerControlInputs=[];var t,e,i,n,a=0;for(i=0;i<this._layers.length;i++)n=this._layers[i],this._addItem(n),e=e||n.overlay,t=t||!n.overlay,a+=n.overlay?0:1;return this.options.hideSingleBase&&(t=t&&a>1,this._baseLayersList.style.display=t?"":"none"),this._separator.style.display=e&&t?"":"none",this},_onLayerChange:function(t){this._handlingClick||this._update();var e=this._getLayer(p(t.target)),i=e.overlay?t.type==="add"?"overlayadd":"overlayremove":t.type==="add"?"baselayerchange":null;i&&this._map.fire(i,e)},_createRadioElement:function(t,e){var i='<input type="radio" class="leaflet-control-layers-selector" name="'+t+'"'+(e?' checked="checked"':"")+"/>",n=document.createElement("div");return n.innerHTML=i,n.firstChild},_addItem:function(t){var e=document.createElement("label"),i=this._map.hasLayer(t.layer),n;t.overlay?(n=document.createElement("input"),n.type="checkbox",n.className="leaflet-control-layers-selector",n.defaultChecked=i):n=this._createRadioElement("leaflet-base-layers_"+p(this),i),this._layerControlInputs.push(n),n.layerId=p(t.layer),J(n,"click",this._onInputClick,this);var a=document.createElement("span");a.innerHTML=" "+t.name;var d=document.createElement("span");e.appendChild(d),d.appendChild(n),d.appendChild(a);var _=t.overlay?this._overlaysList:this._baseLayersList;return _.appendChild(e),this._checkDisabledLayers(),e},_onInputClick:function(){if(!this._preventClick){var t=this._layerControlInputs,e,i,n=[],a=[];this._handlingClick=!0;for(var d=t.length-1;d>=0;d--)e=t[d],i=this._getLayer(e.layerId).layer,e.checked?n.push(i):e.checked||a.push(i);for(d=0;d<a.length;d++)this._map.hasLayer(a[d])&&this._map.removeLayer(a[d]);for(d=0;d<n.length;d++)this._map.hasLayer(n[d])||this._map.addLayer(n[d]);this._handlingClick=!1,this._refocusOnMap()}},_checkDisabledLayers:function(){for(var t=this._layerControlInputs,e,i,n=this._map.getZoom(),a=t.length-1;a>=0;a--)e=t[a],i=this._getLayer(e.layerId).layer,e.disabled=i.options.minZoom!==void 0&&n<i.options.minZoom||i.options.maxZoom!==void 0&&n>i.options.maxZoom},_expandIfNotCollapsed:function(){return this._map&&!this.options.collapsed&&this.expand(),this},_expandSafely:function(){var t=this._section;this._preventClick=!0,J(t,"click",gt),this.expand();var e=this;setTimeout(function(){lt(t,"click",gt),e._preventClick=!1})}}),cs=function(t,e,i){return new ji(t,e,i)},si=Mt.extend({options:{position:"topleft",zoomInText:'<span aria-hidden="true">+</span>',zoomInTitle:"Zoom in",zoomOutText:'<span aria-hidden="true">&#x2212;</span>',zoomOutTitle:"Zoom out"},onAdd:function(t){var e="leaflet-control-zoom",i=ot("div",e+" leaflet-bar"),n=this.options;return this._zoomInButton=this._createButton(n.zoomInText,n.zoomInTitle,e+"-in",i,this._zoomIn),this._zoomOutButton=this._createButton(n.zoomOutText,n.zoomOutTitle,e+"-out",i,this._zoomOut),this._updateDisabled(),t.on("zoomend zoomlevelschange",this._updateDisabled,this),i},onRemove:function(t){t.off("zoomend zoomlevelschange",this._updateDisabled,this)},disable:function(){return this._disabled=!0,this._updateDisabled(),this},enable:function(){return this._disabled=!1,this._updateDisabled(),this},_zoomIn:function(t){!this._disabled&&this._map._zoom<this._map.getMaxZoom()&&this._map.zoomIn(this._map.options.zoomDelta*(t.shiftKey?3:1))},_zoomOut:function(t){!this._disabled&&this._map._zoom>this._map.getMinZoom()&&this._map.zoomOut(this._map.options.zoomDelta*(t.shiftKey?3:1))},_createButton:function(t,e,i,n,a){var d=ot("a",i,n);return d.innerHTML=t,d.href="#",d.title=e,d.setAttribute("role","button"),d.setAttribute("aria-label",e),re(d),J(d,"click",Yt),J(d,"click",a,this),J(d,"click",this._refocusOnMap,this),d},_updateDisabled:function(){var t=this._map,e="leaflet-disabled";ct(this._zoomInButton,e),ct(this._zoomOutButton,e),this._zoomInButton.setAttribute("aria-disabled","false"),this._zoomOutButton.setAttribute("aria-disabled","false"),(this._disabled||t._zoom===t.getMinZoom())&&(q(this._zoomOutButton,e),this._zoomOutButton.setAttribute("aria-disabled","true")),(this._disabled||t._zoom===t.getMaxZoom())&&(q(this._zoomInButton,e),this._zoomInButton.setAttribute("aria-disabled","true"))}});nt.mergeOptions({zoomControl:!0}),nt.addInitHook(function(){this.options.zoomControl&&(this.zoomControl=new si,this.addControl(this.zoomControl))});var ds=function(t){return new si(t)},Ji=Mt.extend({options:{position:"bottomleft",maxWidth:100,metric:!0,imperial:!0},onAdd:function(t){var e="leaflet-control-scale",i=ot("div",e),n=this.options;return this._addScales(n,e+"-line",i),t.on(n.updateWhenIdle?"moveend":"move",this._update,this),t.whenReady(this._update,this),i},onRemove:function(t){t.off(this.options.updateWhenIdle?"moveend":"move",this._update,this)},_addScales:function(t,e,i){t.metric&&(this._mScale=ot("div",e,i)),t.imperial&&(this._iScale=ot("div",e,i))},_update:function(){var t=this._map,e=t.getSize().y/2,i=t.distance(t.containerPointToLatLng([0,e]),t.containerPointToLatLng([this.options.maxWidth,e]));this._updateScales(i)},_updateScales:function(t){this.options.metric&&t&&this._updateMetric(t),this.options.imperial&&t&&this._updateImperial(t)},_updateMetric:function(t){var e=this._getRoundNum(t),i=e<1e3?e+" m":e/1e3+" km";this._updateScale(this._mScale,i,e/t)},_updateImperial:function(t){var e=t*3.2808399,i,n,a;e>5280?(i=e/5280,n=this._getRoundNum(i),this._updateScale(this._iScale,n+" mi",n/i)):(a=this._getRoundNum(e),this._updateScale(this._iScale,a+" ft",a/e))},_updateScale:function(t,e,i){t.style.width=Math.round(this.options.maxWidth*i)+"px",t.innerHTML=e},_getRoundNum:function(t){var e=Math.pow(10,(Math.floor(t)+"").length-1),i=t/e;return i=i>=10?10:i>=5?5:i>=3?3:i>=2?2:1,e*i}}),us=function(t){return new Ji(t)},fs='<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>',oi=Mt.extend({options:{position:"bottomright",prefix:'<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">'+(Y.inlineSvg?fs+" ":"")+"Leaflet</a>"},initialize:function(t){E(this,t),this._attributions={}},onAdd:function(t){t.attributionControl=this,this._container=ot("div","leaflet-control-attribution"),re(this._container);for(var e in t._layers)t._layers[e].getAttribution&&this.addAttribution(t._layers[e].getAttribution());return this._update(),t.on("layeradd",this._addAttribution,this),this._container},onRemove:function(t){t.off("layeradd",this._addAttribution,this)},_addAttribution:function(t){t.layer.getAttribution&&(this.addAttribution(t.layer.getAttribution()),t.layer.once("remove",function(){this.removeAttribution(t.layer.getAttribution())},this))},setPrefix:function(t){return this.options.prefix=t,this._update(),this},addAttribution:function(t){return t?(this._attributions[t]||(this._attributions[t]=0),this._attributions[t]++,this._update(),this):this},removeAttribution:function(t){return t?(this._attributions[t]&&(this._attributions[t]--,this._update()),this):this},_update:function(){if(this._map){var t=[];for(var e in this._attributions)this._attributions[e]&&t.push(e);var i=[];this.options.prefix&&i.push(this.options.prefix),t.length&&i.push(t.join(", ")),this._container.innerHTML=i.join(' <span aria-hidden="true">|</span> ')}}});nt.mergeOptions({attributionControl:!0}),nt.addInitHook(function(){this.options.attributionControl&&new oi().addTo(this)});var ps=function(t){return new oi(t)};Mt.Layers=ji,Mt.Zoom=si,Mt.Scale=Ji,Mt.Attribution=oi,le.layers=cs,le.zoom=ds,le.scale=us,le.attribution=ps;var St=st.extend({initialize:function(t){this._map=t},enable:function(){return this._enabled?this:(this._enabled=!0,this.addHooks(),this)},disable:function(){return this._enabled?(this._enabled=!1,this.removeHooks(),this):this},enabled:function(){return!!this._enabled}});St.addTo=function(t,e){return t.addHandler(e,this),this};var ms={Events:G},Vi=Y.touch?"touchstart mousedown":"mousedown",Bt=at.extend({options:{clickTolerance:3},initialize:function(t,e,i,n){E(this,n),this._element=t,this._dragStartTarget=e||t,this._preventOutline=i},enable:function(){this._enabled||(J(this._dragStartTarget,Vi,this._onDown,this),this._enabled=!0)},disable:function(){this._enabled&&(Bt._dragging===this&&this.finishDrag(!0),lt(this._dragStartTarget,Vi,this._onDown,this),this._enabled=!1,this._moved=!1)},_onDown:function(t){if(this._enabled&&(this._moved=!1,!He(this._element,"leaflet-zoom-anim"))){if(t.touches&&t.touches.length!==1){Bt._dragging===this&&this.finishDrag();return}if(!(Bt._dragging||t.shiftKey||t.which!==1&&t.button!==1&&!t.touches)&&(Bt._dragging=this,this._preventOutline&&qe(this._element),je(),se(),!this._moving)){this.fire("down");var e=t.touches?t.touches[0]:t,i=Yi(this._element);this._startPoint=new F(e.clientX,e.clientY),this._startPos=Zt(this._element),this._parentScale=Ke(i);var n=t.type==="mousedown";J(document,n?"mousemove":"touchmove",this._onMove,this),J(document,n?"mouseup":"touchend touchcancel",this._onUp,this)}}},_onMove:function(t){if(this._enabled){if(t.touches&&t.touches.length>1){this._moved=!0;return}var e=t.touches&&t.touches.length===1?t.touches[0]:t,i=new F(e.clientX,e.clientY)._subtract(this._startPoint);!i.x&&!i.y||Math.abs(i.x)+Math.abs(i.y)<this.options.clickTolerance||(i.x/=this._parentScale.x,i.y/=this._parentScale.y,gt(t),this._moved||(this.fire("dragstart"),this._moved=!0,q(document.body,"leaflet-dragging"),this._lastTarget=t.target||t.srcElement,window.SVGElementInstance&&this._lastTarget instanceof window.SVGElementInstance&&(this._lastTarget=this._lastTarget.correspondingUseElement),q(this._lastTarget,"leaflet-drag-target")),this._newPos=this._startPos.add(i),this._moving=!0,this._lastEvent=t,this._updatePosition())}},_updatePosition:function(){var t={originalEvent:this._lastEvent};this.fire("predrag",t),ft(this._element,this._newPos),this.fire("drag",t)},_onUp:function(){this._enabled&&this.finishDrag()},finishDrag:function(t){ct(document.body,"leaflet-dragging"),this._lastTarget&&(ct(this._lastTarget,"leaflet-drag-target"),this._lastTarget=null),lt(document,"mousemove touchmove",this._onMove,this),lt(document,"mouseup touchend touchcancel",this._onUp,this),Je(),oe();var e=this._moved&&this._moving;this._moving=!1,Bt._dragging=!1,e&&this.fire("dragend",{noInertia:t,distance:this._newPos.distanceTo(this._startPos)})}});function qi(t,e,i){var n,a=[1,4,2,8],d,_,b,P,D,O,W,Q;for(d=0,O=t.length;d<O;d++)t[d]._code=Xt(t[d],e);for(b=0;b<4;b++){for(W=a[b],n=[],d=0,O=t.length,_=O-1;d<O;_=d++)P=t[d],D=t[_],P._code&W?D._code&W||(Q=Le(D,P,W,e,i),Q._code=Xt(Q,e),n.push(Q)):(D._code&W&&(Q=Le(D,P,W,e,i),Q._code=Xt(Q,e),n.push(Q)),n.push(P));t=n}return t}function Ki(t,e){var i,n,a,d,_,b,P,D,O;if(!t||t.length===0)throw new Error("latlngs not passed");bt(t)||(console.warn("latlngs are not flat! Only the first ring will be used"),t=t[0]);var W=it([0,0]),Q=ut(t),vt=Q.getNorthWest().distanceTo(Q.getSouthWest())*Q.getNorthEast().distanceTo(Q.getNorthWest());vt<1700&&(W=ai(t));var mt=t.length,Lt=[];for(i=0;i<mt;i++){var xt=it(t[i]);Lt.push(e.project(it([xt.lat-W.lat,xt.lng-W.lng])))}for(b=P=D=0,i=0,n=mt-1;i<mt;n=i++)a=Lt[i],d=Lt[n],_=a.y*d.x-d.y*a.x,P+=(a.x+d.x)*_,D+=(a.y+d.y)*_,b+=_*3;b===0?O=Lt[0]:O=[P/b,D/b];var Qt=e.unproject(R(O));return it([Qt.lat+W.lat,Qt.lng+W.lng])}function ai(t){for(var e=0,i=0,n=0,a=0;a<t.length;a++){var d=it(t[a]);e+=d.lat,i+=d.lng,n++}return it([e/n,i/n])}var gs={__proto__:null,clipPolygon:qi,polygonCenter:Ki,centroid:ai};function Qi(t,e){if(!e||!t.length)return t.slice();var i=e*e;return t=ys(t,i),t=vs(t,i),t}function tn(t,e,i){return Math.sqrt(he(t,e,i,!0))}function _s(t,e,i){return he(t,e,i)}function vs(t,e){var i=t.length,n=typeof Uint8Array<"u"?Uint8Array:Array,a=new n(i);a[0]=a[i-1]=1,ri(t,a,e,0,i-1);var d,_=[];for(d=0;d<i;d++)a[d]&&_.push(t[d]);return _}function ri(t,e,i,n,a){var d=0,_,b,P;for(b=n+1;b<=a-1;b++)P=he(t[b],t[n],t[a],!0),P>d&&(_=b,d=P);d>i&&(e[_]=1,ri(t,e,i,n,_),ri(t,e,i,_,a))}function ys(t,e){for(var i=[t[0]],n=1,a=0,d=t.length;n<d;n++)xs(t[n],t[a])>e&&(i.push(t[n]),a=n);return a<d-1&&i.push(t[d-1]),i}var en;function nn(t,e,i,n,a){var d=n?en:Xt(t,i),_=Xt(e,i),b,P,D;for(en=_;;){if(!(d|_))return[t,e];if(d&_)return!1;b=d||_,P=Le(t,e,b,i,a),D=Xt(P,i),b===d?(t=P,d=D):(e=P,_=D)}}function Le(t,e,i,n,a){var d=e.x-t.x,_=e.y-t.y,b=n.min,P=n.max,D,O;return i&8?(D=t.x+d*(P.y-t.y)/_,O=P.y):i&4?(D=t.x+d*(b.y-t.y)/_,O=b.y):i&2?(D=P.x,O=t.y+_*(P.x-t.x)/d):i&1&&(D=b.x,O=t.y+_*(b.x-t.x)/d),new F(D,O,a)}function Xt(t,e){var i=0;return t.x<e.min.x?i|=1:t.x>e.max.x&&(i|=2),t.y<e.min.y?i|=4:t.y>e.max.y&&(i|=8),i}function xs(t,e){var i=e.x-t.x,n=e.y-t.y;return i*i+n*n}function he(t,e,i,n){var a=e.x,d=e.y,_=i.x-a,b=i.y-d,P=_*_+b*b,D;return P>0&&(D=((t.x-a)*_+(t.y-d)*b)/P,D>1?(a=i.x,d=i.y):D>0&&(a+=_*D,d+=b*D)),_=t.x-a,b=t.y-d,n?_*_+b*b:new F(a,d)}function bt(t){return!C(t[0])||typeof t[0][0]!="object"&&typeof t[0][0]<"u"}function sn(t){return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."),bt(t)}function on(t,e){var i,n,a,d,_,b,P,D;if(!t||t.length===0)throw new Error("latlngs not passed");bt(t)||(console.warn("latlngs are not flat! Only the first ring will be used"),t=t[0]);var O=it([0,0]),W=ut(t),Q=W.getNorthWest().distanceTo(W.getSouthWest())*W.getNorthEast().distanceTo(W.getNorthWest());Q<1700&&(O=ai(t));var vt=t.length,mt=[];for(i=0;i<vt;i++){var Lt=it(t[i]);mt.push(e.project(it([Lt.lat-O.lat,Lt.lng-O.lng])))}for(i=0,n=0;i<vt-1;i++)n+=mt[i].distanceTo(mt[i+1])/2;if(n===0)D=mt[0];else for(i=0,d=0;i<vt-1;i++)if(_=mt[i],b=mt[i+1],a=_.distanceTo(b),d+=a,d>n){P=(d-n)/a,D=[b.x-P*(b.x-_.x),b.y-P*(b.y-_.y)];break}var xt=e.unproject(R(D));return it([xt.lat+O.lat,xt.lng+O.lng])}var ws={__proto__:null,simplify:Qi,pointToSegmentDistance:tn,closestPointOnSegment:_s,clipSegment:nn,_getEdgeIntersection:Le,_getBitCode:Xt,_sqClosestPointOnSegment:he,isFlat:bt,_flat:sn,polylineCenter:on},li={project:function(t){return new F(t.lng,t.lat)},unproject:function(t){return new rt(t.y,t.x)},bounds:new et([-180,-90],[180,90])},hi={R:6378137,R_MINOR:6356752314245179e-9,bounds:new et([-2003750834279e-5,-1549657073972e-5],[2003750834279e-5,1876465623138e-5]),project:function(t){var e=Math.PI/180,i=this.R,n=t.lat*e,a=this.R_MINOR/i,d=Math.sqrt(1-a*a),_=d*Math.sin(n),b=Math.tan(Math.PI/4-n/2)/Math.pow((1-_)/(1+_),d/2);return n=-i*Math.log(Math.max(b,1e-10)),new F(t.lng*e*i,n)},unproject:function(t){for(var e=180/Math.PI,i=this.R,n=this.R_MINOR/i,a=Math.sqrt(1-n*n),d=Math.exp(-t.y/i),_=Math.PI/2-2*Math.atan(d),b=0,P=.1,D;b<15&&Math.abs(P)>1e-7;b++)D=a*Math.sin(_),D=Math.pow((1-D)/(1+D),a/2),P=Math.PI/2-2*Math.atan(d*D)-_,_+=P;return new rt(_*e,t.x*e/i)}},bs={__proto__:null,LonLat:li,Mercator:hi,SphericalMercator:Ne},Ls=h({},Nt,{code:"EPSG:3395",projection:hi,transformation:function(){var t=.5/(Math.PI*hi.R);return te(t,.5,-t,.5)}()}),an=h({},Nt,{code:"EPSG:4326",projection:li,transformation:te(1/180,1,-1/180,.5)}),Ms=h({},At,{projection:li,transformation:te(1,0,-1,0),scale:function(t){return Math.pow(2,t)},zoom:function(t){return Math.log(t)/Math.LN2},distance:function(t,e){var i=e.lng-t.lng,n=e.lat-t.lat;return Math.sqrt(i*i+n*n)},infinite:!0});At.Earth=Nt,At.EPSG3395=Ls,At.EPSG3857=Oe,At.EPSG900913=An,At.EPSG4326=an,At.Simple=Ms;var Tt=at.extend({options:{pane:"overlayPane",attribution:null,bubblingMouseEvents:!0},addTo:function(t){return t.addLayer(this),this},remove:function(){return this.removeFrom(this._map||this._mapToAdd)},removeFrom:function(t){return t&&t.removeLayer(this),this},getPane:function(t){return this._map.getPane(t?this.options[t]||t:this.options.pane)},addInteractiveTarget:function(t){return this._map._targets[p(t)]=this,this},removeInteractiveTarget:function(t){return delete this._map._targets[p(t)],this},getAttribution:function(){return this.options.attribution},_layerAdd:function(t){var e=t.target;if(e.hasLayer(this)){if(this._map=e,this._zoomAnimated=e._zoomAnimated,this.getEvents){var i=this.getEvents();e.on(i,this),this.once("remove",function(){e.off(i,this)},this)}this.onAdd(e),this.fire("add"),e.fire("layeradd",{layer:this})}}});nt.include({addLayer:function(t){if(!t._layerAdd)throw new Error("The provided object is not a Layer.");var e=p(t);return this._layers[e]?this:(this._layers[e]=t,t._mapToAdd=this,t.beforeAdd&&t.beforeAdd(this),this.whenReady(t._layerAdd,t),this)},removeLayer:function(t){var e=p(t);return this._layers[e]?(this._loaded&&t.onRemove(this),delete this._layers[e],this._loaded&&(this.fire("layerremove",{layer:t}),t.fire("remove")),t._map=t._mapToAdd=null,this):this},hasLayer:function(t){return p(t)in this._layers},eachLayer:function(t,e){for(var i in this._layers)t.call(e,this._layers[i]);return this},_addLayers:function(t){t=t?C(t)?t:[t]:[];for(var e=0,i=t.length;e<i;e++)this.addLayer(t[e])},_addZoomLimit:function(t){(!isNaN(t.options.maxZoom)||!isNaN(t.options.minZoom))&&(this._zoomBoundLayers[p(t)]=t,this._updateZoomLevels())},_removeZoomLimit:function(t){var e=p(t);this._zoomBoundLayers[e]&&(delete this._zoomBoundLayers[e],this._updateZoomLevels())},_updateZoomLevels:function(){var t=1/0,e=-1/0,i=this._getZoomSpan();for(var n in this._zoomBoundLayers){var a=this._zoomBoundLayers[n].options;t=a.minZoom===void 0?t:Math.min(t,a.minZoom),e=a.maxZoom===void 0?e:Math.max(e,a.maxZoom)}this._layersMaxZoom=e===-1/0?void 0:e,this._layersMinZoom=t===1/0?void 0:t,i!==this._getZoomSpan()&&this.fire("zoomlevelschange"),this.options.maxZoom===void 0&&this._layersMaxZoom&&this.getZoom()>this._layersMaxZoom&&this.setZoom(this._layersMaxZoom),this.options.minZoom===void 0&&this._layersMinZoom&&this.getZoom()<this._layersMinZoom&&this.setZoom(this._layersMinZoom)}});var jt=Tt.extend({initialize:function(t,e){E(this,e),this._layers={};var i,n;if(t)for(i=0,n=t.length;i<n;i++)this.addLayer(t[i])},addLayer:function(t){var e=this.getLayerId(t);return this._layers[e]=t,this._map&&this._map.addLayer(t),this},removeLayer:function(t){var e=t in this._layers?t:this.getLayerId(t);return this._map&&this._layers[e]&&this._map.removeLayer(this._layers[e]),delete this._layers[e],this},hasLayer:function(t){var e=typeof t=="number"?t:this.getLayerId(t);return e in this._layers},clearLayers:function(){return this.eachLayer(this.removeLayer,this)},invoke:function(t){var e=Array.prototype.slice.call(arguments,1),i,n;for(i in this._layers)n=this._layers[i],n[t]&&n[t].apply(n,e);return this},onAdd:function(t){this.eachLayer(t.addLayer,t)},onRemove:function(t){this.eachLayer(t.removeLayer,t)},eachLayer:function(t,e){for(var i in this._layers)t.call(e,this._layers[i]);return this},getLayer:function(t){return this._layers[t]},getLayers:function(){var t=[];return this.eachLayer(t.push,t),t},setZIndex:function(t){return this.invoke("setZIndex",t)},getLayerId:function(t){return p(t)}}),Ts=function(t,e){return new jt(t,e)},kt=jt.extend({addLayer:function(t){return this.hasLayer(t)?this:(t.addEventParent(this),jt.prototype.addLayer.call(this,t),this.fire("layeradd",{layer:t}))},removeLayer:function(t){return this.hasLayer(t)?(t in this._layers&&(t=this._layers[t]),t.removeEventParent(this),jt.prototype.removeLayer.call(this,t),this.fire("layerremove",{layer:t})):this},setStyle:function(t){return this.invoke("setStyle",t)},bringToFront:function(){return this.invoke("bringToFront")},bringToBack:function(){return this.invoke("bringToBack")},getBounds:function(){var t=new yt;for(var e in this._layers){var i=this._layers[e];t.extend(i.getBounds?i.getBounds():i.getLatLng())}return t}}),Ps=function(t,e){return new kt(t,e)},Jt=st.extend({options:{popupAnchor:[0,0],tooltipAnchor:[0,0],crossOrigin:!1},initialize:function(t){E(this,t)},createIcon:function(t){return this._createIcon("icon",t)},createShadow:function(t){return this._createIcon("shadow",t)},_createIcon:function(t,e){var i=this._getIconUrl(t);if(!i){if(t==="icon")throw new Error("iconUrl not set in Icon options (see the docs).");return null}var n=this._createImg(i,e&&e.tagName==="IMG"?e:null);return this._setIconStyles(n,t),(this.options.crossOrigin||this.options.crossOrigin==="")&&(n.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),n},_setIconStyles:function(t,e){var i=this.options,n=i[e+"Size"];typeof n=="number"&&(n=[n,n]);var a=R(n),d=R(e==="shadow"&&i.shadowAnchor||i.iconAnchor||a&&a.divideBy(2,!0));t.className="leaflet-marker-"+e+" "+(i.className||""),d&&(t.style.marginLeft=-d.x+"px",t.style.marginTop=-d.y+"px"),a&&(t.style.width=a.x+"px",t.style.height=a.y+"px")},_createImg:function(t,e){return e=e||document.createElement("img"),e.src=t,e},_getIconUrl:function(t){return Y.retina&&this.options[t+"RetinaUrl"]||this.options[t+"Url"]}});function Es(t){return new Jt(t)}var ce=Jt.extend({options:{iconUrl:"marker-icon.png",iconRetinaUrl:"marker-icon-2x.png",shadowUrl:"marker-shadow.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],tooltipAnchor:[16,-28],shadowSize:[41,41]},_getIconUrl:function(t){return typeof ce.imagePath!="string"&&(ce.imagePath=this._detectIconPath()),(this.options.imagePath||ce.imagePath)+Jt.prototype._getIconUrl.call(this,t)},_stripUrl:function(t){var e=function(i,n,a){var d=n.exec(i);return d&&d[a]};return t=e(t,/^url\((['"])?(.+)\1\)$/,2),t&&e(t,/^(.*)marker-icon\.png$/,1)},_detectIconPath:function(){var t=ot("div","leaflet-default-icon-path",document.body),e=ne(t,"background-image")||ne(t,"backgroundImage");if(document.body.removeChild(t),e=this._stripUrl(e),e)return e;var i=document.querySelector('link[href$="leaflet.css"]');return i?i.href.substring(0,i.href.length-11-1):""}}),rn=St.extend({initialize:function(t){this._marker=t},addHooks:function(){var t=this._marker._icon;this._draggable||(this._draggable=new Bt(t,t,!0)),this._draggable.on({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).enable(),q(t,"leaflet-marker-draggable")},removeHooks:function(){this._draggable.off({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).disable(),this._marker._icon&&ct(this._marker._icon,"leaflet-marker-draggable")},moved:function(){return this._draggable&&this._draggable._moved},_adjustPan:function(t){var e=this._marker,i=e._map,n=this._marker.options.autoPanSpeed,a=this._marker.options.autoPanPadding,d=Zt(e._icon),_=i.getPixelBounds(),b=i.getPixelOrigin(),P=dt(_.min._subtract(b).add(a),_.max._subtract(b).subtract(a));if(!P.contains(d)){var D=R((Math.max(P.max.x,d.x)-P.max.x)/(_.max.x-P.max.x)-(Math.min(P.min.x,d.x)-P.min.x)/(_.min.x-P.min.x),(Math.max(P.max.y,d.y)-P.max.y)/(_.max.y-P.max.y)-(Math.min(P.min.y,d.y)-P.min.y)/(_.min.y-P.min.y)).multiplyBy(n);i.panBy(D,{animate:!1}),this._draggable._newPos._add(D),this._draggable._startPos._add(D),ft(e._icon,this._draggable._newPos),this._onDrag(t),this._panRequest=H(this._adjustPan.bind(this,t))}},_onDragStart:function(){this._oldLatLng=this._marker.getLatLng(),this._marker.closePopup&&this._marker.closePopup(),this._marker.fire("movestart").fire("dragstart")},_onPreDrag:function(t){this._marker.options.autoPan&&(K(this._panRequest),this._panRequest=H(this._adjustPan.bind(this,t)))},_onDrag:function(t){var e=this._marker,i=e._shadow,n=Zt(e._icon),a=e._map.layerPointToLatLng(n);i&&ft(i,n),e._latlng=a,t.latlng=a,t.oldLatLng=this._oldLatLng,e.fire("move",t).fire("drag",t)},_onDragEnd:function(t){K(this._panRequest),delete this._oldLatLng,this._marker.fire("moveend").fire("dragend",t)}}),Me=Tt.extend({options:{icon:new ce,interactive:!0,keyboard:!0,title:"",alt:"Marker",zIndexOffset:0,opacity:1,riseOnHover:!1,riseOffset:250,pane:"markerPane",shadowPane:"shadowPane",bubblingMouseEvents:!1,autoPanOnFocus:!0,draggable:!1,autoPan:!1,autoPanPadding:[50,50],autoPanSpeed:10},initialize:function(t,e){E(this,e),this._latlng=it(t)},onAdd:function(t){this._zoomAnimated=this._zoomAnimated&&t.options.markerZoomAnimation,this._zoomAnimated&&t.on("zoomanim",this._animateZoom,this),this._initIcon(),this.update()},onRemove:function(t){this.dragging&&this.dragging.enabled()&&(this.options.draggable=!0,this.dragging.removeHooks()),delete this.dragging,this._zoomAnimated&&t.off("zoomanim",this._animateZoom,this),this._removeIcon(),this._removeShadow()},getEvents:function(){return{zoom:this.update,viewreset:this.update}},getLatLng:function(){return this._latlng},setLatLng:function(t){var e=this._latlng;return this._latlng=it(t),this.update(),this.fire("move",{oldLatLng:e,latlng:this._latlng})},setZIndexOffset:function(t){return this.options.zIndexOffset=t,this.update()},getIcon:function(){return this.options.icon},setIcon:function(t){return this.options.icon=t,this._map&&(this._initIcon(),this.update()),this._popup&&this.bindPopup(this._popup,this._popup.options),this},getElement:function(){return this._icon},update:function(){if(this._icon&&this._map){var t=this._map.latLngToLayerPoint(this._latlng).round();this._setPos(t)}return this},_initIcon:function(){var t=this.options,e="leaflet-zoom-"+(this._zoomAnimated?"animated":"hide"),i=t.icon.createIcon(this._icon),n=!1;i!==this._icon&&(this._icon&&this._removeIcon(),n=!0,t.title&&(i.title=t.title),i.tagName==="IMG"&&(i.alt=t.alt||"")),q(i,e),t.keyboard&&(i.tabIndex="0",i.setAttribute("role","button")),this._icon=i,t.riseOnHover&&this.on({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&J(i,"focus",this._panOnFocus,this);var a=t.icon.createShadow(this._shadow),d=!1;a!==this._shadow&&(this._removeShadow(),d=!0),a&&(q(a,e),a.alt=""),this._shadow=a,t.opacity<1&&this._updateOpacity(),n&&this.getPane().appendChild(this._icon),this._initInteraction(),a&&d&&this.getPane(t.shadowPane).appendChild(this._shadow)},_removeIcon:function(){this.options.riseOnHover&&this.off({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&lt(this._icon,"focus",this._panOnFocus,this),ht(this._icon),this.removeInteractiveTarget(this._icon),this._icon=null},_removeShadow:function(){this._shadow&&ht(this._shadow),this._shadow=null},_setPos:function(t){this._icon&&ft(this._icon,t),this._shadow&&ft(this._shadow,t),this._zIndex=t.y+this.options.zIndexOffset,this._resetZIndex()},_updateZIndex:function(t){this._icon&&(this._icon.style.zIndex=this._zIndex+t)},_animateZoom:function(t){var e=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center).round();this._setPos(e)},_initInteraction:function(){if(this.options.interactive&&(q(this._icon,"leaflet-interactive"),this.addInteractiveTarget(this._icon),rn)){var t=this.options.draggable;this.dragging&&(t=this.dragging.enabled(),this.dragging.disable()),this.dragging=new rn(this),t&&this.dragging.enable()}},setOpacity:function(t){return this.options.opacity=t,this._map&&this._updateOpacity(),this},_updateOpacity:function(){var t=this.options.opacity;this._icon&&wt(this._icon,t),this._shadow&&wt(this._shadow,t)},_bringToFront:function(){this._updateZIndex(this.options.riseOffset)},_resetZIndex:function(){this._updateZIndex(0)},_panOnFocus:function(){var t=this._map;if(t){var e=this.options.icon.options,i=e.iconSize?R(e.iconSize):R(0,0),n=e.iconAnchor?R(e.iconAnchor):R(0,0);t.panInside(this._latlng,{paddingTopLeft:n,paddingBottomRight:i.subtract(n)})}},_getPopupAnchor:function(){return this.options.icon.options.popupAnchor},_getTooltipAnchor:function(){return this.options.icon.options.tooltipAnchor}});function Ss(t,e){return new Me(t,e)}var Ot=Tt.extend({options:{stroke:!0,color:"#3388ff",weight:3,opacity:1,lineCap:"round",lineJoin:"round",dashArray:null,dashOffset:null,fill:!1,fillColor:null,fillOpacity:.2,fillRule:"evenodd",interactive:!0,bubblingMouseEvents:!0},beforeAdd:function(t){this._renderer=t.getRenderer(this)},onAdd:function(){this._renderer._initPath(this),this._reset(),this._renderer._addPath(this)},onRemove:function(){this._renderer._removePath(this)},redraw:function(){return this._map&&this._renderer._updatePath(this),this},setStyle:function(t){return E(this,t),this._renderer&&(this._renderer._updateStyle(this),this.options.stroke&&t&&Object.prototype.hasOwnProperty.call(t,"weight")&&this._updateBounds()),this},bringToFront:function(){return this._renderer&&this._renderer._bringToFront(this),this},bringToBack:function(){return this._renderer&&this._renderer._bringToBack(this),this},getElement:function(){return this._path},_reset:function(){this._project(),this._update()},_clickTolerance:function(){return(this.options.stroke?this.options.weight/2:0)+(this._renderer.options.tolerance||0)}}),Te=Ot.extend({options:{fill:!0,radius:10},initialize:function(t,e){E(this,e),this._latlng=it(t),this._radius=this.options.radius},setLatLng:function(t){var e=this._latlng;return this._latlng=it(t),this.redraw(),this.fire("move",{oldLatLng:e,latlng:this._latlng})},getLatLng:function(){return this._latlng},setRadius:function(t){return this.options.radius=this._radius=t,this.redraw()},getRadius:function(){return this._radius},setStyle:function(t){var e=t&&t.radius||this._radius;return Ot.prototype.setStyle.call(this,t),this.setRadius(e),this},_project:function(){this._point=this._map.latLngToLayerPoint(this._latlng),this._updateBounds()},_updateBounds:function(){var t=this._radius,e=this._radiusY||t,i=this._clickTolerance(),n=[t+i,e+i];this._pxBounds=new et(this._point.subtract(n),this._point.add(n))},_update:function(){this._map&&this._updatePath()},_updatePath:function(){this._renderer._updateCircle(this)},_empty:function(){return this._radius&&!this._renderer._bounds.intersects(this._pxBounds)},_containsPoint:function(t){return t.distanceTo(this._point)<=this._radius+this._clickTolerance()}});function Cs(t,e){return new Te(t,e)}var ci=Te.extend({initialize:function(t,e,i){if(typeof e=="number"&&(e=h({},i,{radius:e})),E(this,e),this._latlng=it(t),isNaN(this.options.radius))throw new Error("Circle radius cannot be NaN");this._mRadius=this.options.radius},setRadius:function(t){return this._mRadius=t,this.redraw()},getRadius:function(){return this._mRadius},getBounds:function(){var t=[this._radius,this._radiusY||this._radius];return new yt(this._map.layerPointToLatLng(this._point.subtract(t)),this._map.layerPointToLatLng(this._point.add(t)))},setStyle:Ot.prototype.setStyle,_project:function(){var t=this._latlng.lng,e=this._latlng.lat,i=this._map,n=i.options.crs;if(n.distance===Nt.distance){var a=Math.PI/180,d=this._mRadius/Nt.R/a,_=i.project([e+d,t]),b=i.project([e-d,t]),P=_.add(b).divideBy(2),D=i.unproject(P).lat,O=Math.acos((Math.cos(d*a)-Math.sin(e*a)*Math.sin(D*a))/(Math.cos(e*a)*Math.cos(D*a)))/a;(isNaN(O)||O===0)&&(O=d/Math.cos(Math.PI/180*e)),this._point=P.subtract(i.getPixelOrigin()),this._radius=isNaN(O)?0:P.x-i.project([D,t-O]).x,this._radiusY=P.y-_.y}else{var W=n.unproject(n.project(this._latlng).subtract([this._mRadius,0]));this._point=i.latLngToLayerPoint(this._latlng),this._radius=this._point.x-i.latLngToLayerPoint(W).x}this._updateBounds()}});function As(t,e,i){return new ci(t,e,i)}var It=Ot.extend({options:{smoothFactor:1,noClip:!1},initialize:function(t,e){E(this,e),this._setLatLngs(t)},getLatLngs:function(){return this._latlngs},setLatLngs:function(t){return this._setLatLngs(t),this.redraw()},isEmpty:function(){return!this._latlngs.length},closestLayerPoint:function(t){for(var e=1/0,i=null,n=he,a,d,_=0,b=this._parts.length;_<b;_++)for(var P=this._parts[_],D=1,O=P.length;D<O;D++){a=P[D-1],d=P[D];var W=n(t,a,d,!0);W<e&&(e=W,i=n(t,a,d))}return i&&(i.distance=Math.sqrt(e)),i},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");return on(this._defaultShape(),this._map.options.crs)},getBounds:function(){return this._bounds},addLatLng:function(t,e){return e=e||this._defaultShape(),t=it(t),e.push(t),this._bounds.extend(t),this.redraw()},_setLatLngs:function(t){this._bounds=new yt,this._latlngs=this._convertLatLngs(t)},_defaultShape:function(){return bt(this._latlngs)?this._latlngs:this._latlngs[0]},_convertLatLngs:function(t){for(var e=[],i=bt(t),n=0,a=t.length;n<a;n++)i?(e[n]=it(t[n]),this._bounds.extend(e[n])):e[n]=this._convertLatLngs(t[n]);return e},_project:function(){var t=new et;this._rings=[],this._projectLatlngs(this._latlngs,this._rings,t),this._bounds.isValid()&&t.isValid()&&(this._rawPxBounds=t,this._updateBounds())},_updateBounds:function(){var t=this._clickTolerance(),e=new F(t,t);this._rawPxBounds&&(this._pxBounds=new et([this._rawPxBounds.min.subtract(e),this._rawPxBounds.max.add(e)]))},_projectLatlngs:function(t,e,i){var n=t[0]instanceof rt,a=t.length,d,_;if(n){for(_=[],d=0;d<a;d++)_[d]=this._map.latLngToLayerPoint(t[d]),i.extend(_[d]);e.push(_)}else for(d=0;d<a;d++)this._projectLatlngs(t[d],e,i)},_clipPoints:function(){var t=this._renderer._bounds;if(this._parts=[],!(!this._pxBounds||!this._pxBounds.intersects(t))){if(this.options.noClip){this._parts=this._rings;return}var e=this._parts,i,n,a,d,_,b,P;for(i=0,a=0,d=this._rings.length;i<d;i++)for(P=this._rings[i],n=0,_=P.length;n<_-1;n++)b=nn(P[n],P[n+1],t,n,!0),b&&(e[a]=e[a]||[],e[a].push(b[0]),(b[1]!==P[n+1]||n===_-2)&&(e[a].push(b[1]),a++))}},_simplifyPoints:function(){for(var t=this._parts,e=this.options.smoothFactor,i=0,n=t.length;i<n;i++)t[i]=Qi(t[i],e)},_update:function(){this._map&&(this._clipPoints(),this._simplifyPoints(),this._updatePath())},_updatePath:function(){this._renderer._updatePoly(this)},_containsPoint:function(t,e){var i,n,a,d,_,b,P=this._clickTolerance();if(!this._pxBounds||!this._pxBounds.contains(t))return!1;for(i=0,d=this._parts.length;i<d;i++)for(b=this._parts[i],n=0,_=b.length,a=_-1;n<_;a=n++)if(!(!e&&n===0)&&tn(t,b[a],b[n])<=P)return!0;return!1}});function ks(t,e){return new It(t,e)}It._flat=sn;var Vt=It.extend({options:{fill:!0},isEmpty:function(){return!this._latlngs.length||!this._latlngs[0].length},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");return Ki(this._defaultShape(),this._map.options.crs)},_convertLatLngs:function(t){var e=It.prototype._convertLatLngs.call(this,t),i=e.length;return i>=2&&e[0]instanceof rt&&e[0].equals(e[i-1])&&e.pop(),e},_setLatLngs:function(t){It.prototype._setLatLngs.call(this,t),bt(this._latlngs)&&(this._latlngs=[this._latlngs])},_defaultShape:function(){return bt(this._latlngs[0])?this._latlngs[0]:this._latlngs[0][0]},_clipPoints:function(){var t=this._renderer._bounds,e=this.options.weight,i=new F(e,e);if(t=new et(t.min.subtract(i),t.max.add(i)),this._parts=[],!(!this._pxBounds||!this._pxBounds.intersects(t))){if(this.options.noClip){this._parts=this._rings;return}for(var n=0,a=this._rings.length,d;n<a;n++)d=qi(this._rings[n],t,!0),d.length&&this._parts.push(d)}},_updatePath:function(){this._renderer._updatePoly(this,!0)},_containsPoint:function(t){var e=!1,i,n,a,d,_,b,P,D;if(!this._pxBounds||!this._pxBounds.contains(t))return!1;for(d=0,P=this._parts.length;d<P;d++)for(i=this._parts[d],_=0,D=i.length,b=D-1;_<D;b=_++)n=i[_],a=i[b],n.y>t.y!=a.y>t.y&&t.x<(a.x-n.x)*(t.y-n.y)/(a.y-n.y)+n.x&&(e=!e);return e||It.prototype._containsPoint.call(this,t,!0)}});function Is(t,e){return new Vt(t,e)}var Dt=kt.extend({initialize:function(t,e){E(this,e),this._layers={},t&&this.addData(t)},addData:function(t){var e=C(t)?t:t.features,i,n,a;if(e){for(i=0,n=e.length;i<n;i++)a=e[i],(a.geometries||a.geometry||a.features||a.coordinates)&&this.addData(a);return this}var d=this.options;if(d.filter&&!d.filter(t))return this;var _=Pe(t,d);return _?(_.feature=Ce(t),_.defaultOptions=_.options,this.resetStyle(_),d.onEachFeature&&d.onEachFeature(t,_),this.addLayer(_)):this},resetStyle:function(t){return t===void 0?this.eachLayer(this.resetStyle,this):(t.options=h({},t.defaultOptions),this._setLayerStyle(t,this.options.style),this)},setStyle:function(t){return this.eachLayer(function(e){this._setLayerStyle(e,t)},this)},_setLayerStyle:function(t,e){t.setStyle&&(typeof e=="function"&&(e=e(t.feature)),t.setStyle(e))}});function Pe(t,e){var i=t.type==="Feature"?t.geometry:t,n=i?i.coordinates:null,a=[],d=e&&e.pointToLayer,_=e&&e.coordsToLatLng||di,b,P,D,O;if(!n&&!i)return null;switch(i.type){case"Point":return b=_(n),ln(d,t,b,e);case"MultiPoint":for(D=0,O=n.length;D<O;D++)b=_(n[D]),a.push(ln(d,t,b,e));return new kt(a);case"LineString":case"MultiLineString":return P=Ee(n,i.type==="LineString"?0:1,_),new It(P,e);case"Polygon":case"MultiPolygon":return P=Ee(n,i.type==="Polygon"?1:2,_),new Vt(P,e);case"GeometryCollection":for(D=0,O=i.geometries.length;D<O;D++){var W=Pe({geometry:i.geometries[D],type:"Feature",properties:t.properties},e);W&&a.push(W)}return new kt(a);case"FeatureCollection":for(D=0,O=i.features.length;D<O;D++){var Q=Pe(i.features[D],e);Q&&a.push(Q)}return new kt(a);default:throw new Error("Invalid GeoJSON object.")}}function ln(t,e,i,n){return t?t(e,i):new Me(i,n&&n.markersInheritOptions&&n)}function di(t){return new rt(t[1],t[0],t[2])}function Ee(t,e,i){for(var n=[],a=0,d=t.length,_;a<d;a++)_=e?Ee(t[a],e-1,i):(i||di)(t[a]),n.push(_);return n}function ui(t,e){return t=it(t),t.alt!==void 0?[y(t.lng,e),y(t.lat,e),y(t.alt,e)]:[y(t.lng,e),y(t.lat,e)]}function Se(t,e,i,n){for(var a=[],d=0,_=t.length;d<_;d++)a.push(e?Se(t[d],bt(t[d])?0:e-1,i,n):ui(t[d],n));return!e&&i&&a.length>0&&a.push(a[0].slice()),a}function qt(t,e){return t.feature?h({},t.feature,{geometry:e}):Ce(e)}function Ce(t){return t.type==="Feature"||t.type==="FeatureCollection"?t:{type:"Feature",properties:{},geometry:t}}var fi={toGeoJSON:function(t){return qt(this,{type:"Point",coordinates:ui(this.getLatLng(),t)})}};Me.include(fi),ci.include(fi),Te.include(fi),It.include({toGeoJSON:function(t){var e=!bt(this._latlngs),i=Se(this._latlngs,e?1:0,!1,t);return qt(this,{type:(e?"Multi":"")+"LineString",coordinates:i})}}),Vt.include({toGeoJSON:function(t){var e=!bt(this._latlngs),i=e&&!bt(this._latlngs[0]),n=Se(this._latlngs,i?2:e?1:0,!0,t);return e||(n=[n]),qt(this,{type:(i?"Multi":"")+"Polygon",coordinates:n})}}),jt.include({toMultiPoint:function(t){var e=[];return this.eachLayer(function(i){e.push(i.toGeoJSON(t).geometry.coordinates)}),qt(this,{type:"MultiPoint",coordinates:e})},toGeoJSON:function(t){var e=this.feature&&this.feature.geometry&&this.feature.geometry.type;if(e==="MultiPoint")return this.toMultiPoint(t);var i=e==="GeometryCollection",n=[];return this.eachLayer(function(a){if(a.toGeoJSON){var d=a.toGeoJSON(t);if(i)n.push(d.geometry);else{var _=Ce(d);_.type==="FeatureCollection"?n.push.apply(n,_.features):n.push(_)}}}),i?qt(this,{geometries:n,type:"GeometryCollection"}):{type:"FeatureCollection",features:n}}});function hn(t,e){return new Dt(t,e)}var Ds=hn,Ae=Tt.extend({options:{opacity:1,alt:"",interactive:!1,crossOrigin:!1,errorOverlayUrl:"",zIndex:1,className:""},initialize:function(t,e,i){this._url=t,this._bounds=ut(e),E(this,i)},onAdd:function(){this._image||(this._initImage(),this.options.opacity<1&&this._updateOpacity()),this.options.interactive&&(q(this._image,"leaflet-interactive"),this.addInteractiveTarget(this._image)),this.getPane().appendChild(this._image),this._reset()},onRemove:function(){ht(this._image),this.options.interactive&&this.removeInteractiveTarget(this._image)},setOpacity:function(t){return this.options.opacity=t,this._image&&this._updateOpacity(),this},setStyle:function(t){return t.opacity&&this.setOpacity(t.opacity),this},bringToFront:function(){return this._map&&Gt(this._image),this},bringToBack:function(){return this._map&&Ut(this._image),this},setUrl:function(t){return this._url=t,this._image&&(this._image.src=t),this},setBounds:function(t){return this._bounds=ut(t),this._map&&this._reset(),this},getEvents:function(){var t={zoom:this._reset,viewreset:this._reset};return this._zoomAnimated&&(t.zoomanim=this._animateZoom),t},setZIndex:function(t){return this.options.zIndex=t,this._updateZIndex(),this},getBounds:function(){return this._bounds},getElement:function(){return this._image},_initImage:function(){var t=this._url.tagName==="IMG",e=this._image=t?this._url:ot("img");if(q(e,"leaflet-image-layer"),this._zoomAnimated&&q(e,"leaflet-zoom-animated"),this.options.className&&q(e,this.options.className),e.onselectstart=v,e.onmousemove=v,e.onload=c(this.fire,this,"load"),e.onerror=c(this._overlayOnError,this,"error"),(this.options.crossOrigin||this.options.crossOrigin==="")&&(e.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),this.options.zIndex&&this._updateZIndex(),t){this._url=e.src;return}e.src=this._url,e.alt=this.options.alt},_animateZoom:function(t){var e=this._map.getZoomScale(t.zoom),i=this._map._latLngBoundsToNewLayerBounds(this._bounds,t.zoom,t.center).min;Rt(this._image,i,e)},_reset:function(){var t=this._image,e=new et(this._map.latLngToLayerPoint(this._bounds.getNorthWest()),this._map.latLngToLayerPoint(this._bounds.getSouthEast())),i=e.getSize();ft(t,e.min),t.style.width=i.x+"px",t.style.height=i.y+"px"},_updateOpacity:function(){wt(this._image,this.options.opacity)},_updateZIndex:function(){this._image&&this.options.zIndex!==void 0&&this.options.zIndex!==null&&(this._image.style.zIndex=this.options.zIndex)},_overlayOnError:function(){this.fire("error");var t=this.options.errorOverlayUrl;t&&this._url!==t&&(this._url=t,this._image.src=t)},getCenter:function(){return this._bounds.getCenter()}}),zs=function(t,e,i){return new Ae(t,e,i)},cn=Ae.extend({options:{autoplay:!0,loop:!0,keepAspectRatio:!0,muted:!1,playsInline:!0},_initImage:function(){var t=this._url.tagName==="VIDEO",e=this._image=t?this._url:ot("video");if(q(e,"leaflet-image-layer"),this._zoomAnimated&&q(e,"leaflet-zoom-animated"),this.options.className&&q(e,this.options.className),e.onselectstart=v,e.onmousemove=v,e.onloadeddata=c(this.fire,this,"load"),t){for(var i=e.getElementsByTagName("source"),n=[],a=0;a<i.length;a++)n.push(i[a].src);this._url=i.length>0?n:[e.src];return}C(this._url)||(this._url=[this._url]),!this.options.keepAspectRatio&&Object.prototype.hasOwnProperty.call(e.style,"objectFit")&&(e.style.objectFit="fill"),e.autoplay=!!this.options.autoplay,e.loop=!!this.options.loop,e.muted=!!this.options.muted,e.playsInline=!!this.options.playsInline;for(var d=0;d<this._url.length;d++){var _=ot("source");_.src=this._url[d],e.appendChild(_)}}});function Ns(t,e,i){return new cn(t,e,i)}var dn=Ae.extend({_initImage:function(){var t=this._image=this._url;q(t,"leaflet-image-layer"),this._zoomAnimated&&q(t,"leaflet-zoom-animated"),this.options.className&&q(t,this.options.className),t.onselectstart=v,t.onmousemove=v}});function Bs(t,e,i){return new dn(t,e,i)}var Ct=Tt.extend({options:{interactive:!1,offset:[0,0],className:"",pane:void 0,content:""},initialize:function(t,e){t&&(t instanceof rt||C(t))?(this._latlng=it(t),E(this,e)):(E(this,t),this._source=e),this.options.content&&(this._content=this.options.content)},openOn:function(t){return t=arguments.length?t:this._source._map,t.hasLayer(this)||t.addLayer(this),this},close:function(){return this._map&&this._map.removeLayer(this),this},toggle:function(t){return this._map?this.close():(arguments.length?this._source=t:t=this._source,this._prepareOpen(),this.openOn(t._map)),this},onAdd:function(t){this._zoomAnimated=t._zoomAnimated,this._container||this._initLayout(),t._fadeAnimated&&wt(this._container,0),clearTimeout(this._removeTimeout),this.getPane().appendChild(this._container),this.update(),t._fadeAnimated&&wt(this._container,1),this.bringToFront(),this.options.interactive&&(q(this._container,"leaflet-interactive"),this.addInteractiveTarget(this._container))},onRemove:function(t){t._fadeAnimated?(wt(this._container,0),this._removeTimeout=setTimeout(c(ht,void 0,this._container),200)):ht(this._container),this.options.interactive&&(ct(this._container,"leaflet-interactive"),this.removeInteractiveTarget(this._container))},getLatLng:function(){return this._latlng},setLatLng:function(t){return this._latlng=it(t),this._map&&(this._updatePosition(),this._adjustPan()),this},getContent:function(){return this._content},setContent:function(t){return this._content=t,this.update(),this},getElement:function(){return this._container},update:function(){this._map&&(this._container.style.visibility="hidden",this._updateContent(),this._updateLayout(),this._updatePosition(),this._container.style.visibility="",this._adjustPan())},getEvents:function(){var t={zoom:this._updatePosition,viewreset:this._updatePosition};return this._zoomAnimated&&(t.zoomanim=this._animateZoom),t},isOpen:function(){return!!this._map&&this._map.hasLayer(this)},bringToFront:function(){return this._map&&Gt(this._container),this},bringToBack:function(){return this._map&&Ut(this._container),this},_prepareOpen:function(t){var e=this._source;if(!e._map)return!1;if(e instanceof kt){e=null;var i=this._source._layers;for(var n in i)if(i[n]._map){e=i[n];break}if(!e)return!1;this._source=e}if(!t)if(e.getCenter)t=e.getCenter();else if(e.getLatLng)t=e.getLatLng();else if(e.getBounds)t=e.getBounds().getCenter();else throw new Error("Unable to get source layer LatLng.");return this.setLatLng(t),this._map&&this.update(),!0},_updateContent:function(){if(this._content){var t=this._contentNode,e=typeof this._content=="function"?this._content(this._source||this):this._content;if(typeof e=="string")t.innerHTML=e;else{for(;t.hasChildNodes();)t.removeChild(t.firstChild);t.appendChild(e)}this.fire("contentupdate")}},_updatePosition:function(){if(this._map){var t=this._map.latLngToLayerPoint(this._latlng),e=R(this.options.offset),i=this._getAnchor();this._zoomAnimated?ft(this._container,t.add(i)):e=e.add(t).add(i);var n=this._containerBottom=-e.y,a=this._containerLeft=-Math.round(this._containerWidth/2)+e.x;this._container.style.bottom=n+"px",this._container.style.left=a+"px"}},_getAnchor:function(){return[0,0]}});nt.include({_initOverlay:function(t,e,i,n){var a=e;return a instanceof t||(a=new t(n).setContent(e)),i&&a.setLatLng(i),a}}),Tt.include({_initOverlay:function(t,e,i,n){var a=i;return a instanceof t?(E(a,n),a._source=this):(a=e&&!n?e:new t(n,this),a.setContent(i)),a}});var ke=Ct.extend({options:{pane:"popupPane",offset:[0,7],maxWidth:300,minWidth:50,maxHeight:null,autoPan:!0,autoPanPaddingTopLeft:null,autoPanPaddingBottomRight:null,autoPanPadding:[5,5],keepInView:!1,closeButton:!0,autoClose:!0,closeOnEscapeKey:!0,className:""},openOn:function(t){return t=arguments.length?t:this._source._map,!t.hasLayer(this)&&t._popup&&t._popup.options.autoClose&&t.removeLayer(t._popup),t._popup=this,Ct.prototype.openOn.call(this,t)},onAdd:function(t){Ct.prototype.onAdd.call(this,t),t.fire("popupopen",{popup:this}),this._source&&(this._source.fire("popupopen",{popup:this},!0),this._source instanceof Ot||this._source.on("preclick",$t))},onRemove:function(t){Ct.prototype.onRemove.call(this,t),t.fire("popupclose",{popup:this}),this._source&&(this._source.fire("popupclose",{popup:this},!0),this._source instanceof Ot||this._source.off("preclick",$t))},getEvents:function(){var t=Ct.prototype.getEvents.call(this);return(this.options.closeOnClick!==void 0?this.options.closeOnClick:this._map.options.closePopupOnClick)&&(t.preclick=this.close),this.options.keepInView&&(t.moveend=this._adjustPan),t},_initLayout:function(){var t="leaflet-popup",e=this._container=ot("div",t+" "+(this.options.className||"")+" leaflet-zoom-animated"),i=this._wrapper=ot("div",t+"-content-wrapper",e);if(this._contentNode=ot("div",t+"-content",i),re(e),ii(this._contentNode),J(e,"contextmenu",$t),this._tipContainer=ot("div",t+"-tip-container",e),this._tip=ot("div",t+"-tip",this._tipContainer),this.options.closeButton){var n=this._closeButton=ot("a",t+"-close-button",e);n.setAttribute("role","button"),n.setAttribute("aria-label","Close popup"),n.href="#close",n.innerHTML='<span aria-hidden="true">&#215;</span>',J(n,"click",function(a){gt(a),this.close()},this)}},_updateLayout:function(){var t=this._contentNode,e=t.style;e.width="",e.whiteSpace="nowrap";var i=t.offsetWidth;i=Math.min(i,this.options.maxWidth),i=Math.max(i,this.options.minWidth),e.width=i+1+"px",e.whiteSpace="",e.height="";var n=t.offsetHeight,a=this.options.maxHeight,d="leaflet-popup-scrolled";a&&n>a?(e.height=a+"px",q(t,d)):ct(t,d),this._containerWidth=this._container.offsetWidth},_animateZoom:function(t){var e=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center),i=this._getAnchor();ft(this._container,e.add(i))},_adjustPan:function(){if(this.options.autoPan){if(this._map._panAnim&&this._map._panAnim.stop(),this._autopanning){this._autopanning=!1;return}var t=this._map,e=parseInt(ne(this._container,"marginBottom"),10)||0,i=this._container.offsetHeight+e,n=this._containerWidth,a=new F(this._containerLeft,-i-this._containerBottom);a._add(Zt(this._container));var d=t.layerPointToContainerPoint(a),_=R(this.options.autoPanPadding),b=R(this.options.autoPanPaddingTopLeft||_),P=R(this.options.autoPanPaddingBottomRight||_),D=t.getSize(),O=0,W=0;d.x+n+P.x>D.x&&(O=d.x+n-D.x+P.x),d.x-O-b.x<0&&(O=d.x-b.x),d.y+i+P.y>D.y&&(W=d.y+i-D.y+P.y),d.y-W-b.y<0&&(W=d.y-b.y),(O||W)&&(this.options.keepInView&&(this._autopanning=!0),t.fire("autopanstart").panBy([O,W]))}},_getAnchor:function(){return R(this._source&&this._source._getPopupAnchor?this._source._getPopupAnchor():[0,0])}}),Os=function(t,e){return new ke(t,e)};nt.mergeOptions({closePopupOnClick:!0}),nt.include({openPopup:function(t,e,i){return this._initOverlay(ke,t,e,i).openOn(this),this},closePopup:function(t){return t=arguments.length?t:this._popup,t&&t.close(),this}}),Tt.include({bindPopup:function(t,e){return this._popup=this._initOverlay(ke,this._popup,t,e),this._popupHandlersAdded||(this.on({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!0),this},unbindPopup:function(){return this._popup&&(this.off({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!1,this._popup=null),this},openPopup:function(t){return this._popup&&(this instanceof kt||(this._popup._source=this),this._popup._prepareOpen(t||this._latlng)&&this._popup.openOn(this._map)),this},closePopup:function(){return this._popup&&this._popup.close(),this},togglePopup:function(){return this._popup&&this._popup.toggle(this),this},isPopupOpen:function(){return this._popup?this._popup.isOpen():!1},setPopupContent:function(t){return this._popup&&this._popup.setContent(t),this},getPopup:function(){return this._popup},_openPopup:function(t){if(!(!this._popup||!this._map)){Yt(t);var e=t.layer||t.target;if(this._popup._source===e&&!(e instanceof Ot)){this._map.hasLayer(this._popup)?this.closePopup():this.openPopup(t.latlng);return}this._popup._source=e,this.openPopup(t.latlng)}},_movePopup:function(t){this._popup.setLatLng(t.latlng)},_onKeyPress:function(t){t.originalEvent.keyCode===13&&this._openPopup(t)}});var Ie=Ct.extend({options:{pane:"tooltipPane",offset:[0,0],direction:"auto",permanent:!1,sticky:!1,opacity:.9},onAdd:function(t){Ct.prototype.onAdd.call(this,t),this.setOpacity(this.options.opacity),t.fire("tooltipopen",{tooltip:this}),this._source&&(this.addEventParent(this._source),this._source.fire("tooltipopen",{tooltip:this},!0))},onRemove:function(t){Ct.prototype.onRemove.call(this,t),t.fire("tooltipclose",{tooltip:this}),this._source&&(this.removeEventParent(this._source),this._source.fire("tooltipclose",{tooltip:this},!0))},getEvents:function(){var t=Ct.prototype.getEvents.call(this);return this.options.permanent||(t.preclick=this.close),t},_initLayout:function(){var t="leaflet-tooltip",e=t+" "+(this.options.className||"")+" leaflet-zoom-"+(this._zoomAnimated?"animated":"hide");this._contentNode=this._container=ot("div",e),this._container.setAttribute("role","tooltip"),this._container.setAttribute("id","leaflet-tooltip-"+p(this))},_updateLayout:function(){},_adjustPan:function(){},_setPosition:function(t){var e,i,n=this._map,a=this._container,d=n.latLngToContainerPoint(n.getCenter()),_=n.layerPointToContainerPoint(t),b=this.options.direction,P=a.offsetWidth,D=a.offsetHeight,O=R(this.options.offset),W=this._getAnchor();b==="top"?(e=P/2,i=D):b==="bottom"?(e=P/2,i=0):b==="center"?(e=P/2,i=D/2):b==="right"?(e=0,i=D/2):b==="left"?(e=P,i=D/2):_.x<d.x?(b="right",e=0,i=D/2):(b="left",e=P+(O.x+W.x)*2,i=D/2),t=t.subtract(R(e,i,!0)).add(O).add(W),ct(a,"leaflet-tooltip-right"),ct(a,"leaflet-tooltip-left"),ct(a,"leaflet-tooltip-top"),ct(a,"leaflet-tooltip-bottom"),q(a,"leaflet-tooltip-"+b),ft(a,t)},_updatePosition:function(){var t=this._map.latLngToLayerPoint(this._latlng);this._setPosition(t)},setOpacity:function(t){this.options.opacity=t,this._container&&wt(this._container,t)},_animateZoom:function(t){var e=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center);this._setPosition(e)},_getAnchor:function(){return R(this._source&&this._source._getTooltipAnchor&&!this.options.sticky?this._source._getTooltipAnchor():[0,0])}}),Fs=function(t,e){return new Ie(t,e)};nt.include({openTooltip:function(t,e,i){return this._initOverlay(Ie,t,e,i).openOn(this),this},closeTooltip:function(t){return t.close(),this}}),Tt.include({bindTooltip:function(t,e){return this._tooltip&&this.isTooltipOpen()&&this.unbindTooltip(),this._tooltip=this._initOverlay(Ie,this._tooltip,t,e),this._initTooltipInteractions(),this._tooltip.options.permanent&&this._map&&this._map.hasLayer(this)&&this.openTooltip(),this},unbindTooltip:function(){return this._tooltip&&(this._initTooltipInteractions(!0),this.closeTooltip(),this._tooltip=null),this},_initTooltipInteractions:function(t){if(!(!t&&this._tooltipHandlersAdded)){var e=t?"off":"on",i={remove:this.closeTooltip,move:this._moveTooltip};this._tooltip.options.permanent?i.add=this._openTooltip:(i.mouseover=this._openTooltip,i.mouseout=this.closeTooltip,i.click=this._openTooltip,this._map?this._addFocusListeners():i.add=this._addFocusListeners),this._tooltip.options.sticky&&(i.mousemove=this._moveTooltip),this[e](i),this._tooltipHandlersAdded=!t}},openTooltip:function(t){return this._tooltip&&(this instanceof kt||(this._tooltip._source=this),this._tooltip._prepareOpen(t)&&(this._tooltip.openOn(this._map),this.getElement?this._setAriaDescribedByOnLayer(this):this.eachLayer&&this.eachLayer(this._setAriaDescribedByOnLayer,this))),this},closeTooltip:function(){if(this._tooltip)return this._tooltip.close()},toggleTooltip:function(){return this._tooltip&&this._tooltip.toggle(this),this},isTooltipOpen:function(){return this._tooltip.isOpen()},setTooltipContent:function(t){return this._tooltip&&this._tooltip.setContent(t),this},getTooltip:function(){return this._tooltip},_addFocusListeners:function(){this.getElement?this._addFocusListenersOnLayer(this):this.eachLayer&&this.eachLayer(this._addFocusListenersOnLayer,this)},_addFocusListenersOnLayer:function(t){var e=typeof t.getElement=="function"&&t.getElement();e&&(J(e,"focus",function(){this._tooltip._source=t,this.openTooltip()},this),J(e,"blur",this.closeTooltip,this))},_setAriaDescribedByOnLayer:function(t){var e=typeof t.getElement=="function"&&t.getElement();e&&e.setAttribute("aria-describedby",this._tooltip._container.id)},_openTooltip:function(t){if(!(!this._tooltip||!this._map)){if(this._map.dragging&&this._map.dragging.moving()&&!this._openOnceFlag){this._openOnceFlag=!0;var e=this;this._map.once("moveend",function(){e._openOnceFlag=!1,e._openTooltip(t)});return}this._tooltip._source=t.layer||t.target,this.openTooltip(this._tooltip.options.sticky?t.latlng:void 0)}},_moveTooltip:function(t){var e=t.latlng,i,n;this._tooltip.options.sticky&&t.originalEvent&&(i=this._map.mouseEventToContainerPoint(t.originalEvent),n=this._map.containerPointToLayerPoint(i),e=this._map.layerPointToLatLng(n)),this._tooltip.setLatLng(e)}});var un=Jt.extend({options:{iconSize:[12,12],html:!1,bgPos:null,className:"leaflet-div-icon"},createIcon:function(t){var e=t&&t.tagName==="DIV"?t:document.createElement("div"),i=this.options;if(i.html instanceof Element?(ve(e),e.appendChild(i.html)):e.innerHTML=i.html!==!1?i.html:"",i.bgPos){var n=R(i.bgPos);e.style.backgroundPosition=-n.x+"px "+-n.y+"px"}return this._setIconStyles(e,"icon"),e},createShadow:function(){return null}});function Rs(t){return new un(t)}Jt.Default=ce;var de=Tt.extend({options:{tileSize:256,opacity:1,updateWhenIdle:Y.mobile,updateWhenZooming:!0,updateInterval:200,zIndex:1,bounds:null,minZoom:0,maxZoom:void 0,maxNativeZoom:void 0,minNativeZoom:void 0,noWrap:!1,pane:"tilePane",className:"",keepBuffer:2},initialize:function(t){E(this,t)},onAdd:function(){this._initContainer(),this._levels={},this._tiles={},this._resetView()},beforeAdd:function(t){t._addZoomLimit(this)},onRemove:function(t){this._removeAllTiles(),ht(this._container),t._removeZoomLimit(this),this._container=null,this._tileZoom=void 0},bringToFront:function(){return this._map&&(Gt(this._container),this._setAutoZIndex(Math.max)),this},bringToBack:function(){return this._map&&(Ut(this._container),this._setAutoZIndex(Math.min)),this},getContainer:function(){return this._container},setOpacity:function(t){return this.options.opacity=t,this._updateOpacity(),this},setZIndex:function(t){return this.options.zIndex=t,this._updateZIndex(),this},isLoading:function(){return this._loading},redraw:function(){if(this._map){this._removeAllTiles();var t=this._clampZoom(this._map.getZoom());t!==this._tileZoom&&(this._tileZoom=t,this._updateLevels()),this._update()}return this},getEvents:function(){var t={viewprereset:this._invalidateAll,viewreset:this._resetView,zoom:this._resetView,moveend:this._onMoveEnd};return this.options.updateWhenIdle||(this._onMove||(this._onMove=m(this._onMoveEnd,this.options.updateInterval,this)),t.move=this._onMove),this._zoomAnimated&&(t.zoomanim=this._animateZoom),t},createTile:function(){return document.createElement("div")},getTileSize:function(){var t=this.options.tileSize;return t instanceof F?t:new F(t,t)},_updateZIndex:function(){this._container&&this.options.zIndex!==void 0&&this.options.zIndex!==null&&(this._container.style.zIndex=this.options.zIndex)},_setAutoZIndex:function(t){for(var e=this.getPane().children,i=-t(-1/0,1/0),n=0,a=e.length,d;n<a;n++)d=e[n].style.zIndex,e[n]!==this._container&&d&&(i=t(i,+d));isFinite(i)&&(this.options.zIndex=i+t(-1,1),this._updateZIndex())},_updateOpacity:function(){if(this._map&&!Y.ielt9){wt(this._container,this.options.opacity);var t=+new Date,e=!1,i=!1;for(var n in this._tiles){var a=this._tiles[n];if(!(!a.current||!a.loaded)){var d=Math.min(1,(t-a.loaded)/200);wt(a.el,d),d<1?e=!0:(a.active?i=!0:this._onOpaqueTile(a),a.active=!0)}}i&&!this._noPrune&&this._pruneTiles(),e&&(K(this._fadeFrame),this._fadeFrame=H(this._updateOpacity,this))}},_onOpaqueTile:v,_initContainer:function(){this._container||(this._container=ot("div","leaflet-layer "+(this.options.className||"")),this._updateZIndex(),this.options.opacity<1&&this._updateOpacity(),this.getPane().appendChild(this._container))},_updateLevels:function(){var t=this._tileZoom,e=this.options.maxZoom;if(t!==void 0){for(var i in this._levels)i=Number(i),this._levels[i].el.children.length||i===t?(this._levels[i].el.style.zIndex=e-Math.abs(t-i),this._onUpdateLevel(i)):(ht(this._levels[i].el),this._removeTilesAtZoom(i),this._onRemoveLevel(i),delete this._levels[i]);var n=this._levels[t],a=this._map;return n||(n=this._levels[t]={},n.el=ot("div","leaflet-tile-container leaflet-zoom-animated",this._container),n.el.style.zIndex=e,n.origin=a.project(a.unproject(a.getPixelOrigin()),t).round(),n.zoom=t,this._setZoomTransform(n,a.getCenter(),a.getZoom()),v(n.el.offsetWidth),this._onCreateLevel(n)),this._level=n,n}},_onUpdateLevel:v,_onRemoveLevel:v,_onCreateLevel:v,_pruneTiles:function(){if(this._map){var t,e,i=this._map.getZoom();if(i>this.options.maxZoom||i<this.options.minZoom){this._removeAllTiles();return}for(t in this._tiles)e=this._tiles[t],e.retain=e.current;for(t in this._tiles)if(e=this._tiles[t],e.current&&!e.active){var n=e.coords;this._retainParent(n.x,n.y,n.z,n.z-5)||this._retainChildren(n.x,n.y,n.z,n.z+2)}for(t in this._tiles)this._tiles[t].retain||this._removeTile(t)}},_removeTilesAtZoom:function(t){for(var e in this._tiles)this._tiles[e].coords.z===t&&this._removeTile(e)},_removeAllTiles:function(){for(var t in this._tiles)this._removeTile(t)},_invalidateAll:function(){for(var t in this._levels)ht(this._levels[t].el),this._onRemoveLevel(Number(t)),delete this._levels[t];this._removeAllTiles(),this._tileZoom=void 0},_retainParent:function(t,e,i,n){var a=Math.floor(t/2),d=Math.floor(e/2),_=i-1,b=new F(+a,+d);b.z=+_;var P=this._tileCoordsToKey(b),D=this._tiles[P];return D&&D.active?(D.retain=!0,!0):(D&&D.loaded&&(D.retain=!0),_>n?this._retainParent(a,d,_,n):!1)},_retainChildren:function(t,e,i,n){for(var a=2*t;a<2*t+2;a++)for(var d=2*e;d<2*e+2;d++){var _=new F(a,d);_.z=i+1;var b=this._tileCoordsToKey(_),P=this._tiles[b];if(P&&P.active){P.retain=!0;continue}else P&&P.loaded&&(P.retain=!0);i+1<n&&this._retainChildren(a,d,i+1,n)}},_resetView:function(t){var e=t&&(t.pinch||t.flyTo);this._setView(this._map.getCenter(),this._map.getZoom(),e,e)},_animateZoom:function(t){this._setView(t.center,t.zoom,!0,t.noUpdate)},_clampZoom:function(t){var e=this.options;return e.minNativeZoom!==void 0&&t<e.minNativeZoom?e.minNativeZoom:e.maxNativeZoom!==void 0&&e.maxNativeZoom<t?e.maxNativeZoom:t},_setView:function(t,e,i,n){var a=Math.round(e);this.options.maxZoom!==void 0&&a>this.options.maxZoom||this.options.minZoom!==void 0&&a<this.options.minZoom?a=void 0:a=this._clampZoom(a);var d=this.options.updateWhenZooming&&a!==this._tileZoom;(!n||d)&&(this._tileZoom=a,this._abortLoading&&this._abortLoading(),this._updateLevels(),this._resetGrid(),a!==void 0&&this._update(t),i||this._pruneTiles(),this._noPrune=!!i),this._setZoomTransforms(t,e)},_setZoomTransforms:function(t,e){for(var i in this._levels)this._setZoomTransform(this._levels[i],t,e)},_setZoomTransform:function(t,e,i){var n=this._map.getZoomScale(i,t.zoom),a=t.origin.multiplyBy(n).subtract(this._map._getNewPixelOrigin(e,i)).round();Y.any3d?Rt(t.el,a,n):ft(t.el,a)},_resetGrid:function(){var t=this._map,e=t.options.crs,i=this._tileSize=this.getTileSize(),n=this._tileZoom,a=this._map.getPixelWorldBounds(this._tileZoom);a&&(this._globalTileRange=this._pxBoundsToTileRange(a)),this._wrapX=e.wrapLng&&!this.options.noWrap&&[Math.floor(t.project([0,e.wrapLng[0]],n).x/i.x),Math.ceil(t.project([0,e.wrapLng[1]],n).x/i.y)],this._wrapY=e.wrapLat&&!this.options.noWrap&&[Math.floor(t.project([e.wrapLat[0],0],n).y/i.x),Math.ceil(t.project([e.wrapLat[1],0],n).y/i.y)]},_onMoveEnd:function(){!this._map||this._map._animatingZoom||this._update()},_getTiledPixelBounds:function(t){var e=this._map,i=e._animatingZoom?Math.max(e._animateToZoom,e.getZoom()):e.getZoom(),n=e.getZoomScale(i,this._tileZoom),a=e.project(t,this._tileZoom).floor(),d=e.getSize().divideBy(n*2);return new et(a.subtract(d),a.add(d))},_update:function(t){var e=this._map;if(e){var i=this._clampZoom(e.getZoom());if(t===void 0&&(t=e.getCenter()),this._tileZoom!==void 0){var n=this._getTiledPixelBounds(t),a=this._pxBoundsToTileRange(n),d=a.getCenter(),_=[],b=this.options.keepBuffer,P=new et(a.getBottomLeft().subtract([b,-b]),a.getTopRight().add([b,-b]));if(!(isFinite(a.min.x)&&isFinite(a.min.y)&&isFinite(a.max.x)&&isFinite(a.max.y)))throw new Error("Attempted to load an infinite number of tiles");for(var D in this._tiles){var O=this._tiles[D].coords;(O.z!==this._tileZoom||!P.contains(new F(O.x,O.y)))&&(this._tiles[D].current=!1)}if(Math.abs(i-this._tileZoom)>1){this._setView(t,i);return}for(var W=a.min.y;W<=a.max.y;W++)for(var Q=a.min.x;Q<=a.max.x;Q++){var vt=new F(Q,W);if(vt.z=this._tileZoom,!!this._isValidTile(vt)){var mt=this._tiles[this._tileCoordsToKey(vt)];mt?mt.current=!0:_.push(vt)}}if(_.sort(function(xt,Qt){return xt.distanceTo(d)-Qt.distanceTo(d)}),_.length!==0){this._loading||(this._loading=!0,this.fire("loading"));var Lt=document.createDocumentFragment();for(Q=0;Q<_.length;Q++)this._addTile(_[Q],Lt);this._level.el.appendChild(Lt)}}}},_isValidTile:function(t){var e=this._map.options.crs;if(!e.infinite){var i=this._globalTileRange;if(!e.wrapLng&&(t.x<i.min.x||t.x>i.max.x)||!e.wrapLat&&(t.y<i.min.y||t.y>i.max.y))return!1}if(!this.options.bounds)return!0;var n=this._tileCoordsToBounds(t);return ut(this.options.bounds).overlaps(n)},_keyToBounds:function(t){return this._tileCoordsToBounds(this._keyToTileCoords(t))},_tileCoordsToNwSe:function(t){var e=this._map,i=this.getTileSize(),n=t.scaleBy(i),a=n.add(i),d=e.unproject(n,t.z),_=e.unproject(a,t.z);return[d,_]},_tileCoordsToBounds:function(t){var e=this._tileCoordsToNwSe(t),i=new yt(e[0],e[1]);return this.options.noWrap||(i=this._map.wrapLatLngBounds(i)),i},_tileCoordsToKey:function(t){return t.x+":"+t.y+":"+t.z},_keyToTileCoords:function(t){var e=t.split(":"),i=new F(+e[0],+e[1]);return i.z=+e[2],i},_removeTile:function(t){var e=this._tiles[t];e&&(ht(e.el),delete this._tiles[t],this.fire("tileunload",{tile:e.el,coords:this._keyToTileCoords(t)}))},_initTile:function(t){q(t,"leaflet-tile");var e=this.getTileSize();t.style.width=e.x+"px",t.style.height=e.y+"px",t.onselectstart=v,t.onmousemove=v,Y.ielt9&&this.options.opacity<1&&wt(t,this.options.opacity)},_addTile:function(t,e){var i=this._getTilePos(t),n=this._tileCoordsToKey(t),a=this.createTile(this._wrapCoords(t),c(this._tileReady,this,t));this._initTile(a),this.createTile.length<2&&H(c(this._tileReady,this,t,null,a)),ft(a,i),this._tiles[n]={el:a,coords:t,current:!0},e.appendChild(a),this.fire("tileloadstart",{tile:a,coords:t})},_tileReady:function(t,e,i){e&&this.fire("tileerror",{error:e,tile:i,coords:t});var n=this._tileCoordsToKey(t);i=this._tiles[n],i&&(i.loaded=+new Date,this._map._fadeAnimated?(wt(i.el,0),K(this._fadeFrame),this._fadeFrame=H(this._updateOpacity,this)):(i.active=!0,this._pruneTiles()),e||(q(i.el,"leaflet-tile-loaded"),this.fire("tileload",{tile:i.el,coords:t})),this._noTilesToLoad()&&(this._loading=!1,this.fire("load"),Y.ielt9||!this._map._fadeAnimated?H(this._pruneTiles,this):setTimeout(c(this._pruneTiles,this),250)))},_getTilePos:function(t){return t.scaleBy(this.getTileSize()).subtract(this._level.origin)},_wrapCoords:function(t){var e=new F(this._wrapX?g(t.x,this._wrapX):t.x,this._wrapY?g(t.y,this._wrapY):t.y);return e.z=t.z,e},_pxBoundsToTileRange:function(t){var e=this.getTileSize();return new et(t.min.unscaleBy(e).floor(),t.max.unscaleBy(e).ceil().subtract([1,1]))},_noTilesToLoad:function(){for(var t in this._tiles)if(!this._tiles[t].loaded)return!1;return!0}});function Zs(t){return new de(t)}var Kt=de.extend({options:{minZoom:0,maxZoom:18,subdomains:"abc",errorTileUrl:"",zoomOffset:0,tms:!1,zoomReverse:!1,detectRetina:!1,crossOrigin:!1,referrerPolicy:!1},initialize:function(t,e){this._url=t,e=E(this,e),e.detectRetina&&Y.retina&&e.maxZoom>0?(e.tileSize=Math.floor(e.tileSize/2),e.zoomReverse?(e.zoomOffset--,e.minZoom=Math.min(e.maxZoom,e.minZoom+1)):(e.zoomOffset++,e.maxZoom=Math.max(e.minZoom,e.maxZoom-1)),e.minZoom=Math.max(0,e.minZoom)):e.zoomReverse?e.minZoom=Math.min(e.maxZoom,e.minZoom):e.maxZoom=Math.max(e.minZoom,e.maxZoom),typeof e.subdomains=="string"&&(e.subdomains=e.subdomains.split("")),this.on("tileunload",this._onTileRemove)},setUrl:function(t,e){return this._url===t&&e===void 0&&(e=!0),this._url=t,e||this.redraw(),this},createTile:function(t,e){var i=document.createElement("img");return J(i,"load",c(this._tileOnLoad,this,e,i)),J(i,"error",c(this._tileOnError,this,e,i)),(this.options.crossOrigin||this.options.crossOrigin==="")&&(i.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),typeof this.options.referrerPolicy=="string"&&(i.referrerPolicy=this.options.referrerPolicy),i.alt="",i.src=this.getTileUrl(t),i},getTileUrl:function(t){var e={r:Y.retina?"@2x":"",s:this._getSubdomain(t),x:t.x,y:t.y,z:this._getZoomForUrl()};if(this._map&&!this._map.options.crs.infinite){var i=this._globalTileRange.max.y-t.y;this.options.tms&&(e.y=i),e["-y"]=i}return S(this._url,h(e,this.options))},_tileOnLoad:function(t,e){Y.ielt9?setTimeout(c(t,this,null,e),0):t(null,e)},_tileOnError:function(t,e,i){var n=this.options.errorTileUrl;n&&e.getAttribute("src")!==n&&(e.src=n),t(i,e)},_onTileRemove:function(t){t.tile.onload=null},_getZoomForUrl:function(){var t=this._tileZoom,e=this.options.maxZoom,i=this.options.zoomReverse,n=this.options.zoomOffset;return i&&(t=e-t),t+n},_getSubdomain:function(t){var e=Math.abs(t.x+t.y)%this.options.subdomains.length;return this.options.subdomains[e]},_abortLoading:function(){var t,e;for(t in this._tiles)if(this._tiles[t].coords.z!==this._tileZoom&&(e=this._tiles[t].el,e.onload=v,e.onerror=v,!e.complete)){e.src=A;var i=this._tiles[t].coords;ht(e),delete this._tiles[t],this.fire("tileabort",{tile:e,coords:i})}},_removeTile:function(t){var e=this._tiles[t];if(e)return e.el.setAttribute("src",A),de.prototype._removeTile.call(this,t)},_tileReady:function(t,e,i){if(!(!this._map||i&&i.getAttribute("src")===A))return de.prototype._tileReady.call(this,t,e,i)}});function fn(t,e){return new Kt(t,e)}var pn=Kt.extend({defaultWmsParams:{service:"WMS",request:"GetMap",layers:"",styles:"",format:"image/jpeg",transparent:!1,version:"1.1.1"},options:{crs:null,uppercase:!1},initialize:function(t,e){this._url=t;var i=h({},this.defaultWmsParams);for(var n in e)n in this.options||(i[n]=e[n]);e=E(this,e);var a=e.detectRetina&&Y.retina?2:1,d=this.getTileSize();i.width=d.x*a,i.height=d.y*a,this.wmsParams=i},onAdd:function(t){this._crs=this.options.crs||t.options.crs,this._wmsVersion=parseFloat(this.wmsParams.version);var e=this._wmsVersion>=1.3?"crs":"srs";this.wmsParams[e]=this._crs.code,Kt.prototype.onAdd.call(this,t)},getTileUrl:function(t){var e=this._tileCoordsToNwSe(t),i=this._crs,n=dt(i.project(e[0]),i.project(e[1])),a=n.min,d=n.max,_=(this._wmsVersion>=1.3&&this._crs===an?[a.y,a.x,d.y,d.x]:[a.x,a.y,d.x,d.y]).join(","),b=Kt.prototype.getTileUrl.call(this,t);return b+I(this.wmsParams,b,this.options.uppercase)+(this.options.uppercase?"&BBOX=":"&bbox=")+_},setParams:function(t,e){return h(this.wmsParams,t),e||this.redraw(),this}});function $s(t,e){return new pn(t,e)}Kt.WMS=pn,fn.wms=$s;var zt=Tt.extend({options:{padding:.1},initialize:function(t){E(this,t),p(this),this._layers=this._layers||{}},onAdd:function(){this._container||(this._initContainer(),q(this._container,"leaflet-zoom-animated")),this.getPane().appendChild(this._container),this._update(),this.on("update",this._updatePaths,this)},onRemove:function(){this.off("update",this._updatePaths,this),this._destroyContainer()},getEvents:function(){var t={viewreset:this._reset,zoom:this._onZoom,moveend:this._update,zoomend:this._onZoomEnd};return this._zoomAnimated&&(t.zoomanim=this._onAnimZoom),t},_onAnimZoom:function(t){this._updateTransform(t.center,t.zoom)},_onZoom:function(){this._updateTransform(this._map.getCenter(),this._map.getZoom())},_updateTransform:function(t,e){var i=this._map.getZoomScale(e,this._zoom),n=this._map.getSize().multiplyBy(.5+this.options.padding),a=this._map.project(this._center,e),d=n.multiplyBy(-i).add(a).subtract(this._map._getNewPixelOrigin(t,e));Y.any3d?Rt(this._container,d,i):ft(this._container,d)},_reset:function(){this._update(),this._updateTransform(this._center,this._zoom);for(var t in this._layers)this._layers[t]._reset()},_onZoomEnd:function(){for(var t in this._layers)this._layers[t]._project()},_updatePaths:function(){for(var t in this._layers)this._layers[t]._update()},_update:function(){var t=this.options.padding,e=this._map.getSize(),i=this._map.containerPointToLayerPoint(e.multiplyBy(-t)).round();this._bounds=new et(i,i.add(e.multiplyBy(1+t*2)).round()),this._center=this._map.getCenter(),this._zoom=this._map.getZoom()}}),mn=zt.extend({options:{tolerance:0},getEvents:function(){var t=zt.prototype.getEvents.call(this);return t.viewprereset=this._onViewPreReset,t},_onViewPreReset:function(){this._postponeUpdatePaths=!0},onAdd:function(){zt.prototype.onAdd.call(this),this._draw()},_initContainer:function(){var t=this._container=document.createElement("canvas");J(t,"mousemove",this._onMouseMove,this),J(t,"click dblclick mousedown mouseup contextmenu",this._onClick,this),J(t,"mouseout",this._handleMouseOut,this),t._leaflet_disable_events=!0,this._ctx=t.getContext("2d")},_destroyContainer:function(){K(this._redrawRequest),delete this._ctx,ht(this._container),lt(this._container),delete this._container},_updatePaths:function(){if(!this._postponeUpdatePaths){var t;this._redrawBounds=null;for(var e in this._layers)t=this._layers[e],t._update();this._redraw()}},_update:function(){if(!(this._map._animatingZoom&&this._bounds)){zt.prototype._update.call(this);var t=this._bounds,e=this._container,i=t.getSize(),n=Y.retina?2:1;ft(e,t.min),e.width=n*i.x,e.height=n*i.y,e.style.width=i.x+"px",e.style.height=i.y+"px",Y.retina&&this._ctx.scale(2,2),this._ctx.translate(-t.min.x,-t.min.y),this.fire("update")}},_reset:function(){zt.prototype._reset.call(this),this._postponeUpdatePaths&&(this._postponeUpdatePaths=!1,this._updatePaths())},_initPath:function(t){this._updateDashArray(t),this._layers[p(t)]=t;var e=t._order={layer:t,prev:this._drawLast,next:null};this._drawLast&&(this._drawLast.next=e),this._drawLast=e,this._drawFirst=this._drawFirst||this._drawLast},_addPath:function(t){this._requestRedraw(t)},_removePath:function(t){var e=t._order,i=e.next,n=e.prev;i?i.prev=n:this._drawLast=n,n?n.next=i:this._drawFirst=i,delete t._order,delete this._layers[p(t)],this._requestRedraw(t)},_updatePath:function(t){this._extendRedrawBounds(t),t._project(),t._update(),this._requestRedraw(t)},_updateStyle:function(t){this._updateDashArray(t),this._requestRedraw(t)},_updateDashArray:function(t){if(typeof t.options.dashArray=="string"){var e=t.options.dashArray.split(/[, ]+/),i=[],n,a;for(a=0;a<e.length;a++){if(n=Number(e[a]),isNaN(n))return;i.push(n)}t.options._dashArray=i}else t.options._dashArray=t.options.dashArray},_requestRedraw:function(t){this._map&&(this._extendRedrawBounds(t),this._redrawRequest=this._redrawRequest||H(this._redraw,this))},_extendRedrawBounds:function(t){if(t._pxBounds){var e=(t.options.weight||0)+1;this._redrawBounds=this._redrawBounds||new et,this._redrawBounds.extend(t._pxBounds.min.subtract([e,e])),this._redrawBounds.extend(t._pxBounds.max.add([e,e]))}},_redraw:function(){this._redrawRequest=null,this._redrawBounds&&(this._redrawBounds.min._floor(),this._redrawBounds.max._ceil()),this._clear(),this._draw(),this._redrawBounds=null},_clear:function(){var t=this._redrawBounds;if(t){var e=t.getSize();this._ctx.clearRect(t.min.x,t.min.y,e.x,e.y)}else this._ctx.save(),this._ctx.setTransform(1,0,0,1,0,0),this._ctx.clearRect(0,0,this._container.width,this._container.height),this._ctx.restore()},_draw:function(){var t,e=this._redrawBounds;if(this._ctx.save(),e){var i=e.getSize();this._ctx.beginPath(),this._ctx.rect(e.min.x,e.min.y,i.x,i.y),this._ctx.clip()}this._drawing=!0;for(var n=this._drawFirst;n;n=n.next)t=n.layer,(!e||t._pxBounds&&t._pxBounds.intersects(e))&&t._updatePath();this._drawing=!1,this._ctx.restore()},_updatePoly:function(t,e){if(this._drawing){var i,n,a,d,_=t._parts,b=_.length,P=this._ctx;if(b){for(P.beginPath(),i=0;i<b;i++){for(n=0,a=_[i].length;n<a;n++)d=_[i][n],P[n?"lineTo":"moveTo"](d.x,d.y);e&&P.closePath()}this._fillStroke(P,t)}}},_updateCircle:function(t){if(!(!this._drawing||t._empty())){var e=t._point,i=this._ctx,n=Math.max(Math.round(t._radius),1),a=(Math.max(Math.round(t._radiusY),1)||n)/n;a!==1&&(i.save(),i.scale(1,a)),i.beginPath(),i.arc(e.x,e.y/a,n,0,Math.PI*2,!1),a!==1&&i.restore(),this._fillStroke(i,t)}},_fillStroke:function(t,e){var i=e.options;i.fill&&(t.globalAlpha=i.fillOpacity,t.fillStyle=i.fillColor||i.color,t.fill(i.fillRule||"evenodd")),i.stroke&&i.weight!==0&&(t.setLineDash&&t.setLineDash(e.options&&e.options._dashArray||[]),t.globalAlpha=i.opacity,t.lineWidth=i.weight,t.strokeStyle=i.color,t.lineCap=i.lineCap,t.lineJoin=i.lineJoin,t.stroke())},_onClick:function(t){for(var e=this._map.mouseEventToLayerPoint(t),i,n,a=this._drawFirst;a;a=a.next)i=a.layer,i.options.interactive&&i._containsPoint(e)&&(!(t.type==="click"||t.type==="preclick")||!this._map._draggableMoved(i))&&(n=i);this._fireEvent(n?[n]:!1,t)},_onMouseMove:function(t){if(!(!this._map||this._map.dragging.moving()||this._map._animatingZoom)){var e=this._map.mouseEventToLayerPoint(t);this._handleMouseHover(t,e)}},_handleMouseOut:function(t){var e=this._hoveredLayer;e&&(ct(this._container,"leaflet-interactive"),this._fireEvent([e],t,"mouseout"),this._hoveredLayer=null,this._mouseHoverThrottled=!1)},_handleMouseHover:function(t,e){if(!this._mouseHoverThrottled){for(var i,n,a=this._drawFirst;a;a=a.next)i=a.layer,i.options.interactive&&i._containsPoint(e)&&(n=i);n!==this._hoveredLayer&&(this._handleMouseOut(t),n&&(q(this._container,"leaflet-interactive"),this._fireEvent([n],t,"mouseover"),this._hoveredLayer=n)),this._fireEvent(this._hoveredLayer?[this._hoveredLayer]:!1,t),this._mouseHoverThrottled=!0,setTimeout(c(function(){this._mouseHoverThrottled=!1},this),32)}},_fireEvent:function(t,e,i){this._map._fireDOMEvent(e,i||e.type,t)},_bringToFront:function(t){var e=t._order;if(e){var i=e.next,n=e.prev;if(i)i.prev=n;else return;n?n.next=i:i&&(this._drawFirst=i),e.prev=this._drawLast,this._drawLast.next=e,e.next=null,this._drawLast=e,this._requestRedraw(t)}},_bringToBack:function(t){var e=t._order;if(e){var i=e.next,n=e.prev;if(n)n.next=i;else return;i?i.prev=n:n&&(this._drawLast=n),e.prev=null,e.next=this._drawFirst,this._drawFirst.prev=e,this._drawFirst=e,this._requestRedraw(t)}}});function gn(t){return Y.canvas?new mn(t):null}var ue=function(){try{return document.namespaces.add("lvml","urn:schemas-microsoft-com:vml"),function(t){return document.createElement("<lvml:"+t+' class="lvml">')}}catch{}return function(t){return document.createElement("<"+t+' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')}}(),Ys={_initContainer:function(){this._container=ot("div","leaflet-vml-container")},_update:function(){this._map._animatingZoom||(zt.prototype._update.call(this),this.fire("update"))},_initPath:function(t){var e=t._container=ue("shape");q(e,"leaflet-vml-shape "+(this.options.className||"")),e.coordsize="1 1",t._path=ue("path"),e.appendChild(t._path),this._updateStyle(t),this._layers[p(t)]=t},_addPath:function(t){var e=t._container;this._container.appendChild(e),t.options.interactive&&t.addInteractiveTarget(e)},_removePath:function(t){var e=t._container;ht(e),t.removeInteractiveTarget(e),delete this._layers[p(t)]},_updateStyle:function(t){var e=t._stroke,i=t._fill,n=t.options,a=t._container;a.stroked=!!n.stroke,a.filled=!!n.fill,n.stroke?(e||(e=t._stroke=ue("stroke")),a.appendChild(e),e.weight=n.weight+"px",e.color=n.color,e.opacity=n.opacity,n.dashArray?e.dashStyle=C(n.dashArray)?n.dashArray.join(" "):n.dashArray.replace(/( *, *)/g," "):e.dashStyle="",e.endcap=n.lineCap.replace("butt","flat"),e.joinstyle=n.lineJoin):e&&(a.removeChild(e),t._stroke=null),n.fill?(i||(i=t._fill=ue("fill")),a.appendChild(i),i.color=n.fillColor||n.color,i.opacity=n.fillOpacity):i&&(a.removeChild(i),t._fill=null)},_updateCircle:function(t){var e=t._point.round(),i=Math.round(t._radius),n=Math.round(t._radiusY||i);this._setPath(t,t._empty()?"M0 0":"AL "+e.x+","+e.y+" "+i+","+n+" 0,"+65535*360)},_setPath:function(t,e){t._path.v=e},_bringToFront:function(t){Gt(t._container)},_bringToBack:function(t){Ut(t._container)}},De=Y.vml?ue:yi,fe=zt.extend({_initContainer:function(){this._container=De("svg"),this._container.setAttribute("pointer-events","none"),this._rootGroup=De("g"),this._container.appendChild(this._rootGroup)},_destroyContainer:function(){ht(this._container),lt(this._container),delete this._container,delete this._rootGroup,delete this._svgSize},_update:function(){if(!(this._map._animatingZoom&&this._bounds)){zt.prototype._update.call(this);var t=this._bounds,e=t.getSize(),i=this._container;(!this._svgSize||!this._svgSize.equals(e))&&(this._svgSize=e,i.setAttribute("width",e.x),i.setAttribute("height",e.y)),ft(i,t.min),i.setAttribute("viewBox",[t.min.x,t.min.y,e.x,e.y].join(" ")),this.fire("update")}},_initPath:function(t){var e=t._path=De("path");t.options.className&&q(e,t.options.className),t.options.interactive&&q(e,"leaflet-interactive"),this._updateStyle(t),this._layers[p(t)]=t},_addPath:function(t){this._rootGroup||this._initContainer(),this._rootGroup.appendChild(t._path),t.addInteractiveTarget(t._path)},_removePath:function(t){ht(t._path),t.removeInteractiveTarget(t._path),delete this._layers[p(t)]},_updatePath:function(t){t._project(),t._update()},_updateStyle:function(t){var e=t._path,i=t.options;e&&(i.stroke?(e.setAttribute("stroke",i.color),e.setAttribute("stroke-opacity",i.opacity),e.setAttribute("stroke-width",i.weight),e.setAttribute("stroke-linecap",i.lineCap),e.setAttribute("stroke-linejoin",i.lineJoin),i.dashArray?e.setAttribute("stroke-dasharray",i.dashArray):e.removeAttribute("stroke-dasharray"),i.dashOffset?e.setAttribute("stroke-dashoffset",i.dashOffset):e.removeAttribute("stroke-dashoffset")):e.setAttribute("stroke","none"),i.fill?(e.setAttribute("fill",i.fillColor||i.color),e.setAttribute("fill-opacity",i.fillOpacity),e.setAttribute("fill-rule",i.fillRule||"evenodd")):e.setAttribute("fill","none"))},_updatePoly:function(t,e){this._setPath(t,xi(t._parts,e))},_updateCircle:function(t){var e=t._point,i=Math.max(Math.round(t._radius),1),n=Math.max(Math.round(t._radiusY),1)||i,a="a"+i+","+n+" 0 1,0 ",d=t._empty()?"M0 0":"M"+(e.x-i)+","+e.y+a+i*2+",0 "+a+-i*2+",0 ";this._setPath(t,d)},_setPath:function(t,e){t._path.setAttribute("d",e)},_bringToFront:function(t){Gt(t._path)},_bringToBack:function(t){Ut(t._path)}});Y.vml&&fe.include(Ys);function _n(t){return Y.svg||Y.vml?new fe(t):null}nt.include({getRenderer:function(t){var e=t.options.renderer||this._getPaneRenderer(t.options.pane)||this.options.renderer||this._renderer;return e||(e=this._renderer=this._createRenderer()),this.hasLayer(e)||this.addLayer(e),e},_getPaneRenderer:function(t){if(t==="overlayPane"||t===void 0)return!1;var e=this._paneRenderers[t];return e===void 0&&(e=this._createRenderer({pane:t}),this._paneRenderers[t]=e),e},_createRenderer:function(t){return this.options.preferCanvas&&gn(t)||_n(t)}});var vn=Vt.extend({initialize:function(t,e){Vt.prototype.initialize.call(this,this._boundsToLatLngs(t),e)},setBounds:function(t){return this.setLatLngs(this._boundsToLatLngs(t))},_boundsToLatLngs:function(t){return t=ut(t),[t.getSouthWest(),t.getNorthWest(),t.getNorthEast(),t.getSouthEast()]}});function Xs(t,e){return new vn(t,e)}fe.create=De,fe.pointsToPath=xi,Dt.geometryToLayer=Pe,Dt.coordsToLatLng=di,Dt.coordsToLatLngs=Ee,Dt.latLngToCoords=ui,Dt.latLngsToCoords=Se,Dt.getFeature=qt,Dt.asFeature=Ce,nt.mergeOptions({boxZoom:!0});var yn=St.extend({initialize:function(t){this._map=t,this._container=t._container,this._pane=t._panes.overlayPane,this._resetStateTimeout=0,t.on("unload",this._destroy,this)},addHooks:function(){J(this._container,"mousedown",this._onMouseDown,this)},removeHooks:function(){lt(this._container,"mousedown",this._onMouseDown,this)},moved:function(){return this._moved},_destroy:function(){ht(this._pane),delete this._pane},_resetState:function(){this._resetStateTimeout=0,this._moved=!1},_clearDeferredResetState:function(){this._resetStateTimeout!==0&&(clearTimeout(this._resetStateTimeout),this._resetStateTimeout=0)},_onMouseDown:function(t){if(!t.shiftKey||t.which!==1&&t.button!==1)return!1;this._clearDeferredResetState(),this._resetState(),se(),je(),this._startPoint=this._map.mouseEventToContainerPoint(t),J(document,{contextmenu:Yt,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseMove:function(t){this._moved||(this._moved=!0,this._box=ot("div","leaflet-zoom-box",this._container),q(this._container,"leaflet-crosshair"),this._map.fire("boxzoomstart")),this._point=this._map.mouseEventToContainerPoint(t);var e=new et(this._point,this._startPoint),i=e.getSize();ft(this._box,e.min),this._box.style.width=i.x+"px",this._box.style.height=i.y+"px"},_finish:function(){this._moved&&(ht(this._box),ct(this._container,"leaflet-crosshair")),oe(),Je(),lt(document,{contextmenu:Yt,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseUp:function(t){if(!(t.which!==1&&t.button!==1)&&(this._finish(),!!this._moved)){this._clearDeferredResetState(),this._resetStateTimeout=setTimeout(c(this._resetState,this),0);var e=new yt(this._map.containerPointToLatLng(this._startPoint),this._map.containerPointToLatLng(this._point));this._map.fitBounds(e).fire("boxzoomend",{boxZoomBounds:e})}},_onKeyDown:function(t){t.keyCode===27&&(this._finish(),this._clearDeferredResetState(),this._resetState())}});nt.addInitHook("addHandler","boxZoom",yn),nt.mergeOptions({doubleClickZoom:!0});var xn=St.extend({addHooks:function(){this._map.on("dblclick",this._onDoubleClick,this)},removeHooks:function(){this._map.off("dblclick",this._onDoubleClick,this)},_onDoubleClick:function(t){var e=this._map,i=e.getZoom(),n=e.options.zoomDelta,a=t.originalEvent.shiftKey?i-n:i+n;e.options.doubleClickZoom==="center"?e.setZoom(a):e.setZoomAround(t.containerPoint,a)}});nt.addInitHook("addHandler","doubleClickZoom",xn),nt.mergeOptions({dragging:!0,inertia:!0,inertiaDeceleration:3400,inertiaMaxSpeed:1/0,easeLinearity:.2,worldCopyJump:!1,maxBoundsViscosity:0});var wn=St.extend({addHooks:function(){if(!this._draggable){var t=this._map;this._draggable=new Bt(t._mapPane,t._container),this._draggable.on({dragstart:this._onDragStart,drag:this._onDrag,dragend:this._onDragEnd},this),this._draggable.on("predrag",this._onPreDragLimit,this),t.options.worldCopyJump&&(this._draggable.on("predrag",this._onPreDragWrap,this),t.on("zoomend",this._onZoomEnd,this),t.whenReady(this._onZoomEnd,this))}q(this._map._container,"leaflet-grab leaflet-touch-drag"),this._draggable.enable(),this._positions=[],this._times=[]},removeHooks:function(){ct(this._map._container,"leaflet-grab"),ct(this._map._container,"leaflet-touch-drag"),this._draggable.disable()},moved:function(){return this._draggable&&this._draggable._moved},moving:function(){return this._draggable&&this._draggable._moving},_onDragStart:function(){var t=this._map;if(t._stop(),this._map.options.maxBounds&&this._map.options.maxBoundsViscosity){var e=ut(this._map.options.maxBounds);this._offsetLimit=dt(this._map.latLngToContainerPoint(e.getNorthWest()).multiplyBy(-1),this._map.latLngToContainerPoint(e.getSouthEast()).multiplyBy(-1).add(this._map.getSize())),this._viscosity=Math.min(1,Math.max(0,this._map.options.maxBoundsViscosity))}else this._offsetLimit=null;t.fire("movestart").fire("dragstart"),t.options.inertia&&(this._positions=[],this._times=[])},_onDrag:function(t){if(this._map.options.inertia){var e=this._lastTime=+new Date,i=this._lastPos=this._draggable._absPos||this._draggable._newPos;this._positions.push(i),this._times.push(e),this._prunePositions(e)}this._map.fire("move",t).fire("drag",t)},_prunePositions:function(t){for(;this._positions.length>1&&t-this._times[0]>50;)this._positions.shift(),this._times.shift()},_onZoomEnd:function(){var t=this._map.getSize().divideBy(2),e=this._map.latLngToLayerPoint([0,0]);this._initialWorldOffset=e.subtract(t).x,this._worldWidth=this._map.getPixelWorldBounds().getSize().x},_viscousLimit:function(t,e){return t-(t-e)*this._viscosity},_onPreDragLimit:function(){if(!(!this._viscosity||!this._offsetLimit)){var t=this._draggable._newPos.subtract(this._draggable._startPos),e=this._offsetLimit;t.x<e.min.x&&(t.x=this._viscousLimit(t.x,e.min.x)),t.y<e.min.y&&(t.y=this._viscousLimit(t.y,e.min.y)),t.x>e.max.x&&(t.x=this._viscousLimit(t.x,e.max.x)),t.y>e.max.y&&(t.y=this._viscousLimit(t.y,e.max.y)),this._draggable._newPos=this._draggable._startPos.add(t)}},_onPreDragWrap:function(){var t=this._worldWidth,e=Math.round(t/2),i=this._initialWorldOffset,n=this._draggable._newPos.x,a=(n-e+i)%t+e-i,d=(n+e+i)%t-e-i,_=Math.abs(a+i)<Math.abs(d+i)?a:d;this._draggable._absPos=this._draggable._newPos.clone(),this._draggable._newPos.x=_},_onDragEnd:function(t){var e=this._map,i=e.options,n=!i.inertia||t.noInertia||this._times.length<2;if(e.fire("dragend",t),n)e.fire("moveend");else{this._prunePositions(+new Date);var a=this._lastPos.subtract(this._positions[0]),d=(this._lastTime-this._times[0])/1e3,_=i.easeLinearity,b=a.multiplyBy(_/d),P=b.distanceTo([0,0]),D=Math.min(i.inertiaMaxSpeed,P),O=b.multiplyBy(D/P),W=D/(i.inertiaDeceleration*_),Q=O.multiplyBy(-W/2).round();!Q.x&&!Q.y?e.fire("moveend"):(Q=e._limitOffset(Q,e.options.maxBounds),H(function(){e.panBy(Q,{duration:W,easeLinearity:_,noMoveStart:!0,animate:!0})}))}}});nt.addInitHook("addHandler","dragging",wn),nt.mergeOptions({keyboard:!0,keyboardPanDelta:80});var bn=St.extend({keyCodes:{left:[37],right:[39],down:[40],up:[38],zoomIn:[187,107,61,171],zoomOut:[189,109,54,173]},initialize:function(t){this._map=t,this._setPanDelta(t.options.keyboardPanDelta),this._setZoomDelta(t.options.zoomDelta)},addHooks:function(){var t=this._map._container;t.tabIndex<=0&&(t.tabIndex="0"),J(t,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.on({focus:this._addHooks,blur:this._removeHooks},this)},removeHooks:function(){this._removeHooks(),lt(this._map._container,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.off({focus:this._addHooks,blur:this._removeHooks},this)},_onMouseDown:function(){if(!this._focused){var t=document.body,e=document.documentElement,i=t.scrollTop||e.scrollTop,n=t.scrollLeft||e.scrollLeft;this._map._container.focus(),window.scrollTo(n,i)}},_onFocus:function(){this._focused=!0,this._map.fire("focus")},_onBlur:function(){this._focused=!1,this._map.fire("blur")},_setPanDelta:function(t){var e=this._panKeys={},i=this.keyCodes,n,a;for(n=0,a=i.left.length;n<a;n++)e[i.left[n]]=[-1*t,0];for(n=0,a=i.right.length;n<a;n++)e[i.right[n]]=[t,0];for(n=0,a=i.down.length;n<a;n++)e[i.down[n]]=[0,t];for(n=0,a=i.up.length;n<a;n++)e[i.up[n]]=[0,-1*t]},_setZoomDelta:function(t){var e=this._zoomKeys={},i=this.keyCodes,n,a;for(n=0,a=i.zoomIn.length;n<a;n++)e[i.zoomIn[n]]=t;for(n=0,a=i.zoomOut.length;n<a;n++)e[i.zoomOut[n]]=-t},_addHooks:function(){J(document,"keydown",this._onKeyDown,this)},_removeHooks:function(){lt(document,"keydown",this._onKeyDown,this)},_onKeyDown:function(t){if(!(t.altKey||t.ctrlKey||t.metaKey)){var e=t.keyCode,i=this._map,n;if(e in this._panKeys){if(!i._panAnim||!i._panAnim._inProgress)if(n=this._panKeys[e],t.shiftKey&&(n=R(n).multiplyBy(3)),i.options.maxBounds&&(n=i._limitOffset(R(n),i.options.maxBounds)),i.options.worldCopyJump){var a=i.wrapLatLng(i.unproject(i.project(i.getCenter()).add(n)));i.panTo(a)}else i.panBy(n)}else if(e in this._zoomKeys)i.setZoom(i.getZoom()+(t.shiftKey?3:1)*this._zoomKeys[e]);else if(e===27&&i._popup&&i._popup.options.closeOnEscapeKey)i.closePopup();else return;Yt(t)}}});nt.addInitHook("addHandler","keyboard",bn),nt.mergeOptions({scrollWheelZoom:!0,wheelDebounceTime:40,wheelPxPerZoomLevel:60});var Ln=St.extend({addHooks:function(){J(this._map._container,"wheel",this._onWheelScroll,this),this._delta=0},removeHooks:function(){lt(this._map._container,"wheel",this._onWheelScroll,this)},_onWheelScroll:function(t){var e=Gi(t),i=this._map.options.wheelDebounceTime;this._delta+=e,this._lastMousePos=this._map.mouseEventToContainerPoint(t),this._startTime||(this._startTime=+new Date);var n=Math.max(i-(+new Date-this._startTime),0);clearTimeout(this._timer),this._timer=setTimeout(c(this._performZoom,this),n),Yt(t)},_performZoom:function(){var t=this._map,e=t.getZoom(),i=this._map.options.zoomSnap||0;t._stop();var n=this._delta/(this._map.options.wheelPxPerZoomLevel*4),a=4*Math.log(2/(1+Math.exp(-Math.abs(n))))/Math.LN2,d=i?Math.ceil(a/i)*i:a,_=t._limitZoom(e+(this._delta>0?d:-d))-e;this._delta=0,this._startTime=null,_&&(t.options.scrollWheelZoom==="center"?t.setZoom(e+_):t.setZoomAround(this._lastMousePos,e+_))}});nt.addInitHook("addHandler","scrollWheelZoom",Ln);var Ws=600;nt.mergeOptions({tapHold:Y.touchNative&&Y.safari&&Y.mobile,tapTolerance:15});var Mn=St.extend({addHooks:function(){J(this._map._container,"touchstart",this._onDown,this)},removeHooks:function(){lt(this._map._container,"touchstart",this._onDown,this)},_onDown:function(t){if(clearTimeout(this._holdTimeout),t.touches.length===1){var e=t.touches[0];this._startPos=this._newPos=new F(e.clientX,e.clientY),this._holdTimeout=setTimeout(c(function(){this._cancel(),this._isTapValid()&&(J(document,"touchend",gt),J(document,"touchend touchcancel",this._cancelClickPrevent),this._simulateEvent("contextmenu",e))},this),Ws),J(document,"touchend touchcancel contextmenu",this._cancel,this),J(document,"touchmove",this._onMove,this)}},_cancelClickPrevent:function t(){lt(document,"touchend",gt),lt(document,"touchend touchcancel",t)},_cancel:function(){clearTimeout(this._holdTimeout),lt(document,"touchend touchcancel contextmenu",this._cancel,this),lt(document,"touchmove",this._onMove,this)},_onMove:function(t){var e=t.touches[0];this._newPos=new F(e.clientX,e.clientY)},_isTapValid:function(){return this._newPos.distanceTo(this._startPos)<=this._map.options.tapTolerance},_simulateEvent:function(t,e){var i=new MouseEvent(t,{bubbles:!0,cancelable:!0,view:window,screenX:e.screenX,screenY:e.screenY,clientX:e.clientX,clientY:e.clientY});i._simulated=!0,e.target.dispatchEvent(i)}});nt.addInitHook("addHandler","tapHold",Mn),nt.mergeOptions({touchZoom:Y.touch,bounceAtZoomLimits:!0});var Tn=St.extend({addHooks:function(){q(this._map._container,"leaflet-touch-zoom"),J(this._map._container,"touchstart",this._onTouchStart,this)},removeHooks:function(){ct(this._map._container,"leaflet-touch-zoom"),lt(this._map._container,"touchstart",this._onTouchStart,this)},_onTouchStart:function(t){var e=this._map;if(!(!t.touches||t.touches.length!==2||e._animatingZoom||this._zooming)){var i=e.mouseEventToContainerPoint(t.touches[0]),n=e.mouseEventToContainerPoint(t.touches[1]);this._centerPoint=e.getSize()._divideBy(2),this._startLatLng=e.containerPointToLatLng(this._centerPoint),e.options.touchZoom!=="center"&&(this._pinchStartLatLng=e.containerPointToLatLng(i.add(n)._divideBy(2))),this._startDist=i.distanceTo(n),this._startZoom=e.getZoom(),this._moved=!1,this._zooming=!0,e._stop(),J(document,"touchmove",this._onTouchMove,this),J(document,"touchend touchcancel",this._onTouchEnd,this),gt(t)}},_onTouchMove:function(t){if(!(!t.touches||t.touches.length!==2||!this._zooming)){var e=this._map,i=e.mouseEventToContainerPoint(t.touches[0]),n=e.mouseEventToContainerPoint(t.touches[1]),a=i.distanceTo(n)/this._startDist;if(this._zoom=e.getScaleZoom(a,this._startZoom),!e.options.bounceAtZoomLimits&&(this._zoom<e.getMinZoom()&&a<1||this._zoom>e.getMaxZoom()&&a>1)&&(this._zoom=e._limitZoom(this._zoom)),e.options.touchZoom==="center"){if(this._center=this._startLatLng,a===1)return}else{var d=i._add(n)._divideBy(2)._subtract(this._centerPoint);if(a===1&&d.x===0&&d.y===0)return;this._center=e.unproject(e.project(this._pinchStartLatLng,this._zoom).subtract(d),this._zoom)}this._moved||(e._moveStart(!0,!1),this._moved=!0),K(this._animRequest);var _=c(e._move,e,this._center,this._zoom,{pinch:!0,round:!1},void 0);this._animRequest=H(_,this,!0),gt(t)}},_onTouchEnd:function(){if(!this._moved||!this._zooming){this._zooming=!1;return}this._zooming=!1,K(this._animRequest),lt(document,"touchmove",this._onTouchMove,this),lt(document,"touchend touchcancel",this._onTouchEnd,this),this._map.options.zoomAnimation?this._map._animateZoom(this._center,this._map._limitZoom(this._zoom),!0,this._map.options.zoomSnap):this._map._resetView(this._center,this._map._limitZoom(this._zoom))}});nt.addInitHook("addHandler","touchZoom",Tn),nt.BoxZoom=yn,nt.DoubleClickZoom=xn,nt.Drag=wn,nt.Keyboard=bn,nt.ScrollWheelZoom=Ln,nt.TapHold=Mn,nt.TouchZoom=Tn,o.Bounds=et,o.Browser=Y,o.CRS=At,o.Canvas=mn,o.Circle=ci,o.CircleMarker=Te,o.Class=st,o.Control=Mt,o.DivIcon=un,o.DivOverlay=Ct,o.DomEvent=ls,o.DomUtil=as,o.Draggable=Bt,o.Evented=at,o.FeatureGroup=kt,o.GeoJSON=Dt,o.GridLayer=de,o.Handler=St,o.Icon=Jt,o.ImageOverlay=Ae,o.LatLng=rt,o.LatLngBounds=yt,o.Layer=Tt,o.LayerGroup=jt,o.LineUtil=ws,o.Map=nt,o.Marker=Me,o.Mixin=ms,o.Path=Ot,o.Point=F,o.PolyUtil=gs,o.Polygon=Vt,o.Polyline=It,o.Popup=ke,o.PosAnimation=Ui,o.Projection=bs,o.Rectangle=vn,o.Renderer=zt,o.SVG=fe,o.SVGOverlay=dn,o.TileLayer=Kt,o.Tooltip=Ie,o.Transformation=Be,o.Util=X,o.VideoOverlay=cn,o.bind=c,o.bounds=dt,o.canvas=gn,o.circle=As,o.circleMarker=Cs,o.control=le,o.divIcon=Rs,o.extend=h,o.featureGroup=Ps,o.geoJSON=hn,o.geoJson=Ds,o.gridLayer=Zs,o.icon=Es,o.imageOverlay=zs,o.latLng=it,o.latLngBounds=ut,o.layerGroup=Ts,o.map=hs,o.marker=Ss,o.point=R,o.polygon=Is,o.polyline=ks,o.popup=Os,o.rectangle=Xs,o.setOptions=E,o.stamp=p,o.svg=_n,o.svgOverlay=Bs,o.tileLayer=fn,o.tooltip=Fs,o.transformation=te,o.version=r,o.videoOverlay=Ns;var Hs=window.L;o.noConflict=function(){return window.L=Hs,this},window.L=o})})(gi,gi.exports);var so=gi.exports;const L=no(so);

// --- src/utils.js ---
const $id = id => document.getElementById(id);
const bindClick = (el, fn) => { if (el) el.addEventListener('click', fn); };
const CONSTANTS = {
    LAT_DEG_PER_METER: 1 / 111111,
    PAPER_CONFIGS: {
        'A4_portrait': { w: 210, h: 296, expW: 1600, expH: 2262, paddingX: 250, paddingY: 300, shiftY: 150 },
        'A4_landscape': { w: 296, h: 210, expW: 2262, expH: 1600, paddingX: 300, paddingY: 200, shiftY: 50 },
        'A3_portrait': { w: 297, h: 420, expW: 2262, expH: 3200, paddingX: 350, paddingY: 400, shiftY: 200 },
        'A3_landscape': { w: 420, h: 297, expW: 3200, expH: 2262, paddingX: 400, paddingY: 300, shiftY: 100 },
        'A2_portrait': { w: 420, h: 594, expW: 3200, expH: 4526, paddingX: 500, paddingY: 600, shiftY: 300 },
        'A2_landscape': { w: 594, h: 420, expW: 4526, expH: 3200, paddingX: 600, paddingY: 500, shiftY: 200 },
        'A1_portrait': { w: 594, h: 841, expW: 4526, expH: 6408, paddingX: 700, paddingY: 800, shiftY: 400 },
        'A1_landscape': { w: 841, h: 594, expW: 6408, expH: 4526, paddingX: 800, paddingY: 700, shiftY: 300 },
        'A0_portrait': { w: 841, h: 1189, expW: 6408, expH: 9060, paddingX: 1000, paddingY: 1100, shiftY: 550 },
        'A0_landscape': { w: 1189, h: 841, expW: 9060, expH: 6408, paddingX: 1100, paddingY: 1000, shiftY: 450 }
    }
};
const Utils = {
    deg2rad: (deg) => deg * (Math.PI / 180),
    round4: (val) => (Math.round((val + Number.EPSILON) * 10000) / 10000).toFixed(4),
    parseDMS: (str) => {
        const matches = str.match(/-?\d+(\.\d+)?/g);
        if (!matches || matches.length < 3) return null;
        const sign = parseFloat(matches[0]) < 0 ? -1 : 1;
        return sign * (Math.abs(parseFloat(matches[0])) + parseFloat(matches[1])/60 + parseFloat(matches[2])/3600);
    },
    calculatePolygonArea: (points) => {
        if (points.length < 3) return 0;
        let area = 0;
        for (let i = 0; i < points.length; i++) {
            let j = (i + 1) % points.length;
            area += points[i].x * points[j].y - points[j].x * points[i].y;
        }
        return Math.abs(area / 2);
    },
    isPointInPolygon: (point, vs) => {
        let x = point[0], y = point[1];
        let inside = false;
        for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
            let xi = vs[i][0], yi = vs[i][1];
            let xj = vs[j][0], yj = vs[j][1];
            let intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
        return inside;
    },
    calculateMagDeclination: (lat, lon) => {
        const dPhi = lat - 37.0;
        const dLam = lon - 138.0;
        const dMin = 501.0 + 22.31 * dPhi - 7.85 * dLam + 0.54 * Math.pow(dPhi, 2) - 0.70 * dPhi * dLam - 0.14 * Math.pow(dLam, 2);
        return (dMin / 60.0);
    },
    estimateTextWidth: (text, fontSize) => {
        let width = 0;
        for (let i = 0; i < text.length; i++) { width += (text.charCodeAt(i) > 255) ? fontSize : fontSize * 0.6; }
        return width;
    },
    pointToLineDistance: (p, p1, p2) => {
        const l2 = Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2);
        if (l2 === 0) return Math.sqrt(Math.pow(p.x - p1.x, 2) + Math.pow(p.y - p1.y, 2));
        let t = ((p.x - p1.x) * (p2.x - p1.x) + (p.y - p1.y) * (p2.y - p1.y)) / l2;
        t = Math.max(0, Math.min(1, t));
        return Math.sqrt(Math.pow(p.x - (p1.x + t * (p2.x - p1.x)), 2) + Math.pow(p.y - (p1.y + t * (p2.y - p1.y)), 2));
    },
    escapeHTML: (str) => String(str ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
};


// --- src/surveyMath.js ---
const surveyMath = {
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
    },

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
    },

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
    },

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
    },

    findClosedAreas() {
        if (!this.els.chkCompassAdjustment.checked) { this.state.detectedAreas = []; $id('areaResults').style.display = 'none'; return; }
        const { edges, adj } = this._buildAdjacencyGraph();
        const allFaces = this._extractFaces(edges, adj);
        const nodeToComponent = this._identifyConnectedComponents(adj);
        const finalFaces = this._removeOuterBoundary(allFaces, nodeToComponent);
        this.state.detectedAreas = this._buildPolygonHierarchy(finalFaces);
        this._renderAreaResults(this.state.detectedAreas);
    },

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
    },

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
    },

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
    },

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
    },

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
    },

};


// --- src/drawing.js ---
const drawing = {
    _redrawAll() {
        this.draw();
        if (this.isMapMode) { this.updateMapDrawing(false); this._updateMapTempLine(); }
    },

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
    },

    getInternalCoordsFromLatLng(lat, lon) {
        const lat0 = parseFloat(this.els.inputLat.value) || 0, lon0 = parseFloat(this.els.inputLon.value) || 0;
        const lonDegPerMeter = CONSTANTS.LAT_DEG_PER_METER / Math.cos(Utils.deg2rad(lat0));
        return { x: (lon - lon0) / lonDegPerMeter, y: (lat - lat0) / CONSTANTS.LAT_DEG_PER_METER };
    },

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
            const dx = mouseX - cPx, dy = mouseY - cPy, cos = Math.cos(-rot), sin = Math.sin(-rot);
            const rotPx = cPx + dx * cos - dy * sin, rotPy = cPy + dx * sin + dy * cos;
            
            if (Math.abs(rotPx - cPx) < 16 && Math.abs(rotPy - topPy) < 16) return { type: 'handle', target };
            
            let boxW = 0;
            if (target.type === 'text') {
                const baseSize = ref.fontSize || 14;
                boxW = Utils.estimateTextWidth(ref.text || '', baseSize) * scale;
            } else {
                let minX = Infinity, maxX = -Infinity;
                ref.points.forEach(p => { if(p.x<minX)minX=p.x; if(p.x>maxX)maxX=p.x; });
                boxW = (maxX - minX) * scale;
            }
            const s = 10;
            if (Math.abs(rotPx - (cPx - boxW/2)) < s && Math.abs(rotPy - (cPy - boxH/2)) < s) return { type: 'scaleHandle', corner: 'tl', target };
            if (Math.abs(rotPx - (cPx + boxW/2)) < s && Math.abs(rotPy - (cPy - boxH/2)) < s) return { type: 'scaleHandle', corner: 'tr', target };
            if (Math.abs(rotPx - (cPx + boxW/2)) < s && Math.abs(rotPy - (cPy + boxH/2)) < s) return { type: 'scaleHandle', corner: 'br', target };
            if (Math.abs(rotPx - (cPx - boxW/2)) < s && Math.abs(rotPy - (cPy + boxH/2)) < s) return { type: 'scaleHandle', corner: 'bl', target };
        }

        for (let i = this.state.annotations.texts.length - 1; i >= 0; i--) {
            const t = this.state.annotations.texts[i], baseSize = t.fontSize || 14, w = Utils.estimateTextWidth(t.text || '', baseSize);
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
    },

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
    },

    _clearSelection() {
        if (this.state.selectedAnnotation !== null) {
            this.state.selectedAnnotation = null;
            this.els.propertyPanel.style.display = 'none';
            this._redrawAll();
        }
    },

    updateBounds() {
        const hasAnn = (this.state.annotations?.lines?.length > 0) || (this.state.annotations?.texts?.length > 0);
        if (this.state.nodes.size === 0 && !hasAnn) return;
        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        this.state.nodes.forEach(n => {
            if(n.x<minX)minX=n.x; if(n.x>maxX)maxX=n.x; if(n.y<minY)minY=n.y; if(n.y>maxY)maxY=n.y;
        });
        const expand = (x, y) => { if (!isNaN(x) && !isNaN(y)) { if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y; } };
        if (this.state.annotations) {
            (this.state.annotations.lines || []).forEach(line => {
                if (!line.points || line.points.length === 0) return;
                const rot = line.rotation || 0;
                let lMinX = Infinity, lMaxX = -Infinity, lMinY = Infinity, lMaxY = -Infinity;
                line.points.forEach(p => { if (p.x < lMinX) lMinX = p.x; if (p.x > lMaxX) lMaxX = p.x; if (p.y < lMinY) lMinY = p.y; if (p.y > lMaxY) lMaxY = p.y; });
                const cx = (lMinX + lMaxX) / 2, cy = (lMinY + lMaxY) / 2, cos = Math.cos(rot), sin = Math.sin(rot);
                line.points.forEach(p => { const dx = p.x - cx, dy = p.y - cy; expand(cx + dx * cos + dy * sin, cy - dx * sin + dy * cos); });
            });
            (this.state.annotations.texts || []).forEach(t => expand(t.x, t.y));
        }
        if (minX === Infinity) return;
        this.state.bounds = { minX, maxX, minY, maxY };
    },

    resizeCanvas() {
        this.els.canvas.width = this.els.container.clientWidth; this.els.canvas.height = this.els.container.clientHeight;
        this.draw(); if (this.isMapMode && this.map) this.map.invalidateSize();
    },

    autoFit() {
        this.updateBounds();
        const hasAnn = (this.state.annotations?.lines?.length > 0) || (this.state.annotations?.texts?.length > 0);
        if (this.state.nodes.size < 2 && !hasAnn) {
            this.state.view.scale = 1; this.state.view.offsetX = this.els.canvas.width / 2; this.state.view.offsetY = this.els.canvas.height / 2; return;
        }
        const { padding } = this.CONFIG.canvas, { bounds } = this.state, dW = bounds.maxX - bounds.minX, dH = bounds.maxY - bounds.minY;
        if (dW === 0 && dH === 0) this.state.view.scale = 10;
        else this.state.view.scale = Math.max(0.1, Math.min(Math.max(10, this.els.canvas.width - padding * 2) / (dW || 1), Math.max(10, this.els.canvas.height - padding * 2) / (dH || 1)));
        const cx = (bounds.minX + bounds.maxX) / 2, cy = (bounds.minY + bounds.maxY) / 2;
        this.state.view.offsetX = this.els.canvas.width / 2 - cx * this.state.view.scale;
        this.state.view.offsetY = this.els.canvas.height / 2 + cy * this.state.view.scale;
    },

    updateDrawing(fit = false) {
        this.calculateCoordinates(); this.findClosedAreas();
        if (fit || this.state.nodes.size === 2) this.autoFit();
        this.draw(); if (this.isMapMode) this.updateMapDrawing(fit); 
    },

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
    },

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
                const w = (maxX - minX) * scale;
                const h = (maxY - minY) * scale;
                
                ctx.beginPath();
                ctx.strokeStyle = isSel ? '#3b82f6' : 'rgba(59, 130, 246, 0.5)';
                ctx.lineWidth = 1;
                ctx.setLineDash([4, 4]);
                ctx.strokeRect(cPx - w / 2, cPy - h / 2, w, h);
                ctx.setLineDash([]);
                
                if (isSel) {
                    const topPy = cPy - h / 2 - 20; 
                    ctx.beginPath(); ctx.moveTo(cPx, cPy - h / 2); ctx.lineTo(cPx, topPy); ctx.strokeStyle = '#3b82f6'; ctx.lineWidth = 1.5; ctx.stroke();
                    ctx.beginPath(); ctx.arc(cPx, topPy, 6, 0, Math.PI * 2); ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.stroke();
                    
                    const s = 4;
                    const corners = [ {x: cPx - w / 2, y: cPy - h / 2}, {x: cPx + w / 2, y: cPy - h / 2}, {x: cPx + w / 2, y: cPy + h / 2}, {x: cPx - w / 2, y: cPy + h / 2} ];
                    ctx.fillStyle = '#ffffff';
                    corners.forEach(c => { ctx.fillRect(c.x - s, c.y - s, s * 2, s * 2); ctx.strokeRect(c.x - s, c.y - s, s * 2, s * 2); });
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
            const baseSize = t.fontSize || 14, fontSize = Math.round(baseSize * uiScale), w = Utils.estimateTextWidth(t.text || '', baseSize) * uiScale;
            
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
                ctx.lineWidth = 1; 
                ctx.setLineDash([4, 4]);
                ctx.strokeRect(drawPx - 2, drawPy - h - 2, w + 4, h + 4);
                ctx.setLineDash([]);
                
                if (isSel) {
                    const topPy = cPy - h / 2 - 20;
                    ctx.beginPath(); ctx.moveTo(cPx, cPy - h / 2); ctx.lineTo(cPx, topPy); ctx.strokeStyle = '#3b82f6'; ctx.lineWidth = 1.5; ctx.stroke();
                    ctx.beginPath(); ctx.arc(cPx, topPy, 6, 0, Math.PI * 2); ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.stroke();
                    
                    const s = 4;
                    const corners = [ {x: cPx - w / 2, y: cPy - h / 2}, {x: cPx + w / 2, y: cPy - h / 2}, {x: cPx + w / 2, y: cPy + h / 2}, {x: cPx - w / 2, y: cPy + h / 2} ];
                    ctx.fillStyle = '#ffffff';
                    corners.forEach(c => { ctx.fillRect(c.x - s, c.y - s, s * 2, s * 2); ctx.strokeRect(c.x - s, c.y - s, s * 2, s * 2); });
                }
            }
            ctx.strokeStyle = 'white'; ctx.lineWidth = Math.max(2, baseSize * 0.2) * uiScale; ctx.lineJoin = 'round';
            ctx.strokeText(t.text, drawPx, drawPy); ctx.fillStyle = color; ctx.fillText(t.text, drawPx, drawPy); ctx.restore();
        });
    },

    _drawAreas(ctx, offsetX, offsetY, scale, detectedAreas, nodes) {
        detectedAreas.forEach(a => {
            ctx.beginPath();
            a.path.forEach((n, idx) => { const node = nodes.get(n); if (idx === 0) ctx.moveTo(offsetX + node.x * scale, offsetY - node.y * scale); else ctx.lineTo(offsetX + node.x * scale, offsetY - node.y * scale); });
            ctx.closePath();
            if (a.isDonut) a.holes.forEach(h => { h.path.forEach((n, idx) => { const node = nodes.get(n); if (idx === 0) ctx.moveTo(offsetX + node.x * scale, offsetY - node.y * scale); else ctx.lineTo(offsetX + node.x * scale, offsetY - node.y * scale); }); ctx.closePath(); });
            ctx.fillStyle = this.CONFIG.colors.areaFill; ctx.fill('evenodd');
        });
    },

    _drawLines(ctx, offsetX, offsetY, scale, points) {
        points.forEach(p => {
            const px1 = offsetX + p.fromX * scale, py1 = offsetY - p.fromY * scale, px2 = offsetX + p.toX * scale, py2 = offsetY - p.toY * scale;
            if (!p.isDraw) {
                ctx.beginPath(); ctx.strokeStyle = '#9ca3af'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 4]); ctx.moveTo(px1, py1); ctx.lineTo(px2, py2); ctx.stroke(); ctx.setLineDash([]); return;
            }
            ctx.beginPath(); ctx.strokeStyle = '#ffffff'; ctx.lineWidth = p.type === 'branch' ? 3.5 : 4; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.moveTo(px1, py1); ctx.lineTo(px2, py2); ctx.stroke();
            ctx.beginPath(); ctx.strokeStyle = p.type === 'branch' ? this.CONFIG.colors.lineBranch : this.CONFIG.colors.lineMain; ctx.lineWidth = p.type === 'branch' ? 1.5 : 2; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.moveTo(px1, py1); ctx.lineTo(px2, py2); ctx.stroke();
        });
    },

    _drawNodes(ctx, offsetX, offsetY, scale, nodes, drawText = true) {
        const fp = this._getFirstPointName(), intv = parseInt(this.els.selNodeLabelInterval.value, 10);
        const sNode = nodes.get(fp); if(sNode) this._drawSingleNode(ctx, offsetX + sNode.x * scale, offsetY - sNode.y * scale, true, fp, drawText);
        let nIdx = 1;
        nodes.forEach((node, name) => {
            if (name === fp && Math.abs(node.x) < 0.001 && Math.abs(node.y) < 0.001) return;
            this._drawSingleNode(ctx, offsetX + node.x * scale, offsetY - node.y * scale, false, name, drawText && (intv === 1 || (intv > 1 && nIdx % intv === 0)));
            nIdx++;
        });
    },

    _drawSingleNode(ctx, px, py, isStart, name, showText) {
        ctx.beginPath(); ctx.arc(px, py, this.CONFIG.canvas.nodeRadius, 0, Math.PI * 2); ctx.fillStyle = isStart ? this.CONFIG.colors.startNode : this.CONFIG.colors.normalNode; ctx.fill(); ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1.5; ctx.stroke();
        if (showText) { ctx.fillStyle = this.CONFIG.colors.text; ctx.font = '12px sans-serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'; ctx.fillText(name, px + 8, py - 8); }
    },

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
    },

    _drawGrid(ctx, offsetX, offsetY, scale) {
        const gs = this.CONFIG.canvas.gridBaseSize * scale; if (gs < 10 || gs > 500) return;
        ctx.strokeStyle = this.CONFIG.colors.gridSub; ctx.lineWidth = 1;
        const sx = Math.floor((-offsetX) / gs) * gs, sy = Math.floor((-offsetY) / gs) * gs;
        ctx.beginPath();
        for (let x = sx; x < this.els.canvas.width - offsetX; x += gs) { ctx.moveTo(offsetX + x, 0); ctx.lineTo(offsetX + x, this.els.canvas.height); }
        for (let y = sy; y < this.els.canvas.height - offsetY; y += gs) { ctx.moveTo(0, offsetY + y); ctx.lineTo(this.els.canvas.width, offsetY + y); }
        ctx.stroke();
        ctx.beginPath(); ctx.strokeStyle = this.CONFIG.colors.gridMain; ctx.moveTo(offsetX, 0); ctx.lineTo(offsetX, this.els.canvas.height); ctx.moveTo(0, offsetY); ctx.lineTo(this.els.canvas.width, offsetY); ctx.stroke();
    },

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
    },

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
    },

    _updateLiveAnnotationDrawing() {
        if (this.isMapMode) {
            this.updateMapDrawing(false);
        } else {
            this.draw();
        }
    },

};


// --- src/mapView.js ---
const mapView = {
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
        this.map.on('zoomend', () => this.updateMapDrawing(false));
        this.map.on('contextmenu', (e) => { e.originalEvent.preventDefault(); if (this.state.mapView.rightDragMoved) return; if (this.state.interactionMode === 'line') this.finishCurrentLine(); });

        this.els.mapContainer.addEventListener('mousedown', (e) => {
            if (e.button === 2) {
                this.state.mapView.isRightDragging = true; this.state.mapView.rightDragMoved = false;
                this.state.mapView.dragStartX = this.state.mapView.lastMouseX = e.clientX; this.state.mapView.dragStartY = this.state.mapView.lastMouseY = e.clientY;
                document.body.classList.add('right-dragging');
            }
        });
    },

    handleMapClick(e) {
        if (this._lastAnnotationInteraction && Date.now() - this._lastAnnotationInteraction < 300) return;
        if (['pan', 'erase', 'select'].includes(this.state.interactionMode)) { if (this.state.interactionMode === 'select') this._clearSelection(); return; }
        const coords = this.getInternalCoordsFromLatLng(e.latlng.lat, e.latlng.lng);
        if (this.state.interactionMode === 'text') this._showTextPrompt(coords.x, coords.y);
        else if (this.state.interactionMode === 'line') { this.state.currentLine.push({ x: coords.x, y: coords.y }); this.state.view.currentMouseInternalX = coords.x; this.state.view.currentMouseInternalY = coords.y; this._redrawAll(); }
    },

    _updateMapTempLine() {
        if (!this.tempLineLayer) return;
        if (this.state.interactionMode === 'line' && this.state.currentLine.length > 0) {
            const lat0 = parseFloat(this.els.inputLat.value) || 0, lon0 = parseFloat(this.els.inputLon.value) || 0, lonDPM = CONSTANTS.LAT_DEG_PER_METER / Math.cos(Utils.deg2rad(lat0));
            const latlngs = this.state.currentLine.map(pt => [lat0 + pt.y * CONSTANTS.LAT_DEG_PER_METER, lon0 + pt.x * lonDPM]);
            if (this.state.view.currentMouseInternalX !== undefined) latlngs.push([lat0 + this.state.view.currentMouseInternalY * CONSTANTS.LAT_DEG_PER_METER, lon0 + this.state.view.currentMouseInternalX * lonDPM]);
            this.tempLineLayer.setLatLngs(latlngs);
        } else { this.tempLineLayer.setLatLngs([]); }
    },

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
    },

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
    },

    _getRotLatLng(pt, cx, cy, rot) {
        const lat0 = parseFloat(this.els.inputLat.value) || 0, lon0 = parseFloat(this.els.inputLon.value) || 0;
        const lonDPM = CONSTANTS.LAT_DEG_PER_METER / Math.cos(Utils.deg2rad(lat0));
        const dx = pt.x - cx, dy = pt.y - cy, cos = Math.cos(rot), sin = Math.sin(rot);
        return [lat0 + (cy - dx * sin + dy * cos) * CONSTANTS.LAT_DEG_PER_METER, lon0 + (cx + dx * cos + dy * sin) * lonDPM];
    },

    _drawMapAnnotations(lat0, lon0, lonDPM) {
        const selected = this.state.selectedAnnotation;

        (this.state.annotations?.lines || []).forEach((line, i) => {
            const rot = line.rotation || 0;
            let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
            line.points.forEach(p => { if(p.x<minX)minX=p.x; if(p.x>maxX)maxX=p.x; if(p.y<minY)minY=p.y; if(p.y>maxY)maxY=p.y; });
            const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2, coords = line.points.map(pt => this._getRotLatLng(pt, cx, cy, rot));
            const weight = line.lineWidth || 3, color = line.color || '#059669', isSel = selected?.type === 'line' && selected?.index === i;
            let dashArray = null; if (line.lineStyle === 'dashed') dashArray = '8, 6'; else if (line.lineStyle === 'dotted') dashArray = '2, 4';

            let highlightPolyline = null, handleLine = null, cLatLng = null, handleInternalY = 0, hMarker = null, tl = null, tr = null, br = null, bl = null;

            if (isSel) {
                tl = this._getRotLatLng({x: minX, y: maxY}, cx, cy, rot);
                tr = this._getRotLatLng({x: maxX, y: maxY}, cx, cy, rot);
                br = this._getRotLatLng({x: maxX, y: minY}, cx, cy, rot);
                bl = this._getRotLatLng({x: minX, y: minY}, cx, cy, rot);
                cLatLng = this._getRotLatLng({x: cx, y: cy}, cx, cy, 0);
                highlightPolyline = L.polyline([tl, tr, br, bl, tl], { color: '#3b82f6', weight: 1.5, dashArray: '5, 5', opacity: 0.8, interactive: false }).addTo(this.mapLayerGroup);
                
                const topEdgeLatLng = this._getRotLatLng({x: cx, y: maxY}, cx, cy, rot);
                
                const pxOffset = 20;
                const internalOffset = this._getPixelsToInternalDistance(pxOffset);
                handleInternalY = maxY + internalOffset;
                
                const topLatLng = this._getRotLatLng({x: cx, y: handleInternalY}, cx, cy, rot);
                handleLine = L.polyline([topEdgeLatLng, topLatLng], { color: '#3b82f6', weight: 2, interactive: false }).addTo(this.mapLayerGroup);
            }

            const polylineHit = L.polyline(coords, { color: 'transparent', weight: Math.max(20, weight + 15), interactive: true }).addTo(this.mapLayerGroup);
            const polyline = L.polyline(coords, { color, weight, dashArray, opacity: 0.9, interactive: false, className: 'no-select-text' }).addTo(this.mapLayerGroup);

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
                    const mX = (e.originalEvent.touches ? e.originalEvent.touches[0].clientX : e.originalEvent.clientX) - rect.left;
                    const mY = (e.originalEvent.touches ? e.originalEvent.touches[0].clientY : e.originalEvent.clientY) - rect.top;
                    const point = L.point(mX, mY);
                    const latlng = this.map.containerPointToLatLng(point);
                    const im = this.getInternalCoordsFromLatLng(latlng.lat, latlng.lng);
                    this.state.view.dragStartInternalX = im.x;
                    this.state.view.dragStartInternalY = im.y;
                    this.state.view.dragStartX = (e.originalEvent.touches ? e.originalEvent.touches[0].clientX : e.originalEvent.clientX);
                    this.state.view.dragStartY = (e.originalEvent.touches ? e.originalEvent.touches[0].clientY : e.originalEvent.clientY);
                    
                    this.state.view.movingLayer = polyline;
                    this.state.view.movingExtras = { highlightPolyline, handleLine, hMarker };

                    document.body.classList.add('left-dragging');
                });
                
                [tl, tr, br, bl].forEach((cornerLatLng, cIdx) => {
                    const cornerIds = ['tl', 'tr', 'br', 'bl'];
                    const sMarker = L.marker(cornerLatLng, {
                        icon: L.divIcon({ className: 'map-scale-handle', html: '<div style="width:8px;height:8px;background:#fff;border:1px solid #000;margin:-4px 0 0 -4px;cursor:crosshair;pointer-events:auto;"></div>', iconSize: [0,0] }),
                        draggable: false, zIndexOffset: 1000
                    }).addTo(this.mapLayerGroup);
                    sMarker.on('mousedown', (evt) => {
                        L.DomEvent.stopPropagation(evt);
                        L.DomEvent.preventDefault(evt.originalEvent);
                        this.map.dragging.disable();
                        this.state.view.isScaling = true;
                        this.state.view.scalingTarget = { type: 'line', index: i, ref: line, corner: cornerIds[cIdx] };
                        this.state.view.scalingInitialState = JSON.parse(JSON.stringify(line));
                        this.state.view.movingLayer = polyline;
                        this.state.view.movingExtras = { highlightPolyline, handleLine, hMarker };
                        
                        this.state.view.dragStartX = (evt.originalEvent.touches ? evt.originalEvent.touches[0].clientX : evt.originalEvent.clientX);
                        this.state.view.dragStartY = (evt.originalEvent.touches ? evt.originalEvent.touches[0].clientY : evt.originalEvent.clientY);
                        
                        const cPoint = this.map.latLngToContainerPoint(cLatLng);
                        const rect = this.els.mapContainer.getBoundingClientRect();
                        this.state.view.scaleCenterPx = { x: cPoint.x + rect.left, y: cPoint.y + rect.top };
                    });
                });
            }

            polylineHit.on('mouseover', () => {
                if (['select', 'erase'].includes(this.state.interactionMode)) {
                    document.body.classList.add('hovering-annotation');
                    if (!isSel) polyline.setStyle({ color: '#3b82f6', weight: weight + 4, opacity: 0.6 });
                }
            });
            polylineHit.on('mouseout', () => {
                document.body.classList.remove('hovering-annotation');
                if (!isSel) polyline.setStyle({ color, weight, dashArray, opacity: 0.9 });
            });
            polylineHit.on('mousedown', (e) => {
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
                    const mX = (e.originalEvent.touches ? e.originalEvent.touches[0].clientX : e.originalEvent.clientX) - rect.left;
                    const mY = (e.originalEvent.touches ? e.originalEvent.touches[0].clientY : e.originalEvent.clientY) - rect.top;
                    const point = L.point(mX, mY);
                    const latlng = this.map.containerPointToLatLng(point);
                    const im = this.getInternalCoordsFromLatLng(latlng.lat, latlng.lng);
                    this.state.view.dragStartInternalX = im.x;
                    this.state.view.dragStartInternalY = im.y;
                    
                    this.state.view.dragStartX = (e.originalEvent.touches ? e.originalEvent.touches[0].clientX : e.originalEvent.clientX);
                    this.state.view.dragStartY = (e.originalEvent.touches ? e.originalEvent.touches[0].clientY : e.originalEvent.clientY);

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
            polylineHit.on('click', (e) => { L.DomEvent.stopPropagation(e); if (this.state.interactionMode === 'erase') { this.state.annotations.lines.splice(i, 1); this.saveToLocalStorage(); this.pushState(); this._redrawAll(); } });
            polylineHit.on('contextmenu', (e) => { if (this.state.interactionMode === 'line') { L.DomEvent.stopPropagation(e); this.finishCurrentLine(); } });
        });

        (this.state.annotations?.texts || []).forEach((t, i) => {
            const bs = t.fontSize || 14;
            const cx = t.x, cy = t.y; 
            const cLatLng = this._getRotLatLng({x: cx, y: cy}, cx, cy, 0), isSel = selected?.type === 'text' && selected?.index === i;
            const hlStyle = isSel ? `border: 1.5px dashed #3b82f6; background: rgba(59, 130, 246, 0.15); margin-left:-2px; padding:0 2px;` : '';
            
            const marker = L.marker(cLatLng, { icon: L.divIcon({ className: 'map-annotation-label', html: `<div style="transform: rotate(${(t.rotation || 0) * 180 / Math.PI}deg) translate(-50%, -50%); transform-origin: 0 0; position: absolute; user-select: none; -webkit-user-select: none;"><div draggable="false" style="${hlStyle} color: ${t.color || '#059669'}; font-weight: bold; font-size: ${bs}px; text-shadow: 1px 1px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff; white-space: nowrap; pointer-events: auto; transition: background-color 0.1s, border 0.1s; user-select: none; -webkit-user-select: none;">${t.text}</div></div>`, iconSize: [0, 0], iconAnchor: [0, 0] }), interactive: true }).addTo(this.mapLayerGroup);
            
            let handleLine = null, hMarker = null;

            if (isSel) {
                const pxOffset = bs / 2 + 20;
                const internalOffset = this._getPixelsToInternalDistance(pxOffset);
                const handleInternalY = cy + internalOffset;
                
                const topEdgeLatLng = this._getRotLatLng({x: cx, y: cy + this._getPixelsToInternalDistance(bs/2)}, cx, cy, t.rotation || 0);
                const topLatLng = this._getRotLatLng({x: cx, y: handleInternalY}, cx, cy, t.rotation || 0);
                handleLine = L.polyline([topEdgeLatLng, topLatLng], { color: '#3b82f6', weight: 2, interactive: false }).addTo(this.mapLayerGroup);
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
                    const mX = (e.originalEvent.touches ? e.originalEvent.touches[0].clientX : e.originalEvent.clientX) - rect.left;
                    const mY = (e.originalEvent.touches ? e.originalEvent.touches[0].clientY : e.originalEvent.clientY) - rect.top;
                    const point = L.point(mX, mY);
                    const latlng = this.map.containerPointToLatLng(point);
                    const im = this.getInternalCoordsFromLatLng(latlng.lat, latlng.lng);
                    this.state.view.dragStartInternalX = im.x;
                    this.state.view.dragStartInternalY = im.y;
                    this.state.view.dragStartX = (e.originalEvent.touches ? e.originalEvent.touches[0].clientX : e.originalEvent.clientX);
                    this.state.view.dragStartY = (e.originalEvent.touches ? e.originalEvent.touches[0].clientY : e.originalEvent.clientY);
                    
                    this.state.view.movingLayer = marker;
                    this.state.view.movingExtras = { handleLine, hMarker };

                    document.body.classList.add('left-dragging');
                });
                
                const bsMap = t.fontSize || 14;
                const bsMapH = this._getPixelsToInternalDistance(bsMap);
                const bsMapW = this._getPixelsToInternalDistance(Utils.estimateTextWidth(t.text || '', bsMap));
                const tl = this._getRotLatLng({x: cx - bsMapW/2, y: cy + bsMapH/2}, cx, cy, t.rotation || 0);
                const tr = this._getRotLatLng({x: cx + bsMapW/2, y: cy + bsMapH/2}, cx, cy, t.rotation || 0);
                const br = this._getRotLatLng({x: cx + bsMapW/2, y: cy - bsMapH/2}, cx, cy, t.rotation || 0);
                const bl = this._getRotLatLng({x: cx - bsMapW/2, y: cy - bsMapH/2}, cx, cy, t.rotation || 0);
                
                [tl, tr, br, bl].forEach((cornerLatLng, cIdx) => {
                    const cornerIds = ['tl', 'tr', 'br', 'bl'];
                    const sMarker = L.marker(cornerLatLng, {
                        icon: L.divIcon({ className: 'map-scale-handle', html: '<div style="width:8px;height:8px;background:#fff;border:1px solid #000;margin:-4px 0 0 -4px;cursor:crosshair;pointer-events:auto;"></div>', iconSize: [0,0] }),
                        draggable: false, zIndexOffset: 1000
                    }).addTo(this.mapLayerGroup);
                    sMarker.on('mousedown', (evt) => {
                        L.DomEvent.stopPropagation(evt);
                        L.DomEvent.preventDefault(evt.originalEvent);
                        this.map.dragging.disable();
                        this.state.view.isScaling = true;
                        this.state.view.scalingTarget = { type: 'text', index: i, ref: t, corner: cornerIds[cIdx] };
                        this.state.view.scalingInitialState = JSON.parse(JSON.stringify(t));
                        this.state.view.movingLayer = marker;
                        this.state.view.movingExtras = { handleLine, hMarker };
                        
                        this.state.view.dragStartX = (evt.originalEvent.touches ? evt.originalEvent.touches[0].clientX : evt.originalEvent.clientX);
                        this.state.view.dragStartY = (evt.originalEvent.touches ? evt.originalEvent.touches[0].clientY : evt.originalEvent.clientY);
                        
                        const cPoint = this.map.latLngToContainerPoint(cLatLng);
                        const rect = this.els.mapContainer.getBoundingClientRect();
                        this.state.view.scaleCenterPx = { x: cPoint.x + rect.left, y: cPoint.y + rect.top };
                    });
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
                    const mX = (e.originalEvent.touches ? e.originalEvent.touches[0].clientX : e.originalEvent.clientX) - rect.left;
                    const mY = (e.originalEvent.touches ? e.originalEvent.touches[0].clientY : e.originalEvent.clientY) - rect.top;
                    const point = L.point(mX, mY);
                    const latlng = this.map.containerPointToLatLng(point);
                    const im = this.getInternalCoordsFromLatLng(latlng.lat, latlng.lng);
                    this.state.view.dragStartInternalX = im.x;
                    this.state.view.dragStartInternalY = im.y;
                    
                    this.state.view.dragStartX = (e.originalEvent.touches ? e.originalEvent.touches[0].clientX : e.originalEvent.clientX);
                    this.state.view.dragStartY = (e.originalEvent.touches ? e.originalEvent.touches[0].clientY : e.originalEvent.clientY);

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
    },

    _drawMapAreas(lat0, lon0, lonDPM) {
        this.state.detectedAreas.forEach(a => {
            const lls = [a.path.map(n => [lat0 + (this.state.nodes.get(n).y * CONSTANTS.LAT_DEG_PER_METER), lon0 + (this.state.nodes.get(n).x * lonDPM)])];
            if (a.isDonut) a.holes.forEach(h => lls.push(h.path.map(n => [lat0 + (this.state.nodes.get(n).y * CONSTANTS.LAT_DEG_PER_METER), lon0 + (this.state.nodes.get(n).x * lonDPM)])));
            L.polygon(lls, { stroke: false, fillColor: '#217270', fillOpacity: 0.25, interactive: false }).addTo(this.mapLayerGroup);
        });
    },

    _drawMapLines(lat0, lon0, lonDPM) {
        this.state.points.forEach(p => {
            const coords = [[lat0 + p.fromY * CONSTANTS.LAT_DEG_PER_METER, lon0 + p.fromX * lonDPM], [lat0 + p.toY * CONSTANTS.LAT_DEG_PER_METER, lon0 + p.toX * lonDPM]];
            if (!p.isDraw) { L.polyline(coords, { color: '#9ca3af', weight: 3, opacity: 0.8, dashArray: '5, 5', interactive: false }).addTo(this.mapLayerGroup); return; }
            L.polyline(coords, { color: '#ffffff', weight: p.type === 'branch' ? 6 : 7, opacity: 0.9, lineCap: 'round', lineJoin: 'round', interactive: false }).addTo(this.mapLayerGroup);
            L.polyline(coords, { color: p.type === 'branch' ? this.CONFIG.colors.lineBranch : this.CONFIG.colors.lineMain, weight: p.type === 'branch' ? 3 : 4, opacity: 0.9, lineCap: 'round', lineJoin: 'round', interactive: false }).addTo(this.mapLayerGroup);
        });
    },

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
    },

};


// --- src/shapefile.js ---
// src/shapefile.js
// Pure JS Shapefile (.shp, .shx, .dbf, .prj, .cpg) + ZIP archive generator

const WGS84_PRJ =
    'GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]]';

let _sjisEncodeMap = null;

function getSJISEncodeMap() {
    if (_sjisEncodeMap) return _sjisEncodeMap;
    _sjisEncodeMap = new Map();
    try {
        const decoder = new TextDecoder('shift-jis');
        // Decode all valid 2-byte Shift_JIS / CP932 lead + trail combinations at once
        const pairs = [];
        const coords = [];
        for (let b1 = 0x81; b1 <= 0xfc; b1++) {
            if (b1 > 0x9f && b1 < 0xe0) continue;
            for (let b2 = 0x40; b2 <= 0xfc; b2++) {
                if (b2 === 0x7f) continue;
                pairs.push(b1, b2, 0x0a); // newline separator to prevent state bleed
                coords.push([b1, b2]);
            }
        }
        const decoded = decoder.decode(new Uint8Array(pairs)).split('\n');
        for (let i = 0; i < coords.length; i++) {
            const s = decoded[i];
            if (s && s.length === 1 && s !== '\uFFFD') {
                const cp = s.codePointAt(0);
                if (!_sjisEncodeMap.has(cp)) {
                    _sjisEncodeMap.set(cp, coords[i]);
                }
            }
        }
        // Common CP932 / Windows-31J full-width compatibility aliases
        const aliases = [
            [0xff5e, [0x81, 0x60]], // ～ (Fullwidth Tilde) -> Wave Dash
            [0x301c, [0x81, 0x60]], // 〜 (Wave Dash)
            [0x2212, [0x81, 0x7c]], // − (Minus Sign)
            [0xff0d, [0x81, 0x7c]], // － (Fullwidth Hyphen-Minus)
            [0x2014, [0x81, 0x5c]], // — (Em Dash)
            [0x2015, [0x81, 0x5c]], // ― (Horizontal Bar)
            [0x2225, [0x81, 0x61]], // ∥ (Parallel To)
            [0x2016, [0x81, 0x61]], // ‖ (Double Vertical Line)
            [0xffe0, [0x81, 0x91]], // ¢
            [0xffe1, [0x81, 0x92]], // £
            [0xffe2, [0x81, 0xca]], // ¬
            [0xffe4, [0x81, 0x50]], // ￤
        ];
        for (const [cp, bytes] of aliases) {
            if (!_sjisEncodeMap.has(cp)) _sjisEncodeMap.set(cp, bytes);
        }
    } catch (e) {
        console.warn('Shift_JIS map initialization failed:', e);
    }
    return _sjisEncodeMap;
}
function encodeText(str, encoding = 'SJIS') {
    const s = str == null ? '' : String(str);
    if (encoding === 'UTF-8') {
        return new TextEncoder().encode(s);
    }
    const map = getSJISEncodeMap();
    const out = [];
    for (const ch of s) {
        const cp = ch.codePointAt(0);
        if (cp < 0x80) {
            out.push(cp);
        } else if (cp >= 0xff61 && cp <= 0xff9f) {
            // Half-width katakana
            out.push(cp - 0xff61 + 0xa1);
        } else if (map.has(cp)) {
            const pair = map.get(cp);
            out.push(pair[0], pair[1]);
        } else {
            out.push(0x3f); // '?' fallback for unmappable characters
        }
    }
    return new Uint8Array(out);
}

/**
 * Truncates a string so its encoded byte representation does not exceed maxBytes,
 * without ever splitting a multi-byte character.
 */
function truncateEncodedBytes(str, maxBytes, encoding = 'SJIS') {
    const s = str == null ? '' : String(str);
    const chunks = [];
    let totalLen = 0;
    let keptText = '';
    for (const ch of s) {
        const encoded = encodeText(ch, encoding);
        if (totalLen + encoded.length > maxBytes) break;
        chunks.push(encoded);
        totalLen += encoded.length;
        keptText += ch;
    }
    const out = new Uint8Array(totalLen);
    let offset = 0;
    for (const c of chunks) {
        out.set(c, offset);
        offset += c.length;
    }
    return { bytes: out, text: keptText };
}

/**
 * Ensures unique DBF field names (<= 10 encoded bytes each).
 */
function resolveDbfFieldNames(fieldDefs, encoding) {
    const usedHex = new Set();
    return fieldDefs.map((f, idx) => {
        const rawName = (f.name || f.key || `FIELD_${idx + 1}`).replace(/[\r\n\t\0]/g, '_').trim() || `FIELD_${idx + 1}`;
        let { bytes } = truncateEncodedBytes(rawName, 10, encoding);
        if (bytes.length === 0) {
            bytes = encodeText(`F_${idx + 1}`, 'UTF-8');
        }
        let hex = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
        let suffixNum = 1;
        while (usedHex.has(hex)) {
            const suffixStr = `_${suffixNum++}`;
            const suffixBytes = encodeText(suffixStr, 'UTF-8');
            const prefix = truncateEncodedBytes(rawName, Math.max(1, 10 - suffixBytes.length), encoding).bytes;
            const combined = new Uint8Array(prefix.length + suffixBytes.length);
            combined.set(prefix, 0);
            combined.set(suffixBytes, prefix.length);
            bytes = combined;
            hex = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
        }
        usedHex.add(hex);
        return { ...f, nameBytes: bytes };
    });
}

/**
 * Builds a dBASE III+ (.dbf) binary file as a Uint8Array.
 */
function buildDbf(records, fieldDefs, encoding = 'SJIS') {
    const resolvedFields = resolveDbfFieldNames(fieldDefs, encoding).map(f => {
        if (f.type === 'N') {
            return {
                ...f,
                size: f.size || 18,
                decimals: f.decimals || 0
            };
        }
        // Character field: compute max byte length across all records (up to 254)
        let maxBytes = f.minSize || 10;
        for (const rec of records) {
            const val = rec[f.key];
            if (val != null && val !== '') {
                const len = encodeText(String(val), encoding).length;
                if (len > maxBytes) maxBytes = len;
            }
        }
        return {
            ...f,
            type: 'C',
            size: Math.min(254, maxBytes),
            decimals: 0
        };
    });

    const numRecords = records.length;
    const numFields = resolvedFields.length;
    const headerBytes = 32 + 32 * numFields + 1;
    const recordBytes = 1 + resolvedFields.reduce((sum, f) => sum + f.size, 0);
    const totalBytes = headerBytes + numRecords * recordBytes + 1;

    const buffer = new ArrayBuffer(totalBytes);
    const view = new DataView(buffer);
    const bytes = new Uint8Array(buffer);

    const now = new Date();
    view.setUint8(0, 0x03); // dBASE III+ without memo
    view.setUint8(1, now.getFullYear() - 1900);
    view.setUint8(2, now.getMonth() + 1);
    view.setUint8(3, now.getDate());
    view.setUint32(4, numRecords, true);
    view.setUint16(8, headerBytes, true);
    view.setUint16(10, recordBytes, true);
    // Language Driver ID: 0x13 = Japanese Shift-JIS (CP932), 0x00 = default/use .cpg
    view.setUint8(29, encoding === 'SJIS' ? 0x13 : 0x00);

    // Field descriptors
    resolvedFields.forEach((f, i) => {
        const base = 32 + i * 32;
        bytes.set(f.nameBytes.slice(0, 10), base); // 0..10 (byte 10 stays 0x00 terminator)
        view.setUint8(base + 11, f.type.charCodeAt(0));
        view.setUint8(base + 16, f.size);
        view.setUint8(base + 17, f.decimals);
    });

    // Header terminator
    view.setUint8(headerBytes - 1, 0x0d);

    // Records
    let offset = headerBytes;
    for (let r = 0; r < numRecords; r++) {
        const rec = records[r];
        bytes.fill(0x20, offset, offset + recordBytes); // Fill entire record with spaces (including deletion flag 0x20)
        let fieldOffset = offset + 1;

        for (const f of resolvedFields) {
            const val = rec[f.key];
            if (f.type === 'N') {
                if (val !== null && val !== undefined && val !== '' && !Number.isNaN(Number(val))) {
                    const num = Number(val);
                    const str = f.decimals > 0 ? num.toFixed(f.decimals) : String(Math.round(num));
                    const ascii = encodeText(str, 'UTF-8');
                    const copyLen = Math.min(f.size, ascii.length);
                    // Right-align numeric string within field
                    bytes.set(ascii.slice(0, copyLen), fieldOffset + (f.size - copyLen));
                }
            } else {
                if (val !== null && val !== undefined && val !== '') {
                    const { bytes: strBytes } = truncateEncodedBytes(String(val), f.size, encoding);
                    bytes.set(strBytes, fieldOffset);
                }
            }
            fieldOffset += f.size;
        }
        offset += recordBytes;
    }

    // EOF marker
    view.setUint8(totalBytes - 1, 0x1a);
    return bytes;
}

/**
 * Signed area (2x) in Cartesian (X=lon, Y=lat) plane.
 * > 0 means Counter-Clockwise (CCW)
 * < 0 means Clockwise (CW)
 */
function getRingSignedArea2(ring) {
    let sum = 0;
    for (let i = 0; i < ring.length - 1; i++) {
        const [x1, y1] = ring[i];
        const [x2, y2] = ring[i + 1];
        sum += x1 * y2 - x2 * y1;
    }
    return sum;
}

/**
 * Normalizes a polygon ring: closes it if not closed, and enforces ESRI winding order
 * (clockwise for outer ring, counter-clockwise for holes).
 */
function normalizePolygonRing(ring, isHole = false) {
    const pts = ring.map(p => [Number(p[0]), Number(p[1])]);
    if (pts.length < 3) return pts;
    const first = pts[0];
    const last = pts[pts.length - 1];
    if (first[0] !== last[0] || first[1] !== last[1]) {
        pts.push([first[0], first[1]]);
    }
    const area2 = getRingSignedArea2(pts);
    // Outer ring must be CW (area2 < 0); Hole ring must be CCW (area2 > 0)
    if (!isHole && area2 > 0) {
        pts.reverse();
    } else if (isHole && area2 < 0) {
        pts.reverse();
    }
    return pts;
}

/**
 * Builds .shp and .shx binary buffers for Point (1), PolyLine (3), or Polygon (5).
 */
function buildShpAndShx(geometries, shapeType) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    const updateBounds = (x, y) => {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
    };

    const prepared = geometries.map(geom => {
        if (shapeType === 1) {
            const x = Number(geom[0]);
            const y = Number(geom[1]);
            updateBounds(x, y);
            return { x, y, contentWords: 10 }; // 20 bytes
        } else {
            // PolyLine (array of parts, each part is array of [x, y]) or Polygon (array of rings)
            const parts = geom.map((part, idx) =>
                shapeType === 5 ? normalizePolygonRing(part, idx > 0) : part.map(p => [Number(p[0]), Number(p[1])])
            ).filter(part => part.length >= (shapeType === 5 ? 4 : 2));

            let bMinX = Infinity, bMinY = Infinity, bMaxX = -Infinity, bMaxY = -Infinity;
            let numPoints = 0;
            for (const part of parts) {
                for (const [x, y] of part) {
                    if (x < bMinX) bMinX = x;
                    if (x > bMaxX) bMaxX = x;
                    if (y < bMinY) bMinY = y;
                    if (y > bMaxY) bMaxY = y;
                    updateBounds(x, y);
                    numPoints++;
                }
            }
            if (!Number.isFinite(bMinX)) {
                bMinX = bMinY = bMaxX = bMaxY = 0;
            }
            const numParts = parts.length;
            const contentWords = 22 + 2 * numParts + 8 * numPoints;
            return {
                parts,
                numParts,
                numPoints,
                box: [bMinX, bMinY, bMaxX, bMaxY],
                contentWords
            };
        }
    });

    if (!Number.isFinite(minX)) {
        minX = minY = maxX = maxY = 0;
    }

    const totalShpWords = 50 + prepared.reduce((sum, r) => sum + 4 + r.contentWords, 0);
    const totalShxWords = 50 + prepared.length * 4;

    const shpBuffer = new ArrayBuffer(totalShpWords * 2);
    const shxBuffer = new ArrayBuffer(totalShxWords * 2);
    const shpView = new DataView(shpBuffer);
    const shxView = new DataView(shxBuffer);

    const writeHeader = (view, fileLengthWords) => {
        view.setInt32(0, 9994, false); // Big Endian file code
        view.setInt32(24, fileLengthWords, false); // Big Endian length in 16-bit words
        view.setInt32(28, 1000, true); // Little Endian version
        view.setInt32(32, shapeType, true); // Little Endian shape type
        view.setFloat64(36, minX, true);
        view.setFloat64(44, minY, true);
        view.setFloat64(52, maxX, true);
        view.setFloat64(60, maxY, true);
    };

    writeHeader(shpView, totalShpWords);
    writeHeader(shxView, totalShxWords);

    let shpByteOffset = 100;
    let shxByteOffset = 100;

    prepared.forEach((rec, i) => {
        const recNum = i + 1;
        const offsetWords = shpByteOffset / 2;

        // .shx record (8 bytes Big Endian)
        shxView.setInt32(shxByteOffset, offsetWords, false);
        shxView.setInt32(shxByteOffset + 4, rec.contentWords, false);
        shxByteOffset += 8;

        // .shp record header (8 bytes Big Endian)
        shpView.setInt32(shpByteOffset, recNum, false);
        shpView.setInt32(shpByteOffset + 4, rec.contentWords, false);
        shpByteOffset += 8;

        // .shp record content (Little Endian)
        if (shapeType === 1) {
            shpView.setInt32(shpByteOffset, 1, true);
            shpView.setFloat64(shpByteOffset + 4, rec.x, true);
            shpView.setFloat64(shpByteOffset + 12, rec.y, true);
            shpByteOffset += 20;
        } else {
            shpView.setInt32(shpByteOffset, shapeType, true);
            shpView.setFloat64(shpByteOffset + 4, rec.box[0], true);
            shpView.setFloat64(shpByteOffset + 12, rec.box[1], true);
            shpView.setFloat64(shpByteOffset + 20, rec.box[2], true);
            shpView.setFloat64(shpByteOffset + 28, rec.box[3], true);
            shpView.setInt32(shpByteOffset + 36, rec.numParts, true);
            shpView.setInt32(shpByteOffset + 40, rec.numPoints, true);

            let partOffset = shpByteOffset + 44;
            let ptOffset = partOffset + 4 * rec.numParts;
            let ptIdx = 0;

            for (const part of rec.parts) {
                shpView.setInt32(partOffset, ptIdx, true);
                partOffset += 4;
                for (const [x, y] of part) {
                    shpView.setFloat64(ptOffset, x, true);
                    shpView.setFloat64(ptOffset + 8, y, true);
                    ptOffset += 16;
                    ptIdx++;
                }
            }
            shpByteOffset += rec.contentWords * 2;
        }
    });

    return {
        shp: new Uint8Array(shpBuffer),
        shx: new Uint8Array(shxBuffer)
    };
}

/**
 * Builds the 5-file shapefile set (.shp, .shx, .dbf, .prj, .cpg) for a single layer.
 */
function buildShapefileLayerFiles(baseLayerName, shapeType, geometries, records, fieldDefs, encoding = 'SJIS') {
    const { shp, shx } = buildShpAndShx(geometries, shapeType);
    const dbf = buildDbf(records, fieldDefs, encoding);
    const prj = encodeText(WGS84_PRJ, 'UTF-8');
    const cpg = encodeText(encoding === 'SJIS' ? 'CP932' : 'UTF-8', 'UTF-8');

    return [
        { name: `${baseLayerName}.shp`, data: shp },
        { name: `${baseLayerName}.shx`, data: shx },
        { name: `${baseLayerName}.dbf`, data: dbf },
        { name: `${baseLayerName}.prj`, data: prj },
        { name: `${baseLayerName}.cpg`, data: cpg }
    ];
}

// --- CRC-32 & ZIP Archive Builder (Store / Uncompressed, UTF-8 filenames) ---

const _crcTable = (() => {
    const table = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
        let c = n;
        for (let k = 0; k < 8; k++) {
            c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
        }
        table[n] = c >>> 0;
    }
    return table;
})();

function crc32(bytes) {
    let c = 0xffffffff;
    for (let i = 0; i < bytes.length; i++) {
        c = _crcTable[(c ^ bytes[i]) & 0xff] ^ (c >>> 8);
    }
    return (c ^ 0xffffffff) >>> 0;
}

/**
 * Packages an array of { name: string, data: Uint8Array } into a standard .zip Uint8Array.
 */
function buildZipArchive(files) {
    const now = new Date();
    const dosTime = ((now.getHours() & 0x1f) << 11) | ((now.getMinutes() & 0x3f) << 5) | ((now.getSeconds() >> 1) & 0x1f);
    const dosDate = (((now.getFullYear() - 1980) & 0x7f) << 9) | (((now.getMonth() + 1) & 0x0f) << 5) | (now.getDate() & 0x1f);

    const entries = files.map(f => {
        const nameBytes = new TextEncoder().encode(f.name);
        const data = f.data instanceof Uint8Array ? f.data : new Uint8Array(f.data);
        const crc = crc32(data);
        return { nameBytes, data, crc };
    });

    let localSize = 0;
    let centralSize = 0;
    for (const e of entries) {
        localSize += 30 + e.nameBytes.length + e.data.length;
        centralSize += 46 + e.nameBytes.length;
    }
    const totalSize = localSize + centralSize + 22;

    const buffer = new ArrayBuffer(totalSize);
    const view = new DataView(buffer);
    const bytes = new Uint8Array(buffer);

    let localOffset = 0;
    for (const e of entries) {
        e.localHeaderOffset = localOffset;
        view.setUint32(localOffset, 0x04034b50, true); // Local file header signature
        view.setUint16(localOffset + 4, 20, true); // Version needed to extract (2.0)
        view.setUint16(localOffset + 6, 0x0800, true); // General purpose bit flag: Bit 11 = UTF-8 filename
        view.setUint16(localOffset + 8, 0, true); // Compression method: 0 (Store)
        view.setUint16(localOffset + 10, dosTime, true);
        view.setUint16(localOffset + 12, dosDate, true);
        view.setUint32(localOffset + 14, e.crc, true);
        view.setUint32(localOffset + 18, e.data.length, true); // Compressed size
        view.setUint32(localOffset + 22, e.data.length, true); // Uncompressed size
        view.setUint16(localOffset + 26, e.nameBytes.length, true);
        view.setUint16(localOffset + 28, 0, true); // Extra field length
        bytes.set(e.nameBytes, localOffset + 30);
        bytes.set(e.data, localOffset + 30 + e.nameBytes.length);
        localOffset += 30 + e.nameBytes.length + e.data.length;
    }

    let centralOffset = localOffset;
    for (const e of entries) {
        view.setUint32(centralOffset, 0x02014b50, true); // Central directory file header signature
        view.setUint16(centralOffset + 4, 20, true); // Version made by
        view.setUint16(centralOffset + 6, 20, true); // Version needed
        view.setUint16(centralOffset + 8, 0x0800, true); // Bit 11 = UTF-8 filename
        view.setUint16(centralOffset + 10, 0, true); // Compression method: 0 (Store)
        view.setUint16(centralOffset + 12, dosTime, true);
        view.setUint16(centralOffset + 14, dosDate, true);
        view.setUint32(centralOffset + 16, e.crc, true);
        view.setUint32(centralOffset + 20, e.data.length, true);
        view.setUint32(centralOffset + 24, e.data.length, true);
        view.setUint16(centralOffset + 28, e.nameBytes.length, true);
        view.setUint16(centralOffset + 30, 0, true); // Extra field length
        view.setUint16(centralOffset + 32, 0, true); // File comment length
        view.setUint16(centralOffset + 34, 0, true); // Disk number start
        view.setUint16(centralOffset + 36, 0, true); // Internal file attributes
        view.setUint32(centralOffset + 38, 0, true); // External file attributes
        view.setUint32(centralOffset + 42, e.localHeaderOffset, true);
        bytes.set(e.nameBytes, centralOffset + 46);
        centralOffset += 46 + e.nameBytes.length;
    }

    // End of Central Directory Record (EOCD)
    view.setUint32(centralOffset, 0x06054b50, true);
    view.setUint16(centralOffset + 4, 0, true); // Number of this disk
    view.setUint16(centralOffset + 6, 0, true); // Disk where central directory starts
    view.setUint16(centralOffset + 8, entries.length, true);
    view.setUint16(centralOffset + 10, entries.length, true);
    view.setUint32(centralOffset + 12, centralSize, true);
    view.setUint32(centralOffset + 16, localSize, true);
    view.setUint16(centralOffset + 20, 0, true); // Comment length

    return bytes;
}


// --- src/mdbReader.js ---

/**
 * コンパスtoGIS (.xlsm / .xls) が作成する Microsoft Access (.mdb) ファイルを
 * ブラウザおよび Node.js 上で直接解析し、測量箇所一覧および測量データを抽出するモジュール。
 * (Jet 4.0 / Jet 3.0 対応)
 */

const JET4_SIGNATURE = 'Standard Jet DB';
const ACE_SIGNATURE = 'Standard ACE DB';

/**
 * Jet 4.0 の文字列カラム (UTF-16LE または 0xFF 0xFE 圧縮 Unicode) をデコードする
 */
function decodeJetString(bytes, isJet3 = false) {
    if (!bytes || bytes.length === 0) return '';
    if (isJet3) {
        try {
            return new TextDecoder('shift_jis').decode(bytes).replace(/\0+$/, '');
        } catch {
            return new TextDecoder('utf-8').decode(bytes).replace(/\0+$/, '');
        }
    }
    if (bytes.length >= 2 && bytes[0] === 0xff && bytes[1] === 0xfe) {
        const out = [];
        let compressed = true;
        let i = 2;
        while (i < bytes.length) {
            if (bytes[i] === 0x00) {
                compressed = !compressed;
                i += 1;
            } else if (compressed) {
                out.push(bytes[i], 0x00);
                i += 1;
            } else {
                if (i + 1 < bytes.length) {
                    out.push(bytes[i], bytes[i + 1]);
                }
                i += 2;
            }
        }
        return new TextDecoder('utf-16le').decode(new Uint8Array(out)).replace(/\0+$/, '');
    }
    return new TextDecoder('utf-16le').decode(bytes).replace(/\0+$/, '');
}

/**
 * LVAL (Long Value: OLE / Memo) ポインタからバイナリデータを復元する
 */
function readLvalBytes(buf, pageSize, rawPointer, isJet3 = false) {
    if (!rawPointer || rawPointer.length < 12) return new Uint8Array(0);
    const view = new DataView(rawPointer.buffer, rawPointer.byteOffset, rawPointer.byteLength);
    const val = view.getUint32(0, true);
    const length = val & 0x3fffffff;
    const flag = (val >>> 30) & 3;
    if (length === 0) return new Uint8Array(0);

    // Inline LVAL (0x80000000)
    if (flag === 2) {
        return rawPointer.subarray(12, Math.min(rawPointer.length, 12 + length));
    }

    let recNum = rawPointer[4];
    let pageNum = rawPointer[5] | (rawPointer[6] << 8) | (rawPointer[7] << 16);
    const recTableOffset = isJet3 ? 10 : 14;
    const offsetMask = isJet3 ? 0x07ff : 0x0fff;

    // Single-page LVAL (0x40000000)
    if (flag === 1) {
        if (pageNum <= 0 || (pageNum + 1) * pageSize > buf.length) return new Uint8Array(0);
        const page = buf.subarray(pageNum * pageSize, (pageNum + 1) * pageSize);
        const pView = new DataView(page.buffer, page.byteOffset, page.byteLength);
        const numRecs = pView.getUint16(recTableOffset - 2, true);
        if (recNum >= numRecs) return new Uint8Array(0);
        const rStart = pView.getUint16(recTableOffset + recNum * 2, true) & offsetMask;
        const rEnd = recNum === 0 ? pageSize : (pView.getUint16(recTableOffset + (recNum - 1) * 2, true) & offsetMask);
        if (rStart >= rEnd || rEnd > pageSize) return new Uint8Array(0);
        return page.subarray(rStart, Math.min(rEnd, rStart + length));
    }

    // Multi-page LVAL chain (0x00000000)
    if (flag === 0) {
        const out = new Uint8Array(length);
        let written = 0;
        let safety = 0;
        while (pageNum > 0 && written < length && safety < 2000) {
            safety++;
            if ((pageNum + 1) * pageSize > buf.length) break;
            const page = buf.subarray(pageNum * pageSize, (pageNum + 1) * pageSize);
            const pView = new DataView(page.buffer, page.byteOffset, page.byteLength);
            const numRecs = pView.getUint16(recTableOffset - 2, true);
            if (recNum >= numRecs) break;
            const rStart = pView.getUint16(recTableOffset + recNum * 2, true) & offsetMask;
            const rEnd = recNum === 0 ? pageSize : (pView.getUint16(recTableOffset + (recNum - 1) * 2, true) & offsetMask);
            if (rStart + 4 > rEnd || rEnd > pageSize) break;
            const chunk = page.subarray(rStart, rEnd);
            recNum = chunk[0];
            pageNum = chunk[1] | (chunk[2] << 8) | (chunk[3] << 16);
            const payload = chunk.subarray(4);
            const copyLen = Math.min(payload.length, length - written);
            out.set(payload.subarray(0, copyLen), written);
            written += copyLen;
        }
        return out.subarray(0, written);
    }

    return new Uint8Array(0);
}

/**
 * Uint8Array の画像バイナリ (GIF / PNG / JPEG / BMP) を Data URL に変換する
 */
function imageBytesToDataURL(bytes) {
    if (!bytes || bytes.length < 8) return null;
    let mime = null;
    let startOffset = 0;

    // GIF87a / GIF89a を検索 (先頭付近にヘッダがある場合にも対応)
    for (let i = 0; i <= Math.min(64, bytes.length - 6); i++) {
        if (
            bytes[i] === 0x47 &&
            bytes[i + 1] === 0x49 &&
            bytes[i + 2] === 0x46 &&
            bytes[i + 3] === 0x38 &&
            (bytes[i + 4] === 0x37 || bytes[i + 4] === 0x39) &&
            bytes[i + 5] === 0x61
        ) {
            mime = 'image/gif';
            startOffset = i;
            break;
        }
    }

    if (!mime) {
        if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) {
            mime = 'image/png';
        } else if (bytes[0] === 0xff && bytes[1] === 0xd8) {
            mime = 'image/jpeg';
        } else if (bytes[0] === 0x42 && bytes[1] === 0x4d) {
            mime = 'image/bmp';
        }
    }
    if (!mime) return null;

    const imgBytes = startOffset > 0 ? bytes.subarray(startOffset) : bytes;
    let binary = '';
    const chunkSize = 8192;
    for (let i = 0; i < imgBytes.length; i += chunkSize) {
        const sub = imgBytes.subarray(i, Math.min(i + chunkSize, imgBytes.length));
        binary += String.fromCharCode.apply(null, sub);
    }
    if (typeof btoa === 'function') {
        return `data:${mime};base64,${btoa(binary)}`;
    }
    return `data:${mime};base64,${Buffer.from(imgBytes).toString('base64')}`;
}

/**
 * TDEF (テーブル定義ページ: 0x02) を解析する
 */
function parseTdef(buf, pageNum, pageSize, isJet3 = false) {
    const chunks = [];
    let totalLen = 0;
    let curPage = pageNum;
    let safety = 0;

    while (curPage !== 0 && safety < 64) {
        safety++;
        if ((curPage + 1) * pageSize > buf.length) break;
        const page = buf.subarray(curPage * pageSize, (curPage + 1) * pageSize);
        if (page[0] !== 0x02) break;
        const pView = new DataView(page.buffer, page.byteOffset, page.byteLength);
        const nextPage = pView.getUint32(4, true);
        const slice = curPage === pageNum ? page : page.subarray(8);
        chunks.push(slice);
        totalLen += slice.length;
        curPage = nextPage;
    }

    if (chunks.length === 0) return null;
    const tdefBytes = new Uint8Array(totalLen);
    let offset = 0;
    for (const c of chunks) {
        tdefBytes.set(c, offset);
        offset += c.length;
    }

    const view = new DataView(tdefBytes.buffer, tdefBytes.byteOffset, tdefBytes.byteLength);

    if (isJet3) {
        const numRows = view.getUint32(12, true);
        const tableType = tdefBytes[20];
        const maxCols = view.getUint16(21, true);
        const numVarCols = view.getUint16(23, true);
        const numCols = view.getUint16(25, true);
        const numRealIdx = view.getUint32(31, true);
        let pos = 43 + numRealIdx * 8;
        const cols = [];
        for (let c = 0; c < numCols; c++) {
            if (pos + 18 > tdefBytes.length) break;
            const colType = tdefBytes[pos];
            const colId = view.getUint16(pos + 1, true);
            const varColNum = view.getUint16(pos + 3, true);
            const colNum = view.getUint16(pos + 5, true);
            const flags = tdefBytes[pos + 9];
            const fixedOffset = view.getUint16(pos + 14, true);
            const colLen = view.getUint16(pos + 16, true);
            cols.push({
                type: colType,
                id: colId,
                varColNum,
                colNum,
                flags,
                isFixed: Boolean(flags & 1),
                fixedOffset,
                len: colLen,
                name: ''
            });
            pos += 18;
        }
        for (let c = 0; c < cols.length; c++) {
            if (pos >= tdefBytes.length) break;
            const nameLen = tdefBytes[pos];
            pos += 1;
            cols[c].name = decodeJetString(tdefBytes.subarray(pos, pos + nameLen), true);
            pos += nameLen;
        }
        return { page: pageNum, numRows, tableType, maxCols, numVarCols, cols };
    }

    // Jet 4.0 / ACE
    const numRows = view.getUint32(16, true);
    const tableType = tdefBytes[40];
    const maxCols = view.getUint16(41, true);
    const numVarCols = view.getUint16(43, true);
    const numCols = view.getUint16(45, true);
    const numRealIdx = view.getUint32(51, true);

    let pos = 63 + numRealIdx * 12;
    const cols = [];
    for (let c = 0; c < numCols; c++) {
        if (pos + 25 > tdefBytes.length) break;
        const colType = tdefBytes[pos];
        const colId = view.getUint16(pos + 5, true);
        const varColNum = view.getUint16(pos + 7, true);
        const colNum = view.getUint16(pos + 9, true);
        const flags = tdefBytes[pos + 15];
        const fixedOffset = view.getUint16(pos + 21, true);
        const colLen = view.getUint16(pos + 23, true);
        cols.push({
            type: colType,
            id: colId,
            varColNum,
            colNum,
            flags,
            isFixed: Boolean(flags & 1),
            fixedOffset,
            len: colLen,
            name: ''
        });
        pos += 25;
    }

    for (let c = 0; c < cols.length; c++) {
        if (pos + 2 > tdefBytes.length) break;
        const nameLen = view.getUint16(pos, true);
        pos += 2;
        cols[c].name = decodeJetString(tdefBytes.subarray(pos, pos + nameLen), false);
        pos += nameLen;
    }

    return { page: pageNum, numRows, tableType, maxCols, numVarCols, cols };
}

/**
 * 指定された TDEF に属するすべてのデータページ (0x01) から行データを読み取る
 */
function readTableRows(buf, tdef, pageSize, isJet3 = false) {
    if (!tdef) return [];
    const totalPages = Math.floor(buf.length / pageSize);
    const rows = [];
    const recTableOffset = isJet3 ? 10 : 14;
    const offsetMask = isJet3 ? 0x07ff : 0x0fff;
    const headerFixedStart = isJet3 ? 1 : 2;

    for (let p = 0; p < totalPages; p++) {
        const page = buf.subarray(p * pageSize, (p + 1) * pageSize);
        if (page[0] !== 0x01) continue;
        const pView = new DataView(page.buffer, page.byteOffset, page.byteLength);
        const owner = pView.getUint32(4, true);
        if (owner !== tdef.page) continue;

        const numRecs = pView.getUint16(recTableOffset - 2, true);
        for (let r = 0; r < numRecs; r++) {
            const recOff = pView.getUint16(recTableOffset + r * 2, true);
            // 0x8000 = deleted record, 0x4000 = overflow pointer record
            if ((recOff & 0x8000) !== 0 || (recOff & 0x4000) !== 0) continue;

            const recStart = recOff & offsetMask;
            const recEnd = r === 0 ? pageSize : (pView.getUint16(recTableOffset + (r - 1) * 2, true) & offsetMask);
            if (recStart >= recEnd || recEnd > pageSize) continue;

            const rec = page.subarray(recStart, recEnd);
            if (rec.length < headerFixedStart) continue;
            const rView = new DataView(rec.buffer, rec.byteOffset, rec.byteLength);

            const numColsInRow = isJet3 ? rec[0] : rView.getUint16(0, true);
            const nullMaskLen = Math.ceil(numColsInRow / 8);
            if (rec.length < headerFixedStart + nullMaskLen) continue;
            const nullMask = rec.subarray(rec.length - nullMaskLen);
            const varEnd = rec.length - nullMaskLen;

            let numVar = 0;
            const varOffsets = [];
            if (tdef.numVarCols > 0) {
                if (isJet3) {
                    if (varEnd >= 1) {
                        numVar = rec[varEnd - 1];
                        const numJumps = Math.floor((rec.length - nullMaskLen - 1) / 256);
                        let jumpIdx = 0;
                        let hiByte = 0;
                        for (let v = 0; v <= numVar; v++) {
                            const offPos = varEnd - 2 - numJumps - v;
                            if (offPos >= headerFixedStart) {
                                if (jumpIdx < numJumps && rec[varEnd - 2 - jumpIdx] === v) {
                                    hiByte += 0x100;
                                    jumpIdx++;
                                }
                                varOffsets.push(hiByte | rec[offPos]);
                            }
                        }
                    }
                } else if (varEnd >= 2) {
                    numVar = rView.getUint16(varEnd - 2, true);
                    for (let v = 0; v <= numVar; v++) {
                        const offPos = varEnd - 4 - v * 2;
                        if (offPos >= headerFixedStart) {
                            varOffsets.push(rView.getUint16(offPos, true));
                        }
                    }
                }
            }

            const rowObj = {};
            for (const c of tdef.cols) {
                const cid = c.colNum;
                let isNotNull = false;
                if (cid < numColsInRow) {
                    const byteIdx = cid >> 3;
                    const bitIdx = cid & 7;
                    if (byteIdx < nullMask.length) {
                        isNotNull = (nullMask[byteIdx] & (1 << bitIdx)) !== 0;
                    }
                }

                // Boolean (0x01) is stored directly in nullMask
                if (c.type === 0x01) {
                    rowObj[c.name] = isNotNull;
                    continue;
                }
                if (!isNotNull) {
                    rowObj[c.name] = null;
                    continue;
                }

                if (c.isFixed) {
                    const off = headerFixedStart + c.fixedOffset;
                    if (off + c.len > rec.length) {
                        rowObj[c.name] = null;
                        continue;
                    }
                    if (c.type === 0x02) {
                        rowObj[c.name] = rec[off];
                    } else if (c.type === 0x03) {
                        rowObj[c.name] = rView.getInt16(off, true);
                    } else if (c.type === 0x04) {
                        rowObj[c.name] = rView.getInt32(off, true);
                    } else if (c.type === 0x06) {
                        rowObj[c.name] = rView.getFloat32(off, true);
                    } else if (c.type === 0x07 || c.type === 0x08) {
                        rowObj[c.name] = rView.getFloat64(off, true);
                    } else {
                        rowObj[c.name] = null;
                    }
                } else {
                    const vIdx = c.varColNum;
                    if (vIdx < numVar && vIdx + 1 < varOffsets.length) {
                        const vStart = varOffsets[vIdx] & 0xffff;
                        const vEnd = varOffsets[vIdx + 1] & 0xffff;
                        if (vStart <= vEnd && vEnd <= rec.length) {
                            const raw = rec.subarray(vStart, vEnd);
                            if (c.type === 0x0a) {
                                rowObj[c.name] = decodeJetString(raw, isJet3);
                            } else if (c.type === 0x0c) {
                                const lvalBytes = readLvalBytes(buf, pageSize, raw, isJet3);
                                rowObj[c.name] = decodeJetString(lvalBytes, isJet3);
                            } else if (c.type === 0x0b) {
                                rowObj[c.name] = readLvalBytes(buf, pageSize, raw, isJet3);
                            } else {
                                rowObj[c.name] = raw;
                            }
                        } else {
                            rowObj[c.name] = null;
                        }
                    } else {
                        rowObj[c.name] = null;
                    }
                }
            }
            rows.push(rowObj);
        }
    }
    return rows;
}

/**
 * 測点名から次の測点名を自動生成する (開放トラバース終端用)
 */
function nextPointName(prevName) {
    if (!prevName || /^b\.?p\.?$/i.test(prevName)) return '1';
    if (/^(\d+)$/.test(prevName)) return `${parseInt(prevName, 10) + 1}`;
    if (/^No\.?\s*(\d+)$/i.test(prevName)) return `No.${parseInt(prevName.match(/\d+/)[0], 10) + 1}`;
    if (/^T-?\s*(\d+)$/i.test(prevName)) return `T-${parseInt(prevName.match(/\d+/)[0], 10) + 1}`;
    return 'EP';
}

/**
 * T_測量箇所レコードから Compass2GIS 用の属性配列 [{ name, value }, ...] を生成する
 */
function buildAttributesFromKasho(kasho) {
    const isZourin = kasho['造林治山'] !== false;
    // コンパスtoGIS.xlsm の造林 / 治山ラベル対応表
    const fieldMap = isZourin
        ? [
              { col: '年度', label: '年度' },
              { col: '番号', label: '番号' },
              { col: '事業', label: '事業' },
              { col: '事業区分', label: '事業区分' },
              { col: '事業主体', label: '事業主体' },
              { col: '作業種', label: '作業種' },
              { col: '搬出量', label: '搬出量' },
              { col: '樹種', label: '樹種' },
              { col: '林齢', label: '林齢' },
              { col: '所有者', label: '所有者名' },
              { col: '代理申請者', label: '代理申請者' },
              { col: '所在地', label: '所在地' },
              { col: '小班', label: '小班' },
              { col: '備考', label: '備考' },
              { col: '測量者氏名', label: '測量者氏名' }
          ]
        : [
              { col: '年度', label: '年度' },
              { col: '番号', label: '事業名' },
              { col: '事業', label: '工事番号' },
              { col: '事業区分', label: '工事枝番' },
              { col: '事業主体', label: '施工地名' },
              { col: '作業種', label: '工種' },
              { col: '搬出量', label: '樹種' },
              { col: '樹種', label: '間伐率％' },
              { col: '林齢', label: '成立本数' },
              { col: '所有者', label: '現成立本数' },
              { col: '代理申請者', label: '胸高直径' },
              { col: '所在地', label: '樹高' },
              { col: '小班', label: '所有者名' },
              { col: '備考', label: '備考' },
              { col: '測量者氏名', label: '測量者氏名' }
          ];

    const attrs = [];
    for (const { col, label } of fieldMap) {
        const rawVal = kasho[col];
        if (rawVal == null) continue;
        const strVal = String(rawVal).trim();
        // Excelの数式文字列 ('=IF(...)') や空文字列は除外
        if (!strVal || strVal.startsWith('=')) continue;
        attrs.push({ name: label, value: strVal });
    }

    if (attrs.length === 0 && kasho['箇所名']) {
        attrs.push({ name: '箇所名', value: String(kasho['箇所名']).trim() });
    }
    return attrs;
}

/**
 * T_測量箇所レコードと T_測量データ行リストから Compass2GIS の tableData を構築する
 */
function buildTableDataFromMdbRows(kasho, dataRows) {
    if (!dataRows || dataRows.length === 0) return [];

    // BP番号=0 (主テーブル) を優先取得
    let bp0Rows = dataRows
        .filter(r => (r['BP番号'] ?? 0) === 0)
        .sort((a, b) => (a['測点並び順'] ?? 0) - (b['測点並び順'] ?? 0));

    // 万一 BP番号=0 が空で BP番号>=1 のみ存在する場合は「表の合成」ロジックで合成
    if (bp0Rows.length === 0) {
        const bpNums = Array.from(new Set(dataRows.map(r => r['BP番号'] ?? 0))).filter(n => n > 0).sort((a, b) => a - b);
        const synthesized = [];
        for (const bpNum of bpNums) {
            const sub = dataRows
                .filter(r => r['BP番号'] === bpNum && r['斜距離'] != null && Number(r['斜距離']) > 0)
                .sort((a, b) => (a['測点並び順'] ?? 0) - (b['測点並び順'] ?? 0));
            const dir = kasho[`BP方向${bpNum}`] || '↓';
            if (dir === '↑') {
                for (let m = sub.length - 1; m >= 0; m--) {
                    const origAz = Number(sub[m]['方位角'] ?? 0);
                    const revAz = origAz < 180 ? origAz + 180 : origAz - 180;
                    const revEl = -Number(sub[m]['高低角'] ?? 0);
                    const nextPt = m + 1 < sub.length ? sub[m + 1]['測点名'] : `${synthesized.length + 1}`;
                    synthesized.push({
                        測点名: nextPt,
                        方位角: revAz,
                        高低角: revEl,
                        斜距離: sub[m]['斜距離']
                    });
                }
            } else {
                synthesized.push(...sub);
            }
        }
        bp0Rows = synthesized;
    }

    const isClosedTraverse = kasho['トラバース種別'] !== false;
    const firstStation = String(bp0Rows[0]?.['測点名'] ?? '').trim() || 'BP';
    const tableData = [];

    for (let i = 0; i < bp0Rows.length; i++) {
        const row = bp0Rows[i];
        const fromName = String(row['測点名'] ?? '').trim() || (i === 0 ? 'BP' : String(i));
        const sdNum = row['斜距離'] != null ? Number(row['斜距離']) : 0;

        // 最終行で斜距離が0または空の場合は終点名のみの行とみなす
        if (i === bp0Rows.length - 1 && (!sdNum || isNaN(sdNum))) {
            break;
        }

        let toName = '';
        if (i < bp0Rows.length - 1) {
            toName = String(bp0Rows[i + 1]['測点名'] ?? '').trim() || String(i + 1);
        } else {
            toName = isClosedTraverse ? firstStation : nextPointName(fromName);
        }

        const azStr = row['方位角'] != null ? String(Number(Number(row['方位角']).toFixed(4))) : '0';
        const elStr = row['高低角'] != null ? String(Number(Number(row['高低角']).toFixed(4))) : '0';
        const sdStr = row['斜距離'] != null ? String(Number(Number(row['斜距離']).toFixed(4))) : '0';

        tableData.push([fromName, toName, azStr, elStr, sdStr, false, true]);
    }

    return tableData;
}

/**
 * T_測量箇所から基準点(BP)の10進数緯度・経度を取得する
 */
function extractLatLonFromKasho(kasho) {
    const latDeg = Number(kasho['緯度_度'] ?? 0);
    const latMin = Number(kasho['緯度_分'] ?? 0);
    const latSec = Number(kasho['緯度_秒'] ?? 0);
    const lonDeg = Number(kasho['経度_度'] ?? 0);
    const lonMin = Number(kasho['経度_分'] ?? 0);
    const lonSec = Number(kasho['経度_秒'] ?? 0);

    if (latDeg > 0 && lonDeg > 0) {
        const lat = latDeg + latMin / 60 + latSec / 3600;
        const lon = lonDeg + lonMin / 60 + lonSec / 3600;
        return { lat: lat.toFixed(6), lon: lon.toFixed(6) };
    }

    // 測位点緯度・経度に10進数の緯度経度が直接入っている場合
    const rawLat = Number(kasho['測位点緯度'] ?? 0);
    const rawLon = Number(kasho['測位点経度'] ?? 0);
    if (rawLat >= 20 && rawLat <= 50 && rawLon >= 120 && rawLon <= 155) {
        return { lat: rawLat.toFixed(6), lon: rawLon.toFixed(6) };
    }

    return { lat: '34.097294', lon: '135.434808' };
}

/**
 * ArrayBuffer または Uint8Array の .mdb ファイルを解析し、
 * Compass2GIS のインポートアイテム配列を返す
 */
function parseCompassMdb(buffer, sourceFileName = 'database.mdb') {
    const buf = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
    if (buf.length < 4096) {
        throw new Error('ファイルサイズが小さすぎるため、有効なMDBファイルではありません。');
    }

    const sig = new TextDecoder('ascii').decode(buf.subarray(4, 19));
    if (sig !== JET4_SIGNATURE && sig !== ACE_SIGNATURE) {
        throw new Error('Microsoft Access (Jet/ACE) データベース形式ではありません。');
    }

    const hView = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    const jetVersion = hView.getUint32(20, true);
    const isJet3 = jetVersion === 0;
    const pageSize = isJet3 ? 2048 : 4096;
    const totalPages = Math.floor(buf.length / pageSize);

    // 1. MSysObjects (Page 2) からテーブル名とTDEFページ番号を取得、または全TDEFをスキャン
    let kashoTdef = null;
    let dataTdef = null;

    const msysTdef = parseTdef(buf, 2, pageSize, isJet3);
    if (msysTdef) {
        const msysRows = readTableRows(buf, msysTdef, pageSize, isJet3);
        for (const r of msysRows) {
            if (r.Type === 1 && r.Id > 0) {
                if (r.Name === 'T_測量箇所') {
                    kashoTdef = parseTdef(buf, r.Id, pageSize, isJet3);
                } else if (r.Name === 'T_測量データ') {
                    dataTdef = parseTdef(buf, r.Id, pageSize, isJet3);
                }
            }
        }
    }

    // フォールバック: カラム名から T_測量箇所 と T_測量データ を特定
    if (!kashoTdef || !dataTdef) {
        for (let p = 2; p < totalPages; p++) {
            if (buf[p * pageSize] !== 0x02) continue;
            const t = parseTdef(buf, p, pageSize, isJet3);
            if (!t || !t.cols) continue;
            const colNames = new Set(t.cols.map(c => c.name));
            if (!kashoTdef && colNames.has('箇所ID') && colNames.has('箇所名')) {
                kashoTdef = t;
            } else if (!dataTdef && colNames.has('箇所ID') && colNames.has('測点名') && colNames.has('方位角')) {
                dataTdef = t;
            }
        }
    }

    if (!kashoTdef || !dataTdef) {
        throw new Error('MDB内に「T_測量箇所」または「T_測量データ」テーブルが見つかりませんでした。');
    }

    const kashoRows = readTableRows(buf, kashoTdef, pageSize, isJet3);
    const allDataRows = readTableRows(buf, dataTdef, pageSize, isJet3);

    // 箇所IDごとに測量データをグループ化
    const dataByKasho = new Map();
    for (const r of allDataRows) {
        const kid = r['箇所ID'];
        if (kid == null) continue;
        if (!dataByKasho.has(kid)) dataByKasho.set(kid, []);
        dataByKasho.get(kid).push(r);
    }

    // コンパスtoGIS.xlsm と同様に「箇所並び順 ASC, 箇所ID ASC」でソート
    kashoRows.sort((a, b) => {
        const orderA = a['箇所並び順'] ?? 999999;
        const orderB = b['箇所並び順'] ?? 999999;
        if (orderA !== orderB) return orderA - orderB;
        return (a['箇所ID'] ?? 0) - (b['箇所ID'] ?? 0);
    });

    const items = [];
    for (const kasho of kashoRows) {
        const kid = kasho['箇所ID'];
        const rowsForKasho = dataByKasho.get(kid) || [];
        const tableData = buildTableDataFromMdbRows(kasho, rowsForKasho);
        if (tableData.length === 0) continue;

        const attributes = buildAttributesFromKasho(kasho);
        const { lat, lon } = extractLatLonFromKasho(kasho);

        // 磁気偏角の算出 (方位回転角が設定されている場合はそれを考慮、0ならBP緯度経度から自動計算)
        const rotAngle = Number(kasho['方位回転角'] ?? 0);
        let declination = Utils.calculateMagDeclination(parseFloat(lat), parseFloat(lon)).toFixed(2);
        if (rotAngle > 0 && rotAngle < 360) {
            let md = 360 - rotAngle;
            if (md > 180) md -= 360;
            declination = md.toFixed(2);
        }

        const previewImage = imageBytesToDataURL(kasho['イメージ']);
        const kashoName = String(kasho['箇所名'] ?? '').trim() || `箇所ID ${kid}`;
        const areaVal = kasho['面積'] != null ? Number(kasho['面積']) : null;
        const areaDigits = kasho['面積桁数'] != null ? Number(kasho['面積桁数']) : 2;
        const areaText = areaVal != null && !isNaN(areaVal) ? `${areaVal.toFixed(Math.max(0, areaDigits))} ha` : '';

        items.push({
            name: kashoName,
            sourceFileName,
            kashoId: kid,
            kashoOrder: kasho['箇所並び順'],
            areaText,
            _rawKasho: kasho,
            data: {
                tableData,
                attributes,
                annotations: { texts: [], lines: [] },
                settings: {
                    lat,
                    lon,
                    declination,
                    magDeclinationChecked: true,
                    compassAdjustmentChecked: kasho['トラバース種別'] !== false,
                    convertEPtoBPChecked: true,
                    nodeLabelInterval: '5'
                },
                previewImage
            }
        });
    }

    return items;
}

/**
 * RGBA ピクセル配列 (Canvas getImageData().data) から GIF89a バイナリ (Uint8Array) を生成する
 */
function encodeRgbaToGif89a(width, height, rgba) {
    const palette = new Uint8Array(256 * 3);
    let pIdx = 0;
    for (let r = 0; r < 6; r++) {
        for (let g = 0; g < 6; g++) {
            for (let b = 0; b < 6; b++) {
                palette[pIdx * 3] = Math.round((r * 255) / 5);
                palette[pIdx * 3 + 1] = Math.round((g * 255) / 5);
                palette[pIdx * 3 + 2] = Math.round((b * 255) / 5);
                pIdx++;
            }
        }
    }
    while (pIdx < 256) {
        palette[pIdx * 3] = 255;
        palette[pIdx * 3 + 1] = 255;
        palette[pIdx * 3 + 2] = 255;
        pIdx++;
    }

    const indexed = new Uint8Array(width * height);
    for (let i = 0, j = 0; i < indexed.length; i++, j += 4) {
        const a = rgba[j + 3];
        if (a < 128) {
            indexed[i] = 215;
        } else {
            const r = Math.round((rgba[j] * 5) / 255);
            const g = Math.round((rgba[j + 1] * 5) / 255);
            const b = Math.round((rgba[j + 2] * 5) / 255);
            indexed[i] = r * 36 + g * 6 + b;
        }
    }

    const minCodeSize = 8;
    const clearCode = 256;
    const eoiCode = 257;
    const bytes = [];
    let bitBuf = 0;
    let bitCount = 0;
    const subBlock = [];

    const flushSubBlock = () => {
        if (subBlock.length > 0) {
            bytes.push(subBlock.length, ...subBlock);
            subBlock.length = 0;
        }
    };
    const writeBits = (code, size) => {
        bitBuf |= code << bitCount;
        bitCount += size;
        while (bitCount >= 8) {
            subBlock.push(bitBuf & 0xff);
            if (subBlock.length === 255) flushSubBlock();
            bitBuf >>>= 8;
            bitCount -= 8;
        }
    };

    let codeSize = 9;
    let nextCode = 258;
    const dict = new Map();
    writeBits(clearCode, codeSize);

    let prefix = indexed[0] || 0;
    for (let i = 1; i < indexed.length; i++) {
        const k = indexed[i];
        const key = (prefix << 8) | k;
        const hit = dict.get(key);
        if (hit !== undefined) {
            prefix = hit;
        } else {
            writeBits(prefix, codeSize);
            if (nextCode < 4096) {
                dict.set(key, nextCode++);
                if (nextCode > 1 << codeSize && codeSize < 12) {
                    codeSize++;
                }
            } else {
                writeBits(clearCode, codeSize);
                dict.clear();
                codeSize = 9;
                nextCode = 258;
            }
            prefix = k;
        }
    }
    writeBits(prefix, codeSize);
    writeBits(eoiCode, codeSize);
    if (bitCount > 0) subBlock.push(bitBuf & 0xff);
    flushSubBlock();
    bytes.push(0x00);

    const header = new Uint8Array([
        0x47, 0x49, 0x46, 0x38, 0x39, 0x61,
        width & 0xff, (width >> 8) & 0xff,
        height & 0xff, (height >> 8) & 0xff,
        0xf7, 0x00, 0x00
    ]);
    const imgDesc = new Uint8Array([
        0x2c, 0x00, 0x00, 0x00, 0x00,
        width & 0xff, (width >> 8) & 0xff,
        height & 0xff, (height >> 8) & 0xff,
        0x00, minCodeSize
    ]);
    const trailer = new Uint8Array([0x3b]);

    const out = new Uint8Array(header.length + palette.length + imgDesc.length + bytes.length + trailer.length);
    let off = 0;
    out.set(header, off); off += header.length;
    out.set(palette, off); off += palette.length;
    out.set(imgDesc, off); off += imgDesc.length;
    out.set(bytes, off); off += bytes.length;
    out.set(trailer, off);
    return out;
}

/**
 * 和暦文字列（例: 令和8年度, 平成18年度, 昭和60年度）から西暦を推定する
 */
function parseSeirekiFromNendo(nendoStr) {
    if (!nendoStr) return new Date().getFullYear();
    const s = String(nendoStr).replace(/[０-９]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0xfee0));
    let m = s.match(/令和\s*(元|\d+)/);
    if (m) return 2018 + (m[1] === '元' ? 1 : parseInt(m[1], 10));
    m = s.match(/平成\s*(元|\d+)/);
    if (m) return 1988 + (m[1] === '元' ? 1 : parseInt(m[1], 10));
    m = s.match(/昭和\s*(元|\d+)/);
    if (m) return 1925 + (m[1] === '元' ? 1 : parseInt(m[1], 10));
    m = s.match(/(19\d{2}|20\d{2})/);
    if (m) return parseInt(m[1], 10);
    return new Date().getFullYear();
}

/**
 * 10進数の度を 度・分・秒 に分解する
 */
function decimalToDMS(degVal) {
    const abs = Math.abs(Number(degVal) || 0);
    const deg = Math.floor(abs);
    const minFloat = (abs - deg) * 60;
    const min = Math.floor(minFloat);
    const sec = (minFloat - min) * 60;
    return { deg, min, sec };
}

/**
 * UTF-16LE エンコードヘルパー
 */
function encodeUtf16LE(str, maxBytes = 0) {
    let s = String(str ?? '');
    if (maxBytes > 0) {
        const maxChars = Math.floor(maxBytes / 2);
        if (s.length > maxChars) s = s.slice(0, maxChars);
    }
    const out = new Uint8Array(s.length * 2);
    for (let i = 0; i < s.length; i++) {
        const code = s.charCodeAt(i);
        out[i * 2] = code & 0xff;
        out[i * 2 + 1] = (code >>> 8) & 0xff;
    }
    return out;
}

/**
 * Jet 4.0 の1行レコードバイナリを構築する
 */
function encodeJet4Row(tdef, rowObj, rawLvalPtrBytes = null) {
    const colCount = tdef.maxCols;
    const varCount = tdef.numVarCols;
    const nullLen = Math.ceil(colCount / 8);
    const nullMask = new Uint8Array(nullLen);

    let fixedLen = 0;
    for (const c of tdef.cols) {
        if (c.isFixed && c.type !== 1) {
            const end = c.fixedOffset + c.len;
            if (end > fixedLen) fixedLen = end;
        }
    }

    const fixedBuf = new Uint8Array(fixedLen);
    const fixedView = new DataView(fixedBuf.buffer);
    const varChunks = new Array(varCount).fill(new Uint8Array(0));

    for (const c of tdef.cols) {
        const val = rowObj[c.name];
        if (c.type === 1) {
            if (val) nullMask[c.colNum >> 3] |= 1 << (c.colNum & 7);
            continue;
        }
        if (val === null || val === undefined) continue;
        nullMask[c.colNum >> 3] |= 1 << (c.colNum & 7);

        if (c.isFixed) {
            if (c.type === 2) fixedView.setInt8(c.fixedOffset, Number(val) || 0);
            else if (c.type === 3) fixedView.setInt16(c.fixedOffset, Number(val) || 0, true);
            else if (c.type === 4) fixedView.setInt32(c.fixedOffset, Number(val) || 0, true);
            else if (c.type === 6) fixedView.setFloat32(c.fixedOffset, Number(val) || 0, true);
            else if (c.type === 7 || c.type === 8) fixedView.setFloat64(c.fixedOffset, Number(val) || 0, true);
        } else {
            if (c.type === 10 || c.type === 12) {
                varChunks[c.varColNum] = encodeUtf16LE(val, c.len);
            } else if (c.type === 11) {
                if (rawLvalPtrBytes && rawLvalPtrBytes.length > 0) {
                    varChunks[c.varColNum] = rawLvalPtrBytes;
                } else {
                    nullMask[c.colNum >> 3] &= ~(1 << (c.colNum & 7));
                }
            }
        }
    }

    let totalVarLen = 0;
    for (const ch of varChunks) totalVarLen += ch.length;

    const recLen = 2 + fixedLen + totalVarLen + (varCount + 1) * 2 + 2 + nullLen;
    const out = new Uint8Array(recLen);
    const outView = new DataView(out.buffer);
    outView.setUint16(0, colCount, true);
    out.set(fixedBuf, 2);

    let varWritePos = 2 + fixedLen;
    for (const ch of varChunks) {
        out.set(ch, varWritePos);
        varWritePos += ch.length;
    }

    const varCountPos = recLen - nullLen - 2;
    outView.setUint16(varCountPos, varCount, true);
    let curOff = 2 + fixedLen;
    for (let i = 0; i < varCount; i++) {
        outView.setUint16(varCountPos - (i + 1) * 2, curOff, true);
        curOff += varChunks[i].length;
    }
    outView.setUint16(varCountPos - (varCount + 1) * 2, curOff, true);
    out.set(nullMask, recLen - nullLen);
    return out;
}

/**
 * TDEF ページのインデックス・使用マップポインタを取得する
 */
function getJet4TdefPointers(buf, pageNum) {
    const off = pageNum * 4096;
    const dv = new DataView(buf.buffer, buf.byteOffset + off, 4096);
    const numRows = dv.getUint32(16, true);
    const autonum = dv.getUint32(20, true);
    const numCols = dv.getUint16(45, true);
    const numIdx = dv.getUint32(47, true);
    const numRealIdx = dv.getUint32(51, true);
    const rowPageMapPtr = dv.getUint32(55, true);
    const freePageMapPtr = dv.getUint32(59, true);

    let pos = 63 + numRealIdx * 12 + numCols * 25;
    for (let i = 0; i < numCols; i++) {
        pos += 2 + dv.getUint16(pos, true);
    }
    const realIdxPos = pos;
    const idxMapPtr = dv.getUint32(realIdxPos + 34, true);
    const idxRootPage = dv.getUint32(realIdxPos + 38, true);

    pos += numRealIdx * 52 + numIdx * 28;
    for (let i = 0; i < numIdx; i++) {
        pos += 2 + dv.getUint16(pos, true);
    }
    let lvalUsedMapPtr = 0;
    let lvalFreeMapPtr = 0;
    while (pos + 2 <= 4096) {
        const colId = dv.getUint16(pos, true);
        if (colId === 0xffff) break;
        lvalUsedMapPtr = dv.getUint32(pos + 2, true);
        lvalFreeMapPtr = dv.getUint32(pos + 6, true);
        pos += 10;
    }
    return {
        pageNum,
        numRows,
        autonum,
        rowPageMapPtr,
        freePageMapPtr,
        realIdxPos,
        idxMapPtr,
        idxRootPage,
        lvalUsedMapPtr,
        lvalFreeMapPtr
    };
}

/**
 * 使用マップレコード (type 0 bitmap) からページ番号配列を取得・更新するヘルパー
 */
function getUsageMapRecordSlice(buf, mapPtr) {
    if (!mapPtr) return null;
    const slot = mapPtr & 0xff;
    const page = mapPtr >>> 8;
    const pOff = page * 4096;
    if (pOff + 4096 > buf.length) return null;
    const dv = new DataView(buf.buffer, buf.byteOffset + pOff, 4096);
    const rCount = dv.getUint16(12, true);
    if (slot >= rCount) return null;
    const rOff = dv.getUint16(14 + slot * 2, true) & 0x0fff;
    const rEnd = slot === 0 ? 4096 : dv.getUint16(14 + (slot - 1) * 2, true) & 0x0fff;
    return buf.subarray(pOff + rOff, pOff + rEnd);
}

function readUsageMapPages(buf, mapPtr) {
    const rec = getUsageMapRecordSlice(buf, mapPtr);
    if (!rec || rec.length < 5 || rec[0] !== 0) return [];
    const dv = new DataView(rec.buffer, rec.byteOffset, rec.byteLength);
    const startPage = dv.getUint32(1, true);
    const pages = [];
    for (let i = 5; i < rec.length; i++) {
        for (let b = 0; b < 8; b++) {
            if (rec[i] & (1 << b)) pages.push(startPage + (i - 5) * 8 + b);
        }
    }
    return pages;
}

function writeUsageMapPages(buf, mapPtr, pages) {
    const rec = getUsageMapRecordSlice(buf, mapPtr);
    if (!rec || rec.length < 5 || rec[0] !== 0) return;
    const dv = new DataView(rec.buffer, rec.byteOffset, rec.byteLength);
    const startPage = dv.getUint32(1, true);
    for (let i = 5; i < rec.length; i++) rec[i] = 0;
    for (const p of pages) {
        const bitIndex = p - startPage;
        if (bitIndex < 0) continue;
        const byteIndex = 5 + (bitIndex >> 3);
        if (byteIndex < rec.length) {
            rec[byteIndex] |= 1 << (bitIndex & 7);
        }
    }
}

/**
 * Jet 4.0 リーフインデックスページ (0x04) を構築する
 */
function buildJet4IndexLeafPage(tdefPage, entries, prevPage = 0, nextPage = 0, compressPrefix3 = false) {
    const page = new Uint8Array(4096);
    const dv = new DataView(page.buffer);
    page[0] = 0x04;
    page[1] = 0x01;
    dv.setUint32(4, tdefPage, true);
    dv.setUint32(8, prevPage, true);
    dv.setUint32(12, nextPage, true);
    page[24] = compressPrefix3 ? 0x03 : 0x00;

    let pos = 480;
    const fullEntry = new Uint8Array(9);
    const entryView = new DataView(fullEntry.buffer);

    for (let i = 0; i < entries.length; i++) {
        const { key, rowPage, rowSlot } = entries[i];
        fullEntry[0] = 0x7f;
        entryView.setUint32(1, (key ^ 0x80000000) >>> 0, false);
        fullEntry[5] = (rowPage >>> 16) & 0xff;
        fullEntry[6] = (rowPage >>> 8) & 0xff;
        fullEntry[7] = rowPage & 0xff;
        fullEntry[8] = rowSlot & 0xff;

        const slice = compressPrefix3 && i > 0 ? fullEntry.subarray(3) : fullEntry;
        page.set(slice, pos);
        pos += slice.length;
        const bitPos = pos - 480;
        page[27 + (bitPos >> 3)] |= 1 << (bitPos & 7);
    }

    const usedBytes = pos - 480;
    dv.setUint16(2, 3616 - usedBytes, true);
    return page;
}

/**
 * Jet 4.0 ルートノードインデックスページ (0x03) を構築する
 */
function buildJet4IndexNodePage(tdefPage, leafMetas) {
    const page = new Uint8Array(4096);
    const dv = new DataView(page.buffer);
    page[0] = 0x03;
    page[1] = 0x01;
    dv.setUint32(4, tdefPage, true);
    const lastLeaf = leafMetas[leafMetas.length - 1];
    dv.setUint32(20, lastLeaf.pageNum, true);
    page[26] = 0x01;

    let pos = 480;
    const nodeEntry = new Uint8Array(13);
    const entryView = new DataView(nodeEntry.buffer);

    for (let i = 0; i < leafMetas.length - 1; i++) {
        const { maxKey, maxRowPage, maxRowSlot, pageNum } = leafMetas[i];
        nodeEntry[0] = 0x7f;
        entryView.setUint32(1, (maxKey ^ 0x80000000) >>> 0, false);
        nodeEntry[5] = (maxRowPage >>> 16) & 0xff;
        nodeEntry[6] = (maxRowPage >>> 8) & 0xff;
        nodeEntry[7] = maxRowPage & 0xff;
        nodeEntry[8] = maxRowSlot & 0xff;
        entryView.setUint32(9, pageNum >>> 0, false);

        page.set(nodeEntry, pos);
        pos += 13;
        const bitPos = pos - 480;
        page[27 + (bitPos >> 3)] |= 1 << (bitPos & 7);
    }

    const usedBytes = pos - 480;
    dv.setUint16(2, 3616 - usedBytes, true);
    return page;
}

/**
 * MDBバイナリ内の T_測量箇所・T_測量データ に測量データを保存（上書きまたは新規追加）し、
 * 更新済みの MDB バイナリ (Uint8Array) を返す
 */
function saveRecordToCompassMdb(mdbBuffer, options) {
    const srcBuf = mdbBuffer instanceof Uint8Array ? mdbBuffer : new Uint8Array(mdbBuffer);
    if (srcBuf.length < 4096) {
        throw new Error('有効なMDBファイルではありません。');
    }
    const sig = new TextDecoder('ascii').decode(srcBuf.subarray(4, 19));
    if (sig !== JET4_SIGNATURE && sig !== ACE_SIGNATURE) {
        throw new Error('Microsoft Access (Jet/ACE) データベース形式ではありません。');
    }
    const hView = new DataView(srcBuf.buffer, srcBuf.byteOffset, srcBuf.byteLength);
    const jetVersion = hView.getUint32(20, true);
    if (jetVersion === 0) {
        throw new Error('Jet 3.0 (Access 97) 形式への書き込みは現在サポートされていません (Jet 4.0 / Access 2000以降のみ対応)。');
    }

    const pageSize = 4096;
    const totalOrigPages = Math.floor(srcBuf.length / pageSize);

    // 1. T_測量箇所 と T_測量データ の TDEF を特定
    let kashoTdef = null;
    let dataTdef = null;
    const msysTdef = parseTdef(srcBuf, 2, pageSize, false);
    if (msysTdef) {
        const msysRows = readTableRows(srcBuf, msysTdef, pageSize, false);
        for (const r of msysRows) {
            if (r.Type === 1 && r.Id > 0) {
                if (r.Name === 'T_測量箇所') kashoTdef = parseTdef(srcBuf, r.Id, pageSize, false);
                else if (r.Name === 'T_測量データ') dataTdef = parseTdef(srcBuf, r.Id, pageSize, false);
            }
        }
    }
    if (!kashoTdef || !dataTdef) {
        for (let p = 2; p < totalOrigPages; p++) {
            if (srcBuf[p * pageSize] !== 0x02) continue;
            const t = parseTdef(srcBuf, p, pageSize, false);
            if (!t || !t.cols) continue;
            const colNames = new Set(t.cols.map(c => c.name));
            if (!kashoTdef && colNames.has('箇所ID') && colNames.has('箇所名')) kashoTdef = t;
            else if (!dataTdef && colNames.has('箇所ID') && colNames.has('測点名') && colNames.has('方位角')) dataTdef = t;
        }
    }
    if (!kashoTdef || !dataTdef) {
        throw new Error('MDB内に「T_測量箇所」または「T_測量データ」テーブルが見つかりませんでした。');
    }

    const kashoMeta = getJet4TdefPointers(srcBuf, kashoTdef.page);
    const dataMeta = getJet4TdefPointers(srcBuf, dataTdef.page);

    const kashoRows = readTableRows(srcBuf, kashoTdef, pageSize, false);
    let allDataRows = readTableRows(srcBuf, dataTdef, pageSize, false);

    const {
        mode = 'overwrite',
        targetKashoId = null,
        kashoName = '',
        tableData = [],
        attributes = [],
        lat = 34.097294,
        lon = 135.434808,
        declination = 0,
        compassAdjustmentChecked = true,
        totalAreaHa = 0,
        previewGifBytes = null
    } = options || {};

    // 2. 対象 箇所ID の決定と T_測量箇所 レコードの構築
    let existingKashoIdx = -1;
    if (mode === 'overwrite' && targetKashoId != null) {
        existingKashoIdx = kashoRows.findIndex(r => Number(r['箇所ID']) === Number(targetKashoId));
    }

    const maxKashoId = Math.max(kashoMeta.autonum, ...kashoRows.map(r => Number(r['箇所ID']) || 0));
    const maxKashoOrder = Math.max(0, ...kashoRows.map(r => Number(r['箇所並び順']) || 0));

    let kashoRecord;
    let finalKashoId;
    if (existingKashoIdx >= 0) {
        kashoRecord = { ...kashoRows[existingKashoIdx] };
        finalKashoId = Number(kashoRecord['箇所ID']);
    } else {
        finalKashoId = maxKashoId + 1;
        const attrNames = new Set(attributes.map(a => (a.name || '').trim()));
        const isChisan = attrNames.has('工種') || attrNames.has('施工地名') || attrNames.has('工事番号');
        kashoRecord = {
            箇所ID: finalKashoId,
            箇所並び順: maxKashoOrder + 1,
            箇所名: '',
            造林治山: !isChisan,
            測量種別: true,
            ポリゴンタイプ: 0,
            トラバース種別: true,
            西暦: new Date().getFullYear(),
            年度: null,
            番号: null,
            事業: null,
            事業区分: null,
            事業主体: null,
            Chk面積: false,
            面積: 0,
            作業種: null,
            搬出量: null,
            樹種: null,
            林齢: null,
            所有者: null,
            代理申請者: null,
            所在地: null,
            小班: null,
            備考: null,
            CRC: false,
            面積桁数: 2,
            誤差桁数: 2,
            測位点: 'BP',
            測位点経度: 0,
            測位点緯度: 0,
            OB_公共座標: false,
            緯度_度: 34,
            緯度_分: 5,
            緯度_秒: 50.26,
            経度_度: 135,
            経度_分: 26,
            経度_秒: 5.31,
            シェイプファイル名:
                '=IF(造林治山="造林",年度&事業区分&作業種&所有者&面積属性&"ha",年度&番号&事業&IF(事業区分<>"","-"&事業区分,"")&事業主体&面積属性&"ha")',
            測量者氏名: null,
            縮尺: 1000,
            方位回転角: 0,
            用紙: 'A3',
            用紙向き: '横',
            BP数: 1,
            BP方向1: '↓',
            BP方向2: '↓',
            BP方向3: '↓',
            BP方向4: '↓',
            BP方向5: '↓',
            BP方向6: '↓',
            BP方向7: '↓',
            BP方向8: '↓',
            BP方向9: '↓',
            BP方向10: '↓',
            Option1: null,
            Option2: null,
            Option3: null,
            Option4: null,
            Option5: null,
            Version: 'コンパスtoGIS_8.20.xlsm',
            イメージ: null
        };
    }

    // 属性値を T_測量箇所 の各カラムへ反映
    const isZourin = kashoRecord['造林治山'] !== false;
    const labelToCol = isZourin
        ? {
              年度: '年度',
              番号: '番号',
              事業: '事業',
              事業区分: '事業区分',
              事業主体: '事業主体',
              作業種: '作業種',
              搬出量: '搬出量',
              樹種: '樹種',
              林齢: '林齢',
              所有者名: '所有者',
              所有者: '所有者',
              代理申請者: '代理申請者',
              所在地: '所在地',
              小班: '小班',
              備考: '備考',
              測量者氏名: '測量者氏名'
          }
        : {
              年度: '年度',
              事業名: '番号',
              工事番号: '事業',
              工事枝番: '事業区分',
              施工地名: '事業主体',
              工種: '作業種',
              樹種: '搬出量',
              '間伐率％': '樹種',
              成立本数: '林齢',
              現成立本数: '所有者',
              胸高直径: '代理申請者',
              樹高: '所在地',
              所有者名: '小班',
              備考: '備考',
              測量者氏名: '測量者氏名'
          };

    for (const a of attributes) {
        const key = (a.name || '').trim();
        const val = (a.value ?? '').toString().trim();
        const colName = labelToCol[key];
        if (colName) {
            kashoRecord[colName] = val !== '' ? val : null;
        }
    }

    if (kashoRecord['年度']) {
        kashoRecord['西暦'] = parseSeirekiFromNendo(kashoRecord['年度']);
    }

    const areaRounded = Number(Number(totalAreaHa || 0).toFixed(kashoRecord['面積桁数'] || 2));
    kashoRecord['面積'] = areaRounded;
    kashoRecord['トラバース種別'] = Boolean(compassAdjustmentChecked);

    const firstPt = String(tableData[0]?.[0] ?? '').trim() || 'BP';
    kashoRecord['測位点'] = firstPt;

    const latDMS = decimalToDMS(lat);
    const lonDMS = decimalToDMS(lon);
    kashoRecord['緯度_度'] = latDMS.deg;
    kashoRecord['緯度_分'] = latDMS.min;
    kashoRecord['緯度_秒'] = latDMS.sec;
    kashoRecord['経度_度'] = lonDMS.deg;
    kashoRecord['経度_分'] = lonDMS.min;
    kashoRecord['経度_秒'] = lonDMS.sec;

    const autoName =
        [
            kashoRecord['年度'] || '',
            kashoRecord['事業区分'] || '',
            kashoRecord['作業種'] || '',
            kashoRecord['所有者'] || '',
            areaRounded > 0 ? `${areaRounded}ha` : ''
        ]
            .join('')
            .trim() || `箇所ID_${finalKashoId}`;
    kashoRecord['箇所名'] = String(kashoName || '').trim() || autoName;

    if (previewGifBytes && previewGifBytes.length > 0) {
        kashoRecord['イメージ'] = previewGifBytes;
    }

    if (existingKashoIdx >= 0) {
        kashoRows[existingKashoIdx] = kashoRecord;
    } else {
        kashoRows.push(kashoRecord);
    }

    // 3. T_測量データ 行の更新
    allDataRows = allDataRows.filter(r => Number(r['箇所ID']) !== finalKashoId);
    let nextDataId = Math.max(dataMeta.autonum, ...allDataRows.map(r => Number(r['データID']) || 0)) + 1;

    const validTableRows = tableData.filter(r => r && (String(r[0] ?? '').trim() !== '' || String(r[4] ?? '').trim() !== ''));
    validTableRows.forEach((r, idx) => {
        allDataRows.push({
            データID: nextDataId++,
            箇所ID: finalKashoId,
            BP番号: 0,
            測点並び順: idx + 1,
            測点名: String(r[0] ?? '').trim() || (idx === 0 ? 'BP' : String(idx)),
            方位角: parseFloat(r[2]) || 0,
            高低角: parseFloat(r[3]) || 0,
            斜距離: parseFloat(r[4]) || 0
        });
    });

    // PrimaryKey 順にソート
    kashoRows.sort((a, b) => (Number(a['箇所ID']) || 0) - (Number(b['箇所ID']) || 0));
    allDataRows.sort((a, b) => (Number(a['データID']) || 0) - (Number(b['データID']) || 0));

    // 4. ページ割り当て管理 (Page 1 slot 0 の空きページビットマップ + 元の T_測量箇所 / T_測量データ ページの解放)
    const oldKashoDataPages = readUsageMapPages(srcBuf, kashoMeta.rowPageMapPtr);
    const oldKashoLvalPages = readUsageMapPages(srcBuf, kashoMeta.lvalUsedMapPtr);
    const oldKashoIdxPages = readUsageMapPages(srcBuf, kashoMeta.idxMapPtr);
    const oldDataRowPages = readUsageMapPages(srcBuf, dataMeta.rowPageMapPtr);
    const oldDataIdxPages = readUsageMapPages(srcBuf, dataMeta.idxMapPtr);

    // 書き込み用のページマップ (既存のページデータをコピーし、必要に応じて拡張)
    const pageBuffers = [];
    for (let p = 0; p < totalOrigPages; p++) {
        const copy = new Uint8Array(pageSize);
        copy.set(srcBuf.subarray(p * pageSize, (p + 1) * pageSize));
        pageBuffers.push(copy);
    }

    const globalFreePages = new Set(readUsageMapPages(srcBuf, 0x00000100));
    for (const p of [
        ...oldKashoDataPages,
        ...oldKashoLvalPages,
        ...oldKashoIdxPages,
        ...oldDataRowPages,
        ...oldDataIdxPages
    ]) {
        if (p >= 2) {
            globalFreePages.add(p);
            if (p < pageBuffers.length) {
                pageBuffers[p].fill(0);
            }
        }
    }

    const allocPage = () => {
        // 既存のファイル内ページ (p < pageBuffers.length) を優先再利用
        const sortedFree = Array.from(globalFreePages).sort((a, b) => a - b);
        for (const p of sortedFree) {
            if (p >= 2 && p < pageBuffers.length) {
                globalFreePages.delete(p);
                pageBuffers[p].fill(0);
                return p;
            }
        }
        // ファイル末尾に新規ページを追加
        const newP = pageBuffers.length;
        globalFreePages.delete(newP);
        pageBuffers.push(new Uint8Array(pageSize));
        return newP;
    };

    // 5. T_測量箇所 の イメージ (LVAL ページチェーン) を構築
    const newKashoLvalPages = [];
    const kashoLvalPtrs = [];

    for (const row of kashoRows) {
        const imgBytes = row['イメージ'];
        if (!imgBytes || imgBytes.length === 0) {
            kashoLvalPtrs.push(null);
            continue;
        }
        const totalLen = imgBytes.length;
        const chunkPages = [];
        let offset = 0;
        while (offset < totalLen) {
            const p = allocPage();
            newKashoLvalPages.push(p);
            chunkPages.push({ page: p, slice: imgBytes.subarray(offset, Math.min(totalLen, offset + 4072)) });
            offset += 4072;
        }
        for (let i = 0; i < chunkPages.length; i++) {
            const { page: p, slice } = chunkPages[i];
            const nextP = i + 1 < chunkPages.length ? chunkPages[i + 1].page : 0;
            const recLen = 4 + slice.length;
            const recStart = pageSize - recLen;
            const pBuf = pageBuffers[p];
            const pView = new DataView(pBuf.buffer);
            pBuf[0] = 0x01;
            pBuf[1] = 0x01;
            pView.setUint16(2, pageSize - 16 - recLen, true);
            pBuf[4] = 0x4c; pBuf[5] = 0x56; pBuf[6] = 0x41; pBuf[7] = 0x4c; // "LVAL"
            pView.setUint32(8, 0, true);
            pView.setUint16(12, 1, true);
            pView.setUint16(14, recStart, true);
            pView.setUint32(recStart, nextP ? (nextP << 8) : 0, true);
            pBuf.set(slice, recStart + 4);
        }

        const lvalPtr = new Uint8Array(12);
        const lvalView = new DataView(lvalPtr.buffer);
        lvalView.setUint32(0, totalLen, true); // bit 30, 31 = 0 (type 2 multi-page LVAL)
        lvalView.setUint32(4, chunkPages[0].page << 8, true);
        lvalView.setUint32(8, 0, true);
        kashoLvalPtrs.push(lvalPtr);
    }

    // 6. データページを構築する共通関数
    const buildTableDataPages = (tdef, rows, lvalPtrs, keyColName) => {
        const dataPages = [];
        const freeSpacePages = [];
        const indexEntries = [];

        let curPage = -1;
        let curSlot = 0;
        let curWriteEnd = pageSize;
        let curOffsets = [];

        const flushDataPage = () => {
            if (curPage < 0) return;
            const pBuf = pageBuffers[curPage];
            const pView = new DataView(pBuf.buffer);
            const headerLen = 14 + curOffsets.length * 2;
            const freeBytes = curWriteEnd - headerLen;
            pBuf[0] = 0x01;
            pBuf[1] = 0x01;
            pView.setUint16(2, freeBytes, true);
            pView.setUint32(4, tdef.page, true);
            pView.setUint32(8, 0, true);
            pView.setUint16(12, curOffsets.length, true);
            for (let s = 0; s < curOffsets.length; s++) {
                pView.setUint16(14 + s * 2, curOffsets[s], true);
            }
            if (freeBytes >= 256) freeSpacePages.push(curPage);
        };

        for (let i = 0; i < rows.length; i++) {
            const recBytes = encodeJet4Row(tdef, rows[i], lvalPtrs ? lvalPtrs[i] : null);
            const needed = recBytes.length + 2; // +2 for offset entry in header
            const headerLenIfAdded = 14 + (curOffsets.length + 1) * 2;
            if (curPage < 0 || curWriteEnd - recBytes.length < headerLenIfAdded) {
                flushDataPage();
                curPage = allocPage();
                dataPages.push(curPage);
                curSlot = 0;
                curWriteEnd = pageSize;
                curOffsets = [];
            }
            curWriteEnd -= recBytes.length;
            pageBuffers[curPage].set(recBytes, curWriteEnd);
            curOffsets.push(curWriteEnd);
            indexEntries.push({
                key: Number(rows[i][keyColName]) || 0,
                rowPage: curPage,
                rowSlot: curSlot
            });
            curSlot++;
        }
        flushDataPage();
        if (dataPages.length === 0) {
            const emptyP = allocPage();
            dataPages.push(emptyP);
            freeSpacePages.push(emptyP);
            const pBuf = pageBuffers[emptyP];
            const pView = new DataView(pBuf.buffer);
            pBuf[0] = 0x01;
            pBuf[1] = 0x01;
            pView.setUint16(2, pageSize - 14, true);
            pView.setUint32(4, tdef.page, true);
        }
        return { dataPages, freeSpacePages, indexEntries };
    };

    const kashoBuilt = buildTableDataPages(kashoTdef, kashoRows, kashoLvalPtrs, '箇所ID');
    const dataBuilt = buildTableDataPages(dataTdef, allDataRows, null, 'データID');

    // 7. インデックスページを構築する共通関数
    const buildPrimaryKeyIndexPages = (tdefPage, entries, forceNodeRoot = false) => {
        const idxPages = [];
        const maxPerLeaf = 380; // 380 * 9 = 3420 <= 3616 bytes (uncompressed)
        if (!forceNodeRoot && entries.length <= maxPerLeaf) {
            const leafPage = allocPage();
            idxPages.push(leafPage);
            pageBuffers[leafPage].set(buildJet4IndexLeafPage(tdefPage, entries, 0, 0, false));
            return { rootPage: leafPage, idxPages };
        }

        // 複数リーフ + ルートノード (または forceNodeRoot)
        const rootPage = allocPage();
        idxPages.push(rootPage);
        const chunks = [];
        for (let i = 0; i < entries.length; i += maxPerLeaf) {
            chunks.push(entries.slice(i, i + maxPerLeaf));
        }
        if (chunks.length === 0) chunks.push([]);

        const leafPageNums = chunks.map(() => {
            const lp = allocPage();
            idxPages.push(lp);
            return lp;
        });

        const leafMetas = [];
        for (let c = 0; c < chunks.length; c++) {
            const chunk = chunks[c];
            const lp = leafPageNums[c];
            const prevP = c > 0 ? leafPageNums[c - 1] : 0;
            const nextP = c + 1 < chunks.length ? leafPageNums[c + 1] : 0;
            pageBuffers[lp].set(buildJet4IndexLeafPage(tdefPage, chunk, prevP, nextP, false));
            const last = chunk[chunk.length - 1] || { key: 0, rowPage: 0, rowSlot: 0 };
            leafMetas.push({
                pageNum: lp,
                maxKey: last.key,
                maxRowPage: last.rowPage,
                maxRowSlot: last.rowSlot
            });
        }

        pageBuffers[rootPage].set(buildJet4IndexNodePage(tdefPage, leafMetas));
        return { rootPage, idxPages };
    };

    const kashoIdxBuilt = buildPrimaryKeyIndexPages(kashoTdef.page, kashoBuilt.indexEntries, false);
    const dataIdxBuilt = buildPrimaryKeyIndexPages(dataTdef.page, dataBuilt.indexEntries, true);

    // 8. 全体バッファへ結合し、TDEF と使用マップを更新
    const outBuf = new Uint8Array(pageBuffers.length * pageSize);
    for (let p = 0; p < pageBuffers.length; p++) {
        outBuf.set(pageBuffers[p], p * pageSize);
    }

    const updateTdefHeader = (meta, rowCount, nextAutoNum, rootIdxPage) => {
        const off = meta.pageNum * pageSize;
        const dv = new DataView(outBuf.buffer, outBuf.byteOffset + off, pageSize);
        dv.setUint32(16, rowCount, true);
        dv.setUint32(20, nextAutoNum, true);
        dv.setUint32(63 + 4, rowCount, true); // uniqueEntryCount
        dv.setUint32(meta.realIdxPos + 38, rootIdxPage, true);
    };

    const newKashoAutonum = Math.max(kashoMeta.autonum, ...kashoRows.map(r => Number(r['箇所ID']) || 0));
    const newDataAutonum = Math.max(dataMeta.autonum, nextDataId);

    updateTdefHeader(kashoMeta, kashoRows.length, newKashoAutonum, kashoIdxBuilt.rootPage);
    updateTdefHeader(dataMeta, allDataRows.length, newDataAutonum, dataIdxBuilt.rootPage);

    writeUsageMapPages(outBuf, kashoMeta.rowPageMapPtr, kashoBuilt.dataPages);
    writeUsageMapPages(outBuf, kashoMeta.freePageMapPtr, kashoBuilt.freeSpacePages);
    writeUsageMapPages(outBuf, kashoMeta.lvalUsedMapPtr, newKashoLvalPages);
    writeUsageMapPages(outBuf, kashoMeta.lvalFreeMapPtr, []);
    writeUsageMapPages(outBuf, kashoMeta.idxMapPtr, kashoIdxBuilt.idxPages);

    writeUsageMapPages(outBuf, dataMeta.rowPageMapPtr, dataBuilt.dataPages);
    writeUsageMapPages(outBuf, dataMeta.freePageMapPtr, dataBuilt.freeSpacePages);
    writeUsageMapPages(outBuf, dataMeta.idxMapPtr, dataIdxBuilt.idxPages);

    writeUsageMapPages(outBuf, 0x00000100, Array.from(globalFreePages));

    return {
        buffer: outBuf,
        kashoId: finalKashoId,
        kashoName: kashoRecord['箇所名']
    };
}



// --- src/exportUtils.js ---
const exportUtils = {
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
    },

    exportShapefile(fileName, encoding = 'SJIS') {
        const lat0 = parseFloat(this.els.inputLat.value), lon0 = parseFloat(this.els.inputLon.value);
        if (isNaN(lat0) || isNaN(lon0)) return this.showToast("基準点(B.P.)の緯度・経度を正しく入力してください。");
        const lonDPM = CONSTANTS.LAT_DEG_PER_METER / Math.cos(Utils.deg2rad(lat0));

        const customFieldDefs = [];
        const customValues = {};
        this.state.attributes.forEach((a, idx) => {
            const name = a.name ? a.name.trim() : '';
            if (name) {
                const key = `attr_${idx}`;
                customFieldDefs.push({ key, name, type: 'C' });
                customValues[key] = a.value != null ? String(a.value) : '';
            }
        });

        let baseName = (fileName || '令和8年度_育成複層林整備_山田太郎_No.10').replace(/\.(zip|shp)$/i, '');
        const zipFiles = [];

        // 1. ポリゴンレイヤ (_polygon)
        if (this.els.chkCompassAdjustment.checked && this.state.detectedAreas.length > 0) {
            const polyGeoms = [];
            const polyRecords = [];
            this.state.detectedAreas.forEach((p, idx) => {
                const rings = [p.coords, ...(p.holes || []).map(h => h.coords)];
                polyGeoms.push(rings);
                polyRecords.push({
                    name: p.originalName || `区画 ${idx + 1}`,
                    area_m2: parseFloat(p.area.toFixed(2)),
                    hole_m2: parseFloat((p.area - p.netArea).toFixed(2)),
                    net_m2: parseFloat(p.netArea.toFixed(2)),
                    area_ha: parseFloat(Utils.round4(p.area / 10000)),
                    hole_ha: parseFloat(Utils.round4((p.area - p.netArea) / 10000)),
                    net_ha: parseFloat(Utils.round4(p.netArea / 10000)),
                    perim_m: parseFloat(p.perimeter.toFixed(2)),
                    struct: p.isDonut ? `ドーナツポリゴン（${p.holes.length}つの穴）` : '通常ポリゴン',
                    ...customValues
                });
            });
            const polyFields = [
                { key: 'name', name: '区画名', type: 'C' },
                { key: 'area_m2', name: encoding === 'SJIS' ? '全体面積m2' : '全体m2', type: 'N', size: 14, decimals: 2 },
                { key: 'hole_m2', name: encoding === 'SJIS' ? '除地面積m2' : '除地m2', type: 'N', size: 14, decimals: 2 },
                { key: 'net_m2', name: encoding === 'SJIS' ? '正味面積m2' : '正味m2', type: 'N', size: 14, decimals: 2 },
                { key: 'area_ha', name: encoding === 'SJIS' ? '全体面積ha' : '全体ha', type: 'N', size: 12, decimals: 4 },
                { key: 'hole_ha', name: encoding === 'SJIS' ? '除地面積ha' : '除地ha', type: 'N', size: 12, decimals: 4 },
                { key: 'net_ha', name: encoding === 'SJIS' ? '正味面積ha' : '正味ha', type: 'N', size: 12, decimals: 4 },
                { key: 'perim_m', name: '周長m', type: 'N', size: 12, decimals: 2 },
                { key: 'struct', name: '構造', type: 'C' },
                ...customFieldDefs
            ];
            zipFiles.push(...buildShapefileLayerFiles(`${baseName}_polygon`, 5, polyGeoms, polyRecords, polyFields, encoding));
        }

        // 2. ラインレイヤ (_line)
        const lineGeoms = [];
        const lineRecords = [];
        this.state.points.forEach(p => {
            lineGeoms.push([
                [
                    [lon0 + p.fromX * lonDPM, lat0 + p.fromY * CONSTANTS.LAT_DEG_PER_METER],
                    [lon0 + p.toX * lonDPM, lat0 + p.toY * CONSTANTS.LAT_DEG_PER_METER]
                ]
            ]);
            lineRecords.push({
                type: p.type === 'main' ? '本線' : '支線',
                is_draw: p.isDraw ? 'はい' : 'いいえ',
                from_pt: p.fromName || '',
                to_pt: p.toName || '',
                az: parseFloat(p.input.az.toFixed(2)),
                el: parseFloat(Number(p.input.el || 0).toFixed(2)),
                sd: parseFloat(Number(p.input.sd || 0).toFixed(2)),
                hd: parseFloat(p.input.hd.toFixed(2)),
                ...customValues
            });
        });
        if (this.state.annotations && Array.isArray(this.state.annotations.lines)) {
            this.state.annotations.lines.forEach(l => {
                if (!l.points || l.points.length < 2) return;
                lineGeoms.push([
                    l.points.map(pt => [lon0 + pt.x * lonDPM, lat0 + pt.y * CONSTANTS.LAT_DEG_PER_METER])
                ]);
                lineRecords.push({
                    type: '連続線',
                    is_draw: 'はい',
                    from_pt: '',
                    to_pt: '',
                    az: null,
                    el: null,
                    sd: null,
                    hd: null,
                    ...customValues
                });
            });
        }
        if (lineGeoms.length > 0) {
            const lineFields = [
                { key: 'type', name: 'タイプ', type: 'C' },
                { key: 'is_draw', name: encoding === 'SJIS' ? '作図対象' : '作図', type: 'C' },
                { key: 'from_pt', name: '器械点', type: 'C' },
                { key: 'to_pt', name: '視準点', type: 'C' },
                { key: 'az', name: '方位角', type: 'N', size: 10, decimals: 2 },
                { key: 'el', name: '高低角', type: 'N', size: 10, decimals: 2 },
                { key: 'sd', name: '斜距離', type: 'N', size: 12, decimals: 2 },
                { key: 'hd', name: encoding === 'SJIS' ? '水平距離' : '水平距', type: 'N', size: 12, decimals: 2 },
                ...customFieldDefs
            ];
            zipFiles.push(...buildShapefileLayerFiles(`${baseName}_line`, 3, lineGeoms, lineRecords, lineFields, encoding));
        }

        // 3. ポイントレイヤ (_point)
        const ptGeoms = [];
        const ptRecords = [];
        const fp = this._getFirstPointName();
        ptGeoms.push([lon0, lat0]);
        ptRecords.push({
            type: '測点',
            pt_name: fp,
            text: '',
            lat: parseFloat(lat0.toFixed(6)),
            lon: parseFloat(lon0.toFixed(6)),
            ...customValues
        });
        this.state.nodes.forEach((node, name) => {
            if (name === fp && Math.abs(node.x) < 0.001 && Math.abs(node.y) < 0.001) return;
            const nLat = lat0 + node.y * CONSTANTS.LAT_DEG_PER_METER;
            const nLon = lon0 + node.x * lonDPM;
            ptGeoms.push([nLon, nLat]);
            ptRecords.push({
                type: '測点',
                pt_name: name,
                text: '',
                lat: parseFloat(nLat.toFixed(6)),
                lon: parseFloat(nLon.toFixed(6)),
                ...customValues
            });
        });
        if (this.state.annotations && Array.isArray(this.state.annotations.texts)) {
            this.state.annotations.texts.forEach(t => {
                const tLat = lat0 + t.y * CONSTANTS.LAT_DEG_PER_METER;
                const tLon = lon0 + t.x * lonDPM;
                ptGeoms.push([tLon, tLat]);
                ptRecords.push({
                    type: '注記',
                    pt_name: '',
                    text: t.text || '',
                    lat: parseFloat(tLat.toFixed(6)),
                    lon: parseFloat(tLon.toFixed(6)),
                    ...customValues
                });
            });
        }
        if (ptGeoms.length > 0) {
            const ptFields = [
                { key: 'type', name: 'タイプ', type: 'C' },
                { key: 'pt_name', name: '測点名', type: 'C' },
                { key: 'text', name: 'テキスト', type: 'C' },
                { key: 'lat', name: '緯度', type: 'N', size: 12, decimals: 6 },
                { key: 'lon', name: '経度', type: 'N', size: 12, decimals: 6 },
                ...customFieldDefs
            ];
            zipFiles.push(...buildShapefileLayerFiles(`${baseName}_point`, 1, ptGeoms, ptRecords, ptFields, encoding));
        }

        if (zipFiles.length === 0) {
            return this.showToast("出力する図形データがありません。");
        }

        const zipBytes = buildZipArchive(zipFiles);
        const blob = new Blob([zipBytes], { type: 'application/zip' });
        const url = URL.createObjectURL(blob);
        this._downloadFile(url, `${baseName}.zip`);
        setTimeout(() => URL.revokeObjectURL(url), 5000);
        this.showToast('シェープファイル(ZIP)として保存しました。');
    },

    showHTMLPreview(fileName, pSize = 'A4', ori = 'landscape', sOpt = 'auto', split = 50, existingWin = null) {
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
<script src="https://cdnjs.cloudflare.com/ajax/libs/encoding-japanese/2.0.0/encoding.min.js"><\/script>
<style>
@page { size: ${pSize} ${ori}; margin: 0; }
body { font-family: sans-serif; font-size: 10pt; background: #ececec; margin:0; padding-top: 60px; }
.page-wrapper { width: 100%; display: flex; justify-content: center; }
.page-container { position: relative; width: ${conf.w}mm; height: ${conf.h}mm; background: #fff; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.2); transform-origin: top center; transition: transform 0.1s ease; margin-bottom: 20px; flex-shrink: 0; }
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
    <label style="font-size:13px; margin-left: 10px; cursor: pointer; color: white;"><input type="checkbox" id="chkBgMap" ${showMapBg ? 'checked' : ''}> 背景地図</label>
    <select id="bgMapType" style="margin-left:5px; font-size:13px; padding: 2px;">
        <option value="https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png" ${currentTileUrl.includes('std') ? 'selected' : ''}>標準地図</option>
        <option value="https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg" ${currentTileUrl.includes('seamlessphoto') ? 'selected' : ''}>写真</option>
        <option value="https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png" ${currentTileUrl.includes('pale') ? 'selected' : ''}>淡色地図</option>
    </select>
        </div>
        
        <div style="display: flex; align-items: center; gap: 6px; background: rgba(0,0,0,0.2); padding: 4px 10px; border-radius: 6px;">
    <span style="font-size: 0.85rem;">用紙:</span>
    <select id="plPaperSize" style="font-size:12px; padding:2px;">
        <option value="A4" ${pSize==='A4'?'selected':''}>A4</option>
        <option value="A3" ${pSize==='A3'?'selected':''}>A3</option>
        <option value="A2" ${pSize==='A2'?'selected':''}>A2</option>
        <option value="A1" ${pSize==='A1'?'selected':''}>A1</option>
        <option value="A0" ${pSize==='A0'?'selected':''}>A0</option>
    </select>
    <select id="plOrientation" style="font-size:12px; padding:2px;">
        <option value="landscape" ${ori==='landscape'?'selected':''}>横</option>
        <option value="portrait" ${ori==='portrait'?'selected':''}>縦</option>
    </select>
    <span style="font-size: 0.85rem; margin-left: 6px;">縮尺:</span>
    <select id="plScale" style="font-size:12px; padding:2px;">
        <option value="auto" ${sOpt==='auto'?'selected':''}>自動縮尺</option>
        <option value="100" ${sOpt==='100'?'selected':''}>1/100</option>
        <option value="200" ${sOpt==='200'?'selected':''}>1/200</option>
        <option value="250" ${sOpt==='250'?'selected':''}>1/250</option>
        <option value="300" ${sOpt==='300'?'selected':''}>1/300</option>
        <option value="500" ${sOpt==='500'?'selected':''}>1/500</option>
        <option value="1000" ${sOpt==='1000'?'selected':''}>1/1,000</option>
        <option value="2000" ${sOpt==='2000'?'selected':''}>1/2,000</option>
        <option value="2500" ${sOpt==='2500'?'selected':''}>1/2,500</option>
        <option value="5000" ${sOpt==='5000'?'selected':''}>1/5,000</option>
    </select>
    <span style="font-size: 0.85rem; margin-left: 6px;">成果表折返:</span>
    <input type="number" id="plTableSplit" value="${split}" style="width:45px; font-size:12px; padding:2px;">
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
        <div class="map-group draggable no-bg no-scale" style="position: absolute; left: ${expRes.x / expRes.pxPerMm}mm; top: ${expRes.y / expRes.pxPerMm}mm; width: ${expRes.w / expRes.pxPerMm}mm; height: ${expRes.h / expRes.pxPerMm}mm; z-index: 1;">
    <div id="map-cropper" class="map-cropper" style="position:absolute; z-index:0; top: ${-(expRes.y / expRes.pxPerMm) + 10}mm; left: ${-(expRes.x / expRes.pxPerMm) + 10}mm; width: ${conf.w - 20}mm; height: ${conf.h - 20}mm; overflow:hidden;">
        <div id="printMapBg" style="position:absolute; top: -10mm; left: -10mm; width: ${conf.w}mm; height: ${conf.h}mm; z-index: 0; opacity: 0.7; pointer-events: none;"></div>
        <div class="resize-handle n" data-dir="n"></div><div class="resize-handle s" data-dir="s"></div><div class="resize-handle w" data-dir="w"></div><div class="resize-handle e" data-dir="e"></div>
        <div class="resize-handle nw" data-dir="nw"></div><div class="resize-handle ne" data-dir="ne"></div><div class="resize-handle sw" data-dir="sw"></div><div class="resize-handle se" data-dir="se"></div>
    </div>
    <div style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; z-index: 1;">
        ${expRes.svgString}
    </div>
    ${labelsHTML}
        </div>
        <div class="compass-image draggable no-scale no-bg">
            ${compSVG.svgString}
        </div>
        <div class="attr-table-wrapper draggable"><table>${attrTable}</table></div>${resTable}${areaTable}
        ${this.els.closureInfo.innerText ? `<div class="closure-info draggable" style="bottom:15mm; left:15mm; padding:5px; font-size:9pt;">閉合状況: ${this.els.closureInfo.innerText}</div>` : ''}
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
    const bounds = L.latLngBounds([${latBottom}, ${lonLeft}], [${latTop}, ${lonRight}]);
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
    window.opener.app.showHTMLPreview(${JSON.stringify(fileName)}, newPSize, newOri, newSOpt, newSplit, window);
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
                const pts = poly.getAttribute('points').trim().split(/\s+/).map(p => {
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
                    const args = cmd.slice(1).trim().split(/[\s,]+/).map(Number);
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
        a.download = '${outFileName}'.replace('.html', '.dxf');
        a.click();
        URL.revokeObjectURL(url);
    });
    } catch(e) { alert('Try Error: ' + e.message); }
}, 100);
<\/script></body></html>`;

        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        if (existingWin) {
            existingWin.location.replace(url);
        } else {
            window.open(url, '_blank');
        }

        this.els.chkMagDeclination.checked = origMag; this.updateDrawing(false);
    },

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
    },

    _buildExportHTMLAttrTable(scTxt, lat, lon, dec) {
        let html = this.state.attributes.map(a => `<tr><th style="text-align:left;white-space:nowrap;">${a.name}</th><td>${a.value||''}</td></tr>`).join('');
        return html + `<tr><th style="text-align:left;">縮尺</th><td style="font-weight:bold;">${scTxt}</td></tr><tr><th style="text-align:left;">基準点</th><td style="font-size:8pt;">Lat ${lat}<br>Lon ${lon}<br>(偏角: ${dec}度)</td></tr>`;
    },

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
    },

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
    },

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
        const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${tx} ${ty} ${tw} ${th}" width="100%" height="100%">${svg}</svg>`;
        return { dataURL: 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString))), svgString, x: tx, y: ty, w: tw, h: th, pxPerMm: conf.expW / conf.w };
    },

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
    },

    _generateCompassSVGDataURL(conf, dec) {
        const uS = Math.min(conf.expW, conf.expH) / 800, r = 35 * uS, s = r * 4, cx = s/2, cy = s/2;
        let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${s} ${s}" width="100%" height="100%"><line x1="${cx}" y1="${cy-r}" x2="${cx}" y2="${cy+r}" stroke="#9ca3af" stroke-width="${1.5*uS}" /><line x1="${cx-r}" y1="${cy}" x2="${cx+r}" y2="${cy}" stroke="#9ca3af" stroke-width="${1.5*uS}" /><polygon points="${cx},${cy-r-6*uS} ${cx+5*uS},${cy-r+12*uS} ${cx-5*uS},${cy-r+12*uS}" fill="${this.CONFIG.colors.compassText}" /><text x="${cx}" y="${cy-r-13*uS}" font-family="sans-serif" font-size="${Math.round(16*uS)}px" font-weight="bold" fill="${this.CONFIG.colors.compassText}" text-anchor="middle">N</text>`;
        if (this.els.chkMagDeclination.checked && parseFloat(dec) !== 0) { const rad = -parseFloat(dec) * Math.PI / 180; const cos = Math.cos(rad), sin = Math.sin(rad); const rx = (px, py) => cx + px * cos - py * sin; const ry = (px, py) => cy + px * sin + py * cos; const l1x = rx(0, -r), l1y = ry(0, -r); const p1x = rx(0, -r-2*uS), p1y = ry(0, -r-2*uS); const p2x = rx(4*uS, -r+8*uS), p2y = ry(4*uS, -r+8*uS); const p3x = rx(-4*uS, -r+8*uS), p3y = ry(-4*uS, -r+8*uS); const tx = rx(0, -r-6*uS), ty = ry(0, -r-6*uS); svg += `<line x1="${cx}" y1="${cy}" x2="${l1x}" y2="${l1y}" stroke="${this.CONFIG.colors.compassArrow}" stroke-width="${2.5*uS}" /><polygon points="${p1x},${p1y} ${p2x},${p2y} ${p3x},${p3y}" fill="${this.CONFIG.colors.compassArrow}" /><text x="${tx}" y="${ty}" font-family="sans-serif" font-size="${Math.round(14*uS)}px" fill="${this.CONFIG.colors.compassArrow}" text-anchor="middle">MN</text>`; }
        const svgString = svg + `</svg>`;
        return { dataURL: 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString))), svgString };
    },

    exportJSON(fileName) {
        const st = { tableData: this.state.tableData, attributes: this.state.attributes, annotations: this.state.annotations, settings: { lat: this.els.inputLat.value, lon: this.els.inputLon.value, declination: this.els.inputDeclination.value, magDeclinationChecked: this.els.chkMagDeclination.checked, compassAdjustmentChecked: this.els.chkCompassAdjustment.checked, convertEPtoBPChecked: this.els.chkConvertEPtoBP ? this.els.chkConvertEPtoBP.checked : true, nodeLabelInterval: this.els.selNodeLabelInterval.value }, previewImage: this.generatePreviewImage() };
        if (!fileName) fileName = '令和8年度_育成複層林整備_山田太郎_No.10'; if (!fileName.endsWith('.json')) fileName += '.json';
        this._downloadFile("data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(st)), fileName);
        this.showToast('JSONファイルとして保存しました。');
    },

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
    },

    generatePreviewGifBytes() {
        const cv = document.createElement('canvas'), ctx = cv.getContext('2d');
        cv.width = 600; cv.height = 600;
        ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, 600, 600);
        // 外枠とヘッダ・グリッドを描画 (コンパスtoGIS.xlsm の平面図プレビュー風)
        ctx.strokeStyle = '#e5e7eb'; ctx.lineWidth = 1;
        for (let g = 60; g < 600; g += 50) {
            ctx.beginPath(); ctx.moveTo(g, 50); ctx.lineTo(g, 560); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(40, g); ctx.lineTo(560, g); ctx.stroke();
        }
        ctx.strokeStyle = '#374151'; ctx.lineWidth = 1.5;
        ctx.strokeRect(40, 50, 520, 510);
        ctx.fillStyle = '#111827'; ctx.font = 'bold 18px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText('平面図', 300, 32);

        if (this.state.points.length > 0) {
            const bs = this.state.bounds, dw = bs.maxX - bs.minX, dh = bs.maxY - bs.minY;
            const s = (dw === 0 && dh === 0) ? 10 : Math.min(440 / (dw || 1), 430 / (dh || 1));
            const ox = 300 - ((bs.minX + bs.maxX) / 2) * s, oy = 305 + ((bs.minY + bs.maxY) / 2) * s;
            this._drawAreas(ctx, ox, oy, s, this.state.detectedAreas, this.state.nodes);
            this._drawLines(ctx, ox, oy, s, this.state.points);
            this._drawNodes(ctx, ox, oy, s, this.state.nodes, false);
        }
        const imgData = ctx.getImageData(0, 0, 600, 600);
        return encodeRgbaToGif89a(600, 600, imgData.data);
    },

    generateAutoKashoName() {
        const totalHa = this.state.detectedAreas.reduce((acc, a) => acc + (a.netArea || 0) / 10000, 0);
        const areaStr = totalHa > 0 ? `${totalHa.toFixed(2)}ha` : '';
        const attrVals = this.state.attributes
            .filter(a => a && a.value && !['備考', '測量者氏名', '所在地', '小班', '代理申請者', '搬出量', '樹種', '林齢', '番号'].includes((a.name || '').trim()))
            .map(a => String(a.value).trim())
            .filter(Boolean);
        const base = attrVals.length > 0 ? attrVals.join('') : '測量箇所';
        return `${base}${areaStr}`;
    },

    refreshMdbExportModalUI() {
        if (!this.els.mdbExportOptions) return;
        const hasMdb = Boolean(this.activeMdbBuffer && this.activeMdbBuffer.length > 0);
        if (this.els.mdbTargetFileInfo) {
            if (hasMdb) {
                this.els.mdbTargetFileInfo.innerHTML = `<span style="color:#059669;font-weight:bold;">✔ 読込済:</span> ${Utils.escapeHTML(this.activeMdbFileName || 'database.mdb')}`;
            } else {
                this.els.mdbTargetFileInfo.innerHTML = `<span style="color:#d97706;">⚠️ 保存先のMDBファイルを上の「📁 MDBファイルを選択...」から指定してください</span>`;
            }
        }

        const sel = this.els.selMdbTargetKasho;
        if (sel) {
            sel.innerHTML = '';
            if (hasMdb) {
                try {
                    const items = parseCompassMdb(this.activeMdbBuffer, this.activeMdbFileName || 'database.mdb');
                    this._mdbModalKashoItems = items;
                    items.forEach(item => {
                        const opt = document.createElement('option');
                        opt.value = String(item.kashoId);
                        opt.textContent = `[ID:${item.kashoId}] ${item.name}`;
                        if (this.activeMdbKashoId != null && Number(item.kashoId) === Number(this.activeMdbKashoId)) {
                            opt.selected = true;
                        }
                        sel.appendChild(opt);
                    });
                } catch (err) {
                    console.warn('MDB list parse error:', err);
                    this._mdbModalKashoItems = [];
                }
            } else {
                this._mdbModalKashoItems = [];
            }
        }

        const hasExistingItems = Array.isArray(this._mdbModalKashoItems) && this._mdbModalKashoItems.length > 0;
        if (this.els.radioMdbOverwrite && this.els.radioMdbAppend) {
            this.els.radioMdbOverwrite.disabled = !hasExistingItems;
            if (sel) sel.disabled = !hasExistingItems;
            if (hasExistingItems && this.activeMdbKashoId != null) {
                this.els.radioMdbOverwrite.checked = true;
            } else if (!hasExistingItems) {
                this.els.radioMdbAppend.checked = true;
            }
        }

        const isOverwrite = this.els.radioMdbOverwrite && this.els.radioMdbOverwrite.checked && hasExistingItems;
        if (this.els.inputMdbKashoName) {
            if (isOverwrite && sel) {
                const chosen = (this._mdbModalKashoItems || []).find(i => String(i.kashoId) === String(sel.value));
                this.els.inputMdbKashoName.value = chosen ? chosen.name : this.generateAutoKashoName();
            } else {
                this.els.inputMdbKashoName.value = this.generateAutoKashoName();
            }
        }

        if (hasMdb && this.els.inputExportFileName) {
            this.els.inputExportFileName.value = (this.activeMdbFileName || 'database.mdb').replace(/\.mdb$/i, '');
        }
    },

    exportMDB(fileName) {
        if (!this.activeMdbBuffer || this.activeMdbBuffer.length === 0) {
            this.showToast('保存先のMDBファイルを選択してください。');
            return false;
        }
        try {
            const modeEl = document.querySelector('input[name="mdbSaveMode"]:checked');
            const mode = modeEl ? modeEl.value : 'overwrite';
            const targetKashoId = this.els.selMdbTargetKasho ? parseInt(this.els.selMdbTargetKasho.value, 10) : this.activeMdbKashoId;
            const kashoName = (this.els.inputMdbKashoName ? this.els.inputMdbKashoName.value.trim() : '') || this.generateAutoKashoName();
            const totalAreaHa = this.state.detectedAreas.reduce((acc, a) => acc + (a.netArea || 0) / 10000, 0);
            const previewGifBytes = this.generatePreviewGifBytes();

            const res = saveRecordToCompassMdb(this.activeMdbBuffer, {
                mode,
                targetKashoId,
                kashoName,
                tableData: this.state.tableData,
                attributes: this.state.attributes,
                lat: parseFloat(this.els.inputLat.value) || 34.097294,
                lon: parseFloat(this.els.inputLon.value) || 135.434808,
                declination: parseFloat(this.els.inputDeclination.value) || 0,
                compassAdjustmentChecked: this.els.chkCompassAdjustment.checked,
                totalAreaHa,
                previewGifBytes
            });

            this.activeMdbBuffer = res.buffer;
            this.activeMdbKashoId = res.kashoId;
            this.activeMdbKashoName = res.kashoName;

            let outName = (fileName || this.activeMdbFileName || 'database.mdb').trim();
            if (!/\.mdb$/i.test(outName)) outName += '.mdb';
            this.activeMdbFileName = outName;

            const blob = new Blob([res.buffer], { type: 'application/x-msaccess' });
            const url = URL.createObjectURL(blob);
            this._downloadFile(url, outName);
            setTimeout(() => URL.revokeObjectURL(url), 10000);
            this.showToast(`MDB（${res.kashoName}）に保存して出力しました。`);
            return true;
        } catch (err) {
            console.error('MDB save error:', err);
            this.showToast(`MDB保存エラー: ${err.message || err}`);
            return false;
        }
    },

    _downloadFile(dStr, fName) { const a = document.createElement('a'); a.href = dStr; a.download = fName; document.body.appendChild(a); a.click(); a.remove(); },

    importJSON(event) {
        const files = event.target.files; if (!files || files.length === 0) return;
        this.processJsonFiles(Array.from(files).filter(f => /\.(json|mdb)$/i.test(f.name)));
    },

    renderImportFileList() {
        this.els.importFileList.innerHTML = '';
        const query = (this.els.inputImportSearch ? this.els.inputImportSearch.value : '').trim().toLowerCase();
        this.importFilesList.forEach((item, index) => {
            if (query) {
                const attrStr = item.data.attributes ? item.data.attributes.map(a => `${a.name} ${a.value}`).join(' ').toLowerCase() : '';
                const nameStr = `${item.name} ${item.sourceFileName || ''}`.toLowerCase();
                if (!nameStr.includes(query) && !attrStr.includes(query)) return;
            }
            const li = document.createElement('li');
            li.dataset.index = String(index);
            li.textContent = item.name;
            li.title = item.sourceFileName ? `${item.name} (${item.sourceFileName})` : item.name;
            if (this.selectedImportIndex === index) li.classList.add('selected');
            li.addEventListener('click', () => this.selectImportFile(index));
            li.addEventListener('dblclick', (e) => {
                e.preventDefault();
                this.selectImportFile(index);
                this.applySelectedImport();
            });
            this.els.importFileList.appendChild(li);
        });
    },

    selectImportFile(index) {
        this.selectedImportIndex = index;
        if (this.els.importFileList) {
            Array.from(this.els.importFileList.children).forEach(li => {
                li.classList.toggle('selected', Number(li.dataset.index) === index);
            });
        }
        const item = this.importFilesList[index]; if (!item) return;
        this.els.btnApplyImport.disabled = false;
        
        if (item.data.previewImage) { this.els.importPreviewImage.src = item.data.previewImage; this.els.importPreviewImage.style.display = 'inline-block'; this.els.importNoPreviewText.style.display = 'none'; } 
        else { this.els.importPreviewImage.style.display = 'none'; this.els.importNoPreviewText.style.display = 'inline-block'; this.els.importNoPreviewText.textContent = 'プレビュー画像なし'; }

        let attrText = item.data.attributes ? item.data.attributes.filter(a=>a.value).map(a=>`${Utils.escapeHTML(a.name)}: ${Utils.escapeHTML(a.value)}`).join(' / ') : '';
        const titleLabel = item.sourceFileName ? '箇所名' : 'ファイル名';
        const sourceSuffix = item.sourceFileName ? ` <span style="color:#6b7280;font-size:0.8rem;">(${Utils.escapeHTML(item.sourceFileName)})</span>` : '';
        const areaInfo = item.areaText ? ` / <strong>面積:</strong> ${Utils.escapeHTML(item.areaText)}` : '';
        this.els.importPreviewInfo.innerHTML =
            `<strong>${titleLabel}:</strong> ${Utils.escapeHTML(item.name)}${sourceSuffix}<br>` +
            (item.data.tableData ? `<strong>データ数:</strong> ${item.data.tableData.length}行${areaInfo}<br>` : '') +
            (attrText ? `<strong>属性情報:</strong> <span style="color:#4b5563;">${attrText}</span>` : '');
    },

    applySelectedImport() {
        if (document.activeElement) document.activeElement.blur();
        if (this.selectedImportIndex >= 0 && this.importFilesList[this.selectedImportIndex]) {
            const selectedItem = this.importFilesList[this.selectedImportIndex];
            if (selectedItem.isMdb && selectedItem.mdbBuffer) {
                this.activeMdbBuffer = selectedItem.mdbBuffer;
                this.activeMdbFileName = selectedItem.sourceFileName || (selectedItem.file ? selectedItem.file.name : 'database.mdb');
                this.activeMdbKashoId = selectedItem.kashoId;
                this.activeMdbKashoName = selectedItem.name;
            }
            const targetData = selectedItem.data;
            this.els.importPreviewModal.style.display = 'none';
            this.applyImportData(targetData);
            this.importFilesList = [];
            if (this.els.inputFileJSON) this.els.inputFileJSON.value = '';
            if (this.els.inputImportSearch) this.els.inputImportSearch.value = '';
        }
    },

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
        this.renderAttrTable(); this.renderTable(); this.saveToLocalStorage();
        setTimeout(() => { this.resizeCanvas(); this.updateDrawing(true); if (this.isMapMode && this.map) { this.map.invalidateSize(); this.updateMapDrawing(true); } }, 100);
        this.pushState(); this.showToast('データを読み込みました。');
    },
};


// --- src/main.js ---


window.L = L;





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
                    btnCopyClipboard: $id('btnCopyClipboard'), btnToggleMap: $id('btnToggleMap'), btnExportGeoJSON: $id('btnExportGeoJSON'), btnExportShapefile: $id('btnExportShapefile'),
                    btnExportHTML: $id('btnExportHTML'), btnProfile: $id('btnProfile'), chkAllProfile: $id('chkAllProfile'), btnSaveJSON: $id('btnSaveJSON'), inputFileJSON: $id('inputFileJSON'),
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
                    htmlExportOptions: $id('htmlExportOptions'), shpExportOptions: $id('shpExportOptions'), inputCustomScale: $id('inputCustomScale'), radioCustomScale: $id('radioCustomScale'),
                    importPreviewModal: $id('importPreviewModal'), importFileList: $id('importFileList'), inputImportSearch: $id('inputImportSearch'), importPreviewImage: $id('importPreviewImage'),
                    importNoPreviewText: $id('importNoPreviewText'), importPreviewInfo: $id('importPreviewInfo'), btnCancelImport: $id('btnCancelImport'),
                    btnApplyImport: $id('btnApplyImport'), confirmModal: $id('confirmModal'), confirmTitle: $id('confirmTitle'),
                    confirmMessage: $id('confirmMessage'), btnCancelConfirm: $id('btnCancelConfirm'), btnApplyConfirm: $id('btnApplyConfirm'),
                    textPromptModal: $id('textPromptModal'), inputTextPrompt: $id('inputTextPrompt'), inputTextColor: $id('inputTextColor'),
                    inputTextSize: $id('inputTextSize'), btnCancelTextPrompt: $id('btnCancelTextPrompt'), btnApplyTextPrompt: $id('btnApplyTextPrompt'),
                    attrTableBody: $id('attrTableBody'),
                    propertyPanel: $id('propertyPanel'), propColor: $id('propColor'), propLineWidth: $id('propLineWidth'),
                    propLineStyle: $id('propLineStyle'), propFontSize: $id('propFontSize'), rowLineWidth: $id('rowLineWidth'),
                    rowLineStyle: $id('rowLineStyle'), rowFontSize: $id('rowFontSize'), btnCloseProp: $id('btnCloseProp'), btnDeleteProp: $id('btnDeleteProp')
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
                if (this.els.btnExportShapefile) bindClick(this.els.btnExportShapefile, () => this.openExportModal('shapefile'));
                bindClick(this.els.btnExportHTML, () => {
                    const attrValues = this.state.attributes.map(a => a.value ? a.value.trim() : '').filter(v => v !== '');
                    const fileName = attrValues.length > 0 ? attrValues.join('_') : '令和8年度_育成複層林整備_山田太郎_No.10';
                    this.showHTMLPreview(fileName, 'A4', 'landscape', 'auto', 50);
                });
                if (this.els.btnProfile) {
                    bindClick(this.els.btnProfile, () => {
                        let tsv = '器械点\t視準点\t方位角\t高低角\t斜距離\n';
                        for (const row of this.state.tableData) {
                            if (row[0] && row[6] !== false && row[5] !== true) {
                                tsv += `${row[0]}\t${row[1] || ''}\t${row[2] || '0'}\t${row[3] || '0'}\t${row[4] || '0'}\n`;
                            }
                        }
                        localStorage.setItem('compassProfileData', tsv);
                        window.open('profile.html', '_blank');
                    });
                }
                if (this.els.chkAllProfile) {
                    this.els.chkAllProfile.addEventListener('change', (e) => {
                        const checked = e.target.checked;
                        this.state.tableData.forEach(row => { row[6] = checked; });
                        this.renderTable();
                        this.saveToLocalStorage();
                    });
                }
                
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
                            if (m.el === this.els.importPreviewModal) { this.importFilesList = []; this.els.inputFileJSON.value = ''; if (this.els.inputImportSearch) this.els.inputImportSearch.value = ''; }
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
                    else if (this.currentExportType === 'shapefile') {
                        const encEl = document.querySelector('input[name="shpEncoding"]:checked');
                        const encoding = encEl ? encEl.value : 'SJIS';
                        this.exportShapefile(fileName, encoding);
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

                bindClick(this.els.btnApplyImport, () => this.applySelectedImport());

                if (this.els.inputImportSearch) {
                    this.els.inputImportSearch.addEventListener('input', () => this.renderImportFileList());
                }

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
                this.els.canvas.addEventListener('mousedown', this.handleMouseDown, { passive: false });
                this.els.canvas.addEventListener('touchstart', this.handleMouseDown, { passive: false });
                window.addEventListener('mouseup', this.handleMouseUp, { capture: true });
                window.addEventListener('touchend', this.handleMouseUp, { capture: true });
                window.addEventListener('pointerup', this.handleMouseUp, { capture: true });
                window.addEventListener('pointercancel', this.handleMouseUp, { capture: true });
                window.addEventListener('mousemove', this.handleMouseMove, { passive: false, capture: true });
                window.addEventListener('touchmove', this.handleMouseMove, { passive: false, capture: true });
                window.addEventListener('pointermove', this.handleMouseMove, { passive: false, capture: true });
                
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
                    } else if (e.key === 'Backspace' || e.key === 'Delete') {
                        if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) return;
                        if (this.state.interactionMode === 'line' && this.state.currentLine.length > 0) {
                            this.state.currentLine.pop();
                            this._redrawAll();
                        } else if (this.state.selectedAnnotation) {
                            this.els.btnDeleteProp.click();
                        }
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
                bindClick(this.els.btnDeleteProp, () => {
                    const sel = this.state.selectedAnnotation;
                    if (sel) {
                        if (sel.type === 'text') this.state.annotations.texts.splice(sel.index, 1);
                        else if (sel.type === 'line') this.state.annotations.lines.splice(sel.index, 1);
                        this._clearSelection();
                        this.saveToLocalStorage();
                        this.pushState();
                        this._redrawAll();
                    }
                });
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
                            if (parsed.annotations) {
                                this.state.annotations = parsed.annotations;
                                if (this.state.annotations.texts) {
                                    this.state.annotations.texts = this.state.annotations.texts.filter(t => !isNaN(t.x) && !isNaN(t.y));
                                }
                                if (this.state.annotations.lines) {
                                    this.state.annotations.lines = this.state.annotations.lines.filter(l => l.points && l.points.every(p => !isNaN(p.x) && !isNaN(p.y)));
                                }
                            }
                            
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

            _updateLiveAnnotationDrawing() {
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
                        icon.options.html = `<div style="font-size:${newSize}px;color:${ref.color || '#000'};white-space:nowrap;transform:translate(-50%,-50%) rotate(${(ref.rotation||0)*180/Math.PI}deg);">${Utils.escapeHTML(ref.text || '')}</div>`;
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
                
                if (this.els.shpExportOptions) this.els.shpExportOptions.style.display = 'none';
                if (this.els.mdbExportOptions) this.els.mdbExportOptions.style.display = 'none';
                if (type === 'json') { 
                    this.els.exportModalTitle.textContent = 'データの保存 (JSON)'; 
                    this.els.exportExtension.textContent = '.json'; 
                    this.els.htmlExportOptions.style.display = 'none'; 
                    this.els.btnApplyExport.textContent = '保存';
                }
                else if (type === 'mdb') {
                    this.els.exportModalTitle.textContent = 'MDBデータベースに保存 (.mdb)';
                    this.els.exportExtension.textContent = '.mdb';
                    this.els.htmlExportOptions.style.display = 'none';
                    if (this.els.mdbExportOptions) this.els.mdbExportOptions.style.display = 'block';
                    this.els.btnApplyExport.textContent = '保存';
                    this.refreshMdbExportModalUI();
                }
                else if (type === 'geojson') { 
                    this.els.exportModalTitle.textContent = 'GeoJSON出力'; 
                    this.els.exportExtension.textContent = '.geojson'; 
                    this.els.htmlExportOptions.style.display = 'none'; 
                    this.els.btnApplyExport.textContent = '保存';
                }
                else if (type === 'shapefile') {
                    this.els.exportModalTitle.textContent = 'シェープファイル出力 (ZIP)';
                    this.els.exportExtension.textContent = '.zip';
                    this.els.htmlExportOptions.style.display = 'none';
                    if (this.els.shpExportOptions) this.els.shpExportOptions.style.display = 'block';
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
                this.els.tbody.appendChild(this.createRow(['', '', '', '', '', false, true], this.state.tableData.length));
                this.updateUniqueNames();
            }

            createRow(rowData, index) {
                const tr = document.createElement('tr'); tr.dataset.index = index;
                const ph = ['BP', '1', '45.30', '10.5', '12.34'];
                
                const isProfile = rowData[6] !== false;
                if (rowData.length < 7) rowData[6] = isProfile;
                
                const tdProfile = document.createElement('td');
                const chkProfile = document.createElement('input');
                chkProfile.type = 'checkbox'; chkProfile.checked = isProfile;
                chkProfile.title = '縦断図に含める';
                chkProfile.addEventListener('change', (e) => {
                    this.state.tableData[index][6] = e.target.checked;
                    this.saveToLocalStorage();
                });
                tdProfile.appendChild(chkProfile);
                tr.appendChild(tdProfile);

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
                btnIn.className = 'small'; btnIn.textContent = '＋'; btnIn.onclick = () => { this.state.tableData.splice(index + 1, 0, ['', '', '', '', '', false, true]); this.renderTable(); this.saveToLocalStorage(); this.pushState(); };
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
                    if (index >= this.state.tableData.length) { this.state.tableData.push(['', '', '', '', '', false, true]); this.els.tbody.appendChild(this.createRow(['', '', '', '', '', false, true], this.state.tableData.length)); }
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
                        const newRow = ['', '', '', '', '', false, true]; 
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
                    this.state.tableData.push(['', '', '', '', '', false, true]);
                    this.els.tbody.appendChild(this.createRow(['', '', '', '', '', false, true], this.state.tableData.length));
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

                const r = this.els.canvas.getBoundingClientRect(), mX = (e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX) - r.left, mY = (e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY) - r.top;
                
                const btn = e.button !== undefined ? e.button : 0;
                    if (btn === 2) {
                    this.state.view.isRightDragging = true; this.state.view.rightDragMoved = false;
                    this.state.view.dragStartX = this.state.view.lastMouseX = (e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX); this.state.view.dragStartY = this.state.view.lastMouseY = (e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY);
                    document.body.classList.add('right-dragging'); return; 
                }

                if (btn === 0) {
                    const target = this._findAnnotationAtCanvas(mX, mY);
                    if (target) {
                        if (target.type === 'handle') { 
                            this.state.view.isRotating = true; 
                            this.state.view.rotatingTarget = target.target; 
                            document.body.classList.add('left-dragging'); 
                            return; 
                        } else if (target.type === 'scaleHandle') {
                            this.state.view.isScaling = true;
                            this.state.view.scalingTarget = target;
                            this.state.view.scalingInitialState = JSON.parse(JSON.stringify(target.target.ref));
                            this.state.view.dragStartX = (e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX);
                            this.state.view.dragStartY = (e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY);
                            
                            // Center of the shape in screen pixels
                            let cx, cy;
                            if (target.target.type === 'text') {
                                cx = target.target.ref.x; cy = target.target.ref.y;
                            } else {
                                let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
                                target.target.ref.points.forEach(p => { if(p.x<minX)minX=p.x; if(p.x>maxX)maxX=p.x; if(p.y<minY)minY=p.y; if(p.y>maxY)maxY=p.y; });
                                cx = (minX + maxX)/2; cy = (minY + maxY)/2;
                            }
                            this.state.view.scaleCenterPx = { 
                                x: this.state.view.offsetX + cx * this.state.view.scale,
                                y: this.state.view.offsetY - cy * this.state.view.scale
                            };
                            document.body.classList.add('left-dragging');
                            return;
                        } else if (this.state.interactionMode === 'select') {
                            this._selectAnnotation(target);
                            this.state.view.isMovingAnnotation = true;
                            this.state.view.movingTarget = target;
                            this.state.view.dragMoved = false;
                            this.state.view.dragStartX = this.state.view.lastMouseX = (e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX); 
                            this.state.view.dragStartY = this.state.view.lastMouseY = (e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY);
                            
                            this.state.view.dragStartInternalX = (mX - this.state.view.offsetX) / this.state.view.scale;
                            this.state.view.dragStartInternalY = (this.state.view.offsetY - mY) / this.state.view.scale;
                            this.state.view.movingInitialState = JSON.parse(JSON.stringify(target.ref));
                            
                            document.body.classList.add('left-dragging');
                            return;
                        }
                    }
                    this.state.view.isDragging = true; this.state.view.dragMoved = false;
                    this.state.view.dragStartX = this.state.view.lastMouseX = (e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX); this.state.view.dragStartY = this.state.view.lastMouseY = (e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY);
                }
            };



            handleMouseUp = (e) => {
                const btn = e.button !== undefined ? e.button : 0;
                    if (btn === 2) {
                    this.state.view.isRightDragging = false; if (this.state.mapView) this.state.mapView.isRightDragging = false;
                    document.body.classList.remove('right-dragging');
                }
                if (btn === 0) {
                    if (this.state.view.isRotating) { 
                        this.state.view.isRotating = false; 
                        this._lastAnnotationInteraction = Date.now();
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
                    if (this.state.view.isScaling) {
                        this.state.view.isScaling = false;
                        this._lastAnnotationInteraction = Date.now();
                        this.state.view.scalingTarget = null;
                        this.state.view.scalingInitialState = null;
                        document.body.classList.remove('left-dragging');
                        if (this.isMapMode && this.map) this.map.dragging.enable();
                        
                        if (this.state.view.dragMoved) {
                            this.saveToLocalStorage();
                            this.pushState();
                            this._updateLiveAnnotationDrawing();
                        }
                        return;
                    }
                    if (this.state.view.isMovingAnnotation) {
                        this.state.view.isMovingAnnotation = false;
                        this._lastAnnotationInteraction = Date.now();
                        this.state.view.movingTarget = null;
                        this.state.view.movingLayer = null;
                        this.state.view.movingExtras = null;
                        document.body.classList.remove('left-dragging');
                        if (this.isMapMode && this.map) this.map.dragging.enable();

                        if (this.state.view.dragMoved) {
                            this.saveToLocalStorage();
                            this.pushState();
                            this._updateLiveAnnotationDrawing(); 
                        }
                        return;
                    }
                    if (this.state.view.isDragging) {
                        this.state.view.isDragging = false; document.body.classList.remove('left-dragging');
                        if (!this.state.view.dragMoved) {
                            const r = this.els.canvas.getBoundingClientRect(), mx = (e.changedTouches && e.changedTouches.length > 0 ? e.changedTouches[0].clientX : e.clientX) - r.left, my = (e.changedTouches && e.changedTouches.length > 0 ? e.changedTouches[0].clientY : e.clientY) - r.top;
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
                if (e.cancelable && (this.state.view.isMovingAnnotation || this.state.view.isScaling || this.state.view.isRotating || (this.isMapMode && this.state.mapView.isRightDragging) || (!this.isMapMode && this.state.view.isRightDragging))) { e.preventDefault(); }
                const clientX = e.touches && e.touches.length > 0 ? e.touches[0].clientX : (e.changedTouches && e.changedTouches.length > 0 ? e.changedTouches[0].clientX : e.clientX);
                const clientY = e.touches && e.touches.length > 0 ? e.touches[0].clientY : (e.changedTouches && e.changedTouches.length > 0 ? e.changedTouches[0].clientY : e.clientY);
                if (this.isMapMode && this.state.mapView.isRightDragging) {
                    const dx = clientX - this.state.mapView.lastMouseX, dy = clientY - this.state.mapView.lastMouseY;
                    if (!this.state.mapView.rightDragMoved && (Math.abs(clientX - this.state.mapView.dragStartX) > 5 || Math.abs(clientY - this.state.mapView.dragStartY) > 5)) this.state.mapView.rightDragMoved = true;
                    if (this.state.mapView.rightDragMoved) this.map.panBy([-dx, -dy], {animate: false});
                    this.state.mapView.lastMouseX = clientX; this.state.mapView.lastMouseY = clientY;
                    return;
                }

                // 1. 【共通化】現在のマウス位置から「内部座標」を計算する
                let currentInternalX, currentInternalY, mX, mY;
                if (this.isMapMode) {
                    const rect = this.els.mapContainer.getBoundingClientRect();
                    mX = clientX - rect.left;
                    mY = clientY - rect.top;
                    const point = L.point(mX, mY);
                    const latlng = this.map.containerPointToLatLng(point);
                    const im = this.getInternalCoordsFromLatLng(latlng.lat, latlng.lng);
                    currentInternalX = im.x;
                    currentInternalY = im.y;
                } else {
                    const r = this.els.canvas.getBoundingClientRect();
                    mX = clientX - r.left; 
                    mY = clientY - r.top;
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
                    
                    ref.rotation = Math.atan2(clientY - cPy, clientX - cPx) + Math.PI / 2;
                    ref.baseRotation = ref.rotation + Utils.deg2rad(currentDec);

                    this._updateLiveAnnotationDrawing();
                    
                    this.state.view.lastMouseX = clientX;
                    this.state.view.lastMouseY = clientY;
                    return;
                }

                // 2.5 スケール処理(isScaling)
                if (this.state.view.isScaling && this.state.view.scalingTarget && this.state.view.scalingInitialState) {
                    const dx = clientX - this.state.view.dragStartX;
                    const dy = clientY - this.state.view.dragStartY;
                    if (!this.state.view.dragMoved && (Math.abs(dx) > 2 || Math.abs(dy) > 2)) {
                        this.state.view.dragMoved = true;
                    }
                    
                    if (this.state.view.dragMoved) {
                        const target = this.state.view.scalingTarget;
                        const initRef = this.state.view.scalingInitialState;
                        const ref = (target.target ? target.target.ref : target.ref);
                        const type = (target.target ? target.target.type : target.type);
                        const corner = target.corner;
                        const maintainRatio = e.shiftKey;
                        
                        const cPx = this.state.view.scaleCenterPx.x;
                        const cPy = this.state.view.scaleCenterPx.y;
                        
                        const currentDistX = clientX - cPx;
                        const currentDistY = clientY - cPy;
                        const startDistX = this.state.view.dragStartX - cPx;
                        const startDistY = this.state.view.dragStartY - cPy;
                        
                        let scaleX = startDistX !== 0 ? Math.abs(currentDistX / startDistX) : 1;
                        let scaleY = startDistY !== 0 ? Math.abs(currentDistY / startDistY) : 1;
                        
                        if (maintainRatio) {
                            const scale = Math.max(scaleX, scaleY);
                            scaleX = scale;
                            scaleY = scale;
                        }
                        
                        if (type === 'text') {
                            const baseSize = initRef.fontSize || 14;
                            ref.fontSize = Math.max(4, baseSize * scaleY);
                        } else if (type === 'line') {
                            let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
                            initRef.points.forEach(p => { if(p.x<minX)minX=p.x; if(p.x>maxX)maxX=p.x; if(p.y<minY)minY=p.y; if(p.y>maxY)maxY=p.y; });
                            const cx = (minX + maxX)/2; const cy = (minY + maxY)/2;
                            
                            ref.points.forEach((p, i) => {
                                p.x = cx + (initRef.points[i].x - cx) * scaleX;
                                p.y = cy + (initRef.points[i].y - cy) * scaleY;
                                
                                const currentDec = this.els.chkMagDeclination.checked ? (parseFloat(this.els.inputDeclination.value) || 0) : 0;
                                const rad = Utils.deg2rad(currentDec);
                                const cos = Math.cos(-rad);
                                const sin = Math.sin(-rad);
                                p.baseX = p.x * cos - p.y * sin;
                                p.baseY = p.x * sin + p.y * cos;
                            });
                        }
                        
                        this._updateLiveAnnotationDrawing();
                    }
                    return;
                }

                // 3. 移動処理 (isMovingAnnotation)
                if (this.state.view.isMovingAnnotation && this.state.view.movingTarget && this.state.view.movingInitialState) {
                    const dx = clientX - this.state.view.dragStartX;
                    const dy = clientY - this.state.view.dragStartY;
                    
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

                    this.state.view.lastMouseX = clientX;
                    this.state.view.lastMouseY = clientY;
                    return;
                }

                // 4. キャンバスパン移動処理
                if (this.state.view.isRightDragging || this.state.view.isDragging) {
                    const isRight = this.state.view.isRightDragging;
                    const dx = clientX - this.state.view.lastMouseX, dy = clientY - this.state.view.lastMouseY;
                    const dragMovedKey = isRight ? 'rightDragMoved' : 'dragMoved';
                    if (!this.state.view[dragMovedKey] && (Math.abs(clientX - this.state.view.dragStartX) > 5 || Math.abs(clientY - this.state.view.dragStartY) > 5)) {
                        this.state.view[dragMovedKey] = true; if (!isRight) document.body.classList.add('left-dragging');
                    }
                    if (this.state.view[dragMovedKey]) { this.state.view.offsetX += dx; this.state.view.offsetY += dy; this.draw(); }
                    this.state.view.lastMouseX = clientX; this.state.view.lastMouseY = clientY;
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
                            hit = true; this.els.tooltip.style.opacity = 1; this.els.tooltip.style.left = `${clientX + 15}px`; this.els.tooltip.style.top = `${clientY + 15}px`;
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
                if (!e.dataTransfer) return; const targetFiles = [], items = e.dataTransfer.items;
                if (items) { const ps = []; for(let i=0; i<items.length; i++) { const it = items[i].webkitGetAsEntry(); if (it) ps.push(this.traverseFileTree(it, targetFiles)); } await Promise.all(ps); } 
                else if (e.dataTransfer.files) Array.from(e.dataTransfer.files).forEach(f => { if (/\.(json|mdb)$/i.test(f.name)) targetFiles.push(f); });
                this.processJsonFiles(targetFiles);
            }

            async traverseFileTree(item, fileList) {
                if (item.isFile) return new Promise(res => item.file(f => { if (/\.(json|mdb)$/i.test(f.name)) fileList.push(f); res(); }));
                else if (item.isDirectory) {
                    const reader = item.createReader();
                    const entries = await (async () => { let all = [], ents; do { ents = await new Promise(r => reader.readEntries(r)); all = all.concat(ents); } while (ents.length > 0); return all; })();
                    await Promise.all(entries.map(e => this.traverseFileTree(e, fileList)));
                }
            }

            async processJsonFiles(targetFiles) {
                if (targetFiles.length === 0) { this.showToast('読み込めるファイル（.json / .mdb）が見つかりませんでした。'); if (this.els.inputFileJSON) this.els.inputFileJSON.value = ''; return; }
                this.importFilesList = []; this.selectedImportIndex = -1; this.els.importFileList.innerHTML = '';
                if (this.els.inputImportSearch) this.els.inputImportSearch.value = '';
                this.els.importPreviewImage.style.display = 'none'; this.els.importNoPreviewText.style.display = 'inline-block';
                this.els.importPreviewInfo.innerHTML = ''; this.els.btnApplyImport.disabled = true;
                this.els.importPreviewModal.style.display = 'flex'; this.els.importNoPreviewText.textContent = '読み込み中...';

                const nestedResults = await Promise.all(targetFiles.map(file => new Promise(res => {
                    const isMdb = /\.mdb$/i.test(file.name);
                    const r = new FileReader();
                    if (isMdb) {
                        r.onload = e => {
                            try {
                                const mdbBuffer = new Uint8Array(e.target.result);
                                const mdbItems = parseCompassMdb(mdbBuffer, file.name);
                                if (!this.activeMdbBuffer) {
                                    this.activeMdbBuffer = mdbBuffer;
                                    this.activeMdbFileName = file.name;
                                }
                                res(mdbItems.map(item => ({ ...item, file, isMdb: true, mdbBuffer })));
                            } catch (err) {
                                console.warn('MDB parse error:', err);
                                res([]);
                            }
                        };
                        r.onerror = () => res([]);
                        r.readAsArrayBuffer(file);
                    } else {
                        r.onload = e => {
                            try {
                                const s = JSON.parse(e.target.result);
                                res((s && Array.isArray(s.tableData)) ? [{ file, name: file.name, data: s, isMdb: false }] : []);
                            } catch (err) {
                                res([]);
                            }
                        };
                        r.onerror = () => res([]);
                        r.readAsText(file);
                    }
                })));

                const jsonItems = [];
                const mdbItems = [];
                nestedResults.flat().forEach(item => {
                    if (!item) return;
                    if (item.isMdb) mdbItems.push(item);
                    else jsonItems.push(item);
                });
                jsonItems.sort((a, b) => a.name.localeCompare(b.name));
                this.importFilesList = [...mdbItems, ...jsonItems];

                if (this.importFilesList.length === 0) { this.els.importNoPreviewText.textContent = '有効な測量データが見つかりませんでした。'; return; }
                this.renderImportFileList(); this.selectImportFile(0);
            }






        }
        window.onload = () => { window.app = new CompassSurveyApp(); };
Object.assign(CompassSurveyApp.prototype, surveyMath);
Object.assign(CompassSurveyApp.prototype, drawing);
Object.assign(CompassSurveyApp.prototype, mapView);
Object.assign(CompassSurveyApp.prototype, exportUtils);
if ('serviceWorker' in navigator) {
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) { refreshing = true; window.location.reload(); }
    });
}

