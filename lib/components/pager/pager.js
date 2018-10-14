"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _icon = _interopRequireDefault(require("@/components/icon"));

var _select = _interopRequireWildcard(require("@/components/select"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const prefix = 'nop';
var _default = {
  name: 'nop-page',
  components: {
    Icon: _icon.default,
    Select: _select.default,
    Option: _select.Option
  },
  props: {
    prefixCls: {
      type: String,
      default: prefix
    },
    current: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizeOpts: {
      type: Array,

      default() {
        return [15, 30, 50, 100];
      }

    },
    showTotal: {
      type: Boolean,
      default: true
    },
    showElevator: {
      type: Boolean,
      default: true
    },
    showSizer: {
      type: Boolean,
      default: true
    },
    styles: {
      type: Object
    }
  },

  data() {
    return {
      currentPage: this.current,
      currentPageSize: this.pageSize
    };
  },

  watch: {
    total(val) {
      let maxPage = Math.ceil(val / this.currentPageSize);

      if (maxPage < this.currentPage && maxPage > 0) {
        this.currentPage = maxPage;
      }
    },

    current(val) {
      // @NOTE 超过最大页数 则忽略设置
      if (val <= this.allPages) {
        this.currentPage = val;
      }
    },

    pageSize(val) {
      this.currentPageSize = val;
    }

  },
  computed: {
    // 样式相关
    // 最左侧上一页按钮
    prevClass() {
      return ['nop-pager-item', 'nop-pager-pre', {
        ['nop-pager-item-disabled']: this.currentPage === 1
      }];
    },

    // 最右侧下一页按钮
    nextClass() {
      return ['nop-pager-item', 'nop-pager-next', {
        ['nop-pager-item-disabled']: this.currentPage === this.allPages
      }];
    },

    // 首页
    firstPageClass() {
      return ['nop-pager-item', 'nop-pager-first', {
        ['nop-pager-item-active']: this.currentPage === 1
      }];
    },

    // 末页
    lastPageClass() {
      return ['nop-pager-item', 'nop-pager-last', {
        ['nop-pager-item-active']: this.currentPage === this.allPages
      }];
    },

    // END样式相关
    allPages() {
      const allPage = Math.ceil(this.total / this.currentPageSize);
      return allPage === 0 ? 1 : allPage;
    }

  },
  methods: {
    // 外部设置页码 用于重置
    // @NOTE 这个方法不会通知外层 页码变更
    setPage(page) {
      this.currentPage = page;
    },

    changePage(page, from = '') {
      if (this.currentPage != page) {
        this.currentPage = page; // @NOTE 父组件使用.sync 修饰符 可同步子组件prop状态 显式

        this.$emit('update:current', page);
        this.$emit('on-change', page);
      }
    },

    prev() {
      const current = this.currentPage;

      if (current <= 1) {
        return false;
      }

      this.changePage(current - 1);
    },

    next() {
      const current = this.currentPage;

      if (current >= this.allPages) {
        return false;
      }

      this.changePage(current + 1);
    },

    fastPrev() {
      const page = this.currentPage - 5;

      if (page > 0) {
        this.changePage(page);
      } else {
        this.changePage(1, 'size');
      }
    },

    fastNext() {
      const page = this.currentPage + 5;

      if (page > this.allPages) {
        this.changePage(this.allPages);
      } else {
        this.changePage(page);
      }
    },

    onSize(pageSize) {
      this.currentPageSize = pageSize;
      this.$emit('on-page-size-change', pageSize); // this.$nextTick(() => {

      this.changePage(1); // });
    },

    onPage(page) {
      this.changePage(page);
    },

    onInputChange(event) {
      let val = event.target.value.trim();
      let page = 0;

      if (/^[1-9][0-9]*$/.test(val + '')) {
        val = Number(val);

        if (val != this.currentPage) {
          const allPages = this.allPages;

          if (val > allPages) {
            page = allPages;
          } else {
            page = val;
          }
        }
      } else {
        page = 1;
      }

      if (page) {
        this.onPage(page);
        event.target.value = page;
      }
    },

    keyDown(e) {
      const key = e.keyCode;
      const condition = key >= 48 && key <= 57 || key >= 96 && key <= 105 || key === 8 || key === 37 || key === 39;

      if (!condition) {
        e.preventDefault();
      }
    },

    keyUp(e) {
      const key = e.keyCode;
      const val = parseInt(e.target.value);

      if (key === 38) {
        this.prev();
      } else if (key === 40) {
        this.next();
      } else if (key === 13) {
        let page = 1;

        if (val > this.allPages) {
          page = this.allPages;
        } else if (val <= 0 || !val) {
          page = 1;
        } else {
          page = val;
        }

        e.target.value = page;
        this.changePage(page);
      }
    }

  }
};
exports.default = Object.assign(_default, {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('ul', {
      staticClass: "nop-pager",
      style: _vm.styles
    }, [_vm.showTotal ? _c('span', {
      staticClass: "nop-pager-detail"
    }, [_vm._v("\n        共" + _vm._s(_vm.allPages) + "页，" + _vm._s(_vm.total) + "条数据\n    ")]) : _vm._e(), _vm._v(" "), _c('li', {
      class: _vm.prevClass,
      on: {
        "click": _vm.prev
      }
    }, [_c('a', [_c('Icon', {
      attrs: {
        "type": "xiangzuo1",
        "size": "12"
      }
    })], 1)]), _vm._v(" "), _c('li', {
      class: _vm.firstPageClass,
      attrs: {
        "title": 1
      },
      on: {
        "click": function ($event) {
          _vm.changePage(1);
        }
      }
    }, [_c('a', [_vm._v("1")])]), _vm._v(" "), _vm.currentPage - 3 > 1 ? _c('li', {
      staticClass: "nop-pager-item nop-pager-fastprev",
      on: {
        "click": _vm.fastPrev
      }
    }, [_c('a', [_c('Icon', {
      attrs: {
        "type": "more",
        "size": "12"
      }
    })], 1)]) : _vm._e(), _vm._v(" "), _vm.currentPage - 2 > 1 ? _c('li', {
      staticClass: "nop-pager-item",
      attrs: {
        "title": _vm.currentPage - 2
      },
      on: {
        "click": function ($event) {
          _vm.changePage(_vm.currentPage - 2);
        }
      }
    }, [_c('a', [_vm._v(_vm._s(_vm.currentPage - 2))])]) : _vm._e(), _vm._v(" "), _vm.currentPage - 1 > 1 ? _c('li', {
      staticClass: "nop-pager-item",
      attrs: {
        "title": _vm.currentPage - 1
      },
      on: {
        "click": function ($event) {
          _vm.changePage(_vm.currentPage - 1);
        }
      }
    }, [_c('a', [_vm._v(_vm._s(_vm.currentPage - 1))])]) : _vm._e(), _vm._v(" "), _vm.currentPage != 1 && _vm.currentPage != _vm.allPages ? _c('li', {
      staticClass: "nop-pager-item nop-pager-item-active",
      attrs: {
        "title": _vm.currentPage
      }
    }, [_c('a', [_vm._v(_vm._s(_vm.currentPage))])]) : _vm._e(), _vm._v(" "), _vm.currentPage + 1 < _vm.allPages ? _c('li', {
      staticClass: "nop-pager-item",
      attrs: {
        "title": _vm.currentPage + 1
      },
      on: {
        "click": function ($event) {
          _vm.changePage(_vm.currentPage + 1);
        }
      }
    }, [_c('a', [_vm._v(_vm._s(_vm.currentPage + 1))])]) : _vm._e(), _vm._v(" "), _vm.currentPage + 2 < _vm.allPages ? _c('li', {
      staticClass: "nop-pager-item",
      attrs: {
        "title": _vm.currentPage + 2
      },
      on: {
        "click": function ($event) {
          _vm.changePage(_vm.currentPage + 2);
        }
      }
    }, [_c('a', [_vm._v(_vm._s(_vm.currentPage + 2))])]) : _vm._e(), _vm._v(" "), _vm.currentPage + 3 < _vm.allPages ? _c('li', {
      staticClass: "nop-pager-item nop-pager-fastnext",
      on: {
        "click": _vm.fastNext
      }
    }, [_c('a', [_c('Icon', {
      attrs: {
        "type": "more",
        "size": "12"
      }
    })], 1)]) : _vm._e(), _vm._v(" "), _vm.allPages > 1 ? _c('li', {
      class: _vm.lastPageClass,
      attrs: {
        "title": _vm.allPages
      },
      on: {
        "click": function ($event) {
          _vm.changePage(_vm.allPages);
        }
      }
    }, [_c('a', [_vm._v(_vm._s(_vm.allPages))])]) : _vm._e(), _vm._v(" "), _c('li', {
      class: _vm.nextClass,
      on: {
        "click": _vm.next
      }
    }, [_c('a', [_c('Icon', {
      attrs: {
        "type": "xiangyou1",
        "size": "12"
      }
    })], 1)]), _vm._v(" "), _c('Select', {
      staticClass: "nop-pager-select",
      on: {
        "input": _vm.onSize
      },
      model: {
        value: _vm.currentPageSize,
        callback: function ($$v) {
          _vm.currentPageSize = $$v;
        },
        expression: "currentPageSize"
      }
    }, _vm._l(_vm.pageSizeOpts, function (size) {
      return _c('Option', {
        key: size,
        attrs: {
          "value": size
        }
      }, [_vm._v(_vm._s(size) + "条/页")]);
    })), _vm._v(" "), _c('span', {
      staticClass: "nop-pager-elevator"
    }, [_vm._v("\n        跳转至\n        "), _c('input', {
      staticClass: "nop-pager-input",
      attrs: {
        "type": "text",
        "autocomplete": "off",
        "spellcheck": "false"
      },
      on: {
        "keyup": function ($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
            return null;
          }

          return _vm.onInputChange($event);
        }
      }
    }), _vm._v(" 页\n    ")])], 1);
  }
});;