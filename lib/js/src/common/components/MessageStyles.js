'use strict';

var Colors      = require("../styles/Colors.js");
var TypedGlamor = require("typed-glamor/lib/js/src/TypedGlamor.bs.js");

function container(kind) {
  return TypedGlamor.css(/* :: */[
              TypedGlamor.color(kind >= 106380200 ? Colors.red : Colors.yellow),
              /* :: */[
                TypedGlamor.padding(TypedGlamor.em(1)),
                /* [] */0
              ]
            ]);
}

exports.container = container;
/* Colors Not a pure module */
