"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const prefixCls = 'nopIcon';
var _default = {
  name: 'nop-icon',
  props: {
    type: String,
    size: [Number, String],
    color: String,
    title: String
  },
  computed: {
    classes() {
      return `${prefixCls} nicon-${this.type}`;
    },

    styles() {
      let style = {};

      if (this.size) {
        style['font-size'] = `${this.size}px`;
      }

      if (this.color) {
        style.color = this.color;
      }

      return style;
    }

  },
  methods: {
    onClick(e) {
      this.$emit('click', e);
    }

  }
};
exports.default = Object.assign(_default, {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('i', {
      class: _vm.classes,
      style: _vm.styles,
      attrs: {
        "title": _vm.title
      },
      on: {
        "click": _vm.onClick
      }
    });
  }
});;