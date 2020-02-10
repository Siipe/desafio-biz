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
        @bizmovieRemoveFavorite="removeFromFavorite" />
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
  methods: {
    fetchWatchlist() {
      this.movies = service.prepareMovieObjects(this.$storage.get('biz-watchlist'));
    },
    removeFromFavorite(movie) {
      movie.favorite = false;
      const watchlist = this.$storage.pull('biz-watchlist');
      this.$storage.set('biz-watchlist', watchlist.filter((mv) => mv.id !== movie.id));
      this.fetchWatchlist();
    },
  },
  created() {
    this.fetchWatchlist();
  },
};
</script>
