<template>
  <biz-container :title="title">
    <b-row v-if="!movies.length">
      <b-col cols="12">
        <p class="text-secondary">
          <b-icon icon="alert-triangle-fill" font-scale="1.3" /> No results found.
        </p>
      </b-col>
    </b-row>
    <div v-else>
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
import moviesMixin from '../movies-mixin';
import service from '../service';

export default {
  mixins: [moviesMixin],
  data() {
    return {
      title: 'Movie search',
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
  methods: {
    async search(page = 1) {
      const params = new URLSearchParams({ query: 'sdfbsdfbsdyfvbsdyifvsadyfbsdyufbs', page });
      const response = await service.search(params);
      this.movies = response.results;
      console.log('response', response);
      this.pagination.total = response.total_results;
    },
  },
  created() {
    this.search();
  }
}
</script>
