'use strict';

var Curry  = require("bs-platform/lib/js/curry.js");
var Rebase = require("@glennsl/rebase/lib/js/src/Rebase.bs.js");

function text(prim) {
  return prim;
}

var partial_arg = Rebase.List[/* map */0];

var partial_arg$1 = Rebase.List[/* filter */10];

var partial_arg$2 = Rebase.$$String[/* joinWith */11];

var classNames = Curry._2(Rebase.Fn[/* >> */6], Curry._2(Rebase.Fn[/* >> */6], (function (param) {
            return partial_arg((function (param) {
                          if (param[1] !== 0) {
                            return param[0];
                          } else {
                            return "";
                          }
                        }), param);
          }), (function (param) {
            return partial_arg$1((function (s) {
                          return +(s !== "");
                        }), param);
          })), (function (param) {
        return partial_arg$2(" ", param);
      }));

exports.text       = text;
exports.classNames = classNames;
/* classNames Not a pure module */
