(self.webpackChunkjbook=self.webpackChunkjbook||[]).push([[96186],{96186:function(){!function(e){function n(e,n){return e.replace(/<<(\d+)>>/g,(function(e,a){return"(?:"+n[+a]+")"}))}function a(e,a,r){return RegExp(n(e,a),r||"")}var r=RegExp("\\b(?:"+"Adj BigInt Bool Ctl Double false Int One Pauli PauliI PauliX PauliY PauliZ Qubit Range Result String true Unit Zero Adjoint adjoint apply as auto body borrow borrowing Controlled controlled distribute elif else fail fixup for function if in internal intrinsic invert is let mutable namespace new newtype open operation repeat return self set until use using while within".trim().replace(/ /g,"|")+")\\b"),t=n("<<0>>(?:\\s*\\.\\s*<<0>>)*",["\\b[A-Za-z_]\\w*\\b"]),i={keyword:r,punctuation:/[<>()?,.:[\]]/},s='"(?:\\\\.|[^\\\\"])*"';e.languages.qsharp=e.languages.extend("clike",{comment:/\/\/.*/,string:[{pattern:a("(^|[^$\\\\])<<0>>",[s]),lookbehind:!0,greedy:!0}],"class-name":[{pattern:a("(\\b(?:as|open)\\s+)<<0>>(?=\\s*(?:;|as\\b))",[t]),lookbehind:!0,inside:i},{pattern:a("(\\bnamespace\\s+)<<0>>(?=\\s*\\{)",[t]),lookbehind:!0,inside:i}],keyword:r,number:/(?:\b0(?:x[\da-f]+|b[01]+|o[0-7]+)|(?:\B\.\d+|\b\d+(?:\.\d*)?)(?:e[-+]?\d+)?)l?\b/i,operator:/\band=|\bor=|\band\b|\bor\b|\bnot\b|<[-=]|[-=]>|>>>=?|<<<=?|\^\^\^=?|\|\|\|=?|&&&=?|w\/=?|~~~|[*\/+\-^=!%]=?/,punctuation:/::|[{}[\];(),.:]/}),e.languages.insertBefore("qsharp","number",{range:{pattern:/\.\./,alias:"operator"}});var o=function(e,n){for(var a=0;a<2;a++)e=e.replace(/<<self>>/g,(function(){return"(?:"+e+")"}));return e.replace(/<<self>>/g,"[^\\s\\S]")}(n('\\{(?:[^"{}]|<<0>>|<<self>>)*\\}',[s]));e.languages.insertBefore("qsharp","string",{"interpolation-string":{pattern:a('\\$"(?:\\\\.|<<0>>|[^\\\\"{])*"',[o]),greedy:!0,inside:{interpolation:{pattern:a("((?:^|[^\\\\])(?:\\\\\\\\)*)<<0>>",[o]),lookbehind:!0,inside:{punctuation:/^\{|\}$/,expression:{pattern:/[\s\S]+/,alias:"language-qsharp",inside:e.languages.qsharp}}},string:/[\s\S]+/}}})}(Prism),Prism.languages.qs=Prism.languages.qsharp}}]);
//# sourceMappingURL=96186.48a4470b.chunk.js.map