"use strict";(self.webpackChunkmicro_front_end_app=self.webpackChunkmicro_front_end_app||[]).push([[3444,3047],{595:function(e){function t(e){!function(e){function t(e,t){return"___"+e.toUpperCase()+t+"___"}Object.defineProperties(e.languages["markup-templating"]={},{buildPlaceholders:{value:function(n,a,r,o){if(n.language===a){var i=n.tokenStack=[];n.code=n.code.replace(r,(function(e){if("function"===typeof o&&!o(e))return e;for(var r,s=i.length;-1!==n.code.indexOf(r=t(a,s));)++s;return i[s]=e,r})),n.grammar=e.languages.markup}}},tokenizePlaceholders:{value:function(n,a){if(n.language===a&&n.tokenStack){n.grammar=e.languages[a];var r=0,o=Object.keys(n.tokenStack);!function i(s){for(var u=0;u<s.length&&!(r>=o.length);u++){var g=s[u];if("string"===typeof g||g.content&&"string"===typeof g.content){var l=o[r],p=n.tokenStack[l],c="string"===typeof g?g:g.content,f=t(a,l),d=c.indexOf(f);if(d>-1){++r;var k=c.substring(0,d),E=new e.Token(a,e.tokenize(p,n.grammar),"language-"+a,p),m=c.substring(d+f.length),S=[];k&&S.push.apply(S,i([k])),S.push(E),m&&S.push.apply(S,i([m])),"string"===typeof g?s.splice.apply(s,[u,1].concat(S)):g.content=S}}else g.content&&i(g.content)}return s}(n.tokens)}}}})}(e)}e.exports=t,t.displayName="markupTemplating",t.aliases=[]},7191:function(e,t,n){var a=n(595);function r(e){e.register(a),function(e){e.languages.tt2=e.languages.extend("clike",{comment:/#.*|\[%#[\s\S]*?%\]/,keyword:/\b(?:BLOCK|CALL|CASE|CATCH|CLEAR|DEBUG|DEFAULT|ELSE|ELSIF|END|FILTER|FINAL|FOREACH|GET|IF|IN|INCLUDE|INSERT|LAST|MACRO|META|NEXT|PERL|PROCESS|RAWPERL|RETURN|SET|STOP|TAGS|THROW|TRY|SWITCH|UNLESS|USE|WHILE|WRAPPER)\b/,punctuation:/[[\]{},()]/}),e.languages.insertBefore("tt2","number",{operator:/=[>=]?|!=?|<=?|>=?|&&|\|\|?|\b(?:and|or|not)\b/,variable:{pattern:/[a-z]\w*(?:\s*\.\s*(?:\d+|\$?[a-z]\w*))*/i}}),e.languages.insertBefore("tt2","keyword",{delimiter:{pattern:/^(?:\[%|%%)-?|-?%]$/,alias:"punctuation"}}),e.languages.insertBefore("tt2","string",{"single-quoted-string":{pattern:/'[^\\']*(?:\\[\s\S][^\\']*)*'/,greedy:!0,alias:"string"},"double-quoted-string":{pattern:/"[^\\"]*(?:\\[\s\S][^\\"]*)*"/,greedy:!0,alias:"string",inside:{variable:{pattern:/\$(?:[a-z]\w*(?:\.(?:\d+|\$?[a-z]\w*))*)/i}}}}),delete e.languages.tt2.string,e.hooks.add("before-tokenize",(function(t){e.languages["markup-templating"].buildPlaceholders(t,"tt2",/\[%[\s\S]+?%\]/g)})),e.hooks.add("after-tokenize",(function(t){e.languages["markup-templating"].tokenizePlaceholders(t,"tt2")}))}(e)}e.exports=r,r.displayName="tt2",r.aliases=[]}}]);
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_tt2.4309a95a.chunk.js.map