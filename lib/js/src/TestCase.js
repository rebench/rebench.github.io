'use strict';

var Curry       = require("bs-platform/lib/js/curry.js");
var Utils       = require("./Utils.js");
var React       = require("react");
var Editor      = require("./components/Editor.js");
var Rebase      = require("reason-rebase/lib/js/src/rebase.js");
var ReasonReact = require("reason-react/lib/js/src/reasonReact.js");

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

function make$1(data, result, onChange, onRemove, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      return React.createElement("div", undefined, ReasonReact.element(/* None */0, /* None */0, Editor.make(data[/* code */1], /* ML */17247, /* None */0, /* None */0, /* None */0, /* Some */[(function (code) {
                              return Curry._1(onChange, /* record */[
                                          /* id */data[/* id */0],
                                          /* code */code
                                        ]);
                            })], /* array */[])), React.createElement("div", undefined, React.createElement("button", {
                          onClick: (function () {
                              return Curry._1(onRemove, /* () */0);
                            })
                        }, "Run"), React.createElement("button", {
                          onClick: (function () {
                              return Curry._1(onRemove, /* () */0);
                            })
                        }, "Remove"), React.createElement("div", undefined, Rebase.Option[/* mapOr */16](formatResult, "No result yet", result))));
    });
  return newrecord;
}

var View = /* module */[
  /* formatResult */formatResult,
  /* component */component,
  /* make */make$1
];

exports.text = text;
exports.make = make;
exports.View = View;
/* component Not a pure module */
