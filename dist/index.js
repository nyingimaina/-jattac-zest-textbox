'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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

var css_248z = "/* === Base Textbox Styles (input & textarea) === */\r\n.ZestTextbox-module_textbox__0M5Wq {\r\n  font-family: \"Segoe UI\", Roboto, sans-serif;\r\n  font-weight: 500;\r\n  line-height: 1.25;\r\n  border: 1px solid #ccc;\r\n  border-radius: 0.5rem; /* 8px */\r\n  color: #111827;\r\n  background-color: #ffffff;\r\n  transition: border-color 0.2s ease, box-shadow 0.2s ease;\r\n  display: inline-block;\r\n  width: auto;\r\n  box-sizing: border-box;\r\n  resize: none;\r\n  font-size: 1rem; /* 16px */\r\n  padding-bottom: 0.5rem; /* Reduced padding to make space for progress bar */\r\n}\r\n\r\n.ZestTextbox-module_textbox__0M5Wq:focus {\r\n  outline: none;\r\n  border-color: #8B5CF6;\r\n  box-shadow: 0 0 0 0.125rem rgba(139, 92, 246, 0.25); /* 2px */\r\n  animation: ZestTextbox-module_pulse-light__CKfhA 0.5s 1;\r\n}\r\n\r\n/* === Error State === */\r\n.ZestTextbox-module_error__5RoCP {\r\n  border-color: #ef4444; /* Red-500 */\r\n  box-shadow: 0 0 0 0.125rem rgba(239, 68, 68, 0.25); /* Red-500 with 25% opacity */\r\n}\r\n\r\n.ZestTextbox-module_error__5RoCP:focus {\r\n  border-color: #ef4444;\r\n  box-shadow: 0 0 0 0.125rem rgba(239, 68, 68, 0.35);\r\n}\r\n\r\n/* === Sizes === */\r\n.ZestTextbox-module_sm__yyxXO {\r\n  padding: 0.5rem 0.75rem; /* 8px 12px */\r\n  font-size: 0.875rem; /* 14px */\r\n}\r\n\r\n.ZestTextbox-module_md__fvL10 {\r\n  padding: 0.625rem 0.875rem; /* 10px 14px */\r\n  font-size: 1rem; /* 16px */\r\n}\r\n\r\n.ZestTextbox-module_lg__fU93- {\r\n  padding: 0.75rem 1rem; /* 12px 16px */\r\n  font-size: 1.125rem; /* 18px */\r\n}\r\n\r\n/* === Full Width === */\r\n.ZestTextbox-module_fullWidth__xn4fT {\r\n  width: 100%;\r\n}\r\n\r\n/* === Disabled State === */\r\n.ZestTextbox-module_textbox__0M5Wq:disabled {\r\n  background-color: #f3f4f6;\r\n  color: #9ca3af;\r\n  cursor: not-allowed;\r\n  pointer-events: none;\r\n  border-color: #d1d5db;\r\n}\r\n\r\n/* === Multiline (textarea) specific enhancements === */\r\ntextarea.ZestTextbox-module_textbox__0M5Wq {\r\n  min-height: 6.25rem; /* 100px */\r\n  line-height: 1.5;\r\n  resize: vertical;\r\n}\r\n\r\n.ZestTextbox-module_wrapper__0ok2A {\r\n  position: relative;\r\n  display: inline-block;\r\n}\r\n\r\n.ZestTextbox-module_counter__waqIT {\r\n  position: absolute;\r\n  right: 0.625rem; /* 10px */\r\n  bottom: 0.375rem; /* 6px */\r\n  font-size: 0.75rem;\r\n  color: #6b7280;\r\n  pointer-events: none;\r\n  user-select: none;\r\n}\r\n\r\n/* === Dark Mode Support === */\r\n.dark .ZestTextbox-module_textbox__0M5Wq {\r\n  background-color: #1f2937;\r\n  border-color: #374151;\r\n  color: #f3f4f6;\r\n}\r\n\r\n.dark .ZestTextbox-module_textbox__0M5Wq:focus {\r\n  border-color: #A78BFA;\r\n  box-shadow: 0 0 0 0.125rem rgba(167, 139, 250, 0.35); /* 2px */\r\n  animation: ZestTextbox-module_pulse-dark__L9PYJ 0.5s 1;\r\n}\r\n\r\n.dark .ZestTextbox-module_textbox__0M5Wq:disabled {\r\n  background-color: #374151;\r\n  color: #9ca3af;\r\n  border-color: #4b5563;\r\n}\r\n\r\n.dark .ZestTextbox-module_counter__waqIT {\r\n  color: #9ca3af;\r\n}\r\n\r\n.dark .ZestTextbox-module_error__5RoCP {\r\n  border-color: #f87171; /* Red-400 for dark mode */\r\n  box-shadow: 0 0 0 0.125rem rgba(248, 113, 113, 0.35);\r\n}\r\n\r\n.dark .ZestTextbox-module_error__5RoCP:focus {\r\n  border-color: #f87171;\r\n  box-shadow: 0 0 0 0.125rem rgba(248, 113, 113, 0.45);\r\n}\r\n\r\n/* === Password Toggle === */\r\n.ZestTextbox-module_passwordToggle__I2s4O {\r\n  position: absolute;\r\n  right: 0.625rem; /* 10px */\r\n  top: 50%;\r\n  transform: translateY(-50%);\r\n  cursor: pointer;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  color: #6b7280;\r\n}\r\n\r\n.ZestTextbox-module_eyeIcon__rKiBL {\r\n  width: 1.25em;\r\n  height: 1.25em;\r\n  transition: transform 0.2s ease-in-out;\r\n}\r\n\r\n.ZestTextbox-module_rotate__Ajx19 {\r\n  transform: rotate(180deg);\r\n}\r\n\r\n.ZestTextbox-module_tooltip__etRdj {\r\n  position: absolute;\r\n  right: 100%;\r\n  top: 50%;\r\n  transform: translateY(-50%);\r\n  background-color: #333;\r\n  color: #fff;\r\n  padding: 0.25rem 0.5rem; /* 4px 8px */\r\n  border-radius: 0.25rem; /* 4px */\r\n  font-size: 0.75rem;\r\n  white-space: nowrap;\r\n  margin-right: 0.5rem; /* 8px */\r\n  opacity: 0;\r\n  visibility: hidden;\r\n  transition: opacity 0.2s ease, visibility 0.2s ease;\r\n}\r\n\r\n.ZestTextbox-module_passwordToggle__I2s4O:hover .ZestTextbox-module_tooltip__etRdj {\r\n  opacity: 1;\r\n  visibility: visible;\r\n}\r\n\r\n.dark .ZestTextbox-module_passwordToggle__I2s4O {\r\n  color: #9ca3af;\r\n}\r\n\r\n.dark .ZestTextbox-module_tooltip__etRdj {\r\n  background-color: #4b5563;\r\n  color: #f3f4f6;\r\n}\r\n\r\n/* === Progress Bar === */\r\n.ZestTextbox-module_progressBarContainer__0qFKf {\r\n  position: absolute;\r\n  bottom: 0;\r\n  left: 0;\r\n  right: 0;\r\n  height: 0.1875rem; /* 3px */\r\n  background-color: #e5e7eb;\r\n  border-bottom-left-radius: 0.5rem; /* 8px */\r\n  border-bottom-right-radius: 0.5rem; /* 8px */\r\n  overflow: hidden;\r\n}\r\n\r\n.ZestTextbox-module_progressBar__vwttj {\r\n  height: 100%;\r\n  background-color: #8B5CF6;\r\n  transition: width 0.2s ease, background-color 0.3s ease;\r\n}\r\n\r\n/* === Animated Counter Colors === */\r\n.ZestTextbox-module_counterYellow__uYGfs {\r\n  color: #A78BFA;\r\n}\r\n\r\n.ZestTextbox-module_counterOrange__b9baX {\r\n  color: #8B5CF6;\r\n}\r\n\r\n.dark .ZestTextbox-module_progressBarContainer__0qFKf {\r\n  background-color: #374151;\r\n}\r\n\r\n.dark .ZestTextbox-module_progressBar__vwttj {\r\n  background-color: #A78BFA;\r\n}\r\n\r\n.dark .ZestTextbox-module_counterYellow__uYGfs {\r\n  color: #C4B5FD;\r\n}\r\n\r\n.dark .ZestTextbox-module_counterOrange__b9baX {\r\n  color: #A78BFA;\r\n}\r\n\r\n@keyframes ZestTextbox-module_pulse-light__CKfhA {\r\n  0% {\r\n    box-shadow: 0 0 0 0.125rem rgba(139, 92, 246, 0.25); /* 2px */\r\n  }\r\n  50% {\r\n    box-shadow: 0 0 0 0.25rem rgba(139, 92, 246, 0.35); /* 4px */\r\n  }\r\n  100% {\r\n    box-shadow: 0 0 0 0.125rem rgba(139, 92, 246, 0.25); /* 2px */\r\n  }\r\n}\r\n\r\n@keyframes ZestTextbox-module_pulse-dark__L9PYJ {\r\n  0% {\r\n    box-shadow: 0 0 0 0.125rem rgba(167, 139, 250, 0.35); /* 2px */\r\n  }\r\n  50% {\r\n    box-shadow: 0 0 0 0.25rem rgba(167, 139, 250, 0.45); /* 4px */\r\n  }\r\n  100% {\r\n    box-shadow: 0 0 0 0.125rem rgba(167, 139, 250, 0.35); /* 2px */\r\n  }\r\n}\r\n\r\n/* === Media Queries for Responsive Design === */\r\n@media (min-width: 48rem) { /* 768px */\r\n  /* Tablet */\r\n  .ZestTextbox-module_sm__yyxXO {\r\n    font-size: 0.875rem; /* 14px */\r\n  }\r\n  .ZestTextbox-module_md__fvL10 {\r\n    font-size: 1rem; /* 16px */\r\n  }\r\n  .ZestTextbox-module_lg__fU93- {\r\n    font-size: 1.125rem; /* 18px */\r\n  }\r\n}\r\n\r\n@media (min-width: 64rem) { /* 1024px */\r\n  /* Desktop */\r\n  .ZestTextbox-module_sm__yyxXO {\r\n    padding: 0.375rem 0.625rem; /* 6px 10px */\r\n    font-size: 0.875rem; /* 14px */\r\n  }\r\n  .ZestTextbox-module_md__fvL10 {\r\n    padding: 0.625rem 0.875rem; /* 10px 14px */\r\n    font-size: 1rem; /* 16px */\r\n  }\r\n  .ZestTextbox-module_lg__fU93- {\r\n    padding: 0.75rem 1rem; /* 12px 16px */\r\n    font-size: 1.125rem; /* 18px */\r\n  }\r\n}\r\n\r\n/* === Helper Text === */\r\n.ZestTextbox-module_helperText__4twSg {\r\n  font-size: 0.875rem; /* 14px */\r\n  color: #6b7280;\r\n  margin-top: 0.25rem; /* 4px */\r\n  animation: ZestTextbox-module_fade-slide-in__re-Ln 0.3s ease-out forwards;\r\n}\r\n\r\n.dark .ZestTextbox-module_helperText__4twSg {\r\n  color: #9ca3af;\r\n}\r\n\r\n@keyframes ZestTextbox-module_fade-slide-in__re-Ln {\r\n  from {\r\n    opacity: 0;\r\n    transform: translateY(5px);\r\n  }\r\n  to {\r\n    opacity: 1;\r\n    transform: translateY(0);\r\n  }\r\n}";
var styles = {"textbox":"ZestTextbox-module_textbox__0M5Wq","pulse-light":"ZestTextbox-module_pulse-light__CKfhA","error":"ZestTextbox-module_error__5RoCP","sm":"ZestTextbox-module_sm__yyxXO","md":"ZestTextbox-module_md__fvL10","lg":"ZestTextbox-module_lg__fU93-","fullWidth":"ZestTextbox-module_fullWidth__xn4fT","wrapper":"ZestTextbox-module_wrapper__0ok2A","counter":"ZestTextbox-module_counter__waqIT","pulse-dark":"ZestTextbox-module_pulse-dark__L9PYJ","passwordToggle":"ZestTextbox-module_passwordToggle__I2s4O","eyeIcon":"ZestTextbox-module_eyeIcon__rKiBL","rotate":"ZestTextbox-module_rotate__Ajx19","tooltip":"ZestTextbox-module_tooltip__etRdj","progressBarContainer":"ZestTextbox-module_progressBarContainer__0qFKf","progressBar":"ZestTextbox-module_progressBar__vwttj","counterYellow":"ZestTextbox-module_counterYellow__uYGfs","counterOrange":"ZestTextbox-module_counterOrange__b9baX","helperText":"ZestTextbox-module_helperText__4twSg","fade-slide-in":"ZestTextbox-module_fade-slide-in__re-Ln"};
styleInject(css_248z);

