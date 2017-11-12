'use strict';

var $$Array      = require("bs-platform/lib/js/array.js");
var Block        = require("bs-platform/lib/js/block.js");
var Curry        = require("bs-platform/lib/js/curry.js");
var Utils        = require("./Utils.js");
var React        = require("react");
var Js_exn       = require("bs-platform/lib/js/js_exn.js");
var Rebase       = require("reason-rebase/lib/js/src/rebase.js");
var Worker       = require("./ffi/Worker.js");
var JSBlock      = require("./JSBlock.js");
var Toolbar      = require("./Toolbar.js");
var Compiler     = require("./Compiler.js");
var TestCase     = require("./TestCase.js");
var SetupBlock   = require("./SetupBlock.js");
var ReasonReact  = require("reason-react/lib/js/src/reasonReact.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");

function _updateResults(testCases) {
  var completed = Rebase.List[/* map */2](Rebase.Option[/* getOrRaise */15], Rebase.List[/* filter */10](Rebase.Option[/* isSome */11], Rebase.List[/* map */2]((function ($$this) {
                  var match = $$this[/* state */1];
                  if (typeof match === "number" || !match.tag) {
                    return /* None */0;
                  } else {
                    return /* Some */[/* tuple */[
                              $$this[/* data */0][/* id */0],
                              match[0]
                            ]];
                  }
                }), testCases)));
  var fastest = Rebase.List[/* reduce */0]((function (prim, prim$1) {
          return Math.max(prim, prim$1);
        }), 0, Rebase.List[/* map */2]((function (param) {
              return param[1][/* hz */0];
            }), completed));
  return Rebase.List[/* map */2]((function ($$this) {
                var result = Rebase.Option[/* map */2]((function (param) {
                        return param[1];
                      }), Rebase.List[/* find */7]((function (param) {
                            return +($$this[/* data */0][/* id */0] === param[0]);
                          }), completed));
                if (result) {
                  var result$1 = result[0];
                  return /* record */[
                          /* data */$$this[/* data */0],
                          /* state : Complete */Block.__(1, [/* record */[
                                /* hz */result$1[/* hz */0],
                                /* rme */result$1[/* rme */1],
                                /* sampleCount */result$1[/* sampleCount */2],
                                /* comparison : Some */[(result$1[/* hz */0] - fastest) / fastest * 100]
                              ]])
                        ];
                } else {
                  return $$this;
                }
              }), testCases);
}

var component = ReasonReact.reducerComponent("App");

