<template>
  <div class="container">
    <h5 class="font-weight-light text-center text-lg-left mt-4 mb-0">
      <strong>{{ title }}</strong>
    </h5>
    <hr class="mt-2 mb-4">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
  },
}
</script>