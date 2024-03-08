"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Hidden = Hidden;
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _useThemeProps = require("../../../hooks/useThemeProps");

var _hooks = require("../../../hooks");

var _hooks2 = require("../../../core/color-mode/hooks");

var _reactNative = require("react-native");

var _NativeBaseContext = require("../../../core/NativeBaseContext");

var _HiddenSSR = require("./HiddenSSR");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Hidden({
  isSSR,
  ...props
}) {
  const {
    from,
    till,
    only,
    platform,
    colorMode,
    children
  } = (0, _useThemeProps.usePropsResolution)('Hidden', props, {}, {
    ignoreProps: ['only', 'platform']
  });
  const {
    breakpoints
  } = (0, _hooks.useTheme)();
  const currentColorMode = (0, _hooks2.useColorMode)();
  const breakpointValueObject = Object.keys(breakpoints).reduce((obj, val) => {
    obj[val] = val;
    return obj;
  }, {});
  const breakpointValue = (0, _hooks.useBreakpointValue)(breakpointValueObject);
  const [currentBreakpointValue] = (0, _hooks.useToken)('breakpoints', [breakpointValue]);
  const [fromBreakPointValue] = (0, _hooks.useToken)('breakpoints', [from]);
  const [tillBreakPointValue] = (0, _hooks.useToken)('breakpoints', [till]);
  const isSSRProvider = (0, _NativeBaseContext.useNativeBaseConfig)('useBreakpointResolvedProps').isSSR;
  if (isSSR && isSSRProvider) return /*#__PURE__*/_react.default.createElement(_HiddenSSR.HiddenSSR, props); //if no prop is passed, it will hide the element wrapped with hidden

  if (!from && !till && !only && !colorMode && !platform) {
    return null;
  } //if from and till prop exists, it will hide the element wrapped accordingly
  else if (from && till && currentBreakpointValue >= fromBreakPointValue && currentBreakpointValue < tillBreakPointValue) {
      return null;
    } //if from prop exists, it will hide the element wrapped starting from that breakpoint.
    else if (from && !till && currentBreakpointValue >= fromBreakPointValue) {
        return null;
      } //if till prop exists, it will hide the element wrapped starting from  0 till that breakpoint.
      else if (till && !from && currentBreakpointValue < tillBreakPointValue) {
          return null;
        } //if only prop exists and is array, check that array consists current breakpoint value, and if that exists, hide on that breakpoint to next breakpoint.
        // if only prop is string, hide on that breakpoint to next breakpoint.
        else if (Array.isArray(only) && only.includes(breakpointValue) || only === breakpointValue) {
            return null;
          } //if platform prop exists and is array, check that array consists current platform value, and if that exists, hide on that platform.
          // if platform prop is string, hide on that platform.
          else if (Array.isArray(platform) && platform.includes(_reactNative.Platform.OS) || platform === _reactNative.Platform.OS) {
              return null;
            } //if colormode prop is valid string, hide on that colormode.
            else if (colorMode === currentColorMode.colorMode) {
                return null;
              }

  return children;
}

var _default = /*#__PURE__*/(0, _react.memo)(Hidden);

exports.default = _default;
//# sourceMappingURL=index.js.map