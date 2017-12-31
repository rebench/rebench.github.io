'use strict';

var BS           = require("../common/ffi/BS.js");
var Block        = require("bs-platform/lib/js/block.js");
var Refmt        = require("../common/ffi/Refmt.js");
var Acorn        = require("acorn");
var Js_exn       = require("bs-platform/lib/js/js_exn.js");
var Rebase       = require("@glennsl/rebase/lib/js/src/Rebase.bs.js");
var Reason       = require("reason");
var Template     = require("./Template.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");

function fromRefmt(e) {
  return /* record */[
          /* message */e.message,
          /* range */Rebase.Option[/* map */0]((function ($$location) {
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
        ];
}

function fromAcorn(e) {
  var loc = e.loc;
  return /* record */[
          /* message */Rebase.Option[/* getOrRaise */17](Js_primitive.undefined_to_opt(e.message)),
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
}

function toMark(error) {
  return {
          from: Rebase.Option[/* mapOr */18]((function (range) {
                  return {
                          line: range[/* from */0][/* line */0],
                          ch: range[/* from */0][/* column */1]
                        };
                }), {
                line: 0,
                ch: 0
              }, error[/* range */1]),
          to: Rebase.Option[/* mapOr */18]((function (range) {
                  return {
                          line: range[/* to_ */1][/* line */0],
                          ch: range[/* to_ */1][/* column */1]
                        };
                }), {
                line: 0,
                ch: 1
              }, error[/* range */1]),
          options: {
            className: "syntax-error",
            title: error[/* message */0]
          }
        };
}

var $$SyntaxError = /* module */[
  /* fromRefmt */fromRefmt,
  /* fromAcorn */fromAcorn,
  /* toMark */toMark
];

function _assemble(setup, code) {
  return setup + ("\n" + code);
}

function _check(language, code) {
  if (language !== 17247) {
    if (language >= 18355) {
      return Rebase.Result[/* map2 */1]((function (ast) {
                    return Reason.printRE(ast);
                  }), fromRefmt, Refmt.parseRE(Template.apply(language, code)));
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
          return /* Error */Block.__(1, [fromAcorn(exn[1])]);
        } else {
          throw exn;
        }
      }
      if (exit === 1) {
        ((0));
        return /* Ok */Block.__(0, [Template.apply(/* JS */16585, code)]);
      }
      
    }
  } else {
    return Rebase.Result[/* map2 */1]((function (ast) {
                  return Reason.printRE(ast);
                }), fromRefmt, Refmt.parseML(Template.apply(language, code)));
  }
}

function checkSetup(code) {
  var param = Refmt.parseRE(code);
  if (param.tag) {
    var e = fromRefmt(param[0]);
    return /* Error */Block.__(2, [
              e[/* message */0],
              /* :: */[
                toMark(e),
                /* [] */0
              ]
            ]);
  } else {
    var param$1 = BS.compile(Reason.printML(param[0]));
    if (param$1.tag) {
      return /* Error */Block.__(2, [
                param$1[0],
                /* [] */0
              ]);
    } else {
      var match = param$1[0];
      var match$1 = match[1];
      var code$1 = match[0];
      if (match$1) {
        return /* Warning */Block.__(1, [
                  code$1,
                  match$1[0]
                ]);
      } else {
        return /* Ok */Block.__(0, [code$1]);
      }
    }
  }
}

function compileTest(setup, test) {
  var param = _check(test[/* language */1], test[/* code */2]);
  if (param.tag) {
    var e = param[0];
    return /* Error */Block.__(2, [
              e[/* message */0],
              /* :: */[
                toMark(e),
                /* [] */0
              ]
            ]);
  } else {
    var param$1 = Rebase.Result[/* flatMap */6](BS.compile, Rebase.Result[/* map2 */1](Rebase.Fn[/* id */0], (function (e) {
                return e.message;
              }), Rebase.Result[/* map */0]((function (prim) {
                    return Reason.printML(prim);
                  }), Refmt.parseRE(_assemble(setup, param[0])))));
    if (param$1.tag) {
      return /* Error */Block.__(2, [
                param$1[0],
                /* [] */0
              ]);
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
}

exports.$$SyntaxError = $$SyntaxError;
exports._assemble     = _assemble;
exports._check        = _check;
exports.checkSetup    = checkSetup;
exports.compileTest   = compileTest;
/* BS Not a pure module */
