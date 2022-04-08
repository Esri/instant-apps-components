import { b as e$8, i as i$6, r as r$5, p as p$6, c as s$6, d as e$9, f as b$4, N as N$3, g as d$7, h as i$7, l as l$5, q, k as v$3, t as t$5, T as T$1, n as m$3, o as g$3, u as v$4, w as s$7, x as N$4, y as a$4, z as n$8, A as q$1, B as s$8, C as s$9, D as a$5, E as w$1, F as l$6, G as f$2, H as c$3, I as E$2, J as u$3, K as s$a, L as a$6, O as n$9, P as y$2, Q as y$3, R as O$1, S as z$2, s as s$b, U as p$7, V as B$1, W as C$2, X as b$5, Y as r$6, Z as r$7, _ as W, $ as S$2, a0 as t$6, a1 as C$3, a2 as o$4 } from './instant-apps-social-share.js';
import { setAssetPath } from '@stencil/core/internal/client';

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.22/esri/copyright.txt for details.
*/
class i$5{constructor(){this._emitter=new i$5.EventEmitter(this);}emit(t,e){return this._emitter.emit(t,e)}on(t,e){return this._emitter.on(t,e)}once(t,e){return this._emitter.once(t,e)}hasEventListener(t){return this._emitter.hasEventListener(t)}}!function(n){class o{constructor(t=null){this.target=t,this._listenersMap=null;}clear(){this._listenersMap&&this._listenersMap.clear(),this._listenersMap=null;}emit(t,e){const s=this._listenersMap&&this._listenersMap.get(t);if(!s)return !1;const r=this.target||this;return [...s].forEach((t=>{t.call(r,e);})),s.length>0}on(t,e){if(Array.isArray(t)){const r=t.map((t=>this.on(t,e)));return r$5(r)}if(t.indexOf(",")>-1)throw new TypeError("Evented.on() with a comma delimited string of event types is not supported");this._listenersMap||(this._listenersMap=new Map);const r=this._listenersMap.get(t)||[];return r.push(e),this._listenersMap.set(t,r),{remove:()=>{const s=this._listenersMap&&this._listenersMap.get(t)||[],r=s.indexOf(e);r>=0&&s.splice(r,1);}}}once(t,e){const s=this.on(t,(t=>{s.remove(),e.call(null,t);}));return s}hasEventListener(t){const e=this._listenersMap&&this._listenersMap.get(t);return null!=e&&e.length>0}}n.EventEmitter=o,n.EventedMixin=e=>{let s=class extends e{constructor(){super(...arguments),this._emitter=new o;}destroy(){this._emitter.clear();}emit(t,e){return this._emitter.emit(t,e)}on(t,e){return this._emitter.on(t,e)}once(t,e){return this._emitter.once(t,e)}hasEventListener(t){return this._emitter.hasEventListener(t)}};return s=e$8([i$6("esri.core.Evented")],s),s};let h=class extends p$6{constructor(){super(...arguments),this._emitter=new i$5.EventEmitter(this);}destroy(){this._emitter.clear();}emit(t,e){return this._emitter.emit(t,e)}on(t,e){return this._emitter.on(t,e)}once(t,e){return this._emitter.once(t,e)}hasEventListener(t){return this._emitter.hasEventListener(t)}};h=e$8([i$6("esri.core.Evented")],h),n.EventedAccessor=h;}(i$5||(i$5={}));const n$7=i$5;

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.22/esri/copyright.txt for details.
*/
function e$7(e){return "string"==typeof e?document.getElementById(e):e}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.22/esri/copyright.txt for details.
*/
function n$6(n){return (r,t)=>{r[t]=n;}}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.22/esri/copyright.txt for details.
*/
class e$6{constructor(){this._observers=[];}observe(e){return this._observers.includes(e)||this._observers.push(e),new s$6(this._observers,e)}notify(){const s=this._observers.slice();for(let e=0;e<s.length;++e){const r=s[e];r.onInvalidated(),r.onCommitted();}}}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.22/esri/copyright.txt for details.
*/
var u$2;class g$2{constructor(){this.target=null,this.cancellable=!1,this.defaultPrevented=!1,this.item=void 0,this.type=void 0;}preventDefault(){this.cancellable&&(this.defaultPrevented=!0);}reset(e){this.defaultPrevented=!1,this.item=e;}}const p$5=new e$9(g$2,void 0,(e=>{e.item=null,e.target=null,e.defaultPrevented=!1,e.cancellable=!1;})),d$6=()=>{};function b$3(e){return e?e instanceof L$2?e.toArray():e.length?Array.prototype.slice.apply(e):[]:[]}function v$2(e){if(e&&e.length)return e[0]}function y$1(e,t,s,i){const r=Math.min(e.length-s,t.length-i);let n=0;for(;n<r&&e[s+n]===t[i+n];)n++;return n}function C$1(e,t,s,i){t&&t.forEach(((t,r,n)=>{e.push(t),C$1(e,s.call(i,t,r,n),s,i);}));}const A$1=new Set,x$2=new Set,E$1=new Set,j=new Map;let B=0,L$2=u$2=class extends n$7.EventedAccessor{constructor(e){super(e),this._chgListeners=[],this._notifications=null,this._timer=null,this._observable=new e$6,this.length=0,this._items=[],Object.defineProperty(this,"uid",{value:B++});}static isCollection(e){return null!=e&&e instanceof u$2}normalizeCtorArgs(e){return e?Array.isArray(e)||e instanceof u$2?{items:e}:e:{}}destroy(){this.removeAll();}*[Symbol.iterator](){yield*this.items;}get items(){return i$7(this._observable),this._items}set items(e){this._emitBeforeChanges(1)||(this._splice(0,this.length,b$3(e)),this._emitAfterChanges(1));}hasEventListener(e){return "change"===e?this._chgListeners.length>0:this._emitter.hasEventListener(e)}on(e,t){if("change"===e){const e=this._chgListeners,s={removed:!1,callback:t};return e.push(s),this._notifications&&this._notifications.push({listeners:e.slice(),items:this._items.slice(),changes:[]}),{remove(){this.remove=d$6,s.removed=!0,e.splice(e.indexOf(s),1);}}}return this._emitter.on(e,t)}once(e,t){const s=this.on(e,t);return {remove(){s.remove();}}}add(e,t){if(i$7(this._observable),this._emitBeforeChanges(1))return this;const s=this.getNextIndex(null!=t?t:null);return this._splice(s,0,[e]),this._emitAfterChanges(1),this}addMany(e,t=this._items.length){if(i$7(this._observable),!e||!e.length)return this;if(this._emitBeforeChanges(1))return this;const s=this.getNextIndex(t);return this._splice(s,0,b$3(e)),this._emitAfterChanges(1),this}removeAll(){if(i$7(this._observable),!this.length||this._emitBeforeChanges(2))return [];const e=this._splice(0,this.length)||[];return this._emitAfterChanges(2),e}clone(){return i$7(this._observable),this._createNewInstance({items:this._items.map(l$5)})}concat(...e){i$7(this._observable);const t=e.map(b$3);return this._createNewInstance({items:this._items.concat(...t)})}drain(e,t){if(i$7(this._observable),!this.length||this._emitBeforeChanges(2))return;const s=q(this._splice(0,this.length)),i=s.length;for(let r=0;r<i;r++)e.call(t,s[r],r,s);this._emitAfterChanges(2);}every(e,t){return i$7(this._observable),this._items.every(e,t)}filter(e,t){let s;return i$7(this._observable),s=2===arguments.length?this._items.filter(e,t):this._items.filter(e),this._createNewInstance({items:s})}find(e,t){return i$7(this._observable),this._items.find(e,t)}findIndex(e,t){return i$7(this._observable),this._items.findIndex(e,t)}flatten(e,t){i$7(this._observable);const s=[];return C$1(s,this,e,t),new u$2(s)}forEach(e,t){return i$7(this._observable),this._items.forEach(e,t)}getItemAt(e){return i$7(this._observable),this._items[e]}getNextIndex(e){i$7(this._observable);const t=this.length;return (e=null==e?t:e)<0?e=0:e>t&&(e=t),e}includes(e,t=0){return i$7(this._observable),this._items.includes(e,t)}indexOf(e,t=0){return i$7(this._observable),this._items.indexOf(e,t)}join(e=","){return i$7(this._observable),this._items.join(e)}lastIndexOf(e,t=this.length-1){return i$7(this._observable),this._items.lastIndexOf(e,t)}map(e,t){i$7(this._observable);const s=this._items.map(e,t);return new u$2({items:s})}reorder(e,t=this.length-1){i$7(this._observable);const s=this.indexOf(e);if(-1!==s){if(t<0?t=0:t>=this.length&&(t=this.length-1),s!==t){if(this._emitBeforeChanges(4))return e;this._splice(s,1),this._splice(t,0,[e]),this._emitAfterChanges(4);}return e}}pop(){if(i$7(this._observable),!this.length||this._emitBeforeChanges(2))return;const e=v$2(this._splice(this.length-1,1));return this._emitAfterChanges(2),e}push(...e){return i$7(this._observable),this._emitBeforeChanges(1)||(this._splice(this.length,0,e),this._emitAfterChanges(1)),this.length}reduce(e,t){i$7(this._observable);const s=this._items;return 2===arguments.length?s.reduce(e,t):s.reduce(e)}reduceRight(e,t){i$7(this._observable);const s=this._items;return 2===arguments.length?s.reduceRight(e,t):s.reduceRight(e)}remove(e){return i$7(this._observable),this.removeAt(this.indexOf(e))}removeAt(e){if(i$7(this._observable),e<0||e>=this.length||this._emitBeforeChanges(2))return;const t=v$2(this._splice(e,1));return this._emitAfterChanges(2),t}removeMany(e){if(i$7(this._observable),!e||!e.length||this._emitBeforeChanges(2))return [];const t=e instanceof u$2?e.toArray():e,s=this._items,i=[],r=t.length;for(let n=0;n<r;n++){const e=t[n],r=s.indexOf(e);if(r>-1){const e=1+y$1(t,s,n+1,r+1),h=this._splice(r,e);h&&h.length>0&&i.push.apply(i,h),n+=e-1;}}return this._emitAfterChanges(2),i}reverse(){if(i$7(this._observable),this._emitBeforeChanges(4))return this;const e=this._splice(0,this.length);return e&&(e.reverse(),this._splice(0,0,e)),this._emitAfterChanges(4),this}shift(){if(i$7(this._observable),!this.length||this._emitBeforeChanges(2))return;const e=v$2(this._splice(0,1));return this._emitAfterChanges(2),e}slice(e=0,t=this.length){return i$7(this._observable),this._createNewInstance({items:this._items.slice(e,t)})}some(e,t){return i$7(this._observable),this._items.some(e,t)}sort(e){if(i$7(this._observable),!this.length||this._emitBeforeChanges(4))return this;const t=q(this._splice(0,this.length));return arguments.length?t.sort(e):t.sort(),this._splice(0,0,t),this._emitAfterChanges(4),this}splice(e,t,...s){i$7(this._observable);const i=(t?2:0)|(s.length?1:0);if(this._emitBeforeChanges(i))return [];const r=this._splice(e,t,s)||[];return this._emitAfterChanges(i),r}toArray(){return i$7(this._observable),this._items.slice()}toJSON(){return i$7(this._observable),this.toArray()}toLocaleString(){return i$7(this._observable),this._items.toLocaleString()}toString(){return i$7(this._observable),this._items.toString()}unshift(...e){return i$7(this._observable),!e.length||this._emitBeforeChanges(1)||(this._splice(0,0,e),this._emitAfterChanges(1)),this.length}_createNewInstance(e){return new this.constructor(e)}_splice(e,t,s){const i=this._items,r=this.itemType;let n,o;if(!this._notifications&&this.hasEventListener("change")&&(this._notifications=[{listeners:this._chgListeners.slice(),items:this._items.slice(),changes:[]}],this._timer&&this._timer.remove(),this._timer=v$3((()=>this._dispatchChange()))),t){if(o=i.splice(e,t),this.hasEventListener("before-remove")){const t=p$5.acquire();t.target=this,t.cancellable=!0;for(let s=0,r=o.length;s<r;s++)n=o[s],t.reset(n),this.emit("before-remove",t),t.defaultPrevented&&(o.splice(s,1),i.splice(e,0,n),e+=1,s-=1,r-=1);p$5.release(t);}if(this.length=this._items.length,this.hasEventListener("after-remove")){const e=p$5.acquire();e.target=this,e.cancellable=!1;const t=o.length;for(let s=0;s<t;s++)e.reset(o[s]),this.emit("after-remove",e);p$5.release(e);}}if(s&&s.length){if(r){const e=[];for(const t of s){const s=r.ensureType(t);null==s&&null!=t||e.push(s);}s=e;}const t=this.hasEventListener("before-add"),n=this.hasEventListener("after-add"),h=e===this.length;if(t||n){const r=p$5.acquire();r.target=this,r.cancellable=!0;const o=p$5.acquire();o.target=this,o.cancellable=!1;for(const l of s)t?(r.reset(l),this.emit("before-add",r),r.defaultPrevented||(h?i.push(l):i.splice(e++,0,l),this._set("length",i.length),n&&(o.reset(l),this.emit("after-add",o)))):(h?i.push(l):i.splice(e++,0,l),this._set("length",i.length),o.reset(l),this.emit("after-add",o));p$5.release(o),p$5.release(r);}else {if(h)for(const e of s)i.push(e);else i.splice(e,0,...s);this._set("length",i.length);}}return (s&&s.length||o&&o.length)&&this._notifyChangeEvent(s,o),o}_emitBeforeChanges(e){let t=!1;if(this.hasEventListener("before-changes")){const s=p$5.acquire();s.target=this,s.cancellable=!0,s.type=e,this.emit("before-changes",s),t=s.defaultPrevented,p$5.release(s);}return t}_emitAfterChanges(e){if(this.hasEventListener("after-changes")){const t=p$5.acquire();t.target=this,t.cancellable=!1,t.type=e,this.emit("after-changes",t),p$5.release(t);}this._observable.notify();}_notifyChangeEvent(e,t){this.hasEventListener("change")&&this._notifications&&this._notifications[this._notifications.length-1].changes.push({added:e,removed:t});}_dispatchChange(){if(this._timer&&(this._timer.remove(),this._timer=null),!this._notifications)return;const e=this._notifications;this._notifications=null;for(const s of e){const e=s.changes;A$1.clear(),x$2.clear(),E$1.clear();for(const{added:t,removed:s}of e){if(t)if(0===E$1.size&&0===x$2.size)for(const e of t)A$1.add(e);else for(const e of t)x$2.has(e)?(E$1.add(e),x$2.delete(e)):E$1.has(e)||A$1.add(e);if(s)if(0===E$1.size&&0===A$1.size)for(const e of s)x$2.add(e);else for(const e of s)A$1.has(e)?A$1.delete(e):(E$1.delete(e),x$2.add(e));}const i=t$5.acquire();A$1.forEach((e=>{i.push(e);}));const r=t$5.acquire();x$2.forEach((e=>{r.push(e);}));const n=this._items,h=s.items,o=t$5.acquire();if(E$1.forEach((e=>{h.indexOf(e)!==n.indexOf(e)&&o.push(e);})),s.listeners&&(i.length||r.length||o.length)){const e={target:this,added:i,removed:r,moved:o},t=s.listeners.length;for(let i=0;i<t;i++){const t=s.listeners[i];t.removed||t.callback.call(this,e);}}t$5.release(i),t$5.release(r),t$5.release(o);}A$1.clear(),x$2.clear(),E$1.clear();}};L$2.ofType=t=>{if(!t)return u$2;if(j.has(t))return j.get(t);let s=null;if("function"==typeof t)s=t.prototype.declaredClass;else if(t.base)s=t.base.prototype.declaredClass;else for(const e in t.typeMap){const i=t.typeMap[e].prototype.declaredClass;s?s+=` | ${i}`:s=i;}let i=class extends u$2{};return e$8([n$6({Type:t,ensureType:"function"==typeof t?b$4(t):N$3(t)})],i.prototype,"itemType",void 0),i=e$8([i$6(`esri.core.Collection<${s}>`)],i),j.set(t,i),i},e$8([d$7()],L$2.prototype,"length",void 0),e$8([d$7()],L$2.prototype,"items",null),L$2=u$2=e$8([i$6("esri.core.Collection")],L$2);const S$1=L$2;

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.22/esri/copyright.txt for details.
*/
let h$3=class extends p$6{constructor(r){super(r),this._groups=new Map;}destroy(){this.removeAll();}get size(){let r=0;return this._groups.forEach((e=>{r+=e.length;})),r}add(r,e){if(!this._isHandle(r)&&!Array.isArray(r)&&!S$1.isCollection(r))return this;const t=this._getOrCreateGroup(e);return Array.isArray(r)||S$1.isCollection(r)?r.forEach((r=>this._isHandle(r)&&t.push(r))):t.push(r),this.notifyChange("size"),this}forEach(r,e){if("function"==typeof r)this._groups.forEach((e=>e.forEach(r)));else {const s=this._getGroup(r);s&&e&&s.forEach(e);}}has(r){return this._groups.has(this._ensureGroupKey(r))}remove(r){if(Array.isArray(r)||S$1.isCollection(r))return r.forEach(this.remove,this),this;if(!this.has(r))return this;const e=this._getGroup(r);for(let s=0;s<e.length;s++)e[s].remove();return this._deleteGroup(r),this.notifyChange("size"),this}removeAll(){return this._groups.forEach((r=>{for(let e=0;e<r.length;e++)r[e].remove();})),this._groups.clear(),this.notifyChange("size"),this}_isHandle(r){return r&&!!r.remove}_getOrCreateGroup(r){if(this.has(r))return this._getGroup(r);const e=[];return this._groups.set(this._ensureGroupKey(r),e),e}_getGroup(r){return q(this._groups.get(this._ensureGroupKey(r)))}_deleteGroup(r){return this._groups.delete(this._ensureGroupKey(r))}_ensureGroupKey(r){return r||"_default_"}};e$8([d$7({readOnly:!0})],h$3.prototype,"size",null),h$3=e$8([i$6("esri.core.Handles")],h$3);const u$1=h$3;

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.22/esri/copyright.txt for details.
*/
class h$2{constructor(s){this.instance=s,this._resolver=T$1(),this._status=0,this._resolvingPromises=[],this._resolver.promise.then((()=>{this._status=1,this._cleanUp();}),(()=>{this._status=2,this._cleanUp();}));}addResolvingPromise(s){this._resolvingPromises.push(s),this._tryResolve();}isResolved(){return 1===this._status}isRejected(){return 2===this._status}isFulfilled(){return 0!==this._status}abort(){this._resolver.reject(m$3());}when(s,e){return this._resolver.promise.then(s,e)}_cleanUp(){this._allPromise=this._resolvingPromises=this._allPromise=null;}_tryResolve(){if(this.isFulfilled())return;const s=T$1(),e=[...this._resolvingPromises,q(s.promise)],t=this._allPromise=Promise.all(e);t.then((()=>{this.isFulfilled()||this._allPromise!==t||this._resolver.resolve(this.instance);}),(s=>{this.isFulfilled()||this._allPromise!==t||g$3(s)||this._resolver.reject(s);})),s.resolve();}}const n$5=e=>{let i=class extends e{constructor(...s){super(...s),this._promiseProps=new h$2(this),this.addResolvingPromise(Promise.resolve());}isResolved(){return this._promiseProps.isResolved()}isRejected(){return this._promiseProps.isRejected()}isFulfilled(){return this._promiseProps.isFulfilled()}when(s,e){return new Promise(((s,e)=>{this._promiseProps.when(s,e);})).then(s,e)}catch(s){return this.when(null,s)}addResolvingPromise(s){s&&!this._promiseProps.isFulfilled()&&this._promiseProps.addResolvingPromise("_promiseProps"in s?s.when():s);}};return i=e$8([i$6("esri.core.Promise")],i),i};let m$2=class extends(n$5(p$6)){};m$2=e$8([i$6("esri.core.Promise")],m$2);

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.22/esri/copyright.txt for details.
*/
function t$4(){const t=crypto.getRandomValues(new Uint16Array(8));t[3]=4095&t[3]|16384,t[4]=16383&t[4]|32768;const n=n=>t[n].toString(16);return n(0)+n(1)+"-"+n(2)+"-"+n(3)+"-"+n(4)+"-"+n(5)+n(6)+n(7)}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.22/esri/copyright.txt for details.
*/
const c$2=/\?(\.|$)/g;function i$4(n,t,r,e){const o=Array.isArray(t)?t:t.indexOf(",")>-1?t.split(","):[t],u=f$1(n,t,r,e);for(const i of o){const t=i.trim().replace(c$2,"$1"),e=n.get(t);r.call(n,e,e,t,n);}return u}function f$1(n,t,r,e){return n.watch(t,r,e)}function a$3(n,t,r,e){return N$2(n,t,U$1,r,e)}function z$1(n,t,r,e,o){const u=n.watch(t,((t,o,u,c)=>{r&&!r(t)||null==e||e.call(n,t,o,u,c);}),o);if(Array.isArray(t))for(const c of t){const o=n.get(c);r&&r(o)&&(null==e||e.call(n,o,o,t,n));}else {const o=n.get(t);r&&r(o)&&(null==e||e.call(n,o,o,t,n));}return u}function N$2(n,t,r,c,i){const f="function"==typeof c?c:null,l="object"==typeof c?c:null;"boolean"==typeof c&&(i=c);let s,a=!1;function m(){s&&(s.remove(),s=null);}const p=T$1();v$4(l,(()=>{m(),p.reject(m$3());}));const v={then:p.promise.then.bind(p.promise),catch:p.promise.catch.bind(p.promise),remove:m};return Object.freeze(v),s=z$1(n,t,r,((t,r,e,o)=>{a=!0,m(),f&&f.call(n,t,r,e,o),p.resolve({value:t,oldValue:r,propertyName:e,target:o});}),i),a&&m(),v}function U$1(n){return !!n}

/*!
 * @esri/arcgis-html-sanitizer - v2.9.0 - Mon Dec 13 2021 15:07:01 GMT-0500 (Eastern Standard Time)
 * Copyright (c) 2021 - Environmental Systems Research Institute, Inc.
 * Apache-2.0
 * 
 * js-xss
 * Copyright (c) 2012-2017 Zongmin Lei(雷宗民) <leizongmin@gmail.com>
 * http://ucdok.com
 * MIT License, see https://github.com/leizongmin/js-xss/blob/master/LICENSE for details
 * 
 * Lodash/isPlainObject
 * Copyright (c) JS Foundation and other contributors <https://js.foundation/>
 * MIT License, see https://raw.githubusercontent.com/lodash/lodash/4.17.10-npm/LICENSE for details
 */
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) ||
      objectToString.call(value) != objectTag || isHostObject(value)) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return (typeof Ctor == 'function' &&
    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
}

var lodash_isplainobject = isPlainObject;

var lib$1 = {exports: {}};

var _default$1 = {};

var lib = {exports: {}};

var _default = {};

/**
 * cssfilter
 *
 * @author 老雷<leizongmin@gmail.com>
 */

