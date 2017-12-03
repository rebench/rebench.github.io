'use strict';

var BS       = require("../common/ffi/BS.js");
var Block    = require("bs-platform/lib/js/block.js");
var Refmt    = require("../common/ffi/Refmt.js");
var Rebase   = require("reason-rebase/lib/js/src/rebase.js");
var Reason   = require("reason");
var Debounce = require("../common/services/Debounce.js");
var Template = require("./Template.js");

function _assemble(setup, test) {
  var code = Template.apply(test[/* language */1], test[/* code */2]);
  var match = test[/* language */1];
  var code$1 = match !== 17247 ? /* Ok */Block.__(0, [code]) : Rebase.Result[/* map */3]((function (prim) {
            return Reason.printRE(prim);
          }), Refmt.parseML(code));
  return Rebase.Result[/* map */3]((function (code) {
                return setup + ("\n" + code);
              }), code$1);
}

function compile(setup, test) {
  var param = Rebase.Result[/* map */3]((function (prim) {
          return Reason.printML(prim);
        }), Rebase.Result[/* flatMap */6](Refmt.parseRE, _assemble(setup, test)));
  var tmp;
  tmp = param.tag ? /* Error */Block.__(1, [param[0].message]) : /* Ok */Block.__(0, [param[0]]);
  var param$1 = Rebase.Result[/* flatMap */6](BS.compile, tmp);
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

exports._assemble = _assemble;
exports.compile   = compile;
exports.component = component;
exports.make      = make;
/* include Not a pure module */
