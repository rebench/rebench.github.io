'use strict';

var Js = require("bs-platform/lib/js/js.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Button = require("./Button.bs.js");
var Rebase = require("@glennsl/rebase/src/Rebase.bs.js");
var Vrroom = require("vrroom/src/Vrroom.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var TypedGlamor = require("bs-typed-glamor/src/TypedGlamor.bs.js");
var ShareButtonStyles = require("./ShareButtonStyles.bs.js");

var component = ReasonReact.reducerComponent("ShareButton");

function make(url, _) {
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
              var send = param[/* send */3];
              return React.createElement("div", {
                          className: TypedGlamor.toString(ShareButtonStyles.container(param[/* state */1][/* showConfirmation */0]))
                        }, React.createElement("input", {
                              ref: Curry._1(param[/* handle */0], (function (r, param) {
                                      param[/* state */1][/* inputRef */1][0] = (r == null) ? /* None */0 : [r];
                                      return /* () */0;
                                    })),
                              readOnly: Js.true_,
                              value: url
                            }), ReasonReact.element(/* None */0, /* None */0, Button.make("Share", /* Some */["share"], /* None */0, /* None */0, /* None */0, (function () {
                                    return Curry._1(send, /* Clicked */0);
                                  }), /* array */[])), React.createElement("span", {
                              className: "tooltip"
                            }, React.createElement("span", {
                                  className: "message"
                                }, Vrroom.text("Click to copy to clipboard")), React.createElement("span", {
                                  className: "confirmation-message"
                                }, Vrroom.text("Copied"))));
            }),
          /* initialState */(function () {
              return /* record */[
                      /* showConfirmation */false,
                      /* inputRef */[/* None */0]
                    ];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (action, state) {
              if (action) {
                return /* Update */Block.__(0, [/* record */[
                            /* showConfirmation */false,
                            /* inputRef */state[/* inputRef */1]
                          ]]);
              } else {
                return /* UpdateWithSideEffects */Block.__(2, [
                          /* record */[
                            /* showConfirmation */true,
                            /* inputRef */state[/* inputRef */1]
                          ],
                          (function (param) {
                              var send = param[/* send */3];
                              Rebase.Option[/* forEach */8]((function (input) {
                                      input.select();
                                      document.execCommand("copy");
                                      return /* () */0;
                                    }), state[/* inputRef */1][0]);
                              setTimeout((function () {
                                      return Curry._1(send, /* Timeout */1);
                                    }), 2000);
                              return /* () */0;
                            })
                        ]);
              }
            }),
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

var Styles = 0;

exports.Styles = Styles;
exports.component = component;
exports.make = make;
/* component Not a pure module */
