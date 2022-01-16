import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NotFoundComponent from '@/views/NotFoundComponent'
import NeiTui from '@/views/NeiTui'
import JuanZhu from '@/views/JuanZhu'
import LianXiZuoZhe from '@/views/LianXiZuoZhe'
import GuanYuBenZhan from '@/views/GuanYuBenZhan'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        components: {
            default: Home,
        },
        meta: {
            // 页面标题title
            title: '说说话-邓文怡.com',
        }
    },
    {
        path: '/juanzhu',
        name: "JuanZhu",
        components: {
            default: Home,
            popupFloatBall: JuanZhu,
        },
        meta: {
            title: "捐助-邓文怡.com",
        }
    },
    {
        path: '/lianxizuozhe',
        name: 'LianXiZuoZhe',
        components: {
            default: Home,
            popupFloatBall: LianXiZuoZhe,
        },
        children: [{
            path: "neitui",
            name: "NeiTui",
            components: {
                default: NeiTui,
            },
            meta: {
                title: "联系作者-帮我内推！",
            }
        }, ],
        meta: {
            title: '联系作者-邓文怡.com'
        }
    },
    {
        path: '/guanyubenzhan',
        name: 'GuanYuBenZhan',
        components: {
            default: Home,
            popupFloatBall: GuanYuBenZhan,
        },
        meta: {
            title: '关于本站-邓文怡.com'
        }
    },
    {
        path: '*',
        name: '404',
        components: {
            default: NotFoundComponent,
        },
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