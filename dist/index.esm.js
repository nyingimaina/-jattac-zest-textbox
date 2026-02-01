import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect, useMemo } from 'react';

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

var css_248z = "/* === Base Textbox Styles (input & textarea) === */\r\n.ZestTextbox-module_textbox__0M5Wq {\r\n  font-family: \"Segoe UI\", Roboto, sans-serif;\r\n  font-weight: 500;\r\n  line-height: 1.25;\r\n  border: 1px solid #ccc;\r\n  border-radius: 0.5rem; /* 8px */\r\n  color: #111827;\r\n  background-color: #ffffff;\r\n  transition: border-color 0.2s ease, box-shadow 0.2s ease;\r\n  display: inline-block;\r\n  width: auto;\r\n  box-sizing: border-box;\r\n  resize: none;\r\n  font-size: 1rem; /* 16px */\r\n  padding-bottom: 2rem; /* 32px */\r\n}\r\n\r\n.ZestTextbox-module_textbox__0M5Wq:focus {\r\n  outline: none;\r\n  border-color: #8B5CF6;\r\n  box-shadow: 0 0 0 0.125rem rgba(139, 92, 246, 0.25); /* 2px */\r\n  animation: ZestTextbox-module_pulse-light__CKfhA 0.5s 1;\r\n}\r\n\r\n/* === Sizes === */\r\n.ZestTextbox-module_sm__yyxXO {\r\n  padding: 0.5rem 0.75rem; /* 8px 12px */\r\n  font-size: 0.875rem; /* 14px */\r\n}\r\n\r\n.ZestTextbox-module_md__fvL10 {\r\n  padding: 0.625rem 0.875rem; /* 10px 14px */\r\n  font-size: 1rem; /* 16px */\r\n}\r\n\r\n.ZestTextbox-module_lg__fU93- {\r\n  padding: 0.75rem 1rem; /* 12px 16px */\r\n  font-size: 1.125rem; /* 18px */\r\n}\r\n\r\n/* === Full Width === */\r\n.ZestTextbox-module_fullWidth__xn4fT {\r\n  width: 100%;\r\n}\r\n\r\n/* === Disabled State === */\r\n.ZestTextbox-module_textbox__0M5Wq:disabled {\r\n  background-color: #f3f4f6;\r\n  color: #9ca3af;\r\n  cursor: not-allowed;\r\n  pointer-events: none;\r\n  border-color: #d1d5db;\r\n}\r\n\r\n/* === Multiline (textarea) specific enhancements === */\r\ntextarea.ZestTextbox-module_textbox__0M5Wq {\r\n  min-height: 6.25rem; /* 100px */\r\n  line-height: 1.5;\r\n  resize: vertical;\r\n}\r\n\r\n.ZestTextbox-module_wrapper__0ok2A {\r\n  position: relative;\r\n  display: inline-block;\r\n}\r\n\r\n.ZestTextbox-module_counter__waqIT {\r\n  position: absolute;\r\n  right: 0.625rem; /* 10px */\r\n  bottom: 0.375rem; /* 6px */\r\n  font-size: 0.75rem;\r\n  color: #6b7280;\r\n  pointer-events: none;\r\n  user-select: none;\r\n}\r\n\r\n/* === Dark Mode Support === */\r\n.dark .ZestTextbox-module_textbox__0M5Wq {\r\n  background-color: #1f2937;\r\n  border-color: #374151;\r\n  color: #f3f4f6;\r\n}\r\n\r\n.dark .ZestTextbox-module_textbox__0M5Wq:focus {\r\n  border-color: #A78BFA;\r\n  box-shadow: 0 0 0 0.125rem rgba(167, 139, 250, 0.35); /* 2px */\r\n  animation: ZestTextbox-module_pulse-dark__L9PYJ 0.5s 1;\r\n}\r\n\r\n.dark .ZestTextbox-module_textbox__0M5Wq:disabled {\r\n  background-color: #374151;\r\n  color: #9ca3af;\r\n  border-color: #4b5563;\r\n}\r\n\r\n.dark .ZestTextbox-module_counter__waqIT {\r\n  color: #9ca3af;\r\n}\r\n\r\n/* === Password Toggle === */\r\n.ZestTextbox-module_passwordToggle__I2s4O {\r\n  position: absolute;\r\n  right: 0.625rem; /* 10px */\r\n  top: 50%;\r\n  transform: translateY(-50%);\r\n  cursor: pointer;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  color: #6b7280;\r\n}\r\n\r\n.ZestTextbox-module_eyeIcon__rKiBL {\r\n  width: 1.25em;\r\n  height: 1.25em;\r\n  transition: transform 0.2s ease-in-out;\r\n}\r\n\r\n.ZestTextbox-module_rotate__Ajx19 {\r\n  transform: rotate(180deg);\r\n}\r\n\r\n.ZestTextbox-module_tooltip__etRdj {\r\n  position: absolute;\r\n  right: 100%;\r\n  top: 50%;\r\n  transform: translateY(-50%);\r\n  background-color: #333;\r\n  color: #fff;\r\n  padding: 0.25rem 0.5rem; /* 4px 8px */\r\n  border-radius: 0.25rem; /* 4px */\r\n  font-size: 0.75rem;\r\n  white-space: nowrap;\r\n  margin-right: 0.5rem; /* 8px */\r\n  opacity: 0;\r\n  visibility: hidden;\r\n  transition: opacity 0.2s ease, visibility 0.2s ease;\r\n}\r\n\r\n.ZestTextbox-module_passwordToggle__I2s4O:hover .ZestTextbox-module_tooltip__etRdj {\r\n  opacity: 1;\r\n  visibility: visible;\r\n}\r\n\r\n.dark .ZestTextbox-module_passwordToggle__I2s4O {\r\n  color: #9ca3af;\r\n}\r\n\r\n.dark .ZestTextbox-module_tooltip__etRdj {\r\n  background-color: #4b5563;\r\n  color: #f3f4f6;\r\n}\r\n\r\n/* === Progress Bar === */\r\n.ZestTextbox-module_progressBarContainer__0qFKf {\r\n  position: absolute;\r\n  bottom: 0;\r\n  left: 0;\r\n  right: 0;\r\n  height: 0.1875rem; /* 3px */\r\n  background-color: #e5e7eb;\r\n  border-bottom-left-radius: 0.5rem; /* 8px */\r\n  border-bottom-right-radius: 0.5rem; /* 8px */\r\n  overflow: hidden;\r\n}\r\n\r\n.ZestTextbox-module_progressBar__vwttj {\r\n  height: 100%;\r\n  background-color: #8B5CF6;\r\n  transition: width 0.2s ease, background-color 0.3s ease;\r\n}\r\n\r\n/* === Animated Counter Colors === */\r\n.ZestTextbox-module_counterYellow__uYGfs {\r\n  color: #A78BFA;\r\n}\r\n\r\n.ZestTextbox-module_counterOrange__b9baX {\r\n  color: #8B5CF6;\r\n}\r\n\r\n.dark .ZestTextbox-module_progressBarContainer__0qFKf {\r\n  background-color: #374151;\r\n}\r\n\r\n.dark .ZestTextbox-module_progressBar__vwttj {\r\n  background-color: #A78BFA;\r\n}\r\n\r\n.dark .ZestTextbox-module_counterYellow__uYGfs {\r\n  color: #C4B5FD;\r\n}\r\n\r\n.dark .ZestTextbox-module_counterOrange__b9baX {\r\n  color: #A78BFA;\r\n}\r\n\r\n@keyframes ZestTextbox-module_pulse-light__CKfhA {\r\n  0% {\r\n    box-shadow: 0 0 0 0.125rem rgba(139, 92, 246, 0.25); /* 2px */\r\n  }\r\n  50% {\r\n    box-shadow: 0 0 0 0.25rem rgba(139, 92, 246, 0.35); /* 4px */\r\n  }\r\n  100% {\r\n    box-shadow: 0 0 0 0.125rem rgba(139, 92, 246, 0.25); /* 2px */\r\n  }\r\n}\r\n\r\n@keyframes ZestTextbox-module_pulse-dark__L9PYJ {\r\n  0% {\r\n    box-shadow: 0 0 0 0.125rem rgba(167, 139, 250, 0.35); /* 2px */\r\n  }\r\n  50% {\r\n    box-shadow: 0 0 0 0.25rem rgba(167, 139, 250, 0.45); /* 4px */\r\n  }\r\n  100% {\r\n    box-shadow: 0 0 0 0.125rem rgba(167, 139, 250, 0.35); /* 2px */\r\n  }\r\n}\r\n\r\n/* === Media Queries for Responsive Design === */\r\n@media (min-width: 48rem) { /* 768px */\r\n  /* Tablet */\r\n  .ZestTextbox-module_sm__yyxXO {\r\n    font-size: 0.875rem; /* 14px */\r\n  }\r\n  .ZestTextbox-module_md__fvL10 {\r\n    font-size: 1rem; /* 16px */\r\n  }\r\n  .ZestTextbox-module_lg__fU93- {\r\n    font-size: 1.125rem; /* 18px */\r\n  }\r\n}\r\n\r\n@media (min-width: 64rem) { /* 1024px */\r\n  /* Desktop */\r\n  .ZestTextbox-module_sm__yyxXO {\r\n    padding: 0.375rem 0.625rem; /* 6px 10px */\r\n    font-size: 0.875rem; /* 14px */\r\n  }\r\n  .ZestTextbox-module_md__fvL10 {\r\n    padding: 0.625rem 0.875rem; /* 10px 14px */\r\n    font-size: 1rem; /* 16px */\r\n  }\r\n  .ZestTextbox-module_lg__fU93- {\r\n    padding: 0.75rem 1rem; /* 12px 16px */\r\n    font-size: 1.125rem; /* 18px */\r\n  }\r\n}\r\n\r\n/* === Helper Text === */\r\n.ZestTextbox-module_helperText__4twSg {\r\n  font-size: 0.875rem; /* 14px */\r\n  color: #6b7280;\r\n  margin-top: 0.25rem; /* 4px */\r\n  animation: ZestTextbox-module_fade-slide-in__re-Ln 0.3s ease-out forwards;\r\n}\r\n\r\n.dark .ZestTextbox-module_helperText__4twSg {\r\n  color: #9ca3af;\r\n}\r\n\r\n@keyframes ZestTextbox-module_fade-slide-in__re-Ln {\r\n  from {\r\n    opacity: 0;\r\n    transform: translateY(5px);\r\n  }\r\n  to {\r\n    opacity: 1;\r\n    transform: translateY(0);\r\n  }\r\n}\r\n";
var styles = {"textbox":"ZestTextbox-module_textbox__0M5Wq","pulse-light":"ZestTextbox-module_pulse-light__CKfhA","sm":"ZestTextbox-module_sm__yyxXO","md":"ZestTextbox-module_md__fvL10","lg":"ZestTextbox-module_lg__fU93-","fullWidth":"ZestTextbox-module_fullWidth__xn4fT","wrapper":"ZestTextbox-module_wrapper__0ok2A","counter":"ZestTextbox-module_counter__waqIT","pulse-dark":"ZestTextbox-module_pulse-dark__L9PYJ","passwordToggle":"ZestTextbox-module_passwordToggle__I2s4O","eyeIcon":"ZestTextbox-module_eyeIcon__rKiBL","rotate":"ZestTextbox-module_rotate__Ajx19","tooltip":"ZestTextbox-module_tooltip__etRdj","progressBarContainer":"ZestTextbox-module_progressBarContainer__0qFKf","progressBar":"ZestTextbox-module_progressBar__vwttj","counterYellow":"ZestTextbox-module_counterYellow__uYGfs","counterOrange":"ZestTextbox-module_counterOrange__b9baX","helperText":"ZestTextbox-module_helperText__4twSg","fade-slide-in":"ZestTextbox-module_fade-slide-in__re-Ln"};
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
    var _a = useState(false), isDark = _a[0], setIsDark = _a[1];
    useEffect(function () {
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
    var _a = useState(false), isPasswordVisible = _a[0], setIsPasswordVisible = _a[1];
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
    var counterColorClass = useMemo(function () {
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

var useHelperText = function (value, helperTextConfig) {
    var _a = useState(null), helperTextNode = _a[0], setHelperTextNode = _a[1];
    useEffect(function () {
        if (!helperTextConfig) {
            setHelperTextNode(null);
            return;
        }
        var formatted = helperTextConfig.formatter
            ? helperTextConfig.formatter(value)
            : value;
        var finalNode = helperTextConfig.templater
            ? helperTextConfig.templater(formatted)
            : formatted;
        setHelperTextNode(finalNode);
    }, [value, helperTextConfig]);
    return helperTextNode;
};

var IconEyeOpen = function (props) { return (jsxs("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", viewBox: "0 0 16 16" }, props, { children: [jsx("path", { d: "M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" }), jsx("path", { d: "M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" })] }))); };

var IconEyeSlashed = function (props) { return (jsxs("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", viewBox: "0 0 16 16" }, props, { children: [jsx("path", { d: "M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" }), jsx("path", { d: "M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.288.822.822.073.073.026.026a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829l.822.822zm-2.943-1.288.822.822.073.073.026.026a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829l.822.822z" }), jsx("path", { d: "M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.88 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 6.854-12-12 .708-.708 12 12-.708.708z" })] }))); };

