'use strict';

var Block       = require("bs-platform/lib/js/block.js");
var Curry       = require("bs-platform/lib/js/curry.js");
var Rebase      = require("reason-rebase/lib/js/src/rebase.js");
var ReasonReact = require("reason-react/lib/js/src/ReasonReact.js");

function Make(Config) {
  var component = ReasonReact.reducerComponentWithRetainedProps("Debounce");
  var make = function (input, wait, renderChildren) {
    var newrecord = component.slice();
    newrecord[/* didUpdate */5] = (function (param) {
        var newSelf = param[/* newSelf */1];
        if (newSelf[/* retainedProps */3][/* input */0] !== param[/* oldSelf */0][/* retainedProps */3][/* input */0]) {
          var match = newSelf[/* state */2];
          var timeout = match[/* timeout */1];
          Rebase.Option[/* forEach */8]((function (id) {
                  clearTimeout(id);
                  timeout[0] = /* None */0;
                  return /* () */0;
                }), timeout[0]);
          timeout[0] = /* Some */[setTimeout((function () {
                    timeout[0] = /* None */0;
                    return Curry._2(newSelf[/* reduce */1], (function () {
                                  return Curry._1(Config[/* compute */0], input);
                                }), /* () */0);
                  }), wait)];
          return /* () */0;
        } else {
          return 0;
        }
      });
    newrecord[/* render */9] = (function (param) {
        return Curry._1(renderChildren, param[/* state */2][/* output */0]);
      });
    newrecord[/* initialState */10] = (function () {
        return /* record */[
                /* output */Curry._1(Config[/* compute */0], input),
                /* timeout */[/* None */0]
              ];
      });
    newrecord[/* retainedProps */11] = /* record */[/* input */input];
    newrecord[/* reducer */12] = (function (output, state) {
        return /* Update */Block.__(0, [/* record */[
                    /* output */output,
                    /* timeout */state[/* timeout */1]
                  ]]);
      });
    return newrecord;
  };
  return /* module */[
          /* component */component,
          /* make */make
        ];
}

exports.Make = Make;
/* ReasonReact Not a pure module */
