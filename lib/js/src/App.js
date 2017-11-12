'use strict';

var $$Array     = require("bs-platform/lib/js/array.js");
var Block       = require("bs-platform/lib/js/block.js");
var Curry       = require("bs-platform/lib/js/curry.js");
var Utils       = require("./Utils.js");
var React       = require("react");
var Rebase      = require("reason-rebase/lib/js/src/rebase.js");
var Worker      = require("./ffi/Worker.js");
var Toolbar     = require("./Toolbar.js");
var Compiler    = require("./Compiler.js");
var TestCase    = require("./TestCase.js");
var ReasonReact = require("reason-react/lib/js/src/reasonReact.js");

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
  var makeTestCase = function () {
    return /* record */[
            /* data */TestCase.make(Curry._1(newId, /* () */0)),
            /* state : Virgin */0
          ];
  };
  var newrecord = component.slice();
  newrecord[/* didMount */4] = (function (param) {
      return /* Update */Block.__(0, [/* record */[
                  /* testCases */param[/* state */4][/* testCases */0],
                  /* worker */[Worker.make(Curry._1(param[/* reduce */3], (function (message) {
                                return /* WorkerMessage */Block.__(3, [message]);
                              })), (function (prim) {
                            console.log(prim);
                            return /* () */0;
                          }))]
                ]]);
    });
  newrecord[/* render */9] = (function (param) {
      var reduce = param[/* reduce */3];
      return React.createElement("div", undefined, ReasonReact.element(/* None */0, /* None */0, Toolbar.make(Curry._1(reduce, (function (param) {
                                if (param >= 3254785) {
                                  return /* Add */1;
                                } else {
                                  return /* RunAll */0;
                                }
                              })), /* array */[])), $$Array.of_list(Rebase.List[/* reverse */14](Rebase.List[/* map */2]((function ($$this) {
                                return ReasonReact.element(/* Some */[$$this[/* data */0][/* id */0]], /* None */0, TestCase.View[/* make */2]($$this[/* data */0], $$this[/* state */1], Curry._1(reduce, (function (data) {
                                                      return /* Change */Block.__(2, [data]);
                                                    })), Curry._1(reduce, (function () {
                                                      return /* RunSingle */Block.__(0, [$$this[/* data */0]]);
                                                    })), Curry._1(reduce, (function () {
                                                      return /* Remove */Block.__(1, [$$this[/* data */0]]);
                                                    })), /* array */[]));
                              }), param[/* state */4][/* testCases */0]))));
    });
  newrecord[/* initialState */10] = (function () {
      return /* record */[
              /* testCases : :: */[
                makeTestCase(/* () */0),
                /* :: */[
                  makeTestCase(/* () */0),
                  /* [] */0
                ]
              ],
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
        if (action) {
          return /* Update */Block.__(0, [/* record */[
                      /* testCases : :: */[
                        makeTestCase(/* () */0),
                        state[/* testCases */0]
                      ],
                      /* worker */state[/* worker */1]
                    ]]);
        } else {
          var code = Compiler.compile(Rebase.List[/* map */2]((function ($$this) {
                      return $$this[/* data */0];
                    }), state[/* testCases */0]));
          var ids = Rebase.List[/* map */2]((function ($$this) {
                  return $$this[/* data */0][/* id */0];
                }), state[/* testCases */0]);
          Curry._1(state[/* worker */1][0][/* postMessage */0], /* Run */[
                code,
                ids
              ]);
          return /* NoUpdate */0;
        }
      } else {
        switch (action.tag | 0) {
          case 0 : 
              var data = action[0];
              var code$1 = Compiler.compile(/* :: */[
                    data,
                    /* [] */0
                  ]);
              Curry._1(state[/* worker */1][0][/* postMessage */0], /* Run */[
                    code$1,
                    /* :: */[
                      data[/* id */0],
                      /* [] */0
                    ]
                  ]);
              return /* NoUpdate */0;
          case 1 : 
              var target = action[0];
              return /* Update */Block.__(0, [/* record */[
                          /* testCases */Rebase.List[/* filter */10]((function ($$this) {
                                  return +($$this[/* data */0][/* id */0] !== target[/* id */0]);
                                }), state[/* testCases */0]),
                          /* worker */state[/* worker */1]
                        ]]);
          case 2 : 
              var target$1 = action[0];
              return /* Update */Block.__(0, [/* record */[
                          /* testCases */_updateResults(Rebase.List[/* map */2]((function ($$this) {
                                      var match = +($$this[/* data */0][/* id */0] === target$1[/* id */0]);
                                      if (match !== 0) {
                                        return /* record */[
                                                /* data */target$1,
                                                /* state : Virgin */0
                                              ];
                                      } else {
                                        return $$this;
                                      }
                                    }), state[/* testCases */0])),
                          /* worker */state[/* worker */1]
                        ]]);
          case 3 : 
              var match = action[0];
              if (typeof match === "number") {
                return /* NoUpdate */0;
              } else if (match.tag) {
                var result = match[1];
                var id = match[0];
                return /* Update */Block.__(0, [/* record */[
                            /* testCases */_updateResults(Rebase.List[/* map */2]((function ($$this) {
                                        var match = +($$this[/* data */0][/* id */0] === id);
                                        if (match !== 0) {
                                          return /* record */[
                                                  /* data */$$this[/* data */0],
                                                  /* state : Complete */Block.__(1, [result])
                                                ];
                                        } else {
                                          return $$this;
                                        }
                                      }), state[/* testCases */0])),
                            /* worker */state[/* worker */1]
                          ]]);
              } else {
                var result$1 = match[1];
                var id$1 = match[0];
                return /* Update */Block.__(0, [/* record */[
                            /* testCases */Rebase.List[/* map */2]((function ($$this) {
                                    var match = +($$this[/* data */0][/* id */0] === id$1);
                                    if (match !== 0) {
                                      return /* record */[
                                              /* data */$$this[/* data */0],
                                              /* state : Running */Block.__(0, [result$1])
                                            ];
                                    } else {
                                      return $$this;
                                    }
                                  }), state[/* testCases */0]),
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

exports._toArray       = _toArray;
exports._updateResults = _updateResults;
exports.component      = component;
exports.make           = make;
/* component Not a pure module */
