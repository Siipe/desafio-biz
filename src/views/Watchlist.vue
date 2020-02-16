<template>
  <biz-container title="Watchlist">
    <b-row>
      <b-col v-if="!movies.length" cols="12">
        <p class="text-secondary">
          <b-icon icon="alert-triangle-fill" font-scale="1.3" /> Your watchlist is empty.
        </p>
      </b-col>
      <biz-movie
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        @bizmovieRemoveFavorite="removeFromFavoriteAndUpdate" />
    </b-row>
  </biz-container>
</template>
<script>
import moviesMixin from '../movie/movies-mixin';
import service from '../movie/service';

export default {
  mixins: [moviesMixin],
  methods: {
    fetchWatchlist() {
      this.movies = service.prepareMovieObjects(this.$storage.get('biz-watchlist'));
    },
    removeFromFavoriteAndUpdate(movie) {
      try {
        this.removeFromFavorite(movie);
        this.fetchWatchlist();
      } catch (error) {
        this.$notifyError(error);
      }
    },
  },
  created() {
    this.fetchWatchlist();
  },
};
</script>
