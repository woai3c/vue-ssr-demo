<template>
    <div>
        <p>Home 一级路由<router-link to="/table">切换到 Table</router-link></p>
        <button @click="changeData">通过 ajax 改变路由数据</button>
        <p>通过 ajax 获取的{{ one }}</p>
        <router-link to="/home/two">跳到二级路由</router-link>
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
    mounted() {
        this.dataPromise.then(res => console.log(res))
    },
    methods: {
        changeData() {
            this.$store.dispatch('changeData')
        }
    }
}
</script>