<template>
  <b-modal
    v-model="modalOpen"
    size="lg"
    centered
    button-size="sm"
    hide-header
    hide-footer
    body-class="biz-modal-body">
    <b-card no-body class="overflow-hidden">
      <b-row no-gutters>
        <b-col md="6" class="order-md-2">
          <b-card-header class="pb-1 pt-2 pl-3 pr-3">
            <b-row>
              <b-col cols="12" class="pb-2 d-flex flex-grow-1 align-items-baseline">
                <small class="mr-4">
                  <b-link
                    v-if="hasPreviousPage" 
                    id="biz-carousel-previous-page"
                    class="text-decoration-none"
                    href="javascript:void(0)"
                    @click="handlePreviousPage">
                      &laquo; Page {{ currentPage - 1 }}
                    <b-popover target="biz-carousel-previous-page" triggers="hover" placement="bottom">
                      Go to the <strong>page {{ currentPage - 1 }}</strong>
                    </b-popover>
                  </b-link>
                  <b-link
                    v-else
                    id="biz-carousel-previous-movie"
                    class="biz-carousel-change-movie text-decoration-none"
                    href="javascript:void(0)"
                    :disabled="!hasPrevious"
                    @click="handlePreviousMovie">
                      &laquo; Previous
                    <b-popover v-if="hasPrevious" target="biz-carousel-previous-movie" triggers="hover" placement="bottom">
                      Previous: <strong>{{ previousMovie.title }}</strong>
                    </b-popover>
                  </b-link>
                </small>
                <small class="mr-4">
                  <b-link
                    v-if="hasNextPage" 
                    id="biz-carousel-next-page"
                    class="text-decoration-none"
                    href="javascript:void(0)"
                    @click="handleNextPage">
                      Page {{ currentPage + 1 }} &raquo;
                    <b-popover target="biz-carousel-next-page" triggers="hover" placement="bottom">
                      Go to the <strong>page {{ currentPage + 1 }}</strong>
                    </b-popover>
                  </b-link>
                  <b-link
                    v-else
                    id="biz-carousel-next-movie"
                    class="biz-carousel-change-movie text-decoration-none"
                    href="javascript:void(0)"
                    :disabled="!hasNext"
                    @click="handleNextMovie">
                    Next &raquo;
                    <b-popover v-if="hasNext" target="biz-carousel-next-movie" triggers="hover" placement="bottom">
                      Next: <strong>{{ nextMovie.title }}</strong>
                    </b-popover>
                  </b-link>
                </small>
                <small>
                  <button
                    :id="`watchlist-star`"
                    @click="handleFavorite"
                    class="biz-btn-fav">
                    <b-icon icon="star-fill" :variant="iconVariant" />
                  </button>
                  <b-popover :target="`watchlist-star`" triggers="hover" placement="top">
                    {{ currentMovie.favorite ? 'Remove from' : 'Add to' }} the <strong> watchlist</strong>
                  </b-popover>
                </small>
                <small class="ml-auto">
                  <b-link href="javascript:void(0)" @click="handleClose">
                    <b-icon
                      id="biz-carousel-close"
                      icon="x"
                      variant="secondary"
                      font-scale="1.4"
                      style="cursor: pointer;" />
                      <b-popover target="biz-carousel-close" triggers="hover" placement="bottom">
                        Close
                      </b-popover>
                  </b-link>
                </small>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12">
                <h3>{{ currentMovie.title }} <small class="text-secondary">({{ currentMovie.getFormattedDate('YYYY') }})</small></h3>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="3">
                <b-icon icon="star-fill" variant="fav-star-checked" font-scale="1.4" class="mr-1" />
                <small>{{ currentMovie.vote_average }}</small>
              </b-col>
              <b-col cols="9">
                <b-icon icon="calendar" variant="secondary" font-scale="1.2" class="mr-1" />
                <small>{{ currentMovie.getFormattedDate('LL') }}</small>
              </b-col>
            </b-row>
          </b-card-header>
          <b-card-body class="pb-1 pt-2 pl-3 pr-3">
            <b-card-text>
              <div v-if="currentMovie.original_title">
                <small>
                  <strong>Original title: </strong>
                  <span class="font-italic">{{ currentMovie.original_title }}</span>
                </small>
                <hr />
              </div>
              <p v-if="currentMovie.overview" class="text-justify">
                <small>
                  <strong>Overview: </strong>{{ currentMovie.overview }}
                </small>
              </p>
            </b-card-text>
          </b-card-body>
        </b-col>
        <b-col md="6" class="order-md-1">
          <b-card-img
            v-if="currentMovie.hasPoster"
            :src="src"
            fluid-grow
            class="rounded-0" />
          <b-img
            v-else
            :alt="currentMovie.title"
            blank
            blank-color="#CCC"
            fluid-grow
            :width="imgWidth"
            :height="1.5 * imgWidth"
            class="rounded-0 card-img" />
        </b-col>
      </b-row>
    </b-card>
  </b-modal>
