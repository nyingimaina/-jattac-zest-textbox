var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import styles from "../Styles/ZestTextbox.module.css";
import { IconEyeOpen } from "./IconEyeOpen";
import { IconEyeSlashed } from "./IconEyeSlashed";
export var ZestTextbox = function (props) {
    var _a = props.zSize, zSize = _a === void 0 ? "md" : _a, _b = props.stretch, fullWidth = _b === void 0 ? false : _b, _c = props.className, className = _c === void 0 ? "" : _c, maxLength = props.maxLength, onChange = props.onChange, type = props.type, _d = props.showProgressBar, showProgressBar = _d === void 0 ? false : _d, _e = props.animatedCounter, animatedCounter = _e === void 0 ? false : _e, _f = props.theme, theme = _f === void 0 ? "system" : _f, rest = __rest(props, ["zSize", "stretch", "className", "maxLength", "onChange", "type", "showProgressBar", "animatedCounter", "theme"]);
    var _g = useState(""), value = _g[0], setValue = _g[1];
    var _h = useState(false), isDark = _h[0], setIsDark = _h[1];
    var _j = useState(false), isPasswordVisible = _j[0], setIsPasswordVisible = _j[1];
    // === Advanced Theme Control ===
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
        if (maxLength !== undefined && e.target.value.length > maxLength)
            return;
        setValue(e.target.value);
        if (onChange)
            onChange(e); // cast because it could be input or textarea
    };
    var isPassword = type === "password";
    var inputType = isPassword && isPasswordVisible ? "text" : type;
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
    return (_jsxs("div", { className: styles.wrapper, children: ["isMultiline" in props && props.isMultiline ? (_jsx("textarea", __assign({}, commonProps))) : (_jsx("input", __assign({}, commonProps))), showCounter && (_jsxs("div", { className: "".concat(styles.counter, " ").concat(counterColorClass), children: [value.length, " / ", maxLength] })), isPassword && (_jsxs("div", { className: styles.passwordToggle, onClick: function () { return setIsPasswordVisible(!isPasswordVisible); }, children: [_jsx("div", { className: styles.tooltip, children: isPasswordVisible ? "Hide password" : "Show password" }), isPasswordVisible ? (_jsx(IconEyeOpen, { className: "".concat(styles.eyeIcon, " ").concat(isPasswordVisible ? styles.rotate : "") })) : (_jsx(IconEyeSlashed, { className: "".concat(styles.eyeIcon, " ").concat(!isPasswordVisible ? styles.rotate : "") }))] })), showProgressBar && showCounter && (_jsx("div", { className: styles.progressBarContainer, children: _jsx("div", { className: "".concat(styles.progressBar, " ").concat(counterColorClass), style: { width: "".concat(charPercentage, "%") } }) }))] }));
};
export default ZestTextbox;
