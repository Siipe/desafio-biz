<template>
  <biz-container :title="title">
    <b-row>
      <b-col cols="12">
        <biz-filter @biz-filter-result="filter" ref="filter">
          <biz-text-filter
            name="query"
            label="Title"
            isRequired
            hideOperator
          />
          <biz-combo-filter
            name="language"
            label="Language"
            hideOperator
            :options="languages"
            defaultValue="pt"
          />
          <biz-number-filter
            name="year"
            label="Year"
            hideOperator
            integerOnly
          />
          <biz-number-filter
            name="primary_release_year"
            label="Primary release year"
            hideOperator
            integerOnly
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
      <biz-movie-set
        :movies="movies"
        checkPagination
        :currentPage="pagination.currentPage"
        :totalResults="pagination.total"
        @bizmovieRemoveFavorite="removeFromFavorite"
        @bizmovieAddFavorite="addToFavorite"
        @bizMovieCarouselPageChange="handleCarouselPageChange"
        ref="movieSet" />
    </div>
  </biz-container>
</template>
<script>
import moviesMixin from '../movie/movies-mixin';
import service from '../movie/service';

const initialPage = 1;

export default {
  mixins: [moviesMixin],
  data() {
    return {
      searched: false,
      pagination: {
        currentPage: initialPage,
        total: 0,
      },
      languages: [],
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
        return 'Search for a movie';
      }
      return `Showing ${this.movies.length} out of ${this.pagination.total} ${
        this.pagination.total === 1 ? 'movie' : 'movies'
      }`;
    },
  },
  methods: {
    filter() {
      if (this.pagination.currentPage === initialPage) {
        this.search();
        return;
      }
      this.$set(this.pagination, 'currentPage', initialPage);
    },
    async search(page = initialPage) {
      const params = this.$refs.filter.getQueryString();
      if (!params) {
        return;
      }
      params.set('page', page);
      try {
        const response = await service.search(params);

        this.searched = true;
        this.$set(this, 'movies', response.results);
        this.$set(this.pagination, 'total', response.total_results);
        this.checkFavorites();
      } catch (error) {
        this.$notifyError(error);
      }
    },
    async handleCarouselPageChange(page) {
      this.$set(this.pagination, 'currentPage', page);
    },
  },
  async created() {
    try {
      const languages = await service.getLanguages();
      this.languages = languages.map((lang) => ({
        label: lang.name
          ? `${lang.name} (${lang.english_name})`
          : lang.english_name,
        value: lang.iso_639_1,
      }));
    } catch (error) {
      this.$notifyError(error);
    }
  },
}
</script>
