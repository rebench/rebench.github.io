'use strict';

var BS       = require("./ffi/BS.js");
var List     = require("bs-platform/lib/js/list.js");
var Reason   = require("reason");
var TestCase = require("./TestCase.js");

function template(testCase) {
  var name = TestCase.Id[/* generateFunctionName */3](testCase[/* id */0]);
  var code = testCase[/* code */1];
  return "\nlet " + (String(name) + (" = () => {\n  " + (String(code) + "\n};\n")));
}

function compile(setupCode, testCases) {
  return BS.compile(Reason.printML(Reason.parseRE(List.fold_left((function (acc, $$this) {
                            return acc + $$this;
                          }), setupCode, List.rev(List.map(template, testCases)))))).js_code;
}

exports.template = template;
exports.compile  = compile;
/* reason Not a pure module */
