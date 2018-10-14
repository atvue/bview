"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Breadcrumb", {
  enumerable: true,
  get: function () {
    return _breadcrumb.default;
  }
});
Object.defineProperty(exports, "BreadcrumbItem", {
  enumerable: true,
  get: function () {
    return _breadcrumbItem.default;
  }
});
exports.default = void 0;

var _breadcrumb = _interopRequireDefault(require("./breadcrumb.vue"));

var _breadcrumbItem = _interopRequireDefault(require("./breadcrumb-item.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _breadcrumb.default;
exports.default = _default;