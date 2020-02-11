<template>
  <b-col xl="2" lg="3" md="4" sm="5">
    <div class="biz-movie-container mb-3" :style="`width: ${defaultWidth}px`">
      <button
        @click="handleFavorite"
        class="biz-btn-fav"
        title="Add to the watchlist">
        <b-icon icon="star-fill" :variant="iconVariant" />
      </button>
      <b-img
        :src="src"
        :alt="movie.title"
        @click="handleSelected"
        class="biz-movie-img"
        thumbnail />
    </div>
  </b-col>
</template>
<script>
import Movie from '../movie/movie';

export default {
  props: {
    movie: {
      type: Movie,
      required: true,
      default: () => ({}),
    },
  },
  data() {
    return {
      defaultWidth: 154,
    };
  },
  computed: {
    src() {
      return this.movie.hasPoster
        ? `https://image.tmdb.org/t/p/${this.movie.getImagePathWithSize(`w${this.defaultWidth}`)}`
        : 'https://dummyimage.com/300x200/#CCC/fff.jpg&text=no_image';
    },
    iconVariant() {
      return this.movie.favorite
          ? 'fav-star-checked'
          : 'fav-star-unchecked';
    },
  },
  methods: {
    handleFavorite() {
      const event = this.movie.favorite ? 'bizmovieRemoveFavorite' : 'bizmovieAddFavorite';
      this.$emit(event, this.movie);
    },
    handleSelected() {
      this.$emit('bizmovieSelected', this.movie);
    }
  },
};
</script>
<style scoped>
  div.biz-movie-container {
    position: relative;
  }
  .biz-btn-fav {
    position: absolute;
    right: 8px;
    top: 8px;
    padding: 0;
    border-radius: 15px;
    border: none;
    height: 25px;
    width: 25px;
    outline: none;
  }
  .biz-btn-fav svg {
    vertical-align: text-top;
  }
  .biz-movie-img {
    cursor: pointer;
  }
</style>
