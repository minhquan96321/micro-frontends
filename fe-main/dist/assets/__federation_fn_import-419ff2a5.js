import{_ as ge}from"./preload-helper-af55858a.js";let B,q,x,ye=(async()=>{const A="[0-9A-Za-z-]+",R=`(?:\\+(${A}(?:\\.${A})*))`,d="0|[1-9]\\d*",_="[0-9]+",E="\\d*[a-zA-Z-][a-zA-Z0-9-]*",T=`(?:${_}|${E})`,F=`(?:-?(${T}(?:\\.${T})*))`,V=`(?:${d}|${E})`,k=`(?:-(${V}(?:\\.${V})*))`,b=`${d}|x|X|\\*`,p=`[v=\\s]*(${b})(?:\\.(${b})(?:\\.(${b})(?:${k})?${R}?)?)?`,G=`^\\s*(${p})\\s+-\\s+(${p})\\s*$`,H=`(${_})\\.(${_})\\.(${_})`,J=`[v=\\s]*${H}${F}?${R}?`,O="((?:<|>)?=?)",K=`(\\s*)${O}\\s*(${J}|${p})`,z="(?:~>?)",N=`(\\s*)${z}\\s+`,P="(?:\\^)",Q=`(\\s*)${P}\\s+`,W="(<|>)?=?\\s*\\*",Y=`^${P}${p}$`,ee=`(${d})\\.(${d})\\.(${d})`,te=`v?${ee}${k}?${R}?`,$e=`^${z}${p}$`,re=`^${O}\\s*${p}$`,ne=`^${O}\\s*(${te})$|^$`,ie="^\\s*>=\\s*0.0.0\\s*$";function l(e){return new RegExp(e)}function c(e){return!e||e.toLowerCase()==="x"||e==="*"}function S(...e){return r=>e.reduce((n,t)=>t(n),r)}function Z(e){return e.match(l(ne))}function U(e,r,n,t){const $=`${e}.${r}.${n}`;return t?`${$}-${t}`:$}function oe(e){return e.replace(l(G),(r,n,t,$,i,o,u,a,f,s,m,g)=>(c(t)?n="":c($)?n=`>=${t}.0.0`:c(i)?n=`>=${t}.${$}.0`:n=`>=${n}`,c(f)?a="":c(s)?a=`<${+f+1}.0.0-0`:c(m)?a=`<${f}.${+s+1}.0-0`:g?a=`<=${f}.${s}.${m}-${g}`:a=`<=${a}`,`${n} ${a}`.trim()))}function ae(e){return e.replace(l(K),"$1$2$3")}function ue(e){return e.replace(l(N),"$1~")}function ce(e){return e.replace(l(Q),"$1^")}function se(e){return e.trim().split(/\s+/).map(r=>r.replace(l(Y),(n,t,$,i,o)=>c(t)?"":c($)?`>=${t}.0.0 <${+t+1}.0.0-0`:c(i)?t==="0"?`>=${t}.${$}.0 <${t}.${+$+1}.0-0`:`>=${t}.${$}.0 <${+t+1}.0.0-0`:o?t==="0"?$==="0"?`>=${t}.${$}.${i}-${o} <${t}.${$}.${+i+1}-0`:`>=${t}.${$}.${i}-${o} <${t}.${+$+1}.0-0`:`>=${t}.${$}.${i}-${o} <${+t+1}.0.0-0`:t==="0"?$==="0"?`>=${t}.${$}.${i} <${t}.${$}.${+i+1}-0`:`>=${t}.${$}.${i} <${t}.${+$+1}.0-0`:`>=${t}.${$}.${i} <${+t+1}.0.0-0`)).join(" ")}function fe(e){return e.trim().split(/\s+/).map(r=>r.replace(l($e),(n,t,$,i,o)=>c(t)?"":c($)?`>=${t}.0.0 <${+t+1}.0.0-0`:c(i)?`>=${t}.${$}.0 <${t}.${+$+1}.0-0`:o?`>=${t}.${$}.${i}-${o} <${t}.${+$+1}.0-0`:`>=${t}.${$}.${i} <${t}.${+$+1}.0-0`)).join(" ")}function le(e){return e.split(/\s+/).map(r=>r.trim().replace(l(re),(n,t,$,i,o,u)=>{const a=c($),f=a||c(i),s=f||c(o);return t==="="&&s&&(t=""),u="",a?t===">"||t==="<"?"<0.0.0-0":"*":t&&s?(f&&(i=0),o=0,t===">"?(t=">=",f?($=+$+1,i=0,o=0):(i=+i+1,o=0)):t==="<="&&(t="<",f?$=+$+1:i=+i+1),t==="<"&&(u="-0"),`${t+$}.${i}.${o}${u}`):f?`>=${$}.0.0${u} <${+$+1}.0.0-0`:s?`>=${$}.${i}.0${u} <${$}.${+i+1}.0-0`:n})).join(" ")}function pe(e){return e.trim().replace(l(W),"")}function de(e){return e.trim().replace(l(ie),"")}function h(e,r){return e=+e||e,r=+r||r,e>r?1:e===r?0:-1}function me(e,r){const{preRelease:n}=e,{preRelease:t}=r;if(n===void 0&&t)return 1;if(n&&t===void 0)return-1;if(n===void 0&&t===void 0)return 0;for(let $=0,i=n.length;$<=i;$++){const o=n[$],u=t[$];if(o!==u)return o===void 0&&u===void 0?0:o?u?h(o,u):-1:1}return 0}function v(e,r){return h(e.major,r.major)||h(e.minor,r.minor)||h(e.patch,r.patch)||me(e,r)}function L(e,r){return e.version===r.version}function _e(e,r){switch(e.operator){case"":case"=":return L(e,r);case">":return v(e,r)<0;case">=":return L(e,r)||v(e,r)<0;case"<":return v(e,r)>0;case"<=":return L(e,r)||v(e,r)>0;case void 0:return!0;default:return!1}}function he(e){return S(se,fe,le,pe)(e)}function ve(e){return S(oe,ae,ue,ce)(e.trim()).split(/\s+/).join(" ")}function je(e,r){if(!e)return!1;const n=ve(r).split(" ").map(s=>he(s)).join(" ").split(/\s+/).map(s=>de(s)),t=Z(e);if(!t)return!1;const[,$,,i,o,u,a]=t,f={operator:$,version:U(i,o,u,a),major:i,minor:o,patch:u,preRelease:a==null?void 0:a.split(".")};for(const s of n){const m=Z(s);if(!m)return!1;const[,g,,I,M,X,y]=m,we={operator:g,version:U(I,M,X,y),major:I,minor:M,patch:X,preRelease:y==null?void 0:y.split(".")};if(!_e(we,f))return!1}return!0}const j={vue:{get:()=>()=>C(new URL("__federation_shared_vue-ea5fe3c7.js",import.meta.url).href),import:!0},pinia:{get:()=>()=>C(new URL("__federation_shared_pinia-72120842.js",import.meta.url).href),import:!0}},w=Object.create(null);B=async function(e,r="default"){return w[e]?new Promise(n=>n(w[e])):await x(e,r)||q(e)};async function C(e){return ge(()=>import(e).then(async r=>(await r.__tla,r)),[])}x=async function(e,r){var t,$,i;let n=null;if(($=(t=globalThis==null?void 0:globalThis.__federation_shared__)==null?void 0:t[r])!=null&&$[e]){const o=globalThis.__federation_shared__[r][e],u=Object.keys(o)[0],a=Object.values(o)[0];(i=j[e])!=null&&i.requiredVersion?je(u,j[e].requiredVersion)?n=await(await a.get())():console.log(`provider support ${e}(${u}) is not satisfied requiredVersion(\${moduleMap[name].requiredVersion})`):n=await(await a.get())()}if(n)return D(n,e)},q=async function(e){var r;if((r=j[e])!=null&&r.import){let n=await(await j[e].get())();return D(n,e)}else console.error("consumer config import=false,so cant use callback shared module")};function D(e,r){return typeof e.default=="function"?(Object.keys(e).forEach(n=>{n!=="default"&&(e.default[n]=e[n])}),w[r]=e.default,e.default):(e.default&&(e=Object.assign({},e.default,e)),w[r]=e,e)}})();export{ye as __tla,B as importShared,q as importSharedLocal,x as importSharedRuntime};