var filterNumericInput = function (value) {
    // Allow digits, a single leading hyphen, and a single decimal point
    var parts = value.split('.');
    var integerPart = parts[0].replace(/[^0-9-]/g, '');
    var decimalPart = parts.length > 1 ? '.' + parts[1].replace(/[^0-9]/g, '') : '';
    // Ensure only one leading hyphen
    if (integerPart.startsWith('-')) {
        integerPart = '-' + integerPart.substring(1).replace(/-/g, '');
    }
    else {
        integerPart = integerPart.replace(/-/g, '');
    }
    var newValue = integerPart + decimalPart;
    // Prevent multiple decimal points
    if (newValue.indexOf('.') !== -1 && newValue.indexOf('.') !== newValue.lastIndexOf('.')) {
        newValue = newValue.substring(0, newValue.lastIndexOf('.'));
    }
    return newValue;
};

var useThemeDetector = function (theme) {
    if (theme === void 0) { theme = "system"; }
    var _a = react.useState(false), isDark = _a[0], setIsDark = _a[1];
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
    return isDark;
};

var usePasswordVisibility = function (isPasswordType) {
    var _a = react.useState(false), isPasswordVisible = _a[0], setIsPasswordVisible = _a[1];
    var togglePasswordVisibility = function () {
        if (isPasswordType) {
            setIsPasswordVisible(function (prev) { return !prev; });
        }
    };
    return { isPasswordVisible: isPasswordVisible, togglePasswordVisibility: togglePasswordVisibility };
};

