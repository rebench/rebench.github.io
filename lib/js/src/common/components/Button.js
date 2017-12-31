'use strict';

var Icon         = require("./Icon.js");
var Curry        = require("bs-platform/lib/js/curry.js");
var React        = require("react");
var Helpers      = require("../utils/Helpers.js");
var ReasonReact  = require("reason-react/lib/js/src/ReasonReact.js");
var ButtonStyles = require("./ButtonStyles.js");

function makeIcon(param) {
  if (param) {
    return ReasonReact.element(/* None */0, /* None */0, Icon.make(param[0], /* array */[]));
  } else {
    return null;
  }
}

var component = ReasonReact.statelessComponent("Button");

function make(label, icon, $staropt$star, $staropt$star$1, onClick, _) {
  var alignIcon = $staropt$star ? $staropt$star[0] : /* Left */847852583;
  var className = $staropt$star$1 ? $staropt$star$1[0] : "";
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      var match = +(alignIcon === /* Left */847852583);
      var match$1 = +(alignIcon === /* Right */-57574468);
      return React.createElement("button", {
                  className: Curry._1(Helpers.classNames, /* :: */[
                        /* tuple */[
                          ButtonStyles.normal,
                          /* true */1
                        ],
                        /* :: */[
                          /* tuple */[
                            className,
                            /* true */1
                          ],
                          /* :: */[
                            /* tuple */[
                              "m-icon-left",
                              +(alignIcon === /* Left */847852583)
                            ],
                            /* :: */[
                              /* tuple */[
                                "m-icon-right",
                                +(alignIcon === /* Right */-57574468)
                              ],
                              /* [] */0
                            ]
                          ]
                        ]
                      ]),
                  onClick: (function () {
                      return Curry._1(onClick, /* () */0);
                    })
                }, match !== 0 ? makeIcon(icon) : null, Helpers.text(label), match$1 !== 0 ? makeIcon(icon) : null);
    });
  return newrecord;
}

var Styles = 0;

exports.Styles    = Styles;
exports.makeIcon  = makeIcon;
exports.component = component;
exports.make      = make;
/* component Not a pure module */