function getDefaultWhiteList$1 () {
  // 白名单值说明：
  // true: 允许该属性
  // Function: function (val) { } 返回true表示允许该属性，其他值均表示不允许
  // RegExp: regexp.test(val) 返回true表示允许该属性，其他值均表示不允许
  // 除上面列出的值外均表示不允许
  var whiteList = {};

  whiteList['align-content'] = false; // default: auto
  whiteList['align-items'] = false; // default: auto
  whiteList['align-self'] = false; // default: auto
  whiteList['alignment-adjust'] = false; // default: auto
  whiteList['alignment-baseline'] = false; // default: baseline
  whiteList['all'] = false; // default: depending on individual properties
  whiteList['anchor-point'] = false; // default: none
  whiteList['animation'] = false; // default: depending on individual properties
  whiteList['animation-delay'] = false; // default: 0
  whiteList['animation-direction'] = false; // default: normal
  whiteList['animation-duration'] = false; // default: 0
  whiteList['animation-fill-mode'] = false; // default: none
  whiteList['animation-iteration-count'] = false; // default: 1
  whiteList['animation-name'] = false; // default: none
  whiteList['animation-play-state'] = false; // default: running
  whiteList['animation-timing-function'] = false; // default: ease
  whiteList['azimuth'] = false; // default: center
  whiteList['backface-visibility'] = false; // default: visible
  whiteList['background'] = true; // default: depending on individual properties
  whiteList['background-attachment'] = true; // default: scroll
  whiteList['background-clip'] = true; // default: border-box
  whiteList['background-color'] = true; // default: transparent
  whiteList['background-image'] = true; // default: none
  whiteList['background-origin'] = true; // default: padding-box
  whiteList['background-position'] = true; // default: 0% 0%
  whiteList['background-repeat'] = true; // default: repeat
  whiteList['background-size'] = true; // default: auto
  whiteList['baseline-shift'] = false; // default: baseline
  whiteList['binding'] = false; // default: none
  whiteList['bleed'] = false; // default: 6pt
  whiteList['bookmark-label'] = false; // default: content()
  whiteList['bookmark-level'] = false; // default: none
  whiteList['bookmark-state'] = false; // default: open
  whiteList['border'] = true; // default: depending on individual properties
  whiteList['border-bottom'] = true; // default: depending on individual properties
  whiteList['border-bottom-color'] = true; // default: current color
  whiteList['border-bottom-left-radius'] = true; // default: 0
  whiteList['border-bottom-right-radius'] = true; // default: 0
  whiteList['border-bottom-style'] = true; // default: none
  whiteList['border-bottom-width'] = true; // default: medium
  whiteList['border-collapse'] = true; // default: separate
  whiteList['border-color'] = true; // default: depending on individual properties
  whiteList['border-image'] = true; // default: none
  whiteList['border-image-outset'] = true; // default: 0
  whiteList['border-image-repeat'] = true; // default: stretch
  whiteList['border-image-slice'] = true; // default: 100%
  whiteList['border-image-source'] = true; // default: none
  whiteList['border-image-width'] = true; // default: 1
  whiteList['border-left'] = true; // default: depending on individual properties
  whiteList['border-left-color'] = true; // default: current color
  whiteList['border-left-style'] = true; // default: none
  whiteList['border-left-width'] = true; // default: medium
  whiteList['border-radius'] = true; // default: 0
  whiteList['border-right'] = true; // default: depending on individual properties
  whiteList['border-right-color'] = true; // default: current color
  whiteList['border-right-style'] = true; // default: none
  whiteList['border-right-width'] = true; // default: medium
  whiteList['border-spacing'] = true; // default: 0
  whiteList['border-style'] = true; // default: depending on individual properties
  whiteList['border-top'] = true; // default: depending on individual properties
  whiteList['border-top-color'] = true; // default: current color
  whiteList['border-top-left-radius'] = true; // default: 0
  whiteList['border-top-right-radius'] = true; // default: 0
  whiteList['border-top-style'] = true; // default: none
  whiteList['border-top-width'] = true; // default: medium
  whiteList['border-width'] = true; // default: depending on individual properties
  whiteList['bottom'] = false; // default: auto
  whiteList['box-decoration-break'] = true; // default: slice
  whiteList['box-shadow'] = true; // default: none
  whiteList['box-sizing'] = true; // default: content-box
  whiteList['box-snap'] = true; // default: none
  whiteList['box-suppress'] = true; // default: show
  whiteList['break-after'] = true; // default: auto
  whiteList['break-before'] = true; // default: auto
  whiteList['break-inside'] = true; // default: auto
  whiteList['caption-side'] = false; // default: top
  whiteList['chains'] = false; // default: none
  whiteList['clear'] = true; // default: none
  whiteList['clip'] = false; // default: auto
  whiteList['clip-path'] = false; // default: none
  whiteList['clip-rule'] = false; // default: nonzero
  whiteList['color'] = true; // default: implementation dependent
  whiteList['color-interpolation-filters'] = true; // default: auto
  whiteList['column-count'] = false; // default: auto
  whiteList['column-fill'] = false; // default: balance
  whiteList['column-gap'] = false; // default: normal
  whiteList['column-rule'] = false; // default: depending on individual properties
  whiteList['column-rule-color'] = false; // default: current color
  whiteList['column-rule-style'] = false; // default: medium
  whiteList['column-rule-width'] = false; // default: medium
  whiteList['column-span'] = false; // default: none
  whiteList['column-width'] = false; // default: auto
  whiteList['columns'] = false; // default: depending on individual properties
  whiteList['contain'] = false; // default: none
  whiteList['content'] = false; // default: normal
  whiteList['counter-increment'] = false; // default: none
  whiteList['counter-reset'] = false; // default: none
  whiteList['counter-set'] = false; // default: none
  whiteList['crop'] = false; // default: auto
  whiteList['cue'] = false; // default: depending on individual properties
  whiteList['cue-after'] = false; // default: none
  whiteList['cue-before'] = false; // default: none
  whiteList['cursor'] = false; // default: auto
  whiteList['direction'] = false; // default: ltr
  whiteList['display'] = true; // default: depending on individual properties
  whiteList['display-inside'] = true; // default: auto
  whiteList['display-list'] = true; // default: none
  whiteList['display-outside'] = true; // default: inline-level
  whiteList['dominant-baseline'] = false; // default: auto
  whiteList['elevation'] = false; // default: level
  whiteList['empty-cells'] = false; // default: show
  whiteList['filter'] = false; // default: none
  whiteList['flex'] = false; // default: depending on individual properties
  whiteList['flex-basis'] = false; // default: auto
  whiteList['flex-direction'] = false; // default: row
  whiteList['flex-flow'] = false; // default: depending on individual properties
  whiteList['flex-grow'] = false; // default: 0
  whiteList['flex-shrink'] = false; // default: 1
  whiteList['flex-wrap'] = false; // default: nowrap
  whiteList['float'] = false; // default: none
  whiteList['float-offset'] = false; // default: 0 0
  whiteList['flood-color'] = false; // default: black
  whiteList['flood-opacity'] = false; // default: 1
  whiteList['flow-from'] = false; // default: none
  whiteList['flow-into'] = false; // default: none
  whiteList['font'] = true; // default: depending on individual properties
  whiteList['font-family'] = true; // default: implementation dependent
  whiteList['font-feature-settings'] = true; // default: normal
  whiteList['font-kerning'] = true; // default: auto
  whiteList['font-language-override'] = true; // default: normal
  whiteList['font-size'] = true; // default: medium
  whiteList['font-size-adjust'] = true; // default: none
  whiteList['font-stretch'] = true; // default: normal
  whiteList['font-style'] = true; // default: normal
  whiteList['font-synthesis'] = true; // default: weight style
  whiteList['font-variant'] = true; // default: normal
  whiteList['font-variant-alternates'] = true; // default: normal
  whiteList['font-variant-caps'] = true; // default: normal
  whiteList['font-variant-east-asian'] = true; // default: normal
  whiteList['font-variant-ligatures'] = true; // default: normal
  whiteList['font-variant-numeric'] = true; // default: normal
  whiteList['font-variant-position'] = true; // default: normal
  whiteList['font-weight'] = true; // default: normal
  whiteList['grid'] = false; // default: depending on individual properties
  whiteList['grid-area'] = false; // default: depending on individual properties
  whiteList['grid-auto-columns'] = false; // default: auto
  whiteList['grid-auto-flow'] = false; // default: none
  whiteList['grid-auto-rows'] = false; // default: auto
  whiteList['grid-column'] = false; // default: depending on individual properties
  whiteList['grid-column-end'] = false; // default: auto
  whiteList['grid-column-start'] = false; // default: auto
  whiteList['grid-row'] = false; // default: depending on individual properties
  whiteList['grid-row-end'] = false; // default: auto
  whiteList['grid-row-start'] = false; // default: auto
  whiteList['grid-template'] = false; // default: depending on individual properties
  whiteList['grid-template-areas'] = false; // default: none
  whiteList['grid-template-columns'] = false; // default: none
  whiteList['grid-template-rows'] = false; // default: none
  whiteList['hanging-punctuation'] = false; // default: none
  whiteList['height'] = true; // default: auto
  whiteList['hyphens'] = false; // default: manual
  whiteList['icon'] = false; // default: auto
  whiteList['image-orientation'] = false; // default: auto
  whiteList['image-resolution'] = false; // default: normal
  whiteList['ime-mode'] = false; // default: auto
  whiteList['initial-letters'] = false; // default: normal
  whiteList['inline-box-align'] = false; // default: last
  whiteList['justify-content'] = false; // default: auto
  whiteList['justify-items'] = false; // default: auto
  whiteList['justify-self'] = false; // default: auto
  whiteList['left'] = false; // default: auto
  whiteList['letter-spacing'] = true; // default: normal
  whiteList['lighting-color'] = true; // default: white
  whiteList['line-box-contain'] = false; // default: block inline replaced
  whiteList['line-break'] = false; // default: auto
  whiteList['line-grid'] = false; // default: match-parent
  whiteList['line-height'] = false; // default: normal
  whiteList['line-snap'] = false; // default: none
  whiteList['line-stacking'] = false; // default: depending on individual properties
  whiteList['line-stacking-ruby'] = false; // default: exclude-ruby
  whiteList['line-stacking-shift'] = false; // default: consider-shifts
  whiteList['line-stacking-strategy'] = false; // default: inline-line-height
  whiteList['list-style'] = true; // default: depending on individual properties
  whiteList['list-style-image'] = true; // default: none
  whiteList['list-style-position'] = true; // default: outside
  whiteList['list-style-type'] = true; // default: disc
  whiteList['margin'] = true; // default: depending on individual properties
  whiteList['margin-bottom'] = true; // default: 0
  whiteList['margin-left'] = true; // default: 0
  whiteList['margin-right'] = true; // default: 0
  whiteList['margin-top'] = true; // default: 0
  whiteList['marker-offset'] = false; // default: auto
  whiteList['marker-side'] = false; // default: list-item
  whiteList['marks'] = false; // default: none
  whiteList['mask'] = false; // default: border-box
  whiteList['mask-box'] = false; // default: see individual properties
  whiteList['mask-box-outset'] = false; // default: 0
  whiteList['mask-box-repeat'] = false; // default: stretch
  whiteList['mask-box-slice'] = false; // default: 0 fill
  whiteList['mask-box-source'] = false; // default: none
  whiteList['mask-box-width'] = false; // default: auto
  whiteList['mask-clip'] = false; // default: border-box
  whiteList['mask-image'] = false; // default: none
  whiteList['mask-origin'] = false; // default: border-box
  whiteList['mask-position'] = false; // default: center
  whiteList['mask-repeat'] = false; // default: no-repeat
  whiteList['mask-size'] = false; // default: border-box
  whiteList['mask-source-type'] = false; // default: auto
  whiteList['mask-type'] = false; // default: luminance
  whiteList['max-height'] = true; // default: none
  whiteList['max-lines'] = false; // default: none
  whiteList['max-width'] = true; // default: none
  whiteList['min-height'] = true; // default: 0
  whiteList['min-width'] = true; // default: 0
  whiteList['move-to'] = false; // default: normal
  whiteList['nav-down'] = false; // default: auto
  whiteList['nav-index'] = false; // default: auto
  whiteList['nav-left'] = false; // default: auto
  whiteList['nav-right'] = false; // default: auto
  whiteList['nav-up'] = false; // default: auto
  whiteList['object-fit'] = false; // default: fill
  whiteList['object-position'] = false; // default: 50% 50%
  whiteList['opacity'] = false; // default: 1
  whiteList['order'] = false; // default: 0
  whiteList['orphans'] = false; // default: 2
  whiteList['outline'] = false; // default: depending on individual properties
  whiteList['outline-color'] = false; // default: invert
  whiteList['outline-offset'] = false; // default: 0
  whiteList['outline-style'] = false; // default: none
  whiteList['outline-width'] = false; // default: medium
  whiteList['overflow'] = false; // default: depending on individual properties
  whiteList['overflow-wrap'] = false; // default: normal
  whiteList['overflow-x'] = false; // default: visible
  whiteList['overflow-y'] = false; // default: visible
  whiteList['padding'] = true; // default: depending on individual properties
  whiteList['padding-bottom'] = true; // default: 0
  whiteList['padding-left'] = true; // default: 0
  whiteList['padding-right'] = true; // default: 0
  whiteList['padding-top'] = true; // default: 0
  whiteList['page'] = false; // default: auto
  whiteList['page-break-after'] = false; // default: auto
  whiteList['page-break-before'] = false; // default: auto
  whiteList['page-break-inside'] = false; // default: auto
  whiteList['page-policy'] = false; // default: start
  whiteList['pause'] = false; // default: implementation dependent
  whiteList['pause-after'] = false; // default: implementation dependent
  whiteList['pause-before'] = false; // default: implementation dependent
  whiteList['perspective'] = false; // default: none
  whiteList['perspective-origin'] = false; // default: 50% 50%
  whiteList['pitch'] = false; // default: medium
  whiteList['pitch-range'] = false; // default: 50
  whiteList['play-during'] = false; // default: auto
  whiteList['position'] = false; // default: static
  whiteList['presentation-level'] = false; // default: 0
  whiteList['quotes'] = false; // default: text
  whiteList['region-fragment'] = false; // default: auto
  whiteList['resize'] = false; // default: none
  whiteList['rest'] = false; // default: depending on individual properties
  whiteList['rest-after'] = false; // default: none
  whiteList['rest-before'] = false; // default: none
  whiteList['richness'] = false; // default: 50
  whiteList['right'] = false; // default: auto
  whiteList['rotation'] = false; // default: 0
  whiteList['rotation-point'] = false; // default: 50% 50%
  whiteList['ruby-align'] = false; // default: auto
  whiteList['ruby-merge'] = false; // default: separate
  whiteList['ruby-position'] = false; // default: before
  whiteList['shape-image-threshold'] = false; // default: 0.0
  whiteList['shape-outside'] = false; // default: none
  whiteList['shape-margin'] = false; // default: 0
  whiteList['size'] = false; // default: auto
  whiteList['speak'] = false; // default: auto
  whiteList['speak-as'] = false; // default: normal
  whiteList['speak-header'] = false; // default: once
  whiteList['speak-numeral'] = false; // default: continuous
  whiteList['speak-punctuation'] = false; // default: none
  whiteList['speech-rate'] = false; // default: medium
  whiteList['stress'] = false; // default: 50
  whiteList['string-set'] = false; // default: none
  whiteList['tab-size'] = false; // default: 8
  whiteList['table-layout'] = false; // default: auto
  whiteList['text-align'] = true; // default: start
  whiteList['text-align-last'] = true; // default: auto
  whiteList['text-combine-upright'] = true; // default: none
  whiteList['text-decoration'] = true; // default: none
  whiteList['text-decoration-color'] = true; // default: currentColor
  whiteList['text-decoration-line'] = true; // default: none
  whiteList['text-decoration-skip'] = true; // default: objects
  whiteList['text-decoration-style'] = true; // default: solid
  whiteList['text-emphasis'] = true; // default: depending on individual properties
  whiteList['text-emphasis-color'] = true; // default: currentColor
  whiteList['text-emphasis-position'] = true; // default: over right
  whiteList['text-emphasis-style'] = true; // default: none
  whiteList['text-height'] = true; // default: auto
  whiteList['text-indent'] = true; // default: 0
  whiteList['text-justify'] = true; // default: auto
  whiteList['text-orientation'] = true; // default: mixed
  whiteList['text-overflow'] = true; // default: clip
  whiteList['text-shadow'] = true; // default: none
  whiteList['text-space-collapse'] = true; // default: collapse
  whiteList['text-transform'] = true; // default: none
  whiteList['text-underline-position'] = true; // default: auto
  whiteList['text-wrap'] = true; // default: normal
  whiteList['top'] = false; // default: auto
  whiteList['transform'] = false; // default: none
  whiteList['transform-origin'] = false; // default: 50% 50% 0
  whiteList['transform-style'] = false; // default: flat
  whiteList['transition'] = false; // default: depending on individual properties
  whiteList['transition-delay'] = false; // default: 0s
  whiteList['transition-duration'] = false; // default: 0s
  whiteList['transition-property'] = false; // default: all
  whiteList['transition-timing-function'] = false; // default: ease
  whiteList['unicode-bidi'] = false; // default: normal
  whiteList['vertical-align'] = false; // default: baseline
  whiteList['visibility'] = false; // default: visible
  whiteList['voice-balance'] = false; // default: center
  whiteList['voice-duration'] = false; // default: auto
  whiteList['voice-family'] = false; // default: implementation dependent
  whiteList['voice-pitch'] = false; // default: medium
  whiteList['voice-range'] = false; // default: medium
  whiteList['voice-rate'] = false; // default: normal
  whiteList['voice-stress'] = false; // default: normal
  whiteList['voice-volume'] = false; // default: medium
  whiteList['volume'] = false; // default: medium
  whiteList['white-space'] = false; // default: normal
  whiteList['widows'] = false; // default: 2
  whiteList['width'] = true; // default: auto
  whiteList['will-change'] = false; // default: auto
  whiteList['word-break'] = true; // default: normal
  whiteList['word-spacing'] = true; // default: normal
  whiteList['word-wrap'] = true; // default: normal
  whiteList['wrap-flow'] = false; // default: auto
  whiteList['wrap-through'] = false; // default: wrap
  whiteList['writing-mode'] = false; // default: horizontal-tb
  whiteList['z-index'] = false; // default: auto

  return whiteList;
}


/**
 * 匹配到白名单上的一个属性时
 *
 * @param {String} name
 * @param {String} value
 * @param {Object} options
 * @return {String}
 */
function onAttr (name, value, options) {
  // do nothing
}

/**
 * 匹配到不在白名单上的一个属性时
 *
 * @param {String} name
 * @param {String} value
 * @param {Object} options
 * @return {String}
 */
function onIgnoreAttr (name, value, options) {
  // do nothing
}

var REGEXP_URL_JAVASCRIPT = /javascript\s*\:/img;

/**
 * 过滤属性值
 *
 * @param {String} name
 * @param {String} value
 * @return {String}
 */
function safeAttrValue$1(name, value) {
  if (REGEXP_URL_JAVASCRIPT.test(value)) return '';
  return value;
}


_default.whiteList = getDefaultWhiteList$1();
_default.getDefaultWhiteList = getDefaultWhiteList$1;
_default.onAttr = onAttr;
_default.onIgnoreAttr = onIgnoreAttr;
_default.safeAttrValue = safeAttrValue$1;

var util$1 = {
  indexOf: function (arr, item) {
    var i, j;
    if (Array.prototype.indexOf) {
      return arr.indexOf(item);
    }
    for (i = 0, j = arr.length; i < j; i++) {
      if (arr[i] === item) {
        return i;
      }
    }
    return -1;
  },
  forEach: function (arr, fn, scope) {
    var i, j;
    if (Array.prototype.forEach) {
      return arr.forEach(fn, scope);
    }
    for (i = 0, j = arr.length; i < j; i++) {
      fn.call(scope, arr[i], i, arr);
    }
  },
  trim: function (str) {
    if (String.prototype.trim) {
      return str.trim();
    }
    return str.replace(/(^\s*)|(\s*$)/g, '');
  },
  trimRight: function (str) {
    if (String.prototype.trimRight) {
      return str.trimRight();
    }
    return str.replace(/(\s*$)/g, '');
  }
};

/**
 * cssfilter
 *
 * @author 老雷<leizongmin@gmail.com>
 */

var _$3 = util$1;


/**
 * 解析style
 *
 * @param {String} css
 * @param {Function} onAttr 处理属性的函数
 *   参数格式： function (sourcePosition, position, name, value, source)
 * @return {String}
 */
function parseStyle$1 (css, onAttr) {
  css = _$3.trimRight(css);
  if (css[css.length - 1] !== ';') css += ';';
  var cssLength = css.length;
  var isParenthesisOpen = false;
  var lastPos = 0;
  var i = 0;
  var retCSS = '';

  function addNewAttr () {
    // 如果没有正常的闭合圆括号，则直接忽略当前属性
    if (!isParenthesisOpen) {
      var source = _$3.trim(css.slice(lastPos, i));
      var j = source.indexOf(':');
      if (j !== -1) {
        var name = _$3.trim(source.slice(0, j));
        var value = _$3.trim(source.slice(j + 1));
        // 必须有属性名称
        if (name) {
          var ret = onAttr(lastPos, retCSS.length, name, value, source);
          if (ret) retCSS += ret + '; ';
        }
      }
    }
    lastPos = i + 1;
  }

  for (; i < cssLength; i++) {
    var c = css[i];
    if (c === '/' && css[i + 1] === '*') {
      // 备注开始
      var j = css.indexOf('*/', i + 2);
      // 如果没有正常的备注结束，则后面的部分全部跳过
      if (j === -1) break;
      // 直接将当前位置调到备注结尾，并且初始化状态
      i = j + 1;
      lastPos = i + 1;
      isParenthesisOpen = false;
    } else if (c === '(') {
      isParenthesisOpen = true;
    } else if (c === ')') {
      isParenthesisOpen = false;
    } else if (c === ';') {
      if (isParenthesisOpen) ; else {
        addNewAttr();
      }
    } else if (c === '\n') {
      addNewAttr();
    }
  }

  return _$3.trim(retCSS);
}

var parser$2 = parseStyle$1;

/**
 * cssfilter
 *
 * @author 老雷<leizongmin@gmail.com>
 */

var DEFAULT$1 = _default;
var parseStyle = parser$2;


/**
 * 返回值是否为空
 *
 * @param {Object} obj
 * @return {Boolean}
 */
function isNull$1 (obj) {
  return (obj === undefined || obj === null);
}

/**
 * 浅拷贝对象
 *
 * @param {Object} obj
 * @return {Object}
 */
function shallowCopyObject$1 (obj) {
  var ret = {};
  for (var i in obj) {
    ret[i] = obj[i];
  }
  return ret;
}

/**
 * 创建CSS过滤器
 *
 * @param {Object} options
 *   - {Object} whiteList
 *   - {Function} onAttr
 *   - {Function} onIgnoreAttr
 *   - {Function} safeAttrValue
 */
function FilterCSS$2 (options) {
  options = shallowCopyObject$1(options || {});
  options.whiteList = options.whiteList || DEFAULT$1.whiteList;
  options.onAttr = options.onAttr || DEFAULT$1.onAttr;
  options.onIgnoreAttr = options.onIgnoreAttr || DEFAULT$1.onIgnoreAttr;
  options.safeAttrValue = options.safeAttrValue || DEFAULT$1.safeAttrValue;
  this.options = options;
}

FilterCSS$2.prototype.process = function (css) {
  // 兼容各种奇葩输入
  css = css || '';
  css = css.toString();
  if (!css) return '';

  var me = this;
  var options = me.options;
  var whiteList = options.whiteList;
  var onAttr = options.onAttr;
  var onIgnoreAttr = options.onIgnoreAttr;
  var safeAttrValue = options.safeAttrValue;

  var retCSS = parseStyle(css, function (sourcePosition, position, name, value, source) {

    var check = whiteList[name];
    var isWhite = false;
    if (check === true) isWhite = check;
    else if (typeof check === 'function') isWhite = check(value);
    else if (check instanceof RegExp) isWhite = check.test(value);
    if (isWhite !== true) isWhite = false;

    // 如果过滤后 value 为空则直接忽略
    value = safeAttrValue(name, value);
    if (!value) return;

    var opts = {
      position: position,
      sourcePosition: sourcePosition,
      source: source,
      isWhite: isWhite
    };

    if (isWhite) {

      var ret = onAttr(name, value, opts);
      if (isNull$1(ret)) {
        return name + ':' + value;
      } else {
        return ret;
      }

    } else {

      var ret = onIgnoreAttr(name, value, opts);
      if (!isNull$1(ret)) {
        return ret;
      }

    }
  });

  return retCSS;
};


var css = FilterCSS$2;