var useCharacterCounter = function (value, maxLength, animatedCounter) {
    var currentLength = value.length;
    var showCounter = typeof maxLength === "number";
    var charPercentage = showCounter ? (currentLength / maxLength) * 100 : 0;
    var counterColorClass = react.useMemo(function () {
        if (!animatedCounter || !showCounter)
            return "";
        if (charPercentage > 90) {
            return styles.counterOrange;
        }
        else if (charPercentage > 70) {
            return styles.counterYellow;
        }
        return "";
    }, [animatedCounter, showCounter, charPercentage]);
    return { currentLength: currentLength, charPercentage: charPercentage, counterColorClass: counterColorClass, showCounter: showCounter };
};

var useHelperText = function (value, parsedValue, props, helperTextConfig) {
    var _a = react.useState(null), helperTextNode = _a[0], setHelperTextNode = _a[1];
    var type = props.type, maxLength = props.maxLength;
    var _b = helperTextConfig || {}, formatter = _b.formatter, templater = _b.templater;
    react.useEffect(function () {
        if (!helperTextConfig) {
            setHelperTextNode(null);
            return;
        }
        var context = { value: value, parsedValue: parsedValue, props: props };
        var formatted = formatter
            ? formatter(context)
            : value; // Fallback to raw value if no formatter
        var finalNode = templater
            ? templater(formatted, context)
            : formatted;
        setHelperTextNode(finalNode);
    }, [value, parsedValue, type, maxLength, formatter, templater, helperTextConfig]);
    return helperTextNode;
};

