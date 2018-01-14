'use strict';

var React         = require("react");
var Vrroom        = require("vrroom/lib/js/src/Vrroom.bs.js");
var ReasonReact   = require("reason-react/lib/js/src/ReasonReact.js");
var TypedGlamor   = require("typed-glamor/lib/js/src/TypedGlamor.bs.js");
var MessageStyles = require("./MessageStyles.js");

var component = ReasonReact.statelessComponent("Error");

function make(kind, message, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      return React.createElement("div", {
                  className: TypedGlamor.toString(MessageStyles.container(kind))
                }, Vrroom.Helpers[/* text */0](message));
    });
  return newrecord;
}

exports.component = component;
exports.make      = make;
/* component Not a pure module */
