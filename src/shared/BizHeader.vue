<template>
  <b-navbar toggleable="sm" variant="biz-navbar" fixed="top">
    <b-container fluid="sm">
      <b-navbar-toggle target="nav_collapse" />
      <b-navbar-brand :to="{ name: 'home' }">
        <img src="@/assets/svg/bizcapital-logo.svg" />
      </b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav class="ml-auto">
          <b-nav-item :to="{ name: 'home' }" :active="isActive('home')" class="ml-2">
            <b-icon icon="house" font-scale="1.3" /> Home
          </b-nav-item>
          <b-nav-item :to="{ name: 'watchlist' }" :active="isActive('watchlist')" class="ml-2">
            <b-icon icon="star" font-scale="1.3" /> Watchlist
          </b-nav-item>
          <b-nav-item :to="{ name: 'search' }" :active="isActive('search')" class="ml-2">
            <b-icon icon="search" font-scale="1.3" /> Search
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>
<script>
export default {
  methods: {
    isActive(name) {
      return this.$route.name === name;
    },
  },
}
</script>
