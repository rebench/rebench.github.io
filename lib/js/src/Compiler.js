'use strict';

var BS     = require("./ffi/BS.js");
var List   = require("bs-platform/lib/js/list.js");
var Reason = require("reason");

function template(id, code) {
  return "\nlet " + (String(id) + (" = () => {\n  " + (String(code) + "\n};\n")));
}

function compile(setupCode, testCases) {
  return BS.compile(Reason.printML(Reason.parseRE(List.fold_left((function (acc, $$this) {
                            return acc + $$this;
                          }), setupCode, List.map((function ($$this) {
                                return template($$this[/* id */0], $$this[/* code */1]);
                              }), testCases))))).js_code;
}

exports.template = template;
exports.compile  = compile;
/* reason Not a pure module */
