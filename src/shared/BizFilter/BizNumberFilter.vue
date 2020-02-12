<template>
  <div v-if="visible" class="mb-3">
    <h6 class="biz-filter-title">
      <span v-if="isRequired" class="text-danger">*</span>
      {{ label }}
      <button
        v-if="!isRequired"
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
          type="number"
          trim
          :min="min"
          :max="max"
          :state="state"
          size="sm"
          :placeholder="`Filter by ${label}`"
          :class="hideOperator ? 'biz-filter-value-full' : 'biz-filter-value'"
          @change="handleValue()"
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
  props: {
    min: {
      type: Number,
      required: false,
    },
    max: {
      type: Number,
      required: false,
    },
    integerOnly: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    operators() {
      return [
        operators.EQUAL_TO,
        operators.NOT_EQUAL_TO,
        operators.GREATER_EQUAL_TO,
        operators.LESS_EQUAL_TO,
      ];
    },
  },
  methods: {
    handleValue() {
      if (!this.integerOnly || this.$_.isInteger(this.value)) {
        return;
      }
      this.$set(this, 'value', this.$_.toInteger(this.value));
    },
  },
};
</script>
