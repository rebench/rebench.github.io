'use strict';

var Curry       = require("bs-platform/lib/js/curry.js");
var React       = require("react");
var Rebase      = require("@glennsl/rebase/lib/js/src/Rebase.bs.js");
var ReasonReact = require("reason-react/lib/js/src/ReasonReact.js");

var component = ReasonReact.reducerComponent("OnClickOutside");

function make(onClick, children) {
  var newrecord = component.slice();
  newrecord[/* didMount */4] = (function (self) {
      var listener = function ($$event) {
        return Rebase.Option[/* forEach */8]((function (rootEl) {
                      if ($$event.target.contains(rootEl)) {
                        return Curry._1(onClick, /* () */0);
                      } else {
                        return 0;
                      }
                    }), self[/* state */2][/* rootRef */0][0]);
      };
      self[/* state */2][/* listener */1][0] = /* Some */[listener];
      document.addEventListener("mousedown", listener);
      return /* NoUpdate */0;
    });
  newrecord[/* willUnmount */6] = (function (self) {
      return Rebase.Option[/* forEach */8]((function (param) {
                    document.addEventListener("mousedown", param);
                    return /* () */0;
                  }), self[/* state */2][/* listener */1][0]);
    });
  newrecord[/* render */9] = (function (param) {
      return React.createElement("div", {
                  ref: Curry._1(param[/* handle */0], (function (r, param) {
                          param[/* state */2][/* rootRef */0][0] = (r == null) ? /* None */0 : [r];
                          return /* () */0;
                        }))
                }, children);
    });
  newrecord[/* initialState */10] = (function () {
      return /* record */[
              /* rootRef */[/* None */0],
              /* listener */[/* None */0]
            ];
    });
  newrecord[/* reducer */12] = (function (_, _$1) {
      return /* NoUpdate */0;
    });
  return newrecord;
}

exports.component = component;
exports.make      = make;
/* component Not a pure module */
