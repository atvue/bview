"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const TYPE_PRIMARY = 'primary';
const TYPE_DEFAULT = 'default';
var _default = {
  name: 'nop-linkbutton',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: TYPE_PRIMARY
    }
  },
  computed: {
    calClass() {
      let {
        type,
        disabled
      } = this;
      return ['nop-link-btn', {
        disabled: disabled
      }, `link-btn_${type}`];
    }

  },
  methods: {
    click() {
      if (!this.disabled) {
        this.$emit('click');
      }
    }

  }
};
exports.default = Object.assign(_default, {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('a', {
      class: _vm.calClass,
      attrs: {
        "href": "javascript:void(0);"
      },
      on: {
        "click": _vm.click
      }
    }, [_vm._t("default")], 2);
  }
});;