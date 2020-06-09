# vue-ssr-demo
[Vue.js 服务器端渲染指南](https://ssr.vuejs.org/zh/)

1. 服务器渲染的路由只能使用 history 模式，因为浏览器不会把 # 后面的字符串传递到后端。
2. 第一次进入页面时是服务端渲染，后面的路由跳转由 vue-router 接管。

## 使用
克隆项目
```
git clone https://github.com/woai3c/vue-ssr-demo.git
```
下载依赖
```
npm i
```
启动
```
npm run dev
```
