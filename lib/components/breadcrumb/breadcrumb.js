"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const defaultSeparator = '/';
const prefix = 'nop';
var _default = {
  name: 'nop-breadcrumb',
  props: {
    prefixCls: {
      type: String,
      default: prefix
    },
    separator: {
      type: String,
      default: defaultSeparator
    }
  },

  mounted() {
    this.setChildSeparator();
  },

  methods: {
    setChildSeparator() {
      this.$children.forEach(child => {
        child.separator = this.separator;
      });
    }

  },
  watch: {
    separator() {
      this.setChildSeparator();
    }

  }
};
exports.default = Object.assign(_default, {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      class: _vm.prefixCls + "-breadcrumb"
    }, [_vm._t("default")], 2);
  }
});;