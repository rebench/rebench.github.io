'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Rebase = require("@glennsl/rebase/src/Rebase.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");

var component = ReasonReact.reducerComponent("OnClickOutside");

function make(onClick, children) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */component[/* didMount */4],
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function (param) {
              return ReasonReact.createDomElement("div", {
                          ref: Curry._1(param[/* handle */0], (function (r, param) {
                                  param[/* state */1][/* rootRef */0][0] = (r == null) ? /* None */0 : [r];
                                  return /* () */0;
                                }))
                        }, children);
            }),
          /* initialState */(function () {
              return /* record */[/* rootRef */[/* None */0]];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (_, _$1) {
              return /* NoUpdate */0;
            }),
          /* subscriptions */(function (self) {
              return /* :: */[
                      /* Sub */[
                        (function () {
                            var listener = function ($$event) {
                              return Rebase.Option[/* forEach */8]((function (rootEl) {
                                            if ($$event.target.contains(rootEl)) {
                                              return Curry._1(onClick, /* () */0);
                                            } else {
                                              return 0;
                                            }
                                          }), self[/* state */1][/* rootRef */0][0]);
                            };
                            document.addEventListener("mousedown", listener);
                            return listener;
                          }),
                        (function (param) {
                            document.removeEventListener("mousedown", param);
                            return /* () */0;
                          })
                      ],
                      /* [] */0
                    ];
            }),
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

exports.component = component;
exports.make = make;
/* component Not a pure module */
