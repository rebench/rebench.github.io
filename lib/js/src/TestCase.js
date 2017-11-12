'use strict';

var Icon           = require("./components/Icon.js");
var Curry          = require("bs-platform/lib/js/curry.js");
var Utils          = require("./Utils.js");
var React          = require("react");
var Editor         = require("./components/Editor.js");
var ReasonReact    = require("reason-react/lib/js/src/reasonReact.js");
var TestCaseStyles = require("./TestCaseStyles.js");

function text(prim) {
  return prim;
}

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

var component = ReasonReact.statelessComponent("TestCase");

function make$1(data, state, onChange, onRemove, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      var tmp;
      tmp = typeof state === "number" ? React.createElement("div", {
              className: TestCaseStyles.state + " s-virgin"
            }, ReasonReact.element(/* None */0, /* None */0, Icon.make("minus", /* array */[]))) : (
          state.tag ? React.createElement("div", {
                  className: TestCaseStyles.state + " s-complete"
                }, ReasonReact.element(/* None */0, /* None */0, Icon.make("check", /* array */[])), formatResult(state[0])) : React.createElement("div", {
                  className: TestCaseStyles.state + " s-running"
                }, ReasonReact.element(/* None */0, /* None */0, Icon.make("play", /* array */[])), formatResult(state[0]))
        );
      return React.createElement("div", {
                  className: TestCaseStyles.root
                }, ReasonReact.element(/* None */0, /* None */0, Editor.make(data[/* code */1], /* RE */18355, /* None */0, /* None */0, /* None */0, /* Some */[(function (code) {
                              return Curry._1(onChange, /* record */[
                                          /* id */data[/* id */0],
                                          /* code */code
                                        ]);
                            })], /* array */[])), React.createElement("div", {
                      className: TestCaseStyles.footer
                    }, React.createElement("button", {
                          onClick: (function () {
                              return Curry._1(onRemove, /* () */0);
                            })
                        }, ReasonReact.element(/* None */0, /* None */0, Icon.make("play", /* array */[])), "Run"), React.createElement("button", {
                          onClick: (function () {
                              return Curry._1(onRemove, /* () */0);
                            })
                        }, ReasonReact.element(/* None */0, /* None */0, Icon.make("minus", /* array */[])), "Remove"), tmp));
    });
  return newrecord;
}

var View = /* module */[
  /* formatResult */formatResult,
  /* component */component,
  /* make */make$1
];

var Styles = 0;

exports.Styles = Styles;
exports.text   = text;
exports.make   = make;
exports.View   = View;
/* component Not a pure module */
