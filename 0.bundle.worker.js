!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=1)}([function(e,t,r){"use strict";e.exports=function(e){function t(e,t,r,n){function o(t){"function"!=typeof self.postMessage?e.ports[0].postMessage(t):self.postMessage(t)}r?("undefined"!=typeof console&&"error"in console&&console.error("Worker caught an error:",r),o([t,{message:r.message}])):o([t,null,n])}self.addEventListener("message",(function(r){var n=r.data;if(Array.isArray(n)&&2===n.length){var o=n[0],s=n[1];"function"!=typeof e?t(r,o,new Error("Please pass a function into register().")):function(e,r,n,o){var s,u=function(e,t){try{return{res:e(t)}}catch(e){return{err:e}}}(r,o);u.err?t(e,n,u.err):!(s=u.res)||"object"!=typeof s&&"function"!=typeof s||"function"!=typeof s.then?t(e,n,null,u.res):u.res.then((function(r){t(e,n,null,r)}),(function(r){t(e,n,r)}))}(r,e,o,s)}}))}},function(e,t,r){"use strict";r.r(t);var n=r(0),o=r.n(n);const s=e=>Array.from(Array(e).keys()),u={R:"#FF0000",G:"#00FF00",B:"#0000FF",Y:"#FFFF00",BL:"#000000",WH:"#FFFFFF"},c=(Object.values(u),{R:"R",G:"G",B:"B",Y:"Y",BL:"BL",WH:"WH"}),f=Object.values(c),i=Array.from(function*(){for(const e of f)for(const t of f)for(const r of f)for(const n of f)yield[e,t,r,n]}()),a=Array.from(function*(){for(const e of s(5))for(const t of s(5))yield{blacks:e,whites:t}}()).filter(e=>e.blacks+e.whites<=4).filter(e=>!(3===e.blacks&&1===e.whites)),l=(e,t)=>(e===t[0]?1:0)+(e===t[1]?1:0)+(e===t[2]?1:0)+(e===t[3]?1:0),y=(e,t)=>r=>{return n=((e,t)=>{let r=0;f.forEach(n=>{const o=l(n,e),s=l(n,t),u=Math.min(o,s);r+=u});const n=((e,t)=>(e[0]===t[0]?1:0)+(e[1]===t[1]?1:0)+(e[2]===t[2]?1:0)+(e[3]===t[3]?1:0))(e,t);return{blacks:n,whites:r-n}})(e,r),o=t,n.blacks===o.blacks&&n.whites===o.whites;var n,o};o()(e=>{switch(e.type){case"findBest":return t=e.untried,i.reduce((e,r)=>{const n=a.reduce((e,n)=>{const o=(s=t,u=y(r,n),s.reduce((e,t)=>e+(u(t)?1:0),0));var s,u;return Math.max(e,o)},0);return n<e.count?{count:n,guess:r}:e},{count:Number.MAX_VALUE}).guess;default:return(e=>{console.log("Unknown message: "+JSON.stringify(e))})(e)}var t})}]);
//# sourceMappingURL=0.bundle.worker.js.map