(function(e){function t(t){for(var s,c,i=t[0],o=t[1],u=t[2],f=0,d=[];f<i.length;f++)c=i[f],Object.prototype.hasOwnProperty.call(a,c)&&a[c]&&d.push(a[c][0]),a[c]=0;for(s in o)Object.prototype.hasOwnProperty.call(o,s)&&(e[s]=o[s]);l&&l(t);while(d.length)d.shift()();return r.push.apply(r,u||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],s=!0,i=1;i<n.length;i++){var o=n[i];0!==a[o]&&(s=!1)}s&&(r.splice(t--,1),e=c(c.s=n[0]))}return e}var s={},a={app:0},r=[];function c(t){if(s[t])return s[t].exports;var n=s[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.m=e,c.c=s,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)c.d(n,s,function(t){return e[t]}.bind(null,s));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],o=i.push.bind(i);i.push=t,i=i.slice();for(var u=0;u<i.length;u++)t(i[u]);var l=o;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var s=n("85ec"),a=n.n(s);a.a},1:function(e,t){},2:function(e,t){},3:function(e,t){},3778:function(e,t,n){"use strict";var s=n("5941"),a=n.n(s);a.a},3790:function(e,t,n){"use strict";(function(e){n("99af"),n("d3b7");var s=n("53ca"),a=n("5530"),r=n("b671"),c=window.ethereum,i=window.web3,o="0x7D2bCd53CFf1d7aE9c232338AA64D262cBe89a30",u="5a1f2cf0a6fafca3997c1b3916fa9ea12a65764972a217ddb6cea2070dfe76e6",l=8e3,f=function(e){return Object(a["a"])({jsonrpc:"2.0",params:[],id:10},e)},d=function(e,t){return"\n测试地址: ".concat(o,"\n测试密钥: ").concat(u,"\n测试消息: ").concat(e,"\n预期结果: ").concat(t," \n  ")},m=function(e){if("undefined"===typeof e)return Promise.reject("undefined");if("string"===typeof e||e instanceof Array)return Promise.resolve(e);try{var t=JSON.stringify(e,null,2);return Promise.resolve(t)}catch(n){return Promise.resolve(Object(s["a"])(e))}},b=function(e,t,n,s){console.log("checkMatch ",e,t);try{if(e===t||JSON.stringify(e)===JSON.stringify(t))return n(!0)}catch(a){console.log("checkMatch error",a)}return s(!1)},h=[{name:"checkExist(window.ethereum)",test:function(){return m(window.ethereum)}},{name:"checkExist(window.web3)",test:function(){return m(window.web3)}},{name:"checkExist(web3.eth.accounts[0])",test:function(){return m(i.eth.accounts[0])}},{name:"checkExist(ethereum.isMetaMask)",test:function(){return m(c.isMetaMask)}},{name:"checkExist(ethereum.chainId)",test:function(){return m(c.chainId)}},{name:"checkExist(ethereum.networkVersion) (旧)",test:function(){return m(c.networkVersion)}},{name:"checkExist(ethereum.selectedAddress) (旧)",test:function(){return m(c.selectedAddress)}},{name:"checkExist(ethereum.isConnected())",test:function(){return m(c.isConnected())}},{name:"ethereum.enable() (旧)",test:function(){return c.enable()}},{name:'ethereum.sendAsync({method: "eth_blockNumber"}) (旧)',test:function(){return new Promise((function(e,t){c.sendAsync({method:"eth_blockNumber",params:[]},(function(n,s){n?t(n):e(s)})),setTimeout((function(){return t("timeout")}),l)}))}},{name:"request eth_requestAccounts",test:function(){return c.request({method:"eth_requestAccounts"})}},{name:"request eth_accounts",test:function(){return c.request({method:"eth_accounts"})}},{name:"request eth_coinbase",test:function(){return c.request({method:"eth_coinbase"})}},{name:"request net_version",test:function(){return c.request({method:"net_version"})}},{name:"request eth_uninstallFilter",test:function(){return c.request(f({method:"eth_uninstallFilter",params:["0xb"]}))}},{name:"签名：web3.eth.sign",msg:"0x12345678",exspectResult:"未知",test:function(e){return new Promise((function(t,n){var s=i.eth.accounts[0],a=e.msg;i.eth.sign(s,a,(function(s,r){console.log("web3.eth.sign",s,r),s?n(s):(console.log("web3.eth.sign - ".concat(a," =>"),r),b(r,e.exspectResult,t,n))})),setTimeout((function(){return n("timeout")}),l)}))},getDesc:function(e){return d(e.msg,e.exspectResult)}},{name:"签名：personal_sign",msg:"我是签名的内容",exspectResult:"0x7141cd351448bb73215ba4db28e7d426545fd35a7a9df43e90d4dd26cbb8034a64f4a46fe36813a010e98ece915ee8203bade68c4124c266e88afe979ca726521b",test:function(t){return new Promise((function(n,s){var a=i.eth.accounts[0],c=r.bufferToHex(e.from(t.msg,"utf8")),o="personal_sign",u=[c,a];i.currentProvider.sendAsync({method:o,params:u,from:a},(function(e,a){console.log("签名：personal_sign",e,a),e?s(e):(console.log("签名：personal_sign => ".concat(a.result)),b(a.result,t.exspectResult,n,s))})),setTimeout((function(){return s("timeout")}),l)}))},getDesc:function(e){return d(JSON.stringify(e.msg,null,2),e.exspectResult)}},{name:"签名：eth_signTypedData",msg:[{type:"string",name:"Message",value:"Hi, Alice!"},{type:"uint32",name:"A number",value:"1337"}],exspectResult:"0x3f8bf9120d935c802de4d0de4ab5815bc13ca80c9403ffa6c5555cb859ef7a280fb600b1ad6b8f9bc442d7d546b5f0f4159198c6846ec53691c3be34f5d27b911b",test:function(e){return new Promise((function(t,n){var s=i.eth.accounts[0],a=e.msg,r="eth_signTypedData",c=[a,s];i.currentProvider.sendAsync({method:r,params:c,from:s},(function(s,a){console.log("签名：eth_signTypedData",s,a),s?n(s):(console.log("签名：eth_signTypedData => ".concat(a.result)),b(a.result,e.exspectResult,t,n))})),setTimeout((function(){return n("timeout")}),l)}))},getDesc:function(e){return d(JSON.stringify(e.msg,null,2),e.exspectResult)}},{name:"签名：eth_signTypedData_v3",msg:{types:{EIP712Domain:[{name:"name",type:"string"},{name:"version",type:"string"},{name:"chainId",type:"uint256"},{name:"verifyingContract",type:"address"}],Person:[{name:"name",type:"string"},{name:"wallet",type:"address"}],Mail:[{name:"from",type:"Person"},{name:"to",type:"Person"},{name:"contents",type:"string"}]},primaryType:"Mail",domain:{name:"Ether Mail",version:"1",chainId:"1",verifyingContract:"0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC"},message:{from:{name:"Cow",wallet:"0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826"},to:{name:"Bob",wallet:"0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB"},contents:"Hello, Bob!"}},exspectResult:"0x9e7d129f856bc4f9e07d796fab62c4643c03445559537176acb15ebf045210025b83b3b85321e6dbb84bcb38b453cd527bcae0c3b0f7984b607dcc42bfbce3791b",test:function(e){return new Promise((function(t,n){var s=i.eth.accounts[0],a=JSON.stringify(e.msg),r="eth_signTypedData_v3",c=[s,a];i.currentProvider.sendAsync({method:r,params:c,from:s},(function(s,a){console.log("签名：eth_signTypedData_v3",s,a),s?n(s):(console.log("签名：eth_signTypedData_v3 => ".concat(a.result)),b(a.result,e.exspectResult,t,n))})),setTimeout((function(){return n("timeout")}),l)}))},getDesc:function(e){return d(JSON.stringify(e.msg,null,2),e.exspectResult)}}],p={getTasks:function(){return h}};t["a"]=p}).call(this,n("b639").Buffer)},4:function(e,t){},5:function(e,t){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var s=n("2b0e"),a=n("8c4f"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},c=[],i={name:"App",mounted:function(){}},o=i,u=(n("034f"),n("2877")),l=Object(u["a"])(o,r,c,!1,null,null,null),f=l.exports,d=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("ul",[n("li",[n("router-link",{attrs:{to:{name:"ETH"}}},[e._v("ETH DApp")])],1),n("li",[n("router-link",{attrs:{to:{name:"EOS"}}},[e._v("EOS DApp")])],1)])])},m=[],b={name:"Home",mounted:function(){}},h=b,p=Object(u["a"])(h,d,m,!1,null,null,null),v=p.exports,g=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"page"},[n("h2",[e._v("ETH DApp Demo")]),n("div",{staticClass:"task-detail-wrap"},[n("div",{staticClass:"task-name"},[n("div",{staticClass:"label"},[e._v("任务名称：")]),n("div",{staticClass:"value"},[e._v(e._s(e.taskDetail.name))])]),n("div",{staticClass:"task-status"},[n("div",{staticClass:"label"},[e._v("任务状态：")]),n("div",{class:"value "+e.taskDetail.status},[e._v(e._s(e.taskDetail.status))])]),n("div",{staticClass:"task-result"},[n("div",{staticClass:"label"},[e._v("任务结果：")]),"pending"===e.taskDetail.status?n("div",[n("div",{staticClass:"value"},[e._v("执行中……")])]):e._e(),"success"===e.taskDetail.status?n("div",[n("div",{staticClass:"value"},[n("pre",[e._v(e._s(e.taskDetail.response))])])]):e._e(),"error"===e.taskDetail.status?n("div",[n("div",{staticClass:"value"},[e._v(e._s(e.taskDetail.error))])]):e._e()]),e.taskDetail.desc?n("div",{staticClass:"task-desc"},[n("div",{staticClass:"label"},[e._v("任务说明：")]),n("div",{staticClass:"value"},[n("pre",[e._v(e._s(e.taskDetail.desc))])])]):e._e()]),n("div",{staticClass:"task-wrap"},[n("div",{staticClass:"task-tips"},[e._v("选择任务")]),n("div",{staticClass:"task-list"},e._l(e.tasks,(function(t,s){return n("div",{key:s,class:"task-list-item "+t.status,on:{click:function(n){e.handleTask(s,t.name,t.test,t.getDesc?t.getDesc(t):"")}}},[n("div",{staticClass:"number"},[e._v(e._s(s+1))]),n("div",[e._v(e._s(t.name))])])})),0)])])},_=[],y=(n("b0c0"),n("d3b7"),n("25f0"),n("2909")),k=n("5530"),C=n("3790"),w={name:"ETH",data:function(){return{tasks:C["a"].getTasks(),taskDetail:{name:"请选择任务",status:"",response:"",error:"",desc:""}}},methods:{handleTask:function(e,t,n,s){var a=this;console.log("taskName",t),this.taskDetail={name:t,status:"pending",response:"",error:"",desc:s};try{n(this.tasks[e]).then((function(n){a.handleSuccess(e,t,n)})).catch((function(n){a.handleError(e,t,n)}))}catch(r){this.handleError(e,t,r)}},handleSuccess:function(e,t,n){this.taskDetail.name===t&&(this.taskDetail=Object(k["a"])(Object(k["a"])({},this.taskDetail),{},{name:t,status:"success",response:"string"===typeof n?n:JSON.stringify(n)}),this.tasks[e].status="success",this.tasks=Object(y["a"])(this.tasks))},handleError:function(e,t,n){if(this.taskDetail.name===t){var s;try{s=n instanceof Error?n.toString():"string"===typeof n?n:JSON.stringify(n)}catch(a){s=a.toString()}this.taskDetail=Object(k["a"])(Object(k["a"])({},this.taskDetail),{},{name:t,status:"error",error:s})}}}},D=w,x=(n("3778"),Object(u["a"])(D,g,_,!1,null,null,null)),O=x.exports;s["a"].use(a["a"]);var E=new a["a"]({mode:"history",routes:[{path:"/",redirect:"/home"},{path:"/home",name:"Home",component:v},{path:"/eth",name:"ETH",component:O}]});s["a"].use(a["a"]),s["a"].config.productionTip=!1,new s["a"]({router:E,render:function(e){return e(f)}}).$mount("#app")},5941:function(e,t,n){},6:function(e,t){},7:function(e,t){},8:function(e,t){},"85ec":function(e,t,n){}});
//# sourceMappingURL=app.3bea9a5c.js.map