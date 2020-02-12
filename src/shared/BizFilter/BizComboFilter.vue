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
    <b-form-select
      v-model="value"
      :state="state"
      :multiple="multitple"
      size="sm"
      :class="hideOperator ? 'biz-filter-value-full' : 'biz-filter-value'">
      <b-form-select-option
        v-for="op in options"
        :key="op.value"
        :value="op.value">{{ op.label }}</b-form-select-option>
    </b-form-select>
  </div>
</template>
<script>
import operators from './biz-filter-operators';
import filterMixin from './biz-filter-item.mixin';

export default {
  name: 'BizComboFilter',
  mixins: [filterMixin],
  props: {
    options: {
      type: Array,
      required: true,
      validator: value => !value.length || value.every(val => val.label && val.value !== undefined),
    },
    multitple: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  watch: {
    value() {
      this.defineOperator();
    },
    operator() {
      this.defineOperator();
    },
  },
  computed: {
    operators() {
      return [
        operators.EQUAL_TO,
        operators.EQUAL_TO_MULTIPLE,
        operators.NOT_LIKE,
        operators.NOT_LIKE_MULTIPLE,
      ];
    },
  },
  methods: {
    defineOperator() {
      if (!this.value) {
        return;
      }
      if (this.value.length >= 2) {
        if (this.operator === operators.EQUAL_TO.value) {
          this.operator = operators.EQUAL_TO_MULTIPLE.value;
        } else if (this.operator === operators.NOT_LIKE.value) {
          this.operator = operators.NOT_LIKE_MULTIPLE.value;
        }
      } else if (this.operator === operators.EQUAL_TO_MULTIPLE.value) {
        this.operator = operators.EQUAL_TO.value;
      } else if (this.operator === operators.NOT_LIKE_MULTIPLE.value) {
        this.operator = operators.NOT_LIKE.value;
      }
    }
  },
};
</script>
