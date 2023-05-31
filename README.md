个人用小工具 fork 自 chrome-extension-boilerplate-react-vite 项目

在使用中未解决的问题：
1.在 content sciprt 脚本注入的组件 其引用静态资源会被链接到 content 所在 tab 页面
2.在 content sciprt 脚本注入的组件 构建和热更新速度特别慢 似乎是在引用了 antd 组件库后 打包了所有UI库内容
