import{importShared as u,__tla as v}from"./__federation_fn_import-419ff2a5.js";import w,{__tla as T}from"./__federation_expose_BackPage-41e01196.js";import{_ as x,a as V,__tla as C}from"./ShowBalance-99d68a5e.js";import{_ as I,__tla as S}from"./index-036a2120.js";let y,g=Promise.all([(()=>{try{return v}catch{}})(),(()=>{try{return T}catch{}})(),(()=>{try{return C}catch{}})(),(()=>{try{return S}catch{}})()]).then(async()=>{let a,l,e,s,t,r,c,_,h,b,n,p,i,f,m,d;({openBlock:a,createBlock:l,createCommentVNode:e,unref:s,createVNode:t,createElementBlock:r,createElementVNode:c,normalizeClass:_,pushScopeId:h,popScopeId:b}=await u("vue")),n={key:1,class:"card mt-3 bg-primary mx-2 p-2 rounded-lg"},p={class:"mx-4"},{ref:i,shallowRef:f,onMounted:m}=await u("vue"),d={__name:"Wallet",props:["historyTab"],setup(o){const{user:k}=window.$stores;return i(0),m(()=>{}),(B,N)=>(a(),r("div",{class:_(!o.historyTab&&"pt-back")},[o.historyTab?e("",!0):(a(),l(w,{key:0,name:"V\xED c\u1EE7a t\xF4i",class:"bg-primary"})),o.historyTab?e("",!0):(a(),r("div",n,[t(x,{balance:s(k).balance,tabCurrent:"profile"},null,8,["balance"])])),c("div",p,[t(V,{showType:"profile"})])],2))}},y=I(d,[["__scopeId","data-v-69ed02e3"]])});export{g as __tla,y as default};