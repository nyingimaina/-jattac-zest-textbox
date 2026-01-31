'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "/* === Base Textbox Styles (input & textarea) === */\n.ZestTextbox-module_textbox__0M5Wq {\n  font-family: \"Segoe UI\", Roboto, sans-serif;\n  font-weight: 500;\n  line-height: 1.25;\n  border: 1px solid #ccc;\n  border-radius: 0.5rem; /* 8px */\n  color: #111827;\n  background-color: #ffffff;\n  transition: border-color 0.2s ease, box-shadow 0.2s ease;\n  display: inline-block;\n  width: auto;\n  box-sizing: border-box;\n  resize: none;\n  font-size: 1rem; /* 16px */\n  padding-bottom: 2rem; /* 32px */\n}\n\n.ZestTextbox-module_textbox__0M5Wq:focus {\n  outline: none;\n  border-color: #8B5CF6;\n  box-shadow: 0 0 0 0.125rem rgba(139, 92, 246, 0.25); /* 2px */\n  animation: ZestTextbox-module_pulse-light__CKfhA 0.5s 1;\n}\n\n/* === Sizes === */\n.ZestTextbox-module_sm__yyxXO {\n  padding: 0.5rem 0.75rem; /* 8px 12px */\n  font-size: 0.875rem; /* 14px */\n}\n\n.ZestTextbox-module_md__fvL10 {\n  padding: 0.625rem 0.875rem; /* 10px 14px */\n  font-size: 1rem; /* 16px */\n}\n\n.ZestTextbox-module_lg__fU93- {\n  padding: 0.75rem 1rem; /* 12px 16px */\n  font-size: 1.125rem; /* 18px */\n}\n\n/* === Full Width === */\n.ZestTextbox-module_fullWidth__xn4fT {\n  width: 100%;\n}\n\n/* === Disabled State === */\n.ZestTextbox-module_textbox__0M5Wq:disabled {\n  background-color: #f3f4f6;\n  color: #9ca3af;\n  cursor: not-allowed;\n  pointer-events: none;\n  border-color: #d1d5db;\n}\n\n/* === Multiline (textarea) specific enhancements === */\ntextarea.ZestTextbox-module_textbox__0M5Wq {\n  min-height: 6.25rem; /* 100px */\n  line-height: 1.5;\n  resize: vertical;\n}\n\n.ZestTextbox-module_wrapper__0ok2A {\n  position: relative;\n  display: inline-block;\n}\n\n.ZestTextbox-module_counter__waqIT {\n  position: absolute;\n  right: 0.625rem; /* 10px */\n  bottom: 0.375rem; /* 6px */\n  font-size: 0.75rem;\n  color: #6b7280;\n  pointer-events: none;\n  user-select: none;\n}\n\n/* === Dark Mode Support === */\n.dark .ZestTextbox-module_textbox__0M5Wq {\n  background-color: #1f2937;\n  border-color: #374151;\n  color: #f3f4f6;\n}\n\n.dark .ZestTextbox-module_textbox__0M5Wq:focus {\n  border-color: #A78BFA;\n  box-shadow: 0 0 0 0.125rem rgba(167, 139, 250, 0.35); /* 2px */\n  animation: ZestTextbox-module_pulse-dark__L9PYJ 0.5s 1;\n}\n\n.dark .ZestTextbox-module_textbox__0M5Wq:disabled {\n  background-color: #374151;\n  color: #9ca3af;\n  border-color: #4b5563;\n}\n\n.dark .ZestTextbox-module_counter__waqIT {\n  color: #9ca3af;\n}\n\n/* === Password Toggle === */\n.ZestTextbox-module_passwordToggle__I2s4O {\n  position: absolute;\n  right: 0.625rem; /* 10px */\n  top: 50%;\n  transform: translateY(-50%);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #6b7280;\n}\n\n.ZestTextbox-module_eyeIcon__rKiBL {\n  width: 1.25em;\n  height: 1.25em;\n  transition: transform 0.2s ease-in-out;\n}\n\n.ZestTextbox-module_rotate__Ajx19 {\n  transform: rotate(180deg);\n}\n\n.ZestTextbox-module_tooltip__etRdj {\n  position: absolute;\n  right: 100%;\n  top: 50%;\n  transform: translateY(-50%);\n  background-color: #333;\n  color: #fff;\n  padding: 0.25rem 0.5rem; /* 4px 8px */\n  border-radius: 0.25rem; /* 4px */\n  font-size: 0.75rem;\n  white-space: nowrap;\n  margin-right: 0.5rem; /* 8px */\n  opacity: 0;\n  visibility: hidden;\n  transition: opacity 0.2s ease, visibility 0.2s ease;\n}\n\n.ZestTextbox-module_passwordToggle__I2s4O:hover .ZestTextbox-module_tooltip__etRdj {\n  opacity: 1;\n  visibility: visible;\n}\n\n.dark .ZestTextbox-module_passwordToggle__I2s4O {\n  color: #9ca3af;\n}\n\n.dark .ZestTextbox-module_tooltip__etRdj {\n  background-color: #4b5563;\n  color: #f3f4f6;\n}\n\n/* === Progress Bar === */\n.ZestTextbox-module_progressBarContainer__0qFKf {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 0.1875rem; /* 3px */\n  background-color: #e5e7eb;\n  border-bottom-left-radius: 0.5rem; /* 8px */\n  border-bottom-right-radius: 0.5rem; /* 8px */\n  overflow: hidden;\n}\n\n.ZestTextbox-module_progressBar__vwttj {\n  height: 100%;\n  background-color: #8B5CF6;\n  transition: width 0.2s ease, background-color 0.3s ease;\n}\n\n/* === Animated Counter Colors === */\n.ZestTextbox-module_counterYellow__uYGfs {\n  color: #A78BFA;\n}\n\n.ZestTextbox-module_counterOrange__b9baX {\n  color: #8B5CF6;\n}\n\n.dark .ZestTextbox-module_progressBarContainer__0qFKf {\n  background-color: #374151;\n}\n\n.dark .ZestTextbox-module_progressBar__vwttj {\n  background-color: #A78BFA;\n}\n\n.dark .ZestTextbox-module_counterYellow__uYGfs {\n  color: #C4B5FD;\n}\n\n.dark .ZestTextbox-module_counterOrange__b9baX {\n  color: #A78BFA;\n}\n\n@keyframes ZestTextbox-module_pulse-light__CKfhA {\n  0% {\n    box-shadow: 0 0 0 0.125rem rgba(139, 92, 246, 0.25); /* 2px */\n  }\n  50% {\n    box-shadow: 0 0 0 0.25rem rgba(139, 92, 246, 0.35); /* 4px */\n  }\n  100% {\n    box-shadow: 0 0 0 0.125rem rgba(139, 92, 246, 0.25); /* 2px */\n  }\n}\n\n@keyframes ZestTextbox-module_pulse-dark__L9PYJ {\n  0% {\n    box-shadow: 0 0 0 0.125rem rgba(167, 139, 250, 0.35); /* 2px */\n  }\n  50% {\n    box-shadow: 0 0 0 0.25rem rgba(167, 139, 250, 0.45); /* 4px */\n  }\n  100% {\n    box-shadow: 0 0 0 0.125rem rgba(167, 139, 250, 0.35); /* 2px */\n  }\n}\n\n/* === Media Queries for Responsive Design === */\n@media (min-width: 48rem) { /* 768px */\n  /* Tablet */\n  .ZestTextbox-module_sm__yyxXO {\n    font-size: 0.875rem; /* 14px */\n  }\n  .ZestTextbox-module_md__fvL10 {\n    font-size: 1rem; /* 16px */\n  }\n  .ZestTextbox-module_lg__fU93- {\n    font-size: 1.125rem; /* 18px */\n  }\n}\n\n@media (min-width: 64rem) { /* 1024px */\n  /* Desktop */\n  .ZestTextbox-module_sm__yyxXO {\n    padding: 0.375rem 0.625rem; /* 6px 10px */\n    font-size: 0.875rem; /* 14px */\n  }\n  .ZestTextbox-module_md__fvL10 {\n    padding: 0.625rem 0.875rem; /* 10px 14px */\n    font-size: 1rem; /* 16px */\n  }\n  .ZestTextbox-module_lg__fU93- {\n    padding: 0.75rem 1rem; /* 12px 16px */\n    font-size: 1.125rem; /* 18px */\n  }\n}\n";
var styles = {"textbox":"ZestTextbox-module_textbox__0M5Wq","pulse-light":"ZestTextbox-module_pulse-light__CKfhA","sm":"ZestTextbox-module_sm__yyxXO","md":"ZestTextbox-module_md__fvL10","lg":"ZestTextbox-module_lg__fU93-","fullWidth":"ZestTextbox-module_fullWidth__xn4fT","wrapper":"ZestTextbox-module_wrapper__0ok2A","counter":"ZestTextbox-module_counter__waqIT","pulse-dark":"ZestTextbox-module_pulse-dark__L9PYJ","passwordToggle":"ZestTextbox-module_passwordToggle__I2s4O","eyeIcon":"ZestTextbox-module_eyeIcon__rKiBL","rotate":"ZestTextbox-module_rotate__Ajx19","tooltip":"ZestTextbox-module_tooltip__etRdj","progressBarContainer":"ZestTextbox-module_progressBarContainer__0qFKf","progressBar":"ZestTextbox-module_progressBar__vwttj","counterYellow":"ZestTextbox-module_counterYellow__uYGfs","counterOrange":"ZestTextbox-module_counterOrange__b9baX"};
styleInject(css_248z);

