'use strict';

var Rebase = require("@glennsl/rebase/lib/js/src/Rebase.bs.js");

function text(prim) {
  return prim;
}

function classNames(items) {
  return Rebase.$$String[/* joinWith */11](" ", Rebase.List[/* filter */10]((function (s) {
                    return +(s !== "");
                  }), Rebase.List[/* map */0]((function (param) {
                        if (param[1] !== 0) {
                          return param[0];
                        } else {
                          return "";
                        }
                      }), items)));
}

exports.text       = text;
exports.classNames = classNames;
/* No side effect */
