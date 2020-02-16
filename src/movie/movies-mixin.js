import BizMovieSet from '../shared/BizMovieSet.vue';

export default {
  components: {
    BizMovieSet,
  },
  data() {
    return {
      movies: [],
    };
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
      try {
        movie.favorite = false;
        const watchlist = this.$storage.pull('biz-watchlist') || [];
        this.$storage.set('biz-watchlist', watchlist.filter((mv) => mv.id !== movie.id));
        this.$notifySuccess(`Movie "${movie.title}" was removed from your watchlist.`);
      } catch (error) {
        this.$notifyError(error);
      }
    },
    addToFavorite(movie) {
      try {
        movie.favorite = true;
        const watchlist = this.$storage.pull('biz-watchlist') || [];
        watchlist.push(movie);
        this.$storage.set('biz-watchlist', watchlist);
        this.$notifySuccess(`Movie "${movie.title}" was added to your watchlist.`);
      } catch (error) {
        this.$notifyError(error);
      }
    },
  },
};
