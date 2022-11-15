/*!
 * maska v1.5.1
 * (c) 2019-2022 Alexander Shabunevich
 * Released under the MIT License.
 */
function e(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function t(t){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?e(Object(r),!0).forEach((function(e){a(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):e(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var o={"#":{pattern:/[0-9]/},X:{pattern:/[0-9a-zA-Z]/},S:{pattern:/[a-zA-Z]/},A:{pattern:/[a-zA-Z]/,uppercase:!0},a:{pattern:/[a-zA-Z]/,lowercase:!0},"!":{escape:!0},"*":{repeat:!0}};function s(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:o,r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];return i(t).length>1?u(t)(e,t,n,r):p(e,t,n,r)}function i(e){try{return JSON.parse(e)}catch(t){return[e]}}function u(e){var t=i(e).sort((function(e,t){return e.length-t.length}));return function(e,r,a){var o=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],s=t.map((function(t){return p(e,t,a,!1)})),i=s.pop();for(var u in t)if(n(i,t[u],a))return p(e,t[u],a,o);return""};function n(e,t,n){for(var r in n)n[r].escape&&(t=t.replace(new RegExp(r+".{1}","g"),""));return t.split("").filter((function(e){return n[e]&&n[e].pattern})).length>=e.length}}function p(e,t,n){for(var r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],a=0,o=0,s="",i="";a<t.length&&o<e.length;){var u=t[a],p=e[o],c=n[u];if(c&&c.pattern)c.pattern.test(p)&&(s+=l(p,c),a++,r&&t[a]&&(n[t[a]]?n[t[a]]&&n[t[a]].escape&&(s+=t[a+1],a+=2):(s+=t[a],a++))),o++;else if(c&&c.repeat){var f=n[t[a-1]];f&&!f.pattern.test(p)?a++:a--}else c&&c.escape&&(u=t[++a]),r&&(s+=u),p===u&&o++,a++}for(;r&&a<t.length;){var v=t[a];if(n[v]){i="";break}i+=v,a++}return s+i}function l(e,t){return t.transform&&(e=t.transform(e)),t.uppercase?e.toLocaleUpperCase():t.lowercase?e.toLocaleLowerCase():e}function c(e){return e instanceof HTMLInputElement?e:e.querySelector("input")||e}function f(e){return"[object String]"===Object.prototype.toString.call(e)}var v=function(){function e(r){var a=this,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(n(this,e),!r)throw new Error("Maska: no element for mask");if(null!=s.preprocessor&&"function"!=typeof s.preprocessor)throw new Error("Maska: preprocessor must be a function");if(s.tokens)for(var i in s.tokens)s.tokens[i]=t({},s.tokens[i]),s.tokens[i].pattern&&f(s.tokens[i].pattern)&&(s.tokens[i].pattern=new RegExp(s.tokens[i].pattern));this._opts={mask:s.mask,tokens:t(t({},o),s.tokens),preprocessor:s.preprocessor},this._el=f(r)?document.querySelectorAll(r):r.length?r:[r],this.inputEvent=function(e){return a.updateValue(e.target,e)},this.init()}var a,i,u;return a=e,(i=[{key:"init",value:function(){for(var e=this,t=function(t){var n=c(e._el[t]);!e._opts.mask||n.dataset.mask&&n.dataset.mask===e._opts.mask||(n.dataset.mask=e._opts.mask),setTimeout((function(){return e.updateValue(n)}),0),n.dataset.maskInited||(n.dataset.maskInited=!0,n.addEventListener("input",e.inputEvent),n.addEventListener("beforeinput",e.beforeInput))},n=0;n<this._el.length;n++)t(n)}},{key:"destroy",value:function(){for(var e=0;e<this._el.length;e++){var t=c(this._el[e]);t.removeEventListener("input",this.inputEvent),t.removeEventListener("beforeinput",this.beforeInput),delete t.dataset.mask,delete t.dataset.maskInited}}},{key:"updateValue",value:function(e,t){if(e&&e.type){var n=e.type.match(/^number$/i)&&e.validity.badInput;if(!e.value&&!n||!e.dataset.mask)return e.dataset.maskRawValue="",void this.dispatch("maska",e,t);var r=e.selectionEnd,a=e.value,o=a[r-1];e.dataset.maskRawValue=s(e.value,e.dataset.mask,this._opts.tokens,!1);var i=e.value;this._opts.preprocessor&&(i=this._opts.preprocessor(i)),e.value=s(i,e.dataset.mask,this._opts.tokens),t&&"insertText"===t.inputType&&r===a.length&&(r=e.value.length),function(e,t,n){for(;t&&t<e.value.length&&e.value.charAt(t-1)!==n;)t++;(e.type?e.type.match(/^(text|search|password|tel|url)$/i):!e.type)&&e===document.activeElement&&(e.setSelectionRange(t,t),setTimeout((function(){e.setSelectionRange(t,t)}),0))}(e,r,o),this.dispatch("maska",e,t),e.value!==a&&this.dispatch("input",e,t)}}},{key:"beforeInput",value:function(e){e&&e.target&&e.target.type&&e.target.type.match(/^number$/i)&&e.data&&isNaN(e.target.value+e.data)&&e.preventDefault()}},{key:"dispatch",value:function(e,t,n){t.dispatchEvent(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=document.createEvent("Event");return n.initEvent(e,!0,!0),t&&(n.inputType=t),n}(e,n&&n.inputType||null))}}])&&r(a.prototype,i),u&&r(a,u),Object.defineProperty(a,"prototype",{writable:!1}),e}();var d,h=(d=new WeakMap,function(e,n){n.value&&(d.has(e)&&!function(e){return!(f(e.value)&&e.value===e.oldValue||Array.isArray(e.value)&&JSON.stringify(e.value)===JSON.stringify(e.oldValue)||e.value&&e.value.mask&&e.oldValue&&e.oldValue.mask&&e.value.mask===e.oldValue.mask)}(n)||d.set(e,new v(e,function(e){var n={};return e.mask?(n.mask=Array.isArray(e.mask)?JSON.stringify(e.mask):e.mask,n.tokens=e.tokens?t({},e.tokens):{},n.preprocessor=e.preprocessor):n.mask=Array.isArray(e)?JSON.stringify(e):e,n}(n.value))))});function k(e){e.directive("maska",h)}function m(e,t){return new v(e,t)}"undefined"!=typeof window&&window.Vue&&window.Vue.use&&window.Vue.use(k);export default k;export{m as create,k as install,s as mask,h as maska,o as tokens};
