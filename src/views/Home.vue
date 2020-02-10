<template>
  <biz-container title="Most Popular">
    <b-row>
      <biz-movie
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        @bizmovieRemoveFavorite="removeFromFavorite"
        @bizmovieAddFavorite="addToFavorite" />
    </b-row>
  </biz-container>
</template>
<script>
import moviesMixin from '../movies-mixin';
import service from '../service';

export default {
  mixins: [moviesMixin],
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
