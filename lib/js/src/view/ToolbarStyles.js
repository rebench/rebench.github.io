'use strict';

var Colors = require("../common/styles/Colors.js");
var Glamor = require("bs-glamor/lib/js/src/glamor.js");

var root = Glamor.css(/* :: */[
      Glamor.background(Colors.panel),
      /* :: */[
        Glamor.display("flex"),
        /* [] */0
      ]
    ]);

var separator = Glamor.css(/* :: */[
      Glamor.flexGrow("1"),
      /* [] */0
    ]);

exports.root      = root;
exports.separator = separator;
/* root Not a pure module */
