'use strict';

var Json        = require("bs-json/lib/js/src/Json.js");
var Test        = require("../model/Test.js");
var Block       = require("bs-platform/lib/js/block.js");
var Curry       = require("bs-platform/lib/js/curry.js");
var Model       = require("../model/Model.js");
var Rebase      = require("@glennsl/rebase/lib/js/src/Rebase.bs.js");
var Persistence = require("../common/services/Persistence.js");

function _nextId(data) {
  return Curry._1(Test.Id[/* next */0], Rebase.List[/* map */0]((function (test) {
                    return test[/* data */0][/* id */0];
                  }), data[/* tests */1]));
}

function _recalculateScores(tests) {
  var fastest = Rebase.List[/* reduce */3]((function (prim, prim$1) {
          return Math.max(prim, prim$1);
        }), 0, Rebase.List[/* map */0](Rebase.Option[/* getOrRaise */17], Rebase.List[/* filter */10](Rebase.Option[/* isSome */13], Rebase.List[/* map */0]((function (param) {
                      var match = param[/* state */1];
                      if (typeof match === "number" || match.tag !== 2) {
                        return /* None */0;
                      } else {
                        return /* Some */[match[0][/* hz */0]];
                      }
                    }), tests))));
  return Rebase.List[/* map */0]((function (pod) {
                var match = pod[/* state */1];
                if (typeof match === "number") {
                  return pod;
                } else if (match.tag === 2) {
                  var result = match[0];
                  return /* record */[
                          /* data */pod[/* data */0],
                          /* state : Complete */Block.__(2, [
                              result,
                              /* Some */[(result[/* hz */0] - fastest) / fastest * 100]
                            ])
                        ];
                } else {
                  return pod;
                }
              }), tests);
}

function $$default() {
  return /* record */[
          /* setup */"/* shared code goes here */",
          /* tests : :: */[
            /* record */[
              /* data : record */[
                /* id */Curry._1(Test.Id[/* fromInt */1], 2),
                /* language : RE */18355,
                /* code */"Js.String.make(42)"
              ],
              /* state : Untested */0
            ],
            /* :: */[
              /* record */[
                /* data : record */[
                  /* id */Curry._1(Test.Id[/* fromInt */1], 1),
                  /* language : RE */18355,
                  /* code */"string_of_int(42)"
                ],
                /* state : Untested */0
              ],
              /* [] */0
            ]
          ]
        ];
}

function reducer(state, param) {
  if (typeof param === "number") {
    if (param) {
      return /* `UndoableUpdate */[
              217417351,
              $$default(/* () */0)
            ];
    } else {
      return /* `Update */[
              999946793,
              /* record */[
                /* setup */state[/* setup */0],
                /* tests : :: */[
                  /* record */[
                    /* data : record */[
                      /* id */_nextId(state),
                      /* language : RE */18355,
                      /* code */"/* put stuff here */"
                    ],
                    /* state : Untested */0
                  ],
                  state[/* tests */1]
                ]
              ]
            ];
    }
  } else {
    switch (param.tag | 0) {
      case 0 : 
          var id = param[0];
          return /* `UndoableUpdate */[
                  217417351,
                  /* record */[
                    /* setup */state[/* setup */0],
                    /* tests */_recalculateScores(Rebase.List[/* filter */10]((function ($$this) {
                                return +($$this[/* data */0][/* id */0] !== id);
                              }), state[/* tests */1]))
                  ]
                ];
      case 1 : 
          var data = param[0];
          return /* `Update */[
                  999946793,
                  /* record */[
                    /* setup */state[/* setup */0],
                    /* tests */_recalculateScores(Rebase.List[/* map */0]((function ($$this) {
                                var match = +($$this[/* data */0][/* id */0] === data[/* id */0]);
                                if (match !== 0) {
                                  return /* record */[
                                          /* data */data,
                                          /* state : Untested */0
                                        ];
                                } else {
                                  return $$this;
                                }
                              }), state[/* tests */1]))
                  ]
                ];
      case 2 : 
          var testState = param[1];
          var id$1 = param[0];
          return /* `Update */[
                  999946793,
                  /* record */[
                    /* setup */state[/* setup */0],
                    /* tests */_recalculateScores(Rebase.List[/* map */0]((function ($$this) {
                                var match = +($$this[/* data */0][/* id */0] === id$1);
                                if (match !== 0) {
                                  return /* record */[
                                          /* data */$$this[/* data */0],
                                          /* state */testState
                                        ];
                                } else {
                                  return $$this;
                                }
                              }), state[/* tests */1]))
                  ]
                ];
      case 3 : 
          return /* `Update */[
                  999946793,
                  /* record */[
                    /* setup */param[0],
                    /* tests */Rebase.List[/* map */0]((function ($$this) {
                            return /* record */[
                                    /* data */$$this[/* data */0],
                                    /* state : Untested */0
                                  ];
                          }), state[/* tests */1])
                  ]
                ];
      
    }
  }
}

function serialize(param) {
  return Json.stringify(Model.Encode[/* state */3](/* tuple */[
                  param[/* setup */0],
                  Rebase.List[/* map */0]((function (pod) {
                          return pod[/* data */0];
                        }), param[/* tests */1])
                ]));
}

function deserialize(data) {
  var match = Model.Decode[/* state */3](Json.parseOrRaise(data));
  return /* record */[
          /* setup */match[0],
          /* tests */Rebase.List[/* map */0]((function (data) {
                  return /* record */[
                          /* data */data,
                          /* state : Untested */0
                        ];
                }), match[1])
        ];
}

var include = Persistence.Make(/* module */[
      /* id */"rebench-data",
      /* default */$$default,
      /* reducer */reducer,
      /* serialize */serialize,
      /* deserialize */deserialize
    ]);

var _prefix = include[0];

var _generateUrl = include[1];

var _retrieve = include[2];

var _persist = include[3];

var component = include[4];

var make = include[5];

exports._nextId            = _nextId;
exports._recalculateScores = _recalculateScores;
exports._prefix            = _prefix;
exports._generateUrl       = _generateUrl;
exports._retrieve          = _retrieve;
exports._persist           = _persist;
exports.component          = component;
exports.make               = make;
/* include Not a pure module */
