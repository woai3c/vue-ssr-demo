<template>
  <div>
    <h3>文章列表</h3>
    <div class="list" v-for="i in list">
      <router-link :to="{path:'/item/'+i.id}">{{i.title}}</router-link>
    </div>
    <img src="https://avatars0.githubusercontent.com/u/22117876?s=460&u=7bd8f32788df6988833da6bd155c3cfbebc68006&v=4">
    <div>
        <button @click="gettest">gettest</button>
    </div>
    <div>
        <button @click="posttest">posttest</button>
    </div>
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
  beforeCreate() {
      console.log('home beforeCreate')
  },
  created() {
    console.log('home created')
  },
  mounted () {
    console.log('home mounted')
  },
  data(){
    return {
      name:'wfz',
    }
  },
  methods: {
    posttest() {
      axios.post('http://localhost:8080/posttest').then(res => {
        console.log(res)
      })
    },
    gettest() {
      axios.get('http://localhost:8080/gettest').then(res => {
        console.log(res)
      })
    }
  }
}
</script>