"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
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
    return _linkButton.default;
  }
});
exports.default = void 0;

var _button = _interopRequireDefault(require("./button"));

var _linkButton = _interopRequireDefault(require("./linkButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _button.default;
exports.default = _default;