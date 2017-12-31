'use strict';

var Block       = require("bs-platform/lib/js/block.js");
var Js_exn      = require("bs-platform/lib/js/js_exn.js");
var Rebase      = require("@glennsl/rebase/lib/js/src/Rebase.bs.js");
var Json_decode = require("bs-json/lib/js/src/Json_decode.js");

function success(json) {
  return /* Ok */Block.__(0, [Json_decode.field("js_code", Json_decode.string, json)]);
}

function error(json) {
  return /* Error */Block.__(1, [Json_decode.field("text", Json_decode.string, json)]);
}

var Decode = /* module */[
  /* success */success,
  /* error */error
];


  function _captureConsoleErrors(f) {
    let errors = "";
    const _consoleError = console.error;
    console.error = (...args) => args.forEach(argument => errors += argument + `\n`);

    let res = f();

    console.error = _consoleError;
    return [res, errors ? [errors] : 0];
  }

;

function compile(code) {
  try {
    var match = _captureConsoleErrors((function () {
            return window.ocaml.compile(code);
          }));
    var warnings = match[1];
    var result = Json_decode.either(success, error)(JSON.parse(match[0]));
    return Rebase.Result[/* map */0]((function (code) {
                  return /* tuple */[
                          code,
                          warnings
                        ];
                }), result);
  }
  catch (raw_exn){
    var exn = Js_exn.internalToOCamlException(raw_exn);
    if (exn[0] === Json_decode.DecodeError) {
      return /* Error */Block.__(1, ["Unrecognized compiler output: " + exn[1]]);
    } else {
      throw exn;
    }
  }
}

exports.Decode  = Decode;
exports.compile = compile;
/*  Not a pure module */
