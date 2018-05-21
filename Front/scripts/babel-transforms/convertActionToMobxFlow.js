"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _helperPluginUtils = require("@babel/helper-plugin-utils");

var _helperRemapAsyncToGenerator = _interopRequireDefault(require("@babel/helper-remap-async-to-generator"));

var _helperModuleImports = require("@babel/helper-module-imports");

var _core = require("@babel/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var actionComment = "action";

function findActionComment(comments) {
  return comments.findIndex(function (c) {
    return c.value && c.value.trim() === actionComment;
  });
}

function isAction(path) {
  var comments;

  if (path.parentPath) {
    comments = path.parentPath.node.leadingComments;
  }

  if (comments) {
    var index = findActionComment(comments);

    if (index > -1) {
      return true;
    }
  }

  return false;
}

var _default = (0, _helperPluginUtils.declare)(function (api) {
  api.assertVersion(7);
  var method = "flow";
  var module = "mobx";
  return {
    visitor: {
      Function: function Function(path, state) {
        if (!path.node.async || path.node.generator || !isAction(path)) return;
        var wrapAsync = state.methodWrapper;

        if (wrapAsync) {
          wrapAsync = _core.types.cloneNode(wrapAsync);
        } else {
          wrapAsync = state.methodWrapper = (0, _helperModuleImports.addNamed)(path, method, module);
        }

        (0, _helperRemapAsyncToGenerator.default)(path, {
          wrapAsync: wrapAsync
        });
      }
    }
  };
});

exports.default = _default;