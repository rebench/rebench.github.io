'use strict';

var Curry            = require("bs-platform/lib/js/curry.js");
var Rebase           = require("reason-rebase/lib/js/src/rebase.js");
var ReasonReact      = require("reason-react/lib/js/src/reasonReact.js");
var Js_undefined     = require("bs-platform/lib/js/js_undefined.js");
var ReactCodemirror2 = require("react-codemirror2");

var execCommand = (
  function (el, command) {
    return el.getCodeMirror().execCommand(command);
  }
);

function make(style, value, defaultValue, onChange, options, children) {
  return ReasonReact.wrapJsForReason(ReactCodemirror2.UnControlled, {
              style: Js_undefined.from_opt(style),
              value: Js_undefined.from_opt(value),
              defaultValue: Js_undefined.from_opt(defaultValue),
              onChange: Rebase.Option[/* mapOr */16]((function (f, _, _$1, value) {
                      return Curry._1(f, value);
                    }), (function (_, _$1, _$2) {
                      return /* () */0;
                    }), onChange),
              options: Js_undefined.from_opt(options)
            }, children);
}

exports.execCommand = execCommand;
exports.make        = make;
/* execCommand Not a pure module */
