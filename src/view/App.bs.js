'use strict';

var List = require("bs-platform/lib/js/list.js");
var Test = require("../model/Test.bs.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Button = require("../common/components/Button.bs.js");
var Rebase = require("@glennsl/rebase/src/Rebase.bs.js");
var Vrroom = require("vrroom/src/Vrroom.bs.js");
var Worker = require("../common/ffi/Worker.bs.js");
var Toolbar = require("./Toolbar.bs.js");
var Compiler = require("../services/Compiler.bs.js");
var AppStyles = require("./AppStyles.bs.js");
var HelpModal = require("./HelpModal.bs.js");
var TestBlock = require("./TestBlock.bs.js");
var SetupBlock = require("./SetupBlock.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var TypedGlamor = require("bs-typed-glamor/src/TypedGlamor.bs.js");
var WidthContainer = require("./WidthContainer.bs.js");

var component = ReasonReact.reducerComponent("App");

function make(data, url, updateStore, _) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */(function (param) {
              var send = param[/* send */3];
              return Curry._1(send, /* Init */Block.__(0, [(function (message) {
                                return Curry._1(send, /* WorkerMessage */Block.__(2, [message]));
                              })]));
            }),
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function (param) {
              var send = param[/* send */3];
              var state = param[/* state */1];
              return React.createElement("div", {
                          className: TypedGlamor.toString(AppStyles.container(state[/* showHelp */1]))
                        }, ReasonReact.element(/* None */0, /* None */0, Toolbar.make((function () {
                                    return Curry._1(send, /* RunAll */0);
                                  }), (function () {
                                    return Curry._1(updateStore, /* AddTest */0);
                                  }), (function () {
                                    return Curry._1(updateStore, /* Clear */1);
                                  }), (function () {
                                    return Curry._1(send, /* ShowHelp */1);
                                  }), url, /* array */[])), React.createElement("div", {
                              className: "scroll-container"
                            }, ReasonReact.element(/* None */0, /* None */0, WidthContainer.make(/* array */[
                                      ReasonReact.element(/* None */0, /* None */0, SetupBlock.make(data[/* current */0][/* setup */0], (function (code) {
                                                  return Curry._1(updateStore, /* UpdateSetup */Block.__(3, [code]));
                                                }), /* array */[])),
                                      ReasonReact.element(/* None */0, /* None */0, Curry._3(Vrroom.Control[/* MapList */1][/* make */1], Rebase.List[/* reverse */20](data[/* current */0][/* tests */1]), /* None */0, (function (test) {
                                                  return ReasonReact.element(/* Some */[Test.Id[/* toString */2](test[/* data */0][/* id */0])], /* None */0, TestBlock.make(data[/* current */0][/* setup */0], test[/* data */0], test[/* state */1], (function (changed) {
                                                                    return Curry._1(updateStore, /* UpdateTestData */Block.__(1, [changed]));
                                                                  }), (function () {
                                                                    return Curry._1(send, /* RunSingle */Block.__(1, [test[/* data */0]]));
                                                                  }), (function () {
                                                                    return Curry._1(updateStore, /* RemoveTest */Block.__(0, [test[/* data */0][/* id */0]]));
                                                                  }), (function (language) {
                                                                    var init = test[/* data */0];
                                                                    return Curry._1(updateStore, /* UpdateTestData */Block.__(1, [/* record */[
                                                                                    /* id */init[/* id */0],
                                                                                    /* language */language,
                                                                                    /* code */init[/* code */2]
                                                                                  ]]));
                                                                  }), /* array */[]));
                                                }))),
                                      ReasonReact.element(/* None */0, /* None */0, Curry._2(Vrroom.Control[/* IfSome */3][/* make */1], data[/* undo */1], (function (param) {
                                                  var state = param[1];
                                                  return ReasonReact.element(/* None */0, /* None */0, Button.make("Undo " + param[0], /* Some */["undo"], /* Some */[/* Dark */758939798], /* None */0, /* Some */["undo-button"], (function () {
                                                                    return Curry._1(updateStore, /* Undo */Block.__(4, [state]));
                                                                  }), /* array */[]));
                                                })))
                                    ])), React.createElement("footer", undefined, ReasonReact.element(/* None */0, /* None */0, WidthContainer.make(/* array */[
                                          React.createElement("section", undefined, React.createElement("h1", undefined, Vrroom.text("Project")), React.createElement("ul", undefined, React.createElement("li", undefined, React.createElement("a", {
                                                            href: "https://github.com/rebench/rebench.github.io"
                                                          }, Vrroom.text("Source Code Repository"))), React.createElement("li", undefined, React.createElement("a", {
                                                            href: "https://github.com/rebench/rebench.github.io/issues"
                                                          }, Vrroom.text("Support / Bug Tracker"))))),
                                          React.createElement("section", undefined, React.createElement("h1", undefined, Vrroom.text("Made with")), React.createElement("ul", undefined, React.createElement("li", undefined, React.createElement("a", {
                                                            href: "https://github.com/bucklescript/bucklescript"
                                                          }, Vrroom.text("BuckleScript"))), React.createElement("li", undefined, React.createElement("a", {
                                                            href: "https://benchmarkjs.com/"
                                                          }, Vrroom.text("Benchmark.js"))), React.createElement("li", undefined, React.createElement("a", {
                                                            href: "https://codemirror.net/"
                                                          }, Vrroom.text("CodeMirror"))), React.createElement("li", undefined, React.createElement("a", {
                                                            href: "https://reasonml.github.io/reason-react/"
                                                          }, Vrroom.text("ReasonReact"))), React.createElement("li", undefined, React.createElement("a", {
                                                            href: "https://github.com/threepointone/glamor"
                                                          }, Vrroom.text("glamor"))))),
                                          React.createElement("section", undefined, React.createElement("h1", undefined, Vrroom.text("Reason")), React.createElement("ul", undefined, React.createElement("li", undefined, React.createElement("a", {
                                                            href: "https://reasonml.github.io/guide"
                                                          }, Vrroom.text("Reason Guide"))), React.createElement("li", undefined, React.createElement("a", {
                                                            href: "https://reasonml.github.io/try"
                                                          }, Vrroom.text("Reason Playground")))))
                                        ])))), ReasonReact.element(/* None */0, /* None */0, Curry._2(Vrroom.Control[/* If */2][/* make */1], state[/* showHelp */1], (function () {
                                    return React.createElement("div", {
                                                className: "mask",
                                                onClick: (function (e) {
                                                    var match = e.target === e.currentTarget;
                                                    if (match) {
                                                      return Curry._1(send, /* HideHelp */2);
                                                    } else {
                                                      return /* () */0;
                                                    }
                                                  })
                                              }, ReasonReact.element(/* None */0, /* None */0, HelpModal.make((function () {
                                                          return Curry._1(send, /* HideHelp */2);
                                                        }), /* array */[])));
                                  }))));
            }),
          /* initialState */(function () {
              return /* record */[
                      /* worker */[/* None */0],
                      /* showHelp */false
                    ];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (action, state) {
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
                                    Compiler.compileTest(data[/* current */0][/* setup */0], test)
                                  ];
                          }), tests));
                return Rebase.Option[/* forEach */8]((function (w) {
                              return Curry._1(w[/* postMessage */0], /* Run */[tests$1]);
                            }), state[/* worker */0][0]);
              };
              if (typeof action === "number") {
                switch (action) {
                  case 0 : 
                      return /* SideEffects */Block.__(1, [(function () {
                                    return run(Rebase.List[/* map */0]((function ($$this) {
                                                      return $$this[/* data */0];
                                                    }), data[/* current */0][/* tests */1]));
                                  })]);
                  case 1 : 
                      return /* Update */Block.__(0, [/* record */[
                                  /* worker */state[/* worker */0],
                                  /* showHelp */true
                                ]]);
                  case 2 : 
                      return /* Update */Block.__(0, [/* record */[
                                  /* worker */state[/* worker */0],
                                  /* showHelp */false
                                ]]);
                  
                }
              } else {
                switch (action.tag | 0) {
                  case 0 : 
                      return /* Update */Block.__(0, [/* record */[
                                  /* worker */[/* Some */[Worker.make(action[0])]],
                                  /* showHelp */state[/* showHelp */1]
                                ]]);
                  case 1 : 
                      var test = action[0];
                      return /* SideEffects */Block.__(1, [(function () {
                                    return run(/* :: */[
                                                test,
                                                /* [] */0
                                              ]);
                                  })]);
                  case 2 : 
                      var match = action[0];
                      if (typeof match === "number") {
                        return /* NoUpdate */0;
                      } else {
                        switch (match.tag | 0) {
                          case 0 : 
                              var result = match[1];
                              var id = match[0];
                              return /* SideEffects */Block.__(1, [(function () {
                                            return Curry._1(updateStore, /* UpdateTestState */Block.__(2, [
                                                          id,
                                                          /* Running */Block.__(0, [result])
                                                        ]));
                                          })]);
                          case 1 : 
                              var error = match[1];
                              var id$1 = match[0];
                              return /* SideEffects */Block.__(1, [(function () {
                                            return Curry._1(updateStore, /* UpdateTestState */Block.__(2, [
                                                          id$1,
                                                          /* Error */Block.__(1, [error])
                                                        ]));
                                          })]);
                          case 2 : 
                              var result$1 = match[1];
                              var id$2 = match[0];
                              return /* SideEffects */Block.__(1, [(function () {
                                            return Curry._1(updateStore, /* UpdateTestState */Block.__(2, [
                                                          id$2,
                                                          /* Complete */Block.__(2, [
                                                              result$1,
                                                              /* None */0
                                                            ])
                                                        ]));
                                          })]);
                          case 3 : 
                              var error$1 = match[0];
                              return /* SideEffects */Block.__(1, [(function () {
                                            console.log(error$1);
                                            return /* () */0;
                                          })]);
                          
                        }
                      }
                  
                }
              }
            }),
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

var _assoc = List.assoc;

var _remove_assoc = List.remove_assoc;

var Styles = 0;

exports._assoc = _assoc;
exports._remove_assoc = _remove_assoc;
exports.Styles = Styles;
exports.component = component;
exports.make = make;
/* component Not a pure module */
