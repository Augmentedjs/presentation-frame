!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("presentation-decorator"),require("presentation-dom")):"function"==typeof define&&define.amd?define("presentation-facets",["presentation-decorator","presentation-dom"],t):"object"==typeof exports?exports["presentation-facets"]=t(require("presentation-decorator"),require("presentation-dom")):e["presentation-facets"]=t(e["presentation-decorator"],e["presentation-dom"])}(this,function(e,t){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/dist/",r(r.s=0)}([function(e,t,r){"use strict";var n,o=r(1),i=(n=o)&&n.__esModule?n:{default:n};e.exports=i.default},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,o=r(2),i=r(3),s=(n=i)&&n.__esModule?n:{default:n},a=r(4);const l="filterForm",u=console;t.default=class extends o.DirectiveView{constructor(e){super(e),this._filters=[]}addFilter(e,t,r){this._filters.push({id:e,name:t,collection:r})}render(){return(0,a.createTemplate)(this),super.render()}remove(){return super.remove()}submit(e){e.preventDefault();const t=new FormData(document.querySelector(`#${l}`)),r={};t.forEach((e,t)=>{if(r[t])if(Array.isArray(r[t]))r[t].push(e);else{const n=[];n.push(r[t]),n.push(e),r[t]=n}else r[t]=e});const n=JSON.stringify(r);u.debug("form:"+n)}collapse(e){const t=e.target.getAttribute(`data-${this.name}`),r=s.default.toggleClass(`#${t}`,"collapse");s.default.toggleClass(e.target,"collapse"),u.debug(`Toggle - ${r} id: ${t}`)}filter(e){u.debug("Filter was changed - submit"),this.submit(e)}toggle(e){if(e){const e=s.default.selector(this.el);e?e.classList.add("hide"):u.warn("El did not select")}else{const e=s.default.selector(this.el);e?e.classList.remove("hide"):u.warn("El did not select")}}}},function(t,r){t.exports=e},function(e,r){e.exports=t},function(e,t,r){"use strict";function n(e,t,r,n,o,i,s){try{var a=e[i](s),l=a.value}catch(e){return void r(e)}a.done?t(l):Promise.resolve(l).then(n,o)}Object.defineProperty(t,"__esModule",{value:!0});const o={name:"Projects",id:"project"},i=t.createCheckboxes=((e,t,r)=>{let n="",o=0;const i=t.length?t.length:0;for(o=0;o<i;o++)n+=`<label><input type="checkbox" data-${e}="${t[o].name}" value="${t[o].value}" data-function="filter" name="${r}" />${t[o].name}</label>`;return n});t.createTemplate=(s=function*(e){try{const t=e._filters,r=t.length;let n=0,s=`<div class="content"><h1></h1><form id="${FILTER_FORM_ID}">`;for(;n<r;n++)s+=`\n        <h2 data-${e.name}="${t[n].id}" data-click="collapse" class="toggle collapse">${t[n].name}</h2>\n        <div id="${o.id}" class="toggle collapse">\n          ${i(t[n].name,t[n].collection,t[n].id)}\n        </div>\n      `;return s+=`<button type="submit" data-${e.name}="submit" data-click="submit">Filter</button></form></div>`}catch(e){return Logger.error(e),null}},a=function(){var e=this,t=arguments;return new Promise(function(r,o){var i=s.apply(e,t);function a(e){n(i,r,o,a,l,"next",e)}function l(e){n(i,r,o,a,l,"throw",e)}a(void 0)})},function(e){return a.apply(this,arguments)});var s,a}])});
//# sourceMappingURL=presentation-facets.js.map