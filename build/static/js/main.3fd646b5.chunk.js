(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{40:function(e,n,t){},41:function(e,n,t){"use strict";t.r(n);var c=t(16),a=t.n(c),o=t(3),r=t(1),i=t(0),u=function(e){var n=e.contact,t=e.action;return Object(i.jsxs)("li",{children:[n.name," ",n.number,Object(i.jsx)("button",{onClick:t,children:"delaa"})]})},l=function(e){var n=e.addContact,t=e.newName,c=e.handleNameChange,a=e.newNumber,o=e.handleNumberChange;return Object(i.jsxs)("form",{onSubmit:n,children:[Object(i.jsxs)("div",{children:["Name: ",Object(i.jsx)("input",{value:t,onChange:c})]}),Object(i.jsxs)("div",{children:["Number: ",Object(i.jsx)("input",{value:a,onChange:o})]}),Object(i.jsx)("div",{children:Object(i.jsx)("button",{type:"submit",children:"add"})})]})},s=t(4),j=t.n(s),d="https://polar-spire-32718.herokuapp.com/api/persons",h=function(){return console.log("Yritet\xe4\xe4np\xe4 palauttaa taulukko"),j.a.get(d).then((function(e){return e.data}))},b=function(e){return j.a.post(d,e).then((function(e){return e.data}))},f=function(e,n){return j.a.put("".concat(d,"/").concat(e),n).then((function(e){return e.data}))},O=function(e){return j.a.delete("".concat(d,"/").concat(e)).then((function(e){return e}))},m=function(e){var n=e.countriesToShow,t=e.handle;if(1===n.length){var c=n[0];return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsxs)("p",{children:["Name: ",c.name]}),Object(i.jsxs)("p",{children:["Capital: ",c.capital]}),Object(i.jsxs)("p",{children:["Area: ",c.area]}),Object(i.jsx)("p",{children:"Languages:"})," ",c.languages.map((function(e){return Object(i.jsx)("ul",{children:Object(i.jsx)("li",{children:e.name})})})),Object(i.jsx)("p",{children:"Flag: "})," ",Object(i.jsx)("img",{src:c.flags.png})]})}return n.length>1&&n.length<11?Object(i.jsx)(i.Fragment,{children:n.map((function(e){return Object(i.jsxs)("li",{children:[" ",e.name,Object(i.jsx)("button",{onClick:function(){return t(e)},children:" Show"})]})}))}):n.length>10?Object(i.jsx)(i.Fragment,{children:"Too many matches"}):Object(i.jsx)("p",{children:"Input country name"})},g=function(e){var n=Object(r.useState)([]),t=Object(o.a)(n,2),c=t[0],a=t[1],s=Object(r.useState)(""),d=Object(o.a)(s,2),g=d[0],p=d[1],x=Object(r.useState)(""),v=Object(o.a)(x,2),w=v[0],C=v[1],S=Object(r.useState)(""),N=Object(o.a)(S,2),k=N[0],y=N[1],F=Object(r.useState)(!0),T=Object(o.a)(F,2),E=T[0],I=T[1],D=Object(r.useState)([]),J=Object(o.a)(D,2),A=J[0],B=J[1],L=Object(r.useState)([]),P=Object(o.a)(L,2),Y=P[0],q=P[1],z=Object(r.useState)([]),G=Object(o.a)(z,2),H=G[0],K=G[1],M=Object(r.useState)(""),Q=Object(o.a)(M,2),R=Q[0],U=Q[1],V=function(e){var n=e.message;return Object(i.jsx)("div",{className:"message",children:n})},W=function(e){U(e),setTimeout((function(){U(null)}),3e3)},X=function(){console.log("effect"),h().then((function(e){console.log("promise fullfilled"),a(e)}))};Object(r.useEffect)(X,[]),console.log("render",c.length,"persons");Object(r.useEffect)((function(){console.log("effect"),j.a.get("https://restcountries.com/v2/all").then((function(e){console.log("promise fullfilled"),B(e.data)}))}),[]),console.log("render",A.length,"countries");var Z=E?c:c.filter((function(e){return e.name===k}));return Object(i.jsxs)("div",{children:[Object(i.jsx)("h2",{children:"Phonebook"}),Object(i.jsx)("p",{children:Object(i.jsx)(V,{message:R})}),Object(i.jsxs)("div",{children:["filter shown with:",Object(i.jsx)("input",{value:k,onChange:function(e){y(e.target.value),""===e.target.value?I(!0):I(!1)}})]}),Object(i.jsx)("h2",{children:"add a new"}),Object(i.jsx)(l,{addContact:function(e){if(e.preventDefault(),c.map((function(e){return e.name})).indexOf(g)>-1){var n=c.find((function(e){return e.name===g}));n.number=w,window.confirm("Contact exists, wanna update it")&&(f(n.id,n).then((function(e){console.log(e),a(c.map((function(t){return t.id!==n.id?t:e})))})),W("contact ".concat(n.name," updated")))}else{var t={name:g,number:w,date:(new Date).toISOString()};b(t).then((function(e){console.log(e)})),a(c.concat(t)),p(""),C(""),console.log("new contact added, event.target"),W("New contact added")}},newName:g,handleNameChange:function(e){console.log(e.target.value),p(e.target.value)},newNumber:w,handleNumberChange:function(e){C(e.target.value)}}),Object(i.jsx)("h2",{children:"Numbers"}),Object(i.jsx)("div",{children:Object(i.jsxs)("button",{onClick:function(){return I(!E)},children:["show",E?"important":"all"]})}),Object(i.jsx)("ul",{children:Z.map((function(e){return Object(i.jsx)(u,{contact:e,action:function(){return n=e.id,console.log("Try to delaa"),void O(n).then((function(e){console.log(e),X(),W("One contact removed")})).catch((function(e){X(),W("Contact was already removed")}));var n}},e.name)}))}),Object(i.jsx)("h1",{children:" FlagFinder"}),Object(i.jsx)("p",{children:" find countries"}),Object(i.jsx)("input",{value:Y,onChange:function(e){q(e.target.value);var n=A.map((function(e){return e.name}));console.log("selected entries - 1",n.length),K(A.filter((function(e){return e.name.includes(Y)})))}}),Object(i.jsx)("div",{children:Object(i.jsx)(m,{countriesToShow:H,handle:function(e){q(e.name),K(A.filter((function(n){return n.name.includes(e.name)})))}})})]})};t(40);a.a.render(Object(i.jsx)(g,{}),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.3fd646b5.chunk.js.map