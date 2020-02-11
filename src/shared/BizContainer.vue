<template>
  <b-container fluid="sm" style="margin-top: 100px">
    <h5 class="font-weight-light text-center text-lg-left mt-4 mb-0">
      <strong>{{ title }}</strong>
    </h5>
    <hr class="mt-2 mb-4">
    <slot></slot>
  </b-container>
</template>
<script>
export default {
  props: {
    title: String,
  },
}
</script>
