'use strict';

var Rebase   = require("reason-rebase/lib/js/src/rebase.js");
var Syntax   = require("./Syntax.js");
var Debounce = require("../common/services/Debounce.js");

function _toMark(error) {
  return {
          from: Rebase.Option[/* mapOr */16]((function (range) {
                  return {
                          line: range[/* from */0][/* line */0],
                          ch: range[/* from */0][/* column */1]
                        };
                }), {
                line: 0,
                ch: 0
              }, error[/* range */1]),
          to: Rebase.Option[/* mapOr */16]((function (range) {
                  return {
                          line: range[/* to_ */1][/* line */0],
                          ch: range[/* to_ */1][/* column */1]
                        };
                }), {
                line: 0,
                ch: 1
              }, error[/* range */1]),
          options: {
            className: "syntax-error",
            title: error[/* message */0]
          }
        };
}

function compute(param) {
  var param$1 = Syntax.check(param[0], param[1]);
  if (param$1) {
    var error = param$1[0];
    return /* tuple */[
            /* Some */[error[/* message */0]],
            /* :: */[
              _toMark(error),
              /* [] */0
            ]
          ];
  } else {
    return /* tuple */[
            /* None */0,
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
