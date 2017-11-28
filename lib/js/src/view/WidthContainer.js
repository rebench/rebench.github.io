'use strict';

var React       = require("react");
var Glamor      = require("bs-glamor/lib/js/src/glamor.js");
var ReasonReact = require("reason-react/lib/js/src/ReasonReact.js");

var widthContainer = Glamor.css(/* :: */[
      Glamor.width("100%"),
      /* :: */[
        Glamor.maxWidth("1012px"),
        /* :: */[
          Glamor.minWidth("600px"),
          /* :: */[
            Glamor.margin("auto"),
            /* [] */0
          ]
        ]
      ]
    ]);

var component = ReasonReact.statelessComponent("WidthContainer");

function make(children) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      return React.createElement("div", {
                  className: widthContainer
                }, children);
    });
  return newrecord;
}

exports.widthContainer = widthContainer;
exports.component      = component;
exports.make           = make;
/* widthContainer Not a pure module */
