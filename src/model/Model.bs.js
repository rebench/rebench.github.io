'use strict';

var Test = require("./Test.bs.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Rebase = require("@glennsl/rebase/src/Rebase.bs.js");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");
var Json_encode = require("@glennsl/bs-json/src/Json_encode.bs.js");

var id = Curry._2(Rebase.Fn[/* >> */6], Json_decode.string, (function (prim) {
        return prim;
      }));

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

var test = Json_decode.either((function (param) {
        return Json_decode.map((function (param) {
                      return /* record */[
                              /* id */param[0],
                              /* language */param[1],
                              /* code */param[2]
                            ];
                    }), (function (param) {
                      return Json_decode.tuple3(id, language, Json_decode.string, param);
                    }), param);
      }), (function (param) {
        return Json_decode.map((function (param) {
                      return /* record */[
                              /* id */param[0],
                              /* language : RE */18355,
                              /* code */param[1]
                            ];
                    }), (function (param) {
                      return Json_decode.pair(id, Json_decode.string, param);
                    }), param);
      }));

function state(param) {
  return Json_decode.pair(Json_decode.string, (function (param) {
                return Json_decode.list(test, param);
              }), param);
}

var Decode = /* module */[
  /* id */id,
  /* language */language,
  /* test */test,
  /* state */state
];

var id$1 = Curry._2(Rebase.Fn[/* >> */6], Test.Id[/* toString */2], (function (prim) {
        return prim;
      }));

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

function state$1(param) {
  return Json_encode.pair((function (prim) {
                return prim;
              }), (function (param) {
                return Json_encode.list(test$1, param);
              }), param);
}

var Encode = /* module */[
  /* id */id$1,
  /* language */language$1,
  /* test */test$1,
  /* state */state$1
];

exports.Decode = Decode;
exports.Encode = Encode;
/* id Not a pure module */
