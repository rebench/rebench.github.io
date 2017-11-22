'use strict';

var $$Array     = require("bs-platform/lib/js/array.js");
var Block       = require("bs-platform/lib/js/block.js");
var Curry       = require("bs-platform/lib/js/curry.js");
var React       = require("react");
var Rebase      = require("reason-rebase/lib/js/src/rebase.js");
var Worker      = require("./ffi/Worker.js");
var JSBlock     = require("./JSBlock.js");
var Message     = require("./Message.js");
var Toolbar     = require("./Toolbar.js");
var AppState    = require("./AppState.js");
var TestCase    = require("./TestCase.js");
var SetupBlock  = require("./SetupBlock.js");
var ReasonReact = require("reason-react/lib/js/src/ReasonReact.js");

var component = ReasonReact.reducerComponent("App");

function make() {
  var newrecord = component.slice();
  newrecord[/* didMount */4] = (function (param) {
      var state = param[/* state */2];
      return /* Update */Block.__(0, [/* record */[
                  /* setupCode */state[/* setupCode */0],
                  /* testCases */state[/* testCases */1],
                  /* worker */[Worker.make(Curry._1(param[/* reduce */1], (function (message) {
                                return /* WorkerMessage */Block.__(4, [message]);
                              })), (function (prim) {
                            console.log(prim);
                            return /* () */0;
                          }))],
                  /* compiledCode */state[/* compiledCode */3],
                  /* error */state[/* error */4]
                ]]);
    });
  newrecord[/* didUpdate */5] = AppState.didUpdate;
  newrecord[/* render */9] = (function (param) {
      var state = param[/* state */2];
      var reduce = param[/* reduce */1];
      var match = state[/* error */4];
      var tmp;
      if (match) {
        var match$1 = match[0];
        switch (match$1.tag | 0) {
          case 0 : 
              tmp = null;
              break;
          case 1 : 
              tmp = ReasonReact.element(/* None */0, /* None */0, Message.make(/* Warning */-685964740, match$1[1], /* array */[]));
              break;
          case 2 : 
              tmp = ReasonReact.element(/* None */0, /* None */0, Message.make(/* Error */106380200, match$1[0], /* array */[]));
              break;
          
        }
      } else {
        tmp = null;
      }
      return React.createElement("div", undefined, ReasonReact.element(/* None */0, /* None */0, Toolbar.make(Curry._1(reduce, (function (param) {
                                if (param !== -267608394) {
                                  if (param >= 3254785) {
                                    return /* Add */1;
                                  } else {
                                    return /* Clear */2;
                                  }
                                } else {
                                  return /* RunAll */0;
                                }
                              })), AppState.computeShareableUrl(state), /* array */[])), tmp, ReasonReact.element(/* None */0, /* None */0, SetupBlock.make(state[/* setupCode */0], Curry._1(reduce, (function (code) {
                                return /* ChangeSetup */Block.__(3, [code]);
                              })), /* array */[])), $$Array.of_list(Rebase.List[/* reverse */14](Rebase.List[/* map */2]((function ($$this) {
                                return ReasonReact.element(/* Some */[Curry._1(TestCase.Id[/* toString */2], $$this[/* data */0][/* id */0])], /* None */0, TestCase.View[/* make */4]($$this[/* data */0], $$this[/* state */1], Curry._1(reduce, (function (data) {
                                                      return /* Change */Block.__(2, [data]);
                                                    })), Curry._1(reduce, (function () {
                                                      return /* RunSingle */Block.__(0, [$$this[/* data */0]]);
                                                    })), Curry._1(reduce, (function () {
                                                      return /* Remove */Block.__(1, [$$this[/* data */0]]);
                                                    })), /* array */[]));
                              }), state[/* testCases */1]))), ReasonReact.element(/* None */0, /* None */0, JSBlock.make(state[/* compiledCode */3], /* array */[])));
    });
  newrecord[/* initialState */10] = AppState.initial;
  newrecord[/* reducer */12] = AppState.reducer;
  return newrecord;
}

var _toArray = $$Array.of_list;

exports._toArray  = _toArray;
exports.component = component;
exports.make      = make;
/* component Not a pure module */
