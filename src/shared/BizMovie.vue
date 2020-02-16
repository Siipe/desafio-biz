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
    <b-img
      v-if="movie.hasPoster"
      :src="src"
      :alt="movie.title"
      fluid-grow
      @click="handleSelected"
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
      @click="handleSelected"
      class="biz-movie-img"
      thumbnail />
    <b-modal
      v-if="modalOpen"
      v-model="modalOpen"
      size="lg"
      centered
      button-size="sm"
      hide-header
      hide-footer
      body-class="biz-modal-body">
      <b-card no-body class="overflow-hidden">
        <b-row no-gutters>
          <b-col md="6">
            <b-card-img
              v-if="movie.hasPoster"
              :src="src"
              fluid-grow
              class="rounded-0" />
            <b-img
              v-else
              :alt="movie.title"
              blank
              blank-color="#CCC"
              fluid-grow
              :width="imgWidth"
              :height="1.5 * imgWidth"
              class="rounded-0 card-img" />
          </b-col>
          <b-col md="6">
            <b-card-header>
              <b-icon
                :id="`btn-close${movie.id}`"
                icon="x"
                variant="secondary"
                font-scale="1.4"
                @click="modalOpen = false"
                style="cursor: pointer; position: absolute; top: 4px; right: 4px" />
                <b-popover :target="`btn-close${movie.id}`" triggers="hover" placement="left">
                  Close
                </b-popover>
              <h3>{{ movie.title }} <small class="text-secondary">({{ movie.getFormattedDate('YYYY') }})</small></h3>
              <b-row>
                <b-col cols="3">
                  <b-icon icon="star-fill" variant="fav-star-checked" font-scale="1.4" class="mr-1" />
                  <small>{{ movie.vote_average }}</small>
                </b-col>
                <b-col cols="9">
                  <b-icon icon="calendar" variant="secondary" font-scale="1.2" class="mr-1" />
                  <small>{{ movie.getFormattedDate('LL') }}</small>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12">
                </b-col>
              </b-row>
            </b-card-header>
            <b-card-body>
              <b-card-text>
                <div v-if="movie.original_title">
                  <small><strong>Original title: </strong>{{ movie.original_title }}</small>
                  <hr />
                </div>
                <p v-if="movie.overview" class="text-justify">
                  <strong>Overview: </strong>{{ movie.overview }}
                </p>
              </b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </b-modal>
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
      modalOpen: false,
    };
  },
  computed: {
    imgWidth() {
      return this.modalOpen ? 500 : 185;
    },
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
      this.modalOpen = true;
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
    outline: none;
  }
  .biz-btn-fav svg {
    vertical-align: text-top;
  }
  .biz-movie-img {
    cursor: pointer;
  }
</style>