var IconEyeOpen = function (props) { return (jsxRuntime.jsxs("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", viewBox: "0 0 16 16" }, props, { children: [jsxRuntime.jsx("path", { d: "M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" }), jsxRuntime.jsx("path", { d: "M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" })] }))); };

var IconEyeSlashed = function (props) { return (jsxRuntime.jsxs("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", viewBox: "0 0 16 16" }, props, { children: [jsxRuntime.jsx("path", { d: "M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" }), jsxRuntime.jsx("path", { d: "M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.288.822.822.073.073.026.026a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829l.822.822zm-2.943-1.288.822.822.073.073.026.026a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829l.822.822z" }), jsxRuntime.jsx("path", { d: "M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.88 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 6.854-12-12 .708-.708 12 12-.708.708z" })] }))); };

var PasswordToggleButton = function (_a) {
    var isPassword = _a.isPassword, isPasswordVisible = _a.isPasswordVisible, onToggle = _a.onToggle;
    if (!isPassword)
        return null;
    return (jsxRuntime.jsxs("div", { className: styles.passwordToggle, onClick: onToggle, children: [jsxRuntime.jsx("div", { className: styles.tooltip, children: isPasswordVisible ? "Hide password" : "Show password" }), isPasswordVisible ? (jsxRuntime.jsx(IconEyeOpen, { className: styles.eyeIcon })) : (jsxRuntime.jsx(IconEyeSlashed, { className: styles.eyeIcon }))] }));
};

