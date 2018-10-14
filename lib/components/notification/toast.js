"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(require("vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DefaultTime = 3000,
      // 默认显示时间
DefaultType = 'info',
      // 默认消息类型
DefaultMax = 3,
      // 可同时显示消息数最大值
prefix = 'nop';
var config = {
  name: 'nop-toast',
  props: {
    prefixCls: {
      type: String,
      default: `${prefix}-toast`
    },
    max: {
      type: Number,
      default: DefaultMax
    }
  },

  data() {
    return {
      list: [],
      counter: 0
    };
  },

  beforeDestroy() {
    // @NOTE 实例销毁前清除定时器
    this.clearAll();
  },

  created: function () {
    document.body.appendChild(this.$mount().$el);
  },
  // 对外API
  // 建议用直接封装好的info success fail等
  methods: {
    // 增加一条消息
    show(options, time) {
      // 是否达到最大可显示数量
      if (this.list.length >= this.max) {
        // 推出队列中第一条
        let e = this.list.shift();
        window.clearTimeout(e.closeTimer);
      }

      let _options = options || {};

      let _item = {
        type: _options.type || DefaultType,
        title: _options.title,
        detail: _options.detail
      };
      _item.id = this.counter++;
      _item.closeTimer = window.setTimeout(function () {
        this.hide(_item.id);
      }.bind(this), time || DefaultTime);
      this.list.push(_item);
    },

    // 隐藏指定消息，倒计时结束或主动点击关闭
    hide(_id) {
      this.list.forEach((ele, index) => {
        if (ele.id == _id) {
          window.clearTimeout(ele.closeTimer);
          this.list.splice(index, 1);
        }
      });
    },

    // 清空消息队列
    clearAll() {
      if (this.list.length === 0) {
        return;
      } // 清空所有计时器


      this.list.forEach(ele => {
        window.clearTimeout(ele.closeTimer);
      });
      this.list = [];
      this.counter = 0;
    }

  }
};
const typeList = ['success', 'fail', 'exception', 'info']; // 补充不同类型的通知API

typeList.forEach(ele => {
  config.methods[ele] = function (tlt, detail = '', time = DefaultTime) {
    this.show({
      type: ele,
      title: tlt,
      detail: detail
    }, time);
  };
});

var _default = _vue.default.extend(config);

exports.default = Object.assign(_default, {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('transition', {
      attrs: {
        "name": _vm.prefixCls + "-moveup"
      }
    }, [_vm.list.length > 0 ? _c('div', {
      class: "" + _vm.prefixCls
    }, [_c('div', {
      class: _vm.prefixCls + "-wrap"
    }, _vm._l(_vm.list, function (toast) {
      return _c('div', {
        key: toast.id,
        class: [_vm.prefixCls + "-item", _vm.prefixCls + "-item-" + toast.type]
      }, [_c('i', {
        class: [_vm.prefixCls + "-icon nopIcon", _vm.prefixCls + "-icon-" + toast.type]
      }), _vm._v(" "), _c('span', {
        class: _vm.prefixCls + "-tlt"
      }, [_vm._v("\n          " + _vm._s(toast.title) + "\n        ")]), _vm._v(" "), toast.detail !== '' ? _c('p', {
        class: _vm.prefixCls + "-des"
      }, [_vm._v(_vm._s(toast.detail))]) : _vm._e(), _vm._v(" "), _c('i', {
        class: _vm.prefixCls + "-icon nopIcon close",
        on: {
          "click": function ($event) {
            _vm.hide(toast.id);
          }
        }
      })]);
    }))]) : _vm._e()]);
  }
});;