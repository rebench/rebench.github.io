'use strict';

var Block    = require("bs-platform/lib/js/block.js");
var Curry    = require("bs-platform/lib/js/curry.js");
var Rebase   = require("reason-rebase/lib/js/src/rebase.js");
var Worker   = require("./ffi/Worker.js");
var Storage  = require("./Storage.js");
var Compiler = require("./Compiler.js");
var TestCase = require("./TestCase.js");

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
                                /* relativeScore : Some */[(result$1[/* hz */0] - fastest) / fastest * 100]
                              ]])
                        ];
                } else {
                  return $$this;
                }
              }), testCases);
}

function nextId(state) {
  return TestCase.Id[/* next */0](Rebase.List[/* map */2]((function ($$this) {
                    return $$this[/* data */0][/* id */0];
                  }), state[/* testCases */1]));
}

function withState(data) {
  return /* record */[
          /* data */data,
          /* state : Virgin */0
        ];
}

var default_001 = /* testCases : :: */[
  /* record */[
    /* data : record */[
      /* id */TestCase.Id[/* fromInt */1](2),
      /* code */"Js.String.make(42)"
    ],
    /* state : Virgin */0
  ],
  /* :: */[
    /* record */[
      /* data : record */[
        /* id */TestCase.Id[/* fromInt */1](1),
        /* code */"string_of_int(42)"
      ],
      /* state : Virgin */0
    ],
    /* [] */0
  ]
];

var default_002 = /* worker */[Worker.make((function (prim) {
          console.log(prim);
          return /* () */0;
        }), (function (prim) {
          console.log(prim);
          return /* () */0;
        }))];

var $$default = /* record */[
  /* setupCode */"/* code goes here */",
  default_001,
  default_002,
  /* compiledCode */"// nothing yet",
  /* error : Nothing */0
];

function initial() {
  return Rebase.Option[/* mapOr */16]((function (param) {
                return /* record */[
                        /* setupCode */param[0],
                        /* testCases */Rebase.List[/* map */2](withState, param[1]),
                        default_002,
                        /* compiledCode */"// nothing yet",
                        /* error : Nothing */0
                      ];
              }), $$default, Storage.retrieve(/* () */0));
}

function reducer(action, state) {
  var setPersistentState = function (setupCode, testCases) {
    Storage.persist(setupCode, Rebase.List[/* map */2]((function (t) {
                return t[/* data */0];
              }), testCases));
    return /* record */[
            /* setupCode */setupCode,
            /* testCases */testCases,
            /* worker */state[/* worker */2],
            /* compiledCode */state[/* compiledCode */3],
            /* error */state[/* error */4]
          ];
  };
  var tryCompile = function (state) {
    var param = Compiler.compile(state[/* setupCode */0], Rebase.List[/* map */2]((function ($$this) {
                return $$this[/* data */0];
              }), state[/* testCases */1]));
    if (param.tag) {
      var err = param[0];
      return /* record */[
              /* setupCode */state[/* setupCode */0],
              /* testCases */state[/* testCases */1],
              /* worker */state[/* worker */2],
              /* compiledCode */"// ERROR: " + err,
              /* error : Error */Block.__(0, [err])
            ];
    } else {
      var match = param[0];
      return /* record */[
              /* setupCode */state[/* setupCode */0],
              /* testCases */state[/* testCases */1],
              /* worker */state[/* worker */2],
              /* compiledCode */match[0],
              /* error */Rebase.Option[/* mapOr */16]((function (w) {
                      return /* Warning */Block.__(1, [w]);
                    }), /* Nothing */0, match[1])
            ];
    }
  };
  if (typeof action === "number") {
    switch (action) {
      case 0 : 
          var state$1 = tryCompile(state);
          var ids = Rebase.List[/* map */2]((function ($$this) {
                  return $$this[/* data */0][/* id */0];
                }), state$1[/* testCases */1]);
          Curry._1(state$1[/* worker */2][0][/* postMessage */0], /* Run */[
                state$1[/* compiledCode */3],
                ids
              ]);
          return /* Update */Block.__(0, [state$1]);
      case 1 : 
          return /* Update */Block.__(0, [setPersistentState(state[/* setupCode */0], /* :: */[
                          /* record */[
                            /* data : record */[
                              /* id */nextId(state),
                              /* code */"/* put stuff here */"
                            ],
                            /* state : Virgin */0
                          ],
                          state[/* testCases */1]
                        ])]);
      case 2 : 
          return /* Update */Block.__(0, [setPersistentState("/* code goes here */", default_001)]);
      
    }
  } else {
    switch (action.tag | 0) {
      case 0 : 
          var state$2 = tryCompile(state);
          Curry._1(state$2[/* worker */2][0][/* postMessage */0], /* Run */[
                state$2[/* compiledCode */3],
                /* :: */[
                  action[0][/* id */0],
                  /* [] */0
                ]
              ]);
          return /* Update */Block.__(0, [state$2]);
      case 1 : 
          var target = action[0];
          return /* Update */Block.__(0, [setPersistentState(state[/* setupCode */0], Rebase.List[/* filter */10]((function ($$this) {
                                return +($$this[/* data */0][/* id */0] !== target[/* id */0]);
                              }), state[/* testCases */1]))]);
      case 2 : 
          var target$1 = action[0];
          return /* Update */Block.__(0, [tryCompile(setPersistentState(state[/* setupCode */0], _updateResults(Rebase.List[/* map */2]((function ($$this) {
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
          return /* Update */Block.__(0, [tryCompile(setPersistentState(action[0], state[/* testCases */1]))]);
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
}

exports._updateResults = _updateResults;
exports.nextId         = nextId;
exports.withState      = withState;
exports.$$default      = $$default;
exports.default        = $$default;
exports.__esModule     = true;
exports.initial        = initial;
exports.reducer        = reducer;
/* default Not a pure module */