var CharacterCounter = function (_a) {
    var showCounter = _a.showCounter, currentLength = _a.currentLength, maxLength = _a.maxLength, counterColorClass = _a.counterColorClass;
    if (!showCounter)
        return null;
    return (jsxRuntime.jsxs("div", { className: "".concat(styles.counter, " ").concat(counterColorClass), children: [currentLength, " / ", maxLength] }));
};

var ProgressBar = function (_a) {
    var showProgressBar = _a.showProgressBar, showCounter = _a.showCounter, charPercentage = _a.charPercentage, counterColorClass = _a.counterColorClass;
    if (!showProgressBar || !showCounter)
        return null;
    return (jsxRuntime.jsx("div", { className: styles.progressBarContainer, children: jsxRuntime.jsx("div", { className: "".concat(styles.progressBar, " ").concat(counterColorClass), style: { width: "".concat(charPercentage, "%") } }) }));
};

var HelperTextDisplay = function (_a) {
    var helperTextNode = _a.helperTextNode, className = _a.className;
    if (!helperTextNode)
        return null;
    return (jsxRuntime.jsx("div", { className: "".concat(styles.helperText, " ").concat(className || ""), children: helperTextNode }, String(helperTextNode)));
};

// Create the context with a default empty object
var ZestTextboxConfigContext = react.createContext(undefined);
var ZestTextboxConfigProvider = function (_a) {
    var children = _a.children, _b = _a.value, value = _b === void 0 ? {} : _b;
    return (jsxRuntime.jsx(ZestTextboxConfigContext.Provider, { value: { defaultZestProps: value }, children: children }));
};
// Custom hook to use the ZestTextboxConfigContext
var useZestTextboxConfig$1 = function () {
    var context = react.useContext(ZestTextboxConfigContext);
    if (context === undefined) {
        // This error will be caught by the useZestTextboxConfig hook in ZestTextbox.tsx
        // if the component is used outside of a provider.
        return { defaultZestProps: {} }; // Cast to generic T
    }
    return context; // Cast to generic T
};

var defaultNumberParser = function (value, inputType) {
    if (inputType !== "number" && inputType !== "tel" && inputType !== "currency" && inputType !== "percentage") {
        // If not a number type, don't parse as number
        return undefined;
    }
    var parsed = parseFloat(value);
    return isNaN(parsed) ? undefined : parsed;
};
var defaultNumberValidator = function (value, inputType) {
    if (inputType !== "number" && inputType !== "tel" && inputType !== "currency" && inputType !== "percentage") {
        // If not a number type, always consider valid for this validator
        return true;
    }
    if (value === undefined) {
        return "Invalid number format.";
    }
    return true;
};
// You can add more default parsers/validators here for other types like 'email', 'date', etc.

