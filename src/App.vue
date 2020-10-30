<template>
    <div id="app">
        <p class="tip">虽然这只是一个 demo，但是引入第三方组件及样式问题的坑都踩完了，可以正常开发。</p>
        <router-view></router-view>
    </div>
</template>

<style>
body {
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
}
.tip {
    font-size: 20px;
    text-align: center;
}
</style>