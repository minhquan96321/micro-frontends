import{importShared as F,__tla as O}from"./__federation_fn_import-43b6c9ad.js";import{n as R}from"./convert-de415b38.js";import{a as H}from"./hook-b8d19a50.js";let K,I=Promise.all([(()=>{try{return O}catch{}})()]).then(async()=>{let e,a,r,t,i,u,n,s,p,f,m,b,y,x,g,v,w,h,k,C,_,P,$,N,V,j,B,E,L,M;({createElementVNode:e,unref:a,toDisplayString:r,openBlock:t,createElementBlock:i,createCommentVNode:u,renderList:n,Fragment:s,normalizeClass:p}=await F("vue")),f={class:"h-[130px] bg-primary w-full relative pt-notch",style:{"border-radius":"0 0 25px 25px"}},m=e("i",{class:"pi pi-chevron-left text-white p-1 rounded-full border"},null,-1),b=[m],y={class:"flex flex-col justify-center items-center absolute",style:{position:"absolute",left:"50%",transform:"translateX(-50%)",top:"83px"}},x=["src"],g={class:"userName text-center font-bold text-lg"},v={key:0,class:"phone font-semibold opacity-50"},w={class:"mt-[100px] flex justify-between px-3 py-2 mx-2 rounded-lg border-primary border"},h={class:"flex gap-2 items-center"},k=e("i",{class:"pi pi-wallet p-2 bg-primary rounded-full text-white"},null,-1),C={key:0,class:"font-bold"},_={key:1},P={class:"block-info p-3"},$=e("div",{class:"opacity-50 mb-2"},"Th\xF4ng tin",-1),N=["onClick"],V={class:"font-semibold"},j=e("div",{class:"opacity-50 mt-4 mb-3"},"Kh\xE1c",-1),B=["onClick"],E={class:"font-semibold"},{onMounted:L,ref:M}=await F("vue"),K={__name:"Profile",setup(J){const{user:o}=window.$stores,c=M("loading..."),X=[{icon:"pi pi-user",label:"Th\xF4ng tin c\xE1 nh\xE2n",page:"profile/info"},{icon:"pi pi-wallet",label:"V\xED c\u1EE7a t\xF4i",page:"/profile/wallet"}],q=[{icon:"pi pi-clone",label:"Preview",page:"profile/preview"}],A=()=>{window.$router.go(-1)},S=T=>{window.$router.push(T.page)};return L(async()=>{c.value=await window.$stores.user.getMoneyProfile()}),(T,z)=>{var D;return t(),i(s,null,[e("div",f,[e("div",{class:"backPage pt-6 pl-3",onClick:z[0]||(z[0]=l=>A())},b)]),e("div",y,[e("img",{src:(D=a(o))==null?void 0:D.avatar,alt:"",class:"w-20 h-20 rounded-full mb-2"},null,8,x),e("div",g,r(a(o).name),1),a(o).phone?(t(),i("div",v,r(a(H)(a(o).phone)),1)):u("",!0)]),e("div",w,[e("div",h,[k,typeof c.value=="number"?(t(),i("span",C,r(a(R)(c.value)),1)):(t(),i("span",_,"Loading..."))])]),e("div",P,[$,(t(),i(s,null,n(X,(l,d)=>e("div",{key:d,class:"flex gap-2 items-center py-3 border-b border-gray-500",onClick:G=>S(l)},[e("i",{class:p(l.icon)},null,2),e("span",V,r(l.label),1)],8,N)),64)),j,(t(),i(s,null,n(q,(l,d)=>e("div",{key:d,class:"flex gap-2 items-center py-3 border-b border-gray-500",onClick:G=>S(l)},[e("i",{class:p(l.icon)},null,2),e("span",E,r(l.label),1)],8,B)),64))])],64)}}}});export{I as __tla,K as default};