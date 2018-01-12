'use strict';

var Block       = require("bs-platform/lib/js/block.js");
var Curry       = require("bs-platform/lib/js/curry.js");
var React       = require("react");
var Vrroom      = require("vrroom/lib/js/src/Vrroom.bs.js");
var Message     = require("./Message.js");
var BlockStyles = require("./BlockStyles.js");
var ReasonReact = require("reason-react/lib/js/src/ReasonReact.js");

function renderHeader(param) {
  if (param[0] >= 936573133) {
    return React.createElement("div", {
                className: BlockStyles.textHeader
              }, Vrroom.Helpers[/* text */0](param[1]));
  } else {
    return param[1];
  }
}

function makeClassName($staropt$star, collapsible, state) {
  var className = $staropt$star ? $staropt$star[0] : "";
  return Curry._1(Vrroom.Helpers[/* ClassName */3][/* join */0], /* :: */[
              String(BlockStyles.root),
              /* :: */[
                className,
                /* :: */[
                  Curry._2(Vrroom.Helpers[/* ClassName */3][/* if_ */1], collapsible, "collapsible"),
                  /* :: */[
                    Curry._2(Vrroom.Helpers[/* ClassName */3][/* if_ */1], state[/* collapsed */0], "s-collapsed"),
                    /* [] */0
                  ]
                ]
              ]
            ]);
}

var component = ReasonReact.reducerComponent("Block");

function make(header, footer, className, error, $staropt$star, children) {
  var collapsible = $staropt$star ? $staropt$star[0] : /* false */0;
  var newrecord = component.slice();
  newrecord[/* render */9] = (function (param) {
      return React.createElement("section", {
                  className: makeClassName(className, collapsible, param[/* state */2])
                }, React.createElement("header", {
                      onClick: Curry._1(param[/* reduce */1], (function () {
                              return /* HeaderClicked */0;
                            }))
                    }, renderHeader(header)), ReasonReact.createDomElement("main", { }, children), ReasonReact.element(/* None */0, /* None */0, Curry._2(Vrroom.Control[/* IfSome */3][/* make */1], error, (function (error) {
                            return ReasonReact.element(/* None */0, /* None */0, Message.make(/* Error */106380200, error, /* array */[]));
                          }))), ReasonReact.element(/* None */0, /* None */0, Curry._2(Vrroom.Control[/* IfSome */3][/* make */1], footer, (function (elements) {
                            return ReasonReact.createDomElement("footer", {
                                        className: BlockStyles.footer
                                      }, elements);
                          }))));
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

var Control = 0;

var Styles = 0;

exports.Control       = Control;
exports.Styles        = Styles;
exports.renderHeader  = renderHeader;
exports.makeClassName = makeClassName;
exports.component     = component;
exports.make          = make;
/* component Not a pure module */
