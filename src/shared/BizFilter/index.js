import BizFilter from './BizFilter.vue';
import BizTextFilter from './BizTextFilter.vue';
import BizComboFilter from './BizComboFilter.vue';
import BizNumberFilter from './BizNumberFilter.vue';

function install(Vue) {
  Vue.component('BizFilter', BizFilter);
  Vue.component('BizTextFilter', BizTextFilter);
  Vue.component('BizComboFilter', BizComboFilter);
  Vue.component('BizNumberFilter', BizNumberFilter);
}

export default install;