/**
 * cssfilter
 *
 * @author 老雷<leizongmin@gmail.com>
 */

(function (module, exports) {
var DEFAULT = _default;
var FilterCSS = css;


/**
 * XSS过滤
 *
 * @param {String} css 要过滤的CSS代码
 * @param {Object} options 选项：whiteList, onAttr, onIgnoreAttr
 * @return {String}
 */
function filterCSS (html, options) {
  var xss = new FilterCSS(options);
  return xss.process(html);
}


// 输出
exports = module.exports = filterCSS;
exports.FilterCSS = FilterCSS;
for (var i in DEFAULT) exports[i] = DEFAULT[i];
}(lib, lib.exports));

var util = {
  indexOf: function (arr, item) {
    var i, j;
    if (Array.prototype.indexOf) {
      return arr.indexOf(item);
    }
    for (i = 0, j = arr.length; i < j; i++) {
      if (arr[i] === item) {
        return i;
      }
    }
    return -1;
  },
  forEach: function (arr, fn, scope) {
    var i, j;
    if (Array.prototype.forEach) {
      return arr.forEach(fn, scope);
    }
    for (i = 0, j = arr.length; i < j; i++) {
      fn.call(scope, arr[i], i, arr);
    }
  },
  trim: function (str) {
    if (String.prototype.trim) {
      return str.trim();
    }
    return str.replace(/(^\s*)|(\s*$)/g, "");
  },
  spaceIndex: function (str) {
    var reg = /\s|\n|\t/;
    var match = reg.exec(str);
    return match ? match.index : -1;
  },
};

/**
 * default settings
 *
 * @author Zongmin Lei<leizongmin@gmail.com>
 */

var FilterCSS$1 = lib.exports.FilterCSS;
var getDefaultCSSWhiteList = lib.exports.getDefaultWhiteList;
var _$2 = util;

function getDefaultWhiteList() {
  return {
    a: ["target", "href", "title"],
    abbr: ["title"],
    address: [],
    area: ["shape", "coords", "href", "alt"],
    article: [],
    aside: [],
    audio: [
      "autoplay",
      "controls",
      "crossorigin",
      "loop",
      "muted",
      "preload",
      "src",
    ],
    b: [],
    bdi: ["dir"],
    bdo: ["dir"],
    big: [],
    blockquote: ["cite"],
    br: [],
    caption: [],
    center: [],
    cite: [],
    code: [],
    col: ["align", "valign", "span", "width"],
    colgroup: ["align", "valign", "span", "width"],
    dd: [],
    del: ["datetime"],
    details: ["open"],
    div: [],
    dl: [],
    dt: [],
    em: [],
    figcaption: [],
    figure: [],
    font: ["color", "size", "face"],
    footer: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    header: [],
    hr: [],
    i: [],
    img: ["src", "alt", "title", "width", "height"],
    ins: ["datetime"],
    li: [],
    mark: [],
    nav: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    section: [],
    small: [],
    span: [],
    sub: [],
    summary: [],
    sup: [],
    strong: [],
    strike: [],
    table: ["width", "border", "align", "valign"],
    tbody: ["align", "valign"],
    td: ["width", "rowspan", "colspan", "align", "valign"],
    tfoot: ["align", "valign"],
    th: ["width", "rowspan", "colspan", "align", "valign"],
    thead: ["align", "valign"],
    tr: ["rowspan", "align", "valign"],
    tt: [],
    u: [],
    ul: [],
    video: [
      "autoplay",
      "controls",
      "crossorigin",
      "loop",
      "muted",
      "playsinline",
      "poster",
      "preload",
      "src",
      "height",
      "width",
    ],
  };
}

var defaultCSSFilter = new FilterCSS$1();

/**
 * default onTag function
 *
 * @param {String} tag
 * @param {String} html
 * @param {Object} options
 * @return {String}
 */
function onTag(tag, html, options) {
  // do nothing
}

/**
 * default onIgnoreTag function
 *
 * @param {String} tag
 * @param {String} html
 * @param {Object} options
 * @return {String}
 */
function onIgnoreTag(tag, html, options) {
  // do nothing
}

/**
 * default onTagAttr function
 *
 * @param {String} tag
 * @param {String} name
 * @param {String} value
 * @return {String}
 */
function onTagAttr(tag, name, value) {
  // do nothing
}

/**
 * default onIgnoreTagAttr function
 *
 * @param {String} tag
 * @param {String} name
 * @param {String} value
 * @return {String}
 */
function onIgnoreTagAttr(tag, name, value) {
  // do nothing
}

/**
 * default escapeHtml function
 *
 * @param {String} html
 */
function escapeHtml(html) {
  return html.replace(REGEXP_LT, "&lt;").replace(REGEXP_GT, "&gt;");
}

/**
 * default safeAttrValue function
 *
 * @param {String} tag
 * @param {String} name
 * @param {String} value
 * @param {Object} cssFilter
 * @return {String}
 */
function safeAttrValue(tag, name, value, cssFilter) {
  // unescape attribute value firstly
  value = friendlyAttrValue(value);

  if (name === "href" || name === "src") {
    // filter `href` and `src` attribute
    // only allow the value that starts with `http://` | `https://` | `mailto:` | `/` | `#`
    value = _$2.trim(value);
    if (value === "#") return "#";
    if (
      !(
        value.substr(0, 7) === "http://" ||
        value.substr(0, 8) === "https://" ||
        value.substr(0, 7) === "mailto:" ||
        value.substr(0, 4) === "tel:" ||
        value.substr(0, 11) === "data:image/" ||
        value.substr(0, 6) === "ftp://" ||
        value.substr(0, 2) === "./" ||
        value.substr(0, 3) === "../" ||
        value[0] === "#" ||
        value[0] === "/"
      )
    ) {
      return "";
    }
  } else if (name === "background") {
    // filter `background` attribute (maybe no use)
    // `javascript:`
    REGEXP_DEFAULT_ON_TAG_ATTR_4.lastIndex = 0;
    if (REGEXP_DEFAULT_ON_TAG_ATTR_4.test(value)) {
      return "";
    }
  } else if (name === "style") {
    // `expression()`
    REGEXP_DEFAULT_ON_TAG_ATTR_7.lastIndex = 0;
    if (REGEXP_DEFAULT_ON_TAG_ATTR_7.test(value)) {
      return "";
    }
    // `url()`
    REGEXP_DEFAULT_ON_TAG_ATTR_8.lastIndex = 0;
    if (REGEXP_DEFAULT_ON_TAG_ATTR_8.test(value)) {
      REGEXP_DEFAULT_ON_TAG_ATTR_4.lastIndex = 0;
      if (REGEXP_DEFAULT_ON_TAG_ATTR_4.test(value)) {
        return "";
      }
    }
    if (cssFilter !== false) {
      cssFilter = cssFilter || defaultCSSFilter;
      value = cssFilter.process(value);
    }
  }

  // escape `<>"` before returns
  value = escapeAttrValue(value);
  return value;
}

