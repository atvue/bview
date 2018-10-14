(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define("nopvue", ["vue"], factory);
	else if(typeof exports === 'object')
		exports["nopvue"] = factory(require("vue"));
	else
		root["nopvue"] = factory(root["Vue"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/breadcrumb/breadcrumb.vue?vue&type=template&id=7f9bc3a2&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { class: _vm.prefixCls + "-breadcrumb" },
    [_vm._t("default")],
    2
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/components/breadcrumb/breadcrumb.vue?vue&type=template&id=7f9bc3a2&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--1!./node_modules/vue-loader/lib??vue-loader-options!./src/components/breadcrumb/breadcrumb.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
var defaultSeparator = '/';
var prefix = 'nop';
/* harmony default export */ var breadcrumbvue_type_script_lang_js_ = ({
  name: 'nop-breadcrumb',
  props: {
    prefixCls: {
      type: String,
      default: prefix
    },
    separator: {
      type: String,
      default: defaultSeparator
    }
  },
  mounted: function mounted() {
    this.setChildSeparator();
  },
  methods: {
    setChildSeparator: function setChildSeparator() {
      var _this = this;

      this.$children.forEach(function (child) {
        child.separator = _this.separator;
      });
    }
  },
  watch: {
    separator: function separator() {
      this.setChildSeparator();
    }
  }
});
// CONCATENATED MODULE: ./src/components/breadcrumb/breadcrumb.vue?vue&type=script&lang=js&
 /* harmony default export */ var breadcrumb_breadcrumbvue_type_script_lang_js_ = (breadcrumbvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/components/breadcrumb/breadcrumb.vue





/* normalize component */

var component = normalizeComponent(
  breadcrumb_breadcrumbvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/breadcrumb/breadcrumb.vue"
/* harmony default export */ var breadcrumb = (component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/breadcrumb/breadcrumb-item.vue?vue&type=template&id=07212a21&
var breadcrumb_itemvue_type_template_id_07212a21_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("span", { class: _vm.prefixCls + "-breadcrumb-item" }, [
    _vm.showLink
      ? _c(
          "a",
          {
            class: _vm.prefixCls + "-breadcrumb-item_link",
            on: { click: _vm.handleClick }
          },
          [_vm._t("default")],
          2
        )
      : _c(
          "span",
          { class: _vm.prefixCls + "-breadcrumb-item_label" },
          [_vm._t("default")],
          2
        ),
    _vm._v(" "),
    _c("span", {
      class: _vm.prefixCls + "-breadcrumb-item_separator",
      domProps: { innerHTML: _vm._s(_vm.separator) }
    })
  ])
}
var breadcrumb_itemvue_type_template_id_07212a21_staticRenderFns = []
breadcrumb_itemvue_type_template_id_07212a21_render._withStripped = true


// CONCATENATED MODULE: ./src/components/breadcrumb/breadcrumb-item.vue?vue&type=template&id=07212a21&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--1!./node_modules/vue-loader/lib??vue-loader-options!./src/components/breadcrumb/breadcrumb-item.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
var breadcrumb_itemvue_type_script_lang_js_prefix = 'nop';
/* harmony default export */ var breadcrumb_itemvue_type_script_lang_js_ = ({
  name: 'nop-breadcrumb-item',
  props: {
    prefixCls: {
      type: String,
      default: breadcrumb_itemvue_type_script_lang_js_prefix
    },
    to: {
      type: [String, Object]
    }
  },
  data: function data() {
    return {
      separator: undefined
    };
  },
  computed: {
    showLink: function showLink() {
      return this.to !== undefined && this.to !== null;
    }
  },
  methods: {
    handleClick: function handleClick() {
      if (this.$router) {
        this.$router.push(this.to);
      } else {
        window.location.href = this.to;
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/breadcrumb/breadcrumb-item.vue?vue&type=script&lang=js&
 /* harmony default export */ var breadcrumb_breadcrumb_itemvue_type_script_lang_js_ = (breadcrumb_itemvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/breadcrumb/breadcrumb-item.vue





/* normalize component */

var breadcrumb_item_component = normalizeComponent(
  breadcrumb_breadcrumb_itemvue_type_script_lang_js_,
  breadcrumb_itemvue_type_template_id_07212a21_render,
  breadcrumb_itemvue_type_template_id_07212a21_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var breadcrumb_item_api; }
breadcrumb_item_component.options.__file = "src/components/breadcrumb/breadcrumb-item.vue"
/* harmony default export */ var breadcrumb_item = (breadcrumb_item_component.exports);
// CONCATENATED MODULE: ./src/components/breadcrumb/index.js


/* harmony default export */ var components_breadcrumb = (breadcrumb);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/icon/icon.vue?vue&type=template&id=05593cef&
var iconvue_type_template_id_05593cef_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("i", {
    class: _vm.classes,
    style: _vm.styles,
    attrs: { title: _vm.title },
    on: { click: _vm.onClick }
  })
}
var iconvue_type_template_id_05593cef_staticRenderFns = []
iconvue_type_template_id_05593cef_render._withStripped = true


// CONCATENATED MODULE: ./src/components/icon/icon.vue?vue&type=template&id=05593cef&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--1!./node_modules/vue-loader/lib??vue-loader-options!./src/components/icon/icon.vue?vue&type=script&lang=js&
//
//
//
//
var prefixCls = 'nopIcon';
/* harmony default export */ var iconvue_type_script_lang_js_ = ({
  name: 'nop-icon',
  props: {
    type: String,
    size: [Number, String],
    color: String,
    title: String
  },
  computed: {
    classes: function classes() {
      return "".concat(prefixCls, " nicon-").concat(this.type);
    },
    styles: function styles() {
      var style = {};

      if (this.size) {
        style['font-size'] = "".concat(this.size, "px");
      }

      if (this.color) {
        style.color = this.color;
      }

      return style;
    }
  },
  methods: {
    onClick: function onClick(e) {
      this.$emit('click', e);
    }
  }
});
// CONCATENATED MODULE: ./src/components/icon/icon.vue?vue&type=script&lang=js&
 /* harmony default export */ var icon_iconvue_type_script_lang_js_ = (iconvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/icon/icon.vue





/* normalize component */

var icon_component = normalizeComponent(
  icon_iconvue_type_script_lang_js_,
  iconvue_type_template_id_05593cef_render,
  iconvue_type_template_id_05593cef_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var icon_api; }
icon_component.options.__file = "src/components/icon/icon.vue"
/* harmony default export */ var icon = (icon_component.exports);
// CONCATENATED MODULE: ./src/components/icon/index.js

/* harmony default export */ var components_icon = (icon);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/notification/modal.vue?vue&type=template&id=35de9619&
var modalvue_type_template_id_35de9619_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("transition", { attrs: { name: "fadeIn" } }, [
    _vm.visible
      ? _c("div", { class: "" + _vm.prefixCls }, [
          _c("div", { class: _vm.prefixCls + "-wrap" }, [
            _c("div", { class: _vm.prefixCls + "-win" }, [
              _vm.closable
                ? _c(
                    "i",
                    {
                      class: _vm.prefixCls + "-close",
                      on: {
                        click: function($event) {
                          _vm.onClose()
                        }
                      }
                    },
                    [_c("Icon", { attrs: { type: "close" } })],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.title !== ""
                ? _c("div", { class: _vm.prefixCls + "-head" }, [
                    _vm._v(
                      "\n                    " +
                        _vm._s(_vm.title) +
                        "\n                "
                    )
                  ])
                : _vm._e(),
              _vm._v(" "),
              _c(
                "div",
                { class: _vm.prefixCls + "-body" },
                [_vm._t("default")],
                2
              ),
              _vm._v(" "),
              _c(
                "div",
                { class: _vm.prefixCls + "-foot" },
                [
                  _vm._t("button", [
                    _vm.confirmTxt !== ""
                      ? _c(
                          "button",
                          {
                            class: _vm.prefixCls + "-btn",
                            style: _vm.confirmButtonStyle,
                            attrs: {
                              disabled: _vm.confirmLock,
                              type: "button"
                            },
                            on: {
                              click: function($event) {
                                $event.preventDefault()
                                return _vm.onConfirm($event)
                              }
                            }
                          },
                          [_vm._v(_vm._s(_vm.confirmTxt))]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.cancelTxt !== ""
                      ? _c(
                          "button",
                          {
                            class: _vm.prefixCls + "-btn close",
                            style: _vm.cencelButtonStyle,
                            attrs: { type: "button" },
                            on: {
                              click: function($event) {
                                $event.preventDefault()
                                return _vm.onCancel($event)
                              }
                            }
                          },
                          [_vm._v(_vm._s(_vm.cancelTxt))]
                        )
                      : _vm._e()
                  ])
                ],
                2
              )
            ])
          ])
        ])
      : _vm._e()
  ])
}
var modalvue_type_template_id_35de9619_staticRenderFns = []
modalvue_type_template_id_35de9619_render._withStripped = true


// CONCATENATED MODULE: ./src/components/notification/modal.vue?vue&type=template&id=35de9619&

// EXTERNAL MODULE: external {"root":"Vue","commonjs":"vue","commonjs2":"vue","amd":"vue"}
var external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_ = __webpack_require__(1);
var external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_default = /*#__PURE__*/__webpack_require__.n(external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--1!./node_modules/vue-loader/lib??vue-loader-options!./src/components/notification/modal.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var modalvue_type_script_lang_js_prefix = 'nop';
var Modal = external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_default.a.extend({
  name: 'nop-modal',
  components: {
    Icon: components_icon
  },
  props: {
    prefixCls: {
      type: String,
      default: "".concat(modalvue_type_script_lang_js_prefix, "-modal")
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
  data: function data() {
    return {
      visible: this.value
    };
  },
  watch: {
    value: function value(val) {
      this.visible = val;
    }
  },
  computed: {
    cencelButtonStyle: function cencelButtonStyle() {
      var _style = {
        'background-color': this.cancelButtonColor,
        color: this.cancelTextColor
      };

      if (this.cancelButtonColor.toLowerCase() == '#fff' || this.cancelButtonColor.toLowerCase() == '#ffffff') {
        _style.border = 'solid 1px #aaa';
      }

      return _style;
    },
    confirmButtonStyle: function confirmButtonStyle() {
      var _style = {
        'background-color': this.confirmButtonColor,
        color: this.confirmTextColor
      };
      return _style;
    }
  },
  mounted: function mounted() {},
  methods: {
    show: function show() {
      this.visible = true;
      this.$emit('input', true);
    },
    close: function close() {
      this.visible = false;
      this.$emit('input', false);
    },
    onClose: function onClose() {
      this.visible = false;
      this.$emit('input', false);
      this.$emit('on-cancel');
      this.$emit('cancel');
    },
    onConfirm: function onConfirm() {
      if (this.confirmHidden) {
        this.visible = false;
        this.$emit('input', false);
      }

      this.$emit('on-confirm');
      this.$emit('confirm');
    },
    onCancel: function onCancel() {
      this.onClose();
    }
  }
});
/* harmony default export */ var modalvue_type_script_lang_js_ = (Modal);
// CONCATENATED MODULE: ./src/components/notification/modal.vue?vue&type=script&lang=js&
 /* harmony default export */ var notification_modalvue_type_script_lang_js_ = (modalvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/notification/modal.vue?vue&type=custom&index=0&blockType=nop-modal&title=%E6%B5%8B%E8%AF%95&ref=modal
var modalvue_type_custom_index_0_blockType_nop_modal_title_E6_B5_8B_E8_AF_95_ref_modal = __webpack_require__(2);
var modalvue_type_custom_index_0_blockType_nop_modal_title_E6_B5_8B_E8_AF_95_ref_modal_default = /*#__PURE__*/__webpack_require__.n(modalvue_type_custom_index_0_blockType_nop_modal_title_E6_B5_8B_E8_AF_95_ref_modal);

// CONCATENATED MODULE: ./src/components/notification/modal.vue





/* normalize component */

var modal_component = normalizeComponent(
  notification_modalvue_type_script_lang_js_,
  modalvue_type_template_id_35de9619_render,
  modalvue_type_template_id_35de9619_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* custom blocks */

if (typeof modalvue_type_custom_index_0_blockType_nop_modal_title_E6_B5_8B_E8_AF_95_ref_modal_default.a === 'function') modalvue_type_custom_index_0_blockType_nop_modal_title_E6_B5_8B_E8_AF_95_ref_modal_default()(modal_component)

/* hot reload */
if (false) { var modal_api; }
modal_component.options.__file = "src/components/notification/modal.vue"
/* harmony default export */ var modal = (modal_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/notification/toast.vue?vue&type=template&id=779a36da&
var toastvue_type_template_id_779a36da_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("transition", { attrs: { name: _vm.prefixCls + "-moveup" } }, [
    _vm.list.length > 0
      ? _c("div", { class: "" + _vm.prefixCls }, [
          _c(
            "div",
            { class: _vm.prefixCls + "-wrap" },
            _vm._l(_vm.list, function(toast) {
              return _c(
                "div",
                {
                  key: toast.id,
                  class: [
                    _vm.prefixCls + "-item",
                    _vm.prefixCls + "-item-" + toast.type
                  ]
                },
                [
                  _c("i", {
                    class: [
                      _vm.prefixCls + "-icon nopIcon",
                      _vm.prefixCls + "-icon-" + toast.type
                    ]
                  }),
                  _vm._v(" "),
                  _c("span", { class: _vm.prefixCls + "-tlt" }, [
                    _vm._v("\n          " + _vm._s(toast.title) + "\n        ")
                  ]),
                  _vm._v(" "),
                  toast.detail !== ""
                    ? _c("p", { class: _vm.prefixCls + "-des" }, [
                        _vm._v(_vm._s(toast.detail))
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _c("i", {
                    class: _vm.prefixCls + "-icon nopIcon close",
                    on: {
                      click: function($event) {
                        _vm.hide(toast.id)
                      }
                    }
                  })
                ]
              )
            })
          )
        ])
      : _vm._e()
  ])
}
var toastvue_type_template_id_779a36da_staticRenderFns = []
toastvue_type_template_id_779a36da_render._withStripped = true


// CONCATENATED MODULE: ./src/components/notification/toast.vue?vue&type=template&id=779a36da&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--1!./node_modules/vue-loader/lib??vue-loader-options!./src/components/notification/toast.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var DefaultTime = 3000,
    // 默认显示时间
DefaultType = 'info',
    // 默认消息类型
DefaultMax = 3,
    // 可同时显示消息数最大值
toastvue_type_script_lang_js_prefix = 'nop';

var config = {
  name: 'nop-toast',
  props: {
    prefixCls: {
      type: String,
      default: "".concat(toastvue_type_script_lang_js_prefix, "-toast")
    },
    max: {
      type: Number,
      default: DefaultMax
    }
  },
  data: function data() {
    return {
      list: [],
      counter: 0
    };
  },
  beforeDestroy: function beforeDestroy() {
    // @NOTE 实例销毁前清除定时器
    this.clearAll();
  },
  created: function created() {
    document.body.appendChild(this.$mount().$el);
  },
  // 对外API
  // 建议用直接封装好的info success fail等
  methods: {
    // 增加一条消息
    show: function show(options, time) {
      // 是否达到最大可显示数量
      if (this.list.length >= this.max) {
        // 推出队列中第一条
        var e = this.list.shift();
        window.clearTimeout(e.closeTimer);
      }

      var _options = options || {};

      var _item = {
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
    hide: function hide(_id) {
      var _this = this;

      this.list.forEach(function (ele, index) {
        if (ele.id == _id) {
          window.clearTimeout(ele.closeTimer);

          _this.list.splice(index, 1);
        }
      });
    },
    // 清空消息队列
    clearAll: function clearAll() {
      if (this.list.length === 0) {
        return;
      } // 清空所有计时器


      this.list.forEach(function (ele) {
        window.clearTimeout(ele.closeTimer);
      });
      this.list = [];
      this.counter = 0;
    }
  }
};
var typeList = ['success', 'fail', 'exception', 'info']; // 补充不同类型的通知API

typeList.forEach(function (ele) {
  config.methods[ele] = function (tlt) {
    var detail = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DefaultTime;
    this.show({
      type: ele,
      title: tlt,
      detail: detail
    }, time);
  };
});
/* harmony default export */ var toastvue_type_script_lang_js_ = (external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_default.a.extend(config));
// CONCATENATED MODULE: ./src/components/notification/toast.vue?vue&type=script&lang=js&
 /* harmony default export */ var notification_toastvue_type_script_lang_js_ = (toastvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/notification/toast.vue





/* normalize component */

var toast_component = normalizeComponent(
  notification_toastvue_type_script_lang_js_,
  toastvue_type_template_id_779a36da_render,
  toastvue_type_template_id_779a36da_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var toast_api; }
toast_component.options.__file = "src/components/notification/toast.vue"
/* harmony default export */ var toast = (toast_component.exports);
// CONCATENATED MODULE: ./src/components/notification/index.js



// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/pager/pager.vue?vue&type=template&id=6f81f917&
var pagervue_type_template_id_6f81f917_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "ul",
    { staticClass: "nop-pager", style: _vm.styles },
    [
      _vm.showTotal
        ? _c("span", { staticClass: "nop-pager-detail" }, [
            _vm._v(
              "\n        共" +
                _vm._s(_vm.allPages) +
                "页，" +
                _vm._s(_vm.total) +
                "条数据\n    "
            )
          ])
        : _vm._e(),
      _vm._v(" "),
      _c("li", { class: _vm.prevClass, on: { click: _vm.prev } }, [
        _c("a", [_c("Icon", { attrs: { type: "xiangzuo1", size: "12" } })], 1)
      ]),
      _vm._v(" "),
      _c(
        "li",
        {
          class: _vm.firstPageClass,
          attrs: { title: 1 },
          on: {
            click: function($event) {
              _vm.changePage(1)
            }
          }
        },
        [_c("a", [_vm._v("1")])]
      ),
      _vm._v(" "),
      _vm.currentPage - 3 > 1
        ? _c(
            "li",
            {
              staticClass: "nop-pager-item nop-pager-fastprev",
              on: { click: _vm.fastPrev }
            },
            [_c("a", [_c("Icon", { attrs: { type: "more", size: "12" } })], 1)]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.currentPage - 2 > 1
        ? _c(
            "li",
            {
              staticClass: "nop-pager-item",
              attrs: { title: _vm.currentPage - 2 },
              on: {
                click: function($event) {
                  _vm.changePage(_vm.currentPage - 2)
                }
              }
            },
            [_c("a", [_vm._v(_vm._s(_vm.currentPage - 2))])]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.currentPage - 1 > 1
        ? _c(
            "li",
            {
              staticClass: "nop-pager-item",
              attrs: { title: _vm.currentPage - 1 },
              on: {
                click: function($event) {
                  _vm.changePage(_vm.currentPage - 1)
                }
              }
            },
            [_c("a", [_vm._v(_vm._s(_vm.currentPage - 1))])]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.currentPage != 1 && _vm.currentPage != _vm.allPages
        ? _c(
            "li",
            {
              staticClass: "nop-pager-item nop-pager-item-active",
              attrs: { title: _vm.currentPage }
            },
            [_c("a", [_vm._v(_vm._s(_vm.currentPage))])]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.currentPage + 1 < _vm.allPages
        ? _c(
            "li",
            {
              staticClass: "nop-pager-item",
              attrs: { title: _vm.currentPage + 1 },
              on: {
                click: function($event) {
                  _vm.changePage(_vm.currentPage + 1)
                }
              }
            },
            [_c("a", [_vm._v(_vm._s(_vm.currentPage + 1))])]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.currentPage + 2 < _vm.allPages
        ? _c(
            "li",
            {
              staticClass: "nop-pager-item",
              attrs: { title: _vm.currentPage + 2 },
              on: {
                click: function($event) {
                  _vm.changePage(_vm.currentPage + 2)
                }
              }
            },
            [_c("a", [_vm._v(_vm._s(_vm.currentPage + 2))])]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.currentPage + 3 < _vm.allPages
        ? _c(
            "li",
            {
              staticClass: "nop-pager-item nop-pager-fastnext",
              on: { click: _vm.fastNext }
            },
            [_c("a", [_c("Icon", { attrs: { type: "more", size: "12" } })], 1)]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.allPages > 1
        ? _c(
            "li",
            {
              class: _vm.lastPageClass,
              attrs: { title: _vm.allPages },
              on: {
                click: function($event) {
                  _vm.changePage(_vm.allPages)
                }
              }
            },
            [_c("a", [_vm._v(_vm._s(_vm.allPages))])]
          )
        : _vm._e(),
      _vm._v(" "),
      _c("li", { class: _vm.nextClass, on: { click: _vm.next } }, [
        _c("a", [_c("Icon", { attrs: { type: "xiangyou1", size: "12" } })], 1)
      ]),
      _vm._v(" "),
      _c(
        "Select",
        {
          staticClass: "nop-pager-select",
          on: { input: _vm.onSize },
          model: {
            value: _vm.currentPageSize,
            callback: function($$v) {
              _vm.currentPageSize = $$v
            },
            expression: "currentPageSize"
          }
        },
        _vm._l(_vm.pageSizeOpts, function(size) {
          return _c("Option", { key: size, attrs: { value: size } }, [
            _vm._v(_vm._s(size) + "条/页")
          ])
        })
      ),
      _vm._v(" "),
      _c("span", { staticClass: "nop-pager-elevator" }, [
        _vm._v("\n        跳转至\n        "),
        _c("input", {
          staticClass: "nop-pager-input",
          attrs: { type: "text", autocomplete: "off", spellcheck: "false" },
          on: {
            keyup: function($event) {
              if (
                !("button" in $event) &&
                _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
              ) {
                return null
              }
              return _vm.onInputChange($event)
            }
          }
        }),
        _vm._v(" 页\n    ")
      ])
    ],
    1
  )
}
var pagervue_type_template_id_6f81f917_staticRenderFns = []
pagervue_type_template_id_6f81f917_render._withStripped = true


// CONCATENATED MODULE: ./src/components/pager/pager.vue?vue&type=template&id=6f81f917&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__(0);
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/select/select.vue?vue&type=template&id=bc33fbe2&
var selectvue_type_template_id_bc33fbe2_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { ref: "selectWrapper", staticClass: "nop-selectn", class: _vm.nopclasses },
    [
      _c(
        "div",
        {
          staticClass: "nop-selectn-selection",
          on: {
            click: function($event) {
              _vm.toggleDropdown(!_vm.visible)
            }
          }
        },
        [
          _vm.filterable && !_vm.multiple
            ? _c("Icon", {
                staticClass: "nop-selectn-icon",
                attrs: { type: "sousuokuang-sousuo", size: "12" }
              })
            : _vm._e(),
          _vm._v(" "),
          !_vm.filterable
            ? _c(
                "span",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: !_vm.valueLabel,
                      expression: "!valueLabel"
                    }
                  ],
                  staticClass: "nop-selectn-placeholder"
                },
                [
                  _vm._v(
                    _vm._s(
                      _vm.placeholder ? _vm.placeholder : _vm.defaultPlaceholder
                    )
                  )
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          !(_vm.filterable || _vm.multiple)
            ? _c(
                "span",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.valueLabel,
                      expression: "valueLabel"
                    }
                  ],
                  staticClass: "nop-selectn-value-label"
                },
                [_vm._v(_vm._s(_vm.valueLabel))]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.multiple && _vm.valueLabelMul.length > 0
            ? _c(
                "span",
                { staticClass: "nop-selectn-mullabel" },
                _vm._l(_vm.valueLabelMul, function(item) {
                  return _c(
                    "span",
                    { staticClass: "nop-selectn-multag" },
                    [
                      _vm._v(_vm._s(item.label) + "\n                "),
                      _c("Icon", {
                        attrs: { type: "close" },
                        on: {
                          click: function($event) {
                            $event.stopPropagation()
                            _vm.onMulCancel(item)
                          }
                        }
                      })
                    ],
                    1
                  )
                })
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.filterable && !_vm.multiple
            ? _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.query,
                    expression: "query"
                  }
                ],
                ref: "input",
                staticClass: "nop-selectn-input",
                attrs: {
                  placeholder: _vm.placeholder
                    ? _vm.placeholder
                    : _vm.defaultPlaceholder,
                  disabled: _vm.disabled,
                  type: "text",
                  maxlength: _vm.maxFilterLength,
                  autocomplete: "off",
                  spellcheck: "false"
                },
                domProps: { value: _vm.query },
                on: {
                  blur: _vm.onBlur,
                  input: [
                    function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.query = $event.target.value
                    },
                    _vm.onInput
                  ],
                  focus: function($event) {
                    _vm.inputing = true
                  }
                }
              })
            : _vm._e(),
          _vm._v(" "),
          _c("i", { staticClass: "nop-arrow-down-b" })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.visible,
              expression: "visible"
            }
          ],
          staticClass: "nop-selectn-dropdown-list",
          on: { mousewheel: _vm.onScroll }
        },
        [
          _vm.filterable && _vm.multiple
            ? _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.query,
                    expression: "query"
                  }
                ],
                ref: "input",
                staticClass: "nop-selectn-input",
                attrs: {
                  placeholder: "输入关键词筛选",
                  disabled: _vm.disabled,
                  type: "text",
                  maxlength: _vm.maxFilterLength,
                  autocomplete: "off",
                  spellcheck: "false"
                },
                domProps: { value: _vm.query },
                on: {
                  blur: _vm.onBlur,
                  input: [
                    function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.query = $event.target.value
                    },
                    _vm.onInput
                  ]
                }
              })
            : _vm._e(),
          _vm._v(" "),
          _c(
            "ul",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.visibleCount > 0,
                  expression: "visibleCount>0"
                }
              ],
              ref: "dropdown",
              on: {
                mouseover: function($event) {
                  _vm.hoverList = true
                },
                mouseout: function($event) {
                  _vm.hoverList = false
                }
              }
            },
            [_vm._t("default")],
            2
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: !_vm.loading && _vm.visibleCount == 0,
                  expression: "!loading&&visibleCount==0"
                }
              ],
              staticClass: "nop-selectn-none"
            },
            [_vm._t("empty", [_vm._v(_vm._s(_vm.emptyTip))])],
            2
          )
        ]
      )
    ]
  )
}
var selectvue_type_template_id_bc33fbe2_staticRenderFns = []
selectvue_type_template_id_bc33fbe2_render._withStripped = true


// CONCATENATED MODULE: ./src/components/select/select.vue?vue&type=template&id=bc33fbe2&

// CONCATENATED MODULE: ./src/mixins/emitter.js
function _broadcast(componentName, eventName, params) {
  this.$children.forEach(function (child) {
    var name = child.$options.name;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      // todo 如果 params 是空数组，接收到的会是 undefined
      _broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}

/* harmony default export */ var emitter = ({
  methods: {
    dispatch: function dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.name;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.name;
        }
      }

      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    broadcast: function broadcast(componentName, eventName, params) {
      _broadcast.call(this, componentName, eventName, params);
    }
  }
});
// CONCATENATED MODULE: ./src/utils/throttleDebounce.js
/*
github: https://github.com/niksy/throttle-debounce
 */

/* eslint-disable no-undefined,no-param-reassign,no-shadow */

/**
 * Throttle execution of a function. Especially useful for rate limiting
 * execution of handlers on events like resize and scroll.
 *
 * @param  {Number}    delay          A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * @param  {Boolean}   noTrailing     Optional, defaults to false. If noTrailing is true, callback will only execute every `delay` milliseconds while the
 *                                    throttled-function is being called. If noTrailing is false or unspecified, callback will be executed one final time
 *                                    after the last throttled-function call. (After the throttled-function has not been called for `delay` milliseconds,
 *                                    the internal counter is reset)
 * @param  {Function}  callback       A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
 *                                    to `callback` when the throttled-function is executed.
 * @param  {Boolean}   debounceMode   If `debounceMode` is true (at begin), schedule `clear` to execute after `delay` ms. If `debounceMode` is false (at end),
 *                                    schedule `callback` to execute after `delay` ms.
 *
 * @return {Function}  A new, throttled, function.
 */
function throttle(delay, noTrailing, callback, debounceMode) {
  // After wrapper has stopped being called, this timeout ensures that
  // `callback` is executed at the proper times in `throttle` and `end`
  // debounce modes.
  var timeoutID; // Keep track of the last time `callback` was executed.

  var lastExec = 0; // `noTrailing` defaults to falsy.

  if (typeof noTrailing !== 'boolean') {
    debounceMode = callback;
    callback = noTrailing;
    noTrailing = undefined;
  } // The `wrapper` function encapsulates all of the throttling / debouncing
  // functionality and when executed will limit the rate at which `callback`
  // is executed.


  function wrapper() {
    var self = this;
    var elapsed = Number(new Date()) - lastExec;
    var args = arguments; // Execute `callback` and update the `lastExec` timestamp.

    function exec() {
      lastExec = Number(new Date());
      callback.apply(self, args);
    } // If `debounceMode` is true (at begin) this is used to clear the flag
    // to allow future `callback` executions.


    function clear() {
      timeoutID = undefined;
    }

    if (debounceMode && !timeoutID) {
      // Since `wrapper` is being called for the first time and
      // `debounceMode` is true (at begin), execute `callback`.
      exec();
    } // Clear any existing timeout.


    if (timeoutID) {
      clearTimeout(timeoutID);
    }

    if (debounceMode === undefined && elapsed > delay) {
      // In throttle mode, if `delay` time has been exceeded, execute
      // `callback`.
      exec();
    } else if (noTrailing !== true) {
      // In trailing throttle mode, since `delay` time has not been
      // exceeded, schedule `callback` to execute `delay` ms after most
      // recent execution.
      //
      // If `debounceMode` is true (at begin), schedule `clear` to execute
      // after `delay` ms.
      //
      // If `debounceMode` is false (at end), schedule `callback` to
      // execute after `delay` ms.
      timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
    }
  } // Return the wrapper function.


  return wrapper;
}
;
/* eslint-disable no-undefined */

/**
 * Debounce execution of a function. Debouncing, unlike throttling,
 * guarantees that a function is only executed a single time, either at the
 * very beginning of a series of calls, or at the very end.
 *
 * @param  {Number}   delay         A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * @param  {Boolean}  atBegin       Optional, defaults to false. If atBegin is false or unspecified, callback will only be executed `delay` milliseconds
 *                                  after the last debounced-function call. If atBegin is true, callback will be executed only at the first debounced-function call.
 *                                  (After the throttled-function has not been called for `delay` milliseconds, the internal counter is reset).
 * @param  {Function} callback      A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
 *                                  to `callback` when the debounced-function is executed.
 *
 * @return {Function} A new, debounced function.
 */

function debounce(delay, atBegin, callback) {
  return callback === undefined ? throttle(delay, atBegin, false) : throttle(delay, callback, atBegin !== false);
}
;
// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--1!./node_modules/vue-loader/lib??vue-loader-options!./src/components/select/select.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var selectvue_type_script_lang_js_ = ({
  name: 'nop-select',
  components: {
    Icon: components_icon
  },
  mixins: [emitter],
  props: {
    placeholder: {
      type: String
    },
    value: {
      type: [Number, String, Array]
    },
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    filterable: {
      type: Boolean,
      default: false
    },
    remote: {
      type: Boolean,
      default: false
    },
    maxFilterLength: {
      type: Number,
      default: 50
    },
    remoteMethod: {
      type: Function
    },
    debounce: {
      type: Number,
      default: undefined
    },
    loading: {
      type: Boolean,
      default: false
    },
    emptyTip: {
      type: String,
      default: '无匹配数据'
    }
  },
  created: function created() {
    var remoteMethod = this.remoteMethod;

    if (remoteMethod !== undefined) {
      var time = this.debounce;

      if (time !== undefined) {
        this.remoteMethodDebounce = debounce(time, remoteMethod);
      } else {
        this.remoteMethodDebounce = remoteMethod;
      }
    }
  },
  data: function data() {
    return {
      currentValue: this.value,
      // 实际选中值
      defaultPlaceholder: '请选择',
      visible: false,
      optionInstances: [],
      options: [],
      query: '',
      // 输入的筛选字段
      initVal: '',
      // 初始值
      selectChangeQuery: false,
      // 标记是否选中option导致query变更
      hoverList: false,
      // 标记鼠标是否在下拉列表上
      inputing: false
    };
  },
  computed: {
    // 计算依赖this.options 当异步获取的选项添加时会引起重新计算
    //
    valueLabel: function valueLabel() {
      if (this.multiple) {
        return undefined;
      }

      var currentValue = this.currentValue,
          options = this.options,
          target = options.find(function (_ref) {
        var tmpValue = _ref.value;
        // @NOTE 应该用全等符号判断
        return tmpValue === currentValue;
      });
      var label = target !== undefined ? target.label : undefined;
      return label;
    },
    valueLabelMul: function valueLabelMul() {
      if (!this.multiple) {
        return [];
      }

      var currentValue = this.currentValue,
          options = this.options; // console.log(options)

      return currentValue.map(function (value) {
        return options.find(function (_ref2) {
          var tmpValue = _ref2.value;
          return tmpValue === value;
        });
      }) || [];
    },
    nopclasses: function nopclasses() {
      return {
        'nop-selectn-visible': this.visible,
        'nop-selectn-disabled': this.disabled
      };
    },
    // 获取当前可视option节点数量
    visibleCount: function visibleCount() {
      return this.optionInstances.filter(function (child) {
        return !child.hidden;
      }).length;
    }
  },
  watch: {
    visible: function visible(val, oldVal) {
      if (val) {
        document.addEventListener('click', this.documentClick);
      } else {
        this.unbindGlobalEvents();
      }
    },
    value: function value(val, oldVal) {
      this.currentValue = val;
      this.updateSelected(val);
    },
    // filterable模式下 输入框query变更引起筛选
    query: function query(val) {
      // 不是主动选中导致query变更
      if (!this.selectChangeQuery) {
        if (this.remote) {
          // remote
          this.remoteMethodDebounce(val || '');
          this.clearSelect();
        } else if (val !== undefined) {
          // 非remote
          this.broadcast('nop-select-option', 'select-filter', val);
        }
      }

      this.selectChangeQuery = false;
    },
    // @NOTE 之后要区分多选和非多选的情况
    valueLabel: function valueLabel(val) {
      // debugger;
      // 选中时变更输入框值
      // @NOTE val为undefined时如果不更新query为空字符串，将出现无法清空的情况
      // @NOTE remote时，重新输入列表变化会导致valueLabel重新计算可能为undefined 此时变化query有问题
      // @NOTE 新增 根据是否正在输入判断是否清空query
      if (this.remote) {
        !this.inputing && this.filterable && (this.query = val) && (this.selectChangeQuery = true);
      } else {
        this.filterable && (this.query = val) && (this.selectChangeQuery = true);
      }
    }
  },
  methods: {
    toggleDropdown: function toggleDropdown(val) {
      var _this = this;

      if (val && !this.disabled) {
        var hasChild = this.$slots.default && this.$slots.default.length > 0;
        this.visible = true;

        if (hasChild) {
          // this.query = "";
          // 设置scroll状态，滚动到选中项可见位置
          this.$nextTick(function () {
            var flag = false;

            _this.findChild(function (child) {
              if (child.selected === true && child.index > 1 && !flag) {
                _this.resetScrollTop(child.index);

                flag = true; // child.$el.scrollIntoView();
              }
            });
          });
        }
      } else {
        this.hideMenu();
      }
    },
    hideMenu: function hideMenu() {
      var select = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.visible = false; // 输入框失焦

      this.filterable && this.$refs.input.blur(); // 多选情况下清空query

      this.multiple && (this.query = '');
      this.broadcast('nop-select-option', 'select-close');
      this.$emit('close', select);
    },
    // 下拉框滚动条状态
    // 如果有传入index 直接设置到index
    resetScrollTop: function resetScrollTop(_index) {
      var index = _index - 1 || this.focusIndex - 1,
          optionInstanceRect = this.optionInstances[index].$el.getBoundingClientRect(),
          dropdown = this.$refs.dropdown,
          dropdownRect = dropdown.getBoundingClientRect();
      var bottomOverflowDistance = optionInstanceRect.bottom - dropdownRect.bottom;
      var topOverflowDistance = optionInstanceRect.top - dropdownRect.top;

      if (bottomOverflowDistance > 0) {
        dropdown.scrollTop += bottomOverflowDistance;
      }

      if (topOverflowDistance < 0) {
        dropdown.scrollTop += topOverflowDistance;
      }
    },
    documentClick: function documentClick(event) {
      var target = event.target,
          selectWrapper = this.$refs.selectWrapper;

      if (!selectWrapper.contains(target)) {
        this.hideMenu();
      }
    },
    updateSelected: function updateSelected(val) {
      var _this2 = this;

      this.optionInstances.forEach(function (child) {
        child.selected = _this2.multiple ? _this2.currentValue.indexOf(child.value) !== -1 : child.value === _this2.currentValue;
      });
    },
    // find option component
    findChild: function findChild(cb) {
      var find = function find(child) {
        var name = child.$options.name;

        if (name === 'nop-select-option') {
          cb(child);
        } else if (child.$children.length) {
          child.$children.forEach(function (innerChild) {
            find(innerChild, cb);
          });
        }
      };

      if (this.optionInstances.length) {
        this.optionInstances.forEach(function (child) {
          find(child);
        });
      } else {
        this.$children.forEach(function (child) {
          find(child);
        });
      }
    },
    updateOptions: function updateOptions() {
      var _this3 = this;

      var slot = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var options = [];
      var index = 1;
      this.findChild(function (child) {
        options.push({
          value: child.value,
          label: child.label === undefined ? child.$el.textContent : child.label
        });
        child.index = index++; // @TODO childselect状态判断待优化

        child.selected = _this3.multiple ? _this3.currentValue.indexOf(child.value) !== -1 : child.value === _this3.currentValue;

        _this3.optionInstances.push(child);
      });
      this.options = options;
    },
    unbindGlobalEvents: function unbindGlobalEvents() {
      document.removeEventListener('click', this.documentClick);
    },
    onInput: function onInput() {
      this.inputing = true;
      this.$emit('onInput', this.query);
    },
    onBlur: function onBlur() {
      this.inputing = false; // 多选，则直接退出？

      if (this.multiple) {
        return;
      } // 点击列表引起blur 不处理


      if (this.hoverList) {
        return;
      } // 可见项目为1 且未选中


      if (this.query !== '' && this.visibleCount === 1 && !this.valueLabel && !this.remote) {
        // 查找可见项并选中
        this.broadcast('nop-select-option', 'select-visible');
        return;
      } // query为空，且点击其他地区失焦


      if (this.query === '') {
        this.clearSelect();
        return;
      } // query不为空 有选中项目且点击其他区域失焦


      if (this.valueLabel) {
        // query设置为原选中项目
        this.query = this.valueLabel;
        return;
      } // 无选中项目且点击其他区域失焦 且query不为空


      if (!this.valueLabel && this.query !== '') {
        // 清空query
        this.query = '';
      }

      this.$emit('blur', this.value);
    },
    // 清空当前选项
    clearSelect: function clearSelect() {
      this.$emit('input', '');
    },
    clearAll: function clearAll() {
      this.$emit('input', '');
    },
    // 选择某一项 根据value
    // @NOTE multiple暂不能使用这个功能
    setSelect: function setSelect(val) {
      this.findChild(function (child) {
        if (child.value === val) {
          child.select();
        }
      });
    },
    // 获取当前选项
    // @NOTE multiple暂不能使用这个功能
    getSelect: function getSelect() {
      var value = this.value,
          hasControlled = this.$options.propsData.hasOwnProperty('value');

      if (!hasControlled) {
        return this.currentValue;
      } else {
        return this.value;
      }
    },
    // select内滚动到顶部或者底部 父层不滚动
    onScroll: function onScroll(event) {
      var scrollHeight = event.currentTarget.scrollHeight,
          scrollTop = event.currentTarget.scrollTop,
          height = event.currentTarget.clientHeight;
      var delta = event.wheelDelta ? event.wheelDelta : -(event.detail || 0);

      if (delta > 0 && scrollTop <= delta || delta < 0 && scrollHeight - height - scrollTop <= -1 * delta) {
        // @NOTE 设置scrollTop到底部或顶部，根据滚动方向
        event.currentTarget.scrollTop = delta > 0 ? 0 : scrollHeight;
        event.preventDefault();
      }
    },
    // 多选情况下 取消选中
    onMulCancel: function onMulCancel(target) {
      var tarIndex = this.currentValue.findIndex(function (value) {
        return value === target.value;
      });
      this.currentValue.splice(tarIndex, 1);
      this.$emit('input', this.currentValue);
    }
  },
  mounted: function mounted() {
    var _this4 = this;

    // @NOTE 首次需要主动查找子节点
    this.updateOptions(); // @NOTE 初始化

    if (this.value !== 'undefined') {
      // @NOTE 应该不需要
      // (this.filterable)&&(this.query=this.value)&&(this.selectChangeQuery=true);
      // !this.filterable&&this.setSelect(this.value)
      this.initVal = this.value;
    } // 远程的，先获取一次列表


    if (this.remote && this.optionInstances.length === 0) {
      this.remoteMethodDebounce('');
    } // options点击事件


    this.$on('selected', function (data) {
      // 区分是否变化
      // 同一个选项点击
      if (_this4.currentValue === data) {
        // @NOTE 重置query值
        _this4.query = _this4.valueLabel;

        _this4.hideMenu(true);

        return;
      } // @NOTE 区分多选和非多选的情况


      if (_this4.multiple) {
        var _index = _this4.currentValue.indexOf(data); // 添加或删除


        if (_index === -1) {
          _this4.currentValue.push(data);
        } else {
          _this4.currentValue.splice(_index, 1);
        }

        _this4.$emit('input', _this4.currentValue);

        _this4.$emit('select', _this4.currentValue);
      } else {
        _this4.selectChangeQuery = true;
        _this4.currentValue = data;

        _this4.$emit('input', data);

        _this4.$emit('select', data);

        _this4.hideMenu(true);
      }
    }); // 添加option

    this.$on('select-add', function (child) {
      _this4.options.push({
        value: child.value,
        label: child.label === undefined ? child.$el.textContent : child.label
      });

      child.selected = _this4.multiple ? _this4.currentValue.indexOf(child.value) !== -1 : child.value === _this4.currentValue;
      child.index = _this4.optionInstances.length + 1;

      _this4.optionInstances.push(child);
    }); // 删除option

    this.$on('select-del', function (child) {
      var i = _this4.options.findIndex(function (item) {
        return item.value === child.value;
      });

      _this4.options.splice(i, 1);

      var j = _this4.optionInstances.findIndex(function (item) {
        return item.value === child.value;
      });

      _this4.optionInstances.splice(i, 1);
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.unbindGlobalEvents();
  }
});
// CONCATENATED MODULE: ./src/components/select/select.vue?vue&type=script&lang=js&
 /* harmony default export */ var select_selectvue_type_script_lang_js_ = (selectvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/select/select.vue





/* normalize component */

var select_component = normalizeComponent(
  select_selectvue_type_script_lang_js_,
  selectvue_type_template_id_bc33fbe2_render,
  selectvue_type_template_id_bc33fbe2_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var select_api; }
select_component.options.__file = "src/components/select/select.vue"
/* harmony default export */ var select_select = (select_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/select/option.vue?vue&type=template&id=5678f108&
var optionvue_type_template_id_5678f108_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "li",
    {
      directives: [
        {
          name: "show",
          rawName: "v-show",
          value: !_vm.hidden,
          expression: "!hidden"
        }
      ],
      staticClass: "nop-select-option",
      class: _vm.classes,
      attrs: { title: _vm.title },
      on: {
        click: function($event) {
          $event.stopPropagation()
          return _vm.select($event)
        }
      }
    },
    [_vm._t("default", [_vm._v(_vm._s(_vm.showLabel))])],
    2
  )
}
var optionvue_type_template_id_5678f108_staticRenderFns = []
optionvue_type_template_id_5678f108_render._withStripped = true


// CONCATENATED MODULE: ./src/components/select/option.vue?vue&type=template&id=5678f108&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--1!./node_modules/vue-loader/lib??vue-loader-options!./src/components/select/option.vue?vue&type=script&lang=js&
//
//
//
//
//
//

/* harmony default export */ var optionvue_type_script_lang_js_ = ({
  name: 'nop-select-option',
  mixins: [emitter],
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
  data: function data() {
    return {
      selected: false,
      isFocus: false,
      hidden: false,
      index: undefined
    };
  },
  computed: {
    showLabel: function showLabel() {
      return this.label ? this.label : this.value;
    },
    title: function title() {
      var title;

      if (this.label !== undefined) {
        title = this.label;
      } else if (this.$slots.default) {
        title = this.getChildrenTextContent(this.$slots.default);
      } else if (this.value !== undefined || this.value !== null || this.value !== '') {
        title = this.value;
      }

      return title;
    },
    classes: function classes() {
      return {
        selected: this.selected,
        focus: this.isFocus,
        disabled: this.disabled
      };
    }
  },
  beforeDestroy: function beforeDestroy() {
    // 通知父层删除
    this.dispatch('nop-select', 'select-del', this);
  },
  methods: {
    select: function select() {
      if (this.disabled) {
        return false;
      }

      this.dispatch('nop-select', 'selected', this.value);
    },
    onSelectClose: function onSelectClose() {
      this.isFocus = false;
      this.hidden = false;
    },
    getChildrenTextContent: function (_getChildrenTextContent) {
      function getChildrenTextContent(_x) {
        return _getChildrenTextContent.apply(this, arguments);
      }

      getChildrenTextContent.toString = function () {
        return _getChildrenTextContent.toString();
      };

      return getChildrenTextContent;
    }(function (children) {
      return children.map(function (node) {
        return node.children ? getChildrenTextContent(node.children) : node.text;
      }).join('');
    }),
    onSelectFilter: function onSelectFilter(val) {
      var last = this.hidden;
      this.hidden = this.title.indexOf(val) === -1;
    },
    onSelecVisible: function onSelecVisible() {
      !this.hidden && this.select();
    },
    changeSelect: function changeSelect(val) {
      // debugger;
      if (val instanceof Array) {
        // debugger;
        this.selected = val.indexOf(this.value) !== -1;
      } else {
        this.selected = this.value === val;
      }
    }
  },
  mounted: function mounted() {
    this.$on('select-close', this.onSelectClose);
    this.$on('select-filter', this.onSelectFilter);
    this.$on('select-visible', this.onSelecVisible);
    this.$on('select', this.changeSelect);
    this.dispatch('nop-select', 'select-add', this);
  },
  created: function created() {}
});
// CONCATENATED MODULE: ./src/components/select/option.vue?vue&type=script&lang=js&
 /* harmony default export */ var select_optionvue_type_script_lang_js_ = (optionvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/select/option.vue





/* normalize component */

var option_component = normalizeComponent(
  select_optionvue_type_script_lang_js_,
  optionvue_type_template_id_5678f108_render,
  optionvue_type_template_id_5678f108_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var option_api; }
option_component.options.__file = "src/components/select/option.vue"
/* harmony default export */ var select_option = (option_component.exports);
// CONCATENATED MODULE: ./src/components/select/index.js



/* harmony default export */ var components_select = (select_select);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--1!./node_modules/vue-loader/lib??vue-loader-options!./src/components/pager/pager.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var pagervue_type_script_lang_js_prefix = 'nop';
/* harmony default export */ var pagervue_type_script_lang_js_ = ({
  name: 'nop-page',
  components: {
    Icon: components_icon,
    Select: components_select,
    Option: select_option
  },
  props: {
    prefixCls: {
      type: String,
      default: pagervue_type_script_lang_js_prefix
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
      default: function _default() {
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
  data: function data() {
    return {
      currentPage: this.current,
      currentPageSize: this.pageSize
    };
  },
  watch: {
    total: function total(val) {
      var maxPage = Math.ceil(val / this.currentPageSize);

      if (maxPage < this.currentPage && maxPage > 0) {
        this.currentPage = maxPage;
      }
    },
    current: function current(val) {
      // @NOTE 超过最大页数 则忽略设置
      if (val <= this.allPages) {
        this.currentPage = val;
      }
    },
    pageSize: function pageSize(val) {
      this.currentPageSize = val;
    }
  },
  computed: {
    // 样式相关
    // 最左侧上一页按钮
    prevClass: function prevClass() {
      return ['nop-pager-item', 'nop-pager-pre', defineProperty_default()({}, 'nop-pager-item-disabled', this.currentPage === 1)];
    },
    // 最右侧下一页按钮
    nextClass: function nextClass() {
      return ['nop-pager-item', 'nop-pager-next', defineProperty_default()({}, 'nop-pager-item-disabled', this.currentPage === this.allPages)];
    },
    // 首页
    firstPageClass: function firstPageClass() {
      return ['nop-pager-item', 'nop-pager-first', defineProperty_default()({}, 'nop-pager-item-active', this.currentPage === 1)];
    },
    // 末页
    lastPageClass: function lastPageClass() {
      return ['nop-pager-item', 'nop-pager-last', defineProperty_default()({}, 'nop-pager-item-active', this.currentPage === this.allPages)];
    },
    // END样式相关
    allPages: function allPages() {
      var allPage = Math.ceil(this.total / this.currentPageSize);
      return allPage === 0 ? 1 : allPage;
    }
  },
  methods: {
    // 外部设置页码 用于重置
    // @NOTE 这个方法不会通知外层 页码变更
    setPage: function setPage(page) {
      this.currentPage = page;
    },
    changePage: function changePage(page) {
      var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      if (this.currentPage != page) {
        this.currentPage = page; // @NOTE 父组件使用.sync 修饰符 可同步子组件prop状态 显式

        this.$emit('update:current', page);
        this.$emit('on-change', page);
      }
    },
    prev: function prev() {
      var current = this.currentPage;

      if (current <= 1) {
        return false;
      }

      this.changePage(current - 1);
    },
    next: function next() {
      var current = this.currentPage;

      if (current >= this.allPages) {
        return false;
      }

      this.changePage(current + 1);
    },
    fastPrev: function fastPrev() {
      var page = this.currentPage - 5;

      if (page > 0) {
        this.changePage(page);
      } else {
        this.changePage(1, 'size');
      }
    },
    fastNext: function fastNext() {
      var page = this.currentPage + 5;

      if (page > this.allPages) {
        this.changePage(this.allPages);
      } else {
        this.changePage(page);
      }
    },
    onSize: function onSize(pageSize) {
      this.currentPageSize = pageSize;
      this.$emit('on-page-size-change', pageSize); // this.$nextTick(() => {

      this.changePage(1); // });
    },
    onPage: function onPage(page) {
      this.changePage(page);
    },
    onInputChange: function onInputChange(event) {
      var val = event.target.value.trim();
      var page = 0;

      if (/^[1-9][0-9]*$/.test(val + '')) {
        val = Number(val);

        if (val != this.currentPage) {
          var allPages = this.allPages;

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
    keyDown: function keyDown(e) {
      var key = e.keyCode;
      var condition = key >= 48 && key <= 57 || key >= 96 && key <= 105 || key === 8 || key === 37 || key === 39;

      if (!condition) {
        e.preventDefault();
      }
    },
    keyUp: function keyUp(e) {
      var key = e.keyCode;
      var val = parseInt(e.target.value);

      if (key === 38) {
        this.prev();
      } else if (key === 40) {
        this.next();
      } else if (key === 13) {
        var page = 1;

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
});
// CONCATENATED MODULE: ./src/components/pager/pager.vue?vue&type=script&lang=js&
 /* harmony default export */ var pager_pagervue_type_script_lang_js_ = (pagervue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/pager/pager.vue





/* normalize component */

var pager_component = normalizeComponent(
  pager_pagervue_type_script_lang_js_,
  pagervue_type_template_id_6f81f917_render,
  pagervue_type_template_id_6f81f917_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var pager_api; }
pager_component.options.__file = "src/components/pager/pager.vue"
/* harmony default export */ var pager = (pager_component.exports);
// CONCATENATED MODULE: ./src/components/pager/index.js

/* harmony default export */ var components_pager = (pager);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/button/button.vue?vue&type=template&id=3ab8cd62&
var buttonvue_type_template_id_3ab8cd62_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "button",
    {
      class: _vm.boxlassName,
      attrs: { disabled: _vm.disabled },
      on: {
        click: function($event) {
          $event.preventDefault()
          return _vm.onClick($event)
        }
      }
    },
    [
      _vm.loading ? _c("i") : _vm._e(),
      _vm._v(" "),
      _vm.icon && !_vm.loading
        ? _c("Icon", {
            attrs: { type: _vm.icon, size: _vm.iconsize, color: _vm.iconcolor }
          })
        : _vm._e(),
      _vm._v(" "),
      _vm.showSlot ? _c("span", [_vm._t("default")], 2) : _vm._e()
    ],
    1
  )
}
var buttonvue_type_template_id_3ab8cd62_staticRenderFns = []
buttonvue_type_template_id_3ab8cd62_render._withStripped = true


// CONCATENATED MODULE: ./src/components/button/button.vue?vue&type=template&id=3ab8cd62&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--1!./node_modules/vue-loader/lib??vue-loader-options!./src/components/button/button.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//

var TypePrimary = 'primary';
var TypeDefault = 'default';
var SizeNormal = '';
var SizeBig = 'big';
var SizeSmall = 'small';
var TypeBlack = 'black';
/* harmony default export */ var buttonvue_type_script_lang_js_ = ({
  components: {
    Icon: components_icon
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
  data: function data() {
    return {};
  },
  computed: {
    boxlassName: function boxlassName() {
      var type = this.type,
          size = this.size;
      return ['nop-button', {
        'nop-button-default': type === TypeDefault
      }, "nop-button-size".concat(size), {
        'nop-button-black': type === TypeBlack
      }];
    }
  },
  methods: {
    onClick: function onClick(event) {
      this.$emit('click');
    }
  }
});
// CONCATENATED MODULE: ./src/components/button/button.vue?vue&type=script&lang=js&
 /* harmony default export */ var button_buttonvue_type_script_lang_js_ = (buttonvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/button/button.vue





/* normalize component */

var button_component = normalizeComponent(
  button_buttonvue_type_script_lang_js_,
  buttonvue_type_template_id_3ab8cd62_render,
  buttonvue_type_template_id_3ab8cd62_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var button_api; }
button_component.options.__file = "src/components/button/button.vue"
/* harmony default export */ var button_button = (button_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/button/linkButton.vue?vue&type=template&id=d623ab2e&
var linkButtonvue_type_template_id_d623ab2e_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "a",
    {
      class: _vm.calClass,
      attrs: { href: "javascript:void(0);" },
      on: { click: _vm.click }
    },
    [_vm._t("default")],
    2
  )
}
var linkButtonvue_type_template_id_d623ab2e_staticRenderFns = []
linkButtonvue_type_template_id_d623ab2e_render._withStripped = true


// CONCATENATED MODULE: ./src/components/button/linkButton.vue?vue&type=template&id=d623ab2e&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--1!./node_modules/vue-loader/lib??vue-loader-options!./src/components/button/linkButton.vue?vue&type=script&lang=js&
//
//
//
//
//
//
var TYPE_PRIMARY = 'primary';
var TYPE_DEFAULT = 'default';
/* harmony default export */ var linkButtonvue_type_script_lang_js_ = ({
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
    calClass: function calClass() {
      var type = this.type,
          disabled = this.disabled;
      return ['nop-link-btn', {
        disabled: disabled
      }, "link-btn_".concat(type)];
    }
  },
  methods: {
    click: function click() {
      if (!this.disabled) {
        this.$emit('click');
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/button/linkButton.vue?vue&type=script&lang=js&
 /* harmony default export */ var button_linkButtonvue_type_script_lang_js_ = (linkButtonvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/button/linkButton.vue





/* normalize component */

var linkButton_component = normalizeComponent(
  button_linkButtonvue_type_script_lang_js_,
  linkButtonvue_type_template_id_d623ab2e_render,
  linkButtonvue_type_template_id_d623ab2e_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var linkButton_api; }
linkButton_component.options.__file = "src/components/button/linkButton.vue"
/* harmony default export */ var linkButton = (linkButton_component.exports);
// CONCATENATED MODULE: ./src/components/button/index.js


/* harmony default export */ var components_button = (button_button);

// CONCATENATED MODULE: ./src/index.js
/* concated harmony reexport Breadcrumb */__webpack_require__.d(__webpack_exports__, "Breadcrumb", function() { return breadcrumb; });
/* concated harmony reexport BreadcrumbItem */__webpack_require__.d(__webpack_exports__, "BreadcrumbItem", function() { return breadcrumb_item; });
/* concated harmony reexport Button */__webpack_require__.d(__webpack_exports__, "Button", function() { return components_button; });
/* concated harmony reexport Icon */__webpack_require__.d(__webpack_exports__, "Icon", function() { return components_icon; });
/* concated harmony reexport LinkButton */__webpack_require__.d(__webpack_exports__, "LinkButton", function() { return linkButton; });
/* concated harmony reexport Modal */__webpack_require__.d(__webpack_exports__, "Modal", function() { return modal; });
/* concated harmony reexport Option */__webpack_require__.d(__webpack_exports__, "Option", function() { return select_option; });
/* concated harmony reexport Pager */__webpack_require__.d(__webpack_exports__, "Pager", function() { return components_pager; });
/* concated harmony reexport Toast */__webpack_require__.d(__webpack_exports__, "Toast", function() { return toast; });
/* concated harmony reexport Select */__webpack_require__.d(__webpack_exports__, "Select", function() { return components_select; });






var components = {
  Breadcrumb: breadcrumb,
  BreadcrumbItem: breadcrumb_item,
  Button: components_button,
  Icon: components_icon,
  LinkButton: linkButton,
  Modal: modal,
  Option: select_option,
  Pager: components_pager,
  Select: components_select
}; // @TODO 命名规范？
// 统一默认前缀

var src_install = function install(Vue) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  Object.keys(components).forEach(function (key) {
    // debugger;
    Vue.component(key, components[key]);
  }); // Confirm Toast加到全局 @TODO

  var _toastInstance = new toast();

  Vue.toast = Vue.prototype.$toast = _toastInstance;
};


/* harmony default export */ var src = __webpack_exports__["default"] = ({
  install: src_install
});

/***/ })
/******/ ]);
});
//# sourceMappingURL=nopvue.js.map