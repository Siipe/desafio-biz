import './assets/scss/custom.scss';
import Vue from 'vue';
import VueRouter from 'vue-router';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from './App.vue';
import router from './router';
import BizContainer from './components/BizContainer.vue';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.component('BizContainer', BizContainer);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
