'use strict';

var Block             = require("bs-platform/lib/js/block.js");
var Curry             = require("bs-platform/lib/js/curry.js");
var React             = require("react");
var Button            = require("./Button.js");
var Rebase            = require("@glennsl/rebase/lib/js/src/Rebase.bs.js");
var Vrroom            = require("vrroom/lib/js/src/Vrroom.bs.js");
var ReasonReact       = require("reason-react/lib/js/src/ReasonReact.js");
var TypedGlamor       = require("typed-glamor/lib/js/src/TypedGlamor.bs.js");
var ShareButtonStyles = require("./ShareButtonStyles.js");

var component = ReasonReact.reducerComponent("ShareButton");

function make(url, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function (param) {
      var send = param[/* send */4];
      return React.createElement("div", {
                  className: TypedGlamor.toString(ShareButtonStyles.container(param[/* state */2][/* showConfirmation */0]))
                }, React.createElement("input", {
                      ref: Curry._1(param[/* handle */0], (function (r, param) {
                              param[/* state */2][/* inputRef */1][0] = (r == null) ? /* None */0 : [r];
                              return /* () */0;
                            })),
                      readOnly: true,
                      value: url
                    }), ReasonReact.element(/* None */0, /* None */0, Button.make("Share", /* Some */["share"], /* None */0, /* None */0, (function () {
                            return Curry._1(send, /* Clicked */0);
                          }), /* array */[])), React.createElement("span", {
                      className: "tooltip"
                    }, React.createElement("span", {
                          className: "message"
                        }, Vrroom.Helpers[/* text */0]("Click to copy to clipboard")), React.createElement("span", {
                          className: "confirmation-message"
                        }, Vrroom.Helpers[/* text */0]("Copied"))));
    });
  newrecord[/* initialState */10] = (function () {
      return /* record */[
              /* showConfirmation : false */0,
              /* inputRef */[/* None */0]
            ];
    });
  newrecord[/* reducer */12] = (function (action, state) {
      if (action !== 0) {
        return /* Update */Block.__(0, [/* record */[
                    /* showConfirmation : false */0,
                    /* inputRef */state[/* inputRef */1]
                  ]]);
      } else {
        return /* UpdateWithSideEffects */Block.__(3, [
                  /* record */[
                    /* showConfirmation : true */1,
                    /* inputRef */state[/* inputRef */1]
                  ],
                  (function (param) {
                      var send = param[/* send */4];
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
    });
  return newrecord;
}

var Styles = 0;

exports.Styles    = Styles;
exports.component = component;
exports.make      = make;
/* component Not a pure module */
