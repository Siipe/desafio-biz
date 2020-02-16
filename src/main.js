import 'nprogress/nprogress.css';
import './assets/scss/custom.scss';
import Vue from 'vue';
import VueRouter from 'vue-router';
import {Vue2Storage} from 'vue2-storage'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import moment from 'moment-timezone';
import _ from 'lodash';
import instanceMixin from './instance-mixin';
import App from './App.vue';
import router from './router';
import BizContainer from './shared/BizContainer.vue';
import BizFilter from './shared/BizFilter';

moment.tz.setDefault('America/Sao_Paulo');
moment.locale('pt-br');

Object.defineProperty(Vue.prototype, '$_', { value: _ });

Vue.config.productionTip = false;

Vue.mixin(instanceMixin);

Vue.use(VueRouter);
Vue.use(Vue2Storage);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(BizFilter);

Vue.component('BizContainer', BizContainer);

new Vue({
  router,
  render: h => h(App),
  created () {
    if (!this.$storage.has('biz-watchlist')) {
      this.$storage.set('biz-watchlist', []);
    }
  },
}).$mount('#app');
