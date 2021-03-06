<template>
  <div class="biz-filter-container mb-3">
    <b-card no-body class="biz-filter-card">
      <b-link
        href="javascript:void(0)"
        class="text-dark text-decoration-none"
        @click="collapseVisible = !collapseVisible">
        <b-card-header :header-class="headerClassNames">
          <small>
            <b-icon icon="search" font-scale="1.3" />
          </small>
          <span class="ml-2 mr-2">Search filters</span>
          <small class="ml-auto">
            <b-icon 
              id="biz-filter-collapse"
              :icon="collapseVisible ? 'arrows-collapse' : 'arrows-expand'"
              font-scale="1.3" />
            <b-popover target="biz-filter-collapse" triggers="hover" placement="bottom">
              Click to <strong>{{ collapseVisible ? 'collapse' : 'expand' }}</strong>
            </b-popover>
          </small>
        </b-card-header>
      </b-link>
      <b-collapse v-model="collapseVisible" class="mt-2">
        <b-card-body body-class="biz-filter-card-body">
          <b-row>
            <b-col cols="12" xl="8" lg="8" md="12" sm="12"
              :style="!hasSelectedFilters ? 'position: relative;' : ''">
              <slot></slot>
              <div :class="!hasSelectedFilters ? 'biz-filter-buttons' : ''">
                <b-button size="sm" variant="warning" @click="filter" class="text-white mb-3">Filter</b-button>
              </div>
            </b-col>
            <b-col
              cols="12"
              xl="4"
              lg="4"
              md="12"
              sm="12"
              class="biz-filter-add-filter">
              <div style="text-left">
                <h6>Add filter</h6>
              </div>
              <div>
                <b-form-select
                  v-model="selectedFilter"
                  size="sm"
                  @change="handleFilterPick()"
                  :disabled="!hasFilters"
                  class="mb-2 biz-filter-filters">
                  <template v-slot:first>
                    <b-form-select-option value="" disabled>-- Pick a filter --</b-form-select-option>
                  </template>
                  <b-form-select-option
                    v-for="filter in filters"
                    :key="filter.name"
                    :value="filter.name"
                    :disabled="filter.visible">{{ filter.visible
                      ? `${filter.label} (already added)`
                      : filter.label }}</b-form-select-option>
                </b-form-select>
              </div>
            </b-col>
          </b-row>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>
<script>
export default {
  name: 'BizFilter',
  componentName: 'BizFilter',
  data() {
    return {
      filters: [],
      selectedFilter: '',
      collapseVisible: true,
    };
  },
  computed: {
    hasFilters() {
      return !this.$_.isEmpty(this.filters);
    },
    hasSelectedFilters() {
      return this.filters.some(filter => filter.visible);
    },
    filledFilters() {
      return this.filters.filter((filter) => {
        if (!filter.visible) {
          return false;
        }
        if (this.$_.isArray(filter.value) && this.$_.isEmpty(filter.value)) {
          return false;
        }
        if (filter.value !== false && !filter.value) {
          return false;
        }
        return true;
      });
    },
    headerClassNames() {
      const classNames = [
        'd-flex',
        'flex-grow-1',
        'align-items-baseline',
        'biz-filter-card-header',
      ];
      if (!this.collapseVisible) {
        classNames.push('biz-no-border');
      }
      return classNames;
    },
  },
  methods: {
    handleFilterPick() {
      if (!this.selectedFilter) {
        return;
      }
      const selectedFilter = this.filters.find(filter => filter.name === this.selectedFilter);
      if (selectedFilter) {
        selectedFilter.add();
      }
      this.$set(this, 'selectedFilter', '');
    },
    getQueryString() {
      if(this.filters.some((filter) => !filter.isValid())) {
        return false;
      }
      const url = new URLSearchParams();
      this.filledFilters
        .map(filter => filter.getResult())
        .forEach((result) => {
          result.forEach((f) => {
            url.append(f.key, f.value);
          });
        });
      return url;
    },
    filter() {
      this.$emit('biz-filter-result', this.getQueryString());
    },
    expand() {
      this.collapseVisible = true;
    },
    collapse() {
      this.collapseVisible = false;
    },
  },
  created() {
    this.$on('biz.filter.addFilter', (filter) => {
      if (this.filters.some(f => f.name.toLowerCase() === filter.name.toLowerCase())) {
        console.warn(`Filter [${filter.name}] was added more than once`);
        return;
      }
      this.filters.push(filter);
    });
    this.$on('f.filter.enter', () => {
      this.filter();
    });
    this.$on('biz.filter.removeFilter', (filter) => {
      this.filters.splice(this.filters.indexOf(filter), 1);
    });
  },
};
</script>
<style lang="scss" scoped>
  .biz-filter-card {
    background: none;
    border-radius: 0;
  }
  .biz-filter-card-header {
    padding: 0.4rem;
    border-radius: 0;
    cursor: pointer;
  }
  .biz-filter-card-header.biz-no-border {
    border: none;
  }
  .biz-filter-card-body {
    padding: 1rem;
  }
  .biz-filter-add-filter {
    margin-top: -2px;
    text-align: left;
  }
  .biz-filter-add-filter {
    .biz-filter-filters {
      width: 100%;
    }
  }
  .biz-filter-add-filter {
    h6 {
      width: 100%;
      display: inline-block;
      text-align: left;
    }
  }
  .biz-filter-container {
    & /deep/ .biz-filter-remove {
      font-size: 0.9em;
      cursor: pointer;
      border: none;
      background: none;
    }
    & /deep/ .biz-filter-operator {
      box-sizing: border-box;
      width: 100%;
      display: inline-block;
      vertical-align: top;
      margin-right: 5px;
    }
    & /deep/ .biz-filter-value, .biz-filter-value-full {
      width: 100%;
      margin-top: 10px;
      display: inline-block;
      vertical-align: top;
    }
  }

  @media (min-width: 768px) {
    .biz-filter-add-filter .biz-filter-filters, .biz-filter-add-filter h6 {
      width: 50%;
    }
    .biz-filter-container {
      & /deep/ .biz-filter-operator {
        width: 30%;
        max-width: 190px;
        padding-right: 10px;
      }
      & /deep/ .biz-filter-value {
        width: 70%;
        margin-top: 0;
      }
      & /deep/ .biz-filter-value-full {
        width: 70%;
        margin-top: 0;
      }
    }
  }

  @media (min-width: 992px) {
    .biz-filter-add-filter .biz-filter-filters, .biz-filter-add-filter h6 {
      width: 250px;
    }
    .biz-filter-add-filter {
      text-align: right;
    }
    .biz-filter-buttons {
      position: absolute;
      bottom: 0px;
      padding-bottom: .5em;
    }
  }
</style>