var ZEST_CONFIG_TIMEOUT = 2000; // 2 seconds
// Helper function to resolve a ZestConfigValue. This now ALWAYS returns a promise.
function resolveZestConfigValue(configValue, defaultValue, inputType) {
    // Wrap the entire logic in a promise to handle all cases asynchronously
    return new Promise(function (resolve) {
        if (configValue === undefined) {
            resolve(defaultValue);
            return;
        }
        if (typeof configValue === "function") {
            try {
                var result = configValue(inputType);
                // If the result is a promise, chain it; otherwise, resolve with the sync result.
                // This ensures that even synchronous functions are handled in the promise chain.
                Promise.resolve(result).then(resolve);
            }
            catch (e) {
                // If a sync function throws an error, we can't recover, but this will be caught by the timeout.
                // The promise will just never resolve.
                console.error("ZestTextbox: Synchronous error in config function.", e);
            }
        }
        else {
            // It's a plain value
            resolve(configValue);
        }
    });
}
// Timeout wrapper for resolving config values
function resolveWithTimeout(promise, timeout, propName, fallback) {
    return __awaiter(this, void 0, void 0, function () {
        var timeoutPromise;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    timeoutPromise = new Promise(function (_, reject) {
                        return setTimeout(function () { return reject(new Error("Timeout for prop '".concat(propName, "'"))); }, timeout);
                    });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Promise.race([promise, timeoutPromise])];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    _a.sent();
                    console.warn("ZestTextbox: Configuration for prop '".concat(propName, "' timed out after ").concat(timeout, "ms and has fallen back to its default value."));
                    return [2 /*return*/, fallback];
                case 4: return [2 /*return*/];
            }
        });
    });
}
var defaultResolvedZestProps = {
    zSize: "md",
    stretch: false,
    showProgressBar: false,
    animatedCounter: false,
    theme: "system",
    isMultiline: false,
    onTextChanged: undefined,
    helperTextConfig: undefined,
    parser: undefined,
    validator: undefined,
};
var useZestTextboxConfig = function (componentZestProps, inputType) {
    var contextDefaultZestProps = useZestTextboxConfig$1().defaultZestProps; // Pass generic T
    var _a = react.useState(defaultResolvedZestProps), resolvedZestProps = _a[0], setResolvedZestProps = _a[1]; // Cast to generic type
    // Memoize the merged props to avoid unnecessary re-renders
    var mergedZestProps = react.useMemo(function () {
        // Start with hardcoded defaults
        var currentMergedProps = __assign({}, defaultResolvedZestProps); // Cast
        // Apply context defaults
        currentMergedProps = __assign(__assign({}, currentMergedProps), contextDefaultZestProps); // No longer need cast here
        // Apply type-specific defaults if not already overridden by context
        if (inputType === "number" ||
            inputType === "currency" ||
            inputType === "percentage") {
            if (currentMergedProps.parser === undefined) {
                currentMergedProps.parser = defaultNumberParser; // Cast
            }
            if (currentMergedProps.validator === undefined) {
                currentMergedProps.validator = defaultNumberValidator; // Cast
            }
        }
        // Apply component-level props (highest precedence)
        currentMergedProps = __assign(__assign({}, currentMergedProps), componentZestProps);
        return currentMergedProps;
    }, [contextDefaultZestProps, componentZestProps, inputType]); // Added inputType to dependencies
    react.useEffect(function () {
        var resolveProps = function () { return __awaiter(void 0, void 0, void 0, function () {
            var newResolvedProps, timeout, _a, _b, _c, _d, _e, _f, _g, _h, _j;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        newResolvedProps = __assign({}, defaultResolvedZestProps);
                        timeout = ZEST_CONFIG_TIMEOUT;
                        // Resolve each property that can be a ZestConfigValue
                        _a = newResolvedProps;
                        return [4 /*yield*/, resolveWithTimeout(resolveZestConfigValue(mergedZestProps.zSize, defaultResolvedZestProps.zSize, inputType), timeout, 'zSize', defaultResolvedZestProps.zSize)];
                    case 1:
                        // Resolve each property that can be a ZestConfigValue
                        _a.zSize = _k.sent();
                        _b = newResolvedProps;
                        return [4 /*yield*/, resolveWithTimeout(resolveZestConfigValue(mergedZestProps.stretch, defaultResolvedZestProps.stretch, inputType), timeout, 'stretch', defaultResolvedZestProps.stretch)];
                    case 2:
                        _b.stretch = _k.sent();
                        _c = newResolvedProps;
                        return [4 /*yield*/, resolveWithTimeout(resolveZestConfigValue(mergedZestProps.showProgressBar, defaultResolvedZestProps.showProgressBar, inputType), timeout, 'showProgressBar', defaultResolvedZestProps.showProgressBar)];
                    case 3:
                        _c.showProgressBar = _k.sent();
                        _d = newResolvedProps;
                        return [4 /*yield*/, resolveWithTimeout(resolveZestConfigValue(mergedZestProps.animatedCounter, defaultResolvedZestProps.animatedCounter, inputType), timeout, 'animatedCounter', defaultResolvedZestProps.animatedCounter)];
                    case 4:
                        _d.animatedCounter = _k.sent();
                        _e = newResolvedProps;
                        return [4 /*yield*/, resolveWithTimeout(resolveZestConfigValue(mergedZestProps.theme, defaultResolvedZestProps.theme, inputType), timeout, 'theme', defaultResolvedZestProps.theme)];
                    case 5:
                        _e.theme = _k.sent();
                        _f = newResolvedProps;
                        return [4 /*yield*/, resolveWithTimeout(resolveZestConfigValue(mergedZestProps.isMultiline, defaultResolvedZestProps.isMultiline, inputType), timeout, 'isMultiline', defaultResolvedZestProps.isMultiline)];
                    case 6:
                        _f.isMultiline = _k.sent();
                        // onTextChanged is no longer a ZestConfigValue, so it's directly assigned
                        newResolvedProps.onTextChanged = mergedZestProps.onTextChanged;
                        _g = newResolvedProps;
                        return [4 /*yield*/, resolveWithTimeout(resolveZestConfigValue(mergedZestProps.helperTextConfig, defaultResolvedZestProps.helperTextConfig, inputType), timeout, 'helperTextConfig', defaultResolvedZestProps.helperTextConfig)];
                    case 7:
                        _g.helperTextConfig = _k.sent();
                        _h = newResolvedProps;
                        return [4 /*yield*/, resolveWithTimeout(resolveZestConfigValue(mergedZestProps.parser, defaultResolvedZestProps.parser, inputType), timeout, 'parser', defaultResolvedZestProps.parser)];
                    case 8:
                        _h.parser = _k.sent();
                        _j = newResolvedProps;
                        return [4 /*yield*/, resolveWithTimeout(resolveZestConfigValue(mergedZestProps.validator, defaultResolvedZestProps.validator, inputType), timeout, 'validator', defaultResolvedZestProps.validator)];
                    case 9:
                        _j.validator = _k.sent();
                        setResolvedZestProps(newResolvedProps);
                        return [2 /*return*/];
                }
            });
        }); };
        resolveProps();
    }, [mergedZestProps, inputType]); // Re-run effect if merged props change
    return resolvedZestProps;
};

