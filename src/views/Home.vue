<template>
  <div>
    <h3>文章列表</h3>
    <div class="list" v-for="i in list">
      <router-link :to="{path:'/item/'+i.id}">{{i.title}}</router-link>
    </div>
    <button @click="test">test</button>
    <button @click="get">get</button>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  asyncData ({store, route}){
    return store.dispatch('fetchList')
  },
  computed: {
    list () {
      return this.$store.state.list
    }
  },
  data(){
    return {
      name:'wfz'
    }
  },
  methods: {
    test() {
      axios.post('http://localhost:9003/test').then(res => {
        console.log(res)
      })
    },
    get() {
      axios.get('http://localhost:9003/get').then(res => {
        console.log(res)
      })
    }
  }
}
</script>