'use strict';

var List                    = require("bs-platform/lib/js/list.js");
var Test                    = require("../model/Test.js");
var $$Array                 = require("bs-platform/lib/js/array.js");
var Block                   = require("bs-platform/lib/js/block.js");
var Curry                   = require("bs-platform/lib/js/curry.js");
var React                   = require("react");
var Rebase                  = require("reason-rebase/lib/js/src/rebase.js");
var Worker                  = require("../common/ffi/Worker.js");
var Helpers                 = require("../common/utils/Helpers.js");
var JSBlock                 = require("./JSBlock.js");
var Message                 = require("./Message.js");
var Toolbar                 = require("./Toolbar.js");
var AppStyles               = require("./AppStyles.js");
var TestBlock               = require("./TestBlock.js");
var SetupBlock              = require("./SetupBlock.js");
var ReasonReact             = require("reason-react/lib/js/src/ReasonReact.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

function _recalculateScores(tests) {
  var fastest = Rebase.List[/* reduce */0]((function (prim, prim$1) {
          return Math.max(prim, prim$1);
        }), 0, Rebase.List[/* map */2](Rebase.Option[/* getOrRaise */15], Rebase.List[/* filter */10](Rebase.Option[/* isSome */11], Rebase.List[/* map */2]((function (param) {
                      var match = param[1];
                      if (typeof match === "number" || !match.tag) {
                        return /* None */0;
                      } else {
                        return /* Some */[match[0][/* hz */0]];
                      }
                    }), tests))));
  return Rebase.List[/* map */2]((function (test) {
                var match = test[1];
                if (typeof match === "number") {
                  return test;
                } else if (match.tag) {
                  var result = match[0];
                  return /* tuple */[
                          test[0],
                          /* Complete */Block.__(1, [
                              result,
                              /* Some */[(result[/* hz */0] - fastest) / fastest * 100]
                            ])
                        ];
                } else {
                  return test;
                }
              }), tests);
}

var component = ReasonReact.reducerComponent("App");

function make(data, url, updateStore, compilerResult, _) {
  var newrecord = component.slice();
  newrecord[/* didMount */4] = (function (param) {
      return /* Update */Block.__(0, [/* record */[
                  /* tests */param[/* state */2][/* tests */0],
                  /* worker */[Worker.make(Curry._1(param[/* reduce */1], (function (message) {
                                return /* WorkerMessage */Block.__(4, [message]);
                              })), (function (prim) {
                            console.log(prim);
                            return /* () */0;
                          }))]
                ]]);
    });
  newrecord[/* render */9] = (function (param) {
      var state = param[/* state */2];
      var reduce = param[/* reduce */1];
      var tmp;
      switch (compilerResult.tag | 0) {
        case 0 : 
            tmp = null;
            break;
        case 1 : 
            tmp = ReasonReact.element(/* None */0, /* None */0, Message.make(/* Warning */-685964740, compilerResult[1], /* array */[]));
            break;
        case 2 : 
            tmp = ReasonReact.element(/* None */0, /* None */0, Message.make(/* Error */106380200, compilerResult[0], /* array */[]));
            break;
        
      }
      var tmp$1;
      var exit = 0;
      switch (compilerResult.tag | 0) {
        case 0 : 
        case 1 : 
            exit = 1;
            break;
        case 2 : 
            tmp$1 = null;
            break;
        
      }
      if (exit === 1) {
        tmp$1 = ReasonReact.element(/* None */0, /* None */0, JSBlock.make(compilerResult[0], /* array */[]));
      }
      return React.createElement("div", {
                  className: AppStyles.root
                }, ReasonReact.element(/* None */0, /* None */0, Toolbar.make(Curry._1(reduce, (function () {
                                return /* RunAll */2;
                              })), Curry._1(reduce, (function () {
                                return /* AddTest */0;
                              })), Curry._1(reduce, (function () {
                                return /* Clear */1;
                              })), url, /* array */[])), tmp, ReasonReact.element(/* None */0, /* None */0, SetupBlock.make(data[/* setup */0], Curry._1(reduce, (function (code) {
                                return /* UpdateSetup */Block.__(2, [code]);
                              })), /* array */[])), $$Array.of_list(Rebase.List[/* reverse */14](Rebase.List[/* map */2]((function (test) {
                                var tmp;
                                try {
                                  tmp = List.assoc(test[/* id */0], state[/* tests */0]);
                                }
                                catch (exn){
                                  if (exn === Caml_builtin_exceptions.not_found) {
                                    tmp = /* Untested */0;
                                  } else {
                                    throw exn;
                                  }
                                }
                                return ReasonReact.element(/* Some */[Curry._1(Test.Id[/* toString */2], test[/* id */0])], /* None */0, TestBlock.make(test, tmp, Curry._1(reduce, (function (changed) {
                                                      return /* UpdateTest */Block.__(0, [changed]);
                                                    })), Curry._1(reduce, (function () {
                                                      return /* RunSingle */Block.__(3, [test]);
                                                    })), Curry._1(reduce, (function () {
                                                      return /* RemoveTest */Block.__(1, [test]);
                                                    })), /* array */[]));
                              }), data[/* tests */1]))), tmp$1, React.createElement("footer", {
                      className: AppStyles.footer
                    }, React.createElement("section", undefined, React.createElement("h1", undefined, Helpers.text("Project")), React.createElement("ul", undefined, React.createElement("li", undefined, React.createElement("a", {
                                      href: "https://github.com/rebench/rebench.github.io"
                                    }, Helpers.text("Source Code Repository"))), React.createElement("li", undefined, React.createElement("a", {
                                      href: "https://github.com/rebench/rebench.github.io/issues"
                                    }, Helpers.text("Support / Bug Tracker"))))), React.createElement("section", undefined, React.createElement("h1", undefined, Helpers.text("Made with")), React.createElement("ul", undefined, React.createElement("li", undefined, React.createElement("a", {
                                      href: "https://github.com/bucklescript/bucklescript"
                                    }, Helpers.text("BuckleScript"))), React.createElement("li", undefined, React.createElement("a", {
                                      href: "https://benchmarkjs.com/"
                                    }, Helpers.text("Benchmark.js"))), React.createElement("li", undefined, React.createElement("a", {
                                      href: "https://codemirror.net/"
                                    }, Helpers.text("CodeMirror"))), React.createElement("li", undefined, React.createElement("a", {
                                      href: "https://reasonml.github.io/reason-react/"
                                    }, Helpers.text("ReasonReact"))), React.createElement("li", undefined, React.createElement("a", {
                                      href: "https://github.com/threepointone/glamor"
                                    }, Helpers.text("glamor"))))), React.createElement("section", undefined, React.createElement("h1", undefined, Helpers.text("Reason")), React.createElement("ul", undefined, React.createElement("li", undefined, React.createElement("a", {
                                      href: "https://reasonml.github.io/guide"
                                    }, Helpers.text("Reason Guide"))), React.createElement("li", undefined, React.createElement("a", {
                                      href: "https://reasonml.github.io/try"
                                    }, Helpers.text("Reason Playground")))))));
    });
  newrecord[/* initialState */10] = (function () {
      return /* record */[
              /* tests : [] */0,
              /* worker */[Worker.make((function (prim) {
                        console.log(prim);
                        return /* () */0;
                      }), (function (prim) {
                        console.log(prim);
                        return /* () */0;
                      }))]
            ];
    });
  newrecord[/* reducer */12] = (function (action, state) {
      var run = function (tests) {
        var exit = 0;
        switch (compilerResult.tag | 0) {
          case 0 : 
          case 1 : 
              exit = 1;
              break;
          case 2 : 
              return /* () */0;
          
        }
        if (exit === 1) {
          return Curry._1(state[/* worker */1][0][/* postMessage */0], /* Run */[
                      compilerResult[0],
                      tests
                    ]);
        }
        
      };
      if (typeof action === "number") {
        switch (action) {
          case 0 : 
              return /* SideEffects */Block.__(2, [(function () {
                            return Curry._1(updateStore, /* AddTest */0);
                          })]);
          case 1 : 
              return /* UpdateWithSideEffects */Block.__(3, [
                        /* record */[
                          /* tests : [] */0,
                          /* worker */state[/* worker */1]
                        ],
                        (function () {
                            return Curry._1(updateStore, /* Clear */1);
                          })
                      ]);
          case 2 : 
              return /* SideEffects */Block.__(2, [(function () {
                            return run(Rebase.List[/* map */2]((function ($$this) {
                                              return $$this[/* id */0];
                                            }), data[/* tests */1]));
                          })]);
          
        }
      } else {
        switch (action.tag | 0) {
          case 0 : 
              var test = action[0];
              return /* UpdateWithSideEffects */Block.__(3, [
                        /* record */[
                          /* tests */_recalculateScores(Rebase.List[/* map */2]((function ($$this) {
                                      var id = $$this[0];
                                      var match = +(id !== test[/* id */0]);
                                      if (match !== 0) {
                                        return $$this;
                                      } else {
                                        return /* tuple */[
                                                id,
                                                /* Untested */0
                                              ];
                                      }
                                    }), state[/* tests */0])),
                          /* worker */state[/* worker */1]
                        ],
                        (function () {
                            return Curry._1(updateStore, /* UpdateTest */Block.__(1, [test]));
                          })
                      ]);
          case 1 : 
              var test$1 = action[0];
              return /* UpdateWithSideEffects */Block.__(3, [
                        /* record */[
                          /* tests */_recalculateScores(Rebase.List[/* filter */10]((function (param) {
                                      return +(param[0] !== test$1[/* id */0]);
                                    }), state[/* tests */0])),
                          /* worker */state[/* worker */1]
                        ],
                        (function () {
                            return Curry._1(updateStore, /* RemoveTest */Block.__(0, [test$1]));
                          })
                      ]);
          case 2 : 
              var code = action[0];
              return /* UpdateWithSideEffects */Block.__(3, [
                        /* record */[
                          /* tests : [] */0,
                          /* worker */state[/* worker */1]
                        ],
                        (function () {
                            return Curry._1(updateStore, /* UpdateSetup */Block.__(2, [code]));
                          })
                      ]);
          case 3 : 
              var test$2 = action[0];
              return /* SideEffects */Block.__(2, [(function () {
                            return run(/* :: */[
                                        test$2[/* id */0],
                                        /* [] */0
                                      ]);
                          })]);
          case 4 : 
              var match = action[0];
              if (typeof match === "number") {
                return /* NoUpdate */0;
              } else if (match.tag) {
                var id = match[0];
                return /* Update */Block.__(0, [/* record */[
                            /* tests */_recalculateScores(/* :: */[
                                  /* tuple */[
                                    id,
                                    /* Complete */Block.__(1, [
                                        match[1],
                                        /* None */0
                                      ])
                                  ],
                                  List.remove_assoc(id, state[/* tests */0])
                                ]),
                            /* worker */state[/* worker */1]
                          ]]);
              } else {
                var id$1 = match[0];
                return /* Update */Block.__(0, [/* record */[
                            /* tests : :: */[
                              /* tuple */[
                                id$1,
                                /* Running */Block.__(0, [match[1]])
                              ],
                              List.remove_assoc(id$1, state[/* tests */0])
                            ],
                            /* worker */state[/* worker */1]
                          ]]);
              }
              break;
          
        }
      }
    });
  return newrecord;
}

var _toArray = $$Array.of_list;

var _assoc = List.assoc;

var _remove_assoc = List.remove_assoc;

var Styles = 0;

exports._toArray           = _toArray;
exports._assoc             = _assoc;
exports._remove_assoc      = _remove_assoc;
exports.Styles             = Styles;
exports._recalculateScores = _recalculateScores;
exports.component          = component;
exports.make               = make;
/* component Not a pure module */
