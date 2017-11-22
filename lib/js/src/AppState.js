'use strict';

var Block       = require("bs-platform/lib/js/block.js");
var Curry       = require("bs-platform/lib/js/curry.js");
var Rebase      = require("reason-rebase/lib/js/src/rebase.js");
var Worker      = require("./ffi/Worker.js");
var Storage     = require("./Storage.js");
var Compiler    = require("./Compiler.js");
var Location    = require("./Location.js");
var TestCase    = require("./TestCase.js");
var Json_decode = require("bs-json/lib/js/src/Json_decode.js");
var Json_encode = require("bs-json/lib/js/src/Json_encode.js");

var id = Json_decode.string;

function testCase(json) {
  var match = Json_decode.pair(id, Json_decode.string, json);
  return /* record */[
          /* id */match[0],
          /* code */match[1]
        ];
}

function state(json) {
  return Json_decode.pair(Json_decode.string, (function (param) {
                return Json_decode.list(testCase, param);
              }), json);
}

var Decode = /* module */[
  /* id */id,
  /* testCase */testCase,
  /* state */state
];

function id$1(value) {
  return Curry._1(TestCase.Id[/* toString */2], value);
}

function testCase$1(value) {
  return Json_encode.pair(id$1, (function (prim) {
                return prim;
              }), /* tuple */[
              value[/* id */0],
              value[/* code */1]
            ]);
}

function state$1(value) {
  return Json_encode.pair((function (prim) {
                return prim;
              }), (function (param) {
                return Json_encode.list(testCase$1, param);
              }), value);
}

var Encode = /* module */[
  /* id */id$1,
  /* testCase */testCase$1,
  /* state */state$1
];

function _retrieve() {
  return Rebase.Option[/* map */2](state, Rebase.Option[/* map */2]((function (prim) {
                    return JSON.parse(prim);
                  }), Rebase.Option[/* or_ */13](Storage.retrieve(/* () */0), Location.retrieve(/* () */0))));
}

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
  /* error : None */0
];

function initial() {
  return Rebase.Option[/* mapOr */16]((function (param) {
                return /* record */[
                        /* setupCode */param[0],
                        /* testCases */Rebase.List[/* map */2](withState, param[1]),
                        default_002,
                        /* compiledCode */"// nothing yet",
                        /* error : None */0
                      ];
              }), $$default, _retrieve(/* () */0));
}

