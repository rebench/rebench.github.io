'use strict';

var Test        = require("./Test.js");
var Curry       = require("bs-platform/lib/js/curry.js");
var Json_decode = require("bs-json/lib/js/src/Json_decode.js");
var Json_encode = require("bs-json/lib/js/src/Json_encode.js");

function tuple3(decodeA, decodeB, decodeC, json) {
  if (Array.isArray(json)) {
    var length = json.length;
    if (length === 3) {
      return /* tuple */[
              Curry._1(decodeA, json[0]),
              Curry._1(decodeB, json[1]),
              Curry._1(decodeC, json[2])
            ];
    } else {
      throw [
            Json_decode.DecodeError,
            "Expected array of length 2, got array of length " + (String(length) + "")
          ];
    }
  } else {
    throw [
          Json_decode.DecodeError,
          "Expected array, got " + JSON.stringify(json)
        ];
  }
}

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
            return tuple3(id, language, Json_decode.string, param);
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
  /* tuple3 */tuple3,
  /* id */id,
  /* language */language,
  /* test */test,
  /* state */state
];

function tuple3$1(encodeA, encodeB, encodeC, param) {
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
  return tuple3$1(id$1, language$1, (function (prim) {
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
  /* tuple3 */tuple3$1,
  /* id */id$1,
  /* language */language$1,
  /* test */test$1,
  /* state */state$1
];

exports.Decode = Decode;
exports.Encode = Encode;
/* Json_encode Not a pure module */
