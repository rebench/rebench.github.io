'use strict';

var Test        = require("./Test.js");
var Curry       = require("bs-platform/lib/js/curry.js");
var Json_decode = require("bs-json/lib/js/src/Json_decode.js");
var Json_encode = require("bs-json/lib/js/src/Json_encode.js");

var id = Json_decode.string;

function language(json) {
  var language$1 = Json_decode.string(json);
  switch (language$1) {
    case "js" : 
        return /* JS */16585;
    case "ml" : 
        return /* ML */17247;
    case "re" : 
        return /* RE */18355;
    default:
      throw [
            Json_decode.DecodeError,
            "Unknown language: " + (String(language$1) + "")
          ];
  }
}

function test(json) {
  var match = Json_decode.either((function (param) {
            return Json_decode.tuple3(id, language, Json_decode.string, param);
          }), (function (param) {
            return Json_decode.map((function (param) {
                          return /* tuple */[
                                  param[0],
                                  /* RE */18355,
                                  param[1]
                                ];
                        }), (function (param) {
                          return Json_decode.pair(id, Json_decode.string, param);
                        }), param);
          }))(json);
  return /* record */[
          /* id */match[0],
          /* language */match[1],
          /* code */match[2]
        ];
}

function state(json) {
  return Json_decode.pair(Json_decode.string, (function (param) {
                return Json_decode.list(test, param);
              }), json);
}

var Decode = /* module */[
  /* id */id,
  /* language */language,
  /* test */test,
  /* state */state
];

function tuple3(encodeA, encodeB, encodeC, param) {
  return /* array */[
          Curry._1(encodeA, param[0]),
          Curry._1(encodeB, param[1]),
          Curry._1(encodeC, param[2])
        ];
}

function id$1(value) {
  return Curry._1(Test.Id[/* toString */2], value);
}

function language$1(value) {
  if (value !== 17247) {
    if (value >= 18355) {
      return "re";
    } else {
      return "js";
    }
  } else {
    return "ml";
  }
}

function test$1(value) {
  return Json_encode.tuple3(id$1, language$1, (function (prim) {
                return prim;
              }), /* tuple */[
              value[/* id */0],
              value[/* language */1],
              value[/* code */2]
            ]);
}

function state$1(value) {
  return Json_encode.pair((function (prim) {
                return prim;
              }), (function (param) {
                return Json_encode.list(test$1, param);
              }), value);
}

var Encode = /* module */[
  /* tuple3 */tuple3,
  /* id */id$1,
  /* language */language$1,
  /* test */test$1,
  /* state */state$1
];

exports.Decode = Decode;
exports.Encode = Encode;
/* Json_encode Not a pure module */
