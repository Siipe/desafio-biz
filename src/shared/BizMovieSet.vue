<template>
  <b-row>
    <biz-movie
      v-for="movie in movies"
      :key="movie.id"
      :movie="movie"
      @bizmovieRemoveFavorite="removeFromFavorite"
      @bizmovieAddFavorite="addToFavorite"
      @bizmovieSelected="handleSelected" />
    <biz-movie-carousel
      v-if="hasSelectedMovie"
      :movies="movies"
      :currentMovie="selectedMovie"
      :checkPagination="checkPagination"
      :currentPage="currentPage"
      :totalResults="totalResults"
      @bizMovieCarouselClose="handleCarouselClose"
      @bizmovieRemoveFavorite="removeFromFavorite"
      @bizmovieAddFavorite="addToFavorite"
      @bizMovieCarouselMovieChange="handleCaroulselMovieChange"
      @bizMovieCarouselPageChange="handleCaroulselPageChange" />
  </b-row>
</template>
<script>
import BizMovie from './BizMovie.vue';
import BizMovieCarousel from './BizMovieCarousel.vue';
import Movie from '../movie/movie';

export default {
  components: {
    BizMovie,
    BizMovieCarousel,
  },
  props: {
    movies: {
      type: Array,
      required: true,
      default: () => [],
      validator: (movies) => movies.every((movie) => movie instanceof Movie),
    },
    checkPagination: {
      type: Boolean,
      required: false,
      default: false,
    },
    currentPage: {
      type: Number,
      required: false,
      default: 0,
    },
    totalResults: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      selectedMovie: {},
      nextPageSelectedMovie: null,
    };
  },
  watch: {
    movies(val) {
      if (!this.nextPageSelectedMovie) {
        return;
      }
      const movieIndex = {
        first: 0,
        last: val.length - 1,
      };
      this.$set(this, 'selectedMovie', val[movieIndex[this.nextPageSelectedMovie]]);
      this.$set(this, 'nextPageSelectedMovie', null);
    },
  },
  computed: {
    hasSelectedMovie() {
      return !this.$_.isEmpty(this.selectedMovie);
    },
  },
  methods: {
    removeFromFavorite(movie) {
      this.$emit('bizmovieRemoveFavorite', movie);
    },
    addToFavorite(movie) {
      this.$emit('bizmovieAddFavorite', movie);
    },
    handleSelected(movie) {
      this.$set(this, 'selectedMovie', movie);
    },
    handleCarouselClose() {
      this.$set(this, 'selectedMovie', {});
    },
    handleCaroulselMovieChange(movie) {
      this.$set(this, 'selectedMovie', movie);
    },
    handleCaroulselPageChange(page, nextPageSelectedMovie) {
      this.$set(this, 'nextPageSelectedMovie', nextPageSelectedMovie);
      this.$emit('bizMovieCarouselPageChange', page);
    },
  },
};
</script>
