<template>
    <div>
        <p>Table 一级路由<router-link to="/home">切换到 Home</router-link></p>
        <button @click="changeData">通过 ajax 改变路由数据</button>
        <p>通过 ajax 获取的{{ one }}</p>
        <router-link to="/table/two">跳到二级路由</router-link>
        <router-view />
    </div>
</template>
<script>
export default {
    asyncData({ store, route }){
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