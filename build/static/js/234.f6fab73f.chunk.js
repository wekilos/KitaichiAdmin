"use strict";(self.webpackChunkfront=self.webpackChunkfront||[]).push([[234],{8234:function(t,e,n){n.r(e);var a=n(9439),r=n(8787),i=n(7309),u=n(3775),o=n(1798),A=n(2791),s=n(8005),c=(n(1943),n(2911)),l=n(7441),d=n(184);e.default=function(){(0,c.k6)();var t=(0,A.useContext)(l.Y).dil,e=(0,A.useState)([]),n=(0,a.Z)(e,2),h=n[0],g=n[1],f=(0,A.useState)(!1),m=(0,a.Z)(f,2),p=(m[0],m[1],(0,A.useState)({})),S=(0,a.Z)(p,2),k=(S[0],S[1],(0,A.useState)([])),b=(0,a.Z)(k,2),x=(b[0],b[1],(0,A.useState)(!1)),I=(0,a.Z)(x,2),v=(I[0],I[1],(0,A.useState)("")),w=(0,a.Z)(v,2),y=(w[0],w[1],(0,A.useState)("")),C=(0,a.Z)(y,2);C[0],C[1];(0,A.useEffect)((function(){E()}),[]);var E=function(){s.b.get("/api/user/all?active=true").then((function(t){console.log(t.data),g(t.data)})).catch((function(t){console.log(t)}))},Z=[{title:"ID",dataIndex:"id"},{title:"tm"===t?"Ady":"ru"===t?"\u0418\u043c\u044f":"First name",dataIndex:"name"},{title:"tm"===t?"Famili\xfdasy":"ru"===t?"\u0424\u0430\u043c\u0438\u043b\u0438\u044f":"Last name",dataIndex:"lastname"},{title:"tm"===t?"Telefon":"ru"===t?"\u0422\u0435\u043b\u0435\u0444\u043e\u043d":"Phone",dataIndex:"phonenumber"},{title:"tm"===t?"Doglan senesi":"ru"===t?"\u0414\u0430\u0442\u0430 \u0440\u043e\u0436\u0434\u0435\u043d\u0438\u044f":"Birthday",dataIndex:"birthday",render:function(t,e){var n;return(0,d.jsx)("div",{children:null===e||void 0===e||null===(n=e.birthday)||void 0===n?void 0:n.slice(0,10)})}},{title:"tm"===t?"Hereket":"ru"===t?"\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0435":"Action",render:function(e,n){return(0,d.jsx)(d.Fragment,{children:(0,d.jsx)(r.Z,{placement:"top",title:"tm"===t?"Ynan\xfdarsy\u0148yzmy?":"ru"===t?"\u0423\u0432\u0435\u0440\u0435\u043d\u044b \u043b\u0438 \u0432\u044b?":"Are you sure?",onConfirm:function(){return L(n.id)},okText:"tm"===t?"Howwa":"ru"===t?"\u0414\u0430":"Yes",cancelText:"tm"===t?"\xfdok":"ru"===t?"\u041d\u0435\u0442":"No",children:(0,d.jsx)(i.Z,{type:"danger",style:{borderRadius:"7px",marginLeft:"10px"},children:"tm"===t?"i\u015fje\u0148 d\xe4l":"ru"===t?"\u043d\u0435 \u0430\u043a\u0442\u0438\u0432\u0435\u043d":"dis active"})})})}}],L=function(t){s.b.patch("/api/user/disActive/"+t).then((function(t){u.ZP.success("Dis Aktiwe Edildi!"),E()})).catch((function(t){console.log(t),u.ZP.warn("Gaytadan Barlan!")}))};return(0,d.jsx)(d.Fragment,{children:(0,d.jsx)(o.Z,{columns:Z,dataSource:h,pagination:{pageSize:50},scroll:{y:"72vh"}})})}},8005:function(t,e,n){n.d(e,{_:function(){return r},b:function(){return i}});var a=n(4569),r="http://localhost:8181/",i=n.n(a)().create({baseURL:r,timeout:1e4,headers:{Authorization:"Bearer "+function(){if(JSON.parse(localStorage.getItem("userData")))return JSON.parse(localStorage.getItem("userData")).token}(),"Content-Type":"application/json",Accept:"*/*"}})},1943:function(t){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAsCAYAAAAATWqyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADXSURBVHgB7di7DcIwFIXhY4PIAHRIbEHJCKwRsQWvLVCq7ELJFhSskCAR40ipjgCbh+2A7l+lcPHFcq6lqLIsx3VdT5VSA4Rpkef51rVIV1U1CYhA0zSboijWrnXaNkLgfDAakXJhokHgwESF4AkmOgQPMEkguINJBgFhhkhchwkPsXNq5rUOPUkgnEA4gXAC4QTC9QbivPRW+8MRb7Zbzr0uvLbf2ZFX3uqT5LByAuH+Z45866uSOcLJYeUEwgmEEwinjTFXJM7+rLnoLMtO7QMS1W3E+QYP0Fq68a+ubQAAAABJRU5ErkJggg=="}}]);
//# sourceMappingURL=234.f6fab73f.chunk.js.map