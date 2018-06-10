'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Rebase = require("@glennsl/rebase/src/Rebase.bs.js");
var Vrroom = require("vrroom/src/Vrroom.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var TypedGlamor = require("bs-typed-glamor/src/TypedGlamor.bs.js");
var OnClickOutside = require("../services/OnClickOutside.bs.js");
var SelectButtonStyles = require("./SelectButtonStyles.bs.js");

function Make() {
  var component = ReasonReact.reducerComponent("SelectButton");
  var make = function (items, selected, $staropt$star, $staropt$star$1, $staropt$star$2, onSelect, _) {
    var className = $staropt$star ? $staropt$star[0] : "";
    var renderButtonLabel = $staropt$star$1 ? $staropt$star$1[0] : (function (item) {
          return Vrroom.text(item[/* label */0]);
        });
    var renderItem = $staropt$star$2 ? $staropt$star$2[0] : (function (item) {
          return Vrroom.text(item[/* label */0]);
        });
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
                            className: TypedGlamor.toString(SelectButtonStyles.container(param[/* state */1][/* isMenuOpen */0]))
                          }, ReasonReact.element(/* None */0, /* None */0, OnClickOutside.make((function () {
                                      return Curry._1(send, /* OutsideClicked */1);
                                    }), /* array */[
                                    React.createElement("button", {
                                          className: className,
                                          onClick: (function () {
                                              return Curry._1(send, /* ButtonClicked */0);
                                            })
                                        }, Curry._1(renderButtonLabel, Rebase.Option[/* getOrRaise */17](Rebase.List[/* find */7]((function (item) {
                                                        return item[/* value */1] === selected;
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
              }),
            /* initialState */(function () {
                return /* record */[/* isMenuOpen */false];
              }),
            /* retainedProps */component[/* retainedProps */11],
            /* reducer */(function (action, state) {
                if (typeof action === "number") {
                  if (action !== 0) {
                    return /* Update */Block.__(0, [/* record */[/* isMenuOpen */false]]);
                  } else {
                    return /* Update */Block.__(0, [/* record */[/* isMenuOpen */!state[/* isMenuOpen */0]]]);
                  }
                } else {
                  var item = action[0];
                  return /* UpdateWithSideEffects */Block.__(2, [
                            /* record */[/* isMenuOpen */false],
                            (function () {
                                return Curry._1(onSelect, item[/* value */1]);
                              })
                          ]);
                }
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

var Styles = 0;

exports.Styles = Styles;
exports.Make = Make;
/* react Not a pure module */
