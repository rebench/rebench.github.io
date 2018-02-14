'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Block_ = require("../common/components/Block_.bs.js");
var Editor = require("../common/components/Editor.bs.js");
var Compiler = require("../services/Compiler.bs.js");
var Debounce = require("../common/services/Debounce.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");

function compute(code) {
  var param = Compiler.checkSetup(code);
  switch (param.tag | 0) {
    case 0 : 
    case 1 : 
        return /* tuple */[
                /* None */0,
                /* [] */0
              ];
    case 2 : 
        return /* tuple */[
                /* Some */[param[0]],
                param[1]
              ];
    
  }
}

var SyntaxChecker = Debounce.Make(/* module */[/* compute */compute]);

var component = ReasonReact.statelessComponent("SetupBlock");

function make(code, onChange, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      return ReasonReact.element(/* None */0, /* None */0, Curry._3(SyntaxChecker[/* make */1], code, 100, (function (param) {
                        return ReasonReact.element(/* None */0, /* None */0, Block_.make(/* `Text */[
                                        936573133,
                                        "Setup"
                                      ], /* None */0, /* None */0, param[0], /* Some */[/* true */1], /* array */[ReasonReact.element(/* None */0, /* None */0, Editor.make(code, /* RE */18355, /* None */0, /* Some */[param[1]], /* None */0, /* None */0, /* Some */[onChange], /* array */[]))]));
                      })));
    });
  return newrecord;
}

exports.SyntaxChecker = SyntaxChecker;
exports.component = component;
exports.make = make;
/* SyntaxChecker Not a pure module */
