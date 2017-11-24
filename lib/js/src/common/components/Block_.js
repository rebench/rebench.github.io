'use strict';

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
    return React.createElement("div", {
                className: BlockStyles.footer
              }, param[0]);
  } else {
    return null;
  }
}

function makeClassName(param) {
  if (param) {
    return param[0] + (" " + BlockStyles.root);
  } else {
    return BlockStyles.root;
  }
}

var component = ReasonReact.statelessComponent("Block");

function make(header, footer, className, children) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      return React.createElement("div", {
                  className: makeClassName(className)
                }, React.createElement("div", {
                      className: BlockStyles.header
                    }, renderHeader(header)), React.createElement("div", {
                      className: BlockStyles.content
                    }, children), renderFooter(footer));
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
