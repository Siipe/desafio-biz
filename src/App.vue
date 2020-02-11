<template>
  <div id="app">
    <biz-header />
    <router-view></router-view>
  </div>
</template>
<script>
import BizHeader from './shared/BizHeader.vue';

export default {
  components: {
    BizHeader,
  }
};
</script>
