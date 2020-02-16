<template>
  <b-col cols="6" sm="4" md="3" lg="2" xl="2" class="mb-3">
    <button
      :id="`watchlist-star${movie.id}`"
      @click="handleFavorite"
      class="biz-btn-fav">
      <b-icon icon="star-fill" :variant="iconVariant" />
    </button>
    <b-popover :target="`watchlist-star${movie.id}`" triggers="hover" placement="top">
      {{ movie.favorite ? 'Remove from' : 'Add to' }} the <strong> watchlist</strong>
    </b-popover>
    <b-link href="javascript:void(0)" @click="handleSelected">
      <b-img
        v-if="movie.hasPoster"
        :src="src"
        :alt="movie.title"
        fluid-grow
        class="biz-movie-img"
        thumbnail />
      <b-img
        v-else
        :alt="movie.title"
        blank
        blank-color="#CCC"
        fluid-grow
        :width="imgWidth"
        :height="1.5 * imgWidth"
        class="biz-movie-img"
        thumbnail />
    </b-link>
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
      imgWidth: 185,
    };
  },
  computed: {
    src() {
      return `https://image.tmdb.org/t/p/${this.movie.getImagePathWithSize(`w${this.imgWidth}`)}`
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
  right: 25px;
  top: 10px;
  padding: 0;
  border-radius: 15px;
  border: none;
  height: 25px;
  width: 25px;
}
.biz-btn-fav svg {
  vertical-align: text-top;
}
.biz-movie-img {
  cursor: pointer;
}
</style>
