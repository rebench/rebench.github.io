'use strict';

var Icon              = require("./Icon.js");
var Block             = require("bs-platform/lib/js/block.js");
var Curry             = require("bs-platform/lib/js/curry.js");
var React             = require("react");
var Rebase            = require("reason-rebase/lib/js/src/rebase.js");
var Helpers           = require("../utils/Helpers.js");
var ReasonReact       = require("reason-react/lib/js/src/ReasonReact.js");
var ShareButtonStyles = require("./ShareButtonStyles.js");

var component = ReasonReact.reducerComponent("ShareButton");

function make(url, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function (param) {
      var match = param[/* state */2][/* showConfirmation */0];
      return React.createElement("div", {
                  className: ShareButtonStyles.root + (
                    match !== 0 ? " s-show-confirmation" : ""
                  )
                }, React.createElement("input", {
                      ref: Curry._1(param[/* handle */0], (function (r, param) {
                              param[/* state */2][/* inputRef */1][0] = (r == null) ? /* None */0 : [r];
                              return /* () */0;
                            })),
                      readOnly: true,
                      value: url
                    }), React.createElement("button", {
                      className: ShareButtonStyles.button,
                      onClick: Curry._1(param[/* reduce */1], (function () {
                              return /* Clicked */0;
                            }))
                    }, ReasonReact.element(/* None */0, /* None */0, Icon.make("share", /* array */[])), Helpers.text("Share")), React.createElement("span", {
                      className: "tooltip"
                    }, React.createElement("span", {
                          className: "arrow"
                        }), React.createElement("span", {
                          className: "message"
                        }, Helpers.text("Click to copy to clipboard")), React.createElement("span", {
                          className: "confirmation-message"
                        }, Helpers.text("Copied"))));
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
                  (function (self) {
                      Rebase.Option[/* forEach */8]((function (input) {
                              input.select();
                              document.execCommand("copy");
                              return /* () */0;
                            }), state[/* inputRef */1][0]);
                      setTimeout(Curry._1(self[/* reduce */1], (function () {
                                  return /* Timeout */1;
                                })), 2000);
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