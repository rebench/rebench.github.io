'use strict';

var React = require("react");
var ReasonReact = require("reason-react/src/ReasonReact.js");

var component = ReasonReact.statelessComponent("Icon");

function make(name, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      return React.createElement("span", {
                  className: "mdi mdi-" + (String(name) + "")
                });
    });
  return newrecord;
}

exports.component = component;
exports.make = make;
/* component Not a pure module */
