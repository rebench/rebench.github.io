'use strict';

var BS          = require("./ffi/BS.js");
var List        = require("bs-platform/lib/js/list.js");
var $$Array     = require("bs-platform/lib/js/array.js");
var Block       = require("bs-platform/lib/js/block.js");
var Curry       = require("bs-platform/lib/js/curry.js");
var Utils       = require("./Utils.js");
var React       = require("react");
var Worker      = require("./ffi/Worker.js");
var Reason      = require("reason");
var Toolbar     = require("./Toolbar.js");
var TestCase    = require("./TestCase.js");
var Pervasives  = require("bs-platform/lib/js/pervasives.js");
var ReasonReact = require("reason-react/lib/js/src/reasonReact.js");

function testCaseTemplate(id, code) {
  return "let " + (String(id) + (" = () => {\n  " + (String(code) + ("\n};\n\n" + (String(id) + "();\n")))));
}

var component = ReasonReact.reducerComponent("App");

function make() {
  var newId = Utils.makeCounter(1);
  var makeTestCase = function () {
    return /* record */[
            /* data */TestCase.make(Curry._1(newId, /* () */0)),
            /* result : None */0
          ];
  };
  var newrecord = component.slice();
  newrecord[/* didMount */4] = (function (param) {
      return /* Update */Block.__(0, [/* record */[
                  /* testCases */param[/* state */4][/* testCases */0],
                  /* worker */[Worker.make(Curry._1(param[/* reduce */3], (function (message) {
                                var match = message.data.type;
                                switch (match) {
                                  case "caseCycle" : 
                                      var data = message.data.contents;
                                      return /* CaseCycle */Block.__(2, [
                                                data.id,
                                                /* record */[
                                                  /* hz */data.hz,
                                                  /* rme */data.rme,
                                                  /* sampleCount */data.sampleCount
                                                ]
                                              ]);
                                  case "complete" : 
                                      return /* Nada */2;
                                  case "suiteCycle" : 
                                      var data$1 = message.data.contents;
                                      return /* SuiteCycle */Block.__(3, [
                                                data$1.id,
                                                /* record */[
                                                  /* hz */data$1.hz,
                                                  /* rme */data$1.rme,
                                                  /* sampleCount */data$1.sampleCount
                                                ]
                                              ]);
                                  default:
                                    return Pervasives.failwith("unknown worker message");
                                }
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
                              })), /* array */[])), $$Array.of_list(List.rev(List.map((function ($$this) {
                                return ReasonReact.element(/* Some */[$$this[/* data */0][/* id */0]], /* None */0, TestCase.View[/* make */2]($$this[/* data */0], $$this[/* result */1], Curry._1(reduce, (function () {
                                                      return /* Replace */Block.__(1, [$$this[/* data */0]]);
                                                    })), Curry._1(reduce, (function () {
                                                      return /* Remove */Block.__(0, [$$this[/* data */0]]);
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
        switch (action) {
          case 0 : 
              var code = List.fold_left((function (acc, $$this) {
                      return acc + "\n" + $$this.js_code;
                    }), "", List.map((function ($$this) {
                          return BS.compile(Reason.printML(Reason.parseRE(testCaseTemplate($$this[/* data */0][/* id */0], $$this[/* data */0][/* code */1]))));
                        }), state[/* testCases */0]));
              var testCases = $$Array.of_list(List.map((function ($$this) {
                          return $$this[/* data */0][/* id */0];
                        }), state[/* testCases */0]));
              Curry._1(state[/* worker */1][0][/* postMessage */0], {
                    code: code,
                    testCases: testCases
                  });
              return /* NoUpdate */0;
          case 1 : 
              return /* Update */Block.__(0, [/* record */[
                          /* testCases : :: */[
                            makeTestCase(/* () */0),
                            state[/* testCases */0]
                          ],
                          /* worker */state[/* worker */1]
                        ]]);
          case 2 : 
              return /* NoUpdate */0;
          
        }
      } else {
        switch (action.tag | 0) {
          case 0 : 
              var target = action[0];
              return /* Update */Block.__(0, [/* record */[
                          /* testCases */List.filter((function ($$this) {
                                    return +($$this[/* data */0][/* id */0] !== target[/* id */0]);
                                  }))(state[/* testCases */0]),
                          /* worker */state[/* worker */1]
                        ]]);
          case 1 : 
              var target$1 = action[0];
              return /* Update */Block.__(0, [/* record */[
                          /* testCases */List.map((function ($$this) {
                                  var match = +($$this[/* data */0][/* id */0] === target$1[/* id */0]);
                                  if (match !== 0) {
                                    return /* record */[
                                            /* data */target$1,
                                            /* result : None */0
                                          ];
                                  } else {
                                    return $$this;
                                  }
                                }), state[/* testCases */0]),
                          /* worker */state[/* worker */1]
                        ]]);
          case 2 : 
              var result = action[1];
              var id = action[0];
              return /* Update */Block.__(0, [/* record */[
                          /* testCases */List.map((function ($$this) {
                                  var match = +($$this[/* data */0][/* id */0] === id);
                                  if (match !== 0) {
                                    return /* record */[
                                            /* data */$$this[/* data */0],
                                            /* result : Some */[result]
                                          ];
                                  } else {
                                    return $$this;
                                  }
                                }), state[/* testCases */0]),
                          /* worker */state[/* worker */1]
                        ]]);
          case 3 : 
              return /* NoUpdate */0;
          
        }
      }
    });
  return newrecord;
}

exports.testCaseTemplate = testCaseTemplate;
exports.component        = component;
exports.make             = make;
/* component Not a pure module */
