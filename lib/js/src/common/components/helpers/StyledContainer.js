'use strict';

var Curry       = require("bs-platform/lib/js/curry.js");
var ReasonReact = require("reason-react/lib/js/src/ReasonReact.js");
var TypedGlamor = require("typed-glamor/lib/js/src/TypedGlamor.bs.js");

function Make(Config) {
  var component = ReasonReact.statelessComponent("Style");
  var make = function (state, $staropt$star, $staropt$star$1, children) {
    var element = $staropt$star ? $staropt$star[0] : "div";
    var className = $staropt$star$1 ? $staropt$star$1[0] : "";
    var newrecord = component.slice();
    newrecord[/* render */9] = (function () {
        return ReasonReact.createDomElement(element, {
                    className: TypedGlamor.css(Curry._1(Config[/* css */0], state)) + (" " + className)
                  }, children);
      });
    return newrecord;
  };
  return /* module */[
          /* component */component,
          /* make */make
        ];
}

exports.Make = Make;
/* ReasonReact Not a pure module */