function reducer(action, state) {
  var tryCompile = function (state) {
    return Compiler.compile(state[/* setupCode */0], Rebase.List[/* map */2]((function ($$this) {
                      return $$this[/* data */0];
                    }), state[/* testCases */1]));
  };
  if (typeof action === "number") {
    switch (action) {
      case 0 : 
          return /* SideEffects */Block.__(2, [(function (self) {
                        var result = tryCompile(self[/* state */2]);
                        Curry._2(self[/* reduce */1], (function () {
                                return /* CompileComplete */Block.__(5, [result]);
                              }), /* () */0);
                        var ids = Rebase.List[/* map */2]((function ($$this) {
                                return $$this[/* data */0][/* id */0];
                              }), self[/* state */2][/* testCases */1]);
                        var exit = 0;
                        switch (result.tag | 0) {
                          case 0 : 
                          case 1 : 
                              exit = 1;
                              break;
                          case 2 : 
                              return /* () */0;
                          
                        }
                        if (exit === 1) {
                          return Curry._1(state[/* worker */2][0][/* postMessage */0], /* Run */[
                                      result[0],
                                      ids
                                    ]);
                        }
                        
                      })]);
      case 1 : 
          return /* Update */Block.__(0, [/* record */[
                      /* setupCode */state[/* setupCode */0],
                      /* testCases : :: */[
                        /* record */[
                          /* data : record */[
                            /* id */nextId(state),
                            /* code */"/* put stuff here */"
                          ],
                          /* state : Virgin */0
                        ],
                        state[/* testCases */1]
                      ],
                      /* worker */state[/* worker */2],
                      /* compiledCode */state[/* compiledCode */3],
                      /* error */state[/* error */4]
                    ]]);
      case 2 : 
          return /* Update */Block.__(0, [/* record */[
                      /* setupCode */"/* code goes here */",
                      default_001,
                      /* worker */state[/* worker */2],
                      /* compiledCode */state[/* compiledCode */3],
                      /* error */state[/* error */4]
                    ]]);
      case 3 : 
          return /* SideEffects */Block.__(2, [(function (self) {
                        return Curry._2(self[/* reduce */1], (function (result) {
                                      return /* CompileComplete */Block.__(5, [result]);
                                    }), tryCompile(self[/* state */2]));
                      })]);
      
    }
  } else {
    switch (action.tag | 0) {
      case 0 : 
          var data = action[0];
          return /* SideEffects */Block.__(2, [(function (self) {
                        var result = tryCompile(state);
                        Curry._2(self[/* reduce */1], (function () {
                                return /* CompileComplete */Block.__(5, [result]);
                              }), /* () */0);
                        var exit = 0;
                        switch (result.tag | 0) {
                          case 0 : 
                          case 1 : 
                              exit = 1;
                              break;
                          case 2 : 
                              return /* () */0;
                          
                        }
                        if (exit === 1) {
                          return Curry._1(state[/* worker */2][0][/* postMessage */0], /* Run */[
                                      result[0],
                                      /* :: */[
                                        data[/* id */0],
                                        /* [] */0
                                      ]
                                    ]);
                        }
                        
                      })]);
      case 1 : 
          var target = action[0];
          return /* Update */Block.__(0, [/* record */[
                      /* setupCode */state[/* setupCode */0],
                      /* testCases */Rebase.List[/* filter */10]((function ($$this) {
                              return +($$this[/* data */0][/* id */0] !== target[/* id */0]);
                            }), state[/* testCases */1]),
                      /* worker */state[/* worker */2],
                      /* compiledCode */state[/* compiledCode */3],
                      /* error */state[/* error */4]
                    ]]);
      case 2 : 
          var target$1 = action[0];
          return /* UpdateWithSideEffects */Block.__(3, [
                    /* record */[
                      /* setupCode */state[/* setupCode */0],
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
                                }), state[/* testCases */1])),
                      /* worker */state[/* worker */2],
                      /* compiledCode */state[/* compiledCode */3],
                      /* error */state[/* error */4]
                    ],
                    (function (self) {
                        return Curry._2(self[/* reduce */1], (function () {
                                      return /* Compile */3;
                                    }), /* () */0);
                      })
                  ]);
      case 3 : 
          return /* UpdateWithSideEffects */Block.__(3, [
                    /* record */[
                      /* setupCode */action[0],
                      /* testCases */state[/* testCases */1],
                      /* worker */state[/* worker */2],
                      /* compiledCode */state[/* compiledCode */3],
                      /* error */state[/* error */4]
                    ],
                    (function (self) {
                        return Curry._2(self[/* reduce */1], (function () {
                                      return /* Compile */3;
                                    }), /* () */0);
                      })
                  ]);
      case 4 : 
          var match = action[0];
          if (typeof match === "number") {
            return /* NoUpdate */0;
          } else if (match.tag) {
            var result = match[1];
            var id = match[0];
            return /* Update */Block.__(0, [/* record */[
                        /* setupCode */state[/* setupCode */0],
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
                                  }), state[/* testCases */1])),
                        /* worker */state[/* worker */2],
                        /* compiledCode */state[/* compiledCode */3],
                        /* error */state[/* error */4]
                      ]]);
          } else {
            var result$1 = match[1];
            var id$1 = match[0];
            return /* Update */Block.__(0, [/* record */[
                        /* setupCode */state[/* setupCode */0],
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
                              }), state[/* testCases */1]),
                        /* worker */state[/* worker */2],
                        /* compiledCode */state[/* compiledCode */3],
                        /* error */state[/* error */4]
                      ]]);
          }
          break;
      case 5 : 
          var result$2 = action[0];
          var tmp;
          switch (result$2.tag | 0) {
            case 0 : 
            case 1 : 
                tmp = result$2[0];
                break;
            case 2 : 
                tmp = "// ERROR";
                break;
            
          }
          return /* Update */Block.__(0, [/* record */[
                      /* setupCode */state[/* setupCode */0],
                      /* testCases */state[/* testCases */1],
                      /* worker */state[/* worker */2],
                      /* compiledCode */tmp,
                      /* error : Some */[result$2]
                    ]]);
      
    }
  }
}

function computeShareableUrl(state$2) {
  return Location.generate(state$1(/* tuple */[
                  state$2[/* setupCode */0],
                  Rebase.List[/* map */2]((function (t) {
                          return t[/* data */0];
                        }), state$2[/* testCases */1])
                ]));
}

function didUpdate(param) {
  var newSelf = param[/* newSelf */1];
  Storage.persist(state$1(/* tuple */[
            newSelf[/* state */2][/* setupCode */0],
            Rebase.List[/* map */2]((function (t) {
                    return t[/* data */0];
                  }), newSelf[/* state */2][/* testCases */1])
          ]));
  window.history.replaceState((null), "", computeShareableUrl(newSelf[/* state */2]));
  return /* () */0;
}

exports.Decode              = Decode;
exports.Encode              = Encode;
exports._retrieve           = _retrieve;
exports._updateResults      = _updateResults;
exports.nextId              = nextId;
exports.withState           = withState;
exports.$$default           = $$default;
exports.default             = $$default;
exports.__esModule          = true;
exports.initial             = initial;
exports.reducer             = reducer;
exports.computeShareableUrl = computeShareableUrl;
exports.didUpdate           = didUpdate;
/* default Not a pure module */
