import filterOperators from './biz-filter-operators';

export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    isRequired: {
      type: Boolean,
      required: false,
      default: false,
    },
    defaultValue: {
      type: [String, Number, Array, Boolean],
      required: false,
      default: () => '',
    },
    defaultOperator: {
      type: String,
      required: false,
      validator: value => Object.values(filterOperators).some(operator => operator.value === value),
      default: filterOperators.EQUAL_TO.value,
    },
    hideOperator: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      visible: false,
      value: '',
      operator: '',
      state: null,
    };
  },
  watch: {
    defaultValue(val) {
      if (this.$_.isEmpty(this.value)) {
        this.value = val;
      }
    },
  },
  computed: {
    defaultValidOperator() {
      const { operators } = this;
      if (!this.$_.isArray(operators) || this.$_.isEmpty(operators)) {
        return null;
      }
      const operadorProp = operators.find(operator => operator.value === this.defaultOperator);
      return operadorProp ? operadorProp.value : operators[0].value;
    },
  },
  methods: {
    isValid() {
      if (this.isRequired && ['', null, undefined].includes(this.value)) {
        this.state = false;
        return false;
      }
      this.state = null;
      return true;
    },
    getResult() {
      const key = [
        filterOperators.EQUAL_TO.value,
        filterOperators.EQUAL_TO_MULTIPLE.value,
      ].includes(this.operator) || !this.operator
        ? this.name
        : `${this.name}[${this.operator}]`;

      if (this.$_.isArray(this.value)) {
        return this.value.map(value => ({
          key,
          value,
        }));
      }
      return [{
        key,
        value: this.value,
      }];
    },
    add() {
      this.visible = true;
    },
    remove(removeDefault = false) {
      this.reset();
      if (removeDefault) {
        this.visible = false;
      }
    },
    reset() {
      this.visible = this.isRequired;
      this.operator = this.defaultValidOperator;
      this.value = this.defaultValue;
    },
    dispatch(eventName) {
      let parent = this.$parent || this.$root;
      let name = parent.$options.componentName;

      while (parent && name !== 'BizFilter') {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        parent.$emit(eventName, this);
      }
    },
  },
  created() {
    this.reset();
  },
  mounted() {
    this.dispatch('biz.filter.addFilter');
  },
  beforeDestroy() {
    this.dispatch('biz.filter.removeFilter');
  },
};
