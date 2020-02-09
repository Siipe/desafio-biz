<template>
  <biz-container title="Most Popular">
    <b-row>
      <biz-movie v-for="movie in movies" :key="movie.id" :movie="movie" />
    </b-row>
  </biz-container>
</template>
<script>
import BizMovie from '../components/BizMovie.vue';
import service from '../service';

export default {
  components: {
    BizMovie,
  },
  data() {
    return {
      movies: [],
    };
  },
  async created() {
    try {
      const request = await service.getPopular();
      this.movies = request.results.slice(0, 12);
    } catch (error) {
      console.log('FAILED: ', error.message);
    }
  },
}
</script>
