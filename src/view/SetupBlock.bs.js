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
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */component[/* didMount */4],
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function () {
              return ReasonReact.element(/* None */0, /* None */0, Curry._3(SyntaxChecker[/* make */1], code, 100, (function (param) {
                                return ReasonReact.element(/* None */0, /* None */0, Block_.make(/* `Text */[
                                                936573133,
                                                "Setup"
                                              ], /* None */0, /* None */0, param[0], /* Some */[true], /* array */[ReasonReact.element(/* None */0, /* None */0, Editor.make(code, /* RE */18355, /* None */0, /* Some */[param[1]], /* None */0, /* None */0, /* Some */[onChange], /* array */[]))]));
                              })));
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */component[/* reducer */12],
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

exports.SyntaxChecker = SyntaxChecker;
exports.component = component;
exports.make = make;
/* SyntaxChecker Not a pure module */
