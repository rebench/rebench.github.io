'use strict';

var React         = require("react");
var Helpers       = require("./utils/Helpers.js");
var ReasonReact   = require("reason-react/lib/js/src/reasonReact.js");
var MessageStyles = require("./MessageStyles.js");

var component = ReasonReact.statelessComponent("Error");

function make(type_, message, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      var style = type_ >= 106380200 ? MessageStyles.error : MessageStyles.warning;
      return React.createElement("div", {
                  className: style
                }, Helpers.text(message));
    });
  return newrecord;
}

var Styles = 0;

exports.Styles    = Styles;
exports.component = component;
exports.make      = make;
/* component Not a pure module */
