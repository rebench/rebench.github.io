'use strict';

var List                    = require("bs-platform/lib/js/list.js");
var Test                    = require("../model/Test.js");
var Block                   = require("bs-platform/lib/js/block.js");
var Curry                   = require("bs-platform/lib/js/curry.js");
var React                   = require("react");
var Rebase                  = require("@glennsl/rebase/lib/js/src/Rebase.bs.js");
var Vrroom                  = require("vrroom/lib/js/src/Vrroom.bs.js");
var Worker                  = require("../common/ffi/Worker.js");
var Toolbar                 = require("./Toolbar.js");
var Compiler                = require("../services/Compiler.js");
var AppStyles               = require("./AppStyles.js");
var HelpModal               = require("./HelpModal.js");
var TestBlock               = require("./TestBlock.js");
var SetupBlock              = require("./SetupBlock.js");
var ReasonReact             = require("reason-react/lib/js/src/ReasonReact.js");
var TypedGlamor             = require("typed-glamor/lib/js/src/TypedGlamor.bs.js");
var WidthContainer          = require("./WidthContainer.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

function _recalculateScores(tests) {
  var fastest = Rebase.List[/* reduce */3]((function (prim, prim$1) {
          return Math.max(prim, prim$1);
        }), 0, Rebase.List[/* map */0](Rebase.Option[/* getOrRaise */17], Rebase.List[/* filter */10](Rebase.Option[/* isSome */13], Rebase.List[/* map */0]((function (param) {
                      var match = param[1];
                      if (typeof match === "number" || match.tag !== 2) {
                        return /* None */0;
                      } else {
                        return /* Some */[match[0][/* hz */0]];
                      }
                    }), tests))));
  return Rebase.List[/* map */0]((function (test) {
                var match = test[1];
                if (typeof match === "number") {
                  return test;
                } else if (match.tag === 2) {
                  var result = match[0];
                  return /* tuple */[
                          test[0],
                          /* Complete */Block.__(2, [
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

function make(data, url, updateStore, _) {
  var newrecord = component.slice();
  newrecord[/* didMount */4] = (function (param) {
      var send = param[/* send */4];
      var state = param[/* state */2];
      return /* Update */Block.__(0, [/* record */[
                  /* tests */state[/* tests */0],
                  /* worker */[Worker.make((function (message) {
                            return Curry._1(send, /* WorkerMessage */Block.__(4, [message]));
                          }))],
                  /* showHelp */state[/* showHelp */2]
                ]]);
    });
  newrecord[/* render */9] = (function (param) {
      var send = param[/* send */4];
      var state = param[/* state */2];
      return React.createElement("div", {
                  className: TypedGlamor.toString(AppStyles.container(state[/* showHelp */2]))
                }, ReasonReact.element(/* None */0, /* None */0, Toolbar.make((function () {
                            return Curry._1(send, /* RunAll */2);
                          }), (function () {
                            return Curry._1(send, /* AddTest */0);
                          }), (function () {
                            return Curry._1(send, /* Clear */1);
                          }), (function () {
                            return Curry._1(send, /* ShowHelp */3);
                          }), url, /* int array */[])), React.createElement("div", {
                      className: "scroll-container"
                    }, ReasonReact.element(/* None */0, /* None */0, WidthContainer.make(/* array */[
                              ReasonReact.element(/* None */0, /* None */0, SetupBlock.make(data[/* setup */0], (function (code) {
                                          return Curry._1(send, /* UpdateSetup */Block.__(2, [code]));
                                        }), /* array */[])),
                              ReasonReact.element(/* None */0, /* None */0, Curry._3(Vrroom.Control[/* MapList */1][/* make */1], Rebase.List[/* reverse */20](data[/* tests */1]), /* None */0, (function (test) {
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
                                          return ReasonReact.element(/* Some */[Curry._1(Test.Id[/* toString */2], test[/* id */0])], /* None */0, TestBlock.make(data[/* setup */0], test, tmp, (function (changed) {
                                                            return Curry._1(send, /* UpdateTest */Block.__(0, [changed]));
                                                          }), (function () {
                                                            return Curry._1(send, /* RunSingle */Block.__(3, [test]));
                                                          }), (function () {
                                                            return Curry._1(send, /* RemoveTest */Block.__(1, [test]));
                                                          }), (function (language) {
                                                            return Curry._1(send, /* UpdateTest */Block.__(0, [/* record */[
                                                                            /* id */test[/* id */0],
                                                                            /* language */language,
                                                                            /* code */test[/* code */2]
                                                                          ]]));
                                                          }), /* array */[]));
                                        })))
                            ])), React.createElement("footer", undefined, ReasonReact.element(/* None */0, /* None */0, WidthContainer.make(/* array */[
                                  React.createElement("section", undefined, React.createElement("h1", undefined, Vrroom.Helpers[/* text */0]("Project")), React.createElement("ul", undefined, React.createElement("li", undefined, React.createElement("a", {
                                                    href: "https://github.com/rebench/rebench.github.io"
                                                  }, Vrroom.Helpers[/* text */0]("Source Code Repository"))), React.createElement("li", undefined, React.createElement("a", {
                                                    href: "https://github.com/rebench/rebench.github.io/issues"
                                                  }, Vrroom.Helpers[/* text */0]("Support / Bug Tracker"))))),
                                  React.createElement("section", undefined, React.createElement("h1", undefined, Vrroom.Helpers[/* text */0]("Made with")), React.createElement("ul", undefined, React.createElement("li", undefined, React.createElement("a", {
                                                    href: "https://github.com/bucklescript/bucklescript"
                                                  }, Vrroom.Helpers[/* text */0]("BuckleScript"))), React.createElement("li", undefined, React.createElement("a", {
                                                    href: "https://benchmarkjs.com/"
                                                  }, Vrroom.Helpers[/* text */0]("Benchmark.js"))), React.createElement("li", undefined, React.createElement("a", {
                                                    href: "https://codemirror.net/"
                                                  }, Vrroom.Helpers[/* text */0]("CodeMirror"))), React.createElement("li", undefined, React.createElement("a", {
                                                    href: "https://reasonml.github.io/reason-react/"
                                                  }, Vrroom.Helpers[/* text */0]("ReasonReact"))), React.createElement("li", undefined, React.createElement("a", {
                                                    href: "https://github.com/threepointone/glamor"
                                                  }, Vrroom.Helpers[/* text */0]("glamor"))))),
                                  React.createElement("section", undefined, React.createElement("h1", undefined, Vrroom.Helpers[/* text */0]("Reason")), React.createElement("ul", undefined, React.createElement("li", undefined, React.createElement("a", {
                                                    href: "https://reasonml.github.io/guide"
                                                  }, Vrroom.Helpers[/* text */0]("Reason Guide"))), React.createElement("li", undefined, React.createElement("a", {
                                                    href: "https://reasonml.github.io/try"
                                                  }, Vrroom.Helpers[/* text */0]("Reason Playground")))))
                                ])))), ReasonReact.element(/* None */0, /* None */0, Curry._2(Vrroom.Control[/* If */2][/* make */1], state[/* showHelp */2], (function () {
                            return React.createElement("div", {
                                        className: "mask",
                                        onClick: (function (e) {
                                            var match = +(e.target === e.currentTarget);
                                            if (match !== 0) {
                                              return Curry._1(send, /* HideHelp */4);
                                            } else {
                                              return /* () */0;
                                            }
                                          })
                                      }, ReasonReact.element(/* None */0, /* None */0, HelpModal.make((function () {
                                                  return Curry._1(send, /* HideHelp */4);
                                                }), /* int array */[])));
                          }))));
    });
  newrecord[/* initialState */10] = (function () {
      return /* record */[
              /* tests : [] */0,
              /* worker */[Worker.make((function (prim) {
                        console.log(prim);
                        return /* () */0;
                      }))],
              /* showHelp : false */0
            ];
    });
  newrecord[/* reducer */12] = (function (action, state) {
      var run = function (tests) {
        var tests$1 = Rebase.List[/* map */0]((function (param) {
                var match = param[1];
                var id = param[0];
                switch (match.tag | 0) {
                  case 0 : 
                  case 1 : 
                      return /* tuple */[
                              id,
                              match[0]
                            ];
                  case 2 : 
                      return /* tuple */[
                              id,
                              "throw Error('failed to compile');"
                            ];
                  
                }
              }), Rebase.List[/* map */0]((function (test) {
                    return /* tuple */[
                            test[/* id */0],
                            Compiler.compileTest(data[/* setup */0], test)
                          ];
                  }), tests));
        return Curry._1(state[/* worker */1][0][/* postMessage */0], /* Run */[tests$1]);
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
                          /* worker */state[/* worker */1],
                          /* showHelp */state[/* showHelp */2]
                        ],
                        (function () {
                            return Curry._1(updateStore, /* Clear */1);
                          })
                      ]);
          case 2 : 
              return /* SideEffects */Block.__(2, [(function () {
                            return run(data[/* tests */1]);
                          })]);
          case 3 : 
              return /* Update */Block.__(0, [/* record */[
                          /* tests */state[/* tests */0],
                          /* worker */state[/* worker */1],
                          /* showHelp : true */1
                        ]]);
          case 4 : 
              return /* Update */Block.__(0, [/* record */[
                          /* tests */state[/* tests */0],
                          /* worker */state[/* worker */1],
                          /* showHelp : false */0
                        ]]);
          
        }
      } else {
        switch (action.tag | 0) {
          case 0 : 
              var test = action[0];
              return /* UpdateWithSideEffects */Block.__(3, [
                        /* record */[
                          /* tests */_recalculateScores(Rebase.List[/* map */0]((function ($$this) {
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
                          /* worker */state[/* worker */1],
                          /* showHelp */state[/* showHelp */2]
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
                          /* worker */state[/* worker */1],
                          /* showHelp */state[/* showHelp */2]
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
                          /* worker */state[/* worker */1],
                          /* showHelp */state[/* showHelp */2]
                        ],
                        (function () {
                            return Curry._1(updateStore, /* UpdateSetup */Block.__(2, [code]));
                          })
                      ]);
          case 3 : 
              var test$2 = action[0];
              return /* SideEffects */Block.__(2, [(function () {
                            return run(/* :: */[
                                        test$2,
                                        /* [] */0
                                      ]);
                          })]);
          case 4 : 
              var match = action[0];
              if (typeof match === "number") {
                return /* NoUpdate */0;
              } else {
                switch (match.tag | 0) {
                  case 0 : 
                      var id = match[0];
                      return /* Update */Block.__(0, [/* record */[
                                  /* tests : :: */[
                                    /* tuple */[
                                      id,
                                      /* Running */Block.__(0, [match[1]])
                                    ],
                                    List.remove_assoc(id, state[/* tests */0])
                                  ],
                                  /* worker */state[/* worker */1],
                                  /* showHelp */state[/* showHelp */2]
                                ]]);
                  case 1 : 
                      var id$1 = match[0];
                      return /* Update */Block.__(0, [/* record */[
                                  /* tests : :: */[
                                    /* tuple */[
                                      id$1,
                                      /* Error */Block.__(1, [match[1]])
                                    ],
                                    List.remove_assoc(id$1, state[/* tests */0])
                                  ],
                                  /* worker */state[/* worker */1],
                                  /* showHelp */state[/* showHelp */2]
                                ]]);
                  case 2 : 
                      var id$2 = match[0];
                      return /* Update */Block.__(0, [/* record */[
                                  /* tests */_recalculateScores(/* :: */[
                                        /* tuple */[
                                          id$2,
                                          /* Complete */Block.__(2, [
                                              match[1],
                                              /* None */0
                                            ])
                                        ],
                                        List.remove_assoc(id$2, state[/* tests */0])
                                      ]),
                                  /* worker */state[/* worker */1],
                                  /* showHelp */state[/* showHelp */2]
                                ]]);
                  case 3 : 
                      var error = match[0];
                      return /* SideEffects */Block.__(2, [(function () {
                                    console.log(error);
                                    return /* () */0;
                                  })]);
                  
                }
              }
              break;
          
        }
      }
    });
  return newrecord;
}

var _assoc = List.assoc;

var _remove_assoc = List.remove_assoc;

var Control = 0;

var Styles = 0;

exports._assoc             = _assoc;
exports._remove_assoc      = _remove_assoc;
exports.Control            = Control;
exports.Styles             = Styles;
exports._recalculateScores = _recalculateScores;
exports.component          = component;
exports.make               = make;
/* component Not a pure module */
