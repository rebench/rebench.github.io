'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Vrroom = require("vrroom/src/Vrroom.bs.js");
var Message = require("./Message.bs.js");
var BlockStyles = require("./BlockStyles.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var TypedGlamor = require("bs-typed-glamor/src/TypedGlamor.bs.js");

function renderHeaderContent(param) {
  if (param[0] >= 936573133) {
    return React.createElement("div", {
                className: "textHeader"
              }, Vrroom.text(param[1]));
  } else {
    return param[1];
  }
}

var component = ReasonReact.reducerComponent("Block");

function make(header, footer, className, error, $staropt$star, children) {
  var isCollapsible = $staropt$star ? $staropt$star[0] : false;
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */component[/* didMount */4],
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function (param) {
              var send = param[/* send */4];
              return React.createElement("section", {
                          className: Curry._1(Vrroom.Helpers[/* ClassName */5][/* join */0], /* :: */[
                                TypedGlamor.toString(BlockStyles.container(isCollapsible, param[/* state */2][/* collapsed */0])),
                                /* :: */[
                                  Curry._1(Vrroom.Helpers[/* ClassName */5][/* fromOption */2], className),
                                  /* [] */0
                                ]
                              ])
                        }, React.createElement("header", {
                              onClick: (function () {
                                  return Curry._1(send, /* HeaderClicked */0);
                                })
                            }, renderHeaderContent(header)), ReasonReact.createDomElement("main", { }, children), ReasonReact.element(/* None */0, /* None */0, Curry._2(Vrroom.Control[/* IfSome */3][/* make */1], error, (function (error) {
                                    return ReasonReact.element(/* None */0, /* None */0, Message.make(/* Error */106380200, error, /* array */[]));
                                  }))), ReasonReact.element(/* None */0, /* None */0, Curry._2(Vrroom.Control[/* IfSome */3][/* make */1], footer, (function (content) {
                                    return React.createElement("footer", undefined, content);
                                  }))));
            }),
          /* initialState */(function () {
              return /* record */[/* collapsed */false];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (_, state) {
              if (isCollapsible) {
                return /* Update */Block.__(0, [/* record */[/* collapsed */!state[/* collapsed */0]]]);
              } else {
                return /* NoUpdate */0;
              }
            }),
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

exports.renderHeaderContent = renderHeaderContent;
exports.component = component;
exports.make = make;
/* component Not a pure module */
