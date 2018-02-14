'use strict';

var React = require("react");
var Vrroom = require("vrroom/src/Vrroom.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var TypedGlamor = require("typed-glamor/src/TypedGlamor.bs.js");
var MessageStyles = require("./MessageStyles.bs.js");

var component = ReasonReact.statelessComponent("Error");

function make(kind, message, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      return React.createElement("div", {
                  className: TypedGlamor.toString(MessageStyles.container(kind))
                }, Vrroom.text(message));
    });
  return newrecord;
}

exports.component = component;
exports.make = make;
/* component Not a pure module */
