'use strict';

var Curry         = require("bs-platform/lib/js/curry.js");
var Block_        = require("../common/components/Block_.js");
var Editor        = require("../common/components/Editor.js");
var ReasonReact   = require("reason-react/lib/js/src/ReasonReact.js");
var SyntaxChecker = require("../services/SyntaxChecker.js");

var component = ReasonReact.statelessComponent("SetupBlock");

function make(code, onChange, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      return ReasonReact.element(/* None */0, /* None */0, Curry._3(SyntaxChecker.make, /* tuple */[
                      /* RE */18355,
                      code
                    ], 100, (function (param) {
                        return ReasonReact.element(/* None */0, /* None */0, Block_.make(/* `Text */[
                                        936573133,
                                        "Setup"
                                      ], /* None */0, /* Some */[param[0] !== 0 ? "s-error" : ""], /* Some */[/* true */1], /* array */[ReasonReact.element(/* None */0, /* None */0, Editor.make(code, /* RE */18355, /* None */0, /* Some */[param[1]], /* None */0, /* None */0, /* Some */[onChange], /* array */[]))]));
                      })));
    });
  return newrecord;
}

exports.component = component;
exports.make      = make;
/* component Not a pure module */
