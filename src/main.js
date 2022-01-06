import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import FloatBall from '@/components/FloatBall';
import router from './router'
import VueWechatTitle from 'vue-wechat-title'

Vue.component('FloatBall', FloatBall);

Vue.use(ElementUI);
Vue.use(VueWechatTitle)

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')