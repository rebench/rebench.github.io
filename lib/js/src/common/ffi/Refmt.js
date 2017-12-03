'use strict';

var Curry  = require("bs-platform/lib/js/curry.js");
var Rebase = require("reason-rebase/lib/js/src/rebase.js");
var Reason = require("reason");

function _wrap(f, x) {
  return Rebase.Result[/* wrap */13]((function () {
                return Curry._1(f, x);
              }));
}

function parseML(param) {
  return Rebase.Result[/* wrap */13]((function () {
                var prim = param;
                return Reason.parseML(prim);
              }));
}

function parseRE(param) {
  return Rebase.Result[/* wrap */13]((function () {
                var prim = param;
                return Reason.parseRE(prim);
              }));
}

exports._wrap   = _wrap;
exports.parseML = parseML;
exports.parseRE = parseRE;
/* reason Not a pure module */
