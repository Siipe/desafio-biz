export default {
  methods: {
    $notifySuccess(message, title = 'Success', autoHideDelay = 2000) {
      this.$notify(message, title, autoHideDelay, 'text-success');
    },
    $notifyError(error, title = 'Error', autoHideDelay = 5000) {
      const message = error instanceof Error ? error.message : error;
      this.$notify(message, title, autoHideDelay, 'text-danger');
    },
    $notifyWarning(message, title = 'Warning', autoHideDelay = 3000) {
      this.$notify(message, title, autoHideDelay, 'text-warning');
    },
    $notify(message = 'Message', title = 'Title', autoHideDelay = 2000, contextClass = '') {
      const h = this.$createElement;
      const nodeMessage = h(
        'p',
        { class: ['mb-0'] },
        [message],
      );
      const nodeTitle = h(
        'div',
        { class: [contextClass, 'd-flex', 'flex-grow-1', 'align-items-baseline', 'mr-2'] },
        [h('strong', { class: 'mr-2' }, title)],
      );
      this.$root.$bvToast.toast([nodeMessage], {
        title: [nodeTitle],
        solid: true,
        autoHideDelay,
        append: false,
      });
    },
  },
};