</template>
<script>
import Movie from '../movie/movie';

export default {
  props: {
    movies: {
      type: Array,
      required: true,
      default: () => [],
      validator: (movies) => movies.every((movie) => movie instanceof Movie),
    },
    currentMovie: {
      type: Movie,
      required: true,
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
      imgWidth: 500,
      modalOpen: true,
    };
  },
  watch: {
    modalOpen(val) {
      if (val) {
        return;
      }
      this.$emit('bizMovieCarouselClose');
    },
  },
  computed: {
    src() {
      return `https://image.tmdb.org/t/p/${this.currentMovie.getImagePathWithSize(`w${this.imgWidth}`)}`
    },
    iconVariant() {
      return this.currentMovie.favorite
          ? 'fav-star-checked'
          : 'fav-star-unchecked';
    },
    currentIndex() {
      return this.movies.indexOf(this.currentMovie);
    },
    previousMovie() {
      return this.movies[this.currentIndex - 1];
    },
    nextMovie() {
      return this.movies[this.currentIndex + 1];
    },
    hasPrevious() {
      return !this.$_.isEmpty(this.previousMovie);
    },
    hasNext() {
      return !this.$_.isEmpty(this.nextMovie);
    },
    totalPages() {
      if (!this.checkPagination) {
        return 0;
      }
      return Math.ceil(this.totalResults / 20);
    },
    hasPreviousPage() {
      if (!this.checkPagination || this.hasPrevious) {
        return false;
      }
      return this.currentPage > 1;
    },
    hasNextPage() {
      if (!this.checkPagination || this.hasNext) {
        return false;
      }
      return this.currentPage < this.totalPages;
    },
  },
  methods: {
    handleClose() {
      this.modalOpen = false;
    },
    handleFavorite() {
      const event = this.currentMovie.favorite ? 'bizmovieRemoveFavorite' : 'bizmovieAddFavorite';
      this.$emit(event, this.currentMovie);
    },
    handlePreviousMovie() {
      this.$emit('bizMovieCarouselMovieChange', this.previousMovie);
    },
    handleNextMovie() {
      this.$emit('bizMovieCarouselMovieChange', this.nextMovie);
    },
    handlePreviousPage() {
      this.$emit('bizMovieCarouselPageChange', this.currentPage - 1, 'last');
    },
    handleNextPage() {
      this.$emit('bizMovieCarouselPageChange', this.currentPage + 1, 'first');
    },
  },
}
</script>
<style scoped>
.biz-btn-fav {
  padding: 0;
  border-radius: 15px;
  border: 1px solid #AAA;
  height: 25px;
  width: 25px;
}
.biz-btn-fav svg {
  vertical-align: text-top;
}
.biz-movie-img {
  cursor: pointer;
}
.biz-carousel-change-movie.disabled {
  color: #999;
  cursor: not-allowed;
}
</style>
