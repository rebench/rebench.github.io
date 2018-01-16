'use strict';

var Icon         = require("./Icon.js");
var Curry        = require("bs-platform/lib/js/curry.js");
var React        = require("react");
var Vrroom       = require("vrroom/lib/js/src/Vrroom.bs.js");
var ReasonReact  = require("reason-react/lib/js/src/ReasonReact.js");
var ButtonStyles = require("./ButtonStyles.js");

function makeIcon(param) {
  if (param) {
    return ReasonReact.element(/* None */0, /* None */0, Icon.make(param[0], /* array */[]));
  } else {
    return Vrroom.Helpers[/* null */1];
  }
}

var component = ReasonReact.statelessComponent("Button");

function make(label, icon, $staropt$star, $staropt$star$1, $staropt$star$2, onClick, _) {
  var style = $staropt$star ? $staropt$star[0] : /* Normal */-453122489;
  var alignIcon = $staropt$star$1 ? $staropt$star$1[0] : /* Left */847852583;
  var className = $staropt$star$2 ? $staropt$star$2[0] : "";
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      var match = +(alignIcon === /* Left */847852583);
      var match$1 = +(alignIcon === /* Right */-57574468);
      return React.createElement("button", {
                  className: Curry._1(Vrroom.Helpers[/* ClassName */3][/* join */0], /* :: */[
                        String(ButtonStyles.root(style, alignIcon)),
                        /* :: */[
                          className,
                          /* [] */0
                        ]
                      ]),
                  onClick: (function () {
                      return Curry._1(onClick, /* () */0);
                    })
                }, match !== 0 ? makeIcon(icon) : Vrroom.Helpers[/* null */1], Vrroom.Helpers[/* text */0](label), match$1 !== 0 ? makeIcon(icon) : Vrroom.Helpers[/* null */1]);
    });
  return newrecord;
}

var Styles = 0;

exports.Styles    = Styles;
exports.makeIcon  = makeIcon;
exports.component = component;
exports.make      = make;
/* component Not a pure module */
