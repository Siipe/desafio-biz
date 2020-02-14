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
    <hr class="mt-2 mb-4">
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
        return 'Search movies';
      }
      return `Showing ${this.movies.length} out of ${this.pagination.total} ${
        this.pagination.total === 1 ? 'movie' : 'movies'
      }`;
    },
  },
  methods: {
    filter(urlSearchParams) {
      this.search(initialPage, urlSearchParams);
    },
    async search(page = initialPage, urlSearchParams) {
      const params = urlSearchParams || this.$refs.filter.getQueryString();
      if (!params) {
        return;
      }
      params.set('page', page);
      try {
        const response = await service.search(params);

        this.searched = true;
        this.movies = response.results;
        this.pagination.currentPage = page;
        this.pagination.total = response.total_results;
      } catch (error) {
        console.log('FAILED: ', error.message);
      }
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
      console.log('FAILED: ', error.message);
    }
  },
}
</script>
