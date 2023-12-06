"use strict";(self.webpackChunkfront=self.webpackChunkfront||[]).push([[169],{9763:function(e,t,n){n.d(t,{Z:function(){return x}});var a=n(3433),r=n(9439),l=n(2791),s=n(4651),i=n(8617),o=n(2916),c=n(7035),u={default:n(3014),pdf:o,png:c},d=n(184),x=function(e){var t=(0,l.useRef)(null),n=(0,l.useState)(e.files?e.files:[]),o=(0,r.Z)(n,2),c=o[0],x=o[1];return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)("div",{ref:t,onDragEnter:function(){return t.current.classList.add("dragover")},onDragLeave:function(){return t.current.classList.remove("dragover")},onDrop:function(){return t.current.classList.remove("dragover")},className:"w-full shadow-[0_0_6px_0_rgba(23,23,23,0.1)] text-[#b0adad] outline-none p-3 rounded-md h-52 border-dashed border-[#b0adad] hover:border-blue border-2 flex justify-center flex-col items-center hover:text-blue my-auto relative",children:[(0,d.jsx)(i.qX3,{size:100}),(0,d.jsx)("span",{className:"  w-1/2 mx-auto  mt-6",children:"\u0418\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044f, \u043a\u043e\u0442\u043e\u0440\u0443\u044e \u0432\u044b \u0445\u043e\u0442\u0438\u0442\u0435 \u0434\u043e\u0431\u0430\u0432\u0438\u0442\u044c, \u0434\u043e\u043b\u0436\u043d\u0430 \u0431\u044b\u0442\u044c \u043f\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043b\u0435\u043d\u0430 \u200b\u200b\u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0438\u043c\u0438 \u0441\u043f\u043e\u0441\u043e\u0431\u0430\u043c\u0438: PNG, JPG, JPEG"}),(0,d.jsx)("input",{type:"file",value:"",onChange:function(t){var n=t.target.files[0];if(console.log("newFile",n),n){var r=[].concat((0,a.Z)(c),[n]);x(r),e.onFileChange(r)}},className:"absolute opacity-0 w-full h-full cursor-pointer"})]}),c.length>0?(0,d.jsx)("div",{className:"mt-12 w-full",children:c.map((function(t,n,r){return(0,d.jsx)("div",{children:(0,d.jsxs)("div",{className:"relative flex mb-2.5 bg-gray/10 p-4 rounded-xl w-full justify-between",children:[(0,d.jsxs)("div",{className:"flex",children:[(0,d.jsx)("img",{src:u[t.type.split("/")[1]]||u.default,alt:"",width:50,height:50}),(0,d.jsxs)("div",{className:"ml-6",children:[(0,d.jsx)("p",{children:t.name}),(0,d.jsx)("span",{className:"flex",children:(0,d.jsxs)("p",{children:[t.size,"\xa0b"]})})]})]}),(0,d.jsx)("div",{className:"flex",children:(0,d.jsx)("span",{className:"my-auto cursor-pointer",onClick:function(){return function(t){var n=(0,a.Z)(c);n.splice(c.indexOf(t),1),x(n),e.onFileChange(n)}(t)},children:(0,d.jsx)(s.S1K,{})})})]})},n)}))}):null]})}},7169:function(e,t,n){n.r(t);var a=n(1413),r=n(9439),l=n(8787),s=n(7309),i=n(3775),o=n(4447),c=n(1798),u=n(2791),d=n(8005),x=n(2911),p=n(7441),f=n(9763),m=n(184);t.default=function(){var e=(0,u.useContext)(p.Y).dil,t=((0,x.k6)(),(0,u.useState)([])),n=(0,r.Z)(t,2),h=n[0],g=n[1],b=(0,u.useState)({}),v=(0,r.Z)(b,2),j=v[0],Z=v[1],w=(0,u.useState)(!1),y=(0,r.Z)(w,2),N=y[0],F=y[1],C=(0,u.useState)(!1),k=(0,r.Z)(C,2),S=k[0],E=k[1],_=(0,u.useState)({name_en:"",name_ru:""}),D=(0,r.Z)(_,2),P=(D[0],D[1],(0,u.useState)([])),A=(0,r.Z)(P,2),G=A[0],L=A[1],z=(0,u.useState)(!1),I=(0,r.Z)(z,2),J=(I[0],I[1]);(0,u.useEffect)((function(){K()}),[]);var K=function(){d.b.get("/api/carousel/all").then((function(e){console.log(e.data),g(e.data)})).catch((function(e){console.log(e)}))},M=[{title:"No",dataIndex:"id"},{title:"tm"===e?"Karusel":"ru"===e?"\u041a\u0430\u0440\u0443\u0441\u0435\u043b\u044c":"Carousel",dataIndex:"name_ru",render:function(e,t){return(0,m.jsx)("div",{children:(0,m.jsx)("img",{className:"w-[200px] object-contain",src:d._+t.img,alt:""})})}},{title:"tm"===e?"Hereket":"ru"===e?"\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0435":"Action",render:function(t,n){return(0,m.jsx)("div",{className:"flex",children:(0,m.jsx)(l.Z,{placement:"top",title:"Are you sure",onConfirm:function(){return O(n.id)},okText:"Yes",cancelText:"No",children:(0,m.jsx)(s.Z,{type:"danger",style:{borderRadius:"7px",marginLeft:"10px"},children:"tm"===e?"\xd6\xe7\xfcrmek":"ru"===e?"\u0423\u0434\u0430\u043b\u0438\u0442":"Delete"})})})}}],O=function(e){d.b.delete("/api/carousel/destroy/"+e).then((function(e){i.ZP.success("\xd6\xe7\xfcrildi!"),K()})).catch((function(e){console.log(e),i.ZP.warn("Gaytadan Barlan!")}))};return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(o.Z,{width:500,placement:"right",closable:!0,mask:!0,maskClosable:!0,onClose:function(){F(!1)},visible:N,children:(0,m.jsxs)("div",{style:{width:"100%"},children:[(0,m.jsx)("input",{value:null===j||void 0===j?void 0:j.name_ru,onChange:function(e){return Z((0,a.Z)((0,a.Z)({},j),{},{name_ru:e.target.value}))},className:"h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4",type:"text",placeholder:"tm"===e?"Ady ru":"ru"===e?"\u0418\u043c\u044f \u0440\u0443":"Name ru"}),(0,m.jsx)("input",{value:null===j||void 0===j?void 0:j.name_en,onChange:function(e){return Z((0,a.Z)((0,a.Z)({},j),{},{name_en:e.target.value}))},className:"h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4",type:"text",placeholder:"tm"===e?"Ady en":"ru"===e?"\u0418\u043c\u044f \u0435\u043d":"Name en"}),(0,m.jsx)("button",{onClick:function(){d.b.patch("/api/carousel/update",j).then((function(e){i.ZP.success("Maglumatlar Uytgedildi!"),K(),Z(),F(!1)})).catch((function(e){console.log(e)}))},className:"!bg-blue !text-white ".concat(" bg-[#DEE6F9] h-[50px] rounded-[5px] w-full mt-4 text-[18px] font-sans text-blue"),children:"tm"===e?"\xdc\xfdtgetmek":"ru"===e?"\u0418\u0437\u043c\u0435\u043d\u044f\u0442\u044c":"Change"})]})}),(0,m.jsxs)(o.Z,{width:500,placement:"right",closable:!0,mask:!0,maskClosable:!0,onClose:function(){return E(!1)},visible:S,children:[(0,m.jsx)(f.Z,{files:G,onFileChange:function(e){return function(e){console.log(e),e.length>0&&J(!0),0==e.length&&J(!1),L(e)}(e)}}),(0,m.jsx)("button",{onClick:function(){!function(){if(G.length>0){var e=new FormData;null===G||void 0===G||G.map((function(t){e.append("img",t)})),d.b.post("/api/carousel/create",e).then((function(e){i.ZP.success("Maglumatlar d\xf6redildi!"),K(),L([]),E(!1)})).catch((function(e){console.log(e)}))}else i.ZP.warn("Maglumatlary doly Girizin!")}()},className:"!bg-blue !text-white ".concat(" bg-[#DEE6F9] h-[50px] rounded-[5px] w-full mt-4 text-[18px] font-sans text-blue"),children:"tm"===e?"Ugrat":"ru"===e?"\u041e\u0442\u043f\u0440\u0430\u0432\u043b\u044f\u0442\u044c":"Send"})]}),(0,m.jsxs)("div",{className:"w-full h-[50px] p-0 flex justify-between ",children:[(0,m.jsx)("h2",{className:"leading-[50px] ml-[50px] text-sans text-[24px]",children:"tm"===e?"Karusel":"ru"===e?"\u041a\u0430\u0440\u0443\u0441\u0435\u043b\u044c":"Carousel"}),(0,m.jsx)(s.Z,{onClick:function(){E(!0)},className:"h-[40px] mt-[10px] mr-[50px] !rounded-[12px]",type:"primary",children:"tm"===e?"Karusel Go\u015fmak":"ru"===e?"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u041a\u0430\u0440\u0443\u0441\u0435\u043b\u044c":"Add Carousel"})]}),(0,m.jsx)(c.Z,{columns:M,dataSource:h,pagination:{pageSize:50},scroll:{y:"72vh"}})]})}},8005:function(e,t,n){n.d(t,{_:function(){return r},b:function(){return l}});var a=n(4569),r="http://localhost:8181/",l=n.n(a)().create({baseURL:r,timeout:1e4,headers:{Authorization:"Bearer "+function(){if(JSON.parse(localStorage.getItem("userData")))return JSON.parse(localStorage.getItem("userData")).token}(),"Content-Type":"application/json",Accept:"*/*"}})},3014:function(e,t,n){e.exports=n.p+"static/media/defaultFile.840d835451bb23f7433a.png"},2916:function(e,t,n){e.exports=n.p+"static/media/pdfFile.47193a0b066fe0caeac1.png"},7035:function(e,t,n){e.exports=n.p+"static/media/pngFile.2dc25e979dd8733dae5d.png"}}]);
//# sourceMappingURL=169.29b2c50c.chunk.js.map