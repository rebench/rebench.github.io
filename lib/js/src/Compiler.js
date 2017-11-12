'use strict';

var BS     = require("./ffi/BS.js");
var List   = require("bs-platform/lib/js/list.js");
var Reason = require("reason");

function template(id, code) {
  return "let " + (String(id) + (" = () => {\n  " + (String(code) + ("\n};\n\n" + (String(id) + "();\n")))));
}

function compile(testCases) {
  return List.fold_left((function (acc, $$this) {
                return acc + "\n" + $$this.js_code;
              }), "", List.map((function ($$this) {
                    return BS.compile(Reason.printML(Reason.parseRE(template($$this[/* id */0], $$this[/* code */1]))));
                  }), testCases));
}

exports.template = template;
exports.compile  = compile;
/* reason Not a pure module */
