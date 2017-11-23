'use strict';

var List        = require("bs-platform/lib/js/list.js");
var Test        = require("../model/Test.js");
var Model       = require("../model/Model.js");
var Persistence = require("../common/services/Persistence.js");

function _nextId(data) {
  return Test.Id[/* next */0](List.map((function (test) {
                    return test[/* id */0];
                  }), data[/* tests */1]));
}

function $$default() {
  return /* record */[
          /* setup */"/* code goes here */",
          /* tests : :: */[
            /* record */[
              /* id */Test.Id[/* fromInt */1](2),
              /* code */"Js.String.make(42)"
            ],
            /* :: */[
              /* record */[
                /* id */Test.Id[/* fromInt */1](1),
                /* code */"string_of_int(42)"
              ],
              /* [] */0
            ]
          ]
        ];
}

function reducer(state, param) {
  if (typeof param === "number") {
    if (param) {
      return $$default(/* () */0);
    } else {
      return /* record */[
              /* setup */state[/* setup */0],
              /* tests : :: */[
                /* record */[
                  /* id */_nextId(state),
                  /* code */"/* put sutff here */"
                ],
                state[/* tests */1]
              ]
            ];
    }
  } else {
    switch (param.tag | 0) {
      case 0 : 
          var test = param[0];
          return /* record */[
                  /* setup */state[/* setup */0],
                  /* tests */List.filter((function ($$this) {
                            return +($$this[/* id */0] !== test[/* id */0]);
                          }))(state[/* tests */1])
                ];
      case 1 : 
          var test$1 = param[0];
          return /* record */[
                  /* setup */state[/* setup */0],
                  /* tests */List.map((function ($$this) {
                          var match = +($$this[/* id */0] === test$1[/* id */0]);
                          if (match !== 0) {
                            return test$1;
                          } else {
                            return $$this;
                          }
                        }), state[/* tests */1])
                ];
      case 2 : 
          return /* record */[
                  /* setup */param[0],
                  /* tests */state[/* tests */1]
                ];
      
    }
  }
}

function serialize(param) {
  return JSON.stringify(Model.Encode[/* state */2](/* tuple */[
                  param[/* setup */0],
                  param[/* tests */1]
                ]));
}

function deserialize(data) {
  var match = Model.Decode[/* state */2](JSON.parse(data));
  return /* record */[
          /* setup */match[0],
          /* tests */match[1]
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

exports._nextId      = _nextId;
exports._prefix      = _prefix;
exports._generateUrl = _generateUrl;
exports._retrieve    = _retrieve;
exports._persist     = _persist;
exports.component    = component;
exports.make         = make;
/* include Not a pure module */
