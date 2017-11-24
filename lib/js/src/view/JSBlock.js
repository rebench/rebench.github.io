'use strict';

var Block_      = require("../common/components/Block_.js");
var Editor      = require("../common/components/Editor.js");
var ReasonReact = require("reason-react/lib/js/src/ReasonReact.js");

var component = ReasonReact.statelessComponent("JSBlock");

function make(code, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      return ReasonReact.element(/* None */0, /* None */0, Block_.make(/* `Text */[
                      936573133,
                      "Generated JavaScript"
                    ], /* None */0, /* None */0, /* array */[ReasonReact.element(/* None */0, /* None */0, Editor.make(code, /* JS */16585, /* None */0, /* Some */[/* true */1], /* None */0, /* None */0, /* array */[]))]));
    });
  return newrecord;
}

exports.component = component;
exports.make      = make;
/* component Not a pure module */
