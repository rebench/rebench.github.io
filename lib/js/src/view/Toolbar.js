'use strict';

var Curry         = require("bs-platform/lib/js/curry.js");
var React         = require("react");
var Button        = require("../common/components/Button.js");
var ReasonReact   = require("reason-react/lib/js/src/ReasonReact.js");
var ShareButton   = require("../common/components/ShareButton.js");
var ToolbarStyles = require("./ToolbarStyles.js");

var component = ReasonReact.statelessComponent("Toolbar");

function make(onButtonClick, shareableUrl, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      return React.createElement("div", {
                  className: ToolbarStyles.root
                }, ReasonReact.element(/* None */0, /* None */0, Button.make("Run All", /* Some */["play"], /* None */0, (function () {
                            return Curry._1(onButtonClick, /* RunAll */-267608394);
                          }), /* array */[])), ReasonReact.element(/* None */0, /* None */0, Button.make("Add", /* Some */["plus"], /* None */0, (function () {
                            return Curry._1(onButtonClick, /* Add */3254785);
                          }), /* array */[])), ReasonReact.element(/* None */0, /* None */0, Button.make("Clear", /* Some */["close"], /* None */0, (function () {
                            return Curry._1(onButtonClick, /* Clear */-611786387);
                          }), /* array */[])), React.createElement("div", {
                      className: ToolbarStyles.separator
                    }), ReasonReact.element(/* None */0, /* None */0, ShareButton.make(shareableUrl, /* array */[])));
    });
  return newrecord;
}

var Styles = 0;

exports.Styles    = Styles;
exports.component = component;
exports.make      = make;
/* component Not a pure module */
