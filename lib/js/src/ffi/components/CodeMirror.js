'use strict';

var ReasonReact  = require("reason-react/lib/js/src/reasonReact.js");
var Js_undefined = require("bs-platform/lib/js/js_undefined.js");
var CodeMirror   = require("react-codemirror");

var execCommand = (
  function (el, command) {
    return el.getCodeMirror().execCommand(command);
  }
);

function make(style, value, defaultValue, onChange, options, children) {
  return ReasonReact.wrapJsForReason(CodeMirror, {
              style: Js_undefined.from_opt(style),
              value: Js_undefined.from_opt(value),
              defaultValue: Js_undefined.from_opt(defaultValue),
              onChange: Js_undefined.from_opt(onChange),
              options: Js_undefined.from_opt(options)
            }, children);
}

exports.execCommand = execCommand;
exports.make        = make;
/* execCommand Not a pure module */
