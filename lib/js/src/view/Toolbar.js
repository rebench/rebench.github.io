'use strict';

var React          = require("react");
var Button         = require("../common/components/Button.js");
var ReasonReact    = require("reason-react/lib/js/src/ReasonReact.js");
var ShareButton    = require("../common/components/ShareButton.js");
var ToolbarStyles  = require("./ToolbarStyles.js");
var WidthContainer = require("./WidthContainer.js");

var component = ReasonReact.statelessComponent("Toolbar");

function make(onRunAll, onAdd, onClear, url, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      return React.createElement("div", {
                  className: ToolbarStyles.root
                }, ReasonReact.element(/* None */0, /* None */0, WidthContainer.make(/* array */[
                          React.createElement("img", {
                                className: "logo",
                                title: "re:bench",
                                alt: "re:bench",
                                src: "static/logo.svg"
                              }),
                          ReasonReact.element(/* None */0, /* None */0, Button.make("Run All", /* Some */["chevron-right"], /* None */0, /* None */0, onRunAll, /* array */[])),
                          ReasonReact.element(/* None */0, /* None */0, Button.make("Add", /* Some */["plus"], /* None */0, /* None */0, onAdd, /* array */[])),
                          ReasonReact.element(/* None */0, /* None */0, Button.make("Clear", /* Some */["close"], /* None */0, /* None */0, onClear, /* array */[])),
                          React.createElement("div", {
                                className: ToolbarStyles.separator
                              }),
                          ReasonReact.element(/* None */0, /* None */0, ShareButton.make(url, /* array */[]))
                        ])));
    });
  return newrecord;
}

var Styles = 0;

exports.Styles    = Styles;
exports.component = component;
exports.make      = make;
/* component Not a pure module */
