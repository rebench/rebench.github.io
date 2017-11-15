'use strict';

var Curry            = require("bs-platform/lib/js/curry.js");
var React            = require("react");
var Editor           = require("./components/Editor.js");
var Helpers          = require("./utils/Helpers.js");
var ReasonReact      = require("reason-react/lib/js/src/reasonReact.js");
var SetupBlockStyles = require("./SetupBlockStyles.js");

var component = ReasonReact.statelessComponent("TestCase");

function make(code, onChange, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      return React.createElement("div", {
                  className: SetupBlockStyles.root
                }, React.createElement("div", {
                      className: SetupBlockStyles.header
                    }, Helpers.text("Setup")), ReasonReact.element(/* None */0, /* None */0, Editor.make(code, /* RE */18355, /* None */0, /* None */0, /* None */0, /* Some */[Curry.__1(onChange)], /* array */[])));
    });
  return newrecord;
}

var Styles = 0;

exports.Styles    = Styles;
exports.component = component;
exports.make      = make;
/* component Not a pure module */
