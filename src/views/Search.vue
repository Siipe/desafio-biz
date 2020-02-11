<template>
  <biz-container :title="title">
    <b-row>
      <b-col cols="12">
        <biz-filter @biz-filter-result="filter" ref="filter">
          <biz-text-filter
            name="query"
            label="Simple query"
            isDefault
            hideOperator
          />
        </biz-filter>
      </b-col>
    </b-row>
    <b-row v-if="!movies.length && searched">
      <b-col cols="12">
        <p class="text-secondary">
          <b-icon icon="alert-triangle-fill" font-scale="1.3" /> No results found.
        </p>
      </b-col>
    </b-row>
    <div v-if="movies.length">
      <b-row>
        <b-col cols="12">
          <b-pagination
            v-model="pagination.currentPage"
            :total-rows="pagination.total"
            size="sm"
            align="center"
            :per-page="20"
            first-number
            prev-text="<"
            next-text=">"
            last-number
          ></b-pagination>
        </b-col>
      </b-row>
      <b-row>
        <biz-movie
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
          @bizmovieRemoveFavorite="removeFromFavorite"
          @bizmovieAddFavorite="addToFavorite" />
      </b-row>
    </div>
  </biz-container>
</template>
<script>
import moviesMixin from '../movie/movies-mixin';
import service from '../movie/service';

export default {
  mixins: [moviesMixin],
  data() {
    return {
      searched: false,
      pagination: {
        currentPage: 1,
        total: 0,
      },
    };
  },
  watch: {
    'pagination.currentPage': function(val) {
      this.search(val);
    }
  },
  computed: {
    title() {
      if (!this.searched) {
        return 'Search movies';
      }
      return `Showing ${this.movies.length} out of ${this.pagination.total} ${
        this.pagination.total === 1 ? 'movie' : 'movies'
      }`;
    },
  },
  methods: {
    filter(urlSearchParams) {
      this.search(1, urlSearchParams);
    },
    async search(page = 1, urlSearchParams) {
      const params = urlSearchParams || this.$refs.filter.getQueryString();
      if (!params.has('query')) {
        return;
      }
      params.set('page', page);
      try {
        const response = await service.search(params);
        this.searched = true;
        this.movies = response.results;
        this.pagination.total = response.total_results;
      } catch (error) {
        console.log('FAILED: ', error.message);
      }
    },
  },
}
</script>
