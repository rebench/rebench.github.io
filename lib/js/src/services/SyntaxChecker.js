'use strict';

var Rebase       = require("reason-rebase/lib/js/src/rebase.js");
var Compiler     = require("./Compiler.js");
var Debounce     = require("../common/services/Debounce.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");

function _toMark(error) {
  return {
          from: Rebase.Option[/* mapOr */16]((function ($$location) {
                  return {
                          line: $$location.startLine - 2 | 0,
                          ch: $$location.startLineStartChar - 1 | 0
                        };
                }), {
                line: 0,
                ch: 0
              }, Js_primitive.null_undefined_to_opt(error.location)),
          to: Rebase.Option[/* mapOr */16]((function ($$location) {
                  return {
                          line: $$location.endLine - 2 | 0,
                          ch: $$location.endLineEndChar
                        };
                }), {
                line: 0,
                ch: 1
              }, Js_primitive.null_undefined_to_opt(error.location)),
          options: {
            className: "syntax-error",
            title: error.message
          }
        };
}

function compute(param) {
  var param$1 = Compiler.checkSyntax(param[0], param[1]);
  if (param$1.tag) {
    return /* tuple */[
            /* true */1,
            /* :: */[
              _toMark(param$1[0]),
              /* [] */0
            ]
          ];
  } else {
    return /* tuple */[
            /* false */0,
            /* [] */0
          ];
  }
}

var include = Debounce.Make(/* module */[/* compute */compute]);

var component = include[0];

var make = include[1];

exports._toMark   = _toMark;
exports.component = component;
exports.make      = make;
/* include Not a pure module */
