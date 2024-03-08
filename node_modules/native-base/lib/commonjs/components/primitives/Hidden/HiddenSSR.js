"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HiddenSSR = void 0;

var _react = _interopRequireDefault(require("react"));

var _nativeBase = require("native-base");

var _reactNative = require("react-native");

var _hooks = require("../../../core/color-mode/hooks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const HiddenSSR = /*#__PURE__*/_react.default.memo(({
  children,
  ...props
}) => {
  const theme = (0, _nativeBase.useTheme)();
  const breakPoints = Object.keys(theme.breakpoints);
  const currentColorMode = (0, _hooks.useColorMode)();
  const {
    from,
    till,
    only,
    colorMode,
    platform
  } = props;
  if (children === null) return null;

  if (!from && !till && !only && !colorMode && !platform) {
    return null;
  } else if (Array.isArray(platform) && platform.includes(_reactNative.Platform.OS) || platform === _reactNative.Platform.OS) {
    return null;
  } else if (colorMode === currentColorMode.colorMode) {
    return null;
  }

  const display = {};

  if (till) {
    let flag = false;

    for (const i in breakPoints) {
      if (breakPoints[i] === till) {
        display[breakPoints[i]] = 'flex';
        flag = true;
      } else {
        display[breakPoints[i]] = flag ? 'flex' : 'none';
      }
    }
  }

  if (from) {
    let flag = false;

    for (const i in breakPoints) {
      if (breakPoints[i] === from || flag) {
        display[breakPoints[i]] = 'none';
        flag = true;
      } else {
        display[breakPoints[i]] = 'flex';
      }
    }
  }

  if (only) {
    if (Array.isArray(only)) {
      for (const i in breakPoints) {
        if (only.includes(breakPoints[i])) {
          display[breakPoints[i]] = 'none';
        } else {
          display[breakPoints[i]] = 'flex';
        }
      }
    } else {
      display[only] = 'none';
    }
  }

  return /*#__PURE__*/_react.default.cloneElement(children, {
    display: display
  });
});

exports.HiddenSSR = HiddenSSR;
//# sourceMappingURL=HiddenSSR.js.map