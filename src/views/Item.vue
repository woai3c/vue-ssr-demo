<template>
    <div>
        <span v-if="!item">loading</span>
        <div v-if="item">
            <h2>{{ item.title }}</h2>

            <div v-html="item.content"></div>
        </div>

        <div>
            <button @click="$router.back()">back</button>
        </div>
        <div>
            <button @click="ste">somethingelse</button>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
  asyncData ({ store, route }) {
    return store.dispatch('fetchItem', route.params.id)
  },
  computed: {
    item () {
      return this.$store.state.items[this.$route.params.id]
    }
  },
  created() {
    console.log('item created')
  },
  mounted () {
    console.log('item mounted')
  },
  methods: {
    ste() {
      axios.post('http://localhost:8080/somethingelse').then(res => {
        console.log(res)
      })
    }
  }
}
</script>