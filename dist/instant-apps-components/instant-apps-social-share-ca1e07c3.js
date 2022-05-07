import { f as getAssetPath, r as registerInstance, h as h$t, e as Host, g as getElement } from './index-d3b0f395.js';

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
const n$u=null;function r$z(n){return null!=n}function t$y(n){return null==n}function u$I(n){return void 0===n}function o$N(t,u){return r$z(t)?u(t):n$u}function e$D(n){return n}function f$z(n,r){if(t$y(n))throw new Error(r);return n}function c$H(n,t){return r$z(n)?n:"function"==typeof t?t():t}function i$H(n,t){return r$z(n)?n:t}function l$y(n){return r$z(n)&&n.destroy(),null}function s$N(n){return r$z(n)&&n.dispose(),null}function a$y(n){return r$z(n)&&n.remove(),null}function h$s(n){return r$z(n)&&n.abort(),null}function p$q(n){return r$z(n)&&n.release(),null}function w$h(n,t){return r$z(n)&&r$z(t)?n.equals(t):n===t}function y$q(n){return null}function d$u(n,t){const u=new Array;return n.forEach((n=>{const o=t(n);r$z(o)&&u.push(o);})),u}function v$i(n,r){const t=new Array;for(const u of n)t.push(E$c(u,null,r));return t}function A$i(n,r){for(const t of n)o$N(t,r);}function E$c(n,t,u){return r$z(n)?u(n):t}function b$f(n,t){for(const u of n){const n=t(u);if(r$z(n))return n}return null}function g$p(n){return n.filter((n=>r$z(n)))}function m$t(n,...r){let t=n;for(let u=0;u<r.length&&t;++u)t=t[r[u]];return t}function q$9(n){return n}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
class t$x{constructor(t=1){this._seed=t;}set seed(e){this._seed=null==e?Math.random()*t$x._m:e;}getInt(){return this._seed=(t$x._a*this._seed+t$x._c)%t$x._m,this._seed}getFloat(){return this.getInt()/(t$x._m-1)}getIntRange(t,e){return Math.round(this.getFloatRange(t,e))}getFloatRange(e,s){const n=s-e;return e+this.getInt()/t$x._m*n}}t$x._m=2147483647,t$x._a=48271,t$x._c=0;

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
function r$y(n){if(!n)return;return n.length>0?n[0]:void 0}function e$C(n){if(!n)return;const t=n.length;return t>0?n[t-1]:void 0}function o$M(n){return n}function f$y(n,t=o$M){if(!n||0===n.length)return;let r=n[0],e=t(r);for(let o=1;o<n.length;++o){const f=n[o],u=Number(t(f));u>e&&(e=u,r=f);}return r}function u$H(n,t=o$M){return f$y(n,(n=>-t(n)))}function i$G(n,t){return t?n.filter(((n,r,e)=>e.findIndex(t.bind(null,n))===r)):n.filter(((n,t,r)=>r.indexOf(n)===t))}function l$x(t,r,e){if(t$y(t)&&t$y(r))return !0;if(t$y(t)||t$y(r)||t.length!==r.length)return !1;if(e){for(let n=0;n<t.length;n++)if(!e(t[n],r[n]))return !1}else for(let n=0;n<t.length;n++)if(t[n]!==r[n])return !1;return !0}function c$G(n,t,r){let e,o;return r?(e=t.filter((t=>!n.some((n=>r(n,t))))),o=n.filter((n=>!t.some((t=>r(t,n)))))):(e=t.filter((t=>!n.includes(t))),o=n.filter((n=>!t.includes(n)))),{added:e,removed:o}}function s$M(n,t,r){return n&&t?r?n.filter((function(n){return t.findIndex((function(t){return r(n,t)}))>-1})):n.filter((function(n){return t.indexOf(n)>-1})):[]}function a$x(n){return n&&"number"==typeof n.length}function h$r(n,t){const r=n.length;if(0===r)return [];const e=[];for(let o=0;o<r;o+=t)e.push(n.slice(o,o+t));return e}const d$t=!!Array.prototype.fill;function g$o(n,t){if(d$t)return new Array(n).fill(t);const r=new Array(n);for(let e=0;e<n;e++)r[e]=t;return r}function m$s(n,t){void 0===t&&(t=n,n=0);const r=new Array(t-n);for(let e=n;e<t;e++)r[e-n]=e;return r}function p$p(n,t,r){const e=n.length;let o=0,f=e-1;for(;o<f;){const r=o+Math.floor((f-o)/2);t>n[r]?o=r+1:f=r;}const u=n[o];return r?t>=n[e-1]?-1:u===t?o:o-1:u===t?o:-1}function x$g(n,t,r){if(!n||0===n.length)return;const e=n.length-1,o=n[0];if(t<=r(o))return o;const f=n[e];if(t>=r(f))return f;let u=0,i=0,l=e;for(;u<l;){i=u+Math.floor((l-u)/2);const o=n[i],f=r(o);if(f===t)return o;if(t<f){if(i>0){const e=n[i-1],u=r(e);if(t>u)return t-u>=f-t?o:e}l=i;}else {if(i<e){const e=n[i+1],u=r(e);if(t<u)return t-f>=u-t?e:o}u=i+1;}}return n[i]}function M$e(n){return n.reduce(((n,t)=>n.concat(t||[])),[])}class w$g{constructor(){this.last=0;}}const y$p=new w$g;function b$e(n,t,r,e){e=e||y$p;const o=Math.max(0,e.last-10);for(let u=o;u<r;++u)if(n[u]===t)return e.last=u,u;const f=Math.min(o,r);for(let u=0;u<f;++u)if(n[u]===t)return e.last=u,u;return -1}function v$h(n,t,r,e){const o=null==r?n.length:r,f=b$e(n,t,o,e);if(-1!==f)return n[f]=n[o-1],null==r&&n.pop(),t}const A$h=new Set;function O$a(n,t,r=n.length,e=t.length,o,f){if(0===e||0===r)return r;A$h.clear();for(let i=0;i<e;++i)A$h.add(t[i]);o=o||y$p;const u=Math.max(0,o.last-10);for(let i=u;i<r;++i)if(A$h.has(n[i])&&(f&&f.push(n[i]),A$h.delete(n[i]),n[i]=n[r-1],--r,--i,0===A$h.size||0===r))return A$h.clear(),r;for(let i=0;i<u;++i)if(A$h.has(n[i])&&(f&&f.push(n[i]),A$h.delete(n[i]),n[i]=n[r-1],--r,--i,0===A$h.size||0===r))return A$h.clear(),r;return A$h.clear(),r}function j$i(n,t,r){const e=n.length;if(t>=e)return n.slice(0);const o=z$a(r),f=new Set,u=[];for(;u.length<t;){const t=Math.floor(o()*e);f.has(t)||(f.add(t),u.push(n[t]));}return u}function z$a(n){return n?(S$b.seed=n,()=>S$b.getFloat()):Math.random}function I$c(n,t){const r=z$a(t);for(let e=n.length-1;e>0;e--){const t=Math.floor(r()*(e+1)),o=n[e];n[e]=n[t],n[t]=o;}return n}const S$b=new t$x;function C$a(n,t){const r=n.indexOf(t);return -1!==r?(n.splice(r,1),t):null}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
var e$B,a$w;let o$L;var d$s,i$F;null!=(e$B=globalThis.dojoConfig)&&e$B.has||null!=(a$w=globalThis.esriConfig)&&a$w.has?o$L={...null==(d$s=globalThis.dojoConfig)?void 0:d$s.has,...null==(i$F=globalThis.esriConfig)?void 0:i$F.has}:o$L={};function r$x(e){return "function"==typeof o$L[e]?o$L[e]=o$L[e](globalThis):o$L[e]}r$x.add=(e,a,d,i)=>((i||void 0===o$L[e])&&(o$L[e]=a),d&&r$x(e)),r$x.cache=o$L,r$x.add("esri-deprecation-warnings",!0),(()=>{var e;r$x.add("host-webworker",void 0!==globalThis.WorkerGlobalScope&&self instanceof globalThis.WorkerGlobalScope);const a="undefined"!=typeof window&&"undefined"!=typeof location&&"undefined"!=typeof document&&window.location===location&&window.document===document;if(r$x.add("host-browser",a),r$x.add("host-node","object"==typeof globalThis.process&&(null==(e=globalThis.process.versions)?void 0:e.node)&&globalThis.process.versions.v8),r$x.add("dom",a),r$x("host-browser")){const e=navigator,a=e.userAgent,o=e.appVersion,d=parseFloat(o);if(r$x.add("wp",parseFloat(a.split("Windows Phone")[1])||void 0),r$x.add("msapp",parseFloat(a.split("MSAppHost/")[1])||void 0),r$x.add("khtml",o.includes("Konqueror")?d:void 0),r$x.add("edge",parseFloat(a.split("Edge/")[1])||void 0),r$x.add("opr",parseFloat(a.split("OPR/")[1])||void 0),r$x.add("webkit",!r$x("wp")&&!r$x("edge")&&parseFloat(a.split("WebKit/")[1])||void 0),r$x.add("chrome",!r$x("edge")&&!r$x("opr")&&parseFloat(a.split("Chrome/")[1])||void 0),r$x.add("android",!r$x("wp")&&parseFloat(a.split("Android ")[1])||void 0),r$x.add("safari",!o.includes("Safari")||r$x("wp")||r$x("chrome")||r$x("android")||r$x("edge")||r$x("opr")?void 0:parseFloat(o.split("Version/")[1])),r$x.add("mac",o.includes("Macintosh")),!r$x("wp")&&a.match(/(iPhone|iPod|iPad)/)){const e=RegExp.$1.replace(/P/,"p"),o=a.match(/OS ([\d_]+)/)?RegExp.$1:"1",d=parseFloat(o.replace(/_/,".").replace(/_/g,""));r$x.add(e,d),r$x.add("ios",d);}r$x.add("trident",parseFloat(o.split("Trident/")[1])||void 0),r$x("webkit")||(!a.includes("Gecko")||r$x("wp")||r$x("khtml")||r$x("trident")||r$x("edge")||r$x.add("mozilla",d),r$x("mozilla")&&r$x.add("ff",parseFloat(a.split("Firefox/")[1]||a.split("Minefield/")[1])||void 0));}})(),(()=>{if(globalThis.navigator){const e=navigator.userAgent,a=/Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile/i.test(e),o=/iPhone/i.test(e);a&&r$x.add("esri-mobile",a),o&&r$x.add("esri-iPhone",o),r$x.add("esri-geolocation",!!navigator.geolocation);}r$x.add("esri-canvas-svg-support",!r$x("trident")),r$x.add("esri-wasm","WebAssembly"in globalThis),r$x.add("esri-shared-array-buffer",(()=>{const e="SharedArrayBuffer"in globalThis,a=!1===globalThis.crossOriginIsolated;return e&&!a})),r$x.add("esri-atomics","Atomics"in globalThis),r$x.add("esri-workers","Worker"in globalThis),r$x.add("web-feat:cache","caches"in globalThis),r$x.add("esri-workers-arraybuffer-transfer",!r$x("safari")||Number(r$x("safari"))>=12),r$x.add("featurelayer-simplify-thresholds",[.5,.5,.5,.5]),r$x.add("featurelayer-simplify-payload-size-factors",[1,1,4]),r$x.add("featurelayer-snapshot-enabled",!0),r$x.add("featurelayer-snapshot-point-min-threshold",8e4),r$x.add("featurelayer-snapshot-point-max-threshold",4e5),r$x.add("featurelayer-snapshot-point-coverage",.1),r$x.add("featurelayer-advanced-symbols",!1),r$x.add("featurelayer-pbf",!0),r$x.add("featurelayer-pbf-statistics",!1),r$x.add("feature-layers-workers",!0),r$x.add("feature-polyline-generalization-factor",1),r$x.add("mapview-transitions-duration",200),r$x.add("mapview-srswitch-adjust-rotation-scale-threshold",24e6),r$x.add("mapserver-pbf-enabled",!1),r$x("host-webworker")||r$x("host-browser")&&(r$x.add("esri-csp-restrictions",(()=>{try{new Function;}catch{return !0}return !1})),r$x.add("esri-image-decode",(()=>{if("decode"in new Image){const e=new Image;return e.src='data:image/svg+xml;charset=UTF-8,<svg version="1.1" xmlns="http://www.w3.org/2000/svg"></svg>',void e.decode().then((()=>{r$x.add("esri-image-decode",!0,!0,!0);})).catch((()=>{r$x.add("esri-image-decode",!1,!0,!0);}))}return !1})),r$x.add("esri-url-encodes-apostrophe",(()=>{const e=window.document.createElement("a");return e.href="?'",e.href.includes("?%27")})));})();

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
function n$t(r,n){if(r.forEach)r.forEach(n);else for(let t=0;t<r.length;t++)n(r[t],t,r);}function t$w(r,n,t){if(r.slice)return r.slice(n,t);void 0===n?n=0:(n<0&&(n+=r.length),n=Math.min(r.length,Math.max(0,n))),void 0===t?t=r.length:(t<0&&(t+=r.length),t=Math.min(r.length,Math.max(0,t)));const o=Math.max(0,t-n),c=new(0,r.constructor)(o);for(let e=0;e<o;e++)c[e]=r[n+e];return c}function o$K(r){return r instanceof ArrayBuffer||r&&r.constructor&&"ArrayBuffer"===r.constructor.name}function c$F(r){return r instanceof Int8Array||r&&r.constructor&&"Int8Array"===r.constructor.name}function e$A(r){return r instanceof Uint8Array||r&&r.constructor&&"Uint8Array"===r.constructor.name}function a$v(r){return r instanceof Uint8ClampedArray||r&&r.constructor&&"Uint8ClampedArray"===r.constructor.name}function u$G(r){return r instanceof Int16Array||r&&r.constructor&&"Int16Array"===r.constructor.name}function i$E(r){return r instanceof Uint16Array||r&&r.constructor&&"Uint16Array"===r.constructor.name}function f$x(r){return r instanceof Int32Array||r&&r.constructor&&"Int32Array"===r.constructor.name}function s$L(r){return r instanceof Uint32Array||r&&r.constructor&&"Uint32Array"===r.constructor.name}function y$o(r){return r instanceof Float32Array||r&&r.constructor&&"Float32Array"===r.constructor.name}function A$g(r){return r instanceof Float64Array||r&&r.constructor&&"Float64Array"===r.constructor.name}function l$w(r){const n=new Array(r.length);for(let t=0;t<r.length;t++)n[t]=r[t];return n}function m$r(n){return t$y(n)?0:128+n.buffer.byteLength+64}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
function y$n(t,n){let e;if(n)for(e in t)t.hasOwnProperty(e)&&(void 0===t[e]?delete t[e]:t[e]instanceof Object&&y$n(t[e],!0));else for(e in t)t.hasOwnProperty(e)&&void 0===t[e]&&delete t[e];return t}function m$q(t){if(!t||"object"!=typeof t||"function"==typeof t)return t;const n=h$q(t);if(r$z(n))return n;if(b$d(t))return t.clone();if(j$h(t))return t.map(m$q);if(O$9(t))return t.clone();const r={};for(const e of Object.getOwnPropertyNames(t))r[e]=m$q(t[e]);return r}function g$n(t){if(!t||"object"!=typeof t||"function"==typeof t)return t;const n=h$q(t);if(r$z(n))return n;if(j$h(t)){let n=!0;const e=t.map((t=>{const e=g$n(t);return null!=t&&null==e&&(n=!1),e}));return n?e:null}if(b$d(t))return t.clone();if(!O$9(t)){const n=new(0,Object.getPrototypeOf(t).constructor);for(const e of Object.getOwnPropertyNames(t)){const r=t[e],o=g$n(r);if(null!=r&&null==o)return null;n[e]=o;}return n}return null}function b$d(t){return "function"==typeof t.clone}function j$h(t){return "function"==typeof t.map&&"function"==typeof t.forEach}function O$9(t){return "function"==typeof t.notifyChange&&"function"==typeof t.watch}function h$q(t){if(c$F(t)||e$A(t)||a$v(t)||u$G(t)||i$E(t)||f$x(t)||s$L(t)||y$o(t)||A$g(t))return t$w(t);if(t instanceof Date)return new Date(t.getTime());if(t instanceof ArrayBuffer){return t.slice(0,t.byteLength)}if(t instanceof Map){const n=new Map;return t.forEach(((t,e)=>{n.set(e,m$q(t));})),n}if(t instanceof Set){const n=new Set;return t.forEach((t=>{n.add(m$q(t));})),n}return null}function w$f(t,n){return t===n||"number"==typeof t&&isNaN(t)&&"number"==typeof n&&isNaN(n)||"function"==typeof(t||{}).getTime&&"function"==typeof(n||{}).getTime&&t.getTime()===n.getTime()||!1}function d$r(n,e){return n===e||(null==n||"string"==typeof n?n===e:"number"==typeof n?n===e||"number"==typeof e&&isNaN(n)&&isNaN(e):n instanceof Date?e instanceof Date&&n.getTime()===e.getTime():Array.isArray(n)?Array.isArray(e)&&l$x(n,e):n instanceof Set?e instanceof Set&&T$c(n,e):n instanceof Map?e instanceof Map&&A$f(n,e):"object"==typeof n&&("object"==typeof e&&N$9(n,e)))}function N$9(t,n){if(null===t||null===n)return !1;const e=Object.keys(t),r=e.length;if(null===n||Object.keys(n).length!==r)return !1;for(const o of e)if(t[o]!==n[o]||!Object.prototype.hasOwnProperty.call(n,o))return !1;return !0}function T$c(t,n){if(t.size!==n.size)return !1;for(const e of t)if(!n.has(e))return !1;return !0}function A$f(t,n){if(t.size!==n.size)return !1;for(const[e,r]of t){const t=n.get(e);if(t!==r||void 0===t&&!n.has(e))return !1}return !0}const P$a=function(t={},...e){return r$x("esri-deprecation-warnings")&&console.warn("[esri.core.lang] 🛑 DEPRECATED - Function: mixin()\n\t🛠️ Replacement: Use Object.assign() directly\n\t⚙️ Version: 4.19"),Object.assign(t,...e)};

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
function n$s(r,n,t=!1){return e$z(r,n,t)}function t$v(r,n){if(null!=n)return n[r]||i$D(r.split("."),!1,n)}function o$J(r,n,t){const o=r.split("."),e=o.pop(),u=i$D(o,!0,t);u&&e&&(u[e]=n);}function i$D(r,n,t){let o=t;for(const i of r){if(null==o)return;if(!(i in o)){if(!n)return;o[i]={};}o=o[i];}return o}function e$z(n,t,o){return t?Object.keys(t).reduce((function(n,i){let u=n[i],c=t[i];return u===c?n:void 0===u?(n[i]=m$q(c),n):(Array.isArray(c)||Array.isArray(n)?(u=u?Array.isArray(u)?n[i]=u.concat():n[i]=[u]:n[i]=[],c&&(Array.isArray(c)||(c=[c]),o?c.forEach((r=>{-1===u.indexOf(r)&&u.push(r);})):n[i]=c.concat())):c&&"object"==typeof c?n[i]=e$z(u,c,o):n.hasOwnProperty(i)&&!t.hasOwnProperty(i)||(n[i]=c),n)}),n||{}):n}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
class s$K{constructor(s,o={ignoreUnknown:!1,useNumericKeys:!1}){this.jsonToAPI=s,this.options=o,this.apiValues=[],this.jsonValues=[],this.apiToJSON=this._invertMap(s),this.apiValues=this._getKeysSorted(this.apiToJSON),this.jsonValues=this._getKeysSorted(this.jsonToAPI),this.read=t=>this.fromJSON(t),this.write=(s,o,i)=>{const n=this.toJSON(s);void 0!==n&&o$J(i,n,o);},this.write.isJSONMapWriter=!0;}toJSON(t){if(this.apiToJSON.hasOwnProperty(t)){const s=this.apiToJSON[t];return this.options.useNumericKeys?+s:s}return this.options.ignoreUnknown?void 0:t}fromJSON(t){return this.jsonToAPI.hasOwnProperty(t)?this.jsonToAPI[t]:this.options.ignoreUnknown?void 0:t}_invertMap(t){const s={};for(const o in t)s[t[o]]=o;return s}_getKeysSorted(t){const s=[];for(const o in t)s.push(o);return s.sort(),s}}function o$I(){return function(t,o){return new s$K(t,{ignoreUnknown:!0,...o})}}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
var n$r,l$v,o$H;let e$y,i$C;const t$u=null!=(n$r=null==(l$v=globalThis.esriConfig)?void 0:l$v.locale)?n$r:null==(o$H=globalThis.dojoConfig)?void 0:o$H.locale;function u$F(){var n,l;return null!=(n=null!=t$u?t$u:null==(l=globalThis.navigator)?void 0:l.language)?n:"en"}function a$u(){return void 0===i$C&&(i$C=u$F()),i$C}function r$w(n){e$y=n||void 0,b$c();}function c$E(n=a$u()){const l=/^([a-zA-Z]{2,3})(?:[_\-]\w+)*$/.exec(n);return null==l?void 0:l[1].toLowerCase()}const s$J={he:!0,ar:!0};function v$g(n=a$u()){const l=c$E(n);return void 0!==l&&(s$J[l]||!1)}const d$q=[];function f$w(n){return d$q.push(n),{remove(){d$q.splice(d$q.indexOf(n),1);}}}const g$m=[];function h$p(n){return g$m.push(n),{remove(){d$q.splice(g$m.indexOf(n),1);}}}function b$c(){var n;const l=null!=(n=e$y)?n:u$F();i$C!==l&&(i$C=l,[...g$m].forEach((n=>{n.call(null,l);})),[...d$q].forEach((n=>{n.call(null,l);})));}null==globalThis.addEventListener||globalThis.addEventListener("languagechange",b$c);

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
const r$v={year:"numeric",month:"numeric",day:"numeric"},n$q={year:"numeric",month:"long",day:"numeric"},a$t={year:"numeric",month:"short",day:"numeric"},h$o={year:"numeric",month:"long",weekday:"long",day:"numeric"},m$p={hour:"numeric",minute:"numeric"},i$B={...m$p,second:"numeric"},s$I={"short-date":r$v,"short-date-short-time":{...r$v,...m$p},"short-date-short-time-24":{...r$v,...m$p,hour12:!1},"short-date-long-time":{...r$v,...i$B},"short-date-long-time-24":{...r$v,...i$B,hour12:!1},"short-date-le":r$v,"short-date-le-short-time":{...r$v,...m$p},"short-date-le-short-time-24":{...r$v,...m$p,hour12:!1},"short-date-le-long-time":{...r$v,...i$B},"short-date-le-long-time-24":{...r$v,...i$B,hour12:!1},"long-month-day-year":n$q,"long-month-day-year-short-time":{...n$q,...m$p},"long-month-day-year-short-time-24":{...n$q,...m$p,hour12:!1},"long-month-day-year-long-time":{...n$q,...i$B},"long-month-day-year-long-time-24":{...n$q,...i$B,hour12:!1},"day-short-month-year":a$t,"day-short-month-year-short-time":{...a$t,...m$p},"day-short-month-year-short-time-24":{...a$t,...m$p,hour12:!1},"day-short-month-year-long-time":{...a$t,...i$B},"day-short-month-year-long-time-24":{...a$t,...i$B,hour12:!1},"long-date":h$o,"long-date-short-time":{...h$o,...m$p},"long-date-short-time-24":{...h$o,...m$p,hour12:!1},"long-date-long-time":{...h$o,...i$B},"long-date-long-time-24":{...h$o,...i$B,hour12:!1},"long-month-year":{month:"long",year:"numeric"},"short-month-year":{month:"short",year:"numeric"},year:{year:"numeric"},"short-time":m$p,"long-time":i$B},l$u=o$I()({shortDate:"short-date",shortDateShortTime:"short-date-short-time",shortDateShortTime24:"short-date-short-time-24",shortDateLongTime:"short-date-long-time",shortDateLongTime24:"short-date-long-time-24",shortDateLE:"short-date-le",shortDateLEShortTime:"short-date-le-short-time",shortDateLEShortTime24:"short-date-le-short-time-24",shortDateLELongTime:"short-date-le-long-time",shortDateLELongTime24:"short-date-le-long-time-24",longMonthDayYear:"long-month-day-year",longMonthDayYearShortTime:"long-month-day-year-short-time",longMonthDayYearShortTime24:"long-month-day-year-short-time-24",longMonthDayYearLongTime:"long-month-day-year-long-time",longMonthDayYearLongTime24:"long-month-day-year-long-time-24",dayShortMonthYear:"day-short-month-year",dayShortMonthYearShortTime:"day-short-month-year-short-time",dayShortMonthYearShortTime24:"day-short-month-year-short-time-24",dayShortMonthYearLongTime:"day-short-month-year-long-time",dayShortMonthYearLongTime24:"day-short-month-year-long-time-24",longDate:"long-date",longDateShortTime:"long-date-short-time",longDateShortTime24:"long-date-short-time-24",longDateLongTime:"long-date-long-time",longDateLongTime24:"long-date-long-time-24",longMonthYear:"long-month-year",shortMonthYear:"short-month-year",year:"year"}),g$l=l$u.apiValues,y$m=l$u.toJSON.bind(l$u),d$p=l$u.fromJSON.bind(l$u),u$E={ar:"ar-u-nu-latn-ca-gregory"};let c$D=new WeakMap,D$c=s$I["short-date-short-time"];function T$b(t){const o=t||D$c;if(!c$D.has(o)){const t=a$u(),r=u$E[a$u()]||t;c$D.set(o,new Intl.DateTimeFormat(r,o));}return c$D.get(o)}function S$a(t){return s$I[t]||null}function L$7(t,o){return T$b(o).format(t)}h$p((()=>{c$D=new WeakMap,D$c=s$I["short-date-short-time"];}));

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
const a$s={ar:"ar-u-nu-latn"};let e$x=new WeakMap,o$G={};function i$A(n){const i=n||o$G;if(!e$x.has(i)){const t=a$u(),o=a$s[a$u()]||t;e$x.set(i,new Intl.NumberFormat(o,n));}return q$9(e$x.get(i))}function u$D(t={}){const n={};return null!=t.digitSeparator&&(n.useGrouping=t.digitSeparator),null!=t.places&&(n.minimumFractionDigits=n.maximumFractionDigits=t.places),n}function m$o(t,n){return i$A(n).format(t)}h$p((()=>{e$x=new WeakMap,o$G={};}));

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
var r$u;const s$H={apiKey:void 0,applicationUrl:null==(r$u=globalThis.location)?void 0:r$u.href,assetsPath:"",fontsUrl:"https://static.arcgis.com/fonts",geometryServiceUrl:"https://utility.arcgisonline.com/arcgis/rest/services/Geometry/GeometryServer",geoRSSServiceUrl:"https://utility.arcgis.com/sharing/rss",kmlServiceUrl:"https://utility.arcgis.com/sharing/kml",portalUrl:"https://www.arcgis.com",routeServiceUrl:"https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",workers:{loaderConfig:{has:{},paths:{},map:{},packages:[]}},request:{httpsDomains:["arcgis.com","arcgisonline.com","esrikr.com","premiumservices.blackbridge.com","esripremium.accuweather.com","gbm.digitalglobe.com","firstlook.digitalglobe.com","msi.digitalglobe.com"],interceptors:[],maxUrlLength:2e3,proxyRules:[],proxyUrl:null,timeout:6e4,trustedServers:[],useIdentity:!0},log:{interceptors:[],level:null}};if(globalThis.esriConfig&&(n$s(s$H,globalThis.esriConfig,!0),delete s$H.has),!s$H.assetsPath){const e="4.23.7";s$H.assetsPath=`https://js.arcgis.com/${e.slice(0,-2)}/@arcgis/core/assets`;}s$H.baseUrl&&console.warn("[esri.config]","baseUrl has been replaced by assetsPath"),Object.defineProperty(s$H,"baseUrl",{set(){console.warn("[esri.config]","baseUrl has been replaced by assetsPath");}}),s$H.request.corsEnabledServers=[],s$H.request.corsEnabledServers.push=function(){return console.warn("[esri.config]","request.corsEnabledServers is not supported and will be removed in a future release. See http://esriurl.com/cors8664"),0};

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
const e$w=/\{([^\}]+)\}/g;function n$p(t){return null==t?"":t}function r$t(r,o){return r.replace(e$w,"object"==typeof o?(e,r)=>n$p(t$v(r,o)):(t,e)=>n$p(o(e)))}function o$F(t,e){return t.replace(/([\.$?*|{}\(\)\[\]\\\/\+\-^])/g,(t=>e&&-1!==e.indexOf(t)?t:`\\${t}`))}function c$C(t){let e=0;for(let n=0;n<t.length;n++)e=(e<<5)-e+t.charCodeAt(n),e|=0;return e}function u$C(t){return (new DOMParser).parseFromString(t||"","text/html").body.innerText||""}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
const o$E={info:0,warn:1,error:2,none:3};class s$G{constructor(e){this.level=null,this._module="",this._parent=null,this.writer=null,this._loggedMessages={error:new Map,warn:new Map,info:new Map},null!=e.level&&(this.level=e.level),null!=e.writer&&(this.writer=e.writer),this._module=e.module,s$G._loggers[this.module]=this;const t=this.module.lastIndexOf(".");-1!==t&&(this._parent=s$G.getLogger(this.module.slice(0,t)));}get module(){return this._module}get parent(){return this._parent}error(...e){this._log("error","always",...e);}warn(...e){this._log("warn","always",...e);}info(...e){this._log("info","always",...e);}errorOnce(...e){this._log("error","once",...e);}warnOnce(...e){this._log("warn","once",...e);}infoOnce(...e){this._log("info","once",...e);}errorOncePerTick(...e){this._log("error","oncePerTick",...e);}warnOncePerTick(...e){this._log("warn","oncePerTick",...e);}infoOncePerTick(...e){this._log("info","oncePerTick",...e);}get test(){const e=this;return {loggedMessages:e._loggedMessages,clearLoggedWarnings:()=>e._loggedMessages.warn.clear()}}static get testSingleton(){return {resetLoggers(e={}){const t=s$G._loggers;return s$G._loggers=e,t},set throttlingDisabled(e){s$G._throttlingDisabled=e;}}}static getLogger(e){let t=s$G._loggers[e];return t||(t=new s$G({module:e})),t}_log(t,r,...o){if(!this._matchLevel(t))return;if("always"!==r&&!s$G._throttlingDisabled){const e=this._argsToKey(o),n=this._loggedMessages[t].get(e);if("once"===r&&null!=n||"oncePerTick"===r&&n&&n>=s$G._tickCounter)return;this._loggedMessages[t].set(e,s$G._tickCounter),s$G._scheduleTickCounterIncrement();}for(const s of s$H.log.interceptors)if(s(t,this.module,...o))return;this._inheritedWriter()(t,this.module,...o);}_parentWithMember(e,r){let o=this;for(;r$z(o);){const r=o[e];if(r$z(r))return r;o=o.parent;}return r}_inheritedWriter(){return this._parentWithMember("writer",this._consoleWriter)}_consoleWriter(e,t,...r){console[e](`[${t}]`,...r);}_matchLevel(t){const r=s$H.log.level?s$H.log.level:"warn";return o$E[this._parentWithMember("level",r)]<=o$E[t]}_argsToKey(...e){const t=(e,t)=>"object"!=typeof t||Array.isArray(t)?t:"[Object]";return c$C(JSON.stringify(e,t))}static _scheduleTickCounterIncrement(){s$G._tickCounterScheduled||(s$G._tickCounterScheduled=!0,Promise.resolve().then((()=>{s$G._tickCounter++,s$G._tickCounterScheduled=!1;})));}}s$G._loggers={},s$G._tickCounter=0,s$G._tickCounterScheduled=!1,s$G._throttlingDisabled=!1;

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
const i$z=s$G.getLogger("esri.intl");function s$F(t,r,n={}){const{format:o={}}=n;return r$t(t,(t=>u$B(t,r,o)))}function u$B(t,e,n){let o,i;const s=t.indexOf(":");if(-1===s?o=t.trim():(o=t.slice(0,s).trim(),i=t.slice(s+1).trim()),!o)return "";const u=t$v(o,e);if(null==u)return "";const m=n[i]||n[o];return m?c$B(u,m):i?a$r(u,i):f$v(u)}function c$B(t,r){switch(r.type){case"date":return L$7(t,r.intlOptions);case"number":return m$o(t,r.intlOptions);default:return i$z.warn("missing format descriptor for key {key}"),f$v(t)}}function a$r(t,r){switch(r.toLowerCase()){case"dateformat":return L$7(t);case"numberformat":return m$o(t);default:return i$z.warn(`inline format is unsupported since 4.12: ${r}`),/^(dateformat|datestring)/i.test(r)?L$7(t):/^numberformat/i.test(r)?m$o(t):f$v(t)}}function f$v(t){switch(typeof t){case"string":return t;case"number":return m$o(t);case"boolean":return ""+t;default:return t instanceof Date?L$7(t):""}}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
function e$v(e,s){return e.replace(/\$\{([^\s\:\}]*)(?:\:([^\s\:\}]+))?\}/g,(function(e,n){if(""===n)return "$";const i=t$v(n,s),r=null==i?"":i;if(void 0===r)throw new Error(`could not find key "${n}" in template`);return r.toString()}))}class s$E{constructor(t,n,i){this.name=t,this.details=i,this.message=void 0,this instanceof s$E&&(this.message=n&&e$v(n,i)||"");}toString(){return "["+this.name+"]: "+this.message}}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
class s$D extends s$E{constructor(e,t,r){if(super(e,t,r),!(this instanceof s$D))return new s$D(e,t,r)}toJSON(){if(null!=this.details)try{return {name:this.name,message:this.message,details:JSON.parse(JSON.stringify(this.details,((t,r)=>{if(r&&"object"==typeof r&&"function"==typeof r.toJSON)return r;try{return m$q(r)}catch(s){return "[object]"}})))}}catch(r){throw s$G.getLogger("esri.core.Error").error(r),r}return {name:this.name,message:this.message,details:this.details}}static fromJSON(e){return new s$D(e.name,e.message,e.details)}}s$D.prototype.type="error";

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
function e$u(e){return {setTimeout:(t,o)=>{const r=e.setTimeout(t,o);return {remove:()=>e.clearTimeout(r)}}}}const t$t=e$u(globalThis);

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
function e$t(e){return e&&("function"==typeof e.on||"function"==typeof e.addEventListener)}function r$s(r,t,n){if(!e$t(r))throw new TypeError("target is not a Evented or EventTarget object");if("on"in r)return r.on(t,n);if(Array.isArray(t)){const e=t.slice();for(const t of e)r.addEventListener(t,n);return {remove(){for(const t of e)r.removeEventListener(t,n);}}}return r.addEventListener(t,n),{remove(){r.removeEventListener(t,n);}}}function t$s(t,n,o){if(!e$t(t))throw new TypeError("target is not a Evented or EventTarget object");if("once"in t)return t.once(n,o);const i=r$s(t,n,(e=>{i.remove(),o.call(t,e);}));return {remove(){i.remove();}}}function n$o(e,t,n){let o=!1;const i=r$s(e,t,(r=>{o||n.call(e,r);}));return {resume(){o=!1;},pause(){o=!0;},remove(){i.remove();}}}const o$D={Win:"Meta",Scroll:"ScrollLock",Spacebar:" ",Down:"ArrowDown",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Del:"Delete",Apps:"ContextMenu",Esc:"Escape",Multiply:"*",Add:"+",Subtract:"-",Decimal:".",Divide:"/"};function i$y({key:e}){return o$D[e]||e}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
function s$C(t){return Promise.all(t)}function l$t(t,e){const n=t.slice();return Promise.all(t.map(((t,n)=>e(t,n)))).then((t=>n.filter(((e,n)=>t[n]))))}function f$u(t){return new Promise(((e,n)=>{try{t(e,n);}catch(r){Promise.resolve().then((()=>n(r)));}}))}function m$n(t="Aborted"){return new s$D("AbortError",t)}function a$q(t,e="Aborted"){if(p$o(t))throw m$n(e)}function h$n(t){return r$z(t)?"aborted"in t?t:t.signal:t}function p$o(t){const e=h$n(t);return r$z(e)&&e.aborted}function b$b(t){if(g$k(t))throw t}function w$e(t){if(!g$k(t))throw t}function v$f(t,e){const r=h$n(t);if(!t$y(r)){if(!r.aborted)return t$s(r,"abort",(()=>e()));e();}}function P$9(t,e){const r=h$n(t);if(!t$y(r))return a$q(r),t$s(r,"abort",(()=>e(m$n())))}function d$o(t,e){const n=h$n(e);return t$y(n)?t:new Promise(((n,r)=>{let o=v$f(e,(()=>r(m$n())));const i=()=>o=a$y(o);t.then(i,i),t.then(n,r);}))}function j$g(t,n,r){return Promise.race([t,$$5(n).then((()=>{throw new s$D("timeout",`Did not resolve within ${n} milliseconds (${null!=r?r:"timeout"})`)}))])}function g$k(t){return t&&"AbortError"===t.name}function A$e(t){return t.catch((t=>{if(!g$k(t))throw t}))}function T$a(t,e=s$G.getLogger("esri")){return t.catch((t=>{g$k(t)||e.error(t);}))}function E$b(){let t=null;const e=new Promise(((e,n)=>{t={promise:void 0,resolve:e,reject:n};}));return t.promise=e,t}function y$l(t){if(!t)return;if("function"!=typeof t.forEach){const e=Object.keys(t);return y$l(e.map((e=>t[e]))).then((t=>{const n={};return e.forEach(((e,r)=>n[e]=t[r])),n}))}const e=t;return f$u((t=>{const n=[];let r=e.length;0===r&&t(n),e.forEach((e=>{const o={promise:e||Promise.resolve(e)};n.push(o),o.promise.then((t=>{o.value=t;})).catch((t=>{o.error=t;})).then((()=>{--r,0===r&&t(n);}));}));}))}function C$9(t){return y$l(t).then((t=>t.filter((t=>!!t.value)).map((t=>t.value))))}function k$d(t){return Promise.reject(t)}function L$6(t){return Promise.resolve(t)}function $$5(t,e,n){const r=new AbortController;return v$f(n,(()=>r.abort())),new Promise(((n,o)=>{let i=setTimeout((()=>{i=0,n(e);}),t);v$f(r,(()=>{i&&(clearTimeout(i),o(m$n()));}));}))}function x$f(t,n,r,o){const i=r&&"abort"in r?r:null;null!=o||i||(o=r);let u=setTimeout((()=>{u=0,i&&i.abort();}),n);const c=()=>o||new s$D("promiseUtils:timeout","The wrapped promise did not resolve within "+n+" ms");return t.then((t=>{if(0===u)throw c();return clearTimeout(u),t}),(t=>{throw clearTimeout(u),0===u?c():t}))}function D$b(t){return t&&"function"==typeof t.then}function O$8(t){return D$b(t)?t:Promise.resolve(t)}function U$6(t,e=-1){let n,r,o,i,c=null;const s=(...l)=>{if(n){r=l,i&&i.reject(m$n()),i=E$b();const t=q$9(i.promise);if(c){const t=c;c=null,t.abort();}return t}if(o=i||E$b(),i=null,e>0){const r=new AbortController;n=O$8(t(...l,r.signal));const o=n;$$5(e).then((()=>{n===o&&(i?r.abort():c=r);}));}else n=1,n=O$8(t(...l));const f=()=>{const t=r;r=o=n=c=null,null!=t&&s(...t);},a=n,h=o;return a.then(f,f),a.then(h.resolve,h.reject),q$9(h.promise)};return s}function q$8(){let e,n;const r=new Promise(((t,r)=>{e=t,n=r;})),o=t=>{e(t);};return o.resolve=t=>e(t),o.reject=t=>n(t),o.timeout=(e,n)=>t$t.setTimeout((()=>o.reject(n)),e),o.promise=r,o}function z$9(t,e){return t.then(e,e)}function B$8(t,e){let n,r=new AbortController;const i=t(r.signal);let u={promise:i,finished:!1,abort:()=>{r&&(r.abort(),r=null);}};const c=()=>{u&&(u.finished=!0,u=null),r$z(n)&&(n.remove(),n=null),r=null;};return i.then(c,c),n=v$f(e,(()=>{r$z(u)&&u.abort();})),u}function F$9(t){return Promise.resolve().then((()=>{a$q(t);}))}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
const s$B=/^([a-z]{2})(?:[-_]([A-Za-z]{2}))?$/,o$C={ar:!0,bg:!0,bs:!0,ca:!0,cs:!0,da:!0,de:!0,el:!0,en:!0,es:!0,et:!0,fi:!0,fr:!0,he:!0,hr:!0,hu:!0,id:!0,it:!0,ja:!0,ko:!0,lt:!0,lv:!0,nb:!0,nl:!0,pl:!0,"pt-BR":!0,"pt-PT":!0,ro:!0,ru:!0,sk:!0,sl:!0,sr:!0,sv:!0,th:!0,tr:!0,uk:!0,vi:!0,"zh-CN":!0,"zh-HK":!0,"zh-TW":!0};function i$x(t){var e;return null!=(e=o$C[t])&&e}const a$p=[],c$A=new Map;function d$n(t){for(const e of c$A.keys())m$m(t.pattern,e)&&c$A.delete(e);}function l$s(t){return a$p.includes(t)||(d$n(t),a$p.unshift(t)),{remove(){const e=a$p.indexOf(t);e>-1&&(a$p.splice(e,1),d$n(t));}}}async function u$A(t){const e=a$u();c$A.has(t)||c$A.set(t,f$t(t,e));const n=c$A.get(t);return await _$d.add(n),n}function h$m(t){if(!s$B.test(t))return null;const[,e,n]=s$B.exec(t),r=e+(n?"-"+n.toUpperCase():"");return i$x(r)?r:i$x(e)?e:null}async function f$t(e,n){const r=[];for(const t of a$p)if(m$m(t.pattern,e))try{return await t.fetchMessageBundle(e,n)}catch(s){r.push(s);}if(r.length)throw new s$D("intl:message-bundle-error",`Errors occurred while loading "${e}"`,{errors:r});throw new s$D("intl:no-message-bundle-loader",`No loader found for message bundle "${e}"`)}function m$m(t,e){return "string"==typeof t?e.startsWith(t):t.test(e)}h$p((()=>{c$A.clear();}));const _$d=new class{constructor(){this._numLoading=0;}async waitForAll(){this._dfd&&await this._dfd.promise;}add(t){return this._increase(),t.then((()=>this._decrease()),(()=>this._decrease())),this.waitForAll()}_increase(){this._numLoading++,this._dfd||(this._dfd=E$b());}_decrease(){this._numLoading=Math.max(this._numLoading-1,0),this._dfd&&0===this._numLoading&&(this._dfd.resolve(),this._dfd=null);}},p$n={cache:c$A,loaders:a$p};

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
const s$A=s$G.getLogger("esri.core.urlUtils"),u$z=s$H.request,c$z="esri/config: esriConfig.request.proxyUrl is not set.",l$r=/^\s*[a-z][a-z0-9-+.]*:(?![0-9])/i,f$s=/^\s*http:/i,a$o=/^\s*https:/i,h$l=/^\s*file:/i,p$m=/:\d+$/,d$m=/^https?:\/\/[^/]+\.arcgis.com\/sharing(\/|$)/i,g$j=new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$"),m$l=new RegExp("^((([^\\[:]+):)?([^@]+)@)?(\\[([^\\]]+)\\]|([^\\[:]*))(:([0-9]+))?$");class y$k{constructor(t=""){this.uri=t,this.scheme=null,this.authority=null,this.path=null,this.query=null,this.fragment=null,this.user=null,this.password=null,this.host=null,this.port=null;let n=q$9(this.uri.match(g$j));this.scheme=n[2]||(n[1]?"":null),this.authority=n[4]||(n[3]?"":null),this.path=n[5],this.query=n[7]||(n[6]?"":null),this.fragment=n[9]||(n[8]?"":null),null!=this.authority&&(n=q$9(this.authority.match(m$l)),this.user=n[3]||null,this.password=n[4]||null,this.host=n[6]||n[7],this.port=n[9]||null);}toString(){return this.uri}}const $$4={},x$e=new y$k(s$H.applicationUrl);let w$d=x$e;const O$7=q$7();let U$5=O$7;const b$a=()=>w$d,C$8=()=>U$5;function q$7(){const t=q$9(w$d.path),n=t.substring(0,t.lastIndexOf(t.split("/")[t.split("/").length-1]));return `${`${w$d.scheme}://${w$d.host}${null!=w$d.port?`:${w$d.port}`:""}`}${n}`}const R$9={setAppUrl:t=>w$d=t,setAppBaseUrl:t=>U$5=t,restoreUrls:()=>{w$d=x$e,U$5=O$7;}};function j$f(t){const n={path:null,query:null},e=new y$k(t),r=t.indexOf("?");return null===e.query?n.path=t:(n.path=t.substring(0,r),n.query=v$e(e.query)),e.fragment&&(n.hash=e.fragment,null===e.query&&(n.path=n.path.substring(0,n.path.length-(e.fragment.length+1)))),n}function v$e(t){const n=t.split("&"),e={};for(const r of n){if(!r)continue;const t=r.indexOf("=");let n,o;t<0?(n=decodeURIComponent(r),o=""):(n=decodeURIComponent(r.slice(0,t)),o=decodeURIComponent(r.slice(t+1)));let i=e[n];"string"==typeof i&&(i=e[n]=[i]),Array.isArray(i)?i.push(o):e[n]=o;}return e}function L$5(t){return t&&"object"==typeof t&&"toJSON"in t&&"function"==typeof t.toJSON}function I$b(t,n){return t?n&&"function"==typeof n?Object.keys(t).map((e=>encodeURIComponent(e)+"="+encodeURIComponent(n(e,t[e])))).join("&"):Object.keys(t).map((e=>{const r=t[e];if(null==r)return "";const o=encodeURIComponent(e)+"=",i=n&&n[e];return i?o+encodeURIComponent(i(r)):Array.isArray(r)?r.map((t=>L$5(t)?o+encodeURIComponent(JSON.stringify(t)):o+encodeURIComponent(t))).join("&"):L$5(r)?o+encodeURIComponent(JSON.stringify(r)):o+encodeURIComponent(r)})).filter((t=>t)).join("&"):""}function A$d(t=!1){let e,r=u$z.proxyUrl;if("string"==typeof t){e=ht(t);const n=J$6(t);n&&(r=n.proxyUrl);}else e=!!t;if(!r)throw s$A.warn(c$z),new s$D("urlutils:proxy-not-set",c$z);e&&$t()&&(r=mt(r));return j$f(r)}function S$9(t){const n=J$6(t);let e,r;if(n){const t=P$8(n.proxyUrl);e=t.path,r=t.query?v$e(t.query):null;}if(e){const n=j$f(t);t=e+"?"+n.path;const o=I$b({...r,...n.query});o&&(t=`${t}?${o}`);}return t}const B$7={path:"",query:""};function P$8(t){const n=t.indexOf("?");return -1!==n?(B$7.path=t.slice(0,n),B$7.query=t.slice(n+1)):(B$7.path=t,B$7.query=null),B$7}function k$c(t){return t=(t=xt(t=bt(t=P$8(t).path),!0)).toLowerCase()}function E$a(t){const n={proxyUrl:t.proxyUrl,urlPrefix:k$c(t.urlPrefix)},e=u$z.proxyRules,r=n.urlPrefix;let o=e.length;for(let i=0;i<e.length;i++){const t=e[i].urlPrefix;if(0===r.indexOf(t)){if(r.length===t.length)return -1;o=i;break}0===t.indexOf(r)&&(o=i+1);}return e.splice(o,0,n),o}function J$6(t){const n=u$z.proxyRules,e=k$c(t);for(let r=0;r<n.length;r++)if(0===e.indexOf(n[r].urlPrefix))return n[r]}function N$8(t,n){return t=T$9(t),n=T$9(n),xt(t)===xt(n)}function T$9(t){const n=(t=F$8(t)).indexOf("/sharing");return n>0?t.substring(0,n):t.replace(/\/+$/,"")}function W$2(t){const n=n=>null==n||n instanceof RegExp&&n.test(t)||"string"==typeof n&&t.startsWith(n),e=u$z.interceptors;if(e)for(const r of e)if(Array.isArray(r.urls)){if(r.urls.some(n))return r}else if(n(r.urls))return r;return null}function z$8(t,n,e=!1){const r=Lt(t),o=Lt(n);return !(!e&&r.scheme!==o.scheme)&&(null!=r.host&&null!=o.host&&(r.host.toLowerCase()===o.host.toLowerCase()&&r.port===o.port))}function D$a(t){if("string"==typeof t){if(!K$5(t))return !0;t=Lt(t);}if(z$8(t,w$d))return !0;const n=u$z.trustedServers||[];for(let e=0;e<n.length;e++){const r=M$d(n[e]);for(let n=0;n<r.length;n++)if(z$8(t,r[n]))return !0}return !1}function M$d(t){return $$4[t]||(at(t)||ft(t)?$$4[t]=[new y$k(Q$4(t))]:$$4[t]=[new y$k(`http://${t}`),new y$k(`https://${t}`)]),$$4[t]}function Q$4(t,n=U$5,e){return ft(t)?e&&e.preserveProtocolRelative?t:"http"===w$d.scheme&&w$d.authority===H$6(t).slice(2)?`http:${t}`:`https:${t}`:at(t)?t:q$9(G$9("/"===t[0]?wt(n):n,t))}function _$c(t,n=U$5,e){if(!K$5(t))return t;const r=F$8(t),o=r.toLowerCase(),i=F$8(n).toLowerCase().replace(/\/+$/,""),s=e?F$8(e).toLowerCase().replace(/\/+$/,""):null;if(s&&0!==i.indexOf(s))return t;const u=(t,n,e)=>-1===(e=t.indexOf(n,e))?t.length:e;let c=u(o,"/",o.indexOf("//")+2),l=-1;for(;o.slice(0,c+1)===i.slice(0,c)+"/"&&(l=c+1,c!==o.length);)c=u(o,"/",c+1);if(-1===l)return t;if(s&&l<s.length)return t;t=r.slice(l);const f=i.slice(l-1).replace(/[^/]+/g,"").length;if(f>0)for(let a=0;a<f;a++)t=`../${t}`;else t=`./${t}`;return t}function F$8(t){return t=jt(t=Rt(t=qt(t=Q$4(t=t.trim()))))}function G$9(...t){const n=t.filter(r$z);if(!n||!n.length)return;const e=[];if(K$5(n[0])){const t=n[0],r=t.indexOf("//");-1!==r&&(e.push(t.slice(0,r+1)),dt(n[0])&&(e[0]+="/"),n[0]=t.slice(r+2));}else "/"===n[0][0]&&e.push("");const r=n.reduce(((t,n)=>n?t.concat(n.split("/")):t),[]);for(let o=0;o<r.length;o++){const t=r[o];".."===t&&e.length>0&&".."!==e[e.length-1]?e.pop():(!t&&o===r.length-1||t&&("."!==t||0===e.length))&&e.push(t);}return e.join("/")}function H$6(t,n=!1){if(V$3(t)||X$5(t))return null;let e=t.indexOf("://");if(-1===e&&ft(t))e=2;else {if(-1===e)return null;e+=3;}const r=t.indexOf("/",e);return -1!==r&&(t=t.slice(0,r)),n&&(t=xt(t,!0)),t}function K$5(t){return ft(t)||at(t)}function V$3(t){return null!=t&&"blob:"===t.slice(0,5)}function X$5(t){return "data:"===t.slice(0,5)}function Y$4(t){const n=nt(t);if(!n||!n.isBase64)return null;const e=atob(n.data),r=new Uint8Array(e.length);for(let o=0;o<e.length;o++)r[o]=e.charCodeAt(o);return r.buffer}function Z$4(t){return btoa(String.fromCharCode.apply(null,t)).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}const tt=/^data:(.*?)(;base64)?,(.*)$/;function nt(t){const n=t.match(tt);if(!n)return null;const[,e,r,o]=n;return {mediaType:e,isBase64:!!r,data:o}}function et(t){return t.isBase64?`data:${t.mediaType};base64,${t.data}`:`data:${t.mediaType},${t.data}`}function rt(t){const n=Y$4(t);if(!n)return null;const e=nt(t);return new Blob([n],{type:e.mediaType})}function ot(t,n){st(t,n)||ct(t,n);}function it(t,n){ut(t,n)||lt(t,n);}function st(t,n){const e=rt(t);return !!e&&ut(e,n)}function ut(t,n){if(!t)return !1;const e=document.createElement("a");if(!("download"in e))return !1;const r=URL.createObjectURL(t);return e.download=n,e.href=r,e.style.display="none",document.body.appendChild(e),e.click(),document.body.removeChild(e),URL.revokeObjectURL(r),!0}function ct(t,n){const e=rt(t);return !!e&&lt(e,n)}function lt(t,n){return !!window.navigator.msSaveOrOpenBlob&&window.navigator.msSaveOrOpenBlob(t,n)}function ft(t){return null!=t&&void 0!==t&&"/"===t[0]&&"/"===t[1]}function at(t){return l$r.test(t)}function ht(t){return a$o.test(t)||"https"===w$d.scheme&&ft(t)}function pt(t){return f$s.test(t)||"http"===w$d.scheme&&ft(t)}function dt(t){return h$l.test(t)}function gt(t){return ft(t)?`http:${t}`:t.replace(a$o,"http:")}function mt(t){return ft(t)?`https:${t}`:t.replace(f$s,"https:")}function yt(){return "http"===w$d.scheme}function $t(){return "https"===w$d.scheme}function xt(t,n=!1){return ft(t)?t.slice(2):(t=t.replace(l$r,""),n&&t.length>1&&"/"===t[0]&&"/"===t[1]&&(t=t.slice(2)),t)}function wt(t){const n=t.indexOf("//"),e=t.indexOf("/",n+2);return -1===e?t:t.slice(0,e)}function Ot(t){let n=0;if(K$5(t)){const e=t.indexOf("//");-1!==e&&(n=e+2);}const e=t.lastIndexOf("/");return e<n?t:t.slice(0,e+1)}function Ut(t,n){if(!t)return "";const e=j$f(t).path.replace(/\/+$/,""),r=e.substring(e.lastIndexOf("/")+1);if(null==n||!n.length)return r;const o=new RegExp(`.(${n.join("|")})$`,"ig");return r.replace(o,"")}function bt(t){return t&&"/"===t[t.length-1]?t:`${t}/`}function Ct(t){return t.replace(/\/+$/,"")}function qt(t){if(/^https?:\/\//i.test(t)){const n=P$8(t);t=(t=n.path.replace(/\/{2,}/g,"/")).replace("/","//"),n.query&&(t+=`?${n.query}`);}return t}function Rt(t){return t.replace(/^(https?:\/\/)(arcgis\.com)/i,"$1www.$2")}function jt(t){const n=u$z.httpsDomains;if(!pt(t))return t;const e=t.indexOf("/",7);let r;if(r=-1===e?t:t.slice(0,e),r=r.toLowerCase().slice(7),p$m.test(r)){if(!r.endsWith(":80"))return t;r=r.slice(0,-3),t=t.replace(":80","");}return yt()&&r===w$d.authority&&!d$m.test(t)||($t()&&r===w$d.authority||n&&n.some((t=>r===t||r.endsWith(`.${t}`)))||$t()&&!J$6(t))&&(t=mt(t)),t}function vt(t,n,e){if(!(n&&e&&t&&K$5(t)))return t;const r=t.indexOf("//"),o=t.indexOf("/",r+2),i=t.indexOf(":",r+2),s=Math.min(o<0?t.length:o,i<0?t.length:i);if(t.slice(r+2,s).toLowerCase()!==n.toLowerCase())return t;return `${t.slice(0,r+2)}${e}${t.slice(s)}`}function Lt(t){return "string"==typeof t?new y$k(Q$4(t)):(t.scheme||(t.scheme=w$d.scheme),t)}function It(t){return Jt.test(t)}function At(t,n){const e=j$f(t),r=Object.keys(e.query||{});return r.length>0&&n&&n.warn("removeQueryParameters()",`Url query parameters are not supported, the following parameters have been removed: ${r.join(", ")}.`),e.path}function St(t,n,e){const r=j$f(t),o=r.query||{};return o[n]=String(e),`${r.path}?${I$b(o)}`}function Bt(t,n){const e=j$f(t),r=e.query||{};for(const i in n)r[i]=n[i];const o=I$b(r);return o?`${e.path}?${o}`:e.path}function Pt(t,n){const{path:e,query:r}=j$f(t);if(!r)return t;delete r[n];const o=I$b(r);return o?`${e}?${o}`:e}function kt(t){if(t$y(t))return null;const n=t.match(Et);return n?n[1]:null}const Et=/.*?\.([^\/]*)$/,Jt=/(^data:image\/svg|\.svg$)/i;

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
const d$l="20220404",e$s="ecb69ff5e08a61c162de0ddc0b1f397ed5d4071b";

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
const a$n="4.23",s$z={async request(e,r){var a;const{default:s}=await Promise.resolve().then(function () { return request; }),n=e.options,o=n.responseType;n.signal=null==r?void 0:r.signal,n.responseType="native"===o||"native-request-init"===o?"native-request-init":["blob","json","text"].includes(o)&&null!=(a=W$2(e.url))&&a.after?o:"array-buffer";const i=await s(e.url,n),u={data:i.data,ssl:i.ssl};switch(i.requestOptions.responseType){case"native-request-init":return delete u.data.signal,u;case"blob":u.data=await u.data.arrayBuffer();break;case"json":u.data=(new TextEncoder).encode(JSON.stringify(u.data)).buffer;break;case"text":u.data=(new TextEncoder).encode(u.data).buffer;}return {result:u,transferList:[u.data]}}};let n$n;function o$B(e){n$n=e;}function i$w(e){const t=n$n&&n$n.findCredential(e);return t&&t.token?St(e,"token",t.token):e}r$x("host-webworker")||(r$x("edge")||r$x("trident"))&&console.warn("Deprecated browser - see http://esriurl.com/oldbrowser");

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
const t$r=["elevation3d.arcgis.com","js.arcgis.com","jsdev.arcgis.com","jsqa.arcgis.com","static.arcgis.com"];function c$y(s){return s&&s.length>4&&s.startsWith("AAPK")}function r$r(c){const r=H$6(c,!0);return r&&r.endsWith(".arcgis.com")&&!t$r.includes(r)&&!c.endsWith("/sharing/rest/generateToken")}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
function t$q(t,i,s=!1,c){return new Promise(((d,a)=>{if(p$o(c))return void a(n$m());let m=()=>{v(),a(new Error(`Unable to load ${i}`));},l=()=>{const e=t;v(),d(e);},u=()=>{if(!t)return;const e=t;v(),e.src="",a(n$m());};const v=()=>{r$x("esri-image-decode")||(t.removeEventListener("error",m),t.removeEventListener("load",l)),m=null,l=null,t=null,r$z(c)&&c.removeEventListener("abort",u),u=null,s&&URL.revokeObjectURL(i);};r$z(c)&&c.addEventListener("abort",u),r$x("esri-image-decode")?t.decode().then(l,m):(t.addEventListener("error",m),t.addEventListener("load",l));}))}function n$m(){try{return new DOMException("Aborted","AbortError")}catch{const e=new Error;return e.name="AbortError",e}}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
async function C$7(e,t){var r;const o=X$5(e),i=V$3(e);i||o||(e=F$8(e));const l={url:e,requestOptions:{...e$D(t)}};let u=W$2(e);if(u){const e=await K$4(u,l);if(null!=e)return {data:e,getHeader:_$b,requestOptions:l.requestOptions,url:l.url};u.after||u.error||(u=null);}if(e=l.url,"image"===(t=l.requestOptions).responseType){if(r$x("host-webworker")||r$x("host-node"))throw R$8("request:invalid-parameters",new Error("responseType 'image' is not supported in Web Workers or Node environment"),l)}else if(o)throw R$8("request:invalid-parameters",new Error("Data URLs are not supported for responseType = "+t.responseType),l);if("head"===t.method){if(t.body)throw R$8("request:invalid-parameters",new Error("body parameter cannot be set when method is 'head'"),l);if(o||i)throw R$8("request:invalid-parameters",new Error("data and blob URLs are not supported for method 'head'"),l)}if(await H$5(),E$9)return E$9.execute(e,t);const h=new AbortController;v$f(t,(()=>h.abort()));const f={controller:h,credential:null,credentialToken:null,fetchOptions:null,hasToken:!1,interceptor:u,params:l,redoRequest:!1,useIdentity:L$4.useIdentity,useProxy:!1,useSSL:!1,withCredentials:!1},y=await z$7(f);return null==(r=u)||null==r.after||r.after(y),y}let E$9;const L$4=s$H.request,U$4="FormData"in globalThis,j$e=[499,498,403,401],P$7=["COM_0056","COM_0057","SB_0008"],D$9=[/\/arcgis\/tokens/i,/\/sharing(\/rest)?\/generatetoken/i,/\/rest\/info/i],_$b=()=>null,F$7=Symbol();function I$a(e){const t=H$6(e);t&&!C$7._corsServers.includes(t)&&C$7._corsServers.push(t);}function M$c(e){const t=H$6(e);return !t||t.endsWith(".arcgis.com")||C$7._corsServers.includes(t)||D$a(t)}function R$8(e,t,s,n){let a="Error";const u={url:s.url,requestOptions:s.requestOptions,getHeader:_$b,ssl:!1};if(t instanceof s$D)return t.details?(t.details=m$q(t.details),t.details.url=s.url,t.details.requestOptions=s.requestOptions):t.details=u,t;if(t){const e=n&&(e=>n.headers.get(e)),r=n&&n.status,s=t.message;s&&(a=s),e&&(u.getHeader=e),u.httpStatus=(null!=t.httpCode?t.httpCode:t.code)||r||0,u.subCode=t.subcode,u.messageCode=t.messageCode,"string"==typeof t.details?u.messages=[t.details]:u.messages=t.details,u.raw=F$7 in t?t[F$7]:t;}return g$k(t)?m$n():new s$D(e,a,u)}async function H$5(){r$x("host-webworker")?E$9||(E$9=await import('./request-7abbd65e.js')):C$7._abortableFetch||(C$7._abortableFetch=globalThis.fetch.bind(globalThis));}async function A$c(){n$n||await import('./IdentityManager-764864fd.js');}async function B$6(r){const s=r.params.url,o=r.params.requestOptions,n=r.controller.signal,a=o.body;let i=null,l=null,c=null;if(U$4&&"HTMLFormElement"in globalThis&&(a instanceof FormData?i=a:a instanceof HTMLFormElement&&(l=a,i=new FormData(l))),"string"==typeof a&&(c=a),r.fetchOptions={cache:o.cacheBust&&!C$7._abortableFetch.polyfill?"no-cache":"default",credentials:"same-origin",headers:o.headers||{},method:"head"===o.method?"HEAD":"GET",mode:"cors",redirect:"follow",signal:n},(i||c)&&(r.fetchOptions.body=i||c),"anonymous"===o.authMode&&(r.useIdentity=!1),r.hasToken=!!(/token=/i.test(s)||o.query&&o.query.token||i&&i.get&&i.get("token")||l&&l.elements.token),!r.hasToken&&s$H.apiKey&&r$r(s)&&(o.query||(o.query={}),o.query.token=s$H.apiKey,r.hasToken=!0),r.useIdentity&&!r.hasToken&&!r.credentialToken&&!N$7(s)&&!p$o(n)){let e;"immediate"===o.authMode?(await A$c(),e=await n$n.getCredential(s,{signal:n}),r.credential=e):"no-prompt"===o.authMode?(await A$c(),e=await n$n.getCredential(s,{prompt:!1,signal:n}).catch((()=>{})),r.credential=e):n$n&&(e=n$n.findCredential(s)),e&&(r.credentialToken=e.token,r.useSSL=!!e.ssl);}}function N$7(e){return D$9.some((t=>t.test(e)))}async function $$3(e){let r=e.params.url;const o=e.params.requestOptions,n=e.fetchOptions,a=V$3(r)||X$5(r),i=o.responseType||"json",u=a?0:null!=o.timeout?o.timeout:L$4.timeout;let p=!1;if(!a){e.useSSL&&(r=mt(r)),o.cacheBust&&"default"===n.cache&&(r=St(r,"request.preventCache",Date.now()));let a={...o.query};e.credentialToken&&(a.token=e.credentialToken);let i=I$b(a);r$x("esri-url-encodes-apostrophe")&&(i=i.replace(/'/g,"%27"));const l=r.length+1+i.length;let u;p="delete"===o.method||"post"===o.method||"put"===o.method||!!o.body||l>L$4.maxUrlLength;const c=o.useProxy||!!J$6(r);if(c){const e=A$d(r);u=e.path,!p&&u.length+1+l>L$4.maxUrlLength&&(p=!0),e.query&&(a={...e.query,...a});}if("HEAD"===n.method&&(p||c)){if(p){if(l>L$4.maxUrlLength)throw R$8("request:invalid-parameters",new Error("URL exceeds maximum length"),e.params);throw R$8("request:invalid-parameters",new Error("cannot use POST request when method is 'head'"),e.params)}if(c)throw R$8("request:invalid-parameters",new Error("cannot use proxy when method is 'head'"),e.params)}if(p?(n.method="delete"===o.method?"DELETE":"put"===o.method?"PUT":"POST",o.body?r=Bt(r,a):(n.body=I$b(a),n.headers["Content-Type"]="application/x-www-form-urlencoded")):r=Bt(r,a),c&&(e.useProxy=!0,r=`${u}?${r}`),a.token&&U$4&&n.body instanceof FormData){const e=n.body;e.set?e.set("token",a.token):e.append("token",a.token);}if(o.hasOwnProperty("withCredentials"))e.withCredentials=o.withCredentials;else if(!z$8(r,b$a()))if(D$a(r))e.withCredentials=!0;else if(n$n){const s=n$n.findServerInfo(r);s&&s.webTierAuth&&(e.withCredentials=!0);}e.withCredentials&&(n.credentials="include");}let m,x,v=0,E=!1;u>0&&(v=setTimeout((()=>{E=!0,e.controller.abort();}),u));try{if("native-request-init"===o.responseType)x=n,x.url=r;else if("image"!==o.responseType||"default"!==n.cache||"GET"!==n.method||p||W$1(o.headers)||!a&&!e.useProxy&&L$4.proxyUrl&&!M$c(r)){if(m=await C$7._abortableFetch(r,n),e.useProxy||I$a(r),"native"===o.responseType)x=m;else if("HEAD"!==n.method)if(m.ok){switch(i){case"array-buffer":x=await m.arrayBuffer();break;case"blob":case"image":x=await m.blob();break;default:x=await m.text();}if(v&&(clearTimeout(v),v=0),"json"===i||"xml"===i||"document"===i)if(x)switch(i){case"json":x=JSON.parse(x);break;case"xml":x=G$8(x,"application/xml");break;case"document":x=G$8(x,"text/html");}else x=null;if(x){if("array-buffer"===i||"blob"===i){const e=m.headers.get("Content-Type");if(/application\/json|text\/plain/i.test(e)&&x["blob"===i?"size":"byteLength"]<=750)try{const e=await new Response(x).json();e.error&&(x=e);}catch{}}"image"===i&&x instanceof Blob&&(x=await X$4(URL.createObjectURL(x),e,!0));}}else x=await m.text();}else x=await X$4(r,e);}catch(j){if("AbortError"===j.name){if(E)throw new Error("Timeout exceeded");throw m$n("Request canceled")}if(!(!m&&j instanceof TypeError&&L$4.proxyUrl)||o.body||"delete"===o.method||"head"===o.method||"post"===o.method||"put"===o.method||e.useProxy||M$c(r))throw j;e.redoRequest=!0,E$a({proxyUrl:L$4.proxyUrl,urlPrefix:H$6(r)});}finally{v&&clearTimeout(v);}return [m,x]}async function K$4(e,t){if(null!=e.responseData)return e.responseData;if(e.headers&&(t.requestOptions.headers={...t.requestOptions.headers,...e.headers}),e.query&&(t.requestOptions.query={...t.requestOptions.query,...e.query}),e.before){let o,n;try{n=await e.before(t);}catch(s){o=R$8("request:interceptor",s,t);}if((n instanceof Error||n instanceof s$D)&&(o=R$8("request:interceptor",n,t)),o)throw e.error&&e.error(o),o;return n}}function W$1(e){if(e)for(const t of Object.getOwnPropertyNames(e))if(e[t])return !0;return !1}function G$8(e,t){let r;try{r=(new DOMParser).parseFromString(e,t);}catch{}if(!r||r.getElementsByTagName("parsererror").length)throw new SyntaxError("XML Parse error");return r}async function z$7(e){var r,s;let o,n;await B$6(e);try{do{[o,n]=await $$3(e);}while(!await J$5(e,o,n))}catch(l){const t=R$8("request:server",l,e.params,o);throw t.details.ssl=e.useSSL,e.interceptor&&e.interceptor.error&&e.interceptor.error(t),t}const a=e.params.url;if(/\/sharing\/rest\/(accounts|portals)\/self/i.test(a)&&!e.hasToken&&!e.credentialToken&&null!=(r=n)&&null!=(s=r.user)&&s.username&&!D$a(a)){const e=H$6(a,!0);e&&L$4.trustedServers.push(e);}const i=e.credential;if(i&&n$n){const e=n$n.findServerInfo(i.server);let r=e&&e.owningSystemUrl;if(r){r=r.replace(/\/?$/,"/sharing");const e=n$n.findCredential(r,i.userId);e&&-1===n$n._getIdenticalSvcIdx(r,e)&&e.resources.unshift(r);}}return {data:n,getHeader:o?e=>o.headers.get(e):_$b,requestOptions:e.params.requestOptions,ssl:e.useSSL,url:e.params.url}}async function J$5(e,r,s){if(e.redoRequest)return e.redoRequest=!1,!1;const o=e.params.requestOptions;if(!r||"native"===o.responseType||"native-request-init"===o.responseType)return !0;let n,a,i,l;if(!r.ok)throw n=new Error(`Unable to load ${r.url} status: ${r.status}`),n[F$7]=s,n;null!=s&&s.error&&(n=s.error),n&&(a=Number(n.code),i=n.hasOwnProperty("subcode")?Number(n.subcode):null,l=n.messageCode,l=l&&l.toUpperCase());const u=o.authMode;if(403===a&&(4===i||n.message&&n.message.toLowerCase().indexOf("ssl")>-1&&-1===n.message.toLowerCase().indexOf("permission"))){if(!e.useSSL)return e.useSSL=!0,!1}else if(!e.hasToken&&e.useIdentity&&("no-prompt"!==u||498===a)&&-1!==j$e.indexOf(a)&&!N$7(e.params.url)&&(403!==a||-1===P$7.indexOf(l)&&(null==i||2===i&&e.credentialToken))){await A$c();try{const r=await n$n.getCredential(e.params.url,{error:R$8("request:server",n,e.params),prompt:"no-prompt"!==u,signal:e.controller.signal,token:e.credentialToken});return e.credential=r,e.credentialToken=r.token,e.useSSL=e.useSSL||r.ssl,!1}catch(c){if("no-prompt"===u)return e.credential=null,e.credentialToken=null,!1;n=c;}}if(n)throw n;return !0}function X$4(e,t,r=!1){const s=t.controller.signal,o=new Image;return t.withCredentials?o.crossOrigin="use-credentials":o.crossOrigin="anonymous",o.alt="",o.src=e,t$q(o,e,r,s)}C$7._abortableFetch=null,C$7._corsServers=["https://server.arcgisonline.com","https://services.arcgisonline.com"];

const request = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': C$7
});

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
async function o$A(e,n,o,i){const a=n.exec(o);if(!a)throw new s$D("esri-intl:invalid-bundle",`Bundle id "${o}" is not compatible with the pattern "${n}"`);const c=a[1]?`${a[1]}/`:"",l=a[2],w=h$m(i),h=`${c}${l}.json`,u=w?`${c}${l}_${w}.json`:h;let f;try{f=await s$y(e(u));}catch(d){if(u===h)throw new s$D("intl:unknown-bundle",`Bundle "${o}" cannot be loaded`,{error:d});try{f=await s$y(e(h));}catch(d){throw new s$D("intl:unknown-bundle",`Bundle "${o}" cannot be loaded`,{error:d})}}return f}async function s$y(t){if(r$z(c$x.fetchBundleAsset))return c$x.fetchBundleAsset(t);const r=await C$7(t,{responseType:"text"});return JSON.parse(r.data)}class i$v{constructor({base:e="",pattern:t,location:n=new URL(window.location.href)}){let r;r="string"==typeof n?e=>new URL(e,new URL(n,window.location.href)).href:n instanceof URL?e=>new URL(e,n).href:n,this.pattern="string"==typeof t?new RegExp(`^${t}`):t,this.getAssetUrl=r,e=e?e.endsWith("/")?e:e+"/":"",this.matcher=new RegExp(`^${e}(?:(.*)/)?(.*)$`);}fetchMessageBundle(e,t){return o$A(this.getAssetUrl,this.matcher,e,t)}}function a$m(e){return new i$v(e)}const c$x={};

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
const i$u=s$G.getLogger("esri.assets");function n$l(s,o){return C$7(a$l(s),o)}function a$l(t){if(!s$H.assetsPath)throw i$u.errorOnce("The API assets location needs to be set using config.assetsPath. More information: https://arcg.is/1OzLe50"),new s$D("assets:path-not-set","config.assetsPath is not set");return G$9(s$H.assetsPath,t)}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
l$s(a$m({pattern:"esri/",location:a$l}));

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
function e$r(e,t,r,o){var c,f=arguments.length,n=f<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,o);else for(var l=e.length-1;l>=0;l--)(c=e[l])&&(n=(f<3?c(n):f>3?c(t,r,n):c(t,r))||n);return f>3&&n&&Object.defineProperty(t,r,n),n}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
function n$k(n,t){for(const[r,o]of n)if(t(o,r))return !0;return !1}function t$p(n,t){for(const[r,o]of n)if(t(o,r))return o;return null}function r$q(n,t,r){const o=n.get(t);if(void 0!==o)return o;const u=r();return n.set(t,u),u}function o$z(n){const t=n.values().next();return !0!==t.done?t.value:null}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
const r$p=s$G.getLogger("esri.core.Accessor");function t$o(e){return null==e?e:new Date(e)}function o$y(e){return null==e?e:!!e}function u$y(e){return null==e?e:e.toString()}function a$k(e){return null==e?e:(e=parseFloat(e),isNaN(e)?0:e)}function s$x(e){return null==e?e:Math.round(parseFloat(e))}function i$t(e){return e&&e.constructor&&void 0!==e.constructor.__accessorMetadata__}function l$q(e,n){return null!=n&&e&&!(n instanceof e)}function c$w(e){return e&&"isCollection"in e}function f$r(e){return e&&e.Type?"function"==typeof e.Type?e.Type:e.Type.base:null}function p$l(e,n){if(!n||!n.constructor||!c$w(n.constructor))return y$j(e,n)?n:new e(n);const r=f$r(e.prototype.itemType),t=f$r(n.constructor.prototype.itemType);return r?t?r===t?n:r.prototype.isPrototypeOf(t.prototype)?new e(n):(y$j(e,n),n):new e(n):n}function y$j(e,n){return !!i$t(n)&&(r$p.error("Accessor#set","Assigning an instance of '"+(n.declaredClass||"unknown")+"' which is not a subclass of '"+g$i(e)+"'"),!0)}function v$d(e,n){return null==n?n:c$w(e)?p$l(e,n):l$q(e,n)?y$j(e,n)?n:new e(n):n}function g$i(e){return e&&e.prototype&&e.prototype.declaredClass||"unknown"}const d$k=new WeakMap;function h$k(e){switch(e){case Number:return a$k;case S$8:return s$x;case Boolean:return o$y;case String:return u$y;case Date:return t$o;default:return r$q(d$k,e,(()=>v$d.bind(null,e)))}}function b$9(e,n){const r=h$k(e);return 1===arguments.length?r:r(n)}function m$k(e,n,r){return 1===arguments.length?m$k.bind(null,e):n?Array.isArray(n)?n.map((n=>e(n,r))):[e(n,r)]:n}function w$c(e,n){return 1===arguments.length?m$k(b$9.bind(null,e)):m$k(b$9.bind(null,e),n)}function A$b(e,n,r){return 0!==n&&Array.isArray(r)?r.map((r=>A$b(e,n-1,r))):e(r)}function $$2(e,n,r){if(2===arguments.length)return $$2.bind(null,e,n);if(!r)return r;let t=n,o=r=A$b(e,n,r);for(;t>0&&Array.isArray(o);)t--,o=o[0];if(void 0!==o)for(let u=0;u<t;u++)r=[r];return r}function j$d(e,n,r){return 2===arguments.length?$$2(b$9.bind(null,e),n):$$2(b$9.bind(null,e),n,r)}function k$b(e){return !!Array.isArray(e)&&!e.some((n=>{const r=typeof n;return !("string"===r||"number"===r||"function"===r&&e.length>1)}))}function M$b(e,n){if(2===arguments.length)return M$b(e).call(null,n);const t=new Set,o=e.filter((e=>"function"!=typeof e)),u=e.filter((e=>"function"==typeof e));for(const r of e)"string"!=typeof r&&"number"!=typeof r||t.add(r);let a=null,s=null;return (e,n)=>{if(null==e)return e;const i=typeof e,c="string"===i||"number"===i;return c&&(t.has(e)||u.some((e=>"string"===i&&e===String||"number"===i&&e===Number)))||"object"===i&&u.some((n=>!l$q(e,n)))?e:(c&&o.length?(a||(a=o.map((e=>"string"==typeof e?`'${e}'`:`${e}`)).join(", ")),r$p.error("Accessor#set",`'${e}' is not a valid value for this property, only the following values are valid: ${a}`)):"object"==typeof e&&u.length?(s||(s=u.map((e=>g$i(e))).join(", ")),r$p.error("Accessor#set",`'${e}' is not a valid value for this property, value must be one of ${s}`)):r$p.error("Accessor#set",`'${e}' is not a valid value for this property`),n&&(n.valid=!1),null)}}function N$6(e,n){if(2===arguments.length)return N$6(e).call(null,n);const t={},o=[],u=[];for(const r in e.typeMap){const n=e.typeMap[r];t[r]=b$9(n),o.push(g$i(n)),u.push(r);}const a=()=>`'${o.join("', '")}'`,s=()=>`'${u.join("', '")}'`,c="string"==typeof e.key?n=>n[e.key]:e.key;return n=>{if(e.base&&!l$q(e.base,n))return n;if(null==n)return n;const o=c(n)||e.defaultKeyValue,u=t[o];if(!u)return r$p.error("Accessor#set",`Invalid property value, value needs to be one of ${a()}, or a plain object that can autocast (having .type = ${s()})`),null;if(!l$q(e.typeMap[o],n))return n;if("string"==typeof e.key&&!i$t(n)){const r={};for(const t in n)t!==e.key&&(r[t]=n[t]);return u(r)}return u(n)}}class S$8{}const T$8={native:e=>({type:"native",value:e}),array:e=>({type:"array",value:e}),oneOf:e=>({type:"one-of",values:e})};function _$a(e){if(!e||!("type"in e))return !1;switch(e.type){case"native":case"array":case"one-of":return !0}return !1}function B$5(e){switch(e.type){case"native":return b$9(e.value);case"array":return m$k(B$5(e.value));case"one-of":return C$6(e);default:return null}}function C$6(e){let n=null;return (t,o)=>F$6(t,e)?t:(null==n&&(n=D$8(e)),r$p.error("Accessor#set",`Invalid property value, value needs to be of type ${n}`),o&&(o.valid=!1),null)}function D$8(e){switch(e.type){case"native":switch(e.value){case Number:return "number";case String:return "string";case Boolean:return "boolean";case S$8:return "integer";case Date:return "date";default:return g$i(e.value)}case"array":return `array of ${D$8(e.value)}`;case"one-of":{const n=e.values.map((e=>D$8(e)));return `one of ${n.slice(0,n.length-1)} or ${n[n.length-1]}`}}return "unknown"}function F$6(e,n){if(null==e)return !0;switch(n.type){case"native":switch(n.value){case Number:case S$8:return "number"==typeof e;case Boolean:return "boolean"==typeof e;case String:return "string"==typeof e}return e instanceof n.value;case"array":return !!Array.isArray(e)&&!e.some((e=>!F$6(e,n.value)));case"one-of":return n.values.some((n=>F$6(e,n)))}}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
function r$o(r){return n$j((()=>r.forEach((r=>r$z(r)&&r.remove()))))}function n$j(e){return {remove:()=>{e&&(e(),e=void 0);}}}function o$x(r){return n$j((()=>{const n=r();r$z(n)&&n.remove();}))}function t$n(r){return n$j(r$z(r)?()=>r.destroy():void 0)}function u$x(e,r){const o=setTimeout(e,r);return n$j((()=>clearTimeout(o)))}function i$s(r,o){let t=!1,u=null;return r.then((e=>{t?e.remove():u=e;})),n$j((()=>{t=!0,r$z(u)?u.remove():r$z(o)&&(o.abort(),o=null);}))}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
function e$q(r){return r?r.__accessor__?r.__accessor__:r.propertyInvalidated?r:null:null}function i$r(r,n){return null!=r&&r.metadatas&&null!=r.metadatas[n]}function o$w(r,n){const t=e$q(r);return t?t.getDependsInfo(r,n,""):""}function u$w(r,n,t){if(t){return a$j(r,n,{policy:t,path:""})}return a$j(r,n,null)}function a$j(r,e,i){return e?Object.keys(e).reduce((function(r,o){let u=null,l="merge";if(i&&(u=i.path?`${i.path}.${o}`:o,l=i.policy(u)),"replace"===l)return r[o]=e[o],r;if(void 0===r[o])return r[o]=m$q(e[o]),r;let f=r[o],s=e[o];if(f===s)return r;if(Array.isArray(s)||Array.isArray(r))f=f?Array.isArray(f)?r[o]=f.concat():r[o]=[f]:r[o]=[],s&&(Array.isArray(s)||(s=[s]),s.forEach((r=>{-1===f.indexOf(r)&&f.push(r);})));else if(s&&"object"==typeof s)if(i){const n=i.path;i.path=q$9(u),r[o]=a$j(f,s,i),i.path=n;}else r[o]=a$j(f,s,null);else r.hasOwnProperty(o)&&!e.hasOwnProperty(o)||(r[o]=s);return r}),r||{}):r}function l$p(r){return r?"string"==typeof r&&-1===r.indexOf(".")?r:f$q(r):r}function f$q(r){return Array.isArray(r)?r:r.split(".")}function s$w(r){return r.indexOf(",")>-1?r.split(",").map((r=>r.trim())):[r.trim()]}function c$v(r){if(Array.isArray(r)){const n=[];for(const t of r)n.push(...s$w(t));return n}return s$w(r)}function p$k(r){if(-1===r.indexOf("?"))return null;const n=f$q(r),t=new Array(n.length);for(let e=0;e<n.length;e++){const r=n[e];t[e]="?"===r[r.length-1],t[e]&&(n[e]=r.slice(0,-1));}return {fullPath:n.join("."),conditional:t}}function y$i(n,t,e,i){const o=c$v(t);if(1!==o.length){const t=o.map((r=>i(n,r,e)));return r$o(t)}return i(n,o[0],e)}function h$j(r){let n=!1;return ()=>{n||(n=!0,r());}}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
function e$p(t,e){const i="?"===t[t.length-1]?t.slice(0,-1):t;if(null!=e.getItemAt||Array.isArray(e)){const t=parseInt(i,10);if(!isNaN(t))return Array.isArray(e)?e[t]:e.getItemAt(t)}const o=e$q(e);return i$r(o,i)?o.get(i):e[i]}function i$q(t,n,r){if(null==t)return t;const o=e$p(n[r],t);return !o&&r<n.length-1?void 0:r===n.length-1?o:i$q(o,n,r+1)}function o$v(n,r,o=0){return "string"==typeof r&&-1===r.indexOf(".")?e$p(r,n):i$q(n,f$q(r),o)}function u$v(t,n){return o$v(t,n)}function s$v(t,n){return void 0!==o$v(n,t)}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
class o$u{constructor(t){this.autoDestroy=!1,this.properties=t;}}function n$i(r){let n=r.constructor.__accessorMetadata__;const c=Object.prototype.hasOwnProperty.call(r.constructor,"__accessorMetadata__");if(n){if(!c){const e=Object.create(n.properties),c=n.autoDestroy;for(const r in e)e[r]=m$q(e[r]);n=new o$u(e),n.autoDestroy=c,Object.defineProperty(r.constructor,"__accessorMetadata__",{value:n,enumerable:!1,configurable:!0,writable:!0});}}else n=new o$u({}),Object.defineProperty(r.constructor,"__accessorMetadata__",{value:n,enumerable:!1,configurable:!0,writable:!0});return q$9(r.constructor.__accessorMetadata__)}function c$u(t){return n$i(t).properties}function s$u(t,e){const r=c$u(t);let o=r[e];return o||(o=r[e]={}),o}function a$i(t,e,r){c$u(t)[e]=r;}function u$u(t,e){return u$w(t,e,f$p)}function i$p(t,e){return u$w(t,e,_$9)}const p$j=/^(?:[^.]+\.)?(?:value|type|(?:json\.type|json\.origins\.[^.]\.type))$/;function _$9(t){return p$j.test(t)?"replace":"merge"}const l$o=/^properties\./;function f$p(t){return l$o.test(t)?_$9(t.slice(11)):"merge"}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
function n$h(o,r,t){if(o&&r)if("object"==typeof r)for(const e of Object.getOwnPropertyNames(r))n$h(o,e,r[e]);else {if(-1!==r.indexOf(".")){const s=r.split("."),i=s.splice(s.length-1,1)[0];return void n$h(u$v(o,s),i,t)}const i=o.__accessor__;null!=i&&s$t(r,i),o[r]=t;}}function s$t(t,e){if(r$x("esri-unknown-property-errors")&&!i$o(t,e))throw new s$D("set:unknown-property",c$t(t,e))}function i$o(o,r){return null!=r.metadatas[o]}function c$t(o,r){return "setting unknown property '"+o+"' on instance of "+r.host.declaredClass}s$G.getLogger("esri.core.accessorSupport.set");

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
function d$j(n={}){return (o,i)=>{if(o===Function.prototype)throw new Error(`Inappropriate use of @property() on a static field: ${o.name}.${i}. Accessor does not support static properties.`);const s=Object.getOwnPropertyDescriptor(o,i),a=s$u(o,i);s&&(s.get||s.set?(a.get=s.get||a.get,a.set=s.set||a.set):"value"in s&&("value"in n&&s$G.getLogger("esri.core.accessorSupport.decorators.property").warn(`@property() will redefine the value of "${i}" on "${o.constructor.name}" already defined in the metadata`,n),a.value=n.value=s.value)),null!=n.readOnly&&(a.readOnly=n.readOnly);const c=n.aliasOf;if(c){const t="string"==typeof c?c:c.source,e="string"==typeof c?null:!0===c.overridable;let r;a.dependsOn=[t],a.get=function(){let e=u$v(this,t);if("function"==typeof e){r||(r=t.split(".").slice(0,-1).join("."));const n=u$v(this,r);n&&(e=e.bind(n));}return e},a.readOnly||(a.set=e?function(t){void 0!==t?this._override(i,t):this._clearOverride(i);}:function(e){n$h(this,t,e);});}const p=n.type,u=n.types;a.cast||(p?a.cast=h$i(p):u&&(Array.isArray(u)?a.cast=m$k(N$6(u[0])):a.cast=N$6(u))),n.range&&(a.cast=v$c(a.cast,n.range)),i$p(a,n);}}function y$h(t,e,r){const n=s$u(t,r);n.json||(n.json={});let o=n.json;return void 0!==e&&(o.origins||(o.origins={}),o.origins[e]||(o.origins[e]={}),o=o.origins[e]),o}function h$i(t){let e=0,r=t;if(_$a(t))return B$5(t);for(;Array.isArray(r)&&1===r.length&&"string"!=typeof r[0]&&"number"!=typeof r[0];)r=r[0],e++;const l=r;if(k$b(l))return 0===e?M$b(l):$$2(M$b(l),e);if(1===e)return w$c(l);if(e>1)return j$d(l,e);const f=t;return f.from?f.from:b$9(f)}function v$c(t,e){return r=>{let n=+t(r);return null!=e.step&&(n=Math.round(n/e.step)*e.step),null!=e.min&&(n=Math.max(e.min,n)),null!=e.max&&(n=Math.min(e.max,n)),n}}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
const o$t=Object.prototype.toString;function r$n(n){const o="__accessorMetadata__"in n?b$9(n):n;return function(...t){if(t.push(o),"number"==typeof t[2])throw new Error("Using @cast has parameter decorator is not supported since 4.16");return e$o.apply(this,t)}}function e$o(t,o,r,e){s$u(t,o).cast=e;}function i$n(t){return function(o,r){s$u(o,t).cast=o[r];}}function c$s(...t){if(3!==t.length||"string"!=typeof t[1])return 1===t.length&&"[object Function]"===o$t.call(t[0])?r$n(t[0]):1===t.length&&"string"==typeof t[0]?i$n(t[0]):void 0}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
function o$s(o,e,t){let a,c;return void 0===e||Array.isArray(e)?(c=o,t=e,a=[void 0]):(c=e,a=Array.isArray(o)?o:[o]),(o,e)=>{const d=o.constructor.prototype;a.forEach((a=>{const s=y$h(o,a,c);s.read&&"object"==typeof s.read||(s.read={}),s.read.reader=d[e],t&&(s.read.source=(s.read.source||[]).concat(t));}));}}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
var I$9;!function(I){I[I.INITIALIZING=0]="INITIALIZING",I[I.CONSTRUCTING=1]="CONSTRUCTING",I[I.CONSTRUCTED=2]="CONSTRUCTED";}(I$9||(I$9={}));

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
var i$m;!function(i){i[i.Dirty=1]="Dirty",i[i.Overriden=2]="Overriden",i[i.Computing=4]="Computing",i[i.NonNullable=8]="NonNullable",i[i.HasDefaultValue=16]="HasDefaultValue",i[i.DepTrackingInitialized=32]="DepTrackingInitialized",i[i.AutoTracked=64]="AutoTracked",i[i.ExplicitlyTracking=128]="ExplicitlyTracking";}(i$m||(i$m={}));

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
let e$n,i$l=[];const c$r=s$G.getLogger("esri.core.Accessor");function s$s(){i$l=[];}function l$n(t){void 0!==e$n&&e$n.onObservableAccessed(t);}let a$h=!1,f$o=!1;function g$h(t,n,r){if(a$h)return p$i(t,n,r);d$i(t);const o=n.call(r);return m$j(),o}function u$t(t,n){return g$h(void 0,t,n)}function p$i(t,n,r){const o=a$h;a$h=!0,d$i(t);let e=null;try{e=n.call(r);}catch(i){f$o&&c$r.error(i);}return m$j(),a$h=o,e}function d$i(t){e$n=t,i$l.push(t);}function m$j(){const t=i$l.pop();e$n=i$l.length>0?i$l[i$l.length-1]:void 0,void 0!==t&&t.onTrackingEnd();}function y$g(t,n){if(n.flags&i$m.DepTrackingInitialized)return;const r=f$o;f$o=!1,n.flags&i$m.AutoTracked?p$i(n,n.metadata.get,t):h$h(t,n),f$o=r;}const A$a=[];function h$h(t,r){r.flags&i$m.ExplicitlyTracking||(r.flags|=i$m.ExplicitlyTracking,p$i(r,(()=>{const o=r.metadata.dependsOn||A$a;for(const r of o)if("string"==typeof r&&-1===r.indexOf("."))k$a(t,r,!1);else {const o=f$q(r);for(let n=0,r=t;n<o.length&&null!=r&&"object"==typeof r;++n)r=k$a(r,o[n],n!==o.length-1);}})),r.flags&=~i$m.ExplicitlyTracking);}function k$a(t,n,o){const e="?"===n[n.length-1]?n.slice(0,-1):n;if(null!=t.getItemAt||Array.isArray(t)){const n=parseInt(e,10);if(!isNaN(n))return Array.isArray(t)?t[n]:t.getItemAt(n)}const i=e$q(t),c=null==i?void 0:i.properties.get(e);return c&&(l$n(c),y$g(t,c)),o?t[e]:void 0}

const global$1 = (typeof global !== "undefined" ? global :
  typeof self !== "undefined" ? self :
  typeof window !== "undefined" ? window : {});

// shim for using process in browser
// based off https://github.com/defunctzombie/node-process/blob/master/browser.js

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
var cachedSetTimeout = defaultSetTimout;
var cachedClearTimeout = defaultClearTimeout;
if (typeof global$1.setTimeout === 'function') {
    cachedSetTimeout = setTimeout;
}
if (typeof global$1.clearTimeout === 'function') {
    cachedClearTimeout = clearTimeout;
}

function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}
function nextTick(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
}
// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
var title = 'browser';
var platform = 'browser';
var browser = true;
var env = {};
var argv = [];
var version = ''; // empty string to avoid regexp issues
var versions = {};
var release = {};
var config = {};

function noop() {}

var on$1 = noop;
var addListener = noop;
var once = noop;
var off = noop;
var removeListener = noop;
var removeAllListeners = noop;
var emit = noop;

function binding(name) {
    throw new Error('process.binding is not supported');
}

function cwd () { return '/' }
function chdir (dir) {
    throw new Error('process.chdir is not supported');
}function umask() { return 0; }

// from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
var performance$1 = global$1.performance || {};
var performanceNow =
  performance$1.now        ||
  performance$1.mozNow     ||
  performance$1.msNow      ||
  performance$1.oNow       ||
  performance$1.webkitNow  ||
  function(){ return (new Date()).getTime() };

// generate timestamp or delta
// see http://nodejs.org/api/process.html#process_process_hrtime
function hrtime(previousTimestamp){
  var clocktime = performanceNow.call(performance$1)*1e-3;
  var seconds = Math.floor(clocktime);
  var nanoseconds = Math.floor((clocktime%1)*1e9);
  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];
    if (nanoseconds<0) {
      seconds--;
      nanoseconds += 1e9;
    }
  }
  return [seconds,nanoseconds]
}

var startTime = new Date();
function uptime() {
  var currentTime = new Date();
  var dif = currentTime - startTime;
  return dif / 1000;
}

var browser$1 = {
  nextTick: nextTick,
  title: title,
  browser: browser,
  env: env,
  argv: argv,
  version: version,
  versions: versions,
  on: on$1,
  addListener: addListener,
  once: once,
  off: off,
  removeListener: removeListener,
  removeAllListeners: removeAllListeners,
  emit: emit,
  binding: binding,
  cwd: cwd,
  chdir: chdir,
  umask: umask,
  hrtime: hrtime,
  platform: platform,
  release: release,
  config: config,
  uptime: uptime
};

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
function n$g(n){if(n.json&&n.json.origins){const o=n.json.origins,e={"web-document":["web-scene","web-map"]};for(const n in e)if(o[n]){const s=o[n];e[n].forEach((n=>{o[n]=s;})),delete o[n];}}}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
class t$m extends s$E{constructor(e,s,r){if(super(e,s,r),!(this instanceof t$m))return new t$m(e,s,r)}}t$m.prototype.type="warning";

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
function e$m(e){return !!e&&e.prototype&&e.prototype.declaredClass&&0===e.prototype.declaredClass.indexOf("esri.core.Collection")}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
const i$k=s$G.getLogger("esri.core.accessorSupport.extensions.serializableProperty.reader");function p$h(t,r,n){var o,i;t&&(!n&&!r.read||null!=(o=r.read)&&o.reader||!1===(null==(i=r.read)?void 0:i.enabled)||d$h(t)&&o$J("read.reader",u$s(t),r));}function u$s(t){var e;const r=null!=(e=t.ndimArray)?e:0;if(r>1)return c$q(t);if(1===r)return a$g(t);if("type"in t&&l$m(t.type)){var n,o;const e=null==(n=t.type.prototype)||null==(o=n.itemType)?void 0:o.Type,r=a$g("function"==typeof e?{type:e}:{types:e});return (e,n,o)=>{const i=r(e,n,o);return i?new t.type(i):i}}return s$r(t)}function s$r(t){return "type"in t?y$f(t.type):j$c(t.types)}function y$f(t){return t.prototype.read?(e,r,n)=>{if(null==e)return e;const o=typeof e;if("object"!==o)return void i$k.error(`Expected JSON value of type 'object' to deserialize type '${t.prototype.declaredClass}', but got '${o}'`);const p=new t;return p.read(e,n),p}:t.fromJSON}function f$n(t,e,r,n){return 0!==n&&Array.isArray(e)?e.map((e=>f$n(t,e,r,n-1))):t(e,void 0,r)}function c$q(t){var e;const r=s$r(t),n=f$n.bind(null,r),o=null!=(e=t.ndimArray)?e:0;return (t,e,r)=>{if(null==t)return t;t=n(t,r,o);let i=o,p=t;for(;i>0&&Array.isArray(p);)i--,p=p[0];if(void 0!==p)for(let n=0;n<i;n++)t=[t];return t}}function a$g(t){const e=s$r(t);return (t,r,n)=>{if(null==t)return t;if(Array.isArray(t)){const r=[];for(const o of t){const t=e(o,void 0,n);void 0!==t&&r.push(t);}return r}const o=e(t,void 0,n);return void 0!==o?[o]:void 0}}function l$m(t){if(!e$m(t))return !1;const e=t.prototype.itemType;return !(!e||!e.Type)&&("function"==typeof e.Type?v$b(e.Type):m$i(e.Type))}function d$h(t){return "types"in t?m$i(t.types):v$b(t.type)}function v$b(t){return !Array.isArray(t)&&(!!t&&t.prototype&&("read"in t.prototype||"fromJSON"in t||l$m(t)))}function m$i(t){for(const e in t.typeMap){if(!v$b(t.typeMap[e]))return !1}return !0}function j$c(t){var e;let n=null;const o=null!=(e=t.errorContext)?e:"type";return (e,p,u)=>{if(null==e)return e;const s=typeof e;if("object"!==s)return void i$k.error(`Expected JSON value of type 'object' to deserialize, but got '${s}'`);n||(n=g$g(t));const y=t.key;if("string"!=typeof y)return;const f=e[y],c=f?n[f]:t.defaultKeyValue?t.typeMap[t.defaultKeyValue]:void 0;if(!c){const t=`Type '${f||"unknown"}' is not supported`;return u&&u.messages&&e&&u.messages.push(new t$m(`${o}:unsupported`,t,{definition:e,context:u})),void i$k.error(t)}const a=new c;return a.read(e,u),a}}function g$g(t){const e={};for(const i in t.typeMap){var r,o;const p=t.typeMap[i],u=n$i(p.prototype);if("function"==typeof t.key)continue;const s=u.properties[t.key];if(!s)continue;null!=(r=s.json)&&r.type&&Array.isArray(s.json.type)&&1===s.json.type.length&&"string"==typeof s.json.type[0]&&(e[s.json.type[0]]=p);const y=null==(o=s.json)?void 0:o.write;if(!y||!y.writer){e[i]=p;continue}const f=y.target,c="string"==typeof f?f:t.key,a={};y.writer(i,a,c),a[c]&&(e[a[c]]=p);}return e}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
function e$l(e){if(e.json||(e.json={}),o$r(e.json),n$f(e.json),r$m(e.json),e.json.origins)for(const t in e.json.origins)o$r(e.json.origins[t]),n$f(e.json.origins[t]),r$m(e.json.origins[t]);return !0}function r$m(e){e.name&&(e.read&&"object"==typeof e.read?void 0===e.read.source&&(e.read.source=e.name):e.read={source:e.name},e.write&&"object"==typeof e.write?void 0===e.write.target&&(e.write.target=e.name):e.write={target:e.name});}function o$r(e){"boolean"==typeof e.read?e.read={enabled:e.read}:"function"==typeof e.read?e.read={enabled:!0,reader:e.read}:e.read&&"object"==typeof e.read&&void 0===e.read.enabled&&(e.read.enabled=!0);}function n$f(e){"boolean"==typeof e.write?e.write={enabled:e.write}:"function"==typeof e.write?e.write={enabled:!0,writer:e.write}:e.write&&"object"==typeof e.write&&void 0===e.write.enabled&&(e.write.enabled=!0);}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
const i$j=s$G.getLogger("esri.core.accessorSupport.extensions.serializableProperty.writer");function o$q(r,t){var e;if(!t.write||t.write.writer||!1===t.write.enabled&&!t.write.overridePolicy)return;const i=null!=(e=null==r?void 0:r.ndimArray)?e:0;r&&(1===i||"type"in r&&e$m(r.type))?t.write.writer=a$f:i>1?t.write.writer=w$b(i):t.types?Array.isArray(t.types)?t.write.writer=s$q(t.types[0]):t.write.writer=u$r(t.types):t.write.writer=l$l;}function u$r(r){return (t,e,n,i)=>t?f$m(t,r,i)?l$l(t,e,n,i):void 0:l$l(t,e,n,i)}function f$m(t,e,n){for(const r in e.typeMap)if(t instanceof e.typeMap[r])return !0;if(null!=n&&n.messages){var o,u;const f=null!=(o=e.errorContext)?o:"type",s=`Values of type '${null!=(u="function"!=typeof e.key?t[e.key]:t.declaredClass)?u:"Unknown"}' cannot be written`;n&&n.messages&&t&&n.messages.push(new s$D(`${f}:unsupported`,s,{definition:t,context:n})),i$j.error(s);}return !1}function s$q(r){return (t,e,n,i)=>{if(!t||!Array.isArray(t))return l$l(t,e,n,i);return l$l(t.filter((t=>f$m(t,r,i))),e,n,i)}}function l$l(r,t,n,i){o$J(n,p$g(r,i),t);}function p$g(r,t){return r&&"function"==typeof r.write?r.write({},t):r&&"function"==typeof r.toJSON?r.toJSON():"number"==typeof r?y$e(r):r}function y$e(r){return r===-1/0?-Number.MAX_VALUE:r===1/0?Number.MAX_VALUE:isNaN(r)?null:r}function a$f(r,t,n,i){let o;null===r?o=null:r&&"function"==typeof r.map?(o=r.map((r=>p$g(r,i))),"function"==typeof o.toArray&&(o=o.toArray())):o=[p$g(r,i)],o$J(n,o,t);}function c$p(r,t,e){return 0!==e&&Array.isArray(r)?r.map((r=>c$p(r,t,e-1))):p$g(r,t)}function w$b(r){return function(t,n,i,o){let u;if(null===t)u=null;else {u=c$p(t,o,r);let e=r,n=u;for(;e>0&&Array.isArray(n);)e--,n=n[0];if(void 0!==n)for(let r=0;r<e;r++)u=[u];}o$J(i,u,n);}}

function o$p(r,n){return a$e(r,"read",n)}function s$p(r,n){return a$e(r,"write",n)}function a$e(r,n,e){let t=r&&r.json;if(r&&r.json&&r.json.origins&&e){const i=r.json.origins[e.origin];i&&("any"===n||n in i)&&(t=i);}return t}function p$f(r){const n=y$d(r);if(r.json.origins)for(const t in r.json.origins){const o=r.json.origins[t],s=o.types?f$l(o):n;p$h(s,o,!1),o.types&&!o.write&&r.json.write&&r.json.write.enabled&&(o.write={...r.json.write}),o$q(s,o);}p$h(n,r.json,!0),o$q(n,r.json);}function y$d(r){return r.json.types?u$q(r.json):r.type?j$b(r):u$q(r)}function f$l(r){return r.type?j$b(r):u$q(r)}function j$b(n){if(!n.type)return;let e=0,t=n.type;for(;Array.isArray(t)&&!k$b(t);)t=t[0],e++;return {type:t,ndimArray:e}}function u$q(r){if(!r.types)return;let n=0,e=r.types;for(;Array.isArray(e);)e=e[0],n++;return {types:e,ndimArray:n}}function c$o(r){e$l(r)&&(n$g(r),p$f(r));}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
const s$o=new Set,i$i=new Set;function n$e(e){return r=>{r.prototype.declaredClass=e,c$n(r);const o=[],n=[];let a=r.prototype;for(;a;)a.hasOwnProperty("initialize")&&!s$o.has(a.initialize)&&(s$o.add(a.initialize),o.push(a.initialize)),a.hasOwnProperty("destroy")&&!i$i.has(a.destroy)&&(i$i.add(a.destroy),n.push(a.destroy)),a=Object.getPrototypeOf(a);s$o.clear(),i$i.clear();class l extends r{constructor(...e){if(super(...e),this.constructor===l&&"function"==typeof this.postscript){if(o.length&&Object.defineProperty(this,"initialize",{enumerable:!1,configurable:!0,value(){for(let e=o.length-1;e>=0;e--)o[e].call(this);}}),n.length){let e=!1;Object.defineProperty(this,"destroy",{enumerable:!1,configurable:!0,value(){if(!e){e=!0;for(let e=0;e<n.length;e++)n[e].call(this);}}});}this.postscript(...e);}}}return l.__accessorMetadata__=n$i(r.prototype),l.prototype.declaredClass=e,l}}function a$d(e,t){return null==t.get?function(){const t=this.__accessor__.properties.get(e);if(void 0===t)return;l$n(t);const o=this.__accessor__.store;return o.has(e)?o.get(e):t.metadata.value}:function(){const t=this.__accessor__.properties.get(e);if(void 0!==t)return t.getComputed()}}function c$n(r){const s=r.prototype,i=n$i(s).properties,n={};for(const t of Object.getOwnPropertyNames(i)){const r=i[t];c$o(r),n[t]={enumerable:!0,configurable:!0,get:a$d(t,r),set(o){const s=this.__accessor__;if(void 0!==s){if(!Object.isFrozen(this)){if(s.initialized&&r.readOnly)throw new TypeError(`[accessor] cannot assign to read-only property '${t}' of ${this.declaredClass}`);if(s.lifecycle===I$9.CONSTRUCTED&&r.constructOnly)throw new TypeError(`[accessor] cannot assign to construct-only property '${t}' of ${this.declaredClass}`);s.set(t,o);}}else Object.defineProperty(this,t,{enumerable:!0,configurable:!0,writable:!0,value:o});}};}Object.defineProperties(r.prototype,n);}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
function r$l(r,o,e){let i,n;return void 0===o?(n=r,i=[void 0]):"string"!=typeof o?(n=r,i=[void 0],e=o):(n=o,i=Array.isArray(r)?r:[r]),(r,o)=>{const p=r.constructor.prototype;for(const c of i){const i=y$h(r,c,n);i.write&&"object"==typeof i.write||(i.write={}),e&&(i.write.target=e),i.write.writer=p[o];}}}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
const e$k=new Set;function i$h(n,i,o=!1){o&&e$k.has(i)||(o&&e$k.add(i),n.warn(`🛑 DEPRECATED - ${i}`));}function o$o(e,i,o={}){r$x("esri-deprecation-warnings")&&s$n(e,`Module: ${i}`,o);}function t$l(e,i,o={}){if(r$x("esri-deprecation-warnings")){const{moduleName:n}=o;s$n(e,`Function: ${(n?n+"::":"")+i+"()"}`,o);}}function r$k(e,i,o={}){if(r$x("esri-deprecation-warnings")){const{moduleName:n}=o;s$n(e,`Property: ${(n?n+"::":"")+i}`,o);}}function s$n(e,o,t={}){if(r$x("esri-deprecation-warnings")){const{replacement:n,version:r,see:s,warnOnce:a}=t;let c=o;n&&(c+=`\n\t🛠️ Replacement: ${n}`),r&&(c+=`\n\t⚙️ Version: ${r}`),s&&(c+=`\n\t🔗 See ${s} for more details.`),i$h(e,c,a);}}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
function t$k(t){return t&&t.release&&"function"==typeof t.release}function i$g(t){return t&&t.acquire&&"function"==typeof t.acquire}class e$j{constructor(t,i,e,o=1,s=0){if(this.ctor=t,this.acquireFunction=i,this.releaseFunction=e,this.allocationSize=o,this._pool=new Array(s),this._initialSize=s,this.ctor)for(let n=0;n<s;n++)this._pool[n]=new this.ctor;this.allocationSize=Math.max(o,1);}destroy(){this.prune(0);}acquire(...t){let o;if(e$j.test.disabled)o=new this.ctor;else {if(0===this._pool.length){const t=this.allocationSize;for(let i=0;i<t;i++)this._pool[i]=new this.ctor;}o=this._pool.pop();}return this.acquireFunction?this.acquireFunction(o,...t):i$g(o)&&o.acquire(...t),o}release(i){i&&!e$j.test.disabled&&(this.releaseFunction?this.releaseFunction(i):t$k(i)&&i.release(),this._pool.push(i));}prune(t=this._initialSize){if(!(t>=this._pool.length)){for(let i=t;i<this._pool.length;++i){const t=this._pool[i];this._dispose(t);}this._pool.length=t;}}_dispose(t){t.dispose&&"function"==typeof t.dispose&&t.dispose();}}e$j.test={disabled:!1};

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
var r$j;!function(e){e[e.DEFAULTS=0]="DEFAULTS",e[e.COMPUTED=1]="COMPUTED",e[e.SERVICE=2]="SERVICE",e[e.PORTAL_ITEM=3]="PORTAL_ITEM",e[e.WEB_SCENE=4]="WEB_SCENE",e[e.WEB_MAP=5]="WEB_MAP",e[e.USER=6]="USER";}(r$j||(r$j={}));const E$8=r$j.USER+1;function t$j(e){switch(e){case"defaults":return r$j.DEFAULTS;case"service":return r$j.SERVICE;case"portal-item":return r$j.PORTAL_ITEM;case"web-scene":return r$j.WEB_SCENE;case"web-map":return r$j.WEB_MAP;case"user":return r$j.USER}}function n$d(E){switch(E){case r$j.DEFAULTS:return "defaults";case r$j.SERVICE:return "service";case r$j.PORTAL_ITEM:return "portal-item";case r$j.WEB_SCENE:return "web-scene";case r$j.WEB_MAP:return "web-map";case r$j.USER:return "user"}return q$9(void 0)}function u$p(e){return t$j(e)}function c$m(e){return n$d(e)}function s$m(e){return t$j(e)}function a$c(e){return n$d(e)}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
class s$l{constructor(r,s){this._observers=r,this._observer=s;}remove(){C$a(this._observers,this._observer);}}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
class o$n{constructor(t,s,e){this.properties=t,this.propertyName=s,this.metadata=e,this._observers=null,this._accessed=null,this._handles=null,this.flags=i$m.Dirty|(e.nonNullable?i$m.NonNullable:0)|(e.hasOwnProperty("value")?i$m.HasDefaultValue:0)|(void 0===e.get?i$m.DepTrackingInitialized:0)|(void 0===e.dependsOn?i$m.AutoTracked:0);}destroy(){this._accessed=null,this._observers=null,this._clearObservationHandles();}getComputed(){l$n(this);const l=this.properties.store,o=this.propertyName,a=this.flags,h=l.get(o);if(a&i$m.Computing)return h;if(~a&i$m.Dirty&&l.has(o))return h;this.flags|=i$m.Computing;const d=this.properties.host;let c;a&i$m.AutoTracked?c=g$h(this,this.metadata.get,d):(h$h(d,this),c=this.metadata.get.call(d)),l.set(o,c,r$j.COMPUTED);const u=l.get(o);return u===h?this.flags&=~i$m.Dirty:u$t(this.commit,this),this.flags&=~i$m.Computing,u}onObservableAccessed(t){t!==this&&(null===this._accessed&&(this._accessed=[]),this._accessed.includes(t)||this._accessed.push(t));}onTrackingEnd(){this._clearObservationHandles(),this.flags|=i$m.DepTrackingInitialized;const t=this._accessed;if(null===t)return;let s=this._handles;null===s&&(s=this._handles=[]);for(let e=0;e<t.length;++e)s.push(t[e].observe(this));t.length=0;}observe(t){return null===this._observers&&(this._observers=[]),this._observers.includes(t)||this._observers.push(t),new s$l(this._observers,t)}notifyChange(){this.onInvalidated(),this.onCommitted();}invalidate(){this.onInvalidated();}onInvalidated(){~this.flags&i$m.Overriden&&(this.flags|=i$m.Dirty);const t=this._observers;if(null!==t)for(let s=0;s<t.length;++s)t[s].onInvalidated();}commit(){this.flags&=~i$m.Dirty,this.onCommitted();}onCommitted(){if(null===this._observers)return;const t=this._observers.slice();for(let s=0;s<t.length;++s)t[s].onCommitted();}_clearObservationHandles(){const t=this._handles;if(null!==t){for(let s=0;s<t.length;++s)t[s].remove();t.length=0;}}}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
class t$i{constructor(){this._values=new Map,this.multipleOriginsSupported=!1;}clone(s){const r=new t$i;return this._values.forEach(((t,i)=>{s&&s.has(i)||r.set(i,m$q(t));})),r}get(e){return this._values.get(e)}originOf(){return r$j.USER}keys(){return [...this._values.keys()]}set(e,s){this._values.set(e,s);}delete(e){this._values.delete(e);}has(e){return this._values.has(e)}forEach(e){this._values.forEach(e);}}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
function d$g(t,e,s){return void 0!==t}function g$f(t,e,s,r){return void 0!==t&&(!(null==s&&t.flags&i$m.NonNullable)||(r.lifecycle,I$9.INITIALIZING,!1))}function m$h(t){return t&&"function"==typeof t.destroy}s$G.getLogger("esri.core.accessorSupport.Properties");class v$a{constructor(t){this.host=t,this.properties=new Map,this.ctorArgs=null,this.destroyed=!1,this.lifecycle=I$9.INITIALIZING,this.store=new t$i,this._origin=r$j.USER;const e=this.host.constructor.__accessorMetadata__,s=e.properties;for(const i in s){const t=new o$n(this,i,s[i]);this.properties.set(i,t);}this.metadatas=s,this._autoDestroy=e.autoDestroy;}initialize(){this.lifecycle=I$9.CONSTRUCTING;}constructed(){this.lifecycle=I$9.CONSTRUCTED;}destroy(){if(this.destroyed=!0,this._autoDestroy)for(const[t,e]of this.properties){const s=this.internalGet(t);s&&m$h(s)&&(s.destroy(),~e.flags&i$m.NonNullable&&this._internalSet(e,null)),e.destroy();}else for(const[t,e]of this.properties)e.destroy();}get initialized(){return this.lifecycle!==I$9.INITIALIZING}get(t){const e=this.properties.get(t);if(e.metadata.get)return e.getComputed();l$n(e);const s=this.store;return s.has(t)?s.get(t):e.metadata.value}originOf(t){const e=this.store.originOf(t);if(void 0===e){const e=this.properties.get(t);if(void 0!==e&&e.flags&i$m.HasDefaultValue)return "defaults"}return n$d(e)}has(t){return !!this.properties.has(t)&&this.store.has(t)}keys(){return [...this.properties.keys()]}internalGet(t){const e=this.properties.get(t);if(d$g(e))return this.store.has(t)?this.store.get(t):e.metadata.value}internalSet(t,e){const s=this.properties.get(t);d$g(s)&&this._internalSet(s,e);}getDependsInfo(t,e,s){const i=this.properties.get(e);if(!d$g(i))return "";const o=new Set,n=g$h({onObservableAccessed:t=>o.add(t),onTrackingEnd:()=>{}},(()=>{var e;return null==(e=i.metadata.get)?void 0:e.call(t)}));let a=`${s}${t.declaredClass.split(".").pop()}.${e}: ${n}\n`;if(0===o.size)return a;s+="  ";for(const l of o){if(!(l instanceof o$n))continue;const t=l.properties.host,e=l.propertyName,i=e$q(t);a+=i?i.getDependsInfo(t,e,s):`${s}${e}: undefined\n`;}return a}setAtOrigin(t,e,s){const i=this.properties.get(t);if(d$g(i))return this._setAtOrigin(i,e,s)}isOverridden(t){const e=this.properties.get(t);return void 0!==e&&!!(e.flags&i$m.Overriden)}clearOverride(t){const e=this.properties.get(t);void 0!==e&&e.flags&i$m.Overriden&&(e.flags&=~i$m.Overriden,e.notifyChange());}override(t,e){const s=this.properties.get(t);if(!g$f(s,t,e,this))return;const i=s.metadata.cast;if(i){const t=this._cast(i,e),{valid:s,value:r}=t;if(I$8.release(t),!s)return;e=r;}s.flags|=i$m.Overriden,this._internalSet(s,e);}set(t,e){const s=this.properties.get(t);if(!g$f(s,t,e,this))return;const i=s.metadata.cast;if(i){const t=this._cast(i,e),{valid:s,value:r}=t;if(I$8.release(t),!s)return;e=r;}const r=s.metadata.set;r?r.call(this.host,e):this._internalSet(s,e);}setDefaultOrigin(t){this._origin=t$j(t);}getDefaultOrigin(){return n$d(this._origin)}notifyChange(t){const e=this.properties.get(t);void 0!==e&&e.notifyChange();}invalidate(t){const e=this.properties.get(t);void 0!==e&&e.invalidate();}commit(t){const e=this.properties.get(t);void 0!==e&&e.commit();}_internalSet(t,e){const s=this.lifecycle!==I$9.INITIALIZING?this._origin:r$j.DEFAULTS;this._setAtOrigin(t,e,s);}_setAtOrigin(e,s,i){const r=this.store,o=e.propertyName;r.has(o,i)&&w$f(s,r.get(o))&&~e.flags&i$m.Overriden&&i===r.originOf(o)||(e.invalidate(),r.set(o,s,i),e.commit(),y$g(this.host,e));}_cast(t,e){const s=I$8.acquire();return s.valid=!0,s.value=e,t&&(s.value=t.call(this.host,e,s)),s}}class y$c{constructor(){this.value=null,this.valid=!0;}acquire(){this.valid=!0;}release(){this.value=null;}}const I$8=new e$j(y$c);

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
function r$i(e){e.length=0;}class t$h{constructor(t=50,o=50){this._pool=new e$j(Array,void 0,r$i,o,t);}acquire(){return this._pool.acquire()}release(e){this._pool.release(e);}prune(){this._pool.prune(0);}static acquire(){return o$m.acquire()}static release(e){return o$m.release(e)}static prune(){o$m.prune();}}const o$m=new t$h(100);

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
class t$g extends e$j{constructor(){super(...arguments),this._set=new Set;}destroy(){super.destroy(),this._set=y$q(this._set);}acquire(...e){const s=super.acquire(...e);return this._set.delete(s),s}release(e){e&&!this._set.has(e)&&(super.release(e),this._set.add(e));}_dispose(e){this._set.delete(e),super._dispose(e);}}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
const o$l=[];function t$f(t){o$l.push(t),1===o$l.length&&queueMicrotask((()=>{const t=o$l.slice();o$l.length=0;for(const o of t)o();}));}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
const t$e=29;class e$i{constructor(e,s=t$e){this.name=e,this._counter=0,this._items=new Array(s);}record(t){this._items[++this._counter%this._items.length]=t;}get median(){return this._items.slice().sort(((t,e)=>t-e))[Math.floor(this._items.length/2)]}get average(){return this._items.reduce(((t,e)=>t+e),0)/this._items.length}get last(){return this._items[this._counter%this._items.length]}}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
var o$k;!function(o){const t=(o,t,n,e)=>{let i=t,c=t;const l=n>>>1,r=o[i-1];for(;c<=l;){c=i<<1,c<n&&e(o[c-1],o[c])<0&&++c;const t=o[c-1];if(e(t,r)<=0)break;o[i-1]=t,i=c;}o[i-1]=r;},n=(o,t)=>o<t?-1:o>t?1:0;function e(o,e,i,c){void 0===e&&(e=0),void 0===i&&(i=o.length),void 0===c&&(c=n);for(let n=i>>>1;n>e;n--)t(o,n,i,c);const l=e+1;for(let n=i-1;n>e;n--){const i=o[e];o[e]=o[n],o[n]=i,t(o,l,n,c);}}function*i(o,e,i,c){void 0===e&&(e=0),void 0===i&&(i=o.length),void 0===c&&(c=n);for(let n=i>>>1;n>e;n--)t(o,n,i,c),yield;const l=e+1;for(let n=i-1;n>e;n--){const i=o[e];o[e]=o[n],o[n]=i,t(o,l,n,c),yield;}}o.sort=e,o.iterableSort=i;}(o$k||(o$k={}));const t$d=o$k;

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
const e$h=1.5,l$k=1.1;class n$c{constructor(h){this.data=[],this._length=0,this._allocator=void 0,this._deallocator=()=>null,this._shrink=()=>{},this._hint=new w$g,h&&(h.initialSize&&(this.data=new Array(h.initialSize)),h.allocator&&(this._allocator=h.allocator),void 0!==h.deallocator&&(this._deallocator=h.deallocator),h.shrink&&(this._shrink=()=>r$h(this)));}toArray(){return this.data.slice(0,this.length)}filter(t){const h=new Array;for(let i=0;i<this._length;i++){const s=this.data[i];t(s)&&h.push(s);}return h}getItemAt(t){if(!(t<0||t>=this._length))return this.data[t]}get length(){return this._length}set length(t){if(t>this._length){if(this._allocator){for(;this._length<t;)this.data[this._length++]=this._allocator(this.data[this._length]);return}this._length=t;}else {if(this._deallocator)for(let h=t;h<this._length;++h)this.data[h]=this._deallocator(this.data[h]);this._length=t,this._shrink();}}clear(){this.length=0;}prune(){this.clear(),this.data=[];}push(t){this.data[this._length++]=t;}pushArray(t,h=t.length){for(let i=0;i<h;i++)this.data[this._length++]=t[i];}fill(t,h){for(let i=0;i<h;i++)this.data[this._length++]=t;}pushNew(){this._allocator&&(this.data[this.length]=this._allocator(this.data[this.length]));const t=this.data[this._length];return ++this._length,t}unshift(t){this.data.unshift(t),this._length++,r$h(this);}pop(){if(0===this.length)return;const t=this.data[this.length-1];return this.length=this.length-1,this._shrink(),t}remove(t){const i=b$e(this.data,t,this.length,this._hint);if(-1!==i)return this.data.splice(i,1),this.length=this.length-1,t}removeUnordered(t){const h=v$h(this.data,t,this.length,this._hint);return void 0!==h&&(this.length=this.length-1),this._shrink(),h}removeUnorderedIndex(t){if(!(t>=this.length||t<0))return this.swapElements(t,this.length-1),this.pop()}removeUnorderedMany(t,h=t.length,i){this.length=O$a(this.data,t,this.length,h,this._hint,i),this._shrink();}front(){if(0!==this.length)return this.data[0]}back(){if(0!==this.length)return this.data[this.length-1]}swapElements(t,h){t>=this.length||h>=this.length||t===h||([this.data[t],this.data[h]]=[this.data[h],this.data[t]]);}sort(t){t$d.sort(this.data,0,this.length,t);}iterableSort(t){return t$d.iterableSort(this.data,0,this.length,t)}some(t,h){for(let i=0;i<this.length;++i)if(t.call(h,this.data[i],i,this.data))return !0;return !1}filterInPlace(t,h){let i=0;for(let s=0;s<this._length;++s){const a=this.data[s];t.call(h,a,s,this.data)&&(this.data[s]=this.data[i],this.data[i]=a,i++);}if(this._deallocator)for(let s=i;s<this._length;s++)this.data[s]=this._deallocator(this.data[s]);return this._length=i,this._shrink(),this}forAll(t,h){const i=this.length,s=this.data;for(let a=0;a<i;++a)t.call(h,s[a],a,s);}forEach(t,h){for(let i=0;i<this.length;++i)t.call(h,this.data[i],i,this.data);}map(t,h){const i=new Array(this.length);for(let s=0;s<this.length;++s)i[s]=t.call(h,this.data[s],s,this.data);return i}reduce(t,h){let i=h;for(let s=0;s<this.length;++s)i=t(i,this.data[s],s,this.data);return i}has(t){const h=this.length,i=this.data;for(let s=0;s<h;++s)if(i[s]===t)return !0;return !1}}function r$h(t){t.data.length>e$h*t.length&&(t.data.length=Math.floor(t.length*l$k));}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
function n$b(n){return n}function r$g(r){return n$b(1e3*r)}function t$c(n){return n}function u$o(n){return t$c(.001*n)}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
class c$l{constructor(e){this.phases=e,this.paused=!1,this.ticks=-1,this.removed=!1;}}class m$g{constructor(e){this.callback=e,this.isActive=!0;}remove(){this.isActive=!1;}}let l$j=0,p$e=0;const u$n={time:n$b(0),deltaTime:n$b(0),elapsedFrameTime:n$b(0),frameDuration:n$b(0)},f$k=["prepare","preRender","render","postRender","update","finish"],h$g=[],d$f=new n$c;class w$a{constructor(e){this._task=e;}remove(){this._task.removed=!0;}pause(){this._task.paused=!0;}resume(){this._task.paused=!1;}}const k$9={frameTasks:d$f,willDispatch:!1,clearFrameTasks:j$a,dispatch:b$8,executeFrameTasks:D$7};function v$9(e){const r=new m$g(e);return h$g.push(r),k$9.willDispatch||(k$9.willDispatch=!0,t$f(b$8)),r}function A$9(e){const t=new c$l(e);return d$f.push(t),null==T$7&&(l$j=performance.now(),T$7=requestAnimationFrame(x$d)),new w$a(t)}let T$7=null;function j$a(e=!1){d$f.forAll((e=>{e.removed=!0;})),e&&_$8();}function F$5(e){p$e=Math.max(0,e);}function x$d(){const e=performance.now();T$7=null,T$7=d$f.length>0?requestAnimationFrame(x$d):null,k$9.executeFrameTasks(e);}function D$7(e){const t=n$b(e-l$j);l$j=e;const r=p$e>0?p$e:1e3/60,s=Math.max(0,t-r);for(let n=0;n<f$k.length;n++){const o=performance.now(),a=f$k[n];d$f.forAll((o=>{var c;if(o.paused||o.removed)return;0===n&&o.ticks++;o.phases[a]&&(u$n.time=e,u$n.deltaTime=0===o.ticks?n$b(0):t,u$n.elapsedFrameTime=n$b(performance.now()-e),u$n.frameDuration=n$b(r-s),null==(c=o.phases[a])||c.call(o,u$n));})),M$a[n].record(performance.now()-o);}_$8(),q$6.record(performance.now()-e);}const g$e=new n$c;function _$8(){d$f.forAll((e=>{e.removed&&g$e.push(e);})),d$f.removeUnorderedMany(g$e.data,g$e.length),g$e.clear();}function b$8(){for(;h$g.length;){const t=q$9(h$g.shift());t.isActive&&t.callback();}k$9.willDispatch=!1;}function y$b(e=1,r){const s=q$8(),i=()=>{p$o(r)?s.reject(m$n()):0===e?s():(--e,t$f((()=>i())));};return i(),s.promise}const M$a=f$k.map((e=>new e$i(e))),q$6=new e$i("total");

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
function n$a(r,n){for(const o of r.entries())if(n(o[0]))return !0;return !1}function o$j(n,o){const t=new Set;return r$z(n)&&n.forEach((r=>t.add(r))),r$z(o)&&o.forEach((r=>t.add(r))),t}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
let t$b=0;const n$9=0;function e$g(){return ++t$b}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
class s$k{constructor(s){this._notify=s,this._accessed=[],this._handles=[],this._invalidCount=0;}destroy(){this._accessed.length=0,this.clear();}onInvalidated(){this._invalidCount++;}onCommitted(){const s=this._invalidCount;if(1===s)return this._invalidCount=0,void this._notify();this._invalidCount=s>0?s-1:0;}onObservableAccessed(s){this._accessed.includes(s)||this._accessed.push(s);}onTrackingEnd(){const s=this._handles,t=this._accessed;for(let e=0;e<t.length;++e)s.push(t[e].observe(this));t.length=0;}clear(){const s=this._handles;for(let t=0;t<s.length;++t)s[t].remove();s.length=0;}}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
let r$f=!1;const e$f=[];function o$i(e,o){let u=new s$k(s),l=null,f=!1;function s(){if(!u||f)return;if(r$f)return void i$f(s);const t=l;u.clear(),r$f=!0,f=!0,l=g$h(u,e),f=!1,r$f=!1,o(l,t),c$k();}function m(){u&&(u.destroy(),u=null,l=null);}return f=!0,l=g$h(u,e),f=!1,{remove:m}}function u$m(r,e){let o=new s$k(l),u=null;function l(){e(u,c);}function i(){o&&(o.destroy(),o=null),u=null;}function c(){return o?(o.clear(),u=g$h(o,r),u):null}return c(),{remove:i}}function l$i(e){let o=new s$k(l),u=!1;function l(){o&&!u&&(r$f?i$f(l):(o.clear(),r$f=!0,u=!0,g$h(o,e),u=!1,r$f=!1,c$k()));}function f(){o&&(o.destroy(),o=null);}return u=!0,g$h(o,e),u=!1,{remove:f}}function i$f(n){e$f.includes(n)||e$f.unshift(n);}function c$k(){for(;e$f.length;)e$f.pop()();}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
var d$e;!function(e){e[e.Untracked=0]="Untracked",e[e.Tracked=1]="Tracked";}(d$e||(d$e={}));class h$f{constructor(){this.uid=e$g(),this.removed=!1,this.type=null,this.oldValue=null,this.callback=null,this.getValue=null,this.target=null,this.path=null,this.equals=null;}static acquireUntracked(e,r,o,l,n){return this.pool.acquire(d$e.Untracked,e,r,o,l,n,w$f)}static acquireTracked(e,t,r,o){return this.pool.acquire(d$e.Tracked,e,t,r,null,null,o)}notify(e,t){this.type===d$e.Untracked?this.callback.call(this.target,e,t,this.path,this.target):this.callback.call(null,e,t);}acquire(e,t,r,o,l,i,s){this.uid=e$g(),this.removed=!1,this.type=e,this.oldValue=t,this.callback=r,this.getValue=o,this.target=l,this.path=i,this.equals=s;}release(){this.target=this.path=this.oldValue=this.callback=this.getValue=null,this.uid=e$g(),this.removed=!0;}}h$f.pool=new t$g(h$f);const f$j=new t$h,m$f=new Set;let p$d;function v$8(e){m$f.delete(e),m$f.add(e),p$d||(p$d=v$9(q$5));}function g$d(e){if(e.removed)return;const t=e.oldValue,r=e.getValue();e.equals(t,r)||(e.oldValue=r,e.notify(r,t));}function k$8(e){const t=Array.from(m$f);for(let r=0;r<t.length;r++){const o=t[r];o.target===e&&(g$d(o),m$f.delete(o));}}function _$7(e){for(const t of m$f.values())t.target===e&&(t.removed=!0);}function q$5(){let e=10;for(;p$d&&e--;){p$d=null;const e=j$9(),t=f$j.acquire();for(const r of e){const e=r.uid;g$d(r),e===r.uid&&r.removed&&t.push(r);}for(const r of m$f)r.removed&&(t.push(r),m$f.delete(r));for(const r of t)h$f.pool.release(r);f$j.release(t),f$j.release(e),y$a.forEach((e=>e()));}}function j$9(){const e=f$j.acquire();e.length=m$f.size;let t=0;for(const r of m$f)e[t]=r,++t;return m$f.clear(),e}const y$a=new Set;function V$2(e){return y$a.add(e),{remove(){y$a.delete(e);}}}function U$3(e,t,r){let o=y$i(e,t,r,((e,t,r)=>{let l,n,s=u$m((()=>o$v(e,t)),((i,s)=>{e.__accessor__.destroyed||l&&l.uid!==n?o.remove():(l||(l=h$f.acquireUntracked(i,r,s,e,t),n=l.uid),v$8(l));}));return {remove:h$j((()=>{s.remove(),l&&(l.uid!==n||l.removed||(l.removed=!0,v$8(l)),l=null),o=s=null;}))}}));return o}function b$7(e,r,o){const l=y$i(e,r,o,((e,r,o)=>{let n=!1;return o$i((()=>o$v(e,r)),((i,s)=>{e.__accessor__.destroyed?l.remove():n||(n=!0,w$f(s,i)||o.call(e,i,s,r,e),n=!1);}))}));return l}function T$6(e,t,r,o=!1){return !e.__accessor__||e.__accessor__.destroyed?{remove(){}}:o?b$7(e,t,r):U$3(e,t,r)}function w$9(e,t,r){let o,l,n=u$m(e,((e,i)=>{o&&o.uid!==l?n.remove():(o||(o=h$f.acquireTracked(e,t,i,r),l=o.uid),v$8(o));}));return {remove:h$j((()=>{n.remove(),o&&(o.uid!==l||o.removed||(o.removed=!0,v$8(o)),o=null),n=null;}))}}function S$7(e,t,r){let o=!1;return o$i(e,((e,l)=>{o||(o=!0,r(l,e)||t(e,l),o=!1);}))}function A$8(e,r,o=!1,l=w$f){return o?S$7(e,r,l):w$9(e,r,l)}function P$6(e){return n$a(m$f,(t=>t.oldValue===e))}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
function u$l(t){if(null==t)return {value:t};if(Array.isArray(t))return {type:[t[0]],value:null};switch(typeof t){case"object":return t.constructor&&t.constructor.__accessorMetadata__||t instanceof Date?{type:t.constructor,value:t}:t;case"boolean":return {type:Boolean,value:t};case"string":return {type:String,value:t};case"number":return {type:Number,value:t};case"function":return {type:t,value:null};default:return}}class h$e{constructor(...t){if(this.constructor===h$e)throw new Error("[accessor] cannot instantiate Accessor. This can be fixed by creating a subclass of Accessor");Object.defineProperty(this,"__accessor__",{enumerable:!1,value:new v$a(this)}),t.length>0&&this.normalizeCtorArgs&&(this.__accessor__.ctorArgs=this.normalizeCtorArgs.apply(this,t));}static createSubclass(t={}){if(Array.isArray(t))throw new Error("Multi-inheritance unsupported since 4.16");const{properties:r,declaredClass:e,constructor:s}=t;delete t.declaredClass,delete t.properties,delete t.constructor;const c=this;class i extends c{constructor(...t){super(...t),this.inherited=null,s&&s.apply(this,t);}}n$i(i.prototype);for(const o in t){const r=t[o];i.prototype[o]="function"==typeof r?function(...t){const e=this.inherited;let s;this.inherited=function(...t){if(c.prototype[o])return c.prototype[o].apply(this,t)};try{s=r.apply(this,t);}catch(i){throw this.inherited=e,i}return this.inherited=e,s}:t[o];}for(const o in r){const t=u$l(r[o]);d$j(t)(i.prototype,o);}return n$e(e)(i)}postscript(t){const r=this.__accessor__,e=r.ctorArgs||t;r.initialize(),e&&(this.set(e),r.ctorArgs=null),r.constructed(),this.initialize();}initialize(){}destroy(){this.destroyed||(_$7(this),this.__accessor__.destroy());}get initialized(){return this.__accessor__&&this.__accessor__.initialized||!1}get constructed(){return this.__accessor__&&this.__accessor__.lifecycle===I$9.CONSTRUCTED||!1}get destroyed(){return this.__accessor__&&this.__accessor__.destroyed||!1}commitProperty(t){this.get(t);}get(t){return u$v(this,t)}hasOwnProperty(t){return this.__accessor__?this.__accessor__.has(t):Object.prototype.hasOwnProperty.call(this,t)}isInstanceOf(e){return t$l(s$G.getLogger(this.declaredClass),"isInstanceOf",{replacement:"Use instanceof directly",version:"4.16"}),this instanceof e}keys(){return this.__accessor__?this.__accessor__.keys():[]}set(t,r){return n$h(this,t,r),this}watch(t,r,e){return T$6(this,t,r,e)}_clearOverride(t){return this.__accessor__.clearOverride(t)}_override(t,r){return this.__accessor__.override(t,r)}_isOverridden(t){return this.__accessor__.isOverridden(t)}notifyChange(t){this.__accessor__.notifyChange(t);}_get(t){return this.__accessor__.internalGet(t)}_set(t,r){return this.__accessor__.internalSet(t,r),this}}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
class e$e{constructor(){this._values=new Map,this.multipleOriginsSupported=!1;}clone(r){const l=new e$e;return this._values.forEach(((e,n)=>{r&&r.has(n)||l.set(n,m$q(e.value),e.origin);})),l}get(i,r){r=this._normalizeOrigin(r);const e=this._values.get(i);return null==r||(null==e?void 0:e.origin)===r?null==e?void 0:e.value:void 0}originOf(i){var e,l;return null!=(e=null==(l=this._values.get(i))?void 0:l.origin)?e:r$j.USER}keys(i){i=this._normalizeOrigin(i);const r=[...this._values.keys()];return null==i?r:r.filter((r=>{var e;return (null==(e=this._values.get(r))?void 0:e.origin)===i}))}set(i,e,n){if((n=this._normalizeOrigin(n))===r$j.DEFAULTS){const r=this._values.get(i);if(r&&null!=r.origin&&r.origin>n)return}this._values.set(i,new l$h(e,n));}delete(i,r){var e;null!=(r=this._normalizeOrigin(r))&&(null==(e=this._values.get(i))?void 0:e.origin)!==r||this._values.delete(i);}has(i,r){var e;return null!=(r=this._normalizeOrigin(r))?(null==(e=this._values.get(i))?void 0:e.origin)===r:this._values.has(i)}forEach(i){this._values.forEach((({value:r},e)=>i(r,e)));}_normalizeOrigin(i){if(null!=i)return i===r$j.DEFAULTS?i:r$j.USER}}class l$h{constructor(i,r){this.value=i,this.origin=r;}}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
function e$d(e,r,n){r.keys().forEach((e=>{n.set(e,r.get(e),r$j.DEFAULTS);}));const o=e.metadatas;Object.keys(o).forEach((r=>{e.internalGet(r)&&n.set(r,e.internalGet(r),r$j.DEFAULTS);}));}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
function s$j(e,r,n){if(!e||!e.read||!1===e.read.enabled||!e.read.source)return !1;const o=e.read.source;if("string"==typeof o){if(o===r)return !0;if(o.indexOf(".")>-1&&0===o.indexOf(r)&&s$v(o,n))return !0}else for(const s of o){if(s===r)return !0;if(s.indexOf(".")>-1&&0===s.indexOf(r)&&s$v(s,n))return !0}return !1}function i$e(e){return e&&(!e.read||!1!==e.read.enabled&&!e.read.source)}function f$i(e,t,r,o,f){let a=o$p(t[r],f);i$e(a)&&(e[r]=!0);for(const i of Object.getOwnPropertyNames(t))a=o$p(t[i],f),s$j(a,r,o)&&(e[i]=!0);}function a$b(e,t,r,n){const s=r.metadatas,i=a$e(s[t],"any",n),f=i&&i.default;if(void 0===f)return;const a="function"==typeof f?f.call(e,t,n):f;void 0!==a&&r.set(t,a);}const c$j={origin:"service"};function u$k(t,o,s=c$j){if(!o||"object"!=typeof o)return;const i=e$q(t),u=i.metadatas,d={};for(const e of Object.getOwnPropertyNames(o))f$i(d,u,e,o,s);i.setDefaultOrigin(s.origin);for(const r of Object.getOwnPropertyNames(d)){const f=o$p(u[r],s).read,a=f&&f.source;let c;c=a&&"string"==typeof a?o$v(o,a):o[r],f&&f.reader&&(c=f.reader.call(t,c,o,s)),void 0!==c&&i.set(r,c);}if(!s||!s.ignoreDefaults){i.setDefaultOrigin("defaults");for(const e of Object.getOwnPropertyNames(u))d[e]||a$b(t,e,i,s);}i.setDefaultOrigin("user");}function d$d(e,t,r,n=c$j){var o;const s={...n,messages:[]};r(s),null==(o=s.messages)||o.forEach((t=>{"warning"!==t.type||e.loaded?n&&n.messages&&n.messages.push(t):e.loadWarnings.push(t);}));}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
const a$a=s$G.getLogger("esri.core.accessorSupport.write");function f$h(r,e,t,i,o){var n,s;const u={};return null==(n=e.write)||null==(s=n.writer)||s.call(r,i,u,t,o),u}function p$c(r,t,i,s,u,l){if(!s||!s.write)return !1;const f=r.get(i);if(!u&&s.write.overridePolicy){const e=s.write.overridePolicy.call(r,f,i,l);void 0!==e&&(u=e);}if(u||(u=s.write),!u||!1===u.enabled)return !1;if((null===f&&!u.allowNull&&!u.writerEnsuresNonNull||void 0===f)&&u.isRequired){const t=new s$D("web-document-write:property-required",`Missing value for required property '${i}' on '${r.declaredClass}'`,{propertyName:i,target:r});return t&&l&&l.messages?l.messages.push(t):t&&!l&&a$a.error(t.name,t.message),!1}if(void 0===f)return !1;if(null===f&&!u.allowNull&&!u.writerEnsuresNonNull)return !1;if((!t.store.multipleOriginsSupported||t.store.originOf(i)===r$j.DEFAULTS)&&c$i(r,i,l,s,f))return !1;if(!u.ignoreOrigin&&l&&l.origin&&t.store.multipleOriginsSupported){if(t.store.originOf(i)<t$j(l.origin))return !1}return !0}function c$i(e,t,i,o,n){const s=o.default;if(void 0===s)return !1;if(null!=o.defaultEquals)return o.defaultEquals(n);if("function"==typeof s){if(Array.isArray(n)){const o=s.call(e,t,i);return l$x(o,n)}return !1}return s===n}function g$c(r,e,t,i){const o=e$q(r),n=o.metadatas,u=s$p(n[e],i);return !!u&&p$c(r,o,e,u,t,i)}function d$c(r,e,t){if(r&&"function"==typeof r.toJSON&&(!r.toJSON.isDefaultToJSON||!r.write))return u$w(e,r.toJSON());const o=e$q(r),n=o.metadatas;for(const s in n){const g=s$p(n[s],t);if(!p$c(r,o,s,g,void 0,t))continue;const d=r.get(s),m=f$h(r,g,g.write&&"string"==typeof g.write.target?g.write.target:s,d,t);var a,c;if(Object.keys(m).length>0)e=u$w(e,m),null!=t&&null!=(a=t.resources)&&null!=(c=a.pendingOperations)&&c.length&&Promise.all(t.resources.pendingOperations).then((()=>u$w(e,m))),t&&t.writtenProperties&&t.writtenProperties.push({target:r,propName:s,oldOrigin:c$m(o.store.originOf(s)),newOrigin:t.origin});}return e}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
const u$j=t=>{let u=class extends t{constructor(...r){super(...r);const t=q$9(e$q(this)),i=t.store,p=new e$e;t.store=p,e$d(t,i,p);}read(r,t){u$k(this,r,t);}write(r={},t){return d$c(this,r,t)}toJSON(r){return this.write({},r)}static fromJSON(r,t){return n$8.call(this,r,t)}};return u=e$r([n$e("esri.core.JSONSupport")],u),u.prototype.toJSON.isDefaultToJSON=!0,u};function n$8(r,t){if(!r)return null;if(r.declaredClass)throw new Error("JSON object is already hydrated");const s=new this;return s.read(r,t),s}function m$e(r){return r&&"read"in r&&"write"in r&&"toJSON"in r}let l$g=class extends(u$j(h$e)){};l$g=e$r([n$e("esri.core.JSONSupport")],l$g);

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
var S$6;!function(S){S[S.CGCS2000=4490]="CGCS2000",S[S.GCSMARS2000=104971]="GCSMARS2000",S[S.GCSMARS2000_SPHERE=104905]="GCSMARS2000_SPHERE",S[S.GCSMOON2000=104903]="GCSMOON2000";}(S$6||(S$6={}));

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
let o$h;const r$e={values:[1,.3048,.3048006096012192,.3047972654,.9143917962,.201166195164,.9143984146160287,.3047994715386762,20.11676512155263,20.11678249437587,.9143985307444408,.91439523,.3047997101815088,20.1168,20.116756,5e4,15e4],units:["Meter","Foot","Foot_US","Foot_Clarke","Yard_Clarke","Link_Clarke","Yard_Sears","Foot_Sears","Chain_Sears","Chain_Benoit_1895_B","Yard_Indian","Yard_Indian_1937","Foot_Gold_Coast","Chain","Chain_Sears_1922_Truncated","50_Kilometers","150_Kilometers"],2066:5,2136:12,2155:2,2157:0,2158:0,2159:12,2160:12,2204:2,2219:0,2220:0,2254:2,2255:2,2256:1,2265:1,2266:1,2267:2,2268:2,2269:1,2270:1,2271:2,2272:2,2273:1,2294:0,2295:0,2314:3,2899:2,2900:2,2901:1,2909:1,2910:1,2911:2,2912:2,2913:1,2914:1,2992:1,2993:0,2994:1,3080:1,3089:2,3090:0,3091:2,3102:2,3141:0,3142:0,3167:14,3359:2,3360:0,3361:1,3362:0,3363:2,3364:0,3365:2,3366:3,3404:2,3405:0,3406:0,3407:3,3439:0,3440:0,3479:1,3480:0,3481:1,3482:0,3483:1,3484:0,3485:2,3486:0,3487:2,3488:0,3489:0,3490:2,3491:0,3492:2,3493:0,3494:2,3495:0,3496:2,3497:0,3498:2,3499:0,3500:2,3501:0,3502:2,3503:0,3504:2,3505:0,3506:2,3507:0,3508:2,3509:0,3510:2,3511:0,3512:2,3513:0,3514:0,3515:2,3516:0,3517:2,3518:0,3519:2,3520:0,3521:2,3522:0,3523:2,3524:0,3525:2,3526:0,3527:2,3528:0,3529:2,3530:0,3531:2,3532:0,3533:2,3534:0,3535:2,3536:0,3537:2,3538:0,3539:2,3540:0,3541:2,3542:0,3543:2,3544:0,3545:2,3546:0,3547:2,3548:0,3549:2,3550:0,3551:2,3552:0,3553:2,3582:2,3583:0,3584:2,3585:0,3586:2,3587:0,3588:1,3589:0,3590:1,3591:0,3592:0,3593:1,3598:2,3599:0,3600:2,3605:1,3606:0,3607:0,3608:2,3609:0,3610:2,3611:0,3612:2,3613:0,3614:2,3615:0,3616:2,3617:0,3618:2,3619:0,3620:2,3621:0,3622:2,3623:0,3624:2,3625:0,3626:2,3627:0,3628:2,3629:0,3630:2,3631:0,3632:2,3633:0,3634:1,3635:0,3636:1,3640:2,3641:0,3642:2,3643:0,3644:1,3645:0,3646:1,3647:0,3648:1,3649:0,3650:2,3651:0,3652:2,3653:0,3654:2,3655:0,3656:1,3657:0,3658:2,3659:0,3660:2,3661:0,3662:2,3663:0,3664:2,3668:2,3669:0,3670:2,3671:0,3672:2,3673:0,3674:2,3675:0,3676:1,3677:2,3678:0,3679:1,3680:2,3681:0,3682:1,3683:2,3684:0,3685:0,3686:2,3687:0,3688:2,3689:0,3690:2,3691:0,3692:2,3696:2,3697:0,3698:2,3699:0,3700:2,3793:0,3794:0,3812:0,3854:0,3857:0,3920:0,3978:0,3979:0,3991:2,3992:2,4026:0,4037:0,4038:0,4071:0,4082:0,4083:0,4087:0,4088:0,4217:2,4414:0,4415:0,4417:0,4434:0,4437:0,4438:2,4439:2,4462:0,4467:0,4471:0,4474:0,4559:0,4647:0,4822:0,4826:0,4839:0,5018:0,5048:0,5167:0,5168:0,5221:0,5223:0,5234:0,5235:0,5243:0,5247:0,5266:0,5316:0,5320:0,5321:0,5325:0,5337:0,5361:0,5362:0,5367:0,5382:0,5383:0,5396:0,5456:0,5457:0,5469:0,5472:4,5490:0,5513:0,5514:0,5523:0,5559:0,5588:1,5589:3,5596:0,5627:0,5629:0,5641:0,5643:0,5644:0,5646:2,5654:2,5655:2,5659:0,5700:0,5825:0,5836:0,5837:0,5839:0,5842:0,5844:0,5858:0,5879:0,5880:0,5887:0,5890:0,6128:1,6129:1,6141:1,6204:0,6210:0,6211:0,6307:0,6312:0,6316:0,6362:0,6391:1,6405:1,6406:0,6407:1,6408:0,6409:1,6410:0,6411:2,6412:0,6413:2,6414:0,6415:0,6416:2,6417:0,6418:2,6419:0,6420:2,6421:0,6422:2,6423:0,6424:2,6425:0,6426:2,6427:0,6428:2,6429:0,6430:2,6431:0,6432:2,6433:0,6434:2,6435:0,6436:2,6437:0,6438:2,6439:0,6440:0,6441:2,6442:0,6443:2,6444:0,6445:2,6446:0,6447:2,6448:0,6449:2,6450:0,6451:2,6452:0,6453:2,6454:0,6455:2,6456:0,6457:2,6458:0,6459:2,6460:0,6461:2,6462:0,6463:2,6464:0,6465:2,6466:0,6467:2,6468:0,6469:2,6470:0,6471:2,6472:0,6473:2,6474:0,6475:2,6476:0,6477:2,6478:0,6479:2,6484:2,6485:0,6486:2,6487:0,6488:2,6489:0,6490:2,6491:0,6492:2,6493:0,6494:1,6495:0,6496:1,6497:0,6498:0,6499:1,6500:0,6501:2,6502:0,6503:2,6504:0,6505:2,6506:0,6507:2,6508:0,6509:0,6510:2,6515:1,6516:0,6518:0,6519:2,6520:0,6521:2,6522:0,6523:2,6524:0,6525:2,6526:0,6527:2,6528:0,6529:2,6530:0,6531:2,6532:0,6533:2,6534:0,6535:2,6536:0,6537:2,6538:0,6539:2,6540:0,6541:2,6542:0,6543:2,6544:0,6545:1,6546:0,6547:1,6548:0,6549:2,6550:0,6551:2,6552:0,6553:2,6554:0,6555:2,6556:0,6557:1,6558:0,6559:1,6560:0,6561:1,6562:0,6563:2,6564:0,6565:2,6566:0,6567:0,6568:2,6569:0,6570:1,6571:0,6572:2,6573:0,6574:2,6575:0,6576:2,6577:0,6578:2,6582:2,6583:0,6584:2,6585:0,6586:2,6587:0,6588:2,6589:0,6590:2,6591:0,6592:0,6593:2,6594:0,6595:2,6596:0,6597:2,6598:0,6599:2,6600:0,6601:2,6602:0,6603:2,6605:2,6606:0,6607:2,6608:0,6609:2,6610:0,6611:0,6612:2,6613:0,6614:2,6615:0,6616:2,6617:0,6618:2,6633:2,6646:0,6703:0,6784:0,6785:1,6786:0,6787:1,6788:0,6789:1,6790:0,6791:1,6792:0,6793:1,6794:0,6795:1,6796:0,6797:1,6798:0,6799:1,6800:0,6801:1,6802:0,6803:1,6804:0,6805:1,6806:0,6807:1,6808:0,6809:1,6810:0,6811:1,6812:0,6813:1,6814:0,6815:1,6816:0,6817:1,6818:0,6819:1,6820:0,6821:1,6822:0,6823:1,6824:0,6825:1,6826:0,6827:1,6828:0,6829:1,6830:0,6831:1,6832:0,6833:1,6834:0,6835:1,6836:0,6837:1,6838:0,6839:1,6840:0,6841:1,6842:0,6843:1,6844:0,6845:1,6846:0,6847:1,6848:0,6849:1,6850:0,6851:1,6852:0,6853:1,6854:0,6855:1,6856:0,6857:1,6858:0,6859:1,6860:0,6861:1,6862:0,6863:1,6867:0,6868:1,6870:0,6875:0,6876:0,6879:0,6880:2,6884:0,6885:1,6886:0,6887:1,6915:0,6922:0,6923:2,6924:0,6925:2,6962:0,6984:0,6991:0,7128:2,7131:0,7132:2,7142:0,7257:0,7258:2,7259:0,7260:2,7261:0,7262:2,7263:0,7264:2,7265:0,7266:2,7267:0,7268:2,7269:0,7270:2,7271:0,7272:2,7273:0,7274:2,7275:0,7276:2,7277:0,7278:2,7279:0,7280:2,7281:0,7282:2,7283:0,7284:2,7285:0,7286:2,7287:0,7288:2,7289:0,7290:2,7291:0,7292:2,7293:0,7294:2,7295:0,7296:2,7297:0,7298:2,7299:0,7300:2,7301:0,7302:2,7303:0,7304:2,7305:0,7306:2,7307:0,7308:2,7309:0,7310:2,7311:0,7312:2,7313:0,7314:2,7315:0,7316:2,7317:0,7318:2,7319:0,7320:2,7321:0,7322:2,7323:0,7324:2,7325:0,7326:2,7327:0,7328:2,7329:0,7330:2,7331:0,7332:2,7333:0,7334:2,7335:0,7336:2,7337:0,7338:2,7339:0,7340:2,7341:0,7342:2,7343:0,7344:2,7345:0,7346:2,7347:0,7348:2,7349:0,7350:2,7351:0,7352:2,7353:0,7354:2,7355:0,7356:2,7357:0,7358:2,7359:0,7360:2,7361:0,7362:2,7363:0,7364:2,7365:0,7366:2,7367:0,7368:2,7369:0,7370:2,7877:0,7878:0,7882:0,7883:0,7887:0,7899:0,7991:0,7992:0,8035:2,8036:2,8058:0,8059:0,8082:0,8083:0,8088:0,8090:0,8091:2,8092:0,8093:2,8095:0,8096:2,8097:0,8098:2,8099:0,8100:2,8101:0,8102:2,8103:0,8104:2,8105:0,8106:2,8107:0,8108:2,8109:0,8110:2,8111:0,8112:2,8113:0,8114:2,8115:0,8116:2,8117:0,8118:2,8119:0,8120:2,8121:0,8122:2,8123:0,8124:2,8125:0,8126:2,8127:0,8128:2,8129:0,8130:2,8131:0,8132:2,8133:0,8134:2,8135:0,8136:2,8137:0,8138:2,8139:0,8140:2,8141:0,8142:2,8143:0,8144:2,8145:0,8146:2,8147:0,8148:2,8149:0,8150:2,8151:0,8152:2,8153:0,8154:2,8155:0,8156:2,8157:0,8158:2,8159:0,8160:2,8161:0,8162:2,8163:0,8164:2,8165:0,8166:2,8167:0,8168:2,8169:0,8170:2,8171:0,8172:2,8173:0,8177:2,8179:0,8180:2,8181:0,8182:2,8184:0,8185:2,8187:0,8189:2,8191:0,8193:2,8196:0,8197:2,8198:0,8200:2,8201:0,8202:2,8203:0,8204:2,8205:0,8206:2,8207:0,8208:2,8209:0,8210:2,8212:0,8213:2,8214:0,8216:2,8218:0,8220:2,8222:0,8224:2,8225:0,8226:2,8311:0,8312:1,8313:0,8314:1,8315:0,8316:1,8317:0,8318:1,8319:0,8320:1,8321:0,8322:1,8323:0,8324:1,8325:0,8326:1,8327:0,8328:1,8329:0,8330:1,8331:0,8332:1,8333:0,8334:1,8335:0,8336:1,8337:0,8338:1,8339:0,8340:1,8341:0,8342:1,8343:0,8344:1,8345:0,8346:1,8347:0,8348:1,8352:0,8353:0,8379:0,8380:2,8381:0,8382:2,8383:0,8384:2,8385:0,8387:2,8391:0,8395:0,8433:0,8441:0,8455:0,8456:0,8531:2,8682:0,8686:0,8687:0,8692:0,8693:0,8826:0,8903:0,8950:0,8951:0,9039:0,9040:0,9141:0,9149:0,9150:0,9191:0,9221:0,9222:0,9249:0,9250:0,9252:0,9254:0,9265:0,9284:0,9285:0,9300:0,9354:0,9367:0,9373:0,9377:0,9387:0,9391:0,9456:0,9473:0,9498:0,9674:0,9678:0,9680:0,9709:0,9712:0,9713:0,9716:0,9741:0,9748:2,9749:2,9761:0,9766:0,20499:0,20538:0,20539:0,20790:0,20791:0,21291:0,21292:0,21500:0,21817:0,21818:0,22032:0,22033:0,22091:0,22092:0,22332:0,22391:0,22392:0,22700:0,22770:0,22780:0,22832:0,23090:0,23095:0,23239:0,23240:0,23433:0,23700:0,24047:0,24048:0,24100:3,24200:0,24305:0,24306:0,24382:10,24383:0,24500:0,24547:0,24548:0,24571:9,24600:0,25e3:0,25231:0,25884:0,25932:0,26237:0,26331:0,26332:0,26432:0,26591:0,26592:0,26632:0,26692:0,27120:0,27200:0,27291:6,27292:6,27429:0,27492:0,27493:0,27500:0,27700:0,28232:0,28600:0,28991:0,28992:0,29100:0,29101:0,29220:0,29221:0,29333:0,29635:0,29636:0,29701:0,29738:0,29739:0,29849:0,29850:0,29871:8,29872:7,29873:0,29874:0,30200:5,30339:0,30340:0,30591:0,30592:0,30791:0,30792:0,30800:0,31028:0,31121:0,31154:0,31170:0,31171:0,31370:0,31528:0,31529:0,31600:0,31700:0,31838:0,31839:0,31900:0,31901:0,32061:0,32062:0,32098:0,32099:2,32100:0,32104:0,32161:0,32766:0,53048:0,53049:0,54090:0,54091:0,65061:2,65062:2,65161:0,65163:0,102041:2,102064:11,102068:15,102069:16,102118:2,102119:1,102120:2,102121:2,102217:2,102218:0,102219:2,102220:2,102378:1,102379:1,102380:0,102381:1,102589:2,102599:2,102600:2,102604:2,102647:0,102704:2,102705:2,102706:0,102759:1,102760:1,102761:2,102762:0,102763:2,102764:0,102765:0,102766:2,102962:0,102963:0,102970:1,102974:2,102993:0,102994:0,102995:2,102996:2,103015:0,103016:2,103017:0,103018:2,103025:0,103026:0,103027:2,103028:2,103035:0,103036:0,103037:2,103038:2,103039:0,103040:0,103041:2,103042:2,103043:0,103044:0,103045:2,103046:2,103047:0,103048:0,103049:2,103050:2,103051:0,103052:2,103053:0,103054:2,103055:0,103056:2,103057:0,103058:0,103059:2,103060:2,103061:0,103062:0,103063:2,103064:2,103069:2,103070:0,103071:0,103072:2,103073:2,103086:0,103087:0,103088:2,103089:2,103094:1,103095:0,103096:2,103103:0,103104:2,103105:0,103106:2,103121:0,103122:2,103123:0,103124:0,103125:1,103126:1,103127:0,103128:0,103129:2,103130:2,103131:0,103132:0,103133:2,103134:2,103135:0,103136:0,103137:1,103138:1,103139:0,103140:2,103141:0,103142:2,103143:0,103144:2,103145:0,103146:1,103147:0,103148:0,103149:2,103150:2,103151:0,103152:2,103172:0,103173:2,103174:0,103175:0,103176:2,103177:2,103178:0,103179:0,103180:2,103181:2,103182:0,103183:0,103184:2,103185:2,103228:0,103229:0,103230:2,103231:2,103250:0,103251:2,103252:0,103253:2,103260:0,103261:0,103262:2,103263:2,103270:0,103271:0,103272:2,103273:2,103274:0,103275:0,103276:2,103277:2,103278:0,103279:0,103280:2,103281:2,103282:0,103283:0,103284:2,103285:2,103286:0,103287:2,103288:0,103289:2,103290:0,103291:2,103292:0,103293:0,103294:2,103295:2,103296:0,103297:0,103298:2,103299:2,103376:2,103377:0,103378:0,103379:2,103380:2,103393:0,103394:0,103395:2,103396:2,103472:0,103473:1,103474:0,103475:2,103482:0,103483:2,103484:0,103485:2,103500:0,103501:2,103502:0,103503:0,103504:1,103505:1,103506:0,103507:0,103508:2,103509:2,103510:0,103511:0,103512:2,103513:2,103514:0,103515:2,103516:0,103517:2,103518:0,103519:2,103520:0,103521:1,103522:0,103523:0,103524:2,103525:2,103526:0,103527:2,103561:2,103562:2,103563:0,103564:0,103565:2,103566:2,103567:0,103568:0,103569:2,103570:2,103584:0,103585:2,103586:0,103587:2,103588:1,103589:0,103590:2,103591:1,103592:0,103593:2,103594:1,103695:2};for(o$h=2e3;o$h<=2045;o$h++)r$e[o$h]=0;for(o$h=2056;o$h<=2065;o$h++)r$e[o$h]=0;for(o$h=2067;o$h<=2135;o$h++)r$e[o$h]=0;for(o$h=2137;o$h<=2154;o$h++)r$e[o$h]=0;for(o$h=2161;o$h<=2170;o$h++)r$e[o$h]=0;for(o$h=2172;o$h<=2193;o$h++)r$e[o$h]=0;for(o$h=2195;o$h<=2198;o$h++)r$e[o$h]=0;for(o$h=2200;o$h<=2203;o$h++)r$e[o$h]=0;for(o$h=2205;o$h<=2217;o$h++)r$e[o$h]=0;for(o$h=2222;o$h<=2224;o$h++)r$e[o$h]=1;for(o$h=2225;o$h<=2250;o$h++)r$e[o$h]=2;for(o$h=2251;o$h<=2253;o$h++)r$e[o$h]=1;for(o$h=2257;o$h<=2264;o$h++)r$e[o$h]=2;for(o$h=2274;o$h<=2279;o$h++)r$e[o$h]=2;for(o$h=2280;o$h<=2282;o$h++)r$e[o$h]=1;for(o$h=2283;o$h<=2289;o$h++)r$e[o$h]=2;for(o$h=2290;o$h<=2292;o$h++)r$e[o$h]=0;for(o$h=2308;o$h<=2313;o$h++)r$e[o$h]=0;for(o$h=2315;o$h<=2491;o$h++)r$e[o$h]=0;for(o$h=2494;o$h<=2866;o$h++)r$e[o$h]=0;for(o$h=2867;o$h<=2869;o$h++)r$e[o$h]=1;for(o$h=2870;o$h<=2888;o$h++)r$e[o$h]=2;for(o$h=2891;o$h<=2895;o$h++)r$e[o$h]=2;for(o$h=2896;o$h<=2898;o$h++)r$e[o$h]=1;for(o$h=2902;o$h<=2908;o$h++)r$e[o$h]=2;for(o$h=2915;o$h<=2920;o$h++)r$e[o$h]=2;for(o$h=2921;o$h<=2923;o$h++)r$e[o$h]=1;for(o$h=2924;o$h<=2930;o$h++)r$e[o$h]=2;for(o$h=2931;o$h<=2962;o$h++)r$e[o$h]=0;for(o$h=2964;o$h<=2968;o$h++)r$e[o$h]=2;for(o$h=2969;o$h<=2973;o$h++)r$e[o$h]=0;for(o$h=2975;o$h<=2991;o$h++)r$e[o$h]=0;for(o$h=2995;o$h<=3051;o$h++)r$e[o$h]=0;for(o$h=3054;o$h<=3079;o$h++)r$e[o$h]=0;for(o$h=3081;o$h<=3088;o$h++)r$e[o$h]=0;for(o$h=3092;o$h<=3101;o$h++)r$e[o$h]=0;for(o$h=3106;o$h<=3138;o$h++)r$e[o$h]=0;for(o$h=3146;o$h<=3151;o$h++)r$e[o$h]=0;for(o$h=3153;o$h<=3166;o$h++)r$e[o$h]=0;for(o$h=3168;o$h<=3172;o$h++)r$e[o$h]=0;for(o$h=3174;o$h<=3203;o$h++)r$e[o$h]=0;for(o$h=3294;o$h<=3358;o$h++)r$e[o$h]=0;for(o$h=3367;o$h<=3403;o$h++)r$e[o$h]=0;for(o$h=3408;o$h<=3416;o$h++)r$e[o$h]=0;for(o$h=3417;o$h<=3438;o$h++)r$e[o$h]=2;for(o$h=3441;o$h<=3446;o$h++)r$e[o$h]=2;for(o$h=3447;o$h<=3450;o$h++)r$e[o$h]=0;for(o$h=3451;o$h<=3459;o$h++)r$e[o$h]=2;for(o$h=3460;o$h<=3478;o$h++)r$e[o$h]=0;for(o$h=3554;o$h<=3559;o$h++)r$e[o$h]=0;for(o$h=3560;o$h<=3570;o$h++)r$e[o$h]=2;for(o$h=3571;o$h<=3581;o$h++)r$e[o$h]=0;for(o$h=3594;o$h<=3597;o$h++)r$e[o$h]=0;for(o$h=3601;o$h<=3604;o$h++)r$e[o$h]=0;for(o$h=3637;o$h<=3639;o$h++)r$e[o$h]=0;for(o$h=3665;o$h<=3667;o$h++)r$e[o$h]=0;for(o$h=3693;o$h<=3695;o$h++)r$e[o$h]=0;for(o$h=3701;o$h<=3727;o$h++)r$e[o$h]=0;for(o$h=3728;o$h<=3739;o$h++)r$e[o$h]=2;for(o$h=3740;o$h<=3751;o$h++)r$e[o$h]=0;for(o$h=3753;o$h<=3760;o$h++)r$e[o$h]=2;for(o$h=3761;o$h<=3773;o$h++)r$e[o$h]=0;for(o$h=3775;o$h<=3777;o$h++)r$e[o$h]=0;for(o$h=3779;o$h<=3781;o$h++)r$e[o$h]=0;for(o$h=3783;o$h<=3785;o$h++)r$e[o$h]=0;for(o$h=3788;o$h<=3791;o$h++)r$e[o$h]=0;for(o$h=3797;o$h<=3802;o$h++)r$e[o$h]=0;for(o$h=3814;o$h<=3816;o$h++)r$e[o$h]=0;for(o$h=3825;o$h<=3829;o$h++)r$e[o$h]=0;for(o$h=3832;o$h<=3841;o$h++)r$e[o$h]=0;for(o$h=3844;o$h<=3852;o$h++)r$e[o$h]=0;for(o$h=3873;o$h<=3885;o$h++)r$e[o$h]=0;for(o$h=3890;o$h<=3893;o$h++)r$e[o$h]=0;for(o$h=3907;o$h<=3912;o$h++)r$e[o$h]=0;for(o$h=3942;o$h<=3950;o$h++)r$e[o$h]=0;for(o$h=3968;o$h<=3970;o$h++)r$e[o$h]=0;for(o$h=3973;o$h<=3976;o$h++)r$e[o$h]=0;for(o$h=3986;o$h<=3989;o$h++)r$e[o$h]=0;for(o$h=3994;o$h<=3997;o$h++)r$e[o$h]=0;for(o$h=4048;o$h<=4051;o$h++)r$e[o$h]=0;for(o$h=4056;o$h<=4063;o$h++)r$e[o$h]=0;for(o$h=4093;o$h<=4096;o$h++)r$e[o$h]=0;for(o$h=4390;o$h<=4398;o$h++)r$e[o$h]=0;for(o$h=4399;o$h<=4413;o$h++)r$e[o$h]=2;for(o$h=4418;o$h<=4433;o$h++)r$e[o$h]=2;for(o$h=4455;o$h<=4457;o$h++)r$e[o$h]=2;for(o$h=4484;o$h<=4489;o$h++)r$e[o$h]=0;for(o$h=4491;o$h<=4554;o$h++)r$e[o$h]=0;for(o$h=4568;o$h<=4589;o$h++)r$e[o$h]=0;for(o$h=4652;o$h<=4656;o$h++)r$e[o$h]=0;for(o$h=4766;o$h<=4800;o$h++)r$e[o$h]=0;for(o$h=5014;o$h<=5016;o$h++)r$e[o$h]=0;for(o$h=5069;o$h<=5072;o$h++)r$e[o$h]=0;for(o$h=5105;o$h<=5130;o$h++)r$e[o$h]=0;for(o$h=5173;o$h<=5188;o$h++)r$e[o$h]=0;for(o$h=5253;o$h<=5259;o$h++)r$e[o$h]=0;for(o$h=5269;o$h<=5275;o$h++)r$e[o$h]=0;for(o$h=5292;o$h<=5311;o$h++)r$e[o$h]=0;for(o$h=5329;o$h<=5331;o$h++)r$e[o$h]=0;for(o$h=5343;o$h<=5349;o$h++)r$e[o$h]=0;for(o$h=5355;o$h<=5357;o$h++)r$e[o$h]=0;for(o$h=5387;o$h<=5389;o$h++)r$e[o$h]=0;for(o$h=5459;o$h<=5463;o$h++)r$e[o$h]=0;for(o$h=5479;o$h<=5482;o$h++)r$e[o$h]=0;for(o$h=5518;o$h<=5520;o$h++)r$e[o$h]=0;for(o$h=5530;o$h<=5539;o$h++)r$e[o$h]=0;for(o$h=5550;o$h<=5552;o$h++)r$e[o$h]=0;for(o$h=5562;o$h<=5583;o$h++)r$e[o$h]=0;for(o$h=5623;o$h<=5625;o$h++)r$e[o$h]=2;for(o$h=5631;o$h<=5639;o$h++)r$e[o$h]=0;for(o$h=5649;o$h<=5653;o$h++)r$e[o$h]=0;for(o$h=5663;o$h<=5680;o$h++)r$e[o$h]=0;for(o$h=5682;o$h<=5685;o$h++)r$e[o$h]=0;for(o$h=5875;o$h<=5877;o$h++)r$e[o$h]=0;for(o$h=5896;o$h<=5899;o$h++)r$e[o$h]=0;for(o$h=5921;o$h<=5940;o$h++)r$e[o$h]=0;for(o$h=6050;o$h<=6125;o$h++)r$e[o$h]=0;for(o$h=6244;o$h<=6275;o$h++)r$e[o$h]=0;for(o$h=6328;o$h<=6348;o$h++)r$e[o$h]=0;for(o$h=6350;o$h<=6356;o$h++)r$e[o$h]=0;for(o$h=6366;o$h<=6372;o$h++)r$e[o$h]=0;for(o$h=6381;o$h<=6387;o$h++)r$e[o$h]=0;for(o$h=6393;o$h<=6404;o$h++)r$e[o$h]=0;for(o$h=6480;o$h<=6483;o$h++)r$e[o$h]=0;for(o$h=6511;o$h<=6514;o$h++)r$e[o$h]=0;for(o$h=6579;o$h<=6581;o$h++)r$e[o$h]=0;for(o$h=6619;o$h<=6624;o$h++)r$e[o$h]=0;for(o$h=6625;o$h<=6627;o$h++)r$e[o$h]=2;for(o$h=6628;o$h<=6632;o$h++)r$e[o$h]=0;for(o$h=6634;o$h<=6637;o$h++)r$e[o$h]=0;for(o$h=6669;o$h<=6692;o$h++)r$e[o$h]=0;for(o$h=6707;o$h<=6709;o$h++)r$e[o$h]=0;for(o$h=6720;o$h<=6723;o$h++)r$e[o$h]=0;for(o$h=6732;o$h<=6738;o$h++)r$e[o$h]=0;for(o$h=6931;o$h<=6933;o$h++)r$e[o$h]=0;for(o$h=6956;o$h<=6959;o$h++)r$e[o$h]=0;for(o$h=7005;o$h<=7007;o$h++)r$e[o$h]=0;for(o$h=7057;o$h<=7070;o$h++)r$e[o$h]=2;for(o$h=7074;o$h<=7082;o$h++)r$e[o$h]=0;for(o$h=7109;o$h<=7118;o$h++)r$e[o$h]=0;for(o$h=7119;o$h<=7127;o$h++)r$e[o$h]=1;for(o$h=7374;o$h<=7376;o$h++)r$e[o$h]=0;for(o$h=7528;o$h<=7586;o$h++)r$e[o$h]=0;for(o$h=7587;o$h<=7645;o$h++)r$e[o$h]=2;for(o$h=7692;o$h<=7696;o$h++)r$e[o$h]=0;for(o$h=7755;o$h<=7787;o$h++)r$e[o$h]=0;for(o$h=7791;o$h<=7795;o$h++)r$e[o$h]=0;for(o$h=7799;o$h<=7801;o$h++)r$e[o$h]=0;for(o$h=7803;o$h<=7805;o$h++)r$e[o$h]=0;for(o$h=7825;o$h<=7831;o$h++)r$e[o$h]=0;for(o$h=7845;o$h<=7859;o$h++)r$e[o$h]=0;for(o$h=8013;o$h<=8032;o$h++)r$e[o$h]=0;for(o$h=8065;o$h<=8068;o$h++)r$e[o$h]=1;for(o$h=8518;o$h<=8529;o$h++)r$e[o$h]=2;for(o$h=8533;o$h<=8536;o$h++)r$e[o$h]=2;for(o$h=8538;o$h<=8540;o$h++)r$e[o$h]=2;for(o$h=8677;o$h<=8679;o$h++)r$e[o$h]=0;for(o$h=8836;o$h<=8840;o$h++)r$e[o$h]=0;for(o$h=8857;o$h<=8859;o$h++)r$e[o$h]=0;for(o$h=8908;o$h<=8910;o$h++)r$e[o$h]=0;for(o$h=9154;o$h<=9159;o$h++)r$e[o$h]=0;for(o$h=9205;o$h<=9218;o$h++)r$e[o$h]=0;for(o$h=9271;o$h<=9273;o$h++)r$e[o$h]=0;for(o$h=9295;o$h<=9297;o$h++)r$e[o$h]=0;for(o$h=9356;o$h<=9360;o$h++)r$e[o$h]=0;for(o$h=9404;o$h<=9407;o$h++)r$e[o$h]=0;for(o$h=9476;o$h<=9482;o$h++)r$e[o$h]=0;for(o$h=9487;o$h<=9494;o$h++)r$e[o$h]=0;for(o$h=9697;o$h<=9699;o$h++)r$e[o$h]=0;for(o$h=20002;o$h<=20032;o$h++)r$e[o$h]=0;for(o$h=20062;o$h<=20092;o$h++)r$e[o$h]=0;for(o$h=20135;o$h<=20138;o$h++)r$e[o$h]=0;for(o$h=20248;o$h<=20258;o$h++)r$e[o$h]=0;for(o$h=20348;o$h<=20358;o$h++)r$e[o$h]=0;for(o$h=20436;o$h<=20440;o$h++)r$e[o$h]=0;for(o$h=20822;o$h<=20824;o$h++)r$e[o$h]=0;for(o$h=20904;o$h<=20932;o$h++)r$e[o$h]=0;for(o$h=20934;o$h<=20936;o$h++)r$e[o$h]=0;for(o$h=21004;o$h<=21032;o$h++)r$e[o$h]=0;for(o$h=21035;o$h<=21037;o$h++)r$e[o$h]=0;for(o$h=21095;o$h<=21097;o$h++)r$e[o$h]=0;for(o$h=21148;o$h<=21150;o$h++)r$e[o$h]=0;for(o$h=21207;o$h<=21264;o$h++)r$e[o$h]=0;for(o$h=21307;o$h<=21364;o$h++)r$e[o$h]=0;for(o$h=21413;o$h<=21423;o$h++)r$e[o$h]=0;for(o$h=21453;o$h<=21463;o$h++)r$e[o$h]=0;for(o$h=21473;o$h<=21483;o$h++)r$e[o$h]=0;for(o$h=21780;o$h<=21782;o$h++)r$e[o$h]=0;for(o$h=21891;o$h<=21894;o$h++)r$e[o$h]=0;for(o$h=21896;o$h<=21899;o$h++)r$e[o$h]=0;for(o$h=22171;o$h<=22177;o$h++)r$e[o$h]=0;for(o$h=22181;o$h<=22187;o$h++)r$e[o$h]=0;for(o$h=22191;o$h<=22197;o$h++)r$e[o$h]=0;for(o$h=22234;o$h<=22236;o$h++)r$e[o$h]=0;for(o$h=22521;o$h<=22525;o$h++)r$e[o$h]=0;for(o$h=22991;o$h<=22994;o$h++)r$e[o$h]=0;for(o$h=23028;o$h<=23038;o$h++)r$e[o$h]=0;for(o$h=23830;o$h<=23853;o$h++)r$e[o$h]=0;for(o$h=23866;o$h<=23872;o$h++)r$e[o$h]=0;for(o$h=23877;o$h<=23884;o$h++)r$e[o$h]=0;for(o$h=23886;o$h<=23894;o$h++)r$e[o$h]=0;for(o$h=23946;o$h<=23948;o$h++)r$e[o$h]=0;for(o$h=24311;o$h<=24313;o$h++)r$e[o$h]=0;for(o$h=24342;o$h<=24347;o$h++)r$e[o$h]=0;for(o$h=24370;o$h<=24374;o$h++)r$e[o$h]=10;for(o$h=24375;o$h<=24381;o$h++)r$e[o$h]=0;for(o$h=24718;o$h<=24721;o$h++)r$e[o$h]=0;for(o$h=24817;o$h<=24821;o$h++)r$e[o$h]=0;for(o$h=24877;o$h<=24882;o$h++)r$e[o$h]=0;for(o$h=24891;o$h<=24893;o$h++)r$e[o$h]=0;for(o$h=25391;o$h<=25395;o$h++)r$e[o$h]=0;for(o$h=25828;o$h<=25838;o$h++)r$e[o$h]=0;for(o$h=26191;o$h<=26195;o$h++)r$e[o$h]=0;for(o$h=26391;o$h<=26393;o$h++)r$e[o$h]=0;for(o$h=26701;o$h<=26722;o$h++)r$e[o$h]=0;for(o$h=26729;o$h<=26799;o$h++)r$e[o$h]=2;for(o$h=26801;o$h<=26803;o$h++)r$e[o$h]=2;for(o$h=26811;o$h<=26813;o$h++)r$e[o$h]=2;for(o$h=26847;o$h<=26870;o$h++)r$e[o$h]=2;for(o$h=26891;o$h<=26899;o$h++)r$e[o$h]=0;for(o$h=26901;o$h<=26923;o$h++)r$e[o$h]=0;for(o$h=26929;o$h<=26946;o$h++)r$e[o$h]=0;for(o$h=26948;o$h<=26998;o$h++)r$e[o$h]=0;for(o$h=27037;o$h<=27040;o$h++)r$e[o$h]=0;for(o$h=27205;o$h<=27232;o$h++)r$e[o$h]=0;for(o$h=27258;o$h<=27260;o$h++)r$e[o$h]=0;for(o$h=27391;o$h<=27398;o$h++)r$e[o$h]=0;for(o$h=27561;o$h<=27564;o$h++)r$e[o$h]=0;for(o$h=27571;o$h<=27574;o$h++)r$e[o$h]=0;for(o$h=27581;o$h<=27584;o$h++)r$e[o$h]=0;for(o$h=27591;o$h<=27594;o$h++)r$e[o$h]=0;for(o$h=28191;o$h<=28193;o$h++)r$e[o$h]=0;for(o$h=28348;o$h<=28358;o$h++)r$e[o$h]=0;for(o$h=28402;o$h<=28432;o$h++)r$e[o$h]=0;for(o$h=28462;o$h<=28492;o$h++)r$e[o$h]=0;for(o$h=29118;o$h<=29122;o$h++)r$e[o$h]=0;for(o$h=29168;o$h<=29172;o$h++)r$e[o$h]=0;for(o$h=29177;o$h<=29185;o$h++)r$e[o$h]=0;for(o$h=29187;o$h<=29195;o$h++)r$e[o$h]=0;for(o$h=29900;o$h<=29903;o$h++)r$e[o$h]=0;for(o$h=30161;o$h<=30179;o$h++)r$e[o$h]=0;for(o$h=30491;o$h<=30494;o$h++)r$e[o$h]=0;for(o$h=30729;o$h<=30732;o$h++)r$e[o$h]=0;for(o$h=31251;o$h<=31259;o$h++)r$e[o$h]=0;for(o$h=31265;o$h<=31268;o$h++)r$e[o$h]=0;for(o$h=31275;o$h<=31279;o$h++)r$e[o$h]=0;for(o$h=31281;o$h<=31297;o$h++)r$e[o$h]=0;for(o$h=31461;o$h<=31469;o$h++)r$e[o$h]=0;for(o$h=31491;o$h<=31495;o$h++)r$e[o$h]=0;for(o$h=31917;o$h<=31922;o$h++)r$e[o$h]=0;for(o$h=31965;o$h<=32e3;o$h++)r$e[o$h]=0;for(o$h=32001;o$h<=32003;o$h++)r$e[o$h]=2;for(o$h=32005;o$h<=32031;o$h++)r$e[o$h]=2;for(o$h=32033;o$h<=32060;o$h++)r$e[o$h]=2;for(o$h=32064;o$h<=32067;o$h++)r$e[o$h]=2;for(o$h=32074;o$h<=32077;o$h++)r$e[o$h]=2;for(o$h=32081;o$h<=32086;o$h++)r$e[o$h]=0;for(o$h=32107;o$h<=32130;o$h++)r$e[o$h]=0;for(o$h=32133;o$h<=32158;o$h++)r$e[o$h]=0;for(o$h=32164;o$h<=32167;o$h++)r$e[o$h]=2;for(o$h=32180;o$h<=32199;o$h++)r$e[o$h]=0;for(o$h=32201;o$h<=32260;o$h++)r$e[o$h]=0;for(o$h=32301;o$h<=32360;o$h++)r$e[o$h]=0;for(o$h=32601;o$h<=32662;o$h++)r$e[o$h]=0;for(o$h=32664;o$h<=32667;o$h++)r$e[o$h]=2;for(o$h=32701;o$h<=32761;o$h++)r$e[o$h]=0;for(o$h=53001;o$h<=53004;o$h++)r$e[o$h]=0;for(o$h=53008;o$h<=53019;o$h++)r$e[o$h]=0;for(o$h=53021;o$h<=53032;o$h++)r$e[o$h]=0;for(o$h=53034;o$h<=53037;o$h++)r$e[o$h]=0;for(o$h=53042;o$h<=53046;o$h++)r$e[o$h]=0;for(o$h=53074;o$h<=53080;o$h++)r$e[o$h]=0;for(o$h=54001;o$h<=54004;o$h++)r$e[o$h]=0;for(o$h=54008;o$h<=54019;o$h++)r$e[o$h]=0;for(o$h=54021;o$h<=54032;o$h++)r$e[o$h]=0;for(o$h=54034;o$h<=54037;o$h++)r$e[o$h]=0;for(o$h=54042;o$h<=54046;o$h++)r$e[o$h]=0;for(o$h=54048;o$h<=54053;o$h++)r$e[o$h]=0;for(o$h=54074;o$h<=54080;o$h++)r$e[o$h]=0;for(o$h=54098;o$h<=54101;o$h++)r$e[o$h]=0;for(o$h=102001;o$h<=102040;o$h++)r$e[o$h]=0;for(o$h=102042;o$h<=102063;o$h++)r$e[o$h]=0;for(o$h=102065;o$h<=102067;o$h++)r$e[o$h]=0;for(o$h=102070;o$h<=102117;o$h++)r$e[o$h]=0;for(o$h=102122;o$h<=102216;o$h++)r$e[o$h]=0;for(o$h=102221;o$h<=102377;o$h++)r$e[o$h]=0;for(o$h=102382;o$h<=102388;o$h++)r$e[o$h]=0;for(o$h=102389;o$h<=102398;o$h++)r$e[o$h]=2;for(o$h=102399;o$h<=102444;o$h++)r$e[o$h]=0;for(o$h=102445;o$h<=102447;o$h++)r$e[o$h]=2;for(o$h=102448;o$h<=102458;o$h++)r$e[o$h]=0;for(o$h=102459;o$h<=102468;o$h++)r$e[o$h]=2;for(o$h=102469;o$h<=102499;o$h++)r$e[o$h]=0;for(o$h=102500;o$h<=102519;o$h++)r$e[o$h]=1;for(o$h=102520;o$h<=102524;o$h++)r$e[o$h]=0;for(o$h=102525;o$h<=102529;o$h++)r$e[o$h]=2;for(o$h=102530;o$h<=102588;o$h++)r$e[o$h]=0;for(o$h=102590;o$h<=102598;o$h++)r$e[o$h]=0;for(o$h=102601;o$h<=102603;o$h++)r$e[o$h]=0;for(o$h=102605;o$h<=102628;o$h++)r$e[o$h]=0;for(o$h=102629;o$h<=102646;o$h++)r$e[o$h]=2;for(o$h=102648;o$h<=102700;o$h++)r$e[o$h]=2;for(o$h=102701;o$h<=102703;o$h++)r$e[o$h]=0;for(o$h=102707;o$h<=102730;o$h++)r$e[o$h]=2;for(o$h=102733;o$h<=102758;o$h++)r$e[o$h]=2;for(o$h=102767;o$h<=102900;o$h++)r$e[o$h]=0;for(o$h=102901;o$h<=102933;o$h++)r$e[o$h]=2;for(o$h=102934;o$h<=102950;o$h++)r$e[o$h]=13;for(o$h=102951;o$h<=102960;o$h++)r$e[o$h]=0;for(o$h=102965;o$h<=102969;o$h++)r$e[o$h]=0;for(o$h=102971;o$h<=102973;o$h++)r$e[o$h]=0;for(o$h=102975;o$h<=102989;o$h++)r$e[o$h]=0;for(o$h=102990;o$h<=102992;o$h++)r$e[o$h]=1;for(o$h=102997;o$h<=103002;o$h++)r$e[o$h]=0;for(o$h=103003;o$h<=103008;o$h++)r$e[o$h]=2;for(o$h=103009;o$h<=103011;o$h++)r$e[o$h]=0;for(o$h=103012;o$h<=103014;o$h++)r$e[o$h]=2;for(o$h=103019;o$h<=103021;o$h++)r$e[o$h]=0;for(o$h=103022;o$h<=103024;o$h++)r$e[o$h]=2;for(o$h=103029;o$h<=103031;o$h++)r$e[o$h]=0;for(o$h=103032;o$h<=103034;o$h++)r$e[o$h]=2;for(o$h=103065;o$h<=103068;o$h++)r$e[o$h]=0;for(o$h=103074;o$h<=103076;o$h++)r$e[o$h]=0;for(o$h=103077;o$h<=103079;o$h++)r$e[o$h]=1;for(o$h=103080;o$h<=103082;o$h++)r$e[o$h]=0;for(o$h=103083;o$h<=103085;o$h++)r$e[o$h]=2;for(o$h=103090;o$h<=103093;o$h++)r$e[o$h]=0;for(o$h=103097;o$h<=103099;o$h++)r$e[o$h]=0;for(o$h=103100;o$h<=103102;o$h++)r$e[o$h]=2;for(o$h=103107;o$h<=103109;o$h++)r$e[o$h]=0;for(o$h=103110;o$h<=103112;o$h++)r$e[o$h]=2;for(o$h=103113;o$h<=103116;o$h++)r$e[o$h]=0;for(o$h=103117;o$h<=103120;o$h++)r$e[o$h]=2;for(o$h=103153;o$h<=103157;o$h++)r$e[o$h]=0;for(o$h=103158;o$h<=103162;o$h++)r$e[o$h]=2;for(o$h=103163;o$h<=103165;o$h++)r$e[o$h]=0;for(o$h=103166;o$h<=103168;o$h++)r$e[o$h]=1;for(o$h=103169;o$h<=103171;o$h++)r$e[o$h]=2;for(o$h=103186;o$h<=103188;o$h++)r$e[o$h]=0;for(o$h=103189;o$h<=103191;o$h++)r$e[o$h]=2;for(o$h=103192;o$h<=103195;o$h++)r$e[o$h]=0;for(o$h=103196;o$h<=103199;o$h++)r$e[o$h]=2;for(o$h=103200;o$h<=103224;o$h++)r$e[o$h]=0;for(o$h=103225;o$h<=103227;o$h++)r$e[o$h]=1;for(o$h=103232;o$h<=103237;o$h++)r$e[o$h]=0;for(o$h=103238;o$h<=103243;o$h++)r$e[o$h]=2;for(o$h=103244;o$h<=103246;o$h++)r$e[o$h]=0;for(o$h=103247;o$h<=103249;o$h++)r$e[o$h]=2;for(o$h=103254;o$h<=103256;o$h++)r$e[o$h]=0;for(o$h=103257;o$h<=103259;o$h++)r$e[o$h]=2;for(o$h=103264;o$h<=103266;o$h++)r$e[o$h]=0;for(o$h=103267;o$h<=103269;o$h++)r$e[o$h]=2;for(o$h=103300;o$h<=103375;o$h++)r$e[o$h]=0;for(o$h=103381;o$h<=103383;o$h++)r$e[o$h]=0;for(o$h=103384;o$h<=103386;o$h++)r$e[o$h]=1;for(o$h=103387;o$h<=103389;o$h++)r$e[o$h]=0;for(o$h=103390;o$h<=103392;o$h++)r$e[o$h]=2;for(o$h=103397;o$h<=103399;o$h++)r$e[o$h]=0;for(o$h=103400;o$h<=103471;o$h++)r$e[o$h]=2;for(o$h=103476;o$h<=103478;o$h++)r$e[o$h]=0;for(o$h=103479;o$h<=103481;o$h++)r$e[o$h]=2;for(o$h=103486;o$h<=103488;o$h++)r$e[o$h]=0;for(o$h=103489;o$h<=103491;o$h++)r$e[o$h]=2;for(o$h=103492;o$h<=103495;o$h++)r$e[o$h]=0;for(o$h=103496;o$h<=103499;o$h++)r$e[o$h]=2;for(o$h=103528;o$h<=103543;o$h++)r$e[o$h]=0;for(o$h=103544;o$h<=103548;o$h++)r$e[o$h]=2;for(o$h=103549;o$h<=103551;o$h++)r$e[o$h]=0;for(o$h=103552;o$h<=103554;o$h++)r$e[o$h]=1;for(o$h=103555;o$h<=103557;o$h++)r$e[o$h]=2;for(o$h=103558;o$h<=103560;o$h++)r$e[o$h]=0;for(o$h=103571;o$h<=103573;o$h++)r$e[o$h]=0;for(o$h=103574;o$h<=103576;o$h++)r$e[o$h]=2;for(o$h=103577;o$h<=103580;o$h++)r$e[o$h]=0;for(o$h=103581;o$h<=103583;o$h++)r$e[o$h]=2;for(o$h=103595;o$h<=103694;o$h++)r$e[o$h]=0;for(o$h=103696;o$h<=103699;o$h++)r$e[o$h]=0;for(o$h=103700;o$h<=103793;o$h++)r$e[o$h]=2;for(o$h=103794;o$h<=103872;o$h++)r$e[o$h]=0;for(o$h=103900;o$h<=103971;o$h++)r$e[o$h]=2;

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
const t$a={102113:!0,102100:!0,3857:!0,3785:!0},_$6={102113:!0,102100:!0,3857:!0,3785:!0,4326:!0},l$f='PROJCS["WGS_1984_Web_Mercator_Auxiliary_Sphere",GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Mercator_Auxiliary_Sphere"],PARAMETER["False_Easting",0.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",{Central_Meridian}],PARAMETER["Standard_Parallel_1",0.0],PARAMETER["Auxiliary_Sphere_Type",0.0],UNIT["Meter",1.0]]',M$9=[-20037508.342788905,20037508.342788905],S$5=[-20037508.342787,20037508.342787],d$b={102113:{wkTemplate:'PROJCS["WGS_1984_Web_Mercator",GEOGCS["GCS_WGS_1984_Major_Auxiliary_Sphere",DATUM["D_WGS_1984_Major_Auxiliary_Sphere",SPHEROID["WGS_1984_Major_Auxiliary_Sphere",6378137.0,0.0]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Mercator"],PARAMETER["False_Easting",0.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",{Central_Meridian}],PARAMETER["Standard_Parallel_1",0.0],UNIT["Meter",1.0]]',valid:M$9,origin:S$5,dx:1e-5},102100:{wkTemplate:l$f,valid:M$9,origin:S$5,dx:1e-5},3785:{wkTemplate:'PROJCS["WGS_1984_Web_Mercator",GEOGCS["GCS_WGS_1984_Major_Auxiliary_Sphere",DATUM["D_WGS_1984_Major_Auxiliary_Sphere",SPHEROID["WGS_1984_Major_Auxiliary_Sphere",6378137.0,0.0]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Mercator"],PARAMETER["False_Easting",0.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",{Central_Meridian}],PARAMETER["Standard_Parallel_1",0.0],UNIT["Meter",1.0]]',valid:M$9,origin:S$5,dx:1e-5},3857:{wkTemplate:l$f,valid:M$9,origin:S$5,dx:1e-5},4326:{wkTemplate:'GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",{Central_Meridian}],UNIT["Degree",0.0174532925199433]]',altTemplate:'PROJCS["WGS_1984_Plate_Carree",GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Plate_Carree"],PARAMETER["False_Easting",0.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",{Central_Meridian}],UNIT["Degrees",111319.491]]',valid:[-180,180],origin:[-180,90],dx:1e-5},104971:{wkTemplate:'GEOGCS["Mars_2000_(Sphere)",DATUM["Mars_2000_(Sphere)",SPHEROID["Mars_2000_(Sphere)",3396190.0,0.0]],PRIMEM["Reference_Meridian",0.0],UNIT["Degree",0.0174532925199433]]',valid:[-180,180],origin:[-180,90],dx:1e-5},104905:{wkTemplate:'GEOGCS["GCS_Mars_2000",DATUM["D_Mars_2000",SPHEROID["Mars_2000_IAU_IAG",3396190.0,169.8944472236118]],PRIMEM["Reference_Meridian",0.0],UNIT["Degree",0.0174532925199433]]',valid:[-180,180],origin:[-180,90],dx:1e-5}};function E$7(e,i){return !t$y(e)&&!t$y(i)&&(e===i||(null!=e.wkid||null!=i.wkid?e.wkid===i.wkid||k$7(e)&&k$7(i)||null!=i.latestWkid&&e.wkid===i.latestWkid||null!=e.latestWkid&&i.wkid===e.latestWkid:!(!e.wkt||!i.wkt)&&e.wkt.toUpperCase()===i.wkt.toUpperCase()))}function R$7(e){return I$7(e)&&e.wkid?d$b[e.wkid]:null}function o$g(e){return !!I$7(e)&&(e.wkid?null==r$e[e.wkid]:!!e.wkt&&!!/^\s*GEOGCS/i.test(e.wkt))}function A$7(e){return !(P$5(e)||s$i(e))}function G$7(e){return I$7(e)&&4326===e.wkid}function u$i(e){return I$7(e)&&e.wkid===S$6.CGCS2000}function k$7(e){return I$7(e)&&null!=e.wkid&&!0===t$a[e.wkid]}function T$5(e){return I$7(e)&&32662===e.wkid}function w$8(e){return e===S$6.GCSMARS2000||e===S$6.GCSMARS2000_SPHERE}function P$5(e){return I$7(e)&&null!=e.wkid&&w$8(e.wkid)}function C$5(e){return e===S$6.GCSMOON2000}function s$i(e){return I$7(e)&&null!=e.wkid&&C$5(e.wkid)}function p$b(e){return I$7(e)&&null!=e.wkid&&!0===_$6[e.wkid]}function I$7(r){return r$z(r)&&(null!=r.wkid&&r.wkid>=2e3||null!=r.wkt)}const c$h={wkid:4326,wkt:r$t(d$b[4326].wkTemplate,{Central_Meridian:"0.0"})},D$6={wkid:102100,latestWkid:3857},O$6={wkid:32662};

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
var y$9;let S$4=y$9=class extends l$g{constructor(e){super(e),this.latestWkid=null,this.wkid=null,this.wkt=null,this.vcsWkid=null,this.latestVcsWkid=null,this.imageCoordinateSystem=null;}static fromJSON(e){if(!e)return null;if(e.wkid){if(102100===e.wkid)return y$9.WebMercator;if(4326===e.wkid)return y$9.WGS84}const t=new y$9;return t.read(e),t}normalizeCtorArgs(e){if(e&&"object"==typeof e)return e;return {["string"==typeof e?"wkt":"wkid"]:e}}get isWGS84(){return G$7(this)}get isWebMercator(){return k$7(this)}get isGeographic(){return o$g(this)}get isWrappable(){return p$b(this)}writeWkt(e,t){this.wkid||(t.wkt=e);}clone(){if(this===y$9.WGS84)return y$9.WGS84;if(this===y$9.WebMercator)return y$9.WebMercator;const e=new y$9;return null!=this.wkid?(e.wkid=this.wkid,null!=this.latestWkid&&(e.latestWkid=this.latestWkid),null!=this.vcsWkid&&(e.vcsWkid=this.vcsWkid),null!=this.latestVcsWkid&&(e.latestVcsWkid=this.latestVcsWkid)):null!=this.wkt&&(e.wkt=this.wkt),this.imageCoordinateSystem&&(e.imageCoordinateSystem=m$q(this.imageCoordinateSystem)),e}equals(e){if(null==e)return !1;if(this.imageCoordinateSystem||e.imageCoordinateSystem){if(null==this.imageCoordinateSystem||null==e.imageCoordinateSystem)return !1;const{id:t,referenceServiceName:r}=e.imageCoordinateSystem,{geodataXform:i}=e.imageCoordinateSystem,o=this.imageCoordinateSystem;return null==t||i?JSON.stringify(o)===JSON.stringify(e.imageCoordinateSystem):r?o.id===t&&o.referenceServiceName===r:o.id===t}return E$7(this,e)}toJSON(e){return this.write(void 0,e)}};S$4.GCS_NAD_1927=null,S$4.WGS84=null,S$4.WebMercator=null,S$4.PlateCarree=null,e$r([d$j({readOnly:!0})],S$4.prototype,"isWGS84",null),e$r([d$j({readOnly:!0})],S$4.prototype,"isWebMercator",null),e$r([d$j({readOnly:!0})],S$4.prototype,"isGeographic",null),e$r([d$j({readOnly:!0})],S$4.prototype,"isWrappable",null),e$r([d$j({type:S$8,json:{write:!0}})],S$4.prototype,"latestWkid",void 0),e$r([d$j({type:S$8,json:{write:!0,origins:{"web-scene":{write:{overridePolicy(){return {isRequired:null===this.wkt}}}}}}})],S$4.prototype,"wkid",void 0),e$r([d$j({type:String,json:{origins:{"web-scene":{write:{overridePolicy(){return {isRequired:null===this.wkid}}}}}}})],S$4.prototype,"wkt",void 0),e$r([r$l("wkt"),r$l("web-scene","wkt")],S$4.prototype,"writeWkt",null),e$r([d$j({type:S$8,json:{write:!0}})],S$4.prototype,"vcsWkid",void 0),e$r([d$j({type:S$8,json:{write:!0}})],S$4.prototype,"latestVcsWkid",void 0),e$r([d$j()],S$4.prototype,"imageCoordinateSystem",void 0),S$4=y$9=e$r([n$e("esri.geometry.SpatialReference")],S$4),S$4.prototype.toJSON.isDefaultToJSON=!0,S$4.GCS_NAD_1927=new S$4({wkid:4267,wkt:'GEOGCS["GCS_North_American_1927",DATUM["D_North_American_1927",SPHEROID["Clarke_1866",6378206.4,294.9786982]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]]'}),S$4.WGS84=new S$4(c$h),S$4.WebMercator=new S$4(D$6),S$4.PlateCarree=new S$4(O$6),Object.freeze&&(Object.freeze(S$4.GCS_NAD_1927),Object.freeze(S$4.WGS84),Object.freeze(S$4.WebMercator));const k$6=S$4;

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
let c$g=class extends l$g{constructor(...e){super(...e),this.type=null,this.hasM=!1,this.hasZ=!1,this.spatialReference=k$6.WGS84;}get cache(){return this.commitProperty("spatialReference"),{}}get extent(){return null}readSpatialReference(e,r){if(e instanceof k$6)return e;if(null!=e){const t=new k$6;return t.read(e,r),t}return e}clone(){return console.warn(".clone() is not implemented for "+this.declaredClass),null}clearCache(){this.notifyChange("cache");}getCacheValue(e){return this.cache[e]}setCacheValue(e,r){this.cache[e]=r;}};e$r([d$j()],c$g.prototype,"type",void 0),e$r([d$j({readOnly:!0})],c$g.prototype,"cache",null),e$r([d$j({readOnly:!0})],c$g.prototype,"extent",null),e$r([d$j({type:Boolean,json:{write:{overridePolicy:e=>({enabled:e})}}})],c$g.prototype,"hasM",void 0),e$r([d$j({type:Boolean,json:{write:{overridePolicy:e=>({enabled:e})}}})],c$g.prototype,"hasZ",void 0),e$r([d$j({type:k$6,json:{write:!0}})],c$g.prototype,"spatialReference",void 0),e$r([o$s("spatialReference")],c$g.prototype,"readSpatialReference",null),c$g=e$r([n$e("esri.geometry.Geometry")],c$g);const p$a=c$g;

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
function n$7(n,r,u,t){var l;(n.x=n.x+r,n.y=n.y+u,null!=t)&&(n.z=(null!=(l=n.z)?l:0)+t);return n}function r$d(n,r){return n[0]+=r,n}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
function t$9(t,n){const s=t.x-n.x,r=t.y-n.y,a=t.hasZ&&n.hasZ?t.z-n.z:0;return Math.sqrt(s*s+r*r+a*a)}function n$6(t,n){const s=t.x-n.x,r=t.y-n.y,a=t.hasZ&&n.hasZ?t.z-n.z:0;return s*s+r*r+a*a}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
class i$d{constructor(i,s,t,e){this.semiMajorAxis=i,this.flattening=s,this.outerAtmosphereRimWidth=t;const h=1-this.flattening;this.semiMinorAxis=this.semiMajorAxis*h,this.halfSemiMajorAxis=this.semiMajorAxis/2,this.halfCircumference=Math.PI*this.semiMajorAxis,this.metersPerDegree=this.halfCircumference/180,this.inverseFlattening=1/(1-this.flattening)-1,this.eccentricitySquared=e||2*this.flattening-this.flattening*this.flattening,this.meanRadiusSemiAxes=(2*this.semiMajorAxis+this.semiMinorAxis)/3;}get radius(){return this.semiMajorAxis}}const s$h=new i$d(6378137,1/298.257223563,3e5,.006694379990137799),t$8=new i$d(3396190,1/169.8944472236118,23e4),e$c=new i$d(1737400,0,0);

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
const o$f=57.29577951308232,u$h=.017453292519943;function l$e(n){return n*o$f}function p$9(n){return n*u$h}function f$g(n){return n/s$h.radius}function c$f(n){return Math.PI/2-2*Math.atan(Math.exp(-n/s$h.radius))}function h$d(n){return null!=n.wkid||null!=n.wkt}const m$d=[0,0];function x$c(n,t,e,i,r){const s=n,a=r;if(a.spatialReference=e,"x"in s&&"x"in a)[a.x,a.y]=t(s.x,s.y,m$d,i);else if("xmin"in s&&"xmin"in a)[a.xmin,a.ymin]=t(s.xmin,s.ymin,m$d,i),[a.xmax,a.ymax]=t(s.xmax,s.ymax,m$d,i);else if("paths"in s&&"paths"in a||"rings"in s&&"rings"in a){const n="paths"in s?s.paths:s.rings,e=[];let r;for(let s=0;s<n.length;s++){const a=n[s];r=[],e.push(r);for(let n=0;n<a.length;n++)r.push(t(a[n][0],a[n][1],[0,0],i)),a[n].length>2&&r[n].push(a[n][2]),a[n].length>3&&r[n].push(a[n][3]);}"paths"in a?a.paths=e:a.rings=e;}else if("points"in s&&"points"in a){const n=s.points,e=[];for(let r=0;r<n.length;r++)e[r]=t(n[r][0],n[r][1],[0,0],i),n[r].length>2&&e[r].push(n[r][2]),n[r].length>3&&e[r].push(n[r][3]);a.points=e;}return r}function g$b(n,t){const e=n&&(h$d(n)?n:n.spatialReference),i=t&&(h$d(t)?t:t.spatialReference);return !(n&&"type"in n&&"mesh"===n.type||t&&"type"in t&&"mesh"===t.type||!e||!i)&&(!!E$7(i,e)||(k$7(i)&&G$7(e)||k$7(e)&&G$7(i)))}function M$8(i,o){if(t$y(i))return null;const u=i.spatialReference,l=o&&(h$d(o)?o:o.spatialReference);return g$b(u,l)?E$7(u,l)?m$q(i):k$7(l)?x$c(i,y$8,k$6.WebMercator,!1,m$q(i)):G$7(l)?x$c(i,d$a,k$6.WGS84,!1,m$q(i)):null:null}function y$8(n,t,e=[0,0]){t>89.99999?t=89.99999:t<-89.99999&&(t=-89.99999);const r=p$9(t);return e[0]=p$9(n)*s$h.radius,e[1]=s$h.halfSemiMajorAxis*Math.log((1+Math.sin(r))/(1-Math.sin(r))),e}function d$a(n,t,e=[0,0],r=!1){const s=l$e(n/s$h.radius);return e[0]=r?s:s-360*Math.floor((s+180)/360),e[1]=l$e(Math.PI/2-2*Math.atan(Math.exp(-t/s$h.radius))),e}function R$6(t,i=!1,r=m$q(t)){return x$c(t,y$8,k$6.WebMercator,i,r)}function j$8(t,i=!1,r=m$q(t)){return x$c(t,d$a,k$6.WGS84,i,r)}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
var f$f;const g$a=[0,0];function x$b(e){return e&&("esri.geometry.SpatialReference"===e.declaredClass||null!=e.wkid)}const w$7=s$G.getLogger("esri.geometry.Point");let b$6=f$f=class extends p$a{constructor(...e){super(...e),this.x=0,this.y=0,this.z=void 0,this.m=void 0,this.type="point";}static copy(e,t){t._set("x",e._get("x")),t._set("y",e._get("y")),t._set("z",e._get("z")),t._set("m",e._get("m"));const r=e._get("spatialReference");t._set("spatialReference",Object.isFrozen(r)?r:r.clone());}normalizeCtorArgs(e,t,r,s,i){let o;if(Array.isArray(e))o=e,i=t,e=o[0],t=o[1],r=o[2],s=o[3];else if(e&&"object"==typeof e){if(o=e,e=null!=o.x?o.x:o.longitude,t=null!=o.y?o.y:o.latitude,r=o.z,s=o.m,(i=o.spatialReference)&&"esri.geometry.SpatialReference"!==i.declaredClass&&(i=new k$6(i)),null!=o.longitude||null!=o.latitude)if(null==o.longitude)w$7.warn(".longitude=","Latitude was defined without longitude");else if(null==o.latitude)w$7.warn(".latitude=","Longitude was defined without latitude");else if(!o.declaredClass&&i&&i.isWebMercator){const r=y$8(o.longitude,o.latitude,g$a);e=r[0],t=r[1];}}else x$b(r)?(i=r,r=null):x$b(s)&&(i=s,s=null);const a={x:e,y:t};return null==a.x&&null!=a.y?w$7.warn(".y=","Y coordinate was defined without an X coordinate"):null==a.y&&null!=a.x&&w$7.warn(".x=","X coordinate was defined without a Y coordinate"),null!=i&&(a.spatialReference=i),null!=r&&(a.z=r),null!=s&&(a.m=s),a}get cache(){return this.commitProperty("x"),this.commitProperty("y"),this.commitProperty("z"),this.commitProperty("m"),this.commitProperty("spatialReference"),{}}get hasM(){return void 0!==this.m}set hasM(e){e!==(void 0!==this._get("m"))&&(this._set("m",e?0:void 0),this._set("hasM",e));}get hasZ(){return void 0!==this.z}set hasZ(e){e!==(void 0!==this._get("z"))&&(this._set("z",e?0:void 0),this._set("hasZ",e));}get latitude(){const{spatialReference:e,x:t,y:r}=this;if(e){if(e.isWebMercator)return d$a(t,r,g$a)[1];if(e.isGeographic)return r}return null}set latitude(e){const{spatialReference:t,x:r}=this;t&&(t.isWebMercator?this._set("y",y$8(r,e,g$a)[1]):t.isGeographic&&this._set("y",e),this._set("latitude",e));}get longitude(){const{x:e,y:t,spatialReference:r}=this;if(r){if(r.isWebMercator)return d$a(e,t,g$a)[0];if(r.isGeographic)return e}return null}set longitude(e){const{y:t,spatialReference:r}=this;r&&(r.isWebMercator?this._set("x",y$8(e,t,g$a)[0]):r.isGeographic&&this._set("x",e),this._set("longitude",e));}writeX(e,t,r){t[r]=isNaN(e)?"NaN":e;}readX(e){return "string"==typeof e?NaN:e}clone(){const e=new f$f;return e.x=this.x,e.y=this.y,e.z=this.z,e.m=this.m,e.spatialReference=this.spatialReference,e}copy(e){return f$f.copy(e,this),this}equals(e){if(t$y(e))return !1;const{x:t,y:s,z:i,m:o,spatialReference:a}=this,{z:n,m:l}=e;let{x:c,y:p,spatialReference:u}=e;if(!a.equals(u))if(a.isWebMercator&&u.isWGS84)[c,p]=y$8(c,p),u=a;else {if(!a.isWGS84||!u.isWebMercator)return !1;[c,p]=d$a(c,p),u=a;}return t===c&&s===p&&i===n&&o===l&&a.wkid===u.wkid}offset(e,t,r){return n$7(this,e,t,r)}normalize(){if(!this.spatialReference)return this;const e=R$7(this.spatialReference);if(!e)return this;let t=this.x;const[r,s]=e.valid,i=2*s;let o;return t>s?(o=Math.ceil(Math.abs(t-s)/i),t-=o*i):t<r&&(o=Math.ceil(Math.abs(t-r)/i),t+=o*i),this._set("x",t),this}distance(e){return t$9(this,e)}toArray(){const e=this.hasZ,t=this.hasM;return e&&t?[this.x,this.y,this.z,this.m]:e?[this.x,this.y,this.z]:t?[this.x,this.y,this.m]:[this.x,this.y]}toJSON(e){return this.write({},e)}};e$r([d$j({readOnly:!0})],b$6.prototype,"cache",null),e$r([d$j({type:Boolean,json:{read:!1,write:{enabled:!1,overridePolicy:null}}})],b$6.prototype,"hasM",null),e$r([d$j({type:Boolean,json:{read:!1,write:{enabled:!1,overridePolicy:null}}})],b$6.prototype,"hasZ",null),e$r([d$j({type:Number})],b$6.prototype,"latitude",null),e$r([d$j({type:Number})],b$6.prototype,"longitude",null),e$r([d$j({type:Number,json:{type:[Number,String],write:{isRequired:!0,allowNull:!0}}}),c$s((e=>isNaN(e)?e:a$k(e)))],b$6.prototype,"x",void 0),e$r([r$l("x")],b$6.prototype,"writeX",null),e$r([o$s("x")],b$6.prototype,"readX",null),e$r([d$j({type:Number,json:{write:!0}})],b$6.prototype,"y",void 0),e$r([d$j({type:Number,json:{write:{overridePolicy(){return {enabled:this.hasZ}}}}})],b$6.prototype,"z",void 0),e$r([d$j({type:Number,json:{write:{overridePolicy(){return {enabled:this.hasM}}}}})],b$6.prototype,"m",void 0),b$6=f$f=e$r([n$e("esri.geometry.Point")],b$6),b$6.prototype.toJSON.isDefaultToJSON=!0;const j$7=b$6;

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
function n$5(){return [0,0,0]}function t$7(n){return [n[0],n[1],n[2]]}function r$c(n,t,r){return [n,t,r]}function e$b(t){const r=n$5(),e=Math.min(3,t.length);for(let n=0;n<e;++n)r[n]=t[n];return r}function u$g(n,t){return new Float64Array(n,t,3)}function a$9(){return n$5()}function o$e(){return r$c(1,1,1)}function s$g(){return r$c(1,0,0)}function c$e(){return r$c(0,1,0)}function i$c(){return r$c(0,0,1)}const f$e=a$9(),l$d=o$e(),_$5=s$g(),N$5=c$e(),O$5=i$c(),U$2=Object.freeze({__proto__:null,create:n$5,clone:t$7,fromValues:r$c,fromArray:e$b,createView:u$g,zeros:a$9,ones:o$e,unitX:s$g,unitY:c$e,unitZ:i$c,ZEROS:f$e,ONES:l$d,UNIT_X:_$5,UNIT_Y:N$5,UNIT_Z:O$5});

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
const a$8=1e-6,t$6=Math.random,e$a=Math.PI/180,n$4=180/Math.PI;function s$f(a){return a*e$a}function o$d(a){return a*n$4}function r$b(t,e){return Math.abs(t-e)<=a$8*Math.max(1,Math.abs(t),Math.abs(e))}const u$f=Object.freeze({__proto__:null,EPSILON:a$8,RANDOM:t$6,toRadian:s$f,toDegree:o$d,equals:r$b});

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
function s$e(t){const n=t[0],a=t[1],s=t[2];return Math.sqrt(n*n+a*a+s*s)}function r$a(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t}function o$c(t,n,a,s){return t[0]=n,t[1]=a,t[2]=s,t}function u$e(t,n,a){return t[0]=n[0]+a[0],t[1]=n[1]+a[1],t[2]=n[2]+a[2],t}function c$d(t,n,a){return t[0]=n[0]-a[0],t[1]=n[1]-a[1],t[2]=n[2]-a[2],t}function e$9(t,n,a){return t[0]=n[0]*a[0],t[1]=n[1]*a[1],t[2]=n[2]*a[2],t}function i$b(t,n,a){return t[0]=n[0]/a[0],t[1]=n[1]/a[1],t[2]=n[2]/a[2],t}function h$c(t,n){return t[0]=Math.ceil(n[0]),t[1]=Math.ceil(n[1]),t[2]=Math.ceil(n[2]),t}function M$7(t,n){return t[0]=Math.floor(n[0]),t[1]=Math.floor(n[1]),t[2]=Math.floor(n[2]),t}function f$d(t,n,a){return t[0]=Math.min(n[0],a[0]),t[1]=Math.min(n[1],a[1]),t[2]=Math.min(n[2],a[2]),t}function l$c(t,n,a){return t[0]=Math.max(n[0],a[0]),t[1]=Math.max(n[1],a[1]),t[2]=Math.max(n[2],a[2]),t}function m$c(t,n){return t[0]=Math.round(n[0]),t[1]=Math.round(n[1]),t[2]=Math.round(n[2]),t}function d$9(t,n,a){return t[0]=n[0]*a,t[1]=n[1]*a,t[2]=n[2]*a,t}function b$5(t,n,a,s){return t[0]=n[0]+a[0]*s,t[1]=n[1]+a[1]*s,t[2]=n[2]+a[2]*s,t}function q$4(t,n){const a=n[0]-t[0],s=n[1]-t[1],r=n[2]-t[2];return Math.sqrt(a*a+s*s+r*r)}function x$a(t,n){const a=n[0]-t[0],s=n[1]-t[1],r=n[2]-t[2];return a*a+s*s+r*r}function p$8(t){const n=t[0],a=t[1],s=t[2];return n*n+a*a+s*s}function v$7(t,n){return t[0]=-n[0],t[1]=-n[1],t[2]=-n[2],t}function g$9(t,n){return t[0]=1/n[0],t[1]=1/n[1],t[2]=1/n[2],t}function j$6(t,n){const a=n[0],s=n[1],r=n[2];let o=a*a+s*s+r*r;return o>0&&(o=1/Math.sqrt(o),t[0]=n[0]*o,t[1]=n[1]*o,t[2]=n[2]*o),t}function z$6(t,n){return t[0]*n[0]+t[1]*n[1]+t[2]*n[2]}function _$4(t,n,a){const s=n[0],r=n[1],o=n[2],u=a[0],c=a[1],e=a[2];return t[0]=r*e-o*c,t[1]=o*u-s*e,t[2]=s*c-r*u,t}function y$7(t,n,a,s){const r=n[0],o=n[1],u=n[2];return t[0]=r+s*(a[0]-r),t[1]=o+s*(a[1]-o),t[2]=u+s*(a[2]-u),t}function A$6(t,n,a,s,r,o){const u=o*o,c=u*(2*o-3)+1,e=u*(o-2)+o,i=u*(o-1),h=u*(3-2*o);return t[0]=n[0]*c+a[0]*e+s[0]*i+r[0]*h,t[1]=n[1]*c+a[1]*e+s[1]*i+r[1]*h,t[2]=n[2]*c+a[2]*e+s[2]*i+r[2]*h,t}function D$5(t,n,a,s,r,o){const u=1-o,c=u*u,e=o*o,i=c*u,h=3*o*c,M=3*e*u,f=e*o;return t[0]=n[0]*i+a[0]*h+s[0]*M+r[0]*f,t[1]=n[1]*i+a[1]*h+s[1]*M+r[1]*f,t[2]=n[2]*i+a[2]*h+s[2]*M+r[2]*f,t}function E$6(t,n){n=n||1;const s=2*t$6()*Math.PI,r=2*t$6()-1,o=Math.sqrt(1-r*r)*n;return t[0]=Math.cos(s)*o,t[1]=Math.sin(s)*o,t[2]=r*n,t}function I$6(t,n,a){const s=n[0],r=n[1],o=n[2];return t[0]=a[0]*s+a[4]*r+a[8]*o+a[12],t[1]=a[1]*s+a[5]*r+a[9]*o+a[13],t[2]=a[2]*s+a[6]*r+a[10]*o+a[14],t}function L$3(t,n,a){const s=n[0],r=n[1],o=n[2];return t[0]=s*a[0]+r*a[3]+o*a[6],t[1]=s*a[1]+r*a[4]+o*a[7],t[2]=s*a[2]+r*a[5]+o*a[8],t}function P$4(t,n,a){const s=a[0],r=a[1],o=a[2],u=a[3],c=n[0],e=n[1],i=n[2];let h=r*i-o*e,M=o*c-s*i,f=s*e-r*c,l=r*f-o*M,m=o*h-s*f,d=s*M-r*h;const b=2*u;return h*=b,M*=b,f*=b,l*=2,m*=2,d*=2,t[0]=c+h+l,t[1]=e+M+m,t[2]=i+f+d,t}function O$4(t,n,a,s){const r=[],o=[];return r[0]=n[0]-a[0],r[1]=n[1]-a[1],r[2]=n[2]-a[2],o[0]=r[0],o[1]=r[1]*Math.cos(s)-r[2]*Math.sin(s),o[2]=r[1]*Math.sin(s)+r[2]*Math.cos(s),t[0]=o[0]+a[0],t[1]=o[1]+a[1],t[2]=o[2]+a[2],t}function Q$3(t,n,a,s){const r=[],o=[];return r[0]=n[0]-a[0],r[1]=n[1]-a[1],r[2]=n[2]-a[2],o[0]=r[2]*Math.sin(s)+r[0]*Math.cos(s),o[1]=r[1],o[2]=r[2]*Math.cos(s)-r[0]*Math.sin(s),t[0]=o[0]+a[0],t[1]=o[1]+a[1],t[2]=o[2]+a[2],t}function R$5(t,n,a,s){const r=[],o=[];return r[0]=n[0]-a[0],r[1]=n[1]-a[1],r[2]=n[2]-a[2],o[0]=r[0]*Math.cos(s)-r[1]*Math.sin(s),o[1]=r[0]*Math.sin(s)+r[1]*Math.cos(s),o[2]=r[2],t[0]=o[0]+a[0],t[1]=o[1]+a[1],t[2]=o[2]+a[2],t}function k$5(t,n){r$a(w$6,t),r$a(B$4,n),j$6(w$6,w$6),j$6(B$4,B$4);const a=z$6(w$6,B$4);return a>1?0:a<-1?Math.PI:Math.acos(a)}const w$6=n$5(),B$4=n$5();function C$4(t){return "vec3("+t[0]+", "+t[1]+", "+t[2]+")"}function F$4(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]}function G$6(t,a){if(t===a)return !0;const s=t[0],r=t[1],o=t[2],u=a[0],c=a[1],e=a[2];return Math.abs(s-u)<=a$8*Math.max(1,Math.abs(s),Math.abs(u))&&Math.abs(r-c)<=a$8*Math.max(1,Math.abs(r),Math.abs(c))&&Math.abs(o-e)<=a$8*Math.max(1,Math.abs(o),Math.abs(e))}function H$4(t,n,a){const s=a[0]-n[0],r=a[1]-n[1],o=a[2]-n[2];let u=s*s+r*r+o*o;return u>0?(u=1/Math.sqrt(u),t[0]=s*u,t[1]=r*u,t[2]=o*u,t):(t[0]=0,t[1]=0,t[2]=0,t)}const J$4=c$d,K$3=e$9,N$4=i$b,S$3=q$4,X$3=x$a,Y$3=s$e,Z$3=p$8,T$4=Object.freeze({__proto__:null,length:s$e,copy:r$a,set:o$c,add:u$e,subtract:c$d,multiply:e$9,divide:i$b,ceil:h$c,floor:M$7,min:f$d,max:l$c,round:m$c,scale:d$9,scaleAndAdd:b$5,distance:q$4,squaredDistance:x$a,squaredLength:p$8,negate:v$7,inverse:g$9,normalize:j$6,dot:z$6,cross:_$4,lerp:y$7,hermite:A$6,bezier:D$5,random:E$6,transformMat4:I$6,transformMat3:L$3,transformQuat:P$4,rotateX:O$4,rotateY:Q$3,rotateZ:R$5,angle:k$5,str:C$4,exactEquals:F$4,equals:G$6,direction:H$4,sub:J$4,mul:K$3,div:N$4,dist:S$3,sqrDist:X$3,len:Y$3,sqrLen:Z$3});

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
function a$7(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t}function r$9(t,n,a,r,s){return t[0]=n,t[1]=a,t[2]=r,t[3]=s,t}function s$d(t,n,a){return t[0]=n[0]+a[0],t[1]=n[1]+a[1],t[2]=n[2]+a[2],t[3]=n[3]+a[3],t}function u$d(t,n,a){return t[0]=n[0]-a[0],t[1]=n[1]-a[1],t[2]=n[2]-a[2],t[3]=n[3]-a[3],t}function o$b(t,n,a){return t[0]=n[0]*a[0],t[1]=n[1]*a[1],t[2]=n[2]*a[2],t[3]=n[3]*a[3],t}function e$8(t,n,a){return t[0]=n[0]/a[0],t[1]=n[1]/a[1],t[2]=n[2]/a[2],t[3]=n[3]/a[3],t}function c$c(t,n){return t[0]=Math.ceil(n[0]),t[1]=Math.ceil(n[1]),t[2]=Math.ceil(n[2]),t[3]=Math.ceil(n[3]),t}function i$a(t,n){return t[0]=Math.floor(n[0]),t[1]=Math.floor(n[1]),t[2]=Math.floor(n[2]),t[3]=Math.floor(n[3]),t}function h$b(t,n,a){return t[0]=Math.min(n[0],a[0]),t[1]=Math.min(n[1],a[1]),t[2]=Math.min(n[2],a[2]),t[3]=Math.min(n[3],a[3]),t}function M$6(t,n,a){return t[0]=Math.max(n[0],a[0]),t[1]=Math.max(n[1],a[1]),t[2]=Math.max(n[2],a[2]),t[3]=Math.max(n[3],a[3]),t}function f$c(t,n){return t[0]=Math.round(n[0]),t[1]=Math.round(n[1]),t[2]=Math.round(n[2]),t[3]=Math.round(n[3]),t}function l$b(t,n,a){return t[0]=n[0]*a,t[1]=n[1]*a,t[2]=n[2]*a,t[3]=n[3]*a,t}function m$b(t,n,a,r){return t[0]=n[0]+a[0]*r,t[1]=n[1]+a[1]*r,t[2]=n[2]+a[2]*r,t[3]=n[3]+a[3]*r,t}function d$8(t,n){const a=n[0]-t[0],r=n[1]-t[1],s=n[2]-t[2],u=n[3]-t[3];return Math.sqrt(a*a+r*r+s*s+u*u)}function b$4(t,n){const a=n[0]-t[0],r=n[1]-t[1],s=n[2]-t[2],u=n[3]-t[3];return a*a+r*r+s*s+u*u}function x$9(t){const n=t[0],a=t[1],r=t[2],s=t[3];return Math.sqrt(n*n+a*a+r*r+s*s)}function q$3(t){const n=t[0],a=t[1],r=t[2],s=t[3];return n*n+a*a+r*r+s*s}function p$7(t,n){return t[0]=-n[0],t[1]=-n[1],t[2]=-n[2],t[3]=-n[3],t}function v$6(t,n){return t[0]=1/n[0],t[1]=1/n[1],t[2]=1/n[2],t[3]=1/n[3],t}function g$8(t,n){const a=n[0],r=n[1],s=n[2],u=n[3];let o=a*a+r*r+s*s+u*u;return o>0&&(o=1/Math.sqrt(o),t[0]=a*o,t[1]=r*o,t[2]=s*o,t[3]=u*o),t}function _$3(t,n){return t[0]*n[0]+t[1]*n[1]+t[2]*n[2]+t[3]*n[3]}function j$5(t,n,a,r){const s=n[0],u=n[1],o=n[2],e=n[3];return t[0]=s+r*(a[0]-s),t[1]=u+r*(a[1]-u),t[2]=o+r*(a[2]-o),t[3]=e+r*(a[3]-e),t}function w$5(t,a){let r,s,u,o,e,c;a=a||1;do{r=2*t$6()-1,s=2*t$6()-1,e=r*r+s*s;}while(e>=1);do{u=2*t$6()-1,o=2*t$6()-1,c=u*u+o*o;}while(c>=1);const i=Math.sqrt((1-e)/c);return t[0]=a*r,t[1]=a*s,t[2]=a*u*i,t[3]=a*o*i,t}function y$6(t,n,a){const r=n[0],s=n[1],u=n[2],o=n[3];return t[0]=a[0]*r+a[4]*s+a[8]*u+a[12]*o,t[1]=a[1]*r+a[5]*s+a[9]*u+a[13]*o,t[2]=a[2]*r+a[6]*s+a[10]*u+a[14]*o,t[3]=a[3]*r+a[7]*s+a[11]*u+a[15]*o,t}function z$5(t,n,a){const r=n[0],s=n[1],u=n[2],o=a[0],e=a[1],c=a[2],i=a[3],h=i*r+e*u-c*s,M=i*s+c*r-o*u,f=i*u+o*s-e*r,l=-o*r-e*s-c*u;return t[0]=h*i+l*-o+M*-c-f*-e,t[1]=M*i+l*-e+f*-o-h*-c,t[2]=f*i+l*-c+h*-e-M*-o,t[3]=n[3],t}function A$5(t){return "vec4("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+")"}function D$4(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]&&t[3]===n[3]}function E$5(n,a){const r=n[0],s=n[1],u=n[2],o=n[3],e=a[0],c=a[1],i=a[2],h=a[3];return Math.abs(r-e)<=a$8*Math.max(1,Math.abs(r),Math.abs(e))&&Math.abs(s-c)<=a$8*Math.max(1,Math.abs(s),Math.abs(c))&&Math.abs(u-i)<=a$8*Math.max(1,Math.abs(u),Math.abs(i))&&Math.abs(o-h)<=a$8*Math.max(1,Math.abs(o),Math.abs(h))}const L$2=u$d,k$4=o$b,B$3=e$8,C$3=d$8,F$3=b$4,G$5=x$9,H$3=q$3,I$5=Object.freeze({__proto__:null,copy:a$7,set:r$9,add:s$d,subtract:u$d,multiply:o$b,divide:e$8,ceil:c$c,floor:i$a,min:h$b,max:M$6,round:f$c,scale:l$b,scaleAndAdd:m$b,distance:d$8,squaredDistance:b$4,length:x$9,squaredLength:q$3,negate:p$7,inverse:v$6,normalize:g$8,dot:_$3,lerp:j$5,random:w$5,transformMat4:y$6,transformQuat:z$5,str:A$5,exactEquals:D$4,equals:E$5,sub:L$2,mul:k$4,div:B$3,dist:C$3,sqrDist:F$3,len:G$5,sqrLen:H$3});

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
const u$c=new Float32Array(1);function a$6(n){--n;for(let t=1;t<32;t<<=1)n|=n>>t;return n+1}function e$7(n,t,r){return Math.min(Math.max(n,t),r)}function i$9(n,t){return 0===t?0:Math.round(n/t)*t}function o$a(n){return 0==(n&n-1)}function c$b(n){return n--,n|=n>>1,n|=n>>2,n|=n>>4,n|=n>>8,n|=n>>16,++n}function f$b(n){return 10**Math.ceil(Math.LOG10E*Math.log(n))}function s$c(n,t,r){return n+(t-n)*r}function h$a(n,t,r,u,a){return s$c(u,a,(n-t)/(r-t))}function M$5(n){return n*Math.PI/180}function m$a(n){return 180*n/Math.PI}function N$3(n,t=1e-6){return (n<0?-1:1)/Math.max(Math.abs(n),t)}function l$a(n){return Math.acos(e$7(n,-1,1))}function b$3(n){return Math.asin(e$7(n,-1,1))}function x$8(n,t,r=1e-6){if(isNaN(n)||isNaN(t))return !1;if(n===t)return !0;const u=Math.abs(n-t),a=Math.abs(n),e=Math.abs(t);if(0===n||0===t||a<1e-12&&e<1e-12){if(u>.01*r)return !1}else if(u/(a+e)>r)return !1;return !0}function p$6(n,t,r=1e-6){if(isNaN(n)||isNaN(t))return !1;return (n>t?n-t:t-n)<=r}function j$4(n){return k$3(Math.max(-w$4,Math.min(n,w$4)))}function k$3(n){return u$c[0]=n,u$c[0]}function v$5(n,t){return t<n?0:1}function I$4(n,t,r){const u=e$7((r-n)/(t-n),0,1);return u*u*(3-2*u)}function P$3(r,u){const a=s$e(r),e=b$3(r[2]/a),i=Math.atan2(r[1]/a,r[0]/a);return o$c(u,a,e,i),u}function d$7(n,r){const u=n[0],a=n[1],e=n[2],i=Math.cos(a);o$c(r,u*i*Math.cos(e),u*i*Math.sin(e),u*Math.sin(a));}function g$7(n,t,u){return r$9(n,t[0],t[1],t[2],t[3]*u)}const w$4=k$3(34028234663852886e22);

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
function T$3(e){return new k$6({wkt:`GEOCCS["Spherical geocentric",\n    DATUM["Not specified",\n      SPHEROID["Sphere",${e.radius},0]],\n    PRIMEM["Greenwich",0.0,\n      AUTHORITY["EPSG","8901"]],\n    UNIT["m",1.0],\n    AXIS["Geocentric X",OTHER],\n    AXIS["Geocentric Y",EAST],\n    AXIS["Geocentric Z",NORTH]\n  ]`})}const G$4=T$3(s$h),I$3=T$3(t$8),E$4=T$3(e$c),R$4=new k$6({wkt:`GEOCCS["WGS 84",\n  DATUM["WGS_1984",\n    SPHEROID["WGS 84",${s$h.radius},298.257223563,\n      AUTHORITY["EPSG","7030"]],\n    AUTHORITY["EPSG","6326"]],\n  PRIMEM["Greenwich",0,\n    AUTHORITY["EPSG","8901"]],\n  UNIT["m",1.0,\n    AUTHORITY["EPSG","9001"]],\n  AXIS["Geocentric X",OTHER],\n  AXIS["Geocentric Y",OTHER],\n  AXIS["Geocentric Z",NORTH],\n  AUTHORITY["EPSG","4978"]\n]`});function A$4(n){return n&&n===t$8?I$3:n&&n===e$c?E$4:G$4}function O$3(n){return n&&(P$5(n)||n===I$3)?I$3:n&&(s$i(n)||n===E$4)?E$4:G$4}function p$5(n){return n&&(P$5(n)||n===I$3)?t$8:n&&(s$i(n)||n===E$4)?e$c:s$h}function u$b(n){return w$8(n)?t$8:C$5(n)?e$c:s$h}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
const m$9=39.37,f$a=s$h.radius*Math.PI/200,d$6=/UNIT\[([^\]]+)\]\]$/i,U$1=r$e,q$2=/UNIT\[([^\]]+)\]/i,p$4=new Set([4261,4305,4807,4810,4811,4812,4816,4819,4821,4901,4902,37225,104139,104140]),B$2=o$I()({meter:"meters",foot:"feet",foot_us:"us-feet",foot_clarke:"clarke-feet",yard_clarke:"clarke-yards",link_clarke:"clarke-links",yard_sears:"sears-yards",foot_sears:"sears-feet",chain_sears:"sears-chains",chain_benoit_1895_b:"benoit-1895-b-chains",yard_indian:"indian-yards",yard_indian_1937:"indian-1937-yards",foot_gold_coast:"gold-coast-feet",chain_sears_1922_truncated:"sears-1922-truncated-chains","50_kilometers":"50-kilometers","150_kilometers":"150-kilometers"}),h$9=e=>e*e,k$2=e=>e*e*e,y$5={length:{baseUnit:"meters",units:{millimeters:{inBaseUnits:.001},centimeters:{inBaseUnits:.01},decimeters:{inBaseUnits:.1},meters:{inBaseUnits:1},kilometers:{inBaseUnits:1e3},inches:{inBaseUnits:.0254},feet:{inBaseUnits:.3048},yards:{inBaseUnits:.9144},miles:{inBaseUnits:1609.344},"nautical-miles":{inBaseUnits:1852},"us-feet":{inBaseUnits:1200/3937}}},area:{baseUnit:"square-meters",units:{"square-millimeters":{inBaseUnits:h$9(.001)},"square-centimeters":{inBaseUnits:h$9(.01)},"square-decimeters":{inBaseUnits:h$9(.1)},"square-meters":{inBaseUnits:1},"square-kilometers":{inBaseUnits:h$9(1e3)},"square-inches":{inBaseUnits:h$9(.0254)},"square-feet":{inBaseUnits:h$9(.3048)},"square-yards":{inBaseUnits:h$9(.9144)},"square-miles":{inBaseUnits:h$9(1609.344)},"square-us-feet":{inBaseUnits:h$9(1200/3937)},acres:{inBaseUnits:.0015625*h$9(1609.344)},ares:{inBaseUnits:100},hectares:{inBaseUnits:1e4}}},volume:{baseUnit:"liters",units:{liters:{inBaseUnits:1},"cubic-millimeters":{inBaseUnits:1e3*k$2(.001)},"cubic-centimeters":{inBaseUnits:1e3*k$2(.01)},"cubic-decimeters":{inBaseUnits:1e3*k$2(.1)},"cubic-meters":{inBaseUnits:1e3},"cubic-kilometers":{inBaseUnits:1e3*k$2(1e3)},"cubic-inches":{inBaseUnits:1e3*k$2(.0254)},"cubic-feet":{inBaseUnits:1e3*k$2(.3048)},"cubic-yards":{inBaseUnits:1e3*k$2(.9144)},"cubic-miles":{inBaseUnits:1e3*k$2(1609.344)}}},angle:{baseUnit:"radians",units:{radians:{inBaseUnits:1},degrees:{inBaseUnits:Math.PI/180}}}},b$2=function(){const e={};for(const s in y$5)for(const r in y$5[s].units)e[r]=s;return e}();function _$2(e,s,r){return e*y$5[r].units[s].inBaseUnits}function g$6(e,s,r){return e/y$5[r].units[s].inBaseUnits}const S$2=["metric","imperial","square-inches","square-feet","square-yards","square-miles","square-us-feet","square-meters","square-kilometers","acres","ares","hectares"],w$3=["metric","imperial","inches","feet","yards","miles","nautical-miles","us-feet","meters","kilometers"];function j$3(e){return "imperial"===e||"metric"===e}function M$4(e){const s=b$2[e];if(s)return s;throw new Error("unknown type")}function I$2(e){return y$5[e].baseUnit}function P$2(e){return I$2(M$4(e))}function C$2(e,s=null){return s=s||M$4(e),y$5[s].baseUnit===e}function D$3(e,s,r){if(s===r)return e;const t=M$4(s);if(t!==M$4(r))throw new Error("incompatible units");const i=C$2(s,t)?e:_$2(e,s,t);return C$2(r,t)?i:g$6(i,r,t)}function x$7(e,s,r){switch(r){case"metric":return E$3(e,s);case"imperial":return O$2(e,s);default:return r}}function v$4(e,s,r){switch(r){case"metric":return N$2(e,s);case"imperial":return F$2(e,s);default:return r}}function E$3(e,s){return D$3(e,s,"meters")<3e3?"meters":"kilometers"}function N$2(e,s){return D$3(e,s,"meters")<1e5?"meters":"kilometers"}function O$2(e,s){return D$3(e,s,"feet")<1e3?"feet":"miles"}function F$2(e,s){return D$3(e,s,"feet")<1e5?"feet":"miles"}function J$3(e,s){return D$3(e,s,"square-meters")<3e6?"square-meters":"square-kilometers"}function K$2(e,s){return D$3(e,s,"square-feet")<1e6?"square-feet":"square-miles"}function R$3(e,s,r){return D$3(e,s,"meters")/(r*Math.PI/180)}function A$3(e){return B$2.fromJSON(e.toLowerCase())||null}function T$2(e){return B$2.toJSON(e)||null}function Y$2(e){if(e&&"object"==typeof e&&!A$7(e))return 1;const s=H$2(e);return s>1e5?1:s}function G$3(e){return H$2(e)>=(e instanceof k$6?p$5(e).metersPerDegree:1e5)?"meters":z$4(e)}function H$2(e,s=s$h.metersPerDegree){return L$1(e,!0)||s}function L$1(e,s=!1){let r,t,i=null;if(null!=e&&("object"==typeof e?(r=e.wkid,t=e.wkt):"number"==typeof e?r=e:"string"==typeof e&&(t=e)),r){if(w$8(r))return t$8.metersPerDegree;if(C$5(r))return e$c.metersPerDegree;i=U$1.values[U$1[r]],!i&&s&&p$4.has(r)&&(i=f$a);}else t&&(V$1(t)?i=W(d$6.exec(t),i):Q$2(t)&&(i=W(q$2.exec(t),i)));return i}function W(e,s){return e&&e[1]?$$1(e[1]):s}function $$1(e){return parseFloat(e.split(",")[1])}function z$4(e){let r,t,i=null;if(null!=e&&("object"==typeof e?(r=e.wkid,t=e.wkt):"number"==typeof e?r=e:"string"==typeof e&&(t=e)),r)i=U$1.units[U$1[r]];else if(t){const e=V$1(t)?d$6:Q$2(t)?q$2:null;if(e){const s=e.exec(t);s&&s[1]&&(i=Z$2(s[1]));}}return r$z(i)?A$3(i):null}function Q$2(e){return /^GEOCCS/i.test(e)}function V$1(e){return /^PROJCS/i.test(e)}const X$2=1e-7;function Z$2(e){const s=/[\\"\\']{1}([^\\"\\']+)/.exec(e);let r=s&&s[1];if(!r||-1===U$1.units.indexOf(r)){const s=$$1(e);r=null;const t=U$1.values;for(let e=0;e<t.length;++e)if(Math.abs(s-t[e])<X$2){r=U$1.units[e];break}}return r}function ee$1(e){if(!e)return null;switch(z$4(e)){case"feet":case"us-feet":case"clarke-feet":case"clarke-yards":case"clarke-links":case"sears-yards":case"sears-feet":case"sears-chains":case"benoit-1895-b-chains":case"indian-yards":case"indian-1937-yards":case"gold-coast-feet":case"sears-1922-truncated-chains":return "imperial";case"50-kilometers":case"150-kilometers":case"meters":return "metric";case null:case void 0:return null}return null}const se$1={esriAcres:"acres",esriAres:"ares",esriHectares:"hectares",esriSquareCentimeters:"square-centimeters",esriSquareDecimeters:"square-decimeters",esriSquareFeet:"square-feet",esriSquareInches:"square-inches",esriSquareKilometers:"square-kilometers",esriSquareMeters:"square-meters",esriSquareMiles:"square-miles",esriSquareMillimeters:"square-millimeters",esriSquareUsFeet:"square-us-feet",esriSquareYards:"square-yards"},re$1={esriCentimeters:"centimeters",esriDecimeters:"decimeters",esriFeet:"feet",esriInches:"inches",esriKilometers:"kilometers",esriMeters:"meters",esriMiles:"miles",esriMillimeters:"millimeters",esriNauticalMiles:"nautical-miles",esriYards:"yards"},te$1=o$I()(se$1),ie$1=o$I()(re$1),ne$1=o$I()({...se$1,...re$1});

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
function n$3(t,a){return t[0]=a[0],t[1]=a[1],t[2]=a[2],t[3]=a[3],t[4]=a[4],t[5]=a[5],t[6]=a[6],t[7]=a[7],t[8]=a[8],t[9]=a[9],t[10]=a[10],t[11]=a[11],t[12]=a[12],t[13]=a[13],t[14]=a[14],t[15]=a[15],t}function s$b(t,a,n,s,r,o,h,M,u,e,c,i,f,b,l,m,x){return t[0]=a,t[1]=n,t[2]=s,t[3]=r,t[4]=o,t[5]=h,t[6]=M,t[7]=u,t[8]=e,t[9]=c,t[10]=i,t[11]=f,t[12]=b,t[13]=l,t[14]=m,t[15]=x,t}function r$8(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function o$9(t,a){if(t===a){const n=a[1],s=a[2],r=a[3],o=a[6],h=a[7],M=a[11];t[1]=a[4],t[2]=a[8],t[3]=a[12],t[4]=n,t[6]=a[9],t[7]=a[13],t[8]=s,t[9]=o,t[11]=a[14],t[12]=r,t[13]=h,t[14]=M;}else t[0]=a[0],t[1]=a[4],t[2]=a[8],t[3]=a[12],t[4]=a[1],t[5]=a[5],t[6]=a[9],t[7]=a[13],t[8]=a[2],t[9]=a[6],t[10]=a[10],t[11]=a[14],t[12]=a[3],t[13]=a[7],t[14]=a[11],t[15]=a[15];return t}function h$8(t,a){const n=a[0],s=a[1],r=a[2],o=a[3],h=a[4],M=a[5],u=a[6],e=a[7],c=a[8],i=a[9],f=a[10],b=a[11],l=a[12],m=a[13],x=a[14],q=a[15],p=n*M-s*h,g=n*u-r*h,d=n*e-o*h,R=s*u-r*M,S=s*e-o*M,T=r*e-o*u,y=c*m-i*l,j=c*x-f*l,v=c*q-b*l,D=i*x-f*m,I=i*q-b*m,O=f*q-b*x;let P=p*O-g*I+d*D+R*v-S*j+T*y;return P?(P=1/P,t[0]=(M*O-u*I+e*D)*P,t[1]=(r*I-s*O-o*D)*P,t[2]=(m*T-x*S+q*R)*P,t[3]=(f*S-i*T-b*R)*P,t[4]=(u*v-h*O-e*j)*P,t[5]=(n*O-r*v+o*j)*P,t[6]=(x*d-l*T-q*g)*P,t[7]=(c*T-f*d+b*g)*P,t[8]=(h*I-M*v+e*y)*P,t[9]=(s*v-n*I-o*y)*P,t[10]=(l*S-m*d+q*p)*P,t[11]=(i*d-c*S-b*p)*P,t[12]=(M*j-h*D-u*y)*P,t[13]=(n*D-s*j+r*y)*P,t[14]=(m*g-l*R-x*p)*P,t[15]=(c*R-i*g+f*p)*P,t):null}function M$3(t,a){const n=a[0],s=a[1],r=a[2],o=a[3],h=a[4],M=a[5],u=a[6],e=a[7],c=a[8],i=a[9],f=a[10],b=a[11],l=a[12],m=a[13],x=a[14],q=a[15];return t[0]=M*(f*q-b*x)-i*(u*q-e*x)+m*(u*b-e*f),t[1]=-(s*(f*q-b*x)-i*(r*q-o*x)+m*(r*b-o*f)),t[2]=s*(u*q-e*x)-M*(r*q-o*x)+m*(r*e-o*u),t[3]=-(s*(u*b-e*f)-M*(r*b-o*f)+i*(r*e-o*u)),t[4]=-(h*(f*q-b*x)-c*(u*q-e*x)+l*(u*b-e*f)),t[5]=n*(f*q-b*x)-c*(r*q-o*x)+l*(r*b-o*f),t[6]=-(n*(u*q-e*x)-h*(r*q-o*x)+l*(r*e-o*u)),t[7]=n*(u*b-e*f)-h*(r*b-o*f)+c*(r*e-o*u),t[8]=h*(i*q-b*m)-c*(M*q-e*m)+l*(M*b-e*i),t[9]=-(n*(i*q-b*m)-c*(s*q-o*m)+l*(s*b-o*i)),t[10]=n*(M*q-e*m)-h*(s*q-o*m)+l*(s*e-o*M),t[11]=-(n*(M*b-e*i)-h*(s*b-o*i)+c*(s*e-o*M)),t[12]=-(h*(i*x-f*m)-c*(M*x-u*m)+l*(M*f-u*i)),t[13]=n*(i*x-f*m)-c*(s*x-r*m)+l*(s*f-r*i),t[14]=-(n*(M*x-u*m)-h*(s*x-r*m)+l*(s*u-r*M)),t[15]=n*(M*f-u*i)-h*(s*f-r*i)+c*(s*u-r*M),t}function u$a(t){const a=t[0],n=t[1],s=t[2],r=t[3],o=t[4],h=t[5],M=t[6],u=t[7],e=t[8],c=t[9],i=t[10],f=t[11],b=t[12],l=t[13],m=t[14],x=t[15];return (a*h-n*o)*(i*x-f*m)-(a*M-s*o)*(c*x-f*l)+(a*u-r*o)*(c*m-i*l)+(n*M-s*h)*(e*x-f*b)-(n*u-r*h)*(e*m-i*b)+(s*u-r*M)*(e*l-c*b)}function e$6(t,a,n){const s=a[0],r=a[1],o=a[2],h=a[3],M=a[4],u=a[5],e=a[6],c=a[7],i=a[8],f=a[9],b=a[10],l=a[11],m=a[12],x=a[13],q=a[14],p=a[15];let g=n[0],d=n[1],R=n[2],S=n[3];return t[0]=g*s+d*M+R*i+S*m,t[1]=g*r+d*u+R*f+S*x,t[2]=g*o+d*e+R*b+S*q,t[3]=g*h+d*c+R*l+S*p,g=n[4],d=n[5],R=n[6],S=n[7],t[4]=g*s+d*M+R*i+S*m,t[5]=g*r+d*u+R*f+S*x,t[6]=g*o+d*e+R*b+S*q,t[7]=g*h+d*c+R*l+S*p,g=n[8],d=n[9],R=n[10],S=n[11],t[8]=g*s+d*M+R*i+S*m,t[9]=g*r+d*u+R*f+S*x,t[10]=g*o+d*e+R*b+S*q,t[11]=g*h+d*c+R*l+S*p,g=n[12],d=n[13],R=n[14],S=n[15],t[12]=g*s+d*M+R*i+S*m,t[13]=g*r+d*u+R*f+S*x,t[14]=g*o+d*e+R*b+S*q,t[15]=g*h+d*c+R*l+S*p,t}function c$a(t,a,n){const s=n[0],r=n[1],o=n[2];let h,M,u,e,c,i,f,b,l,m,x,q;return a===t?(t[12]=a[0]*s+a[4]*r+a[8]*o+a[12],t[13]=a[1]*s+a[5]*r+a[9]*o+a[13],t[14]=a[2]*s+a[6]*r+a[10]*o+a[14],t[15]=a[3]*s+a[7]*r+a[11]*o+a[15]):(h=a[0],M=a[1],u=a[2],e=a[3],c=a[4],i=a[5],f=a[6],b=a[7],l=a[8],m=a[9],x=a[10],q=a[11],t[0]=h,t[1]=M,t[2]=u,t[3]=e,t[4]=c,t[5]=i,t[6]=f,t[7]=b,t[8]=l,t[9]=m,t[10]=x,t[11]=q,t[12]=h*s+c*r+l*o+a[12],t[13]=M*s+i*r+m*o+a[13],t[14]=u*s+f*r+x*o+a[14],t[15]=e*s+b*r+q*o+a[15]),t}function i$8(t,a,n){const s=n[0],r=n[1],o=n[2];return t[0]=a[0]*s,t[1]=a[1]*s,t[2]=a[2]*s,t[3]=a[3]*s,t[4]=a[4]*r,t[5]=a[5]*r,t[6]=a[6]*r,t[7]=a[7]*r,t[8]=a[8]*o,t[9]=a[9]*o,t[10]=a[10]*o,t[11]=a[11]*o,t[12]=a[12],t[13]=a[13],t[14]=a[14],t[15]=a[15],t}function f$9(t,n,s,r){let o,h,M,u,e,c,i,f,b,l,m,x,q,p,g,d,R,S,T,y,j,v,D,I,O=r[0],P=r[1],A=r[2],_=Math.sqrt(O*O+P*P+A*A);return _<a$8?null:(_=1/_,O*=_,P*=_,A*=_,o=Math.sin(s),h=Math.cos(s),M=1-h,u=n[0],e=n[1],c=n[2],i=n[3],f=n[4],b=n[5],l=n[6],m=n[7],x=n[8],q=n[9],p=n[10],g=n[11],d=O*O*M+h,R=P*O*M+A*o,S=A*O*M-P*o,T=O*P*M-A*o,y=P*P*M+h,j=A*P*M+O*o,v=O*A*M+P*o,D=P*A*M-O*o,I=A*A*M+h,t[0]=u*d+f*R+x*S,t[1]=e*d+b*R+q*S,t[2]=c*d+l*R+p*S,t[3]=i*d+m*R+g*S,t[4]=u*T+f*y+x*j,t[5]=e*T+b*y+q*j,t[6]=c*T+l*y+p*j,t[7]=i*T+m*y+g*j,t[8]=u*v+f*D+x*I,t[9]=e*v+b*D+q*I,t[10]=c*v+l*D+p*I,t[11]=i*v+m*D+g*I,n!==t&&(t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15]),t)}function b$1(t,a,n){const s=Math.sin(n),r=Math.cos(n),o=a[4],h=a[5],M=a[6],u=a[7],e=a[8],c=a[9],i=a[10],f=a[11];return a!==t&&(t[0]=a[0],t[1]=a[1],t[2]=a[2],t[3]=a[3],t[12]=a[12],t[13]=a[13],t[14]=a[14],t[15]=a[15]),t[4]=o*r+e*s,t[5]=h*r+c*s,t[6]=M*r+i*s,t[7]=u*r+f*s,t[8]=e*r-o*s,t[9]=c*r-h*s,t[10]=i*r-M*s,t[11]=f*r-u*s,t}function l$9(t,a,n){const s=Math.sin(n),r=Math.cos(n),o=a[0],h=a[1],M=a[2],u=a[3],e=a[8],c=a[9],i=a[10],f=a[11];return a!==t&&(t[4]=a[4],t[5]=a[5],t[6]=a[6],t[7]=a[7],t[12]=a[12],t[13]=a[13],t[14]=a[14],t[15]=a[15]),t[0]=o*r-e*s,t[1]=h*r-c*s,t[2]=M*r-i*s,t[3]=u*r-f*s,t[8]=o*s+e*r,t[9]=h*s+c*r,t[10]=M*s+i*r,t[11]=u*s+f*r,t}function m$8(t,a,n){const s=Math.sin(n),r=Math.cos(n),o=a[0],h=a[1],M=a[2],u=a[3],e=a[4],c=a[5],i=a[6],f=a[7];return a!==t&&(t[8]=a[8],t[9]=a[9],t[10]=a[10],t[11]=a[11],t[12]=a[12],t[13]=a[13],t[14]=a[14],t[15]=a[15]),t[0]=o*r+e*s,t[1]=h*r+c*s,t[2]=M*r+i*s,t[3]=u*r+f*s,t[4]=e*r-o*s,t[5]=c*r-h*s,t[6]=i*r-M*s,t[7]=f*r-u*s,t}function x$6(t,a){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=a[0],t[13]=a[1],t[14]=a[2],t[15]=1,t}function q$1(t,a){return t[0]=a[0],t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=a[1],t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=a[2],t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function p$3(t,n,s){let r,o,h,M=s[0],u=s[1],e=s[2],c=Math.sqrt(M*M+u*u+e*e);return c<a$8?null:(c=1/c,M*=c,u*=c,e*=c,r=Math.sin(n),o=Math.cos(n),h=1-o,t[0]=M*M*h+o,t[1]=u*M*h+e*r,t[2]=e*M*h-u*r,t[3]=0,t[4]=M*u*h-e*r,t[5]=u*u*h+o,t[6]=e*u*h+M*r,t[7]=0,t[8]=M*e*h+u*r,t[9]=u*e*h-M*r,t[10]=e*e*h+o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t)}function g$5(t,a){const n=Math.sin(a),s=Math.cos(a);return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=s,t[6]=n,t[7]=0,t[8]=0,t[9]=-n,t[10]=s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function d$5(t,a){const n=Math.sin(a),s=Math.cos(a);return t[0]=s,t[1]=0,t[2]=-n,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=n,t[9]=0,t[10]=s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function R$2(t,a){const n=Math.sin(a),s=Math.cos(a);return t[0]=s,t[1]=n,t[2]=0,t[3]=0,t[4]=-n,t[5]=s,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function S$1(t,a,n){const s=a[0],r=a[1],o=a[2],h=a[3],M=s+s,u=r+r,e=o+o,c=s*M,i=s*u,f=s*e,b=r*u,l=r*e,m=o*e,x=h*M,q=h*u,p=h*e;return t[0]=1-(b+m),t[1]=i+p,t[2]=f-q,t[3]=0,t[4]=i-p,t[5]=1-(c+m),t[6]=l+x,t[7]=0,t[8]=f+q,t[9]=l-x,t[10]=1-(c+b),t[11]=0,t[12]=n[0],t[13]=n[1],t[14]=n[2],t[15]=1,t}function T$1(t,a){const n=y$4,s=-a[0],r=-a[1],o=-a[2],h=a[3],M=a[4],u=a[5],e=a[6],c=a[7],i=s*s+r*r+o*o+h*h;return i>0?(n[0]=2*(M*h+c*s+u*o-e*r)/i,n[1]=2*(u*h+c*r+e*s-M*o)/i,n[2]=2*(e*h+c*o+M*r-u*s)/i):(n[0]=2*(M*h+c*s+u*o-e*r),n[1]=2*(u*h+c*r+e*s-M*o),n[2]=2*(e*h+c*o+M*r-u*s)),S$1(t,a,n),t}const y$4=n$5();function j$2(t,a){return t[0]=a[12],t[1]=a[13],t[2]=a[14],t}function v$3(t,a){const n=a[0],s=a[1],r=a[2],o=a[4],h=a[5],M=a[6],u=a[8],e=a[9],c=a[10];return t[0]=Math.sqrt(n*n+s*s+r*r),t[1]=Math.sqrt(o*o+h*h+M*M),t[2]=Math.sqrt(u*u+e*e+c*c),t}function D$2(t,a){const n=a[0]+a[5]+a[10];let s=0;return n>0?(s=2*Math.sqrt(n+1),t[3]=.25*s,t[0]=(a[6]-a[9])/s,t[1]=(a[8]-a[2])/s,t[2]=(a[1]-a[4])/s):a[0]>a[5]&&a[0]>a[10]?(s=2*Math.sqrt(1+a[0]-a[5]-a[10]),t[3]=(a[6]-a[9])/s,t[0]=.25*s,t[1]=(a[1]+a[4])/s,t[2]=(a[8]+a[2])/s):a[5]>a[10]?(s=2*Math.sqrt(1+a[5]-a[0]-a[10]),t[3]=(a[8]-a[2])/s,t[0]=(a[1]+a[4])/s,t[1]=.25*s,t[2]=(a[6]+a[9])/s):(s=2*Math.sqrt(1+a[10]-a[0]-a[5]),t[3]=(a[1]-a[4])/s,t[0]=(a[8]+a[2])/s,t[1]=(a[6]+a[9])/s,t[2]=.25*s),t}function I$1(t,a,n,s){const r=a[0],o=a[1],h=a[2],M=a[3],u=r+r,e=o+o,c=h+h,i=r*u,f=r*e,b=r*c,l=o*e,m=o*c,x=h*c,q=M*u,p=M*e,g=M*c,d=s[0],R=s[1],S=s[2];return t[0]=(1-(l+x))*d,t[1]=(f+g)*d,t[2]=(b-p)*d,t[3]=0,t[4]=(f-g)*R,t[5]=(1-(i+x))*R,t[6]=(m+q)*R,t[7]=0,t[8]=(b+p)*S,t[9]=(m-q)*S,t[10]=(1-(i+l))*S,t[11]=0,t[12]=n[0],t[13]=n[1],t[14]=n[2],t[15]=1,t}function O$1(t,a,n,s,r){const o=a[0],h=a[1],M=a[2],u=a[3],e=o+o,c=h+h,i=M+M,f=o*e,b=o*c,l=o*i,m=h*c,x=h*i,q=M*i,p=u*e,g=u*c,d=u*i,R=s[0],S=s[1],T=s[2],y=r[0],j=r[1],v=r[2],D=(1-(m+q))*R,I=(b+d)*R,O=(l-g)*R,P=(b-d)*S,A=(1-(f+q))*S,_=(x+p)*S,w=(l+g)*T,E=(x-p)*T,F=(1-(f+m))*T;return t[0]=D,t[1]=I,t[2]=O,t[3]=0,t[4]=P,t[5]=A,t[6]=_,t[7]=0,t[8]=w,t[9]=E,t[10]=F,t[11]=0,t[12]=n[0]+y-(D*y+P*j+w*v),t[13]=n[1]+j-(I*y+A*j+E*v),t[14]=n[2]+v-(O*y+_*j+F*v),t[15]=1,t}function P$1(t,a){const n=a[0],s=a[1],r=a[2],o=a[3],h=n+n,M=s+s,u=r+r,e=n*h,c=s*h,i=s*M,f=r*h,b=r*M,l=r*u,m=o*h,x=o*M,q=o*u;return t[0]=1-i-l,t[1]=c+q,t[2]=f-x,t[3]=0,t[4]=c-q,t[5]=1-e-l,t[6]=b+m,t[7]=0,t[8]=f+x,t[9]=b-m,t[10]=1-e-i,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function A$2(t,a,n,s,r,o,h){const M=1/(n-a),u=1/(r-s),e=1/(o-h);return t[0]=2*o*M,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=2*o*u,t[6]=0,t[7]=0,t[8]=(n+a)*M,t[9]=(r+s)*u,t[10]=(h+o)*e,t[11]=-1,t[12]=0,t[13]=0,t[14]=h*o*2*e,t[15]=0,t}function _$1(t,a,n,s,r){const o=1/Math.tan(a/2);let h;return t[0]=o/n,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=o,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[11]=-1,t[12]=0,t[13]=0,t[15]=0,null!=r&&r!==1/0?(h=1/(s-r),t[10]=(r+s)*h,t[14]=2*r*s*h):(t[10]=-1,t[14]=-2*s),t}function w$2(t,a,n,s){const r=Math.tan(a.upDegrees*Math.PI/180),o=Math.tan(a.downDegrees*Math.PI/180),h=Math.tan(a.leftDegrees*Math.PI/180),M=Math.tan(a.rightDegrees*Math.PI/180),u=2/(h+M),e=2/(r+o);return t[0]=u,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=e,t[6]=0,t[7]=0,t[8]=-(h-M)*u*.5,t[9]=(r-o)*e*.5,t[10]=s/(n-s),t[11]=-1,t[12]=0,t[13]=0,t[14]=s*n/(n-s),t[15]=0,t}function E$2(t,a,n,s,r,o,h){const M=1/(a-n),u=1/(s-r),e=1/(o-h);return t[0]=-2*M,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=-2*u,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=2*e,t[11]=0,t[12]=(a+n)*M,t[13]=(r+s)*u,t[14]=(h+o)*e,t[15]=1,t}function F$1(t,n,s,o){let h,M,u,e,c,i,f,b,l,m;const x=n[0],q=n[1],p=n[2],g=o[0],d=o[1],R=o[2],S=s[0],T=s[1],y=s[2];return Math.abs(x-S)<a$8&&Math.abs(q-T)<a$8&&Math.abs(p-y)<a$8?r$8(t):(f=x-S,b=q-T,l=p-y,m=1/Math.sqrt(f*f+b*b+l*l),f*=m,b*=m,l*=m,h=d*l-R*b,M=R*f-g*l,u=g*b-d*f,m=Math.sqrt(h*h+M*M+u*u),m?(m=1/m,h*=m,M*=m,u*=m):(h=0,M=0,u=0),e=b*u-l*M,c=l*h-f*u,i=f*M-b*h,m=Math.sqrt(e*e+c*c+i*i),m?(m=1/m,e*=m,c*=m,i*=m):(e=0,c=0,i=0),t[0]=h,t[1]=e,t[2]=f,t[3]=0,t[4]=M,t[5]=c,t[6]=b,t[7]=0,t[8]=u,t[9]=i,t[10]=l,t[11]=0,t[12]=-(h*x+M*q+u*p),t[13]=-(e*x+c*q+i*p),t[14]=-(f*x+b*q+l*p),t[15]=1,t)}function Q$1(t,a,n,s){const r=a[0],o=a[1],h=a[2],M=s[0],u=s[1],e=s[2];let c=r-n[0],i=o-n[1],f=h-n[2],b=c*c+i*i+f*f;b>0&&(b=1/Math.sqrt(b),c*=b,i*=b,f*=b);let l=u*f-e*i,m=e*c-M*f,x=M*i-u*c;return b=l*l+m*m+x*x,b>0&&(b=1/Math.sqrt(b),l*=b,m*=b,x*=b),t[0]=l,t[1]=m,t[2]=x,t[3]=0,t[4]=i*x-f*m,t[5]=f*l-c*x,t[6]=c*m-i*l,t[7]=0,t[8]=c,t[9]=i,t[10]=f,t[11]=0,t[12]=r,t[13]=o,t[14]=h,t[15]=1,t}function k$1(t){return "mat4("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+", "+t[6]+", "+t[7]+", "+t[8]+", "+t[9]+", "+t[10]+", "+t[11]+", "+t[12]+", "+t[13]+", "+t[14]+", "+t[15]+")"}function z$3(t){return Math.sqrt(t[0]**2+t[1]**2+t[2]**2+t[3]**2+t[4]**2+t[5]**2+t[6]**2+t[7]**2+t[8]**2+t[9]**2+t[10]**2+t[11]**2+t[12]**2+t[13]**2+t[14]**2+t[15]**2)}function N$1(t,a,n){return t[0]=a[0]+n[0],t[1]=a[1]+n[1],t[2]=a[2]+n[2],t[3]=a[3]+n[3],t[4]=a[4]+n[4],t[5]=a[5]+n[5],t[6]=a[6]+n[6],t[7]=a[7]+n[7],t[8]=a[8]+n[8],t[9]=a[9]+n[9],t[10]=a[10]+n[10],t[11]=a[11]+n[11],t[12]=a[12]+n[12],t[13]=a[13]+n[13],t[14]=a[14]+n[14],t[15]=a[15]+n[15],t}function X$1(t,a,n){return t[0]=a[0]-n[0],t[1]=a[1]-n[1],t[2]=a[2]-n[2],t[3]=a[3]-n[3],t[4]=a[4]-n[4],t[5]=a[5]-n[5],t[6]=a[6]-n[6],t[7]=a[7]-n[7],t[8]=a[8]-n[8],t[9]=a[9]-n[9],t[10]=a[10]-n[10],t[11]=a[11]-n[11],t[12]=a[12]-n[12],t[13]=a[13]-n[13],t[14]=a[14]-n[14],t[15]=a[15]-n[15],t}function Y$1(t,a,n){return t[0]=a[0]*n,t[1]=a[1]*n,t[2]=a[2]*n,t[3]=a[3]*n,t[4]=a[4]*n,t[5]=a[5]*n,t[6]=a[6]*n,t[7]=a[7]*n,t[8]=a[8]*n,t[9]=a[9]*n,t[10]=a[10]*n,t[11]=a[11]*n,t[12]=a[12]*n,t[13]=a[13]*n,t[14]=a[14]*n,t[15]=a[15]*n,t}function Z$1(t,a,n,s){return t[0]=a[0]+n[0]*s,t[1]=a[1]+n[1]*s,t[2]=a[2]+n[2]*s,t[3]=a[3]+n[3]*s,t[4]=a[4]+n[4]*s,t[5]=a[5]+n[5]*s,t[6]=a[6]+n[6]*s,t[7]=a[7]+n[7]*s,t[8]=a[8]+n[8]*s,t[9]=a[9]+n[9]*s,t[10]=a[10]+n[10]*s,t[11]=a[11]+n[11]*s,t[12]=a[12]+n[12]*s,t[13]=a[13]+n[13]*s,t[14]=a[14]+n[14]*s,t[15]=a[15]+n[15]*s,t}function B$1(t,a){return t[0]===a[0]&&t[1]===a[1]&&t[2]===a[2]&&t[3]===a[3]&&t[4]===a[4]&&t[5]===a[5]&&t[6]===a[6]&&t[7]===a[7]&&t[8]===a[8]&&t[9]===a[9]&&t[10]===a[10]&&t[11]===a[11]&&t[12]===a[12]&&t[13]===a[13]&&t[14]===a[14]&&t[15]===a[15]}function C$1(t,n){if(t===n)return !0;const s=t[0],r=t[1],o=t[2],h=t[3],M=t[4],u=t[5],e=t[6],c=t[7],i=t[8],f=t[9],b=t[10],l=t[11],m=t[12],x=t[13],q=t[14],p=t[15],g=n[0],d=n[1],R=n[2],S=n[3],T=n[4],y=n[5],j=n[6],v=n[7],D=n[8],I=n[9],O=n[10],P=n[11],A=n[12],_=n[13],w=n[14],E=n[15];return Math.abs(s-g)<=a$8*Math.max(1,Math.abs(s),Math.abs(g))&&Math.abs(r-d)<=a$8*Math.max(1,Math.abs(r),Math.abs(d))&&Math.abs(o-R)<=a$8*Math.max(1,Math.abs(o),Math.abs(R))&&Math.abs(h-S)<=a$8*Math.max(1,Math.abs(h),Math.abs(S))&&Math.abs(M-T)<=a$8*Math.max(1,Math.abs(M),Math.abs(T))&&Math.abs(u-y)<=a$8*Math.max(1,Math.abs(u),Math.abs(y))&&Math.abs(e-j)<=a$8*Math.max(1,Math.abs(e),Math.abs(j))&&Math.abs(c-v)<=a$8*Math.max(1,Math.abs(c),Math.abs(v))&&Math.abs(i-D)<=a$8*Math.max(1,Math.abs(i),Math.abs(D))&&Math.abs(f-I)<=a$8*Math.max(1,Math.abs(f),Math.abs(I))&&Math.abs(b-O)<=a$8*Math.max(1,Math.abs(b),Math.abs(O))&&Math.abs(l-P)<=a$8*Math.max(1,Math.abs(l),Math.abs(P))&&Math.abs(m-A)<=a$8*Math.max(1,Math.abs(m),Math.abs(A))&&Math.abs(x-_)<=a$8*Math.max(1,Math.abs(x),Math.abs(_))&&Math.abs(q-w)<=a$8*Math.max(1,Math.abs(q),Math.abs(w))&&Math.abs(p-E)<=a$8*Math.max(1,Math.abs(p),Math.abs(E))}function G$2(t){const n=a$8,s=t[0],r=t[1],o=t[2],h=t[4],M=t[5],u=t[6],e=t[8],c=t[9],i=t[10];return Math.abs(1-(s*s+h*h+e*e))<=n&&Math.abs(1-(r*r+M*M+c*c))<=n&&Math.abs(1-(o*o+u*u+i*i))<=n}const H$1=e$6,J$2=X$1,K$1=Object.freeze({__proto__:null,copy:n$3,set:s$b,identity:r$8,transpose:o$9,invert:h$8,adjoint:M$3,determinant:u$a,multiply:e$6,translate:c$a,scale:i$8,rotate:f$9,rotateX:b$1,rotateY:l$9,rotateZ:m$8,fromTranslation:x$6,fromScaling:q$1,fromRotation:p$3,fromXRotation:g$5,fromYRotation:d$5,fromZRotation:R$2,fromRotationTranslation:S$1,fromQuat2:T$1,getTranslation:j$2,getScaling:v$3,getRotation:D$2,fromRotationTranslationScale:I$1,fromRotationTranslationScaleOrigin:O$1,fromQuat:P$1,frustum:A$2,perspective:_$1,perspectiveFromFieldOfView:w$2,ortho:E$2,lookAt:F$1,targetTo:Q$1,str:k$1,frob:z$3,add:N$1,subtract:X$1,multiplyScalar:Y$1,multiplyScalarAndAdd:Z$1,exactEquals:B$1,equals:C$1,isOrthoNormal:G$2,mul:H$1,sub:J$2});

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
const t$5=[0,0];function r$7(t,r){return !!r$z(r)&&f$8(t,r.x,r.y,r.z)}function i$7(n,t){if(!t.points||t.points.length)return !1;for(const r of t.points)if(!u$9(n,r))return !1;return !0}function o$8(n,t){const{xmin:r,ymin:i,zmin:o,xmax:u,ymax:e,zmax:c}=t;return n.hasZ&&t.hasZ?f$8(n,r,i,o)&&f$8(n,r,e,o)&&f$8(n,u,e,o)&&f$8(n,u,i,o)&&f$8(n,r,i,c)&&f$8(n,r,e,c)&&f$8(n,u,e,c)&&f$8(n,u,i,c):f$8(n,r,i)&&f$8(n,r,e)&&f$8(n,u,e)&&f$8(n,u,i)}function u$9(n,t){return f$8(n,t[0],t[1])}function e$5(n,t){return f$8(n,t[0],t[1],t[2])}function f$8(n,t,r,i){return t>=n.xmin&&t<=n.xmax&&r>=n.ymin&&r<=n.ymax&&(null==i||!n.hasZ||i>=n.zmin&&i<=n.zmax)}function c$9(n,r){return t$5[1]=r.y,t$5[0]=r.x,m$7(n,t$5)}function m$7(n,t){return s$a(n.rings,t)}function s$a(n,t){if(!n)return !1;if(x$5(n))return a$5(!1,n,t);let r=!1;for(let i=0,o=n.length;i<o;i++)r=a$5(r,n[i],t);return r}function x$5(n){return !Array.isArray(n[0][0])}function a$5(n,t,r){const[i,o]=r;let u=n,e=0;for(let f=0,c=t.length;f<c;f++){e++,e===c&&(e=0);const[n,r]=t[f],[m,s]=t[e];(r<o&&s>=o||s<o&&r>=o)&&n+(o-r)/(s-r)*(m-n)<i&&(u=!u);}return u}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
function i$6(t,e){return r$7(t,e)}function o$7(n,t){const e=n.hasZ&&t.hasZ;let r,i,o;if(n.xmin<=t.xmin){if(r=t.xmin,n.xmax<r)return !1}else if(r=n.xmin,t.xmax<r)return !1;if(n.ymin<=t.ymin){if(i=t.ymin,n.ymax<i)return !1}else if(i=n.ymin,t.ymax<i)return !1;if(e&&t.hasZ)if(n.zmin<=t.zmin){if(o=t.zmin,n.zmax<o)return !1}else if(o=n.zmin,t.zmax<o)return !1;return !0}function f$7(n,t){const{points:i,hasZ:o}=t,f=o?e$5:u$9;for(const e of i)if(f(n,e))return !0;return !1}const s$9=[0,0],c$8=[0,0],m$6=[0,0],u$8=[0,0],l$8=[s$9,c$8,m$6,u$8],a$4=[[m$6,s$9],[s$9,c$8],[c$8,u$8],[u$8,m$6]];function x$4(n,r){s$9[0]=n.xmin,s$9[1]=n.ymax,c$8[0]=n.xmax,c$8[1]=n.ymax,m$6[0]=n.xmin,m$6[1]=n.ymin,u$8[0]=n.xmax,u$8[1]=n.ymin;for(const e of l$8)if(m$7(r,e))return !0;for(const t of r.rings){if(!t.length)continue;let r=t[0];if(u$9(n,r))return !0;for(let i=1;i<t.length;i++){const o=t[i];if(u$9(n,o)||p$2(r,o,a$4))return !0;r=o;}}return !1}function y$3(n,t){s$9[0]=n.xmin,s$9[1]=n.ymax,c$8[0]=n.xmax,c$8[1]=n.ymax,m$6[0]=n.xmin,m$6[1]=n.ymin,u$8[0]=n.xmax,u$8[1]=n.ymin;const r=t.paths;for(const i of r){if(!r.length)continue;let t=i[0];if(u$9(n,t))return !0;for(let r=1;r<i.length;r++){const o=i[r];if(u$9(n,o)||p$2(t,o,a$4))return !0;t=o;}}return !1}const h$7=[0,0];function g$4(n){for(let t=0;t<n.length;t++){const e=n[t];for(let i=0;i<e.length-1;i++){const r=e[i],o=e[i+1];for(let e=t+1;e<n.length;e++)for(let t=0;t<n[e].length-1;t++){const i=n[e][t],f=n[e][t+1];if(z$2(r,o,i,f,h$7)&&!(h$7[0]===r[0]&&h$7[1]===r[1]||h$7[0]===i[0]&&h$7[1]===i[1]||h$7[0]===o[0]&&h$7[1]===o[1]||h$7[0]===f[0]&&h$7[1]===f[1]))return !0}}const r=e.length;if(!(r<=4))for(let n=0;n<r-3;n++){let t=r-1;0===n&&(t=r-2);const i=e[n],o=e[n+1];for(let r=n+2;r<t;r++){const n=e[r],t=e[r+1];if(z$2(i,o,n,t,h$7)&&!(h$7[0]===i[0]&&h$7[1]===i[1]||h$7[0]===n[0]&&h$7[1]===n[1]||h$7[0]===o[0]&&h$7[1]===o[1]||h$7[0]===t[0]&&h$7[1]===t[1]))return !0}}}return !1}function p$2(n,t,e){for(let r=0;r<e.length;r++)if(z$2(n,t,e[r][0],e[r][1]))return !0;return !1}function z$2(n,t,e,r,i){const[o,f]=n,[s,c]=t,[m,u]=e,[l,a]=r,x=l-m,y=o-m,h=s-o,g=a-u,p=f-u,z=c-f,G=g*h-x*z;if(0===G)return !1;const Z=(x*p-g*y)/G,P=(h*p-z*y)/G;return Z>=0&&Z<=1&&P>=0&&P<=1&&(i&&(i[0]=o+Z*(s-o),i[1]=f+Z*(c-f)),!0)}function G$1(n){switch(n){case"esriGeometryEnvelope":case"extent":return o$7;case"esriGeometryMultipoint":case"multipoint":return f$7;case"esriGeometryPoint":case"point":return i$6;case"esriGeometryPolygon":case"polygon":return x$4;case"esriGeometryPolyline":case"polyline":return y$3}}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
var u$7;function f$6(t){return t&&("esri.geometry.SpatialReference"===t.declaredClass||null!=t.wkid)}function d$4(t,i,e){return null==i?e:null==e?i:t(i,e)}let z$1=u$7=class extends p$a{constructor(...t){super(...t),this.type="extent",this.xmin=0,this.ymin=0,this.mmin=void 0,this.zmin=void 0,this.xmax=0,this.ymax=0,this.mmax=void 0,this.zmax=void 0;}normalizeCtorArgs(t,i,e,s,n){return f$6(t)?{spatialReference:t,xmin:0,ymin:0,xmax:0,ymax:0}:"object"==typeof t?(t.spatialReference=null==t.spatialReference?k$6.WGS84:t.spatialReference,t):{xmin:t,ymin:i,xmax:e,ymax:s,spatialReference:null==n?k$6.WGS84:n}}static fromBounds(t,i){return new u$7({xmin:t[0],ymin:t[1],xmax:t[2],ymax:t[3],spatialReference:i})}static fromPoint(t){return new u$7({xmin:t.x,ymin:t.y,zmin:t.z,xmax:t.x,ymax:t.y,zmax:t.z,spatialReference:t.spatialReference})}get cache(){return this.commitProperty("xmin"),this.commitProperty("ymin"),this.commitProperty("zmin"),this.commitProperty("mmin"),this.commitProperty("xmax"),this.commitProperty("ymax"),this.commitProperty("zmax"),this.commitProperty("mmax"),this.commitProperty("spatialReference"),{}}get center(){const t=new j$7({x:.5*(this.xmin+this.xmax),y:.5*(this.ymin+this.ymax),spatialReference:this.spatialReference});return this.hasZ&&(t.z=.5*(this.zmin+this.zmax)),this.hasM&&(t.m=.5*(this.mmin+this.mmax)),t}get extent(){return this.clone()}get hasM(){return null!=this.mmin&&null!=this.mmax}get hasZ(){return null!=this.zmin&&null!=this.zmax}get height(){return Math.abs(this.ymax-this.ymin)}get width(){return Math.abs(this.xmax-this.xmin)}centerAt(t){const i=this.center;return null!=t.z&&this.hasZ?this.offset(t.x-i.x,t.y-i.y,t.z-i.z):this.offset(t.x-i.x,t.y-i.y)}clone(){const t=new u$7;return t.xmin=this.xmin,t.ymin=this.ymin,t.xmax=this.xmax,t.ymax=this.ymax,t.spatialReference=this.spatialReference,null!=this.zmin&&(t.zmin=this.zmin,t.zmax=this.zmax),null!=this.mmin&&(t.mmin=this.mmin,t.mmax=this.mmax),t}contains(t){if(!t)return !1;const i=this.spatialReference,e=t.spatialReference;return i&&e&&!i.equals(e)&&g$b(i,e)&&(t=i.isWebMercator?R$6(t):j$8(t,!0)),"point"===t.type?r$7(this,t):"extent"===t.type&&o$8(this,t)}equals(t){if(this===t)return !0;if(t$y(t))return !1;const e=this.spatialReference,s=t.spatialReference;return e&&s&&!e.equals(s)&&g$b(e,s)&&(t=e.isWebMercator?R$6(t):j$8(t,!0)),this.xmin===t.xmin&&this.ymin===t.ymin&&this.zmin===t.zmin&&this.mmin===t.mmin&&this.xmax===t.xmax&&this.ymax===t.ymax&&this.zmax===t.zmax&&this.mmax===t.mmax}expand(t){const i=.5*(1-t),e=this.width*i,s=this.height*i;if(this.xmin+=e,this.ymin+=s,this.xmax-=e,this.ymax-=s,this.hasZ){const t=(this.zmax-this.zmin)*i;this.zmin+=t,this.zmax-=t;}if(this.hasM){const t=(this.mmax-this.mmin)*i;this.mmin+=t,this.mmax-=t;}return this}intersects(t){if(t$y(t))return !1;"mesh"===t.type&&(t=t.extent);const e=this.spatialReference,s=t.spatialReference;e&&s&&!e.equals(s)&&g$b(e,s)&&(t=e.isWebMercator?R$6(t):j$8(t,!0));return G$1(t.type)(this,t)}normalize(){const t=this._normalize(!1,!0);return Array.isArray(t)?t:[t]}offset(t,i,e){return this.xmin+=t,this.ymin+=i,this.xmax+=t,this.ymax+=i,null!=e&&(this.zmin+=e,this.zmax+=e),this}shiftCentralMeridian(){return this._normalize(!0)}union(t){return this===t||(this.xmin=Math.min(this.xmin,t.xmin),this.ymin=Math.min(this.ymin,t.ymin),this.xmax=Math.max(this.xmax,t.xmax),this.ymax=Math.max(this.ymax,t.ymax),(this.hasZ||t.hasZ)&&(this.zmin=d$4(Math.min,this.zmin,t.zmin),this.zmax=d$4(Math.max,this.zmax,t.zmax)),(this.hasM||t.hasM)&&(this.mmin=d$4(Math.min,this.mmin,t.mmin),this.mmax=d$4(Math.max,this.mmax,t.mmax))),this}intersection(t){return this===t?this:t$y(t)||!this.intersects(t)?null:(this.xmin=Math.max(this.xmin,t.xmin),this.ymin=Math.max(this.ymin,t.ymin),this.xmax=Math.min(this.xmax,t.xmax),this.ymax=Math.min(this.ymax,t.ymax),(this.hasZ||t.hasZ)&&(this.zmin=d$4(Math.max,this.zmin,t.zmin),this.zmax=d$4(Math.min,this.zmax,t.zmax)),(this.hasM||t.hasM)&&(this.mmin=d$4(Math.max,this.mmin,t.mmin),this.mmax=d$4(Math.min,this.mmax,t.mmax)),this)}toJSON(t){return this.write({},t)}_shiftCM(t=R$7(this.spatialReference)){if(!t||!this.spatialReference)return this;const i=this.spatialReference,s=this._getCM(t);if(s){const n=i.isWebMercator?j$8(s):s;this.xmin-=s.x,this.xmax-=s.x,i.isWebMercator||(n.x=this._normalizeX(n.x,t).x),this.spatialReference=new k$6(r$t(i.isWGS84?t.altTemplate:t.wkTemplate,{Central_Meridian:n.x}));}return this}_getCM(t){let i=null;const[e,s]=t.valid,n=this.xmin,m=this.xmax;return n>=e&&n<=s&&(m>=e&&m<=s)||(i=this.center),i}_normalize(t,i,e){const s=this.spatialReference;if(!s)return this;if(!(e=e||R$7(s)))return this;const n=this._getParts(e).map((t=>t.extent));if(n.length<2)return n[0]||this;if(n.length>2)return t?this._shiftCM(e):this.set({xmin:e.valid[0],xmax:e.valid[1]});if(t)return this._shiftCM(e);if(i)return n;let m=!0,r=!0;return n.forEach((t=>{t.hasZ||(m=!1),t.hasM||(r=!1);})),{rings:n.map((t=>{const i=[[t.xmin,t.ymin],[t.xmin,t.ymax],[t.xmax,t.ymax],[t.xmax,t.ymin],[t.xmin,t.ymin]];if(m){const e=(t.zmax-t.zmin)/2;for(let t=0;t<i.length;t++)i[t].push(e);}if(r){const e=(t.mmax-t.mmin)/2;for(let t=0;t<i.length;t++)i[t].push(e);}return i})),hasZ:m,hasM:r,spatialReference:s}}_getParts(t){let i=this.cache._parts;if(!i){i=[];const{ymin:e,ymax:s,spatialReference:n}=this,m=this.width,r=this.xmin,a=this.xmax;let h;t=t||R$7(n);const[o,x]=t.valid;h=this._normalizeX(this.xmin,t);const p=h.x,c=h.frameId;h=this._normalizeX(this.xmax,t);const y=h.x,f=h.frameId,d=p===y&&m>0;if(m>2*x){const t=new u$7(r<a?p:y,e,x,s,n),m=new u$7(o,e,r<a?y:p,s,n),h=new u$7(0,e,x,s,n),l=new u$7(o,e,0,s,n),d=[],z=[];t.contains(h)&&d.push(c),t.contains(l)&&z.push(c),m.contains(h)&&d.push(f),m.contains(l)&&z.push(f);for(let i=c+1;i<f;i++)d.push(i),z.push(i);i.push({extent:t,frameIds:[c]},{extent:m,frameIds:[f]},{extent:h,frameIds:d},{extent:l,frameIds:z});}else p>y||d?i.push({extent:new u$7(p,e,x,s,n),frameIds:[c]},{extent:new u$7(o,e,y,s,n),frameIds:[f]}):i.push({extent:new u$7(p,e,y,s,n),frameIds:[c]});this.cache._parts=i;}const e=this.hasZ,s=this.hasM;if(e||s){const t={};e&&(t.zmin=this.zmin,t.zmax=this.zmax),s&&(t.mmin=this.mmin,t.mmax=this.mmax);for(let e=0;e<i.length;e++)i[e].extent.set(t);}return i}_normalizeX(t,i){const[e,s]=i.valid,n=2*s;let m,r=0;return t>s?(m=Math.ceil(Math.abs(t-s)/n),t-=m*n,r=m):t<e&&(m=Math.ceil(Math.abs(t-e)/n),t+=m*n,r=-m),{x:t,frameId:r}}};e$r([d$j({readOnly:!0})],z$1.prototype,"cache",null),e$r([d$j({readOnly:!0})],z$1.prototype,"center",null),e$r([d$j({readOnly:!0})],z$1.prototype,"extent",null),e$r([d$j({readOnly:!0,json:{write:{enabled:!1,overridePolicy:null}}})],z$1.prototype,"hasM",null),e$r([d$j({readOnly:!0,json:{write:{enabled:!1,overridePolicy:null}}})],z$1.prototype,"hasZ",null),e$r([d$j({readOnly:!0})],z$1.prototype,"height",null),e$r([d$j({readOnly:!0})],z$1.prototype,"width",null),e$r([d$j({type:Number,json:{type:[Number,String],write:{enabled:!0,allowNull:!0}}})],z$1.prototype,"xmin",void 0),e$r([d$j({type:Number,json:{write:!0}})],z$1.prototype,"ymin",void 0),e$r([d$j({type:Number,json:{origins:{"web-scene":{write:!1}},write:{overridePolicy(){return {enabled:this.hasM}}}}})],z$1.prototype,"mmin",void 0),e$r([d$j({type:Number,json:{origins:{"web-scene":{write:!1}},write:{overridePolicy(){return {enabled:this.hasZ}}}}})],z$1.prototype,"zmin",void 0),e$r([d$j({type:Number,json:{write:!0}})],z$1.prototype,"xmax",void 0),e$r([d$j({type:Number,json:{write:!0}})],z$1.prototype,"ymax",void 0),e$r([d$j({type:Number,json:{origins:{"web-scene":{write:!1}},write:{overridePolicy(){return {enabled:this.hasM}}}}})],z$1.prototype,"mmax",void 0),e$r([d$j({type:Number,json:{origins:{"web-scene":{write:!1}},write:{overridePolicy(){return {enabled:this.hasZ}}}}})],z$1.prototype,"zmax",void 0),z$1=u$7=e$r([n$e("esri.geometry.Extent")],z$1),z$1.prototype.toJSON.isDefaultToJSON=!0;const M$2=z$1;

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
function h$6(h,a,s=!1){let{hasM:t,hasZ:e}=h;Array.isArray(a)?4!==a.length||t||e?3===a.length&&s&&!t?(e=!0,t=!1):3===a.length&&t&&e&&(t=!1,e=!1):(t=!0,e=!0):(e=!e&&a.hasZ&&(!t||a.hasM),t=!t&&a.hasM&&(!e||a.hasZ)),h.hasZ=e,h.hasM=t;}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
var h$5;function l$7(t){return (s,e)=>null==s?e:null==e?s:t(s,e)}function c$7(t){return t&&("esri.geometry.SpatialReference"===t.declaredClass||null!=t.wkid)}let u$6=h$5=class extends p$a{constructor(...t){super(...t),this.points=[],this.type="multipoint";}normalizeCtorArgs(t,s){if(!t&&!s)return null;const e={};Array.isArray(t)?(e.points=t,e.spatialReference=s):c$7(t)?e.spatialReference=t:(t.points&&(e.points=t.points),t.spatialReference&&(e.spatialReference=t.spatialReference),t.hasZ&&(e.hasZ=t.hasZ),t.hasM&&(e.hasM=t.hasM));const i=e.points&&e.points[0];return i&&(void 0===e.hasZ&&void 0===e.hasM?(e.hasZ=i.length>2,e.hasM=!1):void 0===e.hasZ?e.hasZ=i.length>3:void 0===e.hasM&&(e.hasM=i.length>3)),e}get cache(){return this.commitProperty("points"),this.commitProperty("hasZ"),this.commitProperty("hasM"),this.commitProperty("spatialReference"),{}}get extent(){const t=this.points;if(!t.length)return null;const s=new M$2,e=this.hasZ,i=this.hasM,r=e?3:2,o=t[0],a=l$7(Math.min),p=l$7(Math.max);let h,c,u,m,[f,y]=o,[d,g]=o;for(let n=0,l=t.length;n<l;n++){const s=t[n],[o,l]=s;if(f=a(f,o),y=a(y,l),d=p(d,o),g=p(g,l),e&&s.length>2){const t=s[2];h=a(h,t),u=p(u,t);}if(i&&s.length>r){const t=s[r];c=a(c,t),m=p(m,t);}}return s.xmin=f,s.ymin=y,s.xmax=d,s.ymax=g,s.spatialReference=this.spatialReference,e?(s.zmin=h,s.zmax=u):(s.zmin=null,s.zmax=null),i?(s.mmin=c,s.mmax=m):(s.mmin=null,s.mmax=null),s}writePoints(t,e){e.points=m$q(this.points);}addPoint(t){return h$6(this,t),Array.isArray(t)?this.points.push(t):this.points.push(t.toArray()),this.notifyChange("points"),this}clone(){const t={points:m$q(this.points),spatialReference:this.spatialReference};return this.hasZ&&(t.hasZ=!0),this.hasM&&(t.hasM=!0),new h$5(t)}getPoint(t){if(!this._validateInputs(t))return null;const s=this.points[t],e={x:s[0],y:s[1],spatialReference:this.spatialReference};let i=2;return this.hasZ&&(e.z=s[2],i=3),this.hasM&&(e.m=s[i]),new j$7(e)}removePoint(t){if(!this._validateInputs(t))return null;const s=new j$7(this.points.splice(t,1)[0],this.spatialReference);return this.notifyChange("points"),s}setPoint(t,s){return this._validateInputs(t)?(h$6(this,s),Array.isArray(s)||(s=s.toArray()),this.points[t]=s,this.notifyChange("points"),this):this}toJSON(t){return this.write({},t)}_validateInputs(t){return null!=t&&t>=0&&t<this.points.length}};e$r([d$j({readOnly:!0})],u$6.prototype,"cache",null),e$r([d$j()],u$6.prototype,"extent",null),e$r([d$j({type:[[Number]],json:{write:{isRequired:!0}}})],u$6.prototype,"points",void 0),e$r([r$l("points")],u$6.prototype,"writePoints",null),u$6=h$5=e$r([n$e("esri.geometry.Multipoint")],u$6),u$6.prototype.toJSON.isDefaultToJSON=!0;const m$5=u$6;

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
let o$6,r$6=null;function n$2(){return !!r$6}function _(){return !!r$x("esri-wasm")}function P(){return o$6||(o$6=import('./pe-wasm-35b477c5.js').then((e=>e.p)).then((({default:t})=>t({locateFile:t=>a$l(`esri/geometry/support/${t}`)}))).then((e=>{N(e);})),o$6)}var s$8,E$1,i$5;!function(e){function t(e,t,o){r$6.ensureCache.prepare();const n=A$1(o),_=o===n,P=r$6.ensureFloat64(n),s=r$6._pe_geog_to_proj(r$6.getPointer(e),t,P);return s&&d$3(o,t,P,_),s}function o(e,o,r,_){switch(_){case E$1.PE_TRANSFORM_P_TO_G:return n(e,o,r);case E$1.PE_TRANSFORM_G_TO_P:return t(e,o,r)}return 0}function n(e,t,o){return _(e,t,o,0)}function _(e,t,o,n){r$6.ensureCache.prepare();const _=A$1(o),P=o===_,s=r$6.ensureFloat64(_),E=r$6._pe_proj_to_geog_center(r$6.getPointer(e),t,s,n);return E&&d$3(o,t,s,P),E}e.geogToProj=t,e.projGeog=o,e.projToGeog=n,e.projToGeogCenter=_;}(s$8||(s$8={})),function(e){function t(){e.PE_BUFFER_MAX=r$6.PeDefs.prototype.PE_BUFFER_MAX,e.PE_NAME_MAX=r$6.PeDefs.prototype.PE_NAME_MAX,e.PE_MGRS_MAX=r$6.PeDefs.prototype.PE_MGRS_MAX,e.PE_USNG_MAX=r$6.PeDefs.prototype.PE_USNG_MAX,e.PE_DD_MAX=r$6.PeDefs.prototype.PE_DD_MAX,e.PE_DDM_MAX=r$6.PeDefs.prototype.PE_DDM_MAX,e.PE_DMS_MAX=r$6.PeDefs.prototype.PE_DMS_MAX,e.PE_UTM_MAX=r$6.PeDefs.prototype.PE_UTM_MAX,e.PE_PARM_MAX=r$6.PeDefs.prototype.PE_PARM_MAX,e.PE_TYPE_NONE=r$6.PeDefs.prototype.PE_TYPE_NONE,e.PE_TYPE_GEOGCS=r$6.PeDefs.prototype.PE_TYPE_GEOGCS,e.PE_TYPE_PROJCS=r$6.PeDefs.prototype.PE_TYPE_PROJCS,e.PE_TYPE_GEOGTRAN=r$6.PeDefs.prototype.PE_TYPE_GEOGTRAN,e.PE_TYPE_COORDSYS=r$6.PeDefs.prototype.PE_TYPE_COORDSYS,e.PE_TYPE_UNIT=r$6.PeDefs.prototype.PE_TYPE_UNIT,e.PE_TYPE_LINUNIT=r$6.PeDefs.prototype.PE_TYPE_LINUNIT,e.PE_STR_OPTS_NONE=r$6.PeDefs.prototype.PE_STR_OPTS_NONE,e.PE_STR_AUTH_NONE=r$6.PeDefs.prototype.PE_STR_AUTH_NONE,e.PE_STR_AUTH_TOP=r$6.PeDefs.prototype.PE_STR_AUTH_TOP,e.PE_STR_NAME_CANON=r$6.PeDefs.prototype.PE_STR_NAME_CANON,e.PE_PARM_X0=r$6.PeDefs.prototype.PE_PARM_X0,e.PE_PARM_ND=r$6.PeDefs.prototype.PE_PARM_ND,e.PE_TRANSFORM_1_TO_2=r$6.PeDefs.prototype.PE_TRANSFORM_1_TO_2,e.PE_TRANSFORM_2_TO_1=r$6.PeDefs.prototype.PE_TRANSFORM_2_TO_1,e.PE_TRANSFORM_P_TO_G=r$6.PeDefs.prototype.PE_TRANSFORM_P_TO_G,e.PE_TRANSFORM_G_TO_P=r$6.PeDefs.prototype.PE_TRANSFORM_G_TO_P,e.PE_HORIZON_RECT=r$6.PeDefs.prototype.PE_HORIZON_RECT,e.PE_HORIZON_POLY=r$6.PeDefs.prototype.PE_HORIZON_POLY,e.PE_HORIZON_LINE=r$6.PeDefs.prototype.PE_HORIZON_LINE,e.PE_HORIZON_DELTA=r$6.PeDefs.prototype.PE_HORIZON_DELTA;}e.init=t;}(E$1||(E$1={})),function(e){const t={},o={},n=e=>{if(e){const t=e.getType();switch(t){case E$1.PE_TYPE_GEOGCS:e=r$6.castObject(e,r$6.PeGeogcs);break;case E$1.PE_TYPE_PROJCS:e=r$6.castObject(e,r$6.PeProjcs);break;case E$1.PE_TYPE_GEOGTRAN:e=r$6.castObject(e,r$6.PeGeogtran);break;default:t&E$1.PE_TYPE_UNIT&&(e=r$6.castObject(e,r$6.PeUnit));}}return e};function _(){r$6.PeFactory.prototype.initialize(null);}function P(e){return s(E$1.PE_TYPE_COORDSYS,e)}function s(e,o){let _=null,P=t[e];if(P||(P={},t[e]=P),P.hasOwnProperty(String(o)))_=P[o];else {const t=r$6.PeFactory.prototype.factoryByType(e,o);r$6.compare(t,r$6.NULL)||(_=t,P[o]=_);}return _=n(_),_}function i(e,t){let _=null,P=o[e];if(P||(P={},o[e]=P),P.hasOwnProperty(t))_=P[t];else {const o=r$6.PeFactory.prototype.fromString(e,t);r$6.compare(o,r$6.NULL)||(_=o,P[t]=_);}return _=n(_),_}function p(e){return s(E$1.PE_TYPE_GEOGCS,e)}function u(e){return s(E$1.PE_TYPE_GEOGTRAN,e)}function c(e){return r$6.PeFactory.prototype.getCode(e)}function a(e){return s(E$1.PE_TYPE_PROJCS,e)}function g(e){return s(E$1.PE_TYPE_UNIT,e)}e.initialize=_,e.coordsys=P,e.factoryByType=s,e.fromString=i,e.geogcs=p,e.geogtran=u,e.getCode=c,e.projcs=a,e.unit=g;}(i$5||(i$5={}));let p$1=null;var u$5,c$6,a$3,g$3,T,f$5,O,S,l$6;function N(e){function t(e,t,o){e[t]=o(e[t]);}r$6=e,E$1.init(),u$5.init(),T.init(),O.init(),S.init(),p$1=class extends r$6.PeGCSExtent{destroy(){r$6.destroy(this);}};const o=[r$6.PeDatum,r$6.PeGeogcs,r$6.PeGeogtran,r$6.PeObject,r$6.PeParameter,r$6.PePrimem,r$6.PeProjcs,r$6.PeSpheroid,r$6.PeUnit];for(const r of o)t(r.prototype,"getName",(e=>function(){return e.call(this,new Array(E$1.PE_NAME_MAX))}));for(const P of [r$6.PeGeogtran,r$6.PeProjcs])t(P.prototype,"getParameters",(e=>function(){const t=new Array(E$1.PE_PARM_MAX);let o=e.call(this);for(let e=0;e<t.length;e++){const n=r$6.getValue(o,"*");t[e]=n?r$6.wrapPointer(n,r$6.PeParameter):null,o+=Int32Array.BYTES_PER_ELEMENT;}return t}));t(r$6.PeHorizon.prototype,"getCoord",(e=>function(){const t=this.getSize();if(!t)return null;const o=[];return d$3(o,t,e.call(this)),o})),t(r$6.PeGTlistExtendedEntry.prototype,"getEntries",(e=>{const t=r$6._pe_getPeGTlistExtendedGTsSize();return function(){let o=null;const n=e.call(this);if(!r$6.compare(n,r$6.NULL)){o=[n];const e=this.getSteps();if(e>1){const _=r$6.getPointer(n);for(let n=1;n<e;n++)o.push(r$6.wrapPointer(_+t*n,r$6.PeGTlistExtendedGTs));}}return o}}));const n=r$6._pe_getPeHorizonSize(),_=e=>function(){let t=this._cache;if(t||(t=new Map,this._cache=t),t.has(e))return t.get(e);let o=null;const _=e.call(this);if(!r$6.compare(_,r$6.NULL)){o=[_];const e=_.getNump();if(e>1){const t=r$6.getPointer(_);for(let _=1;_<e;_++)o.push(r$6.wrapPointer(t+n*_,r$6.PeHorizon));}}return t.set(e,o),o};t(r$6.PeProjcs.prototype,"horizonGcsGenerate",_),t(r$6.PeProjcs.prototype,"horizonPcsGenerate",_),r$6.PeObject.prototype.toString=function(e=E$1.PE_STR_OPTS_NONE){r$6.ensureCache.prepare();const t=r$6.getPointer(this),o=r$6.ensureInt8(new Array(E$1.PE_BUFFER_MAX));return r$6.UTF8ToString(r$6._pe_object_to_string_ext(t,e,o))};}function y$2(e){if(!e)return;const t=r$6.getClass(e);if(!t)return;const o=r$6.getCache(t);if(!o)return;const n=r$6.getPointer(e);n&&delete o[n];}function M$1(e,t){const o=[],n=new Array(t);for(let _=0;_<e;_++)o.push(r$6.ensureInt8(n));return o}function A$1(e){let t;return Array.isArray(e[0])?(t=[],e.forEach((e=>{t.push(e[0],e[1]);}))):t=e,t}function d$3(e,t,o,n=!1){if(n)for(let _=0;_<2*t;_++)e[_]=r$6.getValue(o+_*Float64Array.BYTES_PER_ELEMENT,"double");else {const n=0===e.length;for(let _=0;_<t;_++)n&&(e[_]=new Array(2)),e[_][0]=r$6.getValue(o,"double"),e[_][1]=r$6.getValue(o+Float64Array.BYTES_PER_ELEMENT,"double"),o+=2*Float64Array.BYTES_PER_ELEMENT;}}!function(e){let t;function o(){e.PE_GTLIST_OPTS_COMMON=r$6.PeGTlistExtended.prototype.PE_GTLIST_OPTS_COMMON,t=r$6._pe_getPeGTlistExtendedEntrySize();}function n(e,o,n,_,P,s){let E=null;const i=new r$6.PeInteger(s);try{const p=r$6.PeGTlistExtended.prototype.getGTlist(e,o,n,_,P,i);if((s=i.val)&&(E=[p],s>1)){const e=r$6.getPointer(p);for(let o=1;o<s;o++)E.push(r$6.wrapPointer(e+t*o,r$6.PeGTlistExtendedEntry));}}finally{r$6.destroy(i);}return E}e.init=o,e.getGTlist=n;}(u$5||(u$5={})),function(e){function t(e){if(e&&e.length){for(const t of e)y$2(t),t.getEntries().forEach((e=>{y$2(e);const t=e.getGeogtran();y$2(t),t.getParameters().forEach(y$2),[t.getGeogcs1(),t.getGeogcs2()].forEach((e=>{y$2(e);const t=e.getDatum();y$2(t),y$2(t.getSpheroid()),y$2(e.getPrimem()),y$2(e.getUnit());}));}));r$6.PeGTlistExtendedEntry.prototype.Delete(e[0]);}}e.destroy=t;}(c$6||(c$6={})),function(e){function t(e,t,o,n,_){r$6.ensureCache.prepare();const P=A$1(o),s=o===P,E=r$6.ensureFloat64(P);let i=0;n&&(i=r$6.ensureFloat64(n));const p=r$6._pe_geog_to_geog(r$6.getPointer(e),t,E,i,_);return p&&d$3(o,t,E,s),p}e.geogToGeog=t;}(a$3||(a$3={})),function(e){const t=(e,t,o,n,_,P)=>{let s,i;switch(r$6.ensureCache.prepare(),e){case"dd":s=r$6._pe_geog_to_dd,i=E$1.PE_DD_MAX;break;case"ddm":s=r$6._pe_geog_to_ddm,i=E$1.PE_DDM_MAX;break;case"dms":s=r$6._pe_geog_to_dms,i=E$1.PE_DMS_MAX;}let p=0;t&&(p=r$6.getPointer(t));const u=A$1(n),c=r$6.ensureFloat64(u),a=M$1(o,i),g=s(p,o,c,_,r$6.ensureInt32(a));if(g)for(let E=0;E<o;E++)P[E]=r$6.UTF8ToString(a[E]);return g},o=(e,t,o,n,_)=>{let P;switch(r$6.ensureCache.prepare(),e){case"dd":P=r$6._pe_dd_to_geog;break;case"ddm":P=r$6._pe_ddm_to_geog;break;case"dms":P=r$6._pe_dms_to_geog;}let s=0;t&&(s=r$6.getPointer(t));const E=n.map((e=>r$6.ensureString(e))),i=r$6.ensureInt32(E),p=r$6.ensureFloat64(new Array(2*o)),u=P(s,o,i,p);return u&&d$3(_,o,p),u};function n(e,o,r,n,_){return t("dms",e,o,r,n,_)}function _(e,t,r,n){return o("dms",e,t,r,n)}function P(e,o,r,n,_){return t("ddm",e,o,r,n,_)}function s(e,t,r,n){return o("ddm",e,t,r,n)}function i(e,o,r,n,_){return t("dd",e,o,r,n,_)}function p(e,t,r,n){return o("dd",e,t,r,n)}e.geogToDms=n,e.dmsToGeog=_,e.geogToDdm=P,e.ddmToGeog=s,e.geogToDd=i,e.ddToGeog=p;}(g$3||(g$3={})),function(e){function t(){e.PE_MGRS_STYLE_NEW=r$6.PeNotationMgrs.prototype.PE_MGRS_STYLE_NEW,e.PE_MGRS_STYLE_OLD=r$6.PeNotationMgrs.prototype.PE_MGRS_STYLE_OLD,e.PE_MGRS_STYLE_AUTO=r$6.PeNotationMgrs.prototype.PE_MGRS_STYLE_AUTO,e.PE_MGRS_180_ZONE_1_PLUS=r$6.PeNotationMgrs.prototype.PE_MGRS_180_ZONE_1_PLUS,e.PE_MGRS_ADD_SPACES=r$6.PeNotationMgrs.prototype.PE_MGRS_ADD_SPACES;}function o(e,t,o,n,_,P,s){r$6.ensureCache.prepare();let i=0;e&&(i=r$6.getPointer(e));const p=A$1(o),u=r$6.ensureFloat64(p),c=M$1(t,E$1.PE_MGRS_MAX),a=r$6.ensureInt32(c),g=r$6._pe_geog_to_mgrs_extended(i,t,u,n,_,P,a);if(g)for(let E=0;E<t;E++)s[E]=r$6.UTF8ToString(c[E]);return g}function n(e,t,o,n,_){r$6.ensureCache.prepare();let P=0;e&&(P=r$6.getPointer(e));const s=o.map((e=>r$6.ensureString(e))),E=r$6.ensureInt32(s),i=r$6.ensureFloat64(new Array(2*t)),p=r$6._pe_mgrs_to_geog_extended(P,t,E,n,i);return p&&d$3(_,t,i),p}e.init=t,e.geogToMgrsExtended=o,e.mgrsToGeogExtended=n;}(T||(T={})),function(e){function t(e,t,o,n,_,P,s){r$6.ensureCache.prepare();let i=0;e&&(i=r$6.getPointer(e));const p=A$1(o),u=r$6.ensureFloat64(p),c=M$1(t,E$1.PE_MGRS_MAX),a=r$6.ensureInt32(c),g=r$6._pe_geog_to_usng(i,t,u,n,_,P,a);if(g)for(let E=0;E<t;E++)s[E]=r$6.UTF8ToString(c[E]);return g}function o(e,t,o,n){r$6.ensureCache.prepare();let _=0;e&&(_=r$6.getPointer(e));const P=o.map((e=>r$6.ensureString(e))),s=r$6.ensureInt32(P),E=r$6.ensureFloat64(new Array(2*t)),i=r$6._pe_usng_to_geog(_,t,s,E);return i&&d$3(n,t,E),i}e.geogToUsng=t,e.usngToGeog=o;}(f$5||(f$5={})),function(e){function t(){e.PE_UTM_OPTS_NONE=r$6.PeNotationUtm.prototype.PE_UTM_OPTS_NONE,e.PE_UTM_OPTS_ADD_SPACES=r$6.PeNotationUtm.prototype.PE_UTM_OPTS_ADD_SPACES,e.PE_UTM_OPTS_NS=r$6.PeNotationUtm.prototype.PE_UTM_OPTS_NS;}function o(e,t,o,n,_){r$6.ensureCache.prepare();let P=0;e&&(P=r$6.getPointer(e));const s=A$1(o),i=r$6.ensureFloat64(s),p=M$1(t,E$1.PE_UTM_MAX),u=r$6.ensureInt32(p),c=r$6._pe_geog_to_utm(P,t,i,n,u);if(c)for(let E=0;E<t;E++)_[E]=r$6.UTF8ToString(p[E]);return c}function n(e,t,o,n,_){r$6.ensureCache.prepare();let P=0;e&&(P=r$6.getPointer(e));const s=o.map((e=>r$6.ensureString(e))),E=r$6.ensureInt32(s),i=r$6.ensureFloat64(new Array(2*t)),p=r$6._pe_utm_to_geog(P,t,E,n,i);return p&&d$3(_,t,i),p}e.init=t,e.geogToUtm=o,e.utmToGeog=n;}(O||(O={})),function(e){const t=new Map;function o(){e.PE_PCSINFO_OPTION_NONE=r$6.PePCSInfo.prototype.PE_PCSINFO_OPTION_NONE,e.PE_PCSINFO_OPTION_DOMAIN=r$6.PePCSInfo.prototype.PE_PCSINFO_OPTION_DOMAIN,e.PE_POLE_OUTSIDE_BOUNDARY=r$6.PePCSInfo.prototype.PE_POLE_OUTSIDE_BOUNDARY,e.PE_POLE_POINT=r$6.PePCSInfo.prototype.PE_POLE_POINT;}function n(o,n=e.PE_PCSINFO_OPTION_DOMAIN){let _,P;return t.has(o)&&(P=t.get(o),P[n]&&(_=P[n])),_||(_=r$6.PePCSInfo.prototype.generate(o,n),P||(P=[],t.set(o,P)),P[n]=_),_}e.init=o,e.generate=n;}(S||(S={})),function(e){function t(){return r$6.PeVersion.prototype.version_string()}e.versionString=t;}(l$6||(l$6={}));const R$1=Object.freeze({__proto__:null,get _pe(){return r$6},isLoaded:n$2,isSupported:_,load:P,get PeCSTransformations(){return s$8},get PeDefs(){return E$1},get PeFactory(){return i$5},get PeGCSExtent(){return p$1},get PeGTlistExtended(){return u$5},get PeGTlistExtendedEntry(){return c$6},get PeGTTransformations(){return a$3},get PeNotationDms(){return g$3},get PeNotationMgrs(){return T},get PeNotationUsng(){return f$5},get PeNotationUtm(){return O},get PePCSInfo(){return S},get PeVersion(){return l$6},_init:N});

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
function t$4(n){if(!n)return null;if(Array.isArray(n))return n;const t=n.hasZ,e=n.hasM;if("point"===n.type)return e&&t?[n.x,n.y,n.z,n.m]:t?[n.x,n.y,n.z]:e?[n.x,n.y,n.m]:[n.x,n.y];if("polygon"===n.type)return n.rings.slice(0);if("polyline"===n.type)return n.paths.slice(0);if("multipoint"===n.type)return n.points.slice(0);if("extent"===n.type){const t=n.clone().normalize();if(!t)return null;let e=!1,r=!1;return t.forEach((n=>{n.hasZ&&(e=!0),n.hasM&&(r=!0);})),t.map((n=>{const t=[[n.xmin,n.ymin],[n.xmin,n.ymax],[n.xmax,n.ymax],[n.xmax,n.ymin],[n.xmin,n.ymin]];if(e&&n.hasZ){const e=.5*(n.zmax-n.zmin);for(let n=0;n<t.length;n++)t[n].push(e);}if(r&&n.hasM){const e=.5*(n.mmax-n.mmin);for(let n=0;n<t.length;n++)t[n].push(e);}return t}))}return null}function e$4(n,t){const e=t[0]-n[0],r=t[1]-n[1];if(n.length>2&&t.length>2){const o=n[2]-t[2];return Math.sqrt(e*e+r*r+o*o)}return Math.sqrt(e*e+r*r)}function r$5(n,t,e){const r=n[0]+e*(t[0]-n[0]),o=n[1]+e*(t[1]-n[1]);return n.length>2&&t.length>2?[r,o,n[2]+e*(t[2]-n[2])]:[r,o]}function o$5(n,t,e,r){const[o,i]=t,[s,l]=e[r],[f,u]=e[r+1],h=f-s,c=u-l,a=h*h+c*c,g=(o-s)*h+(i-l)*c,m=Math.min(1,Math.max(0,g/a));return n[0]=s+h*m,n[1]=l+c*m,n}function i$4(n,t){return r$5(n,t,.5)}function s$7(n){const t=n.length;let r=0;for(let o=0;o<t-1;++o)r+=e$4(n[o],n[o+1]);return r}function l$5(n,t){if(t<=0)return n[0];const o=n.length;let i=0;for(let s=0;s<o-1;++s){const o=e$4(n[s],n[s+1]);if(t-i<o){const e=(t-i)/o;return r$5(n[s],n[s+1],e)}i+=o;}return n[o-1]}function f$4(n,t,e){const r=n.length;let o=0,i=0,s=0;for(let l=0;l<r;l++){const f=n[l],u=n[(l+1)%r];let h=2;o+=f[0]*u[1]-u[0]*f[1],f.length>2&&u.length>2&&e&&(i+=f[0]*u[2]-u[0]*f[2],h=3),f.length>h&&u.length>h&&t&&(s+=f[0]*u[h]-u[0]*f[h]);}return o<=0&&i<=0&&s<=0}function u$4(n){if("rings"in n){for(const t of n.rings)t.length<3||t[0][0]===t[t.length-1][0]&&t[0][1]===t[t.length-1][1]||t.push([t[0][0],t[0][1]]);if(n.rings.length>0){if(!f$4(n.rings[0],n.hasM,n.hasZ))for(let t=0;t<n.rings.length;++t)n.rings[t]=n.rings[t].reverse();}}}function h$4(n){if("rings"in n)for(const t of n.rings)t.length<3||t[0][0]===t[t.length-1][0]&&t[0][1]===t[t.length-1][1]||t.push([t[0][0],t[0][1]]);}function c$5(n){const t=n.length;let e=0;for(let r=0;r<t;r++){const o=n[r],i=n[(r+1)%t];e+=o[0]*i[1]-i[0]*o[1];}return e}function a$2(n){if("polygon"!==n.type&&"polyline"!==n.type)return n;return g$2("polygon"===n.type?n.rings:n.paths,n.spatialReference),n}function g$2(t,e){const r=R$7(e);if(!r)return;const o=r.valid[0],i=r.valid[1],s=i-o;for(const n of t){let t=1/0,e=-1/0;n.forEach((n=>{let r=n[0];for(;r<o;)r+=s;for(;r>i;)r-=s;t=Math.min(t,r),e=Math.max(e,r),n[0]=r;}));const r=e-t;s-r<r&&n.forEach((n=>{n[0]<0&&(n[0]+=s);}));}}function m$4(n,t,e,r){let o=1/0,i=-1/0;n.forEach((n=>{let s=n.pos[0];for(;s<t;)s+=r;for(;s>e;)s-=r;o=Math.min(o,s),i=Math.max(i,s),n.unnormalizedPos[0]=s,n.unnormalizedPos[1]=n.pos[1],n.pos.length>2&&(n.unnormalizedPos[2]=n.pos[2]),n.pos.length>3&&(n.unnormalizedPos[3]=n.pos[3]);}));const s=i-o;r-s<s&&n.forEach((n=>{n.unnormalizedPos[0]<0&&(n.unnormalizedPos[0]+=r);}));}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
function l$4(n){return n?n.hasZ?[n.xmax-n.xmin/2,n.ymax-n.ymin/2,n.zmax-n.zmin/2]:[n.xmax-n.xmin/2,n.ymax-n.ymin/2]:null}function e$3(n){return n?o$4(n.rings,n.hasZ):null}function o$4(n,t){if(!n||!n.length)return null;const l=[],e=[],o=t?[1/0,-1/0,1/0,-1/0,1/0,-1/0]:[1/0,-1/0,1/0,-1/0];for(let h=0,i=n.length;h<i;h++){const l=r$4(n[h],t,o);l&&e.push(l);}if(e.sort(((n,l)=>{let e=n[2]-l[2];return 0===e&&t&&(e=n[4]-l[4]),e})),e.length&&(l[0]=e[0][0],l[1]=e[0][1],t&&(l[2]=e[0][3]),(l[0]<o[0]||l[0]>o[1]||l[1]<o[2]||l[1]>o[3]||t&&(l[2]<o[4]||l[2]>o[5]))&&(l.length=0)),!l.length){const e=n[0]&&n[0].length?h$3(n[0],t):null;if(!e)return null;l[0]=e[0],l[1]=e[1],t&&e.length>2&&(l[2]=e[2]);}return l}function r$4(n,t,l){let e=0,o=0,r=0,h=0,i=0;const u=n.length?n[0][0]:0,g=n.length?n[0][1]:0,s=n.length&&t?n[0][2]:0;for(let f=0;f<n.length;f++){const c=n[f],m=n[(f+1)%n.length],[x,a,y]=c,d=x-u,p=a-g,v=t?y-s:void 0,[z,Z,j]=m,U=z-u,b=Z-g,k=t?j-s:void 0,q=d*b-U*p;if(h+=q,e+=(d+U)*q,o+=(p+b)*q,t&&c.length>2&&m.length>2){const n=d*k-U*v;r+=(v+k)*n,i+=n;}x<l[0]&&(l[0]=x),x>l[1]&&(l[1]=x),a<l[2]&&(l[2]=a),a>l[3]&&(l[3]=a),t&&(y<l[4]&&(l[4]=y),y>l[5]&&(l[5]=y));}if(h>0&&(h*=-1),i>0&&(i*=-1),!h)return null;h*=.5,i*=.5;const c=[e/(6*h)+u,o/(6*h)+g,h];return t&&(l[4]===l[5]||0===i?(c[3]=(l[4]+l[5])/2,c[4]=0):(c[3]=r/(6*i)+s,c[4]=i)),c}function h$3(l,e){const o=e?[0,0,0]:[0,0],r=e?[0,0,0]:[0,0];let h=0,i=0,u=0,g=0;for(let s=0,c=l.length;s<c-1;s++){const c=l[s],f=l[s+1];if(c&&f){o[0]=c[0],o[1]=c[1],r[0]=f[0],r[1]=f[1],e&&c.length>2&&f.length>2&&(o[2]=c[2],r[2]=f[2]);const l=e$4(o,r);if(l){h+=l;const n=i$4(c,f);i+=l*n[0],u+=l*n[1],e&&n.length>2&&(g+=l*n[2]);}}}return h>0?e?[i/h,u/h,g/h]:[i/h,u/h]:l.length?l[0]:null}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
function n$1(n){return void 0!==n.xmin&&void 0!==n.ymin&&void 0!==n.xmax&&void 0!==n.ymax}function t$3(n){return void 0!==n.points}function e$2(n){return void 0!==n.x&&void 0!==n.y}function o$3(n){return void 0!==n.paths}function i$3(n){return void 0!==n.rings}function l$3(n){return (t,e)=>null==t?e:null==e?t:n(t,e)}const r$3=l$3(Math.min),u$3=l$3(Math.max);function c$4(l,r){return o$3(r)?h$2(l,r.paths,!1,!1):i$3(r)?h$2(l,r.rings,!1,!1):t$3(r)?s$6(l,r.points,!1,!1,!1,!1):n$1(r)?g$1(l,r):(e$2(r)&&(l[0]=r.x,l[1]=r.y,l[2]=r.x,l[3]=r.y),l)}function f$3(l,r){return o$3(r)?h$2(l,r.paths,!0,!1):i$3(r)?h$2(l,r.rings,!0,!1):t$3(r)?s$6(l,r.points,!0,!1,!0,!1):n$1(r)?g$1(l,r,!0,!1,!0,!1):(e$2(r)&&(l[0]=r.x,l[1]=r.y,l[2]=r.z,l[3]=r.x,l[4]=r.y,l[5]=r.z),l)}function h$2(n,t,e,o){const i=e?3:2;if(!t.length||!t[0].length)return null;let l,c,f,h,[g,s]=t[0][0],[x,m]=t[0][0];for(let a=0;a<t.length;a++){const n=t[a];for(let t=0;t<n.length;t++){const a=n[t],[d,v]=a;if(g=r$3(g,d),s=r$3(s,v),x=u$3(x,d),m=u$3(m,v),e&&a.length>2){const n=a[2];l=r$3(l,n),c=u$3(c,n);}if(o&&a.length>i){const n=a[i];f=r$3(l,n),h=u$3(c,n);}}}return e?o?(n[0]=g,n[1]=s,n[2]=l,n[3]=f,n[4]=x,n[5]=m,n[6]=c,n[7]=h,n.length=8,n):(n[0]=g,n[1]=s,n[2]=l,n[3]=x,n[4]=m,n[5]=c,n.length=6,n):o?(n[0]=g,n[1]=s,n[2]=f,n[3]=x,n[4]=m,n[5]=h,n.length=6,n):(n[0]=g,n[1]=s,n[2]=x,n[3]=m,n.length=4,n)}function g$1(n,t,e,o,i,l){const r=t.xmin,u=t.xmax,c=t.ymin,f=t.ymax;let h=t.zmin,g=t.zmax,s=t.mmin,x=t.mmax;return i?(h=h||0,g=g||0,l?(s=s||0,x=x||0,n[0]=r,n[1]=c,n[2]=h,n[3]=s,n[4]=u,n[5]=f,n[6]=g,n[7]=x,n):(n[0]=r,n[1]=c,n[2]=h,n[3]=u,n[4]=f,n[5]=g,n)):l?(s=s||0,x=x||0,n[0]=r,n[1]=c,n[2]=s,n[3]=u,n[4]=f,n[5]=x,n):(n[0]=r,n[1]=c,n[2]=u,n[3]=f,n)}function s$6(n,t,e,o,i,l){const c=e?3:2,f=o&&l,h=e&&i;if(!t.length||!t[0].length)return null;let g,s,x,m,[a,d]=t[0],[v,y]=t[0];for(let p=0;p<t.length;p++){const n=t[p],[e,o]=n;if(a=r$3(a,e),d=r$3(d,o),v=u$3(v,e),y=u$3(y,o),h&&n.length>2){const t=n[2];g=r$3(g,t),s=u$3(s,t);}if(f&&n.length>c){const t=n[c];x=r$3(g,t),m=u$3(s,t);}}return i?(g=g||0,s=s||0,l?(x=x||0,m=m||0,n[0]=a,n[1]=d,n[2]=g,n[3]=x,n[4]=v,n[5]=y,n[6]=s,n[7]=m,n):(n[0]=a,n[1]=d,n[2]=g,n[3]=v,n[4]=y,n[5]=s,n)):l?(x=x||0,m=m||0,n[0]=a,n[1]=d,n[2]=x,n[3]=v,n[4]=y,n[5]=m,n):(n[0]=a,n[1]=d,n[2]=v,n[3]=y,n)}function x$3(n){if(!n.length||!n[0].length)return null;let[t]=n[0],[e]=n[0];for(let o=0;o<n.length;o++){const i=n[o],[l]=i;t=r$3(t,l),e=u$3(e,l);}return e-t}function m$3(n){if(!n.length||!n[0].length)return null;let[t]=n[0],[e]=n[0];for(let o=0;o<n.length;o++){const i=n[o],[l]=i;t=r$3(t,l),e=u$3(e,l);}return t+.5*(e-t)}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
function t$2(n){return void 0!==n.xmin&&void 0!==n.ymin&&void 0!==n.xmax&&void 0!==n.ymax}function u$2(n){return void 0!==n.points}function m$2(n){return void 0!==n.x&&void 0!==n.y}function o$2(n){return void 0!==n.paths}function r$2(n){return void 0!==n.rings}const x$2=[];function a$1(n,i,t,u){return {xmin:n,ymin:i,xmax:t,ymax:u}}function c$3(n,i,t,u,m,o){return {xmin:n,ymin:i,zmin:t,xmax:u,ymax:m,zmax:o}}function s$5(n,i,t,u,m,o){return {xmin:n,ymin:i,mmin:t,xmax:u,ymax:m,mmax:o}}function e$1(n,i,t,u,m,o,r,x){return {xmin:n,ymin:i,zmin:t,mmin:u,xmax:m,ymax:o,zmax:r,mmax:x}}function f$2(n,i=!1,t=!1){return i?t?e$1(n[0],n[1],n[2],n[3],n[4],n[5],n[6],n[7]):c$3(n[0],n[1],n[2],n[3],n[4],n[5]):t?s$5(n[0],n[1],n[2],n[3],n[4],n[5]):a$1(n[0],n[1],n[2],n[3])}function l$2(n){return n?t$2(n)?n:m$2(n)?d$2(n):r$2(n)?v$2(n):o$2(n)?h$1(n):u$2(n)?y$1(n):null:null}function y$1(i){const{hasZ:t,hasM:u,points:m}=i;return f$2(s$6(x$2,m,t,u),t,u)}function d$2(n){const{x:i,y:t,z:u,m}=n,o=null!=m;return null!=u?o?e$1(i,t,u,m,i,t,u,m):c$3(i,t,u,i,t,u):o?s$5(i,t,m,i,t,m):a$1(i,t,i,t)}function v$2(n){const{hasZ:t,hasM:u,rings:m}=n,o=h$2(x$2,m,t,u);return o?f$2(o,t,u):null}function h$1(n){const{hasZ:t,hasM:u,paths:m}=n,o=h$2(x$2,m,t,u);return o?f$2(o,t,u):null}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
var x$1;function j$1(t){return !Array.isArray(t[0])}let w$1=x$1=class extends p$a{constructor(...t){super(...t),this.rings=[],this.type="polygon";}static fromExtent(t){const r=t.clone().normalize(),e=t.spatialReference;let s=!1,i=!1;for(const o of r)o.hasZ&&(s=!0),o.hasM&&(i=!0);const n={rings:r.map((function(t){const r=[[t.xmin,t.ymin],[t.xmin,t.ymax],[t.xmax,t.ymax],[t.xmax,t.ymin],[t.xmin,t.ymin]];if(s&&t.hasZ){const e=t.zmin+.5*(t.zmax-t.zmin);for(let t=0;t<r.length;t++)r[t].push(e);}if(i&&t.hasM){const e=t.mmin+.5*(t.mmax-t.mmin);for(let t=0;t<r.length;t++)r[t].push(e);}return r})),spatialReference:e};return s&&(n.hasZ=!0),i&&(n.hasM=!0),new x$1(n)}normalizeCtorArgs(t,r){let e,s,i=null,n=null;return t&&!Array.isArray(t)?(i=t.rings?t.rings:null,r||(t.spatialReference?r=t.spatialReference:t.rings||(r=t)),e=t.hasZ,s=t.hasM):i=t,i=i||[],r=r||k$6.WGS84,i.length&&i[0]&&null!=i[0][0]&&"number"==typeof i[0][0]&&(i=[i]),n=i[0]&&i[0][0],n&&(void 0===e&&void 0===s?(e=n.length>2,s=n.length>3):void 0===e?e=s?n.length>3:n.length>2:void 0===s&&(s=e?n.length>3:n.length>2)),{rings:i,spatialReference:r,hasZ:e,hasM:s}}get cache(){return this.commitProperty("rings"),this.commitProperty("hasZ"),this.commitProperty("hasM"),this.commitProperty("spatialReference"),{}}get centroid(){const t=e$3(this);if(!t||isNaN(t[0])||isNaN(t[1])||this.hasZ&&isNaN(t[2]))return null;const r=new j$7;return r.x=t[0],r.y=t[1],r.spatialReference=this.spatialReference,this.hasZ&&(r.z=t[2]),r}get extent(){const{spatialReference:t}=this,r=v$2(this);if(!r)return null;const e=new M$2(r);return e.spatialReference=t,e}get isSelfIntersecting(){return g$4(this.rings)}writeRings(t,r){r.rings=m$q(this.rings);}addRing(t){if(!t)return;const r=this.rings,e=r.length;if(j$1(t)){const s=[];for(let r=0,e=t.length;r<e;r++)s[r]=t[r].toArray();r[e]=s;}else r[e]=t.concat();return this.notifyChange("rings"),this}clone(){const t=new x$1;return t.spatialReference=this.spatialReference,t.rings=m$q(this.rings),t.hasZ=this.hasZ,t.hasM=this.hasM,t}equals(t){if(this===t)return !0;if(t$y(t))return !1;const e=this.spatialReference,n=t.spatialReference;if(r$z(e)!==r$z(n))return !1;if(r$z(e)&&r$z(n)&&!e.equals(n))return !1;if(this.rings.length!==t.rings.length)return !1;const o=([t,r,e,s],[i,n,o,a])=>t===i&&r===n&&(null==e&&null==o||e===o)&&(null==s&&null==a||s===a);for(let s=0;s<this.rings.length;s++){const e=this.rings[s],i=t.rings[s];if(!l$x(e,i,o))return !1}return !0}contains(t){if(!t)return !1;const r=M$8(t,this.spatialReference);return c$9(this,r$z(r)?r:t)}isClockwise(t){let r;return r=j$1(t)?t.map((t=>this.hasZ?this.hasM?[t.x,t.y,t.z,t.m]:[t.x,t.y,t.z]:[t.x,t.y])):t,f$4(r,this.hasM,this.hasZ)}getPoint(t,r){if(!this._validateInputs(t,r))return null;const e=this.rings[t][r],s=this.hasZ,i=this.hasM;return s&&!i?new j$7(e[0],e[1],e[2],void 0,this.spatialReference):i&&!s?new j$7(e[0],e[1],void 0,e[2],this.spatialReference):s&&i?new j$7(e[0],e[1],e[2],e[3],this.spatialReference):new j$7(e[0],e[1],this.spatialReference)}insertPoint(t,r,e){return this._validateInputs(t,r,!0)?(h$6(this,e),Array.isArray(e)||(e=e.toArray()),this.rings[t].splice(r,0,e),this.notifyChange("rings"),this):this}removePoint(t,r){if(!this._validateInputs(t,r))return null;const e=new j$7(this.rings[t].splice(r,1)[0],this.spatialReference);return this.notifyChange("rings"),e}removeRing(t){if(!this._validateInputs(t,null))return null;const r=this.rings.splice(t,1)[0],e=this.spatialReference,s=r.map((t=>new j$7(t,e)));return this.notifyChange("rings"),s}setPoint(t,r,e){return this._validateInputs(t,r)?(h$6(this,e),Array.isArray(e)||(e=e.toArray()),this.rings[t][r]=e,this.notifyChange("rings"),this):this}_validateInputs(t,r,e=!1){if(null==t||t<0||t>=this.rings.length)return !1;if(null!=r){const s=this.rings[t];if(e&&(r<0||r>s.length))return !1;if(!e&&(r<0||r>=s.length))return !1}return !0}toJSON(t){return this.write({},t)}};e$r([d$j({readOnly:!0})],w$1.prototype,"cache",null),e$r([d$j({readOnly:!0})],w$1.prototype,"centroid",null),e$r([d$j({readOnly:!0})],w$1.prototype,"extent",null),e$r([d$j({readOnly:!0})],w$1.prototype,"isSelfIntersecting",null),e$r([d$j({type:[[[Number]]],json:{write:{isRequired:!0}}})],w$1.prototype,"rings",void 0),e$r([r$l("rings")],w$1.prototype,"writeRings",null),w$1=x$1=e$r([n$e("esri.geometry.Polygon")],w$1),w$1.prototype.toJSON.isDefaultToJSON=!0;const v$1=w$1;

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
var c$2;function u$1(t){return !Array.isArray(t[0])}let f$1=c$2=class extends p$a{constructor(...t){super(...t),this.paths=[],this.type="polyline";}normalizeCtorArgs(t,e){let s,r,i=null,a=null;return t&&!Array.isArray(t)?(i=t.paths?t.paths:null,e||(t.spatialReference?e=t.spatialReference:t.paths||(e=t)),s=t.hasZ,r=t.hasM):i=t,i=i||[],e=e||k$6.WGS84,i.length&&i[0]&&null!=i[0][0]&&"number"==typeof i[0][0]&&(i=[i]),a=i[0]&&i[0][0],a&&(void 0===s&&void 0===r?(s=a.length>2,r=!1):void 0===s?s=!r&&a.length>3:void 0===r&&(r=!s&&a.length>3)),{paths:i,spatialReference:e,hasZ:s,hasM:r}}get cache(){return this.commitProperty("paths"),this.commitProperty("hasZ"),this.commitProperty("hasM"),this.commitProperty("spatialReference"),{}}get extent(){const{spatialReference:t}=this,e=h$1(this);if(!e)return null;const s=new M$2(e);return s.spatialReference=t,s}writePaths(t,s){s.paths=m$q(this.paths);}addPath(t){if(!t)return;const e=this.paths,s=e.length;if(u$1(t)){const r=[];for(let e=0,s=t.length;e<s;e++)r[e]=t[e].toArray();e[s]=r;}else e[s]=t.concat();return this.notifyChange("paths"),this}clone(){const t=new c$2;return t.spatialReference=this.spatialReference,t.paths=m$q(this.paths),t.hasZ=this.hasZ,t.hasM=this.hasM,t}getPoint(t,e){if(!this._validateInputs(t,e))return null;const s=this.paths[t][e],r=this.hasZ,i=this.hasM;return r&&!i?new j$7(s[0],s[1],s[2],void 0,this.spatialReference):i&&!r?new j$7(s[0],s[1],void 0,s[2],this.spatialReference):r&&i?new j$7(s[0],s[1],s[2],s[3],this.spatialReference):new j$7(s[0],s[1],this.spatialReference)}insertPoint(t,e,s){return this._validateInputs(t,e,!0)?(h$6(this,s),Array.isArray(s)||(s=s.toArray()),this.paths[t].splice(e,0,s),this.notifyChange("paths"),this):this}removePath(t){if(!this._validateInputs(t,null))return null;const e=this.paths.splice(t,1)[0],s=this.spatialReference,r=e.map((t=>new j$7(t,s)));return this.notifyChange("paths"),r}removePoint(t,e){if(!this._validateInputs(t,e))return null;const s=new j$7(this.paths[t].splice(e,1)[0],this.spatialReference);return this.notifyChange("paths"),s}setPoint(t,e,s){return this._validateInputs(t,e)?(h$6(this,s),Array.isArray(s)||(s=s.toArray()),this.paths[t][e]=s,this.notifyChange("paths"),this):this}_validateInputs(t,e,s=!1){if(null==t||t<0||t>=this.paths.length)return !1;if(null!=e){const r=this.paths[t];if(s&&(e<0||e>r.length))return !1;if(!s&&(e<0||e>=r.length))return !1}return !0}toJSON(t){return this.write({},t)}};e$r([d$j({readOnly:!0})],f$1.prototype,"cache",null),e$r([d$j({readOnly:!0})],f$1.prototype,"extent",null),e$r([d$j({type:[[[Number]]],json:{write:{isRequired:!0}}})],f$1.prototype,"paths",void 0),e$r([r$l("paths")],f$1.prototype,"writePaths",null),f$1=c$2=e$r([n$e("esri.geometry.Polyline")],f$1),f$1.prototype.toJSON.isDefaultToJSON=!0;const m$1=f$1;

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
function i$2(n){return n}function u(n=K){return i$2([n[0],n[1],n[2],n[3]])}function e(n){return i$2([n[0],n[1],n[2],n[3]])}function a(n,t){return n!==t&&(n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3]),n}function o$1(n,t,r,i,e=u()){return e[0]=n,e[1]=t,e[2]=r,e[3]=i,e}function c$1(n,t=u()){return t[0]=n.xmin,t[1]=n.ymin,t[2]=n.xmax,t[3]=n.ymax,t}function f(n,t){return new M$2({xmin:n[0],ymin:n[1],xmax:n[2],ymax:n[3],spatialReference:t})}function m(n,t){t[0]<n[0]&&(n[0]=t[0]),t[0]>n[2]&&(n[2]=t[0]),t[1]<n[1]&&(n[1]=t[1]),t[1]>n[3]&&(n[3]=t[1]);}function h(n,r,i){if(t$y(r))a(i,n);else if("length"in r)D$1(r)?(i[0]=Math.min(n[0],r[0]),i[1]=Math.min(n[1],r[1]),i[2]=Math.max(n[2],r[2]),i[3]=Math.max(n[3],r[3])):2!==r.length&&3!==r.length||(i[0]=Math.min(n[0],r[0]),i[1]=Math.min(n[1],r[1]),i[2]=Math.max(n[2],r[0]),i[3]=Math.max(n[3],r[1]));else switch(r.type){case"extent":i[0]=Math.min(n[0],r.xmin),i[1]=Math.min(n[1],r.ymin),i[2]=Math.max(n[2],r.xmax),i[3]=Math.max(n[3],r.ymax);break;case"point":i[0]=Math.min(n[0],r.x),i[1]=Math.min(n[1],r.y),i[2]=Math.max(n[2],r.x),i[3]=Math.max(n[3],r.y);}}function x(n,t,r=n){const i=t.length;let u=n[0],e=n[1],a=n[2],o=n[3];for(let c=0;c<i;c++){const n=t[c];u=Math.min(u,n[0]),e=Math.min(e,n[1]),a=Math.max(a,n[0]),o=Math.max(o,n[1]);}return r[0]=u,r[1]=e,r[2]=a,r[3]=o,r}function M(n){for(let t=0;t<4;t++)if(!isFinite(n[t]))return !1;return !0}function s$4(n){return t$y(n)||n[0]>=n[2]?0:n[2]-n[0]}function l$1(n){return n[1]>=n[3]?0:n[3]-n[1]}function y(n){return s$4(n)*l$1(n)}function p(n,t=[0,0]){return t[0]=(n[0]+n[2])/2,t[1]=(n[1]+n[3])/2,t}function b(n,t){return w(n,t[0],t[1])}function g(n,t){const r=t[3],i=.5*(n[0]+n[2]),u=Math.abs(t[0]-i),e=.5*(n[2]-n[0]);if(u>r+e)return !1;const a=.5*(n[1]+n[3]),o=.5*(n[3]-n[1]),c=Math.abs(t[1]-a);if(c>r+o)return !1;if(u<e||c<o)return !0;const f=u-e,m=c-o;return f*f+m*m<=r*r}function j(n,t,r){const i=n[0],u=n[1],e=n[2],a=n[3],{x:o,y:c}=t,{x:f,y:m}=r,h=(n,t)=>(m-c)*n+(o-f)*t+(f*c-o*m)<0,x=h(i,a),M=h(e,a),s=h(e,u),l=h(i,u);return !(x===M&&M===s&&s===l&&l===x||o<i&&f<i||o>e&&f>e||c>a&&m>a||c<u&&m<u)}function F(n,t){return w(n,t.x,t.y)}function w(n,t,r){return t>=n[0]&&r>=n[1]&&t<=n[2]&&r<=n[3]}function k(n,t,r){return t[0]>=n[0]-r&&t[1]>=n[1]-r&&t[0]<=n[2]+r&&t[1]<=n[3]+r}function q(n,t){return Math.max(t[0],n[0])<=Math.min(t[2],n[2])&&Math.max(t[1],n[1])<=Math.min(t[3],n[3])}function E(n,t){return t[0]>=n[0]&&t[2]<=n[2]&&t[1]>=n[1]&&t[3]<=n[3]}function R(r,i,u){if(t$y(i))return a(u,r);const e=i[0],o=i[1],c=i[2],f=i[3];return u[0]=e$7(r[0],e,c),u[1]=e$7(r[1],o,f),u[2]=e$7(r[2],e,c),u[3]=e$7(r[3],o,f),u}function U(n,t){const r=(n[0]+n[2])/2,i=(n[1]+n[3])/2,u=Math.max(Math.abs(t[0]-r)-s$4(n)/2,0),e=Math.max(Math.abs(t[1]-i)-l$1(n)/2,0);return Math.sqrt(u*u+e*e)}function d$1(n,t){t[0]=n[2]-n[0],t[1]=n[3]-n[1];}function v(n,t,r,i=n){return i[0]=n[0]+t,i[1]=n[1]+r,i[2]=n[2]+t,i[3]=n[3]+r,i}function z(n,t,r=n){return r[0]=n[0]-t,r[1]=n[1]-t,r[2]=n[2]+t,r[3]=n[3]+t,r}function A(n,t,r=n){return r[0]=t[0],r[1]=t[1],r!==n&&(r[2]=n[2],r[3]=n[3]),r}function B(n,t,r=n){return r[2]=t[0],r[3]=t[1],r!==n&&(r[0]=n[0],r[1]=n[1]),n}function C(n){return n?a(n,J$1):u(J$1)}function D$1(n){return null!=n&&4===n.length}function G(n){return !(0!==s$4(n)&&isFinite(n[0])||0!==l$1(n)&&isFinite(n[1]))}function H(n,t){return D$1(n)&&D$1(t)?n[0]===t[0]&&n[1]===t[1]&&n[2]===t[2]&&n[3]===t[3]:n===t}const I=i$2([-1/0,-1/0,1/0,1/0]),J$1=i$2([1/0,1/0,-1/0,-1/0]),K=i$2([0,0,0,0]),L=i$2([0,0,1,1]);

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
const i$1=Math.PI/180,t$1=/SPHEROID\[([^\]]+)]/i,r$1=s$h.radius,n=s$h.eccentricitySquared,s$3={a1:r$1*n,a2:r$1*n*r$1*n,a3:r$1*n*n/2,a4:r$1*n*r$1*n*2.5,a5:r$1*n+r$1*n*n/2,a6:1-n},d={4267:{a:6378206.4,f:1/294.9786982},4269:{a:6378137,f:1/298.257222101},4326:{a:s$h.radius,f:s$h.flattening},104900:{a:2439700,f:0},104901:{a:6051e3,f:0},104902:{a:6051800,f:0},104903:{a:e$c.radius,f:e$c.flattening},104904:{a:3393400,f:1/192.0430107526882},104905:{a:t$8.radius,f:t$8.flattening},104906:{a:6200,f:0},104907:{a:11100,f:0},104908:{a:71492e3,f:.06487439154031222},104909:{a:8200,f:0},104910:{a:83500,f:0},104911:{a:1e4,f:0},104912:{a:2409300,f:0},104913:{a:15e3,f:0},104914:{a:4e4,f:0},104915:{a:1562090,f:0},104916:{a:2632345,f:0},104917:{a:85e3,f:0},104918:{a:1821460,f:0},104919:{a:5e3,f:0},104920:{a:12e3,f:0},104921:{a:3e4,f:3},104922:{a:18e3,f:0},104923:{a:14e3,f:0},104924:{a:49300,f:0},104925:{a:60268e3,f:1/10.2079945799458},104926:{a:16e3,f:0},104927:{a:9500,f:0},104928:{a:56e4,f:0},104929:{a:249400,f:0},104930:{a:59500,f:0},104931:{a:16e3,f:0},104932:{a:133e3,f:0},104933:{a:718e3,f:0},104934:{a:888e3,f:0},104935:{a:1986300,f:0},104936:{a:1e4,f:0},104937:{a:41900,f:0},104938:{a:11e4,f:0},104939:{a:50100,f:0},104940:{a:764e3,f:0},104941:{a:11e3,f:0},104942:{a:529800,f:0},104943:{a:2575e3,f:0},104944:{a:25559e3,f:1/43.61604095563141},104945:{a:578900,f:0},104946:{a:33e3,f:0},104947:{a:21e3,f:0},104948:{a:13e3,f:0},104949:{a:31e3,f:0},104950:{a:27e3,f:0},104951:{a:42e3,f:0},104952:{a:235800,f:0},104953:{a:761400,f:0},104954:{a:15e3,f:0},104955:{a:54e3,f:0},104956:{a:77e3,f:0},104957:{a:27e3,f:0},104958:{a:788900,f:0},104959:{a:584700,f:0},104960:{a:24764e3,f:.01708124697141011},104961:{a:74e3,f:0},104962:{a:79e3,f:0},104963:{a:104e3,f:.14423076923076922},104964:{a:29e3,f:0},104965:{a:17e4,f:0},104966:{a:208e3,f:0},104967:{a:4e4,f:0},104968:{a:1352600,f:0},104969:{a:1195e3,f:0},104970:{a:593e3,f:0},104971:{a:t$8.radius,f:0},104972:{a:47e4,f:0},104973:{a:255e3,f:0},104974:{a:2439400,f:0}};

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
let s$2=0;class t{constructor(t=null){this.uid=s$2++,t?(this._wkt=void 0!==t.wkt?t.wkt:null,this._wkid=void 0!==t.wkid?t.wkid:-1,this._isInverse=void 0!==t.isInverse&&!0===t.isInverse):(this._wkt=null,this._wkid=-1,this._isInverse=!1);}static fromGE(s){const i=new t;return i._wkt=s.wkt,i._wkid=s.wkid,i._isInverse=s.isInverse,i}get wkt(){return this._wkt}set wkt(t){this._wkt=t,this.uid=s$2++;}get wkid(){return this._wkid}set wkid(t){this._wkid=t,this.uid=s$2++;}get isInverse(){return this._isInverse}set isInverse(t){this._isInverse=t,this.uid=s$2++;}getInverse(){const s=new t;return s._wkt=this.wkt,s._wkid=this._wkid,s._isInverse=!this.isInverse,s}}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
class s$1{constructor(s){if(this.steps=[],this._cached_projection={},this._chain="",this._gtlistentry=null,s&&s.steps)for(const i of s.steps)i instanceof t?this.steps.push(i):this.steps.push(new t({wkid:i.wkid,wkt:i.wkt,isInverse:i.isInverse}));}static cacheKey(t,s){return [void 0!==t.wkid&&null!==t.wkid?t.wkid.toString():"-1",void 0!==t.wkt&&null!==t.wkt?t.wkt.toString():"",void 0!==s.wkid&&null!==s.wkid?s.wkid.toString():"-1",void 0!==s.wkt&&null!==s.wkt?s.wkt.toString():""].join(",")}static fromGE(i){const e=new s$1;let n="";for(const s of i.steps){const i=t.fromGE(s);e.steps.push(i),n+=i.uid.toString()+",";}return e._cached_projection={},e._gtlistentry=null,e._chain=n,e}getInverse(){const t=new s$1;t.steps=[];for(let s=this.steps.length-1;s>=0;s--){const i=this.steps[s];t.steps.push(i.getInverse());}return t}getGTListEntry(){let t="";for(const s of this.steps)t+=s.uid.toString()+",";return t!==this._chain&&(this._gtlistentry=null,this._cached_projection={},this._chain=t),this._gtlistentry}assignCachedGe(t,i,e){this._cached_projection[s$1.cacheKey(t,i)]=e;}getCachedGeTransformation(t,i){let e="";for(const s of this.steps)e+=s.uid.toString()+",";e!==this._chain&&(this._gtlistentry=null,this._cached_projection={},this._chain=e);const n=this._cached_projection[s$1.cacheKey(t,i)];return void 0===n?null:n}}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
function o(o,f,u){if(t$y(f)||t$y(u)||u.vcsWkid||E$7(f,u))return null;const a=Y$2(f)/Y$2(u);if(1===a)return null;switch(o){case"point":case"esriGeometryPoint":return n=>r(n,a);case"polyline":case"esriGeometryPolyline":return n=>s(n,a);case"polygon":case"esriGeometryPolygon":return n=>i(n,a);case"multipoint":case"esriGeometryMultipoint":return n=>c(n,a);case"extent":case"esriGeometryExtent":return n=>l(n,a);default:return null}}function r(n,e){n&&null!=n.z&&(n.z*=e);}function i(n,e){if(n)for(const t of n.rings)for(const n of t)n.length>2&&(n[2]*=e);}function s(n,e){if(n)for(const t of n.paths)for(const n of t)n.length>2&&(n[2]*=e);}function c(n,e){if(n)for(const t of n.points)t.length>2&&(t[2]*=e);}function l(n,e){n&&null!=n.zmin&&null!=n.zmax&&(n.zmin*=e,n.zmax*=e);}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.23/esri/copyright.txt for details.
*/
let Z=null,V=null,X=null,D={};function J(){return !!Z&&n$2()}function Q(n){return t$y(X)&&(X=Promise.all([P(),import('./geometryEngineBase-e53d06bc.js').then((n=>n.g)),import('./hydrated-f21f33a7.js')])),X.then((([,e,{hydratedAdapter:t}])=>{a$q(n),V=t,Z=e.default,Z._enableProjection(R$1);}))}function Y(n,e,t=null){return Array.isArray(n)?0===n.length?[]:$(V,n,n[0].spatialReference,e,t):$(V,[n],n.spatialReference,e,t)[0]}function $(n,e,t,r,l=null){if(t$y(t)||t$y(r))return e;if(on(t,r,l))return e.map((n=>e$D(En(n,t,r))));if(t$y(l)){const n=s$1.cacheKey(t,r);void 0!==D[n]?l=D[n]:(l=nn(t,r,null),t$y(l)&&(l=new s$1),D[n]=l);}if(t$y(Z))throw new tn;return Z._project(n,e,t,r,l)}function nn(n,e,t=null){if(t$y(Z))throw new tn;if(t$y(n)||t$y(e))return null;const r=Z._getTransformation(V,n,e,t,null==t?void 0:t.spatialReference);return null!==r?s$1.fromGE(r):null}function en(n,e,t=null){if(t$y(Z))throw new tn;const r=Z._getTransformationBySuitability(V,n,e,t,null==t?void 0:t.spatialReference);if(null!==r){const n=[];for(const e of r)n.push(s$1.fromGE(e));return n}return []}class tn extends s$D{constructor(){super("projection:not-loaded","projection engine not fully loaded yet, please call load()");}}var rn;function ln(){Z=null,V=null,X=null,D={};}function un(n,e){try{const t=Y(n,e);if(null==t)return null;"xmin"in n&&"xmin"in t&&(t.zmin=n.zmin,t.zmax=n.zmax);const r=o(t.type,n.spatialReference,e);return r$z(r)&&r(t),t}catch(t){if(!(t instanceof tn))throw t;return null}}function on(n,e,t){return !t&&(!!E$7(n,e)||I$7(n)&&I$7(e)&&!!Oe(n,e,he))}async function sn(n,e,t,r){if(!J())if(Array.isArray(n)){for(const{source:l,dest:u,geographicTransformation:o}of n)if(!on(l,u,o))return Q(r)}else if(!on(n,e,t))return Q(r)}function an(n,e){switch(Oe(n,e,he)){case zn:return "copy3";case ie:return "wgs84ToSphericalECEF";case Zn:return "wgs84ToWebMercator";case Dn:return "wgs84ToPlateCarree";case fe:return "wgs84ToWGS84ECEF";case bn:return "webMercatorToWGS84";case kn:return "webMercatorToSphericalECEF";case vn:return "webMercatorToWGS84ECEF";case Qn:return "webMercatorToPlateCarree";case Se:return "wgs84ECEFToWGS84";case Pe:return "wgs84ECEFToSphericalECEF";case Le:return "wgs84ECEFToWebMercator";case ce:return "sphericalECEFToWGS84";case Re:return "sphericalECEFToWebMercator";case Ce:return "sphericalMarsPCPFToMars2000";case Ee:return "sphericalMoonPCPFToMoon2000";case Ae:return "sphericalECEFToWGS84ECEF";case se:return "mars2000ToSphericalPCPF";case oe:return "moon2000ToSphericalPCPF";default:return null}}function En(n,e,t){return n?"x"in n?cn(n,e,new j$7,t,0):"xmin"in n?Mn(n,e,new M$2,t,0):"rings"in n?Pn(n,e,new v$1,t,0):"paths"in n?fn(n,e,new m$1,t,0):"points"in n?An(n,e,new m$5,t,0):null:null}function Cn(n,e,t=e.spatialReference,r=0){return !t$y(t)&&r$z(cn(n,n.spatialReference,e,t,r))}function cn(n,e,t,r,l){Be[0]=n.x,Be[1]=n.y;const u=n.z;return Be[2]=void 0!==u?u:l,Fn(Be,e,0,Be,r,0,1)?(t.x=Be[0],t.y=Be[1],t.spatialReference=r,void 0===u?(t.z=void 0,t.hasZ=!1):(t.z=Be[2],t.hasZ=!0),void 0===n.m?(t.m=void 0,t.hasM=!1):(t.m=n.m,t.hasM=!0),t):null}function Rn(n,e,t=e.spatialReference,r=0){return !t$y(t)&&r$z(An(n,n.spatialReference,e,t,r))}function An(n,e,t,r,l){const{points:u,hasZ:o,hasM:s}=n,i=[],a=u.length,E=[];for(const C of u)E.push(C[0],C[1],o?C[2]:l);if(!Fn(E,e,0,E,r,0,a))return null;for(let C=0;C<a;++C){const n=3*C,e=E[n],t=E[n+1];o&&s?i.push([e,t,E[n+2],u[C][3]]):o?i.push([e,t,E[n+2]]):s?i.push([e,t,u[C][2]]):i.push([e,t]);}return t.points=i,t.spatialReference=r,t.hasZ=o,t.hasM=s,t}function _n(n,e,t=e.spatialReference,r=0){return r$z(t)&&r$z(fn(n,n.spatialReference,e,t,r))}function fn(n,e,t,r,l){const{paths:u,hasZ:o,hasM:s}=n,i=[];return dn(u,o,s,e,i,r,l)?(t.paths=i,t.spatialReference=r,t.hasZ=o,t.hasM=s,t):null}function Sn(n,e,t=e.spatialReference,r=0){return r$z(t)&&r$z(Pn(n,n.spatialReference,e,t,r))}function Pn(n,e,t,r,l){const{rings:u,hasZ:o,hasM:s}=n,i=[];return dn(u,o,s,e,i,r,l)?(t.rings=i,t.spatialReference=r,t.hasZ=o,t.hasM=s,t):null}function Ln(n,e,t=e.spatialReference,r=0){return r$z(t)&&r$z(Mn(n,n.spatialReference,e,t,r))}function Mn(n,e,t,r,l){const{xmin:u,ymin:o,xmax:s,ymax:i,hasZ:a,hasM:E}=n;if(!Gn(u,o,a?n.zmin:l,e,Be,r))return null;t.xmin=Be[0],t.ymin=Be[1],a&&(t.zmin=Be[2]);return Gn(s,i,a?n.zmax:l,e,Be,r)?(t.xmax=Be[0],t.ymax=Be[1],a&&(t.zmax=Be[2]),E&&(t.mmin=n.mmin,t.mmax=n.mmax),t.spatialReference=r,t):null}function On(n,e,t){if(t$y(e)||t$y(t))return null;const r=new j$7({spatialReference:t});return Fn(n,e,0,Be,t,0,1)?(r.x=Be[0],r.y=Be[1],r.z=Be[2],r):null}function pn(n,e,t){return Fn(n,e,0,Be,t.spatialReference,0,1)?(t.x=Be[0],t.y=Be[1],t.z=Be[2],t):null}function Nn(n,e,t,r=0){Be[0]=n.x,Be[1]=n.y;const l=n.z;return Be[2]=void 0!==l?l:r,Fn(Be,n.spatialReference,0,e,t,0,1)}function Gn(n,e,t,r,l,u){return Ie[0]=n,Ie[1]=e,Ie[2]=t,Fn(Ie,r,0,l,u,0,1)}function Wn(n,e,t,r){return !(t$y(e)||t$y(r)||n.length<2)&&(2===n.length&&(Ie[0]=n[0],Ie[1]=n[1],Ie[2]=0,n=Ie),Fn(n,e,0,t,r,0,1))}function hn(n,e){Be[0]=n.x,Be[1]=n.y;const t=n.z;return Be[2]=void 0!==t?t:0,Tn(Be,n.spatialReference,e)}function Tn(n,e,t){return mn(n,e,t)}function mn(n,e,t){if(t$y(e))return !1;const r=Kn(e,Ge),l=Me[r][rn.WGS84_COMPARABLE_LON_LAT];return !t$y(l)&&(l(n,0,Ie,0),t!==Ie&&(t[0]=Ie[0],t[1]=Ie[1],t.length>2&&(t[2]=Ie[2])),!0)}function Fn(n,e,t,r,l,o,s=1){const i=Oe(e,l,he);if(t$y(i))return !1;if(i===zn){if(n===r&&t===o)return !0;const e=t+3*s;for(let l=t,u=o;l<e;l++,u++)r[u]=n[l];return !0}const a=t+3*s;for(let u=t,E=o;u<a;u+=3,E+=3)i(n,u,r,E);return !0}function In(n,e,t,r,l){r$a(Be,n),u$e(je,n,e),Wn(Be,t,Be,l),Wn(je,t,je,l),c$d(r,je,Be),j$6(r,r);}function dn(n,e,t,r,l,u,o=0){const s=new Array;for(const a of n)for(const n of a)s.push(n[0],n[1],e?n[2]:o);if(!Fn(s,r,0,s,u,0,s.length/3))return !1;let i=0;l.length=0;for(const a of n){const n=new Array;for(const r of a)e&&t?n.push([s[i++],s[i++],s[i++],r[3]]):e?n.push([s[i++],s[i++],s[i++]]):t?(n.push([s[i++],s[i++],r[2]]),i++):(n.push([s[i++],s[i++]]),i++);l.push(n);}return !0}function Hn(n,e,t,r){if(t$y(e)||t$y(r))return !1;const l=pe(e,r,Te);if(l.projector===zn)return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],!0;if(t$y(l.projector))return !1;const{source:o,dest:i}=l;if(i.spatialReferenceId===rn.WEB_MERCATOR){const e=Me[o.spatialReferenceId][rn.WGS84];return !t$y(e)&&(e(n,0,de,0),Zn(de,0,t,0),t[3]=Bn(de[1],n[2],n[3],s$h.radius),!0)}if(o.spatialReferenceId!==rn.WGS84&&o.spatialReferenceId!==rn.CGCS2000||i.spatialReferenceId!==rn.PLATE_CARREE)l.projector(n,0,t,0),t[3]=n[3]*o.metersPerUnit/i.metersPerUnit;else {const e=Me[o.spatialReferenceId][rn.SPHERICAL_ECEF],r=Me[rn.SPHERICAL_ECEF][rn.PLATE_CARREE];let u=n[3];r$z(e)&&r$z(r)&&(u=Bn(n[1],n[2],n[3],s$h.radius)),l.projector(n,0,t,0),t[3]=u;}return !0}function Bn(n,e,t,r){const l=r+e;if(l<r/2||t>l)return Number.MAX_VALUE;const u=Math.abs(me*n)+Math.asin(t/l);return u>=Math.PI/2?Number.MAX_VALUE:t/Math.cos(u)}function jn(n,e,t,r){return null!=n&&(E$7(e,r)?(a(t,n),!0):(Ie[0]=n[0],Ie[1]=n[1],Ie[2]=0,!!Fn(Ie,e,0,Ie,r,0,1)&&(t[0]=Ie[0],t[1]=Ie[1],Ie[0]=n[2],Ie[1]=n[3],Ie[2]=0,!!Fn(Ie,e,0,Ie,r,0,1)&&(t[2]=Ie[0],t[3]=Ie[1],!0))))}function wn(n,e,t,r){if(t$y(e)||t$y(r))return !1;const l=Kn(e,Ge),o=Kn(r,We);if(l===o&&l!==rn.UNKNOWN||E$7(e,r))return t[0]=1,t[1]=1,t[2]=1,!0;if(l===rn.SPHERICAL_ECEF){const e=s$e(n),r=e/Math.sqrt(n[0]*n[0]+n[1]*n[1]),l=e/s$h.radius;if(o===rn.WEB_MERCATOR)return t[0]=r*l,t[1]=r*l,t[2]=1,!0;if(o===rn.WGS84||o===rn.CGCS2000){const n=Xn;return t[0]=n*r*l,t[1]=n*l,t[2]=1,!0}}else if(l===rn.PLATE_CARREE){if(o===rn.WGS84||o===rn.CGCS2000)return t[0]=Xn,t[1]=Xn,t[2]=1,!0;if(o===rn.WEB_MERCATOR){const e=n[1]/s$h.radius;return t[0]=1,t[1]=1/Math.cos(e),t[2]=1,!0}}return !1}function Un(n,e,t,r){if(t$y(n)||t$y(r))return !1;const l=Kn(n,Ge),o=Kn(r,We);if(l===o&&!yn(o)&&(l!==rn.UNKNOWN||E$7(n,r)))return x$6(t,e),!0;if(yn(o)){const n=Me[l][rn.LON_LAT],r=Me[rn.LON_LAT][o];return !t$y(n)&&!t$y(r)&&(n(e,0,de,0),r(de,0,He,0),gn(me*de[0],me*de[1],t),t[12]=He[0],t[13]=He[1],t[14]=He[2],!0)}if((o===rn.WEB_MERCATOR||o===rn.PLATE_CARREE)&&(l===rn.WGS84||l===rn.CGCS2000&&o===rn.PLATE_CARREE||l===rn.SPHERICAL_ECEF||l===rn.WEB_MERCATOR)){const n=Me[l][rn.LON_LAT],r=Me[rn.LON_LAT][o];return !t$y(n)&&!t$y(r)&&(n(e,0,de,0),r(de,0,He,0),l===rn.SPHERICAL_ECEF?xn(me*de[0],me*de[1],t):r$8(t),t[12]=He[0],t[13]=He[1],t[14]=He[2],!0)}return !1}function yn(n){return n===rn.SPHERICAL_ECEF||n===rn.SPHERICAL_MARS_PCPF||n===rn.SPHERICAL_MOON_PCPF}function gn(n,e,t){const r=Math.sin(n),l=Math.cos(n),u=Math.sin(e),o=Math.cos(e),s=t;return s[0]=-r,s[4]=-u*l,s[8]=o*l,s[12]=0,s[1]=l,s[5]=-u*r,s[9]=o*r,s[13]=0,s[2]=0,s[6]=o,s[10]=u,s[14]=0,s[3]=0,s[7]=0,s[11]=0,s[15]=1,s}function xn(n,e,t){return gn(n,e,t),o$9(t,t),t}function Kn(n,e){return e.spatialReference===n?e.spatialReferenceId:(e.spatialReference=n,"metersPerUnit"in e&&(e.metersPerUnit=H$2(n,1)),n.wkt===G$4.wkt?e.spatialReferenceId=rn.SPHERICAL_ECEF:G$7(n)?e.spatialReferenceId=rn.WGS84:k$7(n)?e.spatialReferenceId=rn.WEB_MERCATOR:T$5(n)?e.spatialReferenceId=rn.PLATE_CARREE:n.wkt===R$4.wkt?e.spatialReferenceId=rn.WGS84_ECEF:n.wkid===S$6.CGCS2000?e.spatialReferenceId=rn.CGCS2000:n.wkt===I$3.wkt?e.spatialReferenceId=rn.SPHERICAL_MARS_PCPF:n.wkt===E$4.wkt?e.spatialReferenceId=rn.SPHERICAL_MOON_PCPF:P$5(n)?e.spatialReferenceId=rn.GCSMARS2000:s$i(n)?e.spatialReferenceId=rn.GCSMOON2000:e.spatialReferenceId=rn.UNKNOWN)}function zn(n,e,t,r){n!==t&&(t[r++]=n[e++],t[r++]=n[e++],t[r]=n[e]);}function bn(n,e,t,r){t[r++]=Fe*(n[e++]/s$h.radius),t[r++]=Fe*(Math.PI/2-2*Math.atan(Math.exp(-n[e++]/s$h.radius))),t[r]=n[e];}function kn(n,e,t,r){bn(n,e,t,r),ie(t,r,t,r);}function vn(n,e,t,r){bn(n,e,t,r),fe(t,r,t,r);}function qn(n,t,r,l,u){const o=.4999999*Math.PI,s=e$7(me*n[t+1],-o,o),i=Math.sin(s);r[l++]=me*n[t]*u.radius,r[l++]=u.halfSemiMajorAxis*Math.log((1+i)/(1-i)),r[l]=n[t+2];}function Zn(n,e,t,r){qn(n,e,t,r,s$h);}!function(n){n[n.UNKNOWN=0]="UNKNOWN",n[n.SPHERICAL_ECEF=1]="SPHERICAL_ECEF",n[n.WGS84=2]="WGS84",n[n.WEB_MERCATOR=3]="WEB_MERCATOR",n[n.WGS84_ECEF=4]="WGS84_ECEF",n[n.CGCS2000=5]="CGCS2000",n[n.WGS84_COMPARABLE_LON_LAT=6]="WGS84_COMPARABLE_LON_LAT",n[n.SPHERICAL_MARS_PCPF=7]="SPHERICAL_MARS_PCPF",n[n.GCSMARS2000=8]="GCSMARS2000",n[n.SPHERICAL_MOON_PCPF=9]="SPHERICAL_MOON_PCPF",n[n.GCSMOON2000=10]="GCSMOON2000",n[n.LON_LAT=11]="LON_LAT",n[n.PLATE_CARREE=12]="PLATE_CARREE";}(rn||(rn={}));const Vn=s$h.radius*Math.PI/180,Xn=180/(s$h.radius*Math.PI);function Dn(n,e,t,r){t[r]=n[e]*Vn,t[r+1]=n[e+1]*Vn,t[r+2]=n[e+2];}function Jn(n,e,t,r){t[r]=n[e]*Xn,t[r+1]=n[e+1]*Xn,t[r+2]=n[e+2];}function Qn(n,e,t,r){bn(n,e,t,r),Dn(t,r,t,r);}function Yn(n,e,t,r){Se(n,e,t,r),Dn(t,r,t,r);}function $n(n,e,t,r){ce(n,e,t,r),Dn(t,r,t,r);}function ne(n,e,t,r){Jn(n,e,t,r),ie(t,r,t,r);}function ee(n,e,t,r){Jn(n,e,t,r),Zn(t,r,t,r);}function te(n,e,t,r){Jn(n,e,t,r),fe(t,r,t,r);}function re(n){if(t$y(n))return !1;const e=Kn(n,Ge);return !!Me[e][rn.WGS84_COMPARABLE_LON_LAT]}function le(n,e,t,r,l=0){const u=r+l,o=Math.cos(t);n[0]=Math.cos(e)*o*u,n[1]=Math.sin(e)*o*u,n[2]=Math.sin(t)*u;}function ue(n,e,t,r,l){const u=l+n[e+2],o=me*n[e+1],s=me*n[e],i=Math.cos(o);t[r++]=Math.cos(s)*i*u,t[r++]=Math.sin(s)*i*u,t[r]=Math.sin(o)*u;}function oe(n,e,t,r){ue(n,e,t,r,e$c.radius);}function se(n,e,t,r){ue(n,e,t,r,t$8.radius);}function ie(n,e,t,r){ue(n,e,t,r,s$h.radius);}function ae(n,e,t,r,u){const o=n[e],s=n[e+1],i=n[e+2],a=Math.sqrt(o*o+s*s+i*i),E=b$3(i/(0===a?1:a)),C=Math.atan2(s,o);t[r++]=Fe*C,t[r++]=Fe*E,t[r]=a-u;}function Ee(n,e,t,r){ae(n,e,t,r,e$c.radius);}function Ce(n,e,t,r){ae(n,e,t,r,t$8.radius);}function ce(n,e,t,r){ae(n,e,t,r,s$h.radius);}function Re(n,e,t,r){ce(n,e,t,r),Zn(t,r,t,r);}function Ae(n,e,t,r){ce(n,e,t,r),fe(t,r,t,r);}function _e(n,e,t,r,l){const u=me*n[e],o=me*n[e+1],s=n[e+2],i=Math.sin(o),a=Math.cos(o),E=l.radius/Math.sqrt(1-l.eccentricitySquared*i*i);t[r++]=(E+s)*a*Math.cos(u),t[r++]=(E+s)*a*Math.sin(u),t[r++]=(E*(1-l.eccentricitySquared)+s)*i;}function fe(n,e,t,r){_e(n,e,t,r,s$h);}function Se(n,e,t,r){const l=s$3,u=n[e],o=n[e+1],s=n[e+2];let i,a,E,C,c,R,A,_,f,S,P,L,M,O,p,N,G,W,h,T,m;i=Math.abs(s),a=u*u+o*o,E=Math.sqrt(a),C=a+s*s,c=Math.sqrt(C),T=Math.atan2(o,u),R=s*s/C,A=a/C,O=l.a2/c,p=l.a3-l.a4/c,A>.3?(_=i/c*(1+A*(l.a1+O+R*p)/c),h=Math.asin(_),S=_*_,f=Math.sqrt(1-S)):(f=E/c*(1-R*(l.a5-O-A*p)/c),h=Math.acos(f),S=1-f*f,_=Math.sqrt(S)),P=1-s$h.eccentricitySquared*S,L=s$h.radius/Math.sqrt(P),M=l.a6*L,O=E-L*f,p=i-M*_,G=f*O+_*p,N=f*p-_*O,W=N/(M/P+G),h+=W,m=G+N*W/2,s<0&&(h=-h),t[r++]=Fe*T,t[r++]=Fe*h,t[r]=m;}function Pe(n,e,t,r){Se(n,e,t,r),ie(t,r,t,r);}function Le(n,e,t,r){Se(n,e,t,r),Zn(t,r,t,r);}const Me={[rn.WGS84]:{[rn.CGCS2000]:null,[rn.GCSMARS2000]:null,[rn.GCSMOON2000]:null,[rn.LON_LAT]:zn,[rn.WGS84_COMPARABLE_LON_LAT]:zn,[rn.SPHERICAL_ECEF]:ie,[rn.SPHERICAL_MARS_PCPF]:null,[rn.SPHERICAL_MOON_PCPF]:null,[rn.UNKNOWN]:null,[rn.WEB_MERCATOR]:Zn,[rn.PLATE_CARREE]:Dn,[rn.WGS84]:zn,[rn.WGS84_ECEF]:fe},[rn.CGCS2000]:{[rn.CGCS2000]:zn,[rn.GCSMARS2000]:null,[rn.GCSMOON2000]:null,[rn.LON_LAT]:zn,[rn.WGS84_COMPARABLE_LON_LAT]:zn,[rn.SPHERICAL_ECEF]:ie,[rn.SPHERICAL_MARS_PCPF]:null,[rn.SPHERICAL_MOON_PCPF]:null,[rn.UNKNOWN]:null,[rn.WEB_MERCATOR]:null,[rn.PLATE_CARREE]:Dn,[rn.WGS84]:null,[rn.WGS84_ECEF]:fe},[rn.GCSMARS2000]:{[rn.CGCS2000]:null,[rn.GCSMARS2000]:zn,[rn.GCSMOON2000]:null,[rn.LON_LAT]:zn,[rn.WGS84_COMPARABLE_LON_LAT]:null,[rn.SPHERICAL_ECEF]:null,[rn.SPHERICAL_MARS_PCPF]:se,[rn.SPHERICAL_MOON_PCPF]:null,[rn.UNKNOWN]:null,[rn.WEB_MERCATOR]:null,[rn.PLATE_CARREE]:null,[rn.WGS84]:null,[rn.WGS84_ECEF]:null},[rn.GCSMOON2000]:{[rn.CGCS2000]:null,[rn.GCSMARS2000]:null,[rn.GCSMOON2000]:zn,[rn.LON_LAT]:zn,[rn.WGS84_COMPARABLE_LON_LAT]:null,[rn.SPHERICAL_ECEF]:null,[rn.SPHERICAL_MARS_PCPF]:null,[rn.SPHERICAL_MOON_PCPF]:oe,[rn.UNKNOWN]:null,[rn.WEB_MERCATOR]:null,[rn.PLATE_CARREE]:null,[rn.WGS84]:null,[rn.WGS84_ECEF]:null},[rn.WEB_MERCATOR]:{[rn.CGCS2000]:null,[rn.GCSMARS2000]:null,[rn.GCSMOON2000]:null,[rn.LON_LAT]:bn,[rn.WGS84_COMPARABLE_LON_LAT]:bn,[rn.SPHERICAL_ECEF]:kn,[rn.SPHERICAL_MARS_PCPF]:null,[rn.SPHERICAL_MOON_PCPF]:null,[rn.UNKNOWN]:null,[rn.WEB_MERCATOR]:zn,[rn.PLATE_CARREE]:Qn,[rn.WGS84]:bn,[rn.WGS84_ECEF]:vn},[rn.WGS84_ECEF]:{[rn.CGCS2000]:Se,[rn.GCSMARS2000]:null,[rn.GCSMOON2000]:null,[rn.LON_LAT]:Se,[rn.WGS84_COMPARABLE_LON_LAT]:Se,[rn.SPHERICAL_ECEF]:Pe,[rn.SPHERICAL_MARS_PCPF]:null,[rn.SPHERICAL_MOON_PCPF]:null,[rn.UNKNOWN]:null,[rn.WEB_MERCATOR]:Le,[rn.PLATE_CARREE]:Yn,[rn.WGS84]:Se,[rn.WGS84_ECEF]:zn},[rn.SPHERICAL_ECEF]:{[rn.CGCS2000]:ce,[rn.GCSMARS2000]:null,[rn.GCSMOON2000]:null,[rn.LON_LAT]:ce,[rn.WGS84_COMPARABLE_LON_LAT]:ce,[rn.SPHERICAL_ECEF]:zn,[rn.SPHERICAL_MARS_PCPF]:null,[rn.SPHERICAL_MOON_PCPF]:null,[rn.UNKNOWN]:null,[rn.WEB_MERCATOR]:Re,[rn.PLATE_CARREE]:$n,[rn.WGS84]:ce,[rn.WGS84_ECEF]:Ae},[rn.SPHERICAL_MARS_PCPF]:{[rn.CGCS2000]:null,[rn.GCSMARS2000]:Ce,[rn.GCSMOON2000]:null,[rn.LON_LAT]:Ce,[rn.WGS84_COMPARABLE_LON_LAT]:null,[rn.SPHERICAL_ECEF]:null,[rn.SPHERICAL_MARS_PCPF]:zn,[rn.SPHERICAL_MOON_PCPF]:null,[rn.UNKNOWN]:null,[rn.WEB_MERCATOR]:null,[rn.PLATE_CARREE]:null,[rn.WGS84]:null,[rn.WGS84_ECEF]:null},[rn.SPHERICAL_MOON_PCPF]:{[rn.CGCS2000]:null,[rn.GCSMARS2000]:null,[rn.GCSMOON2000]:Ee,[rn.LON_LAT]:Ee,[rn.WGS84_COMPARABLE_LON_LAT]:null,[rn.SPHERICAL_ECEF]:null,[rn.SPHERICAL_MARS_PCPF]:null,[rn.SPHERICAL_MOON_PCPF]:zn,[rn.UNKNOWN]:null,[rn.WEB_MERCATOR]:null,[rn.PLATE_CARREE]:null,[rn.WGS84]:null,[rn.WGS84_ECEF]:null},[rn.UNKNOWN]:{[rn.CGCS2000]:null,[rn.GCSMARS2000]:null,[rn.GCSMOON2000]:null,[rn.LON_LAT]:null,[rn.WGS84_COMPARABLE_LON_LAT]:null,[rn.SPHERICAL_ECEF]:null,[rn.SPHERICAL_MARS_PCPF]:null,[rn.SPHERICAL_MOON_PCPF]:null,[rn.UNKNOWN]:zn,[rn.WEB_MERCATOR]:null,[rn.PLATE_CARREE]:null,[rn.WGS84]:null,[rn.WGS84_ECEF]:null},[rn.LON_LAT]:{[rn.CGCS2000]:zn,[rn.GCSMARS2000]:zn,[rn.GCSMOON2000]:zn,[rn.LON_LAT]:zn,[rn.WGS84_COMPARABLE_LON_LAT]:zn,[rn.SPHERICAL_ECEF]:ie,[rn.SPHERICAL_MARS_PCPF]:se,[rn.SPHERICAL_MOON_PCPF]:oe,[rn.UNKNOWN]:null,[rn.WEB_MERCATOR]:Zn,[rn.PLATE_CARREE]:Dn,[rn.WGS84]:zn,[rn.WGS84_ECEF]:fe},[rn.WGS84_COMPARABLE_LON_LAT]:{[rn.CGCS2000]:null,[rn.GCSMARS2000]:null,[rn.GCSMOON2000]:null,[rn.LON_LAT]:zn,[rn.WGS84_COMPARABLE_LON_LAT]:zn,[rn.SPHERICAL_ECEF]:ie,[rn.SPHERICAL_MARS_PCPF]:null,[rn.SPHERICAL_MOON_PCPF]:null,[rn.UNKNOWN]:null,[rn.WEB_MERCATOR]:null,[rn.PLATE_CARREE]:Dn,[rn.WGS84]:zn,[rn.WGS84_ECEF]:fe},[rn.PLATE_CARREE]:{[rn.CGCS2000]:Jn,[rn.GCSMARS2000]:null,[rn.GCSMOON2000]:null,[rn.LON_LAT]:Jn,[rn.WGS84_COMPARABLE_LON_LAT]:Jn,[rn.SPHERICAL_ECEF]:ne,[rn.SPHERICAL_MARS_PCPF]:null,[rn.SPHERICAL_MOON_PCPF]:null,[rn.UNKNOWN]:null,[rn.WEB_MERCATOR]:ee,[rn.PLATE_CARREE]:zn,[rn.WGS84]:Jn,[rn.WGS84_ECEF]:te}};function Oe(n,e,t=Ne()){return t$y(n)||t$y(e)?null:pe(n,e,t).projector}function pe(n,e,t){if(t$y(n)||t$y(e)||t.source.spatialReference===n&&t.dest.spatialReference===e)return t;const r=Kn(n,t.source),l=Kn(e,t.dest);return r===rn.UNKNOWN&&l===rn.UNKNOWN?E$7(n,e)?t.projector=zn:t.projector=null:t.projector=Me[r][l],t}function Ne(){return {source:{spatialReference:null,spatialReferenceId:rn.UNKNOWN,metersPerUnit:1},dest:{spatialReference:null,spatialReferenceId:rn.UNKNOWN,metersPerUnit:1},projector:zn}}const Ge={spatialReference:null,spatialReferenceId:rn.UNKNOWN},We={spatialReference:null,spatialReferenceId:rn.UNKNOWN},he=Ne(),Te=Ne(),me=M$5(1),Fe=m$a(1),Ie=n$5(),de=n$5(),He=n$5(),Be=n$5(),je=n$5();

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
		}
	}, fn(module, module.exports), module.exports;
}

function getDefaultExportFromNamespaceIfPresent (n) {
	return n && Object.prototype.hasOwnProperty.call(n, 'default') ? n['default'] : n;
}

function getDefaultExportFromNamespaceIfNotNamed (n) {
	return n && Object.prototype.hasOwnProperty.call(n, 'default') && Object.keys(n).length === 1 ? n['default'] : n;
}

function getAugmentedNamespace(n) {
	if (n.__esModule) return n;
	var a = Object.defineProperty({}, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var esriLoader = createCommonjsModule(function (module, exports) {
(function (global, factory) {
	'object' === 'object' && 'object' !== 'undefined' ? factory(exports) :
	typeof undefined === 'function' && undefined.amd ? undefined(['exports'], factory) :
	(factory((global.esriLoader = global.esriLoader || {})));
}(commonjsGlobal, (function (exports) { 'use strict';

/* Copyright (c) 2017 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
var isBrowser = typeof window !== 'undefined';
// allow consuming libraries to provide their own Promise implementations
var utils = {
    Promise: isBrowser ? window['Promise'] : undefined
};

/* Copyright (c) 2017 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
var DEFAULT_VERSION = '4.23';
var NEXT = 'next';
function parseVersion(version) {
    if (version.toLowerCase() === NEXT) {
        return NEXT;
    }
    var match = version && version.match(/^(\d)\.(\d+)/);
    return match && {
        major: parseInt(match[1], 10),
        minor: parseInt(match[2], 10)
    };
}
/**
 * Get the CDN url for a given version
 *
 * @param version Ex: '4.23' or '3.40'. Defaults to the latest 4.x version.
 */
function getCdnUrl(version) {
    if (version === void 0) { version = DEFAULT_VERSION; }
    return "https://js.arcgis.com/" + version + "/";
}
/**
 * Get the CDN url for a the CSS for a given version and/or theme
 *
 * @param version Ex: '4.23', '3.40', or 'next'. Defaults to the latest 4.x version.
 */
function getCdnCssUrl(version) {
    if (version === void 0) { version = DEFAULT_VERSION; }
    var baseUrl = getCdnUrl(version);
    var parsedVersion = parseVersion(version);
    if (parsedVersion !== NEXT && parsedVersion.major === 3) {
        // NOTE: at 3.11 the CSS moved from the /js folder to the root
        var path = parsedVersion.minor <= 10 ? 'js/' : '';
        return "" + baseUrl + path + "esri/css/esri.css";
    }
    else {
        // assume 4.x
        return baseUrl + "esri/themes/light/main.css";
    }
}

/* Copyright (c) 2017 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
function createStylesheetLink(href) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    return link;
}
function insertLink(link, before) {
    if (before) {
        // the link should be inserted before a specific node
        var beforeNode = document.querySelector(before);
        beforeNode.parentNode.insertBefore(link, beforeNode);
    }
    else {
        // append the link to then end of the head tag
        document.head.appendChild(link);
    }
}
// check if the css url has been injected or added manually
function getCss(url) {
    return document.querySelector("link[href*=\"" + url + "\"]");
}
function getCssUrl(urlOrVersion) {
    return !urlOrVersion || parseVersion(urlOrVersion)
        // if it's a valid version string return the CDN URL
        ? getCdnCssUrl(urlOrVersion)
        // otherwise assume it's a URL and return that
        : urlOrVersion;
}
// lazy load the CSS needed for the ArcGIS API
function loadCss(urlOrVersion, before) {
    var url = getCssUrl(urlOrVersion);
    var link = getCss(url);
    if (!link) {
        // create & load the css link
        link = createStylesheetLink(url);
        insertLink(link, before);
    }
    return link;
}

/* Copyright (c) 2017 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
var defaultOptions = {};
function createScript(url) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.setAttribute('data-esri-loader', 'loading');
    return script;
}
// add a one-time load handler to script
// and optionally add a one time error handler as well
function handleScriptLoad(script, callback, errback) {
    var onScriptError;
    if (errback) {
        // set up an error handler as well
        onScriptError = handleScriptError(script, errback);
    }
    var onScriptLoad = function () {
        // pass the script to the callback
        callback(script);
        // remove this event listener
        script.removeEventListener('load', onScriptLoad, false);
        if (onScriptError) {
            // remove the error listener as well
            script.removeEventListener('error', onScriptError, false);
        }
    };
    script.addEventListener('load', onScriptLoad, false);
}
// add a one-time error handler to the script
function handleScriptError(script, callback) {
    var onScriptError = function (e) {
        // reject the promise and remove this event listener
        callback(e.error || new Error("There was an error attempting to load " + script.src));
        // remove this event listener
        script.removeEventListener('error', onScriptError, false);
    };
    script.addEventListener('error', onScriptError, false);
    return onScriptError;
}
// allow the user to configure default script options rather than passing options to `loadModules` each time
function setDefaultOptions(options) {
    if (options === void 0) { options = {}; }
    defaultOptions = options;
}
// get the script injected by this library
function getScript() {
    return document.querySelector('script[data-esri-loader]');
}
// has ArcGIS API been loaded on the page yet?
function isLoaded() {
    var globalRequire = window['require'];
    // .on() ensures that it's Dojo's AMD loader
    return globalRequire && globalRequire.on;
}
// load the ArcGIS API on the page
function loadScript(options) {
    if (options === void 0) { options = {}; }
    // we would have liked to use spread like { ...defaultOptions, ...options }
    // but TS would inject a polyfill that would require use to configure rollup w content: 'window'
    // if we have another occasion to use spread, let's do that and replace this for...in
    var opts = {};
    [defaultOptions, options].forEach(function (obj) {
        for (var prop in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                opts[prop] = obj[prop];
            }
        }
    });
    // URL to load
    var version = opts.version;
    var url = opts.url || getCdnUrl(version);
    return new utils.Promise(function (resolve, reject) {
        var script = getScript();
        if (script) {
            // the API is already loaded or in the process of loading...
            // NOTE: have to test against scr attribute value, not script.src
            // b/c the latter will return the full url for relative paths
            var src = script.getAttribute('src');
            if (src !== url) {
                // potentially trying to load a different version of the API
                reject(new Error("The ArcGIS API for JavaScript is already loaded (" + src + ")."));
            }
            else {
                if (isLoaded()) {
                    // the script has already successfully loaded
                    resolve(script);
                }
                else {
                    // wait for the script to load and then resolve
                    handleScriptLoad(script, resolve, reject);
                }
            }
        }
        else {
            if (isLoaded()) {
                // the API has been loaded by some other means
                // potentially trying to load a different version of the API
                reject(new Error("The ArcGIS API for JavaScript is already loaded."));
            }
            else {
                // this is the first time attempting to load the API
                var css = opts.css;
                if (css) {
                    var useVersion = css === true;
                    // load the css before loading the script
                    loadCss(useVersion ? version : css, opts.insertCssBefore);
                }
                // create a script object whose source points to the API
                script = createScript(url);
                // _currentUrl = url;
                // once the script is loaded...
                handleScriptLoad(script, function () {
                    // update the status of the script
                    script.setAttribute('data-esri-loader', 'loaded');
                    // return the script
                    resolve(script);
                }, reject);
                // load the script
                document.body.appendChild(script);
            }
        }
    });
}

/* Copyright (c) 2017 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
// wrap Dojo's require() in a promise
function requireModules(modules) {
    return new utils.Promise(function (resolve, reject) {
        // If something goes wrong loading the esri/dojo scripts, reject with the error.
        var errorHandler = window['require'].on('error', reject);
        window['require'](modules, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // remove error handler
            errorHandler.remove();
            // Resolve with the parameters from dojo require as an array.
            resolve(args);
        });
    });
}
// returns a promise that resolves with an array of the required modules
// also will attempt to lazy load the ArcGIS API if it has not already been loaded
function loadModules(modules, loadScriptOptions) {
    if (loadScriptOptions === void 0) { loadScriptOptions = {}; }
    if (!isLoaded()) {
        // script is not yet loaded, is it in the process of loading?
        var script = getScript();
        var src = script && script.getAttribute('src');
        if (!loadScriptOptions.url && src) {
            // script is still loading and user did not specify a URL
            // in this case we want to default to the URL that's being loaded
            // instead of defaulting to the latest 4.x URL
            loadScriptOptions.url = src;
        }
        // attempt to load the script then load the modules
        return loadScript(loadScriptOptions).then(function () { return requireModules(modules); });
    }
    else {
        // script is already loaded, just load the modules
        return requireModules(modules);
    }
}

/*
  Copyright (c) 2017 Esri
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
// re-export the functions that are part of the public API

exports.utils = utils;
exports.loadModules = loadModules;
exports.getScript = getScript;
exports.isLoaded = isLoaded;
exports.loadScript = loadScript;
exports.setDefaultOptions = setDefaultOptions;
exports.loadCss = loadCss;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=esri-loader.js.map
});

const esriLoader$1 = /*@__PURE__*/getDefaultExportFromCjs(esriLoader);

/*
 *   Copyright (c) 2022 Esri
 *   All rights reserved.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
const loadModules = async (moduleNames, options) => {
  const mods = await esriLoader.loadModules(moduleNames, options);
  return mods.map(mod => (mod.__esModule && mod.default ? mod.default : mod));
};

/*
 *   Copyright (c) 2022 Esri
 *   All rights reserved.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
const languageMap = new Map([
  ['ar', 'ar'],
  ['bg', 'bg'],
  ['bs', 'bs'],
  ['ca', 'ca'],
  ['cs', 'cs'],
  ['da', 'da'],
  ['de', 'de'],
  ['el', 'el'],
  ['en', 'en'],
  ['es', 'es'],
  ['et', 'et'],
  ['fi', 'fi'],
  ['fr', 'fr'],
  ['he', 'he'],
  ['hr', 'hr'],
  ['hu', 'hu'],
  ['id', 'id'],
  ['it', 'it'],
  ['ja', 'ja'],
  ['ko', 'ko'],
  ['lt', 'lt'],
  ['lv', 'lv'],
  ['nb', 'nb'],
  ['nl', 'nl'],
  ['pl', 'pl'],
  ['pt-br', 'pt-BR'],
  ['pt-pt', 'pt-PT'],
  ['ro', 'ro'],
  ['ru', 'ru'],
  ['sk', 'sk'],
  ['sl', 'sl'],
  ['sr', 'sr'],
  ['sv', 'sv'],
  ['th', 'th'],
  ['tr', 'tr'],
  ['uk', 'uk'],
  ['vi', 'vi'],
  ['zh-cn', 'zh-CN'],
  ['zh-hk', 'zh-HK'],
  ['zh-tw', 'zh-TW'],
]);
// rtl
function getElementDir(el) {
  return getElementProp(el, 'dir', 'ltr');
}
function getElementProp(el, prop, value) {
  const closestWithProp = el.closest(`[${prop}]`);
  return closestWithProp ? closestWithProp.getAttribute(prop) : value;
}
// css
const CSS_UTILITY = {
  rtl: 'arcgis--rtl',
};
async function formatNumber(number, options) {
  const { api = 4, type = 'decimal', places = 2 } = options || {};
  if (api === 4) {
    const [intl] = await loadModules(['esri/intl']);
    const numberFormatIntlOptions = intl.convertNumberFormatToIntlOptions({
      places,
      type,
      digitSeparator: true,
    });
    return intl.formatNumber(number, numberFormatIntlOptions);
  }
  const [dojoNumber] = await loadModules(['dojo/number']);
  return dojoNumber.format(number, {
    type,
    places,
  });
}

// https://medium.com/stencil-tricks/implementing-internationalisation-i18n-with-stencil-5e6559554117
function getComponentClosestLanguage(element) {
  var _a, _b, _c;
  const closestElement = (_a = element.closest('[lang]')) !== null && _a !== void 0 ? _a : (_c = (_b = element.shadowRoot) === null || _b === void 0 ? void 0 : _b.ownerDocument) === null || _c === void 0 ? void 0 : _c.documentElement;
  // language set by the calling application or browser. defaults to english.
  const lang = ((closestElement === null || closestElement === void 0 ? void 0 : closestElement.lang) || (navigator === null || navigator === void 0 ? void 0 : navigator.language) || 'en').toLowerCase();
  if (languageMap.has(lang)) {
    return languageMap.get(lang);
  }
  else {
    // "ru-RU" maps to "ru" use case
    if (languageMap.has(lang.slice(0, 2))) {
      return languageMap.get(lang.slice(0, 2));
    }
    else {
      return 'en';
    }
  }
}
function fetchLocaleStringsForComponent(componentName, locale) {
  return new Promise((resolve, reject) => {
    fetch(getAssetPath(`../assets/t9n/${componentName}/resources_${locale}.json`)).then(result => {
      if (result.ok)
        resolve(result.json());
      else
        reject();
    }, () => reject());
  });
}
async function getLocaleComponentStrings(element) {
  const componentName = element.tagName.toLowerCase();
  const componentLanguage = getComponentClosestLanguage(element);
  let strings;
  try {
    strings = await fetchLocaleStringsForComponent(componentName, componentLanguage);
  }
  catch (e) {
    console.warn(`no locale for ${componentName} (${componentLanguage}) loading default locale en.`);
    strings = await fetchLocaleStringsForComponent(componentName, 'en');
  }
  return [strings, componentLanguage];
}

const instantAppsSocialShareCss = ":host{display:block;--instant-apps-social-share-width--s:200px;--instant-apps-social-share-width--m:280px;--instant-apps-social-share-width--l:320px;--instant-apps-social-share-background-color:transparent;--instant-apps-social-share-popover-button-background-color:transparent;--instant-apps-social-share-popover-button-icon-color:var(--calcite-ui-icon-color);--instant-apps-social-share-embed-border:1px solid $border;--instant-apps-social-share-embed-text-area-text:#468540}:host .instant-apps-social-share__popover-button{background-color:var(--instant-apps-social-share-popover-button-background-color)}:host .instant-apps-social-share__popover-button calcite-icon{color:var(--instant-apps-social-share-popover-button-icon-color)}:host .instant-apps-social-share__dialog{box-sizing:border-box;height:auto;padding:10px 0;border-radius:5px}:host .instant-apps-social-share__dialog-embed{border:var(--instant-apps-social-share-embed-border);background-color:var(--instant-apps-social-share-background-color)}:host .instant-apps-social-share__options{margin:0;padding:1% 0 0 0;list-style-type:none}:host .instant-apps-social-share__options li{box-sizing:border-box;display:flex;align-items:center;width:100%;padding:5%;transition:background-color 0.15s ease-out 0s}:host .instant-apps-social-share__options li .instant-apps-social-share__icon,:host .instant-apps-social-share__options li .instant-apps-social-share__option-text{display:inline-block}:host .instant-apps-social-share__options li .instant-apps-social-share__icon{display:flex;align-items:center}:host .instant-apps-social-share__options li .instant-apps-social-share__option-text{width:85%;margin-left:10px;word-break:break-word}:host .instant-apps-social-share__options li:hover{cursor:pointer;background-color:var(--calcite-ui-foreground-2)}:host .instant-apps-social-share__tip{box-sizing:border-box;padding:0 5% 1% 5%}:host .instant-apps-social-share__tip-header{display:flex;align-items:center;color:#007ac2;margin:8px 0 5px 0}:host .instant-apps-social-share__tip-header calcite-icon{margin-right:5px}:host .instant-apps-social-share__tip-content{line-height:17px;margin:0;padding-top:2%}:host .instant-apps-social-share__success{display:flex;flex-direction:column;padding:15px}:host .instant-apps-social-share__success-header{display:flex;align-items:center;font-weight:bold;margin-bottom:10px}:host .instant-apps-social-share__success-icon{display:flex;align-items:center;margin-right:5px}:host .instant-apps-social-share__success-icon calcite-icon{color:var(--calcite-ui-success)}:host .instant-apps-social-share__success-message{line-height:16px}:host .instant-apps-social-share__embed{box-sizing:border-box;width:100%;padding:5%;margin-bottom:10px;border-top:1px solid #d3d3d3}:host .instant-apps-social-share__embed-header{display:flex;align-items:center;margin-bottom:5px}:host .instant-apps-social-share__embed-header calcite-icon{margin-right:5px}:host .instant-apps-social-share__embed-code-text-area{border:1px solid #d3d3d3}:host .instant-apps-social-share__embed-code-text-area textarea{box-sizing:border-box;padding:4%;border:none;resize:none;background:transparent;width:100%;font-family:var(--calcite-sans-family);color:var(--calcite-ui-text-1)}:host .instant-apps-social-share__embed-code-text-area button{display:flex;align-items:center;text-align:start;width:100%;border:none;border-top:1px solid #d3d3d3;background-color:transparent;line-height:16px;font-weight:400;padding:3%;color:var(--calcite-ui-text-1)}:host .instant-apps-social-share__embed-code-text-area button calcite-icon{color:#007ac2;margin-right:3px}:host .instant-apps-social-share__embed-code-text-area button:hover{cursor:pointer;background-color:var(--calcite-ui-foreground-2);transition:background-color 0.15s ease-out 0s}:host .instant-apps-social-share__embed-text-area-text{font-weight:600;color:var(--instant-apps-social-share-embed-text-area-text)}:host .instant-apps-social-share__embed-dimensions{display:flex;justify-content:space-between;margin-top:10px}:host .instant-apps-social-share__embed-dimensions-input{width:47%;box-sizing:border-box}:host .instant-apps-social-share__embed-dimensions-input input{border:1px solid #d3d3d3;width:100%;height:25px;font-family:var(--calcite-sans-family)}:host([scale=s]) .instant-apps-social-share__dialog{width:var(--instant-apps-social-share-width--s)}:host([scale=s]) .instant-apps-social-share__icon{width:16px;height:16px}:host([scale=s]) .instant-apps-social-share__option-text{font-size:var(--calcite-font-size--1)}:host([scale=s]) .instant-apps-social-share__tip-header,:host([scale=s]) .instant-apps-social-share__tip-content,:host([scale=s]) .instant-apps-social-share__embed-header,:host([scale=s]) .instant-apps-social-share__embed-dimensions-input{font-size:var(--calcite-font-size--2)}:host([scale=m]) .instant-apps-social-share__dialog{width:var(--instant-apps-social-share-width--m)}:host([scale=m]) .instant-apps-social-share__icon{width:24px;height:24px}:host([scale=m]) .instant-apps-social-share__option-text{font-size:var(--calcite-font-size-0)}:host([scale=m]) .instant-apps-social-share__tip-header,:host([scale=m]) .instant-apps-social-share__tip-content,:host([scale=m]) .instant-apps-social-share__embed-header,:host([scale=m]) .instant-apps-social-share__embed-dimensions-input{font-size:var(--calcite-font-size--1)}:host([scale=l]) .instant-apps-social-share__dialog{width:var(--instant-apps-social-share-width--l)}:host([scale=l]) .instant-apps-social-share__icon{width:32px;height:32px}:host([scale=l]) .instant-apps-social-share__option-text{font-size:var(--calcite-font-size-1)}:host([scale=l]) .instant-apps-social-share__tip-header,:host([scale=l]) .instant-apps-social-share__tip-content,:host([scale=l]) .instant-apps-social-share__embed-header,:host([scale=l]) .instant-apps-social-share__embed-dimensions-input{font-size:var(--calcite-font-size-0)}";

const base = 'instant-apps-social-share';
const CSS = {
  base,
  dialog: `${base}__dialog`,
  dialogEmbed: `${base}__dialog-embed`,
  dialogContent: `${base}__dialog-content`,
  options: `${base}__options`,
  tipContainer: `${base}__tip`,
  tipHeader: `${base}__tip-header`,
  tipContent: `${base}__tip-content`,
  icon: `${base}__icon`,
  optionText: `${base}__option-text`,
  popoverButton: `${base}__popover-button`,
  success: {
    container: `${base}__success`,
    header: `${base}__success-header`,
    message: `${base}__success-message`,
    icon: `${base}__success-icon`,
  },
  embed: {
    container: `${base}__embed`,
    header: `${base}__embed-header`,
    embedCode: {
      container: `${base}__embed-code`,
      textArea: `${base}__embed-code-text-area`,
      copyButton: `${base}__embed-code-copy-button`,
    },
    textAreaText: `${base}__embed-text-area-text`,
    dimensions: {
      container: `${base}__embed-dimensions`,
      input: `${base}__embed-dimensions-input`,
    },
  },
};
const SOCIAL_URL_TEMPLATES = {
  facebook: 'https://www.facebook.com/sharer/sharer.php?u={url}',
  twitter: 'https://twitter.com/intent/tweet?text={text}&url={url}',
  linkedIn: 'https://www.linkedin.com/sharing/share-offsite/?url={url}',
};
const SHORTEN_API = 'https://arcg.is/prod/shorten';
let InstantAppsSocialShare = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    // PUBLIC PROPERTIES
    this.mode = 'popover';
    this.shareUrl = window.location.href;
    this.shareText = '';
    this.embed = false;
    this.shareButtonColor = 'neutral';
    this.iframeInnerText = '';
    this.displayTipText = true;
    this.socialMedia = true;
    this.scale = 'm';
    this.defaultUrlParams = null;
    // mode = 'popover'
    this.opened = false;
    this.copied = false;
    // mode = 'inline'
    this.inlineCopyLinkOpened = false;
    this.inlineCopyEmbedOpened = false;
    this.embedWidth = 400;
    this.embedHeight = 600;
  }
  componentDidLoad() {
    var _a, _b;
    this.getMessages();
    this.setupAutoCloseListeners();
    if (this.mode === 'popover' && this.opened) {
      this.popoverRef.toggle(true);
    }
    if (this.embed) {
      (_a = this.embedWidthRef) === null || _a === void 0 ? void 0 : _a.addEventListener('change', this.updateDimensions.bind(this, 'width'));
      (_b = this.embedHeightRef) === null || _b === void 0 ? void 0 : _b.addEventListener('change', this.updateDimensions.bind(this, 'height'));
    }
  }
  disconnectedCallback() {
    var _a, _b, _c;
    document.documentElement.removeEventListener('click', this.autoCloseCallback.bind(this));
    if (this.mode === 'popover') {
      this.popoverRef.removeEventListener('click', this.stopPropagationCallback.bind(this));
      this.popoverRef.removeEventListener('calcitePopoverClose', this.resetPopoverCopyState.bind(this));
    }
    else {
      (_a = this.embedWidthRef) === null || _a === void 0 ? void 0 : _a.removeEventListener('change', this.updateDimensions.bind(this));
      (_b = this.embedHeightRef) === null || _b === void 0 ? void 0 : _b.removeEventListener('change', this.updateDimensions.bind(this));
      (_c = this.dialogContentRef) === null || _c === void 0 ? void 0 : _c.removeEventListener('click', this.stopPropagationCallback.bind(this));
    }
  }
  async getMessages() {
    const messages = await getLocaleComponentStrings(this.el);
    this.messages = messages[0];
  }
  setupAutoCloseListeners() {
    var _a, _b, _c;
    document.documentElement.addEventListener('click', this.autoCloseCallback.bind(this));
    if (this.mode === 'popover') {
      (_a = this.popoverRef) === null || _a === void 0 ? void 0 : _a.addEventListener('click', this.stopPropagationCallback.bind(this));
      (_b = this.popoverRef) === null || _b === void 0 ? void 0 : _b.addEventListener('calcitePopoverClose', this.resetPopoverCopyState.bind(this));
    }
    else {
      (_c = this.dialogContentRef) === null || _c === void 0 ? void 0 : _c.addEventListener('click', this.stopPropagationCallback.bind(this));
    }
  }
  autoCloseCallback() {
    var _a, _b, _c;
    if (this.mode === 'popover') {
      this.opened = false;
      (_a = this.popoverRef) === null || _a === void 0 ? void 0 : _a.toggle(this.opened);
    }
    else {
      (_b = this.copyLinkPopoverRef) === null || _b === void 0 ? void 0 : _b.toggle(false);
      this.inlineCopyLinkOpened = false;
      (_c = this.copyEmbedPopoverRef) === null || _c === void 0 ? void 0 : _c.toggle(false);
      this.inlineCopyEmbedOpened = false;
    }
  }
  stopPropagationCallback(event) {
    event.stopPropagation();
  }
  resetPopoverCopyState() {
    setTimeout(() => {
      this.copied = false;
    }, 200);
  }
  updateDimensions(type) {
    var _a, _b;
    if (type === 'width') {
      const value = (_a = this.embedWidthRef) === null || _a === void 0 ? void 0 : _a.value;
      this.embedWidth = parseInt(value);
    }
    else {
      const value = (_b = this.embedHeightRef) === null || _b === void 0 ? void 0 : _b.value;
      this.embedHeight = parseInt(value);
    }
  }
  render() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const content = this.copied && this.mode === 'popover' ? (this.renderSuccess()) : (h$t("div", { class: CSS.dialogContent }, this.renderOptions(), this.displayTipText ? this.renderTip() : null, this.embed ? this.renderEmbed() : null));
    const dialogContent = (h$t("div", { ref: el => (this.dialogContentRef = el), class: CSS.dialog }, content));
    return (h$t(Host, null, this.mode === 'popover'
      ? [
        h$t("calcite-popover", { ref: (el) => (this.popoverRef = el), label: (_b = (_a = this.messages) === null || _a === void 0 ? void 0 : _a.share) === null || _b === void 0 ? void 0 : _b.label, "reference-element": "shareButton", placement: "bottom-start", scale: this.scale }, dialogContent),
        h$t("calcite-button", { onClick: this.togglePopover.bind(this), id: "shareButton", class: CSS.popoverButton, color: this.shareButtonColor, appearance: "transparent", label: (_d = (_c = this.messages) === null || _c === void 0 ? void 0 : _c.share) === null || _d === void 0 ? void 0 : _d.label, title: (_f = (_e = this.messages) === null || _e === void 0 ? void 0 : _e.share) === null || _f === void 0 ? void 0 : _f.label, scale: this.scale }, h$t("calcite-icon", { icon: "share", scale: "m" })),
      ]
      : [
        dialogContent,
        h$t("calcite-popover", { ref: (el) => (this.copyLinkPopoverRef = el), label: (_h = (_g = this.messages) === null || _g === void 0 ? void 0 : _g.share) === null || _h === void 0 ? void 0 : _h.label, "reference-element": "copyToClipboard", placement: "trailing", scale: this.scale }, this.renderSuccess()),
        h$t("calcite-popover", { ref: (el) => (this.copyEmbedPopoverRef = el), label: (_k = (_j = this.messages) === null || _j === void 0 ? void 0 : _j.share) === null || _k === void 0 ? void 0 : _k.label, "reference-element": "copyEmbedToClipboard", placement: "trailing", scale: this.scale }, this.renderEmbedSuccess()),
      ]));
  }
  renderSuccess() {
    var _a;
    const success = (_a = this.messages) === null || _a === void 0 ? void 0 : _a.success;
    return (h$t("div", { class: CSS.success.container }, h$t("span", { class: CSS.success.header }, h$t("span", { class: CSS.success.icon }, h$t("calcite-icon", { icon: "check-circle-f", scale: this.scale })), success === null || success === void 0 ? void 0 :
      success.label), h$t("span", { class: CSS.success.message }, success === null || success === void 0 ? void 0 : success.url)));
  }
  renderEmbedSuccess() {
    var _a;
    const success = (_a = this.messages) === null || _a === void 0 ? void 0 : _a.success;
    return (h$t("div", { class: CSS.success.container }, h$t("span", { class: CSS.success.header }, h$t("span", { class: CSS.success.icon }, h$t("calcite-icon", { icon: "check-circle-f", scale: this.scale })), success === null || success === void 0 ? void 0 :
      success.label), h$t("span", { class: CSS.success.message }, success === null || success === void 0 ? void 0 : success.embed)));
  }
  renderOptions() {
    var _a, _b, _c, _d, _e;
    const options = (_a = this.messages) === null || _a === void 0 ? void 0 : _a.options;
    return (h$t("ul", { class: CSS.options, role: "menu" }, h$t("li", { id: "copyToClipboard", onClick: this.handleShareItem.bind(this, 'link'), role: "menuitem" }, h$t("span", { class: CSS.icon }, h$t("calcite-icon", { icon: "link", scale: this.scale })), h$t("span", { class: CSS.optionText }, (_b = options === null || options === void 0 ? void 0 : options.link) === null || _b === void 0 ? void 0 : _b.label)), this.socialMedia
      ? [
        h$t("li", { onClick: this.handleShareItem.bind(this, 'facebook'), role: "menuitem" }, h$t("span", { class: CSS.icon }, this.renderFacebookIcon()), h$t("span", { class: CSS.optionText }, (_c = options === null || options === void 0 ? void 0 : options.facebook) === null || _c === void 0 ? void 0 : _c.label)),
        h$t("li", { onClick: this.handleShareItem.bind(this, 'twitter'), role: "menuitem" }, h$t("span", { class: CSS.icon }, this.renderTwitterIcon()), h$t("span", { class: CSS.optionText }, (_d = options === null || options === void 0 ? void 0 : options.twitter) === null || _d === void 0 ? void 0 : _d.label)),
        h$t("li", { onClick: this.handleShareItem.bind(this, 'linkedIn'), role: "menuitem" }, h$t("span", { class: CSS.icon }, this.renderLinkedInIcon()), h$t("span", { class: CSS.optionText }, (_e = options === null || options === void 0 ? void 0 : options.linkedIn) === null || _e === void 0 ? void 0 : _e.label)),
      ]
      : null));
  }
  renderFacebookIcon() {
    return (h$t("svg", { height: "100%", style: { fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: '2' }, version: "1.1", viewBox: "0 0 512 512", width: "100%", xmlns: "http://www.w3.org/2000/svg" }, h$t("g", null, h$t("path", { d: "M512,256c0,-141.385 -114.615,-256 -256,-256c-141.385,0 -256,114.615 -256,256c0,127.777 93.616,233.685 216,252.89l0,-178.89l-65,0l0,-74l65,0l0,-56.4c0,-64.16 38.219,-99.6 96.695,-99.6c28.009,0 57.305,5 57.305,5l0,63l-32.281,0c-31.801,0 -41.719,19.733 -41.719,39.978l0,48.022l71,0l-11.35,74l-59.65,0l0,178.89c122.385,-19.205 216,-125.113 216,-252.89Z", style: { fill: '#1877f2', fillRule: 'nonzero' } }), h$t("path", { d: "M355.65,330l11.35,-74l-71,0l0,-48.022c0,-20.245 9.917,-39.978 41.719,-39.978l32.281,0l0,-63c0,0 -29.297,-5 -57.305,-5c-58.476,0 -96.695,35.44 -96.695,99.6l0,56.4l-65,0l0,74l65,0l0,178.89c13.033,2.045 26.392,3.11 40,3.11c13.608,0 26.966,-1.065 40,-3.11l0,-178.89l59.65,0Z", style: { fill: '#fff', fillRule: 'nonzero' } }))));
  }
  renderTwitterIcon() {
    return (h$t("svg", { height: "100%", style: { fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: '2' }, version: "1.1", viewBox: "0 0 512 512", width: "100%", xmlns: "http://www.w3.org/2000/svg" }, h$t("rect", { height: "400", style: { fill: 'none' }, width: "400", x: "56", y: "56" }), h$t("path", { d: "M161.014,464.013c193.208,0 298.885,-160.071 298.885,-298.885c0,-4.546 0,-9.072 -0.307,-13.578c20.558,-14.871 38.305,-33.282 52.408,-54.374c-19.171,8.495 -39.51,14.065 -60.334,16.527c21.924,-13.124 38.343,-33.782 46.182,-58.102c-20.619,12.235 -43.18,20.859 -66.703,25.498c-19.862,-21.121 -47.602,-33.112 -76.593,-33.112c-57.682,0 -105.145,47.464 -105.145,105.144c0,8.002 0.914,15.979 2.722,23.773c-84.418,-4.231 -163.18,-44.161 -216.494,-109.752c-27.724,47.726 -13.379,109.576 32.522,140.226c-16.715,-0.495 -33.071,-5.005 -47.677,-13.148l0,1.331c0.014,49.814 35.447,93.111 84.275,102.974c-15.464,4.217 -31.693,4.833 -47.431,1.802c13.727,42.685 53.311,72.108 98.14,72.95c-37.19,29.227 -83.157,45.103 -130.458,45.056c-8.358,-0.016 -16.708,-0.522 -25.006,-1.516c48.034,30.825 103.94,47.18 161.014,47.104", style: { fill: '#1da1f2', fillRule: 'nonzero' } })));
  }
  renderLinkedInIcon() {
    return (h$t("svg", { height: "100%", style: { fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: '2' }, version: "1.1", viewBox: "0 0 512 512", width: "100%", xmlns: "http://www.w3.org/2000/svg" }, h$t("g", { id: "g5891" }, h$t("path", { d: "M512,64c0,-35.323 -28.677,-64 -64,-64l-384,0c-35.323,0 -64,28.677 -64,64l0,384c0,35.323 28.677,64 64,64l384,0c35.323,0 64,-28.677 64,-64l0,-384Z", id: "background", style: { fill: '#2867b2' } }), h$t("g", { id: "shapes" }, h$t("rect", { height: "257.962", id: "rect11", style: { fill: '#fff' }, width: "85.76", x: "61.053", y: "178.667" }), h$t("path", { d: "M104.512,54.28c-29.341,0 -48.512,19.29 -48.512,44.573c0,24.752 18.588,44.574 47.377,44.574l0.554,0c29.903,0 48.516,-19.822 48.516,-44.574c-0.555,-25.283 -18.611,-44.573 -47.935,-44.573Z", id: "path13-0", style: { fill: '#fff', fillRule: 'nonzero' } }), h$t("path", { d: "M357.278,172.601c-45.49,0 -65.866,25.017 -77.276,42.589l0,-36.523l-85.738,0c1.137,24.197 0,257.961 0,257.961l85.737,0l0,-144.064c0,-7.711 0.554,-15.42 2.827,-20.931c6.188,-15.4 20.305,-31.352 43.993,-31.352c31.012,0 43.436,23.664 43.436,58.327l0,138.02l85.741,0l0,-147.93c0,-79.237 -42.305,-116.097 -98.72,-116.097Z", id: "path15", style: { fill: '#fff', fillRule: 'nonzero' } })))));
  }
  renderTip() {
    var _a;
    const info = (_a = this.messages) === null || _a === void 0 ? void 0 : _a.info;
    return (h$t("div", { class: CSS.tipContainer }, h$t("span", { class: CSS.tipHeader }, h$t("calcite-icon", { icon: "lightbulb", scale: this.scale }), h$t("span", null, info === null || info === void 0 ? void 0 : info.label)), h$t("p", { class: CSS.tipContent }, info === null || info === void 0 ? void 0 : info.tooltip)));
  }
  renderEmbed() {
    var _a, _b, _c;
    const embedMessages = (_a = this.messages) === null || _a === void 0 ? void 0 : _a.embed;
    return (h$t("div", { class: CSS.embed.container }, h$t("span", { class: CSS.embed.header }, h$t("calcite-icon", { icon: "code", scale: this.scale }), h$t("span", null, (_c = (_b = this.messages) === null || _b === void 0 ? void 0 : _b.embed) === null || _c === void 0 ? void 0 : _c.label)), h$t("div", { class: CSS.embed.embedCode.container }, h$t("div", { class: CSS.embed.embedCode.textArea }, h$t("textarea", { ref: el => (this.embedCodeRef = el), cols: 30, rows: 5, readonly: true, value: this.getEmbedCode() }), h$t("button", { id: "copyEmbedToClipboard", onClick: this.copyEmbedCode.bind(this), class: CSS.embed.embedCode.copyButton }, h$t("calcite-icon", { icon: "copy", scale: this.scale }), h$t("span", null, embedMessages === null || embedMessages === void 0 ? void 0 : embedMessages.copy))), h$t("span", { class: CSS.embed.textAreaText }, h$t("slot", { name: "text-area-text" })), h$t("div", { class: CSS.embed.dimensions.container }, h$t("label", { class: CSS.embed.dimensions.input }, h$t("span", null, embedMessages === null || embedMessages === void 0 ? void 0 : embedMessages.width), h$t("input", { ref: el => (this.embedWidthRef = el), type: "number", value: this.embedWidth })), h$t("label", { class: CSS.embed.dimensions.input }, h$t("span", null, embedMessages === null || embedMessages === void 0 ? void 0 : embedMessages.height), h$t("input", { ref: el => (this.embedHeightRef = el), type: "number", value: this.embedHeight }))))));
  }
  togglePopover(event) {
    event.stopPropagation();
    this.opened = !this.opened;
    this.popoverRef.toggle(this.opened);
  }
  closePopover() {
    this.opened = false;
    this.popoverRef.toggle(this.opened);
  }
  async handleShareItem(type) {
    var _a, _b;
    this.shareUrl = await this.generateShareUrl();
    let shortenedUrl = null;
    // Detects Safari - If Safari, do not shorten URL due to Safari not allowing clipboard copy after network requests
    const isChrome = (_a = navigator === null || navigator === void 0 ? void 0 : navigator.userAgent) === null || _a === void 0 ? void 0 : _a.includes('Chrome');
    const isSafari = (_b = navigator === null || navigator === void 0 ? void 0 : navigator.userAgent) === null || _b === void 0 ? void 0 : _b.includes('Safari');
    const doNotShortenUrl = isSafari !== undefined && isSafari && isChrome !== undefined && !isChrome;
    if (!doNotShortenUrl) {
      shortenedUrl = await this.shortenUrl(this.shareUrl);
    }
    const urlToUse = shortenedUrl ? shortenedUrl : this.shareUrl;
    switch (type) {
      case 'link':
        navigator.clipboard.writeText(urlToUse);
        if (this.embed) {
          this.copyEmbedPopoverRef.toggle(false);
          this.inlineCopyEmbedOpened = false;
        }
        if (this.mode === 'inline') {
          this.copyLinkPopoverRef.toggle(true);
        }
        this.inlineCopyLinkOpened = true;
        this.copied = true;
        return;
      case 'facebook':
      case 'twitter':
      case 'linkedIn':
        const urlData = {
          url: encodeURI(urlToUse),
        };
        const data = type === 'twitter' ? Object.assign(Object.assign({}, urlData), { text: this.shareText }) : urlData;
        const url = s$F(SOCIAL_URL_TEMPLATES[type], data);
        if (this.mode === 'popover') {
          this.closePopover();
        }
        window.open(encodeURI(url), '_blank');
        return;
    }
  }
  async shortenUrl(url) {
    var _a, _b;
    const request = await C$7(SHORTEN_API, {
      query: {
        longUrl: url,
        f: 'json',
      },
    });
    const shortUrl = (_b = (_a = request === null || request === void 0 ? void 0 : request.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.url;
    if (shortUrl) {
      return shortUrl.replace('http://', 'https://');
    }
  }
  getEmbedCode() {
    return `<iframe src="${this.shareUrl}" width="${this.embedWidth}" height="${this.embedHeight}" frameborder="0" style="border:0" allowfullscreen>${this.iframeInnerText}</iframe>`;
  }
  copyEmbedCode() {
    navigator.clipboard.writeText(this.getEmbedCode());
    this.copyLinkPopoverRef.toggle(false);
    this.inlineCopyLinkOpened = false;
    this.copyEmbedPopoverRef.toggle(true);
    this.inlineCopyEmbedOpened = true;
  }
  // VIEW LOGIC
  async generateShareUrl() {
    var _a;
    // If view is not ready
    if (!this.view || !((_a = this.view) === null || _a === void 0 ? void 0 : _a.ready)) {
      return this.shareUrl;
    }
    // Use x/y values and the spatial reference of the view to instantiate a geometry point
    const { x, y } = this.view.center;
    const { spatialReference } = this.view;
    const updatedSpatialReference = new k$6(Object.assign({}, spatialReference.toJSON()));
    const centerPoint = new j$7({
      x,
      y,
      spatialReference: updatedSpatialReference,
    });
    // Use pointToConvert to project point. Once projected, pass point to generate the share URL parameters
    const point = await this.processPoint(centerPoint);
    return this.generateShareUrlParams(point);
  }
  async processPoint(point) {
    const { isWGS84, isWebMercator } = point.spatialReference;
    // If spatial reference is WGS84 or Web Mercator, use longitude/latitude values to generate the share URL parameters
    if (isWGS84 || isWebMercator) {
      return point;
    }
    const outputSpatialReference = new k$6({
      wkid: 4326,
    });
    await Q();
    const projectedPoint = Y(point, outputSpatialReference);
    return projectedPoint;
  }
  generateShareUrlParams(point) {
    const { longitude, latitude } = point;
    if (longitude === undefined || latitude === undefined) {
      return this.shareUrl;
    }
    const roundedLon = this.roundValue(longitude);
    const roundedLat = this.roundValue(latitude);
    const { zoom } = this.view;
    const roundedZoom = this.roundValue(zoom);
    const graphic = this.view.get('popup.selectedFeature');
    let layerId;
    let oid;
    if (graphic) {
      const featureLayer = graphic.get('layer');
      layerId = featureLayer.id;
      oid = graphic.attributes[featureLayer.objectIdField];
    }
    const hiddenLayers = this.view.map.allLayers
      .filter(layer => !layer.visible)
      .toArray()
      .map(featureLayer => featureLayer.id)
      .toString()
      .replaceAll(',', ';');
    const { type } = this.view;
    const { defaultUrlParams } = this;
    const url = new URL(this.shareUrl);
    const { searchParams } = url;
    // Resets existing URL params
    if (searchParams.get('center'))
      searchParams.delete('center');
    if (searchParams.get('level'))
      searchParams.delete('level');
    if (searchParams.get('selectedFeature'))
      searchParams.delete('selectedFeature');
    if (searchParams.get('hiddenLayers'))
      searchParams.delete('hiddenLayers');
    if (searchParams.get('viewpoint'))
      searchParams.delete('viewpoint');
    // Checks if view.type is 3D, if so, set 3D url parameters
    if (type === '3d') {
      // viewpoint=cam:{camera.position.longitude},{camera.position.latitude},{camera.position.z};{camera.heading},{camera.tilt}
      const { camera } = this.view;
      const { heading, position, tilt } = camera;
      const { longitude, latitude, z } = position;
      const viewpoint_Values = {
        longitude: this.roundValue(longitude, 8),
        latitude: this.roundValue(latitude, 8),
        z: this.roundValue(z, 3),
        heading: this.roundValue(heading, 3),
        tilt: this.roundValue(tilt, 3),
      };
      const viewpointVal = `cam:${viewpoint_Values.longitude},${viewpoint_Values.latitude},${viewpoint_Values.z};${viewpoint_Values.heading},${viewpoint_Values.tilt}`;
      if ((defaultUrlParams === null || defaultUrlParams === void 0 ? void 0 : defaultUrlParams.viewpoint) !== false)
        url.searchParams.set('viewpoint', viewpointVal);
      if (layerId && oid && (defaultUrlParams === null || defaultUrlParams === void 0 ? void 0 : defaultUrlParams.selectedFeature) !== false)
        url.searchParams.set('selectedFeature', `${layerId};${oid}`);
      if (hiddenLayers && (defaultUrlParams === null || defaultUrlParams === void 0 ? void 0 : defaultUrlParams.hiddenLayers) !== false)
        url.searchParams.set('hiddenLayers', hiddenLayers);
      url.search = decodeURIComponent(url.search);
      return url.href;
    }
    // Otherwise, just return original url for 2D
    if ((defaultUrlParams === null || defaultUrlParams === void 0 ? void 0 : defaultUrlParams.center) !== false)
      url.searchParams.set('center', `${roundedLon};${roundedLat}`);
    if ((defaultUrlParams === null || defaultUrlParams === void 0 ? void 0 : defaultUrlParams.level) !== false)
      url.searchParams.set('level', `${roundedZoom}`);
    if (layerId && oid && (defaultUrlParams === null || defaultUrlParams === void 0 ? void 0 : defaultUrlParams.selectedFeature) !== false)
      url.searchParams.set('selectedFeature', `${layerId};${oid}`);
    if (hiddenLayers && (defaultUrlParams === null || defaultUrlParams === void 0 ? void 0 : defaultUrlParams.selectedFeature) !== false)
      url.searchParams.set('hiddenLayers', hiddenLayers);
    url.search = decodeURIComponent(url.search);
    return url.href;
  }
  roundValue(val, decimalPoints = 4) {
    return parseFloat(val.toFixed(decimalPoints));
  }
  get el() { return getElement(this); }
};
InstantAppsSocialShare.style = instantAppsSocialShareCss;

export { v$e as $, A$8 as A, v$f as B, s$G as C, a$l as D, E$b as E, y$l as F, u$A as G, s$n as H, s$k as I, g$h as J, w$e as K, l$y as L, M$2 as M, N$6 as N, f$w as O, c$s as P, Q$4 as Q, s$F as R, r$x as S, l$g as T, U$6 as U, y$k as V, j$f as W, y$n as X, q$8 as Y, z$8 as Z, C$7 as _, m$5 as a, Z$4 as a0, I$b as a1, s$H as a2, F$8 as a3, J$6 as a4, t$v as a5, Bt as a6, n$n as a7, o$B as a8, browser$1 as a9, InstantAppsSocialShare as aa, e$r as b, s$l as c, e$j as d, e$D as e, m$q as f, v$9 as g, h$e as h, b$9 as i, j$7 as j, d$j as k, l$n as l, m$1 as m, n$e as n, m$n as o, g$k as p, q$9 as q, r$o as r, s$D as s, t$h as t, a$y as u, v$1 as v, e$t as w, r$s as x, n$j as y, p$o as z };
