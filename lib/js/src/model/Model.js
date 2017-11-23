'use strict';

var Test        = require("./Test.js");
var Curry       = require("bs-platform/lib/js/curry.js");
var Json_decode = require("bs-json/lib/js/src/Json_decode.js");
var Json_encode = require("bs-json/lib/js/src/Json_encode.js");

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

function id$1(value) {
  return Curry._1(Test.Id[/* toString */2], value);
}

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

exports.Decode = Decode;
exports.Encode = Encode;
/* Json_encode Not a pure module */
