import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import FloatBall from '@/components/FloatBall';

Vue.component(FloatBall)
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')