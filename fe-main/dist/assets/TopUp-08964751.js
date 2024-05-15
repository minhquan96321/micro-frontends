import{importShared as X,__tla as W}from"./__federation_fn_import-419ff2a5.js";import{__tla as Y}from"./qrcode.vue.esm-8261966e.js";import Z,{__tla as ee}from"./__federation_expose_BackPage-41e01196.js";import{n as te}from"./convert-de415b38.js";import{c as f,__tla as ne}from"./index-40b17f8b.js";let F,ae=Promise.all([(()=>{try{return W}catch{}})(),(()=>{try{return Y}catch{}})(),(()=>{try{return ee}catch{}})(),(()=>{try{return ne}catch{}})()]).then(async()=>{let l,e,c,a,i,r,d,x,y,w,p,b,v,g,_,k,N,S,Q,$,C,V,j,T,I,L,B,q,E,U,D,R,z,A,K,O,P,u;({createVNode:l,createElementVNode:e,resolveComponent:c,toDisplayString:a,openBlock:i,createElementBlock:r,createCommentVNode:d,createTextVNode:x,normalizeClass:y,withCtx:w,unref:p}=await X("vue")),b={class:"wrapper pt-back"},v={class:"form mt-5 px-3"},g={class:"input flex flex-col"},_=e("label",{for:"money"},"S\u1ED1 ti\u1EC1n",-1),k={class:"input flex flex-col mt-3"},N=e("label",{for:"shopName"},"T\xEAn c\u1EEDa h\xE0ng",-1),S={class:"font-semibold mt-2 mx-2"},Q={class:"py-2 flex justify-center"},$={key:0,class:"pi pi-spin pi-spinner"},C={key:0,class:"info-QR mt-3"},V=e("div",{class:"note-qr"},"Qu\xE9t m\xE3 QR d\u01B0\u1EDBi \u0111\xE2y \u0111\u1EC3 th\u1EF1c hi\u1EC7n thanh to\xE1n. Vui l\xF2ng kh\xF4ng thay \u0111\u1ED5i b\u1EA5t k\u1EF3 th\xF4ng tin n\xE0o k\u1EC3 c\u1EA3 n\u1ED9i dung chuy\u1EC3n kho\u1EA3n",-1),j={class:"flex items-center justify-center my-4"},T=["src"],I={class:"info-bank-success"},L={class:"flex justify-between py-2"},B=e("span",null,"STK",-1),q={class:"flex justify-between py-2"},E=e("span",null,"T\xEAn ng\xE2n h\xE0ng",-1),U={class:"flex justify-between py-2"},D=e("span",null,"Ch\u1EE7 t\xE0i kho\u1EA3n",-1),R={class:"flex justify-between py-2"},z=e("span",null,"S\u1ED1 ti\u1EC1n",-1),A={class:"font-bold"},K={class:"flex justify-between py-2"},O=e("span",null,"N\u1ED9i dung chuy\u1EC3n kho\u1EA3n",-1),{onUnmounted:P,reactive:u}=await X("vue"),F={__name:"TopUp",setup(se){const t=u({cost:void 0,name:window.$stores.shop.name,code:"",accountNumber:f.bankAccountNumber,bankCode:f.bankCode}),s=u({showQr:!1,isLoadingShowQr:!1});let m;const G=()=>{t.cost<=0||typeof t.cost!="number"?window.$toast.add({severity:"error",summary:"S\u1ED1 ti\u1EC1n kh\xF4ng h\u1EE3p l\u1EC7",life:3e3}):(s.isLoadingShowQr=!0,window.$api.call("transaction/bank",{amount:t.cost}).then(o=>{o.success&&(s.showQr=!0,t.code=o.code,clearInterval(m),m=setInterval(()=>{H(o.code)},5e3))}).finally(()=>{s.isLoadingShowQr=!1}))},H=o=>{window.$api.call("transaction/statusBank",{code:o}).then(n=>{n.success&&(window.$toastSuccess("Th\xE0nh c\xF4ng"),window.$stores.shop.info(),window.$router.push("/dashboard"))})};return P(()=>{clearInterval(m)}),(o,n)=>{const J=c("InputText"),M=c("Button");return i(),r("div",b,[l(Z,{name:"N\u1EA1p ti\u1EC1n v\xE0o V\xED",class:"bg-primary"}),e("div",v,[e("div",g,[_,l(J,{modelValue:t.cost,"onUpdate:modelValue":[n[0]||(n[0]=h=>t.cost=h),n[1]||(n[1]=h=>t.cost=Number(t.cost)||void 0)],inputId:"locale-german",class:"border px-3 py-1 rounded",locale:"de-DE",placeholder:"Nh\u1EADp s\u1ED1 ti\u1EC1n c\u1EA7n n\u1EA1p",type:"number",step:1},null,8,["modelValue"])]),e("div",k,[N,e("div",S,a(t.name),1)]),e("div",Q,[l(M,{disable:s.isLoadingShowQr,class:y([s.isLoadingShowQr&&"opacity-50","bg-primary text-white border-transparent mt-3 rounded px-12 py-2 flex items-center gap-2"]),onClick:n[2]||(n[2]=h=>G())},{default:w(()=>[s.isLoadingShowQr?(i(),r("span",$)):d("",!0),x(" X\xE1c nh\u1EADn")]),_:1},8,["disable","class"])]),s.showQr?(i(),r("div",C,[V,e("div",j,[e("img",{style:{"max-width":"200px","margin-top":"10px"},src:`https://img.vietqr.io/image/${t.bankCode}-${t.accountNumber}-qr_only.png?amount=${t.cost}&addInfo=viref${t.code}`},null,8,T)]),e("div",I,[e("div",L,[B,e("span",null,a(t.accountNumber),1)]),e("div",q,[E,e("span",null,a(t.bankCode),1)]),e("div",U,[D,e("span",null,a(p(f).bankOwner),1)]),e("div",R,[z,e("span",A,a(p(te)(t.cost)),1)]),e("div",K,[O,e("span",null,"viref"+a(t.code),1)])])])):d("",!0)])])}}}});export{ae as __tla,F as default};
