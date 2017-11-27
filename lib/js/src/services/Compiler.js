'use strict';

var BS     = require("../common/ffi/BS.js");
var Test   = require("../model/Test.js");
var Block  = require("bs-platform/lib/js/block.js");
var Js_exn = require("bs-platform/lib/js/js_exn.js");
var Rebase = require("reason-rebase/lib/js/src/rebase.js");
var Reason = require("reason");

function _applyTemplate(param) {
  var name = Test.Id[/* generateFunctionName */3](param[/* id */0]);
  return "let " + (String(name) + (" = () => {\n  " + (String(param[/* code */1]) + "\n};\n")));
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

function _assemble(setup, tests) {
  return Rebase.List[/* reduce */0]((function (acc, $$this) {
                return acc + $$this;
              }), setup, Rebase.List[/* reverse */14](Rebase.List[/* map */2](_applyTemplate, tests)));
}

function _reToML(reCode) {
  try {
    return /* Ok */Block.__(0, [Reason.printML(Reason.parseRE(reCode))]);
  }
  catch (raw_exn){
    var exn = Js_exn.internalToOCamlException(raw_exn);
    if (exn[0] === Js_exn.$$Error) {
      return /* Error */Block.__(1, [exn[1]]);
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

function checkSyntax(code) {
  return _reToML(_applyTemplate(/* record */[
                  /* id */Test.Id[/* fromInt */1](0),
                  /* code */code
                ]));
}

function compile(setup, tests) {
  var param = _reToML(_assemble(setup, tests));
  var tmp;
  tmp = param.tag ? /* Error */Block.__(1, [param[0].message]) : /* Ok */Block.__(0, [param[0]]);
  var param$1 = Rebase.Result[/* flatMap */6](_compile, tmp);
  if (param$1.tag) {
    return /* Error */Block.__(2, [param$1[0]]);
  } else {
    var match = param$1[0];
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

exports._applyTemplate = _applyTemplate;
exports._assemble      = _assemble;
exports._reToML        = _reToML;
exports._compile       = _compile;
exports.checkSyntax    = checkSyntax;
exports.compile        = compile;
/*  Not a pure module */
