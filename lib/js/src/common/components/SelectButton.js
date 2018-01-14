'use strict';

var Block              = require("bs-platform/lib/js/block.js");
var Curry              = require("bs-platform/lib/js/curry.js");
var React              = require("react");
var Rebase             = require("@glennsl/rebase/lib/js/src/Rebase.bs.js");
var Vrroom             = require("vrroom/lib/js/src/Vrroom.bs.js");
var ReasonReact        = require("reason-react/lib/js/src/ReasonReact.js");
var TypedGlamor        = require("typed-glamor/lib/js/src/TypedGlamor.bs.js");
var OnClickOutside     = require("../services/OnClickOutside.js");
var SelectButtonStyles = require("./SelectButtonStyles.js");

function Make() {
  var component = ReasonReact.reducerComponent("SelectButton");
  var make = function (items, selected, $staropt$star, $staropt$star$1, $staropt$star$2, onSelect, _) {
    var className = $staropt$star ? $staropt$star[0] : "";
    var renderButtonLabel = $staropt$star$1 ? $staropt$star$1[0] : (function (item) {
          return Vrroom.Helpers[/* text */0](item[/* label */0]);
        });
    var renderItem = $staropt$star$2 ? $staropt$star$2[0] : (function (item) {
          return Vrroom.Helpers[/* text */0](item[/* label */0]);
        });
    var newrecord = component.slice();
    newrecord[/* render */9] = (function (param) {
        var send = param[/* send */4];
        return React.createElement("div", {
                    className: TypedGlamor.toString(SelectButtonStyles.container(param[/* state */2][/* isMenuOpen */0]))
                  }, ReasonReact.element(/* None */0, /* None */0, OnClickOutside.make((function () {
                              return Curry._1(send, /* OutsideClicked */1);
                            }), /* array */[
                            React.createElement("button", {
                                  className: className,
                                  onClick: (function () {
                                      return Curry._1(send, /* ButtonClicked */0);
                                    })
                                }, Curry._1(renderButtonLabel, Rebase.Option[/* getOrRaise */17](Rebase.List[/* find */7]((function (item) {
                                                return +(item[/* value */1] === selected);
                                              }), items)))),
                            React.createElement("menu", undefined, React.createElement("ul", undefined, ReasonReact.element(/* None */0, /* None */0, Curry._3(Vrroom.Control[/* MapList */1][/* make */1], items, /* None */0, (function (item) {
                                                return React.createElement("li", {
                                                            key: item[/* label */0],
                                                            onClick: (function () {
                                                                return Curry._1(send, /* ItemSelected */[item]);
                                                              })
                                                          }, Curry._1(renderItem, item));
                                              })))))
                          ])));
      });
    newrecord[/* initialState */10] = (function () {
        return /* record */[/* isMenuOpen : false */0];
      });
    newrecord[/* reducer */12] = (function (action, state) {
        if (typeof action === "number") {
          if (action !== 0) {
            return /* Update */Block.__(0, [/* record */[/* isMenuOpen : false */0]]);
          } else {
            return /* Update */Block.__(0, [/* record */[/* isMenuOpen */1 - state[/* isMenuOpen */0]]]);
          }
        } else {
          var item = action[0];
          return /* UpdateWithSideEffects */Block.__(3, [
                    /* record */[/* isMenuOpen : false */0],
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

var Control = 0;

var Styles = 0;

exports.Control = Control;
exports.Styles  = Styles;
exports.Make    = Make;
/* react Not a pure module */
