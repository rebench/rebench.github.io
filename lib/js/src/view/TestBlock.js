'use strict';

var Icon            = require("../common/components/Icon.js");
var Block           = require("bs-platform/lib/js/block.js");
var Curry           = require("bs-platform/lib/js/curry.js");
var Utils           = require("../common/utils/Utils.js");
var React           = require("react");
var Block_          = require("../common/components/Block_.js");
var Button          = require("../common/components/Button.js");
var Editor          = require("../common/components/Editor.js");
var Rebase          = require("@glennsl/rebase/lib/js/src/Rebase.bs.js");
var Vrroom          = require("vrroom/lib/js/src/Vrroom.bs.js");
var Compiler        = require("../services/Compiler.js");
var Debounce        = require("../common/services/Debounce.js");
var Language        = require("../model/Language.js");
var ReasonReact     = require("reason-react/lib/js/src/ReasonReact.js");
var TypedGlamor     = require("typed-glamor/lib/js/src/TypedGlamor.bs.js");
var SelectButton    = require("../common/components/SelectButton.js");
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
  } else {
    switch (param.tag | 0) {
      case 0 : 
          return "s-running";
      case 1 : 
          return "s-error";
      case 2 : 
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
          break;
      
    }
  }
}

var LanguageSelectButton = SelectButton.Make(/* module */[]);

var languageMenuItems = Rebase.List[/* map */0]((function (lang) {
        return /* record */[
                /* label */Language.name(lang),
                /* value */lang
              ];
      }), /* :: */[
      /* RE */18355,
      /* :: */[
        /* ML */17247,
        /* :: */[
          /* JS */16585,
          /* [] */0
        ]
      ]
    ]);

function getError(param) {
  switch (param.tag | 0) {
    case 0 : 
    case 1 : 
        return /* None */0;
    case 2 : 
        return /* Some */[param[0]];
    
  }
}

function getMarks(param) {
  switch (param.tag | 0) {
    case 0 : 
    case 1 : 
        return /* [] */0;
    case 2 : 
        return param[1];
    
  }
}

function compute(param) {
  return Compiler.compileTest(param[0], param[1]);
}

var TestCompiler = Debounce.Make(/* module */[/* compute */compute]);

var component = ReasonReact.reducerComponent("TestBlock");

