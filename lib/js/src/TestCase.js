'use strict';

var Icon           = require("./components/Icon.js");
var Curry          = require("bs-platform/lib/js/curry.js");
var Utils          = require("./utils/Utils.js");
var React          = require("react");
var Editor         = require("./components/Editor.js");
var Helpers        = require("./utils/Helpers.js");
var ReasonReact    = require("reason-react/lib/js/src/reasonReact.js");
var TestCaseStyles = require("./TestCaseStyles.js");

function make(id) {
  return /* record */[
          /* id */"__testCase" + (String(id) + "__"),
          /* code */id !== 1 ? (
              id !== 2 ? "/* put stuff here */" : "Js.String.make(42)"
            ) : "string_of_int(42)"
        ];
}

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
    return " s-virgin";
  } else if (param.tag) {
    var match = param[0][/* relativeScore */3];
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

var component = ReasonReact.statelessComponent("TestCase");

function make$1(data, state, onChange, onRun, onRemove, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      var tmp;
      if (typeof state === "number") {
        tmp = null;
      } else if (state.tag) {
        var match = state[0][/* relativeScore */3];
        tmp = match ? React.createElement("span", undefined, Helpers.text(" - "), React.createElement("span", {
                    className: "score"
                  }, Helpers.text(formatRelativeScore(match[0])))) : null;
      } else {
        tmp = null;
      }
      var tmp$1;
      tmp$1 = typeof state === "number" ? React.createElement("div", {
              className: TestCaseStyles.state + " s-virgin"
            }) : (
          state.tag ? React.createElement("div", {
                  className: TestCaseStyles.state + " s-complete"
                }, ReasonReact.element(/* None */0, /* None */0, Icon.make("check", /* array */[])), Helpers.text(formatResult(state[0]))) : React.createElement("div", {
                  className: TestCaseStyles.state + " s-running"
                }, ReasonReact.element(/* None */0, /* None */0, Icon.make("history", /* array */[])), Helpers.text(formatResult(state[0])))
        );
      return React.createElement("div", {
                  className: TestCaseStyles.root + getStateClass(state)
                }, React.createElement("div", {
                      className: TestCaseStyles.header
                    }, Helpers.text("Test Case"), tmp), ReasonReact.element(/* None */0, /* None */0, Editor.make(data[/* code */1], /* RE */18355, /* None */0, /* None */0, /* None */0, /* Some */[(function (code) {
                              return Curry._1(onChange, /* record */[
                                          /* id */data[/* id */0],
                                          /* code */code
                                        ]);
                            })], /* array */[])), React.createElement("div", {
                      className: TestCaseStyles.footer
                    }, React.createElement("button", {
                          onClick: (function () {
                              return Curry._1(onRun, /* () */0);
                            })
                        }, ReasonReact.element(/* None */0, /* None */0, Icon.make("play", /* array */[])), Helpers.text("Run")), React.createElement("button", {
                          onClick: (function () {
                              return Curry._1(onRemove, /* () */0);
                            })
                        }, ReasonReact.element(/* None */0, /* None */0, Icon.make("close", /* array */[])), Helpers.text("Remove")), tmp$1));
    });
  return newrecord;
}

var View = /* module */[
  /* formatResult */formatResult,
  /* formatRelativeScore */formatRelativeScore,
  /* getStateClass */getStateClass,
  /* component */component,
  /* make */make$1
];

var Styles = 0;

exports.Styles = Styles;
exports.make   = make;
exports.View   = View;
/* component Not a pure module */
