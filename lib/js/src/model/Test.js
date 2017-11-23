'use strict';

var Rebase     = require("reason-rebase/lib/js/src/rebase.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");

function next(ids) {
  return Rebase.List[/* reduce */0]((function (prim, prim$1) {
                return Math.max(prim, prim$1);
              }), 0, ids) + 1 | 0;
}

function fromInt(n) {
  return n;
}

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
/* No side effect */
