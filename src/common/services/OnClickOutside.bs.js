'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Rebase = require("@glennsl/rebase/src/Rebase.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");

var component = ReasonReact.reducerComponent("OnClickOutside");

function make(onClick, children) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function (param) {
      return ReasonReact.createDomElement("div", {
                  ref: Curry._1(param[/* handle */0], (function (r, param) {
                          param[/* state */2][/* rootRef */0][0] = (r == null) ? /* None */0 : [r];
                          return /* () */0;
                        }))
                }, children);
    });
  newrecord[/* initialState */10] = (function () {
      return /* record */[/* rootRef */[/* None */0]];
    });
  newrecord[/* reducer */12] = (function (_, _$1) {
      return /* NoUpdate */0;
    });
  newrecord[/* subscriptions */13] = (function (self) {
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
                                  }), self[/* state */2][/* rootRef */0][0]);
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
    });
  return newrecord;
}

exports.component = component;
exports.make = make;
/* component Not a pure module */
