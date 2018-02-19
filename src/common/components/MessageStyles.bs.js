'use strict';

var Colors = require("../styles/Colors.bs.js");
var TypedGlamor = require("typed-glamor/src/TypedGlamor.bs.js");

function container(kind) {
  return TypedGlamor.css(/* None */0, /* :: */[
              TypedGlamor.color(kind >= 106380200 ? Colors.red : Colors.yellow),
              /* :: */[
                TypedGlamor.padding(TypedGlamor.em(1)),
                /* [] */0
              ]
            ]);
}

exports.container = container;
/* Colors Not a pure module */