var PasswordToggleButton = function (_a) {
    var isPassword = _a.isPassword, isPasswordVisible = _a.isPasswordVisible, onToggle = _a.onToggle;
    if (!isPassword)
        return null;
    return (jsxs("div", { className: styles.passwordToggle, onClick: onToggle, children: [jsx("div", { className: styles.tooltip, children: isPasswordVisible ? "Hide password" : "Show password" }), isPasswordVisible ? (jsx(IconEyeOpen, { className: styles.eyeIcon })) : (jsx(IconEyeSlashed, { className: styles.eyeIcon }))] }));
};

var CharacterCounter = function (_a) {
    var showCounter = _a.showCounter, currentLength = _a.currentLength, maxLength = _a.maxLength, counterColorClass = _a.counterColorClass;
    if (!showCounter)
        return null;
    return (jsxs("div", { className: "".concat(styles.counter, " ").concat(counterColorClass), children: [currentLength, " / ", maxLength] }));
};

var ProgressBar = function (_a) {
    var showProgressBar = _a.showProgressBar, showCounter = _a.showCounter, charPercentage = _a.charPercentage, counterColorClass = _a.counterColorClass;
    if (!showProgressBar || !showCounter)
        return null;
    return (jsx("div", { className: styles.progressBarContainer, children: jsx("div", { className: "".concat(styles.progressBar, " ").concat(counterColorClass), style: { width: "".concat(charPercentage, "%") } }) }));
};

