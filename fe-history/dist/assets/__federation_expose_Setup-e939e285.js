import{importShared as s,__tla as a}from"./__federation_fn_import-00399351.js";import{_ as w,__tla as h}from"./History-6c3cf429.js";Promise.all([(()=>{try{return a}catch{}})(),(()=>{try{return h}catch{}})()]).then(async()=>{const i={hi:"Hi",hixx:"Hi ch\xE0oxxx"},t={hi:"Xin ch\xE0o",hixx:"Xin ch\xE0oxxx"},{shallowRef:e}=await s("vue");if(window.i18n&&(window.i18n.setLocaleMessage("vi",t),window.i18n.setLocaleMessage("en",i)),window.$router){const r=window.$router.getRoutes();[].forEach(o=>{r.find(n=>n.path===o.path)||window.$router.addRoute(o)})}window.$stores&&window.$stores.layout.tab.push({label:window.remoteApp.history.label||"L\u1ECBch s\u1EED",icon:window.remoteApp.history.icon||"pi pi-history",position:window.remoteApp.history.position,component:e(w),role:["user"]})});
