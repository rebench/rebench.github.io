'use strict';

var Js_exn       = require("bs-platform/lib/js/js_exn.js");
var Rebase       = require("reason-rebase/lib/js/src/rebase.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");

function retrieve() {
  var fromLocalStorage = function () {
    return Rebase.Option[/* map */2]((function (prim) {
                  return prim;
                }), Rebase.Option[/* map */2]((function (prim) {
                      return JSON.parse(prim);
                    }), Js_primitive.null_to_opt(localStorage.getItem("rebench-data"))));
  };
  return Rebase.Option[/* or_ */13](fromLocalStorage(/* () */0), /* None */0);
}

function persist(setupCode, testCases) {
  try {
    var data = Rebase.Option[/* getOrRaise */15](Js_primitive.undefined_to_opt(JSON.stringify(/* tuple */[
                  setupCode,
                  testCases
                ])));
    localStorage.setItem("rebench-data", data);
    return /* () */0;
  }
  catch (raw_e){
    var e = Js_exn.internalToOCamlException(raw_e);
    console.log(e);
    return /* () */0;
  }
}

exports.retrieve = retrieve;
exports.persist  = persist;
/* No side effect */
