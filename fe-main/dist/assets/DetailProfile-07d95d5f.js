import{importShared as H,__tla as W}from"./__federation_fn_import-419ff2a5.js";import X,{__tla as Y}from"./__federation_expose_BackPage-41e01196.js";import{n as J,c as Z}from"./convert-de415b38.js";import{c as ee}from"./hook-b8d19a50.js";let L,te=Promise.all([(()=>{try{return W}catch{}})(),(()=>{try{return Y}catch{}})()]).then(async()=>{let t,e,a,s,w,p,n,l,i,O,y,b,_,g,T,k,C,B,j,R,N,S,$,V,A,D,E,F,I,M,P,z,G,d,K,q;({createVNode:t,createElementVNode:e,unref:a,toDisplayString:s,normalizeClass:w,resolveComponent:p,withCtx:n,openBlock:l,createElementBlock:i,createCommentVNode:O}=await H("vue")),y={class:"transaction-detail pt-back"},b={key:0,class:"content p-3"},_={class:"flex flex-col items-center gap-4"},g=e("div",{class:"note"},"Ti\u1EC1n th\u01B0\u1EDFng",-1),T={class:"flex justify-between"},k=e("div",{class:""},"Tr\u1EA1ng th\xE1i",-1),C={key:0,class:"text-yellow-400"},B={key:1,class:"text-yellow-400"},j={class:"flex justify-between py-3"},R=e("div",{class:""},"Kh\xE1ch h\xE0ng",-1),N={class:"customer"},S={class:"flex justify-between py-3"},$=e("div",{class:""},"Ng\u01B0\u1EDDi gi\u1EDBi thi\u1EC7u",-1),V={class:"customer"},A={class:"flex justify-between"},D=e("div",{class:""},"C\u1EEDa h\xE0ng",-1),E={class:"max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis"},F={class:"flex justify-between pt-4"},I=e("div",{class:""},"Gi\xE1 tr\u1ECB \u0111\u01A1n h\xE0ng",-1),M={class:"font-bold"},P={class:"flex justify-between py-3"},z=e("div",{class:""},"Th\u1EDDi gian t\u1EA1o",-1),G={key:1,class:"m-4"},{ref:d,onMounted:K,reactive:q}=await H("vue"),L={__name:"DetailProfile",setup(ae){const{shop:Q,user:se}=window.$stores,o=d({}),u=window.$stores.transaction.transactionShow,m=d(),v=d(),U=u.note==="Bonus for using service",x=q({bonusTemporary:0,myFee:0});return K(()=>{window.$stores.bill.detail({id:window.$route.params.id,showType:"profile"}).then(f=>{m.value=f.transaction.find(h=>h.note==="Bonus for user"),v.value=f.transaction.find(h=>h.note==="Transaction fee"),o.value=f,console.log(m.value.amount,v.value.metadata.affiliaterBonus),x.bonusTemporary=parseInt(Math.abs(m.value.amount)*(U?1-v.value.metadata.affiliaterBonus:v.value.metadata.affiliaterBonus)),x.myFee=parseInt(x.bonusTemporary-u.amount)})}),(f,h)=>{const r=p("Card"),c=p("Skeleton");return l(),i("div",y,[t(X,{name:"Chi ti\u1EBFt giao d\u1ECBch",class:"bg-primary"}),o.value._id?(l(),i("div",b,[t(r,{class:"mt-3"},{content:n(()=>[e("div",_,[g,e("div",{class:w([a(ee)(a(u).amount),"font-bold text-3xl"])},"+"+s(a(J)(a(u).amount)),3)])]),_:1}),t(r,{class:"mt-3"},{content:n(()=>[e("div",T,[k,o.value.status==="success"?(l(),i("div",C,"Th\xE0nh c\xF4ng")):(l(),i("div",B,"Ch\u1EDD x\xE1c nh\u1EADn"))])]),_:1}),t(r,{class:"mt-3"},{content:n(()=>[e("div",j,[R,e("div",N,[e("span",null,s(o.value.customer.name),1)])]),e("div",S,[$,e("div",V,[e("span",null,s(o.value.affiliater.name),1)])])]),_:1}),t(r,{class:"mt-3"},{content:n(()=>[e("div",A,[D,e("div",null,[e("div",E,s(a(Q).name),1)])]),e("div",F,[I,e("div",M,s(a(J)(m.value.metadata.totalAmount)),1)])]),_:1}),t(r,{class:"mt-3"},{content:n(()=>[e("div",P,[z,e("div",null,s(a(Z)(o.value.createdAt)),1)])]),_:1})])):(l(),i("div",G,[t(c,{width:"100%",height:"4rem",borderRadius:"16px"}),t(c,{width:"100%",class:"mb-2 mt-4",borderRadius:"16px"}),t(c,{width:"50%",borderRadius:"16px",class:"mb-2"}),t(c,{height:"20%",class:"mb-2",borderRadius:"16px"}),t(c,{width:"100%",height:"50vh",borderRadius:"16px"})]))])}}}});export{te as __tla,L as default};
