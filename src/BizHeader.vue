<template>
  <b-navbar toggleable="lg" variant="biz-navbar">
    <div class="container">
      <b-navbar-brand :to="{ name: 'home' }">
        <img src="@/assets/svg/bizcapital-logo.svg" />
      </b-navbar-brand>
      <b-navbar-toggle target="nav_collapse" />
      <b-navbar-nav>
        <b-nav-item :to="{ name: 'home' }">Home</b-nav-item>
        <b-nav-item :to="{ name: 'watchlist' }" >Watchlist</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-input-group>
          <b-form-input size="sm" placeholder="Search for a movie..." /> 
          <b-input-group-append>
            <b-button size="sm" variant="outline-secondary">
              <b-icon icon="search" font-scale="1.3" />
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </b-navbar-nav>
    </div>
  </b-navbar>
</template>
<script>
export default {
  
}
</script>