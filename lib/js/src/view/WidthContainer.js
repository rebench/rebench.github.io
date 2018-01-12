'use strict';

var ReasonReact = require("reason-react/lib/js/src/ReasonReact.js");
var TypedGlamor = require("typed-glamor/lib/js/src/TypedGlamor.bs.js");

var widthContainer = TypedGlamor.css(/* :: */[
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
                  className: widthContainer
                }, children);
    });
  return newrecord;
}

exports.widthContainer = widthContainer;
exports.component      = component;
exports.make           = make;
/* widthContainer Not a pure module */
