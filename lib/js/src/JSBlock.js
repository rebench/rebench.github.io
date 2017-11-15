'use strict';

var React         = require("react");
var Editor        = require("./components/Editor.js");
var Helpers       = require("./utils/Helpers.js");
var ReasonReact   = require("reason-react/lib/js/src/reasonReact.js");
var JSBlockStyles = require("./JSBlockStyles.js");

var component = ReasonReact.statelessComponent("TestCase");

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
