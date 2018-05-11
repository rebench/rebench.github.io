'use strict';

var React = require("react");
var Button = require("../common/components/Button.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var ShareButton = require("../common/components/ShareButton.bs.js");
var TypedGlamor = require("bs-typed-glamor/src/TypedGlamor.bs.js");
var ToolbarStyles = require("./ToolbarStyles.bs.js");
var WidthContainer = require("./WidthContainer.bs.js");

var component = ReasonReact.statelessComponent("Toolbar");

function make(onRunAll, onAdd, onClear, onHelp, url, _) {
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
          /* render */(function () {
              return React.createElement("div", {
                          className: TypedGlamor.toString(ToolbarStyles.container)
                        }, ReasonReact.element(/* None */0, /* None */0, WidthContainer.make(/* array */[
                                  React.createElement("img", {
                                        className: "logo",
                                        title: "re:bench",
                                        alt: "re:bench",
                                        src: "static/logo.svg"
                                      }),
                                  ReasonReact.element(/* None */0, /* None */0, Button.make("Run All", /* Some */["chevron-right"], /* None */0, /* None */0, /* None */0, onRunAll, /* array */[])),
                                  ReasonReact.element(/* None */0, /* None */0, Button.make("Add", /* Some */["plus"], /* None */0, /* None */0, /* None */0, onAdd, /* array */[])),
                                  ReasonReact.element(/* None */0, /* None */0, Button.make("Clear", /* Some */["close"], /* None */0, /* None */0, /* None */0, onClear, /* array */[])),
                                  React.createElement("div", {
                                        className: "separator"
                                      }),
                                  ReasonReact.element(/* None */0, /* None */0, ShareButton.make(url, /* array */[])),
                                  ReasonReact.element(/* None */0, /* None */0, Button.make("Help", /* Some */["help-circle-outline"], /* None */0, /* None */0, /* None */0, onHelp, /* array */[]))
                                ])));
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */component[/* reducer */12],
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

var Styles = 0;

exports.Styles = Styles;
exports.component = component;
exports.make = make;
/* component Not a pure module */