var IconEyeOpen = function (props) { return (jsxRuntime.jsxs("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", viewBox: "0 0 16 16" }, props, { children: [jsxRuntime.jsx("path", { d: "M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" }), jsxRuntime.jsx("path", { d: "M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" })] }))); };

var IconEyeSlashed = function (props) { return (jsxRuntime.jsxs("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", viewBox: "0 0 16 16" }, props, { children: [jsxRuntime.jsx("path", { d: "M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" }), jsxRuntime.jsx("path", { d: "M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.288.822.822.073.073.026.026a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829l.822.822zm-2.943-1.288.822.822.073.073.026.026a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829l.822.822z" }), jsxRuntime.jsx("path", { d: "M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.88 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 6.854-12-12 .708-.708 12 12-.708.708z" })] }))); };

var ZestTextbox = function (props) {
    var _a = props.zSize, zSize = _a === void 0 ? "md" : _a, _b = props.stretch, fullWidth = _b === void 0 ? false : _b, _c = props.className, className = _c === void 0 ? "" : _c, maxLength = props.maxLength, onChange = props.onChange, onTextChanged = props.onTextChanged, type = props.type, _d = props.showProgressBar, showProgressBar = _d === void 0 ? false : _d, _e = props.animatedCounter, animatedCounter = _e === void 0 ? false : _e, _f = props.theme, theme = _f === void 0 ? "system" : _f, rest = __rest(props, ["zSize", "stretch", "className", "maxLength", "onChange", "onTextChanged", "type", "showProgressBar", "animatedCounter", "theme"]);
    var _g = react.useState(""), value = _g[0], setValue = _g[1];
    var _h = react.useState(false), isDark = _h[0], setIsDark = _h[1];
    var _j = react.useState(false), isPasswordVisible = _j[0], setIsPasswordVisible = _j[1];
    // === Advanced Theme Control ===
    react.useEffect(function () {
        if (theme === "dark") {
            setIsDark(true);
            return;
        }
        if (theme === "light") {
            setIsDark(false);
            return;
        }
        // System theme
        var mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        var handleChange = function () { return setIsDark(mediaQuery.matches); };
        handleChange(); // Set initial theme
        mediaQuery.addEventListener("change", handleChange);
        return function () { return mediaQuery.removeEventListener("change", handleChange); };
    }, [theme]);
    var classList = [
        styles.textbox,
        styles[zSize],
        fullWidth ? styles.fullWidth : "",
        className,
        isDark ? styles.dark : "",
    ]
        .filter(Boolean)
        .join(" ");
    var handleInputChange = function (e) {
        var newValue = e.target.value;
        if (isNumeric) {
            // Allow digits, a single leading hyphen, and a single decimal point
            var parts = newValue.split('.');
            var integerPart = parts[0].replace(/[^0-9-]/g, '');
            var decimalPart = parts.length > 1 ? '.' + parts[1].replace(/[^0-9]/g, '') : '';
            // Ensure only one leading hyphen
            if (integerPart.startsWith('-')) {
                integerPart = '-' + integerPart.substring(1).replace(/-/g, '');
            }
            else {
                integerPart = integerPart.replace(/-/g, '');
            }
            newValue = integerPart + decimalPart;
            // Prevent multiple decimal points
            if (newValue.indexOf('.') !== newValue.lastIndexOf('.')) {
                newValue = newValue.substring(0, newValue.lastIndexOf('.'));
            }
        }
        if (maxLength !== undefined && newValue.length > maxLength)
            return;
        setValue(newValue);
        if (onChange)
            onChange(e); // cast because it could be input or textarea
        if (onTextChanged)
            onTextChanged(newValue);
    };
    var isPassword = type === "password";
    var isNumeric = type === "number" || type === "tel";
    var inputType = isPassword && isPasswordVisible ? "text" : isNumeric ? "tel" : type;
    var commonProps = __assign({ className: classList, maxLength: maxLength, onChange: handleInputChange, value: value, type: inputType }, rest);
    var showCounter = typeof maxLength === "number";
    var charPercentage = showCounter ? (value.length / maxLength) * 100 : 0;
    var counterColorClass = animatedCounter
        ? charPercentage > 90
            ? styles.counterOrange
            : charPercentage > 70
                ? styles.counterYellow
                : ""
        : "";
    return (jsxRuntime.jsxs("div", { className: styles.wrapper, children: ["isMultiline" in props && props.isMultiline ? (jsxRuntime.jsx("textarea", __assign({}, commonProps))) : (jsxRuntime.jsx("input", __assign({}, commonProps))), showCounter && (jsxRuntime.jsxs("div", { className: "".concat(styles.counter, " ").concat(counterColorClass), children: [value.length, " / ", maxLength] })), isPassword && (jsxRuntime.jsxs("div", { className: styles.passwordToggle, onClick: function () { return setIsPasswordVisible(!isPasswordVisible); }, children: [jsxRuntime.jsx("div", { className: styles.tooltip, children: isPasswordVisible ? "Hide password" : "Show password" }), isPasswordVisible ? (jsxRuntime.jsx(IconEyeOpen, { className: styles.eyeIcon })) : (jsxRuntime.jsx(IconEyeSlashed, { className: styles.eyeIcon }))] })), showProgressBar && showCounter && (jsxRuntime.jsx("div", { className: styles.progressBarContainer, children: jsxRuntime.jsx("div", { className: "".concat(styles.progressBar, " ").concat(counterColorClass), style: { width: "".concat(charPercentage, "%") } }) }))] }));
};

module.exports = ZestTextbox;
//# sourceMappingURL=index.js.map
