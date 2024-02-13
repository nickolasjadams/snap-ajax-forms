"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * SnapAjaxForms.js
 *
 * Instantly turn html form elements into ajax forms by just adding an attribute.
 * 
 * @author Nick Adams
 * @see {@link https://github.com/nickolasjadams/snap-ajax-forms|Repository}
 * @license MIT
 * @version 1.0.0
 */
var SnapAjaxForms = /*#__PURE__*/function () {
  function SnapAjaxForms(options) {
    _classCallCheck(this, SnapAjaxForms);
    this.selector = "form[data-ajax]";
    this.submitDisabledDuration = 1500;
    this.recaptcha = {
      version: "v3"
    };
    this.onDone = "";
    if (options) {
      if (options.selector) {
        this.selector = options.selector;
      }
      if (options.submitDisabledDuration) {
        this.submitDisabledDuration = options.submitDisabledDuration;
      }
      if (options.recaptcha) {
        this.recaptcha = _objectSpread(_objectSpread({}, this.recaptcha), options.recaptcha);
        if (parseInt(this.recaptcha.version)) {
          this.recaptcha.version = "v" + this.recaptcha.version;
        } else {
          this.recaptcha.version = this.recaptcha.version.toLowerCase();
        }
        if (this.recaptcha.version !== "v3") {
          console.warn("Only reCAPTCHA v3 is supported at this time.");
        }
        if (!this.recaptcha.siteKey) {
          console.warn("reCAPTCHA siteKey must be set.");
        }
      }
    }
    this.forms = document.querySelectorAll(this.selector);
    this.addFormEventListeners();
  }
  _createClass(SnapAjaxForms, [{
    key: "addFormEventListeners",
    value: function addFormEventListeners() {
      var _this = this;
      this.forms.forEach(function (form) {
        form.addEventListener("submit", function (e) {
          e.preventDefault();
          var form, data, submitter;
          //console.log(data);
          var _this$prepFormData = _this.prepFormData(this, e);
          var _this$prepFormData2 = _slicedToArray(_this$prepFormData, 3);
          form = _this$prepFormData2[0];
          data = _this$prepFormData2[1];
          submitter = _this$prepFormData2[2];
          if (form.dataset['ajaxRecaptcha'] === '') {
            if (typeof window['grecaptcha'] === "undefined") {
              console.warn("reCAPTCHA objects couldn't be found. Have the scripts been loaded?");
            } else {
              window['grecaptcha'].ready(function () {
                window['grecaptcha'].execute(_this.recaptcha.siteKey, {
                  action: 'submit'
                }).then(function (token) {
                  data['recaptcha_token'] = token;
                  _this.sendXhrRequest(form, data, submitter);
                });
              });
            }
          } else {
            _this.sendXhrRequest(form, data, submitter);
          }
        }, false);
      });
    }
  }, {
    key: "prepFormData",
    value: function prepFormData(form, submissionEvent) {
      this.onDone = window[form.getAttribute('data-ajax-done')];
      var submitter = submissionEvent.submitter;
      var formData = new FormData(form, submitter);
      if (submitter) {
        submitter.disabled = "disabled";
      }
      var data = {};
      var _iterator = _createForOfIteratorHelper(formData),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray(_step.value, 2),
            key = _step$value[0],
            value = _step$value[1];
          var formElements = document.querySelectorAll("[name='" + key + "']");
          if (formElements.length > 1) {
            // multiple elements with the same 'name' attribute
            var isSubmissionElement = formElements[0].tagName === "INPUT" && formElements[0].type === "submit" || formElements[0].tagName === "BUTTON" && formElements[0].type !== "button";
            var isRadioElement = formElements[0].tagName === "INPUT" && formElements[0].type === "radio";
            if (isSubmissionElement) {
              // Make scalar because only one element can submit the form
              data[key] = formData.get(key);
            } else if (isRadioElement) {
              // Make scalar because only one item is selected
              data[key] = formData.get(key);
            } else {
              // Make an array because this is assumed to be checkboxes
              data[key] = formData.getAll(key);
            }
          } else {
            var isMultipleSelect = formElements[0].tagName === "SELECT" && formElements[0].attributes["multiple"];
            var isMultipleFiles = formElements[0].tagName === "INPUT" && formElements[0].attributes["multiple"];
            if (isMultipleSelect) {
              // Make an array because multiple values are assumed available
              data[key] = formData.getAll(key);
            } else if (isMultipleFiles) {
              data[key] = formData.getAll(key);
            } else {
              data[key] = formData.get(key);
            }
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return [form, data, submitter];
    }
  }, {
    key: "sendXhrRequest",
    value: function sendXhrRequest(form, data, submitter) {
      var _this = this;
      $.ajax({
        url: form.action,
        method: form.method,
        data: data,
        processData: false,
        // don't transform FormData object to string
        contentType: false,
        // don't transform FormData object to string
        beforeSend: function beforeSend() {
          if (submitter) {
            setTimeout(function () {
              submitter.removeAttribute("disabled");
            }, _this.submitDisabledDuration);
          }
        }
      }).fail(function (data) {
        if (data.responseJSON || data.errors) {
          var errors;
          if (data.responseJSON) {
            if (data.responseJSON.errors) {
              errors = data.responseJSON.errors;
            }
          } else if (data.errors) {
            errors = data.errors;
          }
          form.querySelectorAll("[data-ajax-errors]").forEach(function (errorElement) {
            errorElement.innerHTML = "";
          });
          if (errors) {
            Object.entries(errors).forEach(function (entry) {
              var key = entry[0];
              var messages = entry[1]['messages'];
              var errorElement = form.querySelector("[data-ajax-errors=\"".concat(key, "\"]"));
              if (errorElement) {
                messages.forEach(function (message) {
                  errorElement.insertAdjacentHTML("afterbegin", "<div>".concat(message, "</div>"));
                });
              }
            });
          }
        }
      }).done(function (data) {
        form.reset();
        document.querySelectorAll("[data-ajax-errors]").forEach(function (element) {
          element.innerHTML = "";
        });
        if (typeof _this.onDone === "function") _this.onDone(data);
        if (form.id) {
          // Make the id kebab-case
          var id = form.id.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, '-').toLowerCase();
          form.dispatchEvent(new CustomEvent(id + "-submit"), {
            detail: data
          });
        }
      });
    }
  }]);
  return SnapAjaxForms;
}();