function make(setup, data, testState, onChange, onRun, onRemove, onLanguageChange, _) {
  var renderRelativeScore = function () {
    if (typeof testState === "number") {
      return Vrroom.nothing;
    } else if (testState.tag === 2) {
      var match = testState[1];
      if (match) {
        return React.createElement("span", undefined, Vrroom.text(" - "), React.createElement("span", {
                        className: "score"
                      }, Vrroom.text(formatRelativeScore(match[0]))));
      } else {
        return Vrroom.nothing;
      }
    } else {
      return Vrroom.nothing;
    }
  };
  var renderResult = function () {
    if (typeof testState === "number") {
      return Vrroom.nothing;
    } else {
      switch (testState.tag | 0) {
        case 0 : 
            return ReasonReact.element(/* None */0, /* None */0, Vrroom.Fragment[/* make */0](/* array */[
                            ReasonReact.element(/* None */0, /* None */0, Icon.make("history", /* array */[])),
                            Vrroom.text(formatResult(testState[0]))
                          ]));
        case 1 : 
            return ReasonReact.element(/* None */0, /* None */0, Vrroom.Fragment[/* make */0](/* array */[
                            ReasonReact.element(/* None */0, /* None */0, Icon.make("alert-circle-outline", /* array */[])),
                            Vrroom.text(testState[0])
                          ]));
        case 2 : 
            return ReasonReact.element(/* None */0, /* None */0, Vrroom.Fragment[/* make */0](/* array */[
                            ReasonReact.element(/* None */0, /* None */0, Icon.make("check", /* array */[])),
                            Vrroom.text(formatResult(testState[0]))
                          ]));
        
      }
    }
  };
  var renderHeader = function (param) {
    var send = param[/* send */4];
    var match = param[/* state */2][/* showOutput */0];
    return ReasonReact.element(/* None */0, /* None */0, Vrroom.Fragment[/* make */0](/* array */[
                    React.createElement("div", {
                          className: "box"
                        }, ReasonReact.element(/* None */0, /* None */0, Curry._7(LanguageSelectButton[/* make */1], languageMenuItems, data[/* language */1], /* Some */["language-button"], /* Some */[(function (item) {
                                      return Vrroom.text(Language.abbreviation(item[/* value */1]));
                                    })], /* None */0, onLanguageChange, /* array */[]))),
                    React.createElement("div", {
                          className: "title"
                        }, Vrroom.text("test"), renderRelativeScore(/* () */0)),
                    React.createElement("div", {
                          className: "box right"
                        }, ReasonReact.element(/* None */0, /* None */0, Button.make("output", /* Some */[match !== 0 ? "chevron-up" : "chevron-down"], /* None */0, /* Some */[/* Right */-57574468], /* None */0, (function () {
                                    return Curry._1(send, /* ToggleOutput */0);
                                  }), /* array */[])))
                  ]));
  };
  var renderFooter = function () {
    return ReasonReact.element(/* None */0, /* None */0, Vrroom.Fragment[/* make */0](/* array */[
                    ReasonReact.element(/* None */0, /* None */0, Button.make("Run", /* Some */["chevron-right"], /* None */0, /* None */0, /* None */0, onRun, /* array */[])),
                    ReasonReact.element(/* None */0, /* None */0, Button.make("Remove", /* Some */["close"], /* None */0, /* None */0, /* None */0, onRemove, /* array */[])),
                    React.createElement("div", {
                          className: "state"
                        }, renderResult(/* () */0))
                  ]));
  };
  var newrecord = component.slice();
  newrecord[/* render */9] = (function (self) {
      var state = self[/* state */2];
      return ReasonReact.element(/* None */0, /* None */0, Curry._3(TestCompiler[/* make */1], /* tuple */[
                      setup,
                      data
                    ], 300, (function (compilerResult) {
                        return ReasonReact.element(/* None */0, /* None */0, Block_.make(/* `Element */[
                                        -744106340,
                                        renderHeader(self)
                                      ], /* Some */[renderFooter(/* () */0)], /* Some */[TypedGlamor.toString(TestBlockStyles.container(testState, data[/* language */1]))], getError(compilerResult), /* None */0, /* array */[
                                        ReasonReact.element(/* None */0, /* None */0, Editor.make(data[/* code */2], data[/* language */1], /* None */0, /* Some */[getMarks(compilerResult)], /* None */0, /* None */0, /* Some */[(function (code) {
                                                      return Curry._1(onChange, /* record */[
                                                                  /* id */data[/* id */0],
                                                                  /* language */data[/* language */1],
                                                                  /* code */code
                                                                ]);
                                                    })], /* array */[])),
                                        ReasonReact.element(/* None */0, /* None */0, Curry._2(Vrroom.Control[/* If */2][/* make */1], state[/* showOutput */0], (function () {
                                                    var exit = 0;
                                                    switch (compilerResult.tag | 0) {
                                                      case 0 : 
                                                      case 1 : 
                                                          exit = 1;
                                                          break;
                                                      case 2 : 
                                                          return React.createElement("div", undefined, Vrroom.text(compilerResult[0]));
                                                      
                                                    }
                                                    if (exit === 1) {
                                                      return ReasonReact.element(/* None */0, /* None */0, Editor.make(compilerResult[0], /* JS */16585, /* None */0, /* None */0, /* Some */[/* true */1], /* None */0, /* None */0, /* array */[]));
                                                    }
                                                    
                                                  })))
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

exports.Styles               = Styles;
exports.formatResult         = formatResult;
exports.formatRelativeScore  = formatRelativeScore;
exports.getStateClass        = getStateClass;
exports.LanguageSelectButton = LanguageSelectButton;
exports.languageMenuItems    = languageMenuItems;
exports.getError             = getError;
exports.getMarks             = getMarks;
exports.TestCompiler         = TestCompiler;
exports.component            = component;
exports.make                 = make;
/* LanguageSelectButton Not a pure module */
