'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Rebase = require("@glennsl/rebase/src/Rebase.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");

function Make(Config) {
  var component = ReasonReact.reducerComponentWithRetainedProps("Debounce");
  var make = function (input, wait, renderChildren) {
    return /* record */[
            /* debugName */component[/* debugName */0],
            /* reactClassInternal */component[/* reactClassInternal */1],
            /* handedOffState */component[/* handedOffState */2],
            /* willReceiveProps */component[/* willReceiveProps */3],
            /* didMount */component[/* didMount */4],
            /* didUpdate */(function (param) {
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
                            return Curry._1(newSelf[/* send */4], Curry._1(Config[/* compute */0], input));
                          }), wait)];
                  return /* () */0;
                } else {
                  return 0;
                }
              }),
            /* willUnmount */component[/* willUnmount */6],
            /* willUpdate */component[/* willUpdate */7],
            /* shouldUpdate */component[/* shouldUpdate */8],
            /* render */(function (param) {
                return Curry._1(renderChildren, param[/* state */2][/* output */0]);
              }),
            /* initialState */(function () {
                return /* record */[
                        /* output */Curry._1(Config[/* compute */0], input),
                        /* timeout */[/* None */0]
                      ];
              }),
            /* retainedProps : record */[/* input */input],
            /* reducer */(function (output, state) {
                return /* Update */Block.__(0, [/* record */[
                            /* output */output,
                            /* timeout */state[/* timeout */1]
                          ]]);
              }),
            /* subscriptions */component[/* subscriptions */13],
            /* jsElementWrapped */component[/* jsElementWrapped */14]
          ];
  };
  return /* module */[
          /* component */component,
          /* make */make
        ];
}

exports.Make = Make;
/* ReasonReact Not a pure module */
