<template>
  <div id="app">
    <biz-header />
    <router-view></router-view>
  </div>
</template>
<script>
import BizHeader from './components/BizHeader.vue';

export default {
  components: {
    BizHeader,
  }
};
</script>
