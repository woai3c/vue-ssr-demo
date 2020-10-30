<template>
    <div class="container">
        <p>Home 一级路由<router-link to="/table">切换到 Table</router-link></p>
        <Button type="primary" @click="changeData">点击此按钮，通过 ajax 请求改变路由数据</Button>
        <p>通过 ajax 获取的{{ one }}</p>
        <router-link to="/home/two">跳到二级路由</router-link>
        <router-view />
    </div>
</template>
<script>
export default {
    asyncData({ store, route }) {
        return store.dispatch('fetchData', 'one')
    },
    computed: {
        one() {
            return this.$store.state.one
        }
    },
    methods: {
        changeData() {
            this.$store.dispatch('changeData')
        }
    }
}
</script>

<style scoped>
.container {
    font-size: 20px;
    padding: 20px;
}
</style>