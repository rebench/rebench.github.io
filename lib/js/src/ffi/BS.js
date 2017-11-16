'use strict';

var Block                   = require("bs-platform/lib/js/block.js");
var Rebase                  = require("reason-rebase/lib/js/src/rebase.js");
var Js_json                 = require("bs-platform/lib/js/js_json.js");
var Js_primitive            = require("bs-platform/lib/js/js_primitive.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

function compile(code) {
  var param = Js_json.classify(JSON.parse(window.ocaml.compile(code)));
  if (typeof param === "number") {
    throw [
          Caml_builtin_exceptions.match_failure,
          [
            "/Users/glennsl/dev.github/rebench.github.io/src/ffi/BS.re",
            8,
            10
          ]
        ];
  } else {
    switch (param.tag | 0) {
      case 0 : 
          return /* Error */Block.__(1, [param[0]]);
      case 2 : 
          return Rebase.Option[/* mapOr */16]((function (code) {
                        return /* Ok */Block.__(0, [code]);
                      }), /* Error */Block.__(1, ["unknown error"]), Rebase.Option[/* flatMap */5](Js_json.decodeString, Js_primitive.undefined_to_opt(param[0]["js_code"])));
      default:
        throw [
              Caml_builtin_exceptions.match_failure,
              [
                "/Users/glennsl/dev.github/rebench.github.io/src/ffi/BS.re",
                8,
                10
              ]
            ];
    }
  }
}

exports.compile = compile;
/* No side effect */
