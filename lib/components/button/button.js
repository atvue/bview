"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _icon = _interopRequireDefault(require("@/components/icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TypePrimary = 'primary';
const TypeDefault = 'default';
const SizeNormal = '';
const SizeBig = 'big';
const SizeSmall = 'small';
const TypeBlack = 'black';
var _default = {
  components: {
    Icon: _icon.default
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String
    },
    iconsize: {
      type: Number,
      default: 12
    },
    iconcolor: {
      type: String,
      default: '#ffffff'
    },
    showSlot: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: SizeNormal
    },
    type: {
      type: String,
      default: TypePrimary
    }
  },

  data() {
    return {};
  },

  computed: {
    boxlassName() {
      let {
        type,
        size
      } = this;
      return ['nop-button', {
        'nop-button-default': type === TypeDefault
      }, `nop-button-size${size}`, {
        'nop-button-black': type === TypeBlack
      }];
    }

  },
  methods: {
    onClick(event) {
      this.$emit('click');
    }

  }
};
exports.default = Object.assign(_default, {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('button', {
      class: _vm.boxlassName,
      attrs: {
        "disabled": _vm.disabled
      },
      on: {
        "click": function ($event) {
          $event.preventDefault();
          return _vm.onClick($event);
        }
      }
    }, [_vm.loading ? _c('i') : _vm._e(), _vm._v(" "), _vm.icon && !_vm.loading ? _c('Icon', {
      attrs: {
        "type": _vm.icon,
        "size": _vm.iconsize,
        "color": _vm.iconcolor
      }
    }) : _vm._e(), _vm._v(" "), _vm.showSlot ? _c('span', [_vm._t("default")], 2) : _vm._e()], 1);
  }
});;