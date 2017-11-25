'use strict';

var Block       = require("bs-platform/lib/js/block.js");
var Curry       = require("bs-platform/lib/js/curry.js");
var React       = require("react");
var Helpers     = require("../utils/Helpers.js");
var BlockStyles = require("./BlockStyles.js");
var ReasonReact = require("reason-react/lib/js/src/ReasonReact.js");

function renderHeader(param) {
  if (param[0] >= 936573133) {
    return Helpers.text(param[1]);
  } else {
    return param[1];
  }
}

function renderFooter(param) {
  if (param) {
    return React.createElement("footer", {
                className: BlockStyles.footer
              }, param[0]);
  } else {
    return null;
  }
}

function makeClassName($staropt$star, collapsible, state) {
  var className = $staropt$star ? $staropt$star[0] : "";
  return Helpers.classNames(/* :: */[
              /* tuple */[
                BlockStyles.root,
                /* true */1
              ],
              /* :: */[
                /* tuple */[
                  className,
                  /* true */1
                ],
                /* :: */[
                  /* tuple */[
                    "collapsible",
                    collapsible
                  ],
                  /* :: */[
                    /* tuple */[
                      "s-collapsed",
                      state[/* collapsed */0]
                    ],
                    /* [] */0
                  ]
                ]
              ]
            ]);
}

var component = ReasonReact.reducerComponent("Block");

function make(header, footer, className, $staropt$star, children) {
  var collapsible = $staropt$star ? $staropt$star[0] : /* false */0;
  var newrecord = component.slice();
  newrecord[/* render */9] = (function (param) {
      return React.createElement("section", {
                  className: makeClassName(className, collapsible, param[/* state */2])
                }, React.createElement("header", {
                      onClick: Curry._1(param[/* reduce */1], (function () {
                              return /* HeaderClicked */0;
                            }))
                    }, renderHeader(header)), React.createElement("main", undefined, children), renderFooter(footer));
    });
  newrecord[/* initialState */10] = (function () {
      return /* record */[/* collapsed : false */0];
    });
  newrecord[/* reducer */12] = (function (_, state) {
      if (collapsible !== 0) {
        return /* Update */Block.__(0, [/* record */[/* collapsed */1 - state[/* collapsed */0]]]);
      } else {
        return /* NoUpdate */0;
      }
    });
  return newrecord;
}

var Styles = 0;

exports.Styles        = Styles;
exports.renderHeader  = renderHeader;
exports.renderFooter  = renderFooter;
exports.makeClassName = makeClassName;
exports.component     = component;
exports.make          = make;
/* component Not a pure module */
