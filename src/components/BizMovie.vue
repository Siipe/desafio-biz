<template>
  <b-col lg="2" md="3" sm="4" cols="6">
    <div class="biz-movie-container">
      <button class="btest"></button>
      <b-img thumbnail :src="movie.hasPoster()
        ? `https://image.tmdb.org/t/p/${movie.getImagePathWithSize()}`
        : 'https://dummyimage.com/300x200/#CCC/fff.jpg&text=no_image'" :alt="movie.title" />
    </div>
  </b-col>
</template>
<script>
import Movie from '../movie';

export default {
  props: {
    movie: {
      type: Movie,
      required: true,
      default: () => ({}),
    },
  },
  data() {
    return {};
  },
}
</script>
<style scoped>
  div.biz-movie-container {
    position: relative;
    width: 92px;
  }
  .btest {
    position: absolute;
    right: 2px;
    top: 2px;
  }
</style>
