"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _icon = _interopRequireDefault(require("@/components/icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const prefix = 'nop';

let Modal = _vue.default.extend({
  name: 'nop-modal',
  components: {
    Icon: _icon.default
  },
  props: {
    prefixCls: {
      type: String,
      default: `${prefix}-modal`
    },
    title: {
      type: String,
      default: ''
    },
    confirmTxt: {
      type: String,
      default: '确定'
    },
    cancelTxt: {
      type: String,
      default: '取消'
    },
    closable: {
      type: Boolean,
      default: true
    },
    value: {
      type: Boolean,
      default: false
    },
    cancelButtonColor: {
      type: String,
      default: ''
    },
    cancelTextColor: {
      type: String,
      default: ''
    },
    confirmButtonColor: {
      type: String,
      default: ''
    },
    confirmTextColor: {
      type: String,
      default: ''
    },
    confirmHidden: {
      type: Boolean,
      default: false
    },
    confirmLock: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      visible: this.value
    };
  },

  watch: {
    value(val) {
      this.visible = val;
    }

  },
  computed: {
    cencelButtonStyle() {
      let _style = {
        'background-color': this.cancelButtonColor,
        color: this.cancelTextColor
      };

      if (this.cancelButtonColor.toLowerCase() == '#fff' || this.cancelButtonColor.toLowerCase() == '#ffffff') {
        _style.border = 'solid 1px #aaa';
      }

      return _style;
    },

    confirmButtonStyle() {
      let _style = {
        'background-color': this.confirmButtonColor,
        color: this.confirmTextColor
      };
      return _style;
    }

  },

  mounted() {},

  methods: {
    show() {
      this.visible = true;
      this.$emit('input', true);
    },

    close() {
      this.visible = false;
      this.$emit('input', false);
    },

    onClose() {
      this.visible = false;
      this.$emit('input', false);
      this.$emit('on-cancel');
      this.$emit('cancel');
    },

    onConfirm() {
      if (this.confirmHidden) {
        this.visible = false;
        this.$emit('input', false);
      }

      this.$emit('on-confirm');
      this.$emit('confirm');
    },

    onCancel() {
      this.onClose();
    }

  }
});

var _default = Modal;
exports.default = Object.assign(_default, {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('transition', {
      attrs: {
        "name": "fadeIn"
      }
    }, [_vm.visible ? _c('div', {
      class: "" + _vm.prefixCls
    }, [_c('div', {
      class: _vm.prefixCls + "-wrap"
    }, [_c('div', {
      class: _vm.prefixCls + "-win"
    }, [_vm.closable ? _c('i', {
      class: _vm.prefixCls + "-close",
      on: {
        "click": function ($event) {
          _vm.onClose();
        }
      }
    }, [_c('Icon', {
      attrs: {
        "type": "close"
      }
    })], 1) : _vm._e(), _vm._v(" "), _vm.title !== '' ? _c('div', {
      class: _vm.prefixCls + "-head"
    }, [_vm._v("\n                    " + _vm._s(_vm.title) + "\n                ")]) : _vm._e(), _vm._v(" "), _c('div', {
      class: _vm.prefixCls + "-body"
    }, [_vm._t("default")], 2), _vm._v(" "), _c('div', {
      class: _vm.prefixCls + "-foot"
    }, [_vm._t("button", [_vm.confirmTxt !== '' ? _c('button', {
      class: _vm.prefixCls + "-btn",
      style: _vm.confirmButtonStyle,
      attrs: {
        "disabled": _vm.confirmLock,
        "type": "button"
      },
      on: {
        "click": function ($event) {
          $event.preventDefault();
          return _vm.onConfirm($event);
        }
      }
    }, [_vm._v(_vm._s(_vm.confirmTxt))]) : _vm._e(), _vm._v(" "), _vm.cancelTxt !== '' ? _c('button', {
      class: _vm.prefixCls + "-btn close",
      style: _vm.cencelButtonStyle,
      attrs: {
        "type": "button"
      },
      on: {
        "click": function ($event) {
          $event.preventDefault();
          return _vm.onCancel($event);
        }
      }
    }, [_vm._v(_vm._s(_vm.cancelTxt))]) : _vm._e()])], 2)])])]) : _vm._e()]);
  }
});;