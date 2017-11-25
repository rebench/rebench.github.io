'use strict';

var Icon         = require("./Icon.js");
var Curry        = require("bs-platform/lib/js/curry.js");
var React        = require("react");
var Helpers      = require("../utils/Helpers.js");
var ReasonReact  = require("reason-react/lib/js/src/ReasonReact.js");
var ButtonStyles = require("./ButtonStyles.js");

function makeClassName(param) {
  if (param >= 758939798) {
    return ButtonStyles.dark;
  } else {
    return ButtonStyles.normal;
  }
}

function makeIcon(param) {
  if (param) {
    return ReasonReact.element(/* None */0, /* None */0, Icon.make(param[0], /* array */[]));
  } else {
    return null;
  }
}

var component = ReasonReact.statelessComponent("Button");

function make(label, icon, $staropt$star, onClick, _) {
  var style = $staropt$star ? $staropt$star[0] : /* Normal */-453122489;
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      return React.createElement("button", {
                  className: makeClassName(style),
                  onClick: (function () {
                      return Curry._1(onClick, /* () */0);
                    })
                }, makeIcon(icon), Helpers.text(label));
    });
  return newrecord;
}

var Styles = 0;

exports.Styles        = Styles;
exports.makeClassName = makeClassName;
exports.makeIcon      = makeIcon;
exports.component     = component;
exports.make          = make;
/* component Not a pure module */