function make() {
  var newId = Utils.makeCounter(1);
  var wrapTestCase = function (data) {
    return /* record */[
            /* data */data,
            /* state : Virgin */0
          ];
  };
  var retrieve = function () {
    var fromLocalStorage = function () {
      return Rebase.Option[/* map */2]((function (prim) {
                    return prim;
                  }), Rebase.Option[/* map */2]((function (prim) {
                        return JSON.parse(prim);
                      }), Js_primitive.null_to_opt(localStorage.getItem("rebench-data"))));
    };
    return Rebase.Option[/* getOr */14](/* tuple */[
                "/* code goes here */",
                /* :: */[
                  /* record */[
                    /* data */TestCase.make(Curry._1(newId, /* () */0)),
                    /* state : Virgin */0
                  ],
                  /* :: */[
                    /* record */[
                      /* data */TestCase.make(Curry._1(newId, /* () */0)),
                      /* state : Virgin */0
                    ],
                    /* [] */0
                  ]
                ]
              ], Rebase.Option[/* map */2]((function (param) {
                      return /* tuple */[
                              param[0],
                              Rebase.List[/* map */2](wrapTestCase, param[1])
                            ];
                    }), Rebase.Option[/* or_ */13](fromLocalStorage(/* () */0), /* None */0)));
  };
  var persist = function (setupCode, testCases) {
    try {
      var data = Rebase.Option[/* getOrRaise */15](Js_primitive.undefined_to_opt(JSON.stringify(/* tuple */[
                    setupCode,
                    Rebase.List[/* map */2]((function ($$this) {
                            return $$this[/* data */0];
                          }), testCases)
                  ])));
      localStorage.setItem("rebench-data", data);
      return /* () */0;
    }
    catch (raw_e){
      var e = Js_exn.internalToOCamlException(raw_e);
      console.log(e);
      return /* () */0;
    }
  };
  var newrecord = component.slice();
  newrecord[/* didMount */4] = (function (param) {
      var state = param[/* state */4];
      return /* Update */Block.__(0, [/* record */[
                  /* setupCode */state[/* setupCode */0],
                  /* testCases */state[/* testCases */1],
                  /* worker */[Worker.make(Curry._1(param[/* reduce */3], (function (message) {
                                return /* WorkerMessage */Block.__(4, [message]);
                              })), (function (prim) {
                            console.log(prim);
                            return /* () */0;
                          }))],
                  /* compiledCode */state[/* compiledCode */3]
                ]]);
    });
  newrecord[/* render */9] = (function (param) {
      var state = param[/* state */4];
      var reduce = param[/* reduce */3];
      return React.createElement("div", undefined, ReasonReact.element(/* None */0, /* None */0, Toolbar.make(Curry._1(reduce, (function (param) {
                                if (param >= 3254785) {
                                  return /* Add */1;
                                } else {
                                  return /* RunAll */0;
                                }
                              })), /* array */[])), ReasonReact.element(/* None */0, /* None */0, SetupBlock.make(state[/* setupCode */0], Curry._1(reduce, (function (code) {
                                return /* SetupChanged */Block.__(3, [code]);
                              })), /* array */[])), $$Array.of_list(Rebase.List[/* reverse */14](Rebase.List[/* map */2]((function ($$this) {
                                return ReasonReact.element(/* Some */[$$this[/* data */0][/* id */0]], /* None */0, TestCase.View[/* make */2]($$this[/* data */0], $$this[/* state */1], Curry._1(reduce, (function (data) {
                                                      return /* Change */Block.__(2, [data]);
                                                    })), Curry._1(reduce, (function () {
                                                      return /* RunSingle */Block.__(0, [$$this[/* data */0]]);
                                                    })), Curry._1(reduce, (function () {
                                                      return /* Remove */Block.__(1, [$$this[/* data */0]]);
                                                    })), /* array */[]));
                              }), state[/* testCases */1]))), ReasonReact.element(/* None */0, /* None */0, JSBlock.make(state[/* compiledCode */3], /* array */[])));
    });
  newrecord[/* initialState */10] = (function () {
      var match = retrieve(/* () */0);
      return /* record */[
              /* setupCode */match[0],
              /* testCases */match[1],
              /* worker */[Worker.make((function (prim) {
                        console.log(prim);
                        return /* () */0;
                      }), (function (prim) {
                        console.log(prim);
                        return /* () */0;
                      }))],
              /* compiledCode */"// nothing yet"
            ];
    });
  newrecord[/* reducer */12] = (function (action, state) {
      var setPersistentState = function (setupCode, testCases) {
        persist(setupCode, testCases);
        return /* record */[
                /* setupCode */setupCode,
                /* testCases */testCases,
                /* worker */state[/* worker */2],
                /* compiledCode */state[/* compiledCode */3]
              ];
      };
      var setCompiledCode = function (state) {
        return /* record */[
                /* setupCode */state[/* setupCode */0],
                /* testCases */state[/* testCases */1],
                /* worker */state[/* worker */2],
                /* compiledCode */Compiler.compile(state[/* setupCode */0], Rebase.List[/* map */2]((function ($$this) {
                            return $$this[/* data */0];
                          }), state[/* testCases */1]))
              ];
      };
      if (typeof action === "number") {
        if (action) {
          return /* Update */Block.__(0, [setPersistentState(state[/* setupCode */0], /* :: */[
                          /* record */[
                            /* data */TestCase.make(Curry._1(newId, /* () */0)),
                            /* state : Virgin */0
                          ],
                          state[/* testCases */1]
                        ])]);
        } else {
          var ids = Rebase.List[/* map */2]((function ($$this) {
                  return $$this[/* data */0][/* id */0];
                }), state[/* testCases */1]);
          Curry._1(state[/* worker */2][0][/* postMessage */0], /* Run */[
                state[/* compiledCode */3],
                ids
              ]);
          return /* NoUpdate */0;
        }
      } else {
        switch (action.tag | 0) {
          case 0 : 
              Curry._1(state[/* worker */2][0][/* postMessage */0], /* Run */[
                    state[/* compiledCode */3],
                    /* :: */[
                      action[0][/* id */0],
                      /* [] */0
                    ]
                  ]);
              return /* NoUpdate */0;
          case 1 : 
              var target = action[0];
              return /* Update */Block.__(0, [setPersistentState(state[/* setupCode */0], Rebase.List[/* filter */10]((function ($$this) {
                                    return +($$this[/* data */0][/* id */0] !== target[/* id */0]);
                                  }), state[/* testCases */1]))]);
          case 2 : 
              var target$1 = action[0];
              return /* Update */Block.__(0, [setCompiledCode(setPersistentState(state[/* setupCode */0], _updateResults(Rebase.List[/* map */2]((function ($$this) {
                                            var match = +($$this[/* data */0][/* id */0] === target$1[/* id */0]);
                                            if (match !== 0) {
                                              return /* record */[
                                                      /* data */target$1,
                                                      /* state : Virgin */0
                                                    ];
                                            } else {
                                              return $$this;
                                            }
                                          }), state[/* testCases */1]))))]);
          case 3 : 
              return /* Update */Block.__(0, [setCompiledCode(setPersistentState(action[0], state[/* testCases */1]))]);
          case 4 : 
              var match = action[0];
              if (typeof match === "number") {
                return /* NoUpdate */0;
              } else if (match.tag) {
                var result = match[1];
                var id = match[0];
                return /* Update */Block.__(0, [setPersistentState(state[/* setupCode */0], _updateResults(Rebase.List[/* map */2]((function ($$this) {
                                          var match = +($$this[/* data */0][/* id */0] === id);
                                          if (match !== 0) {
                                            return /* record */[
                                                    /* data */$$this[/* data */0],
                                                    /* state : Complete */Block.__(1, [result])
                                                  ];
                                          } else {
                                            return $$this;
                                          }
                                        }), state[/* testCases */1])))]);
              } else {
                var result$1 = match[1];
                var id$1 = match[0];
                return /* Update */Block.__(0, [setPersistentState(state[/* setupCode */0], Rebase.List[/* map */2]((function ($$this) {
                                      var match = +($$this[/* data */0][/* id */0] === id$1);
                                      if (match !== 0) {
                                        return /* record */[
                                                /* data */$$this[/* data */0],
                                                /* state : Running */Block.__(0, [result$1])
                                              ];
                                      } else {
                                        return $$this;
                                      }
                                    }), state[/* testCases */1]))]);
              }
              break;
          
        }
      }
    });
  return newrecord;
}

var _toArray = $$Array.of_list;

exports._toArray       = _toArray;
exports._updateResults = _updateResults;
exports.component      = component;
exports.make           = make;
/* component Not a pure module */
