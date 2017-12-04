'use strict';

var Refmt        = require("../common/ffi/Refmt.js");
var Acorn        = require("acorn");
var Js_exn       = require("bs-platform/lib/js/js_exn.js");
var Rebase       = require("reason-rebase/lib/js/src/rebase.js");
var Helpers      = require("../common/utils/Helpers.js");
var Template     = require("./Template.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");

function fromRefmt(e) {
  return /* record */[
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
        ];
}

function fromAcorn(e) {
  var loc = e.loc;
  return /* record */[
          /* message */Rebase.Option[/* getOrRaise */15](Js_primitive.undefined_to_opt(e.message)),
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

var $$Error = /* module */[
  /* fromRefmt */fromRefmt,
  /* fromAcorn */fromAcorn
];

function check(language, code) {
  if (language !== 17247) {
    if (language >= 18355) {
      var param = Refmt.parseRE(Template.apply(language, code));
      if (param.tag) {
        return /* Some */[fromRefmt(param[0])];
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
          return /* Some */[fromAcorn(exn[1])];
        } else {
          throw exn;
        }
      }
      if (exit === 1) {
        ((0));
        return /* None */0;
      }
      
    }
  } else {
    var param$1 = Refmt.parseML(Template.apply(language, code));
    if (param$1.tag) {
      return /* Some */[fromRefmt(Helpers.log(param$1[0]))];
    } else {
      return /* None */0;
    }
  }
}

exports.$$Error = $$Error;
exports.check   = check;
/* Refmt Not a pure module */
