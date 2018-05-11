'use strict';

var ReasonReact = require("reason-react/src/ReasonReact.js");
var TypedGlamor = require("bs-typed-glamor/src/TypedGlamor.bs.js");

var style = TypedGlamor.css(/* None */0, /* :: */[
      TypedGlamor.width(TypedGlamor.pct(100)),
      /* :: */[
        TypedGlamor.maxWidth(TypedGlamor.px(1012)),
        /* :: */[
          TypedGlamor.minWidth(TypedGlamor.px(600)),
          /* :: */[
            TypedGlamor.margin2(TypedGlamor.zero, TypedGlamor.auto),
            /* [] */0
          ]
        ]
      ]
    ]);

var component = ReasonReact.statelessComponent("WidthContainer");

function make(children) {
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
          /* render */(function () {
              return ReasonReact.createDomElement("div", {
                          className: style
                        }, children);
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */component[/* reducer */12],
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

exports.style = style;
exports.component = component;
exports.make = make;
/* style Not a pure module */
