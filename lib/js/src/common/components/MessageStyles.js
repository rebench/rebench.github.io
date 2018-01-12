'use strict';

var Colors      = require("../styles/Colors.js");
var TypedGlamor = require("typed-glamor/lib/js/src/TypedGlamor.bs.js");

var error = TypedGlamor.css(/* :: */[
      TypedGlamor.color(Colors.red),
      /* :: */[
        TypedGlamor.padding(TypedGlamor.em(1)),
        /* [] */0
      ]
    ]);

var warning = TypedGlamor.css(/* :: */[
      TypedGlamor.color(Colors.yellow),
      /* :: */[
        TypedGlamor.padding(TypedGlamor.em(1)),
        /* [] */0
      ]
    ]);

exports.error   = error;
exports.warning = warning;
/* error Not a pure module */
