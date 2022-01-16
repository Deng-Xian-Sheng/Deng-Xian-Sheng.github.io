import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import FloatBall from '@/components/FloatBall';
import router from './router'
import VueWechatTitle from 'vue-wechat-title'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import Clipboard from 'clipboard'
import PDF from 'vue-pdf'
//雪花和冰封
import "../public/css/XueAndBing.css"

Vue.component('FloatBall', FloatBall);
Vue.component('PDF', PDF);

Vue.use(ElementUI);
Vue.use(VueWechatTitle)
Vue.use(MintUI)
Vue.use(mavonEditor)

Vue.prototype.Clipboard = Clipboard
Vue.prototype.PDF = PDF

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')