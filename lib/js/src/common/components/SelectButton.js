'use strict';

var Block              = require("bs-platform/lib/js/block.js");
var Curry              = require("bs-platform/lib/js/curry.js");
var React              = require("react");
var Rebase             = require("reason-rebase/lib/js/src/rebase.js");
var Helpers            = require("../utils/Helpers.js");
var ReasonReact        = require("reason-react/lib/js/src/ReasonReact.js");
var OnClickOutside     = require("../services/OnClickOutside.js");
var SelectButtonStyles = require("./SelectButtonStyles.js");

function Make() {
  var component = ReasonReact.reducerComponent("SelectButton");
  var make = function (items, selected, $staropt$star, $staropt$star$1, $staropt$star$2, onSelect, _) {
    var className = $staropt$star ? $staropt$star[0] : "";
    var renderButtonLabel = $staropt$star$1 ? $staropt$star$1[0] : (function (item) {
          return Helpers.text(item[/* label */0]);
        });
    var renderItem = $staropt$star$2 ? $staropt$star$2[0] : (function (item) {
          return Helpers.text(item[/* label */0]);
        });
    var newrecord = component.slice();
    newrecord[/* render */9] = (function (param) {
        var reduce = param[/* reduce */1];
        var match = param[/* state */2][/* isOpen */0];
        return React.createElement("div", {
                    className: SelectButtonStyles.root
                  }, ReasonReact.element(/* None */0, /* None */0, OnClickOutside.make(Curry._1(reduce, (function () {
                                  return /* OutsideClicked */1;
                                })), /* array */[
                            React.createElement("button", {
                                  className: className,
                                  onClick: Curry._1(reduce, (function () {
                                          return /* ButtonClicked */0;
                                        }))
                                }, Curry._1(renderButtonLabel, Rebase.Option[/* getOrRaise */15](Rebase.List[/* find */7]((function (item) {
                                                return +(item[/* value */1] === selected);
                                              }), items)))),
                            React.createElement("menu", {
                                  className: SelectButtonStyles.menu + (
                                    match !== 0 ? " s-open" : ""
                                  )
                                }, React.createElement("ul", undefined, Rebase.List[/* toArray */16](Rebase.List[/* map */2]((function (item) {
                                                return React.createElement("li", {
                                                            key: item[/* label */0],
                                                            onClick: Curry._1(reduce, (function () {
                                                                    return /* ItemSelected */[item];
                                                                  }))
                                                          }, Curry._1(renderItem, item));
                                              }), items))))
                          ])));
      });
    newrecord[/* initialState */10] = (function () {
        return /* record */[/* isOpen : false */0];
      });
    newrecord[/* reducer */12] = (function (action, state) {
        if (typeof action === "number") {
          if (action !== 0) {
            return /* Update */Block.__(0, [/* record */[/* isOpen : false */0]]);
          } else {
            return /* Update */Block.__(0, [/* record */[/* isOpen */1 - state[/* isOpen */0]]]);
          }
        } else {
          var item = action[0];
          return /* UpdateWithSideEffects */Block.__(3, [
                    /* record */[/* isOpen : false */0],
                    (function () {
                        return Curry._1(onSelect, item[/* value */1]);
                      })
                  ]);
        }
      });
    return newrecord;
  };
  return /* module */[
          /* component */component,
          /* make */make
        ];
}

var Styles = 0;

exports.Styles = Styles;
exports.Make   = Make;
/* react Not a pure module */
