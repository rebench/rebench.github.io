'use strict';

var Block       = require("bs-platform/lib/js/block.js");
var Js_exn      = require("bs-platform/lib/js/js_exn.js");
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

function compile(code) {
  try {
    return Json_decode.either(success, error)(JSON.parse(window.ocaml.compile(code)));
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
/* No side effect */
