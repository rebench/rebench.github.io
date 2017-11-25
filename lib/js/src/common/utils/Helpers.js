'use strict';

var Rebase = require("reason-rebase/lib/js/src/rebase.js");

function text(prim) {
  return prim;
}

function classNames(items) {
  return Rebase.List[/* toArray */16](Rebase.List[/* filter */10]((function (s) {
                      return +(s !== "");
                    }), Rebase.List[/* map */2]((function (param) {
                          if (param[1] !== 0) {
                            return param[0];
                          } else {
                            return "";
                          }
                        }), items))).join(" ");
}

exports.text       = text;
exports.classNames = classNames;
/* No side effect */
