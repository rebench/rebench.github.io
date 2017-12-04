'use strict';

var Colors = require("../styles/Colors.js");
var Glamor = require("bs-glamor/lib/js/src/glamor.js");

var error = Glamor.css(/* :: */[
      Glamor.color(Colors.red),
      /* :: */[
        Glamor.padding("1em"),
        /* [] */0
      ]
    ]);

var warning = Glamor.css(/* :: */[
      Glamor.color(Colors.yellow),
      /* :: */[
        Glamor.padding("1em"),
        /* [] */0
      ]
    ]);

exports.error   = error;
exports.warning = warning;
/* error Not a pure module */
