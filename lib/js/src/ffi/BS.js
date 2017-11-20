'use strict';

var Block        = require("bs-platform/lib/js/block.js");
var Rebase       = require("reason-rebase/lib/js/src/rebase.js");
var Js_json      = require("bs-platform/lib/js/js_json.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");

function compile(code) {
  var param = Js_json.classify(JSON.parse(window.ocaml.compile(code)));
  if (typeof param === "number") {
    return /* Error */Block.__(1, ["Unrecognized compiler output"]);
  } else {
    switch (param.tag | 0) {
      case 0 : 
          return /* Error */Block.__(1, [param[0]]);
      case 2 : 
          return Rebase.Option[/* mapOr */16]((function (code) {
                        return /* Ok */Block.__(0, [code]);
                      }), /* Error */Block.__(1, ["Unrecognized compiler output"]), Rebase.Option[/* flatMap */5](Js_json.decodeString, Js_primitive.undefined_to_opt(param[0]["js_code"])));
      default:
        return /* Error */Block.__(1, ["Unrecognized compiler output"]);
    }
  }
}

exports.compile = compile;
/* No side effect */
