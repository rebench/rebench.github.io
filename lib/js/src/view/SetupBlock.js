'use strict';

var Curry       = require("bs-platform/lib/js/curry.js");
var Block_      = require("../common/components/Block_.js");
var Editor      = require("../common/components/Editor.js");
var ReasonReact = require("reason-react/lib/js/src/ReasonReact.js");

var component = ReasonReact.statelessComponent("SetupBlock");

function make(code, onChange, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      return ReasonReact.element(/* None */0, /* None */0, Block_.make(/* `Text */[
                      936573133,
                      "Setup"
                    ], /* None */0, /* None */0, /* array */[ReasonReact.element(/* None */0, /* None */0, Editor.make(code, /* RE */18355, /* None */0, /* None */0, /* None */0, /* Some */[Curry.__1(onChange)], /* array */[]))]));
    });
  return newrecord;
}

exports.component = component;
exports.make      = make;
/* component Not a pure module */
