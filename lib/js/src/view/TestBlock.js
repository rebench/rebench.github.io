'use strict';

var Icon            = require("../common/components/Icon.js");
var Block           = require("bs-platform/lib/js/block.js");
var Curry           = require("bs-platform/lib/js/curry.js");
var Utils           = require("../common/utils/Utils.js");
var React           = require("react");
var Block_          = require("../common/components/Block_.js");
var Button          = require("../common/components/Button.js");
var Editor          = require("../common/components/Editor.js");
var Rebase          = require("reason-rebase/lib/js/src/rebase.js");
var Helpers         = require("../common/utils/Helpers.js");
var Compiler        = require("../services/Compiler.js");
var ReasonReact     = require("reason-react/lib/js/src/ReasonReact.js");
var SelectButton    = require("../common/components/SelectButton.js");
var SyntaxChecker   = require("../services/SyntaxChecker.js");
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
    return "s-untested";
  } else if (param.tag) {
    var match = param[1];
    if (match) {
      var s = match[0];
      if (s === 0) {
        return "s-complete s-fastest";
      } else if (s >= -10) {
        return "s-complete s-close";
      } else if (s <= -50) {
        return "s-complete s-not-even-close";
      } else {
        return "s-complete";
      }
    } else {
      return "s-complete";
    }
  } else {
    return "s-running";
  }
}

function makeClassName(state, isError) {
  return Helpers.classNames(/* :: */[
              /* tuple */[
                TestBlockStyles.root,
                /* true */1
              ],
              /* :: */[
                /* tuple */[
                  getStateClass(state),
                  /* true */1
                ],
                /* :: */[
                  /* tuple */[
                    "s-error",
                    isError
                  ],
                  /* [] */0
                ]
              ]
            ]);
}

var LanguageSelectButton = SelectButton.Make(/* module */[]);

var languageMenuItems = Rebase.List[/* map */2]((function (lang) {
        return /* record */[
                /* label */lang >= 18355 ? "Reason" : "JavaScript",
                /* value */lang
              ];
      }), /* :: */[
      /* RE */18355,
      /* :: */[
        /* JS */16585,
        /* [] */0
      ]
    ]);

function getLanguageButtonClassName(param) {
  if (param >= 18355) {
    return "m-language-reason";
  } else {
    return "m-language-javascript";
  }
}

var component = ReasonReact.reducerComponent("TestBlock");

