<template>
    <div>
        <p>二级路由</p>
        <p>通过 axios 获取的{{ two }}</p>
        <router-link to="/table/two/three">跳到三级路由</router-link>
        <router-view />
    </div>
</template>
<script>
export default {
    asyncData ({ store, route }){
        return store.dispatch('fetchData', 'two')
    },
    computed: {
        two() {
            return this.$store.state.two
        }
    },
}
</script>