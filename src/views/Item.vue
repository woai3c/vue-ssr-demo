<template>
  <div>
    <span v-if="!item">loading</span>
    <div v-if="item">
     <h2>{{item.title}}</h2>
      
      <div v-html="item.content"></div>
    </div>

  </div>
</template>
<script>
export default {
  asyncData ({ store, route }) {
    return store.dispatch('fetchItem', route.params.id)
  },
  computed: {
    item () {
      return this.$store.state.items[this.$route.params.id]
    }
  },
  mounted () {
    console.log('item logeed')
  }
}
</script>