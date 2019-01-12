(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{166:function(t,e,a){"use strict";a.r(e);var s=a(0),n=Object(s.a)({},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content"},[t._m(0),t._v(" "),t._m(1),t._v(" "),a("p",[t._v("首先得有 "),a("a",{attrs:{href:"https://nodejs.org/en/",target:"_blank",rel:"noopener noreferrer"}},[t._v("node"),a("OutboundLink")],1),t._v("，并确保 node 版本是 8.10 或以上。（mac 下推荐使用 "),a("a",{attrs:{href:"https://github.com/creationix/nvm",target:"_blank",rel:"noopener noreferrer"}},[t._v("nvm"),a("OutboundLink")],1),t._v(" 来管理 node 版本）")]),t._v(" "),t._m(2),a("p",[t._v("推荐使用 yarn 管理 npm 依赖，并"),a("a",{attrs:{href:"https://github.com/yiminghe/tyarn",target:"_blank",rel:"noopener noreferrer"}},[t._v("使用国内源"),a("OutboundLink")],1),t._v("（阿里用户使用内网源）。")]),t._v(" "),t._m(3),a("p",[t._v("然后全局安装 vea，并确保版本是 1.0.0 或以上。")]),t._v(" "),t._m(4),t._m(5),t._v(" "),a("p",[t._v("先找个地方建个空目录。")]),t._v(" "),t._m(6),t._m(7),t._v(" "),t._m(8),t._m(9),t._v(" "),t._m(10),a("p",[t._v("然后启动本地服务器，")]),t._v(" "),t._m(11),t._m(12),t._v(" "),t._m(13),t._m(14),t._v(" "),t._m(15),t._m(16),t._v(" "),t._m(17)])},[function(){var t=this.$createElement,e=this._self._c||t;return e("h1",{attrs:{id:"快速上手"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#快速上手","aria-hidden":"true"}},[this._v("#")]),this._v(" 快速上手")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"环境准备"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#环境准备","aria-hidden":"true"}},[this._v("#")]),this._v(" 环境准备")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[this._v("$ node -v\n8.1x\n")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 国内源")]),t._v("\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" i yarn tyarn -g\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 后面文档里的 yarn 换成 tyarn")]),t._v("\n$ tyarn -v\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 阿里内网源")]),t._v("\n$ tnpm i yarn @alipay/yarn -g\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 后面文档里的 yarn 换成 ayarn")]),t._v("\n$ ayarn -v\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[this._v("$ yarn global add vea\n$ vea -v\n1.0.0\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"脚手架"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#脚手架","aria-hidden":"true"}},[this._v("#")]),this._v(" 脚手架")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[this._v("$ "),e("span",{pre:!0,attrs:{class:"token function"}},[this._v("mkdir")]),this._v(" myapp "),e("span",{pre:!0,attrs:{class:"token operator"}},[this._v("&&")]),this._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[this._v("cd")]),this._v(" myapp\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("然后通过 "),e("code",[this._v("vea init")]),this._v(" 初始化项目，")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[this._v("$ vea init vue\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("blockquote",[e("p",[e("code",[this._v("vea init")]),this._v("是"),e("code",[this._v("vea")]),this._v("提供的快速初始化项目的工具，目前支持vue项目的快速初始化。\n得到目录结构")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v(".")]),t._v("\n\n└── src\n    └── "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),t._v(".\n└── public\n    └── "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),t._v(".  \n└── vea.config    \n└── package.json    \n└── "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),t._v(".    \n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[this._v("$ vea dev\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("blockquote",[e("p",[this._v("服务默认会在9001端口运行")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[this._v("$ vea build\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("blockquote",[e("p",[this._v("打包项目到dist目录")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[this._v("$ vea deploy \n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("blockquote",[e("p",[this._v("部署")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"tip custom-block"},[e("p",{staticClass:"custom-block-title"},[this._v("部署解释")]),this._v(" "),e("p",[this._v("需要在配置文件内设置"),e("code",[this._v("deployGitPath")])])])}],!1,null,null,null);n.options.__file="README.md";e.default=n.exports}}]);