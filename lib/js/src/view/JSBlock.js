'use strict';

var React         = require("react");
var Editor        = require("../common/components/Editor.js");
var Helpers       = require("../common/utils/Helpers.js");
var ReasonReact   = require("reason-react/lib/js/src/ReasonReact.js");
var JSBlockStyles = require("./JSBlockStyles.js");

var component = ReasonReact.statelessComponent("JSBlock");

function make(code, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      return React.createElement("div", {
                  className: JSBlockStyles.root
                }, React.createElement("div", {
                      className: JSBlockStyles.header
                    }, Helpers.text("Generated JavaScript")), ReasonReact.element(/* None */0, /* None */0, Editor.make(code, /* JS */16585, /* None */0, /* Some */[/* true */1], /* None */0, /* None */0, /* array */[])));
    });
  return newrecord;
}

var Styles = 0;

exports.Styles    = Styles;
exports.component = component;
exports.make      = make;
/* component Not a pure module */
