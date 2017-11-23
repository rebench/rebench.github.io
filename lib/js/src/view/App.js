'use strict';

var List                    = require("bs-platform/lib/js/list.js");
var $$Array                 = require("bs-platform/lib/js/array.js");
var Block                   = require("bs-platform/lib/js/block.js");
var Curry                   = require("bs-platform/lib/js/curry.js");
var Model                   = require("../model/Model.js");
var React                   = require("react");
var Rebase                  = require("reason-rebase/lib/js/src/rebase.js");
var Worker                  = require("../common/ffi/Worker.js");
var JSBlock                 = require("./JSBlock.js");
var Message                 = require("./Message.js");
var Toolbar                 = require("./Toolbar.js");
var TestCase                = require("./TestCase.js");
var SetupBlock              = require("./SetupBlock.js");
var ReasonReact             = require("reason-react/lib/js/src/ReasonReact.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

var component = ReasonReact.reducerComponent("App");

function make(data, url, updateStore, compilerResult, _) {
  var newrecord = component.slice();
  newrecord[/* didMount */4] = (function (param) {
      return /* Update */Block.__(0, [/* record */[
                  /* tests */param[/* state */2][/* tests */0],
                  /* worker */[Worker.make(Curry._1(param[/* reduce */1], (function (message) {
                                return /* WorkerMessage */Block.__(1, [message]);
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
      return React.createElement("div", undefined, ReasonReact.element(/* None */0, /* None */0, Toolbar.make((function (param) {
                            if (param !== -267608394) {
                              if (param >= 3254785) {
                                return Curry._1(updateStore, /* AddTest */0);
                              } else {
                                return Curry._1(updateStore, /* Clear */1);
                              }
                            } else {
                              return Curry._2(reduce, (function () {
                                            return /* RunAll */0;
                                          }), /* () */0);
                            }
                          }), url, /* array */[])), tmp, ReasonReact.element(/* None */0, /* None */0, SetupBlock.make(data[/* setup */0], (function (code) {
                            return Curry._1(updateStore, /* UpdateSetup */Block.__(2, [code]));
                          }), /* array */[])), $$Array.of_list(Rebase.List[/* reverse */14](Rebase.List[/* map */2]((function (test) {
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
                                return ReasonReact.element(/* Some */[Curry._1(Model.Id[/* toString */2], test[/* id */0])], /* None */0, TestCase.make(test, tmp, (function (changed) {
                                                  return Curry._1(updateStore, /* UpdateTest */Block.__(1, [changed]));
                                                }), Curry._1(reduce, (function () {
                                                      return /* RunSingle */Block.__(0, [test]);
                                                    })), (function () {
                                                  return Curry._1(updateStore, /* RemoveTest */Block.__(0, [test]));
                                                }), /* array */[]));
                              }), data[/* tests */1]))), tmp$1);
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
      if (typeof action === "number") {
        return /* SideEffects */Block.__(2, [(function (self) {
                      var ids = Rebase.List[/* map */2]((function ($$this) {
                              return $$this[/* id */0];
                            }), data[/* tests */1]);
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
                        return Curry._1(self[/* state */2][/* worker */1][0][/* postMessage */0], /* Run */[
                                    compilerResult[0],
                                    ids
                                  ]);
                      }
                      
                    })]);
      } else if (action.tag) {
        var match = action[0];
        if (typeof match === "number") {
          return /* NoUpdate */0;
        } else if (match.tag) {
          var id = match[0];
          return /* Update */Block.__(0, [/* record */[
                      /* tests : :: */[
                        /* tuple */[
                          id,
                          /* Complete */Block.__(1, [match[1]])
                        ],
                        List.remove_assoc(id, state[/* tests */0])
                      ],
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
      } else {
        var test = action[0];
        return /* SideEffects */Block.__(2, [(function (self) {
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
                        return Curry._1(self[/* state */2][/* worker */1][0][/* postMessage */0], /* Run */[
                                    compilerResult[0],
                                    /* :: */[
                                      test[/* id */0],
                                      /* [] */0
                                    ]
                                  ]);
                      }
                      
                    })]);
      }
    });
  return newrecord;
}

var _toArray = $$Array.of_list;

var _assoc = List.assoc;

var _remove_assoc = List.remove_assoc;

exports._toArray      = _toArray;
exports._assoc        = _assoc;
exports._remove_assoc = _remove_assoc;
exports.component     = component;
exports.make          = make;
/* component Not a pure module */
