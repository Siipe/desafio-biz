import BizMovie from '../shared/BizMovie.vue';

export default {
  components: {
    BizMovie,
  },
  data() {
    return {
      movies: [],
    };
  },
  watch: {
    movies() {
      this.checkFavorites();
    },
  },
  methods: {
    checkFavorites() {
      (this.$storage.get('biz-watchlist') || []).forEach((movie) => {
        const match = this.movies.find((mv) => mv.id === movie.id);
        if (!match) {
          return;
        }
        match.favorite = true;
      });
    },
    removeFromFavorite(movie) {
      movie.favorite = false;
      const watchlist = this.$storage.pull('biz-watchlist') || [];
      this.$storage.set('biz-watchlist', watchlist.filter((mv) => mv.id !== movie.id));
    },
    addToFavorite(movie) {
      movie.favorite = true;
      const watchlist = this.$storage.pull('biz-watchlist') || [];
      watchlist.push(movie);
      this.$storage.set('biz-watchlist', watchlist);
    },
  },
};