var useParsedAndValidatedInput = function (_a) {
    var rawValue = _a.rawValue, inputType = _a.inputType, parser = _a.parser, validator = _a.validator, onParsedAndValidatedChange = _a.onParsedAndValidatedChange;
    var _b = react.useState(undefined), parsedValue = _b[0], setParsedValue = _b[1];
    var _c = react.useState(true), isValid = _c[0], setIsValid = _c[1];
    var _d = react.useState(undefined), validationMessage = _d[0], setValidationMessage = _d[1];
    react.useEffect(function () {
        // --- OPTION 2 IMPLEMENTATION ---
        // If no custom parser or validator is provided, and it's not a number type
        // where default parsers/validators would be injected,
        // then simply pass the raw value and bypass complex logic.
        // This assumes that if parser/validator are undefined, the consumer expects raw string.
        var isNumericType = inputType === "number" || inputType === "tel" || inputType === "currency" || inputType === "percentage";
        if (!parser && !validator && !isNumericType) {
            setParsedValue(rawValue); // Cast raw string to T
            setIsValid(true);
            setValidationMessage(undefined);
            if (onParsedAndValidatedChange) {
                onParsedAndValidatedChange(rawValue); // Pass raw string as T
            }
            return; // Bypass the rest of the useEffect logic
        }
        // --- END OPTION 2 IMPLEMENTATION ---
        var currentParsedValue = undefined;
        var currentIsValid = true;
        var currentValidationMessage = undefined;
        // 1. Parse the raw value
        if (parser) {
            currentParsedValue = parser(rawValue, inputType);
        }
        else {
            currentParsedValue = rawValue;
        }
        // 2. Validate the parsed value
        if (typeof validator === "function") {
            var validationResult = validator(currentParsedValue, inputType);
            if (typeof validationResult === "string") {
                currentIsValid = false;
                currentValidationMessage = validationResult;
            }
            else {
                currentIsValid = validationResult;
                if (!currentIsValid) {
                    currentValidationMessage = "Invalid input.";
                }
            }
        }
        setParsedValue(currentParsedValue);
        setIsValid(currentIsValid);
        setValidationMessage(currentValidationMessage);
        if (onParsedAndValidatedChange && currentIsValid) {
            onParsedAndValidatedChange(currentParsedValue);
        }
    }, [rawValue, inputType, parser, validator, onParsedAndValidatedChange]);
    return { parsedValue: parsedValue, isValid: isValid, validationMessage: validationMessage };
};

