'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Rebase = require("@glennsl/rebase/src/Rebase.bs.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");

var partial_arg = Rebase.List[/* reduce */3];

var next = Curry._2(Rebase.Fn[/* >> */6], (function (param) {
        return partial_arg((function (prim, prim$1) {
                      return Math.max(prim, prim$1);
                    }), 0, param);
      }), (function (prim) {
        return prim + 1 | 0;
      }));

var fromInt = Rebase.Fn[/* id */0];

function generateFunctionName(id) {
  return "__test" + (String(id) + "__");
}

var Id = /* module */[
  /* next */next,
  /* fromInt */fromInt,
  /* toString */Pervasives.string_of_int,
  /* generateFunctionName */generateFunctionName
];

exports.Id = Id;
/* next Not a pure module */
