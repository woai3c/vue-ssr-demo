import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('./views/Home.vue')
const Item = () => import('./views/Item.vue')

Vue.use(Router)

export function createRouter(){
  return new Router({
    mode: 'history',
    routes: [
      { path: '/', component: Home },
      { path: '/item/:id', component: Item }
    ]
  })
}