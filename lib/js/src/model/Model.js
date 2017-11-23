'use strict';

var Rebase      = require("reason-rebase/lib/js/src/rebase.js");
var Pervasives  = require("bs-platform/lib/js/pervasives.js");
var Json_decode = require("bs-json/lib/js/src/Json_decode.js");
var Json_encode = require("bs-json/lib/js/src/Json_encode.js");

function next(ids) {
  return Rebase.List[/* reduce */0]((function (prim, prim$1) {
                return Math.max(prim, prim$1);
              }), 0, ids) + 1 | 0;
}

function fromInt(n) {
  return n;
}

function generateFunctionName(id) {
  return "__testCase" + (String(id) + "__");
}

var Id = /* module */[
  /* next */next,
  /* fromInt */fromInt,
  /* toString */Pervasives.string_of_int,
  /* generateFunctionName */generateFunctionName
];

var Test = /* module */[];

var id = Json_decode.string;

function testCase(json) {
  var match = Json_decode.pair(id, Json_decode.string, json);
  return /* record */[
          /* id */match[0],
          /* code */match[1]
        ];
}

function state(json) {
  return Json_decode.pair(Json_decode.string, (function (param) {
                return Json_decode.list(testCase, param);
              }), json);
}

var Decode = /* module */[
  /* id */id,
  /* testCase */testCase,
  /* state */state
];

var id$1 = Pervasives.string_of_int;

function testCase$1(value) {
  return Json_encode.pair(id$1, (function (prim) {
                return prim;
              }), /* tuple */[
              value[/* id */0],
              value[/* code */1]
            ]);
}

function state$1(value) {
  return Json_encode.pair((function (prim) {
                return prim;
              }), (function (param) {
                return Json_encode.list(testCase$1, param);
              }), value);
}

var Encode = /* module */[
  /* id */id$1,
  /* testCase */testCase$1,
  /* state */state$1
];

exports.Id     = Id;
exports.Test   = Test;
exports.Decode = Decode;
exports.Encode = Encode;
/* Json_encode Not a pure module */
