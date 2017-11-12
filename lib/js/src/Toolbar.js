'use strict';

var Curry       = require("bs-platform/lib/js/curry.js");
var React       = require("react");
var ReasonReact = require("reason-react/lib/js/src/reasonReact.js");

function text(prim) {
  return prim;
}

var component = ReasonReact.statelessComponent("Toolbar");

function make(onButtonClick, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      return React.createElement("div", undefined, React.createElement("button", {
                      onClick: (function () {
                          return Curry._1(onButtonClick, /* RunAll */-267608394);
                        })
                    }, "Run All"), React.createElement("button", {
                      onClick: (function () {
                          return Curry._1(onButtonClick, /* Add */3254785);
                        })
                    }, "Add"));
    });
  return newrecord;
}

exports.text      = text;
exports.component = component;
exports.make      = make;
/* component Not a pure module */
