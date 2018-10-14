"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const prefix = 'nop';
var _default = {
  name: 'nop-breadcrumb-item',
  props: {
    prefixCls: {
      type: String,
      default: prefix
    },
    to: {
      type: [String, Object]
    }
  },

  data() {
    return {
      separator: undefined
    };
  },

  computed: {
    showLink() {
      return this.to !== undefined && this.to !== null;
    }

  },
  methods: {
    handleClick() {
      if (this.$router) {
        this.$router.push(this.to);
      } else {
        window.location.href = this.to;
      }
    }

  }
};
exports.default = Object.assign(_default, {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('span', {
      class: _vm.prefixCls + "-breadcrumb-item"
    }, [_vm.showLink ? _c('a', {
      class: _vm.prefixCls + "-breadcrumb-item_link",
      on: {
        "click": _vm.handleClick
      }
    }, [_vm._t("default")], 2) : _c('span', {
      class: _vm.prefixCls + "-breadcrumb-item_label"
    }, [_vm._t("default")], 2), _vm._v(" "), _c('span', {
      class: _vm.prefixCls + "-breadcrumb-item_separator",
      domProps: {
        "innerHTML": _vm._s(_vm.separator)
      }
    })]);
  }
});;