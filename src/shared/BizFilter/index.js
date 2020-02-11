import BizFilter from './BizFilter.vue';
import BizTextFilter from './BizTextFilter.vue';

function install(Vue) {
  Vue.component('BizFilter', BizFilter);
  Vue.component('BizTextFilter', BizTextFilter);
}

export default install;
