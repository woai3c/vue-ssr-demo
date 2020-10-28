<template>
    <div>
        <p>三级路由</p>
        <p>通过 axios 获取的{{ three }}</p>
    </div>
</template>
<script>
export default {
    asyncData({ store, route }){
        return store.dispatch('fetchData', 'three')
    },
    computed: {
        three() {
            return this.$store.state.three
        }
    },
}
</script>