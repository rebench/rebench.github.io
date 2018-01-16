'use strict';

var Block       = require("bs-platform/lib/js/block.js");
var Curry       = require("bs-platform/lib/js/curry.js");
var React       = require("react");
var Vrroom      = require("vrroom/lib/js/src/Vrroom.bs.js");
var Message     = require("./Message.js");
var BlockStyles = require("./BlockStyles.js");
var ReasonReact = require("reason-react/lib/js/src/ReasonReact.js");
var TypedGlamor = require("typed-glamor/lib/js/src/TypedGlamor.bs.js");

function renderHeaderContent(param) {
  if (param[0] >= 936573133) {
    return React.createElement("div", {
                className: "textHeader"
              }, Vrroom.Helpers[/* text */0](param[1]));
  } else {
    return param[1];
  }
}

var component = ReasonReact.reducerComponent("Block");

function make(header, footer, className, error, $staropt$star, children) {
  var isCollapsible = $staropt$star ? $staropt$star[0] : /* false */0;
  var newrecord = component.slice();
  newrecord[/* render */9] = (function (param) {
      var send = param[/* send */4];
      return React.createElement("section", {
                  className: Curry._1(Vrroom.Helpers[/* ClassName */3][/* join */0], /* :: */[
                        TypedGlamor.toString(BlockStyles.container(isCollapsible, param[/* state */2][/* collapsed */0])),
                        /* :: */[
                          Curry._1(Vrroom.Helpers[/* ClassName */3][/* fromOption */2], className),
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
    });
  newrecord[/* initialState */10] = (function () {
      return /* record */[/* collapsed : false */0];
    });
  newrecord[/* reducer */12] = (function (_, state) {
      if (isCollapsible !== 0) {
        return /* Update */Block.__(0, [/* record */[/* collapsed */1 - state[/* collapsed */0]]]);
      } else {
        return /* NoUpdate */0;
      }
    });
  return newrecord;
}

var Control = 0;

exports.Control             = Control;
exports.renderHeaderContent = renderHeaderContent;
exports.component           = component;
exports.make                = make;
/* component Not a pure module */