// RegExp list
var REGEXP_LT = /</g;
var REGEXP_GT = />/g;
var REGEXP_QUOTE = /"/g;
var REGEXP_QUOTE_2 = /&quot;/g;
var REGEXP_ATTR_VALUE_1 = /&#([a-zA-Z0-9]*);?/gim;
var REGEXP_ATTR_VALUE_COLON = /&colon;?/gim;
var REGEXP_ATTR_VALUE_NEWLINE = /&newline;?/gim;
var REGEXP_DEFAULT_ON_TAG_ATTR_4 =
  /((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a)\:/gi;
var REGEXP_DEFAULT_ON_TAG_ATTR_7 =
  /e\s*x\s*p\s*r\s*e\s*s\s*s\s*i\s*o\s*n\s*\(.*/gi;
var REGEXP_DEFAULT_ON_TAG_ATTR_8 = /u\s*r\s*l\s*\(.*/gi;

/**
 * escape double quote
 *
 * @param {String} str
 * @return {String} str
 */
function escapeQuote(str) {
  return str.replace(REGEXP_QUOTE, "&quot;");
}

/**
 * unescape double quote
 *
 * @param {String} str
 * @return {String} str
 */
function unescapeQuote(str) {
  return str.replace(REGEXP_QUOTE_2, '"');
}

/**
 * escape html entities
 *
 * @param {String} str
 * @return {String}
 */
function escapeHtmlEntities(str) {
  return str.replace(REGEXP_ATTR_VALUE_1, function replaceUnicode(str, code) {
    return code[0] === "x" || code[0] === "X"
      ? String.fromCharCode(parseInt(code.substr(1), 16))
      : String.fromCharCode(parseInt(code, 10));
  });
}

/**
 * escape html5 new danger entities
 *
 * @param {String} str
 * @return {String}
 */
function escapeDangerHtml5Entities(str) {
  return str
    .replace(REGEXP_ATTR_VALUE_COLON, ":")
    .replace(REGEXP_ATTR_VALUE_NEWLINE, " ");
}

/**
 * clear nonprintable characters
 *
 * @param {String} str
 * @return {String}
 */
function clearNonPrintableCharacter(str) {
  var str2 = "";
  for (var i = 0, len = str.length; i < len; i++) {
    str2 += str.charCodeAt(i) < 32 ? " " : str.charAt(i);
  }
  return _$2.trim(str2);
}

/**
 * get friendly attribute value
 *
 * @param {String} str
 * @return {String}
 */
function friendlyAttrValue(str) {
  str = unescapeQuote(str);
  str = escapeHtmlEntities(str);
  str = escapeDangerHtml5Entities(str);
  str = clearNonPrintableCharacter(str);
  return str;
}

/**
 * unescape attribute value
 *
 * @param {String} str
 * @return {String}
 */
function escapeAttrValue(str) {
  str = escapeQuote(str);
  str = escapeHtml(str);
  return str;
}

/**
 * `onIgnoreTag` function for removing all the tags that are not in whitelist
 */
function onIgnoreTagStripAll() {
  return "";
}

/**
 * remove tag body
 * specify a `tags` list, if the tag is not in the `tags` list then process by the specify function (optional)
 *
 * @param {array} tags
 * @param {function} next
 */
function StripTagBody(tags, next) {
  if (typeof next !== "function") {
    next = function () {};
  }

  var isRemoveAllTag = !Array.isArray(tags);
  function isRemoveTag(tag) {
    if (isRemoveAllTag) return true;
    return _$2.indexOf(tags, tag) !== -1;
  }

  var removeList = [];
  var posStart = false;

  return {
    onIgnoreTag: function (tag, html, options) {
      if (isRemoveTag(tag)) {
        if (options.isClosing) {
          var ret = "[/removed]";
          var end = options.position + ret.length;
          removeList.push([
            posStart !== false ? posStart : options.position,
            end,
          ]);
          posStart = false;
          return ret;
        } else {
          if (!posStart) {
            posStart = options.position;
          }
          return "[removed]";
        }
      } else {
        return next(tag, html, options);
      }
    },
    remove: function (html) {
      var rethtml = "";
      var lastPos = 0;
      _$2.forEach(removeList, function (pos) {
        rethtml += html.slice(lastPos, pos[0]);
        lastPos = pos[1];
      });
      rethtml += html.slice(lastPos);
      return rethtml;
    },
  };
}

/**
 * remove html comments
 *
 * @param {String} html
 * @return {String}
 */
function stripCommentTag(html) {
  var retHtml = "";
  var lastPos = 0;
  while (lastPos < html.length) {
    var i = html.indexOf("<!--", lastPos);
    if (i === -1) {
      retHtml += html.slice(lastPos);
      break;
    }
    retHtml += html.slice(lastPos, i);
    var j = html.indexOf("-->", i);
    if (j === -1) {
      break;
    }
    lastPos = j + 3;
  }
  return retHtml;
}

/**
 * remove invisible characters
 *
 * @param {String} html
 * @return {String}
 */
function stripBlankChar(html) {
  var chars = html.split("");
  chars = chars.filter(function (char) {
    var c = char.charCodeAt(0);
    if (c === 127) return false;
    if (c <= 31) {
      if (c === 10 || c === 13) return true;
      return false;
    }
    return true;
  });
  return chars.join("");
}

_default$1.whiteList = getDefaultWhiteList();
_default$1.getDefaultWhiteList = getDefaultWhiteList;
_default$1.onTag = onTag;
_default$1.onIgnoreTag = onIgnoreTag;
_default$1.onTagAttr = onTagAttr;
_default$1.onIgnoreTagAttr = onIgnoreTagAttr;
_default$1.safeAttrValue = safeAttrValue;
_default$1.escapeHtml = escapeHtml;
_default$1.escapeQuote = escapeQuote;
_default$1.unescapeQuote = unescapeQuote;
_default$1.escapeHtmlEntities = escapeHtmlEntities;
_default$1.escapeDangerHtml5Entities = escapeDangerHtml5Entities;
_default$1.clearNonPrintableCharacter = clearNonPrintableCharacter;
_default$1.friendlyAttrValue = friendlyAttrValue;
_default$1.escapeAttrValue = escapeAttrValue;
_default$1.onIgnoreTagStripAll = onIgnoreTagStripAll;
_default$1.StripTagBody = StripTagBody;
_default$1.stripCommentTag = stripCommentTag;
_default$1.stripBlankChar = stripBlankChar;
_default$1.cssFilter = defaultCSSFilter;
_default$1.getDefaultCSSWhiteList = getDefaultCSSWhiteList;

var parser$1 = {};

/**
 * Simple HTML Parser
 *
 * @author Zongmin Lei<leizongmin@gmail.com>
 */

var _$1 = util;

/**
 * get tag name
 *
 * @param {String} html e.g. '<a hef="#">'
 * @return {String}
 */
function getTagName(html) {
  var i = _$1.spaceIndex(html);
  if (i === -1) {
    var tagName = html.slice(1, -1);
  } else {
    var tagName = html.slice(1, i + 1);
  }
  tagName = _$1.trim(tagName).toLowerCase();
  if (tagName.slice(0, 1) === "/") tagName = tagName.slice(1);
  if (tagName.slice(-1) === "/") tagName = tagName.slice(0, -1);
  return tagName;
}

/**
 * is close tag?
 *
 * @param {String} html 如：'<a hef="#">'
 * @return {Boolean}
 */
function isClosing(html) {
  return html.slice(0, 2) === "</";
}

/**
 * parse input html and returns processed html
 *
 * @param {String} html
 * @param {Function} onTag e.g. function (sourcePosition, position, tag, html, isClosing)
 * @param {Function} escapeHtml
 * @return {String}
 */
function parseTag$1(html, onTag, escapeHtml) {

  var rethtml = "";
  var lastPos = 0;
  var tagStart = false;
  var quoteStart = false;
  var currentPos = 0;
  var len = html.length;
  var currentTagName = "";
  var currentHtml = "";

  chariterator: for (currentPos = 0; currentPos < len; currentPos++) {
    var c = html.charAt(currentPos);
    if (tagStart === false) {
      if (c === "<") {
        tagStart = currentPos;
        continue;
      }
    } else {
      if (quoteStart === false) {
        if (c === "<") {
          rethtml += escapeHtml(html.slice(lastPos, currentPos));
          tagStart = currentPos;
          lastPos = currentPos;
          continue;
        }
        if (c === ">") {
          rethtml += escapeHtml(html.slice(lastPos, tagStart));
          currentHtml = html.slice(tagStart, currentPos + 1);
          currentTagName = getTagName(currentHtml);
          rethtml += onTag(
            tagStart,
            rethtml.length,
            currentTagName,
            currentHtml,
            isClosing(currentHtml)
          );
          lastPos = currentPos + 1;
          tagStart = false;
          continue;
        }
        if (c === '"' || c === "'") {
          var i = 1;
          var ic = html.charAt(currentPos - i);

          while (ic.trim() === "" || ic === "=") {
            if (ic === "=") {
              quoteStart = c;
              continue chariterator;
            }
            ic = html.charAt(currentPos - ++i);
          }
        }
      } else {
        if (c === quoteStart) {
          quoteStart = false;
          continue;
        }
      }
    }
  }
  if (lastPos < html.length) {
    rethtml += escapeHtml(html.substr(lastPos));
  }

  return rethtml;
}

var REGEXP_ILLEGAL_ATTR_NAME = /[^a-zA-Z0-9_:\.\-]/gim;

/**
 * parse input attributes and returns processed attributes
 *
 * @param {String} html e.g. `href="#" target="_blank"`
 * @param {Function} onAttr e.g. `function (name, value)`
 * @return {String}
 */
function parseAttr$1(html, onAttr) {

  var lastPos = 0;
  var retAttrs = [];
  var tmpName = false;
  var len = html.length;

  function addAttr(name, value) {
    name = _$1.trim(name);
    name = name.replace(REGEXP_ILLEGAL_ATTR_NAME, "").toLowerCase();
    if (name.length < 1) return;
    var ret = onAttr(name, value || "");
    if (ret) retAttrs.push(ret);
  }

  // 逐个分析字符
  for (var i = 0; i < len; i++) {
    var c = html.charAt(i);
    var v, j;
    if (tmpName === false && c === "=") {
      tmpName = html.slice(lastPos, i);
      lastPos = i + 1;
      continue;
    }
    if (tmpName !== false) {
      if (
        i === lastPos &&
        (c === '"' || c === "'") &&
        html.charAt(i - 1) === "="
      ) {
        j = html.indexOf(c, i + 1);
        if (j === -1) {
          break;
        } else {
          v = _$1.trim(html.slice(lastPos + 1, j));
          addAttr(tmpName, v);
          tmpName = false;
          i = j;
          lastPos = i + 1;
          continue;
        }
      }
    }
    if (/\s|\n|\t/.test(c)) {
      html = html.replace(/\s|\n|\t/g, " ");
      if (tmpName === false) {
        j = findNextEqual(html, i);
        if (j === -1) {
          v = _$1.trim(html.slice(lastPos, i));
          addAttr(v);
          tmpName = false;
          lastPos = i + 1;
          continue;
        } else {
          i = j - 1;
          continue;
        }
      } else {
        j = findBeforeEqual(html, i - 1);
        if (j === -1) {
          v = _$1.trim(html.slice(lastPos, i));
          v = stripQuoteWrap(v);
          addAttr(tmpName, v);
          tmpName = false;
          lastPos = i + 1;
          continue;
        } else {
          continue;
        }
      }
    }
  }

  if (lastPos < html.length) {
    if (tmpName === false) {
      addAttr(html.slice(lastPos));
    } else {
      addAttr(tmpName, stripQuoteWrap(_$1.trim(html.slice(lastPos))));
    }
  }

  return _$1.trim(retAttrs.join(" "));
}

function findNextEqual(str, i) {
  for (; i < str.length; i++) {
    var c = str[i];
    if (c === " ") continue;
    if (c === "=") return i;
    return -1;
  }
}

function findBeforeEqual(str, i) {
  for (; i > 0; i--) {
    var c = str[i];
    if (c === " ") continue;
    if (c === "=") return i;
    return -1;
  }
}

function isQuoteWrapString(text) {
  if (
    (text[0] === '"' && text[text.length - 1] === '"') ||
    (text[0] === "'" && text[text.length - 1] === "'")
  ) {
    return true;
  } else {
    return false;
  }
}

function stripQuoteWrap(text) {
  if (isQuoteWrapString(text)) {
    return text.substr(1, text.length - 2);
  } else {
    return text;
  }
}

parser$1.parseTag = parseTag$1;
parser$1.parseAttr = parseAttr$1;

/**
 * filter xss
 *
 * @author Zongmin Lei<leizongmin@gmail.com>
 */

var FilterCSS = lib.exports.FilterCSS;
var DEFAULT = _default$1;
var parser = parser$1;
var parseTag = parser.parseTag;
var parseAttr = parser.parseAttr;
var _ = util;

/**
 * returns `true` if the input value is `undefined` or `null`
 *
 * @param {Object} obj
 * @return {Boolean}
 */
function isNull(obj) {
  return obj === undefined || obj === null;
}

/**
 * get attributes for a tag
 *
 * @param {String} html
 * @return {Object}
 *   - {String} html
 *   - {Boolean} closing
 */
function getAttrs(html) {
  var i = _.spaceIndex(html);
  if (i === -1) {
    return {
      html: "",
      closing: html[html.length - 2] === "/",
    };
  }
  html = _.trim(html.slice(i + 1, -1));
  var isClosing = html[html.length - 1] === "/";
  if (isClosing) html = _.trim(html.slice(0, -1));
  return {
    html: html,
    closing: isClosing,
  };
}

/**
 * shallow copy
 *
 * @param {Object} obj
 * @return {Object}
 */
function shallowCopyObject(obj) {
  var ret = {};
  for (var i in obj) {
    ret[i] = obj[i];
  }
  return ret;
}

/**
 * FilterXSS class
 *
 * @param {Object} options
 *        whiteList, onTag, onTagAttr, onIgnoreTag,
 *        onIgnoreTagAttr, safeAttrValue, escapeHtml
 *        stripIgnoreTagBody, allowCommentTag, stripBlankChar
 *        css{whiteList, onAttr, onIgnoreAttr} `css=false` means don't use `cssfilter`
 */
function FilterXSS(options) {
  options = shallowCopyObject(options || {});

  if (options.stripIgnoreTag) {
    if (options.onIgnoreTag) {
      console.error(
        'Notes: cannot use these two options "stripIgnoreTag" and "onIgnoreTag" at the same time'
      );
    }
    options.onIgnoreTag = DEFAULT.onIgnoreTagStripAll;
  }

  options.whiteList = options.whiteList || DEFAULT.whiteList;
  options.onTag = options.onTag || DEFAULT.onTag;
  options.onTagAttr = options.onTagAttr || DEFAULT.onTagAttr;
  options.onIgnoreTag = options.onIgnoreTag || DEFAULT.onIgnoreTag;
  options.onIgnoreTagAttr = options.onIgnoreTagAttr || DEFAULT.onIgnoreTagAttr;
  options.safeAttrValue = options.safeAttrValue || DEFAULT.safeAttrValue;
  options.escapeHtml = options.escapeHtml || DEFAULT.escapeHtml;
  this.options = options;

  if (options.css === false) {
    this.cssFilter = false;
  } else {
    options.css = options.css || {};
    this.cssFilter = new FilterCSS(options.css);
  }
}

/**
 * start process and returns result
 *
 * @param {String} html
 * @return {String}
 */
FilterXSS.prototype.process = function (html) {
  // compatible with the input
  html = html || "";
  html = html.toString();
  if (!html) return "";

  var me = this;
  var options = me.options;
  var whiteList = options.whiteList;
  var onTag = options.onTag;
  var onIgnoreTag = options.onIgnoreTag;
  var onTagAttr = options.onTagAttr;
  var onIgnoreTagAttr = options.onIgnoreTagAttr;
  var safeAttrValue = options.safeAttrValue;
  var escapeHtml = options.escapeHtml;
  var cssFilter = me.cssFilter;

  // remove invisible characters
  if (options.stripBlankChar) {
    html = DEFAULT.stripBlankChar(html);
  }

  // remove html comments
  if (!options.allowCommentTag) {
    html = DEFAULT.stripCommentTag(html);
  }

  // if enable stripIgnoreTagBody
  var stripIgnoreTagBody = false;
  if (options.stripIgnoreTagBody) {
    var stripIgnoreTagBody = DEFAULT.StripTagBody(
      options.stripIgnoreTagBody,
      onIgnoreTag
    );
    onIgnoreTag = stripIgnoreTagBody.onIgnoreTag;
  }

  var retHtml = parseTag(
    html,
    function (sourcePosition, position, tag, html, isClosing) {
      var info = {
        sourcePosition: sourcePosition,
        position: position,
        isClosing: isClosing,
        isWhite: whiteList.hasOwnProperty(tag),
      };

      // call `onTag()`
      var ret = onTag(tag, html, info);
      if (!isNull(ret)) return ret;

      if (info.isWhite) {
        if (info.isClosing) {
          return "</" + tag + ">";
        }

        var attrs = getAttrs(html);
        var whiteAttrList = whiteList[tag];
        var attrsHtml = parseAttr(attrs.html, function (name, value) {
          // call `onTagAttr()`
          var isWhiteAttr = _.indexOf(whiteAttrList, name) !== -1;
          var ret = onTagAttr(tag, name, value, isWhiteAttr);
          if (!isNull(ret)) return ret;

          if (isWhiteAttr) {
            // call `safeAttrValue()`
            value = safeAttrValue(tag, name, value, cssFilter);
            if (value) {
              return name + '="' + value + '"';
            } else {
              return name;
            }
          } else {
            // call `onIgnoreTagAttr()`
            var ret = onIgnoreTagAttr(tag, name, value, isWhiteAttr);
            if (!isNull(ret)) return ret;
            return;
          }
        });

        // build new tag html
        var html = "<" + tag;
        if (attrsHtml) html += " " + attrsHtml;
        if (attrs.closing) html += " /";
        html += ">";
        return html;
      } else {
        // call `onIgnoreTag()`
        var ret = onIgnoreTag(tag, html, info);
        if (!isNull(ret)) return ret;
        return escapeHtml(html);
      }
    },
    escapeHtml
  );

  // if enable stripIgnoreTagBody
  if (stripIgnoreTagBody) {
    retHtml = stripIgnoreTagBody.remove(retHtml);
  }

  return retHtml;
};

var xss = FilterXSS;

/**
 * xss
 *
 * @author Zongmin Lei<leizongmin@gmail.com>
 */

(function (module, exports) {
var DEFAULT = _default$1;
var parser = parser$1;
var FilterXSS = xss;

/**
 * filter xss function
 *
 * @param {String} html
 * @param {Object} options { whiteList, onTag, onTagAttr, onIgnoreTag, onIgnoreTagAttr, safeAttrValue, escapeHtml }
 * @return {String}
 */
function filterXSS(html, options) {
  var xss = new FilterXSS(options);
  return xss.process(html);
}

exports = module.exports = filterXSS;
exports.filterXSS = filterXSS;
exports.FilterXSS = FilterXSS;
for (var i in DEFAULT) exports[i] = DEFAULT[i];
for (var i in parser) exports[i] = parser[i];

// using `xss` on the WebWorker, output `filterXSS` to the globals
function isWorkerEnv() {
  return (
    typeof self !== "undefined" &&
    typeof DedicatedWorkerGlobalScope !== "undefined" &&
    self instanceof DedicatedWorkerGlobalScope
  );
}
if (isWorkerEnv()) {
  self.filterXSS = module.exports;
}
}(lib$1, lib$1.exports));

/* Copyright (c) 2020 Environmental Systems Research Institute, Inc.
 * Apache-2.0
 *
 * js-xss
 * Copyright (c) 2012-2018 Zongmin Lei(雷宗民) <leizongmin@gmail.com>
 * http://ucdok.com
 * The MIT License, see
 * https://github.com/leizongmin/js-xss/blob/master/LICENSE for details
 *
 * Lodash/isPlainObject
 * Copyright (c) JS Foundation and other contributors <https://js.foundation/>
 * MIT License, see https://raw.githubusercontent.com/lodash/lodash/4.17.10-npm/LICENSE for details
 * */
/**
 * The Sanitizer Class
 *
 * @export
 * @class Sanitizer
 */
var Sanitizer = /** @class */ (function () {
    function Sanitizer(filterOptions, extendDefaults) {
        var _this = this;
        // Supported HTML Spec: https://doc.arcgis.com/en/arcgis-online/reference/supported-html.htm
        this.arcgisWhiteList = {
            a: ["href", "style", "target"],
            abbr: ["title"],
            audio: ["autoplay", "controls", "loop", "muted", "preload"],
            b: [],
            br: [],
            dd: ["style"],
            div: ["align", "style"],
            dl: ["style"],
            dt: ["style"],
            em: [],
            figcaption: ["style"],
            figure: ["style"],
            font: ["color", "face", "size", "style"],
            h1: ["style"],
            h2: ["style"],
            h3: ["style"],
            h4: ["style"],
            h5: ["style"],
            h6: ["style"],
            hr: [],
            i: [],
            img: ["alt", "border", "height", "src", "style", "width"],
            li: [],
            ol: [],
            p: ["style"],
            source: ["media", "src", "type"],
            span: ["style"],
            strong: [],
            sub: ["style"],
            sup: ["style"],
            table: ["border", "cellpadding", "cellspacing", "height", "style", "width"],
            tbody: [],
            tr: ["align", "height", "style", "valign"],
            td: [
                "align",
                "colspan",
                "height",
                "nowrap",
                "rowspan",
                "style",
                "valign",
                "width"
            ],
            th: [
                "align",
                "colspan",
                "height",
                "nowrap",
                "rowspan",
                "style",
                "valign",
                "width"
            ],
            u: [],
            ul: [],
            video: [
                "autoplay",
                "controls",
                "height",
                "loop",
                "muted",
                "poster",
                "preload",
                "width"
            ]
        };
        this.allowedProtocols = [
            "http",
            "https",
            "mailto",
            "iform",
            "tel",
            "flow",
            "lfmobile",
            "arcgis-navigator",
            "arcgis-appstudio-player",
            "arcgis-survey123",
            "arcgis-collector",
            "arcgis-workforce",
            "arcgis-explorer",
            "arcgis-trek2there",
            "arcgis-quickcapture",
            "mspbi",
            "comgooglemaps",
            "pdfefile",
            "pdfehttp",
            "pdfehttps",
            "boxapp",
            "boxemm",
            "awb",
            "awbs",
            "gropen",
            "radarscope"
        ];
        this.arcgisFilterOptions = {
            allowCommentTag: true,
            safeAttrValue: function (tag, name, value, cssFilter) {
                // Take over safe attribute filtering for `a` `href`, `img` `src`,
                // and `source` `src` attributes, otherwise pass onto the
                // default `XSS.safeAttrValue` method.
                if ((tag === "a" && name === "href") ||
                    ((tag === "img" || tag === "source") && name === "src")) {
                    return _this.sanitizeUrl(value);
                }
                return lib$1.exports.safeAttrValue(tag, name, value, cssFilter);
            }
        };
        var xssFilterOptions;
        if (filterOptions && !extendDefaults) {
            // Override the defaults
            xssFilterOptions = filterOptions;
        }
        else if (filterOptions && extendDefaults) {
            // Extend the defaults
            xssFilterOptions = Object.create(this.arcgisFilterOptions);
            Object.keys(filterOptions).forEach(function (key) {
                if (key === "whiteList") {
                    // Extend the whitelist by concatenating arrays
                    xssFilterOptions.whiteList = _this._extendObjectOfArrays([
                        _this.arcgisWhiteList,
                        filterOptions.whiteList || {}
                    ]);
                }
                else {
                    xssFilterOptions[key] = filterOptions[key];
                }
            });
        }
        else {
            // Only use the defaults
            xssFilterOptions = Object.create(this.arcgisFilterOptions);
            xssFilterOptions.whiteList = this.arcgisWhiteList;
        }
        this.xssFilterOptions = xssFilterOptions;
        // Make this readable to tests
        this._xssFilter = new lib$1.exports.FilterXSS(xssFilterOptions);
    }
    /**
     * Sanitizes value to remove invalid HTML tags.
     *
     * Note: If the value passed does not contain a valid JSON data type (String,
     * Number, JSON Object, Array, Boolean, or null), the value will be nullified.
     *
     * @param {any} value The value to sanitize.
     * @returns {any} The sanitized value.
     * @memberof Sanitizer
     */
    Sanitizer.prototype.sanitize = function (value, options) {
        if (options === void 0) { options = {}; }
        switch (typeof value) {
            case "number":
                if (isNaN(value) || !isFinite(value)) {
                    return null;
                }
                return value;
            case "boolean":
                return value;
            case "string":
                return this._xssFilter.process(value);
            case "object":
                return this._iterateOverObject(value, options);
            default:
                if (options.allowUndefined && typeof value === "undefined") {
                    return;
                }
                return null;
        }
    };
    /**
     * Sanitizes a URL string following the allowed protocols and sanitization rules.
     *
     * @param {string} value The URL to sanitize.
     * @returns {string} The sanitized URL.
     */
    Sanitizer.prototype.sanitizeUrl = function (value) {
        var protocol = this._trim(value.substring(0, value.indexOf(":")));
        if (!(value === "/" ||
            value === "#" ||
            value[0] === "#" ||
            this.allowedProtocols.indexOf(protocol.toLowerCase()) > -1)) {
            return "";
        }
        else {
            return lib$1.exports.escapeAttrValue(value);
        }
    };
    /**
     * Sanitizes an HTML attribute value.
     *
     * @param {string} tag The tagname of the HTML element.
     * @param {string} attribute The attribute name of the HTML element.
     * @param {string} value The raw value to be used for the HTML attribute value.
     * @param {XSS.ICSSFilter} [cssFilter] The CSS filter to be used.
     * @returns {string} The sanitized attribute value.
     * @memberof Sanitizer
     */
    Sanitizer.prototype.sanitizeHTMLAttribute = function (tag, attribute, value, cssFilter) {
        // use the custom safeAttrValue function if provided
        if (typeof this.xssFilterOptions.safeAttrValue === 'function') {
            // @ts-ignore safeAttrValue does handle undefined cssFilter
            return this.xssFilterOptions.safeAttrValue(tag, attribute, value, cssFilter);
        }
        // otherwise use the default
        // @ts-ignore safeAttrValue does handle undefined cssFilter
        return lib$1.exports.safeAttrValue(tag, attribute, value, cssFilter);
    };
    /**
     * Checks if a value only contains valid HTML.
     *
     * @param {any} value The value to validate.
     * @returns {boolean}
     * @memberof Sanitizer
     */
    Sanitizer.prototype.validate = function (value, options) {
        if (options === void 0) { options = {}; }
        var sanitized = this.sanitize(value, options);
        return {
            isValid: value === sanitized,
            sanitized: sanitized
        };
    };
    /**
     * Extends an object of arrays by by concatenating arrays of the same object
     * keys. If the if the previous key's value is not an array, the next key's
     * value will replace the previous key. This method is used for extending the
     * whiteList in the XSS filter options.
     *
     * @private
     * @param {Array<{}>} objects An array of objects.
     * @returns {{}} The extended object.
     * @memberof Sanitizer
     */
    Sanitizer.prototype._extendObjectOfArrays = function (objects) {
        var finalObj = {};
        objects.forEach(function (obj) {
            Object.keys(obj).forEach(function (key) {
                if (Array.isArray(obj[key]) && Array.isArray(finalObj[key])) {
                    finalObj[key] = finalObj[key].concat(obj[key]);
                }
                else {
                    finalObj[key] = obj[key];
                }
            });
        });
        return finalObj;
    };
    /**
     * Iterate over a plain object or array to deeply sanitize each value.
     *
     * @private
     * @param {object} obj The object to iterate over.
     * @returns {(object | null)} The sanitized object.
     * @memberof Sanitizer
     */
    Sanitizer.prototype._iterateOverObject = function (obj, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        try {
            var hasChanged_1 = false;
            var changedObj = void 0;
            if (Array.isArray(obj)) {
                changedObj = obj.reduce(function (prev, value) {
                    var validation = _this.validate(value, options);
                    if (validation.isValid) {
                        return prev.concat([value]);
                    }
                    else {
                        hasChanged_1 = true;
                        return prev.concat([validation.sanitized]);
                    }
                }, []);
            }
            else if (!lodash_isplainobject(obj)) {
                if (options.allowUndefined && typeof obj === "undefined") {
                    return;
                }
                return null;
            }
            else {
                var keys = Object.keys(obj);
                changedObj = keys.reduce(function (prev, key) {
                    var value = obj[key];
                    var validation = _this.validate(value, options);
                    if (validation.isValid) {
                        prev[key] = value;
                    }
                    else {
                        hasChanged_1 = true;
                        prev[key] = validation.sanitized;
                    }
                    return prev;
                }, {});
            }
            if (hasChanged_1) {
                return changedObj;
            }
            return obj;
        }
        catch (err) {
            return null;
        }
    };
    /**
     * Trim whitespace from the start and ends of a string.
     * @param {string} val The string to trim.
     * @returns {string} The trimmed string.
     */
    Sanitizer.prototype._trim = function (val) {
        // @ts-ignore This is used by Jest,
        // but TypeScript errors since it assumes `trim` is always available.
        return String.prototype.trim
            ? val.trim()
            : val.replace(/(^\s*)|(\s*$)/g, "");
    };
    return Sanitizer;
}());

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.22/esri/copyright.txt for details.
*/
function l$4(t){const n=t$5.acquire();for(let e=0;e<arguments.length;e++){const t=arguments[e],i=typeof t;if("string"===i)n.push(t);else if(Array.isArray(t))n.push.apply(n,t);else if("object"===i)for(const e in t)t[e]&&n.push(e);}const i=n.join(" ");return t$5.release(n),i}function g$1(t){const e="data-node-ref";this[t.getAttribute(e)]=t;}s$7.getLogger("esri.widgets.support.widgetUtils");const m$1=["dd","dl","dt","h1","h2","h3","h4","h5","h6","sub","sup",...["animate","animatetransform","circle","clippath","defs","ellipse","g","image","line","lineargradient","marker","mask","path","pattern","polygon","polyline","radialgradient","rect","stop","svg","switch","symbol","text","textpath","tspan","use"]],h$1=m$1.reduce(((t,e)=>(t[e]=[],t)),{}),v$1=["align","alink","alt","bgcolor","border","cellpadding","cellspacing","class","color","cols","colspan","coords","d","dir","face","height","hspace","ismap","lang","marginheight","marginwidth","multiple","nohref","noresize","noshade","nowrap","ref","rel","rev","rows","rowspan","scrolling","shape","span","summary","tabindex","title","usemap","valign","value","vlink","vspace","width"],L$1=new Sanitizer({whiteList:h$1,onTagAttr:(t,e,n)=>{const i=`${e}="${n}"`;if(v$1.includes(e))return i},stripIgnoreTag:!0,stripIgnoreTagBody:["script","style"]},!0);function b$2(){return getComputedStyle(document.body).getPropertyValue("--esri-calcite-theme-name").replace(/\s|'|"/g,"")}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.22/esri/copyright.txt for details.
*/
const t$3="http://www.w3.org/",r$4=`${t$3}2000/svg`,o$3=`${t$3}1999/xlink`;let i$3,l$3=[],n$4=(e,t)=>{let r={};return Object.keys(e).forEach((t=>{r[t]=e[t];})),t&&Object.keys(t).forEach((e=>{r[e]=t[e];})),r},s$5=(e,t)=>e.vnodeSelector===t.vnodeSelector&&(e.properties&&t.properties?e.properties.key===t.properties.key&&e.properties.bind===t.properties.bind:!e.properties&&!t.properties),p$4=e=>{if("string"!=typeof e)throw new Error("Style values must be strings")},d$5=(e,t,r)=>{if(""!==t.vnodeSelector)for(let o=r;o<e.length;o++)if(s$5(e[o],t))return o;return -1},a$2=(e,t,r,o)=>{let i=e[t];if(""===i.vnodeSelector)return;let l=i.properties;if(!(l?void 0===l.key?l.bind:l.key:void 0))for(let n=0;n<e.length;n++)if(n!==t){let t=e[n];if(s$5(t,i))throw new Error(`${r.vnodeSelector} had a ${i.vnodeSelector} child ${"added"===o?o:"removed"}, but there is now more than one. You must add unique key properties to make them distinguishable.`)}},f=e=>{if(e.properties){let t=e.properties.enterAnimation;t&&t(e.domNode,e.properties);}},c$1=[],u=!1,h=e=>{(e.children||[]).forEach(h),e.properties&&e.properties.afterRemoved&&e.properties.afterRemoved.apply(e.properties.bind||e.properties,[e.domNode]);},m=()=>{u=!1,c$1.forEach(h),c$1.length=0;},v=e=>{c$1.push(e),u||(u=!0,"undefined"!=typeof window&&"requestIdleCallback"in window?window.requestIdleCallback(m,{timeout:16}):setTimeout(m,16));},y=e=>{let t=e.domNode;if(e.properties){let r=e.properties.exitAnimation;if(r){t.style.pointerEvents="none";let o=()=>{t.parentNode&&(t.parentNode.removeChild(t),v(e));};return void r(t,o,e.properties)}}t.parentNode&&(t.parentNode.removeChild(t),v(e));},g=(t,i,l)=>{if(!i)return;let n=l.eventHandlerInterceptor,s=Object.keys(i),d=s.length;for(let a=0;a<d;a++){let d=s[a],f=i[d];if("className"===d)throw new Error('Property "className" is not supported, use "class".');if("class"===d)x$1(t,f,!0);else if("classes"===d){let e=Object.keys(f),r=e.length;for(let o=0;o<r;o++){let r=e[o];f[r]&&t.classList.add(r);}}else if("styles"===d){let e=Object.keys(f),r=e.length;for(let o=0;o<r;o++){let r=e[o],i=f[r];i&&(p$4(i),l.styleApplyer(t,r,i));}}else if("key"!==d&&null!=f){let s=typeof f;"function"===s?(0===d.lastIndexOf("on",0)&&(n&&(f=n(d,f,t,i)),"oninput"===d&&function(){let e=f;f=function(t){e.apply(this,[t]),t.target["oninput-value"]=t.target.value;};}()),t[d]=f):l.namespace===r$4?"href"===d?t.setAttributeNS(o$3,d,f):t.setAttribute(d,f):"string"===s&&"value"!==d?"innerHTML"===d?t[d]=L$1.sanitize(f):t.setAttribute(d,f):t[d]=f;}}},b$1=(e,t,r)=>{if(t)for(let o of t)w(o,e,void 0,r);},N$1=(e,t,r)=>{b$1(e,t.children,r),t.text&&(e.textContent=t.text),g(e,t.properties,r),t.properties&&t.properties.afterCreate&&t.properties.afterCreate.apply(t.properties.bind||t.properties,[e,r,t.vnodeSelector,t.properties,t.children]);},w=(e,t,o,i)=>{let l,s=0,p=e.vnodeSelector,d=t.ownerDocument;if(""===p)l=e.domNode=d.createTextNode(e.text),void 0!==o?t.insertBefore(l,o):t.appendChild(l);else {for(let a=0;a<=p.length;++a){let f=p.charAt(a);if(a===p.length||"."===f||"#"===f){let f=p.charAt(s-1),c=p.slice(s,a);"."===f?l.classList.add(c):"#"===f?l.id=c:("svg"===c&&(i=n$4(i,{namespace:r$4})),void 0!==i.namespace?l=e.domNode=d.createElementNS(i.namespace,c):(l=e.domNode=e.domNode||d.createElement(c),"input"===c&&e.properties&&void 0!==e.properties.type&&l.setAttribute("type",e.properties.type)),void 0!==o?t.insertBefore(l,o):l.parentNode!==t&&t.appendChild(l)),s=a+1;}}N$1(l,e,i);}},x$1=(e,t,r)=>{t&&t.split(" ").forEach((t=>{t&&e.classList.toggle(t,r);}));},k=(t,i,l,n)=>{if(!l)return;let s=!1,d=Object.keys(l),a=d.length;for(let f=0;f<a;f++){let a=d[f],c=l[a],u=i[a];if("class"===a)u!==c&&(x$1(t,u,!1),x$1(t,c,!0));else if("classes"===a){let e=t.classList,r=Object.keys(c),o=r.length;for(let t=0;t<o;t++){let o=r[t],i=!!c[o];i!==!!u[o]&&(s=!0,i?e.add(o):e.remove(o));}}else if("styles"===a){let e=Object.keys(c),r=e.length;for(let o=0;o<r;o++){let r=e[o],i=c[r];i!==u[r]&&(s=!0,i?(p$4(i),n.styleApplyer(t,r,i)):n.styleApplyer(t,r,""));}}else if(c||"string"!=typeof u||(c=""),"value"===a){let e=t[a];e!==c&&(t["oninput-value"]?e===t["oninput-value"]:c!==u)&&(t[a]=c,t["oninput-value"]=void 0),c!==u&&(s=!0);}else if(c!==u){let i=typeof c;"function"===i&&n.eventHandlerInterceptor||(n.namespace===r$4?"href"===a?t.setAttributeNS(o$3,a,c):t.setAttribute(a,c):"string"===i?"innerHTML"===a?t[a]=L$1.sanitize(c):"role"===a&&""===c?t.removeAttribute(a):t.setAttribute(a,c):t[a]!==c&&(t[a]=c),s=!0);}}return s},A=(e,t,r,o,n)=>{if(r===o)return !1;o=o||l$3;let p,c=(r=r||l$3).length,u=o.length,h=0,m=0,v=!1;for(;m<u;){let l=h<c?r[h]:void 0,u=o[m];if(void 0!==l&&s$5(l,u))v=i$3(l,u,n)||v,h++;else {let l=d$5(r,u,h+1);if(l>=0){for(p=h;p<l;p++)y(r[p]),a$2(r,p,e,"removed");v=i$3(r[l],u,n)||v,h=l+1;}else w(u,t,h<c?r[h].domNode:void 0,n),f(u),a$2(o,m,e,"added");}m++;}if(c>h)for(p=h;p<c;p++)y(r[p]),a$2(r,p,e,"removed");return v};i$3=(e,t,o)=>{let i=e.domNode,l=!1;if(e===t)return !1;let s=!1;if(""===t.vnodeSelector){if(t.text!==e.text){let e=i.ownerDocument.createTextNode(t.text);return i.parentNode.replaceChild(e,i),t.domNode=e,l=!0,l}t.domNode=i;}else 0===t.vnodeSelector.lastIndexOf("svg",0)&&(o=n$4(o,{namespace:r$4})),e.text!==t.text&&(s=!0,void 0===t.text?i.removeChild(i.firstChild):i.textContent=t.text),t.domNode=i,s=A(t,i,e.children,t.children,o)||s,s=k(i,e.properties,t.properties,o)||s,t.properties&&t.properties.afterUpdate&&t.properties.afterUpdate.apply(t.properties.bind||t.properties,[i,o,t.vnodeSelector,t.properties,t.children]);return s&&t.properties&&t.properties.updateAnimation&&t.properties.updateAnimation(i,t.properties,e.properties),l};let S=(e,t)=>({getLastRender:()=>e,update:r=>{if(e.vnodeSelector!==r.vnodeSelector)throw new Error("The selector for the root VNode may not be changed. (consider using dom.merge and add one extra level to the virtual DOM)");let o=e;e=r,i$3(o,r,t);},domNode:e.domNode});

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.22/esri/copyright.txt for details.
*/
const p$3={namespace:void 0,performanceLogger:()=>{},eventHandlerInterceptor:void 0,styleApplyer:(e,r,o)=>{"-"===r.charAt(0)?e.style.setProperty(r,o):e.style[r]=o;}};let d$4=r=>n$4(p$3,r),n$3={create:(e,t)=>(t=d$4(t),w(e,document.createElement("div"),void 0,t),S(e,t)),append:(e,t,p)=>(p=d$4(p),w(t,e,void 0,p),S(t,p)),insertBefore:(e,t,p)=>(p=d$4(p),w(t,e.parentNode,e,p),S(t,p)),merge:(e,r,p)=>(p=d$4(p),r.domNode=e,N$1(e,r,p),S(r,p)),replace:(e,t,p)=>(p=d$4(p),w(t,e.parentNode,e,p),e.parentNode.removeChild(e),S(t,p))};

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.22/esri/copyright.txt for details.
*/
const e$5={handleInterceptedEvent:(e,p,t,n)=>(e.scheduleRender(),p.properties[`on${n.type}`].apply(p.properties.bind||t,[n]))};

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.22/esri/copyright.txt for details.
*/
const e$4={namespace:void 0,performanceLogger:()=>{},eventHandlerInterceptor:void 0,styleApplyer:(e,r,o)=>{e.style[r]=o;}},r$3=r=>({...e$4,...r});

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.22/esri/copyright.txt for details.
*/
const o$2=(e,t)=>{const r=[];for(;e&&e!==t;)r.push(e),e=e.parentNode;return r},n$2=(e,t)=>e.find(t),d$3=(e,t,r=!1)=>{let o=e;return t.forEach(((e,d)=>{var s;const i=null!=(s=o)&&s.children?n$2(o.children,(t=>t.domNode===e)):void 0;r&&!i&&d!==t.length-1||(o=i);})),o},s$4=n=>{let s;const i={...e$5,...n},c=r$3(i),a=c.performanceLogger;let l,m=!0,p=!1;const u=[],f=[],v=(e,t,r)=>{let n;c.eventHandlerInterceptor=(e,t,r,c)=>function(e){let t;a("domEvent",e);const r=o$2(e.currentTarget,n.domNode),c=r.some((e=>{var t;return customElements.get(null==e||null==(t=e.tagName)?void 0:t.toLowerCase())}));if(e.eventPhase===Event.CAPTURING_PHASE||!c)r.reverse(),t=d$3(n.getLastRender(),r);else {const r=e.composedPath(),o=r.slice(r.indexOf(e.currentTarget),r.indexOf(n.domNode)).filter((e=>e.getRootNode()===e.ownerDocument)).reverse();t=d$3(n.getLastRender(),o,!0);}let l;return t&&(l=i.handleInterceptedEvent(s,t,this,e)),a("domEventProcessed",e),l},null==i.postProcessProjectionOptions||i.postProcessProjectionOptions(c);const l=r();n=e(t,l,c),u.push(n),f.push(r),i.afterFirstVNodeRendered&&i.afterFirstVNodeRendered(n,l);};let h=()=>{if(l=void 0,m){m=!1,a("renderStart",void 0);for(let e=0;e<u.length;e++){const t=f[e]();a("rendered",void 0),u[e].update(t),a("patched",void 0);}a("renderDone",void 0),m=!0;}};return i.modifyDoRenderImplementation&&(h=i.modifyDoRenderImplementation(h,u,f)),s={renderNow:h,scheduleRender:()=>{l||p||(l=requestAnimationFrame(h));},stop:()=>{l&&(cancelAnimationFrame(l),l=void 0),p=!0;},resume:()=>{p=!1,m=!0,s.scheduleRender();},append:(t,r)=>{v(n$3.append,t,r);},insertBefore:(t,r)=>{v(n$3.insertBefore,t,r);},merge:(t,r)=>{v(n$3.merge,t,r);},replace:(t,r)=>{v(n$3.replace,t,r);},detach:e=>{for(let t=0;t<f.length;t++)if(f[t]===e)return f.splice(t,1),u.splice(t,1)[0];throw new Error("renderFunction was not found")}},s};

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.22/esri/copyright.txt for details.
*/
let e$3;function r$2(){setAssetPath(N$4(a$4(e$3)));}e$3="components/assets";

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.22/esri/copyright.txt for details.
*/
const t$2=Symbol("widget"),r$1=[],n$1={},o$1=new WeakMap;function i$2(e,t){let o=t.children;if(o&&o.length)for(let r=0;r<o.length;++r)o[r]=i$2(e,o[r]);else o=r$1;const s=t.vnodeSelector;if(c(s)){const r=t.properties||n$1,i=r.key||s;return {vnodeSelector:"div",properties:{key:i,afterCreate:d$2,afterUpdate:a$1,afterRemoved:l$2,parentWidget:e,widgetConstructor:s,widgetProperties:{...r,key:i,children:o}},children:void 0,text:void 0,domNode:null}}return t}function d$2(t,r,n,{parentWidget:i,widgetConstructor:d,widgetProperties:a}){const c=new d(a);c.container=t,o$1.set(t,c),null==c.afterCreate||c.afterCreate(c,t),i._internalHandles.add(n$8((()=>l$2(t))));}function a$1(e,t,r,{widgetProperties:n}){const i=o$1.get(e);i&&(i.set(n),null==i.afterUpdate||i.afterUpdate(i,e));}function l$2(e){const t=o$1.get(e);t&&(t.destroy(),o$1.delete(e));}function c(e){return "function"==typeof e&&e[t$2]}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.22/esri/copyright.txt for details.
*/
const P$1="esri.widgets.Widget",E=s$7.getLogger(P$1);let L=0;const N=new Map,I={widgetIcon:"esri-icon-checkbox-unchecked"};function F(e,t){for(const r in t)null!=e[r]&&("object"==typeof e[r]&&"object"==typeof t[r]?F(e[r],t[r]):e[r]=t[r]);return e}const U=s$4({postProcessProjectionOptions(e){const t=e.eventHandlerInterceptor,r=/capture$/i;e.eventHandlerInterceptor=(e,s,o,i)=>{const n=t(e,s,o,i),a=r.test(e);if(!((e=e.replace(r,"")).toLowerCase()in o)||a){const t=e[2].toLowerCase()+e.slice(3),r=e=>n.call(o,e);o.addEventListener(t,r,a);const s=()=>o.removeEventListener(t,r,a),d=i.afterRemoved;i.afterRemoved=e=>{null==d||d(e),s();};}return n};},handleInterceptedEvent(e,t,r,s){const{eventPhase:o,type:i}=s,n=o===Event.CAPTURING_PHASE;let a=`on${i}${n?"capture":""}`;const d=t.properties;(a in d||(a=`on${i[0].toUpperCase()}${i.slice(1)}${n?"Capture":""}`,a in d))&&(N.clear(),e.scheduleRender(),d[a].call(d.bind||r,s));}});let $=!1,x=class extends(n$5(n$7.EventedAccessor)){constructor(e,r){super(e,r),this._attached=!1,this._internalHandles=new u$1,this._projector=U,this._readyForTrueRender=!1,this.domNode=null,this.iconClass=I.widgetIcon,this.label=this.declaredClass.split(".").pop(),this.visible=!0,this.key=this,this._loadLocale=q$1((async()=>{if(this._messageBundleProps&&this._messageBundleProps.length){const e=await E$2(this._messageBundleProps.map((async({bundlePath:e,propertyName:t})=>{let r=await u$3(e);this.uiStrings&&Object.keys(this.uiStrings)&&(r=F(l$5(r),this.uiStrings)),this[t]=r;})));for(const t of e)t.error&&E.error("widget-intl:locale-error",this.declaredClass,t.error);}await this.loadLocale();})),r$2();const s=["light","dark"],n=b$2()||"light";s.includes(n)||s$8(E,"The following themes are deprecated: light-blue, dark-blue, light-green, dark-green, light-purple, dark-purple, light-red, and dark-red.",{version:"4.19",warnOnce:!0,see:"https://developers.arcgis.com/javascript/latest/styling/"});const a="esri-widget-uid-"+t$4(),d=this.render.bind(this);this._trackingTarget=new s$9((()=>this.scheduleRender()));const c$1=()=>{var e;if(!this._readyForTrueRender||this.destroyed)return null;if(!this.visible)return {vnodeSelector:"div",properties:{key:a,class:"",styles:{display:"none"}},domNode:void 0,children:void 0,text:void 0};const t=d();let{properties:r}=t;r||(t.properties=r={});let{key:s,styles:o}=r;s||(r.key=a),o||(r.styles=o={}),o.display||(o.display="");let i=0;return null==(e=t.children)||e.forEach((e=>{if(c(e.vnodeSelector))return;let{properties:t}=e;t||(e.properties=t={}),t.key||(t.key=`${this.id}--${i++}`);})),i$2(this,t)};this.render=()=>{if($)return c$1();let e=N.get(this);if(e)return e;this._trackingTarget.clear(),$=!0;try{e=a$5(this._trackingTarget,c$1);}finally{$=!1;}return N.set(this,e),e},this.addResolvingPromise(this._resourcesFetch=this.beforeFirstRender().then((()=>{this._readyForTrueRender=!0,this._postInitialize();})));}normalizeCtorArgs(e,t){const r={...e};return t&&(r.container=t),r}postInitialize(){}beforeFirstRender(){return Promise.all([this.loadDependencies(),this._loadLocale()]).then((()=>{})).catch(w$1)}async loadDependencies(){}async loadLocale(){}destroy(){this.destroyed||(this._trackingTarget=l$6(this._trackingTarget),this.viewModel=l$6(this.viewModel),this._detach(this.container),this._set("container",null),this._internalHandles.destroy(),this._emitter.clear(),this.render=()=>null,this._projector=null,N.delete(this));}set container(e){this._get("container")||this._set("container",e);}castContainer(e){return e$7(e)}get id(){return this._get("id")||this.get("container.id")||Date.now().toString(16)+"-widget-"+L++}set id(e){e&&this._set("id",e);}get renderable(){return this._resourcesFetch}get test(){return {projector:this._projector,handles:this._internalHandles}}render(){throw new Error("not implemented")}scheduleRender(){this.destroyed||(N.delete(this),this._projector.scheduleRender());}classes(...e){return l$4.apply(this,e)}own(e){arguments.length>1&&(e=Array.prototype.slice.call(arguments)),this._internalHandles.add(e);}renderNow(){N.delete(this),this._projector.renderNow();}_postInitialize(){var e;if(this.destroyed)return;this.scheduleRender(),null!=(e=this._delegatedEventNames)&&e.length&&this._internalHandles.add(i$4(this,"viewModel",((e,t)=>{t&&this._internalHandles.remove("delegated-events"),e&&this._internalHandles.add(this._delegatedEventNames.map((t=>e.on(t,(e=>{this.emit(t,e);})))),"delegated-events");}))),this.postInitialize();const t=async()=>{await this._loadLocale().catch(w$1),this.scheduleRender();};this._internalHandles.add([f$2(t),this.watch("uiStrings",t),a$3(this,"container",(async e=>{this.destroyed||this._attach(e);}))]);}_attach(e){e&&(this._projector.merge(e,this.render),this._attached=!0);}_detach(e){e&&this._attached&&(this._projector.detach(this.render),e.parentNode&&e.parentNode.removeChild(e),this._attached=!1);}};x[t$2]=!0,e$8([d$7()],x.prototype,"_readyForTrueRender",void 0),e$8([d$7({value:null})],x.prototype,"container",null),e$8([c$3("container")],x.prototype,"castContainer",null),e$8([d$7({aliasOf:"container"})],x.prototype,"domNode",void 0),e$8([d$7()],x.prototype,"iconClass",void 0),e$8([d$7()],x.prototype,"id",null),e$8([d$7()],x.prototype,"label",void 0),e$8([d$7()],x.prototype,"renderable",null),e$8([d$7()],x.prototype,"uiStrings",void 0),e$8([d$7()],x.prototype,"viewModel",void 0),e$8([d$7()],x.prototype,"visible",void 0),e$8([d$7()],x.prototype,"key",void 0),e$8([d$7()],x.prototype,"children",void 0),e$8([d$7()],x.prototype,"afterCreate",void 0),e$8([d$7()],x.prototype,"afterUpdate",void 0),e$8([d$7()],x.prototype,"afterRemoved",void 0),x=e$8([i$6(P$1)],x);const z=x;

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.22/esri/copyright.txt for details.
*/
function e$2(e){return function(s,n){s.hasOwnProperty("_messageBundleProps")||(s._messageBundleProps=s._messageBundleProps?s._messageBundleProps.slice():[]);s._messageBundleProps.push({bundlePath:e,propertyName:n});}}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.22/esri/copyright.txt for details.
*/
var e$1=function(r){return {vnodeSelector:"",properties:void 0,children:void 0,text:r.toString(),domNode:null}},o=function(r,t){for(var n=0,i=r.length;n<i;n++){var d=r[n];Array.isArray(d)?o(d,t):null!=d&&!1!==d&&(d.hasOwnProperty("vnodeSelector")||(d=e$1(d)),t.push(d));}},t$1=function(r,e){for(var t=[],n=2;n<arguments.length;n++)t[n-2]=arguments[n];if(1===t.length&&"string"==typeof t[0])return {vnodeSelector:r,properties:e||void 0,children:void 0,text:t[0],domNode:null};var i=[];return o(t,i),{vnodeSelector:r,properties:e||void 0,children:i,text:void 0,domNode:null}};function n(e,o,...n){return "function"!=typeof e||c(e)?t$1(e,o,...n):e(o,...n)}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.22/esri/copyright.txt for details.
*/
const a={base:"esri-identity-form",group:"esri-identity-form__group",label:"esri-identity-form__label",footer:"esri-identity-form__footer",esriInput:"esri-input",esriButton:"esri-button",esriButtonSecondary:"esri-button--secondary"},l$1="ArcGIS Online";let p$2=class extends z{constructor(s,e){super(s,e),this._usernameInputNode=null,this._passwordInputNode=null,this.messages=null,this.signingIn=!1,this.server=null,this.resource=null,this.error=null,this.oAuthPrompt=!1;}render(){const{error:s,server:e,resource:t,signingIn:o,oAuthPrompt:n$1,messages:p}=this,d=n("div",{class:a.group},s$a(n$1?p.oAuthInfo:p.info,{server:/\.arcgis\.com/i.test(e)?l$1:e,resource:`(${t||p.lblItem})`})),c=n$1?null:n("div",{class:a.group,key:"username"},n("label",{class:a.label},p.lblUser,n("input",{value:"",required:!0,autocomplete:"off",spellcheck:!1,type:"text",bind:this,afterCreate:g$1,"data-node-ref":"_usernameInputNode",class:a.esriInput}))),m=n$1?null:n("div",{class:a.group,key:"password"},n("label",{class:a.label},p.lblPwd,n("input",{value:"",required:!0,type:"password",bind:this,afterCreate:g$1,"data-node-ref":"_passwordInputNode",class:a.esriInput}))),h=n("div",{class:this.classes(a.group,a.footer)},n("input",{type:"submit",disabled:!!o,value:o?p.lblSigning:p.lblOk,class:a.esriButton}),n("input",{type:"button",value:p.lblCancel,bind:this,onclick:this._cancel,class:this.classes(a.esriButton,a.esriButtonSecondary)})),g=s?n("div",null,s.details&&s.details.httpStatus?p.invalidUser:p.noAuthService):null;return n("form",{class:a.base,bind:this,onsubmit:this._submit},d,g,c,m,h)}_cancel(){this._set("signingIn",!1),this._usernameInputNode&&(this._usernameInputNode.value=""),this._passwordInputNode&&(this._passwordInputNode.value=""),this.emit("cancel");}_submit(s){s.preventDefault(),this._set("signingIn",!0);const e=this.oAuthPrompt?{}:{username:this._usernameInputNode&&this._usernameInputNode.value,password:this._passwordInputNode&&this._passwordInputNode.value};this.emit("submit",e);}};e$8([d$7(),e$2("esri/identity/t9n/identity")],p$2.prototype,"messages",void 0),e$8([d$7()],p$2.prototype,"signingIn",void 0),e$8([d$7()],p$2.prototype,"server",void 0),e$8([d$7()],p$2.prototype,"resource",void 0),e$8([d$7()],p$2.prototype,"error",void 0),e$8([d$7()],p$2.prototype,"oAuthPrompt",void 0),p$2=e$8([i$6("esri.identity.IdentityForm")],p$2);const d$1=p$2;

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.22/esri/copyright.txt for details.
*/
function e(e){return e&&"function"==typeof e.render}

/*!
* tabbable 5.2.1
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
var candidateSelectors = ['input', 'select', 'textarea', 'a[href]', 'button', '[tabindex]', 'audio[controls]', 'video[controls]', '[contenteditable]:not([contenteditable="false"])', 'details>summary:first-of-type', 'details'];
var candidateSelector = /* #__PURE__ */candidateSelectors.join(',');
var matches = typeof Element === 'undefined' ? function () {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

var getCandidates = function getCandidates(el, includeContainer, filter) {
  var candidates = Array.prototype.slice.apply(el.querySelectorAll(candidateSelector));

  if (includeContainer && matches.call(el, candidateSelector)) {
    candidates.unshift(el);
  }

  candidates = candidates.filter(filter);
  return candidates;
};

var isContentEditable = function isContentEditable(node) {
  return node.contentEditable === 'true';
};

var getTabindex = function getTabindex(node) {
  var tabindexAttr = parseInt(node.getAttribute('tabindex'), 10);

  if (!isNaN(tabindexAttr)) {
    return tabindexAttr;
  } // Browsers do not return `tabIndex` correctly for contentEditable nodes;
  // so if they don't have a tabindex attribute specifically set, assume it's 0.


  if (isContentEditable(node)) {
    return 0;
  } // in Chrome, <details/>, <audio controls/> and <video controls/> elements get a default
  //  `tabIndex` of -1 when the 'tabindex' attribute isn't specified in the DOM,
  //  yet they are still part of the regular tab order; in FF, they get a default
  //  `tabIndex` of 0; since Chrome still puts those elements in the regular tab
  //  order, consider their tab index to be 0.


  if ((node.nodeName === 'AUDIO' || node.nodeName === 'VIDEO' || node.nodeName === 'DETAILS') && node.getAttribute('tabindex') === null) {
    return 0;
  }

  return node.tabIndex;
};

var sortOrderedTabbables = function sortOrderedTabbables(a, b) {
  return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
};

var isInput = function isInput(node) {
  return node.tagName === 'INPUT';
};

var isHiddenInput = function isHiddenInput(node) {
  return isInput(node) && node.type === 'hidden';
};

var isDetailsWithSummary = function isDetailsWithSummary(node) {
  var r = node.tagName === 'DETAILS' && Array.prototype.slice.apply(node.children).some(function (child) {
    return child.tagName === 'SUMMARY';
  });
  return r;
};

var getCheckedRadio = function getCheckedRadio(nodes, form) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].checked && nodes[i].form === form) {
      return nodes[i];
    }
  }
};

var isTabbableRadio = function isTabbableRadio(node) {
  if (!node.name) {
    return true;
  }

  var radioScope = node.form || node.ownerDocument;

  var queryRadios = function queryRadios(name) {
    return radioScope.querySelectorAll('input[type="radio"][name="' + name + '"]');
  };

  var radioSet;

  if (typeof window !== 'undefined' && typeof window.CSS !== 'undefined' && typeof window.CSS.escape === 'function') {
    radioSet = queryRadios(window.CSS.escape(node.name));
  } else {
    try {
      radioSet = queryRadios(node.name);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s', err.message);
      return false;
    }
  }

  var checked = getCheckedRadio(radioSet, node.form);
  return !checked || checked === node;
};

var isRadio = function isRadio(node) {
  return isInput(node) && node.type === 'radio';
};

var isNonTabbableRadio = function isNonTabbableRadio(node) {
  return isRadio(node) && !isTabbableRadio(node);
};

var isHidden = function isHidden(node, displayCheck) {
  if (getComputedStyle(node).visibility === 'hidden') {
    return true;
  }

  var isDirectSummary = matches.call(node, 'details>summary:first-of-type');
  var nodeUnderDetails = isDirectSummary ? node.parentElement : node;

  if (matches.call(nodeUnderDetails, 'details:not([open]) *')) {
    return true;
  }

  if (!displayCheck || displayCheck === 'full') {
    while (node) {
      if (getComputedStyle(node).display === 'none') {
        return true;
      }

      node = node.parentElement;
    }
  } else if (displayCheck === 'non-zero-area') {
    var _node$getBoundingClie = node.getBoundingClientRect(),
        width = _node$getBoundingClie.width,
        height = _node$getBoundingClie.height;

    return width === 0 && height === 0;
  }

  return false;
}; // form fields (nested) inside a disabled fieldset are not focusable/tabbable
//  unless they are in the _first_ <legend> element of the top-most disabled
//  fieldset


var isDisabledFromFieldset = function isDisabledFromFieldset(node) {
  if (isInput(node) || node.tagName === 'SELECT' || node.tagName === 'TEXTAREA' || node.tagName === 'BUTTON') {
    var parentNode = node.parentElement;

    while (parentNode) {
      if (parentNode.tagName === 'FIELDSET' && parentNode.disabled) {
        // look for the first <legend> as an immediate child of the disabled
        //  <fieldset>: if the node is in that legend, it'll be enabled even
        //  though the fieldset is disabled; otherwise, the node is in a
        //  secondary/subsequent legend, or somewhere else within the fieldset
        //  (however deep nested) and it'll be disabled
        for (var i = 0; i < parentNode.children.length; i++) {
          var child = parentNode.children.item(i);

          if (child.tagName === 'LEGEND') {
            if (child.contains(node)) {
              return false;
            } // the node isn't in the first legend (in doc order), so no matter
            //  where it is now, it'll be disabled


            return true;
          }
        } // the node isn't in a legend, so no matter where it is now, it'll be disabled


        return true;
      }

      parentNode = parentNode.parentElement;
    }
  } // else, node's tabbable/focusable state should not be affected by a fieldset's
  //  enabled/disabled state


  return false;
};

var isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable(options, node) {
  if (node.disabled || isHiddenInput(node) || isHidden(node, options.displayCheck) || // For a details element with a summary, the summary element gets the focus
  isDetailsWithSummary(node) || isDisabledFromFieldset(node)) {
    return false;
  }

  return true;
};

var isNodeMatchingSelectorTabbable = function isNodeMatchingSelectorTabbable(options, node) {
  if (!isNodeMatchingSelectorFocusable(options, node) || isNonTabbableRadio(node) || getTabindex(node) < 0) {
    return false;
  }

  return true;
};

var tabbable = function tabbable(el, options) {
  options = options || {};
  var regularTabbables = [];
  var orderedTabbables = [];
  var candidates = getCandidates(el, options.includeContainer, isNodeMatchingSelectorTabbable.bind(null, options));
  candidates.forEach(function (candidate, i) {
    var candidateTabindex = getTabindex(candidate);

    if (candidateTabindex === 0) {
      regularTabbables.push(candidate);
    } else {
      orderedTabbables.push({
        documentOrder: i,
        tabIndex: candidateTabindex,
        node: candidate
      });
    }
  });
  var tabbableNodes = orderedTabbables.sort(sortOrderedTabbables).map(function (a) {
    return a.node;
  }).concat(regularTabbables);
  return tabbableNodes;
};

var focusable = function focusable(el, options) {
  options = options || {};
  var candidates = getCandidates(el, options.includeContainer, isNodeMatchingSelectorFocusable.bind(null, options));
  return candidates;
};

var isTabbable = function isTabbable(node, options) {
  options = options || {};

  if (!node) {
    throw new Error('No node provided');
  }

  if (matches.call(node, candidateSelector) === false) {
    return false;
  }

  return isNodeMatchingSelectorTabbable(options, node);
};

var focusableCandidateSelector = /* #__PURE__ */candidateSelectors.concat('iframe').join(',');

var isFocusable = function isFocusable(node, options) {
  options = options || {};

  if (!node) {
    throw new Error('No node provided');
  }

  if (matches.call(node, focusableCandidateSelector) === false) {
    return false;
  }

  return isNodeMatchingSelectorFocusable(options, node);
};

/*!
* focus-trap 6.7.3
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var activeFocusTraps = function () {
  var trapQueue = [];
  return {
    activateTrap: function activateTrap(trap) {
      if (trapQueue.length > 0) {
        var activeTrap = trapQueue[trapQueue.length - 1];

        if (activeTrap !== trap) {
          activeTrap.pause();
        }
      }

      var trapIndex = trapQueue.indexOf(trap);

      if (trapIndex === -1) {
        trapQueue.push(trap);
      } else {
        // move this existing trap to the front of the queue
        trapQueue.splice(trapIndex, 1);
        trapQueue.push(trap);
      }
    },
    deactivateTrap: function deactivateTrap(trap) {
      var trapIndex = trapQueue.indexOf(trap);

      if (trapIndex !== -1) {
        trapQueue.splice(trapIndex, 1);
      }

      if (trapQueue.length > 0) {
        trapQueue[trapQueue.length - 1].unpause();
      }
    }
  };
}();

var isSelectableInput = function isSelectableInput(node) {
  return node.tagName && node.tagName.toLowerCase() === 'input' && typeof node.select === 'function';
};

var isEscapeEvent = function isEscapeEvent(e) {
  return e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27;
};

var isTabEvent = function isTabEvent(e) {
  return e.key === 'Tab' || e.keyCode === 9;
};

var delay = function delay(fn) {
  return setTimeout(fn, 0);
}; // Array.find/findIndex() are not supported on IE; this replicates enough
//  of Array.findIndex() for our needs


var findIndex = function findIndex(arr, fn) {
  var idx = -1;
  arr.every(function (value, i) {
    if (fn(value)) {
      idx = i;
      return false; // break
    }

    return true; // next
  });
  return idx;
};
/**
 * Get an option's value when it could be a plain value, or a handler that provides
 *  the value.
 * @param {*} value Option's value to check.
 * @param {...*} [params] Any parameters to pass to the handler, if `value` is a function.
 * @returns {*} The `value`, or the handler's returned value.
 */


var valueOrHandler = function valueOrHandler(value) {
  for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }

  return typeof value === 'function' ? value.apply(void 0, params) : value;
};

var getActualTarget = function getActualTarget(event) {
  // NOTE: If the trap is _inside_ a shadow DOM, event.target will always be the
  //  shadow host. However, event.target.composedPath() will be an array of
  //  nodes "clicked" from inner-most (the actual element inside the shadow) to
  //  outer-most (the host HTML document). If we have access to composedPath(),
  //  then use its first element; otherwise, fall back to event.target (and
  //  this only works for an _open_ shadow DOM; otherwise,
  //  composedPath()[0] === event.target always).
  return event.target.shadowRoot && typeof event.composedPath === 'function' ? event.composedPath()[0] : event.target;
};

var createFocusTrap = function createFocusTrap(elements, userOptions) {
  // SSR: a live trap shouldn't be created in this type of environment so this
  //  should be safe code to execute if the `document` option isn't specified
  var doc = (userOptions === null || userOptions === void 0 ? void 0 : userOptions.document) || document;

  var config = _objectSpread2({
    returnFocusOnDeactivate: true,
    escapeDeactivates: true,
    delayInitialFocus: true
  }, userOptions);

  var state = {
    // @type {Array<HTMLElement>}
    containers: [],
    // list of objects identifying the first and last tabbable nodes in all containers/groups in
    //  the trap
    // NOTE: it's possible that a group has no tabbable nodes if nodes get removed while the trap
    //  is active, but the trap should never get to a state where there isn't at least one group
    //  with at least one tabbable node in it (that would lead to an error condition that would
    //  result in an error being thrown)
    // @type {Array<{
    //   container: HTMLElement,
    //   firstTabbableNode: HTMLElement|null,
    //   lastTabbableNode: HTMLElement|null,
    //   nextTabbableNode: (node: HTMLElement, forward: boolean) => HTMLElement|undefined
    // }>}
    tabbableGroups: [],
    nodeFocusedBeforeActivation: null,
    mostRecentlyFocusedNode: null,
    active: false,
    paused: false,
    // timer ID for when delayInitialFocus is true and initial focus in this trap
    //  has been delayed during activation
    delayInitialFocusTimer: undefined
  };
  var trap; // eslint-disable-line prefer-const -- some private functions reference it, and its methods reference private functions, so we must declare here and define later

  var getOption = function getOption(configOverrideOptions, optionName, configOptionName) {
    return configOverrideOptions && configOverrideOptions[optionName] !== undefined ? configOverrideOptions[optionName] : config[configOptionName || optionName];
  };

  var containersContain = function containersContain(element) {
    return !!(element && state.containers.some(function (container) {
      return container.contains(element);
    }));
  };
  /**
   * Gets the node for the given option, which is expected to be an option that
   *  can be either a DOM node, a string that is a selector to get a node, `false`
   *  (if a node is explicitly NOT given), or a function that returns any of these
   *  values.
   * @param {string} optionName
   * @returns {undefined | false | HTMLElement | SVGElement} Returns
   *  `undefined` if the option is not specified; `false` if the option
   *  resolved to `false` (node explicitly not given); otherwise, the resolved
   *  DOM node.
   * @throws {Error} If the option is set, not `false`, and is not, or does not
   *  resolve to a node.
   */


  var getNodeForOption = function getNodeForOption(optionName) {
    var optionValue = config[optionName];

    if (typeof optionValue === 'function') {
      for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        params[_key2 - 1] = arguments[_key2];
      }

      optionValue = optionValue.apply(void 0, params);
    }

    if (!optionValue) {
      if (optionValue === undefined || optionValue === false) {
        return optionValue;
      } // else, empty string (invalid), null (invalid), 0 (invalid)


      throw new Error("`".concat(optionName, "` was specified but was not a node, or did not return a node"));
    }

    var node = optionValue; // could be HTMLElement, SVGElement, or non-empty string at this point

    if (typeof optionValue === 'string') {
      node = doc.querySelector(optionValue); // resolve to node, or null if fails

      if (!node) {
        throw new Error("`".concat(optionName, "` as selector refers to no known node"));
      }
    }

    return node;
  };

  var getInitialFocusNode = function getInitialFocusNode() {
    var node = getNodeForOption('initialFocus'); // false explicitly indicates we want no initialFocus at all

    if (node === false) {
      return false;
    }

    if (node === undefined) {
      // option not specified: use fallback options
      if (containersContain(doc.activeElement)) {
        node = doc.activeElement;
      } else {
        var firstTabbableGroup = state.tabbableGroups[0];
        var firstTabbableNode = firstTabbableGroup && firstTabbableGroup.firstTabbableNode; // NOTE: `fallbackFocus` option function cannot return `false` (not supported)

        node = firstTabbableNode || getNodeForOption('fallbackFocus');
      }
    }

    if (!node) {
      throw new Error('Your focus-trap needs to have at least one focusable element');
    }

    return node;
  };

  var updateTabbableNodes = function updateTabbableNodes() {
    state.tabbableGroups = state.containers.map(function (container) {
      var tabbableNodes = tabbable(container); // NOTE: if we have tabbable nodes, we must have focusable nodes; focusable nodes
      //  are a superset of tabbable nodes

      var focusableNodes = focusable(container);

      if (tabbableNodes.length > 0) {
        return {
          container: container,
          firstTabbableNode: tabbableNodes[0],
          lastTabbableNode: tabbableNodes[tabbableNodes.length - 1],

          /**
           * Finds the __tabbable__ node that follows the given node in the specified direction,
           *  in this container, if any.
           * @param {HTMLElement} node
           * @param {boolean} [forward] True if going in forward tab order; false if going
           *  in reverse.
           * @returns {HTMLElement|undefined} The next tabbable node, if any.
           */
          nextTabbableNode: function nextTabbableNode(node) {
            var forward = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
            // NOTE: If tabindex is positive (in order to manipulate the tab order separate
            //  from the DOM order), this __will not work__ because the list of focusableNodes,
            //  while it contains tabbable nodes, does not sort its nodes in any order other
            //  than DOM order, because it can't: Where would you place focusable (but not
            //  tabbable) nodes in that order? They have no order, because they aren't tabbale...
            // Support for positive tabindex is already broken and hard to manage (possibly
            //  not supportable, TBD), so this isn't going to make things worse than they
            //  already are, and at least makes things better for the majority of cases where
            //  tabindex is either 0/unset or negative.
            // FYI, positive tabindex issue: https://github.com/focus-trap/focus-trap/issues/375
            var nodeIdx = focusableNodes.findIndex(function (n) {
              return n === node;
            });

            if (forward) {
              return focusableNodes.slice(nodeIdx + 1).find(function (n) {
                return isTabbable(n);
              });
            }

            return focusableNodes.slice(0, nodeIdx).reverse().find(function (n) {
              return isTabbable(n);
            });
          }
        };
      }

      return undefined;
    }).filter(function (group) {
      return !!group;
    }); // remove groups with no tabbable nodes
    // throw if no groups have tabbable nodes and we don't have a fallback focus node either

    if (state.tabbableGroups.length <= 0 && !getNodeForOption('fallbackFocus') // returning false not supported for this option
    ) {
      throw new Error('Your focus-trap must have at least one container with at least one tabbable node in it at all times');
    }
  };

  var tryFocus = function tryFocus(node) {
    if (node === false) {
      return;
    }

    if (node === doc.activeElement) {
      return;
    }

    if (!node || !node.focus) {
      tryFocus(getInitialFocusNode());
      return;
    }

    node.focus({
      preventScroll: !!config.preventScroll
    });
    state.mostRecentlyFocusedNode = node;

    if (isSelectableInput(node)) {
      node.select();
    }
  };

  var getReturnFocusNode = function getReturnFocusNode(previousActiveElement) {
    var node = getNodeForOption('setReturnFocus', previousActiveElement);
    return node ? node : node === false ? false : previousActiveElement;
  }; // This needs to be done on mousedown and touchstart instead of click
  // so that it precedes the focus event.


  var checkPointerDown = function checkPointerDown(e) {
    var target = getActualTarget(e);

    if (containersContain(target)) {
      // allow the click since it ocurred inside the trap
      return;
    }

    if (valueOrHandler(config.clickOutsideDeactivates, e)) {
      // immediately deactivate the trap
      trap.deactivate({
        // if, on deactivation, we should return focus to the node originally-focused
        //  when the trap was activated (or the configured `setReturnFocus` node),
        //  then assume it's also OK to return focus to the outside node that was
        //  just clicked, causing deactivation, as long as that node is focusable;
        //  if it isn't focusable, then return focus to the original node focused
        //  on activation (or the configured `setReturnFocus` node)
        // NOTE: by setting `returnFocus: false`, deactivate() will do nothing,
        //  which will result in the outside click setting focus to the node
        //  that was clicked, whether it's focusable or not; by setting
        //  `returnFocus: true`, we'll attempt to re-focus the node originally-focused
        //  on activation (or the configured `setReturnFocus` node)
        returnFocus: config.returnFocusOnDeactivate && !isFocusable(target)
      });
      return;
    } // This is needed for mobile devices.
    // (If we'll only let `click` events through,
    // then on mobile they will be blocked anyways if `touchstart` is blocked.)


    if (valueOrHandler(config.allowOutsideClick, e)) {
      // allow the click outside the trap to take place
      return;
    } // otherwise, prevent the click


    e.preventDefault();
  }; // In case focus escapes the trap for some strange reason, pull it back in.


  var checkFocusIn = function checkFocusIn(e) {
    var target = getActualTarget(e);
    var targetContained = containersContain(target); // In Firefox when you Tab out of an iframe the Document is briefly focused.

    if (targetContained || target instanceof Document) {
      if (targetContained) {
        state.mostRecentlyFocusedNode = target;
      }
    } else {
      // escaped! pull it back in to where it just left
      e.stopImmediatePropagation();
      tryFocus(state.mostRecentlyFocusedNode || getInitialFocusNode());
    }
  }; // Hijack Tab events on the first and last focusable nodes of the trap,
  // in order to prevent focus from escaping. If it escapes for even a
  // moment it can end up scrolling the page and causing confusion so we
  // kind of need to capture the action at the keydown phase.


  var checkTab = function checkTab(e) {
    var target = getActualTarget(e);
    updateTabbableNodes();
    var destinationNode = null;

    if (state.tabbableGroups.length > 0) {
      // make sure the target is actually contained in a group
      // NOTE: the target may also be the container itself if it's focusable
      //  with tabIndex='-1' and was given initial focus
      var containerIndex = findIndex(state.tabbableGroups, function (_ref) {
        var container = _ref.container;
        return container.contains(target);
      });
      var containerGroup = containerIndex >= 0 ? state.tabbableGroups[containerIndex] : undefined;

      if (containerIndex < 0) {
        // target not found in any group: quite possible focus has escaped the trap,
        //  so bring it back in to...
        if (e.shiftKey) {
          // ...the last node in the last group
          destinationNode = state.tabbableGroups[state.tabbableGroups.length - 1].lastTabbableNode;
        } else {
          // ...the first node in the first group
          destinationNode = state.tabbableGroups[0].firstTabbableNode;
        }
      } else if (e.shiftKey) {
        // REVERSE
        // is the target the first tabbable node in a group?
        var startOfGroupIndex = findIndex(state.tabbableGroups, function (_ref2) {
          var firstTabbableNode = _ref2.firstTabbableNode;
          return target === firstTabbableNode;
        });

        if (startOfGroupIndex < 0 && (containerGroup.container === target || isFocusable(target) && !isTabbable(target) && !containerGroup.nextTabbableNode(target, false))) {
          // an exception case where the target is either the container itself, or
          //  a non-tabbable node that was given focus (i.e. tabindex is negative
          //  and user clicked on it or node was programmatically given focus)
          //  and is not followed by any other tabbable node, in which
          //  case, we should handle shift+tab as if focus were on the container's
          //  first tabbable node, and go to the last tabbable node of the LAST group
          startOfGroupIndex = containerIndex;
        }

        if (startOfGroupIndex >= 0) {
          // YES: then shift+tab should go to the last tabbable node in the
          //  previous group (and wrap around to the last tabbable node of
          //  the LAST group if it's the first tabbable node of the FIRST group)
          var destinationGroupIndex = startOfGroupIndex === 0 ? state.tabbableGroups.length - 1 : startOfGroupIndex - 1;
          var destinationGroup = state.tabbableGroups[destinationGroupIndex];
          destinationNode = destinationGroup.lastTabbableNode;
        }
      } else {
        // FORWARD
        // is the target the last tabbable node in a group?
        var lastOfGroupIndex = findIndex(state.tabbableGroups, function (_ref3) {
          var lastTabbableNode = _ref3.lastTabbableNode;
          return target === lastTabbableNode;
        });

        if (lastOfGroupIndex < 0 && (containerGroup.container === target || isFocusable(target) && !isTabbable(target) && !containerGroup.nextTabbableNode(target))) {
          // an exception case where the target is the container itself, or
          //  a non-tabbable node that was given focus (i.e. tabindex is negative
          //  and user clicked on it or node was programmatically given focus)
          //  and is not followed by any other tabbable node, in which
          //  case, we should handle tab as if focus were on the container's
          //  last tabbable node, and go to the first tabbable node of the FIRST group
          lastOfGroupIndex = containerIndex;
        }

        if (lastOfGroupIndex >= 0) {
          // YES: then tab should go to the first tabbable node in the next
          //  group (and wrap around to the first tabbable node of the FIRST
          //  group if it's the last tabbable node of the LAST group)
          var _destinationGroupIndex = lastOfGroupIndex === state.tabbableGroups.length - 1 ? 0 : lastOfGroupIndex + 1;

          var _destinationGroup = state.tabbableGroups[_destinationGroupIndex];
          destinationNode = _destinationGroup.firstTabbableNode;
        }
      }
    } else {
      // NOTE: the fallbackFocus option does not support returning false to opt-out
      destinationNode = getNodeForOption('fallbackFocus');
    }

    if (destinationNode) {
      e.preventDefault();
      tryFocus(destinationNode);
    } // else, let the browser take care of [shift+]tab and move the focus

  };

  var checkKey = function checkKey(e) {
    if (isEscapeEvent(e) && valueOrHandler(config.escapeDeactivates, e) !== false) {
      e.preventDefault();
      trap.deactivate();
      return;
    }

    if (isTabEvent(e)) {
      checkTab(e);
      return;
    }
  };

  var checkClick = function checkClick(e) {
    if (valueOrHandler(config.clickOutsideDeactivates, e)) {
      return;
    }

    var target = getActualTarget(e);

    if (containersContain(target)) {
      return;
    }

    if (valueOrHandler(config.allowOutsideClick, e)) {
      return;
    }

    e.preventDefault();
    e.stopImmediatePropagation();
  }; //
  // EVENT LISTENERS
  //


  var addListeners = function addListeners() {
    if (!state.active) {
      return;
    } // There can be only one listening focus trap at a time


    activeFocusTraps.activateTrap(trap); // Delay ensures that the focused element doesn't capture the event
    // that caused the focus trap activation.

    state.delayInitialFocusTimer = config.delayInitialFocus ? delay(function () {
      tryFocus(getInitialFocusNode());
    }) : tryFocus(getInitialFocusNode());
    doc.addEventListener('focusin', checkFocusIn, true);
    doc.addEventListener('mousedown', checkPointerDown, {
      capture: true,
      passive: false
    });
    doc.addEventListener('touchstart', checkPointerDown, {
      capture: true,
      passive: false
    });
    doc.addEventListener('click', checkClick, {
      capture: true,
      passive: false
    });
    doc.addEventListener('keydown', checkKey, {
      capture: true,
      passive: false
    });
    return trap;
  };

  var removeListeners = function removeListeners() {
    if (!state.active) {
      return;
    }

    doc.removeEventListener('focusin', checkFocusIn, true);
    doc.removeEventListener('mousedown', checkPointerDown, true);
    doc.removeEventListener('touchstart', checkPointerDown, true);
    doc.removeEventListener('click', checkClick, true);
    doc.removeEventListener('keydown', checkKey, true);
    return trap;
  }; //
  // TRAP DEFINITION
  //


  trap = {
    activate: function activate(activateOptions) {
      if (state.active) {
        return this;
      }

      var onActivate = getOption(activateOptions, 'onActivate');
      var onPostActivate = getOption(activateOptions, 'onPostActivate');
      var checkCanFocusTrap = getOption(activateOptions, 'checkCanFocusTrap');

      if (!checkCanFocusTrap) {
        updateTabbableNodes();
      }

      state.active = true;
      state.paused = false;
      state.nodeFocusedBeforeActivation = doc.activeElement;

      if (onActivate) {
        onActivate();
      }

      var finishActivation = function finishActivation() {
        if (checkCanFocusTrap) {
          updateTabbableNodes();
        }

        addListeners();

        if (onPostActivate) {
          onPostActivate();
        }
      };

      if (checkCanFocusTrap) {
        checkCanFocusTrap(state.containers.concat()).then(finishActivation, finishActivation);
        return this;
      }

      finishActivation();
      return this;
    },
    deactivate: function deactivate(deactivateOptions) {
      if (!state.active) {
        return this;
      }

      clearTimeout(state.delayInitialFocusTimer); // noop if undefined

      state.delayInitialFocusTimer = undefined;
      removeListeners();
      state.active = false;
      state.paused = false;
      activeFocusTraps.deactivateTrap(trap);
      var onDeactivate = getOption(deactivateOptions, 'onDeactivate');
      var onPostDeactivate = getOption(deactivateOptions, 'onPostDeactivate');
      var checkCanReturnFocus = getOption(deactivateOptions, 'checkCanReturnFocus');

      if (onDeactivate) {
        onDeactivate();
      }

      var returnFocus = getOption(deactivateOptions, 'returnFocus', 'returnFocusOnDeactivate');

      var finishDeactivation = function finishDeactivation() {
        delay(function () {
          if (returnFocus) {
            tryFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation));
          }

          if (onPostDeactivate) {
            onPostDeactivate();
          }
        });
      };

      if (returnFocus && checkCanReturnFocus) {
        checkCanReturnFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation)).then(finishDeactivation, finishDeactivation);
        return this;
      }

      finishDeactivation();
      return this;
    },
    pause: function pause() {
      if (state.paused || !state.active) {
        return this;
      }

      state.paused = true;
      removeListeners();
      return this;
    },
    unpause: function unpause() {
      if (!state.paused || !state.active) {
        return this;
      }

      state.paused = false;
      updateTabbableNodes();
      addListeners();
      return this;
    },
    updateContainerElements: function updateContainerElements(containerElements) {
      var elementsAsArray = [].concat(containerElements).filter(Boolean);
      state.containers = elementsAsArray.map(function (element) {
        return typeof element === 'string' ? doc.querySelector(element) : element;
      });

      if (state.active) {
        updateTabbableNodes();
      }

      return this;
    }
  }; // initialize container elements

  trap.updateContainerElements(elements);
  return trap;
};

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.22/esri/copyright.txt for details.
*/
const l={base:"esri-identity-modal",open:"esri-identity-modal--open",closed:"esri-identity-modal--closed",title:"esri-identity-modal__title",dialog:"esri-identity-modal__dialog",content:"esri-identity-modal__content",closeButton:"esri-identity-modal__close-button",iconClose:"esri-icon-close"};let d=class extends z{constructor(t,e){super(t,e),this.container=document.createElement("div"),this.content=null,this.open=!1,this._close=()=>{this.open=!1;},document.body.appendChild(this.container),this.own(this.watch("open",(()=>this._toggleFocusTrap())));}destroy(){this._destroyFocusTrap();}render(){const t=this.id,{open:e,content:o,title:s,messages:i}=this,r=e&&!!o,n$1={[l.open]:r,[l.closed]:!r},a=n("button",{class:l.closeButton,"aria-label":i.close,title:i.close,bind:this,onclick:this._close},n("span",{"aria-hidden":"true",class:l.iconClose})),d=`${t}_title`,p=`${t}_content`,u=s?n("h1",{id:d,class:l.title},s):null,m=r?n("div",{bind:this,class:l.dialog,role:"dialog","aria-labelledby":d,"aria-describedby":p,afterCreate:this._createFocusTrap},a,u,this._renderContent(p)):null;return n("div",{tabIndex:-1,class:this.classes(l.base,n$1)},m)}_destroyFocusTrap(){var t;null==(t=this._focusTrap)||t.deactivate({onDeactivate:null}),this._focusTrap=null;}_toggleFocusTrap(){const{_focusTrap:t,open:e}=this;t&&(e?t.activate():t.deactivate());}_createFocusTrap(t){this._destroyFocusTrap();const o=requestAnimationFrame((()=>{this._focusTrap=createFocusTrap(t,{initialFocus:"input",onDeactivate:this._close}),this._toggleFocusTrap();}));this.own(n$8((()=>cancelAnimationFrame(o))));}_renderContent(t){const e$1=this.content;return "string"==typeof e$1?n("div",{class:l.content,id:t,innerHTML:e$1}):e(e$1)?n("div",{class:l.content,id:t},e$1.render()):e$1 instanceof HTMLElement?n("div",{class:l.content,id:t,bind:e$1,afterCreate:this._attachToNode}):null}_attachToNode(t){const e=this;t.appendChild(e);}};e$8([d$7({readOnly:!0})],d.prototype,"container",void 0),e$8([d$7()],d.prototype,"content",void 0),e$8([d$7()],d.prototype,"open",void 0),e$8([d$7(),e$2("esri/t9n/common")],d.prototype,"messages",void 0),e$8([d$7({aliasOf:"messages.auth.signIn"})],d.prototype,"title",void 0),d=e$8([i$6("esri.identity.IdentityModal")],d);const p$1=d;

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.22/esri/copyright.txt for details.
*/
const t="esriJSAPIOAuth";class s$3{constructor(t,s){this.oAuthInfo=null,this.storage=null,this.appId=null,this.expires=null,this.ssl=null,this.token=null,this.userId=null,this.oAuthInfo=t,this.storage=s,this._init();}isValid(){let t=!1;if(this.oAuthInfo&&this.token&&this.userId){const s=Date.now();if(this.expires>s){(this.expires-s)/1e3>60*this.oAuthInfo.minTimeUntilExpiration&&(t=!0);}}return t}save(){if(!this.storage)return;const s=this._load(),e=this.oAuthInfo;if(e&&e.authNamespace&&e.portalUrl){let o=s[e.authNamespace];o||(o=s[e.authNamespace]={}),o[e.portalUrl]={appId:this.appId=e.appId,expires:this.expires,ssl:this.ssl,token:this.token,userId:this.userId};try{this.storage.setItem(t,JSON.stringify(s));}catch(i){console.log(i);}}}destroy(){const s=this._load(),e=this.oAuthInfo;if(e&&e.appId&&e.portalUrl&&this.token&&this.expires>Date.now()){const t=e.portalUrl.replace(/^http:/i,"https:")+"/sharing/rest/oauth2/revokeToken",s=new FormData;if(s.append("f","json"),s.append("auth_token",this.token),s.append("client_id",e.appId),s.append("token_type_hint","access_token"),"function"==typeof navigator.sendBeacon)navigator.sendBeacon(t,s);else {const e=new XMLHttpRequest;e.open("POST",t),e.send(s);}}if(e&&e.authNamespace&&e.portalUrl&&this.storage){const o=s[e.authNamespace];if(o){delete o[e.portalUrl];try{this.storage.setItem(t,JSON.stringify(s));}catch(i){console.log(i);}}}e&&(e._oAuthCred=null,this.oAuthInfo=null);}_init(){const t=this._load(),s=this.oAuthInfo;if(s&&s.authNamespace&&s.portalUrl){let e=t[s.authNamespace];e&&(e=e[s.portalUrl],e&&(this.appId=e.appId,this.expires=e.expires,this.ssl=e.ssl,this.token=e.token,this.userId=e.userId));}}_load(){let s={};if(this.storage){const i=this.storage.getItem(t);if(i)try{s=JSON.parse(i);}catch(e){console.log(e);}}return s}}s$3.prototype.declaredClass="esri.identity.OAuthCredential";

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.22/esri/copyright.txt for details.
*/
var s$2;let p=s$2=class extends a$6{constructor(o){super(o),this._oAuthCred=null,this.appId=null,this.authNamespace="/",this.expiration=20160,this.forceLogin=!1,this.forceUserId=!1,this.locale=null,this.minTimeUntilExpiration=30,this.popup=!1,this.popupCallbackUrl="oauth-callback.html",this.popupWindowFeatures="height=490,width=800,resizable,scrollbars,status",this.portalUrl="https://www.arcgis.com",this.preserveUrlHash=!1,this.userId=null;}clone(){return s$2.fromJSON(this.toJSON())}};e$8([d$7({json:{write:!0}})],p.prototype,"appId",void 0),e$8([d$7({json:{write:!0}})],p.prototype,"authNamespace",void 0),e$8([d$7({json:{write:!0}})],p.prototype,"expiration",void 0),e$8([d$7({json:{write:!0}})],p.prototype,"forceLogin",void 0),e$8([d$7({json:{write:!0}})],p.prototype,"forceUserId",void 0),e$8([d$7({json:{write:!0}})],p.prototype,"locale",void 0),e$8([d$7({json:{write:!0}})],p.prototype,"minTimeUntilExpiration",void 0),e$8([d$7({json:{write:!0}})],p.prototype,"popup",void 0),e$8([d$7({json:{write:!0}})],p.prototype,"popupCallbackUrl",void 0),e$8([d$7({json:{write:!0}})],p.prototype,"popupWindowFeatures",void 0),e$8([d$7({json:{write:!0}})],p.prototype,"portalUrl",void 0),e$8([d$7({json:{write:!0}})],p.prototype,"preserveUrlHash",void 0),e$8([d$7({json:{write:!0}})],p.prototype,"userId",void 0),p=s$2=e$8([i$6("esri.identity.OAuthInfo")],p);const i$1=p;

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.22/esri/copyright.txt for details.
*/
let s$1=class extends a$6{constructor(o){super(o),this.adminTokenServiceUrl=null,this.currentVersion=null,this.hasPortal=null,this.hasServer=null,this.owningSystemUrl=null,this.owningTenant=null,this.server=null,this.shortLivedTokenValidity=null,this.tokenServiceUrl=null,this.webTierAuth=null;}};e$8([d$7({json:{write:!0}})],s$1.prototype,"adminTokenServiceUrl",void 0),e$8([d$7({json:{write:!0}})],s$1.prototype,"currentVersion",void 0),e$8([d$7({json:{write:!0}})],s$1.prototype,"hasPortal",void 0),e$8([d$7({json:{write:!0}})],s$1.prototype,"hasServer",void 0),e$8([d$7({json:{write:!0}})],s$1.prototype,"owningSystemUrl",void 0),e$8([d$7({json:{write:!0}})],s$1.prototype,"owningTenant",void 0),e$8([d$7({json:{write:!0}})],s$1.prototype,"server",void 0),e$8([d$7({json:{write:!0}})],s$1.prototype,"shortLivedTokenValidity",void 0),e$8([d$7({json:{write:!0}})],s$1.prototype,"tokenServiceUrl",void 0),e$8([d$7({json:{write:!0}})],s$1.prototype,"webTierAuth",void 0),s$1=e$8([i$6("esri.identity.ServerInfo")],s$1);const i=s$1;

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.22/esri/copyright.txt for details.
*/
const T={},O=e=>{const t=new y$3(e.owningSystemUrl).host,s=new y$3(e.server).host,r=/.+\.arcgis\.com$/i;return r.test(t)&&r.test(s)},R=(e,t)=>!!(O(e)&&t&&t.some((t=>t.test(e.server))));let b=null,P=null;try{b=window.localStorage,P=window.sessionStorage;}catch{}class C extends n$7{constructor(){super(),this._portalConfig=globalThis.esriGeowConfig,this.serverInfos=[],this.oAuthInfos=[],this.credentials=[],this._soReqs=[],this._xoReqs=[],this._portals=[],this.defaultOAuthInfo=null,this.defaultTokenValidity=60,this.dialog=null,this.formConstructor=d$1,this.tokenValidity=null,this.normalizeWebTierAuth=!1,this._appOrigin="null"!==window.origin?window.origin:window.location.origin,this._appUrlObj=O$1(window.location.href),this._busy=null,this._rejectOnPersistedPageShow=!1,this._oAuthHash=null,this._gwTokenUrl="/sharing/rest/generateToken",this._agsRest="/rest/services",this._agsPortal=/\/sharing(\/|$)/i,this._agsAdmin=/(https?:\/\/[^\/]+\/[^\/]+)\/admin\/?(\/.*)?$/i,this._adminSvcs=/\/rest\/admin\/services(\/|$)/i,this._gwDomains=[{regex:/^https?:\/\/www\.arcgis\.com/i,customBaseUrl:"maps.arcgis.com",tokenServiceUrl:"https://www.arcgis.com/sharing/rest/generateToken"},{regex:/^https?:\/\/(?:dev|[a-z\d-]+\.mapsdev)\.arcgis\.com/i,customBaseUrl:"mapsdev.arcgis.com",tokenServiceUrl:"https://dev.arcgis.com/sharing/rest/generateToken"},{regex:/^https?:\/\/(?:devext|[a-z\d-]+\.mapsdevext)\.arcgis\.com/i,customBaseUrl:"mapsdevext.arcgis.com",tokenServiceUrl:"https://devext.arcgis.com/sharing/rest/generateToken"},{regex:/^https?:\/\/(?:qaext|[a-z\d-]+\.mapsqa)\.arcgis\.com/i,customBaseUrl:"mapsqa.arcgis.com",tokenServiceUrl:"https://qaext.arcgis.com/sharing/rest/generateToken"},{regex:/^https?:\/\/[a-z\d-]+\.maps\.arcgis\.com/i,customBaseUrl:"maps.arcgis.com",tokenServiceUrl:"https://www.arcgis.com/sharing/rest/generateToken"}],this._legacyFed=[],this._regexSDirUrl=/http.+\/rest\/services\/?/gi,this._regexServerType=/(\/(FeatureServer|GPServer|GeoDataServer|GeocodeServer|GeoenrichmentServer|GeometryServer|GlobeServer|ImageServer|MapServer|MobileServer|NAServer|NetworkDiagramServer|OGCFeatureServer|ParcelFabricServer|RelationalCatalogServer|SceneServer|StreamServer|UtilityNetworkServer|ValidationServer|VectorTileServer|VersionManagementServer)).*/gi,this._gwUser=/http.+\/users\/([^\/]+)\/?.*/i,this._gwItem=/http.+\/items\/([^\/]+)\/?.*/i,this._gwGroup=/http.+\/groups\/([^\/]+)\/?.*/i,this._rePortalTokenSvc=/\/sharing(\/rest)?\/generatetoken/i,this._createDefaultOAuthInfo=!0,this._hasTestedIfAppIsOnPortal=!1,this._getOAuthHash(),window.addEventListener("pageshow",(e=>{this._pageShowHandler(e);}));}registerServers(e){const t=this.serverInfos;t?(e=e.filter((e=>!this.findServerInfo(e.server))),this.serverInfos=t.concat(e)):this.serverInfos=e,e.forEach((e=>{e.owningSystemUrl&&this._portals.push(e.owningSystemUrl),e.hasPortal&&this._portals.push(e.server);}));}registerOAuthInfos(e){const t=this.oAuthInfos;if(t){for(const s of e){const e=this.findOAuthInfo(s.portalUrl);e&&t.splice(t.indexOf(e),1);}this.oAuthInfos=t.concat(e);}else this.oAuthInfos=e;}registerToken(e){e={...e};const t=this._sanitizeUrl(e.server),s=this._isServerRsrc(t);let r,i$1=this.findServerInfo(t),n=!0;i$1||(i$1=new i,i$1.server=this._getServerInstanceRoot(t),s?i$1.hasServer=!0:(i$1.tokenServiceUrl=this._getTokenSvcUrl(t),i$1.hasPortal=!0),this.registerServers([i$1])),r=this._findCredential(t),r?(delete e.server,Object.assign(r,e),n=!1):(r=new D({userId:e.userId,server:i$1.server,token:e.token,expires:e.expires,ssl:e.ssl,scope:s?"server":"portal"}),r.resources=[t],this.credentials.push(r)),r.emitTokenChange(!1),n||r.refreshServerTokens();}toJSON(){return y$2({serverInfos:this.serverInfos.map((e=>e.toJSON())),oAuthInfos:this.oAuthInfos.map((e=>e.toJSON())),credentials:this.credentials.map((e=>e.toJSON()))})}initialize(e){if(!e)return;"string"==typeof e&&(e=JSON.parse(e));const t=e.serverInfos,s=e.oAuthInfos,r=e.credentials;if(t){const e=[];t.forEach((t=>{t.server&&t.tokenServiceUrl&&e.push(t.declaredClass?t:new i(t));})),e.length&&this.registerServers(e);}if(s){const e=[];s.forEach((t=>{t.appId&&e.push(t.declaredClass?t:new i$1(t));})),e.length&&this.registerOAuthInfos(e);}r&&r.forEach((e=>{e.server&&e.token&&e.expires&&e.expires>Date.now()&&((e=e.declaredClass?e:new D(e)).emitTokenChange(),this.credentials.push(e));}));}findServerInfo(e){let t;e=this._sanitizeUrl(e);for(const s of this.serverInfos)if(this._hasSameServerInstance(s.server,e)){t=s;break}return t}findOAuthInfo(e){let t;e=this._sanitizeUrl(e);for(const s of this.oAuthInfos)if(this._hasSameServerInstance(s.portalUrl,e)){t=s;break}return t}findCredential(e,t){let s;e=this._sanitizeUrl(e);const r=this._isServerRsrc(e)?"server":"portal";if(t){for(const i of this.credentials)if(this._hasSameServerInstance(i.server,e)&&t===i.userId&&i.scope===r){s=i;break}}else for(const i of this.credentials)if(this._hasSameServerInstance(i.server,e)&&-1!==this._getIdenticalSvcIdx(e,i)&&i.scope===r){s=i;break}return s}getCredential(e,t){let s,r,n=!0;t&&(s=!!t.token,r=t.error,n=!1!==t.prompt),t={...t},e=this._sanitizeUrl(e);const o=new AbortController,a=z$2();if(t.signal&&v$4(t.signal,(()=>{o.abort();})),v$4(o,(()=>{a.reject(new s$b("identity-manager:user-aborted","ABORTED"));})),p$7(o))return a.promise;t.signal=o.signal;const h=this._isAdminResource(e),u=s?this.findCredential(e):null;let p;if(u&&r&&r.details&&498===r.details.httpStatus)u.destroy();else if(u)return p=new s$b("identity-manager:not-authorized","You are currently signed in as: '"+u.userId+"'. You do not have access to this resource: "+e,{error:r}),a.reject(p),a.promise;const g=this._findCredential(e,t);if(g)return a.resolve(g),a.promise;let f=this.findServerInfo(e);if(f)!f.hasServer&&this._isServerRsrc(e)&&(f._restInfoPms=this._getTokenSvcUrl(e),f.hasServer=!0);else {const t=this._getTokenSvcUrl(e);if(!t)return p=new s$b("identity-manager:unknown-resource","Unknown resource - could not find token service endpoint."),a.reject(p),a.promise;f=new i,f.server=this._getServerInstanceRoot(e),"string"==typeof t?(f.tokenServiceUrl=t,f.hasPortal=!0):(f._restInfoPms=t,f.hasServer=!0),this.registerServers([f]);}return f.hasPortal&&void 0===f._selfReq&&(n||B$1(f.tokenServiceUrl,this._appOrigin)||this._gwDomains.some((e=>e.tokenServiceUrl===f.tokenServiceUrl)))&&(f._selfReq={owningTenant:t&&t.owningTenant,selfDfd:this._getPortalSelf(f.tokenServiceUrl.replace(this._rePortalTokenSvc,"/sharing/rest/portals/self"),e)}),this._enqueue(e,f,t,a,h)}getResourceName(e){return this._isRESTService(e)?e.replace(this._regexSDirUrl,"").replace(this._regexServerType,"")||"":this._gwUser.test(e)&&e.replace(this._gwUser,"$1")||this._gwItem.test(e)&&e.replace(this._gwItem,"$1")||this._gwGroup.test(e)&&e.replace(this._gwGroup,"$1")||""}generateToken(e,t,s){const n=this._rePortalTokenSvc.test(e.tokenServiceUrl),o=new y$3(this._appOrigin),a=e.shortLivedTokenValidity;let h,l,c,d,p,g,f,m;t&&(m=this.tokenValidity||a||this.defaultTokenValidity,m>a&&a>0&&(m=a)),s&&(h=s.isAdmin,l=s.serverUrl,c=s.token,g=s.signal,f=s.ssl,e.customParameters=s.customParameters),h?d=e.adminTokenServiceUrl:(d=e.tokenServiceUrl,p=new y$3(d.toLowerCase()),e.webTierAuth&&null!=s&&s.serverUrl&&!f&&"http"===o.scheme&&(B$1(o.uri,d,!0)||"https"===p.scheme&&o.host===p.host&&"7080"===o.port&&"7443"===p.port)&&(d=d.replace(/^https:/i,"http:").replace(/:7443/i,":7080")));const v={query:{request:"getToken",username:null==t?void 0:t.username,password:null==t?void 0:t.password,serverUrl:l,token:c,expiration:m,referer:h||n?this._appOrigin:null,client:h?"referer":null,f:"json",...e.customParameters},method:"post",authMode:"anonymous",useProxy:this._useProxy(e,s),signal:g,...null==s?void 0:s.ioArgs};n||(v.withCredentials=!1);return C$2(d,v).then((s=>{const r=s.data;if(!r||!r.token)return new s$b("identity-manager:authentication-failed","Unable to generate token");const n=e.server;return T[n]||(T[n]={}),t&&(T[n][t.username]=t.password),r.validity=m,r}))}isBusy(){return !!this._busy}checkSignInStatus(e){return this.checkAppAccess(e,"").then((e=>e.credential))}checkAppAccess(e,t,s){let n=!1;return this.getCredential(e,{prompt:!1}).then((o=>{let a;const h={f:"json"};if("portal"===o.scope)if(t&&(this._doPortalSignIn(e)||s&&s.force))a=o.server+"/sharing/rest/oauth2/validateAppAccess",h.client_id=t;else {if(!o.token)return {credential:o};a=o.server+"/sharing/rest";}else {if(!o.token)return {credential:o};a=o.server+"/rest/services";}return o.token&&(h.token=o.token),C$2(a,{query:h,authMode:"anonymous"}).then((e=>{if(!1===e.data.valid)throw new s$b("identity-manager:not-authorized",`You are currently signed in as: '${o.userId}'.`,e.data);return n=!!e.data.viewOnlyUserTypeApp,{credential:o}})).catch((e=>{if("identity-manager:not-authorized"===e.name)throw e;const t=e.details&&e.details.httpStatus;if(498===t)throw o.destroy(),new s$b("identity-manager:not-authenticated","User is not signed in.");if(400===t)throw new s$b("identity-manager:invalid-request");return {credential:o}}))})).then((e=>({credential:e.credential,viewOnly:n})))}setOAuthResponseHash(e){var t;const s=this._oAuthDfd;if(this._oAuthDfd=null,!s||!e)return;clearInterval(this._oAuthIntervalId),null==(t=this._oAuthOnHashHandle)||t.remove(),"#"===e.charAt(0)&&(e=e.substring(1));const r=b$5(e);if(r.error){const e="access_denied"===r.error,t=new s$b(e?"identity-manager:user-aborted":"identity-manager:authentication-failed",e?"ABORTED":"OAuth: "+r.error+" - "+r.error_description);s.reject(t);}else {const e=s.sinfo_,t=s.oinfo_,i=t._oAuthCred,n=new D({userId:r.username,server:e.server,token:r.access_token,expires:Date.now()+1e3*Number(r.expires_in),ssl:"true"===r.ssl,_oAuthCred:i});t.userId=n.userId,i.storage=r.persist?b:P,i.token=n.token,i.expires=n.expires,i.userId=n.userId,i.ssl=n.ssl,i.save(),s.resolve(n);}}setOAuthRedirectionHandler(e){this._oAuthRedirectFunc=e;}setProtocolErrorHandler(e){this._protocolFunc=e;}signIn(e,t,s={}){const r=z$2(),n=()=>{var e,t,s,r,i;null==(e=h)||e.remove(),null==(t=d)||t.remove(),null==(s=u)||s.remove(),null==(r=a)||r.destroy(),null==(i=this.dialog)||i.destroy(),this.dialog=a=h=d=u=null;},o=()=>{n(),this._oAuthDfd=null,r.reject(new s$b("identity-manager:user-aborted","ABORTED"));};s.signal&&v$4(s.signal,(()=>{o();}));let a=new this.formConstructor;a.resource=this.getResourceName(e),a.server=t.server,this.dialog=new p$1,this.dialog.content=a,this.dialog.open=!0,this.emit("dialog-create");let h=a.on("cancel",o),d=this.dialog.watch("open",o),u=a.on("submit",(e=>{this.generateToken(t,e,{isAdmin:s.isAdmin,signal:s.signal}).then((i=>{n();const o=new D({userId:e.username,server:t.server,token:i.token,expires:null!=i.expires?Number(i.expires):null,ssl:!!i.ssl,isAdmin:s.isAdmin,validity:i.validity});r.resolve(o);})).catch((e=>{a.error=e,a.signingIn=!1;}));}));return r.promise}oAuthSignIn(e,t,s,r){this._oAuthDfd=z$2();const n=this._oAuthDfd;null!=r&&r.signal&&v$4(r.signal,(()=>{const e=this._oAuthDfd&&this._oAuthDfd.oAuthWin_;e&&!e.closed?e.close():this.dialog&&h();})),n.resUrl_=e,n.sinfo_=t,n.oinfo_=s;const o=!r||!1!==r.oAuthPopupConfirmation;if(!s.popup||!o)return this._doOAuthSignIn(e,t,s),n.promise;const a=new this.formConstructor;a.oAuthPrompt=!0,a.server=t.server,this.dialog=new p$1,this.dialog.content=a,this.dialog.open=!0,this.emit("dialog-create");const h=()=>{_(),this._oAuthDfd=null,n.reject(new s$b("identity-manager:user-aborted","ABORTED"));},d=a.on("cancel",h),u=this.dialog.watch("open",h),p=a.on("submit",(()=>{_(),this._doOAuthSignIn(e,t,s);})),_=()=>{d.remove(),u.remove(),p.remove(),a.destroy(),this.dialog.destroy(),this.dialog=null;};return n.promise}destroyCredentials(){if(this.credentials){this.credentials.slice().forEach((e=>{e.destroy();}));}this.emit("credentials-destroy");}enablePostMessageAuth(e="https://www.arcgis.com/sharing/rest"){this._postMessageAuthHandle&&this._postMessageAuthHandle.remove(),this._postMessageAuthHandle=r$6(window,"message",(t=>{var s;if((t.origin===this._appOrigin||t.origin.endsWith(".arcgis.com"))&&"arcgis:auth:requestCredential"===(null==(s=t.data)?void 0:s.type)){const s=t.source;this.getCredential(e).then((e=>{s.postMessage({type:"arcgis:auth:credential",credential:{expires:e.expires,server:e.server,ssl:e.ssl,token:e.token,userId:e.userId}},t.origin);})).catch((e=>{s.postMessage({type:"arcgis:auth:error",error:{name:e.name,message:e.message}},t.origin);}));}}));}disablePostMessageAuth(){this._postMessageAuthHandle&&(this._postMessageAuthHandle.remove(),this._postMessageAuthHandle=null);}_getOAuthHash(){let e=window.location.hash;if(e){"#"===e.charAt(0)&&(e=e.substring(1));const t=b$5(e);let s=!1;if(t.access_token&&t.expires_in&&t.state&&t.hasOwnProperty("username"))try{t.state=JSON.parse(t.state),"object"==typeof t.state&&t.state.portalUrl&&(this._oAuthHash=t,s=!0);}catch{}else t.error&&t.error_description&&(console.log("IdentityManager OAuth Error: ",t.error," - ",t.error_description),"access_denied"===t.error&&(s=!0));s&&(window.location.hash="object"==typeof t.state&&t.state.hash||"");}}_pageShowHandler(e){if(e.persisted&&this.isBusy()&&this._rejectOnPersistedPageShow){const e=new s$b("identity-manager:user-aborted","ABORTED");this._errbackFunc(e);}}_findCredential(e,t){let s,r,i,n,o=-1;const a=t&&t.token,h=t&&t.resource,l=this._isServerRsrc(e)?"server":"portal",c=this.credentials.filter((t=>this._hasSameServerInstance(t.server,e)&&t.scope===l));if(e=h||e,c.length)if(1===c.length){if(s=c[0],n=this.findServerInfo(s.server),r=n&&n.owningSystemUrl,i=r&&this.findCredential(r,s.userId),o=this._getIdenticalSvcIdx(e,s),!a)return -1===o&&s.resources.push(e),this._addResource(e,i),s;-1!==o&&(s.resources.splice(o,1),this._removeResource(e,i));}else {let t,s;if(c.some((a=>(s=this._getIdenticalSvcIdx(e,a),-1!==s&&(t=a,n=this.findServerInfo(t.server),r=n&&n.owningSystemUrl,i=r&&this.findCredential(r,t.userId),o=s,!0)))),a)t&&(t.resources.splice(o,1),this._removeResource(e,i));else if(t)return this._addResource(e,i),t}}_findOAuthInfo(e){let t=this.findOAuthInfo(e);if(!t)for(const s of this.oAuthInfos)if(this._isIdProvider(s.portalUrl,e)){t=s;break}return t}_addResource(e,t){t&&-1===this._getIdenticalSvcIdx(e,t)&&t.resources.push(e);}_removeResource(e,t){let s=-1;t&&(s=this._getIdenticalSvcIdx(e,t),s>-1&&t.resources.splice(s,1));}_useProxy(e,t){return t&&t.isAdmin&&!B$1(e.adminTokenServiceUrl,this._appOrigin)||!this._isPortalDomain(e.tokenServiceUrl)&&"10.1"===String(e.currentVersion)&&!B$1(e.tokenServiceUrl,this._appOrigin)}_getOrigin(e){const t=new y$3(e);return t.scheme+"://"+t.host+(null!=t.port?":"+t.port:"")}_getServerInstanceRoot(e){const t=e.toLowerCase();let s=t.indexOf(this._agsRest);return -1===s&&this._isAdminResource(e)&&(s=this._agsAdmin.test(e)?e.replace(this._agsAdmin,"$1").length:e.search(this._adminSvcs)),-1===s&&(s=t.indexOf("/sharing")),-1===s&&"/"===t.substr(-1)&&(s=t.length-1),s>-1?e.substring(0,s):e}_hasSameServerInstance(e,t){return "/"===e.substr(-1)&&(e=e.slice(0,-1)),e=e.toLowerCase(),t=this._getServerInstanceRoot(t).toLowerCase(),e=this._normalizeAGOLorgDomain(e),t=this._normalizeAGOLorgDomain(t),(e=e.substr(e.indexOf(":")))===(t=t.substr(t.indexOf(":")))}_normalizeAGOLorgDomain(e){const t=/^https?:\/\/(?:cdn|[a-z\d-]+\.maps)\.arcgis\.com/i,s=/^https?:\/\/(?:cdndev|[a-z\d-]+\.mapsdevext)\.arcgis\.com/i,r=/^https?:\/\/(?:cdnqa|[a-z\d-]+\.mapsqa)\.arcgis\.com/i;return t.test(e)?e=e.replace(t,"https://www.arcgis.com"):s.test(e)?e=e.replace(s,"https://devext.arcgis.com"):r.test(e)&&(e=e.replace(r,"https://qaext.arcgis.com")),e}_sanitizeUrl(e){const s=(r$7.request.proxyUrl||"").toLowerCase(),r=s?e.toLowerCase().indexOf(s+"?"):-1;return -1!==r&&(e=e.substring(r+s.length+1)),e=W(e),O$1(e).path}_isRESTService(e){return e.indexOf(this._agsRest)>-1}_isAdminResource(e){return this._agsAdmin.test(e)||this._adminSvcs.test(e)}_isServerRsrc(e){return this._isRESTService(e)||this._isAdminResource(e)}_isIdenticalService(e,t){let s;if(this._isRESTService(e)&&this._isRESTService(t)){const r=this._getSuffix(e).toLowerCase(),i=this._getSuffix(t).toLowerCase();if(s=r===i,!s){const e=/(.*)\/(MapServer|FeatureServer|UtilityNetworkServer).*/gi;s=r.replace(e,"$1")===i.replace(e,"$1");}}else this._isAdminResource(e)&&this._isAdminResource(t)?s=!0:this._isServerRsrc(e)||this._isServerRsrc(t)||!this._isPortalDomain(e)||(s=!0);return s}_isPortalDomain(e){const s=new y$3(e.toLowerCase()),r=this._portalConfig;let i=this._gwDomains.some((e=>e.regex.test(s.uri)));return !i&&r&&(i=this._hasSameServerInstance(this._getServerInstanceRoot(r.restBaseUrl),s.uri)),i||r$7.portalUrl&&(i=B$1(s,r$7.portalUrl,!0)),i||(i=this._portals.some((e=>this._hasSameServerInstance(e,s.uri)))),i=i||this._agsPortal.test(s.path),i}_isIdProvider(e,t){let s=-1,r=-1;this._gwDomains.forEach(((i,n)=>{-1===s&&i.regex.test(e)&&(s=n),-1===r&&i.regex.test(t)&&(r=n);}));let i=!1;if(s>-1&&r>-1&&(0===s||4===s?0!==r&&4!==r||(i=!0):1===s?1!==r&&2!==r||(i=!0):2===s?2===r&&(i=!0):3===s&&3===r&&(i=!0)),!i){const s=this.findServerInfo(t),r=s&&s.owningSystemUrl;r&&O(s)&&this._isPortalDomain(r)&&this._isIdProvider(e,r)&&(i=!0);}return i}_getIdenticalSvcIdx(e,t){let s=-1;for(let r=0;r<t.resources.length;r++){const i=t.resources[r];if(this._isIdenticalService(e,i)){s=r;break}}return s}_getSuffix(e){return e.replace(this._regexSDirUrl,"").replace(this._regexServerType,"$1")}_getTokenSvcUrl(e){let t,s,i;if(this._isRESTService(e)||this._isAdminResource(e)){const i=this._getServerInstanceRoot(e);return t=i+"/admin/generateToken",s=C$2(e=i+"/rest/info",{query:{f:"json"}}).then((e=>e.data)),{adminUrl:t,promise:s}}if(this._isPortalDomain(e)){let t="";if(this._gwDomains.some((s=>(s.regex.test(e)&&(t=s.tokenServiceUrl),!!t))),t||this._portals.some((s=>(this._hasSameServerInstance(s,e)&&(t=s+this._gwTokenUrl),!!t))),t||(i=e.toLowerCase().indexOf("/sharing"),-1!==i&&(t=e.substring(0,i)+this._gwTokenUrl)),t||(t=this._getOrigin(e)+this._gwTokenUrl),t){const s=new y$3(e).port;/^http:\/\//i.test(e)&&"7080"===s&&(t=t.replace(/:7080/i,":7443")),t=t.replace(/http:/i,"https:");}return t}if(-1!==e.toLowerCase().indexOf("premium.arcgisonline.com"))return "https://premium.arcgisonline.com/server/tokens"}_exchangeToken(e,t,s){return C$2(`${e}/sharing/rest/oauth2/exchangeToken`,{authMode:"anonymous",method:"post",query:{f:"json",client_id:t,token:s}}).then((e=>e.data.token))}_getPlatformSelf(e,t){return e=e.replace(/^http:/i,"https:"),C$2(`${e}/sharing/rest/oauth2/platformSelf`,{authMode:"anonymous",headers:{"X-Esri-Auth-Client-Id":t,"X-Esri-Auth-Redirect-Uri":window.location.href.replace(/#.*$/,"")},method:"post",query:{f:"json"},withCredentials:!0}).then((e=>e.data))}_getPortalSelf(e,t){let s;if(this._gwDomains.some((t=>(t.regex.test(e)&&(s=t.customBaseUrl),!!s))),s)return Promise.resolve({allSSL:!0,currentVersion:"4.4",customBaseUrl:s,portalMode:"multitenant",supportsOAuth:!0});this._appOrigin.startsWith("https:")?e=e.replace(/^http:/i,"https:").replace(/:7080/i,":7443"):/^http:/i.test(t)&&(e=e.replace(/^https:/i,"http:").replace(/:7443/i,":7080"));return C$2(e,{query:{f:"json"},authMode:"anonymous",withCredentials:!0}).then((e=>e.data))}_doPortalSignIn(e){const t=this._portalConfig,s=window.location.href,r=this.findServerInfo(e);return !(!t&&!this._isPortalDomain(s)||!(r?r.hasPortal||r.owningSystemUrl&&this._isPortalDomain(r.owningSystemUrl):this._isPortalDomain(e))||!(this._isIdProvider(s,e)||t&&(this._hasSameServerInstance(this._getServerInstanceRoot(t.restBaseUrl),e)||this._isIdProvider(t.restBaseUrl,e))||B$1(s,e,!0)))}_checkProtocol(e,t,s,r){let n=!0;const o=r?t.adminTokenServiceUrl:t.tokenServiceUrl;if(o.trim().toLowerCase().startsWith("https:")&&!this._appOrigin.startsWith("https:")&&S$2(o)&&(n=!!this._protocolFunc&&!!this._protocolFunc({resourceUrl:e,serverInfo:t}),!n)){s(new s$b("identity-manager:aborted","Aborted the Sign-In process to avoid sending password over insecure connection."));}return n}_enqueue(e,t,s,r,i,n){return r||(r=z$2()),r.resUrl_=e,r.sinfo_=t,r.options_=s,r.admin_=i,r.refresh_=n,this._busy?this._hasSameServerInstance(this._getServerInstanceRoot(e),this._busy.resUrl_)?(this._oAuthDfd&&this._oAuthDfd.oAuthWin_&&this._oAuthDfd.oAuthWin_.focus(),this._soReqs.push(r)):this._xoReqs.push(r):this._doSignIn(r),r.promise}_doSignIn(e){this._busy=e,this._rejectOnPersistedPageShow=!1;const t=t=>{const s=e.options_&&e.options_.resource,r=e.resUrl_,i=e.refresh_;let n=!1;-1===this.credentials.indexOf(t)&&(i&&-1!==this.credentials.indexOf(i)?(i.userId=t.userId,i.token=t.token,i.expires=t.expires,i.validity=t.validity,i.ssl=t.ssl,i.creationTime=t.creationTime,n=!0,t=i):this.credentials.push(t)),t.resources||(t.resources=[]),t.resources.push(s||r),t.scope=this._isServerRsrc(r)?"server":"portal",t.emitTokenChange();const o=this._soReqs,a={};this._soReqs=[],o.forEach((e=>{if(!this._isIdenticalService(r,e.resUrl_)){const s=this._getSuffix(e.resUrl_);a[s]||(a[s]=!0,t.resources.push(e.resUrl_));}})),e.resolve(t),o.forEach((e=>{this._hasSameServerInstance(this._getServerInstanceRoot(r),e.resUrl_)?e.resolve(t):this._soReqs.push(e);})),this._busy=e.resUrl_=e.sinfo_=e.refresh_=null,n||this.emit("credential-create",{credential:t}),this._soReqs.length?this._doSignIn(this._soReqs.shift()):this._xoReqs.length&&this._doSignIn(this._xoReqs.shift());},s=t=>{e.reject(t),this._busy=e.resUrl_=e.sinfo_=e.refresh_=null,this._soReqs.length?this._doSignIn(this._soReqs.shift()):this._xoReqs.length&&this._doSignIn(this._xoReqs.shift());},r=(r,n,a,h)=>{var l,d;const u=e.sinfo_,p=!e.options_||!1!==e.options_.prompt,g=u.hasPortal&&this._findOAuthInfo(e.resUrl_);let f,m;if(r)t(new D({userId:r,server:u.server,token:a||null,expires:null!=h?Number(h):null,ssl:!!n}));else if(window!==window.parent&&null!=(l=this._appUrlObj.query)&&l["arcgis-auth-origin"]&&null!=(d=this._appUrlObj.query)&&d["arcgis-auth-portal"]&&this._hasSameServerInstance(this._getServerInstanceRoot(this._appUrlObj.query["arcgis-auth-portal"]),e.resUrl_)){var v;window.parent.postMessage({type:"arcgis:auth:requestCredential"},this._appUrlObj.query["arcgis-auth-origin"]);const r=r$6(window,"message",(e=>{e.source===window.parent&&e.data&&("arcgis:auth:credential"===e.data.type?(r.remove(),e.data.credential.expires<Date.now()?s(new s$b("identity-manager:credential-request-failed","Parent application's token has expired.")):t(new D(e.data.credential))):"arcgis:auth:error"===e.data.type&&(r.remove(),"tokenExpiredError"===e.data.error.name?s(new s$b("identity-manager:credential-request-failed","Parent application's token has expired.")):s(s$b.fromJSON(e.data.error))));}));v$4(null==(v=e.options_)?void 0:v.signal,(()=>{r.remove();}));}else if(g){let r=g._oAuthCred;if(!r){const e=new s$3(g,b),t=new s$3(g,P);e.isValid()&&t.isValid()?e.expires>t.expires?(r=e,t.destroy()):(r=t,e.destroy()):r=e.isValid()?e:t,g._oAuthCred=r;}if(r.isValid())f=new D({userId:r.userId,server:u.server,token:r.token,expires:r.expires,ssl:r.ssl,_oAuthCred:r}),g.appId!==r.appId&&this._doPortalSignIn(e.resUrl_)?e._pendingDfd=this._exchangeToken(f.server,g.appId,f.token).then((e=>{f.token=e,r.token=e,r.save(),t(f);})).catch((()=>{t(f);})):t(f);else if(this._oAuthHash&&this._hasSameServerInstance(g.portalUrl,this._oAuthHash.state.portalUrl)){const e=this._oAuthHash;f=new D({userId:e.username,server:u.server,token:e.access_token,expires:Date.now()+1e3*Number(e.expires_in),ssl:"true"===e.ssl,oAuthState:e.state,_oAuthCred:r}),g.userId=f.userId,r.storage=e.persist?b:P,r.token=f.token,r.expires=f.expires,r.userId=f.userId,r.ssl=f.ssl,r.save(),this._oAuthHash=null,t(f);}else {const r=()=>{p?e._pendingDfd=this.oAuthSignIn(e.resUrl_,u,g,e.options_).then(t,s):(m=new s$b("identity-manager:not-authenticated","User is not signed in."),s(m));};this._doPortalSignIn(e.resUrl_)?e._pendingDfd=this._getPlatformSelf(u.server,g.appId).then((({portalUrl:e,token:s,username:i})=>{!e||B$1(e,this._appOrigin,!0)?(f=new D({server:u.server,userId:i,token:s}),t(f)):r();})).catch(r):r();}}else if(p){if(this._checkProtocol(e.resUrl_,u,s,e.admin_)){let r=e.options_;e.admin_&&(r=r||{},r.isAdmin=!0),e._pendingDfd=this.signIn(e.resUrl_,u,r).then(t,s);}}else m=new s$b("identity-manager:not-authenticated","User is not signed in."),s(m);},n=()=>{const r=e.sinfo_,i=r.owningSystemUrl,n=e.options_;let o,a,h,l;if(n&&(o=n.token,a=n.error,h=n.prompt),l=this._findCredential(i,{token:o,resource:e.resUrl_}),!l)for(const e of this.credentials)if(this._isIdProvider(i,e.server)){l=e;break}if(l){const i=this.findCredential(e.resUrl_,l.userId);if(i)t(i);else if(R(r,this._legacyFed)){const e=l.toJSON();e.server=r.server,e.resources=null,t(new D(e));}else {(e._pendingDfd=this.generateToken(this.findServerInfo(l.server),null,{serverUrl:e.resUrl_,token:l.token,signal:e.options_.signal,ssl:l.ssl})).then((s=>{t(new D({userId:l.userId,server:r.server,token:s.token,expires:null!=s.expires?Number(s.expires):null,ssl:!!s.ssl,isAdmin:e.admin_,validity:s.validity}));}),s);}}else {this._busy=null,o&&(e.options_.token=null);(e._pendingDfd=this.getCredential(i.replace(/\/?$/,"/sharing"),{resource:e.resUrl_,owningTenant:r.owningTenant,signal:e.options_.signal,token:o,error:a,prompt:h})).then((()=>{this._enqueue(e.resUrl_,e.sinfo_,e.options_,e,e.admin_);}),(t=>{e.resUrl_=e.sinfo_=e.refresh_=null,e.reject(t);}));}};this._errbackFunc=s;const a=e.sinfo_.owningSystemUrl,l=this._isServerRsrc(e.resUrl_),d=e.sinfo_._restInfoPms;d?d.promise.then((t=>{const s=e.sinfo_;if(s._restInfoPms){s.adminTokenServiceUrl=s._restInfoPms.adminUrl,s._restInfoPms=null,s.tokenServiceUrl=t$6("authInfo.tokenServicesUrl",t)||t$6("authInfo.tokenServiceUrl",t)||t$6("tokenServiceUrl",t),s.shortLivedTokenValidity=t$6("authInfo.shortLivedTokenValidity",t),s.currentVersion=t.currentVersion,s.owningTenant=t.owningTenant;const e=s.owningSystemUrl=t.owningSystemUrl;e&&this._portals.push(e);}l&&s.owningSystemUrl?n():r();}),(()=>{e.sinfo_._restInfoPms=null;const t=new s$b("identity-manager:server-identification-failed","Unknown resource - could not find token service endpoint.");s(t);})):l&&a?n():e.sinfo_._selfReq?e.sinfo_._selfReq.selfDfd.then((t=>{const s={};let r,i,n,o;return t&&(r=t.user&&t.user.username,s.username=r,s.allSSL=t.allSSL,i=t.supportsOAuth,n=t.currentVersion,"multitenant"===t.portalMode&&(o=t.customBaseUrl)),e.sinfo_.webTierAuth=!!r,r&&this.normalizeWebTierAuth?this.generateToken(e.sinfo_,null,{ssl:s.allSSL}).catch((()=>null)).then((e=>(s.portalToken=e&&e.token,s.tokenExpiration=e&&e.expires,s))):!r&&i&&parseFloat(n)>=4.4&&!this._findOAuthInfo(e.resUrl_)?this._generateOAuthInfo({portalUrl:e.sinfo_.server,customBaseUrl:o,owningTenant:e.sinfo_._selfReq.owningTenant}).catch((()=>null)).then((()=>s)):s})).catch((()=>null)).then((t=>{e.sinfo_._selfReq=null,t?r(t.username,t.allSSL,t.portalToken,t.tokenExpiration):r();})):r();}_generateOAuthInfo(e){let t,s,i=e.portalUrl;const n=e.customBaseUrl,o=e.owningTenant,a=!this.defaultOAuthInfo&&this._createDefaultOAuthInfo&&!this._hasTestedIfAppIsOnPortal;if(a){s=window.location.href;let e=s.indexOf("?");e>-1&&(s=s.slice(0,e)),e=s.search(/\/(apps|home)\//),s=e>-1?s.slice(0,e):null;}return a&&s?(this._hasTestedIfAppIsOnPortal=!0,t=C$2(s+"/sharing/rest",{query:{f:"json"}}).then((()=>{this.defaultOAuthInfo=new i$1({appId:"arcgisonline",popupCallbackUrl:s+"/home/oauth-callback.html"});}))):t=Promise.resolve(),t.then((()=>{if(this.defaultOAuthInfo)return i=i.replace(/^http:/i,"https:"),C$2(i+"/sharing/rest/oauth2/validateRedirectUri",{query:{accountId:o,client_id:this.defaultOAuthInfo.appId,redirect_uri:N$4(this.defaultOAuthInfo.popupCallbackUrl),f:"json"}}).then((e=>{if(e.data.valid){const t=this.defaultOAuthInfo.clone();e.data.urlKey&&n?t.portalUrl="https://"+e.data.urlKey.toLowerCase()+"."+n:t.portalUrl=i,t.popup=window!==window.top||!(B$1(i,this._appOrigin)||this._gwDomains.some((e=>e.regex.test(i)&&e.regex.test(this._appOrigin)))),this.oAuthInfos.push(t);}}))}))}_doOAuthSignIn(e,t,s){const r={portalUrl:s.portalUrl};!s.popup&&s.preserveUrlHash&&window.location.hash&&(r.hash=window.location.hash);const n={client_id:s.appId,response_type:"token",state:JSON.stringify(r),expiration:s.expiration,locale:s.locale,redirect_uri:s.popup?N$4(s.popupCallbackUrl):window.location.href.replace(/#.*$/,"")};s.forceLogin&&(n.force_login=!0),s.forceUserId&&s.userId&&(n.prepopulatedusername=s.userId),!s.popup&&this._doPortalSignIn(e)&&(n.redirectToUserOrgUrl=!0);const a=s.portalUrl.replace(/^http:/i,"https:")+"/sharing/oauth2/authorize",h=a+"?"+C$3(n);if(s.popup){const e=window.open(h,"esriJSAPIOAuth",s.popupWindowFeatures);if(e)e.focus(),this._oAuthDfd.oAuthWin_=e,this._oAuthIntervalId=setInterval((()=>{if(e.closed){clearInterval(this._oAuthIntervalId),this._oAuthOnHashHandle.remove();const e=this._oAuthDfd;if(e){const t=new s$b("identity-manager:user-aborted","ABORTED");e.reject(t);}}}),500),this._oAuthOnHashHandle=r$6(window,"arcgis:auth:hash",(e=>{this.setOAuthResponseHash(e.detail);}));else {const e=new s$b("identity-manager:popup-blocked","ABORTED");this._oAuthDfd.reject(e);}}else this._rejectOnPersistedPageShow=!0,this._oAuthRedirectFunc?this._oAuthRedirectFunc({authorizeParams:n,authorizeUrl:a,resourceUrl:e,serverInfo:t,oAuthInfo:s}):window.location.href=h;}}C.prototype.declaredClass="esri.identity.IdentityManagerBase";let D=class extends n$7.EventedAccessor{constructor(e){super(e),this._oAuthCred=null,this.tokenRefreshBuffer=2,e&&e._oAuthCred&&(this._oAuthCred=e._oAuthCred);}initialize(){this.resources=this.resources||[],null==this.creationTime&&(this.creationTime=Date.now());}refreshToken(){const e=n$9.findServerInfo(this.server),t=e&&e.owningSystemUrl,r=!!t&&"server"===this.scope,i=r&&R(e,n$9._legacyFed),n=e.webTierAuth,o=n&&n$9.normalizeWebTierAuth,a=T[this.server],h=a&&a[this.userId];let l,c=this.resources&&this.resources[0],d=r&&n$9.findServerInfo(t),u={username:this.userId,password:h};if(n&&!o)return;r&&!d&&n$9.serverInfos.some((e=>(n$9._isIdProvider(t,e.server)&&(d=e),!!d)));const p=d&&n$9.findCredential(d.server,this.userId);if(!r||p){if(!i){if(r)l={serverUrl:c,token:p&&p.token,ssl:p&&p.ssl};else if(o)u=null,l={ssl:this.ssl};else {if(!h){let t;return c&&(c=n$9._sanitizeUrl(c),this._enqueued=1,t=n$9._enqueue(c,e,null,null,this.isAdmin,this),t.then((()=>{this._enqueued=0,this.refreshServerTokens();})).catch((()=>{this._enqueued=0;}))),t}this.isAdmin&&(l={isAdmin:!0});}return n$9.generateToken(r?d:e,r?null:u,l).then((e=>{this.token=e.token,this.expires=null!=e.expires?Number(e.expires):null,this.creationTime=Date.now(),this.validity=e.validity,this.emitTokenChange(),this.refreshServerTokens();})).catch((()=>{}))}p.refreshToken();}}refreshServerTokens(){"portal"===this.scope&&n$9.credentials.forEach((e=>{const t=n$9.findServerInfo(e.server),r=t&&t.owningSystemUrl;e!==this&&e.userId===this.userId&&r&&"server"===e.scope&&(n$9._hasSameServerInstance(this.server,r)||n$9._isIdProvider(r,this.server))&&(R(t,n$9._legacyFed)?(e.token=this.token,e.expires=this.expires,e.creationTime=this.creationTime,e.validity=this.validity,e.emitTokenChange()):e.refreshToken());}));}emitTokenChange(e){clearTimeout(this._refreshTimer);const t=this.server&&n$9.findServerInfo(this.server),r=t&&t.owningSystemUrl,i=r&&n$9.findServerInfo(r);!1===e||r&&"portal"!==this.scope&&(!i||!i.webTierAuth||n$9.normalizeWebTierAuth)||null==this.expires&&null==this.validity||this._startRefreshTimer(),this.emit("token-change");}destroy(){this.userId=this.server=this.token=this.expires=this.validity=this.resources=this.creationTime=null,this._oAuthCred&&(this._oAuthCred.destroy(),this._oAuthCred=null);const e=n$9.credentials.indexOf(this);e>-1&&n$9.credentials.splice(e,1),this.emitTokenChange(),this.emit("destroy");}toJSON(){const e=y$2({userId:this.userId,server:this.server,token:this.token,expires:this.expires,validity:this.validity,ssl:this.ssl,isAdmin:this.isAdmin,creationTime:this.creationTime,scope:this.scope}),t=this.resources;return t&&t.length>0&&(e.resources=t.slice()),e}_startRefreshTimer(){clearTimeout(this._refreshTimer);const e=6e4*this.tokenRefreshBuffer,t=2**31-1;let s=(this.validity?this.creationTime+6e4*this.validity:this.expires)-Date.now();s<0?s=0:s>t&&(s=t),this._refreshTimer=setTimeout(this.refreshToken.bind(this),s>e?s-e:s);}};e$8([d$7()],D.prototype,"creationTime",void 0),e$8([d$7()],D.prototype,"expires",void 0),e$8([d$7()],D.prototype,"isAdmin",void 0),e$8([d$7()],D.prototype,"oAuthState",void 0),e$8([d$7()],D.prototype,"resources",void 0),e$8([d$7()],D.prototype,"scope",void 0),e$8([d$7()],D.prototype,"server",void 0),e$8([d$7()],D.prototype,"ssl",void 0),e$8([d$7()],D.prototype,"token",void 0),e$8([d$7()],D.prototype,"tokenRefreshBuffer",void 0),e$8([d$7()],D.prototype,"userId",void 0),e$8([d$7()],D.prototype,"validity",void 0),D=e$8([i$6("esri.identity.Credential")],D);

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.22/esri/copyright.txt for details.
*/
class r extends C{}r.prototype.declaredClass="esri.identity.IdentityManager";const s=new r;o$4(s);

export default s;
