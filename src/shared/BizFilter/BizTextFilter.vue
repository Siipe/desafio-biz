<template>
  <div v-if="visible" class="mb-2">
    <h6 class="biz-filter-titulo">
      {{ label }}
      <button
        v-if="!isDefault"
        type="button"
        title="Remove filter"
        class="biz-filter-remove text-danger"
        @click.prevent="remove(true)"
      >
        <b-icon icon="trash" font-scale="1.3" />
      </button>
    </h6>
    <b-row>
      <b-col cols="12" md="12">
        <b-form-select
          v-if="!hideOperator"
          v-model="operator"
          size="sm"
          class="biz-filter-operator">
          <b-form-select-option
            v-for="op in operators"
            :key="op.value"
            :value="op.value">{{ op.label }}</b-form-select-option>
        </b-form-select>
        <b-form-input
          v-model="value"
          size="sm"
          :placeholder="`Filter by ${label}`"
          class="biz-filter-value"
          @keyup.enter.native="dispatch('f.filter.enter')" />
      </b-col>
    </b-row>
  </div>
</template>
<script>
import operators from './biz-filter-operators';
import filterMixin from './biz-filter-item.mixin';

export default {
  name: 'BizTextFilter',
  mixins: [filterMixin],
  computed: {
    operators() {
      return [
        operators.EQUAL_TO,
        operators.NOT_EQUAL_TO,
        operators.LIKE,
        operators.NOT_LIKE,
      ];
    },
  },
};
</script>
