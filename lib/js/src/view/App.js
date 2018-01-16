'use strict';

var List           = require("bs-platform/lib/js/list.js");
var Test           = require("../model/Test.js");
var Block          = require("bs-platform/lib/js/block.js");
var Curry          = require("bs-platform/lib/js/curry.js");
var React          = require("react");
var Rebase         = require("@glennsl/rebase/lib/js/src/Rebase.bs.js");
var Vrroom         = require("vrroom/lib/js/src/Vrroom.bs.js");
var Worker         = require("../common/ffi/Worker.js");
var Toolbar        = require("./Toolbar.js");
var Compiler       = require("../services/Compiler.js");
var AppStyles      = require("./AppStyles.js");
var HelpModal      = require("./HelpModal.js");
var TestBlock      = require("./TestBlock.js");
var SetupBlock     = require("./SetupBlock.js");
var ReasonReact    = require("reason-react/lib/js/src/ReasonReact.js");
var TypedGlamor    = require("typed-glamor/lib/js/src/TypedGlamor.bs.js");
var WidthContainer = require("./WidthContainer.js");

var component = ReasonReact.reducerComponent("App");

function make(data, url, updateStore, _) {
  var newrecord = component.slice();
  newrecord[/* didMount */4] = (function (param) {
      var send = param[/* send */4];
      return /* Update */Block.__(0, [/* record */[
                  /* worker */[Worker.make((function (message) {
                            return Curry._1(send, /* WorkerMessage */Block.__(1, [message]));
                          }))],
                  /* showHelp */param[/* state */2][/* showHelp */1]
                ]]);
    });
  newrecord[/* render */9] = (function (param) {
      var send = param[/* send */4];
      var state = param[/* state */2];
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
                          }), url, /* int array */[])), React.createElement("div", {
                      className: "scroll-container"
                    }, ReasonReact.element(/* None */0, /* None */0, WidthContainer.make(/* array */[
                              ReasonReact.element(/* None */0, /* None */0, SetupBlock.make(data[/* current */0][/* setup */0], (function (code) {
                                          return Curry._1(updateStore, /* UpdateSetup */Block.__(3, [code]));
                                        }), /* array */[])),
                              ReasonReact.element(/* None */0, /* None */0, Curry._3(Vrroom.Control[/* MapList */1][/* make */1], Rebase.List[/* reverse */20](data[/* current */0][/* tests */1]), /* None */0, (function (test) {
                                          return ReasonReact.element(/* Some */[Curry._1(Test.Id[/* toString */2], test[/* data */0][/* id */0])], /* None */0, TestBlock.make(data[/* current */0][/* setup */0], test[/* data */0], test[/* state */1], (function (changed) {
                                                            return Curry._1(updateStore, /* UpdateTestData */Block.__(1, [changed]));
                                                          }), (function () {
                                                            return Curry._1(send, /* RunSingle */Block.__(0, [test[/* data */0]]));
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
                                ])))), ReasonReact.element(/* None */0, /* None */0, Curry._2(Vrroom.Control[/* If */2][/* make */1], state[/* showHelp */1], (function () {
                            return React.createElement("div", {
                                        className: "mask",
                                        onClick: (function (e) {
                                            var match = +(e.target === e.currentTarget);
                                            if (match !== 0) {
                                              return Curry._1(send, /* HideHelp */2);
                                            } else {
                                              return /* () */0;
                                            }
                                          })
                                      }, ReasonReact.element(/* None */0, /* None */0, HelpModal.make((function () {
                                                  return Curry._1(send, /* HideHelp */2);
                                                }), /* int array */[])));
                          }))));
    });
  newrecord[/* initialState */10] = (function () {
      return /* record */[
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
                            Compiler.compileTest(data[/* current */0][/* setup */0], test)
                          ];
                  }), tests));
        return Curry._1(state[/* worker */0][0][/* postMessage */0], /* Run */[tests$1]);
      };
      if (typeof action === "number") {
        switch (action) {
          case 0 : 
              return /* SideEffects */Block.__(2, [(function () {
                            return run(Rebase.List[/* map */0]((function ($$this) {
                                              return $$this[/* data */0];
                                            }), data[/* current */0][/* tests */1]));
                          })]);
          case 1 : 
              return /* Update */Block.__(0, [/* record */[
                          /* worker */state[/* worker */0],
                          /* showHelp : true */1
                        ]]);
          case 2 : 
              return /* Update */Block.__(0, [/* record */[
                          /* worker */state[/* worker */0],
                          /* showHelp : false */0
                        ]]);
          
        }
      } else if (action.tag) {
        var match = action[0];
        if (typeof match === "number") {
          return /* NoUpdate */0;
        } else {
          switch (match.tag | 0) {
            case 0 : 
                var result = match[1];
                var id = match[0];
                return /* SideEffects */Block.__(2, [(function () {
                              return Curry._1(updateStore, /* UpdateTestState */Block.__(2, [
                                            id,
                                            /* Running */Block.__(0, [result])
                                          ]));
                            })]);
            case 1 : 
                var error = match[1];
                var id$1 = match[0];
                return /* SideEffects */Block.__(2, [(function () {
                              return Curry._1(updateStore, /* UpdateTestState */Block.__(2, [
                                            id$1,
                                            /* Error */Block.__(1, [error])
                                          ]));
                            })]);
            case 2 : 
                var result$1 = match[1];
                var id$2 = match[0];
                return /* SideEffects */Block.__(2, [(function () {
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
                return /* SideEffects */Block.__(2, [(function () {
                              console.log(error$1);
                              return /* () */0;
                            })]);
            
          }
        }
      } else {
        var test = action[0];
        return /* SideEffects */Block.__(2, [(function () {
                      return run(/* :: */[
                                  test,
                                  /* [] */0
                                ]);
                    })]);
      }
    });
  return newrecord;
}

var _assoc = List.assoc;

var _remove_assoc = List.remove_assoc;

var Control = 0;

var Styles = 0;

exports._assoc        = _assoc;
exports._remove_assoc = _remove_assoc;
exports.Control       = Control;
exports.Styles        = Styles;
exports.component     = component;
exports.make          = make;
/* component Not a pure module */