function make(setup, data, testState, onChange, onRun, onRemove, onLanguageChange, _) {
  var renderRelativeScore = function () {
    if (typeof testState === "number") {
      return null;
    } else if (testState.tag) {
      var match = testState[1];
      if (match) {
        return React.createElement("span", undefined, Helpers.text(" - "), React.createElement("span", {
                        className: "score"
                      }, Helpers.text(formatRelativeScore(match[0]))));
      } else {
        return null;
      }
    } else {
      return null;
    }
  };
  var renderResult = function () {
    if (typeof testState === "number") {
      return React.createElement("div", {
                  className: TestBlockStyles.state + " s-untested"
                });
    } else if (testState.tag) {
      return React.createElement("div", {
                  className: TestBlockStyles.state + " s-complete"
                }, ReasonReact.element(/* None */0, /* None */0, Icon.make("check", /* array */[])), Helpers.text(formatResult(testState[0])));
    } else {
      return React.createElement("div", {
                  className: TestBlockStyles.state + " s-running"
                }, ReasonReact.element(/* None */0, /* None */0, Icon.make("history", /* array */[])), Helpers.text(formatResult(testState[0])));
    }
  };
  var renderHeader = function (param) {
    var match = param[/* state */2][/* showOutput */0];
    return React.createElement("div", {
                className: TestBlockStyles.header
              }, React.createElement("div", {
                    className: "box"
                  }, ReasonReact.element(/* None */0, /* None */0, Curry._7(LanguageSelectButton[/* make */1], languageMenuItems, data[/* language */1], /* Some */[getLanguageButtonClassName(data[/* language */1])], /* Some */[(function (item) {
                                var match = item[/* value */1];
                                return Helpers.text(match >= 18355 ? "re" : "js");
                              })], /* None */0, onLanguageChange, /* array */[]))), React.createElement("div", {
                    className: "title"
                  }, Helpers.text("test"), renderRelativeScore(/* () */0)), React.createElement("div", {
                    className: "box right"
                  }, ReasonReact.element(/* None */0, /* None */0, Button.make("output", /* Some */[match !== 0 ? "chevron-up" : "chevron-down"], /* Some */[/* Right */-57574468], /* None */0, Curry._1(param[/* reduce */1], (function () {
                                  return /* ToggleOutput */0;
                                })), /* array */[]))));
  };
  var renderFooter = function () {
    return /* array */[
            ReasonReact.element(/* None */0, /* None */0, Button.make("Run", /* Some */["play"], /* None */0, /* None */0, onRun, /* array */[])),
            ReasonReact.element(/* None */0, /* None */0, Button.make("Remove", /* Some */["close"], /* None */0, /* None */0, onRemove, /* array */[])),
            renderResult(/* () */0)
          ];
  };
  var newrecord = component.slice();
  newrecord[/* render */9] = (function (self) {
      var state = self[/* state */2];
      return ReasonReact.element(/* None */0, /* None */0, Curry._3(SyntaxChecker.make, /* tuple */[
                      data[/* language */1],
                      data[/* code */2]
                    ], 100, (function (param) {
                        return ReasonReact.element(/* None */0, /* None */0, Block_.make(/* `Element */[
                                        -744106340,
                                        renderHeader(self)
                                      ], /* Some */[renderFooter(/* () */0)], /* Some */[makeClassName(testState, param[0])], /* None */0, /* array */[
                                        ReasonReact.element(/* None */0, /* None */0, Editor.make(data[/* code */2], data[/* language */1], /* None */0, /* Some */[param[1]], /* None */0, /* None */0, /* Some */[(function (code) {
                                                      return Curry._1(onChange, /* record */[
                                                                  /* id */data[/* id */0],
                                                                  /* language */data[/* language */1],
                                                                  /* code */code
                                                                ]);
                                                    })], /* array */[])),
                                        state[/* showOutput */0] ? ReasonReact.element(/* None */0, /* None */0, Curry._3(Compiler.make, /* tuple */[
                                                    setup,
                                                    data
                                                  ], 300, (function (compilerResult) {
                                                      var exit = 0;
                                                      switch (compilerResult.tag | 0) {
                                                        case 0 : 
                                                        case 1 : 
                                                            exit = 1;
                                                            break;
                                                        case 2 : 
                                                            return React.createElement("div", undefined, Helpers.text(compilerResult[0]));
                                                        
                                                      }
                                                      if (exit === 1) {
                                                        return ReasonReact.element(/* None */0, /* None */0, Editor.make(compilerResult[0], /* JS */16585, /* None */0, /* None */0, /* Some */[/* true */1], /* None */0, /* None */0, /* array */[]));
                                                      }
                                                      
                                                    }))) : null
                                      ]));
                      })));
    });
  newrecord[/* initialState */10] = (function () {
      return /* record */[/* showOutput : false */0];
    });
  newrecord[/* reducer */12] = (function (_, state) {
      return /* Update */Block.__(0, [/* record */[/* showOutput */1 - state[/* showOutput */0]]]);
    });
  return newrecord;
}

var Styles = 0;

exports.Styles                     = Styles;
exports.formatResult               = formatResult;
exports.formatRelativeScore        = formatRelativeScore;
exports.getStateClass              = getStateClass;
exports.makeClassName              = makeClassName;
exports.LanguageSelectButton       = LanguageSelectButton;
exports.languageMenuItems          = languageMenuItems;
exports.getLanguageButtonClassName = getLanguageButtonClassName;
exports.component                  = component;
exports.make                       = make;
/* LanguageSelectButton Not a pure module */
