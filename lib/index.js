"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Breadcrumb", {
  enumerable: true,
  get: function () {
    return _breadcrumb.Breadcrumb;
  }
});
Object.defineProperty(exports, "BreadcrumbItem", {
  enumerable: true,
  get: function () {
    return _breadcrumb.BreadcrumbItem;
  }
});
Object.defineProperty(exports, "Icon", {
  enumerable: true,
  get: function () {
    return _icon.default;
  }
});
Object.defineProperty(exports, "Modal", {
  enumerable: true,
  get: function () {
    return _notification.Modal;
  }
});
Object.defineProperty(exports, "Toast", {
  enumerable: true,
  get: function () {
    return _notification.Toast;
  }
});
Object.defineProperty(exports, "Pager", {
  enumerable: true,
  get: function () {
    return _pager.default;
  }
});
Object.defineProperty(exports, "Select", {
  enumerable: true,
  get: function () {
    return _select.default;
  }
});
Object.defineProperty(exports, "Option", {
  enumerable: true,
  get: function () {
    return _select.Option;
  }
});
Object.defineProperty(exports, "Button", {
  enumerable: true,
  get: function () {
    return _button.default;
  }
});
Object.defineProperty(exports, "LinkButton", {
  enumerable: true,
  get: function () {
    return _button.LinkButton;
  }
});
exports.default = void 0;

var _breadcrumb = require("./components/breadcrumb");

var _icon = _interopRequireDefault(require("./components/icon"));

var _notification = require("./components/notification");

var _pager = _interopRequireDefault(require("./components/pager"));

var _select = _interopRequireWildcard(require("./components/select"));

var _button = _interopRequireWildcard(require("./components/button"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const components = {
  Breadcrumb: _breadcrumb.Breadcrumb,
  BreadcrumbItem: _breadcrumb.BreadcrumbItem,
  Button: _button.default,
  Icon: _icon.default,
  LinkButton: _button.LinkButton,
  Modal: _notification.Modal,
  Option: _select.Option,
  Pager: _pager.default,
  Select: _select.default
}; // @TODO 命名规范？
// 统一默认前缀

const install = function (Vue, opts = {}) {
  Object.keys(components).forEach(key => {
    // debugger;
    Vue.component(key, components[key]);
  }); // Confirm Toast加到全局 @TODO

  const _toastInstance = new _notification.Toast();

  Vue.toast = Vue.prototype.$toast = _toastInstance;
};

var _default = {
  install
};
exports.default = _default;