// ... other imports
var ZestTextbox = function (props) {
    var _a = props.className, className = _a === void 0 ? "" : _a, maxLength = props.maxLength, onChange = props.onChange, type = props.type, zest = props.zest, // Destructure the new zest prop
    rest = __rest(props, ["className", "maxLength", "onChange", "type", "zest"]);
    var resolvedZestProps = useZestTextboxConfig(zest, type);
    var zSize = resolvedZestProps.zSize, fullWidth = resolvedZestProps.stretch, showProgressBar = resolvedZestProps.showProgressBar, animatedCounter = resolvedZestProps.animatedCounter, theme = resolvedZestProps.theme, helperTextConfig = resolvedZestProps.helperTextConfig, onTextChanged = resolvedZestProps.onTextChanged, isMultiline = resolvedZestProps.isMultiline, parser = resolvedZestProps.parser, validator = resolvedZestProps.validator;
    var _b = react.useState(""), value = _b[0], setValue = _b[1];
    var isDark = useThemeDetector(theme);
    var isPassword = type === "password";
    var _c = usePasswordVisibility(isPassword), isPasswordVisible = _c.isPasswordVisible, togglePasswordVisibility = _c.togglePasswordVisibility;
    var _d = useCharacterCounter(value, maxLength, animatedCounter), currentLength = _d.currentLength, charPercentage = _d.charPercentage, counterColorClass = _d.counterColorClass, showCounter = _d.showCounter;
    var _e = useParsedAndValidatedInput({
        rawValue: value,
        inputType: type, // Pass the type prop here
        parser: parser,
        validator: validator,
        onParsedAndValidatedChange: onTextChanged,
    }), parsedValue = _e.parsedValue, isValid = _e.isValid, validationMessage = _e.validationMessage;
    // Prioritize validation message over regular helper text
    var finalHelperTextNode = validationMessage ? (jsxRuntime.jsx("span", { style: { color: "red" }, children: validationMessage })) : useHelperText(value, parsedValue, props, helperTextConfig);
    var classList = [
        styles.textbox,
        styles[zSize],
        fullWidth ? styles.fullWidth : "",
        className,
        isDark ? styles.dark : "",
        !isValid ? styles.error : "", // Add error class if not valid
    ]
        .filter(Boolean)
        .join(" ");
    var handleInputChange = react.useCallback(function (e) {
        var newValue = e.target.value;
        var isNumeric = type === "number" || type === "tel" || type === "currency" || type === "percentage";
        if (isNumeric) {
            newValue = filterNumericInput(newValue);
        }
        if (maxLength !== undefined && newValue.length > maxLength) {
            return;
        }
        setValue(newValue);
        if (onChange)
            onChange(e);
        // onTextChanged is now handled by useParsedAndValidatedInput
    }, [type, maxLength, onChange]);
    var isNumeric = type === "number" || type === "tel" || type === "currency" || type === "percentage";
    var inputType = isPassword && isPasswordVisible ? "text" : isNumeric ? "tel" : type;
    var commonProps = __assign({ className: classList, maxLength: maxLength, onChange: handleInputChange, value: value, type: inputType }, rest);
    return (jsxRuntime.jsxs("div", { className: styles.wrapper, children: [isMultiline ? ( // Use isMultiline from zest
            jsxRuntime.jsx("textarea", __assign({}, commonProps))) : (jsxRuntime.jsx("input", __assign({}, commonProps))), jsxRuntime.jsx(HelperTextDisplay, { helperTextNode: finalHelperTextNode, className: (helperTextConfig === null || helperTextConfig === void 0 ? void 0 : helperTextConfig.className) || '' }), jsxRuntime.jsx(CharacterCounter, { showCounter: showCounter, currentLength: currentLength, maxLength: maxLength, counterColorClass: counterColorClass }), jsxRuntime.jsx(PasswordToggleButton, { isPassword: isPassword, isPasswordVisible: isPasswordVisible, onToggle: togglePasswordVisibility }), jsxRuntime.jsx(ProgressBar, { showProgressBar: showProgressBar, showCounter: showCounter, charPercentage: charPercentage, counterColorClass: counterColorClass })] }));
};

exports.CharacterCounter = CharacterCounter;
exports.HelperTextDisplay = HelperTextDisplay;
exports.PasswordToggleButton = PasswordToggleButton;
exports.ProgressBar = ProgressBar;
exports.ZestTextboxConfigProvider = ZestTextboxConfigProvider;
exports.default = ZestTextbox;
//# sourceMappingURL=index.js.map
