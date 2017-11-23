'use strict';

var Icon          = require("../common/components/Icon.js");
var Curry         = require("bs-platform/lib/js/curry.js");
var React         = require("react");
var Helpers       = require("../common/utils/Helpers.js");
var ReasonReact   = require("reason-react/lib/js/src/ReasonReact.js");
var ShareButton   = require("../common/components/ShareButton.js");
var ToolbarStyles = require("./ToolbarStyles.js");

var component = ReasonReact.statelessComponent("Toolbar");

function make(onButtonClick, shareableUrl, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      return React.createElement("div", {
                  className: ToolbarStyles.root
                }, React.createElement("button", {
                      className: ToolbarStyles.button,
                      onClick: (function () {
                          return Curry._1(onButtonClick, /* RunAll */-267608394);
                        })
                    }, ReasonReact.element(/* None */0, /* None */0, Icon.make("play", /* array */[])), Helpers.text("Run All")), React.createElement("button", {
                      className: ToolbarStyles.button,
                      onClick: (function () {
                          return Curry._1(onButtonClick, /* Add */3254785);
                        })
                    }, ReasonReact.element(/* None */0, /* None */0, Icon.make("plus", /* array */[])), Helpers.text("Add")), React.createElement("button", {
                      className: ToolbarStyles.button,
                      onClick: (function () {
                          return Curry._1(onButtonClick, /* Clear */-611786387);
                        })
                    }, ReasonReact.element(/* None */0, /* None */0, Icon.make("close", /* array */[])), Helpers.text("Clear")), React.createElement("div", {
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
