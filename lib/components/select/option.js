"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _emitter = _interopRequireDefault(require("@/mixins/emitter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  name: 'nop-select-option',
  mixins: [_emitter.default],
  props: {
    value: {
      type: [String, Number],
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String
    }
  },

  data() {
    return {
      selected: false,
      isFocus: false,
      hidden: false,
      index: undefined
    };
  },

  computed: {
    showLabel() {
      return this.label ? this.label : this.value;
    },

    title() {
      let title;

      if (this.label !== undefined) {
        title = this.label;
      } else if (this.$slots.default) {
        title = this.getChildrenTextContent(this.$slots.default);
      } else if (this.value !== undefined || this.value !== null || this.value !== '') {
        title = this.value;
      }

      return title;
    },

    classes() {
      return {
        selected: this.selected,
        focus: this.isFocus,
        disabled: this.disabled
      };
    }

  },

  beforeDestroy() {
    // 通知父层删除
    this.dispatch('nop-select', 'select-del', this);
  },

  methods: {
    select() {
      if (this.disabled) {
        return false;
      }

      this.dispatch('nop-select', 'selected', this.value);
    },

    onSelectClose() {
      this.isFocus = false;
      this.hidden = false;
    },

    getChildrenTextContent(children) {
      return children.map(function (node) {
        return node.children ? getChildrenTextContent(node.children) : node.text;
      }).join('');
    },

    onSelectFilter(val) {
      let last = this.hidden;
      this.hidden = this.title.indexOf(val) === -1;
    },

    onSelecVisible() {
      !this.hidden && this.select();
    },

    changeSelect(val) {
      // debugger;
      if (val instanceof Array) {
        // debugger;
        this.selected = val.indexOf(this.value) !== -1;
      } else {
        this.selected = this.value === val;
      }
    }

  },

  mounted() {
    this.$on('select-close', this.onSelectClose);
    this.$on('select-filter', this.onSelectFilter);
    this.$on('select-visible', this.onSelecVisible);
    this.$on('select', this.changeSelect);
    this.dispatch('nop-select', 'select-add', this);
  },

  created() {}

};
exports.default = Object.assign(_default, {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('li', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: !_vm.hidden,
        expression: "!hidden"
      }],
      staticClass: "nop-select-option",
      class: _vm.classes,
      attrs: {
        "title": _vm.title
      },
      on: {
        "click": function ($event) {
          $event.stopPropagation();
          return _vm.select($event);
        }
      }
    }, [_vm._t("default", [_vm._v(_vm._s(_vm.showLabel))])], 2);
  }
});;