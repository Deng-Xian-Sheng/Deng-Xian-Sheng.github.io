import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NotFoundComponent from '@/views/NotFoundComponent'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            // 页面标题title
            title: '说说话-邓文怡.com',
        }
    },
    {
        path: '*',
        name: '404',
        component: NotFoundComponent,
        meta: {
            // 页面标题title
            title: '404',
        }
    },
]
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

export default router