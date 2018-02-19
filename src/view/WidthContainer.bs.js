'use strict';

var ReasonReact = require("reason-react/src/ReasonReact.js");
var TypedGlamor = require("typed-glamor/src/TypedGlamor.bs.js");

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
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      return ReasonReact.createDomElement("div", {
                  className: style
                }, children);
    });
  return newrecord;
}

exports.style = style;
exports.component = component;
exports.make = make;
/* style Not a pure module */
