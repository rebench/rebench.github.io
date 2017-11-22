'use strict';

var BS           = require("./ffi/BS.js");
var Block        = require("bs-platform/lib/js/block.js");
var Js_exn       = require("bs-platform/lib/js/js_exn.js");
var Rebase       = require("reason-rebase/lib/js/src/rebase.js");
var Reason       = require("reason");
var TestCase     = require("./TestCase.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");

function template(testCase) {
  var name = TestCase.Id[/* generateFunctionName */3](testCase[/* id */0]);
  var code = testCase[/* code */1];
  return "\nlet " + (String(name) + (" = () => {\n  " + (String(code) + "\n};\n")));
}


  function _captureConsoleErrors(f) {
    let errors = "";
    const _consoleError = console.error;
    console.error = (...args) => args.forEach(argument => errors += argument + `\n`);

    let res = f();

    console.error = _consoleError;
    return [res, errors ? [errors] : 0];
  }

;

function _assemble(setupCode, testCases) {
  return Rebase.List[/* reduce */0]((function (acc, $$this) {
                return acc + $$this;
              }), setupCode, Rebase.List[/* reverse */14](Rebase.List[/* map */2](template, testCases)));
}

function _reToML(reCode) {
  try {
    return /* Ok */Block.__(0, [Reason.printML(Reason.parseRE(reCode))]);
  }
  catch (raw_exn){
    var exn = Js_exn.internalToOCamlException(raw_exn);
    if (exn[0] === Js_exn.$$Error) {
      return /* Error */Block.__(1, [Rebase.Option[/* getOrRaise */15](Js_primitive.undefined_to_opt(exn[1].message))]);
    } else {
      throw exn;
    }
  }
}

function _compile(mlCode) {
  var match = _captureConsoleErrors((function () {
          return BS.compile(mlCode);
        }));
  var warnings = match[1];
  return Rebase.Result[/* map */3]((function (code) {
                return /* tuple */[
                        code,
                        warnings
                      ];
              }), match[0]);
}

function compile(setupCode, testCases) {
  var param = Rebase.Result[/* flatMap */6](_compile, _reToML(_assemble(setupCode, testCases)));
  if (param.tag) {
    return /* Error */Block.__(2, [param[0]]);
  } else {
    var match = param[0];
    var match$1 = match[1];
    var code = match[0];
    if (match$1) {
      return /* Warning */Block.__(1, [
                code,
                match$1[0]
              ]);
    } else {
      return /* Ok */Block.__(0, [code]);
    }
  }
}

exports.template  = template;
exports._assemble = _assemble;
exports._reToML   = _reToML;
exports._compile  = _compile;
exports.compile   = compile;
/*  Not a pure module */
