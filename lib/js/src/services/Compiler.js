'use strict';

var BS           = require("../common/ffi/BS.js");
var Test         = require("../model/Test.js");
var Block        = require("bs-platform/lib/js/block.js");
var Acorn        = require("acorn");
var Js_exn       = require("bs-platform/lib/js/js_exn.js");
var Rebase       = require("reason-rebase/lib/js/src/rebase.js");
var Reason       = require("reason");
var Debounce     = require("../common/services/Debounce.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");


  function _captureConsoleErrors(f) {
    let errors = "";
    const _consoleError = console.error;
    console.error = (...args) => args.forEach(argument => errors += argument + `\n`);

    let res = f();

    console.error = _consoleError;
    return [res, errors ? [errors] : 0];
  }

;

function _mlToRE(reCode) {
  try {
    return /* Ok */Block.__(0, [Reason.printRE(Reason.parseML(reCode))]);
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

function _applyTemplate(param) {
  var code = param[/* code */2];
  if (param[/* language */1] >= 18355) {
    return "let __test__ = () => {\n  " + (String(code) + "\n};\n");
  } else {
    return "let __test__ = () => {\n  [%raw {|" + (String(code) + "|}]\n};\n");
  }
}

function _assemble(setup, test) {
  return setup + ("\n" + _applyTemplate(test));
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

function checkSyntax(language, code) {
  if (language >= 18355) {
    var param = _reToML(_applyTemplate(/* record */[
              /* id */Test.Id[/* fromInt */1](0),
              /* language : RE */18355,
              /* code */code
            ]));
    if (param.tag) {
      var e = param[0];
      return /* Some */[/* record */[
                /* message */e.message,
                /* range */Rebase.Option[/* map */2]((function ($$location) {
                        return /* record */[
                                /* from : record */[
                                  /* line */$$location.startLine - 2 | 0,
                                  /* column */$$location.startLineStartChar - 1 | 0
                                ],
                                /* to_ : record */[
                                  /* line */$$location.endLine - 2 | 0,
                                  /* column */$$location.endLineEndChar
                                ]
                              ];
                      }), Js_primitive.null_undefined_to_opt(e.location))
              ]];
    } else {
      return /* None */0;
    }
  } else {
    var exit = 0;
    var val;
    try {
      val = Acorn.parse(code);
      exit = 1;
    }
    catch (raw_exn){
      var exn = Js_exn.internalToOCamlException(raw_exn);
      if (exn[0] === Js_exn.$$Error) {
        var e$1 = exn[1];
        return Rebase.Option[/* map */2]((function (message) {
                      var loc = e$1.loc;
                      return /* record */[
                              /* message */message,
                              /* range : Some */[/* record */[
                                  /* from : record */[
                                    /* line */loc.line - 1 | 0,
                                    /* column */loc.column
                                  ],
                                  /* to_ : record */[
                                    /* line */loc.line - 1 | 0,
                                    /* column */loc.column + 1 | 0
                                  ]
                                ]]
                            ];
                    }), Js_primitive.undefined_to_opt(e$1.message));
      } else {
        throw exn;
      }
    }
    if (exit === 1) {
      ((0));
      return /* None */0;
    }
    
  }
}

function compile(setup, test) {
  var param = _reToML(_assemble(setup, test));
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

function compute(param) {
  return compile(param[0], param[1]);
}

var include = Debounce.Make(/* module */[/* compute */compute]);

var component = include[0];

var make = include[1];

exports._mlToRE        = _mlToRE;
exports._reToML        = _reToML;
exports._applyTemplate = _applyTemplate;
exports._assemble      = _assemble;
exports._compile       = _compile;
exports.checkSyntax    = checkSyntax;
exports.compile        = compile;
exports.component      = component;
exports.make           = make;
/*  Not a pure module */
