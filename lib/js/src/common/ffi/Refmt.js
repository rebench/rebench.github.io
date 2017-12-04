'use strict';

var Block  = require("bs-platform/lib/js/block.js");
var Curry  = require("bs-platform/lib/js/curry.js");
var Js_exn = require("bs-platform/lib/js/js_exn.js");
var Reason = require("reason");

function _wrap(f, x) {
  try {
    return /* Ok */Block.__(0, [Curry._1(f, x)]);
  }
  catch (raw_exn){
    var exn = Js_exn.internalToOCamlException(raw_exn);
    if (exn[0] === Js_exn.$$Error) {
      return /* Error */Block.__(1, [exn[1]]);
    } else {
      throw exn;
    }
  }
}

function parseML(param) {
  return _wrap((function (prim) {
                return Reason.parseML(prim);
              }), param);
}

function parseRE(param) {
  return _wrap((function (prim) {
                return Reason.parseRE(prim);
              }), param);
}

exports._wrap   = _wrap;
exports.parseML = parseML;
exports.parseRE = parseRE;
/* reason Not a pure module */
