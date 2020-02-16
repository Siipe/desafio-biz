<template>
  <biz-container title="Most Popular">
    <biz-movie-set
      :movies="movies"
      @bizmovieRemoveFavorite="removeFromFavorite"
      @bizmovieAddFavorite="addToFavorite" />
  </biz-container>
</template>
<script>
import moviesMixin from '../movie/movies-mixin';
import service from '../movie/service';

export default {
  mixins: [moviesMixin],
  async created() {
    try {
      const request = await service.getPopular();
      this.movies = request.results.slice(0, 12);
      this.checkFavorites();
    } catch (error) {
      this.$notifyError(error);
    }
  },
}
</script>
