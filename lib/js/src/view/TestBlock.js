'use strict';

var Icon            = require("../common/components/Icon.js");
var Curry           = require("bs-platform/lib/js/curry.js");
var Utils           = require("../common/utils/Utils.js");
var React           = require("react");
var Block_          = require("../common/components/Block_.js");
var Button          = require("../common/components/Button.js");
var Editor          = require("../common/components/Editor.js");
var Helpers         = require("../common/utils/Helpers.js");
var ReasonReact     = require("reason-react/lib/js/src/ReasonReact.js");
var TestBlockStyles = require("./TestBlockStyles.js");

function formatResult(param) {
  var sampleCount = param[/* sampleCount */2];
  var hz = param[/* hz */0];
  var match = +(hz < 100);
  var arg = match !== 0 ? 2 : 0;
  var hz$1 = Curry._1(Utils.formatNumber, (function (param) {
            return param.toFixed(arg);
          })(hz));
  var rme = (function (param) {
        return param.toFixed(2);
      })(param[/* rme */1]);
  var match$1 = +(sampleCount > 1);
  var plural = match$1 !== 0 ? "s" : "";
  return "" + (String(hz$1) + (" ops/sec \xb1" + (String(rme) + ("% (" + (String(sampleCount) + (" run" + (String(plural) + " sampled)")))))));
}

function formatRelativeScore(score) {
  var match = +(score === 0);
  if (match !== 0) {
    return "Fastest";
  } else {
    return (-score).toFixed() + "% slower";
  }
}

function getStateClass(param) {
  if (typeof param === "number") {
    return " s-untested";
  } else if (param.tag) {
    var match = param[1];
    if (match) {
      var s = match[0];
      if (s === 0) {
        return " s-complete s-fastest";
      } else if (s >= -10) {
        return " s-complete s-close";
      } else if (s <= -50) {
        return " s-complete s-not-even-close";
      } else {
        return " s-complete";
      }
    } else {
      return " s-complete";
    }
  } else {
    return " s-running";
  }
}

function renderHeader(state) {
  var tmp;
  if (typeof state === "number") {
    tmp = null;
  } else if (state.tag) {
    var match = state[1];
    tmp = match ? React.createElement("span", undefined, Helpers.text(" - "), React.createElement("span", {
                className: "score"
              }, Helpers.text(formatRelativeScore(match[0])))) : null;
  } else {
    tmp = null;
  }
  return /* array */[
          Helpers.text("Test"),
          tmp
        ];
}

function renderFooter(state, onRun, onRemove) {
  var tmp;
  tmp = typeof state === "number" ? React.createElement("div", {
          className: TestBlockStyles.state + " s-untested"
        }) : (
      state.tag ? React.createElement("div", {
              className: TestBlockStyles.state + " s-complete"
            }, ReasonReact.element(/* None */0, /* None */0, Icon.make("check", /* array */[])), Helpers.text(formatResult(state[0]))) : React.createElement("div", {
              className: TestBlockStyles.state + " s-running"
            }, ReasonReact.element(/* None */0, /* None */0, Icon.make("history", /* array */[])), Helpers.text(formatResult(state[0])))
    );
  return /* array */[
          ReasonReact.element(/* None */0, /* None */0, Button.make("Run", /* Some */["play"], /* None */0, onRun, /* array */[])),
          ReasonReact.element(/* None */0, /* None */0, Button.make("Remove", /* Some */["close"], /* None */0, onRemove, /* array */[])),
          tmp
        ];
}

var component = ReasonReact.statelessComponent("TestBlock");

function make(data, state, onChange, onRun, onRemove, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      return ReasonReact.element(/* None */0, /* None */0, Block_.make(/* `Elements */[
                      -579472809,
                      renderHeader(state)
                    ], /* Some */[renderFooter(state, onRun, onRemove)], /* Some */[TestBlockStyles.root + getStateClass(state)], /* None */0, /* array */[ReasonReact.element(/* None */0, /* None */0, Editor.make(data[/* code */1], /* RE */18355, /* None */0, /* None */0, /* None */0, /* Some */[(function (code) {
                                    return Curry._1(onChange, /* record */[
                                                /* id */data[/* id */0],
                                                /* code */code
                                              ]);
                                  })], /* array */[]))]));
    });
  return newrecord;
}

var Styles = 0;

exports.Styles              = Styles;
exports.formatResult        = formatResult;
exports.formatRelativeScore = formatRelativeScore;
exports.getStateClass       = getStateClass;
exports.renderHeader        = renderHeader;
exports.renderFooter        = renderFooter;
exports.component           = component;
exports.make                = make;
/* component Not a pure module */
