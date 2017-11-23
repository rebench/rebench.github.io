'use strict';

var Colors = require("../common/styles/Colors.js");
var Glamor = require("bs-glamor/lib/js/src/glamor.js");

var error = Glamor.css(/* :: */[
      Glamor.background(Colors.red),
      /* :: */[
        Glamor.padding("1em"),
        /* :: */[
          Glamor.color("white"),
          /* [] */0
        ]
      ]
    ]);

var warning = Glamor.css(/* :: */[
      Glamor.background(Colors.yellow),
      /* :: */[
        Glamor.padding("1em"),
        /* :: */[
          Glamor.color("#444"),
          /* [] */0
        ]
      ]
    ]);

exports.error   = error;
exports.warning = warning;
/* error Not a pure module */