var HelperTextDisplay = function (_a) {
    var helperTextNode = _a.helperTextNode, className = _a.className;
    if (!helperTextNode)
        return null;
    return (jsx("div", { className: "".concat(styles.helperText, " ").concat(className || ""), children: helperTextNode }, String(helperTextNode)));
};

// ... other imports
var ZestTextbox = function (props) {
    var _a = props.className, className = _a === void 0 ? "" : _a, maxLength = props.maxLength, onChange = props.onChange, type = props.type, zest = props.zest, // Destructure the new zest prop
    rest = __rest(props, ["className", "maxLength", "onChange", "type", "zest"]);
    // Destructure custom props from zest, applying defaults if zest is undefined
    var _b = zest || {}, _c = _b.zSize, zSize = _c === void 0 ? "md" : _c, _d = _b.stretch, fullWidth = _d === void 0 ? false : _d, _e = _b.showProgressBar, showProgressBar = _e === void 0 ? false : _e, _f = _b.animatedCounter, animatedCounter = _f === void 0 ? false : _f, _g = _b.theme, theme = _g === void 0 ? "system" : _g, helperTextConfig = _b.helperTextConfig, onTextChanged = _b.onTextChanged, _h = _b.isMultiline, isMultiline = _h === void 0 ? false : _h; // Provide empty object as fallback if zest is undefined
    var _j = useState(""), value = _j[0], setValue = _j[1];
    var isDark = useThemeDetector(theme);
    var isPassword = type === "password";
    var _k = usePasswordVisibility(isPassword), isPasswordVisible = _k.isPasswordVisible, togglePasswordVisibility = _k.togglePasswordVisibility;
    var _l = useCharacterCounter(value, maxLength, animatedCounter), currentLength = _l.currentLength, charPercentage = _l.charPercentage, counterColorClass = _l.counterColorClass, showCounter = _l.showCounter;
    var helperTextNode = useHelperText(value, helperTextConfig);
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
        var isNumeric = type === "number" || type === "tel";
        if (isNumeric) {
            newValue = filterNumericInput(newValue);
        }
        if (maxLength !== undefined && newValue.length > maxLength)
            return;
        setValue(newValue);
        if (onChange)
            onChange(e);
        if (onTextChanged)
            onTextChanged(newValue);
    };
    var isNumeric = type === "number" || type === "tel";
    var inputType = isPassword && isPasswordVisible ? "text" : isNumeric ? "tel" : type;
    var commonProps = __assign({ className: classList, maxLength: maxLength, onChange: handleInputChange, value: value, type: inputType }, rest);
    return (jsxs("div", { className: styles.wrapper, children: [isMultiline ? ( // Use isMultiline from zest
            jsx("textarea", __assign({}, commonProps))) : (jsx("input", __assign({}, commonProps))), jsx(HelperTextDisplay, { helperTextNode: helperTextNode, className: (helperTextConfig === null || helperTextConfig === void 0 ? void 0 : helperTextConfig.className) || '' }), jsx(CharacterCounter, { showCounter: showCounter, currentLength: currentLength, maxLength: maxLength, counterColorClass: counterColorClass }), jsx(PasswordToggleButton, { isPassword: isPassword, isPasswordVisible: isPasswordVisible, onToggle: togglePasswordVisibility }), jsx(ProgressBar, { showProgressBar: showProgressBar, showCounter: showCounter, charPercentage: charPercentage, counterColorClass: counterColorClass })] }));
};

export { CharacterCounter, HelperTextDisplay, PasswordToggleButton, ProgressBar, ZestTextbox };
//# sourceMappingURL=index.esm.js.map
