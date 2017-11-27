'use strict';

var ReasonReact = require("reason-react/lib/js/src/ReasonReact.js");

var component = ReasonReact.statelessComponent("Log");

function make(data, _) {
  var newrecord = component.slice();
  newrecord[/* didUpdate */5] = (function () {
      console.log(data);
      return /* () */0;
    });
  newrecord[/* render */9] = (function () {
      return null;
    });
  return newrecord;
}

exports.component = component;
exports.make      = make;
/* component Not a pure module */
