import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter() {
    return new Router({
        mode: 'history',
        routes: [
            {
                path: '/',
                redirect: '/Home'
            },
            { 
                path: '/home',
                component: () => import('@/views/Home/Home'),
                children: [
                    {
                        path: 'two',
                        component: () => import('@/views/Home/Two'),
                        children: [
                            {
                                path: 'three',
                                component: () => import('@/views/Home/Three'),
                            }
                        ]
                    }
                ]
            },
            { 
                path: '/table',
                component: () => import('@/views/Table/Table'),
                children: [
                    {
                        path: '/table/two',
                        component: () => import('@/views/Table/Two'),
                        children: [
                            {
                                path: '/table/two/three',
                                component: () => import('@/views/Table/Three'),
                            }
                        ]
                    }
                ]
            },
        ]
    })
